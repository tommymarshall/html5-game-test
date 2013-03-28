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

			// Build game assets
			game.build.scene();
			game.build.hero();

			// Draw scene to the Canvas
			game.draw();

			// Run it!
			game.render();
		},

		vars: function() {
			// Game specifics
			game.SCALE = 30;
			game.HEIGHT = 830;
			game.WIDTH = 1440;

			// Debug mode?
			game.DEVELOPMENT = true;

			// Is game ready?
			game.ready = false;

			// Debug canvas
			game.debug = {};

			// Colors for nice console logging
			game.colors = {
				head: 'color: #1d7549; font-weight: bold;',
				main: 'color: #2eb672;',
				error: 'color: #db4e4f;'
			};

			// Containers object
			game.containers = {};

			// Holds object of characters
			game.characters = [];

			// Keeps track of current scene state and objects
			game.current = {
				scene: 'level_one',
				bodies: {}
			};

		},

		binds: function() {
			window.addEventListener('blur', game.state.pause, false);
			window.addEventListener('focus', game.state.play, false);
		},

		preload: function() {
			var handleProgress = function( e ) {
				log('handleProgress: ');
				log( e );
			};
			var handleComplete = function( e ) {
				log('handleComplete: ');
				log( e );
			};
			var handleFileLoad = function( e ) {
				log('handleFileLoad: ');
				log( e );
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
			var resource = game.scenes[scene];
			var manifest = [];

			for (var key in resource) {
				var obj = resource[key];
				var image = {src: './images/' + obj['src'], id: obj['id']};
				manifest.push(image);
			}

			return manifest;
		},

		state: {
			paused: false,

			pause: function() {
				Ticker.setPaused(true);
				game.state.paused = true;
			},

			play: function() {
				Ticker.setPaused(false);
				game.state.paused = true;
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
						game.world.SetDebugDraw( game.drawer );
					}
				}
			}
		},

		build: {
			scene: function() {
				for (var key in game.scenes[game.current.scene]) {
					var obj = game.scenes[game.current.scene][key];

					game.current.bodies[key] = new game.Body( obj, key );
				}
			},

			hero: function() {
				game.characters.hero = new game.Hero();
			}
		},

		draw: function() {
			log('%cBeing Adding Objects to Container', game.colors.head);
			for (var body_key in game.current.bodies) {
				var body_obj = game.current.bodies[body_key];

				if (game.containers[body_obj.data.layer] === undefined) {
					game.containers[body_obj.data.layer] = new Container();
					log('%cCreating Container ' + body_obj.data.layer, game.colors.main);
				}

				log('%c	Adding ' + body_key, game.colors.main);
				game.containers[body_obj.data.layer].addChild(body_obj.view);

			}

			log('%cAdding Hero', game.colors.main);
			for (var c = 0; c < game.characters.length; c++) {
				if (game.containers[5] === undefined) {
					game.containers[5] = new Container();
				}

				game.containers[5].addChild(game.characters[c]);
			}
			log('%cCompleted Adding Objects to Container', game.colors.head);

			for (var container_key in game.containers) {
				var container_obj = game.containers[container_key];

				game.stage.addChild(container_obj);
			}
		},

		render: function() {
			var tick = function(e){
				if (!Ticker.getPaused()) {
					game.stage.update(e);
					game.world.Step( 1/60, 10, 10 );

					game.stage.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
					game.stage.y = -game.characters.hero.view.y + game.canvas.height * 0.6;

					game.containers[12].x = game.stage.x * 0.4;
					game.containers[12].y = game.stage.y * 0.15;

					// for (var b = game.world.GetBodyList(); b; b = b.m_next) {
					// 	if (b.IsActive() && b.GetUserData() !== null && typeof b.GetUserData().key !== 'undefined' && b.GetUserData() != 'hero' ) {
					// 		var bodyKey = b.GetUserData().key;
					// 		var bodySpec = {
					// 				x: ((-game.characters.hero.view.x + game.canvas.width * 0.3) / game.SCALE) + (game.current.bodies[bodyKey].data.position.x / game.SCALE),
					// 				y: ((-game.characters.hero.view.y + game.canvas.height * 0.6) / game.SCALE) + (game.current.bodies[bodyKey].data.position.y / game.SCALE)
					// 		};
					// 		b.SetPosition(bodySpec);
					// 	}
					// }

					if ( game.DEVELOPMENT ){
						game.world.ClearForces(e);
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
