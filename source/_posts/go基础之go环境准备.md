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

### goland破解之2019.2.3   

将解压包中的jar包复制到F:\project\GoLand 2019.2.3\lib目录
在 Goland 安装目录的 bin 目录下找到goland.exe.vmoptions和goland64.exe.vmoptions两个文件。用记事本将它们打开，并分别在两个文件的最后面追加-javaagent:Goland 的安装目录\lib\jetbrains-agent.jar，注意将路径修改成你电脑上 Goland 的安装目录，例如：-javaagent:F:\project\GoLand 2019.2.3\lib\jetbrains-agent.jar，修改完成后记得保存。

运行Goland进入激活界面，选择Active，选择激活码激活，将解压的激活码打开复制到文本框中，然后OK即可。

![](../img/2024-04-18-21-05-33.png)


### go安装常见问题  
>goland中使用高版本的go时出现高版本无法识别的问题,报错"The selected directory is not a valid home for Go Sdk"

zversion.go中添加要使用的sdk版本const TheVersion = `go1.22.2`

### goland破解之2024.2.3  
- [下载jetbra.zip包](https://galendu.github.io/file/jetbra.zip)  

- 安装最新版2024.2.3的goland    
https://www.jetbrains.com/go/

- 破解  
1. 文件路径如图所示  
![](../img/go基础之go环境准备_images/bbf37f3d.png)  
2. 卸载，防止历史运行过该脚本文件  
![](../img/go基础之go环境准备_images/b50aad1f.png)
![](../img/go基础之go环境准备_images/ab72e5e6.png)
3. 安装
![](../img/go基础之go环境准备_images/d89ee06a.png)
![](../img/go基础之go环境准备_images/385a3329.png)
4. 输入license 
```txt
X9MQ8M5LBM-eyJsaWNlbnNlSWQiOiJYOU1ROE01TEJNIiwibGljZW5zZWVOYW1lIjoiZ3VyZ2xlcyB0dW1ibGVzIiwiYXNzaWduZWVOYW1lIjoiIiwiYXNzaWduZWVFbWFpbCI6IiIsImxpY2Vuc2VSZXN0cmljdGlvbiI6IiIsImNoZWNrQ29uY3VycmVudFVzZSI6ZmFsc2UsInByb2R1Y3RzIjpbeyJjb2RlIjoiSUkiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJBQyIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlBTIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiRFBOIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiR08iLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJDTCIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRNIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUlMwIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiRFMiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSQyIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJEIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUEMiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSU1UiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSTSIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IldTIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiREIiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJEQyIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJTViIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUENXTVAiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBTSSIsImZhbGxiYWNrRGF0ZSI6IjIwMjYtMDktMTQiLCJwYWlkVXBUbyI6IjIwMjYtMDktMTQiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUlNGIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJSU0MiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlJTIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQREIiLCJmYWxsYmFja0RhdGUiOiIyMDI2LTA5LTE0IiwicGFpZFVwVG8iOiIyMDI2LTA5LTE0IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IkRQIiwiZmFsbGJhY2tEYXRlIjoiMjAyNi0wOS0xNCIsInBhaWRVcFRvIjoiMjAyNi0wOS0xNCIsImV4dGVuZGVkIjp0cnVlfV0sIm1ldGFkYXRhIjoiMDEyMDIzMTIwOUxQQUEwMDEwMDkiLCJoYXNoIjoiVFJJQUw6MjAxNi4xIiwiZ3JhY2VQZXJpb2REYXlzIjozLCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-YfGjX3wBpN0BKpIiuZdyG/NN4z8pLpOfzOjodnAqFomZafC0nTu5hRDMSkTB9Lrhfhl+5Mr8nC2BlFubcrLq3QzJRuAIinZ0DboIZhYLdnJhk3shg+qza6mnfUpwg0Cpq/TjlSO1Ov05JEBb6DeYqx4wBFeW0EbQcavJ8QiHMvrcQPkyD6oYvmU6QodraR9ILIYLKxKFra/Yg+tDWMoiTJ5sQ8DSzMsSrv4oCYvuP6Wu5qpQlxwY3sSy74BQ048PWJlnIoJNLnpd5x5A205Kze8tFyIu3Sm51KFZnC3GQUHlGloXwVHPI+ZHYghehPMcsCOpPlgOSRzFNw95gFzoYQ==-MIIETzCCAjegAwIBAgIEU7kY4jANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTIyMTAxMDE2MDU0NFoXDTI0MTAxMTE2MDU0NFowHzEdMBsGA1UEAwwUcHJvZDJ5LWZyb20tMjAyMjEwMTAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCx0QBxb4pfhYqM/RjSsvizyIncjO1EwCRgxPbKCcRFSY3ANBzS3hUdBzIxNuVbEPlnw50ItAn1iUwlyQ3QC7T+aG9E2R3IIIfEppb4F2SBi3YtgcZc3IrLgz8wa2p0iWTkkbFwnJxD4jMBfw9HDDbS5r9d9HVcPDH0rA+4nNIm7yek0wU6D77KJUWcNm7QHJfLeJAoOno+G3UIsnu7f63XRGkvdxK7L/WFzD9hCfSwZqmPZkCcrDLJTBdU4UpoJrfIoSeXZ+ssrSdQ9qY0JfUmRWvJNuUKeDBv6TI3ZCipJeZzXXafE7xD3Q57YS6KlIJEUzjZ2CRJIK3Zu5aqUTHbAgMBAAGjgZkwgZYwSAYDVR0jBEEwP4AUo562SGdCEjZBvW3gubSgUouX8bOhHKQaMBgxFjAUBgNVBAMMDUpldFByb2ZpbGUgQ0GCCQDSbLGDsoN54TAJBgNVHRMEAjAAMBMGA1UdJQQMMAoGCCsGAQUFBwMBMAsGA1UdDwQEAwIFoDAdBgNVHQ4EFgQUQ0INJl2tuM1XlTAfueTuWydc7qIwDQYJKoZIhvcNAQELBQADggIBACzJFycVHjlSCEczoAHxgtF7NG4sDcpgmLh6nrMIZpDLLGc/whCv6vpcDkBo0XvuQwmZnbpf/Ndpy4ypP2OXIw94TlfOkGKVLdHDQU8ES1HpgAtscFtNg4dyZijF4pLgiK2nbCokvHI3oWQZY3ROswrjsh0HNHWdVKooEhWt3vBpXorusNRNWbwidznxySM5aABbHrlW0+EgXuLMEHBrybLu0QenEuTFZS3E91uSa7JLpU92aQyAmZUJAhogfIvssgwnmyfnOF3csixUV6lDBCf+SUGzQbYtZd/QsGI9uUUhBbLjoZnFhVEbbOntmB4/aUvSziZnbhRAY+OhVTrNX6GtXI03cAxVBk2Kh6DE62vBW3biBGHK5ClsQGW1f5RLWhqJh0d3EP6+dsAo2P3Ic5MCuspFwSfWoK3gNhvYlr57PNrzAWhBn6Od78RMaqg+dl+GHsm5sW5mbvXpvYNukEe1RHVIONl8OTKex1U12DeS4pAIA9aQxd1vYapmNdam3rnOQbynKLYa09aDPrWO5Y+LtaCix7TBmwXPtyCxBLK4S7EZ+FE7Xz322ulpKcvLZCTKBzUH5y62xHIcSijnxJfSU0W5UCApsnwochM5S6RPuVpvyQoBR5IX3Ugjw48jpuf2TGL/INWPHQ5AjK9ZNtWAfpkYc9w+AcNAa/v6J/Ha
```
![](../img/go基础之go环境准备_images/3d3e751e.png)  

5. 激活  
![](../img/go基础之go环境准备_images/64a68d05.png)