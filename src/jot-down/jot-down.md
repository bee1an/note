# ✍️ 随手记

随便记一些没有分类的东西

## unocss 属性化预设

前提条件开启 `presetWind3` 预设

```ts
import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
	presets: [presetWind3(), presetAttributify()]
})
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
