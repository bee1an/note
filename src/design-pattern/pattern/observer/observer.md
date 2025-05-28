# 观察者模式

[参考文章](https://refactoringguru.cn/design-patterns/observer)

> 亦称: 事件订阅者、监听者、Event-Subscriber、Listener、Observer

观察者模式是一种[行为型设计模式](../pattern.md#行为型模式)

**区分[发布订阅模式](./publishSubscribe.md)**

## 场景

小宇开发了一款频道热点传播软件, 现在卡在了传播消息都逻辑上, 如果有用户订阅了某个频道但是接受不到这个频道的消息, 那这样的体验是不好的, 但是如果有频道发布了新内容就给所有用户推送消息的话这样也会导致没有订阅这个频道的用户收到很多没用的消息

所以现在只需要在频道发布新内容时**只给订阅**了该频道的用户推送消息

## 解决方法

在上面的例子中

频道被成为发布者(publisher), 需要将自身状态的改变(也就是发布新内容)**推送**给其他对象(订阅用户)

订阅用户**关注**发布者的状态改变, 被称为订阅者(subscriber)

观察者模式建议给发布者**添加订阅机制**, 让每个订阅者能够订阅或者取消订阅

```ts
class Publisher {
	protected subscribers: Subscriber[] = []
	// 订阅
	subscribe(s: Subscriber): void {
		this.subscribers.push(s)
	}

	// 取消订阅
	unsubscribe(s: Subscriber): void {
		const index = this.subscribers.indexOf(s)
		if (index > -1) {
			this.subscribers.splice(index, 1)
		}
	}
}
```

当发布者发布消息时, 会将所有的订阅者遍历并通知

```ts
class Publisher {
	// ...
	notifySubscribers(context: any) {
		this.subscribers.forEach((item) => item.更新(context))
	}
}
```

实际上一个发布者有多个订阅者订阅, 你也不想保存订阅者的容器类型跟实际订阅者类型一样多对吧, 所以所有的订阅者需要实现同一个抽象订阅者接口, 保证发布者与订阅者之间**松耦合**(不依赖与具体实现, 只依赖抽象接口, [发布订阅模式](./publishSubscribe.md)是完全解耦的一种实现方式), 接口中必须声明通知方法及其参数, 这样发布者在发出通知时还能传递一些上下文数据

```ts
interface Subscriber {
	update(data: any): void
}
```

如果实际应用中存在多个发布者, 那么可以让这些发布者实现同一个抽象发布者接口

## 结构

> 引用自: https://refactoringguru.cn/design-patterns/observer

![structure](./structure-indexed.png)

1. 发布者 （Publisher） 会向其他对象发送值得关注的事件。 事件会在发布者自身状态改变或执行特定行为后发生。 发布者中包含一个允许新订阅者加入和当前订阅者离开列表的订阅构架。

2. 当新事件发生时， 发送者会遍历订阅列表并调用每个订阅者对象的通知方法。 该方法是在订阅者接口中声明的。

3. 订阅者 （Subscriber） 接口声明了通知接口。 在绝大多数情况下， 该接口仅包含一个 update更新方法。 该方法可以拥有多个参数， 使发布者能在更新时传递事件的详细信息。

4. 具体订阅者 （Concrete Subscribers） 可以执行一些操作来回应发布者的通知。 所有具体订阅者类都实现了同样的接口， 因此发布者不需要与具体类相耦合。

5. 订阅者通常需要一些上下文信息来正确地处理更新。 因此， 发布者通常会将一些上下文数据作为通知方法的参数进行传递。 发布者也可将自身作为参数进行传递， 使订阅者直接获取所需的数据。

6. 客户端 （Client） 会分别创建发布者和订阅者对象， 然后为订阅者注册发布者更新。

## 贴个代码

<<< @/src/design-pattern/pattern/observer/observer.ts
