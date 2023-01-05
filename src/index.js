'use strict';

export class Gameloop {
  constructor(params) {
    this.params = params;
    this.#init();
  }

  start() {
    if (this.isGameOver) {
      this.clear();
    }

    this.isPaused = false;
    this.interval = setInterval(this.#eventLoop.bind(this), this.SPEED_RATE);
  }

  stop() {
    this.isPaused = true;
    clearTimeout(this.interval);
  }

  setGameOver() {
    this.stop();
    this.isGameOver = true;
  }

  clear() {
    this.stop();
    this.#init();
  }

  #init() {
    this.interval = null;
    this.isGameOver = false;
    this.isPaused = false;

    this.SPEED_RATE = this.params.speedRate;
  }

  #eventLoop() {
    this.#update();
    this.#render();
    this.#draw();
    this.#eventHandler();
  }

  #update() { }

  #render() { }

  #draw() { }

  #eventHandler() { }
}

export default Gameloop;
