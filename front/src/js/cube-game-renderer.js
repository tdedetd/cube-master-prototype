import { Color } from "./color";
import { CubeGame } from "./cube-game";

export class CubeGameRenderer {
  /**
   * @param {CubeGame} game 
   * @param {number} width 
   * @param {number} height 
   * @param {CanvasRenderingContext2D} ctx 
   */
  constructor(game, width, height, ctx) {
    this._game = game;
    this._width = width;
    this._height = height;
    this._ctx = ctx;
    this._cellLength = this._computeCellLength();

    this._draw();
  }

  _draw() {
    const game = this._game;
    const length = this._cellLength;
    let color;

    for (let x = 0; x < game.width; x++) {
      for (let y = 0; y < game.height; y++) {
        color = game.colors[x][y];

        if (color) {
          this._ctx.fillStyle = this._getColorString(color);
          this._ctx.fillRect(x * length, y * length, length, length);
        }
      }
    }
  }

  /**
   * @param {Color} color 
   */
  _getColorString(color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  _computeCellLength() {
    return Math.floor(Math.min(this._width / this._game.width, this._height / this._game.height));
  }
}
