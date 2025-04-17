# 责任链模式

[参考文章](https://refactoringguru.cn/design-patterns/chain-of-responsibility)

> 亦称：职责链模式、命令链、CoR、Chain of Command、Chain of Responsibility

[代码示例](./chain-of-responsibility-pattern.ts), 或者直接看最后的[代码示例](#贴个代码)

责任链模式是一种**行为设计模式**

![chain-of-responsibility](./chain-of-responsibility.png)

> 图片引用自: https://refactoringguru.cn/design-patterns/chain-of-responsibility

## 第一个例子

假设现在有一个需求, 需要**给一个手机号发送短信**, 我们就可以列出下面流程

> 得到这个手机号 -> 发送短信

现在需要新增一个**验证这个手机号是不是正确的手机号格式**的功能, 我们可以列出新流程

> 得到这个手机号 -> 验证功能 -> 发送短信

现在又一个新需求, 需要新增一个**验证这个手机号是不是**在**数据库**中**存在**的功能, 于是我们新增了验证功能...

> 得到这个手机号 -> (验证功能: ...) -> 发送短信

最后我们的代码会写成这样

```ts
验证() {
  if (手机号格式不正确) {
    console.log('手机号格式不正确')
    return
  }

  if (手机号不在数据库中) {
    console.log('手机号不在数据库中')
    return
  }
}
```

这个验证功能会很**庞大**且**难以维护**

所以我们决定**重构!!!**

### 解决方案

问题出现在这个验证功能太庞大, 而且冗余, 比如我们另一个系统中需要验证手机号的功能, 我们需要**复制**这个验证功能, 很麻烦, 而且**维护成本**很高

我们将验证函数的功能抽离出来, 然后通过一个**链**的方式, **依次**调用**验证函数**

所以现在我们得到了新流程

> 得到这个手机号 -> 验证函数 -> 验证函数 -> 验证函数 -> 发送短信

我们把这个 '验证函数' 称为**处理者**, 把这个处理者组成的链路称为**责任链**

> 请求 -> 处理者 1 -> 处理者 2 -> 处理者 3 -> 处理者 4 -> 响应

我们上述的模式, 每个处理者处理后决定是否将请求传递给下一个处理者, 在责任链的结束后会**统一处理**

## 第二个例子

有一种不同的方式就是每个处理者判断自己是否能处理, 如果能处理, 则**自行处理**后就不传递给下一个处理者

> 请求 -> 处理者 1 -> 处理者 2 -> 处理者 3 -> 处理者 4

例如我们现在有一个需求

网页中有一个弹框, 用户**按下复制按钮**

- 当弹框关闭的时候, 则复制的时候**网页中的内容**
- 当弹框打开的时候, 则复制的是**弹框中的内容**

我们便可以创建出这样的责任链

> 按下复制按钮 -> 弹框关闭则复制网页内容 -> 弹框打开则复制弹框内容

或者可以查看上面的[代码示例](./chain-of-responsibility-pattern.ts), 里面便用到的这种方式

### 现实生活中的场景

你现在需要给你的电脑售后打电话咨询一些专业的技术问题

> 拨打 xxx-xxx-xxx

1. 机器人, 让你按 0-9 咨询一些问题

> 不能解决, 转人工

2. 普通客服, 问了你一些基本问题

> 不能解决, 转专业客服

3. 专业客服, 咨询你一些专业问题

> 解决了, 挂断电话

以上通过机器人, 普通客服, 专业客服, 形成了责任链

## 贴个代码

> https://refactoringguru.cn/design-patterns/chain-of-responsibility/typescript/example

```ts
/**
 * 这个例子演示的是接收者可以**自行处理**请求的方式
 */

/**
 * Handler接口声明了一个用于构建处理程序链的方法
 * 它还声明了一个执行请求的方法
 */
interface Handler<Request = string, Result = string> {
  /**
   * 设置下一个处理者
   */
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>

  /**
   * 处理请求
   */
  handle(request: Request): Result
}

/**
 * 默认的链接行为可以在基处理程序类中实现。
 */
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }

    return ''
  }
}

/**
 * 所有具体处理程序要么处理请求，要么将其传递给下一个处理程序
 */
class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Banana') {
      /**
       * 这里如果能执行就直接执行了
       */
      return `Monkey: I'll eat the ${request}.`
    }

    /**
     * 如果不能执行则将请求传递给下一个处理程序
     */
    return super.handle(request)
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`
    }
    return super.handle(request)
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.`
    }
    return super.handle(request)
  }
}

/**
 * 客户端代码通常适合使用单个处理程序。在大多数情况下，它甚至不知道处理程序是链的一部分。
 */
function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee', 'MeatBall']

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`)

    const result = handler.handle(food)
    if (result) {
      console.log(`  ${result}`)
    } else {
      console.log(`  ${food} was left untouched.`)
    }
  }
}

const monkey = new MonkeyHandler()
const squirrel = new SquirrelHandler()
const dog = new DogHandler()

// 这一步就是在设置责任链的顺序
monkey.setNext(squirrel).setNext(dog)

console.log('Chain: Monkey > Squirrel > Dog')
clientCode(monkey)
console.log('')

console.log('Subchain: Squirrel > Dog')
clientCode(squirrel)
```
