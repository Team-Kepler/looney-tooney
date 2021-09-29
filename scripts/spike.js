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

    Spike.prototype.intersects = function (object) {
        return object.boundingBox.intersects(this.boundingBox) || this.boundingBox.intersects(object.boundingBox);
    };

    Spike.prototype.intersectsRight = function (object) {
        var playerFutureBox = new Rectangle(
            this.boundingBox.x + 8,
            this.boundingBox.y,
            this.boundingBox.width,
            this.boundingBox.height
        );

        return object.boundingBox.intersects(playerFutureBox) || playerFutureBox.intersects(object.boundingBox);
    };

    Spike.prototype.intersectsLeft = function (object) {
        var playerFutureBox = new Rectangle(
            this.boundingBox.x - 8,
            this.boundingBox.y,
            this.boundingBox.width,
            this.boundingBox.height
        );

        return object.boundingBox.intersects(playerFutureBox) || playerFutureBox.intersects(object.boundingBox);
    };

    return Spike;
}());
