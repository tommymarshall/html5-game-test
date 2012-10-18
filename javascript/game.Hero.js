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
					"regX": 0,
					"regY": 0,
					"count": 48
				}
		});

	game.Hero = function() {
		this.init();
	};

	game.Hero.prototype = new BitmapAnimation( ss );

	game.Hero.prototype.init = function(){
		
		SpriteSheetUtils.addFlippedFrames(ss, true, false, false);

		// Location
		this.x = 300;
		this.y = 20;

		// Size
		this.radius = 142;


		// Build the bubble
		this.bubble();


		game.stage.addChild(this);
	};

	game.Hero.prototype.bubble = function(){

		this.bubble = new Shape();
		this.bubble.graphics
			.beginFill('rgba(255,255,255,0.3)')
			.arc(0, 0, 142, 180, Math.PI)
			.beginFill('rgba(255,255,255,255,0.1)')
			.arc(0, 0, 142, 0, Math.PI);
		this.bubble.x = 442;
		this.bubble.y = 162;

		game.stage.addChild(this.bubble);

	};

	game.Hero.prototype.move = function( direction ){

		var tween = Tween.get(this.bubble, {loop:true})
			.to({x:this.bubble.x, y:this.bubble.y, rotation: 360}, 1000, createjs.Ease.linear);

		this.gotoAndPlay("run");
	};

	game.Hero.prototype.jump = function(){

		this.gotoAndPlay("jump");
	};

})();