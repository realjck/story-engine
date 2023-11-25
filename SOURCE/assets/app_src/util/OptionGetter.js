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
