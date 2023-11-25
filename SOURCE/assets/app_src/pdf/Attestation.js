/*

Attestation
* using EasyPDF class *
Author: JCK
*/

define(['pdf/EasyPDF', 'engine/Player', 'util/JsonHandler'], function(EasyPDF, Player, JsonHandler) {

	return {
		print: function (infos) {

			EasyPDF({
				name: "attestation_de_formation",
				background: "accordia",
				fontcolor: "#666666",
				fontsize: 20,
				orientation: "l",
				content: function() {
					
					var learner_name;
					
					if (!infos) {
						learner_name = Player.getLearnerName().toLowerCase().replace(/\b\w/g, function(l){return l.toUpperCase()});
						if (learner_name.indexOf(",") != -1){
							var n = learner_name.split(",")[0].trim();
							var p = learner_name.split(",")[1].trim();
							learner_name = p+" "+n;
						}
					} else {
						learner_name = infos.prenom + " " + infos.nom;
					}
					
					moment.locale("fr");

					this.text(JsonHandler.get("CONFIG", "soustitre_attestation"), 149, 45, {align:"center"});
					this.text(learner_name+" a suivi le module e-learning", 149, 55, {align:"center", fontcolor:"#000000"});
					this.text(JsonHandler.get("CONFIG", "titre"), 149, 65, {align:"center", fontcolor:"#000000", fontstyle:"bold"});
					this.text(" avec "+Player.getScore(0)+"% de réussite au quiz de validation des connaissances.", 149, 82, {align:"center", fontcolor:"#000000"});
					
					this.text("Formation effectuée le "+moment().format('LL'), 149, 91 , {fontsize:12, align:"center", fontcolor:"#000000"});
					
					this.text("Accordia - SAS au capital de 100.000 € - RCS de Nanterre 504 455 007 – 182 avenue Charles de Gaulle 92200 Neuilly sur Seine", 149, 191 , {fontsize:12, align:"center"});
					this.text("Organisme de formation agréé Art. 6351-6 : n°11 75 45012 75 – Certification Qualiopi N° 659302", 149, 197 , {fontsize:12, align:"center"});

				}
			});
		}
	};
});
