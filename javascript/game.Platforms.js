var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ) {
		this.init( data );
	};

	game.Platform.prototype = new Shape();

	game.Platform.prototype.init = function( data ){
		this.setData(data);
		this.tick();
		this.stage.addChild(this);
		console.log(this.stage);
	};

	game.Platform.prototype.setData = function( data ){
		for(var key in data){
			this[key] = data[key];
		}
	};

	game.Platform.prototype.tick = function() {
		// Build rectangle

		this.graphics.beginFill(this.color);
		this.graphics.drawRect(0, 0, this.width, this.height);
		this.graphics.endFill();
	};

})();