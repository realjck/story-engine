/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Text Applier
Apply external text with possibility to center vertically

author: JCK

*/

define(["util/ExternalText", "animator/VerticalTextCenterer"], function(ExternalText, VerticalTextCenterer) {

  return {
    set: function(textfield, screen, id, option) {
    
      textfield.text = ExternalText.getText(screen, id);
      
      if (option != undefined) {
        if (option.center != undefined) {
          VerticalTextCenterer.init(textfield, option.center, "middle");
        }
      }
    }
  };
});
