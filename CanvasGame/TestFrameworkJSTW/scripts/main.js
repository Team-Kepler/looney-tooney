var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ground = 460; // the ground y value

var input = new Input();
attachListeners(input);

var bckgClouds = new Image();
bckgClouds.src = 'images/clouds1.jpg';

var background = new Background();

var spike1 = new Spike(280, 480);
var spike2 = new Spike(480, 480);
var newSpike;

var player = new Player(100, 475);
var yosemity = new Yosemity(900,500);
var fallingBonus=new FallingBonus(50,50);
var timer = 0;
var gameOver = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 2)) + min;
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
            if(player.position.x < 1100) {
                player.movement.right = true;
                player.movement.left = false;
                player.movement.idle = false;
                background.position.x -= 3;
            }

        } else if(input.a || input.left) {
            if(player.position.x >= 0) {
                player.movement.right = false;
                player.movement.left = true;
                player.movement.idle = false;
                background.position.x += 3;
            }

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



        background.update();
        player.update();
        yosemity.update();
        fallingBonus.update();

    }
}

function render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bckgClouds, 0, 0, canvas.width, canvas.height);


    background.render(ctx);
    player.render(ctx);
    spike1.render(ctx);
    spike2.render(ctx);
    yosemity.render(ctx);
    fallingBonus.render(ctx);



    drawBoundingBoxes();

    ctx.font = "40px Berkshire Swash, cursive";
    ctx.fillStyle = "pink";


    ctx.fillText("Scores: " + player.score, 250, 50);
    ctx.fillText("Timer: " + timer, 490, 50);
    ctx.fillText("Lives: " + player.lives, 700, 50);


    if(gameOver) {
        ctx.font = "40px Berkshire Swash, cursive";
        ctx.fillStyle = 'yellow';
        ctx.fillText('Game Over', 480, 270);
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
