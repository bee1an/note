export {}

/**
 * 抽象中介者接口
 */
interface Mediator {
	notify(sender: object, event: string): void
}

/**
 * 抽象组件类
 */
abstract class Component {
	protected mediator: Mediator
	constructor(mediator?: Mediator) {
		this.mediator = mediator!
	}

	setMediator(mediator: Mediator): void {
		this.mediator = mediator
	}

	abstract notify(event: string): void
}

/**
 * 具体中介者类
 */
class ConcreteMediator implements Mediator {
	private componentA: ComponentA
	private componentB: ComponentB
	constructor(componentA: ComponentA, componentB: ComponentB) {
		this.componentA = componentA
		this.componentB = componentB
	}

	notify(sender: object, event: string): void {
		if (sender === this.componentA) {
			// 发送消息给组件 B
			this.reactOnA(event)
		} else if (sender === this.componentB) {
			// 发送消息给组件 A
			this.reactOnB(event)
		}
	}

	reactOnA(message: string) {
		this.componentB.operation(message)
	}

	reactOnB(message: string) {
		this.componentA.operation(message)
	}
}

/**
 * 组件类A
 */
class ComponentA extends Component {
	constructor(mediator?: Mediator) {
		super(mediator)
	}

	operation(message: string) {
		console.log('组件 A 收到消息', message)
	}

	notify(event: string): void {
		this.mediator.notify(this, event)
	}
}

/**
 * 组件类B
 */
class ComponentB extends Component {
	constructor(mediator?: Mediator) {
		super(mediator)
	}

	operation(message: string) {
		console.log('组件 B 收到消息' + message)
	}

	notify(event: string): void {
		this.mediator.notify(this, event)
	}
}

class Client {
	constructor() {
		const componentA = new ComponentA()
		const componentB = new ComponentB()

		const mediator = new ConcreteMediator(componentA, componentB)

		componentA.setMediator(mediator)
		componentB.setMediator(mediator)

		componentA.notify('hello')
	}
}

new Client()
