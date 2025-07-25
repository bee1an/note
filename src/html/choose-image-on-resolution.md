# srcset 和 sizes

解决图片清晰度问题

图片的原始尺寸 >= 图片的css尺寸 \* 设备的像素密度

如果满足上面的公式, 则图片会清晰

应当尽量让图片的原始尺寸 = 图片的css尺寸 \* 设备的像素密度, 这样就不会浪费带宽

`window.devicePixelRatio` 可以获取当前设备的 `dpr`

## srcset

`srcset` 用于指定不同分辨率的图片

```html
<img src="[1倍分辨率的图片路径]" srcset="[2倍分辨率的图片路径] 2x, [3倍分辨率的图片路径] 3x, ..." />
```

## sizes

当图片的css尺寸不固定时(响应式宽高), 可以使用 `sizes`

`sizes` 用于告诉浏览器当前窗口尺寸下图片的尺寸

这个属性需要搭配 `srcset` 使用

```html
<img
	src="[图片路径]"
	srcset="[图片路径] 150w, [图片路径] 300w, [图片路径] 500w, ..."
	sizes="
    (max-width: 640px) 150px,
    (max-width: 1280px) 300px,
    500px
  "
/>
```
