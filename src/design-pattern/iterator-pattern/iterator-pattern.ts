export {}

/**
 * 抽象迭代器
 */
interface Iterator<T> {
	hasNext(): boolean
	next(): T | null
}

/**
 * 抽象集合接口
 */
interface WxCollection {
	list: { name: string; type: string }[]

	getIterator(): Iterator<{ name: string; type: string }>
}

/**
 * 抽象集合类
 */
abstract class WxCollectionImpl implements WxCollection {
	list: { name: string; type: string }[]

	abstract getIterator(): Iterator<{ name: string; type: string }>

	constructor() {
		this.list = [
			{
				name: 'coWorker-2',
				type: 'coWorker'
			},
			{
				name: 'friend-1',
				type: 'friend'
			},
			{
				name: 'coWorker-1',
				type: 'coWorker'
			},
			{
				name: 'friend-2',
				type: 'friend'
			}
		]
	}
}

/**
 * 具体迭代器类
 */
class WxIteratorImpl implements Iterator<{ name: string; type: string }> {
	private index: number = 0

	constructor(
		private collection: WxCollection,
		private type: string
	) {}

	private _getNext() {
		for (let index = this.index; index < this.collection.list.length; index++) {
			const element = this.collection.list[index]

			if (element.type === this.type) {
				return { element, index }
			}
		}
	}

	hasNext(): boolean {
		return !!this._getNext()
	}

	next(): { name: string; type: string } | null {
		const next = this._getNext()

		if (next) {
			this.index = next.index + 1
			return next.element
		}

		return null
	}
}

/**
 * 具体集合类(朋友相关)
 * 这里使用了工厂方法模式重写
 * 后续如果需要新增迭代行为就只需要添加新的子类并重写工厂方法
 */
class WxFriendCollection extends WxCollectionImpl {
	constructor() {
		super()
	}

	getIterator() {
		return new WxIteratorImpl(this, 'friend')
	}
}

/**
 * 具体集合类(同事相关)
 */
class WxCoWorkerCollection extends WxCollectionImpl {
	constructor() {
		super()
	}

	getIterator() {
		return new WxIteratorImpl(this, 'coWorker')
	}
}

/**
 * 客户端
 */

class Clint {
	constructor() {
		const wxFriendCollection = new WxFriendCollection()
		const wxCoWorkerCollection = new WxCoWorkerCollection()

		this.send(wxFriendCollection.getIterator(), '朋友, 新年快乐')
		this.send(wxCoWorkerCollection.getIterator(), '同事, 新年快乐')
	}

	send(iterator: Iterator<{ name: string; type: string }>, message: string) {
		while (iterator.hasNext()) {
			const item = iterator.next()!
			console.log(`给${item.name}发消息: ${message}`)
		}
	}
}

new Clint()
