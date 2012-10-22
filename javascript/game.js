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
			game.current = 1;

			// Scale
			game.scale = 0.6;

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

			createHero: function(){
				// Create Hero
				var heroData = {
					controls: {
						left: [ 37, 65 ],
						right: [ 39, 68 ],
						jump: [ 32, 38, 40, 83, 87 ]
					}
				};

				game.hero = new game.Hero(heroData);
			},

			begin: function(){

				this.createHero();

				// Get Current Level
				switch (game.current){

					// Start
					case 0:

						// Background
						var bg = new Shape();
						bg.graphics
							.beginFill('#20abdc')
							.drawRect(0, 0, game.canvas.width, game.canvas.height);
						game.stage.addChild(bg);

						var bg2 = new Shape();
						bg2.graphics
							.beginFill('#38b2df')
							.drawRect(0, game.canvas.height/2+100, game.canvas.width, game.canvas.height);
						game.stage.addChild(bg2);

						// Say Viget
						var a = new Text('S  A  Y    V  I  G  E  T', '6em Futura-Book', '#fff');
						a.x = game.canvas.width/2 - 50;
						a.y = game.canvas.height/3;
						a.textAlign = 'center';
						game.stage.addChild(a);

						var sayitData = {
							bg: '#fab9fa',
							color: '#fff',
							font: '2em Futura-Book',
							text: 'S  A  Y     I  T',
							x: game.canvas.width/2,
							y: game.canvas.height/3 + 130,
							action: function(){
								console.log('clicked SAY IT');
							}
						};
						var sayit = new game.Button(sayitData);

						var startGameData = {
							bg: '#fab9fa',
							color: '#fff',
							font: '2em Futura-Book',
							text: 'S  T  A  R  T     G  A  M  E',
							x: game.canvas.width/2,
							y: game.canvas.height/3 + 230,
							action: function(){
								console.log('clicked START GAME');
							}
						};

						var startGame = new game.Button(startGameData);

						// Start off hero
						game.hero.position({
							x: game.canvas.width/2,
							y: game.canvas.height/2+250
						});

						game.hero.gotoAndPlay('run');

					break;

					// Level 1
					case 1:

						// Start off hero
						game.hero.position({
							x: game.canvas.width/2,
							y: 50
						});

						// Create Platform
						var platformData;
						var platform;
						platformData = {
							name: 'platform 1',
							x: 800,
							y: 550,
							color: 'red',
							stage: game.stage,
							width: 50,
							height: 50
						};
						platform = new game.Platform(platformData);
						console.log(platform.width);
						game.platforms.push(platform);

						platformData = {
							name: 'platform 2',
							x: 200,
							y: 450,
							color: 'blue',
							stage: game.stage,
							width: 150,
							height: 50
						};
						platform = new game.Platform(platformData);
						console.log(platform.width);
						game.platforms.push(platform);

						platformData = {
							name: 'platform 3',
							x: 800,
							y: 250,
							color: 'green',
							stage: game.stage,
							width: 300,
							height: 50
						};
						platform = new game.Platform(platformData);
						console.log(platform.width);
						game.platforms.push(platform);

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