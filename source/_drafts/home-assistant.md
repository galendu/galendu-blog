---
title: home-assistant
toc: true
date: 2024-11-18 22:11:00
tags: 智能家居
categories: home-assistant
cover:
thumbnail:
---

## home-assistant

> 本文。

<!--more-->

## 系统初始化  
### ubuntu初始化
```bash
apt-get install curl openssh-server -y
#/etc/apt/sources.list.d/ubuntu.sources
#
## 阿里云
#Types: deb
#URIs: http://mirrors.aliyun.com/ubuntu/
#Suites: noble noble-updates noble-security
#Components: main restricted universe multiverse
#Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
# ubuntu VERSION="24.04.1 LTS
apt-get update -y
apt-get upgrade -y
# 配置静态网络
# cat /etc/netplan/50-cloud-init.yaml
#network:
#    ethernets:
#        enp0s3:
#            dhcp4: false
#            addresses: [192.168.10.3/24]
#            routes:
#              - to: default
#                via: 192.168.10.1
#            nameservers:
#              addresses: [114.114.114.114]
#    version: 2
netplan apply


docker run -itd  \
  --name homeassistant \
  --privileged   --restart=unless-stopped \
  -e TZ=Asia/Shanghai   -v /data/homeassistant:/config \
  --network=host homeassistant/home-assistant:2024.11

docker run -d \
  --name="home-assistant-supervisor" \
  --restart=unless-stopped \
  --privileged \
  -e "HOMEASSISTANT_HOST=homeassistant" \
  -v /data/homeassistant:/config \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --network host \
  homeassistant/amd64-hassio-supervisor:latest
```
### hacs安装  
```bash
mkdir /data/homeassistant/custom_components/hacs -p
cd /data/homeassistant/custom_components/hacs
wget https://github.com/hacs/integration/releases/latest/download/hacs.zip
unzip hacs.zip
```

## ubuntu


docker run -d \
--name="home-assistant-supervisor" \
--restart=unless-stopped \
--privileged \
-e "HOMEASSISTANT_HOST=homeassistant" \
-e "SUPERVISOR_SHARE=/mnt/data/supervisor" \
-e "SUPERVISOR_NAME=homeassistant" \
-v /data/homeassistant:/config \
-v /var/run/docker.sock:/var/run/docker.sock \
--network host \
homeassistant/amd64-hassio-supervisor


docker run -d \
--name="home-assistant-supervisor" \
--restart=unless-stopped \
--privileged \
-e "HOMEASSISTANT_HOST=homeassistant" \
-e "SUPERVISOR_SHARE=/mnt/data/supervisor" \
-e "SUPERVISOR_NAME=homeassistant" \
-v /mnt/data/homeassistant:/config \
-v /var/run/docker.sock:/var/run/docker.sock \
--network host \
homeassistant/amd64-hassio-supervisor:latest