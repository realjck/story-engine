/*

TimerClip
author: JCK

Show timer-like movieclips animated over the timeline, then callback
usage:
TimerClip.start(mc, duration, callback);
*/

define(['dojox/timing'], function (timing) {

	var _timer;
	var _mc;
	
	return {
		start: function (mc, duration, callback) {
		
			_mc = mc;
		
			var time = 0;
			mc.gotoAndStop(0);
			var ticker = 1000 / lib.properties.fps;
			
			_timer = new dojox.timing.Timer(ticker);
			
			_timer.onTick = function() {
			
				time += ticker;
			
				mc.gotoAndStop(Math.floor(time/duration*(mc.timeline.duration-1)));
				
				if (time >= duration) {
					_timer.stop();
					mc.gotoAndStop(mc.timeline.duration-1);
					if (callback != undefined) {
						callback();
					}
				}
			
			}
			_timer.start();
		},
		
		abort: function() {
			if ((_timer != undefined) && (_mc != undefined)) {
				_timer.stop();
				_mc.gotoAndStop(0);
			}
		},
		
		stop: function() {
			if (_timer != undefined) {
				_timer.stop();
			}
		}
	};
});