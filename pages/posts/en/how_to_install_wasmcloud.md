---
title: How to install wash on Ubuntu
date: "2023-07-01"
tags: ["WebAssembly", "wasmCloud"]
locale: "en"
---

#### Goal

install wash (wasmCloud Shell)

#### Installation

```bash
# install wash
❯ curl -s https://packagecloud.io/install/repositories/wasmcloud/core/script.deb.sh | sudo bash
❯ sudo apt install wash openssl

# start wasm cloud
❯ wash up --detached

🛁 wash up completed successfully
🕸  NATS is running in the background at http://127.0.0.1:4222
🌐 The wasmCloud dashboard is running at http://localhost:4000
📜 Logs for the host are being written to /home/nash1111/.wash/downloads/wasmcloud_4000.log

⬇️  To stop wasmCloud, run "wash down"
```

At [http://localhost:4000/](http://localhost:4000/) you will see dashboard
![wasmCloudDashboard.png](/blog/wasmCloudDashboard.png)

#### Next

In the next post, we will introduce the steps to create an Actor.  
In the following post, we will present the process to create a Provider.
