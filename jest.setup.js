require('@testing-library/jest-dom');

if (typeof DOMRect === 'undefined') {
  global.DOMRect = class DOMRect {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    get top() {
      return this.y;
    }

    get right() {
      return this.x + this.width;
    }

    get bottom() {
      return this.y + this.height;
    }

    get left() {
      return this.x;
    }
  };
}
