var SAY = SAY || {};

(function(){

	var game = SAY.game;

	var ss = new SpriteSheet({
		"animations":
		{
			"idle": [0, 27, "idle", 3],
			"run": [28, 47, "run", 2],
			"jump": [34, 38, "jump_freeze", 3],
			"jump_freeze": [38]
		},
			"images": ["./images/rat_sprite.png"],
			"frames":
				{
					"height": 284,
					"width": 285,
					"regX": 142.5,
					"regY": 0,
					"count": 48
				}
		});

	game.Hero = function( data ) {
		this.init( data );
	};

	game.Hero.prototype = new BitmapAnimation( ss );

	game.Hero.prototype.init = function( data ){
		data = data || {};

		// Flip frames
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		// Location
		this.x = data.x || 0;
		this.y = data.y || 0;

		// Size
		this.radius = data.radius || 0;

		// Speed moving
		this.speed = 360;

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
		this.bubble.x = this.x;
		this.bubble.y = this.y+142.5;

		game.stage.addChild(this.bubble);

	};

	game.Hero.prototype.move = function( direction ){

		switch(direction || "left"){
			case "left":
				Tween.get(this.bubble,
					{
						loop: true
					}, false)
					.to({
						x: this.bubble.x,
						y: this.bubble.y,
						rotation: -this.speed
					}, 1000);
				this.gotoAndPlay("run_h");
			break;

			case "right":
				Tween.get(this.bubble,
					{
						loop: true
					}, false)
					.to({
						x: this.bubble.x,
						y: this.bubble.y,
						rotation: this.speed
					}, 1000);

				this.gotoAndPlay("run");
			break;

			default:
				// Nothin'
			break;
		}

	};

	game.Hero.prototype.jump = function(){

		this.gotoAndPlay("jump");

	};

	game.Hero.prototype.clean = function(){

		Tween.removeTweens(this.bubble);

	};


	game.Hero.prototype.tick = function(){

		for (var i = 0; i < 20; i++){
			if (game.util.isColliding(this, game.collideables[i])){

			}
		}

	};

})();