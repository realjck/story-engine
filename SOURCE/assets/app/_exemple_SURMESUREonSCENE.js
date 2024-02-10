/*
SURMESURE slide
author: JCK
*/

function _______________(callback){// name of this script
	require([
		'animator/Button',
		'animator/WaitClipEnd'
	], function (
		Button,
		WaitClipEnd
	) {
		var screen_name = "_______________";// screen name
		var scene = s[screen_name].scene;
		
		//....code here....//
		
		scene.fleche.visible = true;
		
		Button.enable(scene.fleche, function(){
			scene.infoflyer.visible = true;
			scene.infoflyer.gotoAndPlay("go");
			WaitClipEnd.init(scene.infoflyer, function(){
				Button.enable(scene.infoflyer, function(){
					// Don't forget to clean scene if needed before callback:
					scene.fleche.visible = scene.infoflyer.visible = false;
					callback();
				});
			});
		});
		
		/////////////////////
	});
}