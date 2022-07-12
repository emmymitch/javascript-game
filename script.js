// Defining inital constants
const instructionsButton = document.querySelector("#instructions");
const snake = document.querySelector(".snake");
const food = document.querySelector(".food");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const currentScoreDisplay = document.querySelector(".score__current");
const highScoreDisplay = document.querySelector(".score__high");
const gameGrid = document.querySelector(".game");
// const rightButton = document.querySelector("#right");
// const downButton = document.querySelector("#down");
// const leftButton = document.querySelector("#left");
// const upButton = document.querySelector("#up");
const directionButtons = document.querySelectorAll(".movement-button");
const mediaQuery = window.matchMedia("(min-width: 768px)");

let currentScore = 0;
let highScore = 0;
let snakeRow = 1;
let snakeCol = 1;
let foodRow = 20;
let foodCol = 20;
let snakeGrid = "";
let snakeGridArray = [];
const initialSnake = [1, 2];


// Functions
const detectScreenSize = () => {
    if (mediaQuery.matches){
        gridSize = 45;
    } else{
        gridSize = 24;
    }
    return gridSize;
}

const createGrid = () => {
    for (let i=0; i<(mediaQuery.matches ? 625 : 400); i++){ //ternary operator checks what size of grid to make
        let square = document.createElement("div");
        square.classList.add("gameDiv");

        //Make a big square of square divs
        gameGrid.appendChild(square);
    }
    if (mediaQuery.matches ? width=25 : width=20);
    return width;
}

const showInstructions = () => {
    alert(`Direct your snake to eat as much fruit as it can without crashing into itself or the wall!

Use the arrow keys to move. 
            
Click the start button to begin, or the reset button to reset the game.
            
Your current score is shown alongside the high score. Try your best to beat it!`);
}

const makeInitialSnake = (gridSquares) => {
    currentSnake = [...initialSnake];
    currentSnake.forEach((snakebit) => {
        gridSquares[snakebit].classList.add("snake");
    })

    return  currentSnake;
} 

const getDirection = () => {
    switch(event.key || event.target.parentElement.value){
        case "ArrowRight":
            direction = 1; //next div
            break;
        case "ArrowDown":
            direction = width; //next line
            break;
        case "ArrowLeft":
            direction = -1; //previous div
            break;
        case "ArrowUp":
            direction = -width; //previous line
            break;
        default:
            break;
    }
    return direction;
}

// const getSnakeGrid = () => {
//     if (direction == "right"){
//         snakeCol += 1;
//     } else if (direction == "down"){
//         snakeRow += 1;
//     } else if (direction == "left"){
//         snakeCol -= 1;
//     } else if (direction == "up"){
//         snakeRow -= 1;
//     }
//     return snakeRow, snakeCol;
// }

const moveSnake = (gridSquares) => {
    console.log(currentSnake)
    //Check not hitting wall
    //Bottom edge: snake head+width >= max grid div && going down
    if (((currentSnake[0] + width >= width**2) && (direction == width))
        //Top edge: opposite to bottom edge
        || ((currentSnake[0] - width <= 0) && (direction == -width))
        //Right edge: snake head/width gives remainder width-1 (it's on the last
        //square in a line) && going right
        || ((currentSnake[0]%width == width-1) && (direction == 1))
        //Left edge: opposite to right edge
        || ((currentSnake[0]%width == 0) && (direction == -1))
        ){
            clearInterval(looping);
            handleGameOver();
            return;

    //Check not hitting self
    } else if (gridSquares[currentSnake[0]+direction].classList.contains("snake")){
        clearInterval(looping);
        handleGameOver();
        return;

    //Check if eating food
    } else if (gridSquares[currentSnake[0]+direction].classList.contains("food")){
        eatFood();

    //Move if none of above are true
    } else{
        //Remove last snake bit
        let tail = currentSnake.pop();
        gridSquares[tail].classList.remove("snake");

        //Add new head
        currentSnake.unshift(currentSnake[0] + direction);
        gridSquares[currentSnake[0]].classList.add("snake");
    }
    return;
}

const loopMoveSnake = (gridSquares) => {
     looping =  setInterval(moveSnake(gridSquares), 50);
     return looping;
}

const handleGameOver = () => {
    direction = "";
    alert(`Game Over!

You scored ${currentScore}. Well Done!`);
}

const resetGame = () => {
    clearInterval(looping);
    currentScoreDisplay.innerText = "0";
    direction = "";
    gameGrid.innerHTML = "";
    //makeInitialSnake();
}

const startGame = () => {
    gameGrid.innerHTML = "";
    currentScore = 0;
    currentScoreDisplay.innerText = "0";

    addListenersOnStart();

    createGrid();
    const gridSquares = document.querySelectorAll(".gameDiv");

    renderFood(gridSquares);

    makeInitialSnake(gridSquares);
    direction = 1;
    loopMoveSnake(gridSquares)
    return;
}

const randomiseFood = () => {
    foodPos = Math.round(Math.random()*gridSize);
    return foodPos;
}

const renderFood = (gridSquares) => {
    randomiseFood();

    //Check if snake already there
    while (gridSquares[foodPos].classList.contains("snake")){
        randomiseFood();
    }

    gridSquares[foodPos].classList.add("food")
    return;
}

const eatFood = () => {
    if (currentScore > highScore){
        highScore = currentScore;
        highScoreDisplay.innerText = highScore;
    }

    expandSnake();
    renderFood();
}

const expandSnake = () => {
    gridSquares[currentSnake[0]+direction].classList.remove("food");
    gridSquares[tail].classList.add("snake");
    currentSnake.push(tail);
}



// Event Listeners
const addListenersOnStart = () => {
    resetButton.addEventListener("click", resetGame);

    directionButtons.forEach((button) => {
        button.addEventListener("click", getDirection);
    })
    
    window.addEventListener("keydown", getDirection);
};

startButton.addEventListener("click", startGame);
instructionsButton.addEventListener("click", showInstructions);

window.addEventListener("load", detectScreenSize);
mediaQuery.addEventListener("change", detectScreenSize);

