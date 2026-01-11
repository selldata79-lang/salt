const BOARD_SIZE = 10;
const NUM_MINES = 10;

const boardElement = document.getElementById('game-board');
const minesCountElement = document.getElementById('mines-count');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');
const mineImageUpload = document.getElementById('mine-image-upload');

let board = [];
let mineLocations = [];
let revealedCells = 0;
let flaggedCells = 0;
let gameOver = false;
let time = 0;
let timerInterval;
let mineImageURL = null;

mineImageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        mineImageURL = URL.createObjectURL(file);
    }
});

function initGame() {
    // Reset game state
    gameOver = false;
    revealedCells = 0;
    flaggedCells = 0;
    time = 0;
    clearInterval(timerInterval);
    timerElement.textContent = time;
    minesCountElement.textContent = NUM_MINES;
    boardElement.innerHTML = '';
    board = [];
    mineLocations = [];
    mineImageURL = null;
    mineImageUpload.value = '';

    // Create board
    for (let r = 0; r < BOARD_SIZE; r++) {
        const row = [];
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = {
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0,
                element: createCellElement(r, c)
            };
            row.push(cell);
            boardElement.appendChild(cell.element);
        }
        board.push(row);
    }

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const r = Math.floor(Math.random() * BOARD_SIZE);
        const c = Math.floor(Math.random() * BOARD_SIZE);
        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            mineLocations.push([r, c]);
            minesPlaced++;
        }
    }

    // Calculate adjacent mines
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (!board[r][c].isMine) {
                board[r][c].adjacentMines = countAdjacentMines(r, c);
            }
        }
    }
}

function createCellElement(r, c) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.row = r;
    cellElement.dataset.col = c;
    cellElement.addEventListener('click', () => handleCellClick(r, c));
    cellElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        handleCellRightClick(r, c);
    });
    return cellElement;
}

function countAdjacentMines(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc].isMine) {
                count++;
            }
        }
    }
    return count;
}

function handleCellClick(r, c) {
    if (gameOver || board[r][c].isRevealed || board[r][c].isFlagged) return;

    if (time === 0) {
        startTimer();
    }

    const cell = board[r][c];
    cell.isRevealed = true;
    cell.element.classList.add('revealed');
    revealedCells++;

    if (cell.isMine) {
        endGame(false);
        return;
    }

    if (cell.adjacentMines > 0) {
        cell.element.textContent = cell.adjacentMines;
    } else {
        revealNeighbors(r, c);
    }

    checkWinCondition();
}

function handleCellRightClick(r, c) {
    if (gameOver || board[r][c].isRevealed) return;

    const cell = board[r][c];
    cell.isFlagged = !cell.isFlagged;
    if (cell.isFlagged) {
        cell.element.classList.add('flagged');
        flaggedCells++;
    } else {
        cell.element.classList.remove('flagged');
        flaggedCells--;
    }
    minesCountElement.textContent = NUM_MINES - flaggedCells;
}

function revealNeighbors(r, c) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                handleCellClick(nr, nc);
            }
        }
    }
}

function endGame(isWin) {
    gameOver = true;
    clearInterval(timerInterval);
    mineLocations.forEach(([r, c]) => {
        const cell = board[r][c];
        cell.element.classList.add('mine');
        if (mineImageURL) {
            cell.element.style.backgroundImage = `url(${mineImageURL})`;
        }
    });

    if (isWin) {
        alert('You win!');
    } else {
        alert('Game over!');
    }
}

function checkWinCondition() {
    if (revealedCells === BOARD_SIZE * BOARD_SIZE - NUM_MINES) {
        endGame(true);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timerElement.textContent = time;
    }, 1000);
}


resetButton.addEventListener('click', initGame);

initGame();