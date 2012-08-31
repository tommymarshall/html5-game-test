var SAY = SAY || {};

(function(){

	var _game = SAY.viget = {

		init: function() {
				_game.drawCanvas();
				_game.initVars();
				_game.createObjects();
				_game.drawGameWindow();
				_game.start.levelV();
				//_game.createGameObjects();
				//_game.bindEvents();
				//_game.updateScale();
				//_game.scene = _game.scenes['start'];
				//_game.scene.init();
				_game.gameLoop();
		},

		initVars: function(){
			_game.then = Date.now();

			_game.level = {};
			_game.level.v = {};
			_game.level.i = {};
			_game.level.g = {};
			_game.level.e = {};
			_game.level.t = {};

			_game.level.v.cheese = [];
		},

		drawCanvas: function(){
			_game.prerenderCanvas = document.createElement( 'canvas' );
			_game.prerenderCtx    = _game.prerenderCanvas.getContext( '2d' );
			_game.prerenderCanvas.width  = 1280;
			_game.prerenderCanvas.height = 1024;

			_game.canvas = document.createElement( 'canvas' );
			_game.ctx    = _game.canvas.getContext( '2d' );
			_game.canvas.width  = 1280;
			_game.canvas.height = 1024;

			$( '.canvas' ).html(_game.canvas);
			$( '.pre-render-canvas' ).html(_game.prerenderCanvas);
		},

		createObjects: function() {
			_game.createObject('cheese');
			_game.createObject('cheese');
			_game.createObject('cheese');
			_game.createObject('cheese');
		},

		createObject: function(object) {
			var shape = function(x, y, w, h, fill){
				this.x = x;
				this.y = y;
				this.w = w;
				this.h = h;
				this.fill = fill;

				return this;
			};
			var to;

			if (object == 'cheese') {
				to = shape(300, 400, 150, 60, '#ff9900');
				_game.level.v.cheese.push(to);
			}

		},

		drawGameWindow: function() {
			_game.ctx.fillStyle = "#abe9ff";
			_game.ctx.fillRect(0,0,1280,1024);
			
			var img = new Image();
			
			img.onload = function(){
				_game.ctx.drawImage(img,0,0);
			};

			img.src = _game.Images.header;
		},

		start: {
			
			levelV: function(){
				var l = _game.level.v.cheese.length;
				
				for (var j = 0; j < l; j++) {
					_game.Draw(_game.level.v.cheese[j]);
				}
			},

			levelI: function(){
				for(var i = 1; i < 6; i++) {
					new _game.createObject.cheese();
				}
			},
			levelG: function(){
				for(var i = 1; i < 6; i++) {
					new _game.createObject.cheese();
				}
			},
			levelE: function(){
				for(var i = 1; i < 6; i++) {
					new _game.createObject.cheese();
				}
			},
			levelT: function(){
				for(var i = 1; i < 6; i++) {
					new _game.createObject.cheese();
				}
			}
		},

		utilities: {
			getRand: function() {
				return Math.floor(Math.random()*y)+x;
			}
		},

		gameLoop: function() {
			_game.requestAnimationFrame = window.requestAnimationFrame(function(){
				_game.now = Date.now();
				_game.delta = _game.now - _game.then;
				_game.then = _game.now;

				//Loop it
				_game.gameLoop();
			});
		}

	};

	$(document).ready(_game.init);

})();