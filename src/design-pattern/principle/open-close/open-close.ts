/**
 * 以输入法皮肤为例
 * 每个输入法皮肤都要实现抽象皮肤类
 * 新增的皮肤不需要修改输入法的其他逻辑(修改关闭), 只需要实现抽象输入法(拓展开放)
 */

/**
 * 抽象皮肤类
 */
abstract class AbstractSkin {
	abstract display(): void
}

/**
 * 默认皮肤类
 */
class DefaultSkin extends AbstractSkin {
	display(): void {
		console.log('默认皮肤')
	}
}

/**
 * 其他皮肤类
 */
class otherSkin extends AbstractSkin {
	display(): void {
		console.log('其他皮肤')
	}
}

/**
 * 输入法类
 */
class Input {
	private skin!: AbstractSkin

	setSkin(skin: AbstractSkin) {
		this.skin = skin
	}

	display(): void {
		this.skin.display()
	}
}

const input = new Input()

console.log('设置为默认皮肤')

input.setSkin(new DefaultSkin())

input.display()

console.log('设置为其他皮肤')

input.setSkin(new otherSkin())

input.display()
