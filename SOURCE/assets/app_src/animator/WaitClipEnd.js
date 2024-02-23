/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

WaitClipEnd
author: JCK

Send a callback when MovieClip reach end
WaitClipEnd.init(mc, fn);
*/

define(['dojox/timing'], function (timing) {

	
	return {
		init: function (mc, callback) {
		
			_mc = mc;

			var ticker = 1000 / lib.properties.fps;
			
			var timer = new dojox.timing.Timer(ticker);
			
			timer.onTick = function() {
				
				if (mc.currentFrame == mc.timeline.duration-1){
					
					timer.stop();
					callback();
				}
			
			}
			timer.start();
		}
	};
});
