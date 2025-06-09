# sass

`css` 预处理器

为什么安装使用 `sass`, 文件名又是 `scss`

`.sass` 文件是 `sass` 的语法, 没有大括号和分号, 比较反人类, 后面新增了 `scss` 语法, 就是使用量最多的 `scss`

## 小计

**@use 和 @forward**

> 以下内容是我自己的理解, 没有经过实践

`@use` 是引入后, 可以直接使用里面的变量等

`@forward` 相当于在导入到这个文件再直接导出, 相当于一个中转站, 可以在其他文件使用 forward 文件中的变量, 但在当前文件中不能直接使用

## 使用 sass 编写 bem

以下代码没有投入生产, 只是提供一个思路, 生产方案参考 [element-plus](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/mixins.scss)

我写了一个 `bem` 的 `ts` 类, 用来生成 `bem` 的命名规则, [代码](./bem.ts)

### 定义

定义 `bem` 的命名规则

```scss
// 命名空间
$namespace: 'p';
// 块级连接符
$blockConnector: '-';
// 元素连接符
$elementConnector: '--';
// 修饰符连接符
$modifierConnector: '__';
// 状态前缀
$statePrefix: 'is-';
```

定义块级混合

```scss
@mixin b($blockName) {
	$B: $namespace + $block-separator + $block;

	.#{$B} {
		// 这里使用 # 表示使用变量
		@content;
	}
}
```

定义元素混合

```scss
@mixin e($element) {
	$E: $element-separator + $element;

	&#{$E} {
		@content;
	}
}
```

定义修饰符混合

```scss
@mixin m($modifier) {
	$M: $modifier-separator + $modifier;

	&#{$M} {
		@content;
	}
}
```

定义状态混合

```scss
@mixin when($state) {
	&.#{$state-prefix + $state} {
		@content;
	}
}

@mixin whenNot($state) {
	:not(&.#{$state-prefix + $state}) {
		@content;
	}
}
```

### 使用

```scss
@include b('button') {
	// 块级样式
	@include e('icon') {
		// 元素样式
		@include m('primary') {
			// 修饰符样式
		}
	}
	@include when('disabled') {
		// 状态样式
	}

	@include whenNot('disabled') {
		// 状态样式
	}
}
```

编译后样式

```css
.p-button {
	/*  */
}
.p-button__icon {
	/*  */
}
.p-button__icon--primary {
	/*  */
}
.p-button.is-disabled {
	/*  */
}
:not(.p-button.is-disabled) {
	/*  */
}
```
