// Object Constructors:
// Testing to see if we can perform a successful push: 

//Basic constructor for shapes:
function canvasObject(height, width, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
this.newPos = function () {
    this.gravitySpeed;
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == "background") {
        if (this.x == -(this.width)) {
            this.x = 0;
        }
    }
}
}    
}


// Second Demo:

var dII = {
    canvas: document.getElementById("movingCanvas"),
    start: function () {
        this.canvas.width = 700;
        this.canvas.height = 350;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateCanvas, 10);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function startDemo() {
    dII.start();
}


// Button event listeners: 

document.getElementById("d2Btn").addEventListener("click", function () { });