---
title: remixv2をbunでビルドしてwrangler deployする
date: "2023-12-22"
tags: ["Remix", "CloudFlare"]
locale: "jp"
---

#### ゴール

remixプロジェクトをbun buildして、GitHubActionsでCloudFlareにデプロイする

#### Remixプロジェクト作成
[公式のテンプレート](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/)
```
npm create cloudflare@latest remix-cloudflare-template -- --framework=remix
```

```
git   Initialize a new git repository? (recommended)
      ○ Yes  ● No
deps   Install dependencies with npm? (recommended)
       ○ Yes  ● No 
...
// Yes
╰ Do you want to use git for version control?
  Yes / No

// No
╭ Deploy with Cloudflare Step 3 of 3
│ 
╰ Do you want to deploy your application?
  Yes / No
```

package-lock.json消す
```
❯ rm remix-cloudflare-template/package-lock.json
```

package.json修正
before
```
    "dev": "remix dev --manual -c \"npm run start\"",
    "lint": "eslint --ignore-path .gitignore --cache --cache-location ./node_modules/.cache/eslint .",
    "start": "wrangler pages dev --compatibility-date=2023-06-21 ./public",
    "typecheck": "tsc",
    "pages:deploy": "npm run build && wrangler pages deploy ./public"
```
after
```
    "dev": "remix dev --manual -c \"bun run start\"",
    "lint": "eslint --ignore-path .gitignore --cache --cache-location ./node_modules/.cache/eslint .",
    "start": "wrangler pages dev --compatibility-date=2023-06-21 ./public",
    "typecheck": "tsc",
    "pages:deploy": "bun run build && wrangler pages deploy ./public"
```  

README.mdに含まれるnpmもbunに置換します

#### GitHubActionsで自動デプロイするようにする(準備)
CloudFlareの[api-tokenダッシュボード](https://dash.cloudflare.com/profile/api-tokens)  
ログイン直後の画面からだと右上->MyProfile->API Tokensからもアクセスできます  
CloudFlareWorkersの編集権限を持つTokenを作成します  
これから、GitHubSecretsに３つ変数を登録します  
先程発行したTokenをGitHubSecretsのCLOUD_FLARE_DEPLOY_TOKENに登録します  
CloudFlareAccountIdを、GitHubSecretsのCLOUD_FLARE_ACCOUNT_IDに登録します  
プロジェクト名を、PROJECT_NAMEとして登録します

#### GitHubActionsで自動デプロイするようにする(workflow設定)
oven-shとcloudflareが提供しているActionを使うだけでした  
masterを常にデプロイしたい場合  
```
name: deploy-workflow

on:
  push:
    branches:
      - master

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Run lint
        run: bun run lint

      - name: Run build
        run: bun run build

      - name: Deploy
        id: deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUD_FLARE_DEPLOY_TOKEN }}
          accountId: ${{ secrets.CLOUD_FLARE_ACCOUNT_ID }}
          command: pages deploy --project-name=${{ secrets.PROJECT_NAME }} ./public --env=production --branch=master
```


#### おわり
masterにpushしたらデプロイされるようになりました  
bunに移行しただけでとても早くなり快適でした  
パブリックテンプレとして公開するかもしれません