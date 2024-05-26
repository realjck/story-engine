/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

RemoveEvents
Remove all *CLICKS*, *MOUSEOVER* and *MOUSEOUT* EVENTS of stage (4 first nested movieclips levels)

author: JCK

*/

define(function() {

  var _exceptionAr;

  return {
    init: function (stage, exceptionAr) {
      _exceptionAr = exceptionAr;
      for (var i=0; i<stage.children.length; i++) {
        disableChild(stage.children[i]);
        if (stage.children[i].children != undefined) {
          for (var j=0; j<stage.children[i].children.length; j++) {
            disableChild(stage.children[i].children[j]);
            if (stage.children[i].children[j].children != undefined) {
              for (var k=0; k<stage.children[i].children[j].children.length; k++) {
                disableChild(stage.children[i].children[j].children[k]);
                if (stage.children[i].children[j].children[k].children != undefined) {
                  for (var l=0; l<stage.children[i].children[j].children[k].children.length; l++) {
                    disableChild(stage.children[i].children[j].children[k].children[l]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  function  disableChild(child) {
    var isInException = false;
    for (var i=0; i<_exceptionAr.length; i++) {
      if (child == _exceptionAr[i]) {
        isInException = true;
      }
    }
    if (!isInException) {
      child.removeAllEventListeners("click");
      child.removeAllEventListeners("mouseover");
      child.removeAllEventListeners("mouseout");
    }
  }
});
