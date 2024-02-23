/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Scene Manager
=>init
=>switch

pour modules Accordia

Exemple :

	SceneManager.init(s[_screen],
		[
			["vue1", 949, 483, 111, "ernest+", "olivier+"],
			["vue2", 233, -71, 398, "ernest+", "olivier-"],
			["vue3", 980, 164, 172, "ernest-", "olivier+"]
		]
	);
	
		> vue, x, y, scale%, perso1+, perso2+, etc..

*/

define(function() {

	var _persoPos = {};
	var _vuesAr = [];
	var _s;

	return {
		init: function(screen, vuesAr) {
			
			_vuesAr = vuesAr;
			_s = screen;
			_persoPos = {}
			
			// on prend la première scene pour enregistrer les personnages (première scene persos doivent être en position +)
			for (var i=4; i<_vuesAr[0].length; i++){
				var perso_name = _vuesAr[0][i].substr(0, _vuesAr[0][i].length - 1);
				_persoPos[perso_name] = true;
			}
		},
		
		switchScene: function(vue) {

			var is_scene = -1;
			
			for (var i=0; i<_vuesAr.length; i++){
				if (vue == _vuesAr[i][0]){
					is_scene = i;
				}
			}
			
			if (is_scene == -1){
				_s["scene"].visible = false;
				_s[vue].visible = true;
				
				return _s[vue];
				
			} else {
				
				_s["scene"].visible = true;
				_s["scene"].x = _vuesAr[is_scene][1];
				_s["scene"].y = _vuesAr[is_scene][2];
				_s["scene"].scaleX = _vuesAr[is_scene][3]/100;
				_s["scene"].scaleY = _vuesAr[is_scene][3]/100;
				
				for (i=4; i<_vuesAr[is_scene].length; i++){
					var perso_name = _vuesAr[is_scene][i].substr(0, _vuesAr[is_scene][i].length - 1);
					var perso_sign = _vuesAr[is_scene][i].substr(_vuesAr[is_scene][i].length - 1, 1);
					
					var perso_newpos;
					if (perso_sign == "+"){
						perso_newpos = true;
					} else if (perso_sign == "-"){
						perso_newpos = false;
					} else {
						console.log("***ERRROR IN SCENE MANAGER, A CHARACTER DON'T HAVE A POSITION SIGN***");
					}
					
					//switch character pos
					if (_persoPos[perso_name] != perso_newpos){
						_s["scene"][perso_name].scaleX = _s["scene"][perso_name].scaleX * -1;
						_persoPos[perso_name] = perso_newpos;
					}

					
				}
				
				return _s["scene"];
				
			}
			
		},
		
		reset: function() {
			
			if (_vuesAr[0] != undefined){
			
				for (var i=4; i<_vuesAr[0].length; i++){
					var perso_name = _vuesAr[0][i].substr(0, _vuesAr[0][i].length - 1);
					
					if (_persoPos[perso_name] == false){
						_s["scene"][perso_name].scaleX = _s["scene"][perso_name].scaleX * -1;
						_persoPos[perso_name] = true;
					}
					
				}
				
			}
			
		}
	};
});
