/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Boxify
author: JCK

create a box around a dynamic text
*/

define(['util/OptionGetter', 'util/LinesBreaker'], function(OptionGetter, LinesBreaker) {

  return {
    init: function (champ, options) {
      
      var _radius = OptionGetter.get(options, "radius", 20);
      var _color = OptionGetter.get(options, "color", "#00FF00");
      var _outsidePourcent = OptionGetter.get(options, "outsidePourcent", 5);
      
      var outside = champ.lineWidth / 100 * _outsidePourcent;
      
      champ.lineWidth += outside;
      
      var x;
      switch (champ.textAlign){
        case "center" :
          x = champ.x - champ.lineWidth/2;
          break;
        case "right" :
          x = champ.x - champ.lineWidth;
          break;
        default : x = 0; break;
      }
      
      var shape = new createjs.Shape();
      shape.graphics.beginFill(_color).drawRoundRect(x - outside, champ.y - outside, champ.lineWidth + (2*outside), champ.getMeasuredHeight() + (2*outside), _radius);
      champ.parent.addChild(shape);
      
      var text_front = new createjs.Text();
      text_front.x = champ.x;
      text_front.y = champ.y + (champ.lineHeight / 6);
      text_front.color = champ.color;
      text_front.font = champ.font;
      text_front.lineHeight = champ.lineHeight;
      text_front.lineWidth = champ.lineWidth;
      text_front.text = champ.text;
      text_front.textAlign = champ.textAlign;
      text_front.name = champ.name;
      champ.parent.addChild(text_front);
    
      // LinesBreaker.init(text_front);
      
      champ.name = undefined;
      champ.visible = false;

    }

  };
});
