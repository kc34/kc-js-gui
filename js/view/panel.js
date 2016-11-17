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
Panel.prototype.draw = function(ctx, windowX, windowY) {
  this.preprocess(ctx, windowX, windowY);
  ctx.fillStyle = this.color;
  ctx.fillRect(windowX, windowY, this.width, this.height);

  for (var componentIdx in this.components) {
    var obj = this.components[componentIdx];
    obj.draw(ctx, windowX + obj.x, windowY + obj.y);
  }

  this.postprocess(ctx, windowX, windowY);
}

/**
 * Useful for resizing. Defaults to no-op.
 */
Panel.prototype.preprocess = function(ctx, windowX, windowY) {};

/**
 * Useful for drawing non-panel objects. Defaults to no-op.
 */
Panel.prototype.postprocess = function(ctx, windowX, windowY) {};

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

/**
 * The MainPanel is a special Panel that has access to the canvas.
 *
 * GUI hierarchies should start with a MainPanel.
 */
function MainPanel() {
  Panel.call(this, 0, 0, window.innerWidth, window.innerHeight);

  this.canvas = document.getElementById("myCanvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.canvas.onmousedown = function(){ return false; };
  this.ctx = this.canvas.getContext("2d");
}

MainPanel.prototype = Object.create(Panel.prototype);

/**
 * Specialized draw used to start GUI hierarcies.
 */
MainPanel.prototype.draw = function() {
  Panel.prototype.draw.call(this, this.ctx, 0, 0);
}

/**
 * Default window setter. Sets this panel to take up all available space.
 */
MainPanel.prototype.preprocess = function() {
  this.setWindow(0, 0, window.innerWidth, window.innerHeight);
}
