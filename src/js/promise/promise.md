# Promise

[promise A+](https://promisesaplus.com/)

[译文](https://promisesaplus.com.cn/)

## 核心概念

- 构造参数为一个高阶函数, 函数接受两个函数参数 `resolve` 和 `reject`

- `promise` 有三种状态: `pending`, `fulfilled`, `rejected`

- 除了 `pending` 状态之外, 其它状态都是不可逆的

- `then` 函数可以多次调用, 最终的函数执行顺序等于then函数的调用顺序

- 每一个 `then` 都返回一个新的 `promise`, 这个新的 `promise` 的状态由当前 `promise` 的状态决定

- 如果 `then` 的第一个回调函数返回一个 `promise`, 那么then函数返回的 `promise` 的状态由 `then` 函数参数返回的 `promise` 决定

- `promise` 如果被拒绝, 如果 `then` 没有传递第二个回调, 那么会尝试抛出错误
  - 如果 `then` 函数返回的 `promise` 接收了错误信息(传递了第二个回调), 那么则不会报错

### 状态吸收

- 需要吸收状态的原因是为了更好的实现链式调用
- 当 `promise` 尝试将值确定后(例如 `promise` 构造器的第一个参数函数resolve调用时参数传递了值, 或者 `then` 的成功的回调的返回值), 如果这个值是一个 `promise` , 那么这个 `promise` 的状态会被吸收, 被吸收的意思是 `promise` 的状态会和新的 `promise` 的状态同步
- 状态吸收的步骤会在微队列进行, 这个不是a+规范, v8是这么做的
- 由于此时的 `promise` 状态根据新的 `promise` 状态确定, 所以 `promise` 状态的确定会至少推后两个微任务执行

### ECMA

ECMA 在promisea+规范上新增了几个语法糖

- `all`: 接受一个可迭代对象, 返回一个 `promise`, 如果可迭代对象为空或者可迭代对象中的 `promise` 都成功, 返回成功的 `promise` , 如果有一个失败, 返回失败的 `promise`
- `allSettled`: 接受一个可迭代对象, 返回一个 `promise`, 当可迭代对象为空或者可迭代对象中的 `promise` 都完成, 则返回的 `promise` 完成, 返回的 `promise` 始终成功并在结果中包含可迭代对象中的 `promise` 的状态和结果
- `any`: 接受一个可迭代对象, 返回一个 `promise`, 当可迭代对象为空或者可迭代对象中的 `promise` 都失败, 则返回的 `promise` 失败, 任意一个成功则返回成功
- `race`: 接受一个可迭代对象, 返回一个 `promise`, 当可迭代对象为空则返回的 `promise` 始终挂起, 任意一个完成则返回对应的结果

- `reject`: 等同于 `new Promise((resolve, reject) => reject(reason))`
- `resolve`: 接受一个参数

  - 如果传入的值是一个 `promise`, 那么直接返回这个参数, 其他情况返回一个 `promise`
  - 如果参数是一个`thenable`那么, 返回的 `promise` 吸收`thenable`状态
  - 其他参数值等同于 `new Promise((resolve, reject) => resolve(value))`,

- `try`: 第一个参数为一个函数, 其他参数为这个函数的参数, 解决 `Promise.resolve(fn())` fn在调用时报错而无法捕获的问题, 将函数在内部调用并进行 `try catch`
- `withResolver`: 完全等价

  ```js
  let resolve, reject
  const promise = new Promise((res, rej) => {
  	resolve = res
  	reject = rej
  })
  ```

::: details promise源码示例

<<< ./promisesaplus.ts

:::
