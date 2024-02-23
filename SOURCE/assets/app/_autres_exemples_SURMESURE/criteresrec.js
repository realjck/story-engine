/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*
SURMESURE slide
author: JCK
*/

function criteresrec(callback){
	require([
		"animator/Tween",
		"animator/Button",
		"util/CanvasTransition",
		"animator/ResponsiveStage",
		"util/JsonHandler",
		"animator/VerticalSpacer",
		"animator/SoundJS",
		'animator/StorePosition',
		'util/JsonHandler'
	], function (
		Tween,
		Button,
		CanvasTransition,
		ResponsiveStage,
		JsonHandler,
		VerticalSpacer,
		SoundJS,
		StorePosition,
		JsonHandler
	) {
		// init screen
		var screen_name = "criteresrec";
		s.gotoAndStop(screen_name);
		var _screen = s[screen_name];
		ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
		
		JsonHandler.loadExcel("criteres_recrutement", launch);
		
		function launch(){
			s.visible = true;
			canvas.style.opacity = '0';
			CanvasTransition.init(null, "fadein");
			
			_screen["titre"].visible = false;
			_screen["texte"].visible = false;
			_screen["bt_continue"].visible = false;
			StorePosition.init(_screen["titre"]);
			StorePosition.init(_screen["texte"]);
			_screen["titre"].champ.text = "";
			_screen["texte"].champ.text = "";
			
			var nb_exemples = parseInt(JsonHandler.getObj("criteres_recrutement", "nb_exemples").value);
			var counter = 1;
			
			for (var i=nb_exemples+1 ; i<=32; i++) {
				_screen["fil_ariane"]["point"+i].visible = false;
			}
			_screen["fil_ariane"].x = (1920-(nb_exemples*30 + (nb_exemples-1)*20))/2;
			
			showExemple(false);
			
			function afficheTexte() {
				_screen["titre"].champ.text = JsonHandler.get("criteres_recrutement", "exemple_"+counter).value;
				_screen["texte"].champ.text = JsonHandler.get("criteres_recrutement", "exemple_"+counter).texte;
				// SoundJS.init("assets/sounds/voice/"+JsonHandler.get("criteres_recrutement", "exemple_"+counter).son+".mp3");
				VerticalSpacer.init(_screen, ["titre", "texte"], "pp", 20, 25);
			}
			
			function showExemple(direction){
				Button.disable(_screen["bt_prev"]);
				Button.disable(_screen["bt_next"]);
				
				for (var i=1; i<=nb_exemples; i++){
					_screen["fil_ariane"]["point"+i].gotoAndStop("off");
				}
				_screen["fil_ariane"]["point"+counter].gotoAndStop("on");
				
				if (counter == 1) {
					_screen["bt_prev"].visible = false;
				} else if (counter == nb_exemples) {
					_screen["bt_next"].visible = false;
					Tween.init(_screen["bt_continue"], {pop:true});
					Button.enableZoom(_screen["bt_continue"], callback);
				}
				
				function enableButtons() {
					if (counter != 1) {
						Button.enableZoom(_screen["bt_prev"], function(){
							counter--;
							showExemple(true);
						});
					}

					if (counter != nb_exemples) {
						Button.enableZoom(_screen["bt_next"], function(){
							counter++;
							showExemple(false);
						});
					}
				}
				
				var come_dir;
				var go_dir;
				if (direction == false){
					come_dir = "left";
					go_dir = "right";
				} else {
					come_dir = "right";
					go_dir = "left";
				}
				
				Tween.init(_screen["titre"], {to:come_dir, distance:400, duration:150, noInit:true, fadeout:true});
				Tween.init(_screen["texte"], {to:come_dir, distance:400, duration:150, noInit:true, fadeout:true, callback:
					function(){
						_screen["fil_ariane"]["point"+counter].gotoAndStop("on");
						enableButtons();
						_screen["titre"].x = _screen["titre"].storedPos.x;
						_screen["texte"].x = _screen["texte"].storedPos.x;
						afficheTexte();
						Tween.init(_screen["titre"], {from:go_dir, distance:400, duration:350, noInit:true, fade:true});
						Tween.init(_screen["texte"], {from:go_dir, distance:400, duration:350, noInit:true, fade:true});
					}
				});

			}
			
		}

		
	});
}
