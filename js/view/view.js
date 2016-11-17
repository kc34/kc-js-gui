"use strict";
function View(model) {
  Panel.call(this, 0, 0, window.innerWidth, window.innerHeight);
  this.color = "#CCCCCC";

  var exampleMainScreen = new Panel(100, 100, window.innerWidth, window.innerHeight);
  exampleMainScreen.color = "#FF0000";

  var exampleTopBar = new Panel(0, 0, window.innerWidth, 100);
  exampleTopBar.color = "#33AA66";

  exampleMainScreen.addComponent("exampleTopBar", exampleTopBar);

  var exampleSideMenu = new Panel(0, 100, 100, window.innerHeight);
  exampleSideMenu.color = "#808080";

  var exampleButton = new Panel(10, 10, 80, 80)
  exampleButton.clickHandler = function() {
    console.log("I'm hit!");
    exampleCanvas.text = "You clicked the button!";
  }

  exampleSideMenu.addComponent("exampleButton", exampleButton);
  exampleMainScreen.addComponent("exampleSideMenu", exampleSideMenu);

  var exampleCanvas = new Panel(100, 100, window.innerWidth, window.innerHeight);
  exampleCanvas.color = "#334D66";
  exampleCanvas.text = "Hello I am text.";
  exampleCanvas.postprocess = function(renderer, offsetX, offsetY) {
    renderer.ctx.fillStyle = "#FFFFFF";
    renderer.ctx.fillText("Mini-canvas text: " + this.text, 50 + offsetX, 50 + offsetY);
  }

  exampleMainScreen.addComponent("exampleCanvas", exampleCanvas);
  exampleMainScreen.preprocess = function(renderer, offsetX, offsetY) {
    this.components["exampleTopBar"].setWindow(0, 0, this.width, 100);
    this.components["exampleSideMenu"].setWindow(0, 100, 100, this.height - 100);
    this.components["exampleCanvas"].setWindow(100, 100, this.width - 100, this.height - 100);
  }
  this.addComponent("exampleMainScreen", exampleMainScreen);

  console.log(Object.create(Panel.prototype));

}

View.prototype = Object.create(Panel.prototype);


View.prototype.preprocess = function(renderer, offsetX, offsetY) {
  /**
   * This menu just takes up the whole screen.
   */
  this.x = 0;
  this.y = 0;
  this.width = window.innerWidth;
  this.height = window.innerHeight;

  /**
   * Defaults to 1920 by 1080 with at least 2% margins.
   */
  // What's the limiting factor?
  if (this.width * 1.0 / this.height > 1920 / 1080) {
    // Wider. Capped on height.
    this.components["exampleMainScreen"].y = this.height * 0.02;
    this.components["exampleMainScreen"].height = this.height * 0.96;
    this.components["exampleMainScreen"].x = this.width * 0.5 - (this.height / 1080 * 1920 * 0.96) * 0.5;
    this.components["exampleMainScreen"].width = this.height / 1080 * 1920 * 0.96;
  } else {
    // Taller. Capped on width.
    this.components["exampleMainScreen"].x = this.width * 0.02;
    this.components["exampleMainScreen"].width = this.width * 0.96;
    this.components["exampleMainScreen"].y = this.height * 0.5 - (this.width / 1920 * 1080 * 0.96) * 0.5;
    this.components["exampleMainScreen"].height = this.width / 1920 * 1080 * 0.96;
  }
}
