# 工厂方法模式

[参考文章](https://refactoringguru.cn/design-patterns/factory-method)

> 亦称： 虚拟构造函数、Virtual Constructor、Factory Method

工厂方法模式是一种[创建型设计模式](../../design-pattern.md#创建型模式)

在父类中提供一个创建对象的方法, 允许子类决定实例化对象的类型

工厂方法模式是模板方法模式的一种特殊形式

## 场景

小宇开发了一款软件, 用于在软件上点击支付后, 打开了**微信支付**

我们的代码可能是这样的

```ts
class Pay {
	handlePay() {
		const payInstance = new WxPay()
		payInstance.pay()
	}
}
const pay = new Pay()
pay.handlePay()
```

随着用户量越来越多, 有一部分用户提出想要使用**支付宝支付**

但是**微信支付逻辑**已经和整个付款逻辑**耦合**

这个时候怎么办呢? 选择一个 `if` 判断支付宝支付的逻辑和微信支付的逻辑吗?

那如果后面想要**新增一个支付方法**怎么办

实际的情况可能比这个复杂得多

那就**重构!!!**

## 解决方案

工厂方法模式, 重点在方法这两个字, 使用这个方法代替了对象实例的**直接调用**(这里注意直接两个字, 因为在调用这个方法的时候, 我们会在方法内部去实例化对象)

工厂方法返回的对象通常被称作 **"产品"**

我们可以在子类中重写这个工厂方法, 从而改变 "产品" 实例

需要注意的是这些 "产品" 需要有同一接口

用工厂方法模式重构代码

<<< @/src/design-pattern/factory-pattern/factory-method-pattern/factory-method-pattern.ts

是不是非常像模板方法模式
