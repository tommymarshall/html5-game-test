var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Bird = function( data ) {
		this.initialize( data );
	};

	game.Bird.prototype = new Shape();

	game.Bird.prototype.Shape_initialize = game.Bird.prototype.initialize;

	game.Bird.prototype.initialize = function( data ){
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

	game.Bird.prototype.tick = function(){
		// Moving
	};

})();