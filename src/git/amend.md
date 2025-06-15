# 修改commit

## git commit --amend

修改上一个commit信息, 并且打开git编辑器, 输入 `:x` 退出

## git commit --amend --no-edit

将当前文件添加到上一个commit

在 `.zshrc` 中添加 committop 别名, 快捷commit

## git commit --amend -m "message"

修改上一个commit信息

## 其他

如果这个 commit 已经push

那么需要使用 `git push -f` 强制推送
