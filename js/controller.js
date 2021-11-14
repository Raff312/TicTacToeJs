import * as view from "./view.js";
import { PLAYER_X_MARKUP, Board } from "./model.js";

let gameBoard = new Board();

let username = "";
let currentMarkup = PLAYER_X_MARKUP;
let endGameMsg = "";
let stopGame = false;

let playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", () => {
    view.hideElement(document.getElementById("menu-wrapper"));
    view.showElement(document.getElementById("board-wrapper"));

    play();
});

function play() {
    view.clearBoard();
    initialize();
    gameLoop();
}

function initialize() {
    const usernameStr = prompt('Enter your name (Default name - "Guest")');
    username = usernameStr ? usernameStr : "Guest";

    setBoardSize();
    gameBoard.initialize();
    view.renderBoard(gameBoard.getDimension());
}

function setBoardSize() {
    let isSetSuccess = false;

    do {
        try {
            const size = prompt('Enter board size (Minimum - 3 Maximum - 10)');
            gameBoard.setDimension(+size);
            isSetSuccess = true;
        } catch (error) {
            alert(error);
            isSetSuccess = false;
        }
    } while (!isSetSuccess);
}

function gameLoop() {
    if (currentMarkup === gameBoard.getComputerMarkup()) {
        processComputerTurn(currentMarkup);
        endGameMsg = "PC wins the game.";
        currentMarkup = gameBoard.getUserMarkup();
        
        if (stopGame) {
            endGame();
            return;
        }
    }

    if (!gameBoard.isFreeSpaceEnough() && !stopGame) {
        endGameMsg = "Draw!";
        stopGame = true;
        endGame();
    }
}

function endGame() {
    view.updateEndMsg(endGameMsg);
}

window.onCellClick = (i, j) => {
    if (stopGame) {
        return;
    }

    processUserTurn(i, j, currentMarkup);

    if (stopGame) {
        endGame();
    } else {
        gameLoop();
    }
}

window.onResetClick = () => {
    resetGame();
    play();
}

window.backToMenu = () => {
    resetGame();
    view.hideElement(document.getElementById("board-wrapper"));
    view.showElement(document.getElementById("menu-wrapper"));
}

function resetGame() {
    currentMarkup = PLAYER_X_MARKUP;

    endGameMsg = "";
    view.updateEndMsg(endGameMsg);

    stopGame = false;
}

function processUserTurn(i, j, markup) {
    if (!gameBoard.setMarkupOnBoard(i, j, markup)) {
        return;
    }

    view.setMarkup(i, j, markup);
    stopGame = gameBoard.determineWinner(i, j) !== "";
    endGameMsg = `${username} wins the game.`;
    currentMarkup = gameBoard.getComputerMarkup(currentMarkup);
}

function processComputerTurn(markup) {
    if (!gameBoard.isFreeSpaceEnough()) {
        return;
    }

    let answerTaked = false;
    let i, j;
    do {
        i = getRandInt(0, gameBoard.getDimension() - 1);
        j = getRandInt(0, gameBoard.getDimension() - 1);

        try {
            if (gameBoard.setMarkupOnBoard(i, j, markup)) {
                stopGame = gameBoard.determineWinner(i, j) !== "";
                answerTaked = true;
            }
        } catch (error) {}
    } while (!answerTaked);

    view.setMarkup(i, j, markup);
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
