import ws from 'ws'

const wss = new ws.Server({ port: 8080 })

wss.on('connection', (socket) => {
	console.log('connection')

	// 接受消息
	socket.on('message', (res) => {
		// 广播
		wss.clients.forEach((client) => {
			if (client.readyState === ws.OPEN) {
				client.send('server: ' + res.toString())
			}
		})
	})
})
