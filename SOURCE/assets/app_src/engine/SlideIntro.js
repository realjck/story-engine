/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

SlideIntro
author: JCK

*/

define(['engine/Player',
    'animator/ResponsiveStage',
    'animator/Tween',
    'util/Sequencer',
    'animator/MaskObjects',
    'util/UniqueTimer',
    'animator/Button',
    'animator/Voice',
    'animator/StorePosition',
    'animator/Mascotte',
    'animator/SoundJS',
    'util/JsonHandler',
    'util/LinesBreaker',
    'animator/VerticalTextCenterer',
    'util/ModalDialog',
    'util/UniqueTimerForElements'
  ], function (
    Player,
    ResponsiveStage,
    Tween,
    Sequencer,
    MaskObjects,
    UniqueTimer,
    Button,
    Voice,
    StorePosition,
    Mascotte,
    SoundJS,
    JsonHandler,
    LinesBreaker,
    VerticalTextCenterer,
    ModalDialog,
    UniqueTimerForElements) {

  var _screen = "intro";

  return {
    init: function () {
      
      s.aide.visible = false;
      
      shortcut.add("Right",function() {
        shortcut.remove("Right");
        Player.goNext();
      });
    
      // init screen
      s.nav.visible = false;
      s.gotoAndStop(_screen);
      MaskObjects.init(s[_screen], ["logoclient", "logoediversite", "bandeau", "presente", "titremodule", "signature", "personnalisable"]);
      if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
        s[_screen]["personnalisable"].visible = true;
      }
      
      ResponsiveStage.storeClip(_screen, {horizontal:"fixed", vertical:"fixed"});
      
      s[_screen]["version"].text = JsonHandler.get("CONFIG", "version");
      
      // launch sequence
      SoundJS.init("assets/sounds/fx/jingle.mp3", function() {
        Sequencer.launch([
          function(next) {
            Tween.init(s[_screen]["logoclient"], {duration:1000});
            if (JsonHandler.get("CONFIG", "version").substr(JsonHandler.get("CONFIG", "version").length - 4).toLowerCase() == "demo"){
              Tween.init(s[_screen]["bandeau"], {from:"top", distance:100, duration:1000, fade:false});
            }
          },
          function(next) {
            Tween.init(s[_screen]["presente"]);
            // Tween.init(s[_screen]["logoediversite"], {duration:1000});
          },
          // function(next) {
            // Tween.init(s[_screen]["logoediversite"], {duration:1000, fadeout:true});
          // },
          function(next) {
            s[_screen]["titremodule"].champ.text = JsonHandler.get("CONFIG", "titre");
            LinesBreaker.init(s[_screen]["titremodule"].champ, {equal:true});
            VerticalTextCenterer.init(s[_screen]["titremodule"].champ, 282, "middle");
            Tween.init(s[_screen]["titremodule"], {duration:1500, fade:true});
          },
          function(next) {
            if (isNaN(JsonHandler.get("CONFIG", "version").substr(-1))){
              Tween.init(s[_screen]["signature"], {duration:1500, fade:true});
            }
          }
        ], {cuepoints:[0,1500,2000,2500]});
      }, function(){
        showAide();
      });
      
      
      // aide
      function showAide(){
        
        shortcut.remove("Right");
        
        if (JsonHandler.get("CONFIG", "aide") == "yes"){
          if (Player.getSuspend("aide_vue") != "1"){
            
            Player.setSuspend("aide_vue", "1");
            
            if (!s.aide.visible){

              s.aide.visible = true;
              MaskObjects.init(s.aide, ["bt_previous", "bt_menu_off", "progression", "textes"]);
              s[_screen]["version"].visible = false;
              
              Tween.init(s.aide.marcillac, {from:"left", distance:1000, duration:1000, fade:false});
              Tween.init(s.aide.ombre, {from:"left", distance:1000, duration:1000, fade:false, callback:
                function(){
                  Mascotte.play(s.aide.marcillac, "aide_01", {forceLoad:true, text:__gtexts[__lang].aide_voix_01},
                    function(){
                      s.nav.titre.text = __gtexts[__lang].aide;
                      VerticalTextCenterer.init(s.nav.titre, 85, "middle");
                      s.nav.progression.visible = false;
                      
                      MaskObjects.unmask(s.aide, ["bt_previous", "bt_menu_off", "progression"]);
                      s.nav.visible = true;
                      
                      Tween.init(s.aide.textes, {noInit:true, callback:
                        function(){
                          UniqueTimerForElements.wait(1200, function(){
                            Mascotte.play(s.aide.marcillac, "aide_02", {forceLoad:true, text:__gtexts[__lang].aide_voix_02}, Player.waitClickNext());
                          });
                        }
                      });
                    }
                  );
                }
              });

            }
          } else {
            Player.goNext();
          }
        } else if (JsonHandler.get("CONFIG", "aide") == "silent"){
          if (Player.getSuspend("aide_vue") != "1"){
            
            Player.setSuspend("aide_vue", "1");
            
            if (!s.aide.visible){

              s.aide.visible = true;
              MaskObjects.init(s.aide, ["bt_previous", "bt_menu_off", "progression", "textes"]);
              s[_screen]["version"].visible = false;
              
              
              s.nav.titre.text = __gtexts[__lang].aide;
              VerticalTextCenterer.init(s.nav.titre, 85, "middle");
              s.nav.progression.visible = false;
              
              MaskObjects.unmask(s.aide, ["bt_previous", "bt_menu_off", "progression"]);
              s.nav.visible = true;
              
              Tween.init(s.aide.textes, {noInit:true});
              
              Tween.init(s.aide.marcillac, {from:"left", distance:1000, duration:1000, fade:false});
              Tween.init(s.aide.ombre, {from:"left", distance:1000, duration:1000, fade:false});
              
              Player.waitClickNext();
            }
          } else {
            Player.goNext();
          }
        } else {
          Player.goNext();
        }
      }
      
    }
  };
});
