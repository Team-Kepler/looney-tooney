var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var input = new Input();
attachListeners(input);

var bckgImg = new Image();
bckgImg.src = 'images/background-two.png';

var player = new Player(100, 460);
var yosemity = new Yosemity(200,300);


function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    if(input.d || input.right) {
        player.movement.right = true;
        player.movement.left = false;
        player.movement.idle = false;
        player.movement.jump=false;

    } else if(input.a || input.left) {
        player.movement.right = false;
        player.movement.left = true;
        player.movement.idle = false;
        player.movement.jump=false;

    } else if(input.space){
        player.movement.right = false;
        player.movement.left = false;
        player.movement.idle = false;
        player.movement.jump = true;
    }else {
        player.movement.right = false;
        player.movement.left = false;
        player.movement.jump=false;
        player.movement.idle = true;
    }

    player.update();
    yosemity.update();
}

function render(ctx) {

    console.log('j0ohn')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bckgImg, 0, 0, canvas.width, canvas.height);

    player.render(ctx);
    yosemity.render(ctx);
}

update();