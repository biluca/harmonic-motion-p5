class Vector {
  constructor() {
    this.coordinates = [];
    this.animation_index = 0;
    this.point_size = 8;
  }

  coordinates_size() {
    return this.coordinates.length;
  }

  append_coordinate(x, y) {
    var new_point = new Point(x, y);
    append(this.coordinates, new_point);
  }

  print_coordinate(index) {
    stroke("blue");
    strokeWeight(this.point_size);
    point(this.coordinates[index].x, this.coordinates[index].y);
  }

  show() {
    stroke(32);
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

  animate() {
    this.print_coordinate(this.animation_index);

    if (this.animation_index == this.coordinates_size() - 1) {
      this.animation_index = 0;
    } else {
      this.animation_index = this.animation_index + 1;
    }
  }
}
