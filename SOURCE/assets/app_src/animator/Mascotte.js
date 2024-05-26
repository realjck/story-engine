/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Mascotte
author: JCK

needs on stage:
mc_subtitles  > champ (textfield)
mc_mascotte > mc_mouthClosed
      > mc_mouthTalk > mc_mouthTalk_1, mc_mouthTalk_2, mc_mouthTalk_3, mc_mouthTalk_4

*/

define(['animator/Voice', 'util/OptionGetter', 'util/UniqueTimerForMascotte'], function(Voice, OptionGetter, UniqueTimerForMascotte) {

  var _allMascAr = [];
  var _self;


  return {
    
    initAll: function() {
      
      _self = this;
      
      for (var i=0; i<_allMascAr.length; i++){
        _self.init(_allMascAr[i]);
      }
    },
    
    init: function(mc) {
      if (mc != undefined){
        mc.gotoAndStop(0);
        if (mc.tete != undefined){
          mc.tete.mouthTalk.gotoAndStop(0);
        }
      }
    },
    
    play: function(mc, voice_file, options, callback) {
      
      if (mc != undefined){
        var is_in_record = false;
        for (var i=0; i<_allMascAr.length; i++){
          if (_allMascAr[i] == mc){
            is_in_record = true;
          }
        }
        if (!is_in_record){
          _allMascAr.push(mc);
        }
      }
      
      
      _self = this;
      var start = OptionGetter.get(options, "start", false);
      var end = OptionGetter.get(options, "end", false);
      var reaction = OptionGetter.get(options, "reaction", false);
      var chorus = OptionGetter.get(options, "chorus", false);
      var thinkTime = OptionGetter.get(options, "thinkTime", false);
      var text = OptionGetter.get(options, "text", null);
      var forceLoad = OptionGetter.get(options, "forceLoad", false);
      
      if (forceLoad && (voice_file.indexOf("debug.mp3") != -1)){
        forceLoad = false;
      }
      
      if (mc != undefined){
        _self.init(mc.tete);
      }
      
      if (thinkTime){
        UniqueTimerForMascotte.wait(thinkTime, launchPlay);
      } else {
        launchPlay();
      }
      
      function launchPlay(){
        
        var mctete;
        if (mc != undefined){
          mctete = mc.tete;
        }
        
        if (voice_file != undefined) {
          Voice.talk(voice_file, function(){
            if (end) {
              if (mc != undefined){
                mc.gotoAndPlay(end);
              }
            }
            if (reaction) {
              reaction[0].gotoAndPlay(reaction[1]);
            }
            if (callback != undefined) {
              callback();
            }
          },
          {
            character:mctete,
            onload:function(){
              if (start) {
                if (mc != undefined){
                  mc.gotoAndPlay(start);
                }
              }
            },
            chorus:chorus,
            text:text,
            forceLoad: forceLoad
          });
        } else {
          if (start) {
            if (mc != undefined){
              mc.gotoAndPlay(start);
            }
          }
        }
      }
      
    }
  };
});
