import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          delimiters: ["[[", "]]"],
        },
      },
    },
  }),
  base: "/",
  lang: "zh-CN",
  title: "Demius Hugo 主题文档",
  description: "Demius Hugo 主题的安装、配置、功能与开发维护文档",
  head: [
    ["meta", { name: "theme-color", content: "#0f766e" }],
    ["link", { rel: "canonical", href: "https://hugo.demius.tech/" }],
  ],
  theme: hopeTheme({
    hostname: "https://hugo.demius.tech",
    logo: "/logo.png",
    repo: "demius782/demius",
    docsDir: "docs",
    navbar: [
      { text: "首页", link: "/" },
      { text: "快速开始", link: "/guide/quick-start.html" },
      { text: "功能指南", link: "/guide/features.html" },
      { text: "开发维护", link: "/guide/development.html" },
      {
        text: "完整资料",
        children: [
          { text: "主题使用手册", link: "/reference/theme-manual.html" },
          { text: "更新日志", link: "/reference/changelog.html" },
          { text: "专项说明", link: "/reference/notes.html" },
        ],
      },
      { text: "开发者博客", link: "https://blog.demius.tech/", target: "_blank" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始使用",
          icon: "rocket",
          collapsible: false,
          children: ["quick-start", "configuration", "features"],
        },
        {
          text: "内容与视觉",
          icon: "palette",
          collapsible: true,
          children: [
            "home-big-image-guide",
            "carousel-guide",
            "post-pinned-guide",
            "pinned-style-guide",
            "video-embed-guide",
            "tabs-guide",
            "gallery-guide",
            "collapse-guide",
            "timeline-guide",
            "color-text-guide",
            "background-guide",
          ],
        },
        {
          text: "页面与数据",
          icon: "layout",
          collapsible: true,
          children: [
            "sidebar-guide",
            "footer-guide",
            "taxonomy-guide",
            "links-guide",
            "gear-guide",
            "data-configuration-guide",
            "series-posts-guide",
            "immersive-reading-mode",
            "mobile-optimization-guide",
          ],
        },
        {
          text: "互动与服务",
          icon: "plug",
          collapsible: true,
          children: [
            "music-guide",
            "music-api-config-guide",
            "meting-api-guide",
            "nsmao-api-guide",
            "reward-button-guide",
            "shuoshuo-api-guide",
            "umami-analytics-guide",
            "reading-progress-feature",
            "search-engine-submit-guide",
          ],
        },
        {
          text: "开发维护",
          icon: "code",
          collapsible: true,
          children: [
            "development",
            "configuration-reference",
            "aside-unified-mode-guide",
            "sidebar-thumbnail-fallback",
            "README-friends-circle",
          ],
        },
      ],
      "/reference/": [
        {
          text: "完整资料",
          icon: "book",
          collapsible: false,
          children: ["theme-manual", "changelog", "notes"],
        },
      ],
      "/": [""],
    },
    locales: {
      "/": {
        lang: "zh-CN",
        title: "Demius Hugo 主题文档",
        description: "Demius Hugo 主题的安装、配置、功能与开发维护文档",
      },
    },
    darkmode: true,
    navbarLayout: { start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] },
    toc: { level: [2, 3] },
    breadcrumb: true,
    lastUpdated: true,
    contributors: false,
    editLink: false,
    footer: "Demius Hugo Theme Documentation",
    copyright: "Copyright © 2026 Demius contributors",
  }),
});
