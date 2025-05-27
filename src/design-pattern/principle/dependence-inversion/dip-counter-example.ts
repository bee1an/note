/**
 * 这个是反例
 */

/**
 * 电脑类
 * 依赖了具体的硬件, 这是错误的
 */
class Computer {
	constructor(
		private cpu: ACPU,
		private memory: AMemory,
		private hardDisk: AHardDisk
	) {}

	start() {
		this.cpu.start()
		this.memory.start()
		this.hardDisk.start()
	}
}

/**
 * 具体cpu类
 */

class ACPU {
	start() {
		console.log('a cpu start')
	}
}

/**
 * 具体内存类
 */
class AMemory {
	start() {
		console.log('a memory start')
	}
}

/**
 * 具体硬盘类
 */

class AHardDisk {
	start() {
		console.log('a hard disk start')
	}
}

const computer = new Computer(new ACPU(), new AMemory(), new AHardDisk())
computer.start()
