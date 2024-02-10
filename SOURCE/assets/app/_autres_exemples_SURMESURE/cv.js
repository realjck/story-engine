/*
SURMESURE slide
author: JCK
*/

function cv(callback){
	require([
		'animator/Tween',
		'animator/Button',
		'util/CanvasTransition',
		'animator/ResponsiveStage',
		'animator/SoundJS',
		'animator/StorePosition'
	], function (
		Tween,
		Button,
		CanvasTransition,
		ResponsiveStage,
		SoundJS,
		StorePosition
	) {
		// init screen
		var screen_name = "cv";
		s.gotoAndStop(screen_name);
		var _screen = s[screen_name];
		ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
		s.visible = true;
		canvas.style.opacity = '0';
		CanvasTransition.init(null, "fadein");
		
		
		_screen["bt_continue"].visible = false;
		
		function hideFleches(){
			_screen["fleche1"].visible = false;
			_screen["fleche2"].visible = false;
			_screen["fleche3"].visible = false;
		}
		hideFleches();
		

		for (var i=1; i<=3; i++) {
			_screen["cv"+i].n = i;
			Button.enable(_screen["cv"+i], function(e){
				
				var n = e.currentTarget.n;
				
				hideFleches();
				_screen["fleche"+e.currentTarget.n].visible = true;
				
				SoundJS.init("assets/sounds/fx/pick.mp3");
				
				if (!_screen["bt_continue"].visible) {
					Tween.init(_screen["bt_continue"], {pop:true});
					Button.enableZoom(_screen["bt_continue"], callback);
				}
			});
		}
		
	});
}