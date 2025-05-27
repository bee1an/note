export {}

interface Command {
	execute(): void
}

/**
 * 接收对象执行方法所需的参数可以声明为具体命令的成员变量
 * 你可以将命令对象设为不可变
 * 仅允许通过构造函数对这些成员变量进行初始化
 */
class CommandImpl implements Command {
	constructor(
		private _receiver: Receiver,
		private _param: string
	) {}

	execute() {
		this._receiver.action(this._param)
	}
}

/**
 * 发送者
 */
class Sender {
	commands: CommandImpl[] = []

	addCommand(command: CommandImpl) {
		this.commands.push(command)
	}

	send() {
		this.commands.forEach((command) => command.execute())
	}
}

/**
 * 接收者
 */
class Receiver {
	action(param: string) {
		console.log(`Receiver action with param: ${param}`)
	}
}

const sender = new Sender()

sender.addCommand(new CommandImpl(new Receiver(), 'param'))

sender.send()
