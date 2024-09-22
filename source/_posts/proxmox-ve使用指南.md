---
title: proxmox-ve使用指南
tags:
  - 虚拟化
categories:
  - linux
  - proxmox ve
toc: true
abbrlink: 7f78562b
date: 2024-09-21 00:12:38
cover:
thumbnail:
---


## 概述

> 

<!--more-->

## proxmox-ve 使用  
- 防火墙配置:`/etc/pve/firewall/cluster.fw`  
- 查看状态/开启/关闭防火墙:`pve-firewall status/start/stop`  

## proxmox-ve制作镜像模版。
### ubuntu镜像模板

```bash
VM_ID=111
qm create $VM_ID --memory 1024 --net0 virtio,bridge=vmbr0

qm importdisk $VM_ID /var/lib/vz/template/iso/jammy-server-cloudimg-amd64-disk-kvm.img local-lvm
qm set $VM_ID --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-$VM_ID-disk-0
qm set $VM_ID --ide0 local-lvm:cloudinit
qm set $VM_ID --boot c --bootdisk scsi0
qm set $VM_ID --serial0 socket --vga serial0
qm set $VM_ID --ciuser root --cipassword 123456
qm set $VM_ID --nameserver 114.114.114.114 --ipconfig0 ip=dhcp,ip6=dhcp

qm start $VM_ID

# 配置root登录,编辑/etc/ssh/sshd_config
# PermitRootLogin yes
# PubkeyAuthentication yes

# 开启PasswordAuthentication认证，编辑/etc/cloud/cloud.cfg这个文件，添加 ssh_pwauth：true,如下图：
# root@ubuntu:~# cat /etc/ssh/sshd_config.d/50-cloud-init.conf
# PasswordAuthentication yes

# 在/etc/apt/sources.list.d创建一个名为tsinghua.sources的文件，添加如下内容：
# cat >>/etc/apt/sources.list.d/tsinghua.sources<<eof-
# Types: deb
# URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
# Suites: noble noble-updates noble-backports
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# Types: deb
# URIs: http://security.ubuntu.com/ubuntu/
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
# eof


qm template $VM_ID

for id in $(seq 3 1 9)
do
qm clone 111 24${id} --name demo-vm${id} -full true -storage local-lvm
qm set 24${id} --sockets 2 --cores 2 --memory 4096
qm set 24${id} --scsi1 iothread=1,local-lvm:100
qm set $VM_ID  --ciuser root --cipassword 123456
qm start 24${id}
done

```