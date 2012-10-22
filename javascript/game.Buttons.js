var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Button = function( data ) {
		this.init( data );
	};

	game.Button.prototype = new Shape();

	game.Button.prototype.init = function( data ){

		var a = new Text(data.text, data.font, data.color);
		a.x = data.x;
		a.y = data.y;
		a.width = data.width;
		a.height = data.height;
		a.textAlign = 'center';

		var mouseUp = function(){
			console.log(data.action);
		};

		a.onClick = mouseUp;

		game.stage.addChild(a);

	};

})();