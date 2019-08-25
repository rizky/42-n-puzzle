// @flow
const term = require('terminal-kit').realTerminal ;
const _ = require('lodash');
const hash = require('object-hash');

const start/* : Puzzle */ = [
  [0, 2, 3,],
  [1, 4, 5,],
  [8, 7, 6,],
];

const goal/* : Puzzle */ = [
  [1, 2, 3,],
  [8, 0, 4,],
  [7, 6, 5,],
];

const steps/* Array<string> */ = [];
const closedSteps/* Array<string> */ = [];

const print_puzzle = (puzzle/* : Puzzle */) => {
  _.map(puzzle, (row) => {
    _.map(row, (number) => term('%s ', number));
    term('\n');
    }
  );
term('\n');
}

const getZero = (puzzle/* : Puzzle */) => {
  const row = _.findIndex(puzzle, (row) => _.includes(row, 0));
  const column = _.findIndex(puzzle[row], (number) => number === 0);
  const id = `${row}${column}`;
  return { id, column, row };
}

const move = (puzzle/* : Puzzle*/, direction/* : Direction */ )/* : Puzzle */ => {
  const { row, column } = getZero(puzzle);
  const newPuzzle = _.cloneDeep(puzzle);
  switch(direction) {
    case 'up':
      if ((row - 1) < 0) return puzzle;
      newPuzzle[row][column] = newPuzzle[row - 1][column]
      newPuzzle[row - 1][column] = 0;
      break;
    case 'down':
      if ((row + 1) > _.size(_.first(puzzle)) - 1) return puzzle;
      newPuzzle[row][column] = newPuzzle[row + 1][column]
      newPuzzle[row + 1][column] = 0;
      break;
    case 'right':
      if ((column + 1) > _.size(puzzle) - 1) return puzzle;
      newPuzzle[row][column] = newPuzzle[row][column + 1]
      newPuzzle[row][column + 1] = 0;
      break;
    case 'left':
      if ((column - 1) < 0) return puzzle;
      newPuzzle[row][column] = newPuzzle[row][column - 1]
      newPuzzle[row][column - 1] = 0;
      break;
  }
  return newPuzzle;
}

const stepExists = (puzzle/* : Puzzle */, steps/* : Array<string> */) =>
  _.findIndex(steps, (step) => step === hash(puzzle)) !== -1;

const backtrack = async (puzzle/* : Puzzle */) => {
  if (hash(puzzle) === hash(goal)) { print_puzzle(puzzle); return; }
  if (stepExists(puzzle, steps)) return;
  if (stepExists(puzzle, closedSteps)) return;
  steps.push(hash(puzzle));
  backtrack(move(puzzle, 'right'))
  backtrack(move(puzzle, 'left'))
  backtrack(move(puzzle, 'up'))
  backtrack(move(puzzle, 'down'))
  closedSteps.push(hash(puzzle));
  _.pull(steps, (step) => step === hash(puzzle));
}

backtrack(start);
