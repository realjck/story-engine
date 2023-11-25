// ScrollContainer +
// Original version: https://github.com/ryohey/EaselJS-ScrollContainer
//
// VERSION + by JCK:
// --> **IE11 FIX**
// --> adds option to change scroll_bar_size
// --> adds option to choose vertical or horizontal orientation
// --> adds touch control (drag content to scroll, also works with mouse)
// --> dissociates mouse-wheel control in case of several scoll-container on the same page
// --> adds 'is_moving' public property to know if the user is sliding a pane (useful to avoid clicking on elements from a pane that contains interactive elements when scrolling it)

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// ScrollContainer +
// Original version: https://github.com/ryohey/EaselJS-ScrollContainer
//
// VERSION + by JCK:
// --> adds option to change scroll_bar_size
// --> adds option to choose vertical or horizontal orientation
// --> adds touch control (drag content to scroll, also works with mouse)
// --> dissociates mouse-wheel control in case of several scoll-container on the same page
// --> adds 'is_moving' public property to know if the user is sliding a pane (useful to avoid clicking on elements from a pane that contains interactive elements when scrolling it)
(function () {
  "use strict"; // default browser scroll bar width

  var scroll_bar_size = 25;
  var BAR_COLOR = "rgba(241, 241, 241, 0.5)";
  var ARROW_COLOR = "rgb(80, 80, 80)";
  var ARROW_DISABLED_COLOR = "rgb(163, 163, 163)";
  var ARROW_HILIGHT = "#fff";
  var ARROWBG_HOVER_COLOR = "#d2d2d2";
  var ARROWBG_ACTIVE_COLOR = "#787878";
  var HANDLE_COLOR = "rgba(255, 255, 255, 0.8)";
  var HANDLE_HOVER_COLOR = "rgba(255, 255, 255, 0.8)";
  var HANDLE_ACTIVE_COLOR = "rgba(255, 255, 255, 0.8)";
  var UNIT_INCREMENT = 120;
  var BLOCK_INCREMENT = 240;
  var ScrollBarOrientaion = {
    HORIZONTAL: 0,
    VERTICAL: 1
  };
  var user_orientation;
  var mc_ref = canvas;
  var ButtonState = {
    NORMAL: 0,
    HOVER: 1,
    ACTIVE: 2,
    DISABLE: 3
  };

  var ShapeButton =
  /*#__PURE__*/
  function (_createjs$Shape) {
    _inherits(ShapeButton, _createjs$Shape);

    function ShapeButton() {
      var _this;

      _classCallCheck(this, ShapeButton);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ShapeButton).call(this));

      _this.setBounds(0, 0, 0, 0);

      _this._state = ButtonState.NORMAL;
      _this._enable = true;
      _this.foregroundColors = ["red", "green", "yellow", "blue"];
      _this.backgroundColors = ["blue", "red", "green", "yellow"];

      _this.on("mouseover", function (e) {
        _this.state = ButtonState.HOVER;
      });

      _this.on("mouseout", function (e) {
        _this.state = ButtonState.NORMAL;
      });

      _this.on("mousedown", function (e) {
        _this.state = ButtonState.ACTIVE;
      });

      _this.on("pressup", function (e) {
        _this.state = e.target.hitTest(e.localX, e.localY) ? ButtonState.HOVER : ButtonState.NORMAL;
      });

      return _this;
    }

    _createClass(ShapeButton, [{
      key: "redraw",
      value: function redraw() {
        this.graphics.clear().beginFill(this.backgroundColors[this.state]).rect(0, 0, this.getBounds().width, this.getBounds().height);
        this.drawForeground(this.foregroundColors[this.state]);
      }
    }, {
      key: "drawForeground",
      value: function drawForeground(color) {// override
      }
    }, {
      key: "setForegroundColor",
      value: function setForegroundColor(state, color) {
        this.foregroundColors[state] = color;
        this.redraw();
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(state, color) {
        this.backgroundColors[state] = color;
        this.redraw();
      }
    }, {
      key: "enable",
      set: function set(enable) {
        this._enable = enable;
        this.state = this._state;
      }
    }, {
      key: "isEnabled",
      get: function get() {
        return this._enable;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(state) {
        this._state = this.isEnabled ? state : ButtonState.DISABLE;
        this.redraw();
      }
    }]);

    return ShapeButton;
  }(createjs.Shape);

  var ArrowButton =
  /*#__PURE__*/
  function (_ShapeButton) {
    _inherits(ArrowButton, _ShapeButton);

    function ArrowButton(arrowRotation) {
      var _this2;

      _classCallCheck(this, ArrowButton);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ArrowButton).call(this));
      _this2.arrowRotation = arrowRotation;
      _this2.arrowWidth = 10;
      _this2.arrowHeight = 5;
      return _this2;
    }

    _createClass(ArrowButton, [{
      key: "drawForeground",
      value: function drawForeground(color) {
        function drawPoints(g, mat, points) {
          points.forEach(function (point, i) {
            var p = mat.transformPoint(point[0], point[1]);
            p.x = Math.floor(p.x);
            p.y = Math.floor(p.y);

            if (i == 0) {
              g.moveTo(p.x, p.y);
            } else {
              g.lineTo(p.x, p.y);
            }
          });
        }

        var b = this.getBounds();
        var mat = new createjs.Matrix2D().translate(b.width / 2, b.height / 2).rotate(this.arrowRotation);
        var g = this.graphics.beginFill(color);
        drawPoints(g, mat, [[0, -this.arrowHeight / 2], [this.arrowWidth / 2, this.arrowHeight / 2], [-this.arrowWidth / 2, this.arrowHeight / 2]]);
      }
    }]);

    return ArrowButton;
  }(ShapeButton);

  var ScrollBar =
  /*#__PURE__*/
  function (_createjs$Container) {
    _inherits(ScrollBar, _createjs$Container);

    function ScrollBar(orientation) {
      var _this3;

      _classCallCheck(this, ScrollBar);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ScrollBar).call(this));
      _this3._size = {
        width: 0,
        height: 0
      };
      _this3._contentLength = 0;
      _this3._value = 0;
      _this3.unitIncrement = 120;
      _this3.blockIncrement = 240;
      _this3.orientation = orientation;
      _this3.background = new createjs.Shape();

      _this3.background.on("mousedown", function (e) {
        var pos = _this3.isVertical ? e.localY : e.localX;

        var b = _this3.handle.getBounds();

        var handleHead = _this3.isVertical ? _this3.handle.y : _this3.handle.x;
        var handleTail = _this3.isVertical ? _this3.handle.y + b.height : _this3.handle.x + b.width;

        if (pos < handleHead) {
          _this3._changeValue(e, _this3.value + _this3.blockIncrement);
        }

        if (pos > handleTail) {
          _this3._changeValue(e, _this3.value - _this3.blockIncrement);
        }
      });

      _this3.addChild(_this3.background);

      var rot = _this3.isVertical ? 0 : -90;
      _this3.headArrow = new ArrowButton(rot);

      _this3.headArrow.setBackgroundColor(ButtonState.NORMAL, BAR_COLOR);

      _this3.headArrow.setBackgroundColor(ButtonState.HOVER, ARROWBG_HOVER_COLOR);

      _this3.headArrow.setBackgroundColor(ButtonState.ACTIVE, ARROWBG_ACTIVE_COLOR);

      _this3.headArrow.setForegroundColor(ButtonState.NORMAL, ARROW_COLOR);

      _this3.headArrow.setForegroundColor(ButtonState.HOVER, ARROW_COLOR);

      _this3.headArrow.setForegroundColor(ButtonState.ACTIVE, ARROW_HILIGHT);

      _this3.headArrow.on("mousedown", function (e) {
        _this3._changeValue(e, _this3.value + _this3.unitIncrement);
      });

      _this3.addChild(_this3.headArrow);

      _this3.tailArrow = new ArrowButton(rot + 180);

      _this3.tailArrow.setBackgroundColor(ButtonState.NORMAL, BAR_COLOR);

      _this3.tailArrow.setBackgroundColor(ButtonState.HOVER, ARROWBG_HOVER_COLOR);

      _this3.tailArrow.setBackgroundColor(ButtonState.ACTIVE, ARROWBG_ACTIVE_COLOR);

      _this3.tailArrow.setForegroundColor(ButtonState.NORMAL, ARROW_COLOR);

      _this3.tailArrow.setForegroundColor(ButtonState.HOVER, ARROW_COLOR);

      _this3.tailArrow.setForegroundColor(ButtonState.ACTIVE, ARROW_HILIGHT);

      _this3.tailArrow.on("mousedown", function (e) {
        _this3._changeValue(e, _this3.value - _this3.unitIncrement);
      });

      _this3.addChild(_this3.tailArrow);

      _this3.handle = new ShapeButton();

      _this3.handle.setBackgroundColor(ButtonState.NORMAL, HANDLE_COLOR);

      _this3.handle.setBackgroundColor(ButtonState.HOVER, HANDLE_HOVER_COLOR);

      _this3.handle.setBackgroundColor(ButtonState.ACTIVE, HANDLE_ACTIVE_COLOR);

      _this3.handle.on("mousedown", function (e) {
        _this3.startPos = {
          x: e.stageX,
          y: e.stageY,
          value: _this3.value
        };
      });

      _this3.handle.on("pressmove", function (e) {
        var delta = _this3.isVertical ? _this3.startPos.y - e.stageY : _this3.startPos.x - e.stageX;

        _this3._changeValue(e, _this3.startPos.value + _this3._positionToValue(delta));
      });

      _this3.addChild(_this3.handle);

      return _this3;
    }

    _createClass(ScrollBar, [{
      key: "_changeValue",
      value: function _changeValue(e, value) {
        var oldValue = this._value;
        this.value = value;
        if (oldValue != this.value) this.dispatchEvent("change", e);
      }
    }, {
      key: "redraw",
      value: function redraw() {
        var b = this.getBounds();
        this.background.graphics.clear().beginFill(BAR_COLOR).rect(0, 0, b.width, b.height);

        this._drawArrows();

        this._drawHandle();
      }
    }, {
      key: "_positionToValue",
      value: function _positionToValue(pos) {
        return pos * this._contentLength / (this.barLength - 2 * this.barWidth);
      }
    }, {
      key: "_drawHandle",
      value: function _drawHandle() {
        function normalize(v) {
          return Math.max(0, Math.min(1, v));
        }

        var maxLength = this.barLength - this.barWidth * 2;
        var handleSize = [this.barWidth * 0.8, maxLength * normalize(this.barLength / this._contentLength)];
        var handlePos = [(this.barWidth - handleSize[0]) / 2, this.barWidth + maxLength * (1 - normalize(this.barLength / this._contentLength)) * normalize(this.value / this.maxValue)];
        var px = this.isVertical ? 0 : 1;
        var py = this.isVertical ? 1 : 0;
        this.handle.x = handlePos[px];
        this.handle.y = handlePos[py];
        this.handle.setBounds(0, 0, handleSize[px], handleSize[py]);
        this.handle.redraw();
      }
    }, {
      key: "_drawArrows",
      value: function _drawArrows() {
        var size = this.barWidth;
        var px = this.isVertical ? 0 : 1;
        var py = this.isVertical ? 1 : 0;
        var tailPos = [0, this.barLength - size];
        this.tailArrow.x = tailPos[px];
        this.tailArrow.y = tailPos[py];
        this.headArrow.setBounds(0, 0, size, size);
        this.tailArrow.setBounds(0, 0, size, size);
        this.headArrow.arrowWidth = size / 2;
        this.headArrow.arrowHeight = size / 4;
        this.tailArrow.arrowWidth = size / 2;
        this.tailArrow.arrowHeight = size / 4;
        this.headArrow.redraw();
        this.tailArrow.redraw();
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        this._value = Math.floor(Math.max(Math.min(0, value), this.maxValue));
        this.redraw();
      }
    }, {
      key: "contentLength",
      get: function get() {
        return this._contentLength;
      },
      set: function set(length) {
        this._contentLength = length;
        this.redraw();
      }
    }, {
      key: "barWidth",
      get: function get() {
        return this.isVertical ? this.getBounds().width : this.getBounds().height;
      },
      set: function set(w) {
        var b = this.getBounds();
        !this.isVertical ? this.setBounds(0, 0, b.width, w) : this.setBounds(0, 0, w, b.height);
        this.redraw();
      }
    }, {
      key: "barLength",
      get: function get() {
        return !this.isVertical ? this.getBounds().width : this.getBounds().height;
      },
      set: function set(len) {
        var b = this.getBounds();
        this.isVertical ? this.setBounds(0, 0, b.width, len) : this.setBounds(0, 0, len, b.height);
        this.redraw();
      }
    }, {
      key: "isVertical",
      get: function get() {
        return this.orientation == ScrollBarOrientaion.VERTICAL;
      }
    }, {
      key: "maxValue",
      get: function get() {
        return Math.min(0.001, this.barLength - this._contentLength);
      }
    }]);

    return ScrollBar;
  }(createjs.Container);

  var ScrollContainer =
  /*#__PURE__*/
  function (_createjs$Container2) {
    _inherits(ScrollContainer, _createjs$Container2);

    function ScrollContainer(canvas, options) {
      var _this4;

      _classCallCheck(this, ScrollContainer);

      if (options != undefined) {
        if (options.scroll_bar_size != undefined) {
          scroll_bar_size = options.scroll_bar_size;
        }

        if (options.orientation != undefined) {
          user_orientation = options.orientation;
        }

        if (options.mc_ref != undefined) {
          mc_ref = options.mc_ref;
        }
      }

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(ScrollContainer).call(this));

      var _self = _assertThisInitialized(_this4);

      _this4.container = new createjs.Container();

      _this4.container.setBounds(0, 0, 0, 0);

      _this4.addChild(_this4.container);

      _this4.is_moving = false;
      _this4.is_over = false;
      _this4.scrollBarV = new ScrollBar(ScrollBarOrientaion.VERTICAL);
      _this4.scrollBarV.unitIncrement = UNIT_INCREMENT;
      _this4.scrollBarV.blockIncrement = BLOCK_INCREMENT;
      _this4.scrollBarV.barWidth = scroll_bar_size;
      if (user_orientation != "horizontal" && user_orientation != "none") _this4.addChild(_this4.scrollBarV);
      _this4.scrollBarH = new ScrollBar(ScrollBarOrientaion.HORIZONTAL);
      _this4.scrollBarH.unitIncrement = UNIT_INCREMENT;
      _this4.scrollBarH.blockIncrement = BLOCK_INCREMENT;
      _this4.scrollBarH.barWidth = scroll_bar_size;
      if (user_orientation != "vertical" && user_orientation != "none") _this4.addChild(_this4.scrollBarH);

      _this4.scrollBarV.on("change", function (e) {
        _this4.container.y = e.target.value;

        _this4.dispatchEvent("scroll");
      });

      _this4.scrollBarH.on("change", function (e) {
        _this4.container.x = e.target.value;

        _this4.dispatchEvent("scroll");
      });

      if (user_orientation != "horizontal" && user_orientation != "none") {
        canvas.addEventListener("mousewheel", function (e) {
          if (_self.is_over) {
            var h = _this4.contentSize.height - _this4.getBounds().height;

            var w = _this4.contentSize.width - _this4.getBounds().width;

            _this4.scrollY += e.wheelDeltaY;
            _this4.scrollX += e.wheelDeltaX;
          }
        });
      }

      var delta_x, delta_y, target, target_xstart, target_ystart;

      _this4.container.addEventListener("mousedown", function (e) {
        target = e.currentTarget;
        delta_x = stage.mouseX / mc_ref.scaleX - target.x - mc_ref.x;
        delta_y = stage.mouseY / mc_ref.scaleY - target.y - mc_ref.y;
        target_xstart = target.x;
        target_ystart = target.y;
      });

      _this4.container.addEventListener("pressmove", function (e) {
        if (user_orientation != "vertical" && user_orientation != "none") target.x = stage.mouseX / mc_ref.scaleX - delta_x - mc_ref.x;
        if (user_orientation != "horizontal" && user_orientation != "none") target.y = stage.mouseY / mc_ref.scaleY - delta_y - mc_ref.y;

        if (Math.abs(target_xstart - target.x) > 5 || Math.abs(target_ystart - target.y) > 5) {
          _self.is_moving = true;
        }

        _self.scrollX = target.x;
        _self.scrollY = target.y;
      });

      _this4.container.addEventListener("pressup", function (e) {
        _self.is_moving = false;
      });

      _this4.container.addEventListener("mouseover", function (e) {
        _self.is_over = true;
      });

      _this4.container.addEventListener("mouseout", function (e) {
        _self.is_over = false;
      });

      _this4.superAddChild = _this4.addChild;

      _this4.addChild = function (child) {
        _this4.container.addChild(child);
      };

      return _this4;
    }

    _createClass(ScrollContainer, [{
      key: "setBounds",
      value: function setBounds(x, y, width, height) {
        _get(_getPrototypeOf(ScrollContainer.prototype), "setBounds", this).call(this, x, y, width, height);

        this.contentSize = {
          width: Math.max(width, this.contentSize.width),
          height: Math.max(height, this.contentSize.height)
        };
        this.container.mask = new createjs.Shape();
        this.container.mask.graphics.beginFill("#efefef").rect(x, y, width, height);
        this.scrollBarV.x = width - scroll_bar_size;
        this.scrollBarV.barLength = height;
        if (user_orientation != "vertical" && user_orientation != "none") this.scrollBarV.barLength = -scroll_bar_size;
        this.scrollBarH.y = height - scroll_bar_size;
        this.scrollBarH.barLength = width;
        if (user_orientation != "horizontal" && user_orientation != "none") this.scrollBarH.barLength = -scroll_bar_size;
      }
    }, {
      key: "scrollX",
      get: function get() {
        return this.container.x;
      },
      set: function set(x) {
        var w = this.contentSize.width - this.getBounds().width;
        this.container.x = Math.min(0, Math.floor(Math.max(x, -w - scroll_bar_size)));
        this.scrollBarH.value = x;
        this.dispatchEvent("scroll");
      }
    }, {
      key: "scrollY",
      get: function get() {
        return this.container.y;
      },
      set: function set(y) {
        var h = this.contentSize.height - this.getBounds().height;
        this.container.y = Math.min(0, Math.max(y, -h - scroll_bar_size));
        this.scrollBarV.value = y;
        this.dispatchEvent("scroll");
      }
    }, {
      key: "contentSize",
      set: function set(size) {
        this.container.setBounds(0, 0, size.width, size.height);
        this.scrollBarH.contentLength = size.width;
        this.scrollBarV.contentLength = size.height;
      },
      get: function get() {
        return {
          width: this.container.getBounds().width,
          height: this.container.getBounds().height
        };
      }
    }]);

    return ScrollContainer;
  }(createjs.Container);

  createjs.ScrollContainer = ScrollContainer;
})();