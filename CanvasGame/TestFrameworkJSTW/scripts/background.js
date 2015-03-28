var Background=(function () {
    function Background(x,y) {
        this.position = new Vector2(x,y);

            this.position.x = 0;
            this.position.y = 0;
            this.bckgImg=new Image();
            this.bckgImg.src='images/backgroundWide.png';
            this.width = this.bckgImg.width;
            this.height = this.bckgImg.height;
    }

    Background.prototype.update = function() {
        if (this.position.x <= -1099) {
            this.position.x = 0;
        }
        else if (this.position.x >= 0) {
            this.position.x = - 1099;
        }
    };

    Background.prototype.render = function (ctx) {
        ctx.drawImage(this.bckgImg, this.position.x , 0, this.bckgImg.width, canvas.height);
    };
    return Background;
}());
