---
title: hexo 简单操作方式
tags: hexo
abbrlink: 5592
date: 2024-01-29 13:41:24
# description: hexo 简单操作方式
categories:
- 服务
- hexo
toc: true
# cover: /img/vector_landscape_1.svg
---

>通过git更新博客并对next主题进行优化配置  

<!--more-->

## git  
### 将源码更新到github,并部署到个人博客  

```bash
git add . && git commit -m `date  '+%Y%m%d%H%M'` && git push
```

## hexo  

### hexo操作命令  
- 创建新帖子或新页面`hexo new [layout] [title]` post是默认的layout,可以通过编辑_config.yaml中的default_layout修改
- 创建文章草稿`hexo new draft xxx`  
- 将草稿发布为正式文章`hexo P xxx`  
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
     

4. **修改 CDN**
   ```yml
   vendors:
     internal: local
     plugins: custom
     custom_cdn_url: https://lib.baomitu.com/${cdnjs_name}/${version}/${cdnjs_file}
   ```

5. **开启代码高亮**
   - Next 主题自带代码高亮，通过 `_config.yml` 中的 `highlight` 部分来配置。 

6. **配置阅读全文按钮**
   - 配置主题文件中的`_config.yml`文件 
   ```yaml
   excerpt_description: true
   # Read more button
   # If true, the read more button will be displayed in excerpt section.
   read_more_btn: true
   
   #自动形成摘要
   auto_excerpt:
     enable: true
     length: 100
   ```
   - 在博客中使用more进行摘要内容的截断标志.标志之后的内容不会在首页显示,而且会生成一个`阅读全文`的按钮(注意文档中不能有尖括号)  
   ```md
   ---
   title: {{ title }}
   date: {{ date }}
   tags:
   categories:
   ---

   ## 概述

   > 本文。

   <!--more-->

   ## 正文
   ```
7. **创建自定义样式文件** 
   - 取消主题配置文件中的`style: source/_data/styles.styl`注释,在hexo根目录下的source目录创建_data目录,并将下面的内容写入到styles.styl文件中  
   
   ```yml
     // Custom styles.

     // 网站最顶部条线的颜色
     .headband {
       height: 0px;
       background: #F2F4EF;
     }

     // 设置背景图片
     //body{
     //    //background:url(/images/bg.png);
     //    background-repeat:no-repeat;
     //    background-attachment:fixed;
     //    background-position:center;
     //}

     // 设置侧边栏左上角网站标题和副标题区颜色
     .site-meta {
     	background: #222222;
     }

     // 设置侧边栏网站标题样式
     .site-title {
     	color:#fff;
     }



     // 设置侧边栏网站标题鼠标悬浮样式
     .site-title:hover {
     	letter-spacing: 0.4rem;
     }

     // 侧边栏网站副标题样式
     .site-subtitle {
     	color:#fff;
     }

     .site-author-image{
     border: 0px;
     }

     // 文章标题鼠标悬浮下划线样式
     .posts-expand .post-title-link::before {
         background: var(--link-color);
         bottom: 0;
         content: '';
         height: 2px;
         left: 0;
         position: absolute;
         transform: scaleX(0);
         transition: transform .2s ease-in-out;
         width: 100%
     }

     // 文章标题颜色
     .posts-expand .post-title-link {
     	//color:#DfA710;
       color:#10df58;
     }

     // 阅读全文按钮样式
     .btn {
     	border:2px solid #DfA710;
     	color:#DfA710;
     }

     // 阅读全文按钮鼠标悬浮样式
     .btn:hover {
       border-color: #DfA710;
       color: #fff;
       background: #DfA710;
     }

     // 设置文章和侧边栏中链接样式
     a:hover,
     span.exturl:hover {
       color: #DfA710;
       border-bottom-color: #DfA710;
     }

     // 修改文章页侧边栏文章目录下面的第一个标题的鼠标悬浮样式
     // 真的有毒，文章目录第一个标题的样式还是单独设置的...一开始还没发现
     .post-toc .nav .active-current > a:hover {
         color: #DfA710;
     }

     // 文章页面左边文章标题颜色
     .post-toc ol a:hover {
       color: #DfA710;
       border-bottom-color: #DfA710;
     }

     // 文章页面左边文章标题active时颜色
     .post-toc .nav .active > a {
       color: #DfA710;
       border-bottom-color: #DfA710;
     }

     // 文章页侧边栏文章目录和站点概况鼠标悬浮样式
     .sidebar-nav li:hover {
       color: #DfA710;
     }

     // 文章页侧边栏文章目录和站点概况active时鼠标悬浮样式
     .sidebar-nav .sidebar-nav-active:hover {
       color: #DfA710;
     }

     // 文章页侧边栏文章目录和站点概况active时样式
     .sidebar-nav .sidebar-nav-active {
       color: #DfA710;
       border-bottom-color: #DfA710;
     }

     // 社交栏鼠标悬浮样式
     #sidebar div.links-of-author.motion-element a:hover {
       color: #DfA710;
       background: rgba(255, 255, 255, 0);
     }

     // 友链鼠标悬浮样式
     .sidebar a:hover,
     .sidebar span.exturl:hover {
       border-bottom-color: #DfA710;
       color: #DfA710;
     }

     // RSS文字颜色
     //#sidebar div.feed-link.motion-element > a {
     //  color: #DfA710;
     //}

     // RSS图标颜色
     //#sidebar div.feed-link.motion-element > a i{
     //  color: #DfA710;
     //}

     // 侧边栏日志、分类、标签 上面的数字的颜色
     .site-state-item-count {
       color: #DfA710;
     }

     // 设置底部文章分页数字鼠标悬浮上划线颜色
     .pagination .prev:hover,
     .pagination .next:hover,
     .pagination .page-number:hover {
       border-top-color: #DfA710;
     }

     // 设置文章页上一篇文章和下一篇文章鼠标悬浮样式
     .post-nav-item a:hover {
       color: #DfA710;
       border-bottom: none;
     }

     // 修改鼠标选中字符的颜色
     /* webkit, opera, IE9 */
     ::selection {
         background: #DfA710;
         color: #f7f7f7;
     }
     /* firefox */
     ::-moz-selection {
         background: #DfA710;
         color: #f7f7f7;
     }

     // 侧边栏返回顶部按钮鼠标悬浮样式
     .back-to-top:hover {
       background: #eee;
       color: #DfA710;
     }

     // 当页面处于 首页、标签、分类、归档、关于页面其中之一时，处于哪个页面哪个选项就变蓝
     #menu > li.menu-item-active > a {
       color: #DfA710;
     }

     // 侧边栏导航小圆点颜色
     .menu-item-active a:after,
     .menu .menu-item a:hover:after,
     .menu .menu-item span.exturl:hover:after {
       background-color: #DfA710;
     }

     // 侧边栏上半部分设置为透明
     .menu-item-active a,
     .menu .menu-item a:hover,
     .menu .menu-item span.exturl:hover {
       background: rgba(242, 242, 242, 0.30);
       border-bottom-color: rgba(255, 255, 255, 0.2);;
     }

     // 侧边栏下半部分设置为透明
     .sidebar{
     	background: rgba(255, 255, 255, 0.0);
     }
     .sidebar-inner{
     	background: rgba(255, 255, 255, 0.2);
     }

     // 设置底部文章分页部分为透明
     .pagination{
     	background: rgba(255, 255, 255, 0.0);
     }
     .pagination .page-number.current {
       color: #fff;
       background: #DfA710;
     }

     // 导航栏底部百分比透明
     .back-to-top,
     .back-to-top:hover
     {
     	background: rgba(255, 255, 255, 0.3);
     }

     // 设置文章背景透明度
     .post-block{
     	background: rgba(255, 255, 255, 0.2);
     }

     // 这里需要完全透明，不然就会在上面的0.2基础上再进行透明度计算
     .btn{
     	background: rgba(255, 255, 255, 0);
     }

     .header-inner{
     	background: rgba(255, 255, 255, 0.2);
     }
     .main-inner {
         background: rgba(255, 255, 255, 0.2);
     }

     .site-brand-container
     {
     	background: #222222;
     }

     // 代码区背景
     .table-container{
       background: rgba(240, 240, 222, 0.2);
     }
     .table-container :hover {
       background: rgba(237,237, 225, 0.03);
     }
     // 代码背景
     table > tbody > tr:nth-of-type(odd) {
       background-color: rgba(255, 255, 255, 0.0);
     }
     table > tbody > tr:hover {
       background-color: rgba(233,230, 230, 0.0);
     }
     pre,
     .highlight {
       background: rgba(200, 31, 33, 0);
     }
     //代码行标背景
     .highlight .gutter pre {
       background: rgbargba(227, 235, 227, 0.3);
     }

     .highlight .code pre {
       background: rgba(29, 31, 100, 0);
     }

     // 评论
     .comments {
       background: rgba(255, 255, 255, 0.2);
     }

     // 文章页内作者信息
     .post-copyright {
       border-left: 3px solid #DfA710;
       background: rgba(255, 255, 255, 0.3);
     }

     /* 行内代码块的自定义样式 */
     code {
         color: #FFFFFF;
         background: rgba(239, 183, 48, 0.4);
         margin: 2px;
         border: 0px solid #DfA710;
     }

     // 底部动态的叶子图标
     //.with-love{
     //	color: red;
     //}

     // 去掉文章白色背景
     .main-inner {
       background: rgba(255,255,255,0.0);
     }

     // 标签页链接下划线颜色
     a,
     span.exturl {
       border-bottom: 1px solid #DfA710;
     }

     // 标签页链接鼠标悬浮颜色
     .tag-cloud a:hover {
       color: #DfA710 !important;
     }
   ```
   

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

### post页面操作  
1. **自定义页面布局**  
```md
---
title: test-1
toc: true
widgets:
  - type: profile
    position: left
    author: Galen Du
    # Author title
    author_title: 日日行，不怕千万里；常常做，不怕千万事。
    # Author's current location
    location: Gansu
    # URL or path to the avatar image
    avatar: /img/galendu-blog.png
    # Whether show the rounded avatar image
    avatar_rounded: true
    # Email address for the Gravatar
    gravatar: 
    # URL or path for the follow button
    follow_link: https://github.com/galendu
  - type: toc
    position: left
  - type: categories
    position: left
  - type: tags
    position: left

date: 2024-02-25 22:09:32
tags:
categories:
cover:
thumbnail:
---

## 概述

> 本文。

<!--more-->

## 正文

```
