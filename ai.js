function bestMove() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = AI;
                open.splice(position(moveX, moveY), 1);
            }
        }
    }
}


function getBestMove(board, turn) {
    return -1;
}