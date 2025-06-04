export {}

/**
 * 子系统
 */
class Video {
	constructor() {
		console.log('创建了视频')
	}
}

class Audio {
	constructor() {
		console.log('创建了音频')
	}
}

class Image {
	constructor() {
		console.log('创建了图片')
	}
}

/**
 * 外观
 */
class Creator {
	constructor(...types: string[]) {
		for (const type of types) {
			this.create(type)
		}
	}

	create(type: string) {
		if (type === 'video') {
			new Video()
		} else if (type === 'audio') {
			new Audio()
		} else if (type === 'image') {
			new Image()
		} else {
			console.log('无效的类型')
		}
	}
}

class Client {
	constructor() {
		new Creator('video', 'audio', 'image')
	}
}

new Client()
