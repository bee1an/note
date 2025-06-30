# 🔧 关于 ts

## tsx给vue组件原生属性时报错

```vue
<template>
	<!-- 正常 -->
	<Button @click="handleClick" />
</template>
```

```tsx
<Button onClick="handleClick" /> // [!code error] 报错没有声明click方法
```

### 解决方法

手动添加声明

```ts
// env.d.ts
import type { HTMLAttributes } from 'vue'

declare module 'vue' {
	export interface AllowedComponentProps extends HTMLAttributes {}
}

export {}
```

## tsconfig.json 关键配置

- `verbatimModuleSyntax`: 导入类型不使用 **import type** 时报错

- `jsx`: 设置为 `preserve` 保留 jsx 语法, 后面通过 `vueJsx` 插件编译

- `jsxImportSource`: 低版本 `vue` 隐式注册全局 JSX 命名空间, 所以不需要配置, [高版本(>=3.4)需要配置有以下内容](https://cn.vuejs.org/guide/extras/render-function.html#jsx-type-inference)

```json
"compilerOptions": {
  "jsx": "preserve",
  "jsxImportSource": "vue"
  // ...
}
```
