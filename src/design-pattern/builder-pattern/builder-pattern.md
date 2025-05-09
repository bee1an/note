# 建造者模式

[参考文章](https://refactoringguru.cn/design-patterns/builder)

> 亦称: 建造者模式、Builder

生成器模式是一种[创建型设计模式](../design-pattern.md#创建型模式)

见名知意, 生成器模式可以把创建对象的复杂**步骤拆分**开

## 场景

小宇开发了一款打包工具, 这个打包工具刚开始只是打包 `js` 文件

```typescript
class Packer {
	build() {}
}
```

后面这个打包工具需要打包 `js` 和 `css` 文件, 所以需要修改 `build` 方法

```typescript
class Packer {
	build(js: boolean, css: boolean) {}
}
```

在后来有更多的文件需要打包, 这时候 `build` 函数的会越来越大

那就**重构!!!**

## 解决方法

这个时候我们把打包文件的**逻辑拆分**出来, 不同的文件就是一个不同的步骤, 最后打包的结果根据**调用的步骤**来决定

> 我觉得类似于插件化思想, 通过引入不同的插件来实现不同的功能

```typescript
class Packer {
	/** 打包js步骤 */
	buildJs() {}

	/** 打包css步骤 */
	buildCss() {}

	// ...

	/** 获取打包结果 */
	getBuilding() {}
}
```

### 主管

可以把特殊的步骤抽离出来形成一个单独的类

比如我们可以把打包 `vue` 和 `css` 的步骤封装到主管类的一个方法中, 把打包 `tsx` 和 `ts` 的**步骤封装**到另一个方法中

> 类似预设

这个时候我们就可以选择调用具体的步骤打包或者使用主管类中**预设**的打包步骤来打包

## 贴个代码

<<< @/src/design-pattern/builder-pattern/builder-pattern.ts
