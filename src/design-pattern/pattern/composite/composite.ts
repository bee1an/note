export {}
/**
 * 这个例子展示的时透明组合模式
 * 抽象组件会包含组的方法, 在具体组中重写这些方法
 * 好处是客户端在使用这个组件的子类是不需要关心它到底是不是组, 因为即使是节点也会包含这个方法
 * 缺点就是节点会有空方法
 *
 * 还有一种安全组合模式
 * 即抽象组件并不知道组的方法
 * 这样客户端需要在使用组的方法的地方明确当前对象的类型
 */

/**
 * 组件
 */
abstract class GraphicComponent {
	children: GraphicComponent[] = []

	constructor(public name: string) {}

	addChild(_: GraphicComponent) {
		throw new Error('Method not implemented.')
	}

	removeChild(_: GraphicComponent) {
		throw new Error('Method not implemented.')
	}

	/**
	 * 通用方法
	 */
	abstract move(): void
}

/**
 * 组
 */
class GraphicComposite extends GraphicComponent {
	addChild(child: GraphicComponent) {
		this.children.push(child)
	}

	removeChild(child: GraphicComponent) {
		const index = this.children.indexOf(child)
		if (index > -1) {
			this.children.splice(index, 1)
		}
	}

	move() {
		console.log('移动: ' + this.name + '\n\t委派给子节点')
		// 移动方法委派给子元素
		this.children.forEach((child) => child.move())
	}
}

/**
 * 节点
 */
class CircleLeaf extends GraphicComponent {
	move() {
		console.log('移动: ' + this.name)
	}
}

class RectangleLeaf extends GraphicComponent {
	move() {
		console.log('移动矩形: ' + this.name)
	}
}

class Client {
	constructor() {
		const component = new GraphicComposite('根')
		const graphic1 = new CircleLeaf('圆形1')
		component.addChild(graphic1)

		const composite1 = new GraphicComposite('组合1')
		component.addChild(composite1)
		const graphic2 = new CircleLeaf('圆形2')
		composite1.addChild(graphic2)

		const composite2 = new GraphicComposite('组合2')
		component.addChild(composite2)
		const rect1 = new RectangleLeaf('矩形1')
		const rect2 = new RectangleLeaf('矩形2')
		composite2.addChild(rect1)
		composite2.addChild(rect2)

		component.move()
	}
}

new Client()
