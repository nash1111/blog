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


```JavaScript
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


```bash
yarn add @webgpu/types
```
