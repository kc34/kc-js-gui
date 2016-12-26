->
  "use strict"
# A primitive GUI. Uses anonymous classes.
# View
# - MainScreen
#   - TopBar
#   - SideMenu
#     - Button
#   - Canvas
#   - Popup
# Scoping is fun, but having the Button communicate with the Canvas is a headache!
class @View extends @CanvasPanel
  constructor: (model) ->
    super(document.getElementById("myCanvas"))
    @color = "#CCCCCC"
    @exampleMainScreen = new (class extends Panel
      constructor: (x, y, width, height) ->
        super(x, y, width, height)
        @color = "#FF0000"
        @exampleTopBar = new Panel(0, 0, window.innerWidth, 100)
        @exampleTopBar.color = "#33AA66"
        @addComponent("exampleTopBar", @exampleTopBar)
        @exampleSideMenu = new (class extends Panel
          constructor: (x, y, width, height) ->
            super(x, y, width, height)
            @color = "#808080"
            @exampleButton = new (class extends Panel
              clickHandler: () ->
                this.parentComponent.buttonClickEvent()
            )(10, 10, 80, 80)
            this.addComponent("exampleButton", @exampleButton)
          preprocess: () ->
            this.components["exampleButton"].setWindow(this.width * 0.1, this.width * 0.1, this.width * 0.8, this.width * 0.8)
          buttonClickEvent: () ->
            this.parentComponent.buttonClickEvent()
        )(0, 100, 100, window.innerHeight)
        this.addComponent("exampleSideMenu", @exampleSideMenu)
        @exampleCanvas = new (class extends Panel
          constructor: (x, y, width, height) ->
            super(x, y, width, height)
            @color = "#334D66"
            @text = "Hello I am text."
          postprocess: (ctx, offsetX, offsetY) ->
            ctx.fillStyle = "#FFFFFF"
            ctx.fillText("Mini-canvas text: " + this.text, 100 + offsetX, 100 + offsetY)
            for ball in model.balls
              Renderer.renderBall(ctx, ball, offsetX, offsetY)
        )(100, 100, window.innerWidth, window.innerHeight)
        this.addComponent("exampleCanvas", @exampleCanvas)
        @examplePopup = new (class extends Panel
          constructor: (x, y, width, height) ->
            super(x, y, width, height)
            @color = "#FF0000"
            @z_index = 500
          clickHandler: () ->
            console.log("Ow")
            this.z_index = -500
          postprocess: (ctx, offsetX, offsetY) ->
            ctx.fillStyle = "#FFFFFF"
            ctx.fillText("Hello!", offsetX, 10 + offsetY)
            ctx.fillText("I am at the top of the screen.", offsetX, 20 + offsetY)
            ctx.fillText("Click me to drop my z-index.", offsetX, 30 + offsetY)
        )(100, 50, 100, 100)
        this.addComponent("examplePopup", @examplePopup)
        instance = this
        this.exampleSideMenu.exampleButton.clickHandler = () ->
          console.log(instance)
          console.log("I'm hit!");
          model.balls.push({"x" : 5, "y" : 5});
          instance.exampleCanvas.text = "You clicked the button!";
      preprocess: (renderer, offsetX, offsetY) ->
        @exampleTopBar.setWindow(0, 0, this.width, this.height * 0.1)
        @exampleSideMenu.setWindow(0, this.height * 0.1, this.width * 0.1, this.height * 0.9)
        @exampleCanvas.setWindow(this.width * 0.1, this.height * 0.1, this.width * 0.9, this.height * 0.9)
    )(0, 0, window.innerWidth, window.innerHeight)
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
