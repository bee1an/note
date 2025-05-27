# 里氏代换原则

> liskov substitution principle

里氏代换原则中说，任何**基类可以出现的地方，子类一定可以出现**。

LSP 是继承复用的基石，只有当派生类可以替换掉基类，且软件单位的功能不受到影响时，基类才能真正被复用，而派生类也能够在基类的基础上增加新的行为。里氏代换原则是对开闭原则的补充。实现开闭原则的关键步骤就是抽象化，而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。

当[方法重写(多态)](/src/jot-down/oop-charectristic.md#多态-polymorphism)使用比较频繁时, 里氏代换原则可能就会打破, 这里并不是说需要少用多态, 而是当在进行方法重写时应该考虑是否会打破里氏代换原则

## 代码实例

这里使用最经典的例子: 正方形不是一个长方形

在数学领域中，正方形是一个特殊的长方形，正方形的宽和高相等, 所以我们很容易就会写出下面这样的代码

<<< @/src/design-pattern/principle/liskov-substitution/lsp-counter-example.ts

事实上, 正方形并不应该继承自长方形

重构后的代码

<<< @/src/design-pattern/principle/liskov-substitution/liskov-substitution.ts
