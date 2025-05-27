export {}

/**
 * 备忘录抽象接口
 * 这个接口不能有任何状态, 它可以有一些元数据, 也可以是空的
 * 因为这个接口是限制负责人的访问权限的
 */

interface Memento {
	createTimestamp: string
}

/**
 * 具体备忘录类
 */
class ConcreteMemento implements Memento {
	createTimestamp: string
	constructor(public state: number) {
		this.createTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ') as string
	}
}

/**
 * 原发器类
 */
class Originator {
	state: number = 0

	/** 保存备忘录 */
	save() {
		return new ConcreteMemento(this.state)
	}

	/** 还原状态 */
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
 */
class Caretaker {
	constructor(private originator: Originator) {}

	mementos: Memento[] = []

	add(memento: Memento) {
		this.mementos.push(memento)
	}

	/** 还原状态 */
	restore() {
		const memento = this.mementos.pop()!
		console.log('Memento save time:', memento.createTimestamp)
		this.originator.restore(memento)
	}
}

class Clint {
	constructor() {
		const originator = new Originator()
		const caretaker = new Caretaker(originator)
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

new Clint()
