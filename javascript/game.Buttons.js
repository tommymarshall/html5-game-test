var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Button = function( data ) {
		this.initialize( data );
	};

	game.Button.prototype = new Shape();

	game.Button.prototype.Shape_initialize = game.Button.prototype.initialize;

	game.Button.prototype.initialize = function( data ){
		this.Shape_initialize();

		this.Text = new Text();
		
		this.setData(data);

		this.graphics
			.beginFill('rgba(0,0,0,0.01)')
			.drawRoundRect(
				false,
				false,
				this.width,
				this.height,
				5
			);
		
		game.stage.addChild(this);
		game.stage.addChild(this.Text);
	};

	game.Button.prototype.setData = function( data ){
		var key;

		for(key in data.Text){
			this.Text[key] = data.Text[key];
		}
		for(key in data.Shape){
			this[key] = data.Shape[key];
		}
	};

})();