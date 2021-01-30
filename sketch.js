var PLAY=1
var END=0
var CHANCE=2
chance=5; missed=0
var gameState= PLAY
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var sword,cash,jwllery,diamonds;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  vignette = loadImage("vignette.png")
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  BoyImg = loadAnimation("runner1.png")
  obsImg = loadImage("obstacle1.png")
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
 // sound = loadSound("p5soundmin.js")
}

function setup(){
  
  createCanvas(400,400);
// Moving background

invCollider=createSprite(200,395,400,10)
  
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
vignetteRed=createSprite(200,200,400,400)
vignetteRed.addImage(vignette)
vignetteRed.visible=false

redS=createSprite(200,385,400,30)
redS.visible=false
redSp=createSprite(200,385,400,30)
redSp.visible=false  
redSpr=createSprite(200,385,400,30)
redSpr.visible=false

//creating boy running
boy = createSprite(70,330,20,20);
boy.scale=0.08;
boy.setCollider("circle",10,10,500) 

cashG=new Group();
obstacleG=new Group();
  invoG=new Group()
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();


boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("gameOver",endImg)

}

function draw() {


  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
      drawSprites();

  if (gameState==PLAY){
      boy.x = World.mouseX;
      boy.scale=0.08
      boy.y=330

    path.velocityY=4
    if(path.y > 400 ){
    path.y = height/2;
  }
    boy.changeAnimation("SahilRunning",boyImg);

   // sound.play();
    createObstacle();
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  }
  if (keyDown("space")&& invo.isTouching(boy)){
      obstacleG.destroyEach()
      }else if(obstacleG.isTouching(boy)) {
        obstacleG.destroyEach()
        invoG.destroyEach()
        gameState=CHANCE 
  }
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50
    
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+250
    
      
    }
  else if(jwelleryG.isTouching(boy)) {jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150
      
    }
  else if(swordGroup.isTouching(boy)) {gameState=CHANCE       
  }else if (jwelleryG.isTouching(invCollider)) {
    missed+=1                                            
    jwelleryG.destroyEach()
    vignetteRed.visible=true
   }else if  (diamondsG.isTouching(invCollider)){
     missed+=1                                                 
     diamondsG.destroyEach()
     vignetteRed.visible=true
                                                }
   else {if (cashG.isTouching(invCollider)){
     missed+=1                                       
     cashG.destroyEach()
     vignetteRed.visible=true
} 
  }
  if (missed>=5){
    gameState=END
  }
  if (gameState== CHANCE ){
    if (chance<=0){
    gameState=END
  } else {    
    stroke("black")
    fill("yellow")
    textSize(30)
    text("Score: "+treasureCollection,140,300)
    fill("red")
    textSize(20)
    text("Continue?  Press the Space Bar", 70,200)
    text("Chances Left: "+chance+" -1 :)",110,150)
    swordGroup.destroyEach();jwelleryG.destroyEach()
    obstacleG.destroyEach()
    cashG.destroyEach();
    diamondsG.destroyEach()     
    path.velocityY=0
    invCollider.visible=false
    boy.visible=false
  }
}
  if (gameState==END){
    fill("yellow")
    textSize(30)
    text("Score: "+treasureCollection,140,300)
    swordGroup.destroyEach();jwelleryG.destroyEach()
    obstacleG.destroyEach()
    cashG.destroyEach();
    diamondsG.destroyEach()    
    invoG.destroyEach()
    obstacleG.destroyEach()
    path.velocityY=0
    invCollider.visible=false
    boy.changeAnimation("gameOver",endImg);
    boy.scale=0.5
    boy.x=20;boy.y=200;
    textSize(20)  
    text("Try Again? Hit the Space Bar", 40,200)

    console.log("On scaling up gameover anime the pos becomes distorted i dont know why. ")
}
  if ((keyWentUp("space")) && (gameState==CHANCE) && chance>0){
    chance-=1
    console.log("C :"+chance)
    gameState=PLAY
    vignetteRed.visible=false
    missed=0
    obstacle.destroy()
    cash.destroy()
    diamonds.destroy()
    sword.destroy()
    jwellery.destroy()
    boy.visible=true
    
  }
  if ((keyDown("space")) && (gameState==END)){
    gameState=PLAY
    treasureCollection=0
    chance=5;missed=0;
  vignetteRed.visible=false
    obstacle.destroy()
    cash.destroy()
    diamonds.destroy()
    sword.destroy()
    jwellery.destroy()
  }
  console.log(missed)
  
  textSize(20);
  fill(rgb(150,150,250));
  text("Treasure: "+ treasureCollection,150,30);
}



function createObstacle() {
  if (World.frameCount % 130 == 0 && gameState==PLAY) {
  obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
  obstacle.addImage(obsImg);
  obstacle.scale=0.35;
  obstacle.setCollider("rectangle",0,0,550,250)
  obstacle.velocityY = random(4,5);
  obstacle.lifetime = 150;
  obstacleG.add(obstacle);
  invo=createSprite(obstacle.x,obstacle.y,10,10)
  invo.addImage(obsImg)
  invo.scale=0.35
  invo.velocityY=obstacle.velocityY;
  invo.lifetime=100
    invoG.add(invo)
    //invo.visible=false
    invo.setCollider("rectangle",0,0,550,550)
    //invo.debug=true
    invo.depth=boy.depth-1
    obstacle.depth=boy.depth-1
    
  }
}
function createCash() {
  if (World.frameCount % 120 == 0&& gameState==PLAY) {
  cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = random(3,4);
  cash.lifetime = 150;
  cashG.add(cash);
  vignetteRed.visible=false
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0 && gameState==PLAY) {
  diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = random(3,5);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  vignetteRed.visible=false
}
}

function createJwellery() {
  if (World.frameCount % 130 == 0 && gameState==PLAY) {
  jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = random(5,7);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  vignetteRed.visible=false  }
}

function createSword(){
  if (World.frameCount % 150 == 0 && gameState==PLAY) {
  sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = random(2,10);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}