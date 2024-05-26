/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Store Position

save and restore position of clips

author: JCK

*/

define(function() {

  var _self;

  return {
    init: function (mc) {
      if (mc != undefined) {
        if (mc.storedPos == undefined) {
          mc.storedPos = new Object();
          mc.storedPos.x = mc.x;
          mc.storedPos.y = mc.y;
        } else {
          mc.x = mc.storedPos.x;
          mc.y = mc.storedPos.y;
        }
      } else {
        console.log ("*ERROR in StorePosition*  clip '"+mc+"' not found !");
      }
    },
    
    initAr: function(stage, mcAr) {
      _self = this;
      for (var i=0; i<mcAr.length; i++) {
        _self.init(stage[mcAr[i]]);
      }
    },
    
    record: function (mc) {
      mc.storedPos = new Object();
      mc.storedPos.x = mc.x;
      mc.storedPos.y = mc.y;
    },
    
    get: function (mc) {
      if (mc.storedPos != undefined) {
        return mc.storedPos;
      } else {
        return false;
      }
    },
    
    reset: function (mc) {
      if (mc.storedPos != undefined) {
        mc.x = mc.storedPos.x;
        mc.y = mc.storedPos.y;
      }
    }
  };
});
