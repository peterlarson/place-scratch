var pixelSize = 4;
var margin = 0;
var chosenColor = "#FFFFFF";

var canvasName = "canvas1";
var displayingCanvas = true;
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
    $.getJSON("/canvas", {canvas: canvasName}, function(data) {
        pixels = data;
        draw_pixels(pixels);
    })
}

var set_color = function(x, y, color) {
    oldColor = pixels[x][y];
    draw_pixel(x, y, color);
    $.post("/update", {x: x, y: y, color: color, canvas: canvasName}, 
        function(returnedData){
            if(returnedData != "OK") {
                alert("Write to pixel rejected!");
                draw_pixel(x, y, oldColor);
            } else {
                pixels[x][y] = color;
            }
        });
}

var toggle_display_mode = function() {
    if(displayingCanvas) {
        $("#canvaschoosediv").show();
        $("#canvas").hide();
        $("#colorpicker").hide();
        $("#plus").hide();
        $("#minus").hide();
        $("#back").hide();
    } else {
        $("#canvaschoosediv").hide();
        $("#canvas").show();
        $("#colorpicker").show();
        $("#plus").show();
        $("#minus").show();
        $("#back").show();
    }
    displayingCanvas = !displayingCanvas;
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

    var selectCanvasFxn = function(e) {
        canvasName = $("#canvasnamebox")[0].value;
        update();
        toggle_display_mode();
    }

    document.onkeydown = function(){
        if(displayingCanvas) {
            return;
        }
        if(window.event.keyCode=='13'){
            selectCanvasFxn();
        }
    }

    $("#selectcanvas")[0].addEventListener('click', selectCanvasFxn);

    $("#back")[0].addEventListener('click', function(e) {
        toggle_display_mode();
    });

    $("#plus")[0].addEventListener('click', function(e) {
        pixelSize++;
        draw_pixels(pixels);
    });

    $("#minus")[0].addEventListener('click', function(e) {
        if(pixelSize > 1) {
            pixelSize--;
            draw_pixels(pixels);
        }
    });

    toggle_display_mode();
}

window.onload = init;