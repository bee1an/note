# Windows 终端美化

[参考文章](https://www.cooorgi.top/articles/5e70877f.html)

### 准备

#### [oh-my-posh](https://ohmyposh.dev/)

一个用于美化 `Windows` 终端的工具, 支持多种主题, powershell 下支持自动补全

```bash
# 安装
winget install JanDeDobbeleer.OhMyPosh -s winget
# 安装完成后会多一个环境变量 oh-my-posh
# 环境变量指向 C:\Users\user\AppData\Local\Programs\oh-my-posh\bin
```

#### [clink](https://github.com/chrisant996/clink)

命令行自动补全工具, windows 自带的命令行工具不支持自动补全

```bash
# 安装
winget install clink
# 安装完成后会多一个环境变量 clink
```

或者到[官网](https://chrisant996.github.io/clink/)下载 exe 运行

#### [nerd font](https://www.nerdfonts.com/font-downloads)

字体, 解决不显示图标和乱码问题

推荐使用: [CascadiaCode](https://github.com/ryanoasis/nerd-fonts/releases/download/v3.3.0/CascadiaCode.zip)

下载完成后将 ttf 后缀文件复制到 `C:\Windows\Fonts` 目录下

### 开始

#### cmd 美化

找到 clink 的安装路径（默认应为 C:\Program Files (x86)\clink），在文件夹中创建一个文件 oh-my-posh.lua，添加以下内容

```bash
load(io.popen('oh-my-posh init cmd'):read("\*a"))()

# or 配置主题
load(io.popen("oh-my-posh init cmd --config D:\\tools\\oh-my-posh\\themes\\my.omp.json"):read("*a"))()
```

#### powershell 美化

先更新最新的版本

```bash
winget install --id Microsoft.Powershell --source winget
```

修改默认 `PowerShell` 终端，更改为刚刚下载的位置，默认为 `C:\Program Files\PowerShell\7\pwsh.exe`

使用管理员权限打开 `PowerShell`, 执行以下命令

```bash
# 设置 PowerShell 的执行策略为 RemoteSigned
set-executionpolicy RemoteSigned

# 查看 PowerShell 的输出编码格式
$OutputEncoding

# 检查 $PROFILE 路径是否存在
Test-path $profile

# 如果 $PROFILE 配置文件不存在，New-Item 命令会创建该文件
New-Item -Type file -Force $PROFILE

# powershell初始化加载 PSReadLine 模块
Import-Module PSReadLine

# 使用历史记录进行脚本提示
Set-PSReadLineOption -PredictionSource History

# alt在windows中有特殊用途，我个人更喜欢Tab，所以这里使用Tab键代替
Set-PSReadLineKeyHandler -Chord "Tab" -Function ForwardWord
```

打开配置文件

```bash
notepad $PROFILE
```

添加以下内容

```bash
oh-my-posh init pwsh  | Invoke-Expression

# or 配置主题
oh-my-posh init pwsh --config D:\\tools\\oh-my-posh\\themes\\my.omp.json | Invoke-Expression
```

#### 配置终端字体

打开终端 json 设置, 添加以下配置

```json
{
  "profiles": {
    "defaults": {
      "colorScheme": "One Half Dark",
      "font": {
        "face": "CaskaydiaCove Nerd Font", // 这里使用的是上面下载的字体
        "size": 10
      },
      "opacity": 85,
      "useAcrylic": true
    }
  }
}
```

#### 配置 vscode 终端字体

在 `settings.json` 中添加以下配置

```json
{
  "terminal.integrated.fontFamily": "CaskaydiaCove Nerd Font"
}
```
