export {}

/**
 * 抽象部分
 */
class Component {
	constructor(protected flatform: Flatform) {}

	init() {
		this.flatform.init()
	}
}

/**
 * 实现部分
 */
interface Flatform {
	init(): void

	onClick(): void

	onFocus(): void
}

/**
 * 具体实现
 */
class MacFlatForm implements Flatform {
	init(): void {
		console.log('MacFlatForm init')
	}

	onClick(): void {
		console.log('MacFlatForm onClick')
	}

	onFocus(): void {
		console.log('MacFlatForm onFocus')
	}
}

class WindowsFlatForm implements Flatform {
	init(): void {
		console.log('WindowsFlatForm init')
	}

	onClick(): void {
		console.log('WindowsFlatForm onClick')
	}

	onFocus(): void {
		console.log('WindowsFlatForm onFocus')
	}
}

/**
 * 精确抽象
 */
class Button extends Component {
	onClick(): void {
		this.flatform.onClick()
	}
}

class Input extends Component {
	onFocus(): void {
		this.flatform.onFocus()
	}
}

class Client {
	constructor() {
		const button = new Button(new WindowsFlatForm())
		button.init()
		button.onClick()
		const input = new Input(new WindowsFlatForm())
		input.init()
		input.onFocus()
		const button2 = new Button(new MacFlatForm())
		button2.init()
		button2.onClick()
		const input2 = new Input(new MacFlatForm())
		input2.init()
		input2.onFocus()
	}
}

new Client()
