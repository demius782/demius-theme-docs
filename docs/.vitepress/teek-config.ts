import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
  teekHome: false,
  vpHome: true,
  loading: false,
  pageStyle: "default",
  sidebarTrigger: true,
  author: {
    name: "Demius contributors",
    link: "https://github.com/demius782/demius",
  },
  articleAnalyze: {
    dateFormat: "yyyy-MM-dd",
    showUpdateDate: true,
    showCategory: true,
    showTag: true,
  },
  breadcrumb: {
    enabled: true,
    showCurrentName: true,
    homeLabel: "首页",
  },
  themeEnhance: {
    position: "top",
    layoutSwitch: {
      defaultDocMaxWidth: 90,
      defaultPageMaxWidth: 95,
    },
    themeColor: {
      defaultColorName: "tk-primary",
      defaultSpread: false,
    },
  },
  footerInfo: {
    theme: {
      name: "Theme by Teek",
      link: "https://github.com/Kele-Bingtang/vitepress-theme-teek",
    },
    copyright: {
      suffix: "Demius contributors",
    },
  },
  markdown: {
    config(md) {
      const escapeVueInterpolation = (html: string) =>
        html.replaceAll("{{", "&#123;&#123;").replaceAll("}}", "&#125;&#125;");

      const textRule = md.renderer.rules.text;
      md.renderer.rules.text = (tokens, idx, options, env, self) =>
        escapeVueInterpolation(
          textRule
            ? textRule(tokens, idx, options, env, self)
            : md.utils.escapeHtml(tokens[idx].content),
        );

      const inlineCodeRule = md.renderer.rules.code_inline;
      if (inlineCodeRule) {
        md.renderer.rules.code_inline = (tokens, idx, options, env, self) =>
          escapeVueInterpolation(inlineCodeRule(tokens, idx, options, env, self));
      }

      const linkOpenRule = md.renderer.rules.link_open;
      if (linkOpenRule) {
        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
          const href = tokens[idx].attrGet("href");
          const replacements: Record<string, string> = {
            ".": "./",
            "README.md": "./",
            "./README.md": "./",
            "../README.md": "../",
            "configuration-reference.html": "config-reference.html",
          };

          if (href && replacements[href]) tokens[idx].attrSet("href", replacements[href]);
          return linkOpenRule(tokens, idx, options, env, self);
        };
      }
    },
  },
  vitePlugins: {
    sidebar: false,
    permalink: false,
    mdH1Option: {
      beforeInject: frontmatter => (frontmatter.home === true ? false : undefined),
    },
  },
});
