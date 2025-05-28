export {}

/**
 * 抽象原发器接口
 * 这个接口的实现类是具体备忘录的成员变量
 */
interface Originator {
	state: number
	save(): Memento
	restore(memento: Memento): void
}

/**
 * 备忘录抽象接口
 * 状态恢复工作交给备忘录来完成
 * 因此负责人可以不关心是哪个原发器在恢复状态, 从而降低耦合
 */
interface Memento {
	createTimestamp: string
	restore(): void
}

/**
 * 具体备忘录类
 * 内部保存了原发器与原发器的状态, 这样是降低耦合的关键
 * 不必在意这个具体类的成员变量的访问权限, 因为这个具体类只有原发类能访问
 * 其他对象(负责人)只能访问到抽象接口
 */
class ConcreteMemento implements Memento {
	createTimestamp: string

	constructor(
		public originator: Originator,
		public state: number
	) {
		this.createTimestamp = new Date().toISOString()
	}

	restore() {
		this.originator.restore(this)
	}
}

/**
 * 具体原发器类
 */
class ConcreteOriginator implements Originator {
	state: number = 0

	save(): Memento {
		return new ConcreteMemento(this, this.state)
	}

	restore(m: Memento) {
		const memento = m as ConcreteMemento
		this.state = memento.state
	}

	print() {
		console.log(`Originator: My state is: ${this.state}`)
	}
}

/**
 * 负责人类
 * 负责人类只关系有哪些备忘录
 * 不关心这些备忘录属于哪些原发器, 备忘录的归属问题已经在创建备忘录时决定
 */
class Caretaker {
	mementos: Memento[] = []

	add(memento: Memento) {
		this.mementos.push(memento)
	}

	/** 还原状态 */
	restore() {
		const memento = this.mementos.pop()!
		console.log('Memento save time:', memento.createTimestamp)
		memento.restore()
	}
}

class Client {
	constructor() {
		const originator = new ConcreteOriginator()
		const caretaker = new Caretaker()
		console.log('初始状态')
		originator.print()

		caretaker.add(originator.save())

		console.log('修改状态')
		originator.state = 1
		originator.print()

		console.log('还原状态')
		caretaker.restore()
		originator.print()
	}
}

new Client()
