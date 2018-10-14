# Conway's Game of Life

This project was done as an exercise from a 10/13/2018 Meetup at [PairColumbus](www.paircolumbus.org) to practice test-driven-development, led by [Junilu Lacar](https://github.com/jlacar). The goal was to practice red-green-refactor TDD.

*The **Game of Life**, also known simply as **Life**, is a celluar automaton devised by the British mathematician John Horton Conway in 1970*
[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This is a toy program so there is no support for deploying to a live system.

## Prerequesites

* Node.js 10.x
* Chrome Browser

## Installing

To run the project open `./index.html` in Chrome. Press the `start` button after providing the height and width parameters.

## Running the tests

The tests are created with `mocha` as the testing framework and `chai` as the assertion library. You can find the tests at `./tests.js`. I did not aim for 100% test coverage because of some dependency on the global `window.document` object.

```
> npm run install
> npm test
```
