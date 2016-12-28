->
  "use strict"
# Panel 0.1.3.2
# By Kevin Chang
# + touchevents have own delegators
# TODO:
# + Focus to know where to send key events
# + Consider consolidating mouse and touch into pointer events

class @Panel
  # Basic GUI structure. Can contain other Panels.
  # Configure its draw() and clickHandler()!
  constructor: (x, y, width, height) ->
    @type = "PANEL"
    @x = x
    @y = y
    @width = width
    @height = height
    @color = "#000000"
    @parentComponent = null
    @components = []
    @zIndex = 0 # Inspired by CSS. Higher number means it will be up front.
  # The main drawing function. Contains space for pre- and post-processing.
  draw: (ctx, windowX, windowY) ->
    @preprocess(ctx, windowX, windowY)
    @drawPanel(ctx, windowX, windowY)
    @postprocess(ctx, windowX, windowY)
    sorted = @components.sort((obj1, obj2) -> obj1.zIndex - obj2.zIndex) # sorts-by-ascending
    obj.draw(ctx, windowX + obj.x, windowY + obj.y) for obj in sorted
  # Draws itself onto the given context.
  drawPanel: (ctx, windowX, windowY) ->
    ctx.fillStyle = @color
    ctx.fillRect(windowX, windowY, @width, @height)
  # Useful for resizing. Defaults to no-op.
  preprocess: (ctx, windowX, windowY) ->
  # Useful for drawing non-panel objects. Defaults to no-op.
  postprocess: (ctx, windowX, windowY) ->
  # Given a point, returns whether point is on this panel.
  #
  # Example: Panel(0, 0, 2, 2):
  # (1, 1) -> true
  # (3, 3) -> false
  containsPoint: (point) -> ((@x <= point.clientX && point.clientX <= @x + @width) && (@y <= point.clientY && point.clientY <= @y + @height))
  runOnTopComponent: (mouseEvent, eventHandler) ->
    return @components
      .filter((panel) -> panel.containsPoint(mouseEvent)) # Removes unclicked ones
      .sort((panel1, panel2) -> -1 * (panel1.zIndex - panel2.zIndex)) # Sorts descending
      .slice(0, 1)
      .forEach(eventHandler);
  # Given a click, delegates to its top component
  clickHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.clickHandler(component.translateEvent(event)))
  mousedownHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mousedownHandler(component.translateEvent(event)))
  mouseupHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mouseupHandler(component.translateEvent(event)))
  mousemoveHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mousemoveHandler(component.translateEvent(event)))
  mousewheelHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mousewheelHandler(component.translateEvent(event)))
  touchstartHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.touchstartHandler(component.translateEvent(event)))
  touchmoveHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.touchmoveHandler(component.translateEvent(event)))
  touchendHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.touchendHandler(component.translateEvent(event)))
  translateEvent: (event) ->
    newEvent = {}
    for key, val in event
      newEvent[key] = val
    newEvent.clientX = event.clientX - @x
    newEvent.clientY = event.clientY - @y
    return newEvent
  keydownHandler: (key) ->
    (panel.keydownHandler(key) for panel in this.components)
  # Add components
  addComponent: (component) ->
    @components.push(component)
    @components.parentComponent = this
  # Setter function for the window size and position
  setWindow: (x, y, width, height) ->
    @x = x
    @y = y
    @width = width
    @height = height

class @CanvasPanel extends @Panel
  # The MainPanel is a special Panel that has access to the canvas
  # GUI hierarchies should start with a MainPanel.
  constructor: (canvas) ->
    @canvas = canvas
    @canvas.width = window.innerWidth;
    @canvas.height = window.innerHeight;
    super(0, 0, @canvas.width, @canvas.height)
    @canvas.onmousedown = -> false
    @ctx = @canvas.getContext("2d");
    copyEvent = () ->
      newEvent = {}
      for key, val of event
        newEvent[key] = val
      return newEvent
    instance = this
    @canvas.addEventListener('click', ((event) -> instance.clickHandler(event)), false)
    @canvas.addEventListener('mousedown', ((event) -> instance.mousedownHandler(event)), false)
    @canvas.addEventListener('mouseup', ((event) -> instance.mouseupHandler(event)), false)
    @canvas.addEventListener('mousemove', ((event) -> instance.mousemoveHandler(event)), false)
    @canvas.addEventListener('mousewheel', ((event) -> instance.mousewheelHandler(event)), false)
    @canvas.addEventListener("DOMMouseScroll",
      ((event) -> instance.mousewheelHandler({
        clientX : event.clientX,
        clientY : event.clientY,
        wheelDelta : event.detail * -1
        })),
      false);
    @canvas.addEventListener('touchstart', (event) ->
      event.preventDefault() # not a click!
      instance.mousedownHandler(touchEvent) for touchEvent in event.changedTouches
    )
    @canvas.addEventListener('touchmove', (event) ->
      event.preventDefault()
      instance.mousemoveHandler(touchEvent) for touchEvent in event.changedTouches
    )
    @canvas.addEventListener('touchend', (event) ->
      event.preventDefault()
      instance.clickHandler(touchEvent) for touchEvent in event.changedTouches
    )
  # Specialized draw used to start GUI hierarchies
  draw: () ->
    @setWindow(0, 0, window.innerWidth, window.innerHeight)
    @canvas.width = window.innerWidth
    @canvas.height = window.innerHeight
    Panel::draw.call(this, this.ctx, 0, 0)
