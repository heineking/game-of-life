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

  it('should have a x coordinate', () => {
    const cell = new Cell(1);
    expect(cell.x).to.equal(1);
  });

  it('should have a y coordinate', () => {
    const cell = new Cell(1,1);
    expect(cell.y).to.equal(1);
  });

  it('should take in a grid', () =>{
    const cell = new Cell(1, 1, [[]])
    expect(Array.isArray(cell.grid)).to.equal(true);
  });

  it('should know if it is alive', () => {
    // arrange
    const grid = [
      [true]
    ];
    const y = 0;
    const x = 0;

    // act
    const cell = new Cell(x, y, grid);

    // assert
    expect(cell.alive()).to.equal(true);
  });

  it('should maintain a list of neigbors', () => {
    const cell = new Cell(0,0, [[]]);
    expect(cell.neighbors).to.be.a('function');
  });
});