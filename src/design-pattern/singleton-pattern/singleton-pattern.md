# 单例模式

[参考文章](https://refactoringguru.cn/design-patterns/singleton)

> 亦称: 单件模式、Singleton

单例模式是一种[创建型设计模式](../design-pattern.md#创建型模式)

一个类**只有一个**实例, 并提供一个访问该实例的全局节点

![singleton](./singleton.png)

> 图片引用自: https://refactoringguru.cn/design-patterns/singleton

## 实现步骤

1. 构造函数私有, 防止使用 `new` 创建实例 (个人理解, `new` 关键字的意思有创建新对象的意义, 这也是类的设计思想)

> `js` 的构造函数不能私有, 可以将

2. 使用一个静态方法获取实例, 如果实例不存在, 则创建实例保存到一个静态变量中并返回, 否则直接返回实例

## 贴个代码

<<< @/src/design-pattern/singleton-pattern/singleton-pattern.ts
