---
title: "布局与视觉模式配置图鉴"
description: "Demius 主题首页布局、大图、背景、侧栏、字体与弹幕效果的截图及可复制配置。"
date: 2025-10-28T15:05:37+08:00
lastmod: 2026-09-15T00:00:00+08:00
draft: false
categories: ["主题布局"]
tags: ["Demius主题", "主页布局", "配置"]
cover: https://cfbed.demius.tech/file/demius/1761636465821_单栏布局.png
---

本页把主题展示图与实际配置项一一对应。除轮播内容写在 `data/carousel.yaml` 外，其余示例均修改站点根目录的 `hugo.toml`。

::: warning 合并配置，不要重复声明表
下面的代码是便于定位的独立片段。请把字段合并进已有的 `[params]`、`[params.carousel]` 等表中；同一个 TOML 表不要在一份配置文件里重复声明。图片和字体建议放在站点的 `static/img/`、`static/fonts/` 中，配置路径以 `/img/`、`/fonts/` 开头。
:::

## 配置速查

| 效果图 | 核心配置 |
| --- | --- |
| 单栏 / 双栏 / 瀑布流 | `params.homeColumns = 1 / 2 / 3` |
| 带轮播图 | `params.carousel.enable = true`，并配置 `data/carousel.yaml` |
| 中间栏大图 / 全屏大图 | `params.homeBigImage.mode = "mode1" / "mode2"` |
| 无背景图 | `params.background.site.enable = false` |
| 侧栏一体化 | `params.aside.unifiedMode = true` |
| 侧栏背景图 | 对每个可见组件设置 `enableBackground = true` |
| 全站字体 | `params.font.enable = true` |
| 全屏弹幕 | 同时配置 Artalk 和 `params.danmaku` |
| 背景全透明 | 同时开启文章卡片、文章页、侧栏和轮播图的透明选项 |

这些设置可以组合使用。截图中除了标题所指的主设置，还可能同时启用了暗色主题、整站背景图、轮播图或弹幕。

## 首页文章布局

普通首页效果应先关闭主页大图，再用 `homeColumns` 选择文章引擎。轮播图开关不会改变文章列数。

### 单栏 + 轮播图

![单栏-轮播图布局](https://cfbed.demius.tech/file/demius/1761636476152_单栏-轮播图布局.png)

```toml
[params]
  homeColumns = 1

[params.homeBigImage]
  enable = false

[params.carousel]
  enable = true
  height = 200
  autoplay = true
  interval = 5000
  direction = "horizontal"
  showOnPages = ["home"]
```

### 单栏

![单栏布局](https://cfbed.demius.tech/file/demius/1761636465821_单栏布局.png)

```toml
[params]
  homeColumns = 1

[params.homeBigImage]
  enable = false

[params.carousel]
  enable = false
```

### 双栏 + 轮播图

![双栏-轮播图布局](https://cfbed.demius.tech/file/demius/1761636170129_双栏-轮播图布局.png)

```toml
[params]
  homeColumns = 2

[params.homeBigImage]
  enable = false

[params.carousel]
  enable = true
  height = 200
  autoplay = true
  interval = 5000
  direction = "horizontal"
  showOnPages = ["home"]
```

### 双栏

![双栏布局](https://cfbed.demius.tech/file/demius/1761636175493_双栏布局.png)

```toml
[params]
  homeColumns = 2

[params.homeBigImage]
  enable = false

[params.carousel]
  enable = false
```

### 瀑布流

![瀑布流布局](https://cfbed.demius.tech/file/demius/1761636165272_瀑布流布局.png)

```toml
[params]
  homeColumns = 3

[params.homeBigImage]
  enable = false

[params.carousel]
  enable = false
```

### 瀑布流 + 轮播图

![瀑布流-轮播图布局](https://cfbed.demius.tech/file/demius/1761636159851_瀑布流-轮播图布局.png)

```toml
[params]
  homeColumns = 3

[params.homeBigImage]
  enable = false

[params.carousel]
  enable = true
  height = 200
  autoplay = true
  interval = 5000
  direction = "horizontal"
  showOnPages = ["home"]
```

### 轮播内容

开启轮播后，还需要新建或修改 `data/carousel.yaml`：

```yaml
items:
  - type: "image"
    image: "/img/carousel-1.jpg"
    title: "美丽风景"
    description: "探索世界的美好"
    link: "/posts/example/"

  - type: "post"
    slug: "article-slug"
```

`type: "post"` 的 `slug` 必须与目标文章 Front Matter 中的 `slug` 一致。更多参数见[轮播图配置指南](/guide/carousel-guide.html)。

## 主页大图

### 中间栏大图（Mode 1）

![中间栏大图模式](https://cfbed.demius.tech/file/demius/1761636206121_中间栏大图模式.png)

```toml
[params.carousel]
  enable = false

[params.homeBigImage]
  enable = true
  mode = "mode1"
  title = "字兮书"
  subtitle = "时间就是生命，Life is money，Money is life"

[params.homeBigImage.mode1]
  backgroundImage = "/img/home-banner.jpg"
  arrowAnimation = true
  scrollSpeed = 500
  cardAnimation = true
  cardAnimationSpeed = "normal"
```

Mode 1 只占中间内容栏，左右侧栏保持可见。点击大图或下箭头后会切换到由 `homeColumns` 决定的文章列表。

### 全屏大图（Mode 2）

![全屏大图模式](https://cfbed.demius.tech/file/demius/1761636186186_全屏大图模式.png)

```toml
[params.homeBigImage]
  enable = true
  mode = "mode2"
  title = "字兮书"
  subtitle = "时间就是生命，Life is money，Money is life"

[params.homeBigImage.mode2]
  fullScreen = true
  overlayOpacity = 0.5
  customBackgroundImage = "/img/fullscreen-bg.jpg"
  typewriterEnable = true
  typewriterSpeed = 100
  typewriterDelay = 1000
  typewriterCursor = true
  typewriterLoop = false
```

`customBackgroundImage` 留空时复用 `[params.background.site]` 的整站背景图。首屏显示大图，向下滚动或点击箭头后显示三栏内容；此时文章列表仍由 `homeColumns` 控制。

更多交互和参数见[主页大图配置指南](/guide/home-big-image-guide.html)。

## 整站背景

### 无背景图

![无背景图模式](https://cfbed.demius.tech/file/demius/1761636202713_无背景图模式.png)

```toml
[params.background]
  effect_mode = "solid"

[params.background.site]
  enable = false

[params.particleEffect]
  enable = false
```

关键字段是 `params.background.site.enable = false`。示例同时关闭粒子特效，以得到截图中的纯色页面；页面底色随明暗主题变化。

### 背景全透明

![背景全透明模式](https://cfbed.demius.tech/file/demius/1762591281873_背景全透明模式.png)

```toml
[params]
  postCardTransparentMode = true
  postCardTransparentType = "full"
  postPageTransparentMode = true
  postPageTransparentType = "full"

[params.background]
  effect_mode = "transparent"

[params.background.site]
  enable = true
  image = "/img/site-bg.jpg"
  blur = 0
  brightness = 100
  opacity = 100

[params.aside]
  transparentMode = true

[params.carousel]
  transparentMode = true
  transparentType = "full"
```

这里的几个透明开关作用范围不同：`effect_mode` 控制三栏外层，`postCardTransparentMode` 控制首页卡片，`postPageTransparentMode` 控制文章详情，`aside.transparentMode` 控制侧栏组件，`carousel.transparentMode` 控制轮播容器。只设置其中一个不会得到完整的全透明效果。

若某个侧栏组件另外设置了 `enableBackground = true`，它会保留自己的背景图，不受侧栏透明模式覆盖。更多背景参数见[背景图系统指南](/guide/background-guide.html)。

## 侧栏布局与背景

### 侧栏一体化

![侧栏一体化模式](https://cfbed.demius.tech/file/demius/1761636210669_侧栏一体化模式.png)

```toml
[params.aside]
  unifiedMode = true
  transparentMode = false
```

`unifiedMode = true` 会把同一侧的多个组件整合进一个连续容器。设回 `false` 即恢复互相分离的卡片。详细效果见[侧栏一体化模式指南](/guide/aside-unified-mode-guide.html)。

### 侧栏背景图模式

![侧栏背景图模式](https://cfbed.demius.tech/file/demius/1761761681885_侧栏背景图模式.png)

主题没有“给整个侧栏设置一张图”的单独开关。要得到截图效果，需要让每个可见组件都启用背景，并复用同一个图片路径：

```toml
[params.aside]
  unifiedMode = false
  transparentMode = false
  left = ["author", "announcement", "social-Media", "recent-Comments"]
  right = ["tags", "series-posts", "recent-Posts"]
  showAuthor = true
  showAnnouncement = true
  showSocialMedia = true
  showTags = true
  showRecent = true

[params.aside.author]
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  backgroundSize = "cover"
  backgroundPosition = "center"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.announcement]
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.social-Media]
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.tags]
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.recent-Posts]
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.recentComments]
  enable = true
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.seriesPosts]
  enable = true
  enableBackground = true
  backgroundImage = "/img/aside-shared.jpg"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"
```

只需配置实际放入 `left`、`right` 且已开启显示的组件。其他支持同样背景字段的表包括 `lifeTime`、`dataStats`、`hitokoto`、`randomImage`、`visitorInfo`、`music`、`related-Posts`、`toc`、`categories`、`advertisement`、`popular-Posts` 和 `archive`。

### 侧栏组件独立背景图

![侧栏组件独立背景图模式](https://cfbed.demius.tech/file/demius/1761761679105_侧栏组件独立背景图模式.png)

入口与上一节相同，区别是每个组件使用不同图片，也可以分别调整遮罩和文字颜色：

```toml
[params.aside]
  unifiedMode = false
  transparentMode = false

[params.aside.author]
  enableBackground = true
  backgroundImage = "/img/aside-author.jpg"
  backgroundPosition = "center"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.25)"

[params.aside.toc]
  enableBackground = true
  backgroundImage = "/img/aside-toc.jpg"
  backgroundPosition = "center"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 80, 160, 0.25)"

[params.aside.tags]
  enableBackground = true
  backgroundImage = "/img/aside-tags.jpg"
  backgroundPosition = "top"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"

[params.aside.seriesPosts]
  enable = true
  enableBackground = true
  backgroundImage = "/img/aside-series.jpg"
  backgroundPosition = "center"
  textColor = "#ffffff"
  textShadow = true
  overlayColor = "rgba(0, 0, 0, 0.35)"
```

### 侧栏背景图模式 2

![侧栏背景图2模式](https://cfbed.demius.tech/file/demius/1761761683057_侧栏背景图2模式.png)

这张图是“侧栏背景图模式”的另一个首页效果，不对应新的配置字段。复用上一节的组件配置，把每个组件的 `backgroundImage` 换成第二套图片即可；截图中的首页主体还使用了瀑布流和轮播图：

```toml
[params]
  homeColumns = 3

[params.carousel]
  enable = true

[params.aside.author]
  enableBackground = true
  backgroundImage = "/img/aside-shared-2.jpg"
  backgroundPosition = "top"

[params.aside.tags]
  enableBackground = true
  backgroundImage = "/img/aside-shared-2.jpg"
  backgroundPosition = "top"
```

对其余可见组件重复相同的 `backgroundImage`。侧栏组件名称、显示开关和排序方式见[侧栏组件配置指南](/guide/sidebar-guide.html)。

## 全站字体

![全站字体更换](https://cfbed.demius.tech/file/demius/1762591220320_全站字体更换.png)

截图使用的是本地字体配置。先把字体文件放到 `static/fonts/`，再配置：

```toml
[params.font]
  enable = true
  type = "local"
  localName = "字魂白鸽天行体"
  localPath = "/fonts/字魂白鸽天行体.ttf"
  localFormat = "ttf"
```

推荐优先使用体积更小的 WOFF2 文件，此时把 `localPath` 后缀和 `localFormat` 一并改为 `woff2`。也可以使用在线字体：

```toml
[params.font]
  enable = true
  type = "online"
  onlineUrl = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
  fontFamily = "'Noto Sans SC', sans-serif"
```

## 全屏评论弹幕

![全屏弹幕功能](https://cfbed.demius.tech/file/demius/1761761678984_全屏弹幕功能.png)

弹幕读取 Artalk 的真实评论，因此只打开 `params.danmaku.enable` 不够，还必须填写可访问的 Artalk 服务地址和与后台一致的站点名：

```toml
[params.comment]
  enable = true
  system = "artalk"

[params.comment.artalk]
  server = "https://artalk.example.com"
  site = "my-blog"
  locale = "zh-CN"

[params.danmaku]
  enable = true
  scope = "all"
  speed = 3
  fontSize = 16
  opacity = 0.9
  maxCount = 50
  updateInterval = 30000
  showAvatar = true
  showTime = true
  loop = true
  randomPosition = true
  colorful = true
  antiOverlap = true
```

构建并打开站点后，展开右下角悬浮按钮组，点击“评论弹幕”按钮即可显示或关闭。`scope = "all"` 显示全站评论，`"page"` 只显示当前页面评论，`"post"` 只在文章页筛选当前文章评论。Artalk API 还需允许站点域名跨域访问；完整排查步骤见[评论弹幕功能指南](/guide/danmaku-feature.html)。

## 应用配置

修改完成后，在站点根目录执行：

```bash
hugo server -D
```

确认本地预览无误后再执行生产构建：

```bash
hugo --minify
```

如果效果没有变化，先检查修改的是站点配置而不是主题仓库中的示例配置，并确认没有在后续配置文件中覆盖相同字段。
