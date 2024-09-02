---
title: terraform学习
toc: true
abbrlink: 603d1a10
date: 2024-09-03 00:42:47
tags:
categories:
cover:
thumbnail:
---


## 概述

> terraform学习。

<!--more-->

## 正文

>https://developer.hashicorp.com/terraform/language/resources/provisioners/syntax

### terraform之provisioner
```tf
resource "aws_instance" "app_server" {
  count = var.instance_count

  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.ec2_instance_type
  key_name = "galendu-key"
  user_data_base64 = "IyEvYmluL2Jhc2gNCnN1ZG8geXVtIHVwZGF0ZSAteQ0Kc3VkbyB5dW0gaW5zdGFsbCAteSBhbWF6b24tbGludXgtZXh0cmFzDQpzdWRvIHl1bSBpbnN0YWxsIG5naW54IC15DQpzdWRvIHN5c3RlbWN0bCBlbmFibGUgbmdpbngNCnN1ZG8gc3lzdGVtY3RsIHN0YXJ0IG5naW54DQpFT0Y="

  tags = var.resource_tags

  provisioner "file" {
    source = "./conf/nginx.conf"
    destination = "/etc/nginx/nginx.conf"
  }

  # provisioner "file" {
  #   source      = "./conf/nginx.conf"
  #   destination = "/etc/nginx/nginx.conf"

  #   connection {
  #     type        = "ssh"
  #     host        = self.public_ip
  #     user        = "ec2_user"
  #     private_key = file("./.keys/galendu-key.pem")
  #     timeout     = "4m"
  #   }
  # }

  provisioner "remote-exec" {
    inline = [
      "sudo systemctl restart nginx",
      "sudo ls /usr/share/nginx/html/",
    ]
  }

}

```