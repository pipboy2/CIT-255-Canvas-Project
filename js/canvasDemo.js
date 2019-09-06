
// Variables:
var square
var background
var d2 = {
    canvas: document.getElementById("movingCanvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateCanvas, 10);
        window.addEventListener("mousemove", function (e) {
            d2.x = e.pageX;
            d2.y = e.pageY;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

// Object Constructors:


//Basic constructor for shapes:
function canvasObject(height, width, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = d2.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }

}

//Constructor for the background:
function canvasBackground(imgSrc, height, width, x, y) {
    this.img = new Image();
    this.img.src = imgSrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = d2.context;
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
    }
    // Function that redraws the object on the Canvas:
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x == -(this.width + 150)) {
            this.x = 0;
        }

    }

}

// Function that refreshed the Canvas:
function updateCanvas() {

    d2.clear();
    d2.frameNo += 1;

    // Update Background to make it look like it is moving:
    background.speedX = 0;
    background.newPos();
    background.update();

    // Updates the position of the square to the location of the
    // cursor.
    (d2.x && d2.y)
    {
        if (square.x > d2.x) {
            square.x = d2.x;
        }
        else {
            square.x = (d2.x - 250);
        }
        if (square.y > d2.y) {
            square.y = d2.y;
        }
        else {
            square.y = (d2.y - 250);
        }
    }
    square.newPos();
    square.update();
}

// Function that initializes the demo when called.
function startDemo() {
    square = new canvasObject(100, 100, "orange", 400, 150);
    background = new canvasBackground("media/canvasBG.jpg", 600, 800, 800, 0)
    d2.start();
}

// Button event listeners:
document.getElementById("d2Btn").addEventListener("click", function () {
    document.getElementById("d2Btn").style.display = "none";
    startDemo();
});
