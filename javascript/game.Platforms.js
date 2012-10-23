var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ) {
		this.initialize( data );
	};

	game.Platform.prototype = new Shape();

	//unique to avoid overiding base class
	game.Platform.prototype.Shape_initialize = game.Platform.prototype.initialize;

	game.Platform.prototype.initialize = function( data ){
		this.Shape_initialize();
		this.setData(data);
		this.output();
		this.stage.addChild(this);
	};

	game.Platform.prototype.setData = function( data ){
		for(var key in data){
			this[key] = data[key];
		}
	};

	game.Platform.prototype.output = function() {
		// Build rectangle
		this.graphics
			.beginFill('rgba(28,142,206,0.5)')
			.moveTo(-50, 50)
			.lineTo(this.width, this.height)
			.lineTo(0, 0)
			.beginFill(this.color)
			.drawRect(0, 0, this.width, this.height);
	};

})();