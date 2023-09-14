---
title: extismでRust(PDK)->plug-in(wasm)->Rust(SDK)をやる
date: "2023-09-14"
tags: ["WebAssembly", "extism", "WASI"]
locale: "jp"
---

#### ゴール

extism PDK(Rust) で plug-in (wasm)を作成し、extism SDK(Rust) で呼び出す

#### extism とは

[extism 公式レポジトリ](https://github.com/extism/extism)  
ユニバーサルプラグインシステムを謳っている(?)OSS  
PDK(Plugin Development Kit)を使い plug-in(wasm)を作成し SDK(Software Development Kit)から call する  
PDK は  
Rust, AssemblyScript, Go, C/C++, Haskell, Zig  
SDK は  
Go, Ruby, Python, Node, Rust, C, C++, OCaml, Haskell, PHP, Elixir/Erlang, .NET, Java, Zig  
が対応している

#### 準備

extism-cli のインストール

```bash
sh <(curl https://raw.githubusercontent.com/extism/cli/main/install.sh) /usr/local/bin
extism install latest
```

#### rust-pdk を使って plug-in 作成

```bash
cargo new extism_pdk_rust_sample --lib
```

Cargo.toml に追記

```bash
[lib]
crate_type = ["cdylib"]

[dependencies]
extism-pdk = "0.3.4"
serde = { version = "1.0.188", features = ["derive"] }
serde_json = "1.0.106"
```

lib.rs を編集

```bash
#[derive(serde::Deserialize)]
struct Multiply {
    a: u32,
    b: u32,
}

#[derive(serde::Serialize)]
struct Product {
    product: u32,
}

#[plugin_fn]
pub fn multiply(Json(mul): Json<Multiply>) -> FnResult<Json<Product>> {
    let product = Product { product: mul.a * mul.b };
    Ok(Json(product))
}
```

ビルド

```bash
rustup target add wasm32-unknown-unknown
cargo build --release --target wasm32-unknown-unknown
```

extism-cli を使ってテスト

```bash
extism call ./target/wasm32-unknown-unknown/release/extism_pdk_rust_sample.wasm multiply --input '{"a": 2, "b": 3}' --config thing=i_hope_this_flag_become_optional
```

#### rusd-sdk を使って plug-in を call する

```bash
cargo new extism_sdk_rust_sample
```

Cargo.toml に追記

```bash
[dependencies]
extism = "0.5.0"
serde = { version = "1.0.188", features = ["derive"] }
serde_json = "1.0.106"
```

main.rs を編集

```bash
fn sdk_sample() {
    let wasm = include_bytes!("../../extism_pdk_rust_sample/target/wasm32-unknown-unknown/release/extism_pdk_rust_sample.wasm");
    let context = Context::new();

    // ignore official document
    let mut plugin = Plugin::new(&context, wasm, [], false).unwrap();
    let data = plugin.call("multiply", "{\"a\": 2, \"b\": 3}").unwrap();

    // bite to string
    let data_str = std::str::from_utf8(&data).expect("Failed to convert to string");

    // string to json
    let parsed: Value = serde_json::from_str(data_str).expect("Failed to parse JSON");

    // json to int
    if let Some(count) = parsed["product"].as_i64() {
        println!("product: {}", count);
    } else {
        println!("Failed to retrieve 'product' value");
    }
}

fn main() {
  sdk_sample();
}
```

実行

```bash
cargo run
product: 6
```

#### 最終

[できたもの](https://github.com/nash1111/rust_to_rust_extism_example)
