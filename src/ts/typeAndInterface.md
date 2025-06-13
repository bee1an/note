# type 和 interface 的区别

## Record

`type` 自动被视为拥有明确结构的 `Record` 类型

所以`type` 可以被用于 `Record<string, any>`

而 `interface` 不能直接赋值给`Record<string, any>`

```ts
// interface 需要显示的声明, 但是这样类型又会变宽松
interface Test {
	[key: string]: any
}
```
