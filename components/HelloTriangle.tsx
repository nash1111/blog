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
