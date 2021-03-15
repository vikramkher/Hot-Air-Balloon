var balloon,dataref,database,position,bgimg,hab1,hab2,hab3,amm;

function preload(){
   bgimg=loadImage("images/Hot Air Ballon-01.png");
   amm=loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}

function setup(){
    database=firebase.database()
    createCanvas(1400,700);
    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("image",amm)
    balloon.scale=0.3

    dataref=database.ref('ballon/position');
    dataref.on("value",readPosition);
}

function draw(){
    background(bgimg);
    if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10
    changePosition(-10,0)
    }
    else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10
    changePosition(10,0)
    }
    else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10
    changePosition(0,-10)
    balloon.scale=balloon.scale-0.01
    }
    else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10
    changePosition(0,10)
    balloon.scale=balloon.scale+0.01
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ballon/position').set({
        'x':balloon.x+x,
        'y':balloon.y+y
    })
    
}

function readPosition(data){
position=data.val()
balloon.x=position.x
balloon.y=position.y

}