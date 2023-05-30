---
title: Integrating WebGPU into Your Next.js and TypeScript Application Part 1
date: '2023-05-30'
tags: ["TypeScript", "WebGPU"]
locale: "en"
---


#### Goal
In this post, we will set up our development environment and draw a triangle using WebGPU, and then turn it into a component. We aim to render the red triangle seen in this [link](https://webgpu.github.io/webgpu-samples/samples/helloTriangle) within Next.js. In other words, our goal is to port this [code](https://github.com/webgpu/webgpu-samples/blob/main/src/sample/helloTriangle/main.ts) into a component.
#### Environment Setup
Access [chrome://flags/](chrome://flags/) and turn on WebGPU.  
Access [chrome://gpu/](chrome://gpu/) and make sure WebGPU is enabled.  
![webgpu.png](/blog/webgpu.png) 

Install an extension for WGSL.  
https://marketplace.visualstudio.com/items?itemName=PolyMeilex.wgsl

Add the WebGPU type definitions to your project ( [type repo](https://github.com/gpuweb/types) )

```bash
yarn add @webgpu/types
```

Add to types.d.ts to treat wgsl files as strings.
```bash
declare module "*.wgsl" {
  const shader: string;
  export default shader;
}
```

Add to next.config.js.
```bash
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webm)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/[path][name].[hash][ext]",
      },
    });
    config.module.rules.push({
      test: /\.wgsl$/i,
      use: "raw-loader",
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        __SOURCE__: webpack.DefinePlugin.runtimeValue((v) => {
          // Load the source file and set it as a global definition.
          // This is useful for easily embedding a file's source into the page.
          const source = fs.readFileSync(v.module.userRequest, "utf-8");
          return JSON.stringify(source); // Strings need to be wrapped in quotes
        }, []),
      })
    );
```

#### Implementation
The [original code](https://github.com/webgpu/webgpu-samples/blob/main/src/sample/helloTriangle/main.ts) was largely left as is. However, since compilerOptions was set to strict: false in the original code and true in my project, I added things like checking for the existence of the canvas. 
```components/FirstWebgpu.tsx``` eventually ended up looking like this:

```TypeScript
import React, { useState, useRef, useEffect } from "react";
import triangleVertWGSL from "../shaders/triangle.vert.wgsl";
import redFragWGSL from "../shaders/red.frag.wgsl";

const HelloTriangle: React.FC = () => {
  const [pageState, setPageState] = useState({ active: true });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const init = async () => {
      const adapter = await navigator.gpu.requestAdapter();
      const device = await adapter?.requestDevice();

      if (!pageState.active) return;
      if (!canvas) {
        console.error("canvas not defined");
        return;
      }
      const context = canvas.getContext("webgpu") as GPUCanvasContext;

      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

      if (!device) {
        console.error("Device is not available");
        return;
      }
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: "premultiplied",
      });

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
          module: device.createShaderModule({
            code: triangleVertWGSL,
          }),
          entryPoint: "main",
        },
        fragment: {
          module: device.createShaderModule({
            code: redFragWGSL,
          }),
          entryPoint: "main",
          targets: [
            {
              format: presentationFormat,
            },
          ],
        },
        primitive: {
          topology: "triangle-list",
        },
      });

      const frame = () => {
        if (!pageState.active) return;

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        const renderPassDescriptor: GPURenderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
              loadOp: "clear" as const,
              storeOp: "store" as const,
            },
          ],
        };

        const passEncoder =
          commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3, 1, 0, 0);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };

    init();
  }, [pageState.active]);

  return <canvas ref={canvasRef} />;
};

export default HelloTriangle;
```

#### Result
You can see the triangle being drawn at this [link](https://nash1111rgba.com/playground/hellotriangle).
Note: Please turn on WebGPU.
![hellotriangle.png](/blog/hellotriangle.png)
In the next post, I would like to implement features such as changing colors over time.