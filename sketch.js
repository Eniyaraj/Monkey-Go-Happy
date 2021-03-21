var monkey , monkey_running, monkeyCollide;
var ground, bgImage, invGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bgImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  collided = loadImage("sprite_5.png");
}

function setup() {
  createCanvas(600, 400);

  bg = createSprite(200, 150);
  bg.addImage("background", bgImage);
  bg.scale = 1.2;
  
  invGround = createSprite(width / 2, 390, width, 10);
  invGround .visible = false;

  monkey = createSprite(80, 340);
  monkey.addAnimation("collided",collided);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.13;

  score = 0;

  gameState = 1;
  PLAY = 1;
  END = 0;

  bananaGroup = createGroup();
  stoneGroup = createGroup();

  speed = -8;
  collided = 0;
}

function draw(){
  if (gameState === PLAY) {
    monkey.changeAnimation("monkeyimg");
    bg.velocityX = -5;
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }
    if (keyWentDown("space") && monkey.collide(invGround)) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 1;
    score = score + Math.round((getFrameRate() / 30));
  }

  monkey.collide(invGround);

  if (gameState === END) {
    bg.velocityX = 0;
    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    monkey.changeAnimation("collided",collided);
  }

  if (keyWentDown("r") && gamestate === END) {
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    score = 0;
    gamestate = PLAY;
    speed = -6;
    monkey.scale = 0.13;
    collided = 0;
  }

  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    speed = speed - 0.5;
    monkey.scale = monkey.scale + 0.5;
    score = score + 20;
    collided = 0;
  }

  if (stoneGroup.isTouching(monkey)) {
    gameState = END;
    stoneGroup.destroyEach();
    collided += 1;
  }

  drawSprites();

  if (gameState === END) {
    fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
    text("Game Over!", width / 2 - width / 10, height / 2);
    text("Press R to Restart", width / 2 - width / 6.7, height / 2 + 30);
  }

  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 40, height / 8);
}

function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}