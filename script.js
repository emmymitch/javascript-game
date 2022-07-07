// Defining inital constants
const instructionsButton = document.querySelector("#instructions");
const snake = document.querySelector(".snake");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const currentScore = document.querySelector(".score__current");
const highScore = document.querySelector(".score__high");
const rightButton = document.querySelector("#right");
const downButton = document.querySelector("#down");
const leftButton = document.querySelector("#left");
const upButton = document.querySelector("#up");
const directionButtons = document.querySelectorAll(".movement-button");

let xPos = "50px";
let yPos = "100px";

// Functions
const showInstructions = () => {
    alert(`Direct your snake to eat as much fruit as it can without crashing into itself or the wall!

Use the arrow keys to move. 
            
Click the start button to begin, or the reset button to reset the game.
            
Your current score is shown alongside the high score. Try your best to beat it!`);
}

const makeInitialSnake = () => {
    snake.innerHTML = `
    <div class="snake-div snake-div--head"></div>
    <div class="snake-div"></div>
    <div class="snake-div"></div>
    `;

    snake.style.position = "absolute";
    snake.style.right = xPos;
    snake.style.top = yPos;
} 

const resetGame = () => {
    currentScore.innerText = "0";
    highScore.innerText = "0";
    makeInitialSnake();
}

const startGame = () => {
    speed = 1;
    direction = 1;
    renderFood();
}

const getDirection = (event) => {
    switch(event.key || event.target.value){
        case "ArrowRight":
            direction = 1;
            console.log(direction);
            break;
        case "ArrowDown":
            direction = 2;
            console.log(direction);
            break;
        case "ArrowLeft":
            direction = 3;
            console.log(direction);
            break;
        case "ArrowUp":
            direction = 4;
            console.log(direction);
            break;
        default:
            break;
    }
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