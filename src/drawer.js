'use strict';

export class Drawer {
  constructor(container, matrix) {
    if (!container || !matrix) {
      this.error = 'Error on construct';
      return this;
    }

    this.$container = container;
    this.matrix = matrix;
    this.#init();
  }

  draw() {
    if (!this.$container || !this.matrix) return this.error;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let column = 0; column < this.matrix.length; column++) {
      for (let row = 0; row < this.matrix[column].length; row++) {
        this.context.fillStyle = this.matrix[column][row].color[this.theme];
        this.context.fillRect(
          column * this.cellWidth,
          row * this.cellHeight,
          this.cellWidth,
          this.cellHeight,
        );
      }
    }
  }

  #init() {
    this.$container.innerHTML = '';

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.$container.appendChild(this.canvas);

    this.#updateSizes();

    window.addEventListener('resize', () => {
      this.#updateSizes();
    });

    this.media = window.matchMedia('(prefers-color-scheme: dark)');
    this.#updateColours(this.media);

    this.media.addEventListener('change', () => {
      this.#updateColours(this.media);
    });
  }

  #updateSizes() {
    const width = this.matrix.length;
    const height = this.matrix[0].length;
    const ratio = height / width;

    this.canvas.width = 0;
    this.canvas.height = 0;

    this.canvas.width = this.$container.offsetWidth;
    this.canvas.height = this.canvas.width * ratio;

    this.cellWidth = this.canvas.width / width;
    this.cellHeight = this.canvas.height / height;

    this.draw();
  }

  #updateColours(media) {
    if (media.matches) {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }

    this.draw();
  }
}

export default Drawer;
