'use strict';
// index.js
class Cell {
  constructor(x, y, grid){
    this.x = x;
    this.y = y;
    this.grid = grid;
  }

  alive() {
    return this.grid[this.x][this.y];
  }

  neighbors(){

  }
}
module.exports = {
  Cell,
};