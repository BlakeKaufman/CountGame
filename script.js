'use strict';
// grabbing buttons
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

// grabbing text

const p1TotalScore = document.getElementById('score--0');
const p1CurrentScore = document.getElementById('current--0');

const p2TotalScore = document.getElementById('score--1');
const p2CurrentScore = document.getElementById('current--1');

// dice img

const diceImg = document.querySelector('.dice');

// player
const playerOne = document.querySelector('.player--0');

const playerTwo = document.querySelector('.player--1');

// setting up score
let Currentscore = 0;
// functions
function addingScore(diceval) {
  let score = 0;
  switch (diceval) {
    case 1:
      score *= 0;
      break;
    case 2:
      score += 2;
      break;
    case 3:
      score += 3;
      break;
    case 4:
      score += 4;
      break;
    case 5:
      score += 5;
      break;
    case 6:
      score += 6;
      break;
  }
  return score;
}

function settingDiceImg(diceval) {
  diceImg.style.display = 'block';
  let newDiceImage = '';
  switch (diceval) {
    case 1:
      newDiceImage = 'dice-1.png';
      break;
    case 2:
      newDiceImage = 'dice-2.png';
      break;
    case 3:
      newDiceImage = 'dice-3.png';
      break;
    case 4:
      newDiceImage = 'dice-4.png';
      break;
    case 5:
      newDiceImage = 'dice-5.png';
      break;
    case 6:
      newDiceImage = 'dice-6.png';
      break;
  }
  return newDiceImage;
}
function clearGameboard() {
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  playerOne.classList.remove('player--winner');
  playerOne.classList.remove('name');
  playerTwo.classList.remove('player--winner');
  playerTwo.classList.remove('name');
  p2CurrentScore.textContent = 0;
  p1CurrentScore.textContent = 0;
  p1TotalScore.textContent = 0;
  p2TotalScore.textContent = 0;
  diceImg.style.display = 'none';
  Currentscore = 0;
}

function switchToPlayerOne() {
  playerTwo.classList.remove('player--active');
  playerOne.classList.add('player--active');
}
function switchToPlayerTwo() {
  playerOne.classList.remove('player--active');
  playerTwo.classList.add('player--active');
}

rollDice.addEventListener('click', function () {
  const diceNum = Math.trunc(Math.random() * 6) + 1;
  diceImg.src = settingDiceImg(diceNum);
  if (playerOne.classList.contains('player--active')) {
    Currentscore += addingScore(diceNum);
    if (addingScore(diceNum) == 0) {
      switchToPlayerTwo();
      Currentscore = 0;
    }
    p1CurrentScore.textContent = Currentscore;
  } else if (playerTwo.classList.contains('player--active')) {
    Currentscore += addingScore(diceNum);
    if (addingScore(diceNum) == 0) {
      switchToPlayerOne();
      Currentscore = 0;
    }
    p2CurrentScore.textContent = Currentscore;
  } else {
    diceImg.style.display = 'none';
  }
});

hold.addEventListener('click', function () {
  if (playerOne.classList.contains('player--active')) {
    p1TotalScore.textContent = Currentscore + Number(p1TotalScore.textContent);
    switchToPlayerTwo();
    p1CurrentScore.textContent = 0;
    Currentscore = 0;
  } else if (playerTwo.classList.contains('player--active')) {
    p2TotalScore.textContent = Currentscore + Number(p2TotalScore.textContent);
    switchToPlayerOne();
    p2CurrentScore.textContent = 0;
    Currentscore = 0;
  }
  if (p1TotalScore.textContent >= 75) {
    playerOne.classList.add('player--winner');
    playerOne.classList.add('name');
    playerOne.classList.remove('player--active');
    playerTwo.classList.remove('player--active');
    diceImg.style.display = 'none';
  } else if (p2TotalScore.textContent >= 75) {
    playerTwo.classList.add('player--winner');
    playerTwo.classList.add('name');
    diceImg.style.display = 'none';
  }
});

newGame.addEventListener('click', clearGameboard);
