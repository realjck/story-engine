/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Animator Module
=>init(stage, ["mc1", "mc2", "mc3", ...], callback);

SHOW QUESTIONS OF QUIZ
author: JCK

*/

define(['animator/MaskObjects', 'animator/Tween', 'util/UniqueTimer'], function(MaskObjects, Tween, UniqueTimer) {

  var _delta = 500;

  return {
    init: function (stage, instanceAr, callback) {

      MaskObjects.init(stage, instanceAr);

      i = 0;
      UniqueTimer.init(function(){
        Tween.init(stage[instanceAr[i]], {from: "right", distance: 250, duration:1000});
        i++;
        if(i == instanceAr.length) {
          UniqueTimer.stop();
          if (callback != undefined) {
            callback();
          }
        }
      }, _delta);
    }
  };
});
