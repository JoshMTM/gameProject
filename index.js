console.log("are we here?");

let canvas = document.getElementById("myCanvas");
let homePage = document.getElementById("homePage");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";
// ctx.translate(-150, -75);
// ctx.rotate(Math.PI / 2);
// ctx.translate(150, 75);

let bg1 = new Image();
bg1.src = "./images/360_F_357117060_yV3A2INxBDKlab5KSEHFUEtzokb5IiJ6.jpeg";

let bg2 = new Image();
bg2.src =
  "images/high-quality-horizontal-background-cityscape-260nw-1055260328.jpg";

let player = new Image();
player.src =
  "./images/176-1769151_660-x-1650-13-bike-icon-top-view__1_-removebg-preview.png";

let rPlayer = new Image();
rPlayer.src = "./images/player1-removebg-preview.png";

let lPlayer = new Image();
lPlayer.src = "./images/player1_2-removebg-preview.png";

let audio = new Audio();
audio.src =
  "https://res.cloudinary.com/manishp/video/upload/v1623305320/Horizon_Zero_Dawn_OST_-_Years_Of_Training_badkhk.mp3";

let car1 = new Image();
car1.src =
  "./images/png-transparent-taxi-car-simulator-3d-dodge-sprite-sprite-s-rectangle-car-video-game-removebg-preview.png";

let car2 = new Image();
car2.src = "./images/a6rBl-removebg-preview.png";

let car3 = new Image();
car3.src =
  "./images/top-view-racing-car-top-view-racing-car-vector-illustration-99830413-removebg-preview.png";
//Declaring variables:
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restart");
let intervalId = 0;
let isGameOver = false;
let playerY = 610,
  playerX = 300;
let isRight = false,
  isLeft = false;
isRotate = false;
let gameOver = false;
let mouseClick = false;
let score = 0;
let car1X = -50,
  car1Y = 130;
let car2X = 605,
  car2Y = 310;

let car3X = -200,
  car3Y = 80;

let angle = 90;
let isUp = false,
  isDown = false;

let playerStraight = false;
let playerRight = false;
let playerLeft = false;

let carImgs = [car1, car2, car3];
let carFlowX = 0;

let decSpeed = 1;

let carFlow = [
  {
    x: carFlowX,
    y: 90,
    rotatePoint: 340,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 240,
    y: 120,
    rotatePoint: 360,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 80,
    y: 90,
    rotatePoint: 340,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 130,
    y: 120,
    rotatePoint: 350,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
];
function addVehicles() {
  for (let i = 0; i < carFlow.length; i++) {
    ctx.drawImage(carFlow[i].img, carFlow[i].x, carFlow[i].y, 55, 55);
    if (carFlow[i].x + 55 == carFlow[i].rotatePoint) {
      carFlow[i].y = carFlow[i].y + decSpeed;
      if (!carFlow[i].isRot) {
        carFlow[i].isRot = true;
        // drawRotated(angle, carFlow[i], carFlow[i].x, carFlow[i].y);
        // ctx.translate(carFlow[i].x, carFlow[i].y);
        // ctx.rotate((90 * Math.PI) / 180);
        // ctx.translate(-carFlow[i].x, -carFlow[i].y);
      }
    } else {
      carFlow[i].x = carFlow[i].x + decSpeed;
    }
    //Take the cars back
    if (carFlow[i].x + 55 == 340 && carFlow[i].y == canvas.height) {
      console.log("we get there?");
      carFlow[i].x = -130;
      carFlow[i].y = 90 + Math.floor(Math.random() * 30);
    }
  }
  // carFlow[i].x = carFlow[i].x + decSpeed;

  // if (carFlow[i].x + car1.width < 0) {
  //   carFlow[i].x = 300;
  //   carFlow[i].y = -Math.floor(Math.random() * 80);
  // }
  // if (carFlow[i].x + 55 == carFlow[i].rotatePoint) {
  //   console.log("..");
  //   carFlow[i].x = -60;

  // carFlow[i].y += 2;

  // Draw collisions
  // for (let i = 0; i < carImgs.length; i++) {
  //   if (
  //     player.x + player.width > carImgs[i].x &&
  //     carImgs[i].y > player.y + 55 < player.y + 55
  //   ) {
  //     console.log("is this working");
  //     gameOver = true;
  //   }
  // }
}

function draw() {
  addVehicles();
  ctx.beginPath();
  ctx.shadowBlur = 0;
  ctx.setLineDash([0]);
  ctx.strokeStyle = "#cf1020";
  ctx.arc(10 + 25, 10 + 25, 24, 0, 2 * Math.PI);
  ctx.globalAlpha = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.shadowBlur = 0;
  ctx.setLineDash([0]);
  ctx.strokeStyle = "#cf1020";
  ctx.arc(40 + 25, 10 + 25, 24, 0, 2 * Math.PI);
  ctx.globalAlpha = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.shadowBlur = 0;
  ctx.setLineDash([0]);
  ctx.strokeStyle = "#cf1020";
  ctx.arc(540 + 25, 10 + 25, 24, 0, 2 * Math.PI);
  ctx.globalAlpha = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.shadowBlur = 0;
  ctx.setLineDash([0]);
  ctx.strokeStyle = "#cf1020";
  ctx.arc(510 + 25, 10 + 25, 24, 0, 2 * Math.PI);
  ctx.globalAlpha = 1;
  ctx.stroke();
  // ctx.drawImage(bg2, 0, 0);
  // ctx.drawImage(bg1, 265, 0);
  ctx.beginPath();
  ctx.stroke();
  ctx.lineWidth = 10;
  ctx.fillRect(0, 80, 380, 100);
  ctx.closePath();

  // ctx.drawImage(car1, car1X, car1Y, 55, 60);
  // ctx.drawImage(car2, car2X, car2Y, 55, 60);
  // ctx.drawImage(car3, car3X, car3Y, 55, 60);

  ctx.beginPath();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.lineWidth = 10;
  ctx.fillRect(380, 280, 300, 100);
  ctx.closePath();

  ctx.beginPath();
  // ctx.stroke();
  ctx.lineWidth = 10;
  // ctx.shadowBlur = 1;
  ctx.fillStyle = "rgba(67, 63, 63, 0.5)";
  ctx.fillRect(280, 180, 100, 640);
  ctx.closePath();

  // if (playerRight) {
  //   ctx.drawImage(rPlayer, playerX, playerY, 55, 55);
  // } else if (playerLeft) {
  //   ctx.drawImage(lPlayer, playerX, playerY, 55, 55);
  // } else {
  //   ctx.drawImage(player, playerX, playerY, 55, 55);
  // }

  if (!isRotate) {
    ctx.drawImage(player, playerX, playerY, 55, 55);
  }
  // ctx.drawImage(player, playerX, playerY, 55, 55);
  // ctx.drawImage(rPlayer, 610, 280, 55, 55);
}

function handleStart() {
  canvas.style.display = "block";
  animation();
  // audio.play();
  audio.volume = 0.5;
  homePage.style.display = "none";
}

function showGameOver() {
  canvas.style.display = "none";
}

function drawRotated(degree, elem, elemX, elemY) {
  ctx.save();
  ctx.translate(elemX, elemY);
  ctx.rotate((degree * Math.PI) / 180);
  ctx.translate(-elemX, -elemY);
  ctx.drawImage(elem, elemX - 25, elemY - 25, 55, 55);
  ctx.restore();
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  draw();

  if (isRotate) {
    if (angle > 0) {
      playerX = playerX + 0.5;
    } else {
      playerX = playerX - 0.5;
    }
  } else {
    playerY = playerY - 0.5;
  }

  car1X = car1X + 0.5;
  car2X = car2X - 0.8;
  car3X = car3X + 0.8;

  if (isRight && playerX + 55 <= 290 + 100) {
    playerX = playerX + 1;
  }
  if (isLeft && playerX >= 270) {
    playerX = playerX - 1;
  }
  if (isUp) {
    playerY = playerY - 1;
  }
  if (isDown) {
    playerY = playerY + 1;
  }

  if (isRotate) {
    // player = rPlayer;
    drawRotated(angle, player, playerX, playerY);
  }

  ctx.font = "24px Verdana";
  ctx.fillText(`Score: ${score}`, 230, 40);

  // Draw collisions
  // for (let i = 0; i < carImgs.length; i++) {
  //   if (
  //     player + player.width == carImgs[i].x &&
  //     carImgs[i].y > player.length + 55 < player.length + 55
  //   ) {
  //     console.log("is this working");
  //     // gameOver = true;
  //   }
  // }

  if (gameOver) {
    cancelAnimationFrame(intervalId);
    showGameOver();
  } else {
    intervalId = requestAnimationFrame(animation);
  }
}

window.addEventListener("load", () => {
  canvas.style.display = "none";

  startBtn.addEventListener("click", () => {
    handleStart();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
      isLeft = true;
      isRight = false;
    }
    if (event.key == "ArrowRight") {
      isRight = true;
      isLeft = false;
    }

    if (event.key == "r") {
      // playerRight = true;
      isRotate = true;
      angle = 90;
    }
    if (event.key == "l") {
      isRotate = true;
      angle = -90;
    }

    if (event.key == "ArrowUp") {
      isUp = true;
      isDown = false;
    }
    if (event.key == "ArrowDown") {
      isDown = true;
      isUp = false;
    }
  });
  document.addEventListener("keyup", () => {
    isDown = false;
    isUp = false;
    isRight = false;
    isLeft = false;
  });
  // document.addEventListener("keypress", (event) => {
  //   if (event.key == "s") {
  //     playerStraight = true;
  //   }
  // });
});
