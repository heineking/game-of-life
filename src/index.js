// utilities
const getElementById = memoize((id) => document.getElementById(id));

const elt = (name, attrs, ...children) => {
  const dom = document.createElement(name);
  Object.keys(attrs).forEach((attr) => dom.setAttribute(attr, attrs[attr]));
  children.forEach((child) => dom.appendChild(child));
  return dom;
};

const drawGrid = (grid) => {
  const drawCell = (alive, x, y) => elt('td', { id: `cell-${x}-${y}`, class: alive ? 'alive' : '' });
  const drawRow = (row, y) => elt('tr', {}, ...row.map((alive, x) => drawCell(alive, x, y)));
  return elt('table', {}, ...grid.map(drawRow));
};

const renderNextGrid = (grid) => {
  forEachCell(grid, (alive, x, y) => {
    getElementById(`cell-${x}-${y}`).setAttribute('class', alive ? 'alive' : '');
  });
};

let timeoutId = null;
const run = (grid, ms) => {
  setTimeout(() => {
    renderNextGrid(grid);
    run(nextGrid(grid), ms);
  }, ms);
};

const start = document.getElementById('start');
let running = false;

start.onclick = () => {
  if (running) {
    alert('Please refresh browser to start new game!');
    return;
  }
  const width = +document.getElementById('width').value;
  const height = +document.getElementById('height').value;
  const speed = +document.getElementById('speed').value;

  const seed = createGrid(width, height, () => Math.random() < 0.5);

  board.innerHTML = '';
  board.appendChild(drawGrid(seed));
  run(seed, speed);
  running = true;
};
