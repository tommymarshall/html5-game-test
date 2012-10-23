var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Button = function( data ) {
		this.init( data );
	};

	game.Button.prototype = new Text();

	game.Button.prototype.init = function( data ){
		this.setData(data);
		game.stage.addChild(this);
	};

	game.Button.prototype.setData = function( data ){
		for(var key in data){
			this[key] = data[key];
		}
	};

})();