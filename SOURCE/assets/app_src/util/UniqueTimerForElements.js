/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

  var _timer = new timing.Timer();
  var _isTimer;

  return {
    init : function (fn, delay) {
      if (!_isTimer) {
        _timer = new timing.Timer(delay);
        _timer.onTick = fn;
        _timer.start();
        _isTimer = true;
      } else {
        // console.log("*WARNING* UniqueTimer conflict");// debug mode
      }
    },
    stop : function () {
      _timer.stop();
      _isTimer = false;
    },
    setInterval : function (val) {
      _timer.setInterval(val);
    },
    wait : function (delay, callback) {
      function after_wait() {
        _timer.stop();
        callback();
      }
      _timer = new timing.Timer(delay);
      _timer.onTick = after_wait;
      _timer.start();
    }
  };
});
