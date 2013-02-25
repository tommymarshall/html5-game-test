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
			game.draw.hero();

			// Container stuff
			game.build();
			game.addToStage();

			// Run it!
			game.render();
		},

		vars: function() {
			// Game specifics
			game.SCALE = 30;
			game.HEIGHT = 800;
			game.WIDTH = 1200;

			// Holds object of characters
			game.characters = [];

			// Array of colliding platforms
			game.platforms = [];

			// Array of non-colliding bakgrounds
			game.backgrounds = [];

			// Debug?
			game.DEVELOPMENT = true;

			// Debug canvas
			game.debug = {};
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
						var debugDraw = new box2d.b2DebugDraw();
						debugDraw.SetSprite(game.debug.canvas.getContext( '2d' ));
						debugDraw.SetDrawScale(30);
						debugDraw.SetFillAlpha(0.25);
						debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
						game.world.SetDebugDraw(debugDraw);
					}
				}
			}
		},

		build: function() {
			console.log('Loading');
			for (var i = 0; i < game.backgrounds.length; i++) {
				console.log('...backgrounds.');
				game.container.addChild(game.backgrounds[i]);
			}

			for (var j = 0; j < game.platforms.length; j++) {
				console.log('...platforms');
				game.container.addChild(game.platforms[j]);
			}

			for (var q = 0; q < game.characters.length; q++) {
				console.log('...characters');
				game.container.addChild(game.characters[q]);
			}
			console.log('Done loading');
		},

		addToStage: function() {
			game.stage.addChild(game.container);
		},

		draw: {
			backgrounds: function() {
				var background = new game.Background( game.resources.starting_bg );
				game.backgrounds['large_platform'] = background;
			},

			platforms: function() {
				var platform = new game.Platform( game.resources.large_platform );
				game.platforms['large_platform'] = platform;
			},

			hero: function() {
				var hero = new game.Hero();
				game.characters['hero'] = hero;
			}
		},

		render: function() {
			var tick = function(e){
				game.stage.update(e);

				if ( game.DEVELOPMENT ){
					game.world.DrawDebugData();
				}

				game.world.Step( 1/60, 10, 10);
				game.world.ClearForces(e);

				if (game.characters.hero.view.x > game.canvas.width * 0.3){
					game.stage.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
					game.debug.x = -game.characters.hero.view.x + game.canvas.width * 0.3;
				}
			};

			Ticker.setFPS( 60 );
			Ticker.useRAF = true;
			Ticker.addListener(tick);
		}

	};

	window.onload = function() {
		game.init();
	};

})();
