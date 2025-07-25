# 继承

构造函数的遗留问题

## 原型链继承

让子类的原型指向父类的实例

```js
function Parent() {}
function Child() {}

Child.prototype = new Parent()
```

缺点: 如果父类中有引用属性, 所有子类继承的这个属性的引用地址都是一样的, 这是预期之外的

## 构造函数继承

在子类构造函数中调用父类构造函数

```js
function Parent() {}
function Child() {
	Parent.call(this)
}
```

缺点: 不能继承父类原型链

## 组合继承

组合继承就是同时使用原型链继承和构造函数继承

```js
function Parent() {}
function Child() {
	Parent.call(this)
}

Child.prototype = new Parent()
```

缺点: 子类的实例和原型上都会存在一样的属性

## 寄生组合继承

借助 `Object.create`, 这个方法可以创建一个空对象, 并让这个对象的原型指向传入的对象

```js
function Parent() {}
function Child() {
	Parent.call(this)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```

缺点: 子类原型上的内容会被覆盖
