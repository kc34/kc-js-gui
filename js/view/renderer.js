function Renderer() {}

Renderer.renderObject = function(ctx, obj, offsetX, offsetY) {
  obj.draw(ctx, offsetX, offsetY);
}
