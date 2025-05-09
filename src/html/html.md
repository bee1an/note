# 📄 HTML

## Element: children property & Element: childNodes property

获取元素的子节点, 两者获取内容都是实时的

### Element: children property

返回一个只读的`HTMLCollection`

只包含**元素节点**, 所以获取文本或者注释节点则不行

### Element: childNodes property

返回一个只读的`NodeList`, 并且这个 `NodeList` 是实时的(live)

包含**元素, 文本, 注释**节点

## HTMLCollection & NodeList

两者都是伪数组

但是 `NodeList` 可以使用 `forEach()` 遍历它

### HTMLCollection

可以根据 `Document.getElementsByTagName()` 获取

`HTMLCollection` 是实时的, (MDN 原文: An HTMLCollection in the HTML DOM is live;), 表示我们操作了文档, 集合会实时更新

### NodeList

可以根据 `Document.querySelectorAll()` 获取

NodeList 可能是实时的也可能不是实时的, (MDN 原文: there are 2 varieties of NodeList: live and static.)

动态的情况: Node.childNodes

```js
const parent = document.getElementById('parent')
let childNodes = parent.childNodes
console.log(childNodes.length) // let's assume "2"
parent.appendChild(document.createElement('div'))
console.log(childNodes.length) // outputs "3"
```

其他情况下, NodeList 是静态的
