var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.scenes = {
		// Start
		start: { },

		// Level One
		level_one: {
			starting_platform: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,28],[3770,28],[3770,105],[0,105]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/platform-start.png',
				position: {
					x: 140,
					y: 670
				}
			},
			platform_2: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,28],[130,28],[130,40],[0,40]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/platform-thin-short.png',
				position: {
					x: 1500,
					y: 428
				}
			},
			cage_back: {
				layer: 3,
				shape: 'polygon',
				coords: [
					[[74,0],[86,0],[86,377],[74,377]],
					[[86,0],[660,0],[660,12],[86,12]],
					[[660,0],[672,0],[672,260],[660,260]],
					[[56,377],[686,377],[686,415],[56,415]]
				],
				density: 1,
				friction: 1,
				src: 'special/cage-back.png',
				position: {
					x: 130,
					y: 282
				}
			},
			cage_front: {
				layer: 10,
				shape: 'polygon',
				coords: [
					[[74,0],[86,0],[86,377],[74,377]],
					[[86,0],[660,0],[660,12],[86,12]],
					[[660,0],[672,0],[672,260],[660,260]],
					[[56,377],[686,377],[686,415],[56,415]]
				],
				density: 1,
				friction: 1,
				src: 'special/cage-front.png',
				position: {
					x: 130,
					y: 282
				}
			},
			pipe: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-top-medium.png',
				position: {
					x: 700,
					y: -280
				}
			},
			pipe_2: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-bottom-large.png',
				position: {
					x: -600,
					y: 790
				}
			},
			pipe_3: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-front.png',
				position: {
					x: 2800,
					y: -200
				}
			},
			light_1: {
				radius: 28,
				layer: 6,
				src: 'special/light-on.png',
				position: {
					x: 2000,
					y: -100
				}
			},
			coin: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 1040,
					y: 630
				},
				reg: {
					x: 28,
					y: 28
				},
				isSensor: true
			}
		},

		// End
		end: { }

	};

})();
