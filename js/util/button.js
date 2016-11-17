function Button(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = "#000000"
}

Button.prototype.draw = function(ctx, offsetX, offsetY) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x + offsetX, this.y + offsetY, this.width, this.height);
}

Button.prototype.containsPoint = function(point) {
  return ((this.x <= point.x && point.x <= this.x + this.width)
          && (this.y <= point.y && point.y <= this.y + this.height));
}

Button.prototype.clickHandler = function(event) {
  console.log("I'm hit!");
}
