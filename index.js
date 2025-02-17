const gameboard = (function () {
    const board = [];

    let numberOfPlayers = 0;
    const getNumberOfPlayers = () => numberOfPlayers;
    const addNumberOfPlayers = () => numberOfPlayers++;

    for (let i = 0; i < board.length; i++) {
        board[i] = [];
        for (let j = 0; j < board.length; j++) {
            board[i][j] = '_';
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
    const playerOne = createPlayer('quim', 'X');
    const playerTwo = createPlayer('blan', 'O');

    const players = [
        playerOne,
        playerTwo,
    ];

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const switchActivePlayer = () => {
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }

    const makePlay = (x, y) => {
        if (gameboard.board[x][y] == '_') {
            gameboard.board[x][y] = getActivePlayer.marker;
            switchActivePlayer();
            gameboard.printBoard();
        }
    }

    return {
        playerOne,
        activePlayer,
        makePlay,
    }
}

const game = displayController();