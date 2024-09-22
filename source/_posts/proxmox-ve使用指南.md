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
VM_ID=901
qm create $VM_ID --memory 1024 --net0 virtio,bridge=vmbr0

qm importdisk $VM_ID /var/lib/vz/template/iso/jammy-server-cloudimg-amd64-disk-kvm.img local-lvm
qm set $VM_ID --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-$VM_ID-disk-0
qm set $VM_ID --ide0 local-lvm:cloudinit
qm set $VM_ID --boot c --bootdisk scsi0
qm set $VM_ID --serial0 socket --vga serial0
qm set $VM_ID  --agent enabled=1
qm set $VM_ID --ciuser root --cipassword 123456
qm set $VM_ID --nameserver 114.114.114.114 
# qm set $VM_ID --ipconfig1 ip=192.168.3.241/24,gw=192.168.3.1
qm set $VM_ID --ipconfig0 ip=dhcp,ip6=dhcp #动态配置

qm start $VM_ID

# 配置root登录,编辑/etc/ssh/sshd_config
# PermitRootLogin yes
# PubkeyAuthentication yes

# 开启PasswordAuthentication认证，编辑/etc/cloud/cloud.cfg这个文件，添加 ssh_pwauth：true,如下图：
# root@ubuntu:~# cat /etc/ssh/sshd_config.d/50-cloud-init.conf
# PasswordAuthentication yes
systemctl restart sshd
# 在/etc/apt/sources.list.d创建一个名为tsinghua.sources的文件，添加如下内容：
cat >>/etc/apt/sources.list.d/tsinghua.sources<<eof
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
eof

# 扩容分区
# root@VM901:/etc/apt# parted /dev/sda
# GNU Parted 3.4
# Using /dev/sda
# Welcome to GNU Parted! Type 'help' to view a list of commands.
# (parted) resizepart 1                                                     
# Warning: Not all of the space available to /dev/sda appears to be used, you can fix the
# GPT to use all of the space (an extra 62914560 blocks) or continue with the current
# setting? 
# Fix/Ignore?                                                               
# Fix/Ignore? Fix
# Partition number? 1                                                       
# Warning: Partition /dev/sda1 is being used. Are you sure you want to continue?
# Yes/No? Yes                                                               
# End?  [2361MB]? 30720 
partprobe /dev/sda
resize2fs /dev/sda1
apt update 
# 安装 qemu-guest-agent
apt install qemu-guest-agent -y
systemctl start qemu-guest-agent && systemctl enable qemu-guest-agent
qm set 901 --ipconfig0 ip=192.168.3.91/24,gw=192.168.3.1
history -c && init 0
qm template $VM_ID

for id in $(seq 1 1 8)
do
qm clone 901 24${id} --name demo-vm24${id} -full true -storage local-lvm
qm set 24${id} --sockets 2 --cores 2 --memory 4096
qm set 24${id} --scsi1 iothread=1,local-lvm:100
qm set 24${id} --ciuser root --cipassword 123456
qm set 24${id} --ipconfig0 ip=192.168.3.24${id}/24,gw=192.168.3.1
qm set 24${id} --nameserver 114.114.114.114 
qm start 24${id}
done

```