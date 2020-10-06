let scores = {
    X: 5,
    O: -5,
    tie: 0
};

function bestMove() {
    let highestPoints = -Infinity;
    let moveX = 0;
    let moveY = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = AI;
                let points = getBestMove(board, AI);
                board[i][j] = '';
                if (points > highestPoints) {
                    highestPoints = points;
                    moveX = i;
                    moveY = j;
                }
            }
        }
    }
    board[moveX][moveY] = AI;
    open.splice(position(moveX, moveY), 1);

}

function getBestMove(board, turn) {
    let won = checkWinner();
    if (won !== null){
        return scores[won];
    }
    if (turn === AI) {
        let highestPoints = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = AI;
                    let points = getBestMove(board, player1);
                    board[i][j] = '';
                    highestPoints = Math.min(highestPoints, points);
                }
            }
        }
        console.log(highestPoints);
        return highestPoints;
    }
    else {
        let highestPoints = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = player1;
                    let points = getBestMove(board, AI);
                    board[i][j] = '';
                    highestPoints = Math.max(highestPoints, points);
                }
            }
        }
        console.log(highestPoints);
        return highestPoints;
    }
}