# 🌿 关于 git

我是 git 新手, 所以我需要这个笔记来记录我在使用 git 时遇到的问题

[有趣的 git 网站](https://learngitbranching.js.org/?locale=zh_CN)

#### [commitizen](https://github.com/commitizen/cz-cli) 最佳实践

规范 git commit 的库, 需要一个[适配器](https://github.com/commitizen/cz-conventional-changelog)

推荐使用[cz-git](https://cz-git.qbb.sh/zh/)

- 更好的图标支持
- 更友好的文档

> 下面例子使用的是 `cz-conventional-changelog` 适配器, 将 `cz-conventional-changelog` 替换为 `cz-git` 即可

**全局安装**

```bash
npm install -g commitizen

# 安装适配器
npm install -g cz-conventional-changelog

# 全局配置适配器
# echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
# 官网的配置方法在windows电脑下可能回报 utf8 的错误
# https://github.com/commitizen/cz-cli/issues/949
# 解决方法
echo '{ "path": "cz-conventional-changelog" }' | Add-content -Encoding UTF8 -Path ~/.czrc
```

可以在.czrc 文件下添加[更多配置](https://github.com/commitizen/cz-conventional-changelog?tab=readme-ov-file#configuration)

**局部配置[参考](https://github.com/commitizen/cz-cli?tab=readme-ov-file#making-your-repo-commitizen-friendly)**

完成后使用 cz -a 命令即可

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
