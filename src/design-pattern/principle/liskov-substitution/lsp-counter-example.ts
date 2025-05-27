/**
 * 这是一个反例, 违背了里氏代换原则
 */

export {}

/**
 * 长方形类
 */
class Rectangle {
	width: number
	height: number
	constructor(w: number, h: number) {
		this.width = w
		this.height = h
	}

	/** 设置宽度方法 */
	setWidth(w: number) {
		this.width = w
	}

	/** 设置高度方法 */
	setHeight(h: number) {
		this.height = h
	}
}

/**
 * 正方形类
 */
class Square extends Rectangle {
	constructor(w: number) {
		super(w, w)
	}

	/** 设置宽度方法 */
	setWidth(w: number) {
		super.setWidth(w)
		super.setHeight(w)
	}

	/** 设置高度方法 */
	setHeight(h: number) {
		super.setWidth(h)
		super.setHeight(h)
	}
}

class Clint {
	constructor() {
		const r = new Rectangle(4, 5)
		this.resize(r)
		this.print(r)
		console.log('长方形拓宽成功')
		const s = new Square(5)
		this.resize(s) // [!code error] 死循环, 这里不应该可以传入正方形类
	}

	/**
	 * 对长方形进行拓宽操作
	 */
	resize(r: Rectangle) {
		while (r.width <= r.height) {
			r.setWidth(r.width + 1)
			console.log('拓宽中...', r.width, r.height)
		}
	}

	print(r: Rectangle) {
		console.log(`width: ${r.width}, height: ${r.height}`)
	}
}

new Clint()
