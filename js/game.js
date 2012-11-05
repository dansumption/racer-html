function Game()
{
	var self=this,
		track = new Track("img/track.png"),
		car = new Car();
	track.init();

	self.begin=function()
	{
	    plane.width = track.width;
	    plane.height = track.height;
	    resize();
	    $('body').keydown(keydown);
	    $('body').keyup(keyup);
	    gameloop();
	}

    var resize=function() {
        var scale = {x: 1, y: 1};
        scale.x = (window.innerWidth) / plane.width;
        scale.y = (window.innerHeight) / plane.height
        console.log (window.innerHeight + '/' + plane.height);        
		if (scale.x < scale.y)
		{
            scale = scale.x + ', ' + scale.x;
            console.log('scale based on x is ' + scale.x);
        }
        else
        {
            scale = scale.y + ', ' + scale.y;
            console.log('scale based on y is ' + scale);
            console.log((plane.height * (window.innerHeight/plane.height)));
        }

        plane.setAttribute('style', 'border:1px; -ms-transform-origin: center top; -webkit-transform-origin: center top; -moz-transform-origin: center top; -o-transform-origin: center top; transform-origin: center top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
    }

	var keydown=function(event)
	{
		console.log('key ' + event.keyCode);
		switch(event.keyCode)
		{
			case 37: //left
				car.turnLeft();
				break
			case 39: //right
				car.turnRight();
				break;
			case 38: //up
				car.accelerate();
				break;
			case 40: //down
				car.decelerate();
				break;
		}
	}

	var keyup=function(event)
	{
		console.log("keyup " + event.keyCode);
		switch(event.keyCode)
		{
			case 37: //left
			case 39: //right
				car.stopTurn();
				break;
			case 38: //up
			case 40: //down
				car.stopAccelerate();
				break;
		}
	}

	var gameloop=function()
	{
		clear();
		update();
		draw();
		setTimeout(gameloop, 40);
	}

	var clear = function()
	{
		context.clearRect(0, 0, plane.width, plane.height);
		track.draw();
	}

	var draw=function()
	{
		console.log('track dimensions: ', track.width, track.height)
		console.log('canvas dimensions: ', plane.width, plane.height)
		// console.log('context dimensions: ', context.width, context.height)
		car.draw();
	}

	var update=function()
	{
		car.update();
		// var offset = Math.round(car.x) * 4 + Math.round(car.y) * 4 * track.width;
		// console.log('seeking ' + offset + ' from ' + trackData.length);
        // console.log("pixel is " + trackData[offset]+','+trackData[offset + 1]+','+trackData[offset + 2]+','+trackData[offset + 3]);
	}
}