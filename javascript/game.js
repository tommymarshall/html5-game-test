var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.setVars();
			game.reality.init();
			game.render();
		},

		setVars: function() {
			game.SCALE = 30;
			game.WIDTH = 1600;
			game.HEIGHT = 1200;
			game.character = {};
		},

		reality: {
			init: function() {
				game.reality.createCanvas();
				game.reality.createStage();
				game.reality.createPhysics();
			},

			createCanvas: function() {
				game.canvas = document.getElementById( 'stage' );
				game.canvas.width = game.WIDTH;
				game.canvas.height = game.HEIGHT;
			},

			createStage: function() {
				game.stage = new Stage( game.canvas );
				game.stage.onMouseDown = game.createHero;
			},

			createPhysics: function() {
				var ground = {};
				game.world = new box2d.b2World( new box2d.b2Vec2( 0, 50 ), true );

				// Create ground.properties
				ground.properties = new box2d.b2FixtureDef();
				ground.properties.density = 1;
				ground.properties.friction = 1;
				ground.properties.restitution = 0.5;

				// Create ground.body
				ground.body = new box2d.b2BodyDef();
				ground.body.type = box2d.b2Body.b2_staticBody;
				ground.body.position.x = 800 / game.SCALE;
				ground.body.position.y = 1200 / game.SCALE;

				ground.properties.shape = new box2d.b2PolygonShape();
				ground.properties.shape.SetAsBox( 400 / game.SCALE , 200 / game.SCALE );
				game.world.CreateBody(ground.body).CreateFixture(ground.properties);

				var debugDraw = new box2d.b2DebugDraw();
				debugDraw.SetSprite(game.canvas.getContext( '2d' ));
				debugDraw.SetDrawScale(30);
				debugDraw.SetFillAlpha(0.5);
				debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
				game.world.SetDebugDraw(debugDraw);
			}
		},

		createHero: function() {
			console.log('clicking');
			game.character.hero = new game.Hero();
			game.stage.addChild(game.character.hero.view);

			game.character.hero.view.gotoAndPlay("idle");
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
