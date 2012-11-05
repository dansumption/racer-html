requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
});

// Start the main app logic.
requirejs(['jquery', 'car', 'track', 'game'],
function   ($)
{
    plane = $("#plane").get(0),
    context = plane.getContext('2d');
    game = new Game();
});