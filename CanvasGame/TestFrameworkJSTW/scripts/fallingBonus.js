var FallingBonus = (function() {
    function FallingBonus(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right: false,
            up: false,
            down: false,
            jump: false,
            idle: true
        };
        this.velocity = 2;
        this.width = 30;
        this.height = 30;
        this.animationLib = {
            carrot: new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/carrot.png',
                4,
                0,
                4
            )
            //quote: new Animation(
            //    this.width,
            //    this.height,
            //    0,
            //    0,
            //    4,
            //    'images/DaffyQuote.png',
            //    4,
            //    0,
            //    4
            //)
        };
        this.animation = this.animationLib.carrot;
        this.boundingBox = new Rectangle (
            x,
            y,
            this.width,
            this.height
        );
    }

    FallingBonus.prototype.update = function() {

        this.position.y += this.velocity;
        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };


    FallingBonus.prototype.render = function(ctx) {
            this.animation.setLimit(1);
            this.animation.setRow(0);

        this.animation.draw(ctx);
    };

    return FallingBonus;
}());