'use strict';

/** Class Matrix for representing matrix */
export class Matrix {
  /**
   * Create Matrix class instance.
   * @param {number} width Matrix width.
   * @param {number} height Matrix height.
   * @param {any} emptyValue Default empty value.
   * @param {Array<Array<any>>} matrix Another matrix for fill new Matrix instance.
   */
  constructor(width, height, emptyValue, matrix) {
    this.EMPTY_VALUE = typeof emptyValue !== 'undefined' ? emptyValue : 0;

    if (matrix && Array.isArray(matrix)) {
      this.value = this.generate(matrix.length, matrix[0].length, this.EMPTY_VALUE);
      this.insert(matrix, { x: 0, y: 0 });
    } else {
      this.value = this.generate(width, height, this.EMPTY_VALUE);
    }
  }

  /**
   * Generate new matrix.
   * @param {number} width Matrix width.
   * @param {number} height Matrix height.
   * @param {any} emptyValue Default empty value.
   * @returns {Array<Array<any>>} New matrix value.
   */
  generate(width, height, emptyValue) {
    const w = width && typeof width === 'number' ? Math.abs(Math.trunc(width)) : 1;
    const h = height && typeof height === 'number' ? Math.abs(Math.trunc(height)) : 1;
    const e = typeof emptyValue !== 'undefined' ? emptyValue : 0;

    const result = new Array();

    for (let column = 0; column < w; column++) {
      result[column] = new Array();
      for (let row = 0; row < h; row++) {
        result[column][row] = e;
      }
    }

    return result;
  }

  /**
   * Clone Matrix instance.
   * @returns {Matrix} Cloned matrix instance.
   */
  clone() {
    return new Matrix(null, null, this.EMPTY_VALUE, this.copy());
  }

  /**
   * Get the copy of the Matrix instance value.
   * @returns {Array<Array<any>>} A copy of the value of the Matrix instance.
   */
  copy() {
    const result = this.generate(this.value.length, this.value[0].length, this.EMPTY_VALUE);

    for (let column = 0; column < this.value.length; column++) {
      for (let row = 0; row < this.value[column].length; row++) {
        result[column][row] = this.value[column][row];
      }
    }

    return result;
  }

  /**
   * Crop the Matrix value at specified coordinates.
   * @param {object<{x: boolean, y: boolean}>} start Start position.
   * @param {object<{x: boolean, y: boolean}>} end End position.
   */
  crop(start, end) {
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    const result = this.generate(width, height, this.EMPTY_VALUE);

    for (let column = 0; column < width; column++) {
      for (let row = 0; row < height; row++) {
        const x = start.x + column;
        const y = start.y + row;
        result[column][row] = this.value[x][y];
      }
    }

    this.value = result;
  }

  /**
   * Insert figure into Matrix.
   * @param {Array<Array<any>>} matrix Figure for insert into Matrix value.
   * @param {object<{x: boolean, y: boolean}>} start Start position.
   */
  insert(matrix, start) {
    const result = this.copy();

    let x = start.x;

    for (let column = 0; column < matrix.length; column++) {
      let y = start.y;

      for (let row = 0; row < matrix[column].length; row++) {
        result[x][y] = matrix[column][row];

        y++;
      }

      x++;
    }

    this.value = result;
  }

  /** Flip matrix on x-axis */
  reflectX() {
    this.value.reverse();
  }

  /** Flip matrix on y-axis */
  reflectY() {
    this.value.forEach((column) => {
      column.reverse();
    });
  }

  /** Rotate matrix left */
  rotateLeft() {
    const result = this.generate(this.value[0].length, this.value.length, this.EMPTY_VALUE);

    for (let column = 0; column < this.value.length; column++) {
      for (let row = 0; row < this.value[column].length; row++) {
        let x = this.value[column].length - 1 - row;
        let y = column;
        result[x][y] = this.value[column][row];
      }
    }

    this.value = result;
  }

  /** Rotate matrix right */
  rotateRight() {
    const result = this.generate(this.value[0].length, this.value.length, this.EMPTY_VALUE);

    for (let column = 0; column < this.value.length; column++) {
      for (let row = 0; row < this.value[column].length; row++) {
        let x = row;
        let y = this.value.length - 1 - column;
        result[x][y] = this.value[column][row];
      }
    }

    this.value = result;
  }
}

export default Matrix;
