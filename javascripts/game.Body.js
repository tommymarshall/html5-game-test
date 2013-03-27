var SAY = SAY || {};

(function($){

	var game = SAY.game;

	var p = game.Body = Class.extend({

		init: function( data ) {
			this.setData( data );
			this.create();
		},

		setData: function( data ){
			this.data = {};

			for(var key in data){
				this.data[key] = data[key];
			}
		},

		create: function() {
			if ( this.data.src !== undefined ){
				this.image = new Image();
				this.image.src = './images/' + this.data.src;
				this.addToLayer();
			}

			if ( this.data.shape === 'polygon' && this.data.coords !== undefined) {
				this.createPolgygon();
			}

			if ( this.data.shape === 'circle' && this.data.radius !== undefined ) {
				this.createCircle();
			}
		},

		destroy: function() {
			log(this);
			game.containers[this.data.layer].removeChild(this.asset);
		},

		createCircle: function() {
			// Create bodyDef Shape
			var bodyDef = new box2d.b2BodyDef();
			bodyDef.type = box2d.b2Body.b2_staticBody;
			bodyDef.position.x = this.data.position.x / game.SCALE;
			bodyDef.position.y = this.data.position.y / game.SCALE;
			bodyDef.userData = {};
			bodyDef.userData.type = this.data.type;
			bodyDef.userData.destroy = this.destroy;

			// Create fixDef
			var fixDef = new box2d.b2FixtureDef();
			fixDef.density = this.data.density || 1;
			fixDef.friction = this.data.friction || 1;
			fixDef.restitution = this.data.restitution || 0;
			fixDef.isSensor = this.data.isSensor || false;
			fixDef.shape = new box2d.b2CircleShape( this.data.radius / game.SCALE );

			game.world.CreateBody(bodyDef).CreateFixture(fixDef);
		},

		createPolgygon: function() {
			for (var j=0; j < this.data.coords.length; j++ ) {
				var v = this.data.coords[j];
				var vecs = [];

				for ( i=0; i < v.length; i++ ) {
					var cc = new box2d.b2Vec2();
					cc.Set( v[i][0] / game.SCALE, v[i][1] / game.SCALE );
					vecs[i] = cc;
				}

				// Create bodyDef Shape
				var bodyDef = new box2d.b2BodyDef();
				bodyDef.type = box2d.b2Body.b2_staticBody;
				bodyDef.position.Set(this.data.position.x / game.SCALE, this.data.position.y / game.SCALE);
				bodyDef.userData = {};
				bodyDef.userData.type = this.data.type;
				bodyDef.userData.destroy = this.destroy;

				// Create fixDef
				var fixDef = new box2d.b2FixtureDef();
				fixDef.density = this.data.density || 1;
				fixDef.friction = this.data.friction || 1;
				fixDef.restitution = this.data.restitution || 0;
				fixDef.isSensor = this.data.isSensor || false;
				fixDef.shape = new box2d.b2PolygonShape();
				fixDef.shape.SetAsArray( vecs, vecs.length );

				game.world.CreateBody(bodyDef).CreateFixture(fixDef);
			}
		},

		addToLayer: function(){
			this.asset = new Bitmap(this.image);
			this.asset.x = this.data.position.x || 0;
			this.asset.y = this.data.position.y || 0;

			if ( this.data.reg !== undefined ) {
				this.asset.regX = this.data.reg.x || 0;
				this.asset.regY = this.data.reg.y || 0;
			}
		}
	});

})(jQuery);
