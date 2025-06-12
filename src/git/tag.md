# tag

[[toc]]

## -a 表示创建一个带注释的标签

-a即--annotate, 带批注的标签需要message信息

```bash
git tag -a v1.0 -m "tag message"
```

## 删除标签

```bash
git tag -d v1.0
```

## 推送标签到远程仓库

推送指定标签

```bash
git push origin v1.0
```

## 推送所有标签到远程仓库

只推标签

```bash
git push origin --tags
```

## 推送的时候带上标签

即推代码又推标签

```bash
git push --follow-tags
```

## 如果想修改一个已经推送的标签

```bash
# 删除这个标签的本地标签
git tag -d v1.0 # 这个会返回一个标签id(注意这个不是commit id)
# 创建一个新标签, 并且指定commit id
git tag -f v1.0 <commit id> -m "tag message" # 这里的commitid可以用上面返回的(id^{}代替)
# 代替后为 git tag -f v1.0 <tag id>^{} -m "tag message"

# 删除远端标签
git push origin :refs/tags/v1.0

# 再走推送流程
```
