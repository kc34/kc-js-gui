"use strict";
var Renderer = function() {
  this.canvas = document.getElementById("myCanvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.canvas.onmousedown = function(){ return false; };
  this.ctx = this.canvas.getContext("2d");
}

Renderer.prototype.renderObject = function(obj, offsetX, offsetY) {
  obj.draw(this, obj.x + offsetX, obj.y + offsetY);
}
