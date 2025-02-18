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

    const printBoard = () => {
        for (let i = 0; i < height; i++) {
            const row = gameboard.board[i].join(' | ');
            console.log(`Row number: ${i} | ${row} |`);
        }
    }


    return {
        board,
        createBoard,
        printBoard,
    }
})();

function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return {
        name,
        marker,
        getScore,
        addScore,
    }
}

function gameController() {
    const board = gameboard.board;
    const playerOne = createPlayer('quim', 'X');
    const playerTwo = createPlayer('blan', 'O');

    const players = [
        playerOne,
        playerTwo,
    ];

    let activePlayer = players[0];
    const getActivePlayer  = () => activePlayer;
    const switchActivePlayer = () => {
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }

    const makePlay = (x, y) => {
        if (board[x][y] == '_') {
            board[x][y] = getActivePlayer().marker;
            gameboard.printBoard();
        }
        else {
            console.log('Not possible, square is already played');
            gameboard.printBoard();
        }
        checkWinner(getActivePlayer());
        switchActivePlayer();
    }

    const checkWinner = (player) => {
        console.log('entered');
        for (let i = 0; i < board.length; i++) {
            if (board[i].every((cell) => cell == player.marker)) {
                return console.log(`Game over! The winner is ${player.name}!`);
            }
            if (board[0][i] == player.marker && board[1][i] == player.marker && board[2][i] == player.marker) {
                return console.log(`Game over! The winner is ${player.name}!`);
            }
        }
        if (board[0][0] == player.marker && board[1][1] == player.marker && board[2][2] == player.marker) {
            return console.log(`Game over! The winner is ${player.name}!`);
        }
        if (board[0][2] == player.marker && board[1][1] == player.marker && board[2][0] == player.marker) {
            return console.log(`Game over! The winner is ${player.name}!`);
        }

        let cellCount = 0;
        for (let i = 0; i < board.length; i++) {
            for (value of board[i]) {
                if (value !== '_') cellCount++;
            }
        }
        if (cellCount == 9) return console.log('Game over! It\'s a tie!');
    }

    return {
        makePlay,
    }
}

gameboard.createBoard();
gameboard.printBoard();
const game = gameController();