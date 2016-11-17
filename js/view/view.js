function View(model) {
  /**
	 * Canvas creation!
	 */
	this.canvas = document.getElementById("myCanvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.canvas.onmousedown = function(){ return false; };
	this.ctx = this.canvas.getContext("2d");

  this.panels = [];

  exampleMenu = new Panel(100, 100, 100, 100)
  exampleMenu.color = "#808080";

  exampleButton = new Button(10, 10, 10, 10)

  exampleMenu.components.push(exampleButton);
  this.panels.push(exampleMenu);
}

View.prototype.draw = function() {
  for (panelID in this.panels) {
    Renderer.renderObject(this.ctx, this.panels[panelID], 0, 0);
  }
}

View.prototype.clickHandler = function(event) {
  // Put the event into a nice vector.
  for (panelID in this.panels) {
    if (this.panels[panelID].containsPoint(event)) {
      this.panels[panelID].clickHandler(event);
    }
  }
}
