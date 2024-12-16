// Game State Object
const gameState = {
    score: 0,
    lives: 3,
    fruitPosition: { row: 1, column: 5 },
    basketPosition: 5,
  };
  
  // DOM Elements
  const fruit = document.querySelector("#fruit");
  const basket = document.querySelector("#basket");
  const scoreDisplay = document.querySelector("#score-display");
  const livesDisplay = document.querySelector("#lives-display");
  const gameOverScreen = document.querySelector("#game-over");
  const restartButton = document.querySelector("#restart");
  
  // Move Basket Function
  function moveBasket(direction) {
    if (direction === "left" && gameState.basketPosition > 1) {
      gameState.basketPosition--;
    } else if (direction === "right" && gameState.basketPosition < 10) {
      gameState.basketPosition++;
    }
    updateBasketPosition();
  }
  
  // Update Basket Position
  function updateBasketPosition() {
    basket.style.gridColumn = gameState.basketPosition;
  }
  
  // Update Fruit Position
  function updateFruitPosition() {
    fruit.style.gridRow = gameState.fruitPosition.row;
    fruit.style.gridColumn = gameState.fruitPosition.column;
  }
  
  // Reset Fruit After Catch/Miss
  function resetFruit() {
    gameState.fruitPosition.row = 1;
    gameState.fruitPosition.column = Math.floor(Math.random() * 10) + 1;
    updateFruitPosition();
  }
  
  // Check for any Collision or Miss
  function checkCollision() {
    if (gameState.fruitPosition.row === 10) {
      if (gameState.fruitPosition.column === gameState.basketPosition) {
        // Caught Fruit
        gameState.score++;
        scoreDisplay.innerText = `Score: ${gameState.score}`;
      } else {
        // Missed Fruit
        gameState.lives--;
        livesDisplay.innerText = `Lives: ${gameState.lives}`;
        if (gameState.lives === 0) {
          endGame();
          return;
        }
      }
      resetFruit();
    }
  }
  
  // End Game Function
  function endGame() {
    clearInterval(gameLoop);
    gameOverScreen.style.display = "block";
  }
  
  // Restart Game Function
  function restartGame() {
    gameState.score = 0;
    gameState.lives = 3;
    gameState.fruitPosition.row = 1;
    gameState.fruitPosition.column = 5;
    gameState.basketPosition = 5;
    scoreDisplay.innerText = "Score: 0";
    livesDisplay.innerText = "Lives: 3";
    gameOverScreen.style.display = "none";
    updateBasketPosition();
    resetFruit();
    startGame();
  }
  
  // Fruit Falling Logic
  function dropFruit() {
    gameState.fruitPosition.row++;
    updateFruitPosition();
    checkCollision();
  }
  
  // Game Loop
  let gameLoop;
  function startGame() {
    gameLoop = setInterval(dropFruit, 500); // Fruit falls every 500ms
  }
  
  // Event Listeners for Controls
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moveBasket("left");
    if (e.key === "ArrowRight") moveBasket("right");
  });
  
  restartButton.addEventListener("click", restartGame);
  
  // Start the Game
  startGame();