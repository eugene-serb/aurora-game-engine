'use strict';

export class Gamepad {
  constructor(context) {
    this._context = context;
    this.#init();
  }

  #init() {
    if (!this.#checkGamepadSupport()) {
      return;
    }

    this.LISTENER_INTERRUPT = 10;
    this.KEYPRESS_INTERRUPT = 100;

    this._gamepadInterval = null;
    this._keypressCooldown = 0;

    this.#connectGamepad();
  }

  #connectGamepad() {
    window.addEventListener('gamepadconnected', () => {
      const update = () => {
        this._keypressCooldown += this.LISTENER_INTERRUPT;

        const [gamepad] = navigator.getGamepads();

        let isPressed = false;
        let button = null;

        gamepad.buttons.forEach((item, index) => {
          if (item.value === 1) {
            button = index;
            isPressed = true;
          }
        });

        if (!isPressed) {
          return;
        } else {
          this.#handle(button);
        }
      };

      this._gamepadInterval = setInterval(update, this.LISTENER_INTERRUPT);
    });
  }

  #handle(button) {
    if (this._keypressCooldown >= this.KEYPRESS_INTERRUPT) {
      if (button === 2) {
        if (this._context.isPaused) {
          this._context.start();
          this._keypressCooldown = 0;
        } else {
          this._context.stop();
          this._keypressCooldown = 0;
        }
      }

      if (button === 3) {
        clearInterval(this._gamepadInterval);
        this._context.clear();
        this._context.start();
        this._keypressCooldown = 0;
      }
    }
  }

  #checkGamepadSupport() {
    return 'getGamepads' in window.navigator;
  }
}

export default Gamepad;
