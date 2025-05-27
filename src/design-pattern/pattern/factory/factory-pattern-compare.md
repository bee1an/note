# 工厂模式比较

[参考文章](https://refactoringguru.cn/design-patterns/factory-comparison)

[[toc]]

## 工厂

创建对象的函数, 方法或类, 也可以创建文件或者数据库记录, 我们主要讨论创建对象

## 构建方法

创建对象的方法

构建方法和工厂不一样, 每一次实例工厂得到的都应该是一个新对象, 构建方法可以通过内部逻辑处理为返回一个已有对象而不创建一个新对象

但它应该始终返回对象

在下面的示例中, `next` 是一个构建方法:

```ts
class Number {
	constructor(private value: number) {}

	next(): Number {
		return new Number(this.value + 1)
	}
}
```

## 静态构建方法

静态构建方法是被声明为 `static` 的构建方法

参考单例模式

## 简单工厂模式

这个不属于设计模式

一个类包含了大量条件语句的构建方法, 根据方法的参数返回不同的实例

```ts
class UserFactory {
	static create(type) {
		switch (type) {
			case 'user':
				return new User()
			case 'customer':
				return new Customer()
			case 'admin':
				return new Admin()
			default:
				throw new Exception('传递的用户类型错误。')
		}
	}
}
```

简单工厂模式通常不会有子类, 也不具备多态的特性

## 工厂方法模式

[factory method pattern](./factory-method/factory-method.md)

## 抽象工厂模式

[abstract factory pattern](./abstract-factory/abstract-factory.md)
