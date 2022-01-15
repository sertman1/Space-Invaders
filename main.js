import "./style.css";
import Tank from "./Tank.js";
import Missile from "./Missile.js";
import Invader from "./Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const soundTrack = new Audio();
soundTrack.src = "./assets/music.mpeg";
soundTrack.loop = true;
const missileNoise = new Audio();
missileNoise.src = "./assets/shoot.wav";
const explosionNoise = new Audio();
explosionNoise.src = "./assets/explosion.wav";

let lost = false;
let gameStarted = false;
let missilesRemaining = 10;
let invadersShot = 0;
let numInvaders = 0;
// used to display the text on screen:
let missileMessage;
let invaderMessage;

// initalize tank's starting (x,y) to be at bototm middle of screen
const tank = new Tank (
  canvas.width / 2 - 25,
  canvas.height - 60,
);

const ammo = [];
for (let i = 0; i < 10; i++) { // player allowed only 10 missiles in their ammunition
  ammo[i] = new Missile();
}

let invaders = [] // Invader objs to be added randomly throughout the game 

document.addEventListener("keydown", startGame);

function startGame(e) {
  if (e.key === "Right" || e.key == "ArrowRight" || e.key === "Left" || e.key === "ArrowLeft") {
    gameStarted = true;
  }
}

document.addEventListener("keypress", fireMissiles); // keypress allows for rapid fire missiles

function fireMissiles(e) {
  if (e.keyCode == "32") { // space pressed ==> attempt to fire
    for (let missile_number = 0; missile_number < 10; missile_number++) {
      if (ammo[missile_number].dy == 0) {  // check if any missiles are not moving, i.e., not yet fired
        if (missileNoise.paused) {  
          missileNoise.play();
        }
        else {
          missileNoise.currentTime = 0; // allows the noise to override a previous blast's noise
        }
        missilesRemaining--;
        ammo[missile_number].width = 15;
        ammo[missile_number].height = 15;
        // center it to top middile of tank:
        ammo[missile_number].x = tank.x + (tank.width / 2) - (ammo[missile_number].width /2);
        ammo[missile_number].y = tank.y - ammo[missile_number].height;
        ammo[missile_number].dy = -3;
        break; // break so that only one missile can be fired at a time 
      }
    }
  }
}  

function checkMissileOffScreen() {
  for (let i = 0; i < 10; i++) {
    if (ammo[i].y + ammo[i].y < 0) { // replenish missile to ammunition once it is off screen
      missilesRemaining++;
      ammo[i].clear();
      ammo[i].y = tank.y;
    }
  }
}

function drawMissiles() {
  for (let i = 0; i < 10; i++) {
    ammo[i].draw(ctx);
    ammo[i].move();
  }
}

function spawnInvader() {
  let xPos = Math.ceil(Math.random() * 440) + 10;  // range where the jiggle will not cause invader to go out of screen
  let speed = Math.ceil(Math.random() * 2) + Math.random(); 
  let invader = new Invader(xPos, speed);
  invaders.push(invader);
  numInvaders++;
}

function drawInvaders() {
    for (let j = 0; j < numInvaders; j++) {
      if (invaders[j].defeatedPlayer) {
        lost = true;
      }   
      invaders[j].draw(ctx);
      invaders[j].move();  
  }
}

function checkMissileColisions() {
  for (let i = 0; i < 10; i++) {
    if (ammo[i].dy != 0)  { // check that missile has been fired
      for (let j = 0; j < numInvaders; j++) {
        if (ammo[i].colides(invaders[j])) {
          if (explosionNoise.paused) {
            explosionNoise.play();
          }
          else {
            explosionNoise.currentTime = 0;
          }
          explosionNoise.play();
          missilesRemaining++;
          invadersShot++;
          invaders.splice(j, 1);  // remove colided invader from array to make future searches faster
          numInvaders--;
        }
      }
    }
  }
}

function tankColision() {
  for (let i = 0; i < numInvaders; i++) {
    if (tank.colides(invaders[i])) {
      lost = true;
    }
  }
}

function draw() {
  if (gameStarted) {
    soundTrack.play();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tank.draw(ctx);
  tank.move(canvas.width);
  checkMissileOffScreen();
  checkMissileColisions();
  drawMissiles();
  drawInvaders();
  if (gameStarted) {
    if (Math.random() < 0.0075) {
      spawnInvader();
    }
  }
  if (tankColision()) {
    lost = true;
  }

  ctx.font = "17px Arial";
  ctx.fillStyle = "lightblue";
  invaderMessage = "Invaders shot down: ";
  invaderMessage += invadersShot;
  ctx.fillText(invaderMessage, 10, 20);

  if (lost == false) {
    missileMessage = "Missiles remaining: ";
    missileMessage += missilesRemaining; 
    ctx.fillText(missileMessage, 10, 40); 
    window.requestAnimationFrame(draw);
  }
  else {
    missileMessage = "Game Over!";
    ctx.fillText(missileMessage, 10, 40);
    soundTrack.pause();
  }
}

draw();
