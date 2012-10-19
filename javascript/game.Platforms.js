var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ) {
		this.init( data );
	};

	game.Platform.prototype = new Shape();

	game.Platform.prototype.init = function( data ){

		// Location
		this.x = data.x || 0;
		this.y = data.y || 0;
		this.width = data.width || 100;
		this.height = data.height || 100;

		// Build rectangle
		this.graphics
			.beginFill('rgba(255,0,0,1)')
			.drawRect(0, 0, this.width, this.height);

		return this;
	};

})();