---
title: windows命令行下使用msiexec安装、修复、卸载软件
tags: windows
categories:
  - Windows
toc: true
abbrlink: 49b8b311
date: 2024-09-01 22:14:39
cover:
thumbnail:
---


## 概述

>  windows命令行下使用msiexec安装、修复、卸载软件。

<!--more-->

## 简介  
msiexec 是 Windows 操作系统中用于安装、修复、卸载 Windows Installer (MSI) 文件的命令行工具。  

## 基本语法和用法
### `msiexec`基本语法  
`msiexec  /option [arguments]`  
其中`/option`是指定的操作选项，可以是安装、修复、卸载等。  
**常用操作选项**  
- **安装 MSI 文件：** 
  `msiexec /i path\to\installer.msi`   
    - `/i`指定安装操作。
    - `path\to\installer.msi`是MSI文件的路径。  

  **示例：**    
    `msiexec /i C:\path\to\installer.msi`  

- **卸载 MSI 文件：**
  `msiexec /x {ProductCode}`
    - `/x` 指定卸载操作。
    -  `{ProductCode}` 是安装时生成的产品代码，通常是一个 GUID。
  
  **示例：**

  `msiexec /x {AC28B3A3-0A94-4A70-B5A0-D87A8A42C6E3}`  

- **修复已安装的程序：**

  `msiexec /f {ProductCode}`  
    - `/f` 指定修复操作。
  
  **示例：**
  `msiexec /f {AC28B3A3-0A94-4A70-B5A0-D87A8A42C6E3}`

- **静默安装：**
使用 /quiet 或 /qn 选项可以进行静默安装，即无需用户交互地完成安装过程。

   `msiexec /i path\to\installer.msi /quiet`
**示例：**
`msiexec /i C:\path\to\installer.msi /quiet`

**其他选项和参数**  
- `/l*vx logfile.txt`：生成安装日志文件。
- `/norestart`：安装完成后不重新启动计算机。
- `/passive`：显示进度条，但无需用户输入。




