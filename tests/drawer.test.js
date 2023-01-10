'use strict';

import Drawer from '../src/drawer.js';

describe('[Class][Drawer] constructor', () => {
  test('Construct without params', () => {
    const drawer = new Drawer();
    expect(drawer).toEqual({ error: 'Error on construct' });
  });
});

describe('[Class][Drawer] function draw', () => {
  test('Draw in object constructed without params', () => {
    const drawer = new Drawer();
    expect(drawer.draw()).toBe('Error on construct');
  });
});
