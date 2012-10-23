var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ) {
		this.init( data );
	};

	game.Platform.prototype = new Shape();

	game.Platform.prototype.init = function( data ){
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
			.beginFill('rgba(28,142,206,0.8)')
			.moveTo(-50, 50)
			.lineTo(this.width, this.height)
			.lineTo(0, 0)
			.beginFill(this.color)
			.drawRect(0, 0, this.width, this.height);
	};

})();