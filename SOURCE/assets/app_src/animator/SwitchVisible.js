/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

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
