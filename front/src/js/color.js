export class Color {
  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
