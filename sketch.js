var img;

var columns = 70;
var rows = 70;

// This is an array that will contain all our circles
var circles = [];

var colSize;
var rowSize;

// Preloads our image
function preload() {
  img = loadImage("NEW-02.png");
}

function setup() {
  createCanvas(600, 600);

  // Here we load the pixels in the image and work out
  // what colour each circle will be
  img.loadPixels();

  colSize = width / columns;
  rowSize = height / rows;

  for (var x = 0; x < columns; x++) {
    for (var y = 0; y < rows; y++) {
      var c = img.get(x * colSize, y * rowSize);

      // We create a new circle and add it to our circles array
      circles.push(new Circle(x * colSize, y * rowSize, colSize, rowSize, c));
    }
  }

  noStroke();
}

function draw() {
  background(220);

  // We iterate over our circles and draw each one
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
  }
}

function mouseDragged() {
  var currX = floor(mouseX / colSize);
  var currY = floor(mouseY / rowSize);

  var index = (currX * rows) + currY;

  circles[index].grow();
}


// This is our circle class, each circle is a type of this
class Circle {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.c = c;

    this.scale = 0.1;
  }

  draw() {
    fill(this.c);
    ellipse(this.x, this.y, this.w * this.scale, this.h * this.scale);
  }

  grow() {
    this.scale += 0.2;
    this.scale = constrain(this.scale, 0, 1);
  }
}
