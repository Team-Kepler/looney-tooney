var FallingPresent = (function() {
    function FallingPresent(x, y) {
        this.position = new Vector2(x,y);
        this.velocity = 2;
        this.width = 40;
        this.height = 40;
        this.animation =
            new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/present.png',
                4,
                0,
                4
            );
        this.boundingBox = new Rectangle (
            x,
            y,
            this.width,
            this.height
        );
    }

    FallingPresent.prototype.update = function() {

        this.position.y += this.velocity;
        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };


    FallingPresent.prototype.render = function(ctx) {
        this.animation.setLimit(1);
        this.animation.setRow(0);
        this.animation.draw(ctx);
    };

    return FallingPresent;
}());
