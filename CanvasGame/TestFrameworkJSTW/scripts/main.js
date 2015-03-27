var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ground = 460; // the ground y value

var input = new Input();
attachListeners(input);

var bckgImg = new Image();
bckgImg.src = 'images/background-two.png';

var spike1 = new Spike(280, 480),
    spike2 = new Spike(450, 480);

var player = new Player(100, 460);
var yosemity = new Yosemity(200,300);


function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    if (!player.movement.down) {
        player.movement.right = false;
        player.movement.left = false;
        player.movement.jump = false;
        player.movement.idle = true;
    }
 //   player.movement.right = false;
 //   player.movement.left = false;
 //   player.movement.jump = false;
 //   player.movement.idle = true;

    if(input.d || input.right) {
        player.movement.right = true;
        player.movement.left = false;
        player.movement.idle = false;

    } else if(input.a || input.left) {
        player.movement.right = false;
        player.movement.left = true;
        player.movement.idle = false;

    } 

    if(input.space){
        player.movement.jump = true;
        player.movement.idle = false;
    } 

    player.update();
    yosemity.update();

    if(player.movement.down) {
        console.log('down');
    }
}

function render(ctx) {

    //console.log('j0ohn')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bckgImg, 0, 0, canvas.width, canvas.height);

    player.render(ctx);
    yosemity.render(ctx);
    spike1.render(ctx);
    spike2.render(ctx);

}

update();