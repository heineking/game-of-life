'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));

class GameOfLife {
  static createGrid(x, y) {
    return repeat(() => repeat(() => false, x), y);
  }
  constructor() {
  }
}

module.exports = {
  GameOfLife
};