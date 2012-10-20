var SAY = SAY || {};

(function(){

	var game = SAY.game;

	var ss = new SpriteSheet({
		"animations":
		{
			"idle": [0, 27, "idle", 3],
			"run": [29, 47, "run", 2],
			"stop": [59, 86, "idle", 2],
			"jump": [87, 116, "idle", 3]
		},
			"images": ["./images/rat_sprite_full.png"],
			"frames":
				{
					"height": 284,
					"width": 285,
					"regX": 142.5,
					"regY": 0,
					"count": 116
				}
		});

	game.Hero = function( data ){
		this.init( data );
		this.binds();
	};

	game.Hero.prototype = new BitmapAnimation( ss );

	game.Hero.prototype.init = function( data ){
		data = data || {};

		// Flip frames
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		// Location
		this.x = data.x || 0;
		this.y = data.y || 0;

		// Scaling
		this.scaleX = this.scaleY = game.scale;

		// Size
		this.radius = data.radius || 0;

		// Controls
		this.controls = {
			right: data.controls.right,
			left: data.controls.left
		};

		// Direction
		this.direction = {
			prev: null
		};

		this.move = {
			right: null,
			left: null
		};

		// Keydown
		this.keydown = false;

		// Moveing by
		this.move = {
			by: {
				x: 0,
				y: 0
			}
		};

		// Velocity
		this.velocity = {
			x: 0,
			y: 1
		};

		// Build the ball
		this.ball();
		this.tween = Object;

		// Set default
		this.gotoAndPlay("idle");

		// Add child
		game.stage.addChild(this);
	};

	game.Hero.prototype.ball = function(){

		this.ball = new Shape();

		// Build the ball
		this.ball.graphics
			.beginFill('rgba(255,255,255,0.75)')
			.arc(0, 0, 142.5, 180, Math.PI)
			.beginFill('rgba(255,255,255,255,0.65)')
			.arc(0, 0, 142.5, 0, Math.PI);

		// Radius
		this.ball.radius = 142.5 * game.scale;

		// Starting location
		this.ball.x = this.x;
		this.ball.y = this.y + (142.5 * game.scale);

		// Rotation
		this.ball.rotating = {
			speed: 0,
			deg: 0
		};

		// Scaling
		this.ball.scaleX = this.ball.scaleY = game.scale;

		game.stage.addChild(this.ball);

	};

	game.Hero.prototype.move = function( direction ){

		// handle moving both rat and the ball

	};

	game.Hero.prototype.binds = function(){
		var self = this;
		var stoppingAnimation = function(e){
			switch (self.direction.prev){
				case "right":
					self.gotoAndPlay("stop");
				break;

				case "left":
					self.gotoAndPlay("stop_h");
				break;
				
				default:
					// Nothing'
				break;
			}
		};
		var handleKeyDown = function(e)
		{
			if ( !self.keydown ){
				self.keydown = true;
				if (self.controls.right.contains(e.which)){
					self.move.right = true;
				} else if (self.controls.left.contains(e.which)){
					self.move.left = true;
				}
			}
		};
		var handleKeyUp = function(e)
		{
			self.keydown = self.move.left = self.move.right = false;
			if (self.controls.right.contains(e.which)){
				self.direction.prev = "right";
			} else if (self.controls.left.contains(e.which)){
				self.direction.prev = "left";
			}

			stoppingAnimation();
		};

		if ('ontouchstart' in document.documentElement){
			game.canvas.addEventListener('touchstart', function(e){
				handleKeyDown();
			}, false);

			game.canvas.addEventListener('touchend', function(e){
				handleKeyUp();
			}, false);
		} else {
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
		}
		
	};

	game.Hero.prototype.tick = function(){
		// If the user is currently pressing left or right
		if (this.keydown){

			if (this.move.by.x < 10)
			{
				this.move.by.x += 0.1;
			}


			if (this.move.right){

				// Move both the rat and the ball
				this.x += this.move.by.x;
				this.ball.x += this.move.by.x;

				// Rotate ball clockwise
				if (this.ball.rotating.speed < 8){
					this.ball.rotating.speed += 0.08;
				}

				this.ball.rotating.deg += this.ball.rotating.speed;
				this.ball.rotation = this.ball.rotating.deg;

				// If previous direction (or currently clicked)
				// direction is not right, show the animate right
				// OR if the user started, stopped, and started again
				if (this.direction.prev !== "right" || this.currentAnimation === "stop"){
					this.gotoAndPlay("run");
				}

				// Set previous direction to right so we don't
				// keep running the animating sprite
				this.direction.prev = "right";

			} else if (this.move.left){

				// Move both the rat and the ball
				this.x -= this.move.by.x;
				this.ball.x -= this.move.by.x;

				// Rotate ball counter-clockwise

				// Rotate ball clockwise
				if (this.ball.rotating.speed < 8){
					this.ball.rotating.speed += 0.08;
				}

				this.ball.rotating.deg -= this.ball.rotating.speed;
				this.ball.rotation = this.ball.rotating.deg;

				// If previous direction (or currently clicked)
				// direction is not left, show the animate left
				// OR if the user started, stopped, and started again
				if (this.direction.prev !== "left" || this.currentAnimation === "stop_h"){
					this.gotoAndPlay("run_h");
				}

				// Set previous direction to right so we don't
				// keep running the animating sprite
				this.direction.prev = "left";

			}

		} else {

			// If the ball is still rotating right/left
			if (this.direction.prev === "right"){

				// If the rotating speed is more than 0
				if (this.ball.rotating.speed > 0 || this.move.by.x > 0){

					// Gradually slow down the ball
					if (this.ball.rotating.speed > 0){
						this.ball.rotating.speed -= 0.1;
						this.ball.rotating.deg += this.ball.rotating.speed;
					}

					// Rotate the ball accordingly
					this.ball.rotation = this.ball.rotating.deg;

					// Gradually slow down movement
					this.x = this.ball.x += this.ball.rotating.speed;

				} else {
					// Set previous to null, since we aren't moving
					this.direction.prev = null;
				}

			} else if (this.direction.prev === "left"){

				// If the rotating speed is more than 0
				if (this.ball.rotating.speed > 0 || this.move.by.x > 0){

					// Gradually slow down the ball
					if (this.ball.rotating.speed > 0){
						this.ball.rotating.speed -= 0.1;
						this.ball.rotating.deg -= this.ball.rotating.speed;
					}

					// Rotate the ball accordingly
					this.ball.rotation = this.ball.rotating.deg;

					// Gradually slow down movement
					this.x = this.ball.x -= this.ball.rotating.speed;

				} else {
					// Set previous to null, since we aren't moving
					this.direction.prev = null;
				}

			}

			if (this.move.by.x > 0){
				this.move.by.x -= 0.1;
			}
		}
		var ball;
		var spot;
		var collision = true;

		// Check if colliding
		for (var i = 0; i < game.platforms.length; i++){

			// Create "copy" of relative values to send to collision engine
			ball = {
				x: this.ball.x + this.velocity.x,
				y: this.ball.y + this.velocity.y,
				radius: this.ball.radius
			};

			// Returns object of details of collision point if true
			spot = SAY.game.util.isColliding( ball, game.platforms[i] );
			collision = ( spot === false ? false : spot);

			if ( collision ){
				console.log(collision);
			} else {
				// Move to new location since we didn't collide
				this.y += this.velocity.y;
				this.ball.y += this.velocity.y;

				this.x += this.velocity.x;
				this.ball.x += this.velocity.x;
			}
		}

	};

})();