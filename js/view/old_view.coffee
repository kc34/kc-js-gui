->
  "use strict"
class @View extends @CanvasPanel
  constructor: (model) ->
    super(document.getElementById("myCanvas"))
    @color = "#CCCCCC"
    @exampleMainScreen = new Panel(0, 0, window.innerWidth, window.innerHeight)
    @exampleMainScreen.color = "#FF0000"
    #
    exampleTopBar = new Panel(0, 0, window.innerWidth, 100)
    exampleTopBar.color = "#33AA66"
    @exampleMainScreen.addComponent("exampleTopBar", exampleTopBar)
    #
    exampleSideMenu = new Panel(0, 100, 100, window.innerHeight)
    exampleSideMenu.color = "#808080"
    #
    exampleButton = new Panel(10, 10, 80, 80)
    exampleButton.clickHandler = () ->
      console.log("I'm hit!");
      exampleCanvas.text = "You clicked the button!";
      model.balls.push({"x" : 5, "y" : 5});
    #
    exampleSideMenu.addComponent("exampleButton", exampleButton)
    #
    exampleSideMenu.preprocess = () ->
      this.components["exampleButton"].setWindow(this.width * 0.1, this.width * 0.1, this.width * 0.8, this.width * 0.8)
    @exampleMainScreen.addComponent("exampleSideMenu", exampleSideMenu)
    #
    exampleCanvas = new Panel(100, 100, window.innerWidth, window.innerHeight)
    exampleCanvas.color = "#334D66"
    exampleCanvas.text = "Hello I am text."
    exampleCanvas.postprocess = (ctx, offsetX, offsetY) ->
      ctx.fillStyle = "#FFFFFF"
      ctx.fillText("Mini-canvas text: " + this.text, 100 + offsetX, 100 + offsetY)
      for ball in model.balls
        Renderer.renderBall(ctx, ball, offsetX, offsetY)
    #
    @exampleMainScreen.addComponent("exampleCanvas", exampleCanvas)
    examplePopup = new Panel(100, 50, 100, 100)
    examplePopup.color = "#FF0000"
    examplePopup.z_index = 500
    examplePopup.clickHandler = () ->
      console.log("Ow")
      this.z_index = -500
    examplePopup.postprocess = (ctx, offsetX, offsetY) ->
      ctx.fillStyle = "#FFFFFF"
      ctx.fillText("Hello!", offsetX, 10 + offsetY)
      ctx.fillText("I am at the top of the screen.", offsetX, 20 + offsetY)
      ctx.fillText("Click me to drop my z-index.", offsetX, 30 + offsetY)
    @exampleMainScreen.addComponent("examplePopup", examplePopup)
    #
    @exampleMainScreen.preprocess = (renderer, offsetX, offsetY) ->
      this.components["exampleTopBar"].setWindow(0, 0, this.width, this.height * 0.1)
      this.components["exampleSideMenu"].setWindow(0, this.height * 0.1, this.width * 0.1, this.height * 0.9)
      this.components["exampleCanvas"].setWindow(this.width * 0.1, this.height * 0.1, this.width * 0.9, this.height * 0.9)
    this.addComponent("exampleMainScreen", @exampleMainScreen)
  preprocess: (ctx, offsetX, offsetY) ->
    ###
      Defaults to 1920 by 1080 with at least x% margins.
    ###
    margins = 0.00;
    # What's the limiting factor?
    if (this.width * 1.0 / this.height > 1920 / 1080)
      # Wider. Capped on height.
      @exampleMainScreen.y = this.height * margins;
      @exampleMainScreen.height = this.height * (1 - 2 * margins);
      @exampleMainScreen.x = (this.width - this.height / 1080 * 1920 * (1 - 2 * margins)) * 0.5;
      @exampleMainScreen.width = this.height / 1080 * 1920 * (1 - 2 * margins);
    else
      # Taller. Capped on width.
      @exampleMainScreen.x = this.width * margins;
      @exampleMainScreen.width = this.width * (1 - 2 * margins);
      @exampleMainScreen.y = (this.height - this.width / 1920 * 1080 * (1 - 2 * margins)) * 0.5;
      @exampleMainScreen.height = this.width / 1920 * 1080 * (1 - 2 * margins);
