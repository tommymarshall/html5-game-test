var SAY = SAY || {};

(function(){

	var game = SAY.game;

	var p = game.Body = Class.extend({

		init: function( data, key ) {
			this.setData( data );
			this.create( key );
		},

		setData: function( data ){
			this.data = {};
			this.body = [];

			for(var key in data){
				this.data[key] = data[key];
			}
		},

		create: function( key ) {
			if ( this.data.src !== undefined ){
				this.image = new Image();
				this.image.src = './images/' + this.data.src;
				this.addToLayer();
			}

			if ( this.data.shape === 'polygon' && this.data.coords !== undefined) {
				this.createPolgygon( key );
			}

			if ( this.data.shape === 'circle' && this.data.radius !== undefined ) {
				this.createCircle( key );
			}
		},

		destroy: function() {
			game.containers[this.data.layer].removeChild(this.view);
		},

		createCircle: function( key ) {
			// Create bodyDef Shape
			var bodyDef = new box2d.b2BodyDef();
			bodyDef.type = box2d.b2Body.b2_staticBody;
			bodyDef.position.x = this.data.position.x / game.SCALE;
			bodyDef.position.y = this.data.position.y / game.SCALE;
			bodyDef.userData = {};
			bodyDef.userData.type = this.data.type;
			bodyDef.userData.key = key;
			bodyDef.userData.destroy = this.destroy;

			// Create fixDef
			var fixDef = new box2d.b2FixtureDef();
			fixDef.density = this.data.density || 1;
			fixDef.friction = this.data.friction || 1;
			fixDef.restitution = this.data.restitution || 0;
			fixDef.isSensor = this.data.isSensor || false;
			fixDef.shape = new box2d.b2CircleShape( this.data.radius / game.SCALE );

			this.body.push(game.world.CreateBody(bodyDef).CreateFixture(fixDef));
		},

		update: function(options) {
			for (var i = this.body.length - 1; i >= 0; i--) {
				this.body[i].x = options.x;
				this.body[i].y = options.y;
			}
		},

		createPolgygon: function( key ) {
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
				bodyDef.userData.key = key;
				bodyDef.isSensor = this.data.isSensor || false;
				bodyDef.userData.destroy = this.destroy;

				// Create fixDef
				var fixDef = new box2d.b2FixtureDef();
				fixDef.density = this.data.density || 1;
				fixDef.friction = this.data.friction || 1;
				fixDef.restitution = this.data.restitution || 0;
				fixDef.shape = new box2d.b2PolygonShape();
				fixDef.shape.SetAsArray( vecs, vecs.length );

				this.body.push(game.world.CreateBody(bodyDef).CreateFixture(fixDef));
			}
		},

		addToLayer: function(){
			this.view = new Bitmap(this.image);
			this.view.x = this.data.position.x || 0;
			this.view.y = this.data.position.y || 0;

			if ( this.data.reg !== undefined ) {
				this.view.regX = this.data.reg.x || 0;
				this.view.regY = this.data.reg.y || 0;
			}
		}
	});

})();
