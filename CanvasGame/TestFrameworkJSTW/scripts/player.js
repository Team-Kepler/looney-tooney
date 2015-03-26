var Player = (function() {
    function Player(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right: false,
            up: false,
            down: false,
            jump: false,
            idle: true
        };
        this.velocity = 4;
        this.width = 85;
        this.height = 85;
        this.animationLib = {
            bunny: new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/BugsBunny.png',
                4,
                0,
                4
            ),
            duck: new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/player-sprite-sheet.png',
                4,
                0,
                4
            ),
            taz: new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/TazmanianDevil.png',
                4,
                0,
                4
            )
        };
        this.animation = this.animationLib.bunny;

        this.boundingBox = new Rectangle (
            x,
            y,
            this.width,
            this.height
        );
    }

    Player.prototype.update = function() {
        if(input.i) {
            this.animation = this.animationLib.duck;
        } else if(input.o) {
            this.animation = this.animationLib.bunny;
        } else if (input.p) {
            this.animation = this.animationLib.taz;
        }

        if(this.movement.right) {
            this.position.x += this.velocity;
        }
        else if(this.movement.left) {
            this.position.x -= this.velocity;
        }

        if(this.movement.up) {
            this.position.y -= this.velocity;
        }
        else if(this.movement.down) {
            this.position.y += this.velocity;
        }


        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };


    Player.prototype.render = function(ctx) {
        if(this.movement.right) {
            this.animation.setLimit(4);
            this.animation.setRow(1);
        } else if(this.movement.left) {
            this.animation.setLimit(4);
            this.animation.setRow(2);
        } else if(this.movement.jump){
            this.animation.setLimit(4);
            this.animation.setRow(3);
        } else {
            this.animation.setLimit(4);
            //this.animation.setColumn(0);
            this.animation.setRow(0);
        }

        this.animation.draw(ctx);
    };

    return Player;
}());