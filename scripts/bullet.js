var Bullet = (function() {
    function Bullet(x, y) {
        this.position = new Vector2(x, y);
        this.movement = {
            left: false,
            right: false
        };
        this.velocity = -7;
        this.width = 80;
        this.height = 26;
        this.animation = new Animation (
            this.width,
            this.height,
            0,
            0,
            1,
            'images/bullets.png',
            6,
            0,
            0
        );

        this.boundingBox = new Rectangle (
            x,
            y,
            this.width,
            this.height
        );
    }

    Bullet.prototype.update = function() {
        if(this.movement.left) {
            this.position.x += this.velocity;
            if (this.position.x <= -100) {
                this.movement.left = false;
            }
        }
        else if (this.movement.right) {
            this.position.x -= this.velocity;
            if (this.position.x >= 1200) {
                this.movement.right = false;
            }
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();

    };

    Bullet.prototype.render = function() {
        if(this.movement.right){
            this.animation.setColumn(0);
            this.animation.setRow(0);
            this.animation.setLimit(1);
        }else{
            this.animation.setColumn(1);
            this.animation.setRow(0);
            this.animation.setLimit(1);
        }
        this.animation.draw(ctx);
    };

    return Bullet;
}());