# Demius Theme Config Reference

这份文档是 [`hugo.toml`](../hugo.toml) 的开发参考，不追求逐行复制配置文件，而是按模块整理出最常用、最关键、最容易互相影响的参数。

配套阅读：

- 架构与维护入口见 [development-guide.md](development-guide.md)
- 各功能使用说明见 [README.md](README.md) 中的专题文档

## 1. 配置文件定位

主配置文件：

- [`hugo.toml`](../hugo.toml)

它当前承担了四类职责：

1. Hugo 站点基础配置
2. 菜单与输出配置
3. 主题功能参数
4. 第三方服务接入参数

当前文件已经比较大。继续扩展时建议优先复用现有分组，不要新增语义重复的参数。

## 2. 站点基础配置

### 2.1 站点与语言

关键参数：

- `baseURL`
- `languageCode`
- `title`
- `theme`
- `defaultContentLanguage`
- `hasCJKLanguage`

说明：

- `baseURL` 影响 canonical、RSS、链接输出和部分脚本拼接
- 中文站点建议保留 `hasCJKLanguage = true`

### 2.2 RSS、分页、输出

关键参数：

- `copyright`
- `rssLimit`
- `[pagination].pagerSize`
- `[outputs].home`

说明：

- 本地搜索依赖 `home = ["HTML", "RSS", "JSON"]` 里的 `JSON`
- 单列和双列首页会受 `pagerSize` 影响
- 三列瀑布流当前不走分页

### 2.3 永久链接与分类法

关键参数：

- `[permalinks].posts`
- `[taxonomies].tag`
- `[taxonomies].category`

说明：

- 当前文章固定输出到 `/posts/:slug.html`
- 如果要修改文章 URL 规则，要连带检查友链、分享、SEO、旧链接兼容

## 3. 菜单配置

配置区块：

- `[menu]`
- `[[menu.main]]`
- `[menu.main.params]`

常用字段：

- `name`
- `url`
- `weight`
- `identifier`
- `parent`
- `params.icon`

说明：

- 主题导航支持多级菜单
- `identifier` 用于作为父级节点引用
- `parent` 用于挂载二级或三级菜单
- 菜单图标依赖 `params.icon`

对应模板：

- [`themes/demius/layouts/partials/header/navigation.html`](../themes/demius/layouts/partials/header/navigation.html)

## 4. 全站主题参数

配置入口：

- `[params]`

### 4.1 基础信息与全局开关

关键参数：

- `author`
- `description`
- `darkMode`
- `pjax`
- `stickyHeader`
- `tocOpen`
- `grayscaleMode`

说明：

- `author` 和 `description` 会进入 meta、版权区、部分侧栏
- `pjax` 会影响几乎所有前端模块初始化方式
- `stickyHeader` 和顶部公告、移动端导航行为有关

### 4.2 首页布局

关键参数：

- `homeColumns`
- `mainSections`
- `summaryLength`

说明：

- `homeColumns = 1/2/3` 对应三种首页引擎
- `mainSections` 控制首页文章来源
- `summaryLength` 控制列表摘要截断长度

对应模板：

- [`themes/demius/layouts/index.html`](../themes/demius/layouts/index.html)
- [`themes/demius/layouts/partials/main/engine-1.html`](../themes/demius/layouts/partials/main/engine-1.html)
- [`themes/demius/layouts/partials/main/engine-2.html`](../themes/demius/layouts/partials/main/engine-2.html)
- [`themes/demius/layouts/partials/main/engine-3.html`](../themes/demius/layouts/partials/main/engine-3.html)

### 4.3 透明背景模式

关键参数：

- `postCardTransparentMode`
- `postCardTransparentType`
- `postPageTransparentMode`
- `postPageTransparentType`
- `params.aside.transparentMode`
- `params.carousel.transparentMode`
- `params.carousel.transparentType`

说明：

- 这组参数控制首页卡片、文章页、侧栏、轮播图的透明/毛玻璃表现
- `Type` 通常为 `glass` 或 `full`

建议：

- 继续扩展透明样式时保持命名一致，不要再引入新的模式命名

## 5. 字体、图片与背景

### 5.1 字体

配置区块：

- `[params.font]`

关键参数：

- `enable`
- `type`
- `onlineUrl`
- `fontFamily`
- `localName`
- `localPath`
- `localFormat`

说明：

- `type = "online"` 时走在线字体
- `type = "local"` 时走本地字体文件
- 本地字体文件通常放在 `static/fonts` 或主题静态资源目录

### 5.2 图片

配置区块：

- `[params.images]`

关键参数：

- `avatar`
- `defaultCover`
- `fallbackImage`
- `favicon`
- `logo`

说明：

- 这些是多个模板和组件共用的默认资源位
- 替换资源时尽量优先改这里，不要到模板里硬编码路径

### 5.3 背景图

配置区块：

- `[params.background]`
- `[params.background.site]`

关键参数：

- `effect_mode`
- `site.enable`
- `site.image`
- `site.blur`
- `site.brightness`
- `site.opacity`

说明：

- `effect_mode` 是三栏容器背景表现
- `site.*` 是整站背景图
- 首页大图 `mode2` 可选择覆盖整站背景图

### 5.4 粒子特效

配置区块：

- `[params.particleEffect]`

关键参数：

- `enable`
- `count`
- `color`
- `lineColor`
- `lineDistance`
- `speed`
- `radius`
- `interactive`
- `zIndex`

建议：

- 这个功能明显吃性能，默认值不建议继续上调

## 6. 首页与视觉模块

### 6.1 首页大图

配置区块：

- `[params.homeBigImage]`
- `[params.homeBigImage.mode1]`
- `[params.homeBigImage.mode2]`

关键参数：

- `enable`
- `mode`
- `title`
- `subtitle`
- `mode1.backgroundImage`
- `mode1.arrowAnimation`
- `mode1.scrollSpeed`
- `mode1.cardAnimation`
- `mode2.fullScreen`
- `mode2.overlayOpacity`
- `mode2.customBackgroundImage`
- `mode2.typewriterEnable`
- `mode2.typewriterSpeed`
- `mode2.typewriterDelay`
- `mode2.typewriterCursor`
- `mode2.typewriterLoop`

说明：

- `mode1` 是中间栏大图
- `mode2` 是整屏欢迎区
- 打字机效果只对 `mode2` 副标题生效

### 6.2 轮播图

配置区块：

- `[params.carousel]`

关键参数：

- `enable`
- `height`
- `autoplay`
- `interval`
- `direction`
- `showOnPages`
- `transparentMode`
- `transparentType`

数据源：

- [`data/carousel.yaml`](../data/carousel.yaml)

说明：

- 轮播项本身不再写在 `hugo.toml`
- 这里只控制行为和显示模式

### 6.3 浮动按钮

配置区块：

- `[params.floatButtons]`

关键参数：

- `position`
- `showBackToTop`
- `showThemeToggle`
- `showSidebarToggle`

## 7. 文章页与内容增强

### 7.1 文章互动

配置区块：

- `[params.postActions.like]`
- `[params.postActions.share]`

关键参数：

- `like.enable`
- `like.icon`
- `like.text`
- `like.likedText`
- `share.enable`
- `share.icon`
- `share.text`
- `share.platforms`

说明：

- 分享平台可自定义 URL 模板
- `platforms` 中的 `{url}`、`{title}`、`{description}` 会在前端替换

### 7.2 打赏

配置区块：

- `[params.reward]`

关键参数：

- `enable`
- `buttonText`
- `title`
- `wechat`
- `alipay`

### 7.3 视频

配置区块：

- `[params.video]`

关键参数：

- `enable`

### 7.4 置顶样式

配置区块：

- `[params.pinned]`

关键参数：

- `iconColor`
- `textColor`
- `iconColorDark`
- `textColorDark`

说明：

- 这里只控制置顶徽章视觉
- 是否置顶仍然由文章 front matter 中的 `pinned` 控制

### 7.5 加密

配置区块：

- `[params.encryption]`

关键参数：

- `enable`
- `fullHint`
- `partialHint`
- `wrongPasswordHint`
- `popupTextColor`
- `popupBackgroundColor`
- `popupBackgroundImage`
- `partialPopupTextColor`
- `partialPopupBackgroundColor`
- `partialPopupBackgroundImage`

说明：

- 全文加密和局部加密分别有独立弹窗样式
- 真正密码内容通常来自文章 front matter 或短代码参数

### 7.6 链接卡片与跳转中转

配置区块：

- `[params.linkCard]`
- `[params.linkRedirect]`

关键参数：

- `linkCard.enable`
- `linkCard.defaultType`
- `linkCard.openInNewTab`
- `linkCard.showArticleInfo`
- `linkCard.showArticleDate`
- `linkCard.showArticleSummary`
- `linkCard.showUrl`
- `linkCard.internalIcon`
- `linkCard.externalIcon`
- `linkRedirect.enable`
- `linkRedirect.pagePath`
- `linkRedirect.countdown`
- `linkRedirect.showCountdown`
- `linkRedirect.showButton`
- `linkRedirect.safeMessage`
- `linkRedirect.processShortcodeLinks`
- `linkRedirect.skipPatterns`
- `linkRedirect.pageWhitelist`
- `linkRedirect.elementWhitelist`
- `linkRedirect.safeWhitelist`

说明：

- `linkCard` 主要用于短代码展示
- `linkRedirect` 主要用于外链中转页和安全提示

## 8. 侧栏系统

配置入口：

- `[params.aside]`

这是当前最复杂的一组配置。

### 8.1 全局行为

关键参数：

- `unifiedMode`
- `transparentMode`
- `wideMode`
- `left`
- `right`

说明：

- `left`、`right` 控制组件顺序
- `wideMode` 可用 `false/"normal"`、`"medium"`、`true/"wide"`

### 8.2 组件开关

常见字段：

- `showAuthor`
- `showToc`
- `showTags`
- `showRecent`
- `showCategories`
- `showArchive`
- `showPopularPosts`
- `showRelatedPosts`
- `showSocialMedia`
- `showAdvertisement`
- `showAnnouncement`
- `showLifeTime`
- `showDataStats`
- `showHitokoto`
- `showVisitorInfo`
- `showRandomImage`
- `showMusic`

说明：

- 组件是否出现，通常先受 `showXxx` 控制
- 某些组件还会有自身的 `enabled` 或 `enable` 字段

### 8.3 数量控制

关键参数：

- `popularCount`
- `recentCount`
- `relatedCount`
- `tagsCount`

### 8.4 侧栏组件通用样式字段

很多组件都重复使用同一套背景字段：

- `enableBackground`
- `backgroundImage`
- `backgroundColor`
- `backgroundSize`
- `backgroundPosition`
- `backgroundRepeat`
- `textColor`
- `textShadow`
- `overlayColor`
- `borderRadius`

涉及的典型组件：

- `author`
- `announcement`
- `lifeTime`
- `dataStats`
- `hitokoto`
- `randomImage`
- `visitorInfo`
- `music`
- `social-Media`
- `recent-Posts`
- `related-Posts`
- `toc`
- `tags`
- `categories`
- `advertisement`
- `popular-Posts`
- `recentComments`
- `archive`
- `seriesPosts`

建议：

- 后续如果继续维护，优先考虑把这套字段抽象成统一 schema 文档
- 新增组件时尽量复用这套字段，避免每个 widget 发明一套新的背景参数

### 8.5 侧栏中特别重要的组件

#### `aside.toc`

关键参数：

- `mobilePopupMode`

说明：

- 控制移动端弹出目录时是只弹目录还是整块右侧栏

#### `aside.dataStats`

关键参数：

- `showPostsCount`
- `showTagsCount`
- `showCategoriesCount`
- `showRunningYear`
- `showTotalWords`
- `showResponseTime`
- `showLastUpdate`
- `showCommentCount`

#### `aside.hitokoto`

关键参数：

- `enabled`
- `apiType`
- `showFrom`
- `nsmaoApiKey`
- `nsmaoApiUrl`

#### `aside.randomImage`

关键参数：

- `enabled`
- `apis`
- `refreshInterval`
- `showRefreshButton`

#### `aside.visitorInfo`

关键参数：

- `enabled`
- `apiKey`
- `customLat`
- `customLng`
- `siteName`
- `fontColor`
- `showFriendsLinks`
- `travellingsLink`
- `blogsClubLink`

#### `aside.music`

关键参数：

- `enabled`
- `items`

每个 `items` 条目常见字段：

- `server`
- `type`
- `id`
- `badge`
- `autoplay`
- `listFolded`
- `url`
- `name`
- `artist`
- `cover`

#### `aside.archive`

关键参数：

- `defaultOpenCurrentYear`
- `defaultOpenCurrentMonth`
- `showStats`
- `groupBy`

#### `aside.seriesPosts`

关键参数：

- `enable`
- `enableCarousel`
- `carouselInterval`
- `series`

每个 `series` 条目常见字段：

- `name`
- `description`
- `slugs`

## 9. 侧栏外的内容组件

### 9.1 相关文章

配置区块：

- `[related]`
- `[[related.indices]]`

关键参数：

- `threshold`
- `includeNewer`
- `toLower`
- `indices[].name`
- `indices[].weight`

说明：

- 当前主要通过 `tags` 与 `categories` 计算相关文章

### 9.2 公告与广告

配置区块：

- `[params.advertisement]`
- `[params.announcement]`
- `[params.announcement.link]`

关键参数：

- 广告：`enable`、`title`、`description`、`image`、`link`
- 公告：`enable`、`allowHtml`、`important`、`title`、`content`、`date`
- 公告链接：`enable`、`text`、`url`

### 9.3 社交与联系信息

配置区块：

- `[params.contact]`
- `[params.social]`
- `[params.social.custom]`

关键参数：

- `contact.email`
- `social.links`
- `social.custom.enable`
- `social.custom.title`
- `social.custom.content`

## 10. 评论、弹幕与统计

### 10.1 评论系统

配置区块：

- `[params.comment]`
- `[params.comment.artalk]`

关键参数：

- `comment.enable`
- `comment.system`
- `artalk.server`
- `artalk.site`
- `artalk.placeholder`
- `artalk.darkMode`
- `artalk.locale`
- `artalk.gravatar`
- `artalk.pageSize`
- `artalk.emoticons`
- `artalk.heightLimit`
- `artalk.useLocal`
- `artalk.cdn`
- `artalk.cdnIndex`

说明：

- 当前主题重点适配的是 Artalk
- `useLocal = true` 时优先读取本地资源，否则走指定 CDN

### 10.2 弹幕

配置区块：

- `[params.danmaku]`

关键参数：

- `enable`
- `scope`
- `speed`
- `fontSize`
- `opacity`
- `maxCount`
- `updateInterval`
- `showAvatar`
- `showTime`
- `loop`
- `randomPosition`
- `colorful`
- `antiOverlap`

### 10.3 Umami 统计

配置区块：

- `[params.analytics.umami]`
- `[params.data]`

关键参数：

- `umami.enable`
- `umami.scriptUrl`
- `umami.websiteId`
- `umami.showInDataPage`
- `umami.apiUrl`
- `umami.useForPostViews`
- `data.showTotalWords`
- `data.showTotalPosts`
- `data.showResponseTime`
- `data.showLastUpdate`
- `data.showCommentCount`

说明：

- Umami 既用于数据页，也可用于文章浏览量
- 数据页部分统计项也会受 `params.data` 控制

## 11. 页面型功能配置

### 11.1 分类 / 标签页

配置区块：

- `[params.taxonomy]`

关键参数：

- `colorMode`
- `customColor`

### 11.2 友链页

配置区块：

- `[params.links]`

关键参数：

- `cardColorMode`
- `cardCustomColor`

数据源：

- [`data/links.yaml`](../data/links.yaml)

### 11.3 网友圈页

配置区块：

- `[params.friendsCircle]`
- `[[params.friendsCircle.groupArticleDays]]`

关键参数：

- `preGeneratedJsonUrl`
- `initialDisplayCount`
- `loadMoreCount`
- `cardColorMode`
- `cardCustomColor`
- `tabColorMode`
- `tabCustomColor`
- `defaultArticleDays`
- `groupArticleDays`
- `rssTimeout`
- `rssCacheTime`

说明：

- 页面展示依赖预生成 JSON
- 分组时间规则支持全局默认值和分组覆盖值

### 11.4 书单页

配置区块：

- `[params.booklist]`

关键参数：

- `cardColorMode`
- `cardCustomColor`

### 11.5 音乐与悬浮音乐播放器

配置区块：

- `[params.music]`
- `[params.floatMusicPlayer]`

关键参数：

- `music.metingApi`
- `floatMusicPlayer.enabled`
- `floatMusicPlayer.sectionTitle`
- `floatMusicPlayer.autoplay`
- `floatMusicPlayer.listFolded`

说明：

- `[params.music]` 主要是 MetingJS 全局支持
- `[params.floatMusicPlayer]` 是独立悬浮播放器
- 侧栏音乐组件配置在 `params.aside.music`

### 11.6 页脚

配置区块：

- `[params.footer]`
- `[params.footer.runningTime]`

关键参数：

- `custom`
- `runningTime.enable`
- `runningTime.startDate`
- `runningTime.prefix`

### 11.7 弹窗公告

配置区块：

- `[params.popup]`

关键参数：

- `enable`
- `zIndex`

### 11.8 顶部公告栏

配置区块：

- `[params.topAnnouncement]`
- `[params.topAnnouncement.custom]`
- `[params.topAnnouncement.shuoshuo]`

关键参数：

- `enable`
- `mode`
- `height`
- `stickyWithHeader`
- `custom.text`
- `custom.link`
- `custom.linkText`
- `shuoshuo.apiUrl`
- `shuoshuo.count`
- `shuoshuo.interval`
- `shuoshuo.transitionDuration`
- `shuoshuo.showAvatar`
- `shuoshuo.showTime`
- `shuoshuo.cacheDuration`
- `shuoshuo.clickable`
- `shuoshuo.shuoshuoPageUrl`

## 12. 内容渲染

配置区块：

- `[markup.tableOfContents]`

关键参数：

- `startLevel`
- `endLevel`
- `ordered`

说明：

- 目录生成层级会直接影响文章页 TOC 与移动端目录弹层

## 13. 维护建议

### 13.1 新增参数前先检查

- 是否已有同义参数
- 是否已有对应的页面/组件分组
- 是否应该放到 `data/*.yaml` 而不是 `hugo.toml`

### 13.2 参数命名建议

- 布尔值使用 `enable` 或 `enabled` 其一，后续尽量统一
- 同类视觉参数沿用 `background*`、`textColor`、`overlayColor`、`borderRadius`
- 页面型配置统一以页面名作为分组入口

### 13.3 长期建议

未来若继续扩展，建议把 `hugo.toml` 拆分到 `config/_default/`，至少拆成：

- `hugo.toml` 或 `site.toml`
- `menus.toml`
- `params-core.toml`
- `params-aside.toml`
- `params-pages.toml`
- `services.toml`

这样会比继续在单文件里堆参数更可维护。
