'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));
const cell = (x, y) => ({x, y});

function createGrid(w, h, state) {
  return repeat(() => repeat(state, w), h);
}

const forEachCell = (grid, f) => {
  for(let x = 0; x < grid[0].length; ++x) {
    for (let y = 0; y < grid.length; ++y) {
      f(x, y, grid[x][y]);
    }
  }
};

function neighbors({x, y}, {h, w}) {
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

function countOfLiveNeighbors(grid, cell) {
  return neighbors(cell, { h: grid.length, w: grid[0].length })
    .reduce((count, { x, y }) => count += grid[x][y], 0);
}

function nextCellState(current, neighbors) {
  return current
    ? neighbors === 2 || neighbors === 3
    : neighbors === 3;
}

function generateNextGrid(grid) {
  const h = grid.length;
  const w = grid[0].length;
  const next = createGrid(grid[0].length, grid.length, () => false);
  forEachCell(grid, (x, y, current) => {
    next[x][y] = nextCellState(current, neighbors({ x, y }, { h, w }));
  });
  return next;
}

module.exports = {
  createGrid,
  neighbors,
  nextCellState,
  countOfLiveNeighbors
};