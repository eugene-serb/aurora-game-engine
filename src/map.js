'use strict';

import Matrix from './matrix.js';

/**
 * Class map to represent the map.
 * @extends Matrix
 */
export class Map extends Matrix {
  /**
   * Create Map class instance.
   * @param {number} width Matrix width.
   * @param {number} height Matrix height.
   * @param {any} emptyValue Default empty value.
   * @param {Array<Array<any>>} matrix Another matrix for fill new Matrix instance.
   * @param {object<{x: boolean, y: boolean}>} transfer Explain on which axes the map is closed.
   */
  constructor(width, height, emptyValue, matrix, transfer) {
    super(width, height, emptyValue, matrix);

    this.transferX = typeof transfer?.x === 'boolean' ? transfer.x : false;
    this.transferY = typeof transfer?.y === 'boolean' ? transfer.y : false;
  }

  /**
   * Get new coordinates based on start position and difference.
   * @param {object<{x: number, y: number}>} start Point object with key 'x': number and 'y': number.
   * @param {object<{x: number, y: number}>} delta Point object with key 'x': number and 'y': number.
   * @returns {object<{x: number, y: number}>} New position.
   */
  getCoords(start, delta) {
    const sx = start?.x && typeof start?.x === 'number' ? Math.abs(Math.trunc(start.x)) : 0;

    const sy = start?.y && typeof start?.y === 'number' ? Math.abs(Math.trunc(start.y)) : 0;

    const dx = delta?.x && typeof delta?.x === 'number' ? Math.trunc(delta.x) : 0;

    const dy = delta?.y && typeof delta?.y === 'number' ? Math.trunc(delta.y) : 0;

    const rx = sx + dx;
    const ry = sy + dy;

    const x = this.#getX(rx);
    const y = this.#getY(x, ry);

    return { x, y };
  }

  /**
   * Get X position.
   * @param {number} x Position on x-axe.
   * @returns {number} New x-axe position.
   */
  #getX(x) {
    let result = null;

    if (x >= this.value.length) {
      result = this.transferX ? 0 : this.value.length - 1;
    } else if (x < 0) {
      result = this.transferX ? this.value.length - 1 : 0;
    } else {
      result = x;
    }

    return result;
  }

  /**
   * Get Y position.
   * @param {number} x Position on x-axe.
   * @param {number} y Position on y-axe.
   * @returns {number} New y-axe position.
   */
  #getY(x, y) {
    let result = null;

    if (y >= this.value[x].length) {
      result = this.transferY ? 0 : this.value[x].length - 1;
    } else if (y < 0) {
      result = this.transferY ? this.value[x].length - 1 : 0;
    } else {
      result = y;
    }

    return result;
  }
}

export default Map;
