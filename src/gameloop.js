'use strict';

export class Gameloop {
  constructor() {
    this.#init();
  }

  start() {
    if (this.isGameOver) {
      this.clear();
    }
    this.isPaused = false;
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
  }
}

export default Gameloop;
