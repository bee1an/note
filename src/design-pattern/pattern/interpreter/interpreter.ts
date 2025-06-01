export {}

/**
 * 上下文抽象类
 */
interface IContext {
	isNewUser: boolean
	totalPrice: number
	goods: string[]
}

interface Interpreter {
	interpret(context: IContext): boolean
}

/**
 * 判断是否是新用户, 终结符表达式
 */
class NewUserExpression implements Interpreter {
	interpret(context: IContext): boolean {
		return context.isNewUser
	}
}

/**
 * 判断是否存在其中一个商品, 终结符表达式
 */
class ExistGoodsExpression implements Interpreter {
	constructor(private goods: string) {}

	interpret(context: IContext): boolean {
		return context.goods.some((goods) => this.goods === goods)
	}
}

/**
 * 判断总价是否大于 10, 终结符表达式
 */
class TotalPriceThanExpression implements Interpreter {
	interpret(context: IContext): boolean {
		return context.totalPrice > 10
	}
}

/**
 * 判断条件是否都满足, 非终结符表达式
 */
class AndExpression implements Interpreter {
	constructor(
		private left: Interpreter,
		private right: Interpreter
	) {}

	interpret(context: IContext): boolean {
		return this.left.interpret(context) && this.right.interpret(context)
	}
}

/**
 * 判断条件是否存在一个, 非终结符表达式
 */
class OrExpression implements Interpreter {
	constructor(
		private left: Interpreter,
		private right: Interpreter
	) {}

	interpret(context: IContext): boolean {
		return this.left.interpret(context) || this.right.interpret(context)
	}
}

/**
 * 上下文
 */
class Context implements IContext {
	constructor(
		public isNewUser: boolean,
		public totalPrice: number,
		public goods: string[]
	) {}
}

class Client {
	constructor() {
		const context = new Context(true, 20, ['apple', 'banana', 'orange'])

		// 优惠券 1: 总价大于 10, 则满足优惠

		console.log('满足总价大于 10 则提供优惠券', new TotalPriceThanExpression().interpret(context))

		// 优惠券 2: 新用户且存在 apple, banana, 两种商品之一, 则满足优惠
		console.log(
			'新用户切存在 apple, banana, 两种商品之一',
			new AndExpression(
				new NewUserExpression(),
				new OrExpression(new ExistGoodsExpression('apple'), new ExistGoodsExpression('banana'))
			).interpret(context)
		)

		// 优惠券 3: 存在 mango 商品,  则满足优惠
		console.log('存在 mango 商品', new ExistGoodsExpression('mango').interpret(context))
	}
}

new Client()
