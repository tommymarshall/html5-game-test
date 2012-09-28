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
			_game.mouseTarget = 0;
			_game.clicked = false;
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

					_game.createPlatform(140,420,true);
					_game.createPlatform(210,420,true);
					_game.createPlatform(280,420,true);

					_game.createPlatform(360,270,true);
					_game.createPlatform(430,270,true);
					_game.createPlatform(500,270,true);

					_game.createPlatform(590,200,true);
					_game.createPlatform(660,390,true);

					_game.createPlatform(660,390,true);
					_game.createPlatform(740,290,true);

					for (var i = 0; i < 20; i++) {
						_game.createPlatform(70 * i,570,true);
						_game.createPlatform(70 * i,0,true);
					}
					for (var z = 20; z < 22; z++) {
						_game.createPlatform(70 * z,440,true);
					}
					for (var n = 23; n < 25; n++) {
						_game.createPlatform(70 * n,320,true);
					}
					for (var m = 24; m < 26; m++) {
						_game.createPlatform(70 * m,320,true);
					}
					for (var j = 25; j < 33; j++) {
						_game.createPlatform(70 * j,0,true);
					}
					for (var q = 33; q < 44; q++) {
						_game.createPlatform(70 * q,570,true);
					}
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
			_game.createOtherBG();
		},

		createHero: function(e) {
			_game.hero = new _game.Hero(e.target);
			_game.stage.addChild(_game.hero);
		},

		createOtherBG: function(e) {
			_game.background = new Shape();
			_game.background.graphics.beginFill('rgba(255,255,255,.25)')
				.drawRect(0,0, 2, 670, 10)
				.drawRect(100,0, 2, 670, 10)
				.drawRect(150,0, 2, 670, 10)
				.drawRect(200,0, 2, 670, 10)
				.drawRect(300,0, 2, 670, 10)
				.drawRect(420,0, 2, 670, 10)
				.drawRect(500,0, 2, 670, 10)
				.drawRect(650,0, 2, 670, 10)
				.drawRect(700,0, 2, 670, 10)
				.drawRect(830,0, 2, 670, 10)
				.drawRect(910,0, 2, 670, 10)
				.drawRect(1000,0, 2, 670, 10)
				.drawRect(1140,0, 2, 670, 10)
				.drawRect(1250,0, 2, 670, 10)
				.drawRect(1300,0, 2, 670, 10)
				.drawRect(1350,0, 2, 670, 10);
			_game.stage.addChildAt(_game.background, 0);
			_game.backgroundClose = new Shape();
			_game.backgroundClose.graphics.beginFill('rgba(255,255,255,.5)')
				.drawRect(0,0, 4, 670, 10)
				.drawRect(140,0, 4, 670, 10)
				.drawRect(150,0, 4, 670, 10)
				.drawRect(240,0, 4, 670, 10)
				.drawRect(320,0, 4, 670, 10)
				.drawRect(460,0, 4, 670, 10)
				.drawRect(540,0, 4, 670, 10)
				.drawRect(620,0, 4, 670, 10)
				.drawRect(750,0, 4, 670, 10)
				.drawRect(820,0, 4, 670, 10)
				.drawRect(930,0, 4, 670, 10)
				.drawRect(990,0, 4, 670, 10)
				.drawRect(1090,0, 4, 670, 10)
				.drawRect(1170,0, 4, 670, 10);
			_game.stage.addChildAt(_game.backgroundClose, 0);
			_game.backgroundClosest = new Shape();
			_game.backgroundClosest.graphics.beginFill('rgba(255,255,255,.75)')
				.drawRect(0,0, 4, 670, 10)
				.drawRect(180,0, 4, 670, 10)
				.drawRect(210,0, 4, 670, 10)
				.drawRect(350,0, 4, 670, 10)
				.drawRect(440,0, 4, 670, 10)
				.drawRect(550,0, 4, 670, 10)
				.drawRect(600,0, 4, 670, 10)
				.drawRect(760,0, 4, 670, 10)
				.drawRect(810,0, 4, 670, 10)
				.drawRect(970,0, 4, 670, 10)
				.drawRect(1030,0, 4, 670, 10)
				.drawRect(1110,0, 4, 670, 10)
				.drawRect(1230,0, 4, 670, 10)
				.drawRect(1350,0, 4, 670, 10);
			_game.stage.addChildAt(_game.backgroundClosest, 0);
		},

		createPlatform: function(x,y,enabled) {
				x = Math.round(x);
				y = Math.round(y);

				var platform = new Bitmap(_game.PLATFORM);
				platform.name = 'Platform' + (_game.Platforms.length+1);
				platform.x = x;
				platform.y = y;
				platform.snapToPixel = true;
				platform.mouseEnabled = enabled || false;

				_game.world.addChild(platform);
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
			var handleKeyDown = function(e)
			{
				if (_game.controls.right.contains(e.which)) {
					_game.hero.moveRight = true;
				} else if (_game.controls.left.contains(e.which)) {
					_game.hero.moveLeft = true;
				} else if (_game.controls.jump.contains(e.which)) {
					_game.hero.jump();
				}
			};
			var handleKeyUp = function(e)
			{
				if (_game.controls.right.contains(e.which)) {
					_game.hero.moveRight = false;
					_game.hero.prevDirection = 'right';
				} else if (_game.controls.left.contains(e.which)) {
					_game.hero.moveLeft = false;
					_game.hero.prevDirection = 'left';
				}
			};
			var handleMouseDown = function(e)
			{
				_game.clicked = true;

				if (_game.stage.mouseX && _game.stage.mouseY){
					mouseTarget = _game.stage.getObjectUnderPoint(_game.stage.mouseX, _game.stage.mouseY);
				}
				if (mouseTarget.name) {
					for (var i = 0; i < _game.Platforms.length; i++) {
						if (_game.Platforms[i].name == mouseTarget.name){
							console.log(_game.Platforms[i].name);
						}
					}
				}
			};
			var handleMouseUp = function(e)
			{
				_game.clicked = false;
			};

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
				document.onmousedown = handleMouseDown;
				document.onmouseup = handleMouseUp;
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

			calculateCollision: function(obj, direction, collideables, moveBy){
						moveBy = moveBy || {x:0,y:0};
						if ( direction != 'x' && direction != 'y' ) {
							direction = 'x';
						}
						var measure = direction == 'x' ? 'width' : 'height',
							oppositeDirection = direction == 'x' ? 'y' : 'x',
							oppositeMeasure = direction == 'x' ? 'height' : 'width',

							bounds = _game.util.getBounds(obj),
							cbounds,
							collision = null,
							cc = 0;

					// for each collideable object we will calculate the
					// bounding-rectangle and then check for an intersection
					// of the hero's future position's bounding-rectangle
					while ( !collision && cc < collideables.length ) {
						cbounds = _game.util.getBounds(collideables[cc]);
						if ( collideables[cc].isVisible ) {
							collision = _game.util.calculateIntersection(bounds, cbounds, moveBy.x, moveBy.y);
						}

						if ( !collision && collideables[cc].isVisible ) {
							// if there was NO collision detected, but somehow
							// the hero got onto the "other side" of an object (high velocity e.g.),
							// then we will detect this here, and adjust the velocity according to
							// it to prevent the Hero from "ghosting" through objects
							// try messing with the 'this.velocity = {x:0,y:125};'
							// -> it should still collide even with very high values
							var wentThroughForwards	= ( bounds[direction] < cbounds[direction] && bounds[direction] + moveBy[direction] > cbounds[direction] );
							var wentThroughBackwards = ( bounds[direction] > cbounds[direction] && bounds[direction] + moveBy[direction] < cbounds[direction] );
							var withinOppositeBounds = !(bounds[oppositeDirection]+bounds[oppositeMeasure] < cbounds[oppositeDirection]) && !(bounds[oppositeDirection] > cbounds[oppositeDirection]+cbounds[oppositeMeasure]);

							if ( (wentThroughForwards || wentThroughBackwards) && withinOppositeBounds ) {
								moveBy[direction] = cbounds[direction] - bounds[direction];
							} else {
								cc++;
							}
						}
					}

					if ( collision ) {
						var sign = Math.abs(moveBy[direction]) / moveBy[direction];
						moveBy[direction] -= collision[measure] * sign;
					}

					return collision;
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
			Ticker.setFPS(60);
			Ticker.useRAF = true;
			Ticker.addListener(tick);

			function tick(e){
				_game.hero.tick();
				_game.stage.update();

				if (_game.hero.x > _game.canvas.width*0.3) {
					_game.stage.x = -_game.hero.x + _game.canvas.width*0.3;
				}

				_game.background.x = -_game.stage.x*0.75;
				_game.backgroundClose.x = -_game.stage.x*0.55;
				_game.backgroundClosest.x = -_game.stage.x*0.25;
			}
		}
	};

	window.onload = function(){
		_game.init();
	};

})();