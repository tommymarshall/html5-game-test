var SAY = SAY || {};

(function(){

	var game = SAY.game;

	var ss = new SpriteSheet({
		"animations":
		{
			"idle": [0, 27, "idle", 3],
			"run": [29, 47, "run", 2],
			"stop": [59, 86, "idle", 2],
			"jump": [87, 116, false, 2]
		},
			"images": ["../images/rat_sprite_full_small.png"],
			"frames":
				{
					"height": 94.5,
					"width": 95,
					"regX": 47.5,
					"regY": 0,
					"count": 116
				}
		});

	game.Hero = function(){
		this.view = new BitmapAnimation( ss );

		// Flip frames
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = 2.0;
		fixDef.friction = 1.0;
		fixDef.restitution = 0.25;

		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = ( 800 ) / game.SCALE;
		bodyDef.position.y = 0;

		fixDef.shape = new box2d.b2CircleShape( 95 / game.SCALE );
		this.view.body = game.world.CreateBody( bodyDef );
		this.view.body.CreateFixture( fixDef );
		this.view.onTick = tick;
	};

	var tick = function(e) {
		this.x = this.body.GetPosition().x * game.SCALE;
		this.y = this.body.GetPosition().y * game.SCALE;
		this.rotation = this.body.GetAngle() * ( 180/Math.PI );
	};

})();
