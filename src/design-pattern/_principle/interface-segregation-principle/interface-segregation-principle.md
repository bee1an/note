# 接口隔离原则

> interface segregation principle

这个原则的意思是：**使用多个隔离的接口，比使用单个接口要好**

它还有另外一个意思是：降低类之间的耦合度。由此可见，其实设计模式就是从大型软件架构出发、便于升级和维护的软件设计思想，它强调降低依赖，降低耦合。

比如, 接口A中有方法a,b, 类B实现了接口A, 类C只需要接口A中的a, 不需要b, 这个时候如果类C还是实现接口A, 类C就会有不必要的依赖

## 贴个代码

例如我们现在有一个防盗门, 他的功能有防盗, 防火和防水, 他的子品牌防盗门实现他的功能

<!-- prettier-ignore -->
<<< @/src/design-pattern/_principle/interface-segregation-principle/isp-counter-example.ts

现在又有另一个子品牌想要实现这个防盗门, 但是它没有了防水的功能, 如果我们还是实现 `SecurityDoor` 接口, 那么就会被迫实现防水的功能

我们把防盗门的功能拆分为3个接口, 防盗接口, 防火接口, 防水接口, 这样就可以根据不同的功能实现不同的接口

<!-- prettier-ignore -->
<<< @/src/design-pattern/_principle/interface-segregation-principle/interface-segregation-principle.ts
