# 依赖倒转原则

> dependence inversion principle

这个原则是开闭原则的基础，具体内容: **针对接口编程，依赖于抽象而不依赖于具体**

例如我们要组装电脑, 电脑应该依赖cpu这个抽象的模块, 而不是依赖某某cpu

## 贴个代码

`Computer` 类依赖了具体的硬件类, 每当想要根据不同的硬件组装不同的电脑时, 就需要修改 `Computer` 类, 这就违背了[开闭原则](../open-close-principle/open-close-principle.md)

<!-- prettier-ignore -->
<<< @/src/design-pattern/_principle/dependence-inversion-principle/dip-counter-example.ts

我们应该将硬件抽离为抽象接口或者抽象类, 所有的硬件实现这个接口或者抽象类, 计算机类依赖这些硬件抽象接口或者抽象类, 当硬件的子类实现不违背[里氏代换原则](../liskov-substitution-principle/liskov-substitution-principle.md)时, 计算机类就可以正常运行

<!-- prettier-ignore -->
<<< @/src/design-pattern/_principle/dependence-inversion-principle/dependence-inversion-principle.ts
