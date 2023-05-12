import { Gradient } from './Gradient.js';

import { openPlayerConfig, closePlayerConfig, changePlayerName, clearPlayerName, savePlayerNames, players } from './config.js';

import { startNewGame, checkGameOver, resetBoard, playerNameValidity, switchPlayer, selectGameField } from './game.js';

// Create your instance
export let gradient = new Gradient();

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas');

export let invalidName = document.createElement('p');

export let resetPlayer1 = document.getElementById('clearPlayer1Data');

export let resetPlayer2 = document.getElementById('clearPlayer2Data');

export let editPlayer1Btn = document.getElementById('edit-player1-btn');

export let editPlayer2Btn = document.getElementById('edit-player2-btn');

export let overlay = document.getElementById('config-overlay');

export let backdrop = document.getElementById('backdrop');

export let cancelConfig = document.getElementById('cancel');

export let playerForm = document.querySelector('form');

export let error = document.getElementById('config-error');

export let startGameBtn = document.getElementById('start-game-btn');

export let gameArea = document.getElementById('active-game');

export let gameFields = document.querySelectorAll('#game-board div');

export let playerTurn = document.querySelector('#active-game').firstElementChild.nextElementSibling.firstElementChild;

export let gameOver = document.getElementById('game-over');

export let winnerName = document.getElementById('winner-name');

export let drawGame = document.getElementById('draw-game');

export let defaultDisplay = gameOver.innerHTML;

invalidName.textContent = 'Please enter a valid name!';

startGameBtn.insertAdjacentElement('afterend', invalidName);

invalidName.style.display = 'none';

editPlayer1Btn.addEventListener('click', openPlayerConfig);

editPlayer2Btn.addEventListener('click', openPlayerConfig);

resetPlayer1.addEventListener('click', clearPlayerName);

resetPlayer2.addEventListener('click', clearPlayerName);

cancelConfig.addEventListener('click', closePlayerConfig);

backdrop.addEventListener('click', closePlayerConfig);

playerForm.addEventListener('submit', changePlayerName);

startGameBtn.addEventListener('click', startNewGame);

startGameBtn.addEventListener('click', resetBoard);