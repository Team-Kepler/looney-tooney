var Yosemity = (function() {
    function Yosemity(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
           left: true
        };
        this.velocity = -2.5;
        this.width = 77.5;
        this.height = 60;
        this.animation = new Animation(
            this.width,
            this.height,
            1,
            1,
            4,
            'images/yose.png',
            15,
            4,
            1
        );

        this.boundingBox = new Rectangle (
            x,
            y,
            this.width,
            this.height
        );
    }

    Yosemity.prototype.update = function() {
        if (this.movement.left) {
            this.position.x += this.velocity;
            if (this.position.x <= 10) {
                this.movement.left = false;
            }
        } else if (!this.movement.left) {
            this.position.x -= this.velocity;
            if (this.position.x >= 1001) {
                this.movement.left = true;
            }
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };


    Yosemity.prototype.render = function(ctx) {
        if(this.movement.left) {
            this.animation.setLimit(4);
            this.animation.setRow(1);
        } else if(!this.movement.left) {
            this.animation.setLimit(4);
            this.animation.setRow(0);
        }
        this.animation.draw(ctx);
    };

    return Yosemity;
}());