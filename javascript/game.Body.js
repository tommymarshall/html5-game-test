var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Body = function( data ){
		this.initialize( data );
	};

	var p = game.Body.prototype;

	//p.Body_initialize = p.initialize;

	p.initialize = function( data ) {
		//p.Body_initialize();
		p.setData( data );
		p.build();
	};

	p.clone = function( data ) {
		return new game.Body( data );
	};

	p.build = function() {
		if ( p.data.source !== undefined ){
			var image    = new Image();
			image.src    = p.data.source;
			image.onload = p.addToStage;
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
				fixDef.density = p.data.density;
				fixDef.friction = p.data.friction;
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

		console.log(JSON.stringify(p.data, null, 4));
	};

	p.addToStage = function(){
		var asset = new Bitmap(this);
		asset.x = p.data.position.x;
		asset.y = p.data.position.y;

		switch (p.data.layer) {
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
