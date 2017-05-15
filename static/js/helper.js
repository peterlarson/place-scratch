var draw_rect = function(color){
    var c = $("#place-canvas").val();
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0,0,10,10);
}

var update = function(){
    $.getJSON("/canvas", function(data) {
        var color = data[0][0]
        draw_rect(color)
    })
}

var set_color = function(new_color){
    $.post("/update", {x: "0", y:"0", color: new_color}, 
        function(returnedData){
            console.log(returnedData);
            update()
        })
}