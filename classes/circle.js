


class Circle {
  constructor(center_point, radius, precision, point_size) {
    this.center_point = center_point;
    this.radius = radius;
    this.precision = precision;
    this.point_size = point_size;

    this.coordinates = [];
    this.animation_index = 0;

    this.calculate_circle_vector();
  }

  coordinates_size() {
    return this.coordinates.length;
  }

  print_coordinate(index) {
    stroke("red");
    strokeWeight(this.point_size);
    point(this.coordinates[index].x, this.coordinates[index].y);
  }

  animate() {
    this.print_coordinate(this.animation_index);

    if (this.animation_index == this.coordinates_size() - 1) {
      this.animation_index = 0;
    } else {
      this.animation_index = this.animation_index + 1;
    }
  }

  show() {
    stroke("white");
    strokeWeight(2);

    for (var i = 0; i < this.coordinates_size() - 1; i++) {
      line(
        this.coordinates[i].x,
        this.coordinates[i].y,
        this.coordinates[i + 1].x,
        this.coordinates[i + 1].y
      );
    }

    var last_index = this.coordinates_size() - 1;
    line(
      this.coordinates[last_index].x,
      this.coordinates[last_index].y,
      this.coordinates[0].x,
      this.coordinates[0].y
    );

    this.animate();
  }

  calculate_circle_vector() {
    // x(θ) = Cx + R * cos(θ)
    // y(θ) = Cy + R * sin(θ)

    for (var i = 0; i < 360; i = i + this.precision) {
      var x = this.center_point.x + this.radius * cos(i);
      var y = this.center_point.y + this.radius * sin(i);
      var new_point = new Point(x, y);
      append(this.coordinates, new_point);
    }
  }
}
