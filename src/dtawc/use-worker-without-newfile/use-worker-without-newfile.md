# 在一个文件中使用worker

nodejs环境的worker跟浏览器的不一样, 这里讨论的是浏览器的worker

## 前景

有时候可能需要一个很简单的worker来处理一些事情, 比如获取一个较为精确的timeout, 这个时候再新建一个worker文件就很不便

## 解决思路

`new Worker` 的第一参数是一个url, 这个url可以是 `dataurl`

既然这样我们给他一个 `dataurl`, 里面的内容就在当前文件中构造

```ts
const workerBody = () => {
	onmessage = () => {
		console.log('worker') // 这个会被打印
	}
}

const dataUrl = `data:application/javascript;base64,${btoa(`(${workerBody.toString()})()`)}` // [!code warning] 这一行是关键

const worker = new Worker(dataUrl)

worker.postMessage(null)
```

方法2

js提供的 `URL.createObjectURL` 方法可以将一个blob对象转换为一个url

```ts
const workerBody = () => {
	onmessage = () => {
		console.log('worker') // 这个会被打印
	}
}

const url = URL.createObjectURL(new Blob([`(${workerBody.toString()})()`])) // [!code warning] 这一行是关键

const worker = new Worker(url)

worker.postMessage(null)
```
