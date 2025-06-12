# 类型安全的中介者模式

> [!WARNING] 这个方法不行, 当个技巧看吧, 函数重载才是最佳实践

[回顾一下中介者模式](../../design-pattern/pattern/mediator/mediator.md)

中介者通过 `notify` 接受组件发送的消息

```ts
class Mediator {
	notify(sender: Component, event: string, message: stirng) {}
}
```

我们给这个函数添加类型约束, 让组件只能发送自己定义好的方法

假定我们有组件

```ts
class Component1 {
	action() {
		this._mediator.notify(this, 'action', 'hello')
	}
}

class Component2 {
	action() {
		this._mediator.notify(this, 'action2', 'world')
	}
}
```

这时 `Component1` 只能发送 `action` 事件, `Component2` 只能发送 `action2` 事件, 并且携带不同的参数

因为我们的事件发送根据对象决定, 所以我们不能用传统的定义一个对象类型来定义事件, 因为对象的类型 `key` 只能是字符串或者符号

所以我们这里使用元组来定义事件

```ts
type Events = [
	{
		target: Component1 // 事件发送者
		events: {
			// 事件名, 参数, 返回值
			action: (message: 'hello') => any
		}
	},
	{
		target: Component2
		events: {
			action2: (message: 'world') => any
		}
	}
]
```

这样我们就定义好了事件所有所需的内容了, 接下来需要定义通知函数类型

首先定义函数的第一个参数也就是发送者类型, 发送者的具体类型根据调用时决定, 所以使用泛型来定义

```ts
type Notify = <T extends Events[number]['target']>(s: T) => any
```

然后我们需要根据发送者的类型来推断可以发出的事件类型

在这之前我们需要定义一个获取元组类型中的元素其属性的类型等于指定类型的方法

```ts
type GetAssignPropItem<T extends any[], K, Prop> = T extends [
	infer F extends T[number],
	...infer Tail extends any[]
]
	? K extends F[Prop extends keyof F ? Prop : never]
		? F
		: GetAssignPropItem<Tail, K, Prop>
	: never
```

其大概逻辑是:

1. 获取元组的第一个元素
2. 判断这个元素的属性的类型是否等于指定类型
3. 如果等于则返回这个元素
4. 如果不等于, 则将剩下的元素递归调用,直到返回指定元素或者返回 `never`

---

根据上面的方法继续完善通知函数

需要根据事件触发者的类型到元组中获取与该类型相等的元素, 然后读取其 `events` 属性

```ts
type Notify = <T extends Events[number]['target']>(
	s: T,
	event: keyof GetAssignPropItem<NotifyEvents, T, 'target'>['events']
) => any
```

下一步需要定义参数的类型, 参数的类型需要根据具体事件的类型来确定, 所以需要将事件类型抽取为泛型参数

```ts
type Notify = <
	T extends Events[number]['target'],
	K extends keyof GetAssignPropItem<NotifyEvents, T, 'target'>['events']
>(
	s: T,
	event: K,
	// 不能确定参数的数量所以使用剩余参数
	// 这里需要判断一下事件值的类型, 如果是函数才能返回正确的值
	// 具体的我也不知道为啥推断不出来, 这里的泛型K推断出来是string类型, 而不是一个确定的类型, 不过这并不影响使用, 只是定义是有点恶心
	...args: Parameters<
		GetAssignPropItem<NotifyEvents, T, 'target'>['events'][K] extends (...args: any[]) => any
			? GetAssignPropItem<NotifyEvents, T, 'target'>['events'][K]
			: () => unknown
	>
) => any
```

返回值同理

```ts
type Notify = <
	T extends Events[number]['target'],
	K extends keyof GetAssignPropItem<NotifyEvents, T, 'target'>['events']
>(
	s: T,
	event: K,
	...args: Parameters<
		GetAssignPropItem<NotifyEvents, T, 'target'>['events'][K] extends (...args: any[]) => any
			? GetAssignPropItem<NotifyEvents, T, 'target'>['events'][K]
			: () => unknown
	>
) => ReturnType<
	GetAssignPropItem<NotifyEvents, T, 'target'>['events'][K] extends (...args: any[]) => any
		? GetAssignPropItem<NotifyEvents, T, 'target'>['events'][K]
		: () => never
>
```

最后再优化一下

```ts
type Sender = Events[number]['target']

// 重复部分提取出来
type GetEventsProp<T extends Sender> = GetAssignPropItem<Events, T, 'target'>['events']

// 最终形态
type Notify = <T extends Sender, K extends keyof GetEventsProp<T>>(
	s: T,
	event: K,
	...args: Parameters<
		GetEventsProp<T>[K] extends (...args: any[]) => any ? GetEventsProp<T>[K] : () => unknown
	>
) => ReturnType<
	GetEventsProp<T>[K] extends (...args: any[]) => any ? GetEventsProp<T>[K] : () => never
>
```

> [!WARNING] 在组件中使用时注意 `this` 的指向

```ts
class Component1 {
	action() {
		// 这里的 this 指向可能会改变, 所以 ts 不能确定 this 的类型, 就不能获取完整的提示
		this._mediator.notify(this as Component1, 'action', 'hello')
	}
}
```
