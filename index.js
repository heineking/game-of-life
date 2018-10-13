'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));

class GameOfLife {
  static createGrid(x, y, state) {
    return repeat(() => repeat(state, x), y);
  }
  static neighbors(x, y) {
    return [];
  }
  constructor() {
  }
}

module.exports = {
  GameOfLife
};