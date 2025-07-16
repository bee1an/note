# fetch

新时代ajax实现

特点: 语法简单, `promise`

## 基本用法

演示get请求

```js
const res = await fetch('http://localhost:3000/api/getText')
const text = await res.text()
console.log(text)
```

### 注意点

## 获取进度

可以使用 `fetch` 的 `body` 的 `getReader` 方法来获取进度

这个方法局限性很大

```js
// 获取总长度
const total = res.headers.get('content-length')

// 获取当前进度
// 获取当前流的长度 / 总长度

const reader = res.body.getReader()
let cur = 0
while (1) {
	const { done, value } = await reader.read()
	if (done) {
		break
	}
	cur += value.length
	console.log(((cur / total) * 100).toFixed(2))
}
```

## 取消请求

依赖 `AbortController` 构造器

```js
const controller = new AbortController()

const res = await fetch('http://localhost:3000/api/getText', {
	signal: controller.signal
})

// 取消
controller.abort()
```

## 设置超时

没有直接设置超市的属性, 可以借助 `AbortController` 和计时器来实现

```js
const controller = new AbortController()

const res = await fetch('http://localhost:3000/api/getText', {
	signal: controller.signal
})

const timeout = (time) => {
	// 设置超时
	setTimeout(() => {
		controller.abort()
	}, time)
}

timeout(1000)
```

## 响应体支持的格式转换

- json
- text
- blob
- arrayBuffer
- formData
