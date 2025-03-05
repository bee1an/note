# 🌿 关于 git

我是 git 新手, 所以我需要这个笔记来记录我在使用 git 时遇到的问题

[有趣的 git 网站](https://learngitbranching.js.org/?locale=zh_CN)

- 创建一个新的本地仓库关联远程仓库

```bash
# 初始化一个仓库
git init
git add .
git commit -m "commit message"
# 重命名分支与远端分支一致
# 说明：旧版 Git 默认主分支叫 master，但现在更推荐使用 main（GitHub 默认也使用 main）。
git branch -M main
# 关联远程仓库
git remote add origin 远端仓库地址
# -u 表示设置上游关联（后续可直接用 git push 代替完整命令）
git push -u origin main
```
