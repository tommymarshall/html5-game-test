var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Background = function( data ) {
		this.initialize( data );
	};

	game.Background.prototype = new Shape();

	game.Background.prototype.Shape_initialize = game.Background.prototype.initialize;

	game.Background.prototype.initialize = function( data ){
		this.Shape_initialize();
		this.offsetY = data.offsetY || 0;
		this.graphics
			.beginFill(data.color)
			.drawRect(
				0,
				data.offsetY,
				game.canvas.width,
				game.canvas.height - this.offsetY
			);
		game.stage.addChild(this);
	};

})();