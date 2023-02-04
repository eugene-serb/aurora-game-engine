'use strict';

export class Matrix {
  constructor(width, height, emptyValue, matrix) {
    this.EMPTY_VALUE = (typeof emptyValue !== 'undefined') ? emptyValue : 0;

    if (matrix && Array.isArray(matrix)) {
      this.value = this.generate(matrix.length, matrix[0].length, this.EMPTY_VALUE);
      this.insert(matrix, { x: 0, y: 0});
    } else {
      this.value = this.generate(width, height, this.EMPTY_VALUE);
    }
  }

  generate(width, height, emptyValue) {
    const w = (width && typeof width === 'number')
      ? Math.abs(Math.trunc(width)) : 1;

    const h = (height && typeof height === 'number')
      ? Math.abs(Math.trunc(height)) : 1;

    const e = (typeof emptyValue !== 'undefined') ? emptyValue : 0;

    const result = new Array();

    for (let column = 0; column < w; column++) {
      result[column] = new Array();
      for (let row = 0; row < h; row++) {
        result[column][row] = e;
      }
    }

    return result;
  }

  clone() {
    return new Matrix(null, null, this.EMPTY_VALUE, this.copy());
  }

  copy() {
    const result = this.generate(
      this.value.length,
      this.value[0].length,
      this.EMPTY_VALUE,
    );

    for (let column = 0; column < this.value.length; column++) {
      for (let row = 0; row < this.value[column].length; row++) {
        result[column][row] = this.value[column][row];
      }
    }

    return result;
  }

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

  reflectX() {
    this.value.reverse();
  }

  reflectY() {
    this.value.forEach((column) => {
      column.reverse();
    });
  }

  rotateLeft() {
    const result = this.generate(
      this.value[0].length,
      this.value.length,
      this.EMPTY_VALUE,
    );

    for (let column = 0; column < this.value.length; column++) {
      for (let row = 0; row < this.value[column].length; row++) {
        let x = this.value[column].length - 1 - row;
        let y = column;
        result[x][y] = this.value[column][row];
      }
    }

    this.value = result;
  }

  rotateRight() {
    const result = this.generate(
      this.value[0].length,
      this.value.length,
      this.EMPTY_VALUE,
    );

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
