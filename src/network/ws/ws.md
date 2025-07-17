# WebSocket

客户端与服务端实现双向通信长链接的方式

## nodejs

安装 `ws` 库

```bash
npm install ws
# 类型文件
npm install --save-dev @types/ws
```

简单实现

```js
import ws from 'ws'

const wss = new ws.Server({ port: 8080 })

// 有客户端连接
wss.on('connection', (socket) => {
	// 接受消息
	socket.on('message', (res) => {
		// 广播
		wss.clients.forEach((client) => {
			// 状态为开启时才发送
			if (client.readyState === ws.OPEN) {
				client.send('server: ' + res.toString())
			}
		})
	})
})
```

## 前端

常用事件

- `open`: 连接成功回调
- `message`: 接受消息回调

```js
const ws = new WebSocket('ws://localhost:8080')

// 连接成功回调
ws.addEventListener('open', () => {})

// 发送消息
ws.send(input.value)

// 接受消息
ws.addEventListener('message', (e) => {})
```

## 心跳检测

`webSocket` 长时间未使用时或弱网环境等特殊情况下会自动断开, 需要定时发送心跳检测

所以心跳检测就是服务器循环给客户端发送一个特殊消息, 以保证 `ws` 连接
