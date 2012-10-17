var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Doodad = function(image) {
		this.init(image);
	};

	game.Doodad.prototype = new Bitmap();

	game.Doodad.prototype.Bitmap_initialize = game.Doodad.prototype.init;

	game.Doodad.prototype.init = function(image) {
		
	};

})();