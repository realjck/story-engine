/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*
SURMESURE slide
author: JCK
*/

function criteres(callback){
  require([
    "animator/Tween",
    "animator/Button",
    "util/CanvasTransition",
    "animator/ResponsiveStage",
    "util/JsonHandler",
    "animator/VerticalSpacer",
    "animator/SoundJS"
  ], function (
    Tween,
    Button,
    CanvasTransition,
    ResponsiveStage,
    JsonHandler,
    VerticalSpacer,
    SoundJS
  ) {
    // init screen
    var screen_name = "criteres";
    s.gotoAndStop(screen_name);
    var _screen = s[screen_name];
    ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
    
    JsonHandler.loadExcel("criteres", launch);
    
    function launch(){
      s.visible = true;
      canvas.style.opacity = '0';
      CanvasTransition.init(null, "fadein");
      
      _screen["explication"].visible = false;
      _screen["bt_continue"].visible = false;
      
      var nb_criteres = parseInt(JsonHandler.getObj("criteres", "nb_criteres").value);
      
      for (var i=1; i<=15; i++) {
        _screen["critere_a"+i].visible = false;
        _screen["critere_b"+i].visible = false;
        _screen["critere_c"+i].visible = false;
        _screen["critere_a"+i].fleche.visible = false;
        _screen["critere_b"+i].fleche.visible = false;
        _screen["critere_c"+i].fleche.visible = false;
      }
      
      var nb_criteres_cliques = 0;
      
      var y_offset = _screen["critere_a1"].y;
      var col_counter = 1;
      var col_current = "a";
      var spacer = 25;
      var max_height = 800;
      for (var i=1; i<=nb_criteres; i++) {
        var mc = _screen["critere_"+col_current+col_counter];
        mc.visible = true;
        mc.y = y_offset;
        mc["zone"].col = col_current;
        mc["zone"].count = col_counter;
        mc["zone"].n = i;
        mc["zone"].vu = false;
        mc.alpha = 1;
        mc.gotoAndStop("nonvu");
        mc.champ.text = JsonHandler.get("criteres", "critere_"+i).value;
        
        if (JsonHandler.get("criteres", "critere_"+i).essentiel == "yes"){
          mc.essentiel = true;
        }
        
        mc.zone.scaleY = mc.zone.scaleY*mc.champ.getMeasuredHeight()/39;
        y_offset += mc.champ.getMeasuredHeight();
        if (y_offset >= max_height) {
          nextCol();
        } else {
          col_counter++;
          if (col_counter > 15) {
            nextCol();
          }
          y_offset += spacer;
        }
        function nextCol() {
          switch(col_current) {
            case "a": col_current = "b"; break;
            case "b": col_current = "c"; break;
            default: console.log("!!ATTENTION!! Trop de critères à l'écran!"); break;
          }
          col_counter = 1;
          y_offset = _screen["critere_a1"].y;
        }

        Button.enable(mc["zone"], function(e) {
          
          var n = e.currentTarget.n;
          var mc = _screen["critere_"+e.currentTarget.col+e.currentTarget.count]
          
          function valideVu(){
            if (!e.currentTarget.vu) {
              e.currentTarget.vu = true;
              mc.fleche.visible = false;
              mc.gotoAndStop("vu");
              mc.alpha = 0.3;
              mc.champ.text = JsonHandler.get("criteres", "critere_"+n).value;
              nb_criteres_cliques ++;
              if (nb_criteres_cliques >= 3) {
                checkAllVus();
              }
            }
          }
          _screen["explication"].visible = true;
          Button.enable(_screen["explication"].bg, function(){
            _screen["explication"].visible = false;
            // SoundJS.abort();
            valideVu();
          });
          var critere_titre = JsonHandler.get("criteres", "critere_"+n).value;
          var critere_texte = JsonHandler.get("criteres", "critere_"+n).texte;
          var critere_son = JsonHandler.get("criteres", "critere_"+n).son;
          _screen["explication"]["pop"]["titre"].champ.text = critere_titre;
          _screen["explication"]["pop"]["texte"].champ.text = critere_texte;
          VerticalSpacer.init(_screen["explication"]["pop"], ["titre", "texte"], "pp", 40, 80);
          
          // SoundJS.init("assets/sounds/voice/"+critere_son+".mp3", null, null, null, true);
          
          Button.enableZoom(_screen["explication"]["pop"]["btclose"], function(){
            _screen["explication"].visible = false;
            // SoundJS.abort();
            valideVu();
          });
          
          Tween.init(_screen["explication"]["pop"], {from:"left"});
        });
      }
      _screen["bt_continue"].y = y_offset + 150;
      
      function checkAllVus(){
        
        var all_essentiels_vus = true;
        
        for (var i=1; i<=15; i++) {
          if (_screen["critere_a"+i].essentiel){
            if (!_screen["critere_a"+i].zone.vu){
              _screen["critere_a"+i].fleche.visible = true;
              all_essentiels_vus = false;
            }
          }
          if (_screen["critere_b"+i].essentiel){
            if (!_screen["critere_a"+i].zone.vu){
              _screen["critere_a"+i].fleche.visible = true;
              all_essentiels_vus = false;
            }
          }
          if (_screen["critere_c"+i].essentiel){
            if (!_screen["critere_a"+i].zone.vu){
              _screen["critere_a"+i].fleche.visible = true;
              all_essentiels_vus = false;
            }
          }
        }
        
        if (all_essentiels_vus && (!_screen.bt_continue.visible)){
          Tween.init(_screen["bt_continue"], {pop:true});
          Button.enableZoom(_screen["bt_continue"], callback);
        }
        
      }
      
    }

    
  });
}
