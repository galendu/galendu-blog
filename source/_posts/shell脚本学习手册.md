---
title: shell脚本学习手册
toc: true
tags: shell
categories:
  - linux
  - shell
abbrlink: 38836
date: 2024-03-16 21:41:06
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
>推荐书籍：《The AWK Programming Language》 by Alfred V. Aho, Brian W. Kernighan, Peter J. Weinberger。  
>在线教程：[AWK Tutorial](https://www.grymoire.com/Unix/Awk.html)。  
### 案例一 
将a.txt中的数据处理为b.txt中的形式  
a.txt  
```text
列1  列2  列3
x1   a1    xy1
x2   a2    xy1
x3   a2    xy2
x4   a1    xy2
x5   a2    xy3
x6   a1    xy3
```  
b.txt  
```text
列3	a1	a2
xy1	x1	x2
xy2	x4	x3
xy3	x6	x5
```

```bash
awk '
BEGIN { # BEGIN 块中的代码在处理任何输入行之前执行一次。
    FS = "[ \t]+";  # 设置输入字段分隔符为空格或制表符
    OFS = "\t";     # 设置输出字段分隔符为制表符
    print "列3", "a1", "a2";  # 输出文件头
}
NR > 1 { # 处理每一行输入时执行，但跳过第一行（通常是表头行）。
    key = $3;  # 以第三列的值作为键
    if ($2 == "a1") {
        data[key]["a1"] = $1;  # 如果第二列为 a1，存入对应键的 a1 子段
    } else if ($2 == "a2") {
        data[key]["a2"] = $1;  # 如果第二列为 a2，存入对应键的 a2 子段
    }
}
END { # END 块中的代码在处理完所有输入行之后执行一次。
    for (key in data) {
        print key, data[key]["a1"], data[key]["a2"];  # 遍历 data 数组中的每一个键，并打印键值和对应的 a1 和 a2 子段值。
    }
}
' a.txt > b.txt
```
## 7.sed  


