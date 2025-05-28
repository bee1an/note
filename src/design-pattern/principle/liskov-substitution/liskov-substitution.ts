export {}

interface Quadrangle {
	setWidth(w: number): void

	setHeight(h: number): void
}

class Rectangle implements Quadrangle {
	width: number
	height: number

	constructor(w: number, h: number) {
		this.width = w
		this.height = h
	}

	setWidth(w: number) {
		this.width = w
	}

	setHeight(h: number) {
		this.height = h
	}
}

class Square implements Quadrangle {
	side: number

	constructor(side: number) {
		this.side = side
	}

	setWidth(w: number) {
		this.side = w
	}

	setHeight(h: number) {
		this.side = h
	}
}

class Client {
	constructor() {
		const r = new Rectangle(4, 5)
		this.resize(r)
		this.print(r)
		console.log('长方形拓宽成功')
		const s = new Square(5)
		// @ts-expect-error
		this.resize(s) // [!code error] 这里ts会报错
	}

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

new Client()
