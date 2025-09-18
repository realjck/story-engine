/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Contenu Builder
Build Dynamic Content Pages from JSON

author: JCK

*/

define([
  "util/JsonHandler",
  "animator/ResponsiveStage",
  "animator/WaitNextTick",
  "animator/Button",
  "animator/ScrollPane",
  "animator/Tween",
  "animator/LoadImage",
  "util/LinesBreaker",
  "util/OptionGetter",
  "animator/Mascotte",
  "engine/ChapitrePlayer",
  "engine/Player",
  "util/UniqueTimer",
  "util/CanvasTransition",
  "animator/SoundJS"
  ], function(
  JsonHandler,
  ResponsiveStage,
  WaitNextTick,
  Button,
  ScrollPane,
  Tween,
  LoadImage,
  LinesBreaker,
  OptionGetter,
  Mascotte,
  ChapitrePlayer,
  Player,
  UniqueTimer,
  CanvasTransition,
  SoundJS
) {
  
  var contenu;

  return {
    init: function(s, json, options, callback){
      
      s.visible = false;
      
      s.gotoAndStop("CONTENU");
      
      var _screen = s.CONTENU;
      
      _screen.perso.visible = false;
      
      var _perso = OptionGetter.get(options, "perso", false);
      var _persotalk = OptionGetter.get(options, "persotalk", false);
      
      var _hassounds = false;
      
      _screen.scrollbounds.visible = false;
      _screen.bt_continue.visible = false;
      if (_screen.personnalisable != undefined) {
        _screen.personnalisable.visible = false;
      }
      _screen.image.removeAllChildren();
      
      if (contenu){
        _screen.removeChild(contenu);
      }
      
      WaitNextTick.init(function(){
        ResponsiveStage.storeClip("CONTENU", {horizontal:"fixed", vertical:"fixed"});
          
        if (_perso){
          _screen.perso.gotoAndStop(_perso);
          _screen.perso[_perso].gotoAndStop(0);
          _screen.perso.visible = true;
        }
        if (!OptionGetter.get(options, "prologue", false)){
          _screen.prologue_bg_zoom.visible = false;
        } else {
          _screen.prologue_bg_zoom.visible = true;
        }
        
        //s.visible = true;
        // canvas.style.opacity = '0';
        
      });
      
      var height_pointer = 20;
      
      JsonHandler.loadExcel(json, build);
      
      function build(){
        
        // CanvasTransition.init(null, "fadein");
        
        var lines = [];
        
        contenu = ScrollPane.init(_screen, "CONTENU_content", "scrollbounds", {
          scroll_bar_size:30,
          orientation:"vertical",
          constructor:function(content){
            
            var counter = 0;
            var media_type_previous_lines;
            var media_url_previous_lines;
            
            var image;
            var image_offset;
            var image_dimensions = {};
            var image_height_start;
            var offseted_lines = [];
            var image_loading;
            var media_type;
            
            var images_to_add = [];
            
            launchBuilder();
            
            function launchBuilder(){

              if (!JsonHandler.getLine(json, counter)){
                finishBuild();
              } else {
                
                var linetexte_full = JsonHandler.getLine(json, counter).texte;
                if (linetexte_full == undefined){
                  linetexte_full = "";
                }
                
                if (linetexte_full == "espace"){
                  
                  if (media_type_previous_lines == "left"){
                    validLeftImage();
                  }
                  
                  height_pointer += 40;
                  counter++;
                  launchBuilder();
                  
                } else {
                  linetexte_full = linetexte_full.replace("\t", "");
                  
                  var linetexte;
                  var type;
                  
                  if (linetexte_full.substr(0,1) == "-"){
                    linetexte = linetexte_full.substr(1);
                    type = "CONTENU_bullet";
                  } else if (linetexte_full.substr(0,6).toLowerCase() == "titre:"){
                    linetexte = linetexte_full.substr(6);
                    type = "CONTENU_titre";
                  } else if (linetexte_full.substr(0,5).toLowerCase() == "gras:"){
                    linetexte = linetexte_full.substr(5);
                    type = "CONTENU_gras";
                  } else if (linetexte_full.substr(0,6).toLowerCase() == "small:"){
                    linetexte = linetexte_full.substr(6);
                    type = "CONTENU_small";
                  } else {
                    linetexte = linetexte_full;
                    type = "CONTENU_paragraphe";
                  }
                  linetexte = linetexte.trim();
                  
                  var mc = new lib[type]();

                  media_type = false;
                  var image_url;
                  
                  
                  if (JsonHandler.getLine(json, counter).medias){
                    if (JsonHandler.getLine(json, counter).medias.substr(0,4).toLowerCase() == "img:"){
                      
                      image_url = "assets/images/medias/"+JsonHandler.getLine(json, counter).medias.substr(4).trim();
                      
                      if (linetexte != ""){
                        media_type = "left";
                      } else {
                        media_type = "singleimg";
                      }
                    } else if (JsonHandler.getLine(json, counter).medias.substr(0,8).toLowerCase() == "imgline:"){
                      
                      image_url = "assets/images/medias/"+JsonHandler.getLine(json, counter).medias.substr(8).trim();
                      media_type = "leftline";
                      
                    } else if (JsonHandler.getLine(json, counter).medias.substr(0,10).toLowerCase() == "imgcorner:"){
                      image_url = "assets/images/medias/"+JsonHandler.getLine(json, counter).medias.substr(10).trim();
                      LoadImage.init(_screen.image, image_url, function(w,h){
                        _screen.image.x = 1920-35-w;
                      });
                    } else if (JsonHandler.getLine(json, counter).medias.substr(0,4).toLowerCase() == "son:"){
                      _hassounds = true;
                    }
                  }
                  
                  if (media_type == "left"){
                    if (image_url != media_url_previous_lines){
                      if (media_type_previous_lines == "left"){
                        validLeftImage();
                      }
                      image_height_start = height_pointer;
                      LoadImage.init(mc, image_url,
                        function(w,h,img){
                          image = img;
                          image_dimensions.w = w;
                          image_dimensions.h = h;
                          image_offset = w+20;
                          addTextLine();
                        },
                        {position:[125,0]}
                      );

                    } else {
                      addTextLine();
                    }
                    media_type_previous_lines = media_type;
                    media_url_previous_lines = image_url;
                    
                  } else if (media_type == "singleimg"){
                    if (image_url != media_url_previous_lines){
                      if (media_type_previous_lines == "left"){
                        validLeftImage();
                      }
                      LoadImage.init(mc, image_url,
                        function(w,h,img){
                          var scale = 1;
                          if (w > 1420){
                            scale = 1420 / w;
                            if (__gm == "dev"){
                              console.log("Image has a width larger than 1420px, thus it has been scaled to "+Math.round(scale*100)+"%");
                            }
                          }
                          addTextLine(h * scale);
                        },
                        {position:[125,0]}
                      );

                    } else {
                      addTextLine();
                    }
                    media_type_previous_lines = media_type;
                    media_url_previous_lines = image_url;
                    
                  } else if (media_type == "leftline"){
                    
                    var img_size = 50;
                    if (type == "CONTENU_small"){
                      img_size = 40;
                    }
                    
                    LoadImage.init(mc, image_url,
                      function(w,h,img){
                        image = img;
                        image_dimensions.w = w;
                        image_dimensions.h = h;
                        image_offset = w+10;
                        addTextLine();
                      },
                      {position:[125,0], resize:[img_size,img_size]}
                    );
                    media_type_previous_lines = false;
                    media_url_previous_lines = false;
                  } else {
                    if (media_type_previous_lines == "left"){
                      validLeftImage();
                    }
                    addTextLine();
                  }
                  
                }
                  
                function validLeftImage(){
                  if (image_dimensions.h > (height_pointer - image_height_start)){
                    var scale = (height_pointer - image_height_start - getSpaceAfter(type)) / image_dimensions.h;
                    image.scaleX = image.scaleY = scale;
                    reworkOffsets();
                  } else {
                    //todo : cas où image plus petite que la hauteur du texte
                  }
                  
                  offseted_lines = [];
                  image_offset = false;
                  media_type_previous_lines = false;
                  media_url_previous_lines = false;
                  
                }
                
                function reworkOffsets(){

                  var decalage = Math.round(image_dimensions.w * image.scaleX) - image_dimensions.w;
                  
                  if (__gm == "dev"){
                    console.log("Image resized from "+image_dimensions.w+"x"+image_dimensions.h+" to "+Math.round(image_dimensions.w * image.scaleX)+"x"+Math.round(image_dimensions.h * image.scaleX));
                  }
                  
                  for (var i=0; i<offseted_lines.length; i++){
                    offseted_lines[i].champ.x += decalage;
                    offseted_lines[i].champ.lineWidth -= decalage;
                  }
                  
                }
                
                
                
                function addTextLine(height_of_single_image){
                  
                  mc.champ.text = linetexte;
                  if (_perso){
                    mc.x += 300;
                  }
                  
                  
                  if (height_of_single_image) {
                    
                    mc.y = height_pointer;
                    height_pointer += height_of_single_image;
                    
                  } else {
                    if (image_offset){
                      mc.champ.x = 125+15+image_offset;
                      mc.champ.lineWidth = 1420-image_offset-15;
                      offseted_lines.push(mc);
                    }
                    
                    if (_perso){
                      mc.champ.lineWidth -= 400;
                    }

                    height_pointer += getSpaceAfter(type);
                    
                    switch (type){
                      case "CONTENU_titre":
                        LinesBreaker.init(mc.champ);
                        break;
                        
                      case "CONTENU_gras":
                        LinesBreaker.init(mc.champ);
                        break;
                        
                      case "CONTENU_bullet":
                        LinesBreaker.init(mc.champ);
                        break;
                    }
                    
                    mc.y = height_pointer;
                    height_pointer += mc.champ.getMeasuredHeight();
                  }
                  
                  content.addChild(mc);
                  lines.push(mc);
                  
                  counter++;
                  
                  if (media_type == "leftline"){
                    image_offset = 0;
                  }
                  
                  launchBuilder();
                }
                
              }
              
              function getSpaceAfter(type){
                switch (type){
                  case "CONTENU_titre":
                    return 30;
                    break;
                    
                  case "CONTENU_gras":
                    return 30;
                    break;
                    
                  case "CONTENU_bullet":
                    return 20;
                    break;
                    
                  case "CONTENU_small":
                    return 20;
                    break;
                    
                  default:
                    return 30;
                    break;
                }

              }
              

            }
            
            function finishBuild(){
              
              s.visible = true;
              
              var bg = new createjs.Shape();
              
              bg.graphics.beginFill("#006666").drawRect(0, 0, _screen.scrollbounds.nominalBounds.width - 400, height_pointer);
              bg.alpha = 0.01;
              content.addChild(bg);
              content.setBounds(0,0,_screen.scrollbounds.nominalBounds.width, height_pointer);
              
              if (height_pointer < _screen.scrollbounds.getBounds().height){
                content.y = (_screen.scrollbounds.getBounds().height - height_pointer) / 2;
              } else {
                content.y = 0;
              }
              
              if (_hassounds){
                for (var i=0; i<counter; i++){
                  lines[i].visible = false;
                }
                
                counter = 0;
                
                launchLine();
                
                function launchLine(){
                  
                  if (JsonHandler.getLine(json, counter) != undefined){
                    if (JsonHandler.getLine(json, counter).medias != undefined){
                      if (JsonHandler.getLine(json, counter).medias.substr(0,4).toLowerCase() == "son:"){
                        
                        var son_url = "voice/"+JsonHandler.getLine(json, counter).medias.substr(4).trim()+".mp3";
                        var son = JsonHandler.getLine(json, counter).medias.substr(4).trim();
                        
                        if (Player.noVoice()){
                          son_url = "fx/debug.mp3";
                          son = "debug"
                        }
                        
                        if (!_perso){
                          var son_url = "assets/sounds/"+son+".mp3";
                          SoundJS.init(
                            son_url,
                            function(){
                              Tween.init(lines[counter]);
                            },
                            function(){
                              counter ++;
                              launchLine();
                            },
                            null,
                            true
                          );
                        } else {
                          Tween.init(lines[counter]);
                          
                          var fl = true;
                          if (Player.noVoice()){
                            fl = false;
                          }
                          Mascotte.play(_screen.perso[_perso], son, {text:"", forceLoad:fl}, function(){
                            UniqueTimer.wait(100, function(){
                              counter ++;
                              launchLine();
                            });
                          });
                        }
                      } else {
                        lines[counter].visible = true;
                        counter ++;
                        launchLine();
                      }
                    } else {
                      lines[counter].visible = true;
                      counter ++;
                      launchLine();
                    }
                  } else {
                    endContenu();
                  }
                  
                  
                }
                
              } else if (_persotalk){
                
                // if ((_persotalk == 1) || (_persotalk > counter)) {
                if (_persotalk != counter) {//**NEW** > may produce incorrect voice sync on previous builds contents
                  
                  var c = 0;
                  launchDial();
                  function launchDial(){
                    var line = ChapitrePlayer.getIndex() + 1;
                    
                    var o = {text:JsonHandler.getLine("STORY", line+c).deroule};
                    
                    if (Math.random() < 0.4){
                      o.start = "anim";
                    }
                    
                    Mascotte.play(_screen.perso[_perso], JsonHandler.getLine("STORY", line+c).son, o, function(){
                      UniqueTimer.wait(100, function(){
                        c++;
                        if (c == _persotalk){
                          endContenu();
                        } else {
                          launchDial();
                        }
                      });
                    });
                  }
                  
                } else {
                  
                  var i;
                  for (i=0; i<counter; i++){
                    lines[i].visible = false;
                  }
                  
                  if (_persotalk != counter){
                    for (i=0; i<= (counter - _persotalk); i++){
                      lines[i].visible = true;
                    }
                  } else {

                    i = 1;
                  }
                  
                  var c = 0;
                  launchDialSync();
                  function launchDialSync(){
                    Tween.init(lines[c+(i-1)]);
                    var line = ChapitrePlayer.getIndex() + 1;
                    Mascotte.play(_screen.perso[_perso], JsonHandler.getLine("STORY", line+c).son, {text:JsonHandler.getLine("STORY", line+c).deroule}, function(){
                      UniqueTimer.wait(100, function(){
                        c++;
                        if (c+(i-1) == counter){
                          endContenu();
                        } else {
                          launchDialSync();
                        }
                      });
                    });
                  }
                }
              } else {
                
                if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
                  _screen["personnalisable"].visible = true;
                }
                endContenu();
              }

            }
          }
        });
        
        function endContenu(){
          
          // _screen.setChildIndex(_screen.bt_continue, _screen.getNumChildren() - 1);

          Tween.init(_screen.bt_continue, {pop:true});
          Button.enableZoom(_screen.bt_continue, callback);
          
          if (_persotalk){
            ChapitrePlayer.incrementIndex(_persotalk);
          }
          
        }
      }
    }
  };
});
