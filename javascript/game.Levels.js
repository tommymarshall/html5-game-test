var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Level = function(image) {
		this.init(image);
	};

	game.Level.prototype = new Bitmap();

	game.Level.prototype.init = function(data){
		var self = game.Levels.one;

		self.preloadAssets(data.assets);
		self.setBackgrounds(data.backgrounds);
		self.setPlatforms(data.platforms);
		self.setCoins(data.coins);
		self.setDoodads(data.doodads);
		self.setHero(data.hero);
		self.setControls(data.controls);
	};

	game.Level.prototype.preloadAssets = function( assets ){
		for (var i = 0; i < assets.length; i++) {
			var asset = assets[i];
			asset.init();
			game.Assets.push(asset);
		}
	};

	game.Level.prototype.setBackgrounds = function( backgrounds ){
		for (var i = 0; i < assets.length; i++) {
			var background = backgrounds[i];
			background.init();
			game.Backgrounds.push(background);
		}
	};

	game.Level.prototype.setPlatforms = function(){
		for (var i = 0; i < platforms.length; i++) {
			var platform = platforms[i];
			platform.init();
			game.Platforms.push(platform);
		}
	};

	game.Level.prototype.setCoins = function( coins ){
		for (var i = 0; i < coins.length; i++) {
			var coin = coins[i];
			coin.init();
			game.Doodads.push(coin);
		}
	};

	game.Level.prototype.setDoodads = function( doodads ){
		for (var i = 0; i < doodads.length; i++) {
			var doodad = doodads[i];
			doodad.init();
			game.Doodads.push(doodad);
		}
	};

	game.Level.prototype.setHero = function( hero ){
		game.Hero.x = hero.x;
		game.Hero.y = hero.y;
	};

	game.Level.prototype.setControls = function(){
		
	};

	game.Level.prototype.start = function(){

	};

	game.Level.prototype.render = function(){
		
	};

})();