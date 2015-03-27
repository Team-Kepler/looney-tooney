var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ground = 460; // the ground y value

var input = new Input();
attachListeners(input);

var bckgImg = new Image();
bckgImg.src = 'images/background.png'

function Background() {
    this.x = 0,
        this.y = 0,
        this.width = bckgImg.width,
        this.height = bckgImg.height;
    this.render = function() {
        ctx.drawImage(bckgImg, this.x += -1, 0, canvas.width, canvas.height);
        if(this.x <= -580) {
            this.x = 0;
        }
    }
}

var background = new Background();



spike1 = new Spike(280, 480);
spike2 = new Spike(480, 480);


var player = new Player(100, 475);
var yosemity = new Yosemity(900,499);
var fallingBonus=new FallingBonus(50,50);
var scores =0;
var lives=0;
var timer=0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    if((fallingBonus.position.y>=580) || player.boundingBox.intersects(fallingBonus.boundingBox)){

            fallingBonus=new FallingBonus(getRandomInt(20,1000),50);
    }

    if (!player.movement.down) {
        player.movement.right = false;
        player.movement.left = false;
        player.movement.spin = false;
        player.movement.signUp = false;
        player.movement.idle = true;
    }

    if(input.d || input.right) {
        player.movement.right = true;
        player.movement.left = false;
        player.movement.idle = false;

    } else if(input.a || input.left) {
        player.movement.right = false;
        player.movement.left = true;
        player.movement.idle = false;

    } 

    if(input.space) {
        if(player.character === 'bugs') {
            player.movement.jump = true;
            player.movement.idle = false;
        } else if (player.character === 'taz') {
            player.movement.spin = true;
            player.movement.idle = false;
            if((player.position.x === 280) || player.boundingBox.intersects(spike1.boundingBox)){
                spike1 = new Spike(1300, 10);
            }
        } else if (player.character === 'daffy') {
            player.movement.signUp = true;
            player.movement.idle = false;
        }
    }




    player.update();
    yosemity.update();
    fallingBonus.update();
}

function render(ctx) {

    //console.log('j0ohn')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  //  ctx.drawImage(bckgImg, 0, 0, canvas.width, canvas.height);
    /*background.render(ctx);*/


    background.render(ctx);
    player.render(ctx);
    yosemity.render(ctx);
    fallingBonus.render(ctx);



    spike1.render(ctx);
    spike2.render(ctx);

    ctx.beginPath();
    ctx.strokeStyle = 'red';

    ctx.rect(spike1.boundingBox.x, spike1.boundingBox.y, spike1.boundingBox.width, spike1.boundingBox.height);
    ctx.rect(spike2.boundingBox.x, spike2.boundingBox.y, spike2.boundingBox.width, spike2.boundingBox.height);
    ctx.rect(player.boundingBox.x, player.boundingBox.y, player.boundingBox.width, player.boundingBox.height);
    
    ctx.stroke();

    ctx.font="25px Arial";
    ctx.fillStyle="white";
    ctx.fillText("Scores: "+scores,100,50);
    ctx.fillText("Timer: "+timer,340,50);
    ctx.fillText("Lives: "+lives,550,50);


}

update();