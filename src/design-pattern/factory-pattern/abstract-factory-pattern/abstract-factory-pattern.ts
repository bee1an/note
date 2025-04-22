export {}
/**
 * 定义抽象工厂
 */
interface AbstractStyleFactory {
  createButton(): Button
  createInput(): Input
}

/**
 * 定义抽象产品
 *
 * 抽象产品不是非要用abstract, 抽象工厂同理, 不要有这个误区
 */
class Button {
  // button组件核心逻辑
}

class Input {
  // input组件核心逻辑
}

/**
 * 定义具体工厂
 *
 * 具体工厂需要实现抽象工厂
 * 这个工厂只能创建出 material 风格的组件
 */
class MaterialStyleFactory implements AbstractStyleFactory {
  createButton(): Button {
    return new MaterialButton()
  }
  createInput(): Input {
    return new MaterialInput()
  }
}

/**
 * 这个工厂只能创建出 hollowed-out 风格的组件
 */
class HollowedOutStyleFactory implements AbstractStyleFactory {
  createButton(): Button {
    return new HollowedOutButton()
  }
  createInput(): Input {
    return new HollowedOutInput()
  }
}

/**
 * 定义具体产品
 *
 * 具体产品需要实现抽象产品
 */
class MaterialButton extends Button {
  constructor() {
    super()
    console.log('MaterialButton')
  }
}

/** 另一种风格 */
class HollowedOutButton extends Button {
  constructor() {
    super()
    console.log('HollowedOutButton')
  }
}

class MaterialInput extends Input {
  constructor() {
    super()
    console.log('MaterialInput')
  }
}

class HollowedOutInput extends Input {
  constructor() {
    super()
    console.log('HollowedOutInput')
  }
}

// 这样我们需要 material 风格的组件就使用 MaterialStyleFactory 来构造

console.log('create material style')

const materialStyle = new MaterialStyleFactory()

materialStyle.createButton()
materialStyle.createInput()

// hollowed-out 风格的组件就使用 HollowedOutStyleFactory 来构造

console.log('create hollowed-out style')

const hollowedOutStyle = new HollowedOutStyleFactory()

hollowedOutStyle.createButton()
hollowedOutStyle.createInput()
