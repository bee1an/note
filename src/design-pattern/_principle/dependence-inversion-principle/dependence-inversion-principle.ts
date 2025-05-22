export {}

/**
 * 抽象cpu接口
 */
interface CPU {
	start(): void
}

/**
 * 抽象内存接口
 */
interface Memory {
	start(): void
}

/**
 * 抽象硬盘接口
 */
interface HardDisk {
	start(): void
}

/**
 * 电脑类
 */
class Computer {
	constructor(
		private cpu: CPU,
		private memory: Memory,
		private hardDisk: HardDisk
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
