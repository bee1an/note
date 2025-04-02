# 🎨 sass

css 预处理器

为什么安装使用 sass, 文件名又是 scss

.sass 文件是 sass 的语法, 没有大括号和分号, 比较反人类, 后面新增了 scss 语法, 就是使用量最多的 scss

#### 使用 sass 编写 bem

首先定义好 bem 的命名规则

```scss
// 命名空间
$namespace: 'p';
// 块级连接符
$blockConnector: '-';
// 元素连接符
$elementConnector: '--';
// 修饰符连接符
$modifierConnector: '__';
```
