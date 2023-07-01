---
title: wasmCloudでActorを作る
date: "2023-07-02"
tags: ["WebAssembly", "wasmCloud", "Actor"]
locale: "jp"
---

#### ゴール

シンプルな Actor を一つ作成すること

#### Actor とは？

wasmCloud の Actor は Actor Model の Actor を指しています。  
しかし、他のアクターを生成することができないアクターモデルの学術的な定義とは少し異なります。  
詳細は公式ドキュメントを参照してください。[Overview of the Actor Model](https://wasmcloud.com/docs/fundamentals/actors/)

#### Actor の作成と登録

```bash
❯ rustup target add wasm32-unknown-unknown
```

```bash
❯ wash new actor firstactor --template-name hello
🔧   Cloning template from repo wasmCloud/project-templates subfolder actor/hello...
🔧   Using template subfolder actor/hello...
🔧   Generating template...
✨   Done! New project created [your path]

Project generated and is located at: [your path]


```

firstactor/src/lib.rs に"Hello World"とだけ返すコードが生成されています。

```bash
use wasmbus_rpc::actor::prelude::*;
use wasmcloud_interface_httpserver::{HttpRequest, HttpResponse, HttpServer, HttpServerReceiver};

#[derive(Debug, Default, Actor, HealthResponder)]
#[services(Actor, HttpServer)]
struct FirstactorActor {}

/// Implementation of the HttpServer capability contract
#[async_trait]
impl HttpServer for FirstactorActor {
    async fn handle_request(&self, _ctx: &Context, _req: &HttpRequest) -> RpcResult<HttpResponse> {
        Ok(HttpResponse::ok("Hello, World!"))
    }
}
```

firstactor プロジェクトのルートで実行します。

```bash
❯ wash build

# check _s.wasm generated
❯ ls build/firstactor_s.wasm
build/firstactor_s.wasm
```

WebUI(localhost:4000)で"Start Actor"を選び"From File"で生成された`_s.wasm` をアップロードします。

#### Provider の作成

WebUI(localhost:4000)で"Start Provider"からデフォルトの設定で一つ作成します。

#### Link の作成

```bash
# get your host id
❯ wash get

# get your ACTOR_ID
❯ wash get inventory [host id]

# set up environment variables
❯ export HELLO_ACTOR_ID= [actor id you see above]
❯ export PROVIDER_ID= [provider id you see above]

# put link
❯ wash ctl link put ${HELLO_ACTOR_ID} ${PROVIDER_ID} wasmcloud:httpserver address=0.0.0.0:8087
```

Now you can see Actors, Providers, Link Definition Activated
![wasm_uploaded](/blog/wasm_uploaded.png)

#### テスト

```bash
❯ curl localhost:8087
Hello, World!
```

[原文](https://nash1111rgba.com/posts/how_to_make_wasmcloud_actor)
