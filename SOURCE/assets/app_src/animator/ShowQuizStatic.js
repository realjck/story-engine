/*

Animator Module
=>init(stage, ["mc1", "mc2", "mc3", ...], callback);

SHOW QUESTIONS OF QUIZ
author: JCK

*/

define(['animator/MaskObjects', 'animator/Tween', 'util/UniqueTimer'], function(MaskObjects, Tween, UniqueTimer) {

	var _delta = 250;

	return {
		init: function (stage, instanceAr, callback) {

			MaskObjects.init(stage, instanceAr);

			i = 0;
			UniqueTimer.init(function(){
				Tween.init(stage[instanceAr[i]], {duration:500});
				i++;
				if(i == instanceAr.length) {
					UniqueTimer.stop();
					if (callback != undefined) {
						callback();
					}
				}
			}, _delta);
		}
	};
});