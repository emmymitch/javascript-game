// Defining initial variables
const instructionsButton = document.querySelector("#instructions");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const currentScoreDisplay = document.querySelector(".score__current");
const highScoreDisplay = document.querySelector(".score__high");
const gameGrid = document.querySelector(".game");
const directionButtons = document.querySelectorAll(".movement-button");
const mediaQuery = window.matchMedia("(min-width: 768px)");

let currentScore = 0;
let hasReset = true;
let direction = 1;
let looping;

storeHighScore = window.localStorage;
highScoreDisplay.innerText = localStorage.getItem("High Score");


// Functions
const detectScreenSize = () => {
    if (mediaQuery.matches ? gridSize=45 : gridSize=20)
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

const resetGame = () => {
    clearInterval(looping);
    currentScoreDisplay.innerText = "0";
    direction = "";
    gameGrid.innerHTML = "";
    hasReset = true;
}

const startGame = () => {
    gameGrid.innerHTML = "";
    currentScore = 0;
    currentScoreDisplay.innerText = "0";

    addListenersOnStart();

    createGrid();
    gridSquares = document.querySelectorAll(".gameDiv");

    renderFood();
    makeInitialSnake();
    
    if (hasReset === false){
        clearInterval(looping);
    } else{
        hasReset = false;
    }

    direction = 1;
    let snakeEnd = currentSnake[currentSnake.length - 1];
    loopMoveSnake();

    return;
}

const makeInitialSnake = () => {
    currentSnake = [2, 1];

    currentSnake.forEach((snakebit) => {
        gridSquares[snakebit].classList.add("snake");
    })

    return  currentSnake;
} 

const getDirection = () => {
    switch(event.key || event.target.parentElement.value){
        case "ArrowRight":
            if (direction != -1){direction = 1}; //next div
            break;

        case "ArrowDown":
            if (direction != -width){direction = width}; //next line
            break;

        case "ArrowLeft":
            if (direction != 1){direction = -1}; //previous div
            break;

        case "ArrowUp":
            if (direction != width){direction = -width}; //previous line
            break;

        default:
            break;
    }
    return direction;
}

const snakeCollision = () => {
    //Edge collisions
        //Bottom edge: snake head+width >= max grid div && going down
    if (((currentSnake[0] + width >= width**2) && (direction == width))        
        //Top edge: opposite to bottom edge
        || ((currentSnake[0] - width <= 0) && (direction == -width))        
        //Right edge: snake head/width gives remainder width-1 (it's on the last square in a line) && going right
        || ((currentSnake[0]%width == width-1) && (direction == 1))  
        //Left edge: opposite to right edge
        || ((currentSnake[0]%width == 0) && (direction == -1))

    //Self collision
        || (gridSquares[currentSnake[0]+direction].classList.contains("snake"))
        ){
        return true;

    } else{
        return false;
    }
}

const moveSnake = () => {
    //Check not colliding/failing
    if (snakeCollision()){
        clearInterval(looping);
        handleGameOver();
        return;

    //Check if eating food
    } else if (gridSquares[currentSnake[0]+direction].classList.contains("food")){
        eatFood();

    //Else move snake
    } else{
        //Remove last snake bit
        snakeEnd = currentSnake.pop();
        gridSquares[snakeEnd].classList.remove("snake");

        //Add new head
        currentSnake.unshift(currentSnake[0] + direction);
        gridSquares[currentSnake[0]].classList.add("snake");
    }
    return snakeEnd;
}

const loopMoveSnake = () => {
    looping = setInterval(moveSnake, 75);
    return looping;
}

const handleGameOver = () => {
    direction = "";
    alert(`Game Over!

You scored ${currentScore}. Well Done!`);
}

//Food functions
const randomiseFood = () => {
    foodPos = Math.round(Math.random()*(width**2));
    return foodPos;
}

const renderFood = () => {
    randomiseFood();

    //Check if snake already there
    while (gridSquares[foodPos].classList.contains("snake")){
        randomiseFood();
    }

    gridSquares[foodPos].classList.add("food");
    return;
}

const eatFood = () => {
    currentScore += 1;
    currentScoreDisplay.innerText = currentScore;

    if (currentScore > localStorage.getItem("High Score")){
        localStorage.setItem("High Score", currentScore);
        highScoreDisplay.innerText = localStorage.getItem("High Score");
    }

    expandSnake();
    renderFood();
}

const expandSnake = () => {
    gridSquares[currentSnake[0]+direction].classList.remove("food");
    gridSquares[snakeEnd].classList.add("snake");
    currentSnake.push(snakeEnd);
}



// Event Listeners

//Only enable directions & reset on game start
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

