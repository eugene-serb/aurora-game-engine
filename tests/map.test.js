'use strict';

import Map from '../src/map.js';

const matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const trasferNo = { x: false, y: false };
const trasferXY = { x: true, y: true };

describe('[Class][Map] constructor', () => {
  test('Construct without params', () => {
    const instance = new Map();

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual([[0]]);
    expect(instance.EMPTY_VALUE)
      .toBe(0);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });

  test('Construct with params w, h, e', () => {
    const instance = new Map(2, 2, 0);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual([[0, 0], [0, 0]]);
    expect(instance.EMPTY_VALUE)
      .toBe(0);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });

  test('Construct with negative params w, h and null e', () => {
    const instance = new Map(-2, -2, null);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual([[null, null], [null, null]]);
    expect(instance.EMPTY_VALUE)
      .toBe(null);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });

  test('Construct with matrix in params', () => {
    const instance = new Map(null, null, 0, matrix);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual(matrix);
    expect(instance.EMPTY_VALUE)
      .toBe(0);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });

  test('Construct with floats', () => {
    const instance = new Map(-1.2, -1.4, -1.3);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual([[-1.3]]);
    expect(instance.EMPTY_VALUE)
      .toBe(-1.3);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });

  test('Construct with matrix', () => {
    const instance = new Map(null, null, 0, matrix);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual(matrix);
    expect(instance.EMPTY_VALUE)
      .toBe(0);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });

  test('Construct with matrix and true transfers', () => {
    const instance = new Map(null, null, 0, matrix, trasferXY);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual(matrix);
    expect(instance.EMPTY_VALUE)
      .toBe(0);
    expect(instance.transferX)
      .toBe(true);
    expect(instance.transferY)
      .toBe(true);
  });

  test('Construct with matrix and false transfers', () => {
    const instance = new Map(null, null, 0, matrix, trasferNo);

    expect(instance)
      .not.toBeNull();
    expect(instance.value)
      .toEqual(matrix);
    expect(instance.EMPTY_VALUE)
      .toBe(0);
    expect(instance.transferX)
      .toBe(false);
    expect(instance.transferY)
      .toBe(false);
  });
});

describe('[Class][Matrix] function generate', () => {
  const matrix = new Map();

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
    const instance = new Map();
    const clone = instance.clone();

    expect(clone.value)
      .toEqual([[0]]);
    expect(clone.EMPTY_VALUE)
      .toBe(0);
  });

  test('Clone matrix generated with params w, h, e', () => {
    const instance = new Map(2, 2, 0);
    const clone = instance.clone();

    expect(clone.value)
      .toEqual([[0, 0], [0, 0]]);
    expect(clone.EMPTY_VALUE)
      .toBe(0);
  });

  test('Clone matrix generated with params e, m', () => {
    const instance = new Map(null, null, 0, matrix);
    const clone = instance.clone();

    expect(clone.value)
      .toEqual(matrix);
    expect(clone.EMPTY_VALUE)
      .toBe(0);
  });
});

describe('[Class][Matrix] function copy', () => {
  test('Copy matrix generated without params', () => {
    const instance = new Map();

    expect(instance.copy())
      .toEqual([[0]]);
  });

  test('Copy matrix generated with params w, h, e', () => {
    const instance = new Map(2, 2, 0);

    expect(instance.copy())
      .toEqual([[0, 0], [0, 0]]);
  });

  test('Copy matrix generated with params e, m', () => {
    const instance = new Map(null, null, 0, [[0, 0], [0, 0]]);

    expect(instance.copy())
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
    const instance = new Map(null, null, 0, before);
    instance.crop({ x: 0, y: 0 }, { x: 2, y: 2 });

    expect(instance.value)
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
    const instance = new Map(null, null, 0, before);
    instance.insert(figure, { x: 0, y: 0 });

    expect(instance.value)
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
    const instance = new Map(null, null, 0, before);
    instance.reflectX();

    expect(instance.value)
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
    const instance = new Map(null, null, 0, before);
    instance.reflectY();

    expect(instance.value)
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
    const instance = new Map(null, null, 0, before);
    instance.rotateLeft();

    expect(instance.value)
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
    const instance = new Map(null, null, 0, before);
    instance.rotateRight();

    expect(instance.value)
      .toEqual(after);
  });
});

describe('[Class][Map] function getCoords', () => {
  test('Move x++ and y++ at center with trasferNo', () => {
    const instance = new Map(null, null, 0, matrix, trasferNo);

    const start = { x: 1, y: 1 };
    const delta = { x: 1, y: 1 };
    const expected = { x: 2, y: 2 };

    const response = instance.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at top border with trasferNo', () => {
    const instance = new Map(null, null, 0, matrix, trasferNo);

    const start = { x: 2, y: 2 };
    const delta = { x: 1, y: 1 };
    const expected = { x: 2, y: 2 };

    const response = instance.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at bottom border with trasferNo', () => {
    const instance = new Map(null, null, 0, matrix, trasferNo);

    const start = { x: 0, y: 0 };
    const delta = { x: -1, y: -1 };
    const expected = { x: 0, y: 0 };

    const response = instance.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at top border with trasferXY', () => {
    const instance = new Map(null, null, 0, matrix, trasferXY);

    const start = { x: 2, y: 2 };
    const delta = { x: 1, y: 1 };
    const expected = { x: 0, y: 0 };

    const response = instance.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at bottom border with trasferXY', () => {
    const instance = new Map(null, null, 0, matrix, trasferXY);

    const start = { x: 0, y: 0 };
    const delta = { x: -1, y: -1 };
    const expected = { x: 2, y: 2 };

    const response = instance.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });
});
