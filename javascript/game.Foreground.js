var SAY = SAY || {};

(function(){

	var game = SAY.game;
	var self;
	var properties;

	game.Foreground = function( data ){
		self = this;
		properties = data;

		if ( properties.source !== undefined ){
			var image    = new Image();
			image.src    = properties.source;
			image.onload = self.addToStage;
		}
	};

	game.Foreground.prototype = new game.Body();

	game.Foreground.prototype.addToStage = function(){
		var asset = new Bitmap(this);
		asset.x = properties.position.x;
		asset.y = properties.position.y;
		game.foregrounds.push(asset);
	};

})();
