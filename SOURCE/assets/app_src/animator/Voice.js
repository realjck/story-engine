/*

Voice
author: JCK

needs on stage:
mc_subtitles  > champ (textfield)
_character	> mouthTalk
*/

define(['animator/SoundJS', 'util/ExternalText', 'util/UniqueTimerForVoice', 'util/OptionGetter', 'engine/Player', 'util/LinesBreaker', 'animator/VerticalTextCenterer'], function(SoundJS, ExternalText, UniqueTimerForVoice, OptionGetter, Player, LinesBreaker, VerticalTextCenterer) {

	var _self;
	var _mc;
	var _chorus;
	var _debug = false;
	var _is_talking;
	var _is_paused;
	var _callback;

	return {
		init: function(mc) {
			_self = this;
			_mc = mc;
			_mc.mouthTalk.gotoAndStop(0);
		},

		talk: function(id, callback, options) {
			
			_callback = callback;
			
			shortcut.remove("space");
			_self = this;
			
			UniqueTimerForVoice.stop();
			
			var superpose = OptionGetter.get(options, "superpose", false);
			var delay = OptionGetter.get(options, "delay", 0);
			_mc = OptionGetter.get(options, "character", undefined);
			var loaded_callback = OptionGetter.get(options, "onload", false);
			_chorus = OptionGetter.get(options, "chorus", false);
			var text = OptionGetter.get(options, "text", false);
			var forceLoad = OptionGetter.get(options, "forceLoad", false);

			if (Player.noVoice()) {
				filename = "assets/sounds/fx/debug.mp3";
			} else {
				filename = "assets/sounds/voice/"+id+".mp3"; 
			}
			
			var caption
			if (text != undefined){
				caption = text;
			} else {
				caption = ExternalText.getSubtitle(id);
			}

			function start_talk() {
				
				_is_talking = true;
				
				if (loaded_callback) {
					loaded_callback();
				}

				if (_mc != undefined) {
					_mc.visible = true;
					UniqueTimerForVoice.init(chooseTalkFrame, getRandLipTime());
				}
				
				s.mc_subtitles.outline_champ.font = "45px 'Quicksand Medium'";
				s.mc_subtitles.champ.font = "45px 'Quicksand Medium'";
				s.mc_subtitles.outline_champ.outline=8;

				
				s.mc_subtitles.outline_champ.text = caption;
				LinesBreaker.init(s.mc_subtitles.outline_champ, {equal:true});
				s.mc_subtitles.champ.text = s.mc_subtitles.outline_champ.text;
				
				VerticalTextCenterer.init(s.mc_subtitles.champ, 220, "bottom") ;
				VerticalTextCenterer.init(s.mc_subtitles.outline_champ, 220, "bottom") ;
				
				shortcut.add("space", function(){
					SoundJS.abort();
					stop_talk();
				});
			}

			var currentTalkFrame;
			function chooseTalkFrame() {
				if (!_is_paused){
					var randomTalkFrame;
					do {
						randomTalkFrame = getRandomInt(1, _mc.mouthTalk.totalFrames);
					} while (randomTalkFrame == currentTalkFrame);
					currentTalkFrame = randomTalkFrame;
					_mc.mouthTalk.gotoAndStop(currentTalkFrame);
					
					if (_chorus) {
						for (var i=0; i<_chorus.length; i++){
							do {
								randomTalkFrame = getRandomInt(1, _chorus[i].tete.mouthTalk.totalFrames);
							} while (randomTalkFrame == currentTalkFrame);
							currentTalkFrame = randomTalkFrame;
							_chorus[i].tete.mouthTalk.gotoAndStop(currentTalkFrame);
						}
					}

					UniqueTimerForVoice.setInterval(getRandLipTime());
				}
			}

			function stop_talk() {
				_is_talking = false;
				shortcut.remove("space");
				_self.stopTalk();
				if (_callback != undefined) {
					_callback();
				}
			}

			function launch() {
				SoundJS.init(filename, start_talk, stop_talk, superpose, forceLoad);
			}

			if (delay == 0) {
				launch();
			} else {
				UniqueTimerForVoice.wait(delay, launch);
			}
		},

		stopTalk: function() {

			if (_mc != undefined) {
				UniqueTimerForVoice.stop();
				_mc.mouthTalk.gotoAndStop(0);
			}
			if (_chorus) {
				for (var i=0; i<_chorus.length; i++){
					_chorus[i].tete.mouthTalk.gotoAndStop(0);
				}
			}

			if (Player.isIe()) {
				createjs.Sound.removeAllSounds();
			} else {
				createjs.Sound.stop();
			}

			if (s.mc_subtitles != undefined) {
				s.mc_subtitles.outline_champ.text = "";
				s.mc_subtitles.champ.text = "";
			}
		},
		
		pause: function(){
			SoundJS.pause();
			if (_is_talking){
				shortcut.remove("space");
			}
			_is_paused = true;
		},
		
		unpause: function(){
			SoundJS.resume();
			if (_is_talking){
				shortcut.add("space", function(){
					SoundJS.abort();
					_is_talking = false;
					shortcut.remove("space");
					_self.stopTalk();
					if (_callback != undefined) {
						_callback();
					}
				});
			}
			_is_paused = false;
		},
	};

	function getRandLipTime() {
		return getRandomInt(75, 175);
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
});