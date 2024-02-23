/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Option Getter
author: JCK

Deal with option objects like {firstParam1:"abc", secondParam:42, ...}

Snippet:
OptionGetter.get(options, "parameter", default_value);

 */

define(function () {
	return {
		get : function (options_obj, parameter, default_value) {
			if (options_obj == undefined) {
				return default_value;
			} else {
				if (options_obj[parameter] == undefined) {
					return default_value;
				} else {
					return options_obj[parameter];
				}
			}
		}
	};
});
