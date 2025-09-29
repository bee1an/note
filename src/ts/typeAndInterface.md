# type 和 interface 的区别

## Record

`type` 自动被视为拥有明确结构的 `Record` 类型, 所以type默认可以兼容更宽泛的 Record 类型

所以 `type` 可以被用于 `Record<string, any>`

而 `interface` 不能直接赋值给`Record<string, any>`

因为`interface`可以通过额外的声明来增强，但 `type` 不能，所以推断 `type` 的隐式索引签名比interface的"更安全"

[详情](https://github.com/microsoft/TypeScript/issues/15300)

通俗的讲 `interface` 可以被重新定义所以他没有 `type` 安全, 所以不能使用 `interface` 赋值给 `Record<string, any>`

```ts
// interface 需要显示的声明, 但是这样类型又会变宽松
interface Test {
	[key: string]: any
}
```
