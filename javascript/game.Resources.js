var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.resources = {
		start_screen: {
			background: {
				id: 'Starting Background',
				layer: 1,
				shape: 'polygon',
				src: './images/bg-big-chunk.png',
				position: {
					x: 0,
					y: 0
				}
			}
		},
		level_one: {
			starting_bg: {
				id: 'Starting Background',
				layer: 1,
				shape: 'polygon',
				src: './images/bg-big-chunk.png',
				position: {
					x: 0,
					y: 0
				}
			},
			large_platform: {
				id: 'Large Platform',
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: './images/main-platform.png',
				position: {
					x: 140,
					y: 700
				}
			},
			large_platform_2: {
				id: 'Large Platform 2',
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: './images/main-platform.png',
				position: {
					x: 3390,
					y: 650
				}
			},
			trampoline: {
				id: 'Trampoline',
				layer: 3,
				shape: 'polygon',
				coords: [
					[[0,0],[150,0],[150,20],[0,20]]
				],
				density: 1,
				friction: 1,
				restitution: 1.5,
				src: './images/trampoline.png',
				position: {
					x: 1800,
					y: 720
				}
			},
			cage: {
				id: 'Cage',
				layer: 10,
				shape: 'polygon',
				coords: [
					[[74,0],[86,0],[86,377],[74,377]],
					[[86,0],[660,0],[660,12],[86,12]],
					[[660,0],[672,0],[672,260],[660,260]],
					[[672,232],[802,304],[796,312],[778,309],[746,292],[672,247]],
					[[56,377],[686,377],[686,415],[56,415]]
				],
				density: 1,
				friction: 1,
				src: './images/cage.png',
				position: {
					x: 130,
					y: 285
				}
			},
			pipe: {
				id: 'Pipe',
				layer: 12,
				shape: 'polygon',
				src: './images/pipe-top.png',
				position: {
					x: 500,
					y: -20
				}
			},
			coin: {
				id: 'Coin 1',
				type: 'coin',
				radius: 50,
				layer: 4,
				shape: 'circle',
				src: './images/coin.png',
				position: {
					x: 1000,
					y: 670
				},
				isSensor: true
			},
			coin_2: {
				id: 'Coin 2',
				type: 'coin',
				radius: 50,
				layer: 4,
				shape: 'circle',
				src: './images/coin.png',
				position: {
					x: 1200,
					y: 670
				},
				isSensor: true
			}
		}
	};

})();
