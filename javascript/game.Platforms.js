var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ) {
		this.init( data );
	};

	game.Platform.prototype = new Shape();

	game.Platform.prototype.init = function( data ){
		// Location
		this.x = data.x;
		this.y = data.y;
		this.width = data.width;
		this.height = data.height;

		// Build rectangle
		this.graphics
			.beginFill('rgba(255,0,0,1)')
			.drawRect(0, 0, data.width, data.height);

		game.stage.addChild(this);
	};

})();