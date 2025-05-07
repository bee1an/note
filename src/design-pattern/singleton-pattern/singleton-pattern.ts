/**
 * 非常简单的例子
 */
class Singleton {
  private static _instance: Singleton

  private constructor() {}

  static get instance(): Singleton {
    if (!Singleton._instance) {
      Singleton._instance = new Singleton()
    }

    return Singleton._instance
  }
}
