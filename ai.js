function bestMove() {
    let highestPoints = -9999;
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
    return -1;
}