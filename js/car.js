function Car ()
{
    var self=this,
        position=new Vector(600, 300),
        angle=0,
        speed=20,
        steering = 0,
        acceleration = 0;
    console.log('New car at ', self.x, self.y)

    self.accelerate = function ()
    {
        acceleration = 1;
    } 

    self.decelerate = function () 
    {
        acceleration = -0.5;
    }

    self.stopAccelerate = function()
    {
        acceleration = 0;
    }

    self.turnLeft = function()
    {
        steering = -1;
    }

    self.turnRight = function()
    {
        steering = 1;
    }

    self.stopTurn = function()
    {
        steering = 0;
    }

    self.draw = function()
    {
        context.save();
        context.translate(self.x, self.y);
        context.rotate(angle);

        // draw car
        context.strokeStyle='#999999';
        context.lineWidth=5;
        context.beginPath();
        context.rect(-10, -5, 20, 10);
        context.stroke();

        // draw wheels
        context.beginPath();
        context.translate(-10, -7);
        drawWheel();
        context.translate(0, 14);
        drawWheel();
        context.rotate(steering * 0.2);
        context.translate(20, 0);
        drawWheel();
        context.rotate(-steering * 0.2);
        context.translate(0, -14);
        context.rotate(steering * 0.2);
        drawWheel();
        context.stroke();
        context.restore();
    }

    var drawWheel=function()
    {
        context.rect(-4, -2, 8, 4);
    }

    self.update = function ()
    {
        speed += acceleration;
        angle += steering * 0.01 * speed;
        self.x += speed * Math.cos(angle);
        self.y += speed * Math.sin(angle);
        speed *= 0.96;
    }

    self.__defineGetter__("x", function()
    {
        return position.x;
    });

    self.__defineGetter__("y", function()
    {
        return position.y;
    });

    self.__defineSetter__("x", function(val){
        position.x = val;
    });

    self.__defineSetter__("y", function(val){
        position.y = val;
    });
}

function Vector(x, y)
{
    var self=this;
    self.x=x;
    self.y=y;
}
