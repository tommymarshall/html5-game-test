var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function(){
			game.world.create();
			game.run.begin();
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
				// Create canvas
			},

			stage: function(){
				// Create stage
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