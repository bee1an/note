export {}

/**
 * 这个例子是一个优化
 *
 * 我有一个想法
 * 既然每一个子类都需要实现 handle 方法，所以在抽象类中应该有一个抽象方法，所有的子类都应该实现这个抽象方法
 * 继续思考
 * 每个子类都需要在处理方法中判断是否需要将请求交给下一个方法处理，那么可以将传递请求的方法放在抽象类中
 * 子类只需要实现 handle 方法，并在 handle 方法返回是否需要传递请求
 *
 * 相当于把子类执行抽象类的方法变成了在抽象类中执行子类的方法
 */

interface Handler<Request = string, Result = string> {
	setNext(handler: Handler<Request, Result>): Handler<Request, Result>

	/**
	 * 这个是抽象方法，所有子类都要实现这个方法
	 *
	 * @returns {[any, boolean] | [Result]}
	 * 通过判断返回数组第二位的值来决定是否需要传递请求
	 */
	handle(request: Request): [any, boolean] | [Result]

	execHandle(request: Request): Result | void
}

abstract class AbstractHandler implements Handler {
	private nextHandler!: Handler

	public setNext(handler: Handler): Handler {
		this.nextHandler = handler
		return handler
	}

	abstract handle(request: string): [any, boolean] | [string]

	public execHandle(request: string): string | void {
		/**
		 * 在这里执行子类的方法，通过transfer判断是否需要传递给下一个
		 */
		const [result, transfer] = this.handle(request)

		if (transfer) {
			if (this.nextHandler) {
				return this.nextHandler.execHandle(request)
			}
		} else {
			return result
		}
	}
}

class MonkeyHandler extends AbstractHandler {
	public handle(request: string): [string, boolean] {
		return [`Monkey: I'll eat the ${request}.`, request !== 'Banana']
	}
}

class SquirrelHandler extends AbstractHandler {
	public handle(request: string): [string, boolean] {
		return [`Squirrel: I'll eat the ${request}.`, request !== 'Nut']
	}
}

class DogHandler extends AbstractHandler {
	public handle(request: string): [string, boolean] {
		return [`Dog: I'll eat the ${request}.`, request !== 'MeatBall']
	}
}

function clientCode(handler: Handler) {
	const foods = ['Nut', 'Banana', 'Cup of coffee', 'MeatBall']

	for (const food of foods) {
		console.log(`Client: Who wants a ${food}?`)

		const result = handler.execHandle(food)
		if (result) {
			console.log(`  ${result}`)
		} else {
			console.log(`  ${food} was left untouched.`)
		}
	}
}

const monkey = new MonkeyHandler()
const squirrel = new SquirrelHandler()
const dog = new DogHandler()

monkey.setNext(squirrel).setNext(dog)

console.log('Chain: Monkey > Squirrel > Dog')
clientCode(monkey)
console.log('')

console.log('Subchain: Squirrel > Dog')
clientCode(squirrel)
