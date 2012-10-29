function Car ()
{
	var self=this;
	self.position=new Vector(200, 200);
	self.angle=0;
	self.speed=2;

	self.start = function()
	{
		console.log('car started');
	}

	self.accelerate = function ()
	{
		self.speed += 1;
		console.log('car accelerate');
	} 

	self.decelerate = function () 
	{
		if (self.speed > 0)
		{
			self.speed -= 1;
			console.log('car braking');
		}
	}

	self.turnLeft = function()
	{
		self.angle -= 0.1;
	}

	self.turnRight = function()
	{
		self.angle += 0.1;
	}

	self.draw = function(context)
	{
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(self.angle);
		context.lineWidth=5;
		context.beginPath();
		context.rect(-10, -5, 10, 5);
		context.stroke();
		context.restore();
	}

	self.update = function ()
	{
		this.position.x += this.speed * Math.cos(this.angle);
		this.position.y += this.speed * Math.sin(this.angle);
	}
}

function Vector(x, y)
{
	var self=this;
	this.x=x;
	this.y=y;
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
	    $('body').keydown(self.keyup);
	    self.gameloop();
	}

	self.keydown=function(event)
	{
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
		console.log('Keyup: ' + event.keyCode);
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