/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

LoadImage
author: JCK

Load an image, place it at 0,0 in MovieClip then send a callback with dimensions of image when loaded

example:
  LoadImage.init(s.myclip, "images/myimage.png", fnNext, {clear:true});
  
  function fnNext(dimx, dimy){
    ....
  }

options:
  - clear (true) : clear mc content before placing image in it
  - resize([w,h]) : resize image to dimensions
  - position([x,y]) : (default : 0,0)

*/

define(['util/OptionGetter'], function (OptionGetter) {
  return {
    init: function (mc, src, callback, options) {
      
      var _clear = OptionGetter.get(options, "clear", false);
      var _resize = OptionGetter.get(options, "resize", false);
      var _position = OptionGetter.get(options, "position", false);
      
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = src;
      image.onload = handleImageLoad;
      
      function handleImageLoad(e){
        var bitmap = new createjs.Bitmap(image);
        
        if (_clear){
          mc.removeAllChildren();
        }
        
        var width = bitmap.getBounds().width;
        var height = bitmap.getBounds().height;
        
        
        if (_resize){
          bitmap.scaleX = _resize[0] / width;
          bitmap.scaleY = _resize[1] / height;
          
          width = _resize[0];
          height = _resize[1];
        }
        
        if (_position){
          bitmap.x = _position[0];
          bitmap.y = _position[1];
        }
        
        mc.addChild(bitmap);
        
        if (callback != undefined){
          callback(width, height, bitmap);
        }
      }

    }
  };
});
