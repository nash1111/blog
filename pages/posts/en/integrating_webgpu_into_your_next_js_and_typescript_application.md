---
title: Integrating WebGPU into Your Next.js and TypeScript Application Part 1
date: '2023-05-30'
tags: ["TypeScript", "WebGPU"]
locale: "en"
---

この記事では、開発環境の設定と、WebGPUを使って三角形を書き、それをコンポーネントにする
コンポーネントを作る


拡張機能を入れる
https://marketplace.visualstudio.com/items?itemName=PolyMeilex.wgsl
Add type settings( [type repo](https://github.com/gpuweb/types) )

wgslファイルを文字列として扱うようにtypes.d.tsに追記する
```TypeScript
declare module "*.wgsl" {
  const shader: string;
  export default shader;
}
```



```bash
yarn add @webgpu/types
```
