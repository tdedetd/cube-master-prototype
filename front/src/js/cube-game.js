import { Color } from './color';
import { Point } from './point';
import { Filler } from "./filler";

/** @type {Color[]} */
const COLORS = [
  { r: 222, g: 41, b: 36 }, // red
  { r: 0, g: 128, b: 0 }, // green
  { r: 81, g: 105, b: 230 }, // blue
  { r: 241, g: 176, b: 58 }, // gold
  { r: 132, g: 89, b: 218 } // purple
];

export class CubeGame {
  constructor(width, height) {
    /** @type {number} */
    this.width = width;

    /** @type {number} */
    this.height = height;

    /** @type {Color[][]} */
    this.colors = this._generate();

    /** @type {Point[]} */
    this.selection = [];
  }

  /** @type {Point} */
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
}
