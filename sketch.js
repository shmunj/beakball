var pidgeons = [];
var pidgeon_number = 100;
var crumbs = [];

function setup() {
  createCanvas(800, 600);
  for (var i = 0; i < pidgeon_number; i++) {
    pidgeons[i] = new Pidgeon();
  }
}

function draw() {
  background(51);
  for (var i = 0; i < pidgeons.length; i++) {
    pidgeons[i].update(pidgeons, crumbs);
    pidgeons[i].draw();
  }
  for (var i = 0; i < crumbs.length; i++) {
    crumbs[i].draw();
  }
}

function mousePressed() {
  var crumbsize = random(2, 50);
  var location = createVector(mouseX, mouseY);
  crumbs.push(new Crumb(location, crumbsize));
}
