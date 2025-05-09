abstract class Chess {
	/**
	 * 抽象步骤
	 */
	abstract isMoveable(x: number, y: number): boolean

	/**
	 * 步骤的默认实现
	 */
	onMoveEnd() {
		console.log('移动结束')
	}

	/**
	 * 模板方法
	 */
	move(x: number, y: number) {
		const canMove = this.isMoveable(x, y)

		if (!canMove) {
			console.log('不能移动')
			return
		}

		// ...
		this.onMoveEnd()
	}
}

class BossChess extends Chess {
	x: number
	y: number

	/**
	 * 实现抽象步骤
	 */
	isMoveable(x: number, y: number) {
		// 当前坐标是否可以移动
		return true
	}

	/**
	 * 重写默认步骤
	 */
	onMoveEnd() {
		console.log('移动结束, 判断是否两个boss面对面, 如果面对面则判输')
	}
}

class HorseChess extends Chess {
	x: number
	y: number

	isMoveable(x: number, y: number) {
		// 当前坐标是否可以移动
		return true
	}
}
