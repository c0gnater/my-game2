var runner,runningAnimation;
var runningAnimation2;
var backgroundImage;
var robberRight,robberLeft,robberRunAnimationRight,robberRunAnimationLeft;
var spike,spike2,spike3,spikeGroup,spikeImage;
var amulet,amuletImage;
var brick,brickImage;
var groundF1,groundF2,groundF3;
var edges;
var gameState="play"
var brickGroup;
var vine,vine2,vineGroup,vineImage;


function preload(){
runningAnimation=loadAnimation("runner1.png","runner2.png","runner3.png","runner4.png")
backgroundImage=loadImage("forest.jpg");
robberRunAnimationRight=loadAnimation("robber1.png","robber2.png","robber3.png");
robberRunAnimationLeft=loadAnimation("robber1Flip.png","robber2Flip.png","robber3Flip.png")
amuletImage=loadImage("amulet.png");
brickImage=loadImage("brick.png");
spikeImage=loadImage("spike.png");
vineImage=loadImage("vine.png");
runningAnimation2=loadAnimation("runner1Flip.png","runner2Flip.png","runner3Flip.png","runner4Flip.png");




}

function setup() {
  createCanvas(800,400);
  runner=createSprite(100,300);
  runner.addAnimation("running",runningAnimation);
  runner.scale=0.2

  runner.addAnimation("running2",runningAnimation);
  runner.changeAnimation("running");

  robberRight=createSprite(400,300);
  robberRight.addAnimation("walkRight",robberRunAnimationRight);
  robberRight.addAnimation("left",robberRunAnimationLeft);
  robberRight.changeAnimation("walkRight")
  robberRight.scale=0.2;

  

  amulet=createSprite(750,50);
  amulet.addImage("amulet",amuletImage);
  amulet.scale=0.3

  brickGroup=new Group()

  spikeGroup=new Group();
  spike=createSprite(135,200);
  spike.addImage("spike",spikeImage);
  spike.scale=0.125;

  spike2=createSprite(400,95);
  spike2.addImage("spike",spikeImage);
  spike2.scale=0.125;

  spike3=createSprite(545,200);
  spike3.addImage("spike",spikeImage);
  spike3.scale=0.125;

  spikeGroup.add(spike)
  spikeGroup.add(spike2)
  spikeGroup.add(spike3)

  vineGroup=new Group();
  vine=createSprite(140,0)
  vine.addImage("vine",vineImage);
  vine.scale=0.7

  
  vine.setCollider('rectangle',0,0,100,200)
  

  vine2=createSprite(470,0)
  vine2.addImage("vine",vineImage);
  vine2.scale=0.7

  vine2.setCollider('rectangle',0,0,100,200)

  vineGroup.add(vine);
  vineGroup.add(vine2);
  

  

  for(var i=0;i<=23;i++){
  groundF1=createSprite((30+10)*i,360);
  groundF1.addImage("brick",brickImage);
  groundF1.scale=0.1
  brickGroup.add(groundF1);
  }

  for(var i=0;i<=15;i++){
    groundF2=createSprite(((400+10)/3)*i,230);
    groundF2.addImage("brick",brickImage);
    groundF2.scale=0.1
    brickGroup.add(groundF2);
    }
    robberRight.velocityX=3
    for(var i=0;i<=5;i++){
      groundF3=createSprite(((200))*i,125);
      groundF3.addImage("brick",brickImage);
      groundF3.scale=0.1
      brickGroup.add(groundF3);
      }
    
  

edges=createEdgeSprites()

}

function draw() {

  if(gameState === "play"){
  background(backgroundImage);



 
  if(robberRight.isTouching(edges[1])){
    robberRight.changeAnimation("left")
  }
 
  
  if(robberRight.isTouching(edges[0])){
  robberRight.changeAnimation("walkRight")
  }

  

  
  robberRight.bounceOff(edges);  
  if(keyDown("d")){
    runner.x=runner.x+4;
    runner.changeAnimation("running");
    
  }
  if(keyDown("a")){
    runner.x=runner.x-4;
    runner.changeAnimation("running2");
  }
  if(keyDown("space")){
    runner.velocityY=-3
  }
  runner.velocityY=runner.velocityY+0.3;
  if(runner.isTouching(robberRight)){
  gameState="end"
  }
  runner.collide(brickGroup);

  if(runner.isTouching(spikeGroup)||runner.isTouching(vineGroup)){
    gameState='end'
  }
  
  

  

drawSprites();  

  }
  if(gameState=="end"){
    background(0)
    textSize(40)
    fill("red")
    text("Game Over",300,200);

  }
 
  }
