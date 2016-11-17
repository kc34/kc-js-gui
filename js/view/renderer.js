"use strict";
var Renderer = function() {}

Renderer.renderBall = function(ctx, obj, windowX, windowY) {
  ctx.fillRect(obj.x + windowX, obj.y + windowY, 5, 5);
}
