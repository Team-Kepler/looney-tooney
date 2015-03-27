var Player = (function() {
    function Player(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right: false,
            down: false,
            jump: false,
            spin: false,
            signUp: false,
            idle: true
        };

        this.character = 'bugs';

        this.canJump = true;
        this.jumpDuration = 11;
        this.jumpValue = 0;

        this.velocityX = 4;
        this.velocityY = 8;

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
                5, // 5 for better jump
                4,
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
            x + this.width / 2,
            y + this.height / 2,
            this.width / 4,
            this.height / 2
        );

        this.alerts = 0;
    }

    Player.prototype.update = function() {
        if(input.i) {
        	this.character = 'daffy';
            this.animation = this.animationLib.duck;
        } else if(input.o) {
        	this.character = 'bugs';
            this.animation = this.animationLib.bunny;
        } else if (input.p) {
        	this.character = 'taz';
            this.animation = this.animationLib.taz;
        }

        if(this.movement.right) {
            if(!player.intersectsRight(spike1)) {
            	this.position.x += this.velocityX;
            }
        }
        else if(this.movement.left) {
            if(!player.intersectsLeft(spike1)) {
            	this.position.x -= this.velocityX;
            }
        }

        if((this.movement.jump || this.jumpValue > 0) && this.canJump) {  
        	player.movement.down = false;
        	if (this.jumpValue <= this.jumpDuration) {	
	            this.position.y -= this.velocityY;
	            this.jumpValue++;
	        } else {
	        	this.canJump = false;
	        	this.movement.jump = false;
	        	this.movement.down = true;
	        }
        }
        else if(this.movement.down) {
        	if(this.position.y <= ground) {
            	this.position.y += this.velocityY / 2;
        	} else { 
        		this.movement.jump = false;
        		this.movement.down = false;
        		this.canJump = true;
        		this.jumpValue = 0;
        	}

        	if (player.intersects(spike1) && this.alerts === 0) {
        		alert('dead');
        		this.alerts++;
        	}

            if (player.intersects(spike2) && this.alerts === 0) {
                alert('dead');
                this.alerts++;
            }
        }


        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x + (this.width / 2.5);
        this.boundingBox.y = this.position.y + (this.height / 4);

        if(this.movement.jump) {
        	//this.animation.updateJump();
        	this.animation.update();
        } else {
        	this.animation.update();
        }
    };


    Player.prototype.render = function(ctx) {
    	if (this.movement.spin) {
    		this.animation.setLimit(4);
    		this.animation.setRow(3)
    	
    	} else if(this.movement.jump) {
		 	if (this.movement.left) {
            	this.animation.setLimit(4);
            	this.animation.setRow(4);
            } else {
            	this.animation.setLimit(4);
            	this.animation.setRow(3);
            }
        } else if(this.movement.right) {
            this.animation.setLimit(4);
            this.animation.setRow(1);

        } else if(this.movement.left) {
            this.animation.setLimit(4);
            this.animation.setRow(2);

        } else if(this.movement.signUp) {
            this.animation.setLimit(4);
            this.animation.setRow(4);

        } else {
            this.animation.setLimit(4);
            this.animation.setRow(0);
        }

        this.animation.draw(ctx);
    };

    Player.prototype.intersects = function (object) {
		return object.boundingBox.intersects(this.boundingBox) || this.boundingBox.intersects(object.boundingBox);
	};

	Player.prototype.intersectsRight = function (object) {
    	var playerFutureBox = new Rectangle(
    		this.boundingBox.x + this.velocityX + 1,
    		this.boundingBox.y,
    		this.boundingBox.width,
    		this.boundingBox.height
    	);

		return object.boundingBox.intersects(playerFutureBox) || playerFutureBox.intersects(object.boundingBox);
	};

	Player.prototype.intersectsLeft = function (object) {
    	var playerFutureBox = new Rectangle(
    		this.boundingBox.x - this.velocityX - 1,
    		this.boundingBox.y,
    		this.boundingBox.width,
    		this.boundingBox.height
    	);

		return object.boundingBox.intersects(playerFutureBox) || playerFutureBox.intersects(object.boundingBox);
	};

    return Player;
}());