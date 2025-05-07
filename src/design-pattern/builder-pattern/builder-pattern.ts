/**
 * 建造者接口, 声明了打包器的不同步骤
 */
interface Packer {
  buildJs(): void

  buildCss(): void

  buildHtml(): void

  buildVue(): void

  buildJsx(): void
}

/**
 * 具体建造者
 */
class ConcretePacker implements Packer {
  private _product = new Set()

  private _reset() {
    this._product.clear()
  }

  /**
   * 打包js步骤
   */
  buildJs() {
    this._product.add('buildJs')
  }

  /**
   * 打包css步骤
   */
  buildCss() {
    this._product.add('buildCss')
  }

  /**
   * 打包html步骤
   */
  buildHtml() {
    this._product.add('buildHtml')
  }

  /**
   * 打包vue步骤
   */
  buildVue() {
    this._product.add('buildVue')
  }

  /**
   * 打包jsx步骤
   */
  buildJsx() {
    this._product.add('buildJsx')
  }

  /**
   * 获取打包结果
   */
  getBuilding() {
    const result = [...this._product].join(',')

    this._reset()

    return result
  }
}

/**
 * 主管类
 */

class Director {
  /**
   * 封装打包vue的步骤
   */
  buildVue(packer: Packer) {
    packer.buildJs()
    packer.buildCss()
    packer.buildHtml()
    packer.buildVue()
  }

  /**
   * 封装打包jsx的步骤
   */
  buildJsx(packer: Packer) {
    packer.buildJs()
    packer.buildCss()
    packer.buildHtml()
    packer.buildJsx()
  }
}

const packer = new ConcretePacker()
const director = new Director()

console.log('get vue building')

director.buildVue(packer)

console.log('vue building: ' + packer.getBuilding())

console.log('-------------------')

console.log('get jsx building')

director.buildJsx(packer)

console.log('jsx building: ' + packer.getBuilding())

console.log('-------------------')

// 自己决定打包步骤

console.log('get js & css & html building')

packer.buildJs()
packer.buildCss()
packer.buildHtml()

console.log('js & css & html building: ' + packer.getBuilding())

/**
 * 执行结果:
 *
 * get vue building
 * vue building: buildJs,buildCss,buildHtml,buildVue
 * -------------------
 * get jsx building
 * jsx building: buildJs,buildCss,buildHtml,buildJsx
 * -------------------
 * get js & css & html building
 * js & css & html building: buildJs,buildCss,buildHtml
 */
