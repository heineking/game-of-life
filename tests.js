const { expect } = require('chai');
const { Cell } = require('./index');

// time: 16:50
describe('tests.js', () => {
  it('should work', () => {
    expect(true).to.equal(true);
  });
});

describe('game-of-life', () => {
  it('should define a Cell', () => {
    expect(Cell).to.not.equal(undefined);
  })
  // it('should kill a cell if not neighboring two living cells', () => {
    
  // });
});