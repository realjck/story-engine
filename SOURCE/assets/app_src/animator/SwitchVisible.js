/*

SwitchVisible
author: JCK

Just make a clip not visible and another one visible
snippet:
SwitchVisible.set(s[_screen], "cliptohide", "cliptoshow");

*/

define(function () {

	return {
		set: function (s, cliptohide, cliptoshow) {
			s[cliptohide].visible = false;
			s[cliptoshow].visible = true;
		}
	};
});