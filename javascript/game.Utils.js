var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		util: {

			// Check if object is colliding with other object.
			// 1. Check if object is circle or square
			// 2. Assign as circle
			values: false,

			isColliding: function( ball , platform ) {
				var c = ball || {};
				var r = platform || {};

				// Not in the same overlapping width
				if (
						(c.x + c.radius) <= (r.x) ||
						(c.x - c.radius) >= (r.x + r.width)
					) {
					return false;
				}

				// Not in the same overlapping height
				if (
						(c.y + c.radius) <= (r.y) ||
						(c.y - c.radius) >= (r.y + r.height)
					) {
					return false;
				}

				// Within circle R distance
				var box = {
					x: c.x - c.radius,
					y: c.y - c.radius
				};

				box.width = box.height = c.radius*2;

				// Location relative to colliding platform
				var topLeft =     (box.x + box.width > r.x) && (box.y + box.height > r.y) && (box.x + box.width - r.x < c.radius) && (box.y + box.height - r.y < c.radius);
				var topRight =    (box.x < r.x + r.width)   && (box.y + box.height > r.y) && (r.x + r.width - box.x < c.radius)   && (box.y + box.height - r.y < c.radius);
				var bottomLeft =  (box.x + box.width > r.x) && (box.y < r.y + r.height)   && (box.x + box.width - r.x < c.radius) && (r.y + r.height - box.y < c.radius);
				var bottomRight = (box.x < r.x + r.width)   && (box.y < r.y + r.height)   && (r.x + r.width - box.x < c.radius)   && (r.y + r.height - box.y < c.radius);
				game.util.values = [topLeft, topRight, bottomLeft, bottomRight];

				// Differences
				var a = 0;
				var b = 0;
				var t2 = 0;
				var t = 0;
				var spot = 0;

				if ( topLeft || topRight || bottomLeft || bottomRight) {
					if (topLeft) {
						a = (r.x - c.x);
						b = (r.y - c.y);
						spot = 1;
					}
					if (topRight) {
						a = (r.x + r.width - c.x);
						b = (r.y - c.y);
						spot = 2;
					}
					if (bottomLeft) {
						a = (r.x - c.x);
						b = (r.y + r.height - c.y);
						spot = 3;
					}
					if (bottomRight) {
						a = (r.x + r.width - c.x);
						b = (r.y + r.height - c.y);
						spot = 4;
					}

					t2 = (a*a) + (b*b);
					t = Math.sqrt(t2);

					if (t >= c.radius) {
						return false;
					}
				}

				return {
					x: (c.x + a),
					y: (c.y + b),
					a: Math.abs(a),
					b: Math.abs(b),
					t: t,
					spot: spot
				};
			}

		}
	};

})();