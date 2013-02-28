var SAY = SAY || {};

(function(){

	var game = SAY.game;
	var self;
	var properties;

	game.Body = function( data ){
		self = this;
		properties = data;

		if ( properties.source !== undefined ){
			var image    = new Image();
			image.src    = properties.source;
			image.onload = self.addToStage;
		}

		if ( properties.coords !== undefined ){
			for ( j=0; j < properties.coords.length; j++ ) {
				var v = properties.coords[j];
				var vecs = [];
				console.log(v.length);
				for ( i=0; i < v.length; i++ ) {
					var cc = new box2d.b2Vec2();
					cc.Set( v[i][0] / game.SCALE, v[i][1] / game.SCALE );
					vecs[i] = cc;
				}

				// Create bodyDef Shape
				var bodyDef = new box2d.b2BodyDef();
				bodyDef.type = box2d.b2Body.b2_staticBody;
				bodyDef.position.x = properties.position.x / game.SCALE;
				bodyDef.position.y = properties.position.y / game.SCALE;

				// Create fixDef
				var fixDef = new box2d.b2FixtureDef();
				fixDef.density = properties.density;
				fixDef.friction = properties.friction;
				fixDef.shape = new box2d.b2PolygonShape();
				fixDef.shape.SetAsArray( vecs, vecs.length );

				game.world.CreateBody(bodyDef).CreateFixture(fixDef);
			}
		}
	};

	game.Body.prototype.addToStage = function(){
		var asset = new Bitmap(this);
		asset.x = properties.position.x;
		asset.y = properties.position.y;

		switch (properties.layer) {
			case 'foregrounds':
				game.foregrounds.push(asset);
			break;

			case 'backgrounds':
				game.backgrounds.push(asset);
			break;

			case 'platforms':
				game.platforms.push(asset);
			break;

			default:
				game.backgrounds.push(asset);
			break;
		}
	};

})();
