---
title: How to install processing on Ubuntu
date: "2023-06-24"
tags: ["Processing"]
locale: "en"
---

#### Download and install and setup to desktop

[Download processing](https://processing.org/download)

```bash
tar xvf ~/Downloads/processing-4.2-linux-x64.tgz
sudo mv processing-4.2/ /opt/processing
sudo ln -s /opt/processing/processing /usr/local/bin/processing
sudo vim /usr/share/applications/processing.desktop

[Desktop Entry]
Version=2.1
Name=Processing
Comment=Processing Rocks
Exec=processing
Icon=/opt/processing/lib/icons/pde-256.png
Terminal=false
Type=Application
Categories=AudioVideo;Video;Graphics
```
