# Conway's Game of Life

This project was done as an exercise from a 10/13/2018 Meetup at [PairColumbus](www.paircolumbus.org) to practice test-driven-development, led by [Junilu Lacar](https://github.com/jlacar). The goal was to practice red-green-refactor TDD.

*The **Game of Life**, also known simply as **Life**, is a celluar automaton devised by the British mathematician John Horton Conway in 1970*
[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This is a toy program so there is no support for deploying to a live system.

## Prerequisites

* Node.js 10.x
* Chrome Browser

## Installing

To run the project open `./src/index.html` in Chrome. Press the `start` button after providing the height, width, and speed parameters.

## Running the tests

The tests are created with `mocha` as the testing framework and `chai` as the assertion library. You can find the tests at `./src/game.tests.js`. I did not aim for 100% test coverage because of some dependency on the global `window` object(s).

```
> npm run install
> npm test
```

## Future Development

The game works well for smaller grids but the performance starts to degrade as the grid size starts to go above ~20,000 cells. There is noticeable lag in the UI response. To mitigate this I think a buffer could be generated using a (Web Worker)[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers]. I did not implement this because using a `Web Worker` requires the file to be hosted and not on the file system.