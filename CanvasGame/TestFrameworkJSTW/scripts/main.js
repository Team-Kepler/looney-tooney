var audio = document.getElementById("audio");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function enableMute() {
    audio.muted = true;
}

function disableMute() {
    audio.muted = false;
}

var input = new Input();
attachListeners(input);

var bckgClouds = new Image();
bckgClouds.src = 'images/clouds1.jpg';

var background = new Background();

var ground = 460,
    player = new Player(100, ground);

var spike1,
    spike2,
    newSpike;
do {
    newSpike = new Spike(getRandomInt(50, 900), 480);
} while (newSpike.intersectsLeft(player) || newSpike.intersectsRight(player));

spike1 = newSpike;

do {
    newSpike = new Spike(getRandomInt(50, 900), 480);
} while (newSpike.intersectsLeft(spike1) || newSpike.intersectsRight(spike1) || 
        newSpike.intersectsLeft(player) || newSpike.intersectsRight(player));

spike2 = newSpike;

var yosemity = new Yosemity(900, 500),
    bullet1 = new Bullet(1120, 520),
    bullet2 = new Bullet(1120, 510);

var fallingBonus = new FallingBonus(getRandomInt(20, 950), 50),
    fallingPresent = new FallingPresent(getRandomInt(20, 950), 100),
    roadRunner = new RoadRunner(1200, 450),
    coyote = new Coyote(1300, 450),
    timerMinutes = 0, 
    timerSeconds = 0,
    timerCurrentValue = 0,
    timerLastValue = -1,
    timerLockZero = false,
    timerPad = '00',
    timeToGiftCreation = 0,
    gameOver = false;
    

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 2)) + min;
}

function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    timeToGiftCreation = Math.floor(new Date().getTime()/1000)%60;
    
    if(!gameOver) {
        if (player.lives === 0 || player.score >= 50) {
            gameOver = true;
        }

        timerCurrentValue = Math.floor(new Date().getTime()/1000)%60;

        if (timerCurrentValue === 0 && !timerLockZero) {
            timerLastValue = -1;
            timerLockZero = true;
        }
        if (timerCurrentValue === 1) {
            timerLockZero = false;
        }
        if (timerCurrentValue > timerLastValue) {
            timerLastValue = timerCurrentValue;
            timerSeconds++;

            if (timerSeconds === 60) {
                timerSeconds = 0;
                timerMinutes++;
            }
        }


        if (!player.movement.down) {
            player.movement.right = false;
            player.movement.left = false;
            player.movement.spin = false;
            player.movement.signUp = false;
            player.movement.idle = true;
        }

        if(input.d || input.right) {
            if(player.position.x < 1020) {
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
            }
            else if (player.character === 'taz') {
                player.movement.spin = true;
                player.movement.idle = false;

                if(player.intersects(spike1)){
                    do {
                        newSpike = new Spike(getRandomInt(50, 900), 480);
                    }
                    while (newSpike.intersectsRight(spike2) || newSpike.intersectsLeft(spike2));
                   
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

        if(player.intersects(fallingPresent)){
            player.lives++;
            roadRunner.movement.left = true;
            coyote.movement.left = true;
            fallingPresent = new FallingPresent(1200, 10);
        }

        if(fallingPresent.position.y >= 580){
            if(timeToGiftCreation === 0) {
                fallingPresent = new FallingPresent(getRandomInt(20, 950), 10);
                roadRunner = new RoadRunner(1200, 475);
                coyote = new Coyote(1300, 475);
            }
        }

        //Yosemity shooting
        if(yosemity.position.x >= 1001 && yosemity.position.x <= 1050  && yosemity.movement.left) {
            
            bullet1 = new Bullet(yosemity.position.x - 10, 520);
            bullet2 = new Bullet(yosemity.position.x - 10, 510);
            bullet1.movement.left = true;
            bullet2.movement.left = true;

        } else if(yosemity.position.x >= 0 && yosemity.position.x <= 10 && !yosemity.movement.left){
            
            bullet1 = new Bullet(yosemity.position.x + 40, 520);
            bullet2 = new Bullet(yosemity.position.x + 40, 510);
            bullet1.movement.right = true;
            bullet2.movement.right = true;
        }

        if(player.intersects(bullet1) || player.intersects(bullet2)) {
        	bullet1 = new Bullet(1120, 520);
        	bullet2 = new Bullet(1120, 510);
        	player.lives--;
        }

        background.update();
        roadRunner.update();
        coyote.update();
        player.update();
        bullet1.update();
        bullet2.update();
        yosemity.update();
        fallingBonus.update();
        fallingPresent.update();

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
    fallingPresent.render(ctx);
    bullet1.render(ctx);
    bullet2.render(ctx);
    roadRunner.render(ctx);
    coyote.render(ctx);


    //drawBoundingBoxes();

    ctx.font = "40px Berkshire Swash, cursive";
    ctx.fillStyle = "pink";

    ctx.fillText("Scores: " + player.score + "/50", 200, 50);
    ctx.fillText("Timer: " + (timerPad + timerMinutes).slice(-2) + ":" + (timerPad + timerSeconds).slice(-2), 440, 50);
    ctx.fillText("Lives: " + player.lives, 690, 50);


    if(gameOver) {
        ctx.fillStyle = '#6D493B';
        ctx.rect(420, 150, 300, 200);
        ctx.fill();
        ctx.strokeStyle = '#717935';
        ctx.lineWidth = 7;
        ctx.rect(420, 150, 300, 200);
        ctx.stroke();

        ctx.fillStyle = "pink";
        ctx.font = "40px Berkshire Swash, cursive";
        ctx.fillText('Game Over', 480, 220);
        ctx.font = "35px Berkshire Swash, cursive";
        
        if(player.score >= 50) {
            ctx.fillText('YOU WON!', 480, 300);
        } else {
            ctx.fillText('YOU LOST!', 480, 300);
        }

        audio.muted = true;
    }
}

function drawBoundingBoxes() {
    ctx.beginPath();
    ctx.strokeStyle = 'red';

    ctx.rect(spike1.boundingBox.x, spike1.boundingBox.y, spike1.boundingBox.width, spike1.boundingBox.height);
    ctx.rect(spike2.boundingBox.x, spike2.boundingBox.y, spike2.boundingBox.width, spike2.boundingBox.height);
    ctx.rect(bullet1.boundingBox.x, bullet1.boundingBox.y, bullet1.boundingBox.width, bullet1.boundingBox.height);
    ctx.rect(bullet2.boundingBox.x, bullet2.boundingBox.y, bullet2.boundingBox.width, bullet2.boundingBox.height);
    ctx.rect(player.boundingBox.x, player.boundingBox.y, player.boundingBox.width, player.boundingBox.height);
    ctx.rect(fallingBonus.boundingBox.x, fallingBonus.boundingBox.y, fallingBonus.boundingBox.width, fallingBonus.boundingBox.height);
    ctx.rect(fallingPresent.boundingBox.x, fallingPresent.boundingBox.y, fallingPresent.boundingBox.width, fallingPresent.boundingBox.height);
    ctx.rect(roadRunner.boundingBox.x, roadRunner.boundingBox.y, roadRunner.boundingBox.width, roadRunner.boundingBox.height);
    ctx.rect(coyote.boundingBox.x, coyote.boundingBox.y, coyote.boundingBox.width, coyote.boundingBox.height);

    ctx.stroke();
}

update();
