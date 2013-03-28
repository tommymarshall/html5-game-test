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
			platform_3: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,28],[386,28],[355,105],[0,105]],
					[[386,28],[832,472],[802,550],[355,105]],
					[[832,472],[1702,472],[1702,550],[802,550]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/platform-complex-1.png',
				position: {
					x: 3850,
					y: 480
				}
			},
			platform_4: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,28],[343,28],[343,105],[0,105]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/platform-medium-normal.png',
				position: {
					x: 5825,
					y: 640
				}
			},
			platform_5: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,1415],[1900,1415],[1900,1494],[0,1494]],
					[[1007,1184],[1348,1184],[1348,1262],[1007,1262]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/platform-complex-3.png',
				position: {
					x: 5300,
					y: -1740
				}
			},
			platform_6: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,850],[420,850],[420,925],[0,925]],
					[[0,925],[78,925],[78,2419],[0,2419]],
					[[78,1690],[206,1690],[206,1705],[78,1705]],
					[[78,2125],[206,2125],[206,2140],[78,2140]],
					[[78,2342],[638,2342],[628,2419],[78,2419]],
					[[638,2342],[981,1998],[1012,2042],[670,2419]],
					[[981,1998],[1260,1998],[1260,2073],[1013,2073]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/platform-complex-2.png',
				position: {
					x: 4800,
					y: -1800
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
					y: -680
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
					y: -400
				}
			},
			pipe_4: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-front.png',
				position: {
					x: 7400,
					y: -1650
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
