

export function hideElement(element) {
    element.classList.toggle("hide", true);
}

export function showElement(element) {
    element.classList.toggle("hide", false);
}

export function renderBoard(size) {
    const boardEl = document.getElementById("board");

    if (!boardEl) {
        throw new Error("There is no board");
    }

    boardEl.style.gridTemplateColumns = `repeat(${size}, auto)`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            boardEl.innerHTML += `<div class="cell" id="cell_${i}_${j}" onclick="onCellClick(${i}, ${j})">`;
        }
    }
}

export function clearBoard() {
    const boardEl = document.getElementById("board");
    if (boardEl) {
        boardEl.innerHTML = "";
    }
}

export function setMarkup(i, j, markup) {
    const cellEl = document.getElementById(`cell_${i}_${j}`);
    if (cellEl.innerText === "") {
        cellEl.innerText = markup;
        cellEl.classList.add("occupied");
    }
}

export function updateEndMsg(msg) {
    const endGameMsgEl = document.getElementById("end-game-msg");
    endGameMsgEl.innerText = msg;
}
