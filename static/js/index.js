var pixelSize = 4;
var margin = 0;
var chosenColor = "#FFFFFF";

var canvas;
var ctx;
var pixels;

var choose_color = function(color) {
    chosenColor = color;
}

var draw_pixel = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(
        x*pixelSize + x*margin,
        y*pixelSize + y*margin,
        pixelSize,
        pixelSize
    );
}

var draw_pixels = function(pixels) {
    width = pixels.length;
    height = pixels[0].length;
    canvas.width = width*pixelSize + width*margin;
    canvas.height = height*pixelSize + height*margin;
    for(var x=0; x<width; x++) {
        for(var y=0; y<height; y++) {
            draw_pixel(x, y, pixels[x][y]);
        }
    }
}

var update = function() {
    $.getJSON("/canvas", function(data) {
        pixels = data;
        draw_pixels(pixels);
    })
}

var set_color = function(x, y, color) {
    oldColor = pixels[x][y];
    draw_pixel(x, y, color);
    $.post("/update", {x: x, y: y, color: color}, 
        function(returnedData){
            if(returnedData != "OK") {
                alert("Write to pixel rejected!");
                draw_pixel(x, y, oldColor);
            } else {
                pixels[x][y] = color;
            }
        })
}

var init = function() {
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    canvas.addEventListener('click', function(e) {

        if(chosenColor == null) return;

        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;

        set_color(
            Math.floor(x/(pixelSize + margin)),
            Math.floor(y/(pixelSize + margin)),
            chosenColor
        )
    });

    update();
}

window.onload = init;