# ✍️ 随手记

在 `nodejs` 中, `__dirname` 是一个全局变量, 表示当前执行脚本所在的**目录**

如果使用 es module

```js
// es module
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

---

在使用 tsx `defineComponent` 的 render 时, 模板引用不使用 `useTemplateRef` 时, 需要将 ref 变量在 setup 函数中 **return** 出去

> 应该是因为 `defineComponent` 的 render 函数中无法访问到 setup 函数中的变量, 只有 return 出去才能访问 ref 并赋值

> 顺手一提: 模板中的 ref 原理是在渲染的某个阶段将对应的 dom 或者组件实例赋值给 ref 变量, 所以在 setup 函数中**无法访问**到模板中的 ref 变量, 只有 return 出去才能访问

---

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
