document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const divs = board.querySelectorAll("div");

    divs.forEach(function(div) {
        div.classList.add("square");
    });

    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    board.addEventListener('click', tictactoe);

    function tictactoe(e) {
        const square = e.target;
        const index = Array.from(divs).indexOf(square);

        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        square.classList.remove('hover');
        square.classList.add(currentPlayer);

        if (checkWin()) {
            gameActive = false;
            document.getElementById('status').classList.add('you-won');
            document.getElementById('status').textContent = `Congratulations! ${currentPlayer} is the Winner!`;
        } else if (isBoardFull()) {
            gameActive = false;
            document.getElementById('status').textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn.`;
        }
    }

    divs.forEach(function(square, index) {
        square.addEventListener('mouseenter', function() {
            if (!gameBoard[index] && gameActive) {
                square.classList.add('hover', currentPlayer);
            }
        });
        square.addEventListener('mouseleave', function() {
            square.classList.remove('hover', 'X', 'O');
        });
    });
});
