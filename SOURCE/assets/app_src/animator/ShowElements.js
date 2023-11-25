/*

Animator Module
=>init(stage, ["mc1", "mc2", "mc3", ...], delay, callback, {options du tween});

SHOW ELEMENTS
author: JCK

*/

define(['animator/MaskObjects', 'animator/Tween', 'util/UniqueTimer'], function(MaskObjects, Tween, UniqueTimer) {

	return {
		init: function (stage, instanceAr, delay, callback, options) {

			MaskObjects.init(stage, instanceAr);

			i = 0;
			UniqueTimer.init(function(){
				Tween.init(stage[instanceAr[i]], options);
				i++;
				if(i == instanceAr.length) {
					UniqueTimer.stop();
					if (callback != undefined) {
						callback();
					}
				}
			}, delay);
		}
	};
});