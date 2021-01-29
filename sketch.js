var PLAY=1
var END=0
var gameState= PLAY
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var sword,cash,jwllery,diamonds;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  BoyImg = loadAnimation("runner1.png")
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

invCollider=createSprite(200,350,400,10)
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
//creating boy running
boy = createSprite(70,330,20,20);
boy.scale=0.08;
boy.setCollider("circle",10,10,500) 

cashG=new Group();
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
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  }
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50
    
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+250
    
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150
      
    }else if(swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      gameState=END   
     }
  
  else if (swordGroup.isTouching(invCollider)) {
gameState=END
      }else if (jwelleryG.isTouching(invCollider)) {
gameState=END
  }else if  (diamondsG.isTouching(invCollider)){
gameState=END
    }
  else {
    if (cashG.isTouching(invCollider)){
gameState=END      
    }
  }
  if (gameState==END){
    fill(0)
    textSize(30)
    text("Score: "+treasureCollection,140,300)
    swordGroup.remove(sword) 
    diamondsG.remove(diamonds)
    cashG.remove(cash)
    jwelleryG.remove(jwellery)
    

    
    sword.velocityY=0; sword.lifetime=0
    jwellery.velocityY=0;jwellery.lifetime=0
    cash.velocityY=0;cash.lifetime=0
    diamonds.velocityY=0;diamonds.lifetime=0    
    path.velocityY=0
    invCollider.visible=false
    boy.changeAnimation("gameOver",endImg);
    boy.scale=0.5
    boy.x=20;boy.y=200;
    textSize(15)
    console.log("On scaling up gameover anime the pos becomes distorted i dont know why. ")
}
  if ((keyDown("space")) && (gameState==END)){
    gameState=PLAY
    treasureCollection=0
    cash.destroy()
    diamonds.destroy()
    sword.destroy()
    jwellery.destroy()
  }
  console.log(gameState)
  
  textSize(20);
  fill(rgb(150,150,250));
  text("Treasure: "+ treasureCollection,150,30);
}

function createCash() {
  if (World.frameCount % 120 == 0&& gameState==PLAY) {
  cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = random(3,4);
  cash.lifetime = 150;
  cashG.add(cash);
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
  }
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