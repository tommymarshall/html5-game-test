var SAY = SAY || {};

(function(){

	var _game = SAY.viget;

	_game.Hero = function(image) {
			this.initialize(image);
	};

	_game.Hero.prototype = new Bitmap();

	_game.Hero.prototype.Bitmap_initialize = _game.Hero.prototype.initialize;

	_game.Hero.prototype.initialize = function(image) {
		this.velocity = {x:0,y:15};
		this.onGround = false;
		this.Bitmap_initialize(image);
		this.name = 'Hero';
		this.snapToPixel = true;
	};

	_game.Hero.prototype.perform = function(e) {
		var moveBy;

		switch (e) {
			case 'moveLeft':
				moveBy = {x:-3, y:0};
		
				collision = _game.util.calculateCollision(this, 'x', _game.getPlatforms(), moveBy);
				if (!collision) {
					this.x -= 3;
				}
			break;

			case 'moveRight':
				moveBy = {x:3, y:0};

				collision = _game.util.calculateCollision(this, 'x', _game.getPlatforms(), moveBy);
				if (!collision) {
					this.x += 3;
				}
			break;

			case 'jump':
				this.jump();
			break;
		}
	};

	_game.Hero.prototype.tick = function () {
		this.velocity.y += 1;

		// preparing the variables
		var moveBy = {x:0, y:this.velocity.y};
		var collision = null;
		var collideables = _game.getPlatforms();

		collision = _game.util.calculateCollision(this, 'y', collideables, moveBy);
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
	};

	_game.Hero.prototype.jump = function() {
		if ( this.onGround ) {
			this.velocity.y = -17;
			this.onGround = false;
		}
	};
})();