'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));
const cell = (x, y) => ({x, y});

class GameOfLife {
  static createGrid(x, y, state) {
    return repeat(() => repeat(state, x), y);
  }
  static neighbors({x, y}, {h, w}) {
    const coordinates = [
      ...repeat(i => cell(x-1+i,y-1), 3),
      ...repeat(i => cell(x-1+i, y), 3),
      ...repeat(i => cell(x-1+i, y+1), 3),
    ];
    return coordinates
      .filter(xy => xy.x !== x || xy.y !== y)
      .filter(xy => xy.x >= 0 && xy.y >= 0)
      .filter(xy => xy.x < w && xy.y < h);
  }
  constructor() {
  }
}

module.exports = {
  GameOfLife
};