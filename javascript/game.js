var SAY = SAY || {};

(function(){

	var _game = SAY.viget = {

		init: function() {
			_game.setVars();
			_game.setUpCanvas();

			_game.Enemies.create();
			_game.Ship.create();

			_game.start();
		},

		start: function() {
			_game.render();
		},

		setVars: function() {
			_game.state = 'start';
			
			_game.keyboard = {};

			_game.player = {
				x: 500,
				y: 900,
				width: 50,
				height: 72,
				counter: 0
			};
			_game.playerBullets = [];
			
			_game.enemies = [];
			_game.enemyBullets = [];
		},

		Enemies: {
			create: function(){
				for(var i in _game.enemies) {
						var enemy = _game.enemies[i];
						if(enemy.state == "alive") {
								_game.ctx.fillStyle = "green";
								_game.ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);
						}
						if(enemy.state == "hit") {
								_game.ctx.fillStyle = "purple";
								_game.ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);
						}
						//this probably won't ever be called.
						if(enemy.state == "dead") {
								_game.ctx.fillStyle = "black";
								_game.ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);
						}
				}
			}
		},

		Ship: {
			create: function(){
				_game.ship = new Image();
				_game.ship.src = '../images/spaceship.png';
			},

			show: function() {
				_game.ctx.drawImage(_game.ship, 0, 0);
			}
		},

		setUpCanvas: function(){
			_game.canvas = document.createElement( 'canvas' );
			_game.canvas.width	= 1280;
			_game.canvas.height = 1024;

			$( '.canvas' ).html(_game.canvas);

			_game.ctx = _game.canvas.getContext( '2d' );
			_game.ctx.fillStyle = '#000';
			_game.ctx.fillRect(0,0,1280,1024);
		},

		render: function() {
			function render() {
				_game.Ship.show();
				window.requestAnimFrame(render);
			}

			// shim layer with setTimeout fallback
			window.requestAnimFrame = (function(){
				return	window.requestAnimationFrame	||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame		||
				window.oRequestAnimationFrame			||
				window.msRequestAnimationFrame		||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
			})();

			render();
		}
	};

	$(document).ready(_game.init);

})();