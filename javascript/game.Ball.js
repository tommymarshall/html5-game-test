var SAY = SAY || {};

(function(){

	var game = SAY.game;

	game.Ball = function(){
		this.view = new Bitmap( "../images/soccer.png" );
		this.view.regX = this.view.regY = 50;

		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = 5.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.25;

		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = ( Math.random()*800 ) / game.SCALE;
		bodyDef.position.y = 0;

		fixDef.shape = new box2d.b2CircleShape( 50 / game.SCALE );
		this.view.body = game.world.CreateBody( bodyDef );
		this.view.body.CreateFixture( fixDef );
		this.view.onTick = tick;
	};

	var tick = function(e) {
		this.x = this.body.GetPosition().x * game.SCALE;
		this.y = this.body.GetPosition().y * game.SCALE;
		this.rotation = this.body.GetAngle() * ( 180/Math.PI );
	};

})();
