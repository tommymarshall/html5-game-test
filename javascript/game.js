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
				game.canvas.width = window.innerWidth - 30;
				game.canvas.height = window.innerHeight - 30;
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
				game.stage.addChild(game.hero);
			},

			begin: function(){

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
						var a = new Text('S  A  Y    V  I  G  E  T', '5em Futura-Book', '#fff');
						a.x = game.canvas.width/2 - 50;
						a.y = game.canvas.height/3;
						a.textAlign = 'center';
						game.stage.addChild(a);

						var sayIt = new game.Button({
							color: '#fff',
							textAlign: 'center',
							font: '1em Futura-Book',
							text: 'S  A  Y     I  T',
							x: game.canvas.width/2,
							y: game.canvas.height/3 + 130,
							onClick: function(){
								console.log('clicked SAY IT');
							}
						});

						var startGame = new game.Button({
							color: '#fff',
							textAlign: 'center',
							font: '1em Futura-Book',
							text: 'S  T  A  R  T     G  A  M  E',
							x: game.canvas.width/2,
							y: game.canvas.height/3 + 180,
							onClick: function(){
								console.log('clicked START GAME');
							}
						});

						// Start off hero
						this.createHero();
						game.hero.position({
							x: game.canvas.width/2,
							y: game.canvas.height/2+250
						});

					break;

					// Level 1
					case 1:

						// Background
						game.bg3 = new Shape();
						game.bg3.graphics
							.beginFill('#20abdc')
							.drawRect(0, 0, game.canvas.width, game.canvas.height);
						game.stage.addChild(game.bg3);

						// Start off hero
						this.createHero();
						game.hero.position({
							x: game.canvas.width/4,
							y: 50
						});

						// Create Platform
						game.platforms = [
							new game.Platform({
								name: 'platform 1',
								x: 200,
								y: 650,
								color: '#fff',
								stage: game.stage,
								width: 800,
								height: 10
							}),
							new game.Platform({
								name: 'platform 2',
								x: 600,
								y: 450,
								color: '#fff',
								stage: game.stage,
								width: 300,
								height: 10
							}),
							new game.Platform({
								name: 'platform 3',
								x: 1000,
								y: 850,
								color: '#fff',
								stage: game.stage,
								width: 200,
								height: 10
							})
						];
						
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
				game.Level.start();
			}
		},

		render: function(){
			var tick = function(e){
				game.stage.update();

				if (game.current === 0){
					game.hero.startRunning();
				} else if (game.current === 1){
					game.hero.tick();
					//game.platforms[0].x += 1;
				}

				if (game.hero.x > game.canvas.width*0.3){
					game.stage.x = -game.hero.x + game.canvas.width*0.3;
					game.bg3.x = game.hero.x - game.canvas.width*0.3;
				}
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