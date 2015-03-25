var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var input = new Input();
attachListeners(input);

var bckgImg = new Image();
bckgImg.src = 'images/background-two.png';

var player = new Player(100, 100);



function update() {
    tick();
    render();
    requestAnimationFrame(update);
}

function tick() {
    if(input.d) {
        player.movement.right = true;
        player.movement.left = false;
        player.movement.idle = false;

    } else if(input.a) {
        player.movement.right = false;
        player.movement.left = true;
        player.movement.idle = false;

    } else {
        player.movement.right = false;
        player.movement.left = false;
        player.movement.idle = true;
    }

    player.update();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(bckgImg, 0, 0, canvas.width, canvas.height);

    player.render(ctx);
}

update();