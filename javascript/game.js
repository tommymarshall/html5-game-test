var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.vars();
			game.binds();

			// Some world stuff
			game.reality.init();

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
			// Game specifics
			game.SCALE = 30;
			game.HEIGHT = 1004;
			game.WIDTH = 1200;

			// Debug?
			game.DEVELOPMENT = false;

			// Debug canvas
			game.debug = {};

			// Containers object
			game.containers = {};

			// Holds object of characters
			game.characters = [];

			// Object containing array of bodies
			game.bodies = {};

		},

		binds: function() {
			window.addEventListener('blur', game.state.pause, false);
			window.addEventListener('focus', game.state.play, false);
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
				for (var key in game.resources.level_one) {
					var obj = game.resources.level_one[key];

					new game.Body( obj );
				}
			},

			hero: function() {
				game.characters['hero'] = new game.Hero();
			}
		},

		buildScene: function() {
			console.log('Loading');

			for (var key in game.bodies) {
				var obj = game.bodies[key];
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
					game.stage.update(e);

					if ( game.DEVELOPMENT ){
						game.world.SetDebugDraw( game.drawer );
						game.world.DrawDebugData();
					}

					game.world.Step( 1/60, 10, 10 );
					game.world.ClearForces(e);

					if (game.characters.hero.view.x > game.canvas.width * 0.3){
						game.stage.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
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
