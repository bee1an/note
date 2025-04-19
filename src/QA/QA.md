# 💬 Q&A

## rollup 为什么构建开发环境产物和生成环境产物要用两套方案?

开发环境使用 `esbuild` 构建, `esbuild`, go 编写, 优点就是快, 但是在产物构建方面不如 `rollup` 全面

生成环境使用 `rollup` 构建, `rollup`, nodejs 编写, 生态比较完整

## 为什么需要 rolldown

rust 编写, 统一了 `rollup` 和 `esbuild` 可能存在的差异, 集成两者的优点, `vite` 底层会重构为 `rolldown` 编译和打包

## isNaN 和 Number.isNaN 的区别

`isNaN` 会先将参数转换为数字, 然后再判断是否为 `NaN`

`Number.isNaN` 会直接判断参数是否为 `NaN`
