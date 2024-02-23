/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

class EasyPDF v1.5
extends functionalities of jsPDF v1.5
Author: JCK
 */

define(["dojo/_base/declare", "util/OptionGetter", "pdf/Backgrounds"], function (declare, OptionGetter, Backgrounds) {
	return declare(null, {

		jspdf : null,

		name : "myEasyPDF",
		fontsize : 12,
		unit : "mm",
		orientation : "p",
		fontcolor : "#000000",
		fontstyle : "normal", // normal, italic, bold, bolditalic
		background : null, // path to image file
		content : null, // function that creates the content

		save : function() {
			this.jspdf.save(this.name+".pdf");
		},
		
		open : function() {
			this.jspdf.output('dataurlnewwindow');
		},
		
		autoTable : function (columns, rows, options) {
			this.jspdf.autoTable(columns, rows, options);
		},

		text : function(str, x, y, options) {
			var fontsize = OptionGetter.get(options, "fontsize", this.fontsize);
			var align = OptionGetter.get(options, "align", "left");
			var fontcolor = OptionGetter.get(options, "fontcolor", this.fontcolor);
			var rgbfontcolor = hexToRgb(fontcolor);
			this.jspdf.setFontSize(fontsize);
			this.jspdf.setTextColor(rgbfontcolor.r, rgbfontcolor.g, rgbfontcolor.b);

			// define style according to used font
			var fontstyle = OptionGetter.get(options, "fontstyle", this.fontstyle);
			var style_number;
			switch (fontstyle) {
				case "bold" : style_number = 1; break;
				case "italic" : style_number = 2; break;
				case "bolditalic" : style_number = 3; break;
				default : style_number = 0; break;
			}
			this.jspdf.setFontStyle(this.jspdf.getFontList()[this.jspdf.internal.getFont().fontName][style_number]);

			// add text
			this.jspdf.text(str, x, y, {align:"center", maxWidth:280});
		},
		
		applyBackground : function() {
			var w;
			var h;
			if (this.unit == "mm") {
				if (this.orientation == "p") {
					w = 210; h = 297;
				} else {
					w = 297; h = 210;
				}
			} else if (this.unit == "pt") {
				if (this.orientation == "p") {
					w = 595; h = 842;
				} else {
					w = 842; h = 595;
				}
			}
			this.jspdf.addImage(this.background, 'JPEG', 0, 0, w, h);
		},

		constructor : function (args) {

			// get constructor parameters
			declare.safeMixin(this, args);
			
			// instanciate pdf
			this.jspdf = new jsPDF(this.orientation, this.unit);
			
			// create base64 string of background
			if (this.background) {
				var self = this;
				/* FIX FOR IE (CAN'T LOAD IMAGE ON THE FLY)
				toDataUrl(this.background, function (loaded_data) {
					self.background = loaded_data;
					self.applyBackground();
					if (self.content) {
						self.content();
					}
					self.open();
				});
				*/
				self.background = Backgrounds.get(this.background);
				self.applyBackground();
				if (self.content) {
					self.content();
				}
				self.save();
			} else {
				if (this.content) {
					this.content();
				}
				this.save();
			}
		}
	});


	/*
	FileReader (for images) > !!! Doesn't work with IE !!!
	 */
	function toDataUrl(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function () {
			var reader = new FileReader();
			reader.onloadend = function () {
				callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.send();
	}


	/*
	color converter hex to rgb values
	*/
	function hexToRgb(hex) {
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
});
