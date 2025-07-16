# SSE

(server sent events), 是一种服务器推送技术, 前端只需要发送一个请求, 服务器就可以持续推送数据给前端

gpt回答的文字效果就是sse

sse只能是get请求

## 用法

### 后端

后端需要设置请求头

```js
res.setHeader('Content-Type', 'text/event-stream')
```

### 前端

创建 `EventSource` 实例

```js
const sse = new EventSource('http://localhost:3000/api/getText')
```

监听事件, 并获取数据

```js
// [!code warning]
// 这里不一定是message事件名, 这个名称后端可以修改, message只是默认名称
sse.addEventListener('message', (e) => {
	pre.innerText += e.data
})
```
