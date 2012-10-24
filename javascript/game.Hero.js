var SAY = SAY || {};

(function(){

	var game = SAY.game;
	RADIUS = 47.5;

	var ss = new SpriteSheet({
		"animations":
		{
			"idle": [0, 27, "idle", 3],
			"run": [29, 47, "run", 2],
			"stop": [59, 86, "idle", 2],
			"jump": [87, 116, "idle", 2]
		},
			"images": ["./images/rat_sprite_full_small.png"],
			"frames":
				{
					"height": 94.5,
					"width": 95,
					"regX": RADIUS,
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
		// Flip frames
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		// Location
		this.x = data.x;
		this.y = data.y;

		// Size
		this.radius = data.radius || 0;

		// Controls
		this.controls = {
			right: data.controls.right,
			left: data.controls.left,
			jump: data.controls.jump
		};

		// Direction
		this.direction = {
			prev: null
		};

		// Facing
		this.facing = "right";

		// Moveing by
		this.move = {
			right: false,
			left: false,
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

		// Set default
		this.gotoAndPlay("idle");

		// Add child
		game.stage.addChild(this);
	};

	game.Hero.prototype.ball = function(){
		this.ball = new Shape();

		// Build the ball
		this.ball.graphics
			.beginStroke('#fff')
			.setStrokeStyle(3)
			.beginFill('rgba(255,255,255,0.75)')
			.arc(0, 0, RADIUS, 180, Math.PI)
			.beginFill('rgba(255,255,255,255,0.65)')
			.arc(0, 0, RADIUS, 0, Math.PI)
			.endStroke();

		// Starting location
		this.ball.x = this.x;
		this.ball.y = this.y + RADIUS;

		// Rotation
		this.ball.rotating = {
			speed: 0,
			deg: 0
		};

		game.stage.addChild(this.ball);

	};

	game.Hero.prototype.binds = function(){
		var self = this;
		var stoppingAnimation = function(e){
			if (self.direction.prev === "right"){
				if (self.ball.rotating.speed > 3){
					self.gotoAndPlay("stop");
				} else {
					self.gotoAndPlay("idle");
				}
			} else if (self.direction.prev === "left"){
				if (Math.abs(self.ball.rotating.speed) > 3){
					self.gotoAndPlay("stop_h");
				} else {
					self.gotoAndPlay("idle_h");
				}
			}
		};

		var handleKeyDown = function(e)
		{
				if (self.controls.right.contains(e.which)){
					self.move.right = true;
				} else if (self.controls.left.contains(e.which)){
					self.move.left = true;
				} else if (self.controls.jump.contains(e.which)) {
					self.jump();
				}
		};
		var handleKeyUp = function(e)
		{
			if (self.controls.right.contains(e.which)){
				self.move.right = false;
				self.direction.prev = self.facing = "right";
			} else if (self.controls.left.contains(e.which)){
				self.move.left = false;
				self.direction.prev = self.facing = "left";
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

	game.Hero.prototype.position = function( data ){
		this.x = data.x;
		this.ball.x = data.x;

		this.y = data.y;
		this.ball.y = data.y + RADIUS;
	};

	game.Hero.prototype.startRunning = function( data ){
		// Rotate ball clockwise
		if (this.currentAnimation !== "run"){
			this.gotoAndPlay('run');
		}

		if (this.ball.rotating.speed < 8){
			this.ball.rotating.speed += 0.08;
		}

		this.ball.rotation = this.ball.rotating.deg += this.ball.rotating.speed;
	};

	game.Hero.prototype.jump = function() {
		this.velocity.y = -26;
		// Fix this.
		if (this.facing === "right"){
			this.gotoAndPlay("jump");
		} else if (this.facing === "left"){
			this.gotoAndPlay("jump_h");
		}
		
	};

	game.Hero.prototype.tick = function(){
		// If the user is currently pressing left or right
		if (this.move.right || this.move.left){

			if (this.move.right){

				if (this.move.by.x < 10)
				{
					this.move.by.x += 0.1;
				}

				// Move both the rat and the ball
				this.ball.x = this.x += this.move.by.x;

				// Rotate ball clockwise
				if (this.ball.rotating.speed < 8){
					this.ball.rotating.speed += 0.08;
				}

				this.ball.rotation = this.ball.rotating.deg += this.ball.rotating.speed;

				// If previous direction (or currently clicked)
				// direction is not right, show the animate right
				// OR if the user started, stopped, and started again
				if (this.direction.prev !== "right" || this.currentAnimation === "stop" || this.currentAnimation === "idle"){
					this.gotoAndPlay("run");
				}

				// Set previous direction to right so we don't
				// keep running the animating sprite
				this.direction.prev = "right";

			} else if (this.move.left){

				if (this.move.by.x > -10)
				{
					this.move.by.x -= 0.1;
				}

				// Move both the rat and the ball
				this.ball.x = this.x += this.move.by.x;

				// Rotate ball counter-clockwise

				// Rotate ball clockwise
				if (this.ball.rotating.speed > -8){
					this.ball.rotating.speed -= 0.08;
				}

				this.ball.rotation = this.ball.rotating.deg += this.ball.rotating.speed;

				// If previous direction (or currently clicked)
				// direction is not left, show the animate left
				// OR if the user started, stopped, and started again
				if (this.direction.prev !== "left" || this.currentAnimation === "stop_h" || this.currentAnimation === "idle_h"){
					this.gotoAndPlay("run_h");
				}

				// Set previous direction to right so we don't
				// keep running the animating sprite
				this.direction.prev = "left";

			}

		} else {

			if (this.ball.rotating.speed > 0){

				this.ball.rotating.deg += this.ball.rotating.speed -= 0.08;

				// Rotate the ball accordingly
				this.ball.rotation = this.ball.rotating.deg;

				// Gradually slow down movement
				if (this.move.by.x > 0)
				{
					this.move.by.x -= 0.1;
				}

				// Move both the rat and the ball
				this.x += this.move.by.x;
				this.ball.x += this.move.by.x;

			} else if (this.ball.rotating.speed < 0){

				this.ball.rotating.deg += this.ball.rotating.speed += 0.08;

				// Rotate the ball accordingly
				this.ball.rotation = this.ball.rotating.deg;

				// Gradually slow down movement
				if (this.move.by.x < 0)
				{
					this.move.by.x += 0.1;
				}

				// Move both the rat and the ball
				this.x += this.move.by.x;
				this.ball.x += this.move.by.x;

			}
		}

		var ball;
		var collision = false;

		// Check if colliding
		for (var i = 0; i < game.platforms.length; i++){

			// Create "copy" of relative values to send to collision engine
			ball = {
				x: this.ball.x + this.velocity.x,
				y: this.ball.y + this.velocity.y,
				radius: RADIUS
			};

			// Returns object of details of collision point if true
			collision = SAY.game.util.isColliding( ball, game.platforms[i] );
			
			// Returns false on first collision, but need to
			// take into account 2 collisions, X and Y of all
			// collidable objects.
			if ( collision !== false ){

				// Colliding on angle
				// Fix this later
				if (collision.b !== 0){
					this.position({
						x: this.ball.x,
						y: (game.platforms[i].y - RADIUS*2)
					});
				} else {
					this.position({
						x: this.ball.x,
						y: (game.platforms[i].y - RADIUS*2)
					});
				}

				break;
			}
		}

		if ( collision === false ){
			if (this.move.by.y < 100){
				this.velocity.y += this.move.by.y = 1.1;
			}

			this.y += this.velocity.y;
			this.ball.y += this.velocity.y;

			this.x = this.ball.x += this.velocity.x;
		}

	};

})();