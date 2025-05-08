abstract class Shape {
  abstract clone(): Shape
}

class Rectangle extends Shape {
  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  constructor(private _width: number, private _height: number) {
    super()
  }

  clone(): Rectangle {
    return new Rectangle(this._width, this._height)
  }
}

const rectangle = new Rectangle(10, 20)

const rectangleClone = rectangle.clone()

console.log(rectangleClone.width === rectangle.width) // true
