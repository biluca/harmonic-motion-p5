SCREEN_SIZE = 600;
GRID_SIZE = SCREEN_SIZE / 5;
var horizontal_circles = [];
var vertical_circles = [];

let capture = true;

function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  angleMode(DEGREES);

  horizontal_circles = create_horizontal_circles();
  vertical_circles = create_vertical_circles();

  combination_vectors = create_combination_vectors(
    horizontal_circles,
    vertical_circles
  );

}

var my_circle_index = 0;
var my_circle_a_index = 0;

function draw() {
  background(0);
  draw_grid();

  for (var i = 0; i < vertical_circles.length; i++) {
    vertical_circles[i].show();
  }

  for (var i = 0; i < horizontal_circles.length; i++) {
    horizontal_circles[i].show();
  }

  for (var i = 0; i < combination_vectors.length; i++) {
    combination_vectors[i].show();
  }

  if (capture) {
    //saveCanvas("frame_" + frameCount, "png"); // Save the current frame as an image
    frameCount++;
  }

  if (frameCount >= 360) {
    capture = false;
    //noLoop();
  }
}

function create_horizontal_circles() {
  var circle_size = 40;
  var offset = 100;
  var padding = 10;
  speed_array = [0, 5, 4, 3, 2, 1];
  horizontal_circles = [];

  for (var i = 1; i <= 5; i++) {
    var center_point = new Point(i * 100 + 50, circle_size + 10);
    my_circle = new Circle(center_point, circle_size, speed_array[i], 10);
    append(horizontal_circles, my_circle);
  }

  return horizontal_circles;
}

function create_vertical_circles() {
  var circle_size = 40;
  var offset = 100;
  var padding = 10;
  speed_array = [0, 1, 2, 3, 4, 5];
  vertical_circles = [];

  for (var i = 1; i <= 5; i++) {
    var center_point = new Point(circle_size + 10, i * 100 + 50);
    my_circle = new Circle(center_point, circle_size, speed_array[i], 10);
    append(vertical_circles, my_circle);
  }

  return vertical_circles;
}

function create_combination_vectors(horizontal_circles, vertical_circles) {
  var vectors = [];

  for (hc = 0; hc < horizontal_circles.length; hc++) {
    for (vc = 0; vc < vertical_circles.length; vc++) {
      horizontal_threshold = 360 / horizontal_circles[hc].coordinates.length;
      vertical_threshold = 360 / vertical_circles[vc].coordinates.length;

      horizontal_coordinates_length = horizontal_circles[hc].coordinates.length;
      vertical_coordinates_length = vertical_circles[vc].coordinates.length;

      let newVector = new Vector();

      let horizontal_index = 0;
      let vertical_index = 0;

      for (var i = 0; i < 360; i++) {
        x = horizontal_circles[hc].coordinates[horizontal_index].x;
        y = vertical_circles[vc].coordinates[vertical_index].y;

        newVector.append_coordinate(x, y);

        if (horizontal_index < horizontal_coordinates_length - 1) {
          horizontal_index = horizontal_index + 1;
        } else {
          horizontal_index = 0;
        }

        if (vertical_index < vertical_coordinates_length - 1) {
          vertical_index = vertical_index + 1;
        } else {
          vertical_index = 0;
        }
      }

      append(vectors, newVector);
    }
  }

  return vectors;
}

function draw_grid() {
  stroke(128);
  strokeWeight(0);
  for (var i = 0; i < GRID_SIZE; i++) {
    line(i * 100, 0, i * 100, height);
    line(0, i * 100, width, i * 100);
  }
}
