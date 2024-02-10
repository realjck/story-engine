/*
SURMESURE slide
author: JCK
*/

function definition(callback){//change name here
	require([
		'animator/Tween',
		'animator/Button',
		'util/CanvasTransition',
		'animator/ResponsiveStage',
		'animator/QuizDragDrop',
		'animator/MaskObjects',
	], function (
		Tween,
		Button,
		CanvasTransition,
		ResponsiveStage,
		QuizDragDrop,
		MaskObjects
	) {
		var screen_name = "definition";//change name here
		s.gotoAndStop(screen_name);
		var _screen = s[screen_name];
		ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
		s.visible = true;
		canvas.style.opacity = '0';
		CanvasTransition.init(null, "fadein");
		
		// ....code here
		MaskObjects.init(_screen, ["bt_submit", "bt_continue", "feedback", "asterisque"]);
		
		QuizDragDrop.init(_screen, 3, 3, [[1], [2], [3]], fbRight, fbWrong, {instanceDragNames:"drag", instanceDropNames:"drop"});
		
		function fbRight() {
			_screen["feedback"].gotoAndStop("right");
			suite();
		}
		
		function fbWrong() {
			_screen["feedback"].gotoAndStop("wrong");
			suite();
		}
		
		function suite() {
			Tween.init(_screen["feedback"], {pop:true});
			Tween.init(_screen["bt_continue"], {pop:true});
			_screen["asterisque"].visible = true;
			Button.enableZoom(_screen["bt_continue"], callback);
		}

	});
}