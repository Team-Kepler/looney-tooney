var canvas = getDocumentElementById('canvas');
var ctx = canvas.getContext('2d');

var keys = new Input();
attachListeners(keys);

//Create enemy Yosemity
var yosemity = new Player(50, 390);


function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
};

function tick() {
    if(keys.right) {
        yosemity.movement.right = true;
    } else {
        yosemity.movement.right = false;
    };

    if(keys.left) {
        yosemity.movement.left = true;
    }else {
        yosemity.movement.left = false;
    };

    if(keys.up) {
        yosemity.movement.up = true;
    }else {
        yosemity.movement.up = false;
    };

    if(keys.down) {
        yosemity.movement.down = true;
    }else {
        yosemity.movement.down = false;
    }

    yosemity.update();

};

function render(ctx) {
    //clear the animation
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    yosemity.render(ctx);

};

update();