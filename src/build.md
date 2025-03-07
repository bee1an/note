# 📦 关于打包

### 🌀 Rollup 指南

#### 🔧 核心插件

- [`@rollup/plugin-node-resolve`](#1-第三方包解析基本必备)
- [`rollup-plugin-esbuild`](#2-typescript-编译方案)
- [`unplugin-vue`](#3-vue-组件编译方案)
- [`@vitejs/plugin-vue-jsx`](#4-vue-tsx-编译方案)
- [`rollup-plugin-visualizer`](#5-生成包结构)
- [`rollup-plugin-copy`](#6-保留指定文件)
- [`vite-plugin-dts`](#7-dts-生成方案)

##### 1. 第三方包解析（基本必备）

- [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve)  
  🔍 使用技巧：
  ```ts
  resolve({ extensions: ['.ts'] }) // 启用 TypeScript 文件扩展名自动解析
  ```
  ⚠️ 注意(_个人猜测未验证_)：TS 项目必须添加此配置项（相当于自动补全模块的.ts 后缀）

##### 2. TypeScript 编译方案

✅ **推荐方案**：

- [`rollup-plugin-esbuild`](https://github.com/egoist/rollup-plugin-esbuild)  
  🌟 Vite 内部同款编译器，支持 Tree-Shaking
  🌟 **快!** 可以代替 `rollup-plugin-typescript2`, `@rollup/plugin-typescript` 和 `rollup-plugin-terser`的集合

  ⚠️ rollup 在 Tree-Shaking vue(>=3.3) 时会报警告

  > "Fragment" is imported from external module "vue" but never used in "node_modules/.pnpm/vue@3.5.13_typescript@5.7.2/node_modules/vue/jsx-runtime/index.mjs"

  📖 关于 tsx: esbuild 会自动拾取`tsconfig.json`配置或者[单独配置](https://github.com/egoist/rollup-plugin-esbuild?tab=readme-ov-file#usage)
  ⚠️ vue tsx **不推荐**使用该方案

❌ **不推荐方案**：

- `@rollup/plugin-typescript`（官方插件）
- `rollup-plugin-typescript2`（社区插件）  
  🚫 限制因素：
  - 无法解析 SFC 文件的 TS 语法
  - 缺乏 Tree-Shaking 支持（待验证）

##### 3. Vue 组件编译方案

⚠️ 本项目采用 `unplugin-vue`

✅ **生产级方案**：

- [`@vitejs/plugin-vue`](https://github.com/vitejs/vite-plugin-vue)

- [`unplugin-vue`](https://github.com/unplugin/unplugin-vue)
  🔄 定期从@vitejs/plugin-vue 同步代码（用于 rollup）

🚫 **已废弃方案**：

- ~~`rollup-plugin-vue`~~  
  ⛔ github 已经归档，不再维护，代替方案 `unplugin-vue`
  ⚠️ 已知问题：[~~Vue 3.3 类型宏增强方案似乎未生效~~](https://blog.vuejs.org/posts/vue-3-3#imported-and-complex-types-support-in-macros)

  ```ts
  import { type Foo } from 'anywhere'
  defineProps<Foo>() // 当使用外部类型时编译报错
  ```

##### 4. Vue tsx 编译方案

- [`@vitejs/plugin-vue-jsx`](https://github.com/vitejs/vite-plugin-vue)

##### 5. 生成包结构

- [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer?tab=readme-ov-file#usage)

  ⚙️ 生成`stats.html`文件，用于展示打包后的包结构

##### 6. 保留指定文件

- [`rollup-plugin-copy`](https://github.com/vladshcherbin/rollup-plugin-copy)

##### 7. dts 生成方案

❌ **不推荐方案**：

- [`rollup-plugin-dts`](https://github.com/Swatinem/rollup-plugin-dts)
  - 无法生成 vue 文件的 dts

✅ **推荐方案**：

- [`vite-plugin-dts`](https://github.com/qmhc/vite-plugin-dts)

  **常见问题**

  > The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.

  - 在 tsx 文件中模板引用使用了 `ref`，需要使用 `shallowRef`

### 其他好用的包

### [~~**rimraf**~~](https://github.com/isaacs/rimraf)

可以执行删除命令, 快速删除 node_modules 目录

可以使用 [`shelljs`](https://github.com/shelljs/shelljs) 代替

### [`shelljs`](https://github.com/shelljs/shelljs)

可以执行 Unix shell 命令, 其中包含了 `rm` 命令

```js
// 删除 dist 目录
shell.rm('-rf', 'dist')
```
