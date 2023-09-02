/// <reference types="@webgpu/types" />

declare module "*.wgsl" {
  const shader: string;
  export default shader;
}

// runno-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "runno-run": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      runtime?: string;
      editor?: boolean;
      controls?: boolean;
    };
  }
}
