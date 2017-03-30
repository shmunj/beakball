function Crumb(location, size) {
  if (location) {
    this.location = location;
  } else {
    this.location = createVector(random(width), random(height));
  }
  
  if (size) {
    this.size = size;
  } else {
    this.size = 10;
  }
  this.min_size = 2;
  
  this.food = 0.3;
  this.color = color(120, 80, 60, 200);
  this.flying = false;
  this.flying_speed = 10;
  this.target_location = this.location.copy();
  this.max_throw = 200;
  
  this.draw = function() {
    noStroke();
    fill(this.color);
    ellipseMode(CENTER);
    var r;
    if (this.size < this.min_size) {
      r = this.min_size;
    } else {
      r = this.size;
    }
    
    if (this.flying) {
      var distance = dist(this.location.x, this.location.y,
            this.target_location.x, this.target_location.y);
      if (distance <= this.flying_speed) {
        this.location = this.target_location.copy();
        this.flying = false;
      } else {
        var direction = this.target_location.copy();
        direction.sub(this.location);
        direction.normalize(this.flying_speed);
        if (abs(direction.x) < this.flying_speed) {
          direction.x = direction.x / abs(direction.x) *
                        this.flying_speed;
        }
        if (abs(direction.y) < this.flying_speed) {
          direction.y = direction.y / abs(direction.y) *
                        this.flying_speed;
        }
        this.location.add(direction);
      }
    }
    ellipse(this.location.x, this.location.y, r, r);
  }
  
  this.split = function(crumbs) {
    this.size -= this.food;
    this.size = floor(this.size);

    if (this.size <= 0) {
      var index = crumbs.indexOf(this);
      crumbs.splice(index, 1);
    } else {
      
      var mod = 500 / this.size;
      if (mod > this.max_throw) {
        mod = this.max_throw;
      }
      var rx = random(-1, 1);
      var ry = random(-1, 1);

      this.target_location.x += rx * mod;
      this.target_location.y += ry * mod;
      
      this.flying = true;
    }
  }
}
