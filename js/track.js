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
        var fulldata = context.getImageData(0, 0, image.width, image.height).data;
        data = [];
        var offset;
        for (var i=0; i < image.width; i++)
        {
            data[i] = [];
            for (var j=0; j < image.height; j++)
            {
                offset = i * 4 + j * 4 * image.width;
                var calculated = fulldata[offset] * 256 * 256 +
                    fulldata[offset + 1] * 256 +
                    fulldata[offset + 2];
                data[i][j] = calculated;
            }
        }
        game.begin();   
    }

    self.draw = function()
    {
        context.drawImage(image, 0, 0);
    }

    self.pixelAt = function(x, y)
    {
        console.log ('fetch at ', x, y);
        return data[x][y];
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