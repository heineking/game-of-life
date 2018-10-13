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
  static nextCellState(neighbors) {
    if (neighbors < 2) {
      return false;
    } else if (neighbors === 2 || neighbors === 3) {
      return true;
    }
    return false;
  }
  constructor(grid) {
    // private vars
    const $grid = JSON.parse(JSON.stringify(grid));

    // utilities
    this.countOfLiveNeighbors = (cell) => {
      return GameOfLife
        .neighbors(cell, {h: $grid.length + 1, w: $grid[0].length + 1})
        .reduce((count, { x, y }) => count += $grid[x][y], 0);
    };
  }

}

module.exports = {
  GameOfLife
};