---
title: git正确使用github工作流
toc: true
date: 2024-05-11 21:31:54
tags:
categories:
cover:
thumbnail:
---

## 概述

> git正确使用github工作流。

<!--more-->

## 正文

## 具体使用  
1. remote master到本地  
git clone xxx.git
2. 建立my-feature分支  
git checkout -b my-feature
3. git diff查看修改了的文件
4. git add <changed_file> 将文件放到暂存区,想要commit
5. git commit 将文件放到git,local git会增加一个commit
6. git push origin my-feature,发现main branch多了update这个commit
7. 测试my-feature在新的update更新下,是否仍然好用
8. 将 main branch中的更新同步到my-feature branch中
9. 更新local branch
10. git checkout main
11. git pull origin main
12. git checkout my-feature
13. git rebase main 把main最新的修改拿过来,在这个最新修改的基础之上,再把我的commit给尝试弄回去
14. 过程中可能出现rebase conflict,需要手动去选择要那段代码
15. 更新完my-feature branch之后,git push origin my-feature 把local git里面这个branch push到github上
16. 由于做了rebase,应该执行 git push -f origin my-feature
17. 合并代码到main pull request,squash and merge,属于git server上操作(gitlab)
18. squash作用是为了保证main分支里面的commit简洁,并可用
19. git checkout main
20. git branch -D my-feature,从本地删除my-feature分支
21. git pull origin main,更新本地代码为最新的代码