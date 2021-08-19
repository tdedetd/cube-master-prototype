import { Point } from "./point";

class FillElement {
  /** @type {any} */ el;
  /** @type {boolean} */ visited;
}

export class Filler {
  /**
   * @param {any[][]} elements
   * @param {Point} origin
   * @param {number} width
   * @param {number} height
   * @returns {Point[]}
   */
  fill(elements, origin, width, height) {
    if (!origin) return [];

    const fillElements = elements.map(els => els.map(el => ({
      el, visited: false
    })));

    return this._getElements(fillElements, origin, width, height);
  }

  /**
   * @param {FillElement[][]} fillElements
   * @param {Point} p
   * @param {number} width
   * @param {number} height
   */
  _getElements(fillElements, p, width, height) {
    fillElements[p.x][p.y].visited = true;
    let result = [p];

    if (
      p.x - 1 >= 0
      && !fillElements[p.x - 1][p.y].visited
      && fillElements[p.x - 1][p.y].el === fillElements[p.x][p.y].el
    ) {  
      fillElements[p.x - 1][p.y].selected;
      const point = new Point(p.x - 1, p.y);
      result = [...result, ...this._getElements(fillElements, point, width, height)];
    }

    if (
      p.x + 1 < width
      && !fillElements[p.x + 1][p.y].visited
      && fillElements[p.x + 1][p.y].el === fillElements[p.x][p.y].el
    ) {  
      fillElements[p.x + 1][p.y].selected;
      const point = new Point(p.x + 1, p.y);
      result = [...result, ...this._getElements(fillElements, point, width, height)];
    }

    if (
      p.y - 1 >= 0
      && !fillElements[p.x][p.y - 1].visited
      && fillElements[p.x][p.y - 1].el === fillElements[p.x][p.y].el
    ) {
      fillElements[p.x][p.y - 1].selected;
      const point = new Point(p.x, p.y - 1);
      result = [...result, ...this._getElements(fillElements, point, width, height)];
    }

    if (
      p.y + 1 < height
      && !fillElements[p.x][p.y + 1].visited
      && fillElements[p.x][p.y + 1].el === fillElements[p.x][p.y].el
    ) {  
      fillElements[p.x][p.y + 1].selected;
      const point = new Point(p.x, p.y + 1);
      result = [...result, ...this._getElements(fillElements, point, width, height)];
    }

    return result;
  }
}
