function Car ()
{
    var self=this;

    self.start = function()
    {
        self.position=new Vector(600, 300);
        self.angle=0;
        self.speed=20;
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
        self.acceleration = -0.5;
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

        // draw car
        context.strokeStyle='#999999';
        context.lineWidth=5;
        context.beginPath();
        context.rect(-10, -5, 20, 10);
        context.stroke();

        // draw wheels
        context.beginPath();
        context.translate(-10, -7);
        self.drawWheel(context);
        context.translate(0, 14);
        self.drawWheel(context);
        context.rotate(self.steering * 0.2);
        context.translate(20, 0);
        self.drawWheel(context);
        context.rotate(-self.steering * 0.2);
        context.translate(0, -14);
        context.rotate(self.steering * 0.2);
        self.drawWheel(context);
        context.stroke();
        context.restore();
    }

    self.drawWheel=function(context)
    {
        context.rect(-4, -2, 8, 4);
    }

    self.update = function ()
    {
        // console.log("update: ", self.acceleration, self.angle, self.steering);
        self.speed += self.acceleration;
        self.angle += self.steering * 0.01 * self.speed;
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
