// Defining inital constants
const instructionsButton = document.querySelector("#instructions");
const snake = document.querySelector(".snake");
const food = document.querySelector(".food");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const currentScoreDisplay = document.querySelector(".score__current");
const highScoreDisplay = document.querySelector(".score__high");
// const gameGrid = document.querySelector(".game");
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


// Functions
const detectGridSize = () => {
    if (mediaQuery.matches){
        gridSize = 40;
    } else{
        gridSize = 24;
    }
    return gridSize;
}

const showInstructions = () => {
    alert(`Direct your snake to eat as much fruit as it can without crashing into itself or the wall!

Use the arrow keys to move. 
            
Click the start button to begin, or the reset button to reset the game.
            
Your current score is shown alongside the high score. Try your best to beat it!`);
}

const makeInitialSnake = () => {
    snake.innerHTML = `
    <div class="snake-div _1"></div>
    `;

    snakeRow = 2;
    snakeCol = 2;
    snakeGrid = `${snakeRow}/${snakeCol}/${snakeRow+1}/${snakeCol+1}`;
    snake.style.gridArea = snakeGrid;
    return snakeRow, snakeCol, snakeGrid;
} 

const getDirection = () => {
    switch(event.key || event.target.parentElement.value){
        case "ArrowRight":
            direction = "right";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowUp":
            direction = "up";
            break;
        default:
            break;
    }
    return direction;
}

const getSnakeGrid = () => {
    if (direction == "right"){
        snakeCol += 1;
    } else if (direction == "down"){
        snakeRow += 1;
    } else if (direction == "left"){
        snakeCol -= 1;
    } else if (direction == "up"){
        snakeRow -= 1;
    }
    return snakeRow, snakeCol;
}

const moveSnake = () => {
    getSnakeGrid();

    if ((snakeCol+1 >= gridSize+2) || (snakeRow+1 >= gridSize+2) || (snakeCol < 0) || (snakeRow < 0)){
        clearInterval(looping);
        handleGameOver();
        return;

    } else if ((snakeCol == foodCol) && snakeRow == foodRow){
        eatFood();
    }

    snakeGrid = `${snakeRow}/${snakeCol}/${snakeRow+1}/${snakeCol+1}`;
    snake.style.gridArea = snakeGrid;
    return;
}

const loopMoveSnake = () => {
     looping =  setInterval(moveSnake, 50);
     return looping;
}

const handleGameOver = () => {
    //clearInterval(looping);
    direction = "";
    alert(`Game Over!

You scored ${currentScore}. Well Done!`);
}

const resetGame = () => {
    clearInterval(looping);
    currentScoreDisplay.innerText = "0";
    food.style.display = "none";
    direction = "";
    makeInitialSnake();
}

const startGame = () => {
    clearInterval(moveSnake);
    addListenersOnStart();
    currentScore = 0;
    currentScoreDisplay.innerText = "0";
    renderFood();
    makeInitialSnake();
    direction = "right";
    loopMoveSnake()
    return;
}

const randomiseFoodGrid = () => {
    foodRow = Math.round(Math.random()*gridSize);
    foodCol = Math.round(Math.random()*gridSize);
    foodGrid = `${foodRow} / ${foodCol} / ${foodRow + 1} / ${foodCol + 1}`;
    return foodRow, foodCol, foodGrid;
}

const renderFood = () => {
    food.style.display = "inline-block";
    //////////////////////////////////////////////////////////////////WRITE CHECK TO SEE IF SNAKE ALREADY THERE
    randomiseFoodGrid();
    while ((food.style.gridArea == foodGrid) || snakeGrid == foodGrid){
        randomiseFoodGrid();
    }

    food.style.gridArea = foodGrid;
    return;// foodRow, foodCol;
}

const eatFood = () => {
    food.style.display = "none";
    currentScore += 1;
    currentScoreDisplay.innerText = currentScore;

    if (currentScore > highScore){
        highScore = currentScore;
        highScoreDisplay.innerText = highScore;
    }

    renderFood();
}

// const ensureInBox = (coord, min, max) => { //ensures randomly spawned food is is game box
//     finalmax1 = Math.min(coord, Math.max(min, max)) //finds smallest of coord and whichever is bigger of min or max
//     finalmax2 = Math.min(min, max) //finds smallest of min and max
//     return Math.max(finalmax1, finalmax2);
// }


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

window.addEventListener("load", detectGridSize);
mediaQuery.addEventListener("change", detectGridSize);

