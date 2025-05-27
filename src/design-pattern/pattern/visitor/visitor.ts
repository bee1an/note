export {}

/**
 * 抽象元素类
 */
abstract class Displayer {
	abstract accept(v: Visitor): void
}

/**
 * 具体元素类
 */
class VideoDisplayer extends Displayer {
	accept(v: Visitor): void {
		v.visitVideo(this)
	}
}

/**
 * 具体元素类
 */
class ImageDisplayer extends Displayer {
	accept(v: Visitor): void {
		v.visitImage(this)
	}
}

/**
 * 抽象访问者接口
 */
interface Visitor {
	visitVideo(video: VideoDisplayer): void
	visitImage(image: ImageDisplayer): void
}

/**
 * 具体访问者类
 */
class ConcreteVisitor implements Visitor {
	visitVideo(video: VideoDisplayer): void {
		// 封装算法
		console.log('download video')
	}
	visitImage(image: ImageDisplayer): void {
		console.log('download image')
	}
}

/**
 * 具体访问者类
 */
class ConcreteVisitor2 implements Visitor {
	visitVideo(video: VideoDisplayer): void {
		// 封装算法
		console.log('epxort video')
	}
	visitImage(image: ImageDisplayer): void {
		console.log('epxort image')
	}
}

/**
 * 客户端
 */
class Client {
	constructor() {
		const videoDisplayer = new VideoDisplayer()
		const imageDisplayer = new ImageDisplayer()

		// 这里可以自定义访问者
		const visitor = new ConcreteVisitor()

		videoDisplayer.accept(visitor)
		imageDisplayer.accept(visitor)

		console.log('-------------------------调用另一个行为------------------------')

		const visitor2 = new ConcreteVisitor2()
		videoDisplayer.accept(visitor2)
		imageDisplayer.accept(visitor2)
	}
}

new Client()
