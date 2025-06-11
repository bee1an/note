# 🟡 关于 nodejs

## node 模块解析规则

在模块化中如果`require('...')`或者 `import '...'`会遵循以下规则

**如果是一个文件路径 `require('./a')`**

- 文件查找
  - 根据路径查找 a 文件
  - 没有 a 文件,则查找 a.js
  - 没有 a.js,则查找 a.json
- 文件查找没通过则进入文件夹查找
  - 查找 a 文件夹下的 package.json 中定义的 main 字段
  - 没有 main 字段,则查找 a 文件夹下的 index.js
  - 没有 index.js,则查找 a 文件夹下的 index.json

**如果不是一个文件路径**

- 内置模块查找
  - 查找 node 内置模块 a 文件
- 内置模块未找到则进入第三方模块查找
  - 查找 node_modules 下的 a 文件
  - 没有 a 文件,则查找 a.js
  - (遵循文件查找规则...)

## \_\_dirname

在 `nodejs` 中, `__dirname` 是一个全局变量, 表示当前执行脚本所在的**目录**

如果使用 es module

```js
// es module
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

## [关于 node 钩子](https://nodejs.org/api/module.html#customization-hooks)

node 可以在执行文件前后做一些事情

比如直接执行 ts 文件, 借助 `tsx`

```bash
node --import tsx ./my-app.js
```

```bash
# (废弃版本) Nodejs v20.5.1 及以下
node --loader tsx ./file.ts
```

在 js 文件内部, 可以直接使用 `tsx` 接管, 这样就可以在 js 文件中解析 ts 文件了

> 使用这个规范需要将 `package.json` 中的 `type` 设置为 `module`, 使用后缀名为 `.mjs` 时不生效

```js
import 'tsx'

// 这样就可以直接使用 ts 文件了
await import('./file.ts')
```

指定使用 `esm` 规范

```js
import 'tsx/esm'

await import('./file.ts')
```

指定使用 `cjs` 规范

```js
import 'tsx/esm'

await import('./file.ts')
```

通过以上方式, 我们可以解决以下问题

1. 不支持 ts 配置文件的第三方库

`rollup` 打包的时候, `rollup` 不认识 ts 后缀的配置文件, 但是我们又想使用 ts 文件, 这时我们就可以创建两个文件

```js
// rollup.config.js

import 'tsx/esm'
export default import('./rollup.config.ts')
```

```ts
// rollup.config.ts
import { defineConfig } from 'rollup'

export default defineConfig({
	// ...
})
```

让 `rollup` 拾取 js 文件, 然后在这个文件中, 使用 `tsx` 来解析真正的配置文件

2. 第三方库支持 ts 文件, 但是使用的 ts 解析器太慢

例如: commitlint v18.6.1

附上 element-plus 解决的方案源码

```js
// commitlint uses `ts-node` to load typescript config, it's too slow. So we replace it with `esbuild`.
require('@esbuild-kit/cjs-loader')
module.exports = require('./commitlint.config.ts').default
```

如果觉得有两个同名文件太丑可以通过 vscode 工作区配置将这个两个文件折叠起来

```json
// .vscode/settings.json
{
	"explorer.fileNesting.enabled": true,
	"explorer.fileNesting.patterns": {
		// 举个例子
		"commitlint.config.ts": "commitlint.config.js"
	}
}
```
