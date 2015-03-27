var Player = (function() {
    function Player(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right: false,
            down: false,
            jump: false,
            idle: true
        };

        this.canJump = true;
        this.jumpDuration = 12;
        this.jumpValue = 0;

        this.canSpin = true;
        this.spinDuration = 10;
        this.spinValue = 0;

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
        	this.character = 'bugs';
            this.animation = this.animationLib.duck;
        } else if(input.o) {
        	this.character = 'daffy';
            this.animation = this.animationLib.bunny;
        } else if (input.p) {
        	this.character = 'taz';
            this.animation = this.animationLib.taz;
        }

        if(this.movement.right) {
            this.position.x += this.velocity;
        }
        else if(this.movement.left) {
            this.position.x -= this.velocity;
        }

        if((this.movement.jump || this.jumpValue > 0) && this.canJump) {  
        	player.movement.down = false;
        	if (this.jumpValue <= this.jumpDuration) {	
	            this.position.y -= this.velocity * 2;
	            this.jumpValue++;
	        } else {
	        	this.canJump = false;
	        	this.movement.jump = false;
	        	this.movement.down = true;
	        }
        }
        else if(this.movement.down) {
        	if(this.position.y <= ground) {
            	this.position.y += this.velocity;
        	} else { 
        		this.movement.down = false;
        		//setTimeout(function() { this.canJump = true; console.log(this.canJump); }, 1000);
        		this.canJump = true;
        		this.jumpValue = 0;
        	}
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        if(this.movement.jump) {
        	//this.animation.updateJump();
        	this.animation.update();
        } else {
        	this.animation.update();
        }
    };


    Player.prototype.render = function(ctx) {
        if(this.movement.jump && this.canJump){
		 	if (this.movement.left) {
            	this.animation.setLimit(4);
            	this.animation.setRow(4);
            } else {
            	this.animation.setLimit(4);
            	this.animation.setRow(3);
            }
        } else if(this.movement.down) {
        	if (this.movement.left) {
            	//this.animation.setLimit(2);
            	//this.animation.setRow(4);
            	//this.animation.setColumn(3);
            } else {
            	//this.animation.setLimit(2);
            	//this.animation.setRow(3);
            }
    	} else if(this.movement.right) {
            this.animation.setLimit(4);
            this.animation.setRow(1);

        } else if(this.movement.left) {
            this.animation.setLimit(4);
            this.animation.setRow(2);

        } else {
            this.animation.setLimit(4);
            this.animation.setRow(0);
        }

        this.animation.draw(ctx);
    };

    return Player;
}());