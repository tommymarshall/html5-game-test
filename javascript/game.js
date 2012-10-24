var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function(){
			game.vars();
			game.world.create();
			game.begin();
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
				game.canvas.width = window.innerWidth;
				game.canvas.height = window.innerHeight;
			},

			stage: function(){
				game.stage = new Stage(game.canvas);
				game.stage.enableMouseOver();
			}
			
		},

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

		swipeScreen: function(){
			game.stage.addChild(game.hero);
		},

		begin: function(){

			// Get Current Level
			switch (game.current){

				// Start
				case 0:

					// Backgrounds
					game.backgrounds = [
						new game.Background({
							color: '#20abdc',
							offsetY: 0
						}),
						new game.Background({
							color: '#38b2df',
							offsetY: game.canvas.height * 0.47
						})
					];

					game.doodads.push(
						new game.Crater({
							color: '#37a9d4',
							x: game.canvas.width/2,
							y: game.canvas.height/2 + 55,
							width: 300,
							height: 30,
							regX: 150
						}),
						new game.Crater({
							color: '#37a9d4',
							x: game.canvas.width/2,
							y: game.canvas.height/2 + 266,
							width: 80,
							height: 16,
							regX: 40
						}),
						new game.Crater({
							color: '#37a9d4',
							x: game.canvas.width/8,
							y: game.canvas.height/2 + 65,
							width: 70,
							height: 14,
							regX: 55
						}),
						new game.Crater({
							color: '#37a9d4',
							x: game.canvas.width/4,
							y: game.canvas.height/2 + 115,
							width: 40,
							height: 8,
							regX: 20
						}),
						new game.Crater({
							color: '#37a9d4',
							x: game.canvas.width/1.2,
							y: game.canvas.height/2 + 70,
							width: 50,
							height: 10,
							regX: 25
						})
					);

					// Say Viget
					var logo = new Text('S  A  Y    V  I  G  E  T', '3.5em Futura-Book', '#fff');
					logo.x = game.canvas.width/2;
					logo.y = game.canvas.height * 0.47 - 150;
					logo.textAlign = 'center';
					game.stage.addChild(logo);

					new game.Button({
						Text: {
							color: '#fff',
							textAlign: 'center',
							font: '1em Futura-Book',
							text: 'S  A  Y     I  T',
							x: game.canvas.width/2,
							y: game.canvas.height * 0.47 - 32
						},
						Shape: {
							x: game.canvas.width/2,
							y: game.canvas.height * 0.47 - 32,
							width: 200,
							height: 28,
							regX: 100,
							onClick: function(){
								console.log('SAY IT HOMIES!');
								game.swipeScreen();
							},
							onMouseOver: function(e) {
								document.body.style.cursor = 'pointer';
							},
							onMouseOut: function(e) {
								document.body.style.cursor = 'default';
							}
						}
					});

					new game.Button(
						{
							Text: {
								color: '#fff',
								textAlign: 'center',
								font: '1em Futura-Book',
								text: 'S  T  A  R  T     G  A  M  E',
								x: game.canvas.width/2,
								y: game.canvas.height * 0.47 + 20
							},
							Shape: {
								x: game.canvas.width/2,
								y: game.canvas.height * 0.47 + 20,
								width: 200,
								height: 28,
								regX: 100,
								onClick: function(){
									game.current = 1;
									game.stage.clear();
									game.begin();
								},
								onMouseOver: function(e) {
									document.body.style.cursor = 'pointer';
								},
								onMouseOut: function(e) {
									document.body.style.cursor = 'default';
								}
							}
						}
					);

					// Start off hero
					game.createHero();
					game.hero.position({
						x: game.canvas.width/2,
						y: game.canvas.height * 0.47 + 200
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

					// Start off hero
					game.createHero();
					game.hero.position({
						x: game.canvas.width/4,
						y: 50
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

		render: function(){
			var tick = function(e){
				game.stage.update();

				if (game.current === 0){
					game.hero.startRunning();
				} else if (game.current === 1){
					game.hero.tick();

					if (game.hero.x > game.canvas.width*0.3){
						game.stage.x = -game.hero.x + game.canvas.width*0.3;
						game.bg3.x = game.hero.x - game.canvas.width*0.3;
					}
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