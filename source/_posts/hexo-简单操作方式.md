---
title: hexo 简单操作方式
date: 2024-01-29 13:41:24
tags: hexo
---
## git 
### git更新代码  
```bash
git add . && git commit -m `date  '+%Y%m%d%H%M'` && git push
```

## hexo
### hexo操作命令  
- 创建新帖子或新页面`hexo new [layout] <title>` post是默认的layout,可以通过编辑_config.yaml中的default_layout修改  
- 本地启动部署`hexo clean && hexo g && hexo s`  
- 远程部署更新`hexo d -g`  
- 通过git上传到github,并自动更新到站点(通过github action实现)`git add . && git commit -m "xxx" && git push`  

### next主题的安装优化  
1. **启用压缩**
   - 安装压缩插件：
     ```bash
     npm install hexo-neat --save
     ```
   - 在博客的 `_config.yml` 中配置该插件。

2. **SEO优化**
   - 安装 SEO 插件：
     ```bash
     npm install hexo-seo-autopush --save
     ```
     ```yml
     # enable: 开启/关闭 推送
     # cron: 执行时间周期
     # count: 每次提交最新的10篇文章，输入0或者不填写则默认为所有文章(建议是最新的10篇文章)
     # date: 更新时间(updated)|创建日期(created)
     # https://github.com/Lete114/hexo-seo-autopush.git
     hexo_seo_autopush:
       cron: 0 4 * * *
       baidu:
         enable: true
         date: created
         count: 10
       bing:
         enable: true
         date: created
         count: 10
       google:
         enable: true
         date: created
         count: 10
     ```
     

4. **启用 CDN**
   - 注册 CDN 服务（如 Cloudflare）。
   - 更新 DNS 设置以使用 CDN 服务。

5. **配置PWA**
   - 安装 PWA 支持插件：
     ```bash
     npm install hexo-pwa --save
     ```
   - 配置 `_config.yml` 来启用 PWA 功能。

6. **开启代码高亮**
   - Next 主题自带代码高亮，通过 `_config.yml` 中的 `highlight` 部分来配置。

### 高级优化：

1. **懒加载**
   - 在 Next 主题配置文件中启用图片懒加载特性。

2. **异步加载**
   - 优化 JavaScript 和 CSS 加载方式，使其异步加载，减少渲染阻塞。

3. **数据分析**
   - 集成第三方分析工具如 Google Analytics。

4. **社交功能集成**
   - 在 Next 主题配置中启动社交图标和分享按钮。

5. **评论系统**
   - 集成第三方评论系统，如 Valine 或 Disqus，通过主题的 `_config.yml` 文件配置。

6. **网站地图和 RSS**
   - 使用插件生成网站地图和 RSS feed，如：
     ```bash
     npm install hexo-generator-sitemap hexo-generator-feed --save
     ```

7. **内容目录**
   - 在 Next 主题中启用文章目录来提高长文章的可读性。

8. **MathJax/LaTeX 支持**
   - 如果你需要在博客中撰写数学内容，可以开启 MathJax 支持。

### 具体操作：

请参考每个插件和 Next 主题提供的文档进行配置。设置都在博客根目录下的 `_config.yml` 以及 Next 主题的 `_config.yml` 中完成。

<!--more-->