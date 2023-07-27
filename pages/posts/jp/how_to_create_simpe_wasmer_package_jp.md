---
title: wasmer packageを作って公開する (Rust)
date: "2023-07-27"
tags: ["WebAssembly", "Rust", "wasmer", "wasi"]
locale: "jp"
---

#### ゴール
またunixtimeをパースして返すパッケージを作る
```bash
wasmer run target/wasm32-wasi/release/wasmer_datetime_parser.wasm -- 1690416880
```
を実行した時、YYYY-MM-DDで返すようにする

#### 準備

```bash
curl https://get.wasmer.io -sSfL | sh
rustup target add wasm32-wasi
```

#### src/main.rsの編集
wasi::args_getを使って入力を受け取ってパースする様にします
[src/main.rs](https://github.com/nash1111/wasmer_datetime_parser/blob/master/src/main.rs)
#### ローカルで実行

```bash
cargo build --target wasm32-wasi --release
wasmer run target/wasm32-wasi/release/wasmer_datetime_parser.wasm -- 1690416880
2023-07-27 00:14:40 UTC
```

#### wasmer packageとして公開
```bash
wasmer init
wasmer login
wasmer publish
```

#### 公開されたもののテスト
[公開されたURL](https://wasmer.io/nash1111/wasmer_datetime_parser@0.1.6)からwasmファイルをダウンロードして
```bash
wasmer run [filepath] -- 1690416880
2023-07-27 00:14:40 UTC
```