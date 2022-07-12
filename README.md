# Snake - Javascript Game - Emily Mitcheson-Smith

A simple game built in HTML, SCSS, and Javascript.

## Javascript
### css-grid-snake
The original version of this games, built on a CSS grid, is preserved in the css-grid-snake branch. It is functional, but the snake does not extend when eating food. See how many you can get anyway!

### Current game
- Creates a grid of divs using a for loop and flex layout
- Snake is an array of divs with the class 'snake'
- Direction gained from user keyboard or button input
- moveSnake has an interval so you keep moving in one direction
- renderFood randomises position of food and checks it doesn't land on the snake
- Fail conditions identify edge of box and if driving into self