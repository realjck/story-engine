/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

CHAPITRE PLAYER
author: JCK

*/

define(['engine/Player',
    'animator/ResponsiveStage',
    'animator/Mascotte',
    'animator/WaitNextTick',
    'util/JsonHandler',
    'util/UniqueTimer',
    'animator/QuizBuilder',
    'animator/ClickPictosBuilder',
    'animator/ClassementBuilder',
    'animator/ContenuBuilder',
    'animator/LoadImage',
    'animator/SoundJS',
    'animator/Tween',
    'animator/QuizDragDrop',
    'animator/QuizDragDropOneByOne',
    'animator/MaskObjects',
    'util/Sequencer',
    'animator/VerticalSpacer',
    'animator/VerticalTextCenterer',
    'engine/QuizFinal',
    'util/CanvasTransition',
    'animator/Voice',
    'animator/Button',
    'exports'
  ], function (
    Player,
    ResponsiveStage,
    Mascotte,
    WaitNextTick,
    JsonHandler,
    UniqueTimer,
    QuizBuilder,
    ClickPictosBuilder,
    ClassementBuilder,
    ContenuBuilder,
    LoadImage,
    SoundJS,
    Tween,
    QuizDragDrop,
    QuizDragDropOneByOne,
    MaskObjects,
    Sequencer,
    VerticalSpacer,
    VerticalTextCenterer,
    QuizFinal,
    CanvasTransition,
    Voice,
    Button,
    exports
    ) {
      
  var _self;
  var index;
  
  exports.getIndex = function() {
    return _self.getIndex();
  }
  
  exports.incrementIndex = function(val) {
    _self.incrementIndex(val);
  }

  return {
    
    getIndex: function() {
      return index;
    },
    
    incrementIndex: function(val){
      index += val;
    },
    
    init: function (decor, fade) {
      
      _self = this;
      
      s.nav.visible = true;
      
      var show_persos; //set to 'true' in STORY to show personnages on prologue
      
      var screen;
      if (decor == undefined){
        screen = Player.getCurrentChapter().decor;
        index = Player.getCurrentChapter().index - 1;
      } else {
        screen = decor;
        if (fade){
          canvas.style.opacity = '0';
          CanvasTransition.init(null, "fadein");
        }
      }
      s.gotoAndStop(screen);
      execScript();
      
      if (screen == "prologue"){
        s[screen]["scene"].personnages.visible = false;
        s[screen]["scene"].chrono.visible = false;
        LoadImage.init(s[screen]["scene"].personnages, "assets/images/medias/prologue_personnages.png", null, {clear:true, resize:[427,281]})
      }
      
      ResponsiveStage.storeClip(screen, {horizontal:"fixed", vertical:"fixed"});
      
      var counter_persos_dial = 0;
      var current_perso_parle;
      
      var persos = {};
      
      var persos_array = [];
      var perso_first;
      
      var replicas;
      var letter_count;
      var is_zoomed;
      var next_is_decor;
      var perso_zoom_changed_in_monolog;
      var is_previous_anim;
      var is_previous_activity;
      var is_prologue = false;
      var is_prologue_presentation_persos = false;
      if (screen == "prologue"){
        is_prologue = true;
      }
      var orientable_perso = {};
      var next_perso_to_look_at;
      var zoom_on_look_at;
      var perso_turned;
      
      var is_swaping;
      
      var activities = ["titre:", "decor:", "quiz_", "contenu_", "clickpictos_", "classement_", "surmesure_", "surmesureonscene_", "video_"];
      
      function execScript(){
        //execution scripts:
        var sc = JsonHandler.getLine("STORY", index).script;
        if ((sc != "")&&(sc != undefined)){
          sc = sc.replace(/scene./g, "s[screen].scene.");
          eval(sc);
        }
      }
      
      WaitNextTick.init(function(){
        
        switchVue("large");
        
        // SETUP CHARACTERS
        for (var i=0; i<s[screen].config.persos.length; i++){
          s[screen]["scene"]["perso"+(i+1)].scaleX = Math.abs(s[screen]["scene"]["perso"+(i+1)].scaleX);
          s[screen]["scene"]["perso"+(i+1)].gotoAndStop(s[screen].config.persos[i]);
          persos[s[screen].config.persos[i]] = "perso"+(i+1);
          
          if (i > 0){
            persos_array.push(s[screen]["scene"]["perso"+(i+1)][s[screen].config.persos[i]]);
          } else {
            perso_first = s[screen]["scene"]["perso"+(i+1)][s[screen].config.persos[i]];
          }
          
        }
        
          // directions
        
        if (s[screen].config.dir_init != undefined){
          for (i=0; i<s[screen].config.dir_init.length; i++){
            if (s[screen].config.dir_init[i].substr(0,1) == "D"){
              s[screen]["scene"]["perso"+(i+1)].scaleX = Math.abs(s[screen]["scene"]["perso"+(i+1)].scaleX) * -1;
            } else if (s[screen].config.dir_init[i].substr(0,1) == "G"){
              s[screen]["scene"]["perso"+(i+1)].scaleX = Math.abs(s[screen]["scene"]["perso"+(i+1)].scaleX);
            }
            if (s[screen].config.dir_init[i].substr(1,1) == "O"){
              orientable_perso.name = s[screen].config.persos[i];
              orientable_perso.place = (i+1);
              orientable_perso.mc = s[screen]["scene"]["perso"+(i+1)];
            }
          }
        } else {
          s[screen]["scene"]["perso1"].scaleX = s[screen]["scene"]["perso1"].scaleX * -1;
        }

        // LAUNCH
        launchIndex();
        
        function launchIndex(){
          
          shortcut.remove("ctrl+alt+shift+right");
          shortcut.add("ctrl+alt+shift+right", function(){
            Voice.stopTalk();
            is_swaping = true;
            launchIndex();
          });
          
          s.visible = false;
          
          s.gotoAndStop(screen);
          
          index++;
          
          if ((index >= Player.getCurrentChapter().index + 3) && (orientable_perso.name != undefined)){
            if (JsonHandler.getLine("STORY", index) != undefined){
              if (getActualPerso(JsonHandler.getLine("STORY", index).perso) != orientable_perso.name){
                orientOrientablePerso();
              }
            }
          }
          
          if ((screen == "prologue") && (index==2) && (!is_swaping) && (JsonHandler.get("CONFIG", "no_applause") != "yes")){
            
            s.visible = true;
            SoundJS.init("assets/sounds/fx/applause.mp3",
              function(){
                s[screen]["scene"]["perso1"]["marcillac"].gotoAndPlay("pose");
              },
              function(){
                playIndex("unpose");
              }
            )
            
          } else {
            playIndex();
          }
          
          
          function playIndex(anim){
            if (JsonHandler.getLine("STORY", index+1) != undefined){
              if (JsonHandler.getLine("STORY", index+1).deroule.substr(0,6).toLowerCase() == "decor:"){
                next_is_decor = true;
              } else {
                next_is_decor = false;
              }
            } else {
              next_is_decor = false;
            }

            if (JsonHandler.getLine("STORY", index) == undefined){
              s.visible = true;
              switchVue("large");
              shortcut.remove("ctrl+alt+shift+right");
              Player.waitClickNext();
            } else if (((JsonHandler.getLine("STORY", index).deroule.trim() == "") || (JsonHandler.getLine("STORY", index).deroule.substr(0,6).toLowerCase() == "titre:")) && (!is_prologue_presentation_persos)){
              s.visible = true;
              switchVue("large");
              shortcut.remove("ctrl+alt+shift+right");
              Player.waitClickNext();
            } else if ((JsonHandler.getLine("STORY", index).deroule.trim() == "") || (JsonHandler.getLine("STORY", index).deroule.substr(0,6).toLowerCase() == "titre:")) {
              s.visible = true;
              Tween.init(s[screen]["scene"].chrono, {from:"left", distance:500, duration:350, fade:true, callback:
                function(){
                  Tween.init(s[screen]["scene"].chrono, {pop:true});
                  shortcut.remove("ctrl+alt+shift+right");
                  Player.waitClickNext();
                }
              });
            } else {
              var activity = false;
              for (var i=0; i < activities.length; i++){
                if (JsonHandler.getLine("STORY", index).deroule.substr(0, activities[i].length).toLowerCase() == activities[i].toLowerCase()){
                  activity = activities[i].toLowerCase();
                  break;
                }
              }
              
              var perso_value = JsonHandler.getLine("STORY", index).perso;
              if ((perso_value != "{all}")&&(perso_value != "{none}")){
                var perso = getActualPerso(perso_value);
              }
              
              if (perso_turned){
                if (perso != perso_turned){
                  s[screen]["scene"][persos[perso_turned]].scaleX = s[screen]["scene"][persos[perso_turned]].scaleX * -1;
                  perso_turned = false;
                }
              }
              
              
              var is_turning = false;
              if (perso_value){
                if (perso_value.substr(perso_value.length - 6).toLowerCase() == "{turn}"){
                  s[screen]["scene"][persos[perso]].scaleX = s[screen]["scene"][persos[perso]].scaleX * -1;
                  is_turning = true;
                  perso_turned = perso;
                } else if (perso_value.substr(perso_value.length - 10).toLowerCase() == "{turnstay}"){
                  s[screen]["scene"][persos[perso]].scaleX = s[screen]["scene"][persos[perso]].scaleX * -1;
                  is_turning = true;
                }
              }
              
              var son = JsonHandler.getLine("STORY", index).son;
              var deroule = JsonHandler.getLine("STORY", index).deroule;
              

              
              // voice case
              if ((!activity) && (!is_swaping)){
                s.visible = true;
                is_previous_activity = false;
                
                execScript();
                
                if ((perso_value != "{all}")&&(perso_value != "{none}")) {
                
                  if (perso != current_perso_parle){
                    is_previous_anim = false;
                    current_perso_parle = perso;
                    counter_persos_dial++;
                    letter_count = 0;
                    replicas = 0;
                    while (getActualPerso(JsonHandler.getLine("STORY", index+replicas).perso) == perso){
                      replicas++;
                      if (JsonHandler.getLine("STORY", index+replicas) == undefined){
                        break;
                      }
                    }
                    perso_zoom_changed_in_monolog = false;
                  }
                  letter_count += deroule.length;
                
                }
                
                // Zoom persos managment
                if (is_prologue && (show_persos != "done") && ((deroule.substr(0,10).toLowerCase()=="retrouvons") || (show_persos == true))){
                  
                  show_persos = "done";
                  
                  switchVue("zoom_perso1");
                  Tween.init(s[screen]["scene"].personnages);
                  anim = "pose";
                  is_prologue_presentation_persos = index;
                  
                } else if (perso_value == "{all}") {
                  
                  switchVue("large");
                  
                }  else if (perso_value == "{none}") {
                  
                  // do nothing
                  
                } else if (decor || next_is_decor) {
                  
                  switchVue("zoom_"+persos[perso]);
                  decor = undefined;
                  zoom_on_look_at = true;
                
                } else if ((is_prologue_presentation_persos) && (is_prologue_presentation_persos == index - 1)){
                  
                  anim = "unpose";
                  
                } else if (zoom_on_look_at){
                  
                  switchVue("zoom_"+persos[perso]);
                  zoom_on_look_at = false;
                  
                } else if (!is_prologue_presentation_persos) {
                  
                  if (JsonHandler.getLine("STORY", index+1) == undefined){
                    
                    switchVue("large");
                    
                  } else if ((JsonHandler.getLine("STORY", index+1).deroule.trim() == "") || (JsonHandler.getLine("STORY", index+1).deroule.substr(0,6).toLowerCase() == "titre:")){
                    switchVue("large");
                    
                  } else {
                    
                    if (counter_persos_dial == 3){
                      switchVue("zoom_"+persos[perso]);
                      is_zoomed = true;
                    } else if (counter_persos_dial > 3) {
                      
                      
                      if (is_turning){
                        
                        if (is_zoomed){
                          switchVue("zoom_persos");
                        } else {
                          switchVue("zoom_"+persos[perso]);
                        }

                      } else if (letter_count <= 200){
                        if (replicas > 1){
                          switchVue("zoom_"+persos[perso]);
                        } else {
                          switchVue("zoom_persos");
                        }
                      } else if (!perso_zoom_changed_in_monolog){
                        if (is_zoomed){
                          switchVue("zoom_persos");
                        } else {
                          switchVue("zoom_"+persos[perso]);
                        }
                        perso_zoom_changed_in_monolog = true;
                      }
                    }
                  }
                }

                 // this remplace the old 'anim' in two Mascotte.plays{start} just below:
                var simple_anim;
                if (perso == "marcillac"){
                  simple_anim = anim;
                } else {
                  // Perso animation
                  if (!Player.getStoryHasAnim()) {
                    // if no 'anim' column in story, then random anim :
                    var got_anim = 0;
                    if (s[screen]["scene"][persos[perso]] != undefined){
                      var labels_perso = s[screen]["scene"][persos[perso]][perso].labels;
                      for (var i=0; i<labels_perso.length; i++){
                        if (labels_perso[i].label.substr(0,4) == "anim"){
                          got_anim ++;
                        }
                      }
                    }
                    if ((Math.random() < 0.6) && (deroule.length > 30) && (!Player.isMobile()) && (got_anim > 0)){
                      if (got_anim == 1){
                        simple_anim = "anim";
                      } else {
                        simple_anim = "anim"+Math.floor(Math.random() * got_anim + 1);
                      }
                      is_previous_anim = true;
                    } else if (is_previous_anim){
                      is_previous_anim = false;
                    }
                  } else {
                    // else, got animation from column 'anim'
                    simple_anim = JsonHandler.getLine("STORY", index).anim;
                  }
                  
                }
                
                if (perso_value != "{all}") {
                  var perso_talking;
                  if (perso_value != "{none}"){
                    perso_talking = s[screen]["scene"][persos[perso]][perso];
                  }
                  Mascotte.play(perso_talking, son, {text:deroule, start:simple_anim}, function(){
                    UniqueTimer.wait(250, function(){
                      launchIndex();
                    });
                  });
                } else {
                  Mascotte.play(perso_first, son, {text:deroule, start:simple_anim, chorus:persos_array}, function(){
                    UniqueTimer.wait(250, function(){
                      launchIndex();
                    });
                  });
                }
                
                
              // other cases
              } else {
                if (deroule.toLowerCase() == "quiz_final"){
                  QuizFinal.init();
                } else {
                  var t = 200;
                  if (is_previous_activity){
                    t = 0;
                  }
                  
                  switch(activity){
                    
                    case "decor:" :
                      Mascotte.initAll();
                      var fade = false;
                      var decor;
                      if ((deroule.toLowerCase().indexOf("fade") != -1) && (deroule.toLowerCase().substr(deroule.length - 4) == "true")){
                        fade = true;
                        decor = deroule.substr(deroule.indexOf(":")+1, deroule.indexOf(",") - (deroule.indexOf(":")+1)).trim();
                      } else {
                        decor = deroule.substr(deroule.indexOf(":")+1).trim();
                      }
                      _self.init(decor, fade);
                      break;
                    
                    case "quiz_" :
                      is_swaping = false;
                      UniqueTimer.wait(t, function(){QuizBuilder.init(s, deroule, {perso:perso, prologue:is_prologue}, activityCallback);});
                      break;
                    
                    
                    case "clickpictos_" :
                      is_swaping = false;
                      UniqueTimer.wait(t, function(){ClickPictosBuilder.init(s, deroule, activityCallback);});
                      break;
                    
                    
                    case "classement_" :
                      is_swaping = false;
                      UniqueTimer.wait(t, function(){ClassementBuilder.init(s, deroule, activityCallback);});
                      break;
                    
                    
                    case "contenu_" :
                      is_swaping = false;
                      var deroule_activity, deroule_persotalk;
                      if (deroule.indexOf(",") != -1){
                        deroule_activity = deroule.substr(0, deroule.indexOf(",")).trim();
                        deroule_persotalk = parseInt(deroule.substr(deroule.indexOf(",")+1));
                      } else {
                        deroule_activity = deroule;
                      }
                      UniqueTimer.wait(t, function(){ContenuBuilder.init(s, deroule_activity, {perso:perso, persotalk:deroule_persotalk, prologue:is_prologue}, activityCallback);});
                      break;
                      
                    case "surmesure_" :
                      is_swaping = false;
                      var surMesureFile = deroule.substr(deroule.indexOf("_")+1);
                      loadJs(surMesureFile, function(){
                        eval(surMesureFile+"(activityCallback)");
                      });
                      break;
                      
                    case "surmesureonscene_" :
                      is_swaping = false;
                      s.visible = true;
                      var surMesureOnSceneFile = deroule.substr(deroule.indexOf("_")+1);
                      loadJs(surMesureOnSceneFile, function(){
                        eval(surMesureOnSceneFile+"(activityCallback)");
                      });
                      break;
                      
                    case "video_" :
                      // init screen
                      s.visible = false;
                      s.gotoAndStop("VIDEO");
                      
                      ResponsiveStage.storeClip("VIDEO", {horizontal:"fixed", vertical:"fixed", html_overlay_id:"video", html_overlay_ref_mc:"video"});
                      
                      WaitNextTick.init(function() {
                        $("#video").css('display', 'inline');
                        $("#video").css('opacity', '1');
                        // Player.getMediaInstance().setPoster("assets/images/videoposter.png"); // ** option **
                        Player.getMediaInstance().setSrc("assets/videos/"+deroule.substr(deroule.indexOf("_")+1)+".mp4");
                        Player.getMediaInstance().play();

                        Player.getMediaElementAddPlayEvent(function(){
                          s.visible = true;
                          canvas.style.opacity = '0';
                          CanvasTransition.init(null, "fadein");
                        });
                        
                        Player.getMediaElementAddEndEvent(function(){
                          $("#video").hide();
                          activityCallback();
                        });
                      });
                      break;
                      
                    default: launchIndex(); break;
                  }
                  
                  is_previous_activity = true;
                }
              }           
            }
          }
        }
        
        function activityCallback(){
          if (JsonHandler.getLine("STORY", index+1).deroule.substr(0,6).toLowerCase() == "titre:"){
            Player.goNext();
          } else {
            launchIndex();
          }
        }
          
        function switchVue(vue){
          s[screen]["scene"].x = s[screen].config[vue][0];
          s[screen]["scene"].y = s[screen].config[vue][1];
          s[screen]["scene"].scaleX = s[screen]["scene"].scaleY = (s[screen].config[vue][2]) / 100;
          if (vue.indexOf("persos") != -1){
            is_zoomed = false;
          } else {
            is_zoomed = true;
          }
        }
        
        function getActualPerso(val){
          if (val == undefined){
            val = "";
          }
          if (val.indexOf("{") == -1){
            return val.toLowerCase();
          } else {
            return val.substr(0, val.indexOf("{")).toLowerCase();
          }
        }
        
        function orientOrientablePerso(){
          var found_next_orient = false;
          var c = 0;
          while (!found_next_orient){
            if (JsonHandler.getLine("STORY", index+c) != undefined){
              if (JsonHandler.getLine("STORY", index+c).deroule.substr(0,6).toLowerCase() == "titre:"){
                found_next_orient = true;
              } else if (getActualPerso(JsonHandler.getLine("STORY", index+c).perso) != orientable_perso.name) {
                var next_perso = getActualPerso(JsonHandler.getLine("STORY", index+(c)).perso);
                if (next_perso != next_perso_to_look_at){
                  if (next_perso != ""){
                    next_perso_to_look_at = next_perso;
                    zoom_on_look_at = true;
                    var pos_on_look_at;
                    for (var i=0; i < s[screen].config.persos.length; i++){
                      if (s[screen].config.persos[i] == next_perso_to_look_at){
                        pos_on_look_at = i+1;
                        break;
                      }
                    }
                    if (pos_on_look_at < orientable_perso.place){
                      s[screen]["scene"]["perso"+orientable_perso.place].scaleX = Math.abs(s[screen]["scene"]["perso"+orientable_perso.place].scaleX);
                    } else {
                      s[screen]["scene"]["perso"+orientable_perso.place].scaleX = Math.abs(s[screen]["scene"]["perso"+orientable_perso.place].scaleX) * -1;
                    }
                  }
                }
                found_next_orient = true;
              }
            }
            c++;
          }

        }
        
        function loadJs(file, callback) {
          if (eval("typeof "+file) === "undefined") {
            var head = document.getElementsByTagName('head')[0];
            var el;
            el = document.createElement('script');
            el.type = 'text/javascript';
            if (el.readyState) {
              el.onreadystatechange = function () {
                if (el.readyState == "loaded" ||
                  el.readyState == "complete") {
                  el.onreadystatechange = null;
                  callback();
                }
              };
            } else {
              el.onreadystatechange = callback;
              el.onload = callback;
            }
            el.src = "assets/app/"+file+".js";
            head.appendChild(el);
          } else {
            callback();
          }
        }
      });
    }
  };
});
