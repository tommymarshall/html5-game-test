var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.vars();

			// Some world stuff
			game.reality.init();

			// Action methods, do stuff
			game.draw.backgrounds();
			game.draw.platforms();
			game.draw.special();
			game.draw.enemies();
			game.draw.hero();
			game.draw.foregrounds();

			// Container stuff
			game.build();
			game.addToStage();

			// Run it!
			game.render();
		},

		vars: function() {
			// Game specifics
			game.SCALE = 30;
			game.HEIGHT = 1000;
			game.WIDTH = 1400;

			// Debug?
			game.DEVELOPMENT = false;

			// Debug canvas
			game.debug = {};

			// Holds object of characters
			game.characters = [];

			// Array of colliding platforms
			game.platforms = [];

			// Array of special objects
			game.special = [];

			// Array of enemies
			game.enemies = [];

			// Array of non-colliding backgrounds
			game.backgrounds = [];

			// Array of non-colliding foregrounds
			game.foregrounds = [];
		},

		reality: {
			init: function() {
				game.reality.create.canvas();
				game.reality.create.container();
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

				container: function() {
					game.container = new Container();
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
			backgrounds: function() {
				var background = new game.Body( game.resources.starting_bg );
			},

			platforms: function() {
				var platform = new game.Body( game.resources.large_platform );
			},

			special: function() {
				var trampoline = new game.Body( game.resources.trampoline );
			},

			enemies: function() {
			},

			hero: function() {
				var hero = new game.Hero();
				game.characters['hero'] = hero;
			},

			foregrounds: function() {
				var cage = new game.Body( game.resources.cage );
			}
		},

		build: function() {
			console.log('Loading');
			for (var b = 0; b < game.backgrounds.length; b++) {
				console.log('...backgrounds.');
				game.container.addChild(game.backgrounds[b]);
			}

			for (var p = 0; p < game.platforms.length; p++) {
				console.log('...platforms');
				game.container.addChild(game.platforms[p]);
			}

			for (var s = 0; s < game.special.length; s++) {
				console.log('...special');
				game.container.addChild(game.special[s]);
			}

			for (var e = 0; e < game.enemies.length; e++) {
				console.log('...enemies');
				game.container.addChild(game.enemies[e]);
			}

			for (var c = 0; c < game.characters.length; c++) {
				console.log('...characters');
				game.container.addChild(game.characters[c]);
			}

			for (var f = 0; f < game.foregrounds.length; f++) {
				console.log('...foregrounds.');
				game.container.addChild(game.foregrounds[f]);
			}
			console.log('Done loading');
		},

		addToStage: function() {
			game.stage.addChild(game.container);
		},

		render: function() {
			var tick = function(e){
				game.stage.update(e);

				if ( game.DEVELOPMENT ){
					game.world.SetDebugDraw( game.drawer );
					game.world.DrawDebugData();
				}

				game.world.Step( 1/60, 10, 10 );
				game.world.ClearForces(e);

				if (game.characters.hero.view.x > game.canvas.width * 0.3){
					game.stage.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
					//game.debug.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
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
