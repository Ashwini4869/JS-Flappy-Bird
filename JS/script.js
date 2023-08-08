const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
//Initializing sprites
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var gameOver = new Image();

//adding paths to each sprites
bird.src = "../assets/bird.png";
bg.src = "../assets/background.png";
fg.src = "../assets/foreground.png";
pipeUp.src = "../assets/pipeUp.png";
pipeDown.src = "../assets/pipeDown.png";
gameOver.src = "../assets/gameover.png";

//settings
var score = 0;
var gravity = 0.2;
// var animate;

//for bird
var bX = 20;
var bY = 50;
var birdHeight = 7;
var birdWidth = 15;
var vBirdY = 0;

//for foreground
var fgHeight = 40;
var fgWidth = canvas.width;

//for pipes
var constant;
var gap = 60;
var pipeUpHeight = Math.floor(Math.random() * 30 + 30);
var pipeDownHeight;
var pipeWidth = 30;
var pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0,
};

// event listener for space and mouse
document.body.onkeydown = function (e) {
  if (e.keyCode == 32) {
    moveUp();
  }
};

canvas.onclick = function () {
  moveUp();
};

function moveUp() {
  vBirdY = -3;
}

function gameOverScreen() {
  gravity = 0;
  pipe.length = 0;
  ctx.drawImage(gameOver, 40, 40, 200, 30);
  ctx.font = "16px serif";
  ctx.fillText("Score: " + score, 110, 90);
}

function gameLoop() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  //generating pipes
  for (var i = 0; i < pipe.length; i++) {
    constant = pipeUpHeight + gap;
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, pipeWidth, pipeUpHeight);
    pipeDownHeight = 360 - constant;
    ctx.drawImage(
      pipeDown,
      pipe[i].x,
      pipe[i].y + constant,
      pipeWidth,
      pipeDownHeight
    );

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUpHeight) - pipeUpHeight,
      });
    }

    if (
      bY + birdHeight >= canvas.height - fgHeight ||
      (bX + birdWidth >= pipe[i].x &&
        bX <= pipe[i].x + pipeWidth &&
        (bY <= pipe[i].y + pipeUpHeight ||
          bY + birdHeight >= pipe[i].y + constant))
    ) {
      gameOverScreen();
    }

    if (pipe[i].x == 5) {
      score++;
    }

    ctx.drawImage(fg, 0, canvas.height - fgHeight, fgWidth, fgHeight);
    ctx.drawImage(bird, bX, bY, birdWidth, birdHeight);
    vBirdY += gravity;
    bY = vBirdY + bY;

    ctx.fillStyle = "#000";
    ctx.font = "10px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 10);
  }

  window.requestAnimationFrame(gameLoop);
}

gameLoop();
