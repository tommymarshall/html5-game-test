var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function(){
			game.world.create();
			game.vars();
			game.run.begin();
		},

		vars: function(){
			// Array of Objects
			game.assets = [];

			// Array of Objects
			game.backgrounds = [];
			
			// Array of Objects
			game.coins = [];
			
			// Array of Objects
			game.doodads = [];
			
			// Single Object
			game.hero = new SAY.Hero();
			
			// Single Object
			game.level = Object;

			// Array of Objects
			game.platforms = [];

			// Integer of Level
			game.current = 0;

			// Integer of Score
			game.score = 0;

			// State of Play
			//	0:  start
			//	1:  play
			//	2:  pause
			//	3:  end
			game.state = 0;

		},

		world: {
			create: function(){
				var self = game.world;

				self.canvas();
				self.stage();
			},

			canvas: function(){
				var self = game.world;

				self.canvas = document.getElementById('stage');
				self.canvas.width = window.innerWidth;
				self.canvas.height = window.innerHeight;
			},

			stage: function(){
				var self = game.world;

				self.stage = new Stage(self.canvas);
			}
		},

		run: {
			begin: function(){

				// Get Current Level
				switch (game.current){

					// Start
					case 0:
						game.level = new game.Level({
							assets: ['imgpath', 'imgpath2'],
							backgrounds: ['background_1'],
							platforms: []
						});
					break;

					// Level 1
					case 1:
						game.level = new game.Level({
							assets: ['imgpath', 'imgpath2'],
							backgrounds: [background_1],
							platforms: []
						});
					break;
					
					// Level 2
					case 2:
						game.level = new game.Level({
							assets: ['imgpath', 'imgpath2'],
							backgrounds: [background_1],
							platforms: []
						});
					break;

					default:

					break;

				}


			},

			start: function(){
				// Start
				game.Level.start();
			}
		},

		render: function(){
			var tick = function(e){
				game.level.render();
				game.stage.update();
			};

			Ticker.setFPS(1);
			Ticker.useRAF = true;
			Ticker.addListener(tick);
		}

	};

	window.onload = function(){
		game.init();
	};

})();