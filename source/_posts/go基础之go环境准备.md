---
title: go基础之go环境准备
toc: true
abbrlink: '94914928'
date: 2024-04-18 20:18:32
tags:
categories:
cover:
thumbnail:
---


## GO学习

> go环境准备。 
> https://youdianzhishi.com/web/course/1049/3235  

<!--more-->

## 正文

### windows环境安装golang    
1. 下载安装包: https://go.dev/dl/go1.22.2.windows-amd64.msi
2. 安装go1.22.2.windows-amd64.msi 
3. 配置GOROOT和GOPATH环境变量  
![](../img/2024-04-18-21-32-27.png)
![](../img/2024-04-18-21-30-55.png)
4. 配置go代理  
在cmd/powershell/git-bash执行下面的命令
```
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

### linux环境安装golang  
```bash
wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz
tar zxvf goxxx.tar.gz –C /usr/local
#在~/.bashrc文件中添加下面的内容
export GOROOT=/usr/local/go
export GOPATH=/data/go_path
export PATH=$PATH:$GOROOT/bin: :$GOPATH/bin
```
### vscode配置go开发环境  
#### 安装go插件
#### 安装go扩展依赖工具  
1. 打开命令面板: Shift + Ctrl + P
2. 输入: Install/Update 搜索 Go扩展依赖工具安装命令 
3. 安装失败后,执行下面的命令进行安装  
```bash
go install -v golang.org/x/tools/gopls@latest
go install -v honnef.co/go/tools/cmd/staticcheck@latest
go install -v github.com/go-delve/delve/cmd/dlv@latest
go install -v github.com/haya14busa/goplay/cmd/goplay@latest
go install -v github.com/josharian/impl@latest
go install -v github.com/fatih/gomodifytags@latest
go install -v github.com/cweill/gotests/gotests@latest
go install -v github.com/ramya-rao-a/go-outline@latest
go install -v github.com/uudashr/gopkgs/v2/cmd/gopkgs@latest
```

#### 配置shell环境  
![](../img/2024-04-18-21-15-36.png)

![](../img/2024-04-18-21-18-46.png)

在settings.json文件大括号中添加下面的内容
```json
    "terminal.integrated.automationProfile.windows": {
        "C:\\Program Files\\Git\\bin\\bash.exe"
    },
    "terminal.integrated.defaultProfile.windows": "Git Bash"
```
重启vscode, 可以看到默认打开Git Bash终端、也可选择其他终端
![](../img/2024-04-18-21-22-00.png)

### goland破解   

将解压包中的jar包复制到F:\project\GoLand 2019.2.3\lib目录
在 Goland 安装目录的 bin 目录下找到goland.exe.vmoptions和goland64.exe.vmoptions两个文件。用记事本将它们打开，并分别在两个文件的最后面追加-javaagent:Goland 的安装目录\lib\jetbrains-agent.jar，注意将路径修改成你电脑上 Goland 的安装目录，例如：-javaagent:F:\project\GoLand 2019.2.3\lib\jetbrains-agent.jar，修改完成后记得保存。

运行Goland进入激活界面，选择Active，选择激活码激活，将解压的激活码打开复制到文本框中，然后OK即可。

![](../img/2024-04-18-21-05-33.png)


### go安装常见问题  
>goland中使用高版本的go时出现高版本无法识别的问题,报错"The selected directory is not a valid home for Go Sdk"

zversion.go中添加要使用的sdk版本const TheVersion = `go1.22.2`
