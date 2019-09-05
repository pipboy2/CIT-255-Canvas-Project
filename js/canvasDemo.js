// Object Constructors:

//Basic constructor for shapes:
function canvasObject (height, width, color, x, y){
    
}


// Second Demo:

var dII = {
    canvas : document.getElementById("movingCanvas"),
    start : function() 
    {
        this.canvas.width = 700;
        this.canvas.height = 350;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateCanvas, 10);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
