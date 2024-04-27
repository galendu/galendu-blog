---
title: grpc学习
toc: true
date: 2024-04-27 14:48:50
tags: grpc
categories:
cover:
thumbnail:
---


## 概述

> grpc学习。

<!--more-->

## 正文

## 安装 
### 安装protoc  
安装 protoc，protoc是protobuf编译器，可以将源文件xxx.proto 编译成开发语言文件 ,例如xxx.pb.go
下载 https://github.com/protocolbuffers/protobuf/releases/download/v3.20.0/protoc-3.20.0-win64.zip  

- 解压protoc-3.20.0-win64.zip
- 将 protoc-3.20.0-win64.zip/bin设置为环境变量  

### 安装protoc-gen-go-grpc 和 protoc-gen-go
因为protoc没有内置go生成器，想实现.proto"..go的转换的话还需要安装protobuf的golang编译器插件protoc-gen-go，用于生成go文件  
```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

### 验证 protoc-gen-go-grpc 和 protoc-gen-go    
```bash
protoc-gen-go-grpc --version
protoc-gen-go --version
```

## grpc使用
### 定义proto文件xxproject/proto/message.proto
```proto
syntax = "proto3"
// 定义生成的go文件存储在那个目录那个包中,../pb代表在当前目录的上一级pb目录中生成,
//pb代表了生成的go文件的包名是message
option go_package = "../pb;pb";
// 顶一个一个service,称为MessageSender,这个服务有一个rpc方法,名为Send。
// 这个方法会发送一个MessageRequest,然后返回一个MessageResponse
message MessageResponse {
    string responseSomething = 1;
}

message MessageRequest {
    string saySomething = 1;
}

service MessageSender {
    rpc Send(MessageRequest) returns (MessageResponse) {}
}

```

### 根据proto文件生成go代码文件, xxproject/proto/
```bash
# 生成message.pb.go message_grpc.pb.go 两个文件.
# 在这两个文件中,包含了我们定义方法的go语言实现,也包含了我们定义域响应的go语言实现.
protoc --go_out=. message.proto
protoc --go-grpc_out=. message.proto
# protoc --go_out=. --go-grpc_out=. message.proto
```

### server端响应实现(实现proto中的方法) xxproject/serviceImpl/MessageSenderServerImpl.go
```go
package serviceImpl

import (
	"context"
	"log"
	"xxproject/pb"
)

// pb.UnimplementedMessageSenderServer结构体实现了MessageSenderServer接口
// 通过嵌套的方式,我们自己定义的结构体也实现了MessageSenderServer接口
// 实现后,我们就可以重写proto定义的rpc方法
// 通过这种方式在rpc方法中写入我们的业务逻辑
type MessageSenderServerImpl struct {
	*pb.UnimplementedMessageSenderServer
}

func (MessageSenderServerImpl) Send(context context.Context, request *pb.MessageRequest) (*pb.MessageResponse, error) {
	//打印请求参数
	log.Println("receive message:", request.SaySomething)
	//处理响应
	resp := &pb.MessageResponse{}
	resp.ResponseSomething = "this is grpc server, roger that"
	return resp, nil
}
```

### server端启动gRPC服务,xxproject/server/server.go
```go
package main

import (
	"google.golang.org/grpc"
	"log"
	"net"
	"xxproject/pb"
	"xxproject/serviceImpl"
)

func main() {
	//new一个grpc服务
	srv := grpc.NewServer()
	//注册服务
	pb.RegisterMessageSenderServer(srv, serviceImpl.MessageSenderServerImpl{})
	//启动服务
	listener, err := net.Listen("tcp", ":8002")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	err = srv.Serve(listener)
	if err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

```

### client端发起请求, xxproject/client/client.go
```go
package main

import (
	"context"
	"google.golang.org/grpc"
	"log"
	"xxproject/pb"
)

func main() {
	//建立grpc连接
	conn, err := grpc.Dial("127.0.0.1:8002", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	//new grpc client
	client := pb.NewMessageSenderClient(conn)
	//发起grpc请求
	resp, err := client.Send(context.Background(), &pb.MessageRequest{
		SaySomething: "hello world",
	})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Println("receive message:", resp.GetResponseSomething())

}

```