var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Hero = function(image) {
		this.init(image);
	};

	game.Hero.prototype = new Bitmap();

	game.Hero.prototype.Bitmap_initialize = game.Hero.prototype.init;

	game.Hero.prototype.init = function(image){

	};

	game.Hero.prototype.jump = function(){

	};

	game.Hero.prototype.tick = function (){

	};
})();