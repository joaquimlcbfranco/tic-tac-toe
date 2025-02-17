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

function displayController() {
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
        if (checkWinner()) {
            gameboard.printBoard();
            console.log(`Game over! The winner is ${getActivePlayer().name}`);
        };
        if (checkTie()) {
            gameboard.printBoard();
            console.log('It\'s a tie!');
        }
    }

    const checkWinner = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] == board[i][1] == board[i][2]) {
                return true;
            }
            if (board[0][i] == board[1][i] == board[2][i]) {
                return true;
            }
        }
        if (board[0][0] == board[1][1] == board[2][2]) {
            return true;
        }
        if (board[0][2] == board[1][1] == board[2][0]) {
            return true;
        }

        return false;
    }

    const checkTie = () => {
        const cellValue = board.find((value) => value == '_');
        if (cellValue == undefined) {
            return true;
        }

        return false;
    }

    return {
        playerOne,
        activePlayer,
        makePlay,
        checkWinner,
    }
}

gameboard.createBoard();
gameboard.printBoard();
const game = displayController();