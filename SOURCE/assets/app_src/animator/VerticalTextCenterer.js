/*

Vertical Text Centerer
author: JCK

 */

define(['dojox/timing'], function (timing) {

	return {
		init : function (textfield, totalheight, type) {
		
			apply(textfield, totalheight, type);
			
			var timer = new timing.Timer(50);
			timer.onTick = function() {
				timer.stop();
				apply(textfield, totalheight, type);
			};
			timer.start();
		}
	};
	
	function apply (textfield, totalheight, type) {
	
			switch (type) {
			case "top":
				textfield.regY = 0;
				break;

			case "middle":
				textfield.regY = (totalheight - textfield.getMeasuredHeight()) / 2 *-1;
				break;

			case "bottom":
				textfield.regY = (totalheight - textfield.getMeasuredHeight()) *-1;
				break;

			default:
				console.log("*ERROR* in VerticalTextCenterer : '" + type + "' is not a valid centering type");
				return false;
				break;
			}
	}
});