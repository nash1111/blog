import React, { useState, useRef, useEffect } from "react";
import triangleVertWGSL from "../shaders/triangle.vert.wgsl";
import redFragWGSL from "../shaders/red.frag.wgsl";

const HelloTriangle: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not defined");
      return;
    }

    const initWebGPU = async () => {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error("WebGPU adapter is not available");
        return;
      }

      const device = await adapter.requestDevice();
      if (!device) {
        console.error("WebGPU device is not available");
        return;
      }

      const context = canvas.getContext("webgpu") as GPUCanvasContext;
      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;

      context.configure({
        device,
        format: presentationFormat,
        alphaMode: "premultiplied",
      });

      const pipeline = createRenderPipeline(device, presentationFormat);

      const render = () => {
        if (!isActive) return;

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        const renderPassDescriptor = createRenderPassDescriptor(textureView);

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3, 1, 0, 0);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    };

    initWebGPU();
  }, [isActive]);

  return <canvas ref={canvasRef} />;
};

function createRenderPipeline(device: GPUDevice, format: GPUTextureFormat): GPURenderPipeline {
  return device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: device.createShaderModule({ code: triangleVertWGSL }),
      entryPoint: "main",
    },
    fragment: {
      module: device.createShaderModule({ code: redFragWGSL }),
      entryPoint: "main",
      targets: [{ format }],
    },
    primitive: { topology: "triangle-list" },
  });
}

function createRenderPassDescriptor(textureView: GPUTextureView): GPURenderPassDescriptor {
  return {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };
}

export default HelloTriangle;
