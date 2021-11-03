console.log("are we here?");

let canvas = document.getElementById("myCanvas");
let homePage = document.getElementById("homePage");
let description = document.getElementById("description");
let nextMission = document.getElementById("nextMission");
let gameisOver = document.getElementById("gameOver");
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

let car4 = new Image();
car4.src =
  "./images/top-view-racing-car-top-view-racing-car-vector-illustration-99831332-removebg-preview.png";
let car5 = new Image();
car5.src = "./images/a6rBl-removebg-preview.png";
let car6 = new Image();
car6.src =
  "./images/481-4811908_race-car-sprite-png-car-top-down-png_2-removebg-preview.png";
let car7 = new Image();
car7.src = "./images/fPKWt_2-removebg-preview.png";

//Declaring variables:
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let intervalId = 0;
let isGameOver = false;
let playerY = 610,
  playerX = 300;
let isRight = false,
  isLeft = false,
  isRotate = false;
let gameOver = false;
let mouseClick = false;
let score = 0;
let car1X = -50,
  car1Y = 130;
let car2X = 605,
  car2Y = 310;

let car4X = -200,
  car4Y = 80;
let completedMission = false;

let playerWidth = 55,
  playerHeight = 55;

let angle = 90;
let isUp = false,
  isDown = false;

let playerStraight = false;
let playerRight = false;
let playerLeft = false;

let carImgs = [car1, car2, car3, car4];
let carImgs2 = [car5, car6, car7];

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
    x: carFlowX - 150,
    y: 120,
    rotatePoint: 360,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 300,
    y: 90,
    rotatePoint: 340,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 450,
    y: 120,
    rotatePoint: 350,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 550,
    y: 90,
    rotatePoint: 370,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 700,
    y: 140,
    rotatePoint: 360,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 850,
    y: 80,
    rotatePoint: 340,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX - 990,
    y: 130,
    rotatePoint: 350,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
];

let carFlowLeft = [
  {
    x: carFlowX + 600,
    y: 280,
    rotatePoint: 360,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX + 690,
    y: 310,
    rotatePoint: 350,
    img: carImgs[Math.floor(Math.random() * carImgs.length)],
    isRot: false,
  },
  {
    x: carFlowX + 670,
    y: 330,
    rotatePoint: 350,
    img: carImgs2[Math.floor(Math.random() * carImgs2.length)],
    isRot: false,
  },
];
function addVehicles() {
  for (let i = 0; i < carFlow.length; i++) {
    drawRotated(
      carFlow[i].isRot ? 90 : 180,
      carFlow[i].img,
      carFlow[i].x + 25,
      carFlow[i].y + 25
    );
    if (carFlow[i].x + 55 == carFlow[i].rotatePoint) {
      carFlow[i].y = carFlow[i].y + decSpeed;
      if (!carFlow[i].isRot) {
        carFlow[i].isRot = true;
      }
    } else {
      carFlow[i].x = carFlow[i].x + decSpeed;
    }
    //Take the cars back
    if (carFlow[i].x + 55 == 340 && carFlow[i].y == canvas.height) {
      // console.log("we get there?");
      carFlow[i].x = -50;
      carFlow[i].y = 80 + Math.floor(Math.random() * 50);
      carFlow[i].isRot = false;
    }
    if (
      playerX < carFlow[i].x + 55 &&
      playerX + playerWidth > carFlow[i].x &&
      playerY < carFlow[i].y + 55 &&
      playerY + playerHeight > carFlow[i].y
    ) {
      // console.log("what's happening here?");
      // gameOver = true;
    }
    if (playerX == carFlow[i].y + 55 || playerY == carFlow[i].x + 55) {
      score++;
    }

    if (playerX + 60 == 0 && playerY <= 160) {
      completedMission = true;
    }
    if (completedMission) {
      nextMission.style.display = "block";
      canvas.style.display = "none";
      audio.pause();
    }
  }
  for (let i = 0; i < carFlowLeft.length; i++) {
    drawRotated(
      carFlowLeft[i].isRot ? 90 : 180,
      carFlowLeft[i].img,
      carFlowLeft[i].x + 25,
      carFlowLeft[i].y + 25
    );
    if (carFlowLeft[i].x + 55 == carFlowLeft[i].rotatePoint) {
      carFlowLeft[i].y = carFlowLeft[i].y + decSpeed;
      if (!carFlowLeft[i].isRot) {
        carFlowLeft[i].isRot = true;
      }
    } else {
      carFlowLeft[i].x = carFlowLeft[i].x - decSpeed;
    }
    //Take the cars back
    if (
      carFlowLeft[i].x + 55 == carFlowLeft[i].rotatePoint &&
      carFlowLeft[i].y == canvas.height
    ) {
      carFlowLeft[i].x = -650;
      carFlowLeft[i].y = 300 + Math.floor(Math.random() * 50);
      carFlowLeft[i].isRot = false;
    }

    if (playerX == carFlowLeft[i].y + 55) {
      score++;
    }
  }
}

function draw() {
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
  // ctx.drawImage(car4, car4X, car4Y, 65, 60);

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

  addVehicles();

  // if (playerRight) {
  //   ctx.drawImage(rPlayer, playerX, playerY, 55, 55);
  // } else if (playerLeft) {
  //   ctx.drawImage(lPlayer, playerX, playerY, 55, 55);
  // } else {
  //   ctx.drawImage(player, playerX, playerY, 55, 55);
  // }

  if (!isRotate) {
    ctx.drawImage(player, playerX, playerY, playerWidth, playerHeight);
  }
  // ctx.drawImage(player, playerX, playerY, 55, 55);
  // ctx.drawImage(rPlayer, 610, 280, 55, 55);
}

function handleStart() {
  canvas.style.display = "block";
  animation();
  audio.play();
  audio.volume = 0.5;
  homePage.style.display = "none";
  description.style.display = "block";
}

function showGameOver() {
  canvas.style.display = "none";
  gameisOver.style.display = "block";
  audio.pause();
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
  car4X = car4X + 0.8;

  if (isRight && playerX + 55 <= 390) {
    playerX = playerX + 1;
  }
  if (isLeft && playerX >= 270) {
    playerX = playerX - 1;
  }
  if (isUp && playerY > 100) {
    playerY = playerY - 1;
  }
  if (isDown && playerY < 160) {
    playerY = playerY + 1;
  }

  if (isRotate) {
    drawRotated(angle, player, playerX, playerY);
  }

  ctx.font = "24px Verdana";
  ctx.fillText(`Score: ${score}`, 230, 40);

  if (gameOver) {
    cancelAnimationFrame(intervalId);
    showGameOver();
  } else {
    intervalId = requestAnimationFrame(animation);
  }
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  description.style.display = "none";
  gameisOver.style.display = "none";
  nextMission.style.display = "none";

  startBtn.addEventListener("click", () => {
    handleStart();
  });
  restartBtn.addEventListener("click", () => {
    location = location;
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

    if (event.key == "d") {
      // playerRight = true;
      isRotate = true;
      angle = 90;
    }
    if (event.key == "a") {
      isRotate = true;
      angle = -90;
    }

    if (event.key == "s") {
      isRotate = false;
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
});
