const gameboard = (function () {
    const height = 3;
    const board = [];

    const createBoard = () => {
        for (let i = 0; i < height; i++) {
            board[i] = [];
            for (let j = 0; j < height; j++) {
                board[i][j] = '_';
            }
        }
    }

    const reset = () => {
        for (let i = 0; i < height; i++) {
            board[i] = [];
            for (let j = 0; j < height; j++) {
                board[i][j] = '_';
            }
        }
        const boardSquares = document.querySelectorAll('.board-square');
        boardSquares.forEach((square) => {
            square.textContent = '';
        });
    }

    return {
        board,
        createBoard,
        reset,
    }
})();

function createPlayer(name, marker) {
    return {
        name,
        marker,
    }
}

const game = (() => {
    let gameRunning = true;
    const board = gameboard.board;

    const players = [
        createPlayer('Player 1', 'X'),
        createPlayer('Player 2', 'O'),
    ];

    let activePlayer = players[0];
    const getActivePlayer  = () => game.activePlayer;
    const switchActivePlayer = () => {
        game.activePlayer == players[0] ? game.activePlayer = players[1] : game.activePlayer = players[0];
    }

    const makePlay = (x, y, square) => {
        if (board[x][y] == '_') {
            board[x][y] = getActivePlayer().marker;
            square.textContent = board[x][y];
            checkWinner(getActivePlayer());
            if (gameRunning) switchActivePlayer();
        }
        else {
            alert('Not possible, square is already played');
        }

    }

    const checkWinner = (player) => {
        console.log('entered');
        for (let i = 0; i < board.length; i++) {
            if (board[i].every((cell) => cell == player.marker)) {
                gameOver(`Game over!<br>The winner is ${player.name}!`);
            }
            if (board[0][i] == player.marker && board[1][i] == player.marker && board[2][i] == player.marker) {
                gameOver(`Game over!<br>The winner is ${player.name}!`);
            }
        }
        if (board[0][0] == player.marker && board[1][1] == player.marker && board[2][2] == player.marker) {
            gameOver(`Game over!<br>The winner is ${player.name}!`);
        }
        if (board[0][2] == player.marker && board[1][1] == player.marker && board[2][0] == player.marker) {
            gameOver(`Game over!<br>The winner is ${player.name}!`);
        }

        let cellCount = 0;
        for (let i = 0; i < board.length; i++) {
            for (value of board[i]) {
                if (value !== '_') cellCount++;
            }
        }
        if (cellCount == 9) {
            gameOver('Game over!<br>It\'s a tie!')
        }
    }

    const dialog = document.querySelector('dialog');
    const winnerMessage = document.querySelector('.winner-message');
    const dialogButton = document.querySelector('dialog button[type="button"]')

    const gameOver = (message) => {
        gameRunning = false;
        winnerMessage.innerHTML = message;
        dialog.showModal();

        dialogButton.addEventListener('click', () => {
            gameboard.reset();
            players[0] = createPlayer('Player 1', 'X');
            players[1] = createPlayer('Player 2', 'O');
            game.activePlayer = players[0];

            dialog.close();
            gameRunning = true;
        });
    }

    return {
        activePlayer,
        players,
        makePlay,
    }
})();

const getUserInput = (() => {
    // Listen for clicks on each board square. Call game.makePlay function when clicked.
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach((square) => {
        square.addEventListener('click', () => {
            const row = +square.getAttribute('row');
            const column = +square.getAttribute('col');
            game.makePlay(row, column, square);
        });
    });

    // Custom error messages to help the user understand what is required in marker fields
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker) => {
        marker.addEventListener('input', (e) => {
            marker.setCustomValidity('');
        });
        marker.addEventListener('invalid', (e) => {
            marker.setCustomValidity('Please input a single character.')
        });
    });

    // Marker regular expression for 'server' side validation
    const markerRegEx = /[a-zA-Z]{1}/;
    
    // Setup left form's warning message
    const playerOneDiv = document.querySelector('.player-one');
    const warningLeft = document.createElement('p');
    warningLeft.classList.add('hide', 'warning');
    warningLeft.textContent = 'Please fill in the required fields';
    playerOneDiv.appendChild(warningLeft);

    // Listen for player one form submit, if not valid, show warning message. If valid create new players and replace the default ones
    const playerOneForm = document.querySelector('#player-one-form');
    playerOneForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const header = document.querySelector('.player-one h2');
        const name = document.querySelector('#player-one-name');
        const marker = document.querySelector('#player-one-marker');
        if (markerRegEx.test(marker.value) && name.value != '') {
            game.players[0] = createPlayer(name.value, marker.value);
            game.activePlayer = game.players[0];
            header.textContent = name.value;
            warningLeft.classList.add('hide');
            gameboard.reset();
        }
        else {
            warningLeft.classList.remove('hide');
        }
    })

    // Setup right form's warning message
    const playerTwoDiv = document.querySelector('.player-two');
    const warningRight = document.createElement('p'); 
    warningRight.classList.add('hide', 'warning');
    warningRight.textContent = 'Please fill in the required fields';
    playerTwoDiv.appendChild(warningRight);

    // Listen for player two form submit, if not valid, show warning message. If valid create new players and replace the default ones
    const playerTwoForm = document.querySelector('#player-two-form');
    playerTwoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const header = document.querySelector('.player-two h2');
        const name = document.querySelector('#player-two-name');
        const marker = document.querySelector('#player-two-marker');
        if (markerRegEx.test(marker.value) && name.value != '') {
            game.players[1] = createPlayer(name.value, marker.value);
            game.activePlayer = game.players[0];
            header.textContent = name.value;
            warningRight.classList.add('hide');
            gameboard.reset();
        }
        else {
            warningRight.classList.remove('hide');
        }
    });
})();

gameboard.createBoard();