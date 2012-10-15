var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function(){
			game.world.create();
			game.run.begin();
		},

		vars: function(){
			// Array of Objects
			game.Assets = [];
			
			// Array of Objects
			game.Coins = [];
			
			// Array of Objects
			game.Doodads = [];
			
			// Single Object
			game.Hero = Object;
			
			// Single Object
			game.Level = Object;

			// Array of Objects
			game.Platforms = [];

			// Integer of Level
			game.Current = 0;

			// Integer of Score
			game.Score = 0;

			// State of Play
			//	0:  start
			//	1:  play
			//	2:  pause
			//	3:  end
			game.State = 0;

		},

		get: {
			allLevels:    function(){ return game.levels; },
			currentLevel: function(){ return game.current; },
			level:        function(){ return game.level; },
			platforms:    function(){ return game.platforms; }
		},

		set: {
			allLevels:    function( val ){ game.levels    = val; },
			currentLevel: function( val ){ game.current   = val; },
			level:        function( val ){ game.level     = val; },
			platforms:    function( val ){ game.platforms = val; }
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
				self.canvas.width = self.window.width;
				self.canvas.height = self.window.height;
			},

			stage: function(){
				var self = game.world;

				self.stage = new Stage(self.canvas);
			}
		},

		run: {
			begin: function(){
				// Get Current Level
				// Preload Assets
				// Set Background
				// Set Platforms
				// Set Coins
				// Set Doodads
				// Set Hero
				// Set Controls
			},

			start: function(){
				// Start
				game.current.start();
			}
		},

		render: function(){
			var tick = function(e){
				game.level.tick();
				game.stage.update();
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