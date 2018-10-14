'use strict';
const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    return (cache[key] = fn(...args));
  };
};

const cell = (x, y) => ({x, y});
const createGrid = (w, h, state) => repeat(() => repeat(state, w), h);
const dimensions = (grid) => ({ h: grid.length, w: grid[0].length });
const forEachCell = (grid, f) => grid.forEach((row, y) => row.forEach((cell, x) => f(x, y, cell)));
const repeat = (f, n) => Array(n).fill(0).map((_, i) => f(i));

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

const neighbors = memoize(({x, y}, {h, w}) => {
  const coordinates = [
    ...repeat(i => cell(x-1+i,y-1), 3),
    ...repeat(i => cell(x-1+i, y), 3),
    ...repeat(i => cell(x-1+i, y+1), 3),
  ];

  const notCurrentCell = (xy) => xy.x !== x || xy.y !== y;
  const onlyPositiveCells = (xy) => xy.x >= 0 && xy.y >= 0;
  const withinBounds = (xy) => xy.x < w && xy.y < h;

  return coordinates
    .filter(notCurrentCell)
    .filter(onlyPositiveCells)
    .filter(withinBounds);
});

function numberOfLiveNeighbors(grid, cell) {
  return neighbors(cell, dimensions(grid))
    .reduce((count, { x, y }) => count + grid[y][x], 0)
}

function nextCellState(current, neighbors) {
  return current
    ? neighbors === 2 || neighbors === 3
    : neighbors === 3;
}

function nextGrid(grid) {
  const h = grid.length;
  const w = grid[0].length;
  const next = createGrid(w, h, () => false);
  forEachCell(grid, (x, y, current) => {
    next[y][x] = nextCellState(current, numberOfLiveNeighbors(grid, { x, y }));
  });
  return next;
};

function runGame(grid, render) {
  forEachCell(grid, render);
  setTimeout(() => {
    window.requestAnimationFrame(() => runGame(nextGrid(grid), render));
  }, 500);
}

function createGame(seed) {
  let grid = typeof seed === 'string' ? readPlan(seed) : seed;
  return (render) => {
    runGame(grid, render);
  };
}

// expose the module for both browser and node.js environments
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    const mod = { exports: {} };
    factory(mod.exports);
    Object.assign(global, {
      createGrid,
      neighbors,
      nextCellState,
      numberOfLiveNeighbors,
      readPlan,
      nextGrid,
      createGame,
      runGame,
      memoize,
    });
  }
})(this, function(exports) {
  'use strict';
  Object.assign(exports, {
    createGrid,
    neighbors,
    nextCellState,
    numberOfLiveNeighbors,
    readPlan,
    nextGrid,
    runGame,
    memoize,
  });
});
