/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Quiz Builder
Build Dynamic Quiz from JSON

author: JCK

*/

define([
  "util/JsonHandler",
  "animator/ResponsiveStage",
  "animator/WaitNextTick",
  "animator/Button",
  "animator/Tween",
  "util/LinesBreaker",
  "util/OptionGetter",
  "animator/Boxify",
  "animator/MaskObjects",
  "animator/Collisions",
  "animator/SoundJS"
  ], function(
  JsonHandler,
  ResponsiveStage,
  WaitNextTick,
  Button,
  Tween,
  LinesBreaker,
  OptionGetter,
  Boxify,
  MaskObjects,
  Collisions,
  SoundJS
) {
  
  var contenu;

  return {
    init: function(s, json, callback) {
      
      s.visible = false;
      
      s.gotoAndStop("CLASSEMENT");
      
      var _screen = s.CLASSEMENT;
      
      ResponsiveStage.storeClip("CLASSEMENT", {horizontal:"fixed", vertical:"fixed"});
      
      var dragsAr = [];
      var counter = 0;
      var height_pointer_left, height_pointer_right;
      
      MaskObjects.init(_screen, ["bt_continue", "fleche_left", "fleche_right", "wrong", "personnalisable"]);
      if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
        s[_screen]["personnalisable"].visible = true;
      }
      
      for (var i=0; i<_screen.children.length; i++){
        if ((_screen.children[i].name == "drag")||(_screen.children[i].name == "result")){
          _screen.children[i].visible = false;
          WaitNextTick.init(function(){
            _screen.removeChildAt(i);
          });
        }
      }
      
      WaitNextTick.init(function(){
        JsonHandler.loadExcel(json, build);
      });
      
      function build(){
        
        Tween.init(s);
        
        var consigne = JsonHandler.getLine(json, 0).consigne.trim();
        var titre = JsonHandler.getLine(json, 2).consigne.trim();
        var titre_left = JsonHandler.getLine(json, 0).titre_colonne_gauche.trim();
        var titre_right = JsonHandler.getLine(json, 0).titre_colonne_droite.trim();
        
        _screen.consigne.text = consigne;
        if (consigne == ""){
          _screen.titre.y = _screen.consigne.y;
        } else {
          _screen.titre.y = _screen.consigne.y + _screen.consigne.getMeasuredHeight() + 20;
        }
        
        _screen.titre.text = titre;
        var height_pointer = _screen.titre.y + _screen.titre.getMeasuredHeight() + 20;
        _screen.titre_left.y = _screen.titre_right.y = _screen.trait.y = height_pointer;
        
        _screen.titre_left.text = titre_left;
        _screen.titre_right.text = titre_right;
        
        LinesBreaker.init(_screen.titre);
        LinesBreaker.init(_screen.consigne);
        LinesBreaker.init(_screen.titre_left);
        LinesBreaker.init(_screen.titre_right);
        
        _screen.trait.scaleY = (750 - _screen.trait.y) / 100;
        
        var height_titles = Math.max(_screen.titre_left.getMeasuredHeight(), _screen.titre_right.getMeasuredHeight());
        
        _screen.titre_left.y += (height_titles - _screen.titre_left.getMeasuredHeight()) / 2;
        _screen.titre_right.y += (height_titles - _screen.titre_right.getMeasuredHeight()) / 2;
        
        height_pointer_left = height_pointer_right = _screen.zone_left.y = _screen.zone_right.y = height_pointer + height_titles;
        
        
        for (var i=2; i<12 ; i++){

          if (JsonHandler.getLine(json, i) != undefined){
            
            if (JsonHandler.getLine(json, i).titre_colonne_gauche != undefined){
              dragsAr.push({
                text : JsonHandler.getLine(json, i).titre_colonne_gauche,
                answer : "left"
              });
            }
            
            if (JsonHandler.getLine(json, i).titre_colonne_droite != undefined){
              dragsAr.push({
                text : JsonHandler.getLine(json, i).titre_colonne_droite,
                answer : "right"
              });
            }
          }
        }
        
        shuffle(dragsAr);
        
        launchDrag();
        
      }
      
      function launchDrag(){
        
        var drag = new lib["CLASSEMENT_drag"]();
        drag.name = "drag";
        _screen.addChild(drag);
        
        drag.champ.text = dragsAr[counter].text;
        Boxify.init(drag.champ, {color:"#EAEAEA", outsidePourcent: 10});
        
        drag.x = drag.oldx = (1920 - drag.getBounds().width) / 2;
        drag.y = drag.oldy = _screen.bt_continue.y - 50;
        
        drag.cursor = "pointer";

        Tween.init(drag, {from:"bottom", distance:100, duration:250, fade:true, callback:
          function(){
            drag.addEventListener("mousedown", press);
            drag.addEventListener("pressmove", move);
            drag.addEventListener("pressup", up);
            
          }
        });
        
        var delta_x;
        var delta_y;
        var target;
        var is_zone;
        
        function press(e){
          target = e.currentTarget;
          delta_x = (stage.mouseX/_screen.scaleX - target.x - _screen.x);
          delta_y = (stage.mouseY/_screen.scaleY - target.y - _screen.y);
          // _screen.setChildIndex(target, _screen.getNumChildren() - 1); 
        }
        
        function move(e){
          if (target != undefined){
            target.x = (stage.mouseX/_screen.scaleX - delta_x - _screen.x);
            target.y = (stage.mouseY/_screen.scaleY - delta_y - _screen.y);
            
            if (Collisions.check(target, _screen.zone_left)){
              is_zone = "left";
            } else if (Collisions.check(target, _screen.zone_right)){
              is_zone = "right";
            } else {
              is_zone = false;
            }
            
            _screen.fleche_left.visible = _screen.fleche_right.visible = false;
            if (is_zone){
              _screen["fleche_"+is_zone].visible = true;
            }
          }
        }

        function up(){
          
          _screen.fleche_left.visible = _screen.fleche_right.visible = false;
          
          if (!is_zone){
            goTween(drag, drag.oldx, drag.oldy, 200);
          } else {
            
            var result = new lib["CLASSEMENT_result"]();
            result.name = "result";
            result.champ.text = dragsAr[counter].text;
            result.coche.visible = false;
            _screen.addChild(result);
            
            
            switch(dragsAr[counter].answer){
              case "left" :
                result.x = 485;
                result.y = height_pointer_left;
                height_pointer_left += 50;
                dragsAr.counter
                break;
              
              case "right" :
                result.x = 1435;
                result.y = height_pointer_right;
                height_pointer_right += 50;
                break;
            }
            drag.removeEventListener("mousedown", press);
            drag.removeEventListener("pressmove", move);
            drag.removeEventListener("pressup", up);
            goTween(drag, result.x, result.y, 350, true);
            
            if (dragsAr[counter].answer == is_zone){
              SoundJS.init("assets/sounds/fx/right.mp3");
            } else {
              SoundJS.init("assets/sounds/fx/wrong.mp3");
              // _screen.setChildIndex(_screen.wrong, _screen.getNumChildren() - 1);
              Tween.init(_screen.wrong, {pop:true, callback:
                function(){
                  Tween.init(_screen.wrong, {fadeout:true});
                }
              });
            }
        
            Tween.init(result, {callback:function(){
              if (dragsAr[counter].answer == is_zone){
                result.coche.gotoAndStop("right");
                Tween.init(result.coche, {pop:true});
              }
              counter ++;
              if (counter == dragsAr.length){
                Tween.init(_screen.bt_continue, {pop:true});
                Button.enableZoom(_screen.bt_continue,
                  function(){
                    callback();
                  }
                );
              } else {
                launchDrag();
              }
            }});
            
          }
          
        }
        
        function goTween(mc, end_x, end_y, speed, fade) {
          
          var end_alpha;
          if (fade){
            end_alpha = 0;
          } else {
            end_alpha = 1;
          }
          
          createjs.Tween.get(mc).to({
            x : end_x,
            y : end_y,
            alpha : end_alpha
          }, speed);
        }
        
      }
    }
  };
  
  /**
   * Shuffles array in place.
   * @param {Array} a items The array containing the items.
   */
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }
});
