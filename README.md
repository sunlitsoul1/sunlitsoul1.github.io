# 学习手记

博客署名为 `lilika`，GitHub 用户名为 `sunlitsoul1`，目标仓库为 `sunlitsoul1.github.io`。

一个使用 Astro 和 Markdown 的个人静态博客。包含文章目录、标签筛选、标题与摘要搜索、代码高亮、项目页和移动端布局。两篇文章均为可删除的示例，不代表博主的真实经历。搜索仅覆盖标题、摘要和标签。

## 本地预览

在 PowerShell 中运行：

```powershell
cd 'D:\学习\研究生学习\personal-blog'
npm.cmd install
npm.cmd run dev
```

打开终端显示的地址，通常是 http://localhost:4321 。按 Ctrl+C 停止。

## 改成自己的博客

编辑 `src/site.ts`：修改 `title`、`author`、`description`，把 `github` 填成自己的 GitHub 主页。`projects` 可以填写真实项目，例如：

```ts
projects: [{
  name: '我的第一个项目',
  description: '项目解决什么问题，以及做了什么。',
  url: 'https://github.com/你的用户名/仓库名',
  tags: ['Python', '实践'],
}],
```

首页介绍文字在 `src/pages/index.astro`；自我介绍在 `src/pages/about.astro`。

## 写一篇文章

在 `src/content/posts/` 新建 `my-first-note.md`（建议用英文文件名，生成稳定网址）：

```markdown
---
title: "我的第一篇笔记"
description: "一句话介绍这篇文章。"
date: 2026-11-18
tags: ["学习笔记"]
draft: false
---

## 今天学了什么

用自己的话记录。

## 遇到的问题

写下尝试和结论。
```

`draft: true` 会从列表和文章路由中排除。日期用于排序，不控制定时发布。Markdown 支持标题、列表、代码块、表格和链接。不要将敏感信息放入公开仓库，草稿源文件在公开仓库中同样可见。

## 发布到 GitHub Pages

1. 在 GitHub 创建一个**公开仓库**，推荐命名为 `你的用户名.github.io`。也支持普通仓库名（例如 `personal-blog`），构建时会自动识别子路径。
2. 将本文件夹作为仓库根目录上传：根目录应该直接有 `package.json`，同时上传 `package-lock.json` 和 `.github/workflows/deploy.yml`，不要上传 `node_modules`。建议用下面的 Git 命令。
3. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 在 **Actions** 页面运行 `Deploy blog to GitHub Pages`（也可推送新提交触发）。等待构建和部署成功。
5. 访问 `https://你的用户名.github.io/`；普通仓库访问 `https://你的用户名.github.io/仓库名/`。

第一次上传，在当前项目目录执行（先把 URL 换成真实地址）：

```powershell
git init -b main
git add .
git commit -m "Create learning blog"
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

若 Git 提示缺少身份，请按提示配置你自己的 `user.name` 和 `user.email`。若远程仓库已有内容，请先拉取并整合，避免强制推送。

以后更新文章：

```powershell
git add .
git commit -m "Update notes"
git push
```

## 检查构建

```powershell
npm.cmd run build
npm.cmd run preview
```

生产文件在 `dist/`，无需手动上传它。工作流会构建并发布。依赖版本由 `package-lock.json` 固定，CI 使用 `npm ci`。

自定义域名时，在仓库 Actions variables 配置 `SITE_URL=https://你的域名` 与 `BASE_PATH=/`，并在 Pages 设置域名和 DNS；普通 GitHub Pages 无需设置这些变量。本地 `.npmrc` 使用项目缓存，避免系统 npm 缓存目录权限问题。

参考：[Astro 官方 GitHub Pages 部署文档](https://docs.astro.build/en/guides/deploy/github/)。

## 依赖检查记录

安全配置：本仓库本地 Git 提交使用 GitHub noreply 邮箱；Actions 固定到具体提交，构建只读源码，只有部署任务拥有 Pages 发布权限。已添加 Dependabot 每周更新检查。构建、部署分别设置 5 分钟超时。

`.gitignore` 排除了常见环境文件、私钥及 `private/` 文件夹（仅影响尚未跟踪的文件）。未公开的科研资料和私人笔记应保存在仓库外；不要把 `draft: true` 当成隐私保护。已提交内容即使删除也可能仍留在历史中。

2026-11-18：使用 Astro 7.4.12，构建通过。`npm audit` 仍报告 `picomatch` 的 ReDoS 公告（及其依赖链，合计 10 项 high）；`npm audit fix` 未解决，强制修复建议降级 Astro，未采用。它属于构建工具依赖，部署产物为静态 HTML/CSS/JS。后续升级时重新检查：[上游公告](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)。
