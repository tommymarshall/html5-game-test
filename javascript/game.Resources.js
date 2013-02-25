var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.resources = {
		large_platform: {
			coords: [[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]],
			coords2: [[794,64],[3342,64],[3330,150],[712,150],[647,86]],
			// coords: [[
			// 	[[0,0],[730,0],[794,64],[647,86],[15,86],[0,12]]
			// ], [
			// 	[[794,64],[3342,64],[3330,150],[712,150],[647,86]]
			// ]],
			density: 1,
			friction: 1,
			source: './images/main-platform.png',
			position: {
				x: 140,
				y: 700
			}
		},
		starting_bg: {
			source: './images/bg-big-chunk.png',
			position: {
				x: 0,
				y: 0
			}
		}
	};

})();
