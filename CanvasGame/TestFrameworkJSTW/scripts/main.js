var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ground = 460; // the ground y value

var input = new Input();
attachListeners(input);

var bckgImg = new Image();
bckgImg.src = 'images/backgroundWide.png';

var bckgClouds = new Image();
bckgClouds.src = 'images/clouds1.jpg';

function Background() {
    this.x = 0,
        this.y = 0,
        this.width = bckgImg.width,
        this.height = bckgImg.height;
    this.render = function() {
        ctx.drawImage(bckgImg, this.x -= 3, 0, bckgImg.width, canvas.height);
        if(this.x <= -1099) {
            this.x = 0;
        }
    }
}

var background = new Background();

var spike1 = new Spike(280, 480);
var spike2 = new Spike(480, 480);
var newSpike;

var player = new Player(100, 475);
var yosemity = new Yosemity(900,499);
var fallingBonus=new FallingBonus(50,50);
var timer = 0;
var gameOver = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

function tick() {

    if(!gameOver) {

        if (player.lives < 0) {
            console.log('You died!');
            gameOver = true;
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

                if(player.intersects(spike1)){
                    do {
                        newSpike = new Spike(getRandomInt(50, 900), 480);
                    } while (newSpike.intersectsRight(spike2) || newSpike.intersectsLeft(spike2)); 
                   
                    spike1 = newSpike;

                } else if(player.intersects(spike2)) {

                    do {
                        newSpike = new Spike(getRandomInt(50, 900), 480);
                    } while (newSpike.intersectsRight(spike1) || newSpike.intersectsLeft(spike1));
                   
                    spike2 = newSpike;
                }
            } else if (player.character === 'daffy') {
                player.movement.signUp = true;
                player.movement.idle = false;
            }
        }

        if(player.intersects(fallingBonus) && player.character !== 'taz') {            
            
            if(player.character==='daffy'){
                player.score += 5;
            } else {
                player.score++;
            }
            
            fallingBonus = new FallingBonus(getRandomInt(20,950), 10);
        
        } else if(fallingBonus.position.y >= 580){   

            fallingBonus = new FallingBonus(getRandomInt(20,950), 10);
        }

        player.update();
        yosemity.update();
        fallingBonus.update();

    }
}

function render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bckgClouds, 0, 0, canvas.width, canvas.height);
    /*background.render(ctx);*/

    background.render(ctx);
    player.render(ctx);
    yosemity.render(ctx);
    fallingBonus.render(ctx);

    spike1.render(ctx);
    spike2.render(ctx);

    drawBoundingBoxes();

    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Scores: " + player.score, 100, 50);
    ctx.fillText("Timer: " + timer, 340, 50);
    ctx.fillText("Lives: " + player.lives, 550, 50);

    if(gameOver) {
        ctx.font = "30pt Comic Sans MS"
        ctx.fillStyle = 'yellow';
        ctx.fillText('Game Over', 420, 270);
    }


}

function drawBoundingBoxes() {
    ctx.beginPath();
    ctx.strokeStyle = 'red';

    ctx.rect(spike1.boundingBox.x, spike1.boundingBox.y, spike1.boundingBox.width, spike1.boundingBox.height);
    ctx.rect(spike2.boundingBox.x, spike2.boundingBox.y, spike2.boundingBox.width, spike2.boundingBox.height);
    ctx.rect(player.boundingBox.x, player.boundingBox.y, player.boundingBox.width, player.boundingBox.height);
    ctx.rect(fallingBonus.boundingBox.x, fallingBonus.boundingBox.y, fallingBonus.boundingBox.width, fallingBonus.boundingBox.height);

    ctx.stroke();
}

update();
