var SAY = SAY || {};

(function(){

	var _game = SAY.viget = {

		init: function() {
			_game.drawCanvas();
		},

		Layers: {

			add: function(){

			}
		},

		drawCanvas: function(){
			_game.canvas = document.createElement( 'canvas' );
			_game.ctx		= _game.canvas.getContext( '2d' );
			_game.canvas.width	= 1280;
			_game.canvas.height = 1024;

			$( '.canvas' ).html(_game.canvas);

			function render() {
				_game.Particles.run();
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

			$('button').toggle(function(){
				_game.Particles.play = false;
			},function(){
				_game.Particles.play = true;
			});
		},

		Particles: {
			part: [],
			tick: 0,
			play: true,

			run: function(){
				var _this = _game.Particles;
				if (_this.play === true) {
					_game.Particles.create();
					_game.Particles.update();
					_game.Particles.kill();
					_game.Particles.draw();
				}
			},
			create: function(){
				var _this = _game.Particles;

				//check on every 10th tick check
				if(_this.tick % 20 === 0) {
						//add particle if fewer than 100
						if(_this.part.length < 100) {
								_this.part.push({
									x: Math.random() * _game.canvas.width, //between 0 and canvas width
									y: 0,
									speed: 2+Math.random() * 3, //between 2 and 5
									radius: 5+Math.random() * 5, //between 5 and 10
									color: "white"
								});
						}
				}
			},
			update: function(){
				var _this = _game.Particles;

				for(var i in _this.part) {
						var part = _this.part[i];
						part.y += part.speed;
				}

				_game.Particles.tick++;
			},
			kill: function(){
				var _this = _game.Particles;

				for(var i in _this.part) {
					var part = _this.part[i];
					if(part.y > _game.canvas.height) {
						part.y = 0;
					}
				}
			},
			draw: function(){
				var _this = _game.Particles;

				_game.ctx.fillStyle = "black";
				_game.ctx.fillRect(0,0,_game.canvas.width,_game.canvas.height);
				for(var i in _this.part) {
					var part = _this.part[i];
					_game.ctx.beginPath();
					_game.ctx.arc(part.x,part.y, part.radius, 0, Math.PI*2);
					_game.ctx.closePath();
					_game.ctx.fillStyle = part.color;
					_game.ctx.fill();
				}
			}
		}
	};

	$(document).ready(_game.init);

})();