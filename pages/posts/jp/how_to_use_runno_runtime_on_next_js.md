---
title: Next.jsで@runno/runtimeを使い、ブラウザでコード実行
date: "2023-09-01"
tags: ["WebAssembly", "runno", "WASI"]
locale: "jp"
---

#### ゴール
@runno/runtimeを使って、HTML内でコードを実行します。  
現在@runno/runtimeでサポートされているランタイムはpython,ruby,quickjs,sqlite,clang,clangpp,phpです、今回はpythonを使います。

#### 準備
ライブラリ追加
```bash
yarn add @runno/runtime
```
CORS設定をnext.config.jsに追加
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

#### コンポーネント作成
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

#### ページにコンポーネントの読み込みを追加
SSRを無効化します
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

#### 最終的に出来たもの
[runtime=pythonで指定](https://nash1111rgba.com/playground/runno-wasi/PythonExample)

#### 参考
[API docs](https://runno.dev/docs/runtime/)
[runno.dev](https://runno.dev/)