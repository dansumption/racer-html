function Game()
{
	var self=this;


	self.init=function()
	{
	    self.plane = $("#plane").get(0);
	    self.context=self.plane.getContext('2d');
		self.track = new Image();
		self.track.onload=self.begin;
 		self.track.src = "img/track.png";
	}

	self.begin=function()
	{
	    self.plane.width = self.track.width;
	    self.plane.height = self.track.height;
	    self.context.drawImage(self.track, 0, 0);
	    self.resize();

 		self.trackData=self.context.getImageData(0, 0, self.track.width, self.track.height).data;
	    self.car = new Car();
	    $('body').keydown(self.keydown);
	    $('body').keyup(self.keyup);
	    self.gameloop();
	}

    self.resize=function() {
        var scale = {x: 1, y: 1};
        scale.x = (window.innerWidth) / this.plane.width;
        scale.y = (window.innerHeight) / this.plane.height
        console.log (window.innerHeight + '/' + this.plane.height);        
		if (scale.x < scale.y)
		{
            scale = scale.x + ', ' + scale.x;
            console.log('scale based on x is ' + scale.x);
        }
        else
        {
            scale = scale.y + ', ' + scale.y;
            console.log('scale based on y is ' + scale);
            console.log((this.plane.height * (window.innerHeight/this.plane.height)))
        }

        this.plane.setAttribute('style', 'border:1px; -ms-transform-origin: center top; -webkit-transform-origin: center top; -moz-transform-origin: center top; -o-transform-origin: center top; transform-origin: center top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
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
		self.context.clearRect(0, 0, self.plane.width, self.plane.height);
		self.context.drawImage(self.track, 0, 0);
	}

	self.draw=function()
	{
		console.log('track dimensions: ', self.track.width, self.track.height)
		console.log('canvas dimensions: ', self.plane.width, self.plane.height)
		// console.log('context dimensions: ', self.context.width, self.context.height)
		self.car.draw(self.context);
	}

	self.update=function()
	{
		self.car.update();
		// var offset = Math.round(self.car.position.x) * 4 + Math.round(self.car.position.y) * 4 * self.track.width;
		// console.log('seeking ' + offset + ' from ' + self.trackData.length);
        // console.log("pixel is " + self.trackData[offset]+','+self.trackData[offset + 1]+','+self.trackData[offset + 2]+','+self.trackData[offset + 3]);
	}
}