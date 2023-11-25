/*
SURMESURE slide
author: JCK
*/

function _______________(callback){// put slide name here
	require([
		'animator/Tween',
		'animator/Button',
		'util/CanvasTransition',
		'util/JsonHandler',
		'animator/ResponsiveStage'
	], function (
		Tween,
		Button,
		CanvasTransition,
		JsonHandler,
		ResponsiveStage
	) {
		var screen_name = "_______________";// put slide name here
		s.gotoAndStop(screen_name);
		var _screen = s[screen_name];
		ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
		s.visible = true;
		canvas.style.opacity = '0';
		
		// * 2 POSSIBILITIES FOR YOUR DATA, JSON OR EXCEL (CHOOSE ONE) : *
		
		JsonHandler.load("assets/data/_______________.json", "_______________", start);// for JSON data
		
		JsonHandler.loadExcel("_______________", start);// for Excel data
		
		function start(){
			CanvasTransition.init(null, "fadein");
			
			//....code here....//
			
			// example retrieve data (see other methods in app_src/util/JsonHandler) :
			var dataById = JsonHandler.get("_______________", id);
			
			_screen.tableau.visible = false;
			_screen.indication.visible = false;
			_screen.bt_continue.visible = false;
			
			Tween.init(_screen.tableau, {from:"left", distance:1000, duration:600, fade:true, callback:
				function(){
					Tween.init(_screen.indication, {pop:true});
					Tween.init(_screen["bt_continue"], {pop:true});
					Button.enableZoom(_screen["bt_continue"], callback);
				}
			});
			/////////////////////
		}
	});
}