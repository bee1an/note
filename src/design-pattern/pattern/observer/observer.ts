/**
 * 抽象发布者类
 */
abstract class Publisher {
	protected subscribers: Subscriber[] = []

	abstract subscribe(s: Subscriber): void
	abstract unsubscribe(s: Subscriber): void
	abstract notifySubscribers(message: string): void
}

/**
 * 抽象观察者接口
 */
interface Subscriber {
	update(context: string): void
}

/**
 * 具体发布者
 */
class ConcretePulisher extends Publisher {
	subscribe(s: Subscriber): void {
		this.subscribers.push(s)
	}

	unsubscribe(s: Subscriber): void {
		const index = this.subscribers.indexOf(s)
		if (index > -1) {
			this.subscribers.splice(index, 1)
		}
	}

	notifySubscribers(context: string): void {
		this.subscribers.forEach((o) => o.update(context))
	}
}

/**
 * 具体订阅者
 */
class ConcreteSubscriber implements Subscriber {
	constructor(private name: string) {}

	update(context: string): void {
		console.log(`${this.name}收到消息：${context}`)
	}
}

class Client {
	constructor() {
		const pulisher = new ConcretePulisher()

		pulisher.subscribe(new ConcreteSubscriber('张三'))

		pulisher.subscribe(new ConcreteSubscriber('李四'))

		pulisher.notifySubscribers('hello world')
	}
}

new Client()
