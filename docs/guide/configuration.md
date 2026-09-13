---
title: 配置入口
icon: sliders
---

# 配置入口

Demius 的站点配置集中在 `hugo.toml` 与 `data/` 目录。建议先确定站点基础信息，再逐步开启功能模块。

## 基础站点信息

```toml
baseURL = 'https://your-domain.com'
languageCode = 'zh-CN'
title = '站点标题'
theme = 'demius'
copyright = '© 2026 站点名称'

[params]
  author = '作者名称'
  description = '站点描述'
  darkMode = true
  stickyHeader = true
  tocOpen = true
```

## 内容与数据

- 文章放在 `content/posts/`，使用 Markdown 编写。
- 页面型功能通过 `content/*.md` 与主题布局配合。
- 结构化内容放在 `data/`，例如轮播图、友链、相册与装备。
- 图片和其他静态文件放在 `static/`，通过 `/` 根路径引用。

## 配置建议

1. 保持 `baseURL` 与正式域名一致，避免 canonical 和 RSS 地址错误。
2. 使用 `hasCJKLanguage = true`，让 Hugo 正确处理中文断词与字数统计。
3. 复杂模块按功能拆分配置，避免在一个文件中重复定义同名参数。
4. 修改主题后先执行 `hugo --gc --minify`，再检查首页、文章页和移动端布局。

完整参数索引见[配置参考总表](configuration-reference.html)。
