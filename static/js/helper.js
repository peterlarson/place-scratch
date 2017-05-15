var pixelSize = 10;

var canvas;
var ctx;
var pixels;

var draw_pixel = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(
        x,
        y,
        pixelSize,
        pixelSize
    );
}

var update = function() {
    $.getJSON("/canvas", function(data) {
        pixels = data;
        width = pixels.length;
        height = pixels[0].length;
        canvas.width = width*pixelSize;
        canvas.height = height*pixelSize;
        for(var x=0; x<width; x++) {
            for(var y=0; y<height; y++) {
                draw_pixel(x, y, pixels[x][y]);
            }
        }
    })
}

var set_color = function(color) {
    $.post("/update", {x: "0", y:"0", color: color}, 
        function(returnedData){
            console.log(returnedData);
            update()
        })
}

var init = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    update();
}

window.onload = init;