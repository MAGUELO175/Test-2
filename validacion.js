'use strict';

//selecting elements
//# only for ID //. only for classes
const objPlayer0 = document.querySelector('.player--0');
const objPlayer1 = document.querySelector('.player--1');

const objScore0 = document.querySelector('#score--0');
const objScore1 = document.getElementById('score--1');
const objCurrentScore0 = document.getElementById('current--0');
const objCurrentScore1 = document.getElementById('current--1');

const objDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score0 = 0;
let score1 = 0;

objScore0.textContent = 0;
objScore1.textContent = 0;

let currentScore = 0;
let totalScore = [0, 0];
let activePlayer = 0;
let IsPlaying = true;

const init = function () {
  currentScore = 0;
  totalScore = [0, 0];
  activePlayer = 0;
  IsPlaying = true;

  objScore0.textContent = 0;
  objScore1.textContent = 0;
  objCurrentScore0.textContent = 0;
  objCurrentScore1.textContent = 0;

  objDice.classList.add('hidden');
  objPlayer0.classList.remove('player--winner');
  objPlayer1.classList.remove('player--winner');
  objPlayer0.classList.add('player--active');
  objPlayer1.classList.remove('player--active');
};

init();

//SWITCH PLAYER
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //TOGGLE :::remove if exists or add  if not exists
  objPlayer0.classList.toggle('player--active');
  objPlayer1.classList.toggle('player--active');
};

//ROLLING THE DICE
function rollDice() {
  console.log(IsPlaying);

  if (IsPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    objDice.classList.remove('hidden');
    objDice.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add current dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swicth player
      switchPlayer();
    }
  }
}

btnRoll.addEventListener('click', rollDice);

//HOLDING THE SCORE
function holdScore() {
  if (IsPlaying) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      IsPlaying = false;
      objDice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
}

btnHold.addEventListener('click', holdScore);

//NEW GAME

btnNew.addEventListener('click', init);
