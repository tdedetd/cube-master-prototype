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
    this._game.select(null);
    this._draw();
    this._updateCursor();
  }

  onClick() {
    if (this._game.selection.length > 0) {
      this._game.destroy();
      this._game.select(this._selectedCube);
      this._updateCursor();
      this._draw();
    }
  }

  /**
   * @param {Point} coords
   */
  onMouseMove(coords) {
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

      if (this._selectedCube && !this._game.selection.find(p => p.equals(this._selectedCube))) {
        this._game.select(this._selectedCube);
        this._updateCursor();
      }

      this._draw();
    }
  }

  _computeCellLength() {
    return Math.floor(Math.min(this._width / this._game.width, this._height / this._game.height));
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
          this._ctx.fillStyle = color.getString();
          this._ctx.fillRect(
            this._startCoords.x + x * length,
            this._startCoords.y + y * length,
            length, length
          );
        }
      }
    }

    this._game.selection.forEach(p => {
      this._ctx.strokeStyle = 'white';
      this._ctx.strokeRect(
        this._startCoords.x + p.x * length,
        this._startCoords.y + p.y * length,
        length, length
      );
    });
  }

  _updateCursor() {
    document.body.style.cursor = this._game.selection.length > 0 ? 'pointer' : 'default';
  }
}
