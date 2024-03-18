---
title: shell脚本学习手册
toc: true
date: 2024-03-16 21:41:06
tags: shell
categories: 
- linux
- shell
cover:
thumbnail:
---


## 概述

> shell脚本学习手册  

<!--more-->

## 1.shell脚本基础  
### 1.1.shell脚本中特殊变量`$0、$?、$!、$$、$*、$#、$@`等的意义  
名称|意义
:--|:-- 
$$|shell本身的PID
$!|shell最后运行的后台进程的PID
$?|shell最后运行的命令的返回值
$-|shell使用Set命令设定的Flag
$*|所有参数列表,单个字符串 "$1 $2 $3"
$@|所有参数列表,多个字符串 "$1" "$2" "$3"
$#|传入的参数个数
$0|shell脚本的文件名
$1-$n|shell脚本传入的第n个参数

### 2.执行bash shell脚本时,常用的参数  
- -n，读一遍脚本中的命令但不执行，用于检查脚本中的语法错误。
- -v，一边执行脚本，一边将执行过的脚本命令打印到标准输出。
- -x，提供跟踪执行信息，将执行的每一条命令和结果依次打印出来。

## 2.流程控制   
## 3.shell函数与数组  
## 4.shell正则表达式  
## 5.grep  
## 6.awk  
## 7.sed  






<nav class="nav">
  <!-- 導覽列容器 -->
  <div class="nav-left">
    <!-- 對齊方式：置左 -->
    <a href="" clas="nav-item"
      ><!-- 元素 -->
      <h1 class="title is-4">Askie Lin</h1>
      <!-- 標題 -->
    </a>
  </div>
  <div class="nav-right nav-menu">
    <!-- 對齊方式：置右，是一個選單 -->
    <a href="" clas="nav-item">A</a
    ><!-- 元素 -->
    <a href="" clas="nav-item">B</a
    ><!-- 元素 -->
    <a href="" clas="nav-item">C</a
    ><!-- 元素 -->
  </div>
</nav>
