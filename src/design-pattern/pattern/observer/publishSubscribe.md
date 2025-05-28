# 发布订阅模式

发布订阅模式是在观察者模式基础之上将发布者与订阅者**解耦**, 发布者并不知道谁订阅了它

发布订阅模式依赖于**事件总线**来实现通信

以下是一个简单的实现

```ts
class EventBus {
	private events: { [key: string]: Function[] } = {}

	// 订阅方法
	subscribe(event: string, listener: Function): void {
		if (!this.events[event]) {
			this.events[event] = []
		}
		this.events[event].push(listener)
	}

	// 发布方法
	publish(event: string, data?: any): void {
		if (this.events[event]) {
			this.events[event].forEach((listener) => listener(data))
		}
	}

	// 取消订阅
	unsubscribe(event: string, listener: Function): void {
		if (this.events[event]) {
			this.events[event] = this.events[event].filter((l) => l !== listener)
		}
	}
}
```

## 最佳实践

这是一个类型安全的事件总线

<<< @/src/design-pattern/pattern/observer/publishSubscribe.ts
