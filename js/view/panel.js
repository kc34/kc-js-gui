"use strict";
/**
 *
 */

/**
 * Basic GUI structure. Can contain other Panels.
 *
 * Configure its draw() and clickHandler()!
 */
function Panel(x, y, width, height) {
  this.type = "PANEL";
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = "#000000"
  this.components = {};
}

/**
 * The main drawing function. Contains space for pre- and post-processing.
 */
Panel.prototype.draw = function(renderer, offsetX, offsetY) {
  this.preprocess(renderer, offsetX, offsetY);
  renderer.ctx.fillStyle = this.color;
  renderer.ctx.fillRect(offsetX, offsetY, this.width, this.height);
  this.drawComponents(offsetX, offsetY);
  this.postprocess(renderer, offsetX, offsetY);
}

Panel.prototype.preprocess = function(renderer, offsetX, offsetY) {};
Panel.prototype.postprocess = function(renderer, offsetX, offsetY) {};

Panel.prototype.drawComponents = function(offsetX, offsetY) {
  for (var componentIdx in this.components) {
    renderer.renderPanel(this.components[componentIdx], offsetX, offsetY);
  }
}

/**
 * Given a point, returns whether point is on this panel.
 *
 * Example: Panel(0, 0, 2, 2):
 *  (1, 1) -> true
 *  (3, 3) -> false
 */
Panel.prototype.containsPoint = function(point) {
  return ((this.x <= point.x && point.x <= this.x + this.width)
          && (this.y <= point.y && point.y <= this.y + this.height));
}

/**
 * Given a click, delegates to all of its components.
 */
Panel.prototype.clickHandler = function(event) {
  var relativeEvent = Vector.fromComponents(event.x - this.x, event.y - this.y);
  console.log(relativeEvent)
  for (var componentIdx in this.components) {
    if (this.components[componentIdx].containsPoint(relativeEvent)) {
      this.components[componentIdx].clickHandler(relativeEvent);
    }
  }
}

/**
 * Add components
 */
Panel.prototype.addComponent = function(name, component) {
  this.components[name] = component;
}

/**
 * Setter function for the window size and position.
 */
Panel.prototype.setWindow = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
