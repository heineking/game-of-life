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
    it('should return an array', () => {
      const grid = GameOfLife.createGrid();
      expect(grid).to.be.a('Array');
    });
  });
});
