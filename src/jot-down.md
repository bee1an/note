# ✍️ 随手记

## \_\_dirname

在 `nodejs` 中, `__dirname` 是一个全局变量, 表示当前执行脚本所在的**目录**

如果使用 es module

```js
// es module
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

## tsx 模板引用

在使用 tsx `defineComponent` 的 render 时, 模板引用不使用 `useTemplateRef` 时, 需要将 ref 变量在 setup 函数中 **return** 出去

> 应该是因为 `defineComponent` 的 render 函数中无法访问到 setup 函数中的变量, 只有 return 出去才能访问 ref 并赋值

> 顺手一提: 模板中的 ref 原理是在渲染的某个阶段将对应的 dom 或者组件实例赋值给 ref 变量, 所以在 setup 函数中**无法访问**到模板中的 ref 变量, 只有 return 出去才能访问

## 折叠 vscode 文件

在 vscode 中可以通过配置 settings.json 折叠文件

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json",
    "package.json": "package-lock.json, yarn.lock",
    "env.d.ts": ".env.development, .env.production",
    "vite.config.ts": "vitest.config.ts"
  }
}
```

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
