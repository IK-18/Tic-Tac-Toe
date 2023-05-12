import { overlay, invalidName, gameFields, gameArea, playerTurn, gameOver, winnerName, drawGame } from './app.js';
import { clear, players, startName, savedPlayers,  } from './config.js';

export let gameField;

export function addFields() {
    for (gameField of gameFields) {
        gameField.addEventListener('click', selectGameField);
    }
}

export let gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

export let activePlayer = 0;

export let currentRound = 0;

export function startNewGame(event) {
        playerNameValidity();
        gameArea.style.display = 'block';
        startName()
        addFields()
}

export function checkGameOver() {
    for (let i = 0; i < 3; i++) {
        if (((gameData[i][0] > 0) && (gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2])) ||
            ((gameData[0][i] > 0) && (gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i])) ||
            ((gameData[0][0] > 0) && (gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2])) ||
            ((gameData[0][2] > 0) && (gameData[0][2] === gameData[1][1] && gameData[1][1] === gameData[2][0]))
        ) {
            playerTurn.parentElement.style.display = 'none';
            gameOver.style.display = 'block';
            winnerName.textContent = players[activePlayer].name;
            gameOver.firstElementChild.style.display = 'block';
            drawGame.style.display = 'none';
            gameArea.style.pointerEvents = 'none';
            return;
        }
    }
    if (currentRound === 9) {
        playerTurn.parentElement.style.display = 'none';
        gameOver.style.display = 'block';
        gameOver.firstElementChild.style.display = 'none';
        drawGame.style.display = 'block';
        return;
    }
}

export function resetBoard() {
    for (gameField of gameFields) {
        gameField.classList.remove('disabled');
        gameField.textContent = '';
        addFields()
    }
    gameData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    clear();
    activePlayer = 0;
    currentRound = 0;
    gameOver.style.display = 'none';
    playerTurn.parentElement.style.display = 'block';
    gameArea.style.pointerEvents = 'auto';
    playerNameValidity();
}

export let value

export function playerNameValidity() {
    if (players[0].name !== 'PLAYER NAME' && players[1].name !== 'PLAYER NAME') {
        invalidName.style.display = 'none';
        value = true
    } else {
        invalidName.style.display = 'block';
        gameArea.style.display = 'none';
        value = false
    }
}

export function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    playerTurn.textContent = players[activePlayer].name;
}

export let selectedColumn

export let selectedRow

export function selectGameField(event) {
    selectedColumn = event.target.dataset.col - 1;
    selectedRow = event.target.dataset.row - 1;
    if (gameData[selectedRow][selectedColumn] > 0) {
        return;
    }
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    currentRound++;
    checkGameOver();
    switchPlayer();
}