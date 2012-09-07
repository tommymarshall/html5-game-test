var SAY = SAY || {};

(function(){

	var _game = SAY.viget;

		_game.Hero = function(image) {
				this.initialize(image);
		};

		_game.Hero.prototype = new Bitmap();

		_game.Hero.prototype.Bitmap_initialize = _game.Hero.prototype.initialize;

		_game.Hero.prototype.initialize = function(image) {
			this.velocity = {x:0,y:25};
			this.onGround = false;

			this.Bitmap_initialize(image);
			this.name = 'Hero';
			this.snapToPixel = true;
		};

		_game.Hero.prototype.move = function(e) {
			console.log(e);
		};

		_game.Hero.prototype.tick = function () {
			this.velocity.y += 1;
			var c = 0;
			var cc = 0;
			var addY = this.velocity.y;
			var bounds = _game.util.getBounds(this);
			var cbounds;
			var collision = null;
			var platforms = _game.getPlatforms();

			while ( !collision && cc < platforms.length ) {
				cbounds = _game.util.getBounds(platforms[cc]);
				if ( platforms[cc].isVisible ) {
					collision = _game.util.calculateIntersection(bounds, cbounds, 0, addY);
				}

				// Make sure the objects are not ontop of eachother. If so, move the Hero up
				if ( !collision && platforms[cc].isVisible ) {
					if ( ( bounds.y < cbounds.y && bounds.y + addY > cbounds.y ) ||
						( bounds.y > cbounds.y && bounds.y + addY < cbounds.y ) ) {
						addY = cbounds.y - bounds.y;
					} else {
						cc++;
					}
				}
			}

			if ( !collision ) {
				this.y += addY;
				if ( this.onGround ) {
					this.onGround = false;
				}
			} else {
				this.y += addY - collision.height;
				if ( addY > 0 ) {
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