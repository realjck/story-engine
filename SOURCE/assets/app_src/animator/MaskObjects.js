/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Animator Module
=>init(stage, ["mc1", "mc2", "mc3", ...]);

MASK FLASH OBJECTS
author: JCK

*/

define(["util/OptionGetter"], function(OptionGetter) {
	return {
		init: function (stage, instanceAr, options) {
			
			var noInit = OptionGetter.get(options, "noInit", false);
			
			for (var i=0; i<instanceAr.length; i++) {
				if (stage[instanceAr[i]] != undefined) {
					stage[instanceAr[i]].visible = false;
					if ((stage[instanceAr[i]].gotoAndStop != undefined) && (noInit == false)){
						stage[instanceAr[i]].gotoAndStop(0);
					}
				} else {
					console.log("*ERROR in MaskObject* - "+instanceAr[i]+" is not on stage!");
				}
			}
		},
		unmask: function (stage, instanceAr) {
			for (var i=0; i<instanceAr.length; i++) {
				if (stage[instanceAr[i]] != undefined) {
					stage[instanceAr[i]].visible = true;
					stage[instanceAr[i]].alpha = 1;
					stage[instanceAr[i]].gotoAndStop(0);
				} else {
					console.log("*ERROR in MaskObject* - "+instanceAr[i]+" is not on stage!");
				}
			}
		}
	};
});
