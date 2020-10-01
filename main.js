//All elements created with text and classes appended to them
const div = document.getElementById('holder');
const div2 = document.createElement('div');
const div3 = document.createElement('div2');
const title = document.createElement('h1');
var titleText = document.createTextNode("Tic Tac Toe");
title.appendChild(titleText);
title.setAttribute('class', 'text-center py-5');
const text = document.createElement('h1');
div3.setAttribute('class', 'row');
const xWin = document.createElement('h4');
xWin.setAttribute('class', 'text-left col-6');
const oWin = document.createElement('h4');
oWin.setAttribute('class', 'text-right col-6');
const canvas = document.createElement('canvas');
canvas.setAttribute('class', 'mx-auto py-5');
const ctx = canvas.getContext('2d');
const width = canvas.width = 400;
const height = canvas.height = 400;
canvas.style.display = "none";
const para = document.createElement('h1');
var paraText = document.createTextNode("Would you like to play?");
para.appendChild(paraText);
para.setAttribute('class', 'text-center py-5');
const btn = document.createElement('button');
var btnText = document.createTextNode('Start?');
btn.appendChild(btnText);
btn.setAttribute('class', 'btn btn-lg btn-secondary text-center');
div2.setAttribute('class', 'd-flex justify-content-center py-5');

//appending to the div on html page
div.appendChild(title);
div.appendChild(div3);
div3.appendChild(xWin);
div3.appendChild(oWin);
div.appendChild(canvas);
div.appendChild(para);
div.appendChild(div2);
div2.appendChild(btn);


//create board variable
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
//create an index to see what is left on the board
let index = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];

//max board size set to 256 for math below
const boardMaxHeight = 340;
const boardMaxWidth = 256;

//make player 1 equal to X and 2 to Y then define tie. If it is first game make turn equal to player 1
let player1 = 'X';
let player1Name = '';
let player2 = 'O';
let player2Name = '';
let tie = "tie";

let turn = player1;

//makes open array mouseClick array and mouse click set to false
var open = [];
var mouseClick = [];
var mouseClicked = false;

//state, xWins, oWins equalt to 0 and winner equal to null
var state = 0;
var xWins = 0;
var oWins = 0;
var winner = null;

//first function to start the game
function start() {

    //if the state is equal to 0
    if (state === 0) {

        //Set the names of the players if they don't put anything deafult to player 1 and 2
        player1Name = window.prompt("Enter player 1's name: ");
        if (player1Name === null || player1Name === '') {
            player1Name = "Player 1";
        }
        player2Name = window.prompt("Enter player 2's name: ");
        if (player2Name === null || player2Name === '') {
            player2Name = "Player 2";
        }
        var xWinText = document.createTextNode(`${player1Name}'s Wins: 0`);
        xWin.appendChild(xWinText);
        var oWinText = document.createTextNode(`${player2Name}'s Wins: 0`);
        oWin.appendChild(oWinText);

        //call restart
        restart();

        //display canvas
        canvas.style.display = 'block';

        //call gameState
        gameState();
    }
}

//function to restart
function restart() {


    //if state is equal to 2
    if (state === 2) {

        //call swap display
        swapDisplay();

        //set canvas style to block
        canvas.style.display = "block";
    }
    console.log(board);
    //set turn to player 1, winner to null, and open's length to 0
    winner = null;
    open.length = 0;

    //Set color to background for starting player to show they are going
    if (turn === player1) {
        xWin.setAttribute('class', 'text-success bg-secondary text-left col-6');
        oWin.setAttribute('class', 'text-right col-6');
    }
    else if (turn === player2) {
        oWin.setAttribute('class', 'text-success bg-secondary text-right col-6');
        xWin.setAttribute('class', 'text-left col-6');
    }

    //push to open the values [i, j]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            open.push([i, j]);
        }
    }

    //loop thorugh the board 2d array and replace any characters with ''
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }

    //clear all drawings
    ctx.clearRect(0, 0, 400, 400);
    //draw
    draw();
}

//swapDisplay function
function swapDisplay() {

    //if the header below the canvas is not showing then stop displaying it and display the canvas
    if (para.style.display !== 'none') {
        para.style.display = 'none';
        canvas.style.display = 'block';
    }

    //else do the opposite
    else {
        para.style.display = 'block';
        canvas.style.display = 'none';
    }
}

//nice little checker function so i don't have to write some things out as much in the checkWinner function
function checkerFunc(a, b, c) {
    if (a === b && b === c) {
        if (a !== '') {
            return true;
        }
    }
}

//winScreen function checks if player1 won, player2 won, or if it was a tie. Then display teh correct results based on that.
function winScreen() {

    //if winner is equal to player 1 then add to player 1's wins call swapDisplay then change the text to match player 1 and set game state to 2 also sets next games starting player to player2
    if (winner === player1) {
        xWins++;
        swapDisplay();
        xWin.setAttribute('class', 'text-left col-6');
        oWin.setAttribute('class', 'text-right col-6');
        para.innerHTML = `${player1Name} wins they have ${xWins} total wins now!`;
        xWin.innerHTML = `${player1Name}'s Wins: ${xWins}`
        turn = player1;
        state = 2;
    }

    //else if the winner is equal to player 2 do the same as above besides changing player1 to player2 also sets next games starting player to player2
    else if (winner === player2) {
        oWins++;
        swapDisplay();
        xWin.setAttribute('class', 'text-left col-6');
        oWin.setAttribute('class', 'text-right col-6');
        para.innerHTML = `${player2Name} wins they have ${oWins} total wins now!`;
        oWin.innerHTML = `${player2Name}'s Wins: ${oWins}`;
        turn = player2;
        state = 2;
    }

    //finally if the two above are false then just say it is a tie.
    else {
        swapDisplay();
        xWin.setAttribute('class', 'text-left col-6');
        oWin.setAttribute('class', 'text-right col-6');
        para.innerHTML = `No player won`;
        state = 2;
    }
}

//function to check the winner
function checkWinner() {

    //will loop through each column and check if there is a winner
    for (let i = 0; i < 3; i++) {
        if (checkerFunc(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    //will loop through each row and check if there is a winner
    for (let i = 0; i < 3; i++) {
        if (checkerFunc(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    //checks diagonal from top left to bottom right
    if (checkerFunc(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }

    //checks diagonal from top right to bottom left
    else if (checkerFunc(board[0][2], board[1][1], board[2][0])) {
        winner = board[0][2];
    }

    //checks if winner is equal to null and the length of the open array is 0 
    if (winner === null && open.length === 0) {
        //makes winner equal to tie
        winner = tie;
    }

    //else if winner = player1 or winner = player2 then return the winner
    else if (winner === player1 || winner === player2) {
        winner;
    }

    //else winner is nothing
    else {
        winner = null;
    }
}

//board space function takes an axis which is just hte index of the array. Meaning x or y axis, return 0
function boardSpace(axis) {
    if (axis === 0) {
        //if mouseclick at the index of axis is less then or equal to 128
        if (mouseClick[axis] <= boardMaxWidth / 2) {
            return 0;
        }

        //else if mouseclick at the index of axis is less then or equal to 256, return 1
        else if (mouseClick[axis] <= boardMaxWidth) {
            return 1;
        }

        //if it is larger then that then return 2
        else {
            return 2;
        }
    }
    else {
        //if mouseclick at the index of axis is less then or equal to 128
        if (mouseClick[axis] <= boardMaxHeight / 2) {
            return 0;
        }

        //else if mouseclick at the index of axis is less then or equal to 256, return 1
        else if (mouseClick[axis] <= boardMaxHeight) {
            return 1;
        }

        //if it is larger then that then return 2
        else {
            return 2;
        }
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
    ctx.rect(0, 0, width * 3, height * 3);
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

    //set w and h to a thrid of width and height
    let w = width / 3;
    let h = height / 3;

    //loop through each board element
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            //set x and y equal to the width times the element in at the index
            let x = w * i;
            let y = h * j;
            let spot = board[i][j];

            //call to draw the grid
            drawGrid(w, h);

            //if the spot we are at is player1 then draw an X there
            if (spot === player1) {
                drawX(x, y, w, h);
            }

            //else if the spot we are at is player2 then draw an O there
            else if (spot === player2) {
                drawO(x, y, w, h);
            }
        }
    }
}

//gets the position of posX and posY in the index and removes it.
function position(posX, posY) {

    //make stringed equal to just the numbers x and y
    let stringed = posY.toString() + posX.toString();

    //loop through each index in the array index
    for (let i = 0; i < index.length; i++) {

        //if the stringed value is equal to index at i then splice that out of the array and return i
        if (stringed === index[i]) {
            index.splice(i, 1);
            return i;
        }
    }
    //else return -1 (fail case)
    return -1;
}

//handles all player turn functions
function playerTurn() {

    //Swap current players background and text color if it is their turn or not
    if (turn === player1) {
        xWin.setAttribute('class', 'text-left col-6');
        oWin.setAttribute('class', 'text-success bg-secondary text-right col-6');
    }
    else {
        oWin.setAttribute('class', 'text-right col-6');
        xWin.setAttribute('class', 'text-success bg-secondary text-left col-6');
    }

    //if mouse was clicked
    if (mouseClicked === true) {

        //set postionX and positionY to the boardSpace at each x or y axis
        let positionX = boardSpace(0);
        let positionY = boardSpace(1);
        //if the board position is empty
        if (board[positionX][positionY] === "") {

            //hide the text element
            para.style.display = "none";

            //set that spot to the X or O based upon the current player turn
            board[positionX][positionY] = turn;
            //splice that out of open array using postion() function
            open.splice(position(positionX, positionY), 1);

            //call draw
            draw();

            //if turn is player 1 then set turn to player 2 else set turn to player 1
            if (turn === player1) turn = player2;
            else turn = player1;

        }

        //if the board position wasn't valid tell the player 
        else {
            para.innerHTML = "Please pick a valid move";
            para.style.display = "block";
            console.log('valid move please');
        }
    }
    //if mouseClicked isn't true
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

    //remove the starting event click listener on the button.
    btn.removeEventListener("click", start);

    //call swapDisplay(), set state = 1, show the canvas, set the btn text to be "Restart?"
    swapDisplay();
    state = 1;
    canvas.style.display = 'block';
    btn.innerHTML = 'Restart?';

    //add event listener on the button to just restart
    btn.addEventListener("click", restart);

    //add event listener to canvas to get the mouse input
    canvas.addEventListener('mouseup', function (evt) {

        //gets teh mouse position in the canvas in relation to the event
        var mousePos = getMousePos(canvas, evt);

        //mouseClick is put into a array where the first element is x axis and second is y. This should range from 500/500
        mouseClick = [Math.floor(mousePos.x), Math.floor(mousePos.y)]
        mouseClicked = true;

        //if the winner is null then go through the player turn
        if (winner === null) {
            playerTurn();
            console.log(board);
        }

        //check for a winner after each player turn
        checkWinner();

        //if the winner exist then put the win screen up
        if (winner !== null) {
            winScreen();
        }
    });
}

btn.addEventListener("click", start);

