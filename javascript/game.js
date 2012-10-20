var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function(){
			game.vars();
			game.world.create();
			game.run.begin();
			game.render();
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
			game.hero = Object;
			
			// Single Object
			game.level = Object;

			// Array of Objects
			game.platforms = [];

			// Integer of Level
			game.current = 0;

			// Scale
			game.scale = 0.4;

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
				game.canvas = document.getElementById('stage');
				game.canvas.width = window.innerWidth;
				game.canvas.height = window.innerHeight;
			},

			stage: function(){
				game.stage = new Stage(game.canvas);
			}
		},

		run: {
			begin: function(){

				// Get Current Level
				switch (game.current){

					// Start
					case 0:

						// Create Hero
						var heroData = {
							x: 500,
							y: 200,
							controls: {
								left: [ 37, 65 ],
								right: [ 39, 68 ],
								jump: [ 32, 38, 40, 83, 87 ]
							}
						};

						game.hero = new game.Hero(heroData);

						// Create Platform
						var platformData = {
							x: 300,
							y: 550,
							width: 800,
							height: 50
						};
						var platform = new game.Platform(platformData);
						game.platforms.push(platform);
						platformData = {
							x: 200,
							y: 450,
							width: 400,
							height: 30
						};
						platform = new game.Platform(platformData);
						game.platforms.push(platform);
						platformData = {
							x: 100,
							y: 250,
							width: 400,
							height: 10
						};
						platform = new game.Platform(platformData);
						game.platforms.push(platform);
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
				game.stage.update();
				game.hero.tick();
			};

			Ticker.setFPS(60);
			Ticker.useRAF = true;
			Ticker.addListener(tick);
		}

	};

	window.onload = function(){
		game.init();
	};

})();