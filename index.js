'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));

class GameOfLife {
  static createGrid(x, y, state) {
    return repeat(() => repeat(state, x), y);
  }
  static neighbors(x, y) {
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
      .filter(xy => xy[0] !== x || xy[1] !== y)
      .filter(xy => xy[0] >= 0 && xy[1] >= 0);
  }
  constructor() {
  }
}

module.exports = {
  GameOfLife
};