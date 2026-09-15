import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { teekConfig } from "./teek-config";

const guideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "开始使用",
    collapsed: false,
    items: [
      { text: "快速开始", link: "/guide/quick-start.html" },
      { text: "配置入口", link: "/guide/configuration.html" },
      { text: "功能指南", link: "/guide/features.html" },
    ],
  },
  {
    text: "内容与视觉",
    collapsed: true,
    items: [
      { text: "主页大图", link: "/guide/home-big-image-guide.html" },
      { text: "轮播图", link: "/guide/carousel-guide.html" },
      { text: "文章置顶", link: "/guide/post-pinned-guide.html" },
      { text: "置顶样式", link: "/guide/pinned-style-guide.html" },
      { text: "视频嵌入", link: "/guide/video-embed-guide.html" },
      { text: "选项卡", link: "/guide/tabs-guide.html" },
      { text: "相册", link: "/guide/gallery-guide.html" },
      { text: "内容折叠", link: "/guide/collapse-guide.html" },
      { text: "时间线", link: "/guide/timeline-guide.html" },
      { text: "彩色文字", link: "/guide/color-text-guide.html" },
      { text: "背景系统", link: "/guide/background-guide.html" },
    ],
  },
  {
    text: "页面与数据",
    collapsed: true,
    items: [
      { text: "侧栏", link: "/guide/sidebar-guide.html" },
      { text: "页脚", link: "/guide/footer-guide.html" },
      { text: "分类与标签", link: "/guide/taxonomy-guide.html" },
      { text: "友链", link: "/guide/links-guide.html" },
      { text: "装备页", link: "/guide/gear-guide.html" },
      { text: "数据配置", link: "/guide/data-configuration-guide.html" },
      { text: "系列文章", link: "/guide/series-posts-guide.html" },
      { text: "沉浸阅读", link: "/guide/immersive-reading-mode.html" },
      { text: "移动端优化", link: "/guide/mobile-optimization-guide.html" },
    ],
  },
  {
    text: "互动与服务",
    collapsed: true,
    items: [
      { text: "音乐播放器", link: "/guide/music-guide.html" },
      { text: "音乐 API 配置", link: "/guide/music-api-config-guide.html" },
      { text: "Meting API", link: "/guide/meting-api-guide.html" },
      { text: "nsmao API", link: "/guide/nsmao-api-guide.html" },
      { text: "赞赏按钮", link: "/guide/reward-button-guide.html" },
      { text: "说说 API", link: "/guide/shuoshuo-api-guide.html" },
      { text: "Umami 统计", link: "/guide/umami-analytics-guide.html" },
      { text: "阅读进度", link: "/guide/reading-progress-feature.html" },
      { text: "搜索引擎提交", link: "/guide/search-engine-submit-guide.html" },
    ],
  },
  {
    text: "开发维护",
    collapsed: true,
    items: [
      { text: "开发维护总览", link: "/guide/development.html" },
      { text: "配置参考总表", link: "/guide/config-reference.html" },
      { text: "侧栏一体化", link: "/guide/aside-unified-mode-guide.html" },
      { text: "侧栏缩略图兜底", link: "/guide/sidebar-thumbnail-fallback.html" },
      { text: "友链朋友圈", link: "/guide/README-friends-circle.html" },
    ],
  },
];

const referenceSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "完整资料",
    collapsed: false,
    items: [
      { text: "布局与视觉模式", link: "/reference/home-layout-notes.html" },
      { text: "主题使用手册", link: "/reference/theme-manual.html" },
      { text: "更新日志", link: "/reference/changelog.html" },
      { text: "专项说明", link: "/reference/notes.html" },
    ],
  },
];

export default defineConfig({
  extends: teekConfig,
  base: "/",
  lang: "zh-CN",
  title: "Demius Hugo 主题文档",
  description: "Demius Hugo 主题的安装、配置、功能与开发维护文档",
  cleanUrls: false,
  lastUpdated: true,
  rewrites: {
    "README.md": "index.md",
    "guide/README.md": "guide/index.md",
  },
  head: [
    ["meta", { name: "theme-color", content: "#0f766e" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:site_name", content: "Demius Hugo 主题文档" }],
    ["meta", { property: "og:image", content: "https://hugo.demius.tech/logo.png" }],
    ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
  ],
  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://hugo.demius.tech",
  },
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "Demius 文档",
    nav: [
      { text: "首页", link: "/" },
      { text: "快速开始", link: "/guide/quick-start.html" },
      { text: "功能指南", link: "/guide/features.html" },
      { text: "开发维护", link: "/guide/development.html" },
      {
        text: "完整资料",
        items: [
          { text: "布局与视觉模式", link: "/reference/home-layout-notes.html" },
          { text: "主题使用手册", link: "/reference/theme-manual.html" },
          { text: "更新日志", link: "/reference/changelog.html" },
          { text: "专项说明", link: "/reference/notes.html" },
        ],
      },
      { text: "开发者博客", link: "https://blog.demius.tech/" },
    ],
    sidebar: {
      "/guide/": guideSidebar,
      "/reference/": referenceSidebar,
    },
    socialLinks: [{ icon: "github", link: "https://github.com/demius782/demius" }],
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
          modal: {
            noResultsText: "没有找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
          },
        },
      },
    },
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新",
    outline: { level: [2, 3], label: "本页导航" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    externalLinkIcon: true,
  },
  transformPageData(pageData) {
    if (pageData.frontmatter.home !== true) return;

    const legacy = pageData.frontmatter;
    pageData.frontmatter.layout = "home";
    pageData.frontmatter.hero = {
      name: legacy.heroText,
      text: legacy.title,
      tagline: legacy.tagline,
      image: { src: legacy.heroImage, alt: legacy.heroText },
      actions: legacy.actions?.map((action: { text: string; link: string; type?: string }) => ({
        text: action.text,
        link: action.link,
        theme: action.type === "primary" ? "brand" : "alt",
      })),
    };
    pageData.frontmatter.features = legacy.features?.map(
      (feature: { title: string; details: string }) => ({
        title: feature.title,
        details: feature.details,
      }),
    );
  },
});
