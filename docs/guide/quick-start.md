---
title: 快速开始
icon: rocket
---

# 快速开始

Demius 是一款面向个人博客的 Hugo 主题。完成下面三步即可启动一个最小站点：安装主题、设置 `hugo.toml`、运行本地预览。

## 安装主题

### Git 子模块

```bash
git submodule add https://github.com/demius782/demius themes/demius
```

### Hugo Modules

```bash
hugo mod init github.com/your-name/your-site
echo 'module = "github.com/demius782/demius"' >> hugo.toml
hugo mod get github.com/demius782/demius
```

### 直接下载

从 [Demius Releases](https://github.com/demius782/demius/releases) 或 `main` 分支下载主题，并解压到站点的 `themes/demius` 目录。

## 最小配置

在站点根目录创建 `hugo.toml`：

```toml
baseURL = 'https://your-domain.com'
languageCode = 'zh-CN'
title = '我的 Demius 博客'
theme = 'demius'
defaultContentLanguage = 'zh'
hasCJKLanguage = true

[params]
  author = '你的名字'
  description = '使用 Demius 构建的博客'
```

## 启动预览

```bash
hugo server -D
```

打开 `http://localhost:1313/`，保存 Markdown 后页面会自动刷新。

## 下一步

- 先阅读[配置参考总表](configuration-reference.html)，了解配置入口。
- 再按需查阅[功能指南](features.html)。
- 需要修改主题时，阅读[开发维护总览](development.html)。
