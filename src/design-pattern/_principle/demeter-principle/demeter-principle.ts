export {}

class Fans {
	getPhoto(agent: Agent) {
		return agent.photo
	}
}

class Agent {
	private _star = new Star()
	photo = this._star.name + '.jpg'
}

class Star {
	name = 'star'
}

const fans = new Fans()

console.log(fans.getPhoto(new Agent()))
