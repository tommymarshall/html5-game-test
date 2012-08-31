var SAY = SAY || {};

(function(){

	var _game = SAY.viget;

	_game.Draw = function(data){
		_game.ctx.fillStyle = data.fill;
		_game.ctx.fillRect(data.x, data.y, data.w, data.h);
	};

})();