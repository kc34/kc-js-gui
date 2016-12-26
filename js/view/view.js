// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  (function() {
    return "use strict";
  });

  this.View = (function(superClass) {
    extend(View, superClass);

    function View(model) {
      View.__super__.constructor.call(this, document.getElementById("myCanvas"));
      this.color = "#CCCCCC";
      this.exampleMainScreen = new ((function(superClass1) {
        extend(_Class, superClass1);

        function _Class(x, y, width, height) {
          var instance;
          _Class.__super__.constructor.call(this, x, y, width, height);
          this.color = "#FF0000";
          this.exampleTopBar = new Panel(0, 0, window.innerWidth, 100);
          this.exampleTopBar.color = "#33AA66";
          this.addComponent("exampleTopBar", this.exampleTopBar);
          this.exampleSideMenu = new ((function(superClass2) {
            extend(_Class, superClass2);

            function _Class(x, y, width, height) {
              _Class.__super__.constructor.call(this, x, y, width, height);
              this.color = "#808080";
              this.exampleButton = new ((function(superClass3) {
                extend(_Class, superClass3);

                function _Class() {
                  return _Class.__super__.constructor.apply(this, arguments);
                }

                _Class.prototype.clickHandler = function() {
                  return this.parentComponent.buttonClickEvent();
                };

                return _Class;

              })(Panel))(10, 10, 80, 80);
              this.addComponent("exampleButton", this.exampleButton);
            }

            _Class.prototype.preprocess = function() {
              return this.components["exampleButton"].setWindow(this.width * 0.1, this.width * 0.1, this.width * 0.8, this.width * 0.8);
            };

            _Class.prototype.buttonClickEvent = function() {
              return this.parentComponent.buttonClickEvent();
            };

            return _Class;

          })(Panel))(0, 100, 100, window.innerHeight);
          this.addComponent("exampleSideMenu", this.exampleSideMenu);
          this.exampleCanvas = new ((function(superClass2) {
            extend(_Class, superClass2);

            function _Class(x, y, width, height) {
              _Class.__super__.constructor.call(this, x, y, width, height);
              this.color = "#334D66";
              this.text = "Hello I am text.";
            }

            _Class.prototype.postprocess = function(ctx, offsetX, offsetY) {
              var ball, i, len, ref, results;
              ctx.fillStyle = "#FFFFFF";
              ctx.fillText("Mini-canvas text: " + this.text, 100 + offsetX, 100 + offsetY);
              ref = model.balls;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                ball = ref[i];
                results.push(Renderer.renderBall(ctx, ball, offsetX, offsetY));
              }
              return results;
            };

            return _Class;

          })(Panel))(100, 100, window.innerWidth, window.innerHeight);
          this.addComponent("exampleCanvas", this.exampleCanvas);
          this.examplePopup = new ((function(superClass2) {
            extend(_Class, superClass2);

            function _Class(x, y, width, height) {
              _Class.__super__.constructor.call(this, x, y, width, height);
              this.color = "#FF0000";
              this.z_index = 500;
            }

            _Class.prototype.clickHandler = function() {
              console.log("Ow");
              return this.z_index = -500;
            };

            _Class.prototype.postprocess = function(ctx, offsetX, offsetY) {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillText("Hello!", offsetX, 10 + offsetY);
              ctx.fillText("I am at the top of the screen.", offsetX, 20 + offsetY);
              return ctx.fillText("Click me to drop my z-index.", offsetX, 30 + offsetY);
            };

            return _Class;

          })(Panel))(100, 50, 100, 100);
          this.addComponent("examplePopup", this.examplePopup);
          instance = this;
          this.exampleSideMenu.exampleButton.clickHandler = function() {
            console.log(instance);
            console.log("I'm hit!");
            model.balls.push({
              "x": 5,
              "y": 5
            });
            return instance.exampleCanvas.text = "You clicked the button!";
          };
        }

        _Class.prototype.preprocess = function(renderer, offsetX, offsetY) {
          this.exampleTopBar.setWindow(0, 0, this.width, this.height * 0.1);
          this.exampleSideMenu.setWindow(0, this.height * 0.1, this.width * 0.1, this.height * 0.9);
          return this.exampleCanvas.setWindow(this.width * 0.1, this.height * 0.1, this.width * 0.9, this.height * 0.9);
        };

        return _Class;

      })(Panel))(0, 0, window.innerWidth, window.innerHeight);
      this.addComponent("exampleMainScreen", this.exampleMainScreen);
    }

    View.prototype.preprocess = function(ctx, offsetX, offsetY) {

      /*
        Defaults to 1920 by 1080 with at least x% margins.
       */
      var margins;
      margins = 0.00;
      if (this.width * 1.0 / this.height > 1920 / 1080) {
        this.exampleMainScreen.y = this.height * margins;
        this.exampleMainScreen.height = this.height * (1 - 2 * margins);
        this.exampleMainScreen.x = (this.width - this.height / 1080 * 1920 * (1 - 2 * margins)) * 0.5;
        return this.exampleMainScreen.width = this.height / 1080 * 1920 * (1 - 2 * margins);
      } else {
        this.exampleMainScreen.x = this.width * margins;
        this.exampleMainScreen.width = this.width * (1 - 2 * margins);
        this.exampleMainScreen.y = (this.height - this.width / 1920 * 1080 * (1 - 2 * margins)) * 0.5;
        return this.exampleMainScreen.height = this.width / 1920 * 1080 * (1 - 2 * margins);
      }
    };

    return View;

  })(this.CanvasPanel);

}).call(this);
