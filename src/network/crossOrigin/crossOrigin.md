# 跨域

跨域的原因: **浏览器**同源策略

跨域的条件: 协议, 域名, 端口号任意一个不同

## 解决方法1: jsonp

[详情](./jsonp/jsonp.md)

## 解决方法2: proxy

使用构建工具启动一个node服务器, 因为服务器之前请求数据没有跨域限制, 所以可以解决跨域问题

[vite](https://cn.vite.dev/config/server-options#server-proxy)

只针对开发环境有效, 生成环境按理说不会存在跨域, 如果存在就涉及到我的知识盲区了(关于运维的配置)

## 解决方法3: 后端设置请求头

```js
// 允许所有源访问
res.setHeader('Access-Control-Allow-Origin', '*')
// 允许多个指定源访问
res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080, http://127.0.0.1:8081')
```

## 解决方法4: nginx代理

现在还不知道nginx, **todo**
