'use strict';

import Keyboard from '../src/keyboard.js';

describe('[Class][Timer] create instance', () => {
  const keyboard = new Keyboard();

  test('Object is being created', () => {
    expect(keyboard).not.toBeNull();
  });
});
