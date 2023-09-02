---
title: wash(wasmCloud Shell)をUbuntuにインストール
date: "2023-07-01"
tags: ["WebAssembly", "wasmCloud"]
locale: "jp"
---

#### ゴール

wasmCloud の CLI ツールの wash をインストールします

#### インストール

```bash
# washのインストール
❯ curl -s https://packagecloud.io/install/repositories/wasmcloud/core/script.deb.sh | sudo bash
❯ sudo apt install wash openssl

# wasmCloudの起動
❯ wash up --detached

🛁 wash up completed successfully
🕸  NATS is running in the background at http://127.0.0.1:4222
🌐 The wasmCloud dashboard is running at http://localhost:4000
📜 Logs for the host are being written to /home/nash1111/.wash/downloads/wasmcloud_4000.log

⬇️  To stop wasmCloud, run "wash down"
```

[http://localhost:4000/](http://localhost:4000/)でダッシュボードが見えていれば起動できています
![wasmCloudDashboard.png](/blog/wasmCloudDashboard.png)

#### 次

次の投稿で、wasm から Actor を作り、ハローワールドをします
