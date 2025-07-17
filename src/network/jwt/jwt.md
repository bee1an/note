# jwt

jwt(json web token), 一种用于验证用户身份的技术, 通过服务端对特殊信息(用户身份)进行加密后返回给客户端, 通过客户端携带加密信息到服务端进行验证

## 基本结构

jwt是明文

组成部分 `header.payload.signature`

- `header`: 描述jwt的信息, 基本固定, 然后进行base64

```json
{
	"alg": "HS256", // 加密算法(默认值)
	"typ": "JWT" // 类型(默认值)
}
```

- `payload`: jwt的信息, 然后进行base64, 一般是用户信息, 注意不要是敏感信息

```json
{
	"iss": "admin", // 签发人
	"sub": "1234567890" // 主题
}
```

- `signature`: 唯一标识, 根据header+payload+密钥(key)生成

所以jwt的格式就是 `base64.base64.标识`

其中如果任意一个信息不对, 那么jwt就不会是有效的, 也就是说jwt是不可篡改的

## 使用

`nodejs` 使用 `jsonwebtoken` 库

前端统一通过请求头的 `Authorization: token` 的方式携带token, 至于token前是否拼接Bearer, 由后端决定
