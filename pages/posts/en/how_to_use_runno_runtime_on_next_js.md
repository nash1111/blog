---
title: Running Code in the Browser with @runno/runtime in Next.js
date: "2023-09-01"
tags: ["WebAssembly", "runno", "WASI"]
locale: "en"
---

#### Goal

Use @runno/runtime to execute code within HTML.\
The runtimes currently supported by @runno/runtime are python, ruby, quickjs,
sqlite, clang, clangpp, and php. For this example, we will use python.

#### Preparation

Add the library

```bash
yarn add @runno/runtime
```

Add CORS settings to next.config.js

```bash
async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
```

#### Createa Component

```bash
/* eslint-disable react/no-unescaped-entities */
import "@runno/runtime";

const RunnoComponent = () => {
  // @ts-ignore
  const runPythonScript = `
  print("Hi")
  number = int(input("Choose number"))
  if number % 2 == 0:
      print("That number is even")
  print("Done")
  `;
  return (
    <runno-run runtime="python" editor controls>
      {runPythonScript}
    </runno-run>
  );
};

export default RunnoComponent;
```

Add the Component to a Page Disable SSR

```bash
import dynamic from "next/dynamic";

const DynamicRunnoComponent = dynamic(
  () => import("../../../components/RunnoComponent"),
  {
    ssr: false, // Disable SSR
    loading: () => <p>Loading...</p>,
  }
);

const PythonExample = () => {
  return (
    <div>
      <h1>is even ?</h1>
      <DynamicRunnoComponent />
    </div>
  );
};

export default PythonExample;
```

#### Final Result

[runtime=python specified](https://nash1111-old-blog.pages.dev/playground/runno-wasi/PythonExample)

#### References

[API docs](https://runno.dev/docs/runtime/) [runno.dev](https://runno.dev/)
