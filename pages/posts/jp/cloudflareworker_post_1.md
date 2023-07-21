---
title: CloudFlareWorkerでシンプルなAPIを作る
date: "2023-07-21"
tags: ["WebAssembly", "Rust", "CloudFlare", "CloudFlareWorker"]
locale: "jp"
---

#### ゴール

unixtime を投げて時刻を返す API を作ります。

#### 準備

```bash
# target設定
rustup target add wasm32-unknown-unknown

# ブラウザが開くので、Allowを押す
yarn global add wrangler
wrangler login
```

#### プロジェクト作成

[公式ガイド](https://developers.cloudflare.com/workers/runtime-apis/webassembly/rust/#1-create-a-new-project-with-wrangler)に従ってテンプレートからプロジェクトを生成します

```bash
npx wrangler generate unix_time_formatter https://github.com/cloudflare/workers-sdk/templates/experimental/worker-rust
cd unix_time_formatter
```

#### 開発環境での実行

```bash
wrangler dev
```

```bash
❯ curl localhost:8787
Hello, World!
```

リクエストが来たら"Hello, World!"返すようになっています
https://github.com/cloudflare/workers-sdk/blob/main/templates/experimental/worker-rust/src/lib.rs

#### コードの変更

Chrono を使って unixtime を yyyy/mm/dd (曜日) HH:MM:SS で返すようにします
[変更後のコード](https://github.com/nash1111/unixtime_formatter)

#### 動作確認

(wrangler dev している状態で保存をするとホットリロードが走って自動で更新されます)

```bash
curl -X GET http://127.0.0.1:8787/$(date +%s)
2023/7/21(Fri) 08:51:05
```

#### デプロイ

```bash
wrangler publish

# Published worker-rust (0.29 sec)
# URLが発行されます
```

#### 本番での動作確認

wrangler publish すると URL が発行されるので

```bash
curl -X GET [ここに発行されたURLを入れてください]/$(date +%s)
2023/7/21(Fri) 08:52:33
```
