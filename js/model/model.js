/**
 *
 */
function Model(view) {
  this.balls = [];
  this.balls.push({"x" : 5, "y" : 5});
}

Model.prototype.update = function() {
  for (var ballIdx in this.balls) {
    this.balls[ballIdx].x += 1;
    this.balls[ballIdx].y += 1;
  }
}
