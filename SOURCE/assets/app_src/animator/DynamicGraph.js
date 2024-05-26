/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Dynamic Graph
author: JCK

create shapes by script in a movieclip dedicated for this purpose
*/

define(['util/OptionGetter', 'animator/Tween'], function(OptionGetter, Tween) {

  var _mcdg = "dynamic_graph"; // instance of the movieclip
  var _scene;
  var _children;

  return {
    init: function (scene) {
      _scene  = scene;
      _scene[_mcdg].x = _scene[_mcdg].y = 0;
      if (_children) {
        for (var i=0; i<_children.length; i++) {
          _children[i].graphics.clear();
        }
      }
      _children = [];
    },
    
    roundRect: function(x, y, w, h, radius, color, options) {
      var tween_options = OptionGetter.get(options, "tween", false);
      var shape = new createjs.Shape();
      shape.graphics.beginFill(color).drawRoundRect(x, y, w, h, radius);
      _scene[_mcdg].addChild(shape);
      if (tween_options) {
        Tween.init(shape, tween_options);
      }
      _children.push(shape);
    },
    
    line: function(x1, y1, x2, y2, stroke, color) {
      var shape = new createjs.Shape();
      shape.graphics.setStrokeStyle(stroke,"round").beginStroke(color);
      shape.graphics.lineTo(x1, y1);
      shape.graphics.lineTo(x2, y2);
      _scene[_mcdg].addChild(shape);
      _children.push(shape);
    }
  };
});
