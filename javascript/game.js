var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.setVars();
			game.reality.init();
			game.createGround();
			game.createPlatform();
			game.createHero();
			game.render();
		},

		setVars: function() {
			// Game specifics
			game.SCALE = 30;
			game.HEIGHT = 800;
			game.WIDTH = 1200;

			// Holds object of characters
			game.character = {};

			// Array containing colliding platforms
			game.platforms = [];

			// Debug?
			game.DEVELOPMENT = true;
			// Debug canvas
			game.debug = {};
		},

		reality: {
			init: function() {
				game.reality.createCanvas();
				game.reality.createStage();

				if ( game.DEVELOPMENT ){
					game.reality.createDebugCanvas();
				}

				game.reality.createPhysics();
			},

			createCanvas: function() {
				game.canvas = document.getElementById( 'stage' );
				game.canvas.width = game.WIDTH;
				game.canvas.height = game.HEIGHT;
			},

			createDebugCanvas: function() {
				game.debug.canvas = document.getElementById( 'debug' );
				game.debug.canvas.width = game.WIDTH;
				game.debug.canvas.height = game.HEIGHT;
			},

			createStage: function() {
				game.stage = new Stage( game.canvas );
			},

			createPhysics: function() {
				game.world = new box2d.b2World( new box2d.b2Vec2( 0, 50 ), true );

				if ( game.DEVELOPMENT ){
					var debugDraw = new box2d.b2DebugDraw();
					debugDraw.SetSprite(game.debug.canvas.getContext( '2d' ));
					debugDraw.SetDrawScale(30);
					debugDraw.SetFillAlpha(0.5);
					debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
					game.world.SetDebugDraw(debugDraw);
				}
			}
		},

		createGround: function() {
			game.ground = {};

			// Create game.ground.base
			game.ground.base = new box2d.b2FixtureDef();
			game.ground.base.density = 1;
			game.ground.base.friction = 1;

			// Create game.ground.body
			game.ground.base.body = new box2d.b2BodyDef();
			game.ground.base.body.type = box2d.b2Body.b2_staticBody;
			game.ground.base.body.position.x = game.WIDTH / game.SCALE;
			game.ground.base.body.position.y = game.HEIGHT / game.SCALE;

			game.ground.base.shape = new box2d.b2PolygonShape();
			game.ground.base.shape.SetAsBox( game.WIDTH / game.SCALE , 10 / game.SCALE );

			game.world.CreateBody(game.ground.base.body).CreateFixture(game.ground.base);

		},

		createPlatform: function() {
			var data = {
				density: 1,
				friction: 1,
				x: 605,
				y: 300,
				coords: [[-1,0],[0,-1],[1,0]]
			};
			var platform = new game.Platform( data );
		},

		createHero: function() {
			game.character.hero = new game.Hero();
		},

		render: function() {
			var tick = function(e){
				game.stage.update(e);

				if ( game.DEVELOPMENT ){
					game.world.DrawDebugData();
				}
				game.world.Step( 1/60, 10, 10);
				game.world.ClearForces(e);
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
