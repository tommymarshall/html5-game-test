var SAY = SAY || {};

(function($){

	var game = SAY.game;

	game.Body = function( data ){
		this.init( data );

		$.extend(this, p);
	};

	var p = game.Body.prototype;

	p.init = function( data ) {
		p.setData( data );
		p.create();
	};

	p.create = function() {
		if ( p.data.src !== undefined ){
			p.image = new Image();
			p.image.src = './images/' + p.data.src;
			p.addToLayer();
		}

		if ( p.data.shape === 'polygon' && p.data.coords !== undefined) {
			p.createPolgygon();
		}

		if ( p.data.shape === 'circle' && p.data.radius !== undefined ) {
			p.createCircle();
		}
	};

	p.destroy = function() {
		console.log('Removing ' + p.asset);
		game.containers[p.data.layer].removeChild(p.asset);
	};

	p.createCircle = function() {
		// Create bodyDef Shape
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_staticBody;
		bodyDef.position.x = p.data.position.x / game.SCALE;
		bodyDef.position.y = p.data.position.y / game.SCALE;
		bodyDef.userData = p.data.type;

		// Create fixDef
		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = p.data.density || 1;
		fixDef.friction = p.data.friction || 1;
		fixDef.restitution = p.data.restitution || 0;
		fixDef.isSensor = p.data.isSensor || false;
		fixDef.shape = new box2d.b2CircleShape( p.data.radius / game.SCALE );

		game.world.CreateBody(bodyDef).CreateFixture(fixDef);
	};

	p.createPolgygon = function() {
		for (var j=0; j < p.data.coords.length; j++ ) {
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
			bodyDef.position.Set(p.data.position.x / game.SCALE, p.data.position.y / game.SCALE);
			bodyDef.userData = p.data.type;

			// Create fixDef
			var fixDef = new box2d.b2FixtureDef();
			fixDef.density = p.data.density || 1;
			fixDef.friction = p.data.friction || 1;
			fixDef.restitution = p.data.restitution || 0;
			fixDef.isSensor = p.data.isSensor || false;
			fixDef.shape = new box2d.b2PolygonShape();
			fixDef.shape.SetAsArray( vecs, vecs.length );

			game.world.CreateBody(bodyDef).CreateFixture(fixDef);
		}
	};

	p.setData = function( data ){
		p.data = {};

		for(var key in data){
			p.data[key] = data[key];
		}
	};

	p.addToLayer = function(){
		p.asset = new Bitmap(p.image);
		p.asset.x = p.data.position.x || 0;
		p.asset.y = p.data.position.y || 0;

		if ( p.data.reg !== undefined ) {
			p.asset.regX = p.data.reg.x || 0;
			p.asset.regY = p.data.reg.y || 0;
		}
	};

})(jQuery);
