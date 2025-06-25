# ❓ 预期之外的

记录一些我没想到的东西

## 关于 vue watch

如果监听的 Ref, callback 的返回值是**解包后的值**, 而不是 Ref

## js的for循环

不类似于do while, 会在第一次执行前判断一下条件是否满足在执行

```js
for (let i = 0; i < 0; i++) {}
```
