# 部署说明

God-Museum 是 Astro 静态站点，内容源与 GitHub 仓库共用同一批 Markdown。

## 构建与路径

- 公开路径前缀：`/god-museum/`
- Astro 配置：`astro.config.mjs`
- Cloudflare Pages 配置：`wrangler.jsonc`
- 精确路径代理：`worker/`

`src/content.config.ts` 负责加载馆藏目录；新增顶层分区时，必须同步更新内容 glob、`src/lib/content.ts` 的路由和分区标签，以及网站目录顺序。

## 发布边界

发布时以仓库当前配置的 package scripts 与 Cloudflare 项目为真相源。网站不依赖远程搜索、数据库或用户追踪服务；搜索和目录过滤都在已生成页面中本地运行。
