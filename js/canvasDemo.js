
// Variables: These are used to store drawing information for the canvas and informtion on the canvas itself. 
var square;
var textureSquare;
var background;
var block1;
var block2;
var d2 = {
    canvas: document.getElementById("movingCanvas"),
    start: function () {                                                        // The start function handles the creation of the canvas element itself.
        this.canvas.width = 800;
        this.canvas.height = 200;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;                                                       // Frame Number is being used to keep track in case we want something to appear
        this.interval = setInterval(updateCanvas, 10);                          // or move at a certain time. Set interval is needed to refresh objects perodically.
        window.addEventListener("mousemove", function (e) {                     // This event listener is used to allow objects to update based on the position of 
            d2.x = e.pageX;                                                    // the mouse cursor. 
            d2.y = e.pageY;
        });

    },
    clear: function () {                                                          // Clear function is used to remove all objects from the canvas. 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};

//Basic constructor for shapes:
function canvasObject(height, width, color, x, y) {                                // Making a canvas "object" allows the drawing data to be retained 
    this.width = width;                                                            // without having to rekey each time a change is made. 
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {                                                     // This is used to do the actual drawing with the parameters given.
        ctx = d2.context;                                                           // When called in the function that updates the canvas this one should
        ctx.fillStyle = color;                                                      // be called after the new position (newPos) function.
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {                                                      // This function updates the X and Y coordinates of the object
        this.x += this.speedX;
        this.y += this.speedY;
    }

}

// Variant that uses images instead of color. 
function canvasImageObject(height, width, imgSrc, x, y) {
    this.img = new Image();
    this.img.src = imgSrc
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = d2.context;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);                   // The second drawing is needed for the update position function.
        ctx.drawImage(this.img, this.x, this.y + this.height, this.width, this.height);     // Without it, the image simply "snaps" back to its starting position
    }                                                                                       // and leaves a blank space. 
    // Function that redraws the object on the Canvas:
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x == -(this.width)) {                                      // These if statements are used to reset the image once it has
            this.x = 0;                                                     // crossed the screen, giving the illution of a continuous
        }                                                                   // movement for any other objects drawn in canvas.
        if (this.y == -(this.height)) {
            this.y = 0;
        }
    }
}

// Function that refreshed the Canvas:
function updateCanvas() {

    d2.clear();                                                           // Clears any existing objects left on the Canvas.
    d2.frameNo += 1;

    // Update Background to make it look like it is moving:               // Whenever a new object is instantiated it will need to 
    background.speedY = -1;                                               // have a .newPos() and .update() added to this function.    
    background.newPos();                                                  // The canvas is redrawn each time it is updated,  
    background.update();                                                  // so if these listed methods are not in this function
                                                                          // the object will not appear. 
    // Update static blocks: 
    block1.newPos();
    block1.update();
    block2.newPos();
    block2.update();

    // Updates the position of the orange square to the location of the
    // mouse cursor.
    if (d2.x && d2.y) {                                                    // If statement is used to check to see if the mouse event exists.
        square.x = (d2.x - 200);                                           // Update's the square's position via the mouse position.
        square.y = (d2.y - 200);                                           // The -200 is an offest so the cursor will line up with the object on the canvas.          
    }
    square.newPos();
    square.update();

    textureSquare.newPos();
    textureSquare.update();
}

// Function that initializes the demo when called.
function startDemo() {                                                      // All objects need to be instantiated here 
    background = new canvasBackground("media/bg2.png", 200, 800, 0, 0);     // before the "start" function is called.
    square = new canvasObject(50, 50, "orange", 0, 0);
    // textureSquare = new canvasImageObject(50, 100, "media/digitalBG.jpg", 600, 20);
    block1 = new canvasObject(20, 50, "darkseagreen", 150, 50);
    block2 = new canvasObject(50, 20, "mediumpurple", 350, 50);
    d2.start();
}

// Button event listeners:
document.getElementById("d2Btn").addEventListener("click", function () {    // This is the handler for the button which starts
    document.getElementById("d2Btn").style.display = "none";                // the canvas demo. The button is hidden after being 
    startDemo();                                                            // clicked. 
});
