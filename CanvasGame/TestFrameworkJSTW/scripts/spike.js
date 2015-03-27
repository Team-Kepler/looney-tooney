var Spike = (function() {
    function Spike(x, y) {
        this.position = new Vector2(x,y);

        this.width = 35;
        this.height = 75;
        this.sprite = new Image();
        this.sprite.src = 'images/spikes.png';

        this.boundingBox = new Rectangle (
            x,
            y,
            this.width,
            this.height
        );

    }

    Spike.prototype.render = function (ctx) {
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
    };

    return Spike;
}());