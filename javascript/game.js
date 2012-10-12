var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.setVars();
			game.setStage();

			game.preloadResources();
			game.setImages();

			game.bindEvents();

			game.start();
			game.render();
		},

		setVars: function() {
			game.HERO = 'images/mouse.png';
			game.WALKER = 'images/runner.png';
			game.PLATFORM = 'images/platform.png';
			game.currentLevel = 1;
			game.Platforms = [];
			game.mouseTarget = 0;
			game.clicked = false;
			game.requestedAssets = 0;
			game.assets = [];
			game.paths = [
				game.HERO,
				game.WALKER,
				game.PLATFORM
			];
			game.window = {
				width: $(window).width(),
				height: $(window).height()
			};
			game.controls = {
				left: [ 37, 65 ],
				right: [ 39, 68 ],
				jump: [ 32, 38, 40, 83, 87 ]
			};
		},

		preloadResources: function() {
			for (var i = game.paths.length - 1; i >= 0; i--) {
				game.loadImage(game.paths[i]);
			}
		},

		loadImage: function(e){
				var img = new Image();
				img.onload = game.onLoadedAsset;
				img.src = e;

				game.assets[e] = img;

				++game.requestedAssets;
		},

		start: function() {

			switch (game.currentLevel) {
				case 1:
					// Do level 1
					game.createPlatform(0,300,true);
					game.createPlatform(70,300,true);

					game.createPlatform(140,420,true);
					game.createPlatform(210,420,true);
					game.createPlatform(280,420,true);

					game.createPlatform(360,270,true);
					game.createPlatform(430,270,true);
					game.createPlatform(500,270,true);

					game.createPlatform(760,900,true);
					game.createPlatform(830,900,true);
					game.createPlatform(900,900,true);

					game.createPlatform(980,600,true);
					game.createPlatform(1050,600,true);
					game.createPlatform(1160,600,true);

					game.createPlatform(590,200,true);
					game.createPlatform(660,390,true);

					game.createPlatform(660,390,true);
					game.createPlatform(740,290,true);

					for (var i = 0; i < 19; i++) {
						game.createPlatform(70 * i,game.window.height-70,true);
						game.createPlatform(70 * i,0,true);
					}
					for (var z = 19; z < 21; z++) {
						game.createPlatform(70 * z,460,true);
					}
					for (var n = 22; n < 24; n++) {
						game.createPlatform(70 * n,370,true);
					}
					for (var m = 25; m < 27; m++) {
						game.createPlatform(70 * m,290,true);
					}
					for (var j = 26; j < 34; j++) {
						game.createPlatform(70 * j,0,true);
					}
					for (var q = 33; q < 44; q++) {
						game.createPlatform(70 * q,game.window.height-70,true);
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
			img.onload = game.createHero;
			img.src = game.HERO;
		},

		createHero: function(e) {
			game.hero = new game.Hero(e.target);
			game.stage.addChild(game.hero);
		},

		createPlatform: function(x,y,enabled) {
				x = Math.round(x);
				y = Math.round(y);

				var platform = new Bitmap(game.PLATFORM);
				platform.name = 'Platform ' + (game.Platforms.length+1);
				platform.x = x;
				platform.y = y;
				platform.snapToPixel = true;
				platform.mouseEnabled = enabled || false;

				game.stage.addChild(platform);
				game.Platforms.push(platform);
		},

		setStage: function() {
			game.canvas = document.getElementById('stage');
			game.canvas.width = game.window.width;
			game.canvas.height = game.window.height;
			game.stage = new Stage(game.canvas);

			game.stage.addChild();
		},

		getPlatforms: function() {
			return game.Platforms;
		},

		bindEvents: function() {
			var handleKeyDown = function(e)
			{
				if (game.controls.right.contains(e.which)) {
					game.hero.moveRight = true;
				} else if (game.controls.left.contains(e.which)) {
					game.hero.moveLeft = true;
				} else if (game.controls.jump.contains(e.which)) {
					game.hero.jump();
				}
			};
			var handleKeyUp = function(e)
			{
				if (game.controls.right.contains(e.which)) {
					game.hero.moveRight = false;
					game.hero.prevDirection = 'right';
				} else if (game.controls.left.contains(e.which)) {
					game.hero.moveLeft = false;
					game.hero.prevDirection = 'left';
				}
			};
			var handleMouseDown = function(e)
			{
				game.clicked = true;

				if (game.stage.mouseX && game.stage.mouseY){
					mouseTarget = game.stage.getObjectUnderPoint(game.stage.mouseX, game.stage.mouseY);
				}
				if (mouseTarget.name) {
					for (var i = 0; i < game.Platforms.length; i++) {
						if (game.Platforms[i].name == mouseTarget.name){
							console.log(game.Platforms[i].name);
						}
					}
				}
			};
			var handleMouseUp = function(e)
			{
				game.clicked = false;
			};

			if ('ontouchstart' in document.documentElement) {
				game.canvas.addEventListener('touchstart', function(e) {
					handleKeyDown();
				}, false);

				game.canvas.addEventListener('touchend', function(e) {
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

							bounds = game.util.getBounds(obj),
							cbounds,
							collision = null,
							cc = 0;

					// for each collideable object we will calculate the
					// bounding-rectangle and then check for an intersection
					// of the hero's future position's bounding-rectangle
					while ( !collision && cc < collideables.length ) {
						cbounds = game.util.getBounds(collideables[cc]);
						if ( collideables[cc].isVisible ) {
							collision = game.util.calculateIntersection(bounds, cbounds, moveBy.x, moveBy.y);
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
				game.hero.tick();
				game.stage.update();

				if (game.hero.x > game.canvas.width*0.3) {
					game.stage.x = -game.hero.x + game.canvas.width*0.3;
				}

				game.background.x = -game.stage.x*0.75 + 30;
				game.backgroundClose.x = -game.stage.x*0.55 + 30;
				game.backgroundClosest.x = -game.stage.x*0.25 + 30;
			}
		}
	};

	window.onload = function(){
		game.init();
	};

})();