/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Canvas Transition (to change slides)
author: JCK

*/

define(["dojo/dom", "dojo/dom-construct", "dojo/_base/fx"], function(dom, domConstruct, fx) {
	
	var _is_transition;

	return {
		init: function (callback, type) {
			
			_is_transition = true;
		
			if (type == undefined) {
				type = 'fade';
			}

			switch(type) {

				case "fade":
					fx.fadeOut({node:'canvas', duration:500, onEnd:function(){
						_is_transition = false;
						if (callback != undefined) {
							callback();
							fx.fadeIn({node:'canvas', duration:500}).play();
						} else {
							domConstruct.destroy("canvas");
						}
					}}).play();
					break;
					
				case "fadeout":
					// fx.fadeOut({node:'canvas', duration:500, onEnd:function(){
						// _is_transition = false;
						// if (callback != undefined) {
							// callback();
						// }
					// }}).play();
					break;
					
				case "fadein":
					// fx.fadeIn({node:'canvas', duration:500, onEnd:function(){
						// _is_transition = false;
						// if (callback != undefined) {
							// callback();
						// }
					// }}).play();
					$("#canvas").css("opacity", 1);
					break;

			}
		},
		
		isInTrans: function() {
			return _is_transition;
		}
	};
});
