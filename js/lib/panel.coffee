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
    @components = {}
    @z_index = 0 # Inspired by CSS. Higher number means it will be up front.
  # The main drawing function. Contains space for pre- and post-processing.
  draw: (ctx, windowX, windowY) ->
    @preprocess(ctx, windowX, windowY)
    @drawPanel(ctx, windowX, windowY)
    @postprocess(ctx, windowX, windowY)
    sorted = (val for key, val of @components)
      .sort((obj1, obj2) -> obj1.z_index - obj2.z_index) # sorts-by-ascending
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
  @containsPoint: (panel, point) -> ((panel.x <= point.clientX && point.clientX <= panel.x + panel.width) && (panel.y <= point.clientY && point.clientY <= panel.y + panel.height))
  runOnTopComponent: (mouseEvent, eventHandler) ->
    return Object.keys(this.components) # Gets keys
      .map(((key) -> this.components[key]), this) # Gets panel references
      .filter((panel) -> Panel.containsPoint(panel, mouseEvent)) # Removes unclicked ones
      .sort((panel1, panel2) -> -1 * (panel1.z_index - panel2.z_index)) # Sorts descending
      .slice(0, 1)
      .forEach(eventHandler);
  # Given a click, delegates to its top component
  clickHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.clickHandler({
        clientX: event.clientX - component.x
        clientY: event.clientY - component.y
        }))
  mousedownHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mousedownHandler({
        clientX: event.clientX - component.x
        clientY: event.clientY - component.y
        }))
  mouseupHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mouseupHandler({
        clientX: event.clientX - component.x
        clientY: event.clientY - component.y
        }))
  mousemoveHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mousemoveHandler({
        clientX: event.clientX - component.x
        clientY: event.clientY - component.y
        }))
  mousewheelHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.mousewheelHandler({
        clientX: event.clientX - component.x
        clientY: event.clientY - component.y
        wheelDelta: event.wheelDelta
        }))
  touchstartHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.touchstartHandler({
        clientX : event.clientX - component.x
        clientY : event.clientY - component.y
        identifier : event.identifier
        }))
  touchmoveHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.touchmoveHandler({
        clientX : event.clientX - component.x
        clientY : event.clientY - component.y
        identifier : event.identifier
        }))
  touchendHandler: (event) ->
    @runOnTopComponent(event, (component) ->
      component.touchendHandler({
        clientX : event.clientX - component.x
        clientY : event.clientY - component.y
        identifier : event.identifier
        }))
  keydownHandler: (key) ->
    (panel.keydownHandler(key) for panel in (this.components[key] for key in Object.keys(this.components)))
  # Add components
  addComponent: (name, component) ->
    @components[name] = component
    @components[name].parentComponent = this
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
    super(0, 0, @canvas.width, @canvas.height)
    @canvas = canvas;
    @canvas.width = window.innerWidth;
    @canvas.height = window.innerHeight;
    @canvas.onmousedown = -> false
    @ctx = @canvas.getContext("2d");
    instance = this
    @canvas.addEventListener('click', ((event) -> instance.clickHandler(event)), false)
    @canvas.addEventListener('mousedown', ((event) -> instance.mousedownHandler(event)), false)
    @canvas.addEventListener('mouseup', ((event) -> instance.mouseupHandler(event)), false)
    @canvas.addEventListener('mousemove', ((event) -> instance.mousemoveHandler(event)), false)
    @canvas.addEventListener('mousewheel', ((event) -> instance.mousewheelHandler(event)), false)
    @canvas.addEventListener(
      "DOMMouseScroll",
      ((event) -> instance.mousewheelHandler({
        clientX : event.clientX,
        clientY : event.clientY,
        wheelDelta : event.detail * -1
        })),
      false);
    @canvas.addEventListener('touchstart', (event) ->
      event.preventDefault() # not a click!
      instance.touchstartHandler(touchEvent) for touchEvent in event.changedTouches
    )
    @canvas.addEventListener('touchmove', (event) ->
      event.preventDefault()
      instance.touchmoveHandler(touchEvent) for touchEvent in event.changedTouches
    )
    @canvas.addEventListener('touchend', (event) ->
      event.preventDefault()
      instance.touchendHandler(touchEvent) for touchEvent in event.changedTouches
    )
  # Specialized draw used to start GUI hierarchies
  draw: () ->
    @setWindow(0, 0, window.innerWidth, window.innerHeight)
    @canvas.width = window.innerWidth
    @canvas.height = window.innerHeight
    Panel::draw.call(this, this.ctx, 0, 0)
