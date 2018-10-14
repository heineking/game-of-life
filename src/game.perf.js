const {
  createGrid,
  mapCells,
} = require('./game');

function stopwatch(start) {
  if (!start) return process.hrtime();
  const end = process.hrtime(start);
  return Math.round((end[0]*1000) + (end[1]/1000000));
}

const timer = (fn) => {
  const start = stopwatch();
  fn();
  return stopwatch(start);
};

const mapCellsPerf = (w, h) => {
  const grid = createGrid(w, h, () => false);
  const elapsed = timer(() => mapCells(grid, () => {}));
  console.log(`mapCells ${w}x${h} took ${elapsed} ms`);
}

mapCellsPerf(100, 100);
mapCellsPerf(250, 250);
mapCellsPerf(500, 500);
mapCellsPerf(1000, 1000);