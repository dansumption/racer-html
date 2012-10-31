requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
});

// Start the main app logic.
requirejs(['jquery', 'car', 'game'],
function   ($) {
    new Game().init();
});