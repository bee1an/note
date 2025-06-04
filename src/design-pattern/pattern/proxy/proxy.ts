export {}

/**
 * 原始对象抽象接口
 */

interface ServiceInterface {
	do(): void
}

/**
 * 原始对象
 */
class Service implements ServiceInterface {
	constructor() {
		console.log('一个巨大的任务创建了')
	}

	do(): void {
		console.log('做了一些事情')
	}
}

/**
 * 代理对象
 */
class Proxy {
	service?: Service

	do() {
		if (!this.service) {
			this.service = new Service()
		}
		console.log('代理触发')
		this.service.do()
	}
}

class Client {
	constructor() {
		const proxy = new Proxy()
		proxy.do()
	}
}

new Client()
