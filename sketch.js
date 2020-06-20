var playerL,playerR,playerRunL,playerRunR,playerJumpL,playerJumpR,playerShootL,playerShootR,playerFireL,playerFireR

var e1,eRun1L,eRun2L,eRun1R,eRun2R,eJumpL,eJumpR,eJump2L,eJump2R,eDieL,eDieR,eDie2L,eDie2R,eCrouchL,eCrouchR
var ePunch1L,ePunch1R,ePunch2L,ePunch2R,ePunch3L,ePunch3R
var enemyGun1L,enemyGun1R,eGun2L,eGun2R
var eBomb1L,eBomb1R,eBomb2L,eBomb2R

var enemy1Group

var ground 

var cloudsGroup, cloudImage


//var a = 0

function preload(){

  bg = loadImage("bg6.jpg");


  playerL = loadImage("pLeft.png");
  playerR = loadImage("pRight.png");
  playerRunL = loadAnimation("pRun1L.png","pRun2L.png");
  playerRunR = loadAnimation("pRun1R.png","pRun2R.png");
  playerJumpL = loadImage("pFlyL.png");
  playerJumpR = loadImage("pFlyR.png");
  playerShootL = loadImage("pShootL.png");
  playerShootR = loadImage("pShootR.png");

  enemyGunL = loadAnimation("eGun1L.png","eGun2L.png");
  enemyGunR = loadAnimation("eGun1R.png","eGun2R.png");
  enemyRunL = loadAnimation("eRun1L.png","eRun2L.png");
  enemyRunR = loadAnimation("eRun1R.png","eRun2R.png");
 
  groundImg = loadImage("ground2.jpg");

  enemy1Group = new Group();
  cloudsGroup = new Group();

  playerFireL = loadImage("pFireL.png");
  playerFireR = loadImage("pFireR.png");

  cloudImage = loadImage("cloud.jpg");
}


function setup() {
  createCanvas(1200,400);
 player = createSprite(585, 200, 50, 50);
player.scale = 2
//player.debug = true;

player.setCollider("circle",0,0,25);

 ground = createSprite(555,350,1600,10);
 //ground.scale = 0.5
//ground.debug = true;


 
 player.addAnimation("playerL",playerL);
 player.addAnimation("playerRunL",playerRunL);
 player.addAnimation("playerR",playerR);
 player.addAnimation("playerRunR",playerRunR);
 player.addAnimation("playerJumpL",playerJumpL);
 player.addAnimation("playerJumpR",playerJumpR);
 player.addAnimation("playerShootL",playerShootL);
 player.addAnimation("playerShootR",playerShootR);
 
 


 ground.addAnimation("groundImg",groundImg);



//camera.on();


}

function draw() {
  background(bg);  

  //camera.x = player.x

  if (keyWentDown(LEFT_ARROW)){
    player.changeAnimation("playerRunL",playerRunL);
    player.velocityX = -5;
    
  }

  if (keyWentUp(LEFT_ARROW)){
    player.changeAnimation("playerL",playerL);
    player.velocityX= 0;
  }

  if (keyWentDown(RIGHT_ARROW)){
    player.changeAnimation("playerRunR",playerRunR);
    player.velocityX = 5;
    
  }

  if (keyWentUp(RIGHT_ARROW)){
    player.changeAnimation("playerR",playerR);
    player.velocityX = 0;
  }

  

 if(keyDown("space") && player.y > 260){
    player.velocityY = -10;
    
    player.changeAnimation("playerJumpL",playerJumpL);
  }

  if(keyWentUp("space")){
    
    player.changeAnimation("playerL",playerL);
  }

  if(keyDown(16) && player.y > 260){
    player.velocityY = -10;
    
    player.changeAnimation("playerJumpR",playerJumpR);
  }

  if(keyWentUp(16)){
    
    player.changeAnimation("playerR",playerR);
  }
 
  if(player.x > 1195){
    player.x = 0
  }

  if(player.x < 0){
    player.x = 1195
  }

  if(mouseDown(LEFT)){
   player.changeAnimation("playerShootL",playerShootL);
   if(frameCount%5 === 0){
   pFireL = createSprite(player.x-20,player.y-18,10,10);
   pFireL.addAnimation("playerFireL",playerFireL);
   pFireL.velocityX = -20;
   }
  }

   if(mouseWentUp(LEFT)){
    player.changeAnimation("playerL",playerL);
  }

  if(mouseDown(RIGHT)){
   player.changeAnimation("playerShootR",playerShootR);
   if(frameCount%5 === 0){
   pFireR = createSprite(player.x+20,player.y-18,10,10);
   pFireR.addAnimation("playerFireR",playerFireR);
   pFireR.velocityX = 20;
  }
}

  if(mouseWentUp(RIGHT)){
   player.changeAnimation("playerR",playerR);
  }

  player.velocityY = player.velocityY + 0.4
 
 // ground.visible = false;

 //if(pFireL.isTouching(enemy1Group)){
  
 //}


 player.collide(ground);
 
 enemy();

 spawnClouds();

enemy1Group.collide(ground);
 
//enemy1Group.collide(player); 

drawSprites();
 
fill("red");
  text(World.mouseX+":"+World.mouseY,900,100);


}

function enemy(){
if(frameCount % 200 === 0 ){
  enemy1 = createSprite(random(300,250),300,50,50);
  
  enemy1.addAnimation("enemyGunL",enemyGunL);
  enemy1.addAnimation("enemyGunR",enemyGunR);
  enemy1.addAnimation("enemyRunL",enemyRunL);
  enemy1.addAnimation("enemyRunR",enemyRunR);

enemy1.lifetime = 200;

  //enemy1.debug = true; 

  enemy1.setCollider("circle",0,0,44)
enemy1Group.add(enemy1);


}

function spawnClouds(){
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}



}



