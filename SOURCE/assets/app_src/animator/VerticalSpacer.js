/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Vertical Spacer
author: JCK

snippet:
VerticalSpacer.init(scene, ["mc1", "mc2" ,"mc3"], "hpp", 10, 25);
... where "hpp" means (header, paragraph, paragraph)
... where 10 is the space in px between paragraphs
... where 25 is the space in px above headers
*/

define(function() {

	return {
		init: function (scene, instanceAr, disposition, p_spacer, h_spacer) {
		
			var offset_y = scene[instanceAr[0]].y;
		
			for (var i=0; i<instanceAr.length; i++) {
				scene[instanceAr[i]].y = offset_y;
				
				if (scene[instanceAr[i]].champ != undefined) {
					offset_y += scene[instanceAr[i]].champ.getMeasuredHeight();
				} else {
					offset_y += scene[instanceAr[i]].nominalBounds.height;
				}
				
				if (disposition.substr(i+1, 1) == "h") {
					offset_y += h_spacer;
				} else {
					offset_y += p_spacer;
				}
			
			}
		}
	};
});
