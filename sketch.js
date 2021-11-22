//calling variables
var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img,obstacle_img2,obstaclesGroup2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver; 
var score=0;
var attempts=3;

function preload(){
//loading image for background  
  backImage= loadImage("jungle.jpg");
//loading animation for monkey

//loading images for banana and obstacles
player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage = loadImage("banana.png");
obstacle_img = loadImage("stone.png"); 
gameOverImg = loadImage("gameOver.png");
obstacle_img2=loadImage("obstacle.png");

}

function setup() {
//creating canvas  
  createCanvas(800,400);

//creating background sprite
backgr=createSprite(0,0,800,400);
backgr.addImage(backImage);
backgr.scale=1.5;
backgr.x=backgr.width/2;
backgr.velocityX=-4;


//creating monkey sprite
  player = createSprite(100,340,20,50);
  player.addAnimation ("running", player_running);
  player.scale= 0.2;

//creating ground sprite
ground = createSprite(400,350,800,10);
ground.x=ground.width/2;
ground.visible=false;

//creating groups for banana and obstacles
  FoodGroup= new Group ();
  obstaclesGroup= new Group ();
  obstaclesGroup2 = new Group();
}
function draw() {
//assigning background color
  background("white");
  
//to know the position of monkey to make more changes
  console.log(player.y);

//reseting background
  if (backgr.x<100) {
    backgr.x= backgr.width/2
  }   
//making the monkey jump  
  if (keyDown ("space")&& player.y>=100) {
    player.velocityY= -18;  
  }    
  
//adding gravity to monkey
  //player.velocityY= player.velocityY + 0.9;

//preventing the monkey from falling off the ground
  player.collide (ground);

//scoring system and changing size of the monkey
  if (FoodGroup.isTouching(player)) {
    score= score+2;
    FoodGroup.destroyEach();
    player.scale=player.scale+0.1;
  }
  if(frameCount % 200 === 0){
    obstacle2 = createSprite (805,300,80,80);
   
  // obstacle2.y = Math.round(random(300,300));
  obstacle2.addImage(obstacle_img2);

   obstacle2.scale=0.02;
   
   obstacle2.velocityX=-2
   obstacle2.depth = player.depth;
  player.depth = player.depth+1
  
 
 obstaclesGroup2.add(obstacle2);
  }
if(obstaclesGroup2.isTouching(player)){
     obstaclesGroup2.destroyEach();
     player.scale=0.1
   }
 if (obstaclesGroup.isTouching(player)) {
    score= 0;
    obstaclesGroup.destroyEach();
    player.scale= 0.1;
  }

//calling user-defined functions
  spawnFood();
  spawnObstacles();
  spawnObstacles2();

//drawing sprites
  drawSprites();

//displaying score
  stroke ("white");
  textSize (15);
  text ("Score: "+score,190,70);  
}

  
  

//function for obstacles
function spawnObstacles () {
if (frameCount%90===0) {
  obstacle= createSprite (270,370,10,10);
  obstacle.addImage ("obstacleImage", obstacle_img);
  obstacle.scale= 0.1;
  obstacle.velocityX= -4;
  
  //adding obstacle to obstacle group
    obstaclesGroup.add(obstacle);
    //obstacle2Group.add(obstacle)
}
}
function spawnFood () {
  if (frameCount%90===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    
    //adding lifetime to bananas
      banana.lifetime=-1;
    
    //adding banana to banana group
      FoodGroup.add(banana);
  }
}

function spawnObstacles2(){
if(frameCount % 200 === 0){
  obstacle2 = createSprite (805,300,80,80);
 
// obstacle2.y = Math.round(random(300,300));
obstacle2.addImage(obstacle_img2);

 obstacle2.scale=0.02;
 
 obstacle2.velocityX=-2
 obstacle2.depth = player.depth;
player.depth = player.depth+1


obstaclesGroup2.add(obstacle2);
}   
}


