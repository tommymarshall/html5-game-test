var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ){
		self = this;

		if ( data.src !== undefined ){
			var image    = new Image();
			image.src    = data.src;
			image.onload = this.addPlatformToStage;
		}

		var v = data.coords;
		var vecs = [];

		for ( i=0; i < v.length; i++) {
			var cc = new box2d.b2Vec2();
			cc.Set( v[i][0] / game.SCALE, v[i][1] / game.SCALE );
			vecs[i] = cc;
		}

		// Create bodyDef Shape
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_staticBody;
		bodyDef.position.x = data.x / game.SCALE;
		bodyDef.position.y = data.y / game.SCALE;

		// Create fixDef
		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = data.density;
		fixDef.friction = data.friction;
		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsArray( vecs, vecs.length );

		game.world.CreateBody(bodyDef).CreateFixture(fixDef);

		// var v = data.coords2;
		// var vecs = [];

		// for ( i=0; i < v.length; i++) {
		// 	var cc = new box2d.b2Vec2();
		// 	cc.Set( v[i][0] / game.SCALE, v[i][1] / game.SCALE );
		// 	vecs[i] = cc;
		// }

		// // Create fixDef2
		// var fixDef2 = new box2d.b2FixtureDef();
		// fixDef2.density = data.density;
		// fixDef2.friction = data.friction;
		// fixDef2.shape = new box2d.b2PolygonShape();
		// fixDef2.shape.SetAsArray( vecs, vecs.length );

		// game.world.CreateBody(bodyDef).CreateFixture(fixDef2);

	};

	game.Platform.prototype.addPlatformToStage = function() {
		game.stage.addChild(this.view);
		game.platforms.push(this);
	};

})();
