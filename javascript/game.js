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
			
			// Array of Objects
			game.texts = [];
			
			// Array of Objects
			game.tickers = [];
			
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
				game.canvas.width = 1200;
				game.canvas.height = 800;
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
				},
				x: 0,
				y: 0,
				direction: {
					prev: null
				},
				facing: "right",
				move: {
					right: false,
					left: false,
					by: {
						x: 0,
						y: 0
					}
				},
				velocity: {
					x: 0,
					y: 1
				}
			};

			game.hero = new game.Hero(heroData);
			game.stage.addChild(game.hero);
		},

		swipeScreen: function(){

			var onComplete = function(){
				game.current = 1;
				game.stage.clear();
				game.begin();
			};

			var s5 = new Shape();
			s5.graphics
				.beginFill('#1a93bc')
				.drawRect(
					0,
					0,
					game.canvas.width,
					game.canvas.height
				);
			game.stage.addChild(s5);

			var s1 = new Shape();
			s1.graphics
				.beginFill('#43b8e0')
				.drawRect(
					0,
					0,
					game.canvas.width,
					game.canvas.height*2
				);
			s1.x = game.canvas.width;

			game.stage.addChild(s1);
			
			var s2 = new Shape();
			s2.graphics
				.beginFill('#30b1dc')
				.drawRect(
					0,
					0,
					game.canvas.width,
					game.canvas.height*2
				);
			s2.x = game.canvas.width;

			game.stage.addChild(s2);
			
			var s3 = new Shape();
			s3.graphics
				.beginFill('#21a3d1')
				.drawRect(
					0,
					0,
					game.canvas.width,
					game.canvas.height*2
				);
			s3.x = game.canvas.width;

			game.stage.addChild(s3);
			
			var s4 = new Shape();
			s4.graphics
				.beginFill('#1a93bc')
				.drawRect(
					0,
					0,
					game.canvas.width,
					game.canvas.height*2
				);
			s4.x = game.canvas.width;

			game.stage.addChild(s4);

			Tween.get(s1)
				.to({
					x: 0,
					skewX: 45
				},400, Ease.cubicOut)
				.wait(700)
				.to({alpha:0,visible:false},1000);

			Tween.get(s2)
				.wait(100)
				.to({
					x: game.canvas.width/3,
					skewX: 45
				},400, Ease.cubicOut)
				.wait(600)
				.to({alpha:0,visible:false},1000);

			Tween.get(s3)
				.wait(200)
				.to({
					x: game.canvas.width/1.25,
					skewX: 45
				},400, Ease.cubicOut)
				.wait(500)
				.to({alpha:0,visible:false},1000);

			Tween.get(s4)
				.wait(300)
				.to({
					x: game.canvas.width/0.75,
					skewX: 45
				},400, Ease.cubicOut)
				.wait(400)
				.to({alpha:0,visible:false},1000)
				.call(onComplete);

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


					// Build rectangle
					var thing = new Shape();
					thing.graphics
						.beginFill('#21a3d1')
						.moveTo(0, game.canvas.height)
						.lineTo(0, game.canvas.height*0.95)
						.lineTo(game.canvas.width*0.2, game.canvas.height*0.9)
						.lineTo(game.canvas.width*0.35, game.canvas.height)
						.lineTo(game.canvas.width*0.6, game.canvas.height)
						.lineTo(game.canvas.width*0.7, game.canvas.height*0.93)
						.lineTo(game.canvas.width*0.8, game.canvas.height*0.94)
						.lineTo(game.canvas.width*0.92, game.canvas.height*0.83)
						.lineTo(game.canvas.width, game.canvas.height*0.87)
						.lineTo(game.canvas.width, game.canvas.height);
					game.stage.addChild(thing);

					game.doodads.push(
						new game.Bird({
							color: '#37a9d4',
							x: game.canvas.width/2,
							y: game.canvas.height/2 + 55,
							width: 300,
							height: 30,
							regX: 150
						}),
						new game.Bird({
							color: '#37a9d4',
							x: game.canvas.width/2,
							y: game.canvas.height/2 + 264,
							width: 80,
							height: 16,
							regX: 40
						}),
						new game.Bird({
							color: '#37a9d4',
							x: game.canvas.width/8,
							y: game.canvas.height/2 + 65,
							width: 70,
							height: 14,
							regX: 55
						}),
						new game.Bird({
							color: '#37a9d4',
							x: game.canvas.width/4,
							y: game.canvas.height/2 + 115,
							width: 40,
							height: 8,
							regX: 20
						}),
						new game.Bird({
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

					game.texts = [
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
								},
								onMouseOver: function(e) {
									document.body.style.cursor = 'pointer';
								},
								onMouseOut: function(e) {
									document.body.style.cursor = 'default';
								}
							}
						}),
						new game.Button({
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
									game.swipeScreen();
								},
								onMouseOver: function(e) {
									document.body.style.cursor = 'pointer';
								},
								onMouseOut: function(e) {
									document.body.style.cursor = 'default';
								}
							}
						})
					];

					icon        = new Image();
					icon.src    = './images/orange-sayit-icon2.gif';
					icon.onload = onIconLoaded;

					function onIconLoaded()
					{
						console.log(icon);
						player      = new Bitmap(icon);
						player.x    = game.texts[0].Text.x - 90;
						player.y    = game.texts[0].Text.y;

						game.stage.addChild(player);
					}

					icon2        = new Image();
					icon2.src    = './images/orange-game-icon2.gif';
					icon2.onload = onIconLoaded2;

					function onIconLoaded2()
					{
						console.log(icon2);
						player      = new Bitmap(icon2);
						player.x    = game.texts[1].Text.x - 150;
						player.y    = game.texts[1].Text.y;

						game.stage.addChild(player);
					}

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
					game.backgrounds = [
						new game.Background({
							color: '#20abdc',
							offsetY: 0
						})
					];

					// Create Platform
					game.platforms = [
						new game.Platform({
							name: 'platform 1',
							x: 200,
							y: 450,
							color: '#fff',
							width: 800,
							height: 10
						})
					];

					// Start off hero
					game.createHero();
					game.hero.position({
						x: game.canvas.width/4,
						y: 50
					});


					var s5 = new Shape();
					s5.graphics
						.beginFill('#1a93bc')
						.drawRect(
							0,
							0,
							game.canvas.width,
							game.canvas.height
						);
					game.stage.addChild(s5);

					Tween.get(s5)
						.wait(500)
						.to({alpha:0,visible:false},1000);

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
			var i =0;
			var tick = function(e){
				game.stage.update();

				// Cycle through Ticks
				i = game.tickers.length;

				while (i--) {
					game.tickers[i].tick();
				}

				switch (game.current){

					case 0:

						game.hero.run();

					break;

					case 1:

						if (game.hero.x > game.canvas.width * 0.3){
							game.stage.x = -game.hero.x + game.canvas.width * 0.3;
							game.backgrounds[0].x = game.hero.x - game.canvas.width * 0.3;
						}

						if (game.hero.y > game.canvas.height * 0.6){
							game.stage.y = -game.hero.y + game.canvas.height * 0.6;
							game.backgrounds[0].y = game.hero.y - game.canvas.height * 0.6;
						}

					break;

					default:
					break;
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