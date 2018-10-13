'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));
const cell = (x, y) => ({x, y});

class GameOfLife {
  static createGrid(w, h, state) {
    return repeat(() => repeat(state, w), h);
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
  static nextCellState(current, neighbors) {
    return current
      ? neighbors === 2 || neighbors === 3
      : neighbors === 3;
  }
  constructor(grid) {
    // private vars
    const $grid = JSON.parse(JSON.stringify(grid));

    const cells = (f) => {
      for(let x = 0; x < $grid[0].length; ++x) {
        for (let y = 0; y < $grid.length; ++y) {
          f(x, y, $grid[x][y]);
        }
      }
    };

    // utilities
    this.countOfLiveNeighbors = (cell) => {
      return GameOfLife
        .neighbors(cell, {h: $grid.length + 1, w: $grid[0].length + 1})
        .reduce((count, { x, y }) => count += $grid[x][y], 0);
    };

    const nextGeneration = () => {
      const h = $grid.length;
      const w = $grid[0].length; 
      const nextGrid = GameOfLife.createGrid(w, h, () => false);
      cells((x, y, current) => {
        const neighbors = this.countOfLiveNeighbors({ x, y });
        nextGrid[x][y] = GameOfLife.nextCellState(current, neighbors);
      });
      $grid = nextGrid;
    };

    this.tick = (next) => {
      this.nextGeneration();
      cells(next);
    };
  };
}

module.exports = {
  GameOfLife
};