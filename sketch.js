
var monkey , monkey_running,ground,jumper,ground2,ground2image;
var banana, bananaGroup,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,survival=0;
var gameState="play";

function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground2image = loadImage("ground.png")
 
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(75,200,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.15
  
  ground = createSprite(0,550,600,20);
  ground.x = ground.width /2;

  
  jumper = createSprite(300,300,600,600);
  jumper.visible=false;
  
  
  foodGroup = new Group();
  obstaclesGroup = new Group();

}


function draw() {
  background(1234);
  
  
  //stop monkey from falling down
  monkey.collide(ground);
  
    if(gameState==="play"){
    monkey.velocityY=monkey.velocityY+0.8;       
    
      survival=Math.ceil(frameCount/30)
  text("Survival Time: "+survival,100,100)
    
    
    console.log(score);
      
          if(keyDown("space")&& monkey.y >= 480) {
    monkey.velocityY = -17;
    }
  
  if(keyDown("up")&& monkey.y >= 480) {
    monkey.velocityY = -17;
    }
  
    if(mousePressedOver(jumper)&& monkey.y >= 480) {
    monkey.velocityY = -17;
    }
    
    }
  
  stroke("red")
  textSize(20)
  fill("black")
  text("Score: " + score,400,100)
  
  stroke("black")
  textSize(20)
  fill("red")
  survival=Math.ceil(frameCount/30)
  text("Survival Time: "+survival,100,100)
  
      if(monkey.isTouching(foodGroup)){
        foodGroup.destroyEach();
        score=score+1;
       }   
    if(monkey.isTouching(obstaclesGroup)){
      gameState="end";
      
    }
    
    bananas();
    rock();
  
  
  
    if(gameState==="end"){
     monkey.x=500;
     obstaclesGroup.destroyEach();
     foodGroup.destroyEach();
  }
  
    drawSprites();
}
function bananas(){
  if(frameCount%100===0){
    yb=Math.round(random(450,360));
    banana=createSprite(600,yb,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=150;
    
    foodGroup.add(banana);
  }
}

function rock(){
  if(frameCount%250===0){
    obstacle=createSprite(600,510,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.19;
    obstacle.lifetime=150;
    obstaclesGroup.add(obstacle);
  }
}