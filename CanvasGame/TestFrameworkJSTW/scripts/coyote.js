var Coyote = (function() {
    function Coyote(x, y) {
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

    Coyote.prototype.update = function() {
        if (this.movement.left) {
            this.position.x -= this.velocityX;
            if(this.position.x <= -400) {
                this.movement.left = false;
                this.movement.right = true;
            }
        } else if(this.movement.right) {
            if(this.position.x < 1200) {
                this.position.x += this.velocityX;
            } else {
                this.movement.right = false;
            }
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x + (this.width / 2.5);
        this.boundingBox.y = this.position.y + (this.height / 4);


    };


    Coyote.prototype.render = function(ctx) {
        if(this.movement.left === true) {
            this.animation.setRow(1);
        } else if (!this.movement.left) {
            this.animation.setRow(2);
        }
        this.animation.draw(ctx);
    };

    return Coyote;
}());