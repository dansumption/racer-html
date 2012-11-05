function Track(source)
{
    var self = this,
        image = new Image(),
        data;

    self.init = function()
    {
        image.onload=begin;
        image.src = "img/track.png";
    }

    var begin=function()
    {
        console.log('track begin');
        self.draw();
        data = context.getImageData(0, 0, image.width, image.height).data;
        game.begin();   
    }

    self.draw = function()
    {
        context.drawImage(image, 0, 0);
    }

    self.__defineGetter__("width", function()
    {
        return image.width;
    });

    self.__defineGetter__("height", function()
    {
        return image.height;
    });
}