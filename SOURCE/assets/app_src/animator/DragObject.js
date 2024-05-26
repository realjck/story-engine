/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

DRAG OBJECT
author: JCK

Ask user to Drag an object over a target and send callback

ex:
DragObject.init(s, "drag", "drop", callback);

 */

define(["animator/Collisions", "util/OptionGetter", "animator/Button"], function (Collisions, OptionGetter, Button) {

  var _s;

  var _tweenSpeed = 200;
  var _callback;  
  var _drag;
  var _drop;
  var _responsive_ref;
  var _hoverFn;


  return {
    init : function (stage, drag, dropsAr, callback, options) {
      _s = stage;

      _drag = drag;
      _dropsAr = dropsAr;
      _callback = callback
      
      _responsive_ref = OptionGetter.get(options, "responsiveRef", _s);
      _hoverFn = OptionGetter.get(options, "hoverFn", false);
      
      _isFeedbackCalled = false;

      construct();
    }
  };

  function construct() {

    _drag.mouseEnabled = true;

    if (_drag.oldx == undefined) {
      _drag.oldx = _drag.x;
    } else {
      _drag.x = _drag.oldx;
    }
    if (_drag.oldy == undefined) {
      _drag.oldy = _drag.y;
    } else {
      _drag.y = _drag.oldy;
    }

    var delta_x;
    var delta_y;
    var target;
    _drag.addEventListener("mousedown", function (e) {
      target = e.currentTarget;
      delta_x = (stage.mouseX/_responsive_ref.scaleX - target.x - _responsive_ref.x);
      delta_y = (stage.mouseY/_responsive_ref.scaleY - target.y - _responsive_ref.y);
      _s.setChildIndex(target, _s.getNumChildren() - 1);
    });

    _drag.addEventListener("pressmove", function (e) {
      target.x = (stage.mouseX/_responsive_ref.scaleX - delta_x - _responsive_ref.x);
      target.y = (stage.mouseY/_responsive_ref.scaleY - delta_y - _responsive_ref.y);
      
      if (_hoverFn){
        var hitted = false;
      
        for (var i=0; i<_dropsAr.length; i++){
          if (Collisions.check(_drag, _dropsAr[i])) {
            _hoverFn(_dropsAr[i]);
          }
        }
      }
      
    });
    _drag.cursor = "pointer";

    _drag.addEventListener("pressup", function (e) {

      var hitted = false;
    
      for (var i=0; i<_dropsAr.length; i++){
        if (Collisions.check(_drag, _dropsAr[i])) {
          Button.disable(_drag);
          hitted = true;
          _callback(_dropsAr[i]);
        }
      }
      
      if (!hitted){
        goTween(_drag, _drag.oldx, _drag.oldy, _tweenSpeed);
      }
      
    });
  }

  function goTween(mc, end_x, end_y, speed) {
    createjs.Tween.get(mc).to({
      x : end_x,
      y : end_y
    }, speed);
  }
});
