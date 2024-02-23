/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*
SURMESURE slide
author: JCK
*/

function questions(callback){//change name here
	require([
		'animator/Tween',
		'animator/Button',
		'util/CanvasTransition',
		'animator/ResponsiveStage',
		'animator/QuizDragDropOneByOne',
		'animator/MaskObjects',
		'animator/Voice'
	], function (
		Tween,
		Button,
		CanvasTransition,
		ResponsiveStage,
		QuizDragDropOneByOne,
		MaskObjects,
		Voice
	) {
		var screen_name = "questions";//change name here
		s.gotoAndStop(screen_name);
		var _screen = s[screen_name];
		ResponsiveStage.storeClip(screen_name, {horizontal:"fixed", vertical:"fixed"});
		s.visible = true;
		canvas.style.opacity = '0';
		CanvasTransition.init(null, "fadein");
		
		// ....code here
		MaskObjects.init(_screen, ["consigne2", "feedback", "feedback_suite", "bt_continue1", "bt_continue2"]);
		_screen["consigne1"].visible = true;
		QuizDragDropOneByOne.init(_screen, 12, 12, [[1,2,3,4,5,6],[1,2,3,4,5,6],[7,8,9,10,11,12],[7,8,9,10,11,12],[1,2,3,4,5,6],[1,2,3,4,5,6],[7,8,9,10,11,12],[7,8,9,10,11,12],[1,2,3,4,5,6],[7,8,9,10,11,12],[7,8,9,10,11,12],[1,2,3,4,5,6]], fbRight, fbWrong, {instanceDragNames:"drag", instanceDropNames:"drop"});
		
		function fbRight(){
			_screen["feedback"].gotoAndStop("right");
			suite();
		}
		
		function fbWrong(){
			_screen["feedback"].gotoAndStop("wrong");
			suite();
		}
		
		function suite(){
			Tween.init(_screen["feedback"], {pop:true});
			Tween.init(_screen["bt_continue1"], {pop:true});
			Button.enableZoom(_screen["bt_continue1"], suite2);
		}
		
		function suite2(){
			MaskObjects.init(_screen, ["consigne1", "feedback", "bt_continue1"]);
			_screen["consigne2"].visible = true;
			
			for (var i=1; i<=12; i++) {
				_screen["drag"+i].gotoAndStop("off");
			}
			
			bulles_fleches = [null, [6],[3],[2,12],[1,9],[5],[8],[7],[4],[10,11]];
			
			var counter = 1;
			startFleches();
			
			function startFleches(){
				for (var i=0; i<bulles_fleches[counter].length; i++) {
					_screen["drag"+bulles_fleches[counter][i]].gotoAndStop("click");
					_screen["drag"+bulles_fleches[counter][i]]["fleche"].visible = true;
					_screen.setChildIndex(_screen["drag"+bulles_fleches[counter][i]], _screen.getNumChildren() - 1);
					Button.enable(_screen["drag"+bulles_fleches[counter][i]], function(){
						for (var i=0; i<bulles_fleches[counter].length; i++) {
							_screen["drag"+bulles_fleches[counter][i]]["fleche"].visible = false;
							Button.disable(_screen["drag"+bulles_fleches[counter][i]]);
						}
						_screen["feedback_suite"].gotoAndStop(counter-1);
						Voice.talk("rec_e5_"+(20+counter)+"f", null, {text:"", forceLoad:true});
						Tween.init(_screen["feedback_suite"], {from:"left", distance:600, duration:350, fade:true, callback:
							function(){
								Tween.init(_screen["bt_continue2"], {pop:true});
								Button.enableZoom(_screen["bt_continue2"], function(e){
									Voice.stopTalk();
									e.currentTarget.visible = false;
									_screen["feedback_suite"].visible = false;
									for (var i=0; i<bulles_fleches[counter].length; i++) {
										_screen["drag"+bulles_fleches[counter][i]].gotoAndStop("off");
									}
									counter++;
									if (counter > 9){
										callback();
									} else {
										startFleches();
									}
								});
							}
						});
					});
				}
			}
			
		}

	});
}
