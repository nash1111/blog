---
title: supabase cliでdumpを作成する手順
date: "2023-09-16"
tags: ["supabase"]
locale: "jp"
---

#### 準備
PROJECT_REFにprojec-refを入れます  
projectの名前とは別で、対象のprojectにダッシュボートでアクセスした時の```project/```移行がproject-refです  
例  
```https://supabase.com/dashboard/project/{project-ref}```
```bash
export PROJECT_REF=project-ref
```

#### 手順
```bash
# install supabase cli
brew install supabase/tap/supabase
# login
supabase login
# link project
supabase link --project-ref PROJECT_REF
# dump data, default=schema only
supabase db dump --data-only -f supabase/dump.sql
```