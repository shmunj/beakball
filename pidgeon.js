function Pidgeon() {
  this.location = createVector(random(width), random(height));
  this.color = color(random(80, 220));
  this.hunger_rate = 0.01;
  this.size = 10;
  this.speed = 50;
  
  this.draw = function() {
    noStroke();
    fill(this.color);
    ellipseMode(CENTER);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }
  
  this.update = function(pidgeons, crumbs) {
    var distance;
    var target_crumb;
    for (var i = 0; i < crumbs.length; i++) {
      var d = dist(this.location.x, this.location.y,
              crumbs[i].location.x, crumbs[i].location.y);
      if (distance == undefined) {
        distance = d;
        target_crumb = crumbs[i];
      }
      if (d <= distance) {
        distance = d;
        target_crumb = crumbs[i];
        if (distance < target_crumb.size
            && !target_crumb.flying) {
          target_crumb.split(crumbs);
        }
      }
    }
    
    var overlap = false;
    var newlocation = this.location.copy();
    
    if (target_crumb) {
      var direction = target_crumb.location.copy();
      direction.sub(this.location);
      direction.normalize(this.speed);
      newlocation.add(direction);
    } else {
      newlocation.x = random(-1, 1);
      newlocation.y = random(-1, 1);
      newlocation.normalize(this.speed);
      newlocation.add(this.location);
    }
    
    for (var i = 0; i < pidgeons.length; i++) {
      var overlap_dist = dist(newlocation.x,
        newlocation.y, pidgeons[i].location.x,
        pidgeons[i].location.y);
      if (overlap_dist < this.size
          && pidgeons[i] !== this) {
        overlap = true;
        break;
      }
    }
    
    if (!overlap) {
        this.location = newlocation;
      } else {
        this.location = newlocation;
        this.location.x += random(-5, 5);
        this.location.y += random(-5, 5);
      }
  }
}
