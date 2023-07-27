---
title: How to create simple wasmer package (Rust)
date: "2023-07-27"
tags: ["WebAssembly", "Rust", "wasmer", "wasi"]
locale: "en"
---

#### Goal
make unixtime parser again like
```bash
wasmer run target/wasm32-wasi/release/wasmer_datetime_parser.wasm -- 1690416880
```

#### Preparation

```bash
curl https://get.wasmer.io -sSfL | sh
rustup target add wasm32-wasi
```

#### Edit src/main.rs
parse args with wasi::args_get
[src/main.rs](https://github.com/nash1111/wasmer_datetime_parser/blob/master/src/main.rs)


#### Run it locally

```bash
cargo build --target wasm32-wasi --release
wasmer run target/wasm32-wasi/release/wasmer_datetime_parser.wasm -- 1690416880
2023-07-27 00:14:40 UTC
```

#### Publish as a wasmer package
```bash
wasmer init
wasmer login
wasmer publish
```

#### Test what published
[Go to url](https://wasmer.io/nash1111/wasmer_datetime_parser@0.1.6) and download wasm file then try it
```bash
wasmer run [filepath] -- 1690416880
2023-07-27 00:14:40 UTC
```