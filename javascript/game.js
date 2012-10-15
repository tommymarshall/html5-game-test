var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function(){
			game.world.create();
			game.level.begin();
		},

		get: {
			currentLevel: function(){ return game.currentLevel; },
			levels:       function(){ return game.levels; },
			level:        function(){ return game.level; },
			platforms:    function(){ return game.platforms; }
		},

		set: {
			currentLevel: function( value ){ game.currentLevel = value; },
			levels:       function( value ){ game.levels       = value; },
			level:        function( value ){ game.level        = value; },
			platforms:    function( value ){ game.platforms    = value; }
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
				
			}
		},

		level: {
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