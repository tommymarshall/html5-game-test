var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Body = function( data ){
		this.initialize( data );
	};

	var p = game.Body.prototype;

	p.initialize = function( data ) {
		p.setData( data );
		p.build();
	};

	p.build = function() {
		if ( p.data.source !== undefined ){
			p.image = new Image();
			p.image.src = p.data.source;
			p.addToLayer();
		}

		if ( p.data.coords !== undefined ){
			for ( j=0; j < p.data.coords.length; j++ ) {
				var v = p.data.coords[j];
				var vecs = [];

				for ( i=0; i < v.length; i++ ) {
					var cc = new box2d.b2Vec2();
					cc.Set( v[i][0] / game.SCALE, v[i][1] / game.SCALE );
					vecs[i] = cc;
				}

				// Create bodyDef Shape
				var bodyDef = new box2d.b2BodyDef();
				bodyDef.type = box2d.b2Body.b2_staticBody;
				bodyDef.position.x = p.data.position.x / game.SCALE;
				bodyDef.position.y = p.data.position.y / game.SCALE;

				// Create fixDef
				var fixDef = new box2d.b2FixtureDef();
				fixDef.density = p.data.density || 1;
				fixDef.friction = p.data.friction || 1;
				fixDef.restitution = p.data.restitution || 0;
				fixDef.shape = new box2d.b2PolygonShape();
				fixDef.shape.SetAsArray( vecs, vecs.length );

				game.world.CreateBody(bodyDef).CreateFixture(fixDef);
			}
		}
	};

	p.setData = function( data ){
		p.data = {};

		for(var key in data){
			p.data[key] = data[key];
		}
	};

	p.addToLayer = function(){
		var asset = new Bitmap(p.image);
		asset.x = p.data.position.x || 0;
		asset.y = p.data.position.y || 0;

		if (game.bodies[p.data.layer] === undefined) {
			game.bodies[p.data.layer] = [];
		}
		game.bodies[p.data.layer].push(asset);
	};

})();
