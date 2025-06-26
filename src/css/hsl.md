# hsl

先回忆一下rgb和hex格式

## rgb

rgb(red, green, blue), 这三种颜色混合在一起呈现的颜色

例如 rgb(255, 0, 0) 这个颜色就是纯红色

## hex

rgb的16进制表现形式

```js
;(255).toString(16) // ==> 'ff'
```

所以hex的纯红色就是 #ff0000

---

这两种颜色有一个问题, 就是如果你想要一个灰色, 并不明确怎么调

这时候就要引入人类更加读得懂的颜色hsl了

- h: Hes => 色调
- s: Saturation => 饱和度
- l: Lightness => 亮度

通过这个方式, 可以h来确定大致的颜色, 在根据 s 和 l 来细调

比如想要一个不是很红的红色,h就可以是一个纯红色, 然后使用s和l来调

或者可以确定一个色相, 然后根据色相再通过调整s和l生成其他类似的颜色, 比如按钮颜色, 和按钮hover颜色, 和按钮active颜色

确定了 饱和度和亮度 那么就可以调整色相来生成其他同类配色, 例如danger按钮以及其他状态, info按钮以及其他状态

详情内容: [HSL: a color format for humans](https://cloudfour.com/thinks/hsl-a-color-format-for-humans/)
