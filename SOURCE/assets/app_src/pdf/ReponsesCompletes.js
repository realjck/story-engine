/*

pdf_recap
* using EasyPDF class *
*/

define(['pdf/EasyPDF', 'util/JsonHandler', 'engine/Player'], function(EasyPDF, JsonHandler, Player) {

	return {
		print: function () {
		
			EasyPDF({
				name: "reponses",
				unit: "pt", // only pt supported with autoTable (not mm or in)
				fontcolor: "#333333",
				fontsize: 12,
				content: function() {
				
					var self = this;
					var page_counter = 0;
					
					var columns = [
						{title: "Question", dataKey: "col1"},
						{title: "Réponse(s) attendue(s)", dataKey: "col2"}, 
						{title: "Reponse(s) de l'apprenant", dataKey: "col3"}, 
						{title: "", dataKey: "col4"}
					];
					
					var rows = [];
					for (var i=1; i<=parseInt(JsonHandler.get("quiz", "nb_questions")); i++) {
						var line = new Object();
						line["id"] = i;
						
						// FILL COL 1
						line["col1"] = JsonHandler.get("quiz", "q"+i+"_question");
						
						// FILL COL 2
						var col2txt = "";
						for (var j=0; j<JsonHandler.get("quiz", "q"+i+"_reponse").split("|").length; j++) {
							if (j > 0) {
								col2txt += ", ";
							}
							col2txt += JsonHandler.get("quiz", "q"+i+"_proposition"+JsonHandler.get("quiz", "q"+i+"_reponse").split("|")[j]);
						}
						line["col2"] = col2txt;
						
						// FILL COL 3
						var col3rep = Player.getSuspendArrayOfStrings("interactions", i);
						col3rep = col3rep.replace(/-/g, "");
						var col3txt = "";
						
						for (j=0; j<col3rep.length; j++) {
							if (j > 0) {
								col3txt += ", ";
							}
							col3txt += JsonHandler.get("quiz", "q"+i+"_proposition"+col3rep[j]);
						}
						line["col3"] = col3txt;
						
						// FILL COL 4
						if (Player.getSuspendArrayOfStrings("resultats", i) == "1"){
							line["col4"] = "OK";
						} else {
							line["col4"] = "x";
						}
						
						// ADD LINE
						rows.push(line);
					}
					
					// AUTOTABLE
					this.autoTable(columns, rows, {
						// Styling
						theme: 'grid', // 'striped', 'grid' or 'plain'
						styles: {
							cellPadding: 5,
							fontSize: 10,
							font: "helvetica", // helvetica, times, courier
							lineColor: [50,50,50],
							lineWidth: 0.1,
							fontStyle: 'normal', // normal, bold, italic, bolditalic
							overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
							textColor: [50,50,50],
							halign: 'left', // left, center, right
							valign: 'top', // top, middle, bottom
							fillStyle: 'S', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
							columnWidth: 'auto' // 'auto', 'wrap' or a number
						},
						headerStyles: {
							fillColor: [191, 191, 191],
							fillStyle: "DF",
							halign: 'center'
						},
						// Properties
						startY: false, // false (indicates margin top value) or a number
						pageBreak: 'auto', // 'auto', 'avoid' or 'always'
						tableWidth: 'auto', // 'auto', 'wrap' or a number, 
						margin: {
							top: 126
						},
						beforePageContent: function(data) {
							self.text("Réponses au Quiz", 562, 32, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
							self.text(JsonHandler.get("config", "attestation_titre"), 562, 54, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
							var learner_name = Player.getLearnerName();
							if (!learner_name) {
								learner_name = "{doit être connecté au LMS}";
							}
							self.text(learner_name, 562, 76, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
							self.text("Résultat : "+Player.getScore(0)+"%", 562, 94, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
							page_counter++;
							self.text(page_counter.toString(), 297,839, {fontsize:10, align:"center"});
						}
					});
				}
			});
		}
	};
});