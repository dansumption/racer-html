function Car ()
{
	var self=this;

	self.start = function()
	{
		self.position=new Vector(200, 200);
		self.angle=0;
		self.speed=2;
		self.steering = 0;
		self.acceleration = 0;
		console.log('New car at ', self.position.x, self.position.y)
	}

	self.accelerate = function ()
	{
		self.acceleration = 1;
	} 

	self.decelerate = function () 
	{
		self.acceleration = -1;
	}

	self.stopAccelerate = function()
	{
		self.acceleration = 0;
	}

	self.turnLeft = function()
	{
		self.steering = -1;
	}

	self.turnRight = function()
	{
		self.steering = 1;
	}

	self.stopTurn = function()
	{
		self.steering = 0;
	}

	self.draw = function(context)
	{
		context.save();
		context.translate(self.position.x, self.position.y);
		context.rotate(self.angle);
		context.lineWidth=5;
		context.beginPath();
		context.rect(-10, -5, 10, 5);
		context.stroke();
		context.restore();
	}

	self.update = function ()
	{
		// console.log("update: ", self.acceleration, self.angle, self.steering);
		self.speed += self.acceleration;
		self.angle += self.steering * 0.1;
		self.position.x += self.speed * Math.cos(self.angle);
		self.position.y += self.speed * Math.sin(self.angle);
		self.speed *= 0.96;
	}
}

function Vector(x, y)
{
	var self=this;
	self.x=x;
	self.y=y;
}

function Game()
{
	var self=this;


	self.init=function()
	{
	    plane = $("#plane").get(0);
	    self.context=plane.getContext('2d');
	    self.car = new Car();
	    self.car.start();
	    $('body').keydown(self.keydown);
	    $('body').keyup(self.keyup);
	    self.gameloop();
	}

	self.keydown=function(event)
	{
		console.log('key ' + event.keyCode);
		switch(event.keyCode)
		{
			case 37: //left
				self.car.turnLeft();
				break
			case 39: //right
				self.car.turnRight();
				break;
			case 38: //up
				self.car.accelerate();
				break;
			case 40: //down
				self.car.decelerate();
				break;
		}
	}

	self.keyup=function(event)
	{
		console.log("keyup " + event.keyCode);
		switch(event.keyCode)
		{
			case 37: //left
			case 39: //right
				self.car.stopTurn();
				break;
			case 38: //up
			case 40: //down
				self.car.stopAccelerate();
				break;
		}
	}

	self.gameloop=function()
	{
		self.clear();
		self.update();
		self.draw();
		setTimeout(self.gameloop, 40);
	}

	self.clear = function()
	{
		self.context.fillStyle='#999999';
		self.context.clearRect(0, 0, plane.width, plane.height);
		self.context.beginPath();
		self.context.rect(0, 0, plane.width, plane.height);
		self.context.closePath();
		self.context.fill();
	}

	self.draw=function()
	{
		self.car.draw(self.context);
	}

	self.update=function()
	{
		self.car.update();
	}
}