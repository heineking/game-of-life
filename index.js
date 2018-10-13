'use strict';
// index.js
class Cell {
  constructor(x, y, grid){
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.alive = true;
  }
}

module.exports = {
  Cell,
};