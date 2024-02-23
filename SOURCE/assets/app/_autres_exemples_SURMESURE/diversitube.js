/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*
SURMESURE slide
author: JCK
*/

function diversitube(callback){//change name here
	require([
		'engine/Player',
		'animator/Tween',
		'animator/Button',
		'animator/SoundJS',
		'util/CanvasTransition',
		'animator/ResponsiveStage',
		'util/UniqueTimer'
	], function (
		Player,
		Tween,
		Button,
		SoundJS,
		CanvasTransition,
		ResponsiveStage,
		UniqueTimer
	) {
		// init screen
		var screen_name = "diversitube";//change name here
		s.gotoAndStop(screen_name);
		var _screen = s[screen_name];
		ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
		s.visible = true;
		canvas.style.opacity = '0';
		CanvasTransition.init(null, "fadein");
		
		// script
		_screen.champ.text = "";
		_screen.visuel.visible = false;
		_screen.wait.visible = false;
		_screen.bt.visible = false;
		_screen.fleche.visible = false;
		
		var paul_request = "recruter sans discriminer";
		var type_speed = 100;
		
		var kindex = 0;
		
		// start
		SoundJS.init("assets/sounds/fx/typing.mp3", typeKey);
		
		function typeKey(){
			kindex++;
			_screen.champ.text = paul_request.substr(0, kindex);
			
			if (kindex == paul_request.length){
				endType();
			} else {
				UniqueTimer.wait((type_speed/2)+(type_speed*Math.random()*0.5), typeKey);
			}
		}
		
		function endType(){
			SoundJS.abort();
			
			_screen.wait.visible = true;
			_screen.wait.play();
			
			UniqueTimer.wait(1800, function(){
				_screen.wait.stop();
				_screen.wait.visible = false;
				Tween.init(_screen.visuel, {from:"bottom", distance:100, duration:600, fade:true, callback:
					function(){
						_screen.bt.visible = true;
						Tween.init(_screen.fleche, {pop:true, scaleTo:1});
						Button.enable(_screen.bt, callback,
							function(){
								Tween.init(_screen.fleche, {pop:true, scaleTo:1});
							}
						);
						Player.waitClickNext();
					}
				});
				
			});
		}
	});
}
