# 🧩 关于包管理器

## 给包改个名字

```json
// package.json
"dependencies": {
  "vite": "npm:rolldown-vite@^6.3.18"
}
```

这样你的vite将会使用 `rolldown-vite`

## package tag

npm publish 时，可以给包添加 tag，方便用户选择安装

```bash
npm publish --tag <tagname>
```

- alpha: 预览版或内部测试版
- beta: 公开测试版
- latest: 最新版
- 可以自定义

**查看**一个包的所有 tag

```bash
npm dist-tag ls <your package>
```

**删除**一个 tag

```bash
npm dist-tag rm <package> <tagname>
```

**添加**一个 tag

```bash
npm dist-tag add <package>@<version> <tagname>
```

## 安装选项

1. --save-dev(简写 -D)​: 将包添加到开发依赖中
2. --global(简写 -g): 将包安装到全局环境中
3. --save-exact(简写 -E): 精确版本号安装, 不会有语义化版本范围

## npx 是什么

**临时安装**并运行一个 Node.js 包，而无需全局安装或显式添加到项目依赖中

比如临时使用 `crate-react-app`

```bash
npx create-react-app my-app
```

## 常用命令

基于现有 lockfile 安装依赖（不更新 lockfile）

```bash
npm i --frozen-lockfile
```

## npm link 本地软链的指南 (pnpm)

[ ] 测试.d.ts 类型文件, 之前测试时未生效

将本地代码链接到 npm 全局软链接, 可以通过这个软连接测试本地代码

操作步骤:

1. 进入到需要代理的项目根目录(在打包后代理, package.json 同级目录)

2. 执行`pnpm link --global`, 此命令会将当前包(package.json 中的 name)代理到 pnpm 全局储存目录

3. 在测试项目中引入这个软连接, `pnpm link --global 项目名`

也可以通过 `pnpm add -g .` 命令将本地代码链接到 npm 全局软链接, 删除的话可以通过`pnpm remove -g 项目名`命令删除

其他:

- 替代命令（pnpm 特有）**该方案 ai 生成未测试**

  ```bash
  # 在测试项目中直接安装本地组件库
  pnpm add /absolute/path/to/your-monorepo/packages/components
  ```

- 清除软连接的方式

  - 清除测试目录软连接

  ```bash
  # 进入测试项目目录
  cd ...

  # 仅清除当前测试项目的软连接
  pnpm unlink --global @your-scope/components
  ```

  - 清除全局储存的软连接

  ```bash
  # 进入组件库目录
  cd ...

  # 解除全局链接
  pnpm unlink --global
  ```

- pnpm 全局安装目录地址
  ```bash
  pnpm root -g
  ```
