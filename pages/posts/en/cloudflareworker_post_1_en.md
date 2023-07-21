---
title: Creating a Simple API with CloudFlareWorkers (Rust)
date: "2023-07-21"
tags: ["WebAssembly", "Rust", "CloudFlare", "CloudFlareWorkers"]
locale: "en"
---

#### Goal

We will create an API that takes a unixtime and returns the time.

#### Preparation

```bash
# Set the target
rustup target add wasm32-unknown-unknown

# A browser will open, so click on "Allow"
yarn global add wrangler
wrangler login
```

#### Preparetion

Follow the [Official Guide](https://developers.cloudflare.com/workers/runtime-apis/webassembly/rust/#1-create-a-new-project-with-wrangler) to generate a project from the template.

```bash
npx wrangler generate unix_time_formatter https://github.com/cloudflare/workers-sdk/templates/experimental/worker-rust
cd unix_time_formatter
```

#### Running in the Development Environment

```bash
wrangler dev
```

When a request is received, it returns "Hello, World!".[template](https://github.com/cloudflare/workers-sdk/blob/main/templates/experimental/worker-rust/src/lib.rs)

```bash
❯ curl localhost:8787
Hello, World!
```

#### Modifying the Code

We will use Chrono to return the unixtime in the format yyyy/mm/dd (day of the week) HH:MM:SS.
[Modified Code](https://github.com/nash1111/unixtime_formatter)

#### Testing the Functionality

(If you save while running wrangler dev, hot reloading will run and it will be updated automatically.)

```bash
curl -X GET http://127.0.0.1:8787/$(date +%s)
2023/7/21(Fri) 08:51:05
```

#### Deploy

```bash
wrangler publish

# Published worker-rust (0.29 sec)
# URL will be generated
```

#### Testing in Production

After running wrangler publish, a URL will be issued.

```bash
curl -X GET [Insert the issued URL here]/$(date +%s)
2023/7/21(Fri) 08:52:33
```
