# 🧩 设计模式

> 参考: [Design Patterns](https://www.runoob.com/design-pattern/design-pattern-intro.html)

> 参考书籍: Design Patterns - Elements of Reusable Object-Oriented Software（中文译名：设计模式 - 可复用的面向对象软件元素）

记录的内容都是基于以上内容的理解

基于以下的面向对象设计原则:

- 对接口编程而不是对实现编程
- 优先使用对象组合而不是继承

## 创建型模式

这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活

- ~~工厂模式（Factory Pattern）~~ [工厂方式模式（Factory Method Pattern）](./factory-pattern/factory-method-pattern/factory-method-pattern.md)
  > 参考文章这里的表格的应该有翻译错误, 应该是 "工厂方式模式" 而不是 "工厂模式", 工厂模式是工厂方法模式和抽象工厂模式的统称
- [抽象工厂模式（Abstract Factory Pattern）](./factory-pattern/abstract-factory-pattern/abstract-factory-pattern.md)
- [单例模式（Singleton Pattern）](./singleton-pattern/singleton-pattern.md)
- [建造者模式（Builder Pattern）](./builder-pattern/builder-pattern.md)
- [原型模式（Prototype Pattern）](./prototype-pattern/prototype-pattern.md)

## 结构型模式

这些模式关注对象之间的组合和关系，旨在解决如何构建灵活且可复用的类和对象结构。

- 适配器模式（Adapter Pattern）
- 桥接模式（Bridge Pattern）
- 过滤器模式（Filter、Criteria Pattern）
- 组合模式（Composite Pattern）
- 装饰器模式（Decorator Pattern）
- 外观模式（Facade Pattern）
- 享元模式（Flyweight Pattern）
- 代理模式（Proxy Pattern）

## 行为型模式

这些模式关注对象之间的通信和交互，旨在解决对象之间的责任分配和算法的封装。

- [责任链模式（Chain of Responsibility Pattern）](./chain-of-responsibility-pattern/chain-of-responsibility-pattern.md)
- 命令模式（Command Pattern）
- 解释器模式（Interpreter Pattern）
- 迭代器模式（Iterator Pattern）
- 中介者模式（Mediator Pattern）
- 备忘录模式（Memento Pattern）
- 观察者模式（Observer Pattern）
- 状态模式（State Pattern）
- 空对象模式（Null Object Pattern）
- [策略模式（Strategy Pattern）](./strategy-pattern/strategy-pattern.md)
- [模板模式（Template Pattern）](./template-pattern/template-pattern.md)
- 访问者模式（Visitor Pattern）

## J2EE 模式

这些设计模式特别关注表示层。这些模式是由 Sun Java Center 鉴定的。

- MVC 模式（MVC Pattern）
- 业务代表模式（Business Delegate Pattern）
- 组合实体模式（Composite Entity Pattern）
- 数据访问对象模式（Data Access Object Pattern）
- 前端控制器模式（Front Controller Pattern）
- 拦截过滤器模式（Intercepting Filter Pattern）
- 服务定位器模式（Service Locator Pattern）
- 传输对象模式（Transfer Object Pattern）

## [设计模式的六大原则](./_principle/_principle.md)
