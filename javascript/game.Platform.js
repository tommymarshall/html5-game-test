var SAY = SAY || {};

(function(){

	var game = SAY.game;
	var self;
	var properties;

	game.Platform = function( data ){
		self = this;
		properties = data;

		if ( properties.source !== undefined ){
			var image    = new Image();
			image.src    = properties.source;
			image.onload = self.addToStage;
		}

		var v = properties.coords;
		var vecs = [];

		for ( i=0; i < v.length; i++) {
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

		var v2 = properties.coords2;
		var vecs2 = [];

		for ( i=0; i < v2.length; i++) {
			var cc2 = new box2d.b2Vec2();
			cc2.Set( v2[i][0] / game.SCALE, v2[i][1] / game.SCALE );
			vecs2[i] = cc2;
		}

		// Create fixDef2
		var fixDef2 = new box2d.b2FixtureDef();
		fixDef2.density = properties.density;
		fixDef2.friction = properties.friction;
		fixDef2.shape = new box2d.b2PolygonShape();
		fixDef2.shape.SetAsArray( vecs2, vecs2.length );

		game.world.CreateBody(bodyDef).CreateFixture(fixDef2);
	};

	game.Platform.prototype.addToStage = function(){
		var asset = new Bitmap(this);
		asset.x = properties.position.x;
		asset.y = properties.position.y;
		game.platforms.push(asset);
	};

})();
