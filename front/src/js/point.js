export default class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Point} point
   */
  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
}
