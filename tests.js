const { expect } = require('chai');
const { Cell } = require('./index');

// time: 16:50
describe('tests.js', () => {
  it('should work', () => {
    expect(true).to.equal(true);
  });
});

describe('Cell', () => {
  it('should be defined', () => {
    expect(Cell).to.not.equal(undefined);
  });

  it('should be a class.', () => {
    expect(Cell.toString()).contains('class Cell');
  });

  it('should have a x,y coordinate', () => {
    const cell = new Cell();
    expect(cell.x).to.be.a('number');
    expect(cell.y).to.be.a('number');
  });
  // it('should kill a cell if not neighboring two living cells', () => {
    
  // });
});