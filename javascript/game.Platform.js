var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Platform = function( data ){
		// Create fixDef
		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = data.density || 1;
		fixDef.friction = data.friction || 1;

		// Create bodyDef Shape
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_staticBody;
		bodyDef.position.x = data.x / game.SCALE;
		bodyDef.position.y = data.y / game.SCALE;

		v = data.coords;
		vecs = [];
		for(i=0;i<v.length;i++){
			cc = new box2d.b2Vec2();
			cc.Set(v[i][0],v[i][1]);
			vecs[i] = cc;
		}

		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsArray( vecs, vecs.length );
		game.world.CreateBody(bodyDef).CreateFixture(fixDef);

		game.stage.addChild(this.view);
		game.platforms.push(this);
	};

	var tick = function(e) {
	};

})();
