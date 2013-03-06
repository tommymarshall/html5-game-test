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
		self = this;

		this.create();
		this.binds();
	};

	var p = game.Hero.prototype;

	p.binds = function() {
		var controls = {
			left: [ 37, 65 ],
			right: [ 39, 68 ],
			jump: [ 32, 38, 40, 83, 87 ]
		};
		var handleKeyDown = function(e)
		{
			if (controls.right.contains(e.which)){
				self.is.movingRight = true;
			} else if (controls.left.contains(e.which)){
				self.is.movingLeft = true;
			} else if (controls.jump.contains(e.which)) {
				self.is.jumping = true;
			}
		};
		var handleKeyUp = function(e)
		{
			if (controls.right.contains(e.which)){
				self.is.movingRight = false;
			} else if (controls.left.contains(e.which)){
				self.is.movingLeft = false;
			} else if (controls.jump.contains(e.which)) {
				self.is.jumping = false;
			}
		};

		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
	};

	p.create = function() {
		// Add spritesheet
		this.view = new BitmapAnimation( ss );

		// Set some states
		this.is = {
			jumping: false,
			movingLeft: false,
			movingRight: false,
			prevDirection: 'right',
			facing: 'right'
		};

		this.maxSpeed = 16;

		// Flip frames
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		// Create the shapes definition values
		this.fixDef = new box2d.b2FixtureDef();
		this.fixDef.density = 1;
		this.fixDef.friction = 1;
		this.fixDef.restitution = 0.25;

		// Define body position
		this.bodyDef = new box2d.b2BodyDef();
		this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
		this.bodyDef.position.x = (game.WIDTH / game.SCALE) / 4;
		this.bodyDef.position.y = (game.HEIGHT / game.SCALE) / 1.5;
		this.bodyDef.isSensor = true;

		this.fixDef.shape = new box2d.b2CircleShape( 47.5 / game.SCALE );
		this.view.body = game.world.CreateBody( this.bodyDef );
		this.view.body.CreateFixture( this.fixDef );
		this.view.gotoAndPlay("idle");

		// Set the Tick
		this.view.onTick = this.tick;

		// Build ball
		this.view.ball = new Shape();

		// Build the ball
		this.view.ball.graphics
			.beginStroke('#fff')
			.setStrokeStyle(3)
			.beginFill('rgba(255,255,255,0.75)')
			.arc(0, 0, 47.5, 180, Math.PI)
			.beginFill('rgba(255,255,255,255,0.65)')
			.arc(0, 0, 47.5, 0, Math.PI)
			.endStroke();

		// Starting location
		this.view.ball.x = this.view.x;
		this.view.ball.y = this.view.y;

		// Add ball to stage
		game.characters.push(this.view.ball);

		// Add to stage
		game.characters.push(this.view);
	};

	p.tick = function( event ) {
		/*
			TODO:
			- Check if user is jumping or on the ground
			- On the ground means previous Y == current Y
		*/

		var position = this.body.GetPosition();
		this.x = this.ball.x = (position.x * game.SCALE) + (event / 100000);
		this.y = this.ball.y = (position.y * game.SCALE) + (event / 100000);

		// Jump
		if (self.is.jumping) {
			this.body.ApplyImpulse(new box2d.b2Vec2(0,-225), position);
			self.is.jumping = false;
		}

		var Vo = this.body.GetLinearVelocity();

		// Moving Right
		if (self.is.movingRight && Vo.x < self.maxSpeed) {
			this.body.SetLinearVelocity(new box2d.b2Vec2(Vo.x + 1, Vo.y));
		} // Moving Left
		else if (self.is.movingLeft && Vo.x > -self.maxSpeed) {
			this.body.SetLinearVelocity(new box2d.b2Vec2(Vo.x - 1, Vo.y));
		} else if (Math.abs(Vo.x) > 0.015 && Math.abs(Vo.x)) {
			this.body.SetLinearVelocity(new box2d.b2Vec2(Vo.x * 0.98, Vo.y));
		} else {
			this.body.SetLinearVelocity(new box2d.b2Vec2(0, Vo.y));
		}

		// Slow Down
		this.ball.rotation = this.body.GetAngle() * ( 180/Math.PI );
	};

})();
