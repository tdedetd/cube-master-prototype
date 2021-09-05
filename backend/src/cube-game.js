const Point = require('./point');

class CubeGame {
  /**
   * @param {number} colorsCount
   * @param {number} width
   * @param {number} height
   */
  constructor(colorsCount, width, height) {
    /** @type {number} */
    this.width = width;

    /** @type {number} */
    this.height = height;

    /** @type {number[][]} */
    this.colors = this._generate(colorsCount);

    /** @type {number} */
    this.score = 0;

    /** @type {Point[]} */
    this.selection = [];

    /** @type {number} */
    this.turns = 0;

    /** @type {number} */
    this._timeStart = new Date().getTime();
  }

  _generate(colorsCount) {
    /** @type {number[][]} */
    const colors = [];

    for (let x = 0; x < this.width; x++) {
      let column = [];
      for (let y = 0; y < this.height; y++) {
        column.push(Math.floor(Math.random() * colorsCount) + 1);
      }

      colors.push(column);
    }

    return colors;
  }
}

module.exports = CubeGame;
