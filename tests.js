const { expect } = require('chai');
const {
  createGrid,
  neighbors,
  nextCellState,
  numberOfLiveNeighbors,
  readPlan,
} = require('./index');

describe('#readGrid', () => {
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
    expect(grid[1][1]).to.be.true;
    expect(grid[1][2]).to.be.true;
    expect(grid[2][1]).to.be.true;
    expect(grid[2][2]).to.be.true;
  });
});
describe('#numberOfLiveNeighbors', () => {
  it('should return the count of live neighbors', () => {
    const grid = createGrid(10, 10, () => false);
    grid[0][0] = true;
    const count = numberOfLiveNeighbors(grid, { x: 1, y: 1 });
    expect(count).to.equal(1);
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