# 类型映射

下文可能不满足依赖倒置原则

## 场景

当我们有多个继承子同一个接口的类

```ts
abstract class Base {
	type: string
}
class A extends Base {
	type: 'a'
}
class B extends Base {
	type: 'b'
}
```

有一个统一管理他们的类

```ts
class Manager {
	list: (A | B)[] = []
}
```

我们可以把这些类聚合统一管理

```ts
type TypeName = 'a' | 'b'

type TypeToClass = {
	a: A
	b: B
}
```

这样我们的管理的类可以改成

```ts
class Manager<T extends TypeName = TypeName> {
	list: TypeToClass[T][] = []
}
```

这样就新增或者删除类的时候就不会动 `Manager` 类了

可以添加一个[type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)来代替`instanceof`

```ts
class Manager<T extends TypeName = TypeName> {
	typeEqualTo<K extends TypeName>(expectType: K, item: TypeToClass[T]): item is TypeToClass[K] {
		return item.type === (expectType as TypeName)
	}
	list: TypeToClass[T][] = []
}
```
