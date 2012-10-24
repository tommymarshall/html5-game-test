var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Crater = function( data ) {
		this.initialize( data );
	};

	game.Crater.prototype = new Shape();

	game.Crater.prototype.Shape_initialize = game.Crater.prototype.initialize;

	game.Crater.prototype.initialize = function( data ){
		this.Shape_initialize();

		this.graphics
			.beginFill(data.color)
			.drawEllipse(
				data.x,
				data.y,
				data.width,
				data.height
			);
		this.regX = data.regX;

		game.stage.addChild(this);
	};

})();