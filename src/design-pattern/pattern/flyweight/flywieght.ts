export {}

/**
 * 享元
 */
class MonsterType {
	constructor(public name: string) {}

	draw() {
		console.log(this.name + ' 渲染啦')
	}
}

/**
 * 享元工厂
 */
class MoustersTypeFactory {
	monsterTypePool = new Map<string, MonsterType>()

	getMonsterType(name: string) {
		let result = this.monsterTypePool.get(name)

		if (!result) {
			console.log('创建了一个新的')
			result = new MonsterType(name)
			this.monsterTypePool.set(name, result)
			return result
		}

		return result
	}
}

/**
 * 情景
 */
class Monster {
	constructor(
		public x: number,
		public y: number,
		public monsterType: MonsterType
	) {}

	draw() {
		console.log('渲染位置x: ' + this.x + ', y: ' + this.y)
		this.monsterType.draw()
	}
}

class Game {
	canvasMinWidth = 0
	canvasMaxWidth = 100
	canvasMinHeight = 0
	canvasMaxHeight = 100

	monsterNumber = 100000

	constructor() {}

	init() {
		const moustersTypeFactory = new MoustersTypeFactory()

		for (let index = 0; index < this.monsterNumber; index++) {
			const monster = new Monster(
				random(this.canvasMinWidth, this.canvasMaxWidth),
				random(this.canvasMinHeight, this.canvasMaxHeight),
				moustersTypeFactory.getMonsterType('boss')
			)

			monster.draw()
		}
	}
}

const game = new Game()
game.init()

function random(min: number, max: number) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}
