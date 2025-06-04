export {}

/**
 * 下例演示经典的 '方钉和圆洞'
 */

/**
 * 现有对象
 */
class RoundPeg {
	constructor(public radius: number) {}

	getRadius() {
		return this.radius
	}
}

/**
 * 目标对象
 */
class SquarePeg {
	constructor(public width: number) {}

	getWidth() {
		return this.width
	}
}

/**
 * 适配器
 */
class SquarePegAdapter extends RoundPeg {
	constructor(private squarePeg: SquarePeg) {
		super(squarePeg.getWidth())
	}

	/**
	 * 给 '方钉' 添加的新接口
	 */
	getRadius() {
		return (this.squarePeg.getWidth() * Math.sqrt(2)) / 2
	}
}

class RoundHole {
	constructor(public radius: number) {}

	fits(peg: RoundPeg) {
		return this.radius >= peg.getRadius()
	}
}

class Client {
	constructor() {
		// 测试方钉是不是可以放进洞里
		const hole = new RoundHole(5)
		const peg = new RoundPeg(5)
		if (hole.fits(peg)) {
			console.log('圆钉放进了洞里')
		}

		const small_square_peg = new SquarePeg(5)

		try {
			// @ts-expect-error
			hole.fits(small_square_peg) // [!code error] 类型不兼容
		} catch {
			// 不管报错
		}

		// 适配一下
		const small_square_peg_adapter = new SquarePegAdapter(small_square_peg)
		if (hole.fits(small_square_peg_adapter)) {
			console.log('方钉放进了洞里')
		}

		const large_square_peg = new SquarePeg(10)

		const large_square_peg_adapter = new SquarePegAdapter(large_square_peg)

		if (!hole.fits(large_square_peg_adapter)) {
			console.log('方钉太大了')
		}
	}
}

new Client()
