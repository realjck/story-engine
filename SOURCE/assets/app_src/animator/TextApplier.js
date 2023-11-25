/*

Text Applier
Apply external text with possibility to center vertically

author: JCK

*/

define(["util/ExternalText", "animator/VerticalTextCenterer"], function(ExternalText, VerticalTextCenterer) {

	return {
		set: function(textfield, screen, id, option) {
		
			textfield.text = ExternalText.getText(screen, id);
			
			if (option != undefined) {
				if (option.center != undefined) {
					VerticalTextCenterer.init(textfield, option.center, "middle");
				}
			}
		}
	};
});