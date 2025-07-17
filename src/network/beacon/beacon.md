# sendBeacon

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)

一种特殊的发送请求的方式

特点:

- 只能发送 `post`

- 只能发送少量数据

- 异步发送, 不会受到页面卸载的影响, 也不会阻塞页面

适用于数据埋点, 例如用户在切换页面时需要上报, 传统的请求可能会丢失, 使用 `sendBeacon` 很好的解决了这个问题

## 后端

就是正常的 `post` 请求

## 前端

```js
navigator.sendBeacon(url, data)
```

## 注意点

- data 不能用 json格式
- 有时候会跨域, 不知道为什么
- 有时候请求会被拦截, 比如公共网络环境之类的
