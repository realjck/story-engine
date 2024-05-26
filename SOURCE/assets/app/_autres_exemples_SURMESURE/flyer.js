/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*
SURMESURE slide
author: JCK
*/

function flyer(callback){//change name here
  require([
    'animator/Tween',
    'animator/Button',
    'util/CanvasTransition',
    'animator/ResponsiveStage'
  ], function (
    Tween,
    Button,
    CanvasTransition,
    ResponsiveStage
  ) {
    // init screen
    var screen_name = "flyer";//change name here
    s.gotoAndStop(screen_name);
    var _screen = s[screen_name];
    ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
    s.visible = true;
    canvas.style.opacity = '0';
    CanvasTransition.init(null, "fadein");

    _screen.bt_continue.visible = false;
    
    Tween.init(_screen.carnet, {pop:true});
    Tween.init(_screen["bt_continue"], {pop:true});
    Button.enableZoom(_screen["bt_continue"], callback);

  });
}
