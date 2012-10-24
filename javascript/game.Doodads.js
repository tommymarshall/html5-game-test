var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Doodad = function( data ) {
		this.initialize( data );
	};

	game.Doodad.prototype = new Shape();

	game.Doodad.prototype.Shape_initialize = game.Doodad.prototype.initialize;

	game.Doodad.prototype.initialize = function( data ){
		this.Shape_initialize();
		this.setData(data);
		game.stage.addChild(this);
	};

	game.Doodad.prototype.setData = function( data ){
		for(var key in data){
			this[key] = data[key];
		}
	};

})();