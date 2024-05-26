/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*
SURMESURE slide
author: JCK
*/

function exercice_methodes(callback){//change name here
  require([
    'animator/Tween',
    'animator/Button',
    'util/CanvasTransition',
    'animator/ResponsiveStage',
    'animator/QuizDragDrop'
  ], function (
    Tween,
    Button,
    CanvasTransition,
    ResponsiveStage,
    QuizDragDrop
  ) {
    var screen_name = "exercice_methodes";//change name here
    s.gotoAndStop(screen_name);
    var _screen = s[screen_name];
    ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
    s.visible = true;
    canvas.style.opacity = '0';
    CanvasTransition.init(null, "fadein");
    
    // ....code here

    _screen["bt_continue"].visible = false;
    _screen["bt_submit"].visible = false;
    _screen["feedback"].visible = false;
    
    QuizDragDrop.init(_screen, 5, 5, [[1], [2], [3], [4], [5]], fbRight, fbWrong, {instanceDragNames:"drag", instanceDropNames:"drop", responsiveRef:s[_screen]});
    
    function fbRight() {
      _screen["feedback"].gotoAndStop("right");
      Tween.init(_screen["feedback"], {pop:true});
      Tween.init(_screen["bt_continue"], {pop:true});
      Button.enableZoom(_screen["bt_continue"], callback);
    }
    
    function fbWrong() {
      _screen["feedback"].gotoAndStop("wrong");
      Tween.init(_screen["feedback"], {pop:true});
      Tween.init(_screen["bt_continue"], {pop:true});
      Button.enableZoom(_screen["bt_continue"], callback);
    }

  });
}
