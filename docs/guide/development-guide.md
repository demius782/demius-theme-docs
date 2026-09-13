# Demius Theme Development Guide

这份文档面向主题开发和长期维护，不讲单个功能怎么使用，而是说明这个仓库是怎么组织的、页面是怎么渲染的、改动应该落在哪一层，以及后续继续扩展时应遵守什么约定。

## 1. 仓库定位

这个仓库不是“纯主题仓库”，而是“站点仓库 + 主题源码 + 构建产物 + 运维脚本”的混合结构。

- 根目录是实际站点
- [`themes/demius`](../themes/demius) 是主题默认实现
- [`content`](../content) 是站点内容
- [`data`](../data) 是结构化页面数据
- [`static`](../static) 是站点层静态资源
- [`layouts`](../layouts) 是站点层模板覆盖入口
- [`public`](../public) 是 Hugo 构建产物
- [`resources`](../resources) 是 Hugo Pipes 缓存产物

维护时必须先判断你要改的是：

1. 主题默认能力
2. 当前站点的个性化覆盖
3. 构建或部署流程

不要把站点私有逻辑继续堆进主题默认实现里。

## 2. 目录分工

### 2.1 站点层

- [`hugo.toml`](../hugo.toml)
  站点主配置，包含菜单、首页布局、侧栏顺序、评论、统计、背景、音乐、交互等大部分参数。
- [`content`](../content)
  页面与文章内容。很多单页通过 front matter 中的 `type` 和 `layout` 命中主题模板。
- [`data`](../data)
  自定义页面的数据源，例如友链、相册、装备、书单、轮播、支持者等。
- [`static`](../static)
  站点层静态资源，会覆盖主题层同路径文件。
- [`layouts`](../layouts)
  站点层模板覆盖入口。若这里存在同名模板，优先级高于主题层。

### 2.2 主题层

- [`themes/demius/layouts`](../themes/demius/layouts)
  Hugo 模板。
- [`themes/demius/assets/css`](../themes/demius/assets/css)
  CSS 源文件，入口为 `main.css`。
- [`themes/demius/assets/js`](../themes/demius/assets/js)
  JS 模块，入口为 `main.js`。
- [`themes/demius/static`](../themes/demius/static)
  主题默认静态资源。
- [`themes/demius/content`](../themes/demius/content)
  主题示例内容，当前站点基本以根目录 `content` 为主。

### 2.3 构建与运维

- [`package.json`](../package.json)
  前端构建相关脚本。当前主要用于 Hugo 构建和搜索引擎提交流程。
- [`postcss.config.js`](../postcss.config.js)
  PostCSS 配置，负责处理 CSS import。
- [`deploy.py`](../deploy.py)
  增量部署脚本。
- [`generate_friends_circle_json.py`](../generate_friends_circle_json.py)
  从友链 RSS 生成 `static/all.json` 的脚本。

## 3. Hugo 渲染链路

### 3.1 基础页面骨架

绝大多数页面都会经过：

1. [`themes/demius/layouts/_default/baseof.html`](../themes/demius/layouts/_default/baseof.html)
2. 具体模板中的 `define "content"`
3. header / aside / footer / comment 等 partial

`baseof.html` 负责：

- HTML 骨架
- CSS/JS 资源注入
- 全局配置注入到 `window.siteConfig`
- 全站头部和底部
- 一些按配置启用的增强脚本

如果某个功能是“全站能力”，优先检查这里是否已经注入了资源或配置。

### 3.2 首页

首页入口有两部分：

- [`themes/demius/layouts/index.html`](../themes/demius/layouts/index.html)
- [`themes/demius/layouts/partials/main/engine-1.html`](../themes/demius/layouts/partials/main/engine-1.html)
- [`themes/demius/layouts/partials/main/engine-2.html`](../themes/demius/layouts/partials/main/engine-2.html)
- [`themes/demius/layouts/partials/main/engine-3.html`](../themes/demius/layouts/partials/main/engine-3.html)

首页显示逻辑主要受这些配置驱动：

- `params.homeBigImage.*`
- `params.homeColumns`
- `params.mainSections`
- `pagination.pagerSize`

说明：

- `engine-1` 是单列卡片
- `engine-2` 是双列网格
- `engine-3` 是三列瀑布流
- 首页置顶文章逻辑在 engine 模板里处理

如果你要改首页文章列表排序、分页、置顶、卡片布局，优先看这几处。

### 3.3 文章页

文章页主模板是：

- [`themes/demius/layouts/_default/single.html`](../themes/demius/layouts/_default/single.html)

它负责：

- 标题、日期、分类、标签
- 封面
- 正文内容
- 目录容器
- 点赞 / 打赏 / 分享
- 版权信息
- 上下篇
- 评论区

涉及文章详情表现时，优先判断是：

- 模板结构问题
- CSS 表现问题
- JS 增强问题
- front matter 字段问题

不要只改样式而忽略模板输出结构。

### 3.4 列表页 / 归档页 / 分类标签页

- 默认列表页：[`themes/demius/layouts/_default/list.html`](../themes/demius/layouts/_default/list.html)
- 文章归档页：[`themes/demius/layouts/posts/list.html`](../themes/demius/layouts/posts/list.html)
- 分类标签页：`themes/demius/layouts/categories/*` 与 `themes/demius/layouts/tags/*`

如果是 `content/posts/_index.md` 一类 section 页面，通常会命中 `posts/list.html` 或默认 list 模板。

### 3.5 自定义单页

项目里有一批固定页面依赖 `content/*.md + layouts/*.html + data/*.yaml` 组合：

- `links`
- `gallery`
- `gear`
- `wishlist`
- `supporters`
- `data`
- `music-planet`
- `bangumi-planet`
- `friends-circle`
- `shuoshuo`

典型例子：

- [`content/links.md`](https://github.com/demius782/demius/blob/main/content/links.md) 通过 `type: "links"` 和 `layout: "links"` 命中 [`themes/demius/layouts/links.html`](../themes/demius/layouts/links.html)
- [`content/data.md`](https://github.com/demius782/demius/blob/main/content/data.md) 命中 [`themes/demius/layouts/data.html`](../themes/demius/layouts/data.html)
- [`themes/demius/layouts/gallery.html`](../themes/demius/layouts/gallery.html) 直接读取 `.Site.Data.gallery`

这类页面改动时，先确认是改：

1. 页面文案
2. 数据结构
3. 模板结构
4. 页面专属 JS/CSS

## 4. 数据来源说明

### 4.1 配置数据

全站配置主要来自 [`hugo.toml`](../hugo.toml)。

适合放在配置里的内容：

- 开关
- 布局模式
- 文本项
- 链接项
- 主题色 / 背景 / 图标路径
- 第三方服务地址

不适合继续堆进 `hugo.toml` 的内容：

- 大型列表数据
- 结构复杂的页面内容
- 高频变化的数据集合

### 4.2 Data Files

[`data`](../data) 目录适合存放结构化页面数据：

- [`data/links.yaml`](../data/links.yaml)
- [`data/gallery.yaml`](../data/gallery.yaml)
- [`data/gear.yaml`](../data/gear.yaml)
- [`data/booklist.yaml`](../data/booklist.yaml)
- [`data/wishlist.yaml`](../data/wishlist.yaml)
- [`data/supporters.yaml`](../data/supporters.yaml)

约定建议：

- 同一类页面只保留一个稳定 schema
- 字段命名尽量统一使用英文小写和中划线或驼峰中的一种
- 页面模板不要同时兼容过多历史字段

如果必须兼容旧字段，应在模板顶部集中做兼容映射，不要把兼容逻辑散落在整份模板里。

### 4.3 运行期生成数据

网友圈依赖：

- 源数据：[`data/links.yaml`](../data/links.yaml)
- 生成脚本：[`generate_friends_circle_json.py`](../generate_friends_circle_json.py)
- 输出文件：[`static/all.json`](../static/all.json)

这一类数据不是 Hugo 原生生成的，修改后需要额外跑脚本。

## 5. 前端资源构建

### 5.1 CSS

CSS 入口：

- [`themes/demius/assets/css/main.css`](../themes/demius/assets/css/main.css)

当前模式是一个总入口文件 import 多个模块。新增样式时：

1. 先判断是否已有同类模块
2. 页面专属样式尽量按页面拆文件
3. 全站样式只放真正的全局能力

不要把单页样式直接写进 `_base.css`、`_layout.css` 之类全局文件。

### 5.2 JavaScript

JS 入口：

- [`themes/demius/assets/js/main.js`](../themes/demius/assets/js/main.js)

它目前是“全量导入”模式。新增脚本时优先遵守：

- 只在需要时初始化
- 初始化过程幂等
- 支持 PJAX 重新进入页面
- 不依赖隐式的全局变量，除非变量由 `siteConfig` 明确注入

对 PJAX 主题，最常见问题不是“功能没写”，而是：

- 重复绑定事件
- 页面切换后二次初始化失败
- 旧 DOM 引用未释放

### 5.3 Hugo Pipes

资源打包由 Hugo 完成，相关入口见：

- [`themes/demius/layouts/_default/baseof.html`](../themes/demius/layouts/_default/baseof.html)
- [`postcss.config.js`](../postcss.config.js)

当前 CSS 通过 `resources.Get -> postCSS -> minify -> fingerprint` 处理。

结论：

- 只要资源放在 `themes/demius/assets` 下并被入口引用，Hugo 就会参与打包
- `static` 下的资源不会经过同样的管线

## 6. 修改入口速查

### 6.1 想改导航

看：

- [`themes/demius/layouts/partials/header/header.html`](../themes/demius/layouts/partials/header/header.html)
- [`themes/demius/layouts/partials/header/navigation.html`](../themes/demius/layouts/partials/header/navigation.html)
- [`hugo.toml`](../hugo.toml) 中的 `[menu]`

### 6.2 想改首页文章卡片

看：

- `partials/main/engine-*.html`
- [`themes/demius/layouts/partials/post-card.html`](../themes/demius/layouts/partials/post-card.html)
- `assets/css/_post-card.css`
- `assets/css/engine-3.css`

### 6.3 想改文章页结构

看：

- [`themes/demius/layouts/_default/single.html`](../themes/demius/layouts/_default/single.html)
- [`themes/demius/layouts/partials/comment.html`](../themes/demius/layouts/partials/comment.html)
- `assets/css/_post-page.css`
- `assets/js/_toc.js`
- `assets/js/_post-actions.js`

### 6.4 想改侧栏

看：

- [`themes/demius/layouts/partials/aside/widgets`](../themes/demius/layouts/partials/aside/widgets)
- `assets/css/_aside*.css`
- [`hugo.toml`](../hugo.toml) 中的 `params.aside.*`

### 6.5 想改某个功能页

先查三处：

1. `content/<page>.md`
2. `themes/demius/layouts/<page>.html`
3. `data/<page>.yaml`

如果页面还有交互，再查对应 `assets/js/_<page>.js` 和 `assets/css/_<page>.css`。

## 7. 模板覆盖原则

Hugo 的优先级决定了：

- 根目录 `layouts` 会覆盖主题 `layouts`
- 根目录 `static` 会覆盖主题 `static`
- 根目录 `content` 会优先作为站点内容

因此开发前先确认：

- 当前效果来自主题默认实现
- 还是已经被站点层覆盖

推荐规则：

- 可复用能力改主题层
- 当前站点私有定制改根目录覆盖层
- 不要为了一个站点的需求污染主题默认模板

## 8. 配置维护建议

[`hugo.toml`](../hugo.toml) 已经很大，新增功能时请遵守：

- 参数按功能分组
- 一组参数只解决一个问题
- 默认值尽量在模板里统一兜底，不要到处 `if isset`
- 文本类配置和布尔类配置分开组织
- 新增参数前先查是否已有同义配置

建议长期目标：

- 后续迁移到 `config/_default/` 多文件配置
- 至少拆分为 `menus`、`params`、`services`、`outputs`

## 9. 新增功能的推荐流程

### 9.1 新增一个页面

1. 在 [`content`](../content) 增加页面 markdown
2. 在 [`themes/demius/layouts`](../themes/demius/layouts) 新增对应模板
3. 如果需要结构化数据，在 [`data`](../data) 新增 yaml
4. 如有样式与交互，新增页面专属 CSS/JS 模块
5. 在 [`hugo.toml`](../hugo.toml) 中补菜单或参数
6. 补一份对应功能文档

### 9.2 新增一个侧栏组件

1. 在 `layouts/partials/aside/widgets` 新增 widget partial
2. 在 `params.aside.left/right` 中接入排序
3. 增加必要的显示开关和配置项
4. 增加专属样式
5. 验证桌面端、移动端、PJAX 切换

### 9.3 新增一个文章增强功能

优先判断它属于：

- 纯模板能力
- 纯样式能力
- 运行时脚本能力
- 依赖第三方服务的能力

只有在确实需要时才新增运行时脚本。能用 Hugo 在构建期解决的，不要搬到前端运行时。

## 10. 开发约定

### 10.1 文件命名

当前仓库的样式与脚本命名已经形成约定：

- 页面或组件样式：`_feature.css`
- 页面或组件脚本：`_feature.js`
- 主入口：`main.css` / `main.js`

继续维护时保持一致，不要混入新的命名体系。

### 10.2 代码组织

建议遵守：

- 模板只负责结构和必要的 Hugo 逻辑
- 配置映射放模板顶部集中处理
- 样式按页面或组件归档
- 脚本按功能拆分，避免一个文件管多个完全无关的模块

### 10.3 文档同步

每次新增或重构功能后至少同步两处：

1. 对应功能文档
2. 本开发文档中受影响的结构说明

否则文档会再次退化成“只有使用说明，没有维护说明”。

## 11. 已知维护风险

当前项目继续扩展时，最容易出问题的点有：

- `hugo.toml` 继续膨胀，参数语义重复
- `baseof.html` 承担过多全局注入职责
- `main.js` 全量导入导致包体与初始化成本继续上升
- PJAX 场景下脚本重复绑定
- 页面模板直接耦合过多历史配置和兼容逻辑
- 根目录与主题目录同时存在同类文件，修改时容易改错层级

后续重构优先级建议：

1. 拆分页面级资源加载
2. 收敛全局配置注入
3. 统一页面数据 schema
4. 精简模板中的历史兼容分支

## 12. 推荐日常开发流程

1. 先确认需求属于主题能力还是站点定制
2. 找到实际生效的模板层级
3. 只改一层，不跨层重复实现
4. 同步检查对应 CSS/JS/配置/数据
5. 本地构建验证首页、文章页、目标页、移动端
6. 补文档，再提交

如果未来要把 Demius 继续做成可长期演进的主题，这份文档应被视为总入口。功能文档负责“怎么用”，这份文档负责“为什么这么组织、改哪里、别踩什么坑”。
