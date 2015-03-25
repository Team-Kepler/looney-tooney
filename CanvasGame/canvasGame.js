//All values are in pixels
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
document.body.appendChild(canvas);


// Background image
var isBgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    isBgReady = true;
};
bgImage.src = "images/background-two.png";

////Create enemy Yosemity
//var yosemity = new Player(820, 390);

// Duck image
var isPlayerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
    isPlayerReady = true;
};
playerImage.src = "images/player-sprite-sheet.png";

// Game objects
var player = {
    x:0,
    y:0,
    speed: 150,//230,
    width:45,
    height:90,
    frames : 4,
    currentFrame : 0,
    boxWidth:50,
    boxHeight:90
};


// Keyboard controls
var keysDown = [];
var keysPressed=[];

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function (e) {
    keysPressed[e.keyCode] = true;
}, false);

var changePlayer=function() {
    //key 1 is down
    if(49 in keysPressed){
        return 1;
    }
    //key 2 is down
    else if (50 in keysPressed) {
        return 2;
    }

    //key 3 is down
    else if (51 in keysPressed) {
        return 3;
    }
};

// Reset the game
var reset = function () {
    player.x = 0;
    player.y = 470;
};

//Player is moving left
var movingLeft=function() {
    if ((37 in keysDown) ||(65 in keysDown)) {
        if(player.x>0) {
            return true;
        }
    }
    return false;
};

//Player is moving right
var movingRight=function() {
    if ((39 in keysDown)|| (68 in keysDown)) {
        if(player.x<700) {
            return true;
        }
    }
    return false;
};

var daffyDuck=function() {
    if(movingRight()===true) {
        player.width=43;
        ctx.drawImage(playerImage, player.width * player.currentFrame, 90, player.width, player.height, player.x, player.y, player.boxWidth, player.boxHeight);
    } else if(movingLeft()===true) {
        player.width=43;
        ctx.drawImage(playerImage, player.width * player.currentFrame, 180, player.width, player.height, player.x, player.y, player.boxWidth, player.boxHeight);
    }
    //Shooting with Control
    else if(17 in keysDown) {
        player.width=90;
        player.boxWidth=player.width;
        ctx.drawImage(playerImage, 50, 0, player.width, player.height, player.x, player.y, player.boxWidth,  player.boxHeight);
    }
    //Idle
    else{
        player.width=45;
        player.boxWidth=45;
        ctx.drawImage(playerImage, 0, 0, player.width, player.height, player.x, player.y, player.boxWidth,  player.boxHeight);
    }
};

var taz=function() {
    playerImage.src="images/taz.png";
    player.y=490;
    player.boxHeight=70;
    player.boxHeight=70;
    if(movingRight()===true) {
        player.width=62;
        player.height=60;
        ctx.drawImage(playerImage, player.width * player.currentFrame, 70, player.width, player.height, player.x, player.y, player.boxWidth, player.boxHeight);
    } else if(movingLeft()===true) {
        player.width=62;
        player.height=60;
        ctx.drawImage(playerImage, player.width * player.currentFrame, 138, player.width, player.height, player.x, player.y, player.boxWidth,  player.boxHeight);
    }
    //Idle
    else{
        player.width=80;
        player.height=85;
        player.boxWidth=player.width;
        player.boxHeight=player.height;
        ctx.drawImage(playerImage, 0, 0, player.width, player.height, player.x, player.y, player.boxWidth, player.boxHeight);
    }
};

var bugsBunny=function() {
    playerImage.src="images/Bunny.png";
    if(movingRight()===true) {
        player.width=58;
        player.height=95;
        player.boxWidth=player.width;
        player.boxHeight=player.height;
        ctx.drawImage(playerImage, player.width * player.currentFrame, 95, player.width, player.height, player.x, player.y, player.boxWidth,player.boxHeight);
    } else if(movingLeft()===true) {
        player.width=58;
        player.height=95;
        player.boxWidth=player.width;
        player.boxHeight=player.height;
        ctx.drawImage(playerImage, player.width * player.currentFrame, 190, player.width, player.height, player.x, player.y, player.boxWidth, player.boxHeight);
    }
    //Idle
    else{
        player.width=80;
        player.height=85;
        player.boxWidth=player.width;
        player.boxHeight=player.height;
        ctx.drawImage(playerImage, 0, 0, player.width, player.height, player.x, player.y, player.boxWidth, player.boxHeight);
    }
};

// Update objects of the game
var update = function (deltaTime) {

    if(movingLeft()===true){
        player.x -= player.speed * deltaTime;
    }

    if(movingRight()===true) {
        player.x += player.speed * deltaTime;
    }
};

// Draw the game
var render = function () {
    if (isBgReady) {
        ctx.drawImage(bgImage, 0, 0, 1000, 600);
    }

    if (isPlayerReady) {
        //Change frames in time
        player.currentFrame = Math.floor(((new Date()).getTime()) * (player.frames/800.0)) % player.frames;
        //console.log(player.currentFrame);

        //Choose player
        if(changePlayer()===3) {
            daffyDuck();
        }
       else if(changePlayer()===2){
            bugsBunny();
        }
       else if(changePlayer()===1){
            taz();
        }
    }


};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = (now - lastTime) / 1000.0;

    update(delta);
    render(ctx);

    lastTime = now;

    // Request to do this again
    requestAnimationFrame(main);
};

// Browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Play game
var lastTime = Date.now();

reset();
main();

