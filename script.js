// Defining inital constants
const instructionsButton = document.querySelector("#instructions");
const snake = document.querySelector(".snake");
const food = document.querySelector(".food");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const currentScoreDisplay = document.querySelector(".score__current");
const highScoreDisplay = document.querySelector(".score__high");
const gridSizeGetter = document.querySelector("main");
const gameGrid = document.querySelector(".game");
// const rightButton = document.querySelector("#right");
// const downButton = document.querySelector("#down");
// const leftButton = document.querySelector("#left");
// const upButton = document.querySelector("#up");
const directionButtons = document.querySelectorAll(".movement-button");

let speed = 1;
let currentScore = 0;
let highScore = 0;


// Functions
const showInstructions = () => {
    alert(`Direct your snake to eat as much fruit as it can without crashing into itself or the wall!

Use the arrow keys to move. 
            
Click the start button to begin, or the reset button to reset the game.
            
Your current score is shown alongside the high score. Try your best to beat it!`);
}

const makeInitialSnake = () => {
    snake.innerHTML = `
    <div class="snake-div snake-div--head _1"></div>
    `;

    const snakeBit = document.querySelector("._1");
    snakeGrid = "12/12/13/13";
    snake.style.gridArea = snakeGrid;
    return snakeGrid;
} 

const getDirection = (event) => {
    switch(event.key || event.target.value){
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
}

const moveSnake = () => {

}

const resetGame = () => {
    currentScoreDisplay.innerText = "0";
    highScoreDisplay.innerText = "0";
    food.style.display = "none";
    makeInitialSnake();
}

const startGame = () => {
    makeInitialSnake();
    direction = "right";
    renderFood();
}

const renderFood = () => {
    food.style.display = "inline-block";
    //console.log(gridSizeGetter.style.display);
    //////////////////////////////////////////////////////////////////WRITE CHECK TO SEE IF SNAKE ALREADY THERE
    randomiseFoodGrid();
    while ((food.style.gridArea == newFoodGrid) || snakeGrid == newFoodGrid){
        randomiseFoodGrid();
    }

    food.style.gridArea = newFoodGrid;
}

const randomiseFoodGrid = () => {
    foodRow = Math.round(Math.random()*23);
    foodColumn = Math.round(Math.random()*23);
    newFoodGrid = `${foodRow} / ${foodColumn} / ${foodRow + 1} / ${foodColumn + 1}`;
    return newFoodGrid;
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

const ensureInBox = (coord, min, max) => { //ensures randomly spawned food is is game box
    finalmax1 = Math.min(coord, Math.max(min, max)) //finds smallest of coord and whichever is bigger of min or max
    finalmax2 = Math.min(min, max) //finds smallest of min and max
    return Math.max(finalmax1, finalmax2);
}

// Event Listeners
resetButton.addEventListener("click", resetGame);
startButton.addEventListener("click", startGame);
instructionsButton.addEventListener("click", showInstructions);

directionButtons.forEach((button) => {
    button.addEventListener("click", getDirection);
})

window.addEventListener("keydown", getDirection);