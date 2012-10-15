var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Hero = function(image) {
		this.init(image);
	};

	game.Hero.prototype = new Bitmap();

	game.Hero.prototype.Bitmap_init = game.Hero.prototype.init;

	game.Hero.prototype.init = function(image) {
		this.velocity = {x:30,y:170};
		this.onGround = false;
		this.Bitmap_init(image);
		this.name = 'Hero';
		this.snapToPixel = true;
		this.moveLeft = false;
		this.moveRight = false;
		this.momentum = 0;
		this.reverseGravity = false;
	};

	game.Hero.prototype.tick = function () {
		if (this.reverseGravity)
		{
			if (this.velocity.y > -60)
			{
				this.velocity.y -= 1;
			}
		}
		else
		{
			if (this.velocity.y < 60)
			{
				this.velocity.y += 1;
			}
		}

		// preparing the variables
		var moveBy = {x:this.momentum, y:this.velocity.y};
		var collision = null;
		var collideables = game.getPlatforms();
		var shiftLeftMax = false;
		var shiftRightMax = false;
		var prevDirection = false;

		collision = game.util.calculateCollision(this, 'y', collideables, moveBy);
		// moveBy is now handled by 'calculateCollision'
		// and can also be 0 - therefore we won't have to worry
		this.y += moveBy.y;

		if ( !collision ) {
			if ( this.onGround ) {
				this.onGround = false;
			}
		} else {
			if ( moveBy.y >= 0 ) {
				this.onGround = true;
			}
			this.velocity.y = 0;
		}

		if (this.moveLeft) {
			shiftRightMax = false;
			if (shiftLeftMax === true) {
				moveBy = {x:-5, y:0};
			} else {
				moveBy = {x:this.momentum-0.1, y:0};
			}
			
			collision = game.util.calculateCollision(this, 'x', game.getPlatforms(), moveBy);
			if (!collision) {
				if (this.momentum < 5) {
					this.momentum += 0.1;
				} else {
					shiftLeftMax = true;
				}
				this.x -= this.momentum;
			}
		}

		if (this.moveRight) {
			shiftLeftMax = false;
			if (shiftRightMax === true) {
				moveBy = {x:5, y:0};
			} else {
				moveBy = {x:this.momentum+0.1, y:0};
			}

			collision = game.util.calculateCollision(this, 'x', game.getPlatforms(), moveBy);
			if (!collision) {
				if (this.momentum < 5) {
					this.momentum += 0.1;
				} else {
					shiftRightMax = true;
				}
				this.x += this.momentum;
			}
		}

		if (this.moveRight === false && this.moveLeft === false) {
			if (this.momentum > 0) {
				this.momentum -= 0.1;

				if (this.prevDirection === 'left'){
					this.x -= this.momentum;
				} else if (this.prevDirection === 'right'){
					this.x += this.momentum;
				}
			}
		}

	};

	game.Hero.prototype.jump = function() {
		if ( this.onGround ) {
			if (this.reverseGravity){
				this.velocity.y = 19;
			} else {
				this.velocity.y = -19;
			}
			this.onGround = false;
		}
	};
})();