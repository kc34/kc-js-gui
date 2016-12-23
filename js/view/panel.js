// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  (function() {
    return "use strict";
  });

  this.Panel = (function() {
    function Panel(x, y, width, height) {
      this.type = "PANEL";
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = "#000000";
      this.parentComponent = null;
      this.components = {};
      this.z_index = 0;
    }

    Panel.prototype.draw = function(ctx, windowX, windowY) {
      var i, key, len, obj, results, sorted, val;
      this.preprocess(ctx, windowX, windowY);
      this.drawPanel(ctx, windowX, windowY);
      this.postprocess(ctx, windowX, windowY);
      sorted = ((function() {
        var ref, results;
        ref = this.components;
        results = [];
        for (key in ref) {
          val = ref[key];
          results.push(val);
        }
        return results;
      }).call(this)).sort(function(obj1, obj2) {
        return obj1.z_index - obj2.z_index;
      });
      results = [];
      for (i = 0, len = sorted.length; i < len; i++) {
        obj = sorted[i];
        results.push(obj.draw(ctx, windowX + obj.x, windowY + obj.y));
      }
      return results;
    };

    Panel.prototype.drawPanel = function(ctx, windowX, windowY) {
      ctx.fillStyle = this.color;
      return ctx.fillRect(windowX, windowY, this.width, this.height);
    };

    Panel.prototype.preprocess = function(ctx, windowX, windowY) {};

    Panel.prototype.postprocess = function(ctx, windowX, windowY) {};

    Panel.containsPoint = function(panel, point) {
      return (panel.x <= point.clientX && point.clientX <= panel.x + panel.width) && (panel.y <= point.clientY && point.clientY <= panel.y + panel.height);
    };

    Panel.prototype.runOnTopComponent = function(mouseEvent, eventHandler) {
      return Object.keys(this.components).map((function(key) {
        return this.components[key];
      }), this).filter(function(panel) {
        return Panel.containsPoint(panel, mouseEvent);
      }).sort(function(panel1, panel2) {
        return -1 * (panel1.z_index - panel2.z_index);
      }).slice(0, 1).forEach(eventHandler);
    };

    Panel.prototype.clickHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.clickHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y
        });
      });
    };

    Panel.prototype.mousedownHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.mousedownHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y
        });
      });
    };

    Panel.prototype.mouseupHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.mouseupHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y
        });
      });
    };

    Panel.prototype.mousemoveHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.mousemoveHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y
        });
      });
    };

    Panel.prototype.mousewheelHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.mousewheelHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y,
          wheelDelta: event.wheelDelta
        });
      });
    };

    Panel.prototype.touchstartHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.touchstartHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y,
          identifier: event.identifier
        });
      });
    };

    Panel.prototype.touchmoveHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.touchmoveHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y,
          identifier: event.identifier
        });
      });
    };

    Panel.prototype.touchendHandler = function(event) {
      return this.runOnTopComponent(event, function(component) {
        return component.touchendHandler({
          clientX: event.clientX - component.x,
          clientY: event.clientY - component.y,
          identifier: event.identifier
        });
      });
    };

    Panel.prototype.keydownHandler = function(key) {
      var i, len, panel, ref, results;
      ref = (function() {
        var j, len, ref, results1;
        ref = Object.keys(this.components);
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          key = ref[j];
          results1.push(this.components[key]);
        }
        return results1;
      }).call(this);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        panel = ref[i];
        results.push(panel.keydownHandler(key));
      }
      return results;
    };

    Panel.prototype.addComponent = function(name, component) {
      this.components[name] = component;
      return this.components[name].parent = this;
    };

    Panel.prototype.setWindow = function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      return this.height = height;
    };

    return Panel;

  })();

  this.ViewPanel = (function(superClass) {
    extend(ViewPanel, superClass);

    function ViewPanel(canvas) {
      var instance;
      this.canvas = canvas;
      ViewPanel.__super__.constructor.call(this, 0, 0, this.canvas.width, this.canvas.height);
      this.canvas = canvas;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.onmousedown = function() {
        return false;
      };
      this.ctx = this.canvas.getContext("2d");
      instance = this;
      this.canvas.addEventListener('click', (function(event) {
        return instance.clickHandler(event);
      }), false);
      this.canvas.addEventListener('mousedown', (function(event) {
        return instance.mousedownHandler(event);
      }), false);
      this.canvas.addEventListener('mouseup', (function(event) {
        return instance.mouseupHandler(event);
      }), false);
      this.canvas.addEventListener('mousemove', (function(event) {
        return instance.mousemoveHandler(event);
      }), false);
      this.canvas.addEventListener('mousewheel', (function(event) {
        return instance.mousewheelHandler(event);
      }), false);
      this.canvas.addEventListener("DOMMouseScroll", (function(event) {
        return instance.mousewheelHandler({
          clientX: event.clientX,
          clientY: event.clientY,
          wheelDelta: event.detail * -1
        });
      }), false);
      this.canvas.addEventListener('touchstart', function(event) {
        var i, len, ref, results, touchEvent;
        event.preventDefault();
        ref = event.changedTouches;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          touchEvent = ref[i];
          results.push(instance.touchstartHandler(touchEvent));
        }
        return results;
      });
      this.canvas.addEventListener('touchmove', function(event) {
        var i, len, ref, results, touchEvent;
        event.preventDefault();
        ref = event.changedTouches;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          touchEvent = ref[i];
          results.push(instance.touchmoveHandler(touchEvent));
        }
        return results;
      });
      this.canvas.addEventListener('touchend', function(event) {
        var i, len, ref, results, touchEvent;
        event.preventDefault();
        ref = event.changedTouches;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          touchEvent = ref[i];
          results.push(instance.touchendHandler(touchEvent));
        }
        return results;
      });
    }

    ViewPanel.prototype.draw = function() {
      this.setWindow(0, 0, window.innerWidth, window.innerHeight);
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      return Panel.prototype.draw.call(this, this.ctx, 0, 0);
    };

    return ViewPanel;

  })(this.Panel);

}).call(this);
