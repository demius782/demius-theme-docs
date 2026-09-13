---
title: "Demius主题Umami统计数据页面使用文档和说明"
draft: false
slug: 5lk9peiw
date: 2025-10-28T21:38:24+08:00
categories: ["主题页面"]
tags: ["umami", "数据页面"]
cover: https://mpimg.cn/view.php/1c32681e719a7c10d676674e3a1acf8e.jpg
---

## 使用文档

umami是基于nodejs开发的，使用文档请参考[官方文档](https://umami.is/docs/installation)

## Demius主题集成umami统计

要么已经在官方网站注册了，要么自己创建了umami的服务端，建议自建

关于umami的使用去看官方文档，这里只说一下Demius主题集成umami统计数据页面的步骤

### 获取Umami网站的API服务

首先进入Hoppscotch（或者任意一个Postman类似工具）获取token

请求路径：https://你的地址/api/auth/login，注意POST请求

![](https://tc.demius.tech/i/2025/09/14/68c68c30370cb.webp)

下载并修改umami/info.php

[蓝奏云下载].(https://wwwc.lanzoue.com/iJ3IG39kp84f). 密码:d3pa

更改地址、token和网站id，然后部署到网站的php项目中即可

```
// 配置 Umami API 的凭据
$apiBaseUrl = '你的统计网站的域名';
$token = '你的token';
$websiteId = '你的Umami网站上的添加的网站id';

```

使用1panel面板创建一个php项目，打开站点网站目录，上传info.php文件，将php文件重命名为index.php，否则会因为找不到启动文件出现403错误，配置好后访问域名，出现下面这个界面代表成功：

![](https://tc.demius.tech/i/2025/09/14/68c6910f56f53.webp)

到这步就完成了，然后在主题的配置中开启umami统计，然后在页面中使用umami统计数据页面即可

## hugo.toml中配置===== Umami统计配置 =====
[params.analytics]
  [params.analytics.umami]
    enable = true                          # 是否启用Umami统计
    scriptUrl = "https://你的umami域名/script.js"  # Umami统计脚本地址
    websiteId = "你的umami网站id"  # 网站ID
    # 数据页面展示配置
    showInDataPage = true                  # 是否在数据页面显示统计数据
    apiUrl = "你用来作为数据页面展示的API地址，就是上面刚才部署的info.php的域名"  # 统计数据API地址

