---
title: terraform学习
toc: true
abbrlink: 603d1a10
date: 2024-09-03 00:42:47
tags: terraform
categories:
- devops
- terraform
cover:
thumbnail:
---


## 1 概述

> terraform学习。
>语法查询
>https://developer.hashicorp.com/terraform/language
>provider地址
>https://registry.terraform.io/browse/modules
<!--more-->

## 2 terraform 命令参考  
```text
命令       用途
terraform version 查看 Terraform 版本
terraform init 初始化 Terraform
terraform plan Terraform 执行计划
terraform apply 应用 Terraform
terraform show 检查 Terraform 状态
terraform output 查看输出变量的值
terraform graph 生成资源依赖图
terraform destroy 销毁资源
terraform workspace 管理 Terraform 工作区
terraform workspace new 新建工作区
terraform workspace list 列出工作区
terraform workspace select 切换工作区
terraform workspace delete 删除工作区
terraform get 下载或更新 Terraform 模块
terraform fmt 格式化 Terraform 代码
terraform validate 检查 Terraform 语法
terraform console Terraform 控制台
```
## 3 terraform使用  
### 3.1 编写Terraform配置  
#### 3.1.1 alias的使用    
- 多个 Azure 订阅管理: 如果你有多个 Azure 订阅，每个订阅可能有不同的资源组和资源，你可以通过不同的 alias 配置来管理它们
- 跨环境管理: 在开发、测试和生产环境中可能有不同的 Azure 订阅或账户，使用 alias 可以在同一个 Terraform 配置文件中管理这些环境的资源。    
```tf
terraform {
  required_version = "~> 1.1"
  required_providers {
    azurerm = {
      version = "~> 3.9.0"
    }
  }
}

provider "azurerm" {
  # 订阅id
  subscription_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  alias           = "sub1"
  features {}
}

provider "azurerm" {
  subscription_id = "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"
  alias           = "sub2" 
  features {}
}

resource "azurerm_resource_group" "rg" {
  provider = azurerm.sub1 # 使用别名为 sub1 的 Azure provider
  name     = "rg-sub1"
  location = "westeurope"
}

resource "azurerm_resource_group" "rg2" {
  provider = azurerm.sub2 # 使用别名为 sub2 的 Azure provider
  name     = "rg-sub2"
  location = "westeurope"
}
```
#### 3.1.2 使用check来验证基础设施    

```tf
check "response" {
  data "http" "webapp" {
    url      = "https://${azurerm_linux_web_app.app.default_hostname}"
    insecure = true
  }
  
  #通过检查http url地址访问状态码是否为200
  assert {
    condition     = data.http.webapp.status_code == 200
    error_message = "Web app response is ${data.http.webapp.status_code}"
  }
}
```
#### 3.1.3 depends_on的使用  
>https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on  
```tf
resource "azurerm_resource_group" "rg" {
  name     = "rgdep"
  location = "westeurope"
}

resource "azurerm_virtual_network" "vnet" {
  name                = "vnet"
  location            = "westeurope"
  resource_group_name = "rgdep"
  address_space       = ["10.0.0.0/16"]

  depends_on = [azurerm_resource_group.rg]

}
```

#### 3.1.4 函数upper的使用  
>函数upper的使用,将给定字符串中的所有大小写字母转换为大写  
>更多函数的使用参考:https://developer.hashicorp.com/terraform/language/functions/chomp 
```tf
#FOR CONDITION
resource "azurerm_resource_group" "rg-app" {
  name     = var.environment == "Production" ? upper(format("RG-%s", var.app_name)) : upper(format("RG-%s-%s", var.app_name, var.environment))
  location = "westeurope"
}
```
#### 3.1.5 环境变量local块的使用  
**示例1**  
```tf
resource "azurerm_public_ip" "pip" {
  name                = "IP-${local.resource_name}"
  location            = "westeurope"
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Dynamic"
  domain_name_label   = "mydomain"
}


locals {
  resource_name = "${var.application_name}-${var.environment_name}-${var.country_code}"
}

```
**示例2**  
>动态配置生成：适用于需要根据外部数据源（如 YAML 文件）动态生成资源配置的场景，避免硬编码每个子网的配置。
>模块化和复用：通过 dynamic 块可以实现资源配置的模块化和复用，尤其是在处理变化和扩展性较高的情况下。
```yaml

vnet: "myvnet"
address_space: "10.0.0.0/16"
subnets: 
- name: subnet1
  iprange: "10.0.1.0/24"
- name: subnet2
  iprange: "10.0.2.0/24"
```

```tf
locals {
  network = yamldecode(file("network.yaml"))
}
resource "azurerm_virtual_network" "vnet" {
  name                = local.network.vnet
  address_space       = [local.network.address_space]
  dynamic "subnet" { #动态生成子网
    for_each = local.network.subnets #遍历列表
    content { #content 块：content 块内部的配置会根据 for_each 迭代生成多个实例，每个实例代表一个子网。
      name           = subnet.value.name
      address_prefix = subnet.value.iprange
    }
  }
}

```

#### 3.1.6 output块的使用  
```tf
output "webapp_name" {
  description = "output Name of the webapp"
  value       = azurerm_app_service.app.name
}
```

#### 3.1.7 随机数的使用
>https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password    
```tf
resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "_%@"
}

# Create virtual machine
resource "azurerm_linux_virtual_machine" "myterraformvm" {
  name                            = "myVM"
  location                        = "westeurope"
  resource_group_name             = azurerm_resource_group.myterraformgroup.name
  network_interface_ids           = [azurerm_network_interface.myterraformnic.id]
  disable_password_authentication = false
  computer_name                   = "vmdemo"
  admin_username                  = "uservm"
  admin_password                  = random_password.password.result
  size                            = "Standard_DS1_v2"

  os_disk {
    name                 = "myOsDisk"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
```
```tf
resource "random_string" "random" {
  length  = 4
  special = false
  upper   = false
}
resource "azurerm_resource_group" "rg-app" {
  name     = "${random_string.random.result}"
}
```

#### 3.1.8 terraform_remote_state的使用  
```tf
provider "azurerm" {
  skip_provider_registration = true # skip registration
  features {} # features
}

# data "terraform_remote_state" "service_plan_tfstate" 用于从远程存储中获取 Terraform 状态信息。
data "terraform_remote_state" "service_plan_tfstate" { 
  backend = "azurerm" #远程后端
  config = { # config 区块包含了连接到远程状态存储所需的详细信息：
    resource_group_name  = "rg_tfstate"
    storage_account_name = "storstate"
    container_name       = "tfbackends"
    key                  = "serviceplan.tfstate"
  }
}
```

#### 3.1.9 variables的使用 

```tfvars
# 定义的location变量要符合validation中的要求
location            = "westeurope"
```
```tf
variable "location" {
  description = "The name of the Azure location"
  default     = "westeurope"
  type        = string
  validation {
    condition     = contains(["westeurope", "westus"], var.location)
    error_message = "The location must be westeurope or westus."
  }
}
```

### 3.2 使用Terraform扩展基础设施  
```tf
variable "nsg_rules" {
  description = "List of NSG rules"
  type = list(object({
    name                       = string
    priority                   = number
    direction                  = string
    access                     = string
    protocol                   = string
    source_port_range          = string
    destination_port_range     = string
    source_address_prefix      = string
    destination_address_prefix = string
  }))
}
```
```tfvars
nsg_rules = [
  {
    name                       = "rule1"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  },
  {
    name                       = "rule"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
]

```
```tf
resource "azurerm_network_security_group" "example" {
  name                = "acceptanceTestSecurityGroup1"
  dynamic "security_rule" {
    for_each = var.nsg_rules
    content {
      name                       = security_rule.value["name"]
      priority                   = security_rule.value["priority"]
      direction                  = security_rule.value["direction"]
      access                     = security_rule.value["access"]
      protocol                   = security_rule.value["protocol"]
      source_port_range          = security_rule.value["source_port_range"]
      destination_port_range     = security_rule.value["destination_port_range"]
      source_address_prefix      = security_rule.value["source_address_prefix"]
      destination_address_prefix = security_rule.value["destination_address_prefix"]
    }
  }
}

```

```tf
# 1.count
# 2.dynamics
# 3.filter_array
# 4.list_map
# 5.map
# 6.map_merge

```

### 3.3 

## 4 terraform之provisioner
```tf
resource "aws_instance" "app_server" {
  count = var.instance_count

  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.ec2_instance_type
  key_name = "galendu-key"
  user_data_base64 = "IyEvYmluL2Jhc2gNCnN1ZG8geXVtIHVwZGF0ZSAteQ0Kc3VkbyB5dW0gaW5zdGFsbCAteSBhbWF6b24tbGludXgtZXh0cmFzDQpzdWRvIHl1bSBpbnN0YWxsIG5naW54IC15DQpzdWRvIHN5c3RlbWN0bCBlbmFibGUgbmdpbngNCnN1ZG8gc3lzdGVtY3RsIHN0YXJ0IG5naW54DQpFT0Y="

  tags = var.resource_tags

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

  # provisioner "remote-exec" {
  #   inline = [
  #     "sudo systemctl restart nginx",
  #     "sudo ls /usr/share/nginx/html/",
  #   ]
  # }

  provisioner "local-exec" {
   command = "ps -ef"
  }

}

```

### 5 terraform之modules
>https://developer.hashicorp.com/terraform/tutorials/modules  

**示例代码** 

```bash
git clone https://github.com/hashicorp/learn-terraform-modules-create.git
 
cd learn-terraform-modules-create

terraform init
terraform plan
terraform apply
aws s3 cp modules/aws-s3-static-website-bucket/www/ s3://$(terraform output -raw website_bucket_name)/ --recursive
aws s3 rm s3://$(terraform output -raw website_bucket_name)/ --recursive
terraform destroy
```

## 5 terraform最佳实践  

### 5.1 terraform调试方法

- 配置调试日志  
  ```txt
  开启详细日志输出（环境变量 TF_LOG）
  Terraform 使用环境变量 TF_LOG 来控制日志级别。你可以设置不同的日志级别来获得不同程度的调试信息。

  日志级别：
  TRACE：最高级别的日志，提供最详细的信息。
  DEBUG：包含调试信息。
  INFO：默认的日志级别，提供较少的详细信息。
  WARN：仅记录警告信息。
  ERROR：仅记录错误信息。
  ```
- 检查语法是否正确  
`terraform validate`
- 检查格式是否正确  
`terraform fmt` 
- 查看可视化依赖,生成依赖图   
`terraform graph | dot -Tpng > graph.png` 
- 交互式命令行  
  ```txt
  terraform console
  > var.my_variable
  > aws_instance.example
  ```
- 模块调试  
  ```tf
  # 1.在模块中定义输出
  output "instance_id" {
    value = aws_instance.example.id
  }

  # 2.在根模块中引用这个输出
  module "my_module" {
    source = "./module"
  }

  output "module_instance_id" {
    value = module.my_module.instance_id
  }
  # terraform apply -autoapprove -target="moudle.my_module"
  ```
- terraform state 调试状态文件   
`terraform state show aws_instance.example`  
- terraform taint 标记资源重新创建  
`terraform taint aws_instance.example` 
- terraform refresh 刷新状态  
`terraform refresh`  


