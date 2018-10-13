const { expect } = require('chai');
const { GameOfLife } = require('./index');

// time: 16:50
describe('GameOfLife', () => {
  it('should have a working test environment', () => {
    expect(true).to.equal(true);
  });
  it('should be a class', () => {
    expect(GameOfLife.toString()).to.contain('class GameOfLife');
  });
  describe('#countOfLiveNeighbors', () => {
    it('should return the count of live neighbors', () => {
      const game = new GameOfLife();
      const count = game.countOfLiveNeighbors(0, 0);
      expect(count).to.equal(0);
    });
  });
  describe('#createGrid', () => {
    it('should return a 2-dimensional array', () => {
      const grid = GameOfLife.createGrid(10, 10, () => false);
      expect(grid.length).to.equal(10);
      grid.forEach(row => expect(row.length).to.equal(10));
    });
  });
  describe('#neighbors', () => {
    const cell = (x, y) => ({x, y});
    const rect = (h, w) => ({h, w});
    it('should return eight neigbhor coordinates when cell is not on a boundary', () => {
      const neighbors = GameOfLife.neighbors(cell(1, 1), rect(3, 3));
      expect(neighbors.length).to.equal(8);
    });
    it('should return three neighbor coordinates when cell is top-left', () => {
      const neighbors = GameOfLife.neighbors(cell(0, 0), rect(3, 3));
      expect(neighbors.length).to.equal(3);
    });
    it('should return three neighbor coordinates when cell is bottom-right', () => {
      const neighbors = GameOfLife.neighbors(cell(1, 1), rect(2, 2));
      expect(neighbors.length).to.equal(3);
    });
    it('should return five neighbor coordinates when cell is on top row', () => {
      const neighbors = GameOfLife.neighbors(cell(0, 1), rect(3, 3));
      expect(neighbors.length).to.equal(5);
    });
    it('should return three neighbor coordinates when cell is top-right', () => {
      const neighbors = GameOfLife.neighbors(cell(2, 2), rect(3, 3));
      expect(neighbors.length).to.equal(3);
    });
    it('should return three neighbor coordinates when cell is bottom-left', () => {
      const neigbhors = GameOfLife.neighbors(cell(0, 2), rect(3, 3));
      expect(neigbhors.length).to.equal(3);
    });
  });
});
