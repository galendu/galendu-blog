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

> proxmox-ve使用指南

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
apt install --reinstall qemu-guest-agent
systemctl start qemu-guest-agent && systemctl enable qemu-guest-agent
qm set 901 --ipconfig0 ip=192.168.3.91/24,gw=192.168.3.2
history -c && init 0
qm template $VM_ID

for id in $(seq 1 1 8)
do
qm clone 1000 24${id} --name demo-vm24${id} -full true -storage local-lvm
qm set 24${id} --sockets 2 --cores 2 --memory 4096
qm set 24${id} --scsi1 iothread=1,local-lvm:100
qm set 24${id} --ciuser root --cipassword 123456
qm set 24${id} --ipconfig0 ip=192.168.3.24${id}/24,gw=192.168.3.2
qm set 24${id} --nameserver 114.114.114.114 
qm start 24${id}
done

```

```bash
# https://blog.margrop.net/post/proxmox-ve-daily-maintain/
# https://dev.to/asded_/deploying-your-kali-linux-templates-with-cloud-init-under-proxmox-ve-2ng7
7z x kali-linux-2024.3-qemu-amd64.7z 
   
virt-customize -a kali-linux-2024.3-qemu-amd64.qcow2 --install cloud-init
virt-customize -a kali-linux-2024.3-qemu-amd64.qcow2 --install qemu-guest-agent
virt-customize -a kali-linux-2024.3-qemu-amd64.qcow2 --run-command 'systemctl enable ssh.service'

qm importdisk 100 kali-linux-2024.3-qemu-amd64.qcow2 local-lvm  --format qcow2
```


## 使用terraform操作proxmox-ve  

**创建terraform用户**    
```bash
export PM_USER=terraform-prov@pve
export PM_PASS=123456
terraform_role=TerraformProv
pveum role add ${terraform-role} -privs "Datastore.AllocateSpace Datastore.AllocateTemplate Datastore.Audit Pool.Allocate Sys.Audit Sys.Console Sys.Modify VM.Allocate VM.Audit VM.Clone VM.Config.CDROM VM.Config.Cloudinit VM.Config.CPU VM.Config.Disk VM.Config.HWType VM.Config.Memory VM.Config.Network VM.Config.Options VM.Migrate VM.Monitor VM.PowerMgmt SDN.Use"
pveum user add ${PM_USER} --password ${PM_PASS}
pveum aclmod / -user ${PM_USER} -role ${terraform-role}

pveum role modify ${terraform-role} -privs "Datastore.AllocateSpace Datastore.AllocateTemplate Datastore.Audit Pool.Allocate Sys.Audit Sys.Console Sys.Modify VM.Allocate VM.Audit VM.Clone VM.Config.CDROM VM.Config.Cloudinit VM.Config.CPU VM.Config.Disk VM.Config.HWType VM.Config.Memory VM.Config.Network VM.Config.Options VM.Migrate VM.Monitor VM.PowerMgmt SDN.Use"
```

**provider配置**  

```tf
provider "proxmox" {
  pm_api_url = "https://proxmox-server01.example.com:8006/api2/json"
}
```
**terraform.tf**  
```tf
terraform {
  required_version = ">= 1.1.0"
  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = "= 3.0.1-rc4"
    }
  }
}
```
**main.tf文件定义创建虚拟机** 
```tf
provider "proxmox" {
  pm_api_url = "https://127.0.0.1:18006/api2/json"
}

resource "proxmox_vm_qemu" "proxmox-ubuntu" {
  count = var.instance_count
  vmid  = "${var.id+count.index}"
  name  = "ubuntu-${var.id+count.index}"
  desc  = "Ubuntu develop environment"
  # 节点名
  target_node = "pve"

  # cloud-init template
  clone      = "VM 901"
  full_clone = true

  cores   = 4
  sockets = 1
  # 内存
  memory = 4096
  agent   = 1
  os_type = "linux"
  onboot  = true

  network {
    model  = "virtio" # 网络设备类型
    bridge = "vmbr0"  # 桥接接口
  }
  ipconfig0 = "ip=${var.ips}.${var.id+count.index}/24,gw=${var.ips}.1"
  ciuser     = "root"
  cipassword = "123456"

}


variable "id" {
  description = "虚拟机的 ID"
  type        = number
  default     = 101
}

variable "instance_count" {
  type        = number
  default     = 5
  description = "description"
}

variable "ips" {
  type        = string
  default     = "192.168.3"
  description = "description"
}

```
