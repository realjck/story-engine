/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

// STORY PLAYER ENGINE v4
// author: JCK
define(['util/ResponsiveScale', 'util/JsonHandler', 'animator/Tween', 'animator/Voice', 'util/CanvasTransition', 'util/ModalDialog', 'dojox/timing', 'dojo/dom', 'dojo/_base/fx', 'dojo/on', 'dojo/dom-style', 'dojox/timing', 'animator/RemoveEvents', 'util/UniqueTimer', 'util/Sequencer', 'util/UniqueTimerForVoice', 'animator/TimerClip', 'animator/ResponsiveStage', 'animator/Button', 'animator/SoundJS', 'animator/VerticalTextCenterer', 'animator/MaskObjects', 'animator/Mascotte', 'animator/SceneManager', 'engine/ChapitrePlayer', 'engine/SlideIntro', 'util/LinesBreaker', 'pdf/pdf_report', 'util/SoundJS_NoQueue', 'animator/Voice', 'animator/WaitClipEnd', 'exports', 'dojo/domReady!'], function(ResponsiveScale, JsonHandler, Tween, Voice, CanvasTransition, ModalDialog, timing,dom, fx, on, style, timing, RemoveEvents, UniqueTimer, Sequencer, UniqueTimerForVoice, TimerClip, ResponsiveStage, Button, SoundJS, VerticalTextCenterer, MaskObjects, Mascotte, SceneManager, ChapitrePlayer, SlideIntro, LinesBreaker, pdf_report, SoundJS_NoQueue, Voice, WaitClipEnd, exports) {

  var _slides = [];
  
  var _chapitres = [];
  var _contenus = [];

  var _self;

  var _currentSlideNumber = -1;
  var _scoreAr = [];

  var _isSubtitles = true;

  var _isBtNextFlashing = false;
  var _btNextFlashSpeed = 500;
  var _btNextFlashTimer;

  var _successScore;
  var _inactivityTime;
  var _suspendToSave = ["slides_vus", "aide_vue", "resultats"];
  var _isScorm;
  
  var _sessionStartTime;
  var _timeFormat;
  
  var _suspend = new Object();
  var _prevEnabled;
  var _replayEnabled;
  
  var _cookie_name = "animate_data ";
  
  var _isUnlocked;
  var _slidesUnlocked = [];
  
  var _isIe = undefined;
  var _isMobile = false;
  
  var _mediaElement;
  var _mediaElement_instance;
  var _mediaElement_play_event;
  var _mediaElement_end_event;
  
  var _no_voice;
  
  var _is_disconnected;
  
  var _excelStory;
  
  var _storyHasAnim = false;
  
  var _learnerName;
  
  exports.getExcelStory = function(){
    return _excelStory;
  }
  
  exports.getStoryHasAnim = function(){
    return _storyHasAnim;
  }
  
  exports.getLearnerName = function(){
    return _self.getLearnerName();
  }
  
  exports.getScore = function(){
    return _self.getScore();
  }
  
  exports.getSuspendArrayOfStrings = function(parameter, position) {
    return _self.getSuspendArrayOfStrings(parameter, position);
  }
  
  exports.isIe = function(){
    return _self.isIe();
  }
  
  exports.isMobile = function(){
    return _isMobile;
  }
  
  exports.waitClickNext = function(){
    return _self.waitClickNext();
  }
  
  exports.goNext = function(){
    return _self.goNext();
  }
  
  exports.getCurrentChapter = function(){
    var ret;
    if (_chapitres[_currentSlideNumber] == undefined){
      ret = _chapitres[0];
    } else {
      ret = _chapitres[_currentSlideNumber];
    }
    return ret;
  }
  
  exports.noVoice = function(){
    return _no_voice;
  }
  
  exports.recordScore = function(index, value){
    return _self.recordScore(index, value);
  }
  
  exports.scormFinish = function(){
    return _self.scormFinish();
  }
  
  exports.isScorm = function(){
    return _isScorm;
  }
  
  exports.unlockCurrent = function(){
    return _self.unlockCurrent();
  }
  
  exports.getSuspend = function(parameter){
    return _self.getSuspend(parameter);
  }
  
  exports.setSuspend = function(parameter, value){
    _self.setSuspend(parameter, value);
  }
  
  exports.scormRecordScore = function(){
    _self.scormRecordScore();
  }
  
  exports.getMediaInstance = function(){
    return _self.getMediaInstance();
  }
  
  exports.getMediaElementAddPlayEvent = function(cb){
    return _self.getMediaElementAddPlayEvent(cb);
  }
  
  exports.getMediaElementAddEndEvent = function(cb){
    return _self.getMediaElementAddEndEvent(cb);
  }
  
  //SR VERSION :
  var _counter = 1;
  var _screen;
  var _qcufinal_count = 0;
  var _qcufinal_right = 0;


  return {
    //SR VERSION:
    initSr: function () {
      
      if (location.search.split('e=')[1] != undefined){
        _counter = Number(location.search.split('e=')[1]);
      }
      
      //JsonHandler.load("assets/app/config.json", "config", loadStoryboard); todo
      
      $('#focusguard-2').on('focus', function () {
        $('#sr-title').focus();
      });
      $('#focusguard-1').on('focus', function () {
        $('#sr-btnext').focus();
      });
      $("#focusguard-next").focusout(function(){
        $("#focusguard-next").hide();
      });
    },
      
    init: function () {
      _self = this;

      createjs.Touch.enable(stage);

      stage.enableMouseOver(60);

      canvas.style.opacity = '0';
      canvas.style.display = 'inline-block';

      ResponsiveStage.init(s);

      s.mc_subtitles.visible = false;
      s.aide.visible = false;

      _self.initSuspend();

      _self.loadExternal();
    },
    
    initSuspend: function() {
      for (var i=0; i<_suspendToSave.length; i++) {
        _suspend[_suspendToSave[i]] = "";
      }
      _currentSlideNumber = -1;
      _scoreAr = [];
      _slidesUnlocked = [];
    },
    
    initCurrentSlideNumber: function() {
      _currentSlideNumber = -1;
    },
    

    loadExternal: function() {
      Sequencer.launch([
        function(next) {
          
          var url = "assets/data/" + __ExcelName;

          var req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.responseType = "arraybuffer";

          req.onreadystatechange  = function(e) {
            
            if (req.readyState == 4){
              if (req.status == 200){
                var data = new Uint8Array(req.response);
                var workbook = XLSX.read(data, {type:"array"});

                var sheets = workbook.SheetNames;
                var result = {};
                
                $("#sheet-list").empty();
                for (var i=0; i<sheets.length; i++){
                  $("#sheet-list").append("<li>"+sheets[i]+"</li>");
                  result[sheets[i]] = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[i]]);
                }
                
                _excelStory = result;
                next();

              } else {
                next();
              }
            }
          }
          
          req.send();
        },
        function(next) {
          $('#videoplayer').mediaelementplayer({
            success: function(mediaElement, originalNode, instance) {
              _mediaElement = mediaElement;
              _mediaElement_instance = instance;
              next();
            },
            stretching: 'responsive',
            setDimensions: false,
            showPosterWhenEnded: false
          });
        },
        function(next) {
          JsonHandler.loadExcel("CONFIG", next);
        },
        function(next) {
          JsonHandler.loadExcel("STORY", next);
        },
        function(next) {
          JsonHandler.load("assets/data/fx_list.json", "fx_list", next);
        },
        function(next) {
          // if (_self.isIe()) {
          //  _self.preLaunch();
          // } else {
          //  _self.preloadSounds();
          // }
          _self.preloadSounds();
        }
      ]);
    },
    
    preloadSounds: function() {
      
      var counter = 0;
      var son;
      getSoundNextLine();
      
      function getSoundNextLine(){  
        counter++;
        son = JsonHandler.getLine("STORY", counter).son;
        if (isValid(son)){
          if(!__disableAjax){
            $.ajax({
              url:'assets/sounds/voice/'+son+".mp3",
              type:'GET',
              error: function() {
                console.log("NO VOICE FILES DETECTED");
                _no_voice = true;
                _self.preloadFx(); 
              },
              success: preloadVoices
            });
          } else {
            preloadVoices();
          }
          function preloadVoices(){
            var manifest = [];
            var nb_sounds = 0;            
            var counter = 0;
            while(isValid(JsonHandler.getLine("STORY", counter))){
              var son = JsonHandler.getLine("STORY", counter).son;
              if (isValid(son)){
                var obj = new Object;
                obj.id = son;
                obj.src = "assets/sounds/voice/" + son+".mp3"
                manifest.push(obj);
                nb_sounds++;
              }
              counter++;
            }

            var queue = new createjs.LoadQueue(false, null, true);//new
            createjs.Sound.alternateExtensions = ["mp3"];
            queue.installPlugin(createjs.Sound);
            queue.on("fileload", updatePct)
            queue.on("complete", _self.preloadFx);
            queue.on("error", function(){
              _isIe = true;
            });
            queue.loadManifest(manifest);

            counter = 0
            function updatePct(){
              counter ++;
              var pct = Math.round(counter / manifest.length * 100);
              if (__imagesLoaded){
                document.getElementById("loader_text").innerHTML = __gtexts[__lang].loading3+" : "+pct+"%";
              }
            }
            /*
            createjs.Sound.on("fileload", handleFileLoad);
            createjs.Sound.registerSounds(manifest, "assets/sounds/voice/");
            counter = 0;
            function handleFileLoad(event) {
              counter++;
              if (counter == nb_sounds) {
                _self.preloadFx();
              }
            }
            */
          }
        } else {
          getSoundNextLine();
        }
      }
    },
    
    preloadFx: function() {
      var queue = new createjs.LoadQueue(false, null, true);//new
      var manifest = [];
      var nb_sounds = JsonHandler.getLength("fx_list");
      for (var i=1; i<=nb_sounds ; i++){
        var obj = new Object;
        obj.id = JsonHandler.get("fx_list", i);
        obj.src = "assets/sounds/fx/" + JsonHandler.get("fx_list", i)+".mp3";
        manifest.push(obj);
      }
      createjs.Sound.alternateExtensions = ["mp3"];
      queue.installPlugin(createjs.Sound);
      queue.on("complete", _self.preLaunch);
      queue.loadManifest(manifest);
      /*
      createjs.Sound.on("fileload", handleFileLoad);
      createjs.Sound.registerSounds(manifest, "assets/sounds/fx/");
      var counter = 0;
      function handleFileLoad(event) {
        counter++;
        if (counter == nb_sounds) {
          _self.preLaunch();
        }
      }
      */
    },
    
    preLaunch: function(){
      
      _cookie_name += JsonHandler.get("CONFIG", "titre");
      __lang = JsonHandler.get("CONFIG", "langue");
      
      $("#loader").hide();
      $("#animation_container").show();
      
      _self.loadScorm();
    },

    loadScorm: function() {
      
      // show nb entries (for visual loader)
      if (__gm == "dev") {
        console.log("nb elements chargés : "+performance.getEntries().length);
      }

      
      function loadSuspendData(suspend) {
        // get current slide index
        _currentSlideNumber = parseInt(suspend.split(";")[0]);
        // get scores
        _scoreAr = ((suspend.split(";")[1]).split(",")).slice();
        // get other suspend data
        var suspend_loaded = ((suspend.split(";")[2]).split(",")).slice();
        for (var i=0; i<suspend_loaded.length; i++) {
          _self.setSuspend(_suspendToSave[i], suspend_loaded[i]);
        }
        
        if (JsonHandler.get("CONFIG", "reprise_automatique").trim().toLowerCase() == "yes"){
          _self.launch();
        }
      }
      function launchBookmark() {
        if (_isScorm && pipwerks.SCORM.get("cmi.completion_status") == "completed") {
          _self.setSuspend("aide_vue", "1");
          _self.launch(true);
        } else {
          if (isValid(suspend)) {
            loadSuspendData(suspend);
            if (JsonHandler.get("CONFIG", "reprise_automatique").trim().toLowerCase() != "yes"){
              ModalDialog.ask(__gtexts[__lang].sr_reprise2, __gtexts[__lang].non, __gtexts[__lang].oui, function(){
                _self.initSuspend();
                _self.launch();
              },
              function() {
                _self.launch();
              });
            } else {
              console.log("- autoload bookmark -");
            }
          } else {
            _self.launch();
          }
        }          
      }
      if (__gm == "lms") {
        //SCORM
        if (pipwerks.SCORM.init()) {
          _isScorm = true;
          _sessionStartTime = new Date();
          if (__scorm == "1.2") {
            pipwerks.SCORM.set("cmi.core.exit", "suspend");
          } else {
            pipwerks.SCORM.set("cmi.exit", "suspend");
          }
          pipwerks.SCORM.save();

          var suspend = pipwerks.SCORM.get("cmi.suspend_data");
          
          launchBookmark();

        } else {
          _isScorm = false;
          ModalDialog.action(__gtexts[__lang].nolms, __gtexts[__lang].continuer, _self.launch);
        }
      } else {
        _isScorm = false;
        var suspend = Cookies.get(_cookie_name);
        
        launchBookmark();
      }
    },
    
    disconnect: function(msg){
      if (!_is_disconnected) {
        _is_disconnected = true;
        _self.scormSaveState();
        pipwerks.SCORM.quit();
        CanvasTransition.init();
        if (msg != undefined) {
          ModalDialog.alert(msg);
        }
      }
    },

    launch: function(unlock) {
      
      // get learner name asap
      _self.getLearnerName();
      
      // chapitres list
      // also check if anim
      var counter = 0;
      while(isValid(JsonHandler.getLine("STORY", counter))){
        // check titles
        if (JsonHandler.getLine("STORY", counter).deroule.substr(0,6) == "TITRE:"){
          var text = JsonHandler.getLine("STORY", counter).deroule;
          var chapitre = {};
          chapitre.titre = text.substr(text.indexOf(":")+1, text.lastIndexOf(",") - (text.indexOf(":")+1)).trim();
          chapitre.decor = text.substr(text.lastIndexOf(":")+1).trim();
          chapitre.index = counter + 1;
          _chapitres.push(chapitre);
        }
        // check anim
        if (JsonHandler.getLine("STORY", counter).anim){
          _storyHasAnim = true;
        }
        counter++;
      }
      
      // fullscreen possible ? // todo : à détecter automatiquement
      if (__nofs){
        s.aide.textes.part3.visible = false;
        s.nav.bt_fullscreen.visible = false;
        s.navinfo.infobulle_fullscreen.visible = false;
        
        s.navinfo.infobulle_next.gotoAndStop("nofs");
        
        var decalage = 114;
        
        s.aide.textes.part2.x += decalage;
        s.nav.bt_pause.x += decalage;
        s.nav.bt_next.x += decalage;
        s.navinfo.infobulle_pause.x += decalage;
        s.navinfo.infobulle_next.x += decalage;
        s.nav.bt_restart.x += decalage;
        s.navinfo.infobulle_restart.x += decalage;
        
      }
      
      // get success score from config
      if (isValid(JsonHandler.get("CONFIG", "succes"))) {
        _successScore = parseInt(JsonHandler.get("CONFIG", "succes"));
      }

      // fade out loader
      fx.fadeOut({node:"loader", duration:200, onEnd:function(){
        document.getElementById("loader").style.display = 'none';
      }}).play();
      
      
      // inactivity timer
      if (isValid(JsonHandler.get("CONFIG", "inactivite"))) {
        
        _inactivityTime = parseInt(JsonHandler.get("CONFIG", "inactivite"));
        
        var inactivity_timer = new dojox.timing.Timer(1000*60);
        var idleTime = 0;
        $(this).mousemove(function (e) {
          idleTime = 0;
        });
        $(this).keypress(function (e) {
          idleTime = 0;
        });
        inactivity_timer.onTick = function() {
          idleTime++;
          if (idleTime>=_inactivityTime) {
            inactivity_timer.stop();
            _self.disconnect(__gtexts[__lang].inactivite);
          }
        }
        inactivity_timer.start();
      }

      // interface responsive
      ResponsiveStage.storeClip("nav", {horizontal:"fixed", vertical:"fixed"});
      ResponsiveStage.storeClip("navinfo", {horizontal:"fixed", vertical:"fixed"});
      ResponsiveStage.storeClip("aide", {horizontal:"fixed", vertical:"fixed"});
      ResponsiveStage.storeClip("mc_subtitles", {horizontal:"center", vertical:"fixed"});
      ResponsiveStage.storeClip("mc_pause", {maximize:"height", horizontal:"center"});
      ResponsiveStage.storeClip("mc_titre_slide", {horizontal:"center", vertical:"fixed"});
      
      
      /*
      s.nav.bt_quit.addEventListener("click", function() {
        ModalDialog.alert(ExternalText.getText("module", "fermeture"));
        window.open('','_self');
        window.top.close();
        disconnect();
      });
      */
      s.nav.bt_subtitles.addEventListener("click", onBtSubtitlesClick);
      s.nav.bt_subtitles.addEventListener("rollover", onBtSubtitlesRollOver);
      s.nav.bt_subtitles.addEventListener("rollout", onBtSubtitlesRollOut);
      s.nav.bt_subtitles.cursor = "pointer";

      function onBtSubtitlesClick(e) {
        if (_isSubtitles == false) {
          _isSubtitles = true;
          s.mc_subtitles.visible = true;
        } else {
          _isSubtitles = false;
          s.mc_subtitles.visible = false;
          e.currentTarget.gotoAndStop("off");
        }
      }
      function onBtSubtitlesRollOver(e) {
        if (_isSubtitles == false) {
          e.currentTarget.gotoAndStop("on");
        }
      }
      function onBtSubtitlesRollOut(e) {
        if (_isSubtitles == false) {
          e.currentTarget.gotoAndStop("off");
        }
      }
      
      if (_isSubtitles) {
        s.mc_subtitles.visible = true;
        s.nav.bt_subtitles.gotoAndStop("on");
      }

      s.nav.bt_fullscreen.addEventListener("click", onBtFullScreenClick);
      function onBtFullScreenClick() {
        ResponsiveScale.toggleFS();
      }
      
      // gestion infobulles
      function addInfobulle(bt, infobulle) {
        infobulle.visible = false;
        bt.addEventListener("rollover", function(){
          Tween.init(infobulle, {fade:true, duration:200});
        });
        bt.addEventListener("rollout", function(){
          if (infobulle.visible == true) {
            Tween.init(infobulle, {fadeout:true, duration:200});
          }
        });
      }
      addInfobulle(s.nav.bt_home, s.navinfo.infobulle_home);
      addInfobulle(s.nav.bt_subtitles, s.navinfo.infobulle_subtitles);
      addInfobulle(s.nav.bt_pause, s.navinfo.infobulle_pause);
      addInfobulle(s.nav.bt_next, s.navinfo.infobulle_next);
      addInfobulle(s.nav.bt_fullscreen, s.navinfo.infobulle_fullscreen);
      addInfobulle(s.nav.bt_menu_off, s.navinfo.infobulle_menu);
      addInfobulle(s.nav.bt_restart, s.navinfo.infobulle_restart);
      
      // pause
      s.mc_pause.visible = false;
      Button.enable(s.nav.bt_pause, function(){
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
        } else {
          s.mc_pause.visible = true;
          pause();
        }
      }, null, null, {noTrigger:true});
      
      Button.enable(s.mc_pause, function(){
        s.mc_pause.visible = false;
        unpause();
      }, null, null, {forceVisible:false, noTrigger:true});
      
      function pause(){
        Voice.pause();
        UniqueTimer.pause();
        UniqueTimerForVoice.pause();
        Tween.pause();
      }
      
      function unpause(){
        Voice.unpause();
        UniqueTimer.resume();
        UniqueTimerForVoice.resume();
        Tween.resume();
      }

      /*
      s.nav.bt_previous.addEventListener("click", onBtPreviousClick);
      function onBtPreviousClick() {
        // fadeout overlay video
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
          $("#video").finish();
          $("#video").animate({
            opacity: 0,
          }, 500, 'easeInSine');
        }
        _self.disableNav();
        _currentSlideNumber--;
        _self.checkUnlock();
        _self.goCurrentSlideNumber();
      }
      */
      
      if (JsonHandler.get("CONFIG", "version").substr(JsonHandler.get("CONFIG", "version").length - 4).toLowerCase() == "demo"){
        _isUnlocked = true;
      }
      
      // menu
      s.nav.menu.visible = false;
      s.nav.bt_menu_on.visible = false;
      
      var counter = 1;

      for (var i=0; i<_chapitres.length; i++) {
        s.nav.menu["item"+counter].champ.text = _chapitres[i].titre;
        s.nav.menu["item"+counter].slide_num = i;
        counter++;
      }
      
      var larg_prog = (20*i) + (5*(i-1));
      s.nav.progression.x = 480 + ((960 - larg_prog) / 2);
      
      for (i=counter; i<=16; i++) {
        s.nav.menu["item"+i].visible = false;
        s.nav.progression["prog"+i].visible = false;
      }
      _self.checkUnlock(); //enable or disable items
      
      s.nav.bt_menu_off.addEventListener("click", function(){
        Tween.init(s.nav.menu, {from:"left", distance:1920, duration:600, fade:false});
        s.nav.bt_menu_on.visible = true;
        s.mc_subtitles.visible = false;
        // pause everything but tweens
        Voice.pause();
        UniqueTimer.pause();
        UniqueTimerForVoice.pause();
      });
      
      s.nav.bt_menu_on.addEventListener("click", function(){
        Tween.init(s.nav.menu, {to:"left", distance:1920, duration:600, fade:false});
        s.nav.bt_menu_on.visible = false;
        if (_isSubtitles){
          s.mc_subtitles.visible = true;
        }
        unpause();
      });
      
      Button.enable(s.nav.bt_restart, function(){
        _self.goCurrentSlideNumber();
      }, null, null, {noTrigger: true});
      
      // START
      _self.goCurrentSlideNumber();
      _self.activeNav();
      
      // shortcut debride nav
      var shortcut_code;
      shortcut.add("U",function() {
        shortcut_code = 0;
        sendShortcode(1);
      });
      shortcut.add("N",function() {
        sendShortcode(2);
      });
      shortcut.add("L",function() {
        sendShortcode(3);
      });
      shortcut.add("O",function() {
        sendShortcode(4);
      });
      shortcut.add("C",function() {
        sendShortcode(5);
      });
      shortcut.add("K",function() {
        sendShortcode(6);
      });
      function sendShortcode(val){
        if (val-shortcut_code == 1) {
          shortcut_code = val;
        }
        if (shortcut_code == 6) {
          _isUnlocked = true;
          // s.nav.bt_next.mouseEnabled = true;
          // s.nav.bt_next.alpha = 1;
          _self.activeBtNext();
          _self.checkUnlock();
          ModalDialog.alert("Navigation déverrouillée");
        }
      }
      if ((JsonHandler.get("CONFIG", "unlock") == "yes") || unlock) {
        _isUnlocked = true;
        _self.activeBtNext();
        _self.checkUnlock();
      }

      // Catch JS error and stop program
      window.onerror = function(messageOrEvent, source, noligne, nocolonne, erreur) {
        ModalDialog.ask(__gtexts[__lang].error, __gtexts[__lang].error_bt1, __gtexts[__lang].error_bt2, function(){
          pdf_report.print({
            message : messageOrEvent,
            source : source,
            noligne : noligne,
            nocolonne : nocolonne,
            erreur : erreur,
            bookmark : JSON.stringify(_suspend)
          });
        }, _self.disconnect);
      };
    },
    
    activeBtNext: function(){
      Button.enable(s.nav.bt_next,
        function(e){
          _self.goNext();
        },
        function(e){
          if (!_isBtNextFlashing) {
            e.currentTarget.gotoAndStop("on");
          } 
        },
        function(e){
          if (!_isBtNextFlashing) {
            e.currentTarget.gotoAndStop("off");
          }
        }
      );
    },
    
    checkUnlock: function(){
      
      for (var i=1; i<=_chapitres.length; i++) {

        if (_self.getSuspendCharAt("slides_vus", i) == "1"){
          _slidesUnlocked[i-1] = true;
        } else {
          _slidesUnlocked[i-1] = false;
        }
        
      }

      //menu items
      
      var last_vu;
      for (i=1; i<=16; i++){
        if (s.nav.menu["item"+i].slide_num != undefined){
          if (_slidesUnlocked[i-1] || _isUnlocked){
            
            if (i < _chapitres.length){
              last_vu = i;
            } else {
              last_vu = false;
            }
            
            s.nav.menu["item"+i].gotoAndStop("vu");
            s.nav.progression["prog"+i].gotoAndStop("vu");
            
            activeMenuItem(i);

          } else {
            s.nav.menu["item"+i].gotoAndStop("nonvu");
            s.nav.progression["prog"+i].gotoAndStop("off");
            Button.disable(s.nav.menu["item"+i]);
            // s.nav.menu["item"+i].champ.color = "#5C5C5C";
            s.nav.menu["item"+i].champ.alpha = 0.25;
            if (last_vu){
              activeMenuItem(i);
              last_vu = false;
            }
          }
        }
      }
      
      if (_currentSlideNumber >= 0){
        activeMenuItem(_currentSlideNumber + 1);
        s.nav.progression["prog"+(_currentSlideNumber + 1)].gotoAndStop("on");
      }
      
      function activeMenuItem(i){
        if (s.nav.menu["item"+i] != undefined){
          // s.nav.menu["item"+i].champ.color = "#EAEAEA";
          s.nav.menu["item"+i].champ.alpha = 1;
          Button.enable(s.nav.menu["item"+i],
            function(e){
              s.nav.menu.visible = false;
              s.nav.bt_menu_on.visible = false;
              
              // unpause (from openning menu)
              Voice.unpause();
              UniqueTimer.resume();
              UniqueTimerForVoice.resume();
        
              _self.goSlide(e.currentTarget.slide_num+1);
              if (_isSubtitles){
                s.mc_subtitles.visible = true;
              }
            },
            function(e){
              e.currentTarget.champ.font = e.currentTarget.champ.font.replace("'Raleway'", "'Raleway ExtraBold'");
            },
            function(e){
              e.currentTarget.champ.font = e.currentTarget.champ.font.replace("'Raleway ExtraBold'", "'Raleway'");
            }
          );
        }
      }
      
    },
    
    //video
    getMediaElement: function(){
      return _mediaElement;
    },
    getMediaInstance: function(){
      return _mediaElement_instance;
    },
    
    getMediaElementAddPlayEvent: function(callback){
      _mediaElement.addEventListener("playing", callback);
      _mediaElement_play_event = callback;
    },
    
    getMediaElementAddEndEvent: function(callback){
      _mediaElement.addEventListener("ended", callback);
      _mediaElement_end_event = callback;
    },

    waitClickNext: function() {

      _self.setVuCurrentSlide();
      
      var bton = false;

      if (_isBtNextFlashing == false) {

        _isBtNextFlashing = true;

        _btNextFlashTimer = new dojox.timing.Timer(_btNextFlashSpeed);
        _btNextFlashTimer.onTick = function() {
          if (bton) {
            s.nav.bt_next.gotoAndStop("off");
            _self.activeBtNext();
            bton = false;
          } else {
            s.nav.bt_next.gotoAndStop("highlight");
            _self.activeBtNext();
            bton = true;
          }
        }
        _btNextFlashTimer.start();
      }
    },

    disableNav: function() {;
      Button.disable(s.nav.bt_next);
      // s.nav.bt_previous.mouseEnabled = false;
    },
    
    disablePrev: function() {
      // s.nav.bt_previous.mouseEnabled = false;
      _prevEnabled = false;
    },
    
    disableReplay: function() {
      s.bt_replay.mouseEnabled = false;
      _replayEnabled = false;
    },

    activeNav: function() {
      if (_currentSlideNumber < (_chapitres.length)-1) {
        if ( _isUnlocked || _slidesUnlocked[_currentSlideNumber] ) {
          _self.activeBtNext();
        } else {
          Button.disable(s.nav.bt_next);
          s.nav.bt_next.alpha = 0.3;
        }
        s.nav.bt_next.visible = true;
      } else {
        s.nav.bt_next.visible = false;
      }
      /*
      if (_currentSlideNumber > 0) {
        if (_prevEnabled) {
          s.nav.bt_previous.mouseEnabled = true;
        }
        s.nav.bt_previous.visible = true;
      } else {
        s.nav.bt_previous.visible = false;
      }
      */
      Button.enable(s.nav.bt_home, function() {
        _self.goSlide(0);
      });
    },
    
    setVuCurrentSlide: function() {
      if (_self.getSuspendCharAt("slides_vus", _currentSlideNumber+1) != "0") {
        _self.setSuspendCharAt("slides_vus", _currentSlideNumber+1, "1");
      }
    },

    goNext: function() {

      _self.setVuCurrentSlide();
    
      if (_isBtNextFlashing) {
        _isBtNextFlashing = false;
        _btNextFlashTimer.stop();
      }
      s.nav.bt_next.gotoAndStop("off");
      _self.disableNav();

      _currentSlideNumber++;

      // BREAK IF OUT
      if (_currentSlideNumber == _chapitres.length){
        s.nav.bt_next.visible = false;
        _self.scormFinish();
        ModalDialog.alert(__gtexts[__lang].quizfin_close);
      } else {
      
        _self.checkUnlock();
        
        // fadeout overlay video
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
          $("#video").finish();
          $("#video").animate({
            opacity: 0,
          }, 500, 'easeInSine');
        }
        
        _self.goCurrentSlideNumber();     
      }
    },
    
    goSlide: function(num) {
      
      _currentSlideNumber = num-1;
      if (_isBtNextFlashing) {
        _isBtNextFlashing = false;
        _btNextFlashTimer.stop();
      }
      s.nav.bt_next.gotoAndStop("off");
      _self.disableNav();
      _self.checkUnlock();
      
      if ($("#video").css('display') != "none"){
        if (_mediaElement_instance != undefined) {
          _mediaElement_instance.pause();
        }
        $("#video").finish();
      }

      _self.goCurrentSlideNumber();
    },
    
    goSlideName: function(name) {
      
      var num = -1;
      for (var i=0; i<_slides.length; i++) {
        if (_slides[i] == name) {
          num = i;
        }
      }
      if (num == -1) {
        console.log("**goSlideName ERROR: '"+name+"' is not a referenced slide name.**");
      } else {
        _currentSlideNumber = num;
        // fadeout overlay video
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
          $("#video").finish();
          $("#video").animate({
            opacity: 0,
          }, 500, 'easeInSine');
        }
        _self.goCurrentSlideNumber();
      }
    },

    goCurrentSlideNumber: function() {
      // reactive buttons
      _prevEnabled = true;
      _replayEnabled = true;
      
      // video
      if (_mediaElement_play_event != undefined){
        _mediaElement.removeEventListener("playing", _mediaElement_play_event);
      }
      if (_mediaElement_end_event != undefined){
        _mediaElement.removeEventListener("ended", _mediaElement_end_event);
      }
      $("#video").hide();

      // stop btNext flashing

      if (_isBtNextFlashing) {
        _isBtNextFlashing = false;
        _btNextFlashTimer.stop();
        s.nav.bt_next.gotoAndStop("off");
      }

      // stop createjs things
      SoundJS.abort();
      Tween.abort();
      
      // mask infobulles
      MaskObjects.init(s.navinfo, ["infobulle_home", "infobulle_subtitles", "infobulle_pause", "infobulle_next", "infobulle_fullscreen", "infobulle_menu"], {noInit:true});
      
      // mask menu
      s.nav.menu.visible = false;
      
      // abort sequencer
      Sequencer.abort();

      // disable events
      RemoveEvents.init(s, [s.nav.bt_next, s.nav.bt_home, s.nav.bt_subtitles, s.nav.bt_pause, s.mc_pause, s.nav.bt_fullscreen, s.nav.bt_menu_off, s.nav.bt_menu_on, s.nav.menu.item1, s.nav.menu.item2, s.nav.menu.item3, s.nav.menu.item4, s.nav.menu.item5, s.nav.menu.item6, s.nav.menu.item7, s.nav.menu.item8, s.nav.menu.item9, s.nav.menu.item10, s.nav.menu.item11, s.nav.menu.item12, s.nav.menu.item13, s.nav.menu.item14, s.nav.menu.item15, s.nav.menu.item16]);
      // RemoveEvents.init(s, []);

      // stop static timers
      UniqueTimer.stop();
      UniqueTimerForVoice.stop();
      TimerClip.abort();

      // reposition mc interrupted tweens
      Tween.initOldPos();
      
      // reset SceneManager character positions
      SceneManager.reset();

      // stop Mascotte Talk, empty subtitles
      Mascotte.initAll();
      Voice.stopTalk();

      // reinitialize cursor (in this case for the game that changes it)
      s.cursor = "initial";
      
      // remove stage events like stagemousemove, etc.
      stage.removeAllEventListeners();
      
      // remove all tweens
      createjs.Tween.removeAllTweens();

      // start screen
      // gestion ecrans titres pour modules diversité
      if (_currentSlideNumber != -1){
        s.mc_titre_slide.champ.text = _chapitres[_currentSlideNumber].titre;
        s.nav.titre.text = (_currentSlideNumber+1)+"/"+_chapitres.length+" - "+_chapitres[_currentSlideNumber].titre;
        LinesBreaker.init(s.mc_titre_slide.champ, {equal:true});
        LinesBreaker.init(s.nav.titre, {equal:true});
        VerticalTextCenterer.init(s.mc_titre_slide.champ, 1080, "middle");
        VerticalTextCenterer.init(s.nav.titre, 85, "middle");
        
        SoundJS.init("assets/sounds/fx/titre.mp3", function() {
          s.mc_titre_slide.visible = true;
          s.mc_titre_slide.alpha = 1;
          
          Sequencer.launch([
            function(next) {
              $("#canvas").css('opacity', '1');
            },
            function(next) {
              ChapitrePlayer.init();
              setTimeout(function(){
                s.mc_titre_slide.visible = false;
              }, 200);
            }
          ], {cuepoints:[150,2800]});
        });
      } else {
        s.mc_titre_slide.visible = false;
        SlideIntro.init();
        CanvasTransition.init(null, "fadein");
      }
      
      s.nav.progression.visible = true;
      
      _self.activeNav();

      // save state scorm
      _self.scormSaveState();
      
      // remove shortcut space for skip dialogs
      shortcut.remove("space");
      
    // });
    },

    recordScore: function(index, value) {
      _scoreAr[index] = value;
    },

    getScore: function(index) {
      if (index == undefined) {
        var score_final = 0;
        for (var i=0; i<_scoreAr.length; i++) {
          if (isValid(_scoreAr[i])) {
            score_final += parseInt(_scoreAr[i]);
          }
        }
        if (_scoreAr.length == 0) {
          return 0;
        } else {
          return Math.floor(score_final / _scoreAr.length);
        }
      } else {
        return _scoreAr[index];
      }
    },
    
    getLearnerName: function() {
      if (_learnerName == undefined){
        if (_isScorm) {
          if (__scorm == "1.2") {
            _learnerName = pipwerks.SCORM.get("cmi.core.student_name");
          } else {
            _learnerName = pipwerks.SCORM.get("cmi.learner_name");
          }
        } else {
          _learnerName = false;
        } 
      }
      return _learnerName;
    },

    setSuspend: function(parameter, value) {
      _suspend[parameter] = value;
      _self.scormSaveState();
    },
    setSuspendCharAt: function(parameter, position, value) {
      _suspend[parameter] = setSuspendChartAt(_suspend[parameter], position, value);
      function setSuspendChartAt(str, pos, val) {
        if (str == undefined) {
          str = "";
        }
        var new_str = "";
        var len;
        if (str.length > pos) {
          len = str.length;
        } else {
          len = pos;
        }
        for (var i=0; i<len; i++) {
          if (i == (pos-1)) {
            new_str += val;
          } else {
            var old_char = str.substr(i, 1);
            if (old_char == "") {
              new_str += "0";
            } else {
              new_str += old_char;
            }
          }
        }
        return new_str;
      }
      _self.scormSaveState();
    },
    setSuspendArrayOfStrings: function(parameter, position, value) {
      var thisSuspendAr = _suspend[parameter].split("|");
      thisSuspendAr[position] = value;
      _suspend[parameter] = thisSuspendAr.join("|");
      _self.scormSaveState();
    },
    getSuspend: function(parameter) {
      if (_suspend[parameter] == undefined) {
        console.log("*WARNING* suspend '"+parameter+"' not initialized, returning empty string.");
        _suspend[parameter] = "";
      }
      return _suspend[parameter];
    },
    getSuspendCharAt: function(parameter, position) {
      if (_suspend[parameter] != undefined){
        return _suspend[parameter].substr(position-1, 1);
      } else {
        return false;
      }
    },
    getSuspendArrayOfStrings: function(parameter, position) {
      var thisSuspendAr = _suspend[parameter].split("|");
      if (thisSuspendAr[position] != undefined) {
        return thisSuspendAr[position];
      } else {
        console.log("*WARNING* Suspend ArrayOfString '"+parameter+"' is not defined at position "+position+", returning empty string.");
        return "";
      }
    },

    scormSaveState: function() {

      if (_isScorm) {

        // save time
        // hh:mm:ss
        var time_str_classic = moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("HH:mm:ss", {trim: false});
        // iso 8601
        var time_str_iso = "PT"+moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("hh[H]mm[M]ss[S]", {trim: false});

        if (__scorm == "1.2") {
          if (!_self._timeFormat){
            if (try12(time_str_classic)){
              _self._timeFormat = "classic";
              
            } else if (try12(time_str_iso)){
              _self._timeFormat = "iso";
              
            } else if (try2004(time_str_classic)){
              wbtAlert();
              _self._timeFormat = "classic2004";
              
            } else if (try2004(time_str_iso)){
              wbtAlert();
              _self._timeFormat = "iso2004";
              
            } else {
              _self._timeFormat = "fail";
              
            }
          } else {
            switch (_self._timeFormat){
              
              case "classic":
                try12(time_str_classic);
                break;
                
              case "iso":
                try12(time_str_iso);
                break;
                
              case "classic2004":
                try2004(time_str_classic);
                break;
                
              case "iso2004":
                try2004(time_str_iso);
                break;
              
              case "fail":
                break;
              
            }
          }
        } else {
          if (!_self._timeFormat){
            if (try2004(time_str_classic)){
              _self._timeFormat = "classic2004";
              
            } else if (try2004(time_str_iso)){
              _self._timeFormat = "iso2004";
              
            } else {
              _self._timeFormat = "fail";
              
            }
          } else {
            switch (_self._timeFormat){

              case "classic2004":
                try2004(time_str_classic);
                break;
                
              case "iso2004":
                try2004(time_str_iso);
                break;
              
              case "fail":
                break;
              
            }
          }
        }
        
        
        function try12(val){
          return pipwerks.SCORM.set("cmi.core.session_time", val);
        }
        
        function try2004(val){
          return pipwerks.SCORM.set("cmi.session_time", val);
        }
        
        // FIX FOR WBT MANAGER
        function wbtAlert(){
          console.log("****Scorm 1.2 session time failed, using Scorm 2004 instead (WBT LMS fix)******");
        }

        // save suspend_data
        var suspend = "";
        suspend += _currentSlideNumber;
        suspend += ";";
        for (var i=0; i<_scoreAr.length; i++) {
          suspend += _scoreAr[i];
          if (i < _scoreAr.length - 1) {
            suspend += ",";
          }
        }
        suspend += ";";
        for (i=0; i<_suspendToSave.length; i++) {
          suspend += _suspend[_suspendToSave[i]];
          if (i < _suspendToSave.length - 1) {
            suspend += ",";
          }
        }
        var is_saved = pipwerks.SCORM.set("cmi.suspend_data", suspend);
        if (__gm == "dev") {
          console.log("*save suspend_data : '"+suspend+"'");
        }
        if (!is_saved){
          _self.disconnect("La connexion au LMS n'a pas pu être établie.\n\nAssurez-vous que votre poste dispose d'une connexion à votre espace de formation, puis redémarrez le module.");
        }
        // progress measure
        if (__scorm == "2004"){
          var chap_vus = 0;
          for (var i=1; i<=_chapitres.length; i++) {
            if (_self.getSuspendCharAt("slides_vus", i) == "1"){
              chap_vus++;
            }
          }
          var pg = Math.round(chap_vus / _chapitres.length * 100);
          if (isValid(pg)){
            pipwerks.SCORM.set("cmi.progress_measure", pg/100);
          }
        }
        // commit
        pipwerks.SCORM.save();

      } else {
        
        var suspend = "";
        suspend += _currentSlideNumber;
        suspend += ";";
        for (var i=0; i<_scoreAr.length; i++) {
          suspend += _scoreAr[i];
          if (i < _scoreAr.length - 1) {
            suspend += ",";
          }
        }
        suspend += ";";
        for (i=0; i<_suspendToSave.length; i++) {
          suspend += _suspend[_suspendToSave[i]];
          if (i < _suspendToSave.length - 1) {
            suspend += ",";
          }
        }
        Cookies.set(_cookie_name, suspend, { expires: 30 });
        console.log("*save suspend_data : '"+suspend+"'");
      }
    },
    
    setSuccessScore: function(val) {
      _successScore = val;
    },
    
    unlockCurrent: function() {
      _self.setVuCurrentSlide();
      _self.checkUnlock();
    },
    
    scormRecordScore: function(){
      if (_isScorm) {

        var score = _self.getScore();
        if (__scorm == "1.2") {
          // FIX FOR WBT MANAGER
          if (pipwerks.SCORM.set("cmi.core.score.raw", (score).toString()) == false) {
            console.log("****Scorm 1.2 score failed, using Scorm 2004 instead (WBT LMS fix)******");
            pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
            pipwerks.SCORM.set("cmi.score.raw", (score).toString());
          }
        } else {
          pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
          pipwerks.SCORM.set("cmi.score.raw", (score).toString());
        }
      
        _self.scormSaveState();
      }
    },

    scormFinish: function() {
      
      if (_isScorm) {

        _self.scormSaveState();

        var score = _self.getScore();
        if (__scorm == "1.2") {
          // FIX FOR WBT MANAGER
          if (pipwerks.SCORM.set("cmi.core.score.raw", (score).toString()) == false) {
            console.log("****Scorm 1.2 score failed, using Scorm 2004 instead (WBT LMS fix)******");
            pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
            pipwerks.SCORM.set("cmi.score.raw", (score).toString());
          }
        } else {
          pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
          pipwerks.SCORM.set("cmi.score.raw", (score).toString());
        }
        
        if (__scorm == "1.2") {
          if (_successScore) {
            if (score >= _successScore) {
              // FIX FOR WBT MANAGER
              if (pipwerks.SCORM.set("cmi.core.lesson_status", "passed") == false) {
                console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
                pipwerks.SCORM.set("cmi.success_status", "passed");
                pipwerks.SCORM.set("cmi.completion_status", "completed");
              }
            } else {
              // FIX FOR WBT MANAGER
              if (pipwerks.SCORM.set("cmi.core.lesson_status", "failed") == false) {
                console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
                pipwerks.SCORM.set("cmi.success_status", "failed");
                pipwerks.SCORM.set("cmi.completion_status", "completed");
              }
            }
          } else {
            // FIX FOR WBT MANAGER
            if (pipwerks.SCORM.set("cmi.core.lesson_status", "completed") == false) {
              console.log("****Scorm 1.2 completion failed, using Scorm 2004 instead (WBT LMS fix)******");
              pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
          }
        } else {
          if (score >= _successScore) {
            pipwerks.SCORM.set("cmi.success_status", "passed");
          } else {
            pipwerks.SCORM.set("cmi.success_status", "failed");
          }
          pipwerks.SCORM.set("cmi.completion_status", "completed");
          // pipwerks.SCORM.set("cmi.exit", "normal");
        }
        if (__scorm == "2004") {
          pipwerks.SCORM.set("adl.nav.request", "exitAll");
        }
        pipwerks.SCORM.save();
        pipwerks.SCORM.quit();
        _isScorm = false;
      }
    },
    
    // check if browser is IE
    isIe: function() {
      if (_isIe == undefined) {
        _isIe = false;
        
        var ua = window.navigator.userAgent;

      }
      return _isIe;
    }
    
    
  };
  
  //
  //  SR VERSION
  //
  
  
  function loadStoryboard() {
    JsonHandler.load(JsonHandler.get("config", "sb"), "sb", launchScormSr);
  }
  
  function launchScormSr(){
    
    if (JsonHandler.get("config", "scorm") == "yes") {
      //SCORM
      if (pipwerks.SCORM.init()) {
        
        var location;
        
        _isScorm = true;
        _sessionStartTime = new Date();
        if (__scorm == "1.2") {
          pipwerks.SCORM.set("cmi.core.exit", "suspend");
          location = pipwerks.SCORM.get("cmi.core.lesson_location");
        } else {
          pipwerks.SCORM.set("cmi.exit", "suspend");
          location = pipwerks.SCORM.get("cmi.location");
        }
        pipwerks.SCORM.save();

        location = Number(location);
        if (isValid(location) && (location > 1)){
          while((JsonHandler.get("sb", "e"+paddy(location, 3)).type == "qcu_final")||(JsonHandler.get("sb", "e"+paddy(location, 3)).type==undefined)){
            location--;
          }
          
          $("#sr-image").hide();
          $("#sr-btnext").show();
          $("#sr-btprev").show();
          $("#sr-text").show();
          $("#sr-btprev").html("Cliquez pour reprendre depuis le début");
          $("#sr-btnext").html("Cliquez pour continuer");
          $("#focusguard-next").show();
          
          $("#sr-title h1").html("Reprise du marque-page");
          $("#sr-text").html("Voulez-vous continuer depuis votre précédente sauvegarde ?");
          $("#sr-text").attr("tabindex", "0");
          $("#sr-text").focus();
          
          $("#sr-btnext").click(function(){
            _counter = location;
            launchStoryboard();
          });
          
          $("#sr-btprev").click(function(){
            launchStoryboard();
          });

        } else {
          launchStoryboard();
        }
      } else {
        _isScorm = false;
        launchStoryboard();
      }
    } else {
      _isScorm = false;
      launchStoryboard();
    }
  }
    
  function launchStoryboard() {
    
    scormSaveStateSr();
    _screen = JsonHandler.get("sb", "e"+paddy(_counter, 3));
    
    $("#sr-btprev").html("Cliquez ici pour revenir à l'écran précédent");
    $("#sr-btprev").off();
    $("#sr-btnext").off();
    $("#sr-image").hide();
    $("#sr-btnext").hide();
    $("#sr-btprev").hide();
    $("#sr-quiz").hide();
    $("#sr-text").hide();
    $("sr-btnext").html("");
    $("sr-text").html("");
    $("#sr-quiz-question").html("");
    $("#focusguard-next").show();
    $("#sr-btprev").click(function(){
      if (_counter > 1){
        _counter --;
        launchStoryboard();
      }
    });

    var titre;
    if (!isValid(_screen.titre)){
      titre = "&nbsp;";
    } else {
      titre = _screen.titre;
    }
    $("#sr-title h1").html(titre);
    
    $("#sr-title h1").attr("aria-hidden", false);
    switch (_screen.type){
      case "texte_nosr": launchTexteNosr(); break;
      case "scene": $("#sr-title h1").attr("aria-hidden", true); launchScene(); break;
      case "qcu": launchQcu(); break;
      case "qcu_final":launchQcu(true);break;
      case "texte": launchTexte(); break;
      
      default:
        if (_qcufinal_count != 0){
          
          $("#sr-title h1").html("Résultats");
          var score = Math.round(_qcufinal_right / _qcufinal_count *100);
          
          scormScoreSr(score);
          
          $("#sr-btnext").show();
          $("#sr-text").show();
          if (score < Number(JsonHandler.get("config", "success"))){
            setTimeout(function(){
              $("#sr-text").html("Votre score est de "+score+"%. Nous vous invitons à retenter le quiz final.");
              $("#sr-text").attr("aria-hidden", false);
              $("#sr-text").attr("tabindex", "0");
              $("#sr-text").focus();
              $("#sr-text").focusout(function(){
                $("#sr-text").off('focusout');
                $("#sr-btnext").focus();
              });
              $("#sr-btnext").html("Cliquez pour retenter le quiz");
            },50);
            $("#sr-btnext").click(function(){
              _qcufinal_count = 0;
              _qcufinal_right = 0;
              _counter--;
              while(JsonHandler.get("sb", "e"+paddy(_counter, 3)).type == "qcu_final"){
                _counter--;
              }
              launchStoryboard();
            });
          } else {
            setTimeout(function(){
            $("#sr-text").html("Félicitations ! Votre score au quiz est de "+score+"%. Vous pouvez à présent valider le module en cliquant sur le bouton suivant.");
              $("#sr-text").attr("aria-hidden", false);
              $("#sr-text").attr("tabindex", "0");
              $("#sr-text").focus();
              $("#sr-text").focusout(function(){
                $("#sr-text").off('focusout');
                $("#sr-btnext").focus();
              });
              $("#sr-btnext").html("Cliquez pour valider le module");
            },50);
            $("#sr-btnext").click(function(){
              scormScoreSr(score, true);
              $("#module_sr").hide();
            });
          }
          $("#sr-text").attr("tabindex", "0");
          $("#sr-text").focus();
          
        } else {
          console.log("**ERROR** Screen type not defined :"+"e"+paddy(_counter, 3));
        }
      break;
      
    }
  }
  
  function playScreenSounds(callback){
    if (!isValid(_screen.sons)){
      callback();
    } else {
      var sounds = _screen.sons.split(",");
      var counter = -1;
      
      launchSound();
      
      function launchSound(){
        counter++;
        if (counter < sounds.length){
          playSound(sounds[counter].trim(), launchSound);
        } else {
          callback();
        }
      }
    }
  }
  
  function playSound(id, callback){
    shortcut.remove("space");
    if (id.substr(0,3)=="fx/"){
      SoundJS_NoQueue.init("assets/sounds/fx/"+id.substr(3, id.length)+".mp3", null, callback);
    } else {
      SoundJS_NoQueue.init("assets/sounds/voice/"+id+".mp3", null, callback);
    }
    shortcut.add("space", function(){
      SoundJS_NoQueue.abort();
      shortcut.remove("space");
      if (callback != undefined) {
        callback();
      }
    });
  }
  
  function showBt(is_final){
    if (isValid(_screen.btsuivant_texte)){
      
      $("#sr-btnext").show();
      setTimeout(function(){
        if ((_counter > 1)&&(!is_final)){
          $("#sr-btprev").show();
        }
        $("#sr-btnext").html(_screen.btsuivant_texte);
        $("#focusguard-next").focus();
      },50);
      
      $("#sr-btnext").click(nextScreen);
      
      if (isValid(_screen.btsuivant_son)){
        playSound(_screen.btsuivant_son);
      }
    } else {
      nextScreen();
    }
  }
  
  function nextScreen(){
    _counter ++;
    launchStoryboard();
  }
  
  function launchTexteNosr(){
    
    $("#sr-text").html(backTrim(_screen.contenu));
    $("#sr-text").attr("aria-hidden", true);
    $("#sr-text").attr("tabindex", false);
    $("#sr-text").show();
    
    playScreenSounds(showBt);
  }
  
  function launchTexte(){
    
    showBt();
    
    $("#sr-text").show();
    
    setTimeout(function(){
      $("#sr-text").html(backTrim(_screen.contenu));
      $("#sr-text").attr("aria-hidden", false);
      $("#sr-text").attr("tabindex", "0");
      $("#sr-text").focus();
      $("#sr-text").focusout(function(){
        $("#sr-text").off('focusout');
        $("#sr-btnext").focus();
      });
    }, 50);
  }
  
  function launchScene(){
    $("#sr-image img").attr("src", "assets/images/sr/"+_screen.contenu);
    $("#sr-image").show();
    
    playScreenSounds(showBt);
    
  }
  
  function launchQcu(is_final){
    
    if (is_final){
      _qcufinal_count++;
    }
    
    var quiz = _screen.contenu.split("--");
    $("#sr-quiz").show();
    $("#focusguard-next").hide();
    setTimeout(function(){
      $("#sr-quiz-question").html(backTrim(quiz[0]));
      $("#sr-quiz-question").focus();
    }, 50);
    
    
    var answer;
    var not_counted = 0;
    for (var i=1; i<=3; i++){
      
      $("#radio"+i+" input").prop('checked', false);
      
      if (quiz[i].substr(0,1) == "1"){
        answer = i;
      }

      if ((quiz[i].substr(0,2) == "0)") || (quiz[i].substr(0,2) == "1)")){
        $("#radio"+i).show();
        $("#radio"+i+" span").html(backTrim(quiz[i]).substr(2, backTrim(quiz[i]).length));
        $("#radio"+i+" input").change(function(){
          setTimeout(function(){
            $("#sr-btnext").show();
          }, 50);
        });
      } else {
        $("#radio"+i).hide();
        not_counted++;
      }

    }
    
    $("#sr-quiz").show();
    $("#sr-btnext").html("Cliquez pour valider votre choix");
      
    $("#sr-btnext").click(function(){
      $("#sr-quiz").hide();
      $("#sr-btnext").hide();
      if ($("#radio"+answer+" input").is(':checked')){
        $("#sr-text").html(backTrim(quiz[4-not_counted]));
        if (is_final){
          _qcufinal_right++;
        }
      } else {
        $("#sr-text").html(backTrim(quiz[5-not_counted]));
      }
      $("#sr-text").attr("aria-hidden", false);
      $("#sr-text").attr("tabindex", "0");
      $("#sr-text").show();
      $("#sr-text").focus();
      
      $("#sr-text").focusout(function(){
        $("#sr-text").off('focusout');
        $("#sr-btnext").focus();
      });
      
      setTimeout(function(){
        $("#sr-btnext").off();
        showBt(is_final);
      }, 50);
      
    });
    
  }
  
  function scormSaveStateSr() {
    if (_isScorm) {

      // save time
      // hh:mm:ss
      var time_str_classic = moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("HH:mm:ss", {trim: false});
      // iso 8601
      var time_str_iso = "PT"+moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("hh[H]mm[M]ss[S]", {trim: false});

      if (__scorm == "1.2") {
        if (_timeFormat){
          if (try12(time_str_classic)){
            _timeFormat = "classic";
            
          } else if (try12(time_str_iso)){
            _timeFormat = "iso";
            
          } else if (try2004(time_str_classic)){
            wbtAlert();
            _timeFormat = "classic2004";
            
          } else if (try2004(time_str_iso)){
            wbtAlert();
            _timeFormat = "iso2004";
            
          } else {
            _timeFormat = "fail";
          }
        } else {
          switch (_timeFormat){
            
            case "classic":
              try12(time_str_classic);
              break;
              
            case "iso":
              try12(time_str_iso);
              break;
              
            case "classic2004":
              try2004(time_str_classic);
              break;
              
            case "iso2004":
              try2004(time_str_iso);
              break;
            
            case "fail":
              break;
            
          }
        }
        // save location
        pipwerks.SCORM.set("cmi.core.lesson_location", _counter);
        if (__gm == "dev") {
          console.log("*save location : '"+_counter+"'");
        }
      } else {
        if (!_timeFormat){
          if (try2004(time_str_classic)){
            _timeFormat = "classic2004";
            
          } else if (try2004(time_str_iso)){
            _timeFormat = "iso2004";
            
          } else {
            _timeFormat = "fail";
          }
        } else {
          switch (_timeFormat){
            case "classic2004":
              try2004(time_str_classic);
              break;
            case "iso2004":
              try2004(time_str_iso);
              break;
            case "fail":
              break;
            
          }
        }
        // save location
        pipwerks.SCORM.set("cmi.location", _counter);
        if (__gm == "dev") {
          console.log("*save location : '"+_counter+"'");
        }
      }
      
      function try12(val){
        return pipwerks.SCORM.set("cmi.core.session_time", val);
      }
      
      function try2004(val){
        return pipwerks.SCORM.set("cmi.session_time", val);
      }
      
      // FIX FOR WBT MANAGER
      function wbtAlert(){
        console.log("****Scorm 1.2 session time failed, using Scorm 2004 instead (WBT LMS fix)******");
      }

      pipwerks.SCORM.save();

    }
  }
  
  function scormScoreSr(score, success) {
    if (_isScorm) {
      if (__scorm == "1.2") {
        // FIX FOR WBT MANAGER
        if (pipwerks.SCORM.set("cmi.core.score.raw", (score).toString()) == false) {
          console.log("****Scorm 1.2 score failed, using Scorm 2004 instead (WBT LMS fix)******");
          pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
          pipwerks.SCORM.set("cmi.score.raw", (score).toString());
        }
      } else {
        pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
        pipwerks.SCORM.set("cmi.score.raw", (score).toString());
      }
      
      if (success!=undefined){
        if (__scorm == "1.2") {
          if (success) {
            // FIX FOR WBT MANAGER
            if (pipwerks.SCORM.set("cmi.core.lesson_status", "passed") == false) {
              console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
              pipwerks.SCORM.set("cmi.success_status", "passed");
              pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
          } else {
            // FIX FOR WBT MANAGER
            if (pipwerks.SCORM.set("cmi.core.lesson_status", "failed") == false) {
              console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
              pipwerks.SCORM.set("cmi.success_status", "failed");
              pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
          }
        } else {
          if (success) {
            pipwerks.SCORM.set("cmi.success_status", "passed");
          } else {
            pipwerks.SCORM.set("cmi.success_status", "failed");
          }
          pipwerks.SCORM.set("cmi.completion_status", "completed");
          // pipwerks.SCORM.set("cmi.exit", "normal");
        }
        pipwerks.SCORM.save();
        pipwerks.SCORM.quit();
      } else {
        pipwerks.SCORM.save();
      }
    }
  }

  //
  //  UTILS
  //
  
  // for SR Engine :
  function paddy(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }
  function backTrim(str){
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str;
  }
  
  //
  //  INTERNAL FUNCTIONS
  //

  // Data validation (useful for LMS):
  function isValid(data) {
    if (data === undefined) return false;
    if (data === null) return false;
    if (data === NaN) return false;
    if (data === "") return false;
    if (data.toString().toLowerCase() === "undefined") return false;
    if (data.toString().toLowerCase() === "null") return false;
    if (data.toString().toLowerCase() === "nan") return false;
    return true;
  }
  
  // check if mobile or tablet (must be updated in future, keep an eye on it):
  function checkMobile() {
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  
});
