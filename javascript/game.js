var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.setVars();
			game.create();
			game.render();
		},

		setVars: function() {
			game.SCALE = 30;
		},

		create: function() {
			game.canvas();
			game.createStage();
			game.createPhysics();
		},

		canvas: function() {
			game.canvas = document.getElementById( 'stage' );
			game.canvas.width = 1200;
			game.canvas.height = 800;
		},

		createBall: function(e) {
			var b = new game.Ball();
			game.stage.addChild(b.view);
		},

		createStage: function() {
			game.stage = new Stage( game.canvas );

			game.stage.onMouseDown = game.createBall;

		},

		createPhysics: function() {
			game.world = new box2d.b2World( new box2d.b2Vec2( 0, 50 ), true );

			// Create ground
			var fixDef = new box2d.b2FixtureDef();
			fixDef.density = 1;
			fixDef.friction = 0.5;

			// Create
			var bodyDef = new box2d.b2BodyDef();
			bodyDef.type = box2d.b2Body.b2_staticBody;
			bodyDef.position.x = 400 / game.SCALE;
			bodyDef.position.y = 600 / game.SCALE;

			fixDef.shape = new box2d.b2PolygonShape();
			fixDef.shape.SetAsBox( 400 / game.SCALE , 200 / game.SCALE );
			game.world.CreateBody(bodyDef).CreateFixture(fixDef);

			var debugDraw = new box2d.b2DebugDraw();
			debugDraw.SetSprite(game.canvas.getContext( '2d' ));
			debugDraw.SetDrawScale(30);
			debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
			game.world.SetDebugDraw(debugDraw);
		},

		render: function() {
			var tick = function(e){
				game.stage.update();
				game.world.Step( 1/60, 10, 10);
				game.world.ClearForces();
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
