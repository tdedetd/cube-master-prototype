import { Color } from "./color";
import { Point } from './point';
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

    /** @type {Point} */
    this._startCoords = new Point(0, 0);

    /** @type {Point} */
    this._selectedCube = null;

    this._ctx = ctx;
    this._cellLength = this._computeCellLength();

    this._draw();
  }

  clearSelection() {
    this._selectedCube = null;
    this._draw();
  }

  /**
   * @param {Point} coords 
   */
  mouseMove(coords) {
    const selectedX = Math.floor((coords.x - this._startCoords.x) / this._cellLength);
    const selectedY = Math.floor((coords.y - this._startCoords.y) / this._cellLength);

    let newSelectedCube;

    if (selectedX >= 0 && selectedX < this._game.width && selectedY >= 0 && selectedY < this._game.height) {
      newSelectedCube = new Point(selectedX, selectedY);
    } else {
      newSelectedCube = null;
    }

    if (
      newSelectedCube !== null && this._selectedCube === null
      || newSelectedCube === null && this._selectedCube !== null
      || newSelectedCube !== null && this._selectedCube !== null && !this._selectedCube.equals(newSelectedCube)
    ) {
      this._selectedCube = newSelectedCube;
      this._draw();
    }
  }

  _draw() {
    const game = this._game;
    const length = this._cellLength;
    let color;

    this._ctx.clearRect(0, 0, this._width, this._height);
    for (let x = 0; x < game.width; x++) {
      for (let y = 0; y < game.height; y++) {
        color = game.colors[x][y];

        if (color) {
          this._ctx.fillStyle = this._getColorString(color);
          this._ctx.fillRect(
            this._startCoords.x + x * length,
            this._startCoords.y + y * length,
            length, length
          );
        }
      }
    }

    if (this._selectedCube) {
      this._ctx.strokeStyle = 'white';
      this._ctx.lineWidth = 2;
      this._ctx.strokeRect(
        this._startCoords.x + this._selectedCube.x * length,
        this._startCoords.y + this._selectedCube.y * length,
        length, length
      );
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
