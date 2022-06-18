'use strict';
const WALL = '🏿';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = '🥩';
const CHERRY = '🍒';
var gGame = {
  score: 0,
  isOn: false,
};
var gFood = -8;
var gBoard;
var gIntervalCherries;

function init() {
  console.log('hello pacman');
  gBoard = buildBoard();
  console.table(gBoard);
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gIntervalCherries = setInterval(addCherry, 15000);
}

function buildBoard() {
  const SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFood++;
      if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 || (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
        gFood--;
      }

      if (
        (j === 1 && i > 7 && i < SIZE - 1) ||
        (j === 8 && i === 1 && i < 2 && i < SIZE - 1) ||
        (j === 1 && i === 1 && i < 2 && i < SIZE - 1) ||
        (j === 8 && i > 7 && i < SIZE - 1)
      ) {
        board[i][j] = POWERFOOD;
      }
    }
  }
  console.log(gFood);
  return board;
}

function updateScore(diff) {
  // TODO: update model and dom

  // Model
  gGame.score += diff;
  // DOM
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;
}

function gameOver() {
  // TODO

  gGame.isOn = false;
  // Some more stuff coming later
  if (!gGame.isOn) {
    console.log('Game Over');
    var elBtn = document.querySelector('button');
    var elContainer = document.querySelector('.button-container');
    var elTxt = document.querySelector('h3');
    printMat(gBoard, '.board-container');
    elBtn.style.display = 'inline-block';
    elContainer.style.display = 'flex';
    elTxt.innerHTML = 'You Lost';
    elTxt.style.color = 'red';
  }
}

function restartGame() {
  gFood = -1;
  gGhosts = [];
  init();
  var elContainer = document.querySelector('.button-container');
  var elBtn = document.querySelector('button');
  var elH2Txt = document.querySelector('h2 span');
  var elH3Txt = document.querySelector('h3');
  elBtn.style.display = 'block';
  elH3Txt.style.display = 'none';
  elContainer.style.display = 'none';
  gGame.score = 0;
  elH2Txt.innerText = gGame.score;
  gGame.isOn = true;
}

function addCherry() {
  var pos = getRandEmptyCell();
  if (!pos) return;
  // update model
  gBoard[pos.i][pos.j] = CHERRY;
  // update DOM
  renderCell(pos, CHERRY);
}
