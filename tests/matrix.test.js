'use strict';

import Matrix from '../src/matrix.js';

describe('[Class][Matrix] constructor', () => {
  test('Construct without params', () => {
    expect(new Matrix().value)
      .toEqual([[0]]);
    expect(new Matrix().EMPTY_VALUE)
      .toBe(0);
  });

  test('Construct with params w, h, e', () => {
    expect(new Matrix(2, 2, 0).value)
      .toEqual([[0, 0], [0, 0]]);
    expect(new Matrix(2, 2, 0).EMPTY_VALUE)
      .toBe(0);
  });

  test('Construct with negative params w, h and null e', () => {
    expect(new Matrix(-2, -2, null).value)
      .toEqual([[null, null], [null, null]]);
    expect(new Matrix(-2, -2, null).EMPTY_VALUE)
      .toBe(null);
  });

  test('Construct with floats', () => {
    expect(new Matrix(-1.2, -1.4, -1.3).value)
      .toEqual([[-1.3]]);
    expect(new Matrix(-1.2, -1.4, -1.3).EMPTY_VALUE)
      .toBe(-1.3);
  });

  test('Construct with matrix', () => {
    expect(new Matrix(null, null, 0, [[1, 1], [1, 1]]).value)
      .toEqual([[1, 1], [1, 1]]);
    expect(new Matrix(null, null, 0, [[1, 1], [1, 1]]).EMPTY_VALUE)
      .toBe(0);
  });
});

describe('[Class][Matrix] function generate', () => {
  const matrix = new Matrix();

  test('Generate without params', () => {
    expect(matrix.generate())
      .toEqual([[0]]);
  });

  test('Generate with zeros', () => {
    expect(matrix.generate(0, 0, 0))
      .toEqual([[0]]);
  });

  test('Generate with minuses', () => {
    expect(matrix.generate(-1, -1, -1))
      .toEqual([[-1]]);
  });

  test('Generate with floats', () => {
    expect(matrix.generate(-1.2, -1.4, -1.3))
      .toEqual([[-1.3]]);
  });
});

describe('[Class][Matrix] function clone', () => {
  test('Clone matrix generated without params', () => {
    expect(new Matrix().clone().value)
      .toEqual([[0]]);
    expect(new Matrix().clone().EMPTY_VALUE)
      .toBe(0);
  });

  test('Clone matrix generated with params w, h, e', () => {
    expect(new Matrix(2, 2, 0).clone().value)
      .toEqual([[0, 0], [0, 0]]);
    expect(new Matrix(2, 2, 0).clone().EMPTY_VALUE)
      .toBe(0);
  });

  test('Clone matrix generated with params e, m', () => {
    expect(new Matrix(null, null, 0, [[0, 0], [0, 0]]).clone().value)
      .toEqual([[0, 0], [0, 0]]);
    expect(new Matrix(null, null, 0, [[0, 0], [0, 0]]).clone().EMPTY_VALUE)
      .toBe(0);
  });
});

describe('[Class][Matrix] function copy', () => {
  test('Copy matrix generated without params', () => {
    expect(new Matrix().copy())
      .toEqual([[0]]);
  });

  test('Copy matrix generated with params w, h, e', () => {
    expect(new Matrix(2, 2, 0).copy())
      .toEqual([[0, 0], [0, 0]]);
  });

  test('Copy matrix generated with params e, m', () => {
    expect(new Matrix(null, null, 0, [[0, 0], [0, 0]]).copy())
      .toEqual([[0, 0], [0, 0]]);
  });
});

describe('[Class][Matrix] function crop', () => {
  const before = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const after = [
    [0, 1],
    [3, 4],
  ];

  test('Rotate matrix to right', () => {
    const matrix = new Matrix(null, null, 0, before);
    matrix.crop({ x: 0, y: 0 }, { x: 2, y: 2 });

    expect(matrix.value)
      .toEqual(after);
  });
});

describe('[Class][Matrix] function insert', () => {
  const before = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const after = [
    [8, 8, 2],
    [8, 8, 5],
    [6, 7, 8],
  ];

  const figure = [
    [8, 8],
    [8, 8],
  ];

  test('Insert figure to matrix at x = 0, y = 0', () => {
    const matrix = new Matrix(null, null, 0, before);
    matrix.insert(figure, { x: 0, y: 0 });

    expect(matrix.value)
      .toEqual(after);
  });
});

describe('[Class][Matrix] function reflectX', () => {
  const before = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const after = [
    [6, 7, 8],
    [3, 4, 5],
    [0, 1, 2],
  ];

  test('Reflect matrix', () => {
    const matrix = new Matrix(null, null, 0, before);
    matrix.reflectX();

    expect(matrix.value)
      .toEqual(after);
  });
});

describe('[Class][Matrix] function reflectY', () => {
  const before = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const after = [
    [2, 1, 0],
    [5, 4, 3],
    [8, 7, 6],
  ];

  test('Reflect matrix', () => {
    const matrix = new Matrix(null, null, 0, before);
    matrix.reflectY();

    expect(matrix.value)
      .toEqual(after);
  });
});

describe('[Class][Matrix] function rotateLeft', () => {
  const before = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const after = [
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6],
  ];

  test('Rotate matrix to left', () => {
    const matrix = new Matrix(null, null, 0, before);
    matrix.rotateLeft();

    expect(matrix.value)
      .toEqual(after);
  });
});

describe('[Class][Matrix] function rotateRight', () => {
  const before = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const after = [
    [6, 3, 0],
    [7, 4, 1],
    [8, 5, 2],
  ];

  test('Rotate matrix to right', () => {
    const matrix = new Matrix(null, null, 0, before);
    matrix.rotateRight();

    expect(matrix.value)
      .toEqual(after);
  });
});
