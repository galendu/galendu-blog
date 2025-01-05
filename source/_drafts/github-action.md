---
title: github-action
toc: true
date: 2025-01-05 22:20:00
tags:
categories:
cover:
thumbnail:
---

## 概述

> https://docs.github.com/en/rest/using-the-rest-api  


<!--more-->

## 案例  
### 通过github接口触发手动流水线并下载制品到本地  

```bash
#!/bin/bash

# GitHub仓库信息
REPO_OWNER="galendu"
REPO_NAME="private"
WORKFLOW_ID="sing-box.yml"
BRANCH="main"
GITHUB_TOKEN="替换为自己使用的token"

# 触发GitHub Actions
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/workflows/$WORKFLOW_ID/dispatches \
  -d "{
	\"ref\": \"$BRANCH\",
	\"inputs\": {
		\"subscriptionAddress\": \"替换订阅地址\",
		\"stencilFile\": \"https://raw.githubusercontent.com/galendu/rule/refs/heads/master/config/singbox/config_tproxy_local.json\"
	}
}"
[ $0==0 ] && echo "${REPO_NAME}流水线触发成功"
# 等待流水线运行完成（需要根据实际需求添加延迟或轮询逻辑）
sleep 40
# 获取流水线制品
ARTIFACTS_URL=$(curl -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs | jq -r '.workflow_runs[0].artifacts_url')
[ $0==0 ] && echo "${REPO_NAME}获取流水线制品成功"
# 下载制品
curl -L -H "Authorization: token $GITHUB_TOKEN" $ARTIFACTS_URL | jq -r '.artifacts[].archive_download_url' | while read url; do
  curl -L -O -H "Authorization: token $GITHUB_TOKEN" "$url"
done
```
