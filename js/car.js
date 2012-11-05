function Car ()
{
    var self=this,
        position=new Vector(600, 300),
        angle=0,
        speed=20,
        steering = 0,
        acceleration = 0;
    console.log('New car at ', position.x, position.y)

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

    self.draw = function(context)
    {
        context.save();
        context.translate(position.x, position.y);
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
        drawWheel(context);
        context.translate(0, 14);
        drawWheel(context);
        context.rotate(steering * 0.2);
        context.translate(20, 0);
        drawWheel(context);
        context.rotate(-steering * 0.2);
        context.translate(0, -14);
        context.rotate(steering * 0.2);
        drawWheel(context);
        context.stroke();
        context.restore();
    }

    var drawWheel=function(context)
    {
        context.rect(-4, -2, 8, 4);
    }

    self.update = function ()
    {
        speed += acceleration;
        angle += steering * 0.01 * speed;
        position.x += speed * Math.cos(angle);
        position.y += speed * Math.sin(angle);
        speed *= 0.96;
    }
}

function Vector(x, y)
{
    var self=this;
    self.x=x;
    self.y=y;
}
