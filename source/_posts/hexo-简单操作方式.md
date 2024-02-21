---
title: hexo 简单操作方式
date: 2024-01-29 13:41:24
tags:
---
## git 
### git更新代码  
`git add . && git commit -m "xxx" && git push` 

## hexo
### hexo操作命令  
- 创建新帖子或新页面`hexo new [layout] <title>` post是默认的layout,可以通过编辑_config.yaml中的default_layout修改  
- 本地启动部署`hexo clean && hexo g && hexo s`  
- 远程部署更新`hexo d -g`  
- 通过git上传到github,并自动更新到站点(通过github action实现)`git add . && git commit -m "xxx" && git push`  
