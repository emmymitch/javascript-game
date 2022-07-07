
const instructionsButton = document.querySelector("#instructions");

const showInstructions = () => {
    alert(`Direct your snake to eat as much fruit as it can without crashing into itself or the wall!

Use the arrow keys to move. 
            
Click the start button to begin, or the reset button to reset the game.
            
Your current score is shown alongside the high score. Try your best to beat it!`);
}

instructionsButton.addEventListener("click", showInstructions);