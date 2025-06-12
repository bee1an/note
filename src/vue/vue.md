# 🟩 vue

## 在tsx中使用Transition内置组件

不能使用name属性定义动画

要使用自定义过渡类名

通过这些props传递给Transition组件

`enter-from-class` <br /> `enter-active-class` <br /> `enter-to-class` <br /> `leave-from-class` <br /> `leave-active-class` <br /> `leave-to-class` <br />

可以使用第三方库达到一些动画效果, 如 [Animate.css](https://animate.style/)

```vue
<template>
	<!-- 假设你已经在页面中引入了 Animate.css -->
	<Transition
		name="custom-classes"
		enter-active-class="animate__animated animate__tada"
		leave-active-class="animate__animated animate__bounceOutRight"
	>
		<p v-if="show">hello</p>
	</Transition>
</template>
```

## 在vue中使用&nbsp等字符

template中使用v-html不知道行不行没试

通用方法: 使用unicode字符

&nbsp -> \u00A0

&zeroWidthSpace -> \u200B
