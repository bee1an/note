# jsonp

很老的方案, 看着非常奇怪

## 原理

绕过同源策略的原理

script 标签不会遵循同源策略, 可以跨域请求数据

核心思想

1. 创建script标签, 指定src属性为要请求的url

2. 客户端声明全局函数, 并将全局函数名称通过script传递给服务端

3. 服务端返回调用该函数名的数据

## 客户端示例

<<< @/src/network/crossOrigin/jsonp/index.html

## 服务端示例

<<< @/src/network/crossOrigin/jsonp/index.ts
