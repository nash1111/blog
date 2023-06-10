---
title: Install n on Ubuntu 22.04 LTS
date: '2023-06-10'
tags: ["TypeScript", "node.js", "installation"]
locale: "en"
---


#### Goal
In this post, we will set up our development environment for node.js
#### Environment
```bash
❯ cat /etc/os-release 
PRETTY_NAME="Ubuntu 22.04.2 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.2 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

#### Setup
```bash
sudo apt install nodejs npm
sudo n lts
sudo npm install n -g
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
npm install -g yarn
```

#### Result
```bash
❯ yarn -v; node -v
1.22.19
v18.16.0
```