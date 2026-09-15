# Demius Hugo 主题文档站

这是 [Demius](https://github.com/demius782/demius) Hugo 主题的文档站，使用 VitePress 与 [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek) 构建。

- 线上地址：<https://hugo.demius.tech/>
- 主题仓库：<https://github.com/demius782/demius>
- 开发者博客：<https://blog.demius.tech/>

## 本地开发

```bash
npm install
npm run docs:dev
```

生产构建：

```bash
npm run docs:build
```

## GitHub Pages

推送到 `main` 分支会触发 `.github/workflows/deploy.yml`，构建产物部署到 GitHub Pages。仓库设置中需要将 Pages 的构建来源设为 **GitHub Actions**。

自定义域名已写入 `docs/public/CNAME`。DNS 服务商处将 `hugo.demius.tech` 配置为指向 GitHub Pages 的 CNAME 目标后即可生效。

## 内容来源

`docs/guide/` 中的功能指南和 `docs/reference/` 中的完整手册、更新日志来自 `demius-blog` 的主题文档内容；源代码和最新版本以主题仓库为准。
