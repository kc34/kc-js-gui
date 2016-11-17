function View(model) {
  Panel.call(this, 0, 0, window.innerWidth, window.innerHeight);
  this.color = "#FFFFFF";

  exampleTopBar = new Panel(0, 0, window.innerWidth, 100);
  exampleTopBar.color = "#33AA66";

  this.components.push(exampleTopBar);

  exampleSideMenu = new Panel(0, 100, 100, window.innerHeight);
  exampleSideMenu.color = "#808080";

  exampleButton = new Panel(10, 10, 80, 80)
  exampleButton.clickHandler = function() {
    console.log("I'm hit!");
    exampleCanvas.text = "You clicked the button!";
  }

  exampleSideMenu.components.push(exampleButton);
  this.components.push(exampleSideMenu);

  exampleCanvas = new Panel(100, 100, window.innerWidth, window.innerHeight);
  exampleCanvas.color = "#334D66";
  exampleCanvas.text = "Hello I am text.";
  exampleCanvas.postprocess = function(renderer, offsetX, offsetY) {
    renderer.ctx.fillStyle = "#FFFFFF";
    renderer.ctx.fillText("Mini-canvas text: " + this.text, 50 + this.x + offsetX, 50 + this.y + offsetY);
  }

  this.components.push(exampleCanvas);

  console.log(Object.create(Panel.prototype));

}

View.prototype = Object.create(Panel.prototype);
