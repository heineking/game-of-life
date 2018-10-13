'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));

class GameOfLife {
  static createGrid(x, y, state) {
    return repeat(() => repeat(state, x), y);
  }
  static neighbors() {
    const x = 1, y = 1;
    /*
      x x x
      x x x
      x x x
    */
    const coordinates = [
      ...repeat(i => [x-1+i, y-1], 3),
      ...repeat(i => [x-1+i, y], 3),
      ...repeat(i => [x-1+i, y+1], 3),
    ];
    return coordinates
      .filter(xy => xy[0] !== x || xy[1] !== y);
  }
  constructor() {
  }
}

module.exports = {
  GameOfLife
};