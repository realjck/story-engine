/*

Wait Next Tick
wait for all elements to be on stage

author: JCK

 */

define(function () {

	return {
		init : function (callback) {
			var nextTick = function(){
				createjs.Ticker.removeEventListener("tick", nextTick);
				callback();
			}
			createjs.Ticker.addEventListener("tick", nextTick);
		}
	};
});
