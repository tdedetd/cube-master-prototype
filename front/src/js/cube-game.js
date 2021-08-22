import { Color } from './color';
import { Point } from './point';
import { Filler } from "./filler";
import { fall } from './utils';

/** @type {Color[]} */
const COLORS = [
  new Color(222, 41, 36), // red
  new Color(0, 128, 0), // green
  new Color(81, 105, 230), // blue
  new Color(241, 176, 58), // gold
  new Color(132, 89, 218), // purple
];

export class CubeGame {
  constructor(width, height) {
    /** @type {number} */
    this.width = width;

    /** @type {number} */
    this.height = height;

    /** @type {Color[][]} */
    this.colors = this._generate();

    /** @type {number} */
    this.score = 0;

    /** @type {Point[]} */
    this.selection = [];
  }

  checkGameOver() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.colors[x][y] && (
          x + 1 < this.width && this.colors[x][y] === this.colors[x + 1][y]
          || y + 1 < this.height && this.colors[x][y] === this.colors[x][y + 1]
        )) {
          return false;
        }
      }
    }

    return true;
  }

  destroy() {
    if (this.selection.length === 0) return;

    this.score += this.selection.length ** 2;

    this.selection.forEach(p => {
      this.colors[p.x][p.y] = null;
    });
    const xMin = Math.min(...this.selection.map(p => p.x));
    const xMax = Math.max(...this.selection.map(p => p.x));

    for (let x = xMin; x <= xMax; x++) {
      fall(this.colors[x]);
    }

    fall(this.colors, col => col[col.length - 1]);

    this._resetSelection();
  }

  /**
   * @param {Point} point 
   */
  select(point) {
    this.selection = this._getSelection(point);
  }

  _generate() {
    /** @type {Color[][]} */
    const colors = [];

    for (let x = 0; x < this.width; x++) {
      let column = [];
      for (let y = 0; y < this.height; y++) {
        column.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
      }

      colors.push(column);
    }

    return colors;
  }

  _getSelection(point) {
    if (!point || !this.colors[point.x][point.y]) return [];

    const selection = new Filler().fill(this.colors, point, this.width, this.height);
    if (selection.length === 1) return [];

    return selection;
  }

  _resetSelection() {
    this.selection = [];
  }
}
