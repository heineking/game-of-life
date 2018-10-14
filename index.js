'use strict';
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));
const cell = (x, y) => ({x, y});
const createGrid = (w, h, state) => repeat(() => repeat(state, w), h);
const forEachCell = (grid, f) => grid.forEach((row, y) => row.forEach((cell, x) => f(x, y, cell)))

function readPlan(plan) {
  return plan
    .trim()
    .split(/\r?\n/)
    .map((row) =>
      row
        .trim()
        .split(/\s/)
        .map((char) => char === '@')
    );
}

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

function numberOfLiveNeighbors(grid, cell) {
  return neighbors(cell, { h: grid.length, w: grid[0].length })
    .reduce((count, { x, y }) => {
      return count + grid[y][x];
    }, 0)
}

function nextCellState(current, neighbors) {
  return current
    ? neighbors === 2 || neighbors === 3
    : neighbors === 3;
}

function nextGrid(grid) {
  const h = grid.length;
  const w = grid[0].length;
  const next = createGrid(grid[0].length, grid.length, () => false);
  forEachCell(grid, (x, y, current) => {
    next[x][y] = nextCellState(current, numberOfLiveNeighbors(grid, { x, y }));
  });
  return next;
}

module.exports = {
  createGrid,
  neighbors,
  nextCellState,
  numberOfLiveNeighbors,
  readPlan,
  nextGrid
};