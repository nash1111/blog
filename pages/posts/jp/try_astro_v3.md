---
title: Astro v3でサポートされたView Transitions APIを試す
date: "2023-09-16"
tags: ["Astro", "front-end"]
locale: "jp"
---

#### この記事の内容

Astro v3 が[View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)を[組み込んだ](https://developer.chrome.com/blog/astro-view-transitions/)らしいので試しました  
fade(デフォルトの挙動,滑らかに遷移)と slide(横から新しいコンテンツが現れる)を試しました

#### 手順

index.astro

```bash
---
import { ViewTransitions } from 'astro:transitions';
---
<html lang="en">
  <head>
    <title>My Homepage</title>
    <ViewTransitions />
  </head>
  <body>
    <h2>ViewTransitions, fade</h2>
    <p><a href="fuga/">go fuga</a></p>
  </body>
</html>
```

fuga.astro

```bash
---
import { ViewTransitions } from 'astro:transitions';
---

<html lang="en">
  <head>
    <title>My Homepage</title>
    <ViewTransitions />
  </head>
  <body transition:animate="slide">
    <h1>transition:animate="slide"</h1>
    <p><a href="/">go home</a></p>
  </body>
</html>
```

### 動き

[Youtube](https://www.youtube.com/watch?v=yn8RlDJK-QI)にアップロードしました  
なめらかに遷移して楽しかったです

#### 参考

[Astro v3 へのアップグレード](https://docs.astro.build/ja/guides/upgrade-to/v3/)
