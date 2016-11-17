function Panel(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = "#000000"
  this.components = [];
}

Panel.prototype.draw = function(ctx, offsetX, offsetY) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x + offsetX, this.y + offsetY, this.width, this.height);
  for (componentIdx in this.components) {
    Renderer.renderObject(ctx, this.components[componentIdx], this.x, this.y);
  }
}

Panel.prototype.containsPoint = function(point) {
  return ((this.x <= point.x && point.x <= this.x + this.width)
          && (this.y <= point.y && point.y <= this.y + this.height));
}

Panel.prototype.clickHandler = function(event) {
  relativeEvent = Vector.fromComponents(event.x - this.x, event.y - this.y);
  for (componentIdx in this.components) {
    if (this.components[panelID].containsPoint(relativeEvent)) {
      this.components[panelID].clickHandler(relativeEvent);
    }
  }
}
