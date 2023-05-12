import { overlay, playerForm, error, playerTurn } from './app.js';
import { startNewGame, checkGameOver, resetBoard, playerNameValidity, switchPlayer, selectGameField, activePlayer } from './game.js';

export let savedPlayers = JSON.parse(localStorage.getItem('players'));

export let players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

if (Array.isArray(savedPlayers)) {
    players = savedPlayers;
    document.getElementById('player-1-data').textContent = players[0].name;
    document.getElementById('player-2-data').textContent = players[1].name;
}

export function startName(){
    playerTurn.textContent = players[0].name;
}

startName()

export let resetPlayer = 0;

export let editedPlayer;

export function clear() {
    resetPlayer = 0;
    editedPlayer = 0;
}

export function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid;
    overlay.style.display = 'flex';
    backdrop.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    backdrop.style.flexDirection = 'column';
}

export function closePlayerConfig() {
    overlay.style.display = 'none';
    backdrop.style.display = 'none';
    playerForm.firstElementChild.classList.remove('error');
    error.textContent = '';
    playerForm.firstElementChild.children[1].value = '';
    playerNameValidity()
}

export function changePlayerName(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let playerName = formData.get('playerName').trim();
    if (!playerName || playerName.length < 2) {
        event.target.firstElementChild.classList.add('error');
        error.textContent = 'Please enter a valid name!';
        return;
    }
    let updatedPlayerName = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerName.textContent = playerName;
    closePlayerConfig();
    players[editedPlayer - 1].name = playerName;
    console.log(players);
    playerTurn.textContent = players[editedPlayer - 1].name;
    savePlayerNames();
    playerNameValidity();
}

export function clearPlayerName() {
    resetPlayer = +event.target.dataset.resetid;
    let resetPlayerName = document.getElementById('player-' + resetPlayer + '-data');
    players[resetPlayer - 1].name = "PLAYER NAME";
    resetPlayerName.textContent = players[resetPlayer - 1].name;
    savePlayerNames();
    playerNameValidity();
}

export function savePlayerNames() {
    localStorage.setItem('players', JSON.stringify(players));
}
console.log(players)