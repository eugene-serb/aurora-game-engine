'use strict';

export class Keyboard {
  constructor(target, context) {
    this._target = target;
    this._context = context;
    this.#handle();
  }

  #handle() { }
}

export default Keyboard;
