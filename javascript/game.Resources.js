var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.resources = {
		level_one: {
			starting_bg: {
				name: 'Starting Background',
				layer: 1,
				source: './images/bg-big-chunk.png',
				position: {
					x: 0,
					y: 0
				}
			},
			large_platform: {
				name: 'Large Platform',
				layer: 2,
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				source: './images/main-platform.png',
				position: {
					x: 140,
					y: 700
				}
			},
			trampoline: {
				name: 'Trampoline',
				layer: 3,
				coords: [
					[[0,0],[150,0],[150,20],[0,20]]
				],
				density: 1,
				friction: 1,
				restitution: 1.5,
				source: './images/trampoline.png',
				position: {
					x: 1800,
					y: 720
				}
			},
			cage: {
				name: 'Cage',
				layer: 10,
				coords: [
					[[74,0],[86,0],[86,377],[74,377]],
					[[86,0],[660,0],[660,12],[86,12]],
					[[660,0],[672,0],[672,260],[660,260]],
					[[672,232],[802,304],[796,312],[778,309],[746,292],[672,247]],
					[[56,377],[686,377],[686,415],[56,415]]
				],
				density: 1,
				friction: 1,
				source: './images/cage.png',
				position: {
					x: 130,
					y: 285
				}
			},
			pipe: {
				name: 'Pipe',
				layer: 12,
				source: './images/pipe-top.png',
				position: {
					x: 500,
					y: -20
				}
			}
		}
	};

})();
