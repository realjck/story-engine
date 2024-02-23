/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

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
