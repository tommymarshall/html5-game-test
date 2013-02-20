var SAY = SAY || {};

(function(){

	var game = SAY.game;

	var ss = new SpriteSheet({
		"animations":
		{
			"idle": [0, 27, "idle", 3],
			"run":  [29, 47, "run", 2],
			"stop": [59, 86, "idle", 2],
			"jump": [87, 116, false, 2]
		},
			"images": ["../images/rat_sprite_full_small.png"],
			"frames":
				{
					"height": 94.5,
					"width":  95,
					"regX":   47.5,
					"regY":   47.5,
					"count":  116
				}
		});

	game.Hero = function(){
		this.create();
		this.binds();
	};

	game.Hero.prototype.binds = function( data ) {
	};

	game.Hero.prototype.setData = function( data ){
		for(var key in data){
			this[key] = data[key];
		}
	};

	game.Hero.prototype.create = function() {
		this.view = new BitmapAnimation( ss );

		// Flip frames
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		// Create the shapes definition values
		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = 2;
		fixDef.friction = 1;
		fixDef.restitution = 0.25;

		// Define body position
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = (game.WIDTH / game.SCALE) / 2;
		bodyDef.position.y = 0;

		fixDef.shape = new box2d.b2CircleShape( 47.5 / game.SCALE );
		this.view.body = game.world.CreateBody( bodyDef );
		this.view.body.CreateFixture( fixDef );
		this.view.gotoAndPlay("idle");

		// Set the Tick
		this.view.onTick = this.tick;

		// Add to stage
		game.stage.addChild(this.view);
	};

	game.Hero.prototype.tick = function( event ) {
		// Update X and Y position
		this.x = (this.body.GetPosition().x * game.SCALE) + (event / 100000);
		this.y = (this.body.GetPosition().y * game.SCALE) + (event / 100000);

		// Slow Down
		this.body.SetLinearDamping(1);
		//this.rotation = this.body.GetAngle() * ( 180/Math.PI );
	};

})();
