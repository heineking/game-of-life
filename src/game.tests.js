const { expect } = require('chai');
const {
  createGrid,
  neighbors,
  nextCellState,
  numberOfLiveNeighbors,
  readPlan,
  nextGrid,
  forEachCell
} = require('./game');

const gridsAreEqual = (grid1, grid2) => {
  grid1 = typeof grid1 === 'string' ? readPlan(grid1) : grid1;
  grid2 = typeof grid2 === 'string' ? readPlan(grid2) : grid2;
  let areEqual = true; 
  forEachCell(grid1, (state, x, y) => {
    areEqual = areEqual && grid1[y][x] === state;
  });
  return areEqual;
};

describe('#nextGrid', () => {
  it('should create a blinker', () => {
    const plan = (
      `
        # # # # #
        # # @ # # 
        # # @ # #
        # # @ # #
        # # # # # 
      `
    );
    const next = nextGrid(readPlan(plan));
    expect(gridsAreEqual(next, `
      # # # # #
      # # # # #
      # @ @ @ #
      # # # # #
      # # # # # 
    `)).to.be.true;
  });
});

describe('#readPlan', () => {
  it('should convert a string representation to a grid', () => {
    const plan = (
      `
        # # # # 
        # @ @ # 
        # @ @ # 
        # # # #
      `
    );
    const grid = readPlan(plan);
    expect(grid.length).to.equal(4);
    expect(grid[0].length).to.equal(4);
    expect(gridsAreEqual(grid, plan)).to.be.true;
  });
});

describe('#numberOfLiveNeighbors', () => {
  it('should return the count of live neighbors', () => {
    const grid = readPlan(`
      # # # # #
      # # # # #
      # @ # # #
      # @ @ # #
      # # # # # 
    `);
    const count = numberOfLiveNeighbors(grid, { x: 2, y: 2 });
    expect(count).to.equal(3);
  });
});

describe('#nextCellState', () => {
  it('should return false if current state is true and neighbors is less than two', () => {
    expect(nextCellState(true, 1)).to.equal(false);
    expect(nextCellState(true, 0)).to.equal(false);
  });
  it('should return true if current state is true and neighbors is two or three', () => {
    expect(nextCellState(true, 2)).to.equal(true);
    expect(nextCellState(true, 2)).to.equal(true);
  });
  it('should return true if current state is false and neighbors is three', () => {
    expect(nextCellState(false, 3)).to.equal(true);
  });
});

describe('#createGrid', () => {
  it('should return a 2-dimensional array', () => {
    const grid = createGrid(10, 10, () => false);
    expect(grid.length).to.equal(10);
    grid.forEach(row => expect(row.length).to.equal(10));
  });
});

describe('#neighbors', () => {
  const cell = (x, y) => ({x, y});
  const rect = (h, w) => ({h, w});
  it('should return eight neigbhor coordinates when cell is not on a boundary', () => {
    const n = neighbors(cell(1, 1), rect(3, 3));
    expect(n.length).to.equal(8);
  });
  it('should return three neighbor coordinates when cell is top-left', () => {
    const n = neighbors(cell(0, 0), rect(3, 3));
    expect(n.length).to.equal(3);
  });
  it('should return three neighbor coordinates when cell is bottom-right', () => {
    const n = neighbors(cell(1, 1), rect(2, 2));
    expect(n.length).to.equal(3);
  });
  it('should return five neighbor coordinates when cell is on top row', () => {
    const n = neighbors(cell(0, 1), rect(3, 3));
    expect(n.length).to.equal(5);
  });
  it('should return three neighbor coordinates when cell is top-right', () => {
    const n = neighbors(cell(2, 2), rect(3, 3));
    expect(n.length).to.equal(3);
  });
  it('should return three neighbor coordinates when cell is bottom-left', () => {
    const n = neighbors(cell(0, 2), rect(3, 3));
    expect(n.length).to.equal(3);
  });
});
