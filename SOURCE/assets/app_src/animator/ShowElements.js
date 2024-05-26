/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Animator Module
=>init(stage, ["mc1", "mc2", "mc3", ...], delay, callback, {options du tween});

SHOW ELEMENTS
author: JCK

*/

define(['animator/MaskObjects', 'animator/Tween', 'util/UniqueTimer'], function(MaskObjects, Tween, UniqueTimer) {

  return {
    init: function (stage, instanceAr, delay, callback, options) {

      MaskObjects.init(stage, instanceAr);

      i = 0;
      UniqueTimer.init(function(){
        Tween.init(stage[instanceAr[i]], options);
        i++;
        if(i == instanceAr.length) {
          UniqueTimer.stop();
          if (callback != undefined) {
            callback();
          }
        }
      }, delay);
    }
  };
});
