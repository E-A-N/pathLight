var w = config.init.screenWidth, h = config.init.screenHeight;
var DEBUG = true;

/*
For Fullscreen put this code:
var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
*/

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

//protected and none global!!
if (config.default.debug.isOn === true){
    let query = new URLSearchParams(window.location.search);
    let width =  query.get("dWidth")  || config.init.screenWidth;
    let height = query.get("dHeight") || config.init.screenHeight;

    game._width = width;
    game._height = height;
}
