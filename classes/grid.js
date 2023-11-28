class Grid {
    constructor(grid_count, grid_size, strokeWeight) {
      this.grid_count = grid_count;
      this.grid_size = grid_size;
      this.strokeWeight = strokeWeight;
    }

    show() {
        stroke(128);
        strokeWeight(this.strokeWeight);
        
        for (var i = 0; i < this.grid_count; i++) {
          line(i * this.grid_size, 0, i * this.grid_size, height);
          line(0, i * this.grid_size, width, i * this.grid_size);
        }
      }
  }
  