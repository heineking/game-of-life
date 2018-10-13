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
  describe('#createGrid', () => {
    it('should return a 2-dimensional array', () => {
      const grid = GameOfLife.createGrid(10, 10, () => false);
      expect(grid.length).to.equal(10);
      grid.forEach(row => expect(row.length).to.equal(10));
    });
  });
  describe('#neighbors', () => {
    it('should return an array of eight neigbhor coordinates when x > 0 && y > 0', () => {
      const neighbors = GameOfLife.neighbors(1, 1, 3, 3);
      expect(neighbors.length).to.equal(8);
    });
    it('should return an array of three neighbor coordinates when x == 0 && y == 0', () => {
      const neighbors = GameOfLife.neighbors(0, 0, 3, 3);
      expect(neighbors.length).to.equal(3);
    });
    it('should return an array of three neighbor coordinates when x == 1 && y == 1 and height = 3 && width = 3', () => {
      const neighbors = GameOfLife.neighbors(1, 1, 2, 2);
      expect(neighbors.length).to.equal(3);
    });
  });
});
