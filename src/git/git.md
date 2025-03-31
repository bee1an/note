# 🌿 关于 git

我是 git 新手, 所以我需要这个笔记来记录我在使用 git 时遇到的问题

[有趣的 git 网站](https://learngitbranching.js.org/?locale=zh_CN)

#### 关于 ssh

```bash
# 生成密钥（推荐使用更强的 ed25519 算法）
ssh-keygen -t ed25519 -C "your_email@example.com"
```

密钥会生成在 `~/.ssh` 目录下, 分别是 `id_ed25519` 和 `id_ed25519.pub`

私钥放在本地, 公钥放在 Git 平台, 二者匹配则可以操作仓库

#### tag

```bash
git tag -a v1.0 -m "tag message" # -a 表示创建一个带注释的标签
git tag -d v1.0 # 删除标签
git push origin v1.0 # 推送标签到远程仓库
git push origin --tags # 推送所有标签到远程仓库
git push --follow-tags # 推送的时候带上标签
```

#### 本地仓库跟踪远程仓库

```bash
git push -u origin 分支名 # -u = --set-upstream
```

#### 创建一个新的本地仓库关联远程仓库

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

#### 解决 git push 403 错误

错误原因: git 所设端口与系统代理不一致

1. 进入网络设置查看代理端口

2. 配置 git 代理端口为系统代理端口

```bash
git config --global http.proxy 系统代理
git config --global https.proxy 系统代理
```

其他命令

```bash
# 查看 git 代理配置
git config --global http.proxy
git config --global https.proxy

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### git 用户和邮箱

```bash
# 查看 git 用户名和邮箱
git config --global user.name
git config --global user.email

# 设置 git 用户名和邮箱
git config --global user.name "username"
git config --global user.email "email"
```
