/*

ClickPictos Builder
Build Dynamic ClickPictos interactions from JSON

author: JCK

*/

define([
	"util/JsonHandler",
	"animator/ResponsiveStage",
	"animator/Button",
	"animator/LoadImage",
	"animator/Tween",
	"util/LinesBreaker",
	"animator/WaitNextTick",
	"animator/MaskObjects",
	"util/UniqueTimer",
	"util/CanvasTransition",
	"animator/SoundJS"
	], function(
	JsonHandler,
	ResponsiveStage,
	Button,
	LoadImage,
	Tween,
	LinesBreaker,
	WaitNextTick,
	MaskObjects,
	UniqueTimer,
	CanvasTransition,
	SoundJS
) {
	
	var contenu;

	return {
		init: function(s, json, callback) {
			
			s.gotoAndStop("CLICKPICTOS");
			
			ResponsiveStage.storeClip("CLICKPICTOS", {horizontal:"fixed", vertical:"fixed"});
			var _screen = s.CLICKPICTOS;
			
			MaskObjects.init(_screen, ["titre", "textes", "bt_continue", "consigne", "picto1", "picto2", "picto3", "picto4", "picto5", "picto6", "picto7", "picto8", "fleche1", "fleche2", "fleche3", "fleche4", "fleche5", "fleche6", "fleche7", "fleche8", "personnalisable"]);
			if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
				_screen["personnalisable"].visible = true;
			}
			
			
			var height_pointer = 70;
			var start = true;
			
			WaitNextTick.init(function(){
				JsonHandler.loadExcel(json, build);
			});
			
			function build(){
				
				_screen.titre.y = height_pointer;
				_screen.titre.text = JsonHandler.getLine(json, 0).texte.trim();
				
				LinesBreaker.init(_screen.titre);
				if (JsonHandler.getLine(json, 0).texte.trim() != ""){
					height_pointer += _screen.titre.getMeasuredHeight() + 10;
				}
				
				_screen.consigne.y = height_pointer;
				_screen.consigne.text = JsonHandler.getLine(json, 1).texte;
				height_pointer += _screen.consigne.getMeasuredHeight() + 60;
				
				for (var i=1; i<=8; i++){
					_screen["fleche"+i].y = height_pointer;
					_screen["fleche"+i].play();
					_screen["picto"+i].y = height_pointer;
					_screen["bt"+i].y = height_pointer;
					_screen["bt"+i].n = i;
					_screen["bt"+i].vu = false;
					
					_screen["fleche"+i].visible = _screen["picto"+i].visible = _screen["bt"+i].visible = false;
				}
				
				var counter = 1;
				var nb_elements;
				var current;
				var next_tweenout_direction;
				
				loadPicto();
				
				function loadPicto(){
					counter++;
					if (JsonHandler.getLine(json, counter) == undefined){
						s.visible = true;
						canvas.style.opacity = '0';
						CanvasTransition.init(null, "fadein");
						centerElements();
					} else {
						LoadImage.init(_screen["picto"+(counter-1)], "assets/images/medias/"+JsonHandler.getLine(json, counter).picto, loadPicto, {clear:true, resize:[150,150]});
						_screen["fleche"+(counter-1)].visible = _screen["picto"+(counter-1)].visible = _screen["bt"+(counter-1)].visible = true;
						_screen["picto"+(counter-1)].alpha = 1;
					}
				}
				
				
				function centerElements(){
					
					nb_elements = counter - 2;
					
					var offset_x = (1920 - nb_elements*150 - (nb_elements - 1)*75) / 2;
					
					for (var i=1; i<= nb_elements; i++){
						_screen["picto"+i].x = _screen["bt"+i].x = offset_x;
						_screen["fleche"+i].x = offset_x + 150;
						offset_x += 150+75
						
						//Tween.initGroup(_screen, ["picto"+i, "fleche"+i]);
						_screen["picto"+i].visible = true;
						_screen["fleche"+i].visible = true;
						
					}
					Tween.initGroup(_screen, ["titre", "consigne"]);
					addElementsBehaviour();
				}
				
				function addElementsBehaviour(){
					for (var i=1; i<=nb_elements; i++){
						Button.enable(_screen["bt"+i], function(e){
							
							e.currentTarget.vu = true;
							var n = e.currentTarget.n;
							
							if (current != n){
								
								current = n;
								
								_screen["fleche"+n].visible = false;
								for (var i=1; i<=nb_elements; i++){
									_screen["picto"+i].alpha = 0.3
								}
								_screen["picto"+n].alpha = 1;
								
								if (start){
									updateText();
									Tween.init(_screen.textes, {from:"top", distance:20, duration:250, fade:true, noInit:true});
									start = false;
								} else {
									Tween.init(_screen.textes, {to:next_tweenout_direction, distance:600, duration:200, fadeout:true, noInit:true, callback:
										function(){
											updateText();
											Tween.init(_screen.textes, {from:"top", distance:20, duration:250, fade:true, noInit:true});
										}
									});
								}
								
								var all_vus = true;
								for (var i=1; i<=nb_elements; i++){
									if (!_screen["bt"+i].vu){
										all_vus = false;
									}
								}
								if ((all_vus)&&(!_screen.bt_continue.visible)){
									Tween.init(_screen.bt_continue, {pop:true});
									Button.enableZoom(_screen.bt_continue, callback);
								}
								
							}

							function updateText(){
								
								_screen.textes.x = _screen["bt"+n].x		
								_screen.textes.y = height_pointer+150+30;
								
								if (n <= nb_elements / 2 ){
									next_tweenout_direction = "right";
									_screen.textes.gotoAndStop("left");
								} else {
									next_tweenout_direction = "left";
									_screen.textes.gotoAndStop("right");
								}
								_screen.textes.titre.text = JsonHandler.getLine(json, n+1).titre;
								_screen.textes.texte.y = _screen.textes.titre.y + _screen.textes.titre.getMeasuredHeight()+10;
								_screen.textes.texte.text = JsonHandler.getLine(json, n+1).texte;
								
								_screen.textes.trait.scaleY = (10 + _screen.textes.titre.getMeasuredHeight() + _screen.textes.texte.getMeasuredHeight()) / 100;
								
								LinesBreaker.init(_screen.textes.titre);
								
								if (JsonHandler.getLine(json, n+1).son != undefined){
									var son_url = "assets/sounds/voice/"+JsonHandler.getLine(json, n+1).son+".mp3";
									SoundJS.init(son_url, null, null, null, true);
								}
								
								if (n > nb_elements / 2 ){
									var w = Math.max(_screen.textes.titre.getBounds().width, _screen.textes.texte.getBounds().width);
									_screen.textes.texte.x = (w - 130) * -1;
									_screen.textes.titre.x = (w - 130) * -1;
								}

							}

						},null,null,{noDisable:true});
					}
				}
			}

		}
	};
});