var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.vars();
			game.binds();

			// Some world stuff
			game.reality.init();

			// Preload all assets
			game.preload();

			// Action methods, do stuff
			game.draw.level_one();
			game.draw.hero();

			// Container stuff
			game.buildScene();
			game.addContainersToStage();

			// Run it!
			game.render();
		},

		vars: function() {
			// FPS counter
			game.fps = document.getElementById('fps-counter');

			// Game specifics
			game.SCALE = 30;
			game.HEIGHT = 1004;
			game.WIDTH = 1400;

			// Debug?
			game.DEVELOPMENT = false;

			// Is game ready?
			game.ready = false;

			// Debug canvas
			game.debug = {};

			// Containers object
			game.containers = {};

			// Holds object of characters
			game.characters = [];

			// Keeps track of current scene
			game.current = {
				scene: 'level_one',
				bodies: {},
				images: {}
			};

		},

		binds: function() {
			window.addEventListener('blur', game.state.pause, false);
			window.addEventListener('focus', game.state.play, false);
		},

		preload: function() {
			var handleProgress = function( e ) {
				console.log('handleProgress: ');
				console.log( e );
			};
			var handleComplete = function( e ) {
				console.log('handleComplete: ');
				console.log( e );
			};
			var handleFileLoad = function( e ) {
				console.log('handleFileLoad: ');
				console.log( e );
			};

			preload = new LoadQueue(false);

			// Use this instead to use tag loading
			//preload = new createjs.PreloadJS(false);
			var manifest = game.getSceneResources('level_one');

			// preload.addEventListener("progress", handleProgress);
			// preload.addEventListener("complete", handleComplete);
			// preload.addEventListener("fileload", handleFileLoad);
			preload.loadManifest(manifest);
		},

		getSceneResources: function( scene ) {
			var scenes = game.scenes[scene];
			var manifest = [];

			for (var key in scenes) {
				var obj = scenes[key];
				var image = {src: './images/' + obj['src'], id: obj['id']};
				manifest.push(image);
			}

			return manifest;
		},

		state: {
			pause: function() {
				Ticker.setPaused(true);
			},
			play: function() {
				Ticker.setPaused(false);
			}
		},

		reality: {
			init: function() {
				game.reality.create.canvas();
				game.reality.create.stage();

				if ( game.DEVELOPMENT ){
					game.reality.create.debugCanvas();
				}

				game.reality.create.physics();
			},

			create: {
				canvas: function() {
					game.canvas = document.getElementById( 'world' );
					game.canvas.width = game.WIDTH;
					game.canvas.height = game.HEIGHT;
				},

				debugCanvas: function() {
					game.debug.canvas = document.getElementById( 'debug' );
					game.debug.canvas.width = game.WIDTH;
					game.debug.canvas.height = game.HEIGHT;
				},

				stage: function() {
					game.stage = new Stage( game.canvas );
					game.stage.enableMouseOver();
				},

				physics: function() {
					game.world = new box2d.b2World( new box2d.b2Vec2( 0, 50 ), true );

					if ( game.DEVELOPMENT ){
						game.drawer = new box2d.b2DebugDraw();
						game.drawer.SetSprite(game.debug.canvas.getContext( '2d' ));
						game.drawer.SetDrawScale(30);
						game.drawer.SetFillAlpha(0.2);
						game.drawer.SetLineThickness();
						game.drawer.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
					}
				}
			}
		},

		draw: {
			level_one: function() {
				for (var key in game.scenes.level_one) {
					var obj = game.scenes.level_one[key];

					game.current.bodies[key] = new game.Body( obj );
				}
			},

			hero: function() {
				game.characters['hero'] = new game.Hero();
			}
		},

		buildScene: function() {
			console.log('Loading');

			for (var key in game.current.images) {
				var obj = game.current.images[key];
				console.log('...layer ' + key);

				if (game.containers[key] === undefined) {
					game.containers[key] = new Container();
				}

				for (var i = 0; i < obj.length; i++) {
					game.containers[key].addChild(obj[i]);
				}
			}


			for (var c = 0; c < game.characters.length; c++) {
				console.log('...characters');

				if (game.containers[5] === undefined) {
					game.containers[5] = new Container();
				}

				game.containers[5].addChild(game.characters[c]);
			}

			console.log('Done loading');
		},

		addContainersToStage: function() {
			for (var key in game.containers) {
				var obj = game.containers[key];

				game.stage.addChild(obj);
			}
		},

		render: function() {
			var tick = function(e){
				if (!createjs.Ticker.getPaused()) {
					//game.fps.innerHTML = Ticker.getFPS();
					game.stage.update(e);

					game.world.Step( 1/60, 10, 10 );
					game.world.ClearForces(e);

					//game.stage.y = -game.characters.hero.view.y * 0.1;

					if (game.characters.hero.view.x > game.canvas.width * 0.3){
						game.stage.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
						game.containers[12].x = game.stage.x * 0.5;
					}

					if ( game.DEVELOPMENT ){
						game.world.SetDebugDraw( game.drawer );
						game.world.DrawDebugData();
					}
				}
			};

			Ticker.setFPS( 60 );
			Ticker.useRAF = true;
			Ticker.addListener( tick );
		}

	};

	window.onload = function() {
		game.init();
	};

})();
