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
        this.width = 60;
        this.height = 60;
        this.animation =
             new Animation(
                this.width,
                this.height,
                0,
                0,
                4,
                'images/bonus.png',
                4,
                0,
                4
             );
        this.boundingBox = new Rectangle (
            x + this.width / 4,
            y + this.height / 4,
            this.width / 2,
            this.height / 2
        );
    }

    FallingBonus.prototype.update = function() {

        this.position.y += this.velocity;
        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x + this.width / 4;
        this.boundingBox.y = this.position.y + this.height / 4;
        this.animation.update();
    };


    FallingBonus.prototype.render = function(ctx) {
        if(player.character==='bugs') {
            this.animation.setLimit(1);
            this.animation.setRow(0);
        }
        if(player.character==='daffy'){
            this.animation.setLimit(1);
            this.animation.setRow(0);
            this.animation.setColumn(1);
        }
        else{
            this.animation.setLimit(1);
            this.animation.setRow(0);
            this.animation.setColumn(0);
        }

        this.animation.draw(ctx);
    };

    return FallingBonus;
}());