/*

QUIZ QCM / QCU
author: JCK

Needs following clips on stage:
- mc_choice_1....n
- bt_submit

Snippet:
QuizQcmQcu.init(s, ["first choice", "second choice", "third choice"], [1,2], fbRight, fbWrong, {options});
QuizQcmQcu.init(s, ["first choice", "second choice", "third choice"], [1,2], fbRight, fbWrong, {animator:"ShowQuiz", spacer:42, instanceNames:"mc_newchoice_"});

Options:
- animator (string) = name of module for construct animation
- autoCorrect (boolean) = if false, it won't show the correction on submit
- spacer (int or boolean) = overrides the default vertical spacer value (25px) / false = ,no auto-spacer
- instanceNames (string) = changes the default instance names for choices (mc_choice_)
- rightNotNeeded (boolean) = add a new state for correction, label 'right_not_needed"
- cursor (movieclip) = add a special mouse cursor when rollover choices (!! needs transparent buttons named 'bt_zone' inside choice movieclips to define the cursor zone !!)
- forceMulti = force multiple answers when good answer is only 1 choice
- callback = a complementary callback sent on submit on either right or wrong result

 */

define(['util/OptionGetter', 'util/UniqueTimer', 'animator/StorePosition', 'animator/Button', 'util/LinesBreaker'], function (OptionGetter, UniqueTimer, StorePosition, Button, LinesBreaker) {

	var _self;

	var _s;
	var _choices;
	var _good_answers;
	var _feedbackRight;
	var _feedbackWrong;
	var _autoCorrect;
	var _shuffle;
	var _seqChoicesAr;

	var _defaultSpacer = 45; // vertical space between choices (in px) by default
	var _defaultInstanceNames = "mc_choice_"; // default instance names for choices
	var _rightNotNeeded;
	var _cursor;
	var _callback;

	var _nbRep;
	var _spacer;
	var _instanceNames;
	var _isQcu;
	var _answers = new Array();
	var _isIncomplete;
	var _isInMotion;
	var _noText;
	var _forceMulti;
	
	var _ypos;

	return {
		init : function (stage, choices, good_answers, feedbackRight, feedbackWrong, options) {

			_self = this;

			_s = stage;
			_choices = choices;
			_good_answers = good_answers;
			_feedbacksRight = feedbackRight;
			_feedbacksWrong = feedbackWrong;

			_autoCorrect = OptionGetter.get(options, "autoCorrect", true);
			_shuffle = OptionGetter.get(options, "shuffle", true);
			_spacer = OptionGetter.get(options, "spacer", _defaultSpacer);
			_instanceNames = OptionGetter.get(options, "instanceNames", _defaultInstanceNames);
			_rightNotNeeded = OptionGetter.get(options, "rightNotNeeded", false);
			_cursor = OptionGetter.get(options, "cursor", false);
			_callback = OptionGetter.get(options, "callback", false);
			_noText = OptionGetter.get(options, "noText", false);
			_forceMulti = OptionGetter.get(options, "forceMulti", false);
			
			if (_noText) {
				_shuffle = false;
			}

			UniqueTimer.stop(); // in case of previous animator is still going

			construct();

			var animator = OptionGetter.get(options, "animator");

			var i;
			if (animator != undefined) {
				require(['animator/' + animator], function (Animator) {
					var mc_to_animate = new Array();
					for (i = 1; i <= _nbRep; i++) {
						mc_to_animate.push(_instanceNames + i);
					}
					Animator.init(_s, mc_to_animate, function() {
						_isInMotion = false;
					});
				});
				_isInMotion = true;
			} else {
				for (i = 1; i <= _nbRep; i++) {
					_s[_instanceNames + i].visible = true;
					_s[_instanceNames + i].champ.alpha = 1;
					_s[_instanceNames + i].alpha = 1;
				}
				_isInMotion = false;
			}
		},

		getAnswers: function() {
			return _answers;
		},
		
		getYpos: function(){
			return _ypos;
		},
		
		getStringOfAnswers: function(separator) {
			var str = "";
			for (var i = 1; i <= _nbRep; i++) {
				if (_answers[i]) {
					str += i;
					str += separator;
				}
			}
			if (str != "") {
				str = str.substring(0, str.length - separator.length);
			}
			return str;
		},
		
		getAnswersIsIncomplete: function() { // return true if NOT ALL THE GOOD ANSWERS are selected AND NO BAD ANSWER are selected IN CASE OF QCM, in all other cases, return false
			return _isIncomplete;
		},

		correct : function () {

			var isInGood_answers, i, j, mc_num;
			
			for (i = 1; i <= _nbRep; i++) {
				_s[_instanceNames + i].alpha = 0.3;
			}
			for (i = 0; i < _good_answers.length; i++){
				_s[_instanceNames + ((_seqChoicesAr.indexOf(_good_answers[i]))+1)].champ.alpha = 1;
				_s[_instanceNames + ((_seqChoicesAr.indexOf(_good_answers[i]))+1)].alpha = 1;
			}

			for (i = 1; i <= _nbRep; i++) {
				
				mc_num = (_seqChoicesAr.indexOf(i))+1;
				
				if (_answers[i]) {
					isInGood_answers = false;
					for (j = 0; j < _good_answers.length; j++) {
						if (i == _good_answers[j]) {
							isInGood_answers = true;
						}
					}
					if (!isInGood_answers) {
						_s[_instanceNames + mc_num].gotoAndStop('wrong');
						_s[_instanceNames + mc_num].alpha = 1;
						_s[_instanceNames + mc_num].champ.alpha = 0.3;
						
					} else {
						_s[_instanceNames + mc_num].gotoAndStop('right');
						// special pour accordia !!
						if (!_noText){
							boldify(_s[_instanceNames + mc_num].champ);
						}
						//
					}
				} else {
					isInGood_answers = false;
					for (j = 0; j < _good_answers.length; j++) {
						if (i == _good_answers[j]) {
							isInGood_answers = true;
						}
					}
					if (isInGood_answers) {
						_s[_instanceNames + mc_num].gotoAndStop('wrong_needed');
						// special pour accordia !!
						if (!_noText){
							boldify(_s[_instanceNames + mc_num].champ);
						}
						//
					} else {
						if (_rightNotNeeded) {
							_s[_instanceNames + mc_num].gotoAndStop('right_not_needed');
						}
					}
				}
			}
			
			function boldify(champ){
				// if (champ.text.substr(champ.text.length - 1) == "?"){
					// champ.text = champ.text.substr(0, champ.text.length - 1).trim();
					// LinesBreaker.init(champ);
				// }
				// champ.font = champ.font.replace("'Raleway'", "'Raleway ExtraBold'");
			}
		},

		reactive : function () {
			for (var i = 1; i <= _nbRep; i++) {
				_s[_instanceNames + i].mouseEnabled = true;
			}
		}
	};

	function construct() {

		_s.bt_submit.visible = false;
		_nbRep = _choices.length;
		if ((_good_answers.length == 1)&&(!_forceMulti)) {
			_isQcu = true;
		} else {
			_isQcu = false;
		}

		_answers = [];
		
		var i;
		_seqChoicesAr = [];
		for (i=0; i<_nbRep; i++) {
			_seqChoicesAr[i] = i+1;
		}
		// shuffle answers
		if (_shuffle) {
			shuffle(_seqChoicesAr);
		}

		var offset_y = _s[_instanceNames + 1].y;

		for (i = 1; i <= _nbRep; i++) {

			var mc = _s[_instanceNames + i];
			
			Button.disable(mc);
			mc.mouseEnabled = true;
			StorePosition.record(mc);
			mc.gotoAndStop('off');

			if (!_noText) {
				mc.champ.text = _choices[_seqChoicesAr[i-1] - 1];
				LinesBreaker.init(mc.champ);
				if (_spacer) {
					mc.y = offset_y;
				}
				
				// special pour accordia !!
				// mc.champ.font = mc.champ.font.replace("'Raleway ExtraBold'", "'Raleway'");
				//
				
				var champ_height = mc.champ.getMeasuredHeight();

				mc.champ.hit = new createjs.Shape();
				mc.champ.hit.graphics.beginFill("#000").drawRect(0, 0, mc.champ.getMeasuredWidth(), champ_height);
				mc.champ.hitArea = mc.champ.hit;

				offset_y = offset_y + champ_height + _spacer;
			}

			mc.n = _seqChoicesAr[i-1];
			mc.on("mousedown", onClickChoice);
			
			if (_cursor) {
				mc.bt_zone.cursor = 'none';
				mc.on("rollover", function() {
					_cursor.visible = true;
				});
				mc.on("rollout", function() {
					_cursor.visible = false;
				});
			} else {
				mc.cursor = 'pointer';
			}
		}
		_ypos = offset_y;
		//_s.bt_submit.y = offset_y;
		// _s.bt_submit.on("click", onClickSubmit);
		Button.enable(_s.bt_submit, onClickSubmit, null, null, {forceVisible:false});
		
		if (_cursor) {
			_cursor.mouseEnabled = false;
			s.setChildIndex(_cursor, s.getNumChildren() - 1);
			stage.on("stagemousemove", function(e) {
				_cursor.x = e.stageX;
				_cursor.y = e.stageY;
			});
		}

	}

	function onClickChoice(e) {
		n = e.currentTarget.n;
		_s.bt_submit.visible = true;
		if (_isQcu) {
			for (i = 1; i <= _nbRep; i++) {
				_answers[i] = false;
				_s[_instanceNames + i].gotoAndStop('off');
			}
			_answers[n] = true;
			e.currentTarget.gotoAndStop('on');
		} else {
			if (_answers[n]) {
				_answers[n] = false;
				e.currentTarget.gotoAndStop('off');
			} else {
				_answers[n] = true;
				e.currentTarget.gotoAndStop('on');
			}
		}

		if (_isInMotion) {
			UniqueTimer.stop();
			createjs.Tween.removeAllTweens();
			var offset_y = _s[_instanceNames + 1].y;
			for (var i = 1; i <= _nbRep; i++) {
				var mc = _s[_instanceNames + i];
				StorePosition.reset(mc);
				mc.visible = true;
				mc.champ.alpha = 1;
				mc.alpha = 1;
				
				if (!_noText) {
					if (_spacer) {
						mc.y = offset_y;
					}
					var champ_height = mc.champ.getMeasuredHeight();
					offset_y = offset_y + champ_height + _spacer;
				}
			}
			_isInMotion = false;
		}
	}

	function onClickSubmit(e) {

		e.currentTarget.visible = false;

		var isWin = true;
		var isInGood_answers;
		
		// for _isIncomplete
		var nbGoodSelected = 0;
		var badChosen = false;
		
		// start validation
		for (var i = 1; i <= _nbRep; i++) {
		
			_s[_instanceNames + i].mouseEnabled = false;
		
			if (_answers[i]) {
				isInGood_answers = false;
				for (j = 0; j < _good_answers.length; j++) {
					if (i == _good_answers[j]) {
						isInGood_answers = true;
					}
				}
				if (!isInGood_answers) {
					isWin = false;
					badChosen = true;
				} else {
					nbGoodSelected++;
				}
			} else {
				isInGood_answers = false;
				for (j = 0; j < _good_answers.length; j++) {
					if (i == _good_answers[j]) {
						isInGood_answers = true;
					}
				}
				if (isInGood_answers) {
					isWin = false;
				}
			}
		}
		
		// _isIncomplete
		if (badChosen) {
			_isIncomplete = false;
		} else {
			if (nbGoodSelected < _good_answers.length) {
				_isIncomplete = true;
			} else {
				_isIncomplete = false;
			}
		}

		// end of validation
		if (_autoCorrect) {
			_self.correct();
		}

		// callbacks
		if (_callback) {
			_callback();
		}
		if (isWin) {
			_feedbacksRight();
		} else {
			_feedbacksWrong();
		}
	}
	
	/**
	 * Shuffles array in place.
	 * @param {Array} a items The array containing the items.
	 */
	function shuffle(a) {
		var j, x, i;
		for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
	}

});
