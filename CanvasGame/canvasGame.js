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

// Duck image
var isDuckReady = false;
var duckImage = new Image();
duckImage.onload = function () {
    isDuckReady = true;
};
duckImage.src = "images/DuckNew.png";

// Game objects
var duck = {
    x:0,
    y:0,
    speed: 230,
    width:48,
    height:95,
    frames : 4,
    currentFrame : 0
};


// Keyboard controls
var keysDown = [];

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reset the game
var reset = function () {
    duck.x = 0;
    duck.y = 470;
};

//Player is moving left
var movingLeft=function() {
    if ((37 in keysDown) ||(65 in keysDown)) {
        if(duck.x>0) {
            return true;
        }
    }
    return false;
};

//Player is moving right
var movingRight=function() {
    if ((39 in keysDown)|| (68 in keysDown)) {
        if(duck.x<700) {
            return true;
        }
    }
    return false;
};


// Update objects of the game
var update = function (deltaTime) {

    if(movingLeft()===true){
        duck.x -= duck.speed * deltaTime;
    }

    if(movingRight()===true) {
        duck.x += duck.speed * deltaTime;
    }
};

// Draw the game
var render = function () {
    if (isBgReady) {
        ctx.drawImage(bgImage, 0, 0, 1000, 600);
    }

    if (isDuckReady) {
        //Change frames in time
        duck.currentFrame = 0 |(((new Date()).getTime()) * (duck.frames/800.0)) % duck.frames;
        //console.log(duck.currentFrame);
        if(movingRight()===true) {
            ctx.drawImage(duckImage, duck.width * duck.currentFrame, 0, duck.width, duck.height, duck.x, duck.y, duck.width, duck.height);
        } else if(movingLeft()===true) {
            duck.width=50;
            ctx.drawImage(duckImage, duck.width * duck.currentFrame, 95, duck.width, duck.height, duck.x, duck.y, duck.width, duck.height);
        } else{
            ctx.drawImage(duckImage, 0, 0, duck.width, duck.height, duck.x, duck.y, duck.width, duck.height);
        }
    }
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = (now - lastTime) / 1000.0;

    update(delta);
    render();

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

