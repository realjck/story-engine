/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Quiz Builder
Build Dynamic Quiz from JSON

author: JCK

*/

define([
	"util/JsonHandler",
	"animator/ResponsiveStage",
	"animator/WaitNextTick",
	"animator/Button",
	"animator/Tween",
	"util/OptionGetter",
	"animator/MaskObjects",
	"animator/QuizQcmQcu",
	"animator/StorePosition",
	"util/UniqueTimer",
	"animator/Mascotte",
	"util/CanvasTransition",
	"animator/SoundJS",
	"util/LinesBreaker",
	"animator/LoadImage",
	"animator/Voice"
	], function(
	JsonHandler,
	ResponsiveStage,
	WaitNextTick,
	Button,
	Tween,
	OptionGetter,
	MaskObjects,
	QuizQcmQcu,
	StorePosition,
	UniqueTimer,
	Mascotte,
	CanvasTransition,
	SoundJS,
	LinesBreaker,
	LoadImage,
	Voice
) {
	
	var contenu;

	return {
		init: function(s, json, options, callback) {
			
			s.gotoAndStop("QUIZ");
			
			var _screen = s.QUIZ;
			
			MaskObjects.init(_screen, ["question", "mc_choice_1", "mc_choice_2", "mc_choice_3", "mc_choice_4", "mc_choice_5", "mc_choice_6", "feedback", "bt_submit", "bt_continue", "perso"]);
			if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
				_screen["personnalisable"].visible = true;
			} else {
				if (_screen.personnalisable != undefined) {
					_screen.personnalisable.visible = false;
				}
			}
			
			_screen.image.removeAllChildren();
			
			ResponsiveStage.storeClip("QUIZ", {horizontal:"fixed", vertical:"fixed"});
			
			var _perso = OptionGetter.get(options, "perso", false);
			
			var _consigneauto = OptionGetter.get(options, "consigneauto", false);
			
			var _question_counter = 0;
			var _correct_answers = 0;
			
			var line_counter = 0;

			
			WaitNextTick.init(function(){
				
				s.visible = true;
				canvas.style.opacity = '0';

				if (!OptionGetter.get(options, "prologue", false)){
					_screen.prologue_bg_zoom.visible = false;
				} else {
					_screen.prologue_bg_zoom.visible = true;
				}
				
				JsonHandler.loadExcel(json, launch);
			});
			
			function initWidths(){
				var i;
				if (_perso){
					_screen.perso.gotoAndStop(_perso);
					_screen.perso[_perso].gotoAndStop(0);
					_screen.perso.visible = true;
					_screen.question.x = 480;
					_screen.question.lineWidth = 1290;
					_screen.consigne.x = 480;
					_screen.consigne.lineWidth = 1290;
					_screen.feedback.x = 480;
					_screen.bt_submit.x = 1030;
					for (i=1; i<=6; i++){
						_screen["mc_choice_"+i].x = 480;
						_screen["mc_choice_"+i].champ.lineWidth = 1100;
					}
				} else {
					_screen.question.x = 225;
					_screen.question.lineWidth = 1600;
					_screen.consigne.x = 225;
					_screen.consigne.lineWidth = 1600;
					_screen.feedback.x = 225;
					_screen.bt_submit.x = 960;
					for (i=1; i<=6; i++){
						_screen["mc_choice_"+i].x = 225;
						_screen["mc_choice_"+i].champ.lineWidth = 1550;
					}
				}
				
			}
			
			
			function launch(){
				
				var _total_questions;
				// count questions (for consigneauto)
				if (_consigneauto){
					_total_questions = 0
					var i = 0;
					while (JsonHandler.getLine(json, i) != undefined){
						if (JsonHandler.getLine(json, i).id == "question"){
							_total_questions++;
						}
						i++
					}
				}	
				
				CanvasTransition.init(null, "fadein");
				
				launchQuestion();
				
				function launchQuestion(){
					
					initWidths();
					
					_question_counter ++;
					_screen.question.y = _screen.consigne.y = 35;
					
					if (JsonHandler.getLine(json, line_counter).id == "consigne"){
						// consigne auto ?
						if (_consigneauto){
							_screen.consigne.text = __gtexts[__lang].quiz_consigne_auto.replace("[num]", _question_counter).replace("[total]", _total_questions);
						} else {
							_screen.consigne.text = JsonHandler.getLine(json, line_counter).value;
						}
						Tween.init(_screen.consigne, {from:"right", distance:200, duration:350, fade:true, noInit:true});
						_screen.question.y = _screen.consigne.y + _screen.consigne.getMeasuredHeight() + 15;
						line_counter++;
					} else {
						_screen.consigne.visible = false;
					}
					
					if ((JsonHandler.getLine(json, line_counter).son != "")&&(JsonHandler.getLine(json, line_counter).son != undefined)){
						if (_perso){
							Mascotte.play(_screen.perso[_perso], JsonHandler.getLine(json, line_counter).son, {text:" ", forceLoad:true});
						} else {
							var son_url = "assets/sounds/voice/"+JsonHandler.getLine(json, line_counter).son+".mp3";
							SoundJS.init(son_url, null, null, null, true);
						}
					}
					if ((JsonHandler.getLine(json, line_counter).image != "")&&(JsonHandler.getLine(json, line_counter).image != undefined)){
						LoadImage.init(_screen.image, "assets/images/medias/"+JsonHandler.getLine(json, line_counter).image, function(w,h){
							
							_screen.image.x = 1920-35-w;
							_screen.question.lineWidth -= (35+w);
							_screen.consigne.lineWidth -= (35+w);
							buildQuestion();
						});
					} else {
						buildQuestion();
					}
					
					function buildQuestion(){
					
						_screen.question.text = JsonHandler.getLine(json, line_counter).value;
						LinesBreaker.init(_screen.question);
						
						Tween.init(_screen.question, {from:"right", distance:200, duration:350, fade:true, noInit:true});
						
						_screen.mc_choice_1.y = _screen.question.y + _screen.question.getMeasuredHeight() + 20;
						
						var start_line = line_counter;
						
						line_counter++;

						
						var answer = [];
						var propositions = [];
						var feedback;
						var shuffle = false;
						var win = false;
						var forceMulti = false;
						while(JsonHandler.getLine(json, line_counter).id != "feedback"){
							
							// if (JsonHandler.getLine(json, line_counter).id.toLowerCase().trim() != "feedback"){
								
							if ((JsonHandler.getLine(json, line_counter).id == "ok")||(JsonHandler.getLine(json, line_counter).id == "okm")){
								answer.push(line_counter - start_line);
								if (JsonHandler.getLine(json, line_counter).id == "okm"){
									forceMulti = true;
								}
							}
							var prop = JsonHandler.getLine(json, line_counter).value;
							propositions.push(prop);
							
							line_counter++;
							// }
						}
						feedback = JsonHandler.getLine(json, line_counter).value;
						line_counter++;
						
						// do the quiz
						UniqueTimer.wait(200, function(){
							QuizQcmQcu.init(_screen, propositions, answer, correct, wrong, {spacer:40, shuffle:false, forceMulti:forceMulti});

							for (var i=1; i<=propositions.length; i++){
								Tween.init(_screen["mc_choice_"+i], {noInit:true});
							}
							
							var bottom_pos = _screen["mc_choice_"+propositions.length].y + _screen["mc_choice_"+propositions.length].champ.getMeasuredHeight();
							_screen.bt_submit.y = bottom_pos + 150;
						});
					
						function correct(){
							if (_perso){
								Voice.stopTalk();
							}
							SoundJS.init("assets/sounds/fx/right.mp3");
							win = true;
							_correct_answers ++;
							goFeedback();
						}
						
						function wrong(){

							SoundJS.init("assets/sounds/fx/wrong.mp3");
							goFeedback();
						}
						
						function goFeedback(){
							if (_perso){
								Voice.stopTalk();
							}
							var bottom_pos = _screen["mc_choice_"+propositions.length].y + _screen["mc_choice_"+propositions.length].champ.getMeasuredHeight();
							_screen.feedback.y = bottom_pos + 55;
							_screen.bt_continue.y = bottom_pos + 150;
							
							var sound_fx;
							if (win){
								sound_fx = "right";
							} else {
								sound_fx = "wrong";
							}
							
							SoundJS.init("assets/sounds/fx/"+sound_fx+".mp3", null, function(){
								if (JsonHandler.getLine(json, line_counter-1).son != undefined){
									if (_perso){
										Mascotte.play(_screen.perso[_perso], JsonHandler.getLine(json, line_counter-1).son, {text:" ", forceLoad:true});
									} else {
										var son_url = "assets/sounds/voice/"+JsonHandler.getLine(json, line_counter-1).son+".mp3";
										SoundJS.init(son_url, null, null, null, true);
									}
								}
							});
							// no feedback ?
							if (feedback == undefined){
								_screen.bt_continue.x = _screen.bt_submit.x;
								_screen.bt_continue.y = _screen.bt_submit.y;
								
								
								StorePosition.record(_screen.bt_continue);
								Tween.init(_screen.bt_continue, {pop:true, noInit:true});
								Button.enableZoom(_screen.bt_continue, goNext);
								
							// feedback ?
							} else {
								if (_perso){
									_screen.bt_continue.x = 1780;
								} else {
									_screen.bt_continue.x = 1550;
								}
								_screen.feedback.champ.text = feedback;
								
								Tween.init(_screen.feedback, {from:"right", distance:200, duration:350, fade:true, noInit:true, callback:
									function(){
										_screen.bt_continue.y = _screen.feedback.y + (_screen.feedback.champ.getMeasuredHeight() / 2) - 20;
										StorePosition.record(_screen.bt_continue);
										Tween.init(_screen.bt_continue, {pop:true, noInit:true});
										Button.enableZoom(_screen.bt_continue, goNext);
									}
								});
							}	
						}
						
						function goNext(){
							// quiz finished // next question ?
							SoundJS.abort();
							if (JsonHandler.getLine(json, line_counter) != undefined){
								if ((JsonHandler.getLine(json, line_counter).id.toLowerCase().trim() != "question")&&(JsonHandler.getLine(json, line_counter).id.toLowerCase().trim() != "consigne")){
									endQuiz();
								} else {
									launchNext();
								}
							} else {
								endQuiz();
							}
							
							function endQuiz(){
								var score = Math.round(_correct_answers / _question_counter * 100);
								callback(score);
							}
							
							function launchNext(){
								MaskObjects.init(_screen, ["question", "mc_choice_1", "mc_choice_2", "mc_choice_3", "mc_choice_4", "mc_choice_5", "mc_choice_6", "feedback", "bt_submit", "bt_continue"]);
								launchQuestion();
							}
						}
					}
					
				}
				
				
			}

		}
	};
});
