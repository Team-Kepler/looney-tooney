var RoadRunner = (function() {
    function RoadRunner(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right:false
        };

        this.velocityX = 6;

        this.width = 85;
        this.height = 85;
        this.animation = new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/RunningCreatures.png',
                4,
                4,
                4
            );

        this.boundingBox = new Rectangle (
            x + this.width / 2,
            y + this.height / 2,
            this.width / 4,
            this.height / 2
        );
    }

    RoadRunner.prototype.update = function() {
        if (this.movement.left) {
            this.position.x -= this.velocityX;
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x + (this.width / 2.5);
        this.boundingBox.y = this.position.y + (this.height / 4);


    };


    RoadRunner.prototype.render = function(ctx) {
        if(this.movement.left === true){
            this.animation.setRow(0);
        }
        this.animation.draw(ctx);
    };

    return RoadRunner;
}());
