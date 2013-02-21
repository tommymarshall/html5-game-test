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

	game.Hero.prototype.binds = function() {
		var controls = {
			left: [ 37, 65 ],
			right: [ 39, 68 ],
			jump: [ 32, 38, 40, 83, 87 ]
		};
		var handleKeyDown = function(e)
		{
			if (controls.right.contains(e.which)){
				console.log('KEYDOWN right');
				self.is.movingRight = true;
			} else if (controls.left.contains(e.which)){
				console.log('KEYDOWN left');
				self.is.movingLeft = true;
			} else if (controls.jump.contains(e.which)) {
				console.log('KEYDOWN jump');
				self.is.jumping = true;
			}
		};
		var handleKeyUp = function(e)
		{
			if (controls.right.contains(e.which)){
				console.log('KEYUP right');
				self.is.movingRight = false;
			} else if (controls.left.contains(e.which)){
				console.log('KEYUP left');
				self.is.movingLeft = false;
			} else if (controls.jump.contains(e.which)) {
				console.log('KEYUP jump');
				self.is.jumping = false;
			}
		};

		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
	};

	game.Hero.prototype.setData = function( data ){
		for(var key in data){
			this[key] = data[key];
		}
	};

	game.Hero.prototype.create = function() {
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
		this.bodyDef.position.x = (game.WIDTH / game.SCALE) / 2;
		this.bodyDef.position.y = 0;
		this.bodyDef.isSensor = true;

		this.fixDef.shape = new box2d.b2CircleShape( 47.5 / game.SCALE );
		this.view.body = game.world.CreateBody( this.bodyDef );
		this.view.body.CreateFixture( this.fixDef );
		this.view.gotoAndPlay("idle");

		// Set the Tick
		this.view.onTick = this.tick;

		// Add to stage
		game.stage.addChild(this.view);
	};

	game.Hero.prototype.tick = function( event ) {

			/*
				TODO:
				- Check if user is jumping or on the ground
				- On the ground means previous Y == current Y
			*/

		var position = this.body.GetPosition();
		this.x = (position.x * game.SCALE) + (event / 100000);
		this.y = (position.y * game.SCALE) + (event / 100000);

		// Jump
		if (self.is.jumping) {
			this.body.ApplyImpulse(new box2d.b2Vec2(0,-225), position);
			self.is.jumping = false;
		}

		var Vo = this.body.GetLinearVelocity();

		// Moving Right
		if (self.is.movingRight && Vo.x < self.maxSpeed) {
			this.body.SetLinearVelocity(new box2d.b2Vec2(Vo.x + 1, Vo.y));
		}

		// Moving Left
		if (self.is.movingLeft && Vo.x > -self.maxSpeed) {
			this.body.SetLinearVelocity(new box2d.b2Vec2(Vo.x - 1, Vo.y));
		}

		// Slow Down
		this.body.SetLinearDamping(1.5);
		//this.rotation = this.body.GetAngle() * ( 180/Math.PI );
	};

})();
