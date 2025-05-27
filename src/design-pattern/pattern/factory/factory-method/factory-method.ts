// 产品(Product) // [!code warning]
interface PayInterface {
	pay(): void
}

// 产品实现(Concrete Product) // [!code warning]
class WxProduct implements PayInterface {
	pay() {
		console.log('微信支付')
	}
}

class AliProduct implements PayInterface {
	pay() {
		console.log('支付宝支付')
	}
}

// 创建者(Creator) // [!code warning]
abstract class Pay {
	abstract createPay(): PayInterface

	handlePay() {
		const payInstance = this.createPay()
		payInstance.pay()
	}
}

// 创建者实现(Concrete Creator) // [!code warning]
class WxPay extends Pay {
	createPay(): PayInterface {
		return new WxProduct()
	}
}

class AliPay extends Pay {
	createPay(): PayInterface {
		return new AliProduct()
	}
}

// 后续如果需要新增一个支付方法, 只需要新增创建者实现即可 // [!code warning]

class Application {
	payInstance!: Pay

	init(payMethod: string) {
		if (payMethod === 'wxpay') {
			this.payInstance = new WxPay()
		} else if (payMethod === 'alipay') {
			this.payInstance = new AliPay()
		} else {
			throw new Error('不支持的支付方式')
		}

		this.payInstance.handlePay()
	}
}

const app = new Application()
app.init('wxpay')
app.init('alipay')
