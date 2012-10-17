var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Coin = function(image) {
		this.init(image);
	};

	game.Coin.prototype = new Bitmap();

	game.Coin.prototype.Bitmap_initialize = game.Coin.prototype.init;

	game.Coin.prototype.init = function(image) {
		
	};

})();