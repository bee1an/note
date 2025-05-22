/**
 * 这个例子演示的是接收者可以**自行处理**请求的方式
 */

/**
 * Handler接口声明了一个用于构建处理程序链的方法
 * 它还声明了一个执行请求的方法
 */
interface Handler<Request = string, Result = string> {
	/**
	 * 设置下一个处理者
	 */
	setNext(handler: Handler<Request, Result>): Handler<Request, Result>

	/**
	 * 处理请求
	 */
	handle(request: Request): Result
}

/**
 * 默认的链接行为可以在基处理程序类中实现。
 */
abstract class AbstractHandler implements Handler {
	private nextHandler!: Handler

	public setNext(handler: Handler): Handler {
		this.nextHandler = handler
		return handler
	}

	public handle(request: string): string {
		if (this.nextHandler) {
			return this.nextHandler.handle(request)
		}

		return ''
	}
}

/**
 * 所有具体处理程序要么处理请求，要么将其传递给下一个处理程序
 */
class MonkeyHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Banana') {
			/**
			 * 这里如果能执行就直接执行了
			 */
			return `Monkey: I'll eat the ${request}.`
		}

		/**
		 * 如果不能执行则将请求传递给下一个处理程序
		 */
		return super.handle(request)
	}
}

class SquirrelHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Nut') {
			return `Squirrel: I'll eat the ${request}.`
		}
		return super.handle(request)
	}
}

class DogHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'MeatBall') {
			return `Dog: I'll eat the ${request}.`
		}
		return super.handle(request)
	}
}

/**
 * 客户端代码通常适合使用单个处理程序。在大多数情况下，它甚至不知道处理程序是链的一部分。
 */
function clientCode(handler: Handler) {
	const foods = ['Nut', 'Banana', 'Cup of coffee', 'MeatBall']

	for (const food of foods) {
		console.log(`Client: Who wants a ${food}?`)

		const result = handler.handle(food)
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

// 这一步就是在设置责任链的顺序
monkey.setNext(squirrel).setNext(dog)

console.log('Chain: Monkey > Squirrel > Dog')
clientCode(monkey)
console.log('')

console.log('Subchain: Squirrel > Dog')
clientCode(squirrel)
