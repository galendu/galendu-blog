# galendu-blog

## 初始化  
>参考: https://razeen.me/posts/use-github-action-to-deploy-your-hexo-blog/

```bash
npm config set registry https://registry.npmmirror.com
#npm --registry=https://registry.npmmirror.com install -g hexo-cli
npm  install -g hexo-cli
hexo init galendu-blog
cd galendu-blog
# npm install hexo-theme-next
npm install -S hexo-theme-icarus hexo-renderer-inferno
npm install hexo-abbrlink --save
npm install hexo-deployer-git --save
# 配置theme为icarus
hexo clean && hexo g && hexo s
hexo d -g
# ssh-keygen -f github-deploy-keyapt
hexo clean && hexo g && git add . && git commit -m `date  '+%Y%m%d%H%M'` && git push
# 回滚代码
git reset --hard commitid