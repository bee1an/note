/**
 * 策略
 */
interface Strategy {
	buildRoute(): { start: string; end: string }
}

/**
 * 具体策略
 */
class CarStrategy implements Strategy {
	buildRoute(): { start: string; end: string } {
		return { start: 'carStart', end: 'carEnd' }
	}
}

class BicycleStrategy implements Strategy {
	buildRoute(): { start: string; end: string } {
		return { start: 'bicycleStart', end: 'bicycleEnd' }
	}
}

class WalkStrategy implements Strategy {
	buildRoute(): { start: string; end: string } {
		return { start: 'walkStart', end: 'walkEnd' }
	}
}

/**
 * 由此可见, 上下文代码根本不关心哪个具体策略
 */
class Context {
	constructor(private strategy: Strategy) {}

	setStrategy(strategy: Strategy) {
		this.strategy = strategy
	}

	buildRoute() {
		return this.strategy.buildRoute()
	}
}

// 运行时指定策略
const context = new Context(new CarStrategy())
console.log(context.buildRoute())

context.setStrategy(new BicycleStrategy())
console.log(context.buildRoute())

context.setStrategy(new WalkStrategy())
console.log(context.buildRoute())
