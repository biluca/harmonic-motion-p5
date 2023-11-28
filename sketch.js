SCREEN_SIZE = 900;
GRID_STROKE_WEIGHT = 0;
GRID_COUNT = 6;
CIRCLE_RADIUS = (SCREEN_SIZE / GRID_COUNT) * 0.40;
CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
GRID_SIZE = SCREEN_SIZE / GRID_COUNT;
GRID_OFF_SET = (GRID_SIZE - CIRCLE_DIAMETER) / 2;

const grid = new Grid(GRID_COUNT, GRID_SIZE, GRID_STROKE_WEIGHT);
var horizontal_circles = [];
var vertical_circles = [];

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

function draw() {
  background(0);
  grid.show()

  for (var i = 0; i < vertical_circles.length; i++) {
    vertical_circles[i].show();
  }

  for (var i = 0; i < horizontal_circles.length; i++) {
    horizontal_circles[i].show();
  }

  for (var i = 0; i < combination_vectors.length; i++) {
    combination_vectors[i].show();
  }
}

function create_horizontal_circles() {
  speed_array = create_speed_array(false)
  horizontal_circles = [];

  for (var i = 1; i < GRID_COUNT; i++) {
    var center_point = new Point((i * GRID_SIZE) + CIRCLE_RADIUS + GRID_OFF_SET, CIRCLE_RADIUS + GRID_OFF_SET);
    my_circle = new Circle(center_point, CIRCLE_RADIUS, speed_array[i], 10);
    append(horizontal_circles, my_circle);
  }

  return horizontal_circles;
}

function create_vertical_circles() {
  speed_array = create_speed_array(true)
  vertical_circles = [];

  for (var i = 1; i < GRID_COUNT; i++) {
    var center_point = new Point(CIRCLE_RADIUS + GRID_OFF_SET, (i * GRID_SIZE) + CIRCLE_RADIUS + GRID_OFF_SET);
    my_circle = new Circle(center_point, CIRCLE_RADIUS, speed_array[i], 10);
    append(vertical_circles, my_circle);
  }

  return vertical_circles;
}

function create_speed_array(negative) {
  speed_array = [];

  for (i = 0; i < GRID_COUNT; i++) {
    append(speed_array, i);
  }

  if (negative) {
    return (speed_array);
  } else {
    return speed_array;
  }
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
