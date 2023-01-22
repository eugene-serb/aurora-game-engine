'use strict';

import Matrix from './matrix.js';

export class Map extends Matrix {
  constructor(width, height, emptyValue, matrix, transfer) {
    super(width, height, emptyValue, matrix);

    this.transferX = (typeof transfer?.x === 'boolean')
      ? transfer.x : false;
    this.transferY = (typeof transfer?.y === 'boolean')
      ? transfer.y : false;
  }

  getCoords(start, delta) {
    const sx = (start?.x && typeof start?.x === 'number')
      ? Math.abs(Math.trunc(start.x)) : 0;

    const sy = (start?.y && typeof start?.y === 'number')
      ? Math.abs(Math.trunc(start.y)) : 0;

    const dx = (delta?.x && typeof delta?.x === 'number')
      ? Math.trunc(delta.x) : 0;

    const dy = (delta?.y && typeof delta?.y === 'number')
      ? Math.trunc(delta.y) : 0;

    const rx = sx + dx;
    const ry = sy + dy;

    const x = this.#getX(rx);
    const y = this.#getY(x, ry);

    return { x, y };
  }

  #getX(x) {
    let result = null;

    if (x >= this.value.length) {
      result = (this.transferX) ? 0 : this.value.length - 1;
    } else if (x < 0) {
      result = (this.transferX) ? this.value.length - 1 : 0;
    } else {
      result = x;
    }

    return result;
  }

  #getY(x, y) {
    let result = null;

    if (y >= this.value[x].length) {
      result = (this.transferY) ? 0 : this.value[x].length - 1 ;
    } else if (y < 0) {
      result = (this.transferY) ? this.value[x].length - 1 : 0;
    } else {
      result = y;
    }

    return result;
  }
}

export default Map;
