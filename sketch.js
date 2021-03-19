var dog,dogImg,happyDog,happyDogImg,database,foodS,foodStock,database;
var foodObj;
function preload(){
    dogImg=loadImage("dogImg.png");
    happyDogImg=loadImage("dogImg1.png");
}

function setup() {
	  createCanvas(500,500);

    database=firebase.database();

    foodStock=database.ref("Food");
    foodStock.on("value",readStock)

    dog=createSprite(250,300,50,50);
    dog.addImage(dogImg);
    dog.scale=0.3
    
    foodObj=new Food();
    feed=createButton("feed the dog");
    feed.position(525,95);
    feed.mousePressed(feedDog);
    addFood=createButton("addFood");
    addFood.position(790,95);
    addFood.mousePressed(addFoods);

}


function draw() {
    background(46,139,87);
    foodObj.display();
    fedTime=database.ref("feedtime");
    fedTime.on("value",function(data){
        lastFed=data.val();
    })
    drawSprites();
}

function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
}
function addFoods(){
    foodS++;
    database.ref("/").update({
        Food:foodS
    })
}
function feedDog(){
    dog.addImage(happyDogImg);
    if(foodObj.getFoodStock()<=0){
        foodObj.updateFoodStock(foodObj.getFoodStock()*0);
    }
    else{
        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
    database.ref("/").update({
        Food:foodObj.getFoodStock(),
       // feedtime:hour()
    })
}