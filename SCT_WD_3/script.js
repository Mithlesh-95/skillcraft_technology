document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-game');
    const scoreX = document.getElementById('score-x');
    const scoreO = document.getElementById('score-o');
    const trophy = document.querySelector('.trophy-icon');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let gameActive = true;
    let scores = { X: 0, O: 0 };

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.dataset.symbol = currentPlayer;

        const [winner, winningLine] = checkWinner();
        if (winner) {
            gameActive = false;
            status.textContent = `Player ${winner} Wins!`;
            scores[winner]++;
            updateScores();
            highlightWinningCells(winningLine);
            trophy.classList.add('active');
        } else if (gameBoard.every(cell => cell !== null)) {
            gameActive = false;
            status.textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner() {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return [gameBoard[a], combo];
            }
        }
        return [null, null];
    }

    function highlightWinningCells(winningLine) {
        if (!winningLine) return;
        winningLine.forEach(index => {
            cells[index].classList.add('winner');
        });
    }

    function updateScores() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
    }

    function resetGame() {
        gameBoard = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        status.textContent = "Player X's Turn";
        trophy.classList.remove('active');
        
        cells.forEach(cell => {
            cell.className = 'cell';
            delete cell.dataset.symbol;
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);
});