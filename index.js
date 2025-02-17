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
            gameboard.createBoard();
        };
        switchActivePlayer();
    }

    const checkWinner = () => {
        let row = 0;
        let column = 0;
        for (row; row < 3; row++) {
            if (board[row] == board[row + 1] == board[row + 2]) {
                
            }
        }
    }

    return {
        playerOne,
        activePlayer,
        makePlay,
    }
}

gameboard.createBoard();
gameboard.printBoard();
const game = displayController();