// utilities
const elt = (name, attrs, ...children) => {
  const dom = document.createElement(name);
  Object.keys(attrs).forEach((attr) => dom.setAttribute(attr, attrs[attr]))
  children.forEach((child) => dom.appendChild(child));
  return dom;
};

const drawBoard = (grid) => {
  const drawCell = (x, y) => elt('td', { id: `cell-${x}-${y}` });
  const drawRow = (row, y) => elt('tr', {}, ...row.map((_, x) => drawCell(x, y)));
  return elt('table', {}, ...grid.map(drawRow));
};

const getElementById = memoize((id) => document.getElementById(id));

let running = false;
const board = document.querySelector('#board');
const start = document.getElementById('start');

start.onclick = () => {
  if (running) {
    alert('Game already running! Refresh browser to start new game');
    return;
  }
  const height = +document.getElementById('height').value;
  const width = +document.getElementById('width').value;
  const grid = createGrid(width, height, () => Math.random() < 0.5);
  board.appendChild(drawBoard(grid));
  const game = createGame(grid);
  running = true;
  game((x, y, alive) => {
    const cell = getElementById(`cell-${x}-${y}`); 
    cell.setAttribute('class', alive ? 'alive' : '');
  }); 
};
