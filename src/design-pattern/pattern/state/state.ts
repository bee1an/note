export {}

/**
 * 抽象状态类
 */

export abstract class State {
	constructor(protected context: Context) {}

	abstract play(): void

	abstract pause(): void
}

/**
 * 上下文类
 */
class Context {
	private state!: State

	setState(state: State) {
		this.state = state
	}

	// [!code highlight] 这里的方法不一定要跟状态类的方法一致, 这只是工作委派的一种方式
	play() {
		this.state.play()
	}

	pause() {
		this.state.pause()
	}
}

/**
 * 具体播放状态类
 */
class PlayState extends State {
	play() {
		console.log('在播放状态触发播放, 什么也不做')
	}

	pause() {
		console.log('切换为暂停状态')
		this.context.setState(new PauseState(this.context)) // [!code highlight] 这里在具体状态中切换了状态, 也可以在上下文中切换状态
	}
}

/**
 * 具体暂停状态类
 */
class PauseState extends State {
	play() {
		console.log('切换为播放状态')
		this.context.setState(new PlayState(this.context))
	}

	pause() {
		console.log('在暂停状态触发暂停, 什么也不做')
	}
}

class Client {
	constructor() {
		const context = new Context()
		const pauseState = new PauseState(context)

		context.setState(pauseState) // 初始化暂停状态

		context.play()

		context.play()

		context.pause()
	}
}

new Client()
