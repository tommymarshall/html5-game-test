var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.scenes = {
		// Start
		start: { },

		// Level One
		level_one: {
			starting_bg: {
				layer: 1,
				shape: 'polygon',
				src: 'backgrounds/level-one_start.png',
				position: {
					x: 0,
					y: 0
				}
			},
			large_platform: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/large.png',
				position: {
					x: 140,
					y: 700
				}
			},
			large_platform_2: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/large.png',
				position: {
					x: 2920,
					y: 520
				}
			},

			// Extra examples
			large_platform_3: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/large.png',
				position: {
					x: 6840,
					y: 590
				}
			},
			large_platform_4: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/large.png',
				position: {
					x: 10540,
					y: 610
				}
			},
			large_platform_5: {
				layer: 2,
				shape: 'polygon',
				coords: [
					[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
					[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
				],
				density: 1,
				friction: 1,
				src: 'platforms/large.png',
				position: {
					x: 13540,
					y: 890
				}
			},

			trampoline: {
				layer: 3,
				shape: 'polygon',
				coords: [
					[[0,0],[150,0],[150,20],[0,20]]
				],
				density: 1,
				friction: 1,
				restitution: 1.5,
				src: 'special/trampoline.png',
				position: {
					x: 1800,
					y: 720
				}
			},
			cage: {
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
				src: 'special/cage.png',
				position: {
					x: 130,
					y: 285
				}
			},
			pipe: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-large-top.png',
				position: {
					x: 500,
					y: -20
				}
			},
			pipe_2: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-large-top.png',
				position: {
					x: 3000,
					y: 0
				}
			},
			pipe_3: {
				layer: 12,
				shape: 'polygon',
				src: 'foregrounds/pipe-large-top.png',
				position: {
					x: 5300,
					y: 0
				}
			},
			coin: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 1000,
					y: 670
				},
				reg: {
					x: 28,
					y: 28
				},
				isSensor: true
			},
			coin_2: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 1200,
					y: 670
				},
				reg: {
					x: 28,
					y: 28
				},
				isSensor: true
			},
			coin_3: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 1400,
					y: 670
				},
				reg: {
					x: 28,
					y: 28
				},
				isSensor: true
			},
			coin_4: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 2600,
					y: 670
				},
				reg: {
					x: 28,
					y: 28
				},
				isSensor: true
			},
			coin_5: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 2800,
					y: 670
				},
				reg: {
					x: 28,
					y: 28
				},
				isSensor: true
			},
			coin_6: {
				type: 'coin',
				radius: 28,
				layer: 4,
				shape: 'circle',
				src: 'special/coin.png',
				position: {
					x: 3000,
					y: 670
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
