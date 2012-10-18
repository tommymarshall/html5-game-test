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
			left: data.controls.left,
			jump: data.controls.jump
		};

		// Direction
		this.direction = {
			prev: false
		};

		this.move = {
			right: false,
			left: false
		};

		// Keydown
		this.keydown = false;

		// Moveing by
		this.moveby = {
			x: 20,
			y: 50
		};

		// Build the bubble
		this.bubble();
		this.tween = Object;

		// Set default
		this.gotoAndPlay("idle");

		// Add child
		game.stage.addChild(this);
	};

	game.Hero.prototype.bubble = function(){

		this.bubble = new Shape();
		this.bubble.graphics
			.beginStroke("#fff")
			.setStrokeStyle(8)
			.beginFill('rgba(255,255,255,0.75)')
			.arc(0, 0, 142.5, 180, Math.PI)
			.beginFill('rgba(255,255,255,255,0.65)')
			.arc(0, 0, 142.5, 0, Math.PI)
			.endStroke();

		// Starting location
		this.bubble.x = this.x;
		this.bubble.y = this.y + (142.5 * game.scale);

		// Scaling
		this.bubble.scaleX = this.bubble.scaleY = game.scale;

		game.stage.addChild(this.bubble);

	};

	game.Hero.prototype.move = function( direction ){

		switch(direction || "left"){
			case "left":
				this.bubble.rotation = -45;
				this.gotoAndPlay("run_h");
			break;

			case "right":
				this.bubble.rotation = 45;
				this.gotoAndPlay("run");
			break;

			default:
				// Nothin'
			break;
		}

	};

	game.Hero.prototype.binds = function(){
		var self = this;
		var handleKeyDown = function(e)
		{
			if ( !self.keydown ){
				if (self.controls.right.contains(e.which)){
					self.move.right = true;
				} else if (self.controls.left.contains(e.which)){
					self.move.left = true;
				}
			}
		};
		var handleKeyUp = function(e)
		{
			self.keydown = false;
			if (self.controls.right.contains(e.which)){
				self.direction.prev = 'right';
			} else if (self.controls.left.contains(e.which)){
				self.direction.prev = 'left';
			}

			switch (self.direction.prev){
				case "left":
					self.gotoAndPlay("stop_h");
				break;

				case "right":
					self.gotoAndPlay("stop");
				break;
				
				default:
					// Nothing'
				break;
			}

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

		for (var i = 0; i < game.platforms.length; i++){
			if (game.util.isColliding(this, game.platforms[i])){
				console.log(game.platforms[i]);
			}
		}

	};

})();