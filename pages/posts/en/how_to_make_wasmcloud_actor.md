---
title: How to make Actor in wasmCloud
date: "2023-07-01"
tags: ["WebAssembly", "wasmCloud", "Actor"]
locale: "en"
---

#### Goal

make simple Actor with wasmCloud

#### What is Actor?

This refers to an Actor within the Actor Model. It slightly differs from the academic definition of the Actor Model, where it's not possible to generate other Actors.  
see more on Official Doc [Overview of the Actor Model](https://wasmcloud.com/docs/fundamentals/actors/)

#### Create & Register an Actor

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

generated firstactor/src/lib.rs is below, just returning string "Hello World"

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

at root of firstactor

```bash
❯ wash build

# check _s.wasm generated
❯ ls build/firstactor_s.wasm
build/firstactor_s.wasm
```

upload via WebUI, Choose "Start Actor"->"From File"

#### Generate Provider

via WebUI, "Start Provider"->select default one

#### Setup Link

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

#### Test

```bash
❯ curl localhost:8087
Hello, World!
```
