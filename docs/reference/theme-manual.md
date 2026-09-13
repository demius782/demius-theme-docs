---
title: "Demius主题使用文档"
slug: zt23fdu1
date: 2025-10-28T15:00:00+08:00
lastmod: 2025-11-24T09:00:00+08:00
pinned: true
draft: false
categories: ["自由呐"]
tags: ["demius主题"]
cover: https://mpimg.cn/view.php/e726b7c1eaba5bbba0cba034827c65e5.jpg
description: "Demius Hugo主题完整使用文档 - v2.8.7版本，包含所有功能配置和使用说明。最新版本新增顶部公告栏功能（支持自定义文字和说说轮播两种模式，可配置固定、点击跳转、轮播速度等，兼容model2模式和沉浸阅读模式）。v2.8.7版本新增背景粒子特效功能（参考BeaconNav主题实现，支持动态粒子效果、智能连线、鼠标交互、主题适配）。v2.8.6版本新增链接卡片和跳转中转功能（支持内部/外部链接卡片显示、文章信息展示、安全跳转中转页）。v2.8.5版本新增弹窗公告功能（支持Modal、Toast、Banner三种弹出模式，灵活配置、状态管理、自定义样式）。v2.8.4版本新增侧栏组件宽度模式（支持默认260px、中宽332px、超宽415px三种模式）和全站字体配置功能（支持在线字体和本地字体，一键切换全站字体）。v2.8.3版本新增开发者工具防护功能、轮播图配置迁移到data文件。v2.8.2版本新增悬浮音乐播放器独立功能：配置独立、数据源独立、支持拖拽移动、缩小、关闭等交互功能"
---





## 主题简介

demius是一款功能丰富的Hugo博客主题，采用现代化的设计风格，支持响应式布局、明暗主题切换、多种布局引擎等特性。

## 快速开始

### 1. 安装主题

#### 1.1 Git 子模块

```bash
git submodule add https://github.com/demius782/demius themes/demius
```

#### 1.2 Hugo Modules

```bash
hugo mod init github.com/your/site
echo 'module = "github.com/demius782/demius"' >> hugo.toml
hugo mod get github.com/demius782/demius
```

#### 1.3 直接下载

从 Releases 或 `main` 分支下载并解压到 `themes/demius`。

---

### 2. 基础配置

在站点根目录的 `hugo.toml` 文件中配置：

```toml
# 基础配置
baseURL = 'https://your-domain.com'
languageCode = 'zh-CN'
title = '你的博客名称'
theme = 'demius'

# 启用多语言支持
defaultContentLanguage = 'zh'
hasCJKLanguage = true

# 永久链接配置
[permalinks]
  posts = "/posts/:slug.html"

[taxonomies]
  tag = "tags"
  category = "categories"
```

## 详细配置说明

### 站点基础信息

```toml
[params]
  author = "你的名字"                      # 网站作者
  description = "网站描述"                # SEO描述
  
  # 布局配置
  homeColumns = 2                         # 首页布局：1=单列, 2=双列
  mainSections = ["posts"]                # 主内容区域
  summaryLength = 120                     # 摘要长度
```

### 全站字体配置（最新新增）

支持一键切换全站字体，可选择在线字体（如Google Fonts）或本地字体文件。

```toml
# ===== 全站字体配置 =====
[params.font]
  enable = false                         # 是否启用自定义字体（true=启用，false=使用系统默认字体）
  type = "online"                        # 字体类型：online（在线字体，如Google Fonts）或 local（本地字体）
  
  # 在线字体配置（type = "online" 时使用）
  onlineUrl = ""                          # 在线字体链接（如：https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap）
  fontFamily = ""                         # 字体名称（如：'Noto Sans SC', sans-serif）
  
  # 本地字体配置（type = "local" 时使用）
  localName = ""                          # 本地字体名称（用于font-family，如：'HarmonyOS Sans SC'）
  localPath = ""                          # 本地字体文件路径（支持woff2/woff/ttf格式，如：/fonts/HarmonyOS-Sans-SC.woff2）
  localFormat = "woff2"                   # 本地字体格式：woff2、woff 或 ttf
```

#### 在线字体配置示例（Google Fonts）

```toml
[params.font]
  enable = true
  type = "online"
  onlineUrl = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
  fontFamily = "'Noto Sans SC', sans-serif"
```

#### 本地字体配置示例

```toml
[params.font]
  enable = true
  type = "local"
  localName = "HarmonyOS Sans SC"
  localPath = "/fonts/HarmonyOS-Sans-SC.woff2"
  localFormat = "woff2"
```

**字体文件放置位置**：
- 将字体文件放置在 `static/fonts/` 目录下
- 或放置在主题的 `themes/demius/static/fonts/` 目录下
- Hugo会自动将文件复制到构建后的 `public/fonts/` 目录

**功能特性**：
- ✅ 一键切换：通过配置即可切换全站字体
- ✅ 双模式支持：支持在线字体和本地字体
- ✅ 自动回退：字体加载失败时自动回退到系统字体
- ✅ PJAX兼容：页面切换时自动应用字体设置
- ✅ 性能优化：Google Fonts自动添加preconnect优化

**注意事项**：
- 本地字体文件建议使用woff2格式，体积更小、加载更快
- TTF格式会自动转换为truetype格式
- 确保字体文件路径正确，建议使用绝对路径（以`/`开头）

### 菜单配置

```toml
[menu]
  [[menu.main]]
    name = "首页"
    url = "/"
    weight = 1
    [menu.main.params]
      icon = "/img/icons/home.svg"

  [[menu.main]]
    name = "归档"
    url = "/posts/"
    weight = 2
    [menu.main.params]
      icon = "/img/icons/blog.svg"

  # 多级菜单示例
  [[menu.main]]
    name = "项目"
    identifier = "projects"
    weight = 6

  [[menu.main]]
    name = "Web开发"
    url = "/projects/web/"
    weight = 1
    parent = "projects"
```

### 侧边栏配置

```toml
[params.aside]
  # 侧栏一体化模式（v2.2.0新增）
  unifiedMode = true  # true=一体化容器，false=分割卡片
  
  # 侧栏组件宽度模式（最新新增）
  wideMode = "normal"  # 侧栏宽度模式：false或"normal"=260px（默认），"medium"=332px（中宽），true或"wide"=415px（超宽）
  
  # 左侧栏组件
  left = ["author","announcement","recent-Comments","popular-Posts","social-Media","advertisement"]
  
  # 右侧栏组件  
  right = ["toc","related-Posts","tags", "recent-Posts","categories", "archive"]

  # 组件显示控制
  showAuthor = true
  showToc = true
  showTags = true
  showRecent = true
  showCategories = true
  showArchive = true
  showPopularPosts = true
  showRelatedPosts = true
  showSocialMedia = true
  showAdvertisement = true
  showAnnouncement = true
  showLifeTime = true                    # 逆行人生时间倒计时组件（v2.8.0+）
  showDataStats = true                   # 数据统计组件（v2.8.0+）
  showHitokoto = true                   # 一言组件（v2.8.0+）
  showVisitorInfo = true                 # 访客信息组件（v2.8.0+）
  showMusic = true                       # 音乐组件（v2.8.0+）

  # 数量控制
  popularCount = 5
  recentCount = 5
  relatedCount = 5
  tagsCount = 20  # 标签云显示数量（0表示全部）
```

#### 侧栏组件宽度模式配置（最新新增）

侧栏组件支持三种宽度模式，可根据内容需求灵活调整：

```toml
[params.aside]
  # 侧栏组件宽度模式
  wideMode = "normal"  # 可选值：
                      # - false 或 "normal"：默认宽度 260px
                      # - "medium"：中宽模式 332px
                      # - true 或 "wide"：超宽模式 415px
```

**使用场景**：
- **默认模式（260px）**：适合大多数场景，内容紧凑
- **中宽模式（332px）**：适合需要显示更多内容的场景
- **超宽模式（415px）**：适合需要显示大量内容或宽屏显示的场景

**功能特性**：
- ✅ 一键切换：通过配置即可切换宽度模式
- ✅ 响应式支持：自动适配不同屏幕尺寸
- ✅ PJAX兼容：页面切换时自动应用宽度设置
- ✅ 不影响布局：仅改变侧栏宽度，不影响其他布局

#### 侧栏组件背景配置（v2.7.0+）

所有侧栏组件均支持统一的背景配置参数，默认不启用：

```toml
[params.aside.组件名]
  enableBackground = false             # 是否启用背景（默认false）
  backgroundImage = ""                 # 背景图片URL
  backgroundColor = ""                 # 背景色（支持渐变）
  backgroundSize = "cover"             # 背景图尺寸
  backgroundPosition = "center"        # 背景图位置
  backgroundRepeat = "no-repeat"       # 背景图重复
  textColor = ""                       # 文字颜色
  textShadow = false                   # 文字阴影
  overlayColor = ""                    # 遮罩层颜色
  borderRadius = ""                    # 自定义圆角
```

示例：为热门文章启用渐变背景

```toml
[params.aside.popular-Posts]
  enableBackground = true
  backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  textColor = "#ffffff"
  textShadow = true
```

#### 目录组件手机端弹出模式配置（v2.7.6+）

手机端目录按钮支持两种弹出模式，可在配置文件中灵活切换：

```toml
[params.aside.toc]
  # 手机端目录按钮弹出内容设置
  mobilePopupMode = "sidebar"  # "sidebar"（弹出整个右侧栏）或 "toc-only"（仅弹出目录）
```

**模式说明**：
- **`sidebar`**（默认）：点击目录按钮弹出整个右侧栏，包含目录、标签、相关文章等所有组件
- **`toc-only`**：点击目录按钮仅弹出目录内容，专注于目录导航

**功能特性**：
- ✅ 配置灵活：可在配置文件中轻松切换
- ✅ 样式统一：仅目录模式保持与右侧栏相同的位置样式和弹出方式（从右侧滑入）
- ✅ 交互友好：支持遮罩层关闭、关闭按钮关闭、点击链接自动关闭
- ✅ 位置一致：仅目录模式从右侧滑入，与右侧栏弹出方式一致

#### 侧栏一体化模式说明

- **一体化模式（unifiedMode = true）**：所有组件整合在一个统一容器中，用细线分割
  - 视觉更统一整洁
  - 节省屏幕空间
  - 减少视觉干扰
  
- **分割卡片模式（unifiedMode = false）**：每个组件独立显示
  - 组件更独立
  - 视觉层次分明
  - 传统博客风格

详见：[侧栏组件使用示例](/posts/ia6w5fny.html)

#### 逆行人生组件配置（v2.8.0+）

逆行人生组件显示时间倒计时，展示今日、本周、本月、本年的进度。

```toml
[params.aside.lifeTime]
  title = "逆行人生"                   # 组件标题
  enableBackground = false             # 是否启用背景图片/颜色
  backgroundImage = ""                 # 背景图片URL
  backgroundColor = ""                 # 背景色（支持渐变）
  backgroundSize = "cover"             # 背景图片尺寸
  backgroundPosition = "center"        # 背景图片位置
  backgroundRepeat = "no-repeat"       # 背景图片重复
  textColor = ""                       # 文字颜色
  textShadow = false                   # 文字阴影
  overlayColor = ""                    # 遮罩层颜色
  borderRadius = ""                    # 圆角大小
```

**功能特性**：
- ⏰ 实时更新：每秒自动更新进度
- 📊 多维度展示：今日已过小时、本周已过天数、本月已过天数、本年已过月数
- 🎨 进度条动画：精美的渐变色进度条
- 📱 响应式设计：完美适配各种设备

#### 数据统计组件配置（v2.8.0+）

数据统计组件在侧栏显示网站的各项统计数据。

```toml
[params.aside.dataStats]
  title = "数据统计"                   # 组件标题
  enableBackground = false             # 是否启用背景图片/颜色
  backgroundImage = ""                 # 背景图片URL
  backgroundColor = ""                 # 背景色（支持渐变）
  backgroundSize = "cover"             # 背景图片尺寸
  backgroundPosition = "center"        # 背景图片位置
  backgroundRepeat = "no-repeat"       # 背景图片重复
  textColor = ""                       # 文字颜色
  textShadow = false                   # 文字阴影
  overlayColor = ""                    # 遮罩层颜色
  borderRadius = ""                    # 圆角大小
  # 数据项显示开关
  showPostsCount = true                # 文章总数
  showTagsCount = true                 # 标签数量
  showCategoriesCount = true           # 分类数量
  showRunningYear = false               # 运行年份
  showTotalWords = true                # 全站字数
  showResponseTime = true              # 响应耗时
  showLastUpdate = true                # 最后更新时间
  showCommentCount = true              # 评论数目（需要Artalk API支持）
```

**功能特性**：
- 📊 多维度数据：文章数、标签数、分类数、字数、响应时间、更新时间、评论数
- ⚡ 实时计算：响应时间、最后更新时间实时计算
- 🔗 API集成：支持Artalk评论统计API
- 📱 响应式布局：数据右对齐，适配各种屏幕

#### 一言组件配置（v2.8.0+）

一言组件显示每日一句话，支持青桔API和今日诗词API。

```toml
[params.aside.hitokoto]
  title = "一言"                       # 组件标题
  enabled = true                       # 是否启用组件
  apiType = "nsmao"                    # API类型：nsmao（青桔API）或 jinrishici（今日诗词）
  showFrom = true                      # 是否显示来源
  # 青桔API配置
  nsmaoApiKey = "your-api-key"         # 青桔API密钥（只需配置key，无需secretKey）
  nsmaoApiUrl = "https://api.nsmao.net/api/history/query"  # 青桔API地址
  enableBackground = false             # 是否启用背景图片/颜色
  backgroundImage = ""                 # 背景图片URL
  backgroundColor = ""                 # 背景色（支持渐变）
  backgroundSize = "cover"             # 背景图片尺寸
  backgroundPosition = "center"        # 背景图片位置
  backgroundRepeat = "no-repeat"       # 背景图片重复
  textColor = ""                       # 文字颜色
  textShadow = false                   # 文字阴影
  overlayColor = ""                    # 遮罩层颜色
  borderRadius = ""                    # 圆角大小
```

**功能特性**：
- 📚 双API支持：青桔API（历史事件）和今日诗词API（古诗词）
- 🔄 自动刷新：页面加载时自动获取新内容
- 🎯 智能降级：API失败时自动切换到备用API
- 📱 响应式设计：完美适配各种设备

**API说明**：
- **青桔API**：显示历史事件，来源为年份，需要配置`nsmaoApiKey`
- **今日诗词API**：显示古诗词，无需配置密钥，直接使用

#### 访客信息组件配置（v2.8.0+）

访客信息组件显示访问者的地理位置、IP地址、距离等信息。

```toml
[params.aside]
  showVisitorInfo = true                 # 显示开关
  right = ["toc", "visitor-info", ...]  # 添加到右侧栏

[params.aside.visitorInfo]
  title = "访客信息"                   # 组件标题
  enabled = true                       # 是否启用组件
  apiKey = "your-api-key"              # 青桔API密钥（必填，用于获取访客位置信息）
  customLat = 119.28619787672005       # 自定义纬度（站点位置，用于计算距离）
  customLng = 34.869653193786995       # 自定义经度（站点位置，用于计算距离）
  siteName = "本站"                    # 站点名称（替代"本站"显示在距离信息中）
  fontColor = "deepskyblue"            # 高亮文字颜色（位置、IP、距离等）
  showFriendsLinks = false             # 是否显示友情链接（开往、空间穿梭）
  travellingsLink = false               # 是否显示开往友链接力
  blogsClubLink = false                 # 是否显示空间穿梭,BlogsCloub友链接
  # 背景配置（与其他组件统一）
  enableBackground = false             # 是否启用背景图片/颜色
  backgroundImage = ""                 # 背景图片URL
  backgroundColor = ""                 # 背景色（支持渐变）
  backgroundSize = "cover"             # 背景图片尺寸
  backgroundPosition = "center"        # 背景图片位置
  backgroundRepeat = "no-repeat"       # 背景图片重复
  textColor = ""                       # 文字颜色
  textShadow = false                   # 文字阴影
  overlayColor = ""                    # 遮罩层颜色
  borderRadius = ""                    # 圆角大小
```

**功能特性**：
- 🌍 地理位置显示：自动获取访问者的地理位置信息
- 📍 距离计算：计算访问者与站点的距离
- 🔗 友情链接：可选显示开往和空间穿梭友链接
- 🎨 背景配置：支持背景图片和背景色（与其他侧栏组件统一）
- 📱 响应式设计：完美适配各种设备

#### 音乐组件配置（v2.8.0+）

音乐组件在侧栏显示音乐播放列表，与音乐星球页面样式保持一致。

```toml
[params.aside]
  showMusic = true                      # 显示开关
  right = ["toc", "music", ...]        # 添加到右侧栏

[params.aside.music]
  title = "音乐"                       # 组件标题
  enabled = true                       # 是否启用组件
  # 背景配置（与其他组件统一）
  enableBackground = false             # 是否启用背景图片/颜色
  backgroundImage = ""                 # 背景图片URL
  backgroundColor = ""                 # 背景色（支持渐变）
  backgroundSize = "cover"             # 背景图片尺寸
  backgroundPosition = "center"        # 背景图片位置
  backgroundRepeat = "no-repeat"       # 背景图片重复
  textColor = ""                       # 文字颜色
  textShadow = false                   # 文字阴影
  overlayColor = ""                    # 遮罩层颜色
  borderRadius = ""                    # 圆角大小
  # 音乐列表配置（使用数组表格式）
  [[params.aside.music.items]]
    name = "歌曲名称"
    artist = "歌手名称"
    url = "/audio/demo.mp3"            # 本地音频文件路径
    cover = "/img/cover.jpg"           # 封面图片（可选）
  
  [[params.aside.music.items]]
    server = "netease"                 # 音乐平台：netease/tencent/kugou/xiami/baidu
    type = "song"                      # 类型：song/playlist/album/search/artist
    id = "27583305"                    # 音乐ID或搜索关键词
```

**功能特性**：
- 🎵 多平台支持：支持网易云、QQ音乐、酷狗、虾米、百度音乐
- 📱 响应式设计：完美适配各种设备
- 🎨 样式统一：与音乐星球页面样式保持一致
- 🌓 暗色模式：自动适配主题
- 🔄 PJAX兼容：支持无刷新切换

#### 悬浮音乐播放器配置（独立配置，与侧栏音乐组件分离）

悬浮音乐播放器是桌面端的独立小组件，位于页面左下角，数据从 `data/music-planet.yaml` 读取，与侧栏音乐组件完全独立。

```toml
# ===== 悬浮音乐播放器配置（独立配置，与侧栏音乐组件分离） =====
[params.floatMusicPlayer]
  # 是否启用悬浮音乐播放器（桌面独立小组件，位于左下角）
  enabled = true
  
  # 数据源配置：从 data/music-planet.yaml 中选择数据
  # 方式1：通过section索引选择（从0开始，支持多个索引）
  # sectionIndexes = [0, 1]  # 选择第1和第2个section的所有音乐
  
  # 方式2：通过section标题匹配选择（支持部分匹配）
  # sectionTitles = ["网易云音乐", "QQ音乐"]  # 选择标题包含这些关键词的sections
  
  # 方式3：通过section标题精确匹配选择（推荐）
  sectionTitle = "🎧 网易云音乐 · 歌单"  # 选择标题完全匹配的section（优先级最高）
  
  # 方式4：直接指定音乐项（如果设置了此项，将忽略上面的section选择方式）
  # 直接指定时会从所有sections中查找匹配的items
  # [[params.floatMusicPlayer.items]]
  #   server = "netease"
  #   type = "playlist"
  #   id = "4977885420"
  
  # 播放器选项（可选，优先级高于data/music-planet.yaml中的配置）
  # autoplay = false           # 是否自动播放
  # loop = "all"              # 循环模式：all、one、none
  # order = "list"            # 播放顺序：list、random
  # volume = 0.7              # 音量：0-1
  # listFolded = true         # 列表是否折叠
  # listMaxHeight = "340px"   # 列表最大高度
  # mini = false              # 迷你模式
  # fixed = false             # 固定模式
```

**功能特性**：
- 🎵 **独立数据源**：从 `data/music-planet.yaml` 读取数据，与侧栏音乐组件分离
- 🎯 **灵活选择**：支持4种方式选择要播放的音乐（索引、标题匹配、精确匹配、直接指定）
- 🖱️ **拖拽移动**：支持拖动到全屏任意位置，位置自动保存
- 📦 **缩小功能**：可以缩小播放器，缩小后内容不可交互但可拖拽移动
- ❌ **关闭功能**：可以关闭播放器，关闭时自动停止音乐播放
- 💾 **状态保存**：位置和缩小状态自动保存到localStorage，刷新后恢复
- 📱 **响应式设计**：窄屏（≤768px）自动隐藏
- 🌓 **暗色模式**：自动适配主题
- 🔄 **PJAX兼容**：支持无刷新切换

**交互说明**：
- **拖拽移动**：鼠标悬停在播放器顶部区域，可以拖动到任意位置
- **缩小播放器**：点击缩小按钮（鼠标悬停时显示），播放器缩小到80%，内容不可交互但可拖拽移动
- **恢复播放器**：缩小状态下点击缩小按钮可恢复
- **关闭播放器**：点击关闭按钮（鼠标悬停时显示），播放器关闭并停止音乐播放

**数据选择优先级**：
1. 方式4：直接指定items（优先级最高）
2. 方式3：精确匹配section标题
3. 方式2：部分匹配section标题
4. 方式1：通过索引选择
5. 如果都没有设置，默认使用第一个section

### 评论系统配置

```toml
[params.comment]
  enable = true
  system = "artalk"

[params.comment.artalk]
  server = "https://your-artalk-server.com"
  site = "your-site-name"
  placeholder = "说点什么吧~"
  useLocal = true  # 使用本地资源
```

**评论区统一样式（v2.8.0+）**：
- ✅ 所有页面的评论区使用统一的样式（友链页面样式）
- ✅ 虚线边框、圆角、阴影效果
- ✅ 亮色模式文字黑色，暗色模式文字白色
- ✅ 输入框字体自动适配
- ✅ 响应式设计，完美适配移动端
- ✅ PJAX完全兼容，颜色自动切换

### Umami统计配置（v2.4.0新增）

```toml
[params.analytics]
  [params.analytics.umami]
    enable = true                          # 是否启用Umami统计
    scriptUrl = "https://umami.demius.tech/script.js"  # Umami统计脚本地址
    websiteId = "your-website-id"          # 网站ID（在Umami后台创建网站后获得）
    showInDataPage = true                  # 是否在数据页面显示统计数据
    apiUrl = "https://your-api.com/"       # 统计数据API地址
```

**配置说明：**
- `enable`: 全局开关，控制是否启用Umami统计跟踪
- `scriptUrl`: Umami服务器的跟踪脚本地址
- `websiteId`: 在Umami后台添加网站后获得的唯一ID
- `showInDataPage`: 控制是否在数据页面（/data/）展示统计信息
- `apiUrl`: 统计数据API地址，用于数据页面获取访问统计

**功能特性：**

✅ 访问统计自动跟踪（PV/UV）  
✅ 数据页面实时展示（今日、昨日、本月、本年）  
✅ 精美的数据卡片设计，每个指标独特的渐变色图标  
✅ 数字递增动画效果，流畅的视觉体验  
✅ 完整的PJAX兼容，无缝页面切换  
✅ 响应式布局适配，移动端友好  
✅ 暗色模式完美支持  
✅ 错误处理和友好提示

**详细配置请参考：** [数据统计功能使用示例](/posts/27o2v4e1.html) | [数据页面使用示例](/posts/m9xdtbqg.html)

### 社交链接配置

```toml
[params.social]
  links = [
    { name = "GitHub", icon = "fab fa-github", url = "https://github.com/yourname", color = "#333333" },
    { name = "微博", icon = "fab fa-weibo", url = "https://weibo.com/yourprofile", color = "#e6162d" },
    { name = "邮箱", icon = "fas fa-envelope", url = "mailto:your@email.com", color = "#ea4335" },
    { name = "RSS", icon = "fas fa-rss", url = "/index.xml", color = "#ffa500" }
  ]
```

### 浮动按钮配置

```toml
[params.floatButtons]
  position = "right"  # 可选: "left" 或 "right"
  showBackToTop = true
  showThemeToggle = true
  showSidebarToggle = true
```

### 页脚配置

```toml
[params.footer]
  beian = "粤ICP备12345678号"  # 备案信息
  custom = """
    <div class="footer-links">
      <a href="/about">关于</a>
      <a href="/privacy">隐私政策</a>
    </div>
  """
```

### 置顶文章样式配置

```toml
# 置顶徽章颜色配置
[params.pinned]
  badgeStartColor = "#FF6B6B"            # 徽章渐变起始颜色
  badgeEndColor = "#FF8E8E"              # 徽章渐变结束颜色
  badgeTextColor = "#FFFFFF"             # 徽章文字颜色
  
  # 暗色模式颜色（可选）
  badgeStartColorDark = "#FF6B6B"        # 暗色模式起始颜色
  badgeEndColorDark = "#FF8E8E"          # 暗色模式结束颜色
  badgeTextColorDark = "#FFFFFF"         # 暗色模式文字颜色
```

**使用说明：**
- 在文章的 Front Matter 中设置 `pinned: true` 即可置顶
- 可自定义徽章颜色，避免与封面图颜色重合
- 支持十六进制、RGB、RGBA等颜色格式
- 详细配置请参考：[主页大图功能使用说明](/posts/lyb5xlt2.html)

### 开发者工具防护配置（保护代码安全）

开发者工具防护功能可以防止用户通过F12、右键菜单等方式打开开发者工具，保护代码安全。

```toml
# ===== 开发者工具防护配置（保护代码安全） =====
[params.devToolsProtection]
  enabled = false                        # 是否启用开发者工具防护（true=启用，false=禁用）
  disableRightClick = true               # 是否禁用右键菜单（true=禁用，false=允许）
  disableTextSelection = false           # 是否禁用文本选择（true=禁用，false=允许）
  detectDevTools = true                  # 是否检测开发者工具打开（true=检测，false=不检测）
  devToolsThreshold = 160                # 开发者工具检测阈值（像素），当窗口尺寸差异超过此值时认为开发者工具已打开
  disableConsole = false                 # 是否禁用控制台输出（true=禁用，false=允许）
  preventIframe = true                   # 是否阻止通过iframe打开页面（true=阻止，false=允许）
  onDevToolsOpen = "none"                 # 检测到开发者工具打开时的行为：none（无操作）、redirect（跳转）、clear（清空页面）、close（尝试关闭）
  redirectUrl = "/"                      # 当onDevToolsOpen为redirect时，跳转的URL
```

**功能特性**：
- 🚫 **禁用快捷键**：禁用F12、Ctrl+Shift+I、Ctrl+Shift+J、Ctrl+Shift+C、Ctrl+U、Ctrl+S等快捷键
- 🖱️ **禁用右键菜单**：可选禁用右键菜单，防止查看源代码
- 📝 **禁用文本选择**：可选禁用文本选择，防止复制内容
- 🔍 **检测开发者工具**：通过窗口尺寸变化检测开发者工具是否打开
- 🛡️ **控制台禁用**：可选禁用控制台输出
- 🚧 **Iframe防护**：可选阻止通过iframe打开页面

**注意事项**：
- ⚠️ 这些防护措施都可以被绕过，只是增加难度
- ⚠️ 过度防护可能影响正常用户体验
- ⚠️ 建议根据实际需求调整各项配置
- ⚠️ 默认配置为 `enabled = false`，需要手动开启

### 轮播图配置

轮播图功能支持在首页或其他页面显示文章或图片轮播。

#### 基础配置

在 `hugo.toml` 中配置轮播图的基本参数：

```toml
# ===== 轮播图配置 =====
[params.carousel]
  enable = true                          # 是否启用轮播图功能
  height = 200                           # 轮播图高度(px)
  autoplay = true                        # 是否自动播放
  interval = 5000                        # 自动播放间隔(毫秒)
  direction = "horizontal"               # 切换方向：horizontal(左右) / vertical(上下)
  showOnPages = ["home"]                 # 显示页面：home(首页) / all(所有页面) / ["home", "posts"]
  transparentMode = false                 # 启用轮播图透明背景模式（true=透明效果，false=默认背景）
  transparentType = "full"              # 透明效果类型：glass（透明毛玻璃效果）或 full（全透明效果）
```

#### 轮播项配置（v2.8.3+）

**重要提示**：从v2.8.3版本开始，轮播项的配置已移至 `data/carousel.yaml` 文件中，便于管理和维护。

在 `data/carousel.yaml` 文件中配置轮播项：

```yaml
# 轮播图轮播项配置
# 支持两种类型：post（文章）和 image（图片）
items:
  # 文章类型轮播项
  - type: "post"
    slug: "article-slug"  # 文章的slug字段值
  
  # 图片类型轮播项
  - type: "image"
    image: "https://example.com/image.jpg"
    title: "图片标题"
    description: "图片描述"
    link: "/link/"  # 点击跳转链接（可选）
```

**配置说明**：
- **文章类型**：使用 `type: "post"`，通过 `slug` 字段匹配文章
- **图片类型**：使用 `type: "image"`，需要提供 `image`、`title`、`description` 等字段
- **链接跳转**：图片类型支持 `link` 字段，点击后跳转到指定页面

**功能特性**：
- 🎨 **两种内容类型**：支持文章轮播和纯图片轮播
- 🔄 **双向滚动**：支持水平（左右）和垂直（上下）滚动
- ⏱️ **自动播放**：可配置间隔时间自动切换
- 🎮 **手动控制**：支持导航按钮和指示器手动切换
- 📱 **触摸支持**：移动端支持拖拽切换
- 🎯 **页面控制**：可指定在哪些页面显示
- 📐 **响应式设计**：自动适配各种屏幕尺寸
- ⚡ **懒加载**：优化性能，提升加载速度

## 内容管理

### 创建新文章

```bash
hugo new posts/文章标题.md
```

### 文章Front Matter示例

```yaml
---
title: "文章标题"
date: 2024-01-01T10:00:00+08:00
draft: false
description: "文章描述"
cover: "/images/cover.jpg"  # 封面图片
categories: ["技术"]
tags: ["Hugo", "主题"]
toc: true  # 启用目录
---
```

## 功能特性详解

### 示例文章书写规范（v2.8.9+）

为了让读者更容易复制短代码并理解渲染效果，所有“使用示例”类文章都遵循如下约定：

- 📜 **短代码优先**：先展示 `{{</* shortcode */>}}` 的写法，再展示渲染效果（以 `按钮功能使用示例` 为代表）。
- 🔗 **致谢引用统一**：引用外部教程或项目时，请使用 `linkcard` 短代码展示卡片式引用（例如 `主题页面实现来源说明`）。
- 🧭 **示例标注清晰**：为每段示例添加“短代码 / 渲染效果”或“语法 / 效果”等小标题，方便读者定位。

编写新示例时，直接复用以上格式即可保持全站一致性。

### 1. 布局系统

**三种首页布局：**
- **单列布局** (homeColumns = 1)：传统博客布局
- **双列布局** (homeColumns = 2)：网格卡片布局
- **瀑布流布局** (homeColumns = 3)：动态加载布局

### 2. 主题切换

- 支持明暗主题自动切换
- 用户偏好设置自动保存
- 评论系统主题同步

### 3. 搜索功能

启用搜索功能：
```toml
[outputs]
  home = ["HTML", "JSON"]  # 必须启用JSON输出

[params.search]
  engine = "local"
  indexPath = "/index.json"
```

说明：
- 本主题保留“导航栏右上角”的搜索入口与搜索模态框。
- 侧栏搜索组件已在 v2.7.2 版本中移除，无需也无需再配置侧栏搜索相关项。

### 4. 侧边栏组件

**可用组件：**
- `author` - 作者信息
- `toc` - 文章目录（支持手机端弹出模式配置 v2.7.6+）
- `tags` - 标签云
- `recent-Posts` - 最新文章
- `categories` - 分类列表
- `archive` - 文章归档
- `popular-Posts` - 热门文章
- `related-Posts` - 相关文章
- `social-Media` - 社交媒体
- `advertisement` - 广告位
- `announcement` - 公告栏
- `recent-Comments` - 最新评论
- `series-posts` - 系列文章（v2.7.0+）

**手机端目录按钮配置（v2.7.6+）**：
- 在 `[params.aside.toc]` 中设置 `mobilePopupMode`
- 支持 `sidebar`（弹出整个右侧栏）或 `toc-only`（仅弹出目录）
- 仅目录模式保持与右侧栏相同的位置样式和弹出方式（从右侧滑入）

### 5. 评论系统

支持Artalk自托管评论系统，配置说明：

```toml
# Artalk配置
[params.comment.artalk]
  server = "https://your-artalk-server.com"  # Artalk后端地址
  site = "your-site-name"                   # 站点名称
  useLocal = true                            # 使用本地资源
  
  # 可选CDN配置
  cdn = [
    { name = "jsDelivr", css = "https://cdn.jsdelivr.net/npm/artalk@2.9.1/dist/Artalk.css", js = "https://cdn.jsdelivr.net/npm/artalk@2.9.1/dist/Artalk.js" }
  ]
  cdnIndex = 0
```

### 6. 文章内容增强功能 ✨

#### 音乐播放器 🎵（v2.5.0 全面升级）

基于 [MetingJS](https://github.com/metowolf/MetingJS) 的全新音乐播放器，支持多平台、多类型：

**支持的平台**：
- 网易云音乐 (netease)
- QQ音乐 (tencent)
- 酷狗音乐 (kugou)
- 虾米音乐 (xiami)
- 百度音乐 (baidu)

**支持的类型**：
- 单曲 (song)
- 播放列表 (playlist)
- 专辑 (album)
- 搜索 (search)
- 歌手 (artist)
- 本地文件 (local)

**使用示例**：

```markdown
<!-- 单曲 -->
{{</* music server="netease" type="song" id="27583305" */>}}

<!-- 播放列表 -->
{{</* music server="tencent" type="playlist" id="9602925225" */>}}

<!-- 专辑 -->
{{</* music server="netease" type="album" id="16937" */>}}

<!-- 搜索 -->
{{</* music server="netease" type="search" id="海阔天空" */>}}

<!-- 歌手 -->
{{</* music server="netease" type="artist" id="2118" */>}}

<!-- 本地文件 -->
{{</* music name="歌曲名" artist="歌手" url="/audio/demo.mp3" cover="/img/default-cover.webp" */>}}

<!-- 自定义选项 -->
{{</* music 
  server="netease" 
  type="song" 
  id="27583305" 
  autoplay="false" 
  theme="#FF6B6B" 
  loop="all" 
  volume="0.7" 
*/>}}
```

**可用参数**：
- `autoplay`: 自动播放 (true/false)
- `theme`: 主题颜色 (默认 #2980b9)
- `loop`: 循环模式 (all/one/none)
- `order`: 播放顺序 (list/random)
- `volume`: 音量 (0-1)
- `lrcType`: 歌词类型 (0/1/3)
- `listFolded`: 列表折叠 (true/false)
- `listMaxHeight`: 列表最大高度
- `fixed`: 固定模式 (true/false)
- `mini`: 迷你模式 (true/false)

**详细使用说明**：[音乐播放器功能使用示例](/posts/09z126nx.html)

#### 彩色文字 🎨

```markdown
<!-- 预设颜色 -->
{{</* color "red" */>}}红色文字{{</* /color */>}}
{{</* color "blue" */>}}蓝色文字{{</* /color */>}}

<!-- 自定义颜色 -->
{{</* color "#FF5733" */>}}自定义颜色{{</* /color */>}}

<!-- 主题色 -->
{{</* color "primary" */>}}主题色{{</* /color */>}}
```

**详细使用说明**：[彩色文字功能使用示例](/posts/18o72ymk.html)

#### 评论可见内容 🔒

```markdown
{{</* reply-visible id="unique-id" */>}}
评论后才能看到的内容
{{</* /reply-visible */>}}
```

**详细使用说明**：[评论可见功能使用示例](/posts/5cilldeb.html)

#### 内容折叠 📦

```markdown
{{</* collapse "点击展开" */>}}
折叠的内容
{{</* /collapse */>}}

<!-- 默认展开 -->
{{</* collapse "标题" "open" */>}}
默认展开的内容
{{</* /collapse */>}}
```

**详细使用说明**：[内容折叠功能使用示例](/posts/yidnwm4k.html)

#### 时间线 📅

```markdown
{{</* timeline */>}}

{{</* timeline-item "2025-10-25" "标题" "success" "star" */>}}
时间线内容
{{</* /timeline-item */>}}

{{</* timeline-item "2025-10-20" "标题2" "info" "check" */>}}
更多内容
{{</* /timeline-item */>}}

{{</* /timeline */>}}
```

**可用类型**：default, success, warning, danger, info  
**可用图标**：default, check, star, warning, info, plus

**详细使用说明**：[时间线功能使用示例](/posts/hdzd30xa.html)

#### 选项卡 📑

```markdown
{{</* tabs id="demo" tabs="选项卡1,选项卡2" */>}}

{{</* tab index="1" */>}}
第一个选项卡的内容
{{</* /tab */>}}

{{</* tab index="2" */>}}
第二个选项卡的内容
{{</* /tab */>}}

{{</* /tabs */>}}
```

**详细使用说明**：[选项卡功能使用示例](/posts/a5wxauo6.html)

#### 相册 🖼️

```markdown
{{</* gallery >}}
{{</* gallery-item 
  image="/img/photo1.jpg"
  caption="照片说明1"
*/>}}
{{</* /gallery-item */>}}

{{</* gallery-item 
  image="/img/photo2.jpg"
  caption="照片说明2"
*/>}}
{{</* /gallery-item */>}}
{{</* /gallery */>}}
```

**详细使用说明**：[相册功能使用示例](/posts/qhlt295l.html)

#### 文章加密 🔐

**全文加密**：
```markdown
---
title: "加密文章"
password: "myPassword"
passwordHint: "自定义提示（可选）"
---
文章内容...
```

**部分内容加密**：
```markdown
{{</* encrypt password="pwd" hint="提示" */>}}
加密内容
{{</* /encrypt */>}}
```

**配置选项**：
```toml
[params.encryption]
  enable = true
  fullHint = "🔒 此文章已加密，请输入密码查看完整内容"
  partialHint = "🔐 此部分内容已加密，请输入密码查看"
  wrongPasswordHint = "❌ 密码错误，请重试"
  
  # 全文加密弹窗样式配置（v2.7.1+）
  popupTextColor = "#ffffff"              # 全文加密弹窗文字和图标颜色（默认白色）
  popupBackgroundColor = ""               # 全文加密弹窗背景色（支持单色或渐变，如："#667eea" 或 "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"）
  popupBackgroundImage = "/img/bj.jpg"    # 全文加密弹窗背景图路径（留空则不使用背景图）
  
  # 部分加密弹窗样式配置（独立设置，互不影响）（v2.7.1+）
  partialPopupTextColor = "#ffffff"             # 部分加密弹窗文字和图标颜色（留空则使用默认主题色）
  partialPopupBackgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"  # 部分加密弹窗背景色（支持单色或渐变，留空则使用默认背景）
  partialPopupBackgroundImage = ""       # 部分加密弹窗背景图路径（留空则不使用背景图）
```

**安全特性**（v2.7.7+）：
- 🔒 **内容加密**：加密内容在页面源码中以 base64 编码存储，不会暴露明文
- 🔐 **密码保护**：使用 SHA256 哈希验证密码，确保安全性
- 🔓 **动态解码**：密码验证通过后，从编码的 data 属性中解码并显示内容
- 💾 **状态记忆**：解锁状态保存在 sessionStorage 中，刷新页面后仍保持解锁状态
- 🔄 **PJAX 兼容**：支持 PJAX 无刷新切换，自动重新初始化加密逻辑

**使用说明**：
- ✅ 全文加密：在文章 Front Matter 中添加 `password` 字段
- ✅ 部分加密：使用 `{{</* encrypt */>}}` shortcode 包裹需要加密的内容
- ✅ 密码提示：可自定义密码提示文字（`passwordHint` 或 `hint` 参数）
- ✅ 样式定制：支持自定义弹窗文字颜色、背景色、背景图

**详细使用说明**：[文章加密功能使用示例](/posts/el63izg7.html)

#### 视频嵌入 🎬

```markdown
<!-- B站视频 -->
{{</* video "https://www.bilibili.com/video/BV1xx411c7mu" */>}}

<!-- YouTube视频 -->
{{</* video "https://www.youtube.com/watch?v=dQw4w9WgXcQ" */>}}

<!-- 本地视频 -->
{{</* video "/video/demo.mp4" */>}}
```

**详细使用说明**：[视频嵌入使用示例](/posts/ge0yozpt.html)

#### 按钮 🎯

```markdown
<!-- 基础用法 -->
{{</* button href="https://example.com" text="访问示例" */>}}
{{</* button href="/posts/" */>}}查看文章{{</* /button */>}}

<!-- 带图标和样式 -->
{{</* button href="#" icon="fas fa-download" color="success" */>}}下载文件{{</* /button */>}}
{{</* button href="#" color="primary" size="large" */>}}大按钮{{</* /button */>}}
{{</* button href="#" color="danger" outline="true" */>}}危险按钮{{</* /button */>}}

<!-- 块级按钮 -->
{{</* button href="#" color="primary" block="true" */>}}块级按钮{{</* /button */>}}

<!-- 新窗口打开 -->
{{</* button href="https://example.com" target="_blank" rel="noopener" color="info" */>}}外部链接{{</* /button */>}}
```

**参数说明**：
- `href`: 链接地址（可选，不提供则渲染为普通按钮）
- `text`: 按钮文字（可选，如果提供则忽略内部内容）
- `icon`: FontAwesome 图标类名（可选）
- `color`: 按钮颜色 - primary, success, warning, danger, info, default
- `size`: 按钮大小 - small, normal, large
- `outline`: 是否使用描边样式 - true/false
- `block`: 是否块级按钮 - true/false
- `target`: 链接打开方式 - _blank, _self 等
- `rel`: 链接 rel 属性 - nofollow, noopener 等

**主要特性**：
- 🎨 多种颜色样式：primary、success、warning、danger、info、default
- 📏 多种大小：small、normal、large
- 🎯 描边样式：支持实心和描边两种样式
- 🔗 链接支持：可作为链接按钮或普通按钮
- 🎭 图标支持：支持 FontAwesome 图标
- 📦 嵌套支持：可以与其他短代码嵌套使用
- 📱 响应式设计：完美适配各种设备

**详细使用说明**：[按钮功能使用示例](/posts/btn-demo-2025.html)

### 7. 页脚配置 ⏱️

```toml
[params.footer]
  # 自定义内容
  custom = """
    <div class="footer-links">
      <a href="/about">关于</a>
      <a href="/sitemap.xml">网站地图</a>
    </div>
  """
  
  # 运行时间显示
  [params.footer.runningTime]
    enable = true
    startDate = "2024-01-01"  # 建站日期
    prefix = "本站已运行"       # 前缀文字
```

**显示效果**：
- 版权信息（自动显示年份范围）
- 运行时间（动态更新，精确到秒）
- 自定义链接
- 备案信息（可选）

### 8. 网友圈页面配置 👥（v2.7.8+）

网友圈页面展示友链订阅的最新文章，以小卡片形式展示。

#### 基础配置

```toml
[params.friendsCircle]
  # 数据源配置（全部从预生成JSON获取）
  preGeneratedJsonUrl = "/all.json"  # 预生成的JSON数据源URL
  
  # 显示配置
  initialDisplayCount = 10           # 初始显示卡片数量
  loadMoreCount = 10                 # 每次加载更多显示的卡片数量
  
  # 文章显示规则（按时间筛选）
  defaultArticleDays = 3             # 默认显示最近N天内的文章
  
  # 分组专属时间配置（可选，优先级高于 defaultArticleDays）
  [[params.friendsCircle.groupArticleDays]]
    name = "博客组织"                # 分组名称（支持模糊匹配）
    days = 20                        # 显示最近N天内的文章
```

#### 背景色配置（v2.7.9+）

网友圈页面支持文章卡片和分组选项卡的背景色自定义。

**文章卡片背景色**：
```toml
[params.friendsCircle]
  # 文章卡片背景色模式配置
  cardColorMode = "random"          # transparent(透明) / random(随机彩色) / custom(自定义颜色)
  cardCustomColor = "#f5f5f5"       # 自定义背景色（当cardColorMode="custom"时生效）
```

**分组选项卡背景色**：
```toml
[params.friendsCircle]
  # 分组选项卡背景色模式配置
  tabColorMode = "random"           # default(默认样式) / random(随机彩色) / custom(自定义颜色)
  tabCustomColor = "#667eea"        # 自定义背景色（当tabColorMode="custom"时生效）
```

**模式说明**：
- **transparent/default**：使用主题默认样式，无特殊背景
- **random**：8种渐变色随机分配，每个站点/分组固定一种颜色，文字自动适配
- **custom**：统一使用自定义背景色

**颜色效果**：
- 🌈 **随机模式**：8种精美渐变色循环，根据站点/分组名称哈希分配，保持一致
- 🎨 **自定义模式**：统一背景色，简洁大方
- 💫 **悬停效果**：背景亮度提升，边框高亮
- 🌓 **暗色模式**：自动适配，颜色过渡自然

#### 文章显示规则配置（按时间筛选）

```toml
[params.friendsCircle]
  # 默认显示最近N天内的文章（所有分组通用）
  defaultArticleDays = 3
  
  # 分组专属时间配置（可选，优先级高于 defaultArticleDays）
  [[params.friendsCircle.groupArticleDays]]
    name = "博客组织"      # 分组名称（支持模糊匹配）
    days = 20              # 显示最近20天内的文章
  
  # 可以添加更多分组配置
  [[params.friendsCircle.groupArticleDays]]
    name = "技术博客"
    days = 7               # 显示最近7天内的文章
  
  # 背景色配置（v2.7.9+）
  cardColorMode = "random"          # 文章卡片背景色模式
  cardCustomColor = "#f5f5f5"       # 自定义背景色（custom模式）
  tabColorMode = "random"           # 分组选项卡背景色模式
  tabCustomColor = "#667eea"        # 自定义背景色（custom模式）
```

**配置说明**：
- `defaultArticleDays`：所有分组的默认天数（如果某个分组没有单独配置，使用此值）
- `groupArticleDays`：分组专属配置数组，可以为每个分组单独设置天数
- `name`：分组名称，支持模糊匹配（如"博客组织 · 有趣的灵魂"会匹配配置中的"博客组织"）
- `days`：该分组显示最近N天内的文章

**数据生成**：
- 使用 Python 脚本生成 JSON 文件：运行 `python generate_friends_circle_json.py`
- 生成的 JSON 文件应放置在 `static/all.json`
- JSON 文件中的每个文章应包含 `siteGroup` 字段，用于分组

**功能特性**：
- ✅ 全部数据从预生成JSON获取，避免CORS问题
- ✅ 分组选项卡自动显示，支持切换不同分组
- ✅ 按时间筛选文章，每个分组可独立配置
- ✅ 加载更多功能，分批显示文章
- ✅ 响应式布局，完美适配移动端
- ✅ 暗色模式自动适配

**详细使用说明**：参考 `generate_friends_circle_json.py` 脚本和 `README-friends-circle.md` 文档

### 9. 弹窗公告配置 🎯（v2.8.5+）

弹窗公告功能支持多种弹出模式，可在网站任意页面显示重要公告、通知等信息。

#### 基础配置

在 `hugo.toml` 中启用弹窗功能：

```toml
# ===== 弹窗公告配置 =====
[params.popup]
  enable = true                            # 是否启用弹窗公告功能
  zIndex = 10000                           # 弹窗层级（确保在最上层）
```

#### 弹窗数据配置

在 `data/popup.yaml` 中配置弹窗内容：

```yaml
# 弹窗公告数据配置
# 支持多个弹窗，按顺序显示

- id: "popup-1"                    # 弹窗唯一标识
  enable: true                      # 是否启用此弹窗
  title: "欢迎访问"                  # 弹窗标题
  content: |                        # 弹窗内容（支持HTML）
    <p>欢迎来到我的博客！</p>
    <p>这里是我的技术分享和日常记录。</p>
  mode: "modal"                     # 弹出模式：modal（模态框）、toast（提示框）、banner（横幅）
  position: "center"                # 位置：center（居中）、top（顶部）、bottom（底部）、top-left、top-right、bottom-left、bottom-right
  width: "500px"                    # 弹窗宽度（modal模式有效）
  height: "auto"                    # 弹窗高度（modal模式有效，auto为自适应）
  showCloseButton: true             # 是否显示关闭按钮
  showOverlay: true                  # 是否显示遮罩层（modal模式有效）
  closeOnOverlayClick: true         # 点击遮罩层是否关闭（modal模式有效）
  closeOnEscape: true               # 按ESC键是否关闭
  autoClose: false                  # 是否自动关闭（false为不自动关闭，数字为毫秒数）
  delay: 0                          # 延迟显示时间（毫秒）
  cookieName: "popup_1_closed"      # Cookie名称（用于记录关闭状态）
  cookieExpire: 7                   # Cookie过期天数（0为会话级，关闭浏览器后失效）
  showOnce: true                    # 是否只显示一次（基于Cookie）
  customCSS: ""                     # 自定义CSS样式
  customJS: ""                      # 自定义JavaScript代码
  showOnPages:                      # 显示页面类型（all=所有页面，home=首页，posts=文章页，pages=其他页面）
    - "all"
```

#### 弹出模式说明

**1. Modal（模态框）模式**
- 带遮罩层的居中弹窗
- 适合重要公告、欢迎信息等
- 支持多种位置：center、top、bottom、top-left、top-right、bottom-left、bottom-right

**2. Toast（提示框）模式**
- 轻量级提示消息
- 适合通知、提醒等
- 支持自动关闭
- 支持多种位置

**3. Banner（横幅）模式**
- 顶部或底部横幅
- 适合重要公告、维护通知等
- 宽度自动填充

#### 配置参数说明

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `id` | string | 弹窗唯一标识 | 必填 |
| `enable` | boolean | 是否启用此弹窗 | `true` |
| `title` | string | 弹窗标题 | 可选 |
| `content` | string | 弹窗内容（支持HTML） | 必填 |
| `mode` | string | 弹出模式：modal、toast、banner | `"modal"` |
| `position` | string | 位置 | `"center"` |
| `width` | string | 弹窗宽度 | `"500px"` |
| `height` | string | 弹窗高度 | `"auto"` |
| `showCloseButton` | boolean | 是否显示关闭按钮 | `true` |
| `showOverlay` | boolean | 是否显示遮罩层 | `true` |
| `closeOnOverlayClick` | boolean | 点击遮罩层是否关闭 | `true` |
| `closeOnEscape` | boolean | 按ESC键是否关闭 | `true` |
| `autoClose` | number/false | 自动关闭时间（毫秒） | `false` |
| `delay` | number | 延迟显示时间（毫秒） | `0` |
| `cookieName` | string | Cookie名称 | `""` |
| `cookieExpire` | number | Cookie过期天数（0为会话级） | `0` |
| `showOnce` | boolean | 是否只显示一次 | `false` |
| `customCSS` | string | 自定义CSS样式 | `""` |
| `customJS` | string | 自定义JavaScript代码 | `""` |
| `showOnPages` | array | 显示页面类型 | `["all"]` |

#### 使用示例

**示例1：欢迎弹窗（Modal模式）**

```yaml
- id: "welcome-popup"
  enable: true
  title: "欢迎访问"
  content: |
    <p>欢迎来到我的博客！</p>
    <p>这里是我的技术分享和日常记录。</p>
  mode: "modal"
  position: "center"
  width: "500px"
  showCloseButton: true
  showOverlay: true
  closeOnOverlayClick: true
  closeOnEscape: true
  autoClose: false
  delay: 0
  cookieName: "welcome_popup_closed"
  cookieExpire: 7
  showOnce: true
  showOnPages:
    - "all"
```

**示例2：通知提示（Toast模式）**

```yaml
- id: "notification-toast"
  enable: true
  title: "通知"
  content: |
    <p>Demius主题已更新</p>
  mode: "toast"
  position: "top-right"
  width: "300px"
  showCloseButton: true
  showOverlay: false
  autoClose: 5000
  delay: 1000
  showOnPages:
    - "all"
```

**示例3：维护公告（Banner模式）**

```yaml
- id: "maintenance-banner"
  enable: true
  title: "重要公告"
  content: |
    <p>网站维护通知：将于今晚22:00-24:00进行系统维护</p>
  mode: "banner"
  position: "top"
  width: "100%"
  showCloseButton: true
  cookieName: "maintenance_banner_closed"
  cookieExpire: 1
  customCSS: |
    .popup-banner {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  showOnPages:
    - "all"
```

#### 功能特性

- ✅ **多种弹出模式**：支持Modal、Toast、Banner三种模式
- ✅ **灵活配置**：支持自定义宽度、高度、位置等
- ✅ **交互功能**：支持关闭按钮、ESC键关闭、遮罩层点击关闭
- ✅ **自动关闭**：支持自动关闭和延迟显示
- ✅ **状态管理**：支持Cookie记录关闭状态，实现"只显示一次"功能
- ✅ **自定义样式**：支持自定义CSS和JavaScript
- ✅ **页面筛选**：支持按页面类型筛选显示
- ✅ **PJAX兼容**：完全兼容PJAX页面切换
- ✅ **响应式设计**：完美适配各种设备
- ✅ **暗色模式**：自动适配明暗主题

### 10. 顶部公告栏配置 📢（最新新增）

顶部公告栏功能支持在导航栏下方、三栏布局上方显示横向公告，支持自定义文字或说说轮播两种模式。

#### 功能概述

**主要特性**：
- 🎯 **两种显示模式**：自定义文字模式、说说轮播模式
- 📍 **灵活定位**：可配置是否与导航栏一起固定
- 🔗 **点击跳转**：说说内容可点击跳转到说说页面对应位置
- ⚡ **轮播控制**：可配置轮播切换间隔和动画速度
- 🏠 **模式兼容**：在主页大图model2模式下自动隐藏，下滑后显示
- 👁️ **沉浸模式**：兼容沉浸阅读模式，自动隐藏
- 📱 **响应式设计**：完美适配移动端

#### 基础配置

在 `hugo.toml` 中配置：

```toml
# ===== 顶部公告栏配置 =====
[params.topAnnouncement]
  enable = true                            # 是否启用顶部公告栏
  mode = "custom"                          # 显示模式：custom（自定义文字）或 shuoshuo（说说轮播）
  height = 40                              # 公告栏高度(px)
  stickyWithHeader = true                  # 是否与导航栏一起固定（true=导航栏固定时公告栏也固定，false=公告栏不固定）
  
  # 自定义文字模式配置
  [params.topAnnouncement.custom]
    text = "欢迎来到我的博客！"              # 公告文字内容（支持HTML）
    link = ""                               # 点击跳转链接（可选，留空则不跳转）
    linkText = ""                           # 链接文字（可选）
  
  # 说说轮播模式配置
  [params.topAnnouncement.shuoshuo]
    apiUrl = "https://api.example.com/memo/list"  # 说说API地址
    count = 3                               # 轮播显示几条说说（1-5条）
    interval = 5000                         # 轮播切换间隔(毫秒)
    transitionDuration = 500               # 轮播切换动画持续时间(毫秒，建议200-1000)
    showAvatar = true                       # 是否显示头像
    showTime = true                         # 是否显示时间
    cacheDuration = 1800000                 # 缓存时间(毫秒，30分钟=1800000)
    clickable = true                        # 是否可点击跳转到说说页面（true=可点击，false=不可点击）
    shuoshuoPageUrl = "/shuoshuo/"         # 说说页面URL（用于跳转）
```

#### 显示模式说明

**1. 自定义文字模式（custom）**
- 显示固定的自定义文字内容
- 支持HTML格式
- 可配置点击跳转链接
- 适合显示重要公告、欢迎信息等

**2. 说说轮播模式（shuoshuo）**
- 自动从API获取最新说说
- 支持轮播显示多条说说
- 可配置轮播间隔和动画速度
- 支持点击跳转到说说页面
- 数据自动缓存，减少API请求

#### 配置参数说明

**基础配置参数**：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `enable` | boolean | 是否启用顶部公告栏 | `true` |
| `mode` | string | 显示模式：custom、shuoshuo | `"custom"` |
| `height` | number | 公告栏高度（像素） | `40` |
| `stickyWithHeader` | boolean | 是否与导航栏一起固定 | `true` |

**自定义文字模式参数**：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `text` | string | 公告文字内容（支持HTML） | `""` |
| `link` | string | 点击跳转链接 | `""` |
| `linkText` | string | 链接文字 | `""` |

**说说轮播模式参数**：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `apiUrl` | string | 说说API地址 | `"https://api.example.com/memo/list"` |
| `count` | number | 轮播显示几条说说（1-5条） | `3` |
| `interval` | number | 轮播切换间隔（毫秒） | `5000` |
| `transitionDuration` | number | 轮播切换动画持续时间（毫秒） | `500` |
| `showAvatar` | boolean | 是否显示头像 | `true` |
| `showTime` | boolean | 是否显示时间 | `true` |
| `cacheDuration` | number | 缓存时间（毫秒） | `1800000` |
| `clickable` | boolean | 是否可点击跳转 | `true` |
| `shuoshuoPageUrl` | string | 说说页面URL | `"/shuoshuo/"` |

#### 使用示例

**示例1：自定义文字公告**

```toml
[params.topAnnouncement]
  enable = true
  mode = "custom"
  height = 40
  stickyWithHeader = true
  
  [params.topAnnouncement.custom]
    text = "🎉 欢迎访问我的博客！"
    link = "/about"
    linkText = "了解更多"
```

**示例2：说说轮播公告**

```toml
[params.topAnnouncement]
  enable = true
  mode = "shuoshuo"
  height = 40
  stickyWithHeader = true
  
  [params.topAnnouncement.shuoshuo]
    apiUrl = "https://api.example.com/memo/list"
    count = 3
    interval = 5000
    transitionDuration = 1000
    showAvatar = true
    showTime = true
    clickable = true
    shuoshuoPageUrl = "/shuoshuo/"
```

**示例3：不固定公告栏**

```toml
[params.topAnnouncement]
  enable = true
  mode = "custom"
  stickyWithHeader = false  # 公告栏不固定，随页面滚动
  
  [params.topAnnouncement.custom]
    text = "重要公告：网站维护中"
```

#### 功能特性

**显示特性**：
- ✅ 说说内容居中显示，美观大方
- ✅ 支持头像、时间等详细信息展示
- ✅ 轮播指示器显示当前位置
- ✅ 平滑的切换动画效果

**交互特性**：
- ✅ 说说内容可点击跳转到说说页面
- ✅ 自动定位到对应的说说位置
- ✅ 目标说说高亮显示2秒
- ✅ 支持PJAX无刷新跳转

**兼容特性**：
- ✅ 在主页大图model2模式下自动隐藏
- ✅ 下滑后平滑显示，与三栏布局同步
- ✅ 沉浸阅读模式下自动隐藏
- ✅ 完全兼容现有功能和布局

**性能优化**：
- ✅ 说说数据自动缓存，减少API请求
- ✅ 可配置缓存时间，平衡实时性和性能
- ✅ 异步加载，不阻塞页面渲染
- ✅ PJAX兼容，页面切换流畅

#### 技术实现

- 使用独立的CSS和JavaScript文件，不影响现有功能
- 通过Hugo模板系统读取配置并注入到页面
- 说说数据从API异步获取，使用localStorage缓存
- 支持PJAX页面切换，自动重新初始化
- 响应式设计，完美适配移动端

#### 注意事项

- 说说API需要支持CORS跨域请求
- 确保说说页面URL配置正确
- 轮播动画速度建议设置在200-1000毫秒之间
- 在model2模式下，公告栏会与三栏布局同步显示/隐藏
- 沉浸阅读模式下，公告栏会自动隐藏

### 11. 链接卡片和跳转中转配置 🔗（v2.8.6+）

链接卡片功能可以将文章内容中的链接转换为美观的卡片形式显示，跳转中转功能可以为外部链接提供安全跳转中转页。

#### 功能概述

**链接卡片功能**：
- 🎯 **多种显示模式**：支持none（不显示）、all（所有链接）、internal（仅内部链接）、external（仅外部链接）
- 📄 **文章信息展示**：内部链接可显示文章标题、日期、摘要等信息
- 🎨 **美观卡片样式**：内部链接蓝色边框，外部链接红色边框
- ⚙️ **灵活配置**：支持配置是否在新标签页打开、是否显示文章信息等
- 📋 **白名单机制**：支持替换白名单、页面白名单、元素白名单、跳转白名单

**跳转中转功能**：
- 🛡️ **安全跳转**：外部链接通过中转页跳转，提升安全性
- ⏱️ **倒计时显示**：支持倒计时自动跳转，可配置倒计时时间
- 🔘 **立即跳转按钮**：支持显示立即跳转按钮
- 💬 **安全提示信息**：可自定义安全提示信息
- 📋 **跳转白名单**：支持配置跳转白名单

#### 基础配置

在 `hugo.toml` 中配置：

```toml
# ===== 文章链接卡片和跳转中转配置 =====
[params.linkCard]
  enable = true                             # 是否启用链接卡片功能
  cardMode = "external"                     # 卡片显示模式：none（不显示）、all（所有链接）、internal（仅内部链接）、external（仅外部链接）
  openInNewTab = true                       # 链接是否在新标签页打开（true=新标签页，false=当前页面）
  showArticleInfo = true                    # 是否显示文章信息（仅内部链接有效）
  showArticleTitle = true                   # 是否显示文章标题（仅内部链接有效）
  showArticleDate = true                    # 是否显示文章日期（仅内部链接有效）
  showArticleSummary = true                 # 是否显示文章摘要（仅内部链接有效）
  redirectPage = true                       # 是否启用跳转中转页（外部链接通过中转页跳转）
  
  # 跳转中转页配置
  [params.linkCard.redirect]
    pagePath = "/go/"                       # 跳转中转页路径（相对于站点根目录）
    countdown = 3                           # 倒计时时间（秒），0表示不自动跳转
    showCountdown = true                    # 是否显示倒计时
    showButton = true                       # 是否显示立即跳转按钮
    safeMessage = "😃 💡倒计时结束自动跳转，也可自行点击跳转，请注意您的账号和财产安全"  # 安全提示信息
  
  # 替换白名单（匹配的链接不会被替换为卡片或跳转页）
  replaceWhitelist = [
    # "https://example\\.com/.*",           # 正则表达式示例
    # "https://trusted-site\\.com"          # 字符串匹配示例
  ]
  
  # 页面白名单（仅在这些页面处理链接）
  pageWhitelist = [
    # "/posts/.*",                          # 仅文章页
    ".*"                                    # 所有页面
  ]
  
  # 元素白名单（仅在这些元素内处理链接）
  elementWhitelist = [
    ".post-content"                        # 文章内容区域
    # "#article-container"                  # 其他容器示例
  ]
  
  # 跳转白名单（匹配的链接使用跳转页但显示为安全）
  redirectWhitelist = [
    # "https://zhihu\\.com/.*",             # 知乎链接示例
    # "https://.*\\.github\\.io/.*"         # GitHub Pages示例
  ]
```

#### 配置参数说明

**基础配置参数**：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `enable` | boolean | 是否启用链接卡片功能 | `true` |
| `cardMode` | string | 卡片显示模式：none、all、internal、external | `"external"` |
| `openInNewTab` | boolean | 链接是否在新标签页打开 | `true` |
| `showArticleInfo` | boolean | 是否显示文章信息（仅内部链接有效） | `true` |
| `showArticleTitle` | boolean | 是否显示文章标题（仅内部链接有效） | `true` |
| `showArticleDate` | boolean | 是否显示文章日期（仅内部链接有效） | `true` |
| `showArticleSummary` | boolean | 是否显示文章摘要（仅内部链接有效） | `true` |
| `redirectPage` | boolean | 是否启用跳转中转页 | `true` |

**跳转中转页配置参数**：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `pagePath` | string | 跳转中转页路径 | `"/go/"` |
| `countdown` | number | 倒计时时间（秒），0表示不自动跳转 | `3` |
| `showCountdown` | boolean | 是否显示倒计时 | `true` |
| `showButton` | boolean | 是否显示立即跳转按钮 | `true` |
| `safeMessage` | string | 安全提示信息 | `"😃 来自本站，本站可确保其安全性，请放心点击跳转"` |

**白名单配置参数**：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `replaceWhitelist` | array | 替换白名单（匹配的链接不会被替换为卡片或跳转页） | `[]` |
| `pageWhitelist` | array | 页面白名单（仅在这些页面处理链接） | `[]` |
| `elementWhitelist` | array | 元素白名单（仅在这些元素内处理链接） | `[".post-content"]` |
| `redirectWhitelist` | array | 跳转白名单（匹配的链接使用跳转页但显示为安全） | `[]` |

#### 卡片显示模式说明

**1. none（不显示）**
- 不显示任何链接卡片
- 链接保持原始样式

**2. all（所有链接）**
- 显示所有链接的卡片
- 包括内部链接和外部链接

**3. internal（仅内部链接）**
- 仅显示内部链接的卡片
- 外部链接保持原始样式

**4. external（仅外部链接）**
- 仅显示外部链接的卡片
- 内部链接保持原始样式

#### 文章信息展示

当 `showArticleInfo = true` 时，内部链接卡片会从 `/index.json` 自动获取并显示文章信息：

- **文章标题**：如果 `showArticleTitle = true`，显示文章标题（替代链接文本）
- **文章日期**：如果 `showArticleDate = true`，显示文章发布日期
- **文章摘要**：如果 `showArticleSummary = true`，显示文章摘要（最多2行）

#### 跳转中转页

跳转中转页提供安全的外部链接跳转功能：

- **倒计时跳转**：支持配置倒计时时间，倒计时结束后自动跳转
- **立即跳转按钮**：支持显示立即跳转按钮，用户可随时点击跳转
- **安全提示信息**：可自定义安全提示信息，提醒用户注意安全
- **美观界面**：中转页采用现代化设计，支持明暗主题切换

#### 白名单机制

**替换白名单（replaceWhitelist）**：
- 匹配的链接不会被替换为卡片或跳转页
- 链接保持原始样式和行为
- 支持正则表达式和字符串匹配

**页面白名单（pageWhitelist）**：
- 仅在这些页面处理链接
- 支持正则表达式匹配页面路径
- 空数组表示处理所有页面

**元素白名单（elementWhitelist）**：
- 仅在这些元素内处理链接
- 支持CSS选择器
- 默认值为 `[".post-content"]`

**跳转白名单（redirectWhitelist）**：
- 匹配的链接使用跳转页但显示为安全
- 支持正则表达式和字符串匹配

#### 使用示例

**示例1：仅显示外部链接卡片**

```toml
[params.linkCard]
  enable = true
  cardMode = "external"                     # 仅外部链接显示卡片
  openInNewTab = true
  redirectPage = true                       # 启用跳转中转页
```

**示例2：显示所有链接卡片，内部链接显示文章信息**

```toml
[params.linkCard]
  enable = true
  cardMode = "all"                          # 所有链接显示卡片
  showArticleInfo = true
  showArticleTitle = true
  showArticleDate = true
  showArticleSummary = true
  redirectPage = false                      # 不启用跳转中转页
```

**示例3：配置白名单**

```toml
[params.linkCard]
  enable = true
  cardMode = "external"
  redirectPage = true
  
  # 替换白名单：这些链接不会被处理
  replaceWhitelist = [
    "https://trusted-site\\.com/.*",       # 信任的网站
    "https://example\\.com"                 # 示例网站
  ]
  
  # 页面白名单：仅在这些页面处理链接
  pageWhitelist = [
    "/posts/.*"                             # 仅文章页
  ]
  
  # 元素白名单：仅在这些元素内处理链接
  elementWhitelist = [
    ".post-content",                        # 文章内容区域
    "#article-container"                     # 文章容器
  ]
```

#### 功能特性

- ✅ **智能识别**：自动识别内部链接和外部链接
- ✅ **文章信息**：内部链接自动获取并显示文章信息
- ✅ **安全跳转**：外部链接通过中转页安全跳转
- ✅ **白名单机制**：灵活配置白名单，精确控制处理范围
- ✅ **PJAX兼容**：完全兼容PJAX页面切换
- ✅ **响应式设计**：完美适配各种设备
- ✅ **暗色模式**：自动适配明暗主题
- ✅ **不影响现有功能**：所有修改不影响现有样式、功能、布局

#### 注意事项

- 跳转中转页需要创建 `content/go.md` 文件（使用 `layout: "go"`）
- 文章信息从 `/index.json` 获取，确保该文件存在
- 白名单支持正则表达式，注意转义特殊字符
- 跳转中转页路径建议使用 `/go/` 格式（Hugo默认路径）

### 12. 背景粒子特效配置 ✨（v2.8.7+）

背景粒子特效功能参考 BeaconNav 主题实现，支持在网站背景显示动态粒子效果，粒子之间会连线，支持鼠标交互。

#### 基础配置

在 `hugo.toml` 中配置：

```toml
# ===== 背景粒子特效配置 =====
# 参考 BeaconNav 主题实现，支持背景粒子特效
[params.particleEffect]
  enable = false                         # 是否启用背景粒子特效（true=启用，false=禁用）
  count = 80                            # 粒子数量（建议范围：50-150，数量越多性能消耗越大）
  color = ""                             # 粒子颜色（留空则根据主题自动适配：暗色模式白色，亮色模式黑色）
                                        # 格式：rgba(255, 255, 255, 0.5) 或 #ffffff
  lineColor = ""                         # 连线颜色（留空则根据主题自动适配）
                                        # 格式：rgba(255, 255, 255, 0.1) 或 #ffffff
  lineDistance = 150                     # 连线距离（像素，粒子之间距离小于此值时会连线）
  speed = 0.5                            # 粒子移动速度（建议范围：0.1-2.0）
  radius = 1.5                           # 粒子半径（像素）
  interactive = true                     # 是否启用鼠标交互（true=鼠标移动时粒子会响应，false=不响应）
  zIndex = 0                             # 层级（0=最底层背景，数值越大越靠前）
```

#### 配置参数说明

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `enable` | boolean | 是否启用背景粒子特效 | `false` |
| `count` | number | 粒子数量（建议范围：50-150） | `80` |
| `color` | string | 粒子颜色（留空自动适配主题） | `""` |
| `lineColor` | string | 连线颜色（留空自动适配主题） | `""` |
| `lineDistance` | number | 连线距离（像素） | `150` |
| `speed` | number | 粒子移动速度 | `0.5` |
| `radius` | number | 粒子半径（像素） | `1.5` |
| `interactive` | boolean | 是否启用鼠标交互 | `true` |
| `zIndex` | number | 层级（0=最底层） | `0` |

#### 颜色配置

**自动适配主题**（推荐）：
- 留空 `color` 和 `lineColor`，系统会根据当前主题自动设置颜色
- 暗色模式：粒子白色，连线白色（半透明）
- 亮色模式：粒子黑色，连线黑色（半透明）

**自定义颜色**：
- 支持 rgba 格式：`rgba(255, 255, 255, 0.5)`
- 支持十六进制格式：`#ffffff`（会自动转换为 rgba）
- 粒子颜色建议透明度 0.3-0.5
- 连线颜色建议透明度 0.1-0.2

#### 使用示例

**示例1：启用粒子特效（自动适配主题）**

```toml
[params.particleEffect]
  enable = true                          # 一键开启
  count = 80                             # 默认粒子数量
  # color 和 lineColor 留空，自动适配主题
```

**示例2：自定义颜色和数量**

```toml
[params.particleEffect]
  enable = true
  count = 100                            # 增加粒子数量
  color = "rgba(79, 195, 247, 0.5)"     # 自定义粒子颜色（蓝色）
  lineColor = "rgba(79, 195, 247, 0.1)"  # 自定义连线颜色
  speed = 0.8                            # 加快移动速度
  interactive = true                     # 启用鼠标交互
```

**示例3：性能优化配置（移动端）**

```toml
[params.particleEffect]
  enable = true
  count = 50                             # 减少粒子数量，提升性能
  speed = 0.3                            # 降低移动速度
  interactive = false                    # 禁用鼠标交互，减少计算
```

#### 功能特性

- ✨ **动态粒子效果**：粒子在背景中移动，形成动态视觉效果
- 🔗 **智能连线**：距离较近的粒子会自动连线，形成网络效果
- 🖱️ **鼠标交互**：鼠标移动时，粒子会响应并连线（可选）
- 🌓 **主题适配**：自动根据暗色/亮色模式调整颜色
- ⚡ **性能优化**：支持调整粒子数量和速度，平衡效果和性能
- 🔄 **PJAX兼容**：完全兼容PJAX页面切换
- 📱 **响应式设计**：完美适配各种设备
- 🎨 **自定义配置**：支持自定义颜色、数量、速度等参数

#### 注意事项

- 默认关闭，需要在配置中设置 `enable = true` 才能启用
- 粒子数量建议 50-150，过多可能影响性能
- 颜色留空会自动适配主题，也可自定义
- zIndex 默认为 0，确保在背景层，不影响内容交互
- 移动端建议减少粒子数量以提升性能

### 13. 数据页面配置 📊（v2.8.0+）

数据页面展示网站的各项统计数据，包括访问统计、文章数量、站点数据等。

#### 创建数据页面

在 `content/` 目录下创建 `data.md` 文件：

```markdown
---
title: "数据统计"
date: 2025-01-27T20:00:00+08:00
type: "data"
layout: "data"
comments: false
slug: "data"
---

欢迎来到数据统计页面！
```

#### 数据项配置

在 `hugo.toml` 中配置数据页面显示的数据项：

```toml
[params.data]
  showTotalWords = true                  # 全站字数
  showTotalPosts = true                  # 全站文章数
  showResponseTime = true                # 响应耗时
  showLastUpdate = true                 # 最后更新时间
  showCommentCount = true                # 评论数目（需要Artalk API支持）
```

**数据项说明**：
- **全站字数**：自动计算所有文章的总字数，显示为"千"或"万"单位
- **全站文章数**：显示站点文章总数
- **响应耗时**：自动计算页面加载时间，显示为毫秒或秒
- **最后更新时间**：显示最近更新的文章时间，格式化为"X天前"等
- **评论数目**：通过Artalk API获取评论总数（需要配置Artalk评论系统）

**功能特性**：
- ✅ 全站字数：从Hugo模板计算，准确可靠
- ✅ 响应时间：实时计算页面加载时间
- ✅ 最后更新：自动查找最新文章更新时间
- ✅ 评论统计：集成Artalk API，实时获取评论数
- ✅ 响应式设计：完美适配各种设备

**详细使用说明**：[数据页面使用示例](/posts/m9xdtbqg.html)

## 自定义样式

### 添加自定义CSS

在 `assets/css/` 目录下创建自定义CSS文件：

```css
/* 自定义样式 */
:root {
  --primary-color: #你的主色;
  --accent-color: #你的强调色;
}

/* 覆盖主题样式 */
.your-custom-class {
  /* 你的样式 */
}
```

### 自定义JavaScript

在 `assets/js/` 目录下添加自定义脚本：

```javascript
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 你的自定义逻辑
});
```

## 图片资源管理

### 默认图片配置

```toml
[params.images]
  avatar = "/img/avatar.png"             # 作者头像
  defaultCover = "/img/default-cover.jpg" # 默认封面
  fallbackImage = "/img/404.jpg"         # 备用图片
  favicon = "/img/favicon.ico"           # 网站图标
  logo = "/img/logo.png"                 # 网站LOGO
```

### 图片目录结构

```
static/
  img/
    avatar.png          # 作者头像
    default-cover.jpg   # 默认封面
    404.jpg            # 404图片
    favicon.ico        # 网站图标
    logo.png           # 网站LOGO
    icons/             # 图标目录
      home.svg
      blog.svg
      cat.svg
      tag.svg
      link.svg
      mr.svg
```

## 高级功能

### 1. 相关文章配置

```toml
[related]
  threshold = 80
  includeNewer = true
  toLower = true
  
  [[related.indices]]
    name = "tags"
    weight = 100
    
  [[related.indices]]
    name = "categories"
    weight = 80
```

### 2. 目录生成配置

```toml
[markup]
  [markup.tableOfContents]
    startLevel = 2    # 从h2开始
    endLevel = 6      # 到h6结束
    ordered = false   # 不显示序号
```

## 部署说明

### 构建站点

```bash
hugo --minify
```

### 部署到GitHub Pages

1. 创建 `.github/workflows/gh-pages.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          fetch-depth: 0
      
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      
      - name: Build
        run: hugo --minify
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## 故障排除

### 常见问题

1. **主题不显示**
   - 检查 `theme = "demius"` 配置
   - 确认主题目录存在

2. **评论系统不工作**
   - 检查Artalk服务器配置
   - 确认站点名称匹配

3. **搜索功能失效**
   - 确保启用了JSON输出
   - 检查索引文件路径

4. **图片加载失败**
   - 检查图片路径配置
   - 确认图片文件存在

## 更新日志

### v2.8.8 (最新)
- 📢 新增顶部公告栏功能：支持自定义文字和说说轮播两种模式
- 🎯 灵活配置：可配置是否与导航栏一起固定
- 🔗 点击跳转：说说内容可点击跳转到说说页面对应位置
- ⚡ 轮播控制：可配置轮播切换间隔和动画速度
- 🏠 模式兼容：在主页大图model2模式下自动隐藏，下滑后显示
- 👁️ 沉浸模式：兼容沉浸阅读模式，自动隐藏
- 📱 响应式设计：完美适配移动端

### v2.8.7 (2025-01-31)
- ✨ 新增背景粒子特效功能：参考 BeaconNav 主题实现，支持动态粒子效果
- 🎨 智能连线：粒子之间自动连线，形成网络效果
- 🖱️ 鼠标交互：支持鼠标移动时粒子响应（可选）
- 🌓 主题适配：自动根据暗色/亮色模式调整颜色
- ⚙️ 灵活配置：支持自定义粒子数量、颜色、速度等参数
- 🔄 PJAX兼容：完全兼容PJAX页面切换
- 📱 性能优化：支持调整参数平衡效果和性能

### v2.7.9 (2025-11-05)
- 🎨 网友圈随机背景色功能：文章卡片和选项卡支持8种渐变色随机分配
- 🔄 网友圈PJAX优化：修复切换后数据不自动加载的问题
- 🗑️ 移除调试信息：清理控制台输出，保持代码专业

### v2.7.8 (2025-11-04)
- 👥 网友圈数据源简化：移除RSS直接抓取，全部从预生成JSON获取
- 🗑️ 移除网友圈轮播图功能：简化页面结构，专注文章展示
- ⏰ 文章显示规则重构：移除数量限制，新增分组时间配置（每个分组可配置显示最近N天内的文章）
- 🔧 代码简化：移除约1100行冗余代码，提升维护性

### v2.7.7 (2025-11-03)
- 🔒 优化加密逻辑安全性：加密内容 base64 编码存储，页面源码中不暴露明文
- 🛡️ 增强密码保护：使用 SHA256 哈希验证，动态解码显示
- 🧹 移除控制台调试信息：保持控制台干净，仅保留必要的错误日志
- ✅ 完全兼容现有功能，支持 PJAX 和 sessionStorage 状态记忆

### v2.7.6 (2025-11-02)
- 📱 优化手机端首页文章卡片标题样式，与PC端保持一致
- 🔘 新增手机端目录按钮弹出模式配置（支持弹出整个右侧栏或仅弹出目录）
- 🎨 仅目录模式保持与右侧栏相同的位置样式和弹出方式（从右侧滑入）

### v2.7.5 (2025-11-01)
- 🎨 优化系列文章序号颜色，亮色模式黑色文字，暗色模式白色文字
- 🔘 修复首页悬浮按钮显示问题，提高z-index层级
- 📐 修复侧栏隐藏时布局顺序问题，确保中间栏和右侧栏顺位滑动

### v2.7.4 (2025-10-31)
- 📚 新增小说书单功能，支持三种状态分类（已读、在读、想读）
- 🌈 标签和文字随机颜色系统，12种配色循环
- 🎨 精美的卡片式布局，封面展示，响应式适配，暗色模式支持

### v2.7.3 (2025-10-31)
- 🎬 新增追番星球功能，展示B站追番追剧记录
- 📊 三种状态分类（想看、在看、看过），进度条可视化
- 🎨 精美的卡片式布局，响应式适配，暗色模式支持

### v2.7.2 (2025-10-30)
- 🗑️ 移除侧栏搜索组件（保留导航栏右上角搜索）
- 🎯 精简 `_search.css`：移除仅侧栏使用样式，保留通用样式
- 🛡️ 不影响现有样式/功能/布局与本地预览端口

### v2.7.1 (2025-10-29)
- 🔐 加密弹窗仅覆盖文章内容（定位与z-index优化）
- 🔙 浏览器返回/PJAX切换自动清理加密遮罩
- 🏠 Mode2全屏大图修复首次侧栏闪烁，改为 display:none + 动画显示
- 🎨 新增加密弹窗样式配置（文字颜色、背景色、背景图）

### v2.7.0 (2025-10-29)
- 🎨 侧栏组件背景系统：12个组件支持背景图/渐变色（默认关闭）
- 🧩 统一参数：backgroundImage/backgroundColor/textColor/overlayColor 等
- 🛡️ 安全：使用 safeCSS 防止渐变被转义（ZgotmplZ）
- 💬 新增留言板功能，专属页面 + 评论系统
- 🔐 新增文章加密功能（全文加密 + 部分加密）
- 🌈 新增评论弹幕功能，20种彩色弹幕，智能防重叠
- 🔘 浮动按钮组增强（阅读进度、沉浸式阅读、侧栏切换、弹幕控制）
- ❤️ 互动功能（点赞收藏、8平台分享、状态记忆）

### v2.2.0 (2025-10-26)
- ✨ 新增侧栏一体化模式
- 🎨 统一侧栏组件视觉样式
- 🔄 支持一键切换分割/一体化模式
- 📱 响应式自适应优化
- 🌓 完整暗色模式支持
- 📚 新增侧栏配置使用文档

### v2.1.2 (2025-10-26)
- 🐛 修复PJAX评论加载问题
- 🔧 优化Artalk资源加载策略
- 🎯 修复页面路由跳转问题
- 📐 修复双列布局标题截断
- 🗑️ 移除热门文章阅读量显示
- 📱 增强PJAX视觉反馈

### v2.1.1 (2025-10-25)
- 🎨 新增置顶文章徽章颜色配置
- 🌈 支持自定义图标和文字颜色
- 🌓 独立的暗色模式配色
- 📚 新增置顶样式配置指南

### v2.1.0 (2025-10-25)
- ✨ 新增音乐播放器功能
- ✨ 新增彩色文字功能
- ✨ 新增评论可见内容功能
- ✨ 新增页脚配置功能（运行时间、网站地图）
- 🎨 优化页脚样式
- 🐛 修复多项已知问题
- 📚 完善功能文档

### v2.0.0 (2025-10-24)
- ✨ 新增时间线功能
- ✨ 新增内容折叠功能
- ✨ 新增相册功能
- ✨ 新增选项卡功能
- 🎨 统一视觉风格
- 📚 创建14个功能文档

### v1.0.0
- 基础布局系统
- 评论系统集成
- 搜索功能
- 响应式设计
- 明暗主题切换

## 功能文档

**功能使用示例文章**：
- 🎵 [音乐播放器功能使用示例](/posts/09z126nx.html)
- 🎨 [彩色文字功能使用示例](/posts/18o72ymk.html)
- 🔒 [评论可见功能使用示例](/posts/5cilldeb.html)
- 📦 [内容折叠功能使用示例](/posts/yidnwm4k.html)
- 📅 [时间线功能使用示例](/posts/hdzd30xa.html)
- 📑 [选项卡功能使用示例](/posts/a5wxauo6.html)
- 🖼️ [相册功能使用示例](/posts/qhlt295l.html)
- 🎬 [视频嵌入使用示例](/posts/ge0yozpt.html)
- 🔐 [文章加密功能使用示例](/posts/el63izg7.html)
- 📊 [数据统计功能使用示例](/posts/27o2v4e1.html)

## 技术支持

如有问题，请通过以下方式联系：
- GitHub Issues: [项目地址]
- 邮箱: demius@qq.com
- 文档评论区

---

*本文档最后更新：2025年2月1日*  
*当前版本：v2.8.8*
