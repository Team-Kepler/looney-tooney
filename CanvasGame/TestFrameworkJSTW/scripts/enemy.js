//var Player = (function() {
//    function Player(x, y) {
//        this.position = new Vector2(x,y);
//        this.movement = {
//            left: false,
//            right: false,
//            up: false,
//            down: false,
//            idle: true
//        };
//        this.velocity = 2;
//        this.width = 58.6;
//        this.height = 98;
//        this.animationLib = {
//            bunny: new Animation(
//                this.width,
//                this.height,
//                0,
//                0,
//                4,
//                'images/bunny.png',
//                5,
//                0,
//                4
//            ),
//            duck: new Animation(
//                this.width,
//                this.height,
//                0,
//                0,
//                4,
//                'images/DuckNew.png',
//                4,
//                0,
//                4
//            )
//        };
//        this.animation = this.animationLib.bunny;
//
//        this.boundingBox = new Rectangle (
//            x,
//            y,
//            this.width,
//            this.height
//        );
//    }
//
//    Player.prototype.update = function() {
//        if(input.i) {
//            this.animation = this.animationLib.duck;
//        } else if(input.o) {
//            this.animation = this.animationLib.bunny;
//        }
//
//        if((this.movement.right) && (this.position.x <= 500)) {
//            this.position.x += this.velocity;
//        }
//        else if(this.movement.left) {
//            this.position.x -= this.velocity;
//        }
//
//        if(this.movement.up) {
//            this.position.y -= this.velocity;
//        }
//        else if((this.movement.down) && (this.position.y <= 390)) {
//            this.position.y += this.velocity;
//        }
//
//
//        this.animation.position.set(this.position.x, this.position.y);
//        this.boundingBox.x = this.position.x;
//        this.boundingBox.y = this.position.y;
//        this.animation.update();
//    };
//
//
//    Player.prototype.render = function(ctx) {
//        if(this.movement.right) {
//            this.animation.setLimit(5);
//            this.animation.setRow(1);
//        } else if(this.movement.left) {
//            this.animation.setLimit(5);
//            this.animation.setRow(2);
//        } else {
//            this.animation.setLimit(1);
//            this.animation.setColumn(0);
//            this.animation.setRow(0);
//        }
//
//        this.animation.draw(ctx);
//    };
//
//    return Player;
//}());

var Yosemity = (function() {
    function Yosemity(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        this.velocity = 2;
        this.width = 77.5;
        this.height = 60;
        this.animation = new Animation(
            this.width,
            this.height,
            1,
            1,
            3,
            'images/yose.png',
            7,
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
        if((this.movement.right) && (this.position.x <= 500)) {
            this.position.x += this.velocity;
        }
        else if(this.movement.left) {
            this.position.x -= this.velocity;
        };

        if(this.movement.up) {
            this.position.y -= this.velocity;
        }
        else if((this.movement.down) && (this.position.y <= 390)) {
            this.position.y += this.velocity;
        }


        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };


    Yosemity.prototype.render = function(ctx) {
        this.animation.draw(ctx);

    };

    return Yosemity;
}());