/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

SoundJS implementation
author: JCK

 */

define(function() {
  
  var _is_playing = false;
  var _instance;
  
  
  return {
    init : function (filename, loaded_callback, complete_callback, superpose) {
      
      if (superpose != true) {
        createjs.Sound.removeAllSounds();
        createjs.Sound.removeAllEventListeners();
      }
      
      var id = (filename.substring(filename.lastIndexOf('/')+1)).split(".")[0];
      
      createjs.Sound.on("fileload", loadHandler);
      createjs.Sound.registerSound(filename, "sound");

      function loadHandler() {
        if (loaded_callback != undefined) {
          loaded_callback();
        }
        _instance = createjs.Sound.play("sound");
        
        _is_playing = true;
        
        _instance.on("complete", function(){
          _is_playing = false;
          if (complete_callback != undefined) {
            complete_callback();
          }
        });
      }
    },
    
    pause : function() {
      if (_is_playing) {
        _instance._pause();
      }
    },
    
    resume : function() {
      if (_is_playing) {
        _instance._resume();
      }
    },
    
    abort : function() {
      createjs.Sound.removeAllSounds();
      createjs.Sound.removeAllEventListeners();
      _is_playing = false;
    }
  }
});
