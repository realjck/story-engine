/*

TWEEN VALUE (new version)
author: JCK

options:
- append_string
- callback
- zerofill
- increment

 */

define(['dojox/timing', 'util/OptionGetter'], function (timing, OptionGetter) {

	return {
		init : function (textfield, val_start, val_end, delta, options) {
			
			var callback = OptionGetter.get(options, "callback", undefined);
			var append_string = OptionGetter.get(options, "append_string", "");
			var zerofill = parseInt(OptionGetter.get(options, "zerofill", 0));
			var increment = parseInt(OptionGetter.get(options, "increment", 1));

			textfield.text = "";

			var is_negatif;
			var compteur = val_start;

			if (isNaN(val_end)) {
				console.log("*Error in TweenValue* - end value is not a number");
				val_end = val_start;
			}

			if (val_end < val_start) {
				is_negatif = true;
			} else {
				is_negatif = false;
			}

			t = new dojox.timing.Timer(delta);

			t.onTick = function () {
				var txt;

				if (zerofill) {
					txt = doZeroFill(compteur)+append_string;
				} else {
					txt = compteur+append_string;
				}

				textfield.text = txt;

				if (compteur >= val_end) {
					t.stop();
					if (callback != undefined) {
						callback();
					}
				}

				if (is_negatif) {
					compteur = compteur - increment;
				} else {
					compteur = compteur + increment;
				}
			}
			t.start();
		}
	};
	function doZeroFill(number, width) {
		width -= number.toString().length;
		if (width > 0) {
			return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
		}
		return number + ""; // always return a string
	}
});
