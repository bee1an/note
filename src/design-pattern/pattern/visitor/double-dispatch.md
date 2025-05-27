# 分派

由于 `ts` 不支持重载, 所以这里的内容仅在支持方法重载的语言中适用

我们以 `java` 为例子(伪代码)

```java
class Animal {}

class Dog extends Animal {}

class Cat extends Animal {}

class Executor {
  public void execute(Animal animal) {
    System.out.println("execute animal");
  }

  public void execute(Dog dog) {
    System.out.println("execute dog");
  }

  public void execute(Cat cat) {
    System.out.println("execute cat");
  }
}

class Main {
  public static void main(String[] args) {
    Executor executor = new Executor();

    Animal animal = new Animal();
    Animal dog = new Dog();
    Animal cat = new Cat();

    executor.execute(animal); // [!code error] 这里会惊奇的发现打印的是 "execute animal"
  }
}
```

为什么会有这样的结果呢?

让我们代入编译器的视角

## 动态(后期)绑定

动态绑定多体现在方法重写

```java
class Animal {
  public void execute() {
    System.out.println("execute animal");
  }
}

class Dog extends Animal {
  @Override
  public void execute() {
    System.out.println("execute dog");
  }
}

public class Main {
  public static void main(String[] args) {}

  public static void execute(Animal animal) {
    animal.execute(); // [!code error] 这里的代码会怎么执行
  }
}
```

编译器会想着执行 `Animal` 中的 `execute` 方法? 稍等, 还有一个子类重写了这个方法, 所以这里到底是执行哪个类中的方法在编译时态并不能确定, 需要推迟到运行时态

这种情况被成为动态(后期)绑定

**后期**: 在编译后执行时确定

**动态**: 根据实例的类型来确定

## 静态(前期)绑定

我们回到第一个例子

```java
class Main {
  public static void main(String[] args) {
    Executor executor = new Executor();

    Animal animal = new Animal();
    Animal dog = new Dog();
    Animal cat = new Cat();

    executor.execute(animal); // [!code error] 这里为什么跟预期不合呢
  }
}
```

这里的代码在编译时态就决定了, 因为在实例化 `Dog` 类时返回值类型定义为 `Animal`

编译器不能确定真正的实例后的类(Dog)是否满足要求, 但是他定义的类型(Animal)一定满足要求, 那么编译器处于安全考虑就会使用静态绑定的方式来处理重载(当然还有其他原因, 没必要研究的太深)

## 双分派

双分派是一个允许在重载时使用动态绑定的技巧

```java
class Visitor {
  visit(Animal a) {
    System.out.println("animal");
  }

  visit(Dog d) {
    System.out.println("dog");
  }
}

class Animal {
  accept(Visitor v) {
    // 编译器明确知道 `this` 的类型是 `Animal`。
    // 因此可以安全地调用 `visit(s: Animal)`。
    v.visit(this);
  }
}

class Dog extends Animal {
  // 同理
  accept(Visitor v) {
    v.visit(this);
  }
}

class Main {
  public static void main(String[] args) {
    Visitor executor = new Visitor();

    Animal animal = new Animal();
    Animal dog = new Dog();

    animal.accept(executor);
    dog.accept(executor);
  }
}
```

使用重写来调用重载, 所以编辑器可以进行动态绑定
