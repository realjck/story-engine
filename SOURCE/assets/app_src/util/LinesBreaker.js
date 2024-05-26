/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

LinesBreaker
beautify lines breaks

author: JCK

*/

define(['util/OptionGetter'], function(OptionGetter) {
  return {
    init: function (champText, options) {
      
      var equal = OptionGetter.get(options, "equal", false);

      var text = champText.text;
      var nb_lines = champText.getMetrics().lines.length;
      var text_lastline = champText.getMetrics().lines[nb_lines-1];
      
      var i;
      
      if (!equal){
        
        tryAdjust();
        
        function tryAdjust(){
          var adjusted = false;
          var new_text = "";
          var current_nb_lines = champText.getMetrics().lines.length - 1;
          
          
          for (i=0; i<current_nb_lines; i++){

            if ((champText.getMetrics().lines[i] != undefined) && (!testIfNotShouldBreak(champText.getMetrics().lines[i+1], -1))){
              
              var line1 = champText.getMetrics().lines[i].substr(0, champText.getMetrics().lines[i].lastIndexOf(" "));
              
              if (champText.getMetrics().lines[i+1]){
                var line2 = champText.getMetrics().lines[i].substr(champText.getMetrics().lines[i].lastIndexOf(" ")+1) + " " + champText.getMetrics().lines[i+1];
              } else {
                var line2 = champText.getMetrics().lines[i].substr(champText.getMetrics().lines[i].lastIndexOf(" ")+1);
              }
              
              if (line2 != undefined) {
                new_text += line1 + "\n" + line2;
              } else {
                new_text += line1;
              }
              
              adjusted = true;
              
              // test if no problem, or adjust in case:
              var current_text = champText.text;
              champText.text = new_text;
              if (champText.getMetrics().lines.length > 2){
                new_text += " ";
                i += (champText.getMetrics().lines.length - 2);
                current_nb_lines += (champText.getMetrics().lines.length - 2);
              }
              champText.text = current_text;
              
            } else if (champText.getMetrics().lines[i] != undefined){
              new_text += champText.getMetrics().lines[i] + " ";
            } else {
              new_text += text_lastline;
            }
          }
          
          if (adjusted){
            champText.text = new_text;
          }

          
        }

      } else {
        if (nb_lines > 1 && (text.indexOf(" ")!= -1)) {
          
          var char_index;
          var char_counter = 0;
          
          for (i=1; i<nb_lines; i++){
            
            char_index = Math.round(text.length / nb_lines) + (i-1)*Math.round(text.length / nb_lines);

            if (text.substr(char_index, 1) == " "){
              breakSpace();
            } else {
              var delta = 0;
              var space_found = false;
              while (!space_found){
                delta++;
                if (text.substr(char_index - delta, 1) == " "){
                  if (testIfNotShouldBreak(text, char_index - delta)){
                    char_index = char_index - delta;
                    space_found = true;
                  }
                  
                } else if (text.substr(char_index + delta, 1) == " "){
                  if (testIfNotShouldBreak(text, char_index + delta)){
                    char_index = char_index + delta;
                    space_found = true;
                  }
                }
              }
              breakSpace();
            }

          }

          champText.text = text;
          
          function breakSpace(){
            text = text.substr(0, char_index) + "\n" + text.substr(char_index + 1);
          }
        }

      }
      
      function testIfNotShouldBreak(text, index){
        if (text){
          if ((text.substr(index + 1, 1) != ":")
            && (text.substr(index + 1, 1) != "»")
            && (text.substr(index + 1, 1) != ";")
            && (text.substr(index + 1, 1) != "!")
            && (text.substr(index + 1, 1) != "?")
            && (text.substr(index + -1, 1) != "–")
            && (text.substr(index + -1, 1) != "«")){
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

    }
  };

});
