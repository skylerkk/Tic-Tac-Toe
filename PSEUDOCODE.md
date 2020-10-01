# PseudoCode

## Elements

Title - which will be a h1
Scores for both players - each will be h4's
Display text for who one and intro screen - h1
Canvas that is 400 by 400 - canvas
Button that will start as "Start?" and turns to "Restart?" - btn

## Start

Declare all variables that are needed
Making the canvas and all the grid drawing should be done

function startGame
//set player names
//call restartGame
//run gameState

function restartGame
//if this isn't the first turn then swap the displays to show the canvas
//set winner to nothing
//set playerColors for current player turn
//make the open array to show all the open spaces
//clear out the board array in case there are some spaces filled from previous games
//clear the canvas
//draw new board

function swapDisplay
//if paragraph style is showing then make it not showing and show canvas
//else do the opposite

function checkerFunction (takes in 3 variables)
//check if var1 is equal to var 2 and if var2 is equal to var 3 if so return true

function winScreen
//if first player is the winner
    //add to their wins
    //swap the display to stop the user from inputing
    //set the winning display message 
    //remove the coloring for the turn
    //set winning player1 to the turn variable so they go first next restart
//else if second player is the winner
    //add to their wins
    //swap the display to stop the user from inputing
    //set the winning display message 
    //remove the coloring for the turn
    //set winning player2 to the turn variable so they go first next restart
//else
    //swap the display to stop the user from inputing
    //remove coloring from turn
    //set tie display message

function checkWinner
//for loop through each x
    //if checkerFucntion(board[x][0],board[x][1],board[x][2]) is true then return what is in the space
//for loop through each y
    //if checkerFucntion(board[0][y],board[1][y],board[2][y]) is true then return what is in the space
//if diagonal from top left to bottom right is equal to each other with the checkFunciton return what is in that space
//if the other diagonal is equal to eachother then return what is in that space
//if winner equals null and there are no spaces left in open array then set winner = tie
//else if winner is equal to either player then winner = winner
//else set winner equal to null

function boardSpace(axis)
//if axis is equal to 0
    //if mouseClick[axis] is less then 1/3 the width then  return 0
    //else if mouseClick[axis] is less then 2/3 the width then return 1
    //else return 2
//if axis is equal to 1
    //if mouseClick[axis] is less then 1/3 the height then  return 0
    //else if mouseClick[axis] is less then 2/3 the height then return 1
    //else return 2

function drawGrid
//draws grid

function drawX
//draws all X's

function drawO
//draws all O's

function draw
//let a variable equal to a third of the height and a third of the width
//2 for loops, for each position on the board loop through it and if it has a X or O call drawX or drawO

function position(xposition and yposition)
//make a variable called stringed and set it equal to posY and posX in string form
//loop for index.length times which is 9
    //if stringed variable is equal to the index[i] then splice that out and return that i
//return -1

function playerTurn()
//if mouse was clicked
    //if click was in a valid spot
        //if turn is player1 then swap the turn color from player1 to player 2
        //else do opposite
        //hide text element
        //set the board[x][y] equal to the turn
        //take the position out of open spots
        //call draw
        //if it's player1 turn set to player2 turn
        //else do opposite
    //else ask the player to pick a valid move
//else set mouse to not clicked

function getMousePos(canvas, event)
//create a varaible that holds size of the canvas and where it is on the canvas
//return the click event position - the canvas postion for x and y

function gameState()
//remove the start on click event listener
//swap the displays
//state = 1
//set text of button and display the canvas
//add event listener to restart
//add a canvas event listener to mouseUp so after someone clicks that runs a funcntion
    //get the mousePosition with getMousePos and put it in a mousePos variable
    //make a new varialbe that does mousePos of x floor and mousePos of y floor so there are no decimals
    //if winner is not null then call playerTurn() 
    //checkWinner after
    //if there is a winner then call the winnerScreen()
