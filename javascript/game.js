var SAY = SAY || {};

(function(){

	var game = SAY.game = {

		init: function() {
			game.createWorld();
			game.createRect();
			game.createCircle();

			game.dragging();
			game.render();
		},

		createWorld: function() {
			game.canvas = document.getElementById('stage');
			game.stage = new Stage(game.canvas);
			game.stage.mouseMoveOutside = true;
		},

		createRect: function() {
			game.rect = game.stage.addChild(new Shape());
			game.rect.graphics.beginFill("red").drawRect(0,0,300,60);
			game.rect.x = Math.floor((Math.random()*500)+100);
			game.rect.y = Math.floor((Math.random()*500)+100);
			game.rect.width = 300;
			game.rect.height = 60;
			game.rect.type = 'rect';
		},

		createCircle: function() {
			game.circle = game.stage.addChild(new Shape());
			game.circle.graphics.beginFill("white").drawCircle(0,0,100);
			game.circle.x = Math.floor((Math.random()*400)+50);
			game.circle.y = Math.floor((Math.random()*400)+50);
			game.circle.radius = 100;
			game.circle.type = 'circle';
		},

		dragging: function() {
			game.circle.onPress = function(evt) {
				var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};

				evt.onMouseMove = function(ev) {
					ev.target.x = ev.stageX+offset.x;
					ev.target.y = ev.stageY+offset.y;
				};
			};
		},

		isColliding: function() {
			var c = game.circle;
			var r = game.rect;

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
			game.values = [topLeft, topRight, bottomLeft, bottomRight];

			// Differences
			var a = 0;
			var b = 0;
			var t2 = 0;
			var t;

			if ( topLeft || topRight || bottomLeft || bottomRight) {
				// Is in the same corner area
				if (topLeft) {
					a = (r.x - c.x);
					b = (r.y - c.y);
				}
				if (topRight) {
					a = (r.x + r.width - c.x);
					b = (r.y - c.y);
				}
				if (bottomLeft) {
					a = (r.x - c.x);
					b = (r.y + r.height - c.y);
				}
				if (bottomRight) {
					a = (r.x + r.width - c.x);
					b = (r.y + r.height - c.y);
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
				t: t
			};
		},

		debug: function() {
			console.log(game.values);
		},

		render: function() {
			Ticker.setFPS(60);
			Ticker.useRAF = true;
			Ticker.addListener(tick);

			function tick(e){
				game.stage.update();
				var point = game.isColliding();
				if (point) {
					console.log(point);
				} else {
					game.circle.y += 3;
				}
			}
		}
	};

	window.onload = function(){
		game.init();
	};

})();