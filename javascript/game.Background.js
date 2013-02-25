var SAY = SAY || {};

(function(){

	var game = SAY.game;
	var self;
	var properties;

	game.Background = function( data ){
		self = this;
		properties = data;

		if ( properties.source !== undefined ){
			var image    = new Image();
			image.src    = properties.source;
			image.onload = self.addToStage;
		}
	};

	game.Background.prototype.addToStage = function(){
		var backgroundImage = new Bitmap(this);
		backgroundImage.x = properties.position.x;
		backgroundImage.y = properties.position.y;
		game.backgrounds.push(backgroundImage);
	};

})();
