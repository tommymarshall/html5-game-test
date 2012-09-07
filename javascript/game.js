var SAY = SAY || {};

(function(){

	var _game = SAY.viget = {

		init: function() {
			_game.setStage();
			_game.setVars();

			_game.preloadResources();
			_game.setImages();

			_game.bindEvents();
			
			_game.start();
			_game.render();
		},

		setVars: function() {
			_game.HERO = 'images/mouse.png';
			_game.WALKER = 'images/runner.png';
			_game.PLATFORM = 'images/platform.png';
			_game.currentLevel = 1;
			_game.Platforms = [];
			_game.requestedAssets = 0;
			_game.assets = [];
			_game.paths = [
				_game.HERO,
				_game.WALKER,
				_game.PLATFORM
			];
			_game.controls = {
				left: [ 37, 65 ],
				right: [ 39, 68 ],
				jump: [ 32, 38, 40, 83, 87 ]
			};
		},

		preloadResources: function() {
			for (var i = _game.paths.length - 1; i >= 0; i--) {
				_game.loadImage(_game.paths[i]);
			}
		},

		loadImage: function(e){
        var img = new Image();
        img.onload = _game.onLoadedAsset;
        img.src = e;

        _game.assets[e] = img;

        ++_game.requestedAssets;
		},

		start: function() {

			switch (_game.currentLevel) {
				case 1:
					// Do level 1
					_game.createPlatform(0,300,true);
					_game.createPlatform(70,300,true);
					_game.createPlatform(140,300,true);
					_game.createPlatform(210,300,true);
					_game.createPlatform(280,300,true);
					_game.createPlatform(350,300,true);

					_game.createRunner();
				break;
				case 2:
					// Do level 2

				break;

				default:
				break;
			}
		},

		setImages: function() {
			var img = new Image();
			img.onload = _game.createHero;
			img.src = _game.HERO;
		},

		createHero: function(e) {
			_game.hero = new _game.Hero(e.target);
			_game.stage.addChild(_game.hero);
		},

		createRunner: function() {
			var sprite = new SpriteSheet({
				images: [_game.assets[_game.WALKER]],
				frames: {width: 64, height: 64, regX: 32, regY: 32},
				animations: {
						walk: [0, 9, 'walk']
				}
			});

			bmpAnimation = new BitmapAnimation(sprite);
			bmpAnimation.gotoAndPlay('walk');
			bmpAnimation.name = 'monster1';
			bmpAnimation.direction = 90;
			bmpAnimation.vX = 4;
			bmpAnimation.x = 16;
			bmpAnimation.y = 32;

			// have each monster start at a specific frame
			bmpAnimation.currentFrame = 0;
			_game.stage.addChild(bmpAnimation);
		},

		createPlatform: function(x,y,enabled) {
				x = Math.round(x);
				y = Math.round(y);

				var platform = new Bitmap(_game.PLATFORM);
				platform.x = x;
				platform.y = y;
				platform.snapToPixel = true;
				platform.mouseEnabled = enabled || false;

				_game.stage.addChild(platform);
				_game.Platforms.push(platform);
		},

		setStage: function() {
			_game.canvas = document.getElementById('stage');
			_game.stage = new Stage(_game.canvas);
			_game.world = new Container();

			_game.stage.addChild(_game.world);
		},

		getPlatforms: function() {
			return _game.Platforms;
		},

		bindEvents: function() {
			if ('ontouchstart' in document.documentElement) {
				_game.canvas.addEventListener('touchstart', function(e) {
					handleKeyDown();
				}, false);

				_game.canvas.addEventListener('touchend', function(e) {
					handleKeyUp();
				}, false);
			} else {
				document.onkeydown = handleKeyDown;
				document.onkeyup = handleKeyUp;
				document.onmousedown = handleKeyDown;
				document.onmouseup = handleKeyUp;
			}

			function handleKeyDown(e)
			{
				if (_game.controls.right.contains(e.which)) {
					_game.hero.x += 3;
					_game.hero.move('left');
				} else if (_game.controls.left.contains(e.which)) {
					_game.hero.x -= 3;
					_game.hero.move('right');
				} else if (_game.controls.jump.contains(e.which)) {
					_game.hero.jump();
				}
			}

			function handleKeyUp(e)
			{
				//console.log(e);
			}
		},

		util: {
			calculateIntersection: function(rect1, rect2, x, y) {
				// prevent x|y from being null||undefined
				x = x || 0; y = y || 0;
				
				var dx, dy, r1={}, r2={};
				r1.cx = rect1.x+x+(r1.hw = (rect1.width /2));
				r1.cy = rect1.y+y+(r1.hh = (rect1.height/2));
				r2.cx = rect2.x + (r2.hw = (rect2.width /2));
				r2.cy = rect2.y + (r2.hh = (rect2.height/2));

				dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
				dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

				if (dx < 0 && dy < 0) {
					return {width:-dx,height:-dy};
				} else {
					return null;
				}
			},

			getBounds: function(obj) {
				var bounds={x:Infinity,y:Infinity,width:0,height:0};
				
				if ( obj instanceof Container ) {
					var children = object.children, l=children.length, cbounds, c;
					for ( c = 0; c < l; c++ ) {
						cbounds = getBounds(children[c]);
						if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
						if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
						if ( cbounds.width > bounds.width ) bounds.width = cbounds.width;
						if ( cbounds.height > bounds.height ) bounds.height = cbounds.height;
					}
				} else {
					var gp,imgr;
					if ( obj instanceof Bitmap ) {
						gp = obj.localToGlobal(0,0);
						imgr = {width:obj.image.width,height:obj.image.height};
					} else if ( obj instanceof BitmapAnimation ) {
						gp = obj.localToGlobal(0,0);
						imgr = obj.spriteSheet._frames[obj.currentFrame];
					} else {
						return bounds;
					}

					bounds.width = imgr.width * Math.abs(obj.scaleX);
					if ( obj.scaleX >= 0 ) {
						bounds.x = gp.x;
					} else {
						bounds.x = gp.x - bounds.width;
					}

					bounds.height = imgr.height * Math.abs(obj.scaleY);
					if ( obj.scaleX >= 0 ) {
						bounds.y = gp.y;
					} else {
						bounds.y = gp.y - bounds.height;
					}
				}

				return bounds;
			},

			getWidth: function() {
				if( typeof( window.innerWidth ) == 'number' ) {
					return window.innerWidth;
				} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
					return document.documentElement.clientWidth;
				} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					return document.body.clientWidth;
				}
			},

			getHeight: function() {
				if( typeof( window.innerWidth ) == 'number' ) {
					return window.innerHeight;
				} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
					return document.documentElement.clientHeight;
				} else if( document.body && ( document.body.clientHeight || document.body.clientHeight ) ) {
					return document.body.clientHeight;
				}
			}
		},

		render: function() {
			Ticker.addListener(tick);
			Ticker.useRAF = true;
			Ticker.setFPS(60);

			function tick(e){
				_game.hero.tick();
				_game.stage.update();
			}
		}
	};

	window.onload = function(){
		_game.init();
	};

})();