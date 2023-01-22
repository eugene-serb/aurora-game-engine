'use strict';

import Map from '../src/map.js';

describe('[Class][Map] constructor', () => {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  test('Construct with matrix in params', () => {
    const map = new Map(null, null, 0, matrix);

    expect(map)
      .not.toBeNull();
    expect(map.value)
      .toEqual(matrix);
    expect(map.transferX)
      .toBe(false);
    expect(map.transferY)
      .toBe(false);
  });

  test('Construct with matrix and transfers', () => {
    const map = new Map(null, null, 0, matrix, { x: true, y: true });

    expect(map)
      .not.toBeNull();
    expect(map.value)
      .toEqual(matrix);
    expect(map.transferX)
      .toBe(true);
    expect(map.transferY)
      .toBe(true);
  });
});

describe('[Class][Map] function getCoords', () => {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const trasferNo = { x: false, y: false };
  const trasferXY = { x: true, y: true };

  test('Move x++ and y++ at center with trasferNo', () => {
    const map = new Map(null, null, 0, matrix, trasferNo);

    const start = { x: 1, y: 1 };
    const delta = { x: 1, y: 1 };
    const expected = { x: 2, y: 2 };

    const response = map.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at top border with trasferNo', () => {
    const map = new Map(null, null, 0, matrix, trasferNo);

    const start = { x: 2, y: 2 };
    const delta = { x: 1, y: 1 };
    const expected = { x: 2, y: 2 };

    const response = map.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at bottom border with trasferNo', () => {
    const map = new Map(null, null, 0, matrix, trasferNo);

    const start = { x: 0, y: 0 };
    const delta = { x: -1, y: -1 };
    const expected = { x: 0, y: 0 };

    const response = map.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at top border with trasferXY', () => {
    const map = new Map(null, null, 0, matrix, trasferXY);

    const start = { x: 2, y: 2 };
    const delta = { x: 1, y: 1 };
    const expected = { x: 0, y: 0 };

    const response = map.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });

  test('Move x++ and y++ at bottom border with trasferXY', () => {
    const map = new Map(null, null, 0, matrix, trasferXY);

    const start = { x: 0, y: 0 };
    const delta = { x: -1, y: -1 };
    const expected = { x: 2, y: 2 };

    const response = map.getCoords(start, delta);

    expect(response).not.toBeNull();
    expect(response).toEqual(expected);
  });
});
