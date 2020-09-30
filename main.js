const text = document.getElementById('text');
const btn = document.getElementById('doBtn');
const canvas = document.querySelector('canvas');
const xWinText = document.getElementById('xWin');
const oWinText = document.getElementById('oWin');
canvas.style.display = "none";
const ctx = canvas.getContext('2d');
const width = canvas.width = 400;
const height = canvas.height = 400;

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let index = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];

let boardMax = 256;

let player1 = 'X';
let player2 = 'O';
let tie = "tie";
let turn = player1;
var open = [];
var mouseClick = [];
var mouseClicked = false;
var state = 0;
var xWins = 0;
var oWins = 0;
var winner = null;

function start() {
    if (state === 0) {
        restart();
        canvas.style.display = 'block';
        gameState();
    }
}

function restart() {
    if (state === 2){
        swapDisplay();

    }
    turn = player1;
    winner = null;
    open.length = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            open.push([i, j]);
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }
    ctx.clearRect(0,0, 400, 400);
    draw();
}

function swapDisplay() {
    if (text.style.display !== 'none') {
        text.style.display = 'none';
    }
    else {
        text.style.display = 'block';
    }
}

function checkerFunc(a, b, c) {
    if (a === b && b === c) {
        if(a !== ''){
        return true;
        }
    }
}

function winScreen() {
    if (winner === player1) {
        xWins++;
        swapDisplay();
        text.innerHTML = `Player 1 wins they have ${xWins} total wins now!`;
        xWinText.innerHTML = `X's wins: ${xWins}` 
        state = 2;
    }
    else if (winner === player2) {
        oWins++;
        swapDisplay();
        text.innerHTML = `Player 2 wins they have ${oWins} total wins now!`;
        oWinText.innerHTML = `O's wins: ${oWins}` 
        state = 2;
    }
    else {
        swapDisplay();
        text.innerHTML = `No player won`;
        state = 2;
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (checkerFunc(board[i][0],board[i][1],board[i][2])) {
            return winner = board[i][0];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (checkerFunc(board[0][i],board[1][i],board[2][i])) {
            winner = board[0][i];
        }
    }
    if (checkerFunc(board[0][0],board[1][1],board[2][2])) {
        winner = board[0][0];
    }
    else if (checkerFunc(board[0][2],board[1][1],board[2][0])) {
        winner = board[0][2];
    }

    if (winner === null && open.length === 0) {
        winner = tie;

    }
    else if (winner === player1 || winner === player2) {
        winner;
    }
    else {
        winner = null;
    }

}
function boardSpace(axis) {
    if (mouseClick[axis] <= boardMax / 2) {
        return 0;
    }
    else if (mouseClick[axis] <= boardMax) {
        return 1;
    }
    else {
        return 2;
    }
}

//All draw functions

//Draw the grid
function drawGrid(width, height) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(width, 0);
    ctx.lineTo(width, 400);
    ctx.moveTo(width * 2, 0);
    ctx.lineTo(width * 2, 400);
    ctx.moveTo(0, height);
    ctx.lineTo(400, height);
    ctx.moveTo(0, height * 2);
    ctx.lineTo(400, height * 2);
    ctx.stroke();
}

//Draw an X when called
function drawX(xPos, yPos, width, height) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(xPos + 10, yPos + 10);
    ctx.lineTo(xPos + width - 10, yPos + height - 10);
    ctx.moveTo(xPos + width - 10, yPos + 10);
    ctx.lineTo(xPos + 10, yPos + height - 10);
    ctx.stroke();
}

//draw an O when called
function drawO(xPos, yPos, width, height) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(xPos + width / 2, yPos + height / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
}

//Handles all variables and loops through the board array and draws what is there
function draw() {
    let w = width / 3;
    let h = height / 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * i;
            let y = h * j;
            let spot = board[i][j];
            drawGrid(w, h);
            if (spot === player1) {
                drawX(x, y, w, h);
            }
            else if (spot === player2) {
                drawO(x, y, w, h);
            }
        }
    }
}

//gets the position of posX and posY in the index and removes it.
function position(posX, posY) {
    stringed = posY.toString() + posX.toString();
    for (let i = 0; i < index.length; i++) {
        if (stringed === index[i]) {
            index.splice(i, 1);
            return i;
        }
    }
    return -1;
}

//handles all player turn functions
function playerTurn() {
    if (mouseClicked === true) {
        let positionX = boardSpace(0);
        let positionY = boardSpace(1);
        if (board[positionX][positionY] === "") {
            board[positionX][positionY] = turn;
            open.splice(position(positionX, positionY), 1);
            draw();
            if (turn === player1) turn = player2;
            else turn = player1;
        }
        else {
            console.log('valid move please');
        }
    }
    else {
        mouseClicked = false;
    }
}

//get the mouse position ove the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Main gamestate that handles everythign when game is running
function gameState() {
    btn.removeEventListener("click", start);
    swapDisplay();
    state = 1;
    canvas.style.display = 'block';
    btn.innerHTML = 'Restart?';
    btn.addEventListener("click", restart);
    canvas.addEventListener('mouseup', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseClick = [Math.floor(mousePos.x), Math.floor(mousePos.y)]
        mouseClicked = true;
        if (turn === player1) {
            playerTurn();
        }
        else if (turn === player2) {
            playerTurn();
        }
        checkWinner();
        if (winner !== null) {
            winScreen();
        }
    });
}

btn.addEventListener("click", start);
