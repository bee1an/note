# XHR

早期提供的实现ajax的方法

通过 `XMLHttpRequest` 的实例来发起和处理请求

## 基本用法

演示get请求

```js
const xhr = new XMLHttpRequest()
xhr.open('get', 'http://localhost:3000/api/getText')
xhr.send()
xhr.onreadystatechange = () => {
	if (xhr.readyState === 4 && xhr.status === 200) {
		console.log(xhr.responseText)
	}
}
```

### 注意点

1. `open` 方法有第三个参数, 是否异步, 默认 `true`

2. 如果get请求有参, 则直接拼接到url后面

   ```js
   // 当然有骚操作
   // 比如现在有参数 {a: 1, b: 2}
   new URLSearchParams({ a: 1, b: 2 }).toString() // a=1&b=2
   // 然后字符串拼接就行了
   ```

3. `post` 的方法的参数写在 `send` 方法里面 (json格式需要序列化JSON.stringify)

4. `post` 的方法需要设置请求头

### xhr.readyState

- 0: 未初始化, `XMLHttpRequest` 实例已经创建但是为调用 `open`
- 1: 已初始化, 调用了 `open` 但是尚未调用 `send`
- 2: 已发送, 调用了 `send` 但是尚未接收到响应
- 3: 正在接受, 服务器正在处理器请求并返回数据
- 4: 完成, 响应已经完全接收

## 常用方法

### 取消请求

`xhr.abort()`

### 监听取消

```js
xhr.addEventListener('abort', () => {})
```

### 设置超时

`xhr.timeout = [ms]`

### 监听超时

```js
xhr.addEventListener('timeout', () => {})
```

### 监听进度

```js
xhr.addEventListener('progress', (e) => {})
```
