document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const divs = board.querySelectorAll("div");

    divs.forEach(function(div) {
        div.classList.add("square"); //using classList, adds the class "square" to each div
    });

    let gameBoard = ['', '', '', '', '', '', '', '', '']; // empty array to keep track of the state of the game after each square is clicked 
    let currentPlayer = 'X'; //default player
    let gameActive = true; //tracker to see if the game is still active

    board.addEventListener('click', tictactoe); //if board is clicked, the function "tictactoe" runs through the if statements

    //runs each time a square is clicked
    function tictactoe(e) {
        const square = e.target;
        const index = Array.from(divs).indexOf(square);

        if (gameBoard[index] || !gameActive) return; // If the square is already occupied or the game is not active, exit the function.

        gameBoard[index] = currentPlayer;
        square.classList.remove('hover'); //remove hover after square is clicked
        square.textContent = currentPlayer; //set text to the curent player 

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

    //Exercise 4 - Check for the winner and update the status
    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal from top-left to bottom-right
            [2, 4, 6]  // diagonal from top-right to bottom-left
        ];
        
        // Use the some() method to check if any of the winning combinations are satisfied.
        return winningCombinations.some((combination) => {
            const [a, b, c] = combination;

            // Check if the squares at indices a, b, and c all have the same non-empty value, indicating a win.
            return (
                gameBoard[a] &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]
            );
        });
    }
    
    function isBoardFull() {
        return gameBoard.every((cell) => cell !== '');
    }
});
