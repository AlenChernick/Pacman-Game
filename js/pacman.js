'use strict';
const PACMAN = '⍩⃝';

var gPacman;
function createPacman(board) {
  // TODO
  gPacman = {
    location: { i: 5, j: 7 },
    isSuper: false,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  // TODO: use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);

  // TODO: return if cannot move
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;

  // TODO: hitting a ghost?  call gameOver
  if (nextCell === GHOST && !gPacman.isSuper) {
    gameOver();
    return;
  }

  if (nextCell === FOOD) {
    // TODO: moving from corrent position:
    // TODO: update the model
    updateScore(1);
    gFood--;
    console.log(gFood);
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  if (gFood === 0) {
    gGhosts = [];
    init();
    var elBtn = document.querySelector('button');
    var elTxt = document.querySelector('h3');
    var elContainer = document.querySelector('.button-container');
    elBtn.style.display = 'block';
    elContainer.style.display = 'flex';
    elBtn.innerText = 'Play Again :)';
    elTxt.innerHTML = 'Victorious';
  }

  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
          var getGhost = gGhosts.splice(i, 1);
          gEatenGhost.push(getGhost[0]);
        }
      }
    } else {
      gameOver();
    }
  }
  if (nextCell === POWERFOOD) {
    updateScore(1);
    gPacman.isSuper = true;
    setTimeout(() => {
      gPacman.isSuper = false;
      gGhosts.push(...gEatenGhost);
      for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor();
      }
    }, 5000);
    gEatenGhost = [];
  }

  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);

  // TODO: Move the pacman to new location
  // TODO: update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // TODO: update the DOM
  renderCell(gPacman.location, PACMAN);
  // console.log(gEatenGhost);
}

function getNextLocation(ev) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  // TODO: figure out nextLocation
  switch (ev.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;

    case 'ArrowDown':
      nextLocation.i++;
      break;

    case 'ArrowLeft':
      nextLocation.j--;
      break;

    case 'ArrowRight':
      nextLocation.j++;
      break;
  }
  return nextLocation;
}
