var Spike = (function() {
    function Spike(x, y) {
        this.position = new Vector2(x,y);

        this.width = 28;
        this.height = 75;
        this.sprite = new Image();
        this.sprite.src = 'images/spike.png';

        this.boundingBox = new Rectangle (
            x + (this.width / 3.5),
            y + (this.width / 4),
            this.width / 2.5,
            this.height / 1.5
        );

    }

    Spike.prototype.render = function (ctx) {
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
    };

    return Spike;
}());
