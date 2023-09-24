let blockSize = 25;
let rows = 20;
let cols = 20;
let canvas;
let context;

// Snack position
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// move
let velocityX = 0;
let velocityY = 0;

// Food position
let foodX;
let foodY;

// Snake body
let snakeBody = [];

// game over
let gameOver = false;

// Difficulty
const difficulty = document.querySelector("select");
let speed = difficulty.value;

window.onload = () => {
  canvas = document.querySelector("canvas");
  canvas.height = rows * blockSize;
  canvas.width = cols * blockSize;
  context = canvas.getContext("2d");

  placeFood();
  document.addEventListener("keyup", moveSnake);
  setInterval(update, speed / 10);
  difficulty.addEventListener("change", () => {
    speed = difficulty.value;
    setInterval(update, speed / 10);
    difficulty.disabled = "true";
  });
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "#13151C";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over!");
    location.reload();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over!");
      location.reload();
    }
  }
}

function moveSnake(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
