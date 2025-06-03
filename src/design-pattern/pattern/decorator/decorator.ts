export {}

/**
 * 部件接口
 */
interface DataSource {
	writeData(): void
	readData(): void
}

/**
 * 具体部件
 */
class FileDataSource implements DataSource {
	writeData() {
		console.log('写入数据')
	}
	readData() {
		console.log('读取数据')
	}
}

/**
 * 抽象装饰器
 */
abstract class DataSourceDecorator implements DataSource {
	protected wrappee: DataSource

	constructor(source: DataSource) {
		this.wrappee = source
	}

	writeData() {
		this.wrappee.writeData()
	}
	readData() {
		this.wrappee.readData()
	}
}

/**
 * 压缩装饰器
 */
class CompressionDecorator extends DataSourceDecorator {
	writeData() {
		console.log('压缩数据')
		super.writeData()
	}

	readData() {
		console.log('解压数据')
		super.readData()
	}
}

/**
 * 加密装饰器
 */
class EncryptionDecorator extends DataSourceDecorator {
	writeData() {
		console.log('加密数据')
		super.writeData()
	}

	readData() {
		console.log('解密数据')
		super.readData()
	}
}

class Client {
	constructor() {
		console.log('------写入文件------')
		this.write()
		console.log('------读取文件------')
		this.read()
	}

	write() {
		let source = new FileDataSource()
		// 写入文件前先压缩
		source = new CompressionDecorator(source)
		// 压缩文件前先加密
		source = new EncryptionDecorator(source)
		source.writeData()
	}

	/**
	 * 读取文件例子中并没有将其放入像写入文件一样的工作流中
	 */
	read() {
		// 先读取一下文件
		const source = new FileDataSource()
		source.readData()

		// 解压之后再读取文件
		const decoratorSource = new CompressionDecorator(source)
		decoratorSource.readData()

		// 解密之后再读取文件
		const decoratorSource2 = new EncryptionDecorator(source)
		decoratorSource2.readData()
	}
}
new Client()
