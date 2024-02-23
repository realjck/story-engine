/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QUIZ TRUE/FALSE LIST
author: JCK

Needs following clips on stage:
- mc_choice_1_1, mc_choice_1_2 , mc_choice_2_1, mc_choice_2_2, ....etc
- bt_submit

Snippet:
QuizTrueFalseList.init(s, ["True", "False"], [0,1,1,0,1,1], fbRight, fbWrong, {instanceNames:"mc_newchoice_"});

Options:
- autoCorrect (boolean) = if false, it won't show the correction on submit
- instanceNames (string) = changes the default instance names for choices (mc_choice_)

 */

define(['util/OptionGetter'], function (OptionGetter) {

	var _self;

	var _s;
	var _texts;
	var _good_answers;
	var _feedbackRight;
	var _feedbackWrong;
	var _autoCorrect;

	var _defaultInstanceNames = "mc_choice_"; // default instance names for choices

	var _nbRep;
	var _instanceNames;
	var _answers = new Array();

	return {
		init : function (stage, texts, good_answers, feedbackRight, feedbackWrong, options) {

			_self = this;

			_s = stage;
			_texts = texts;
			_good_answers = good_answers;
			_feedbacksRight = feedbackRight;
			_feedbacksWrong = feedbackWrong;

			_autoCorrect = OptionGetter.get(options, "autoCorrect", true);
			_instanceNames = OptionGetter.get(options, "instanceNames", _defaultInstanceNames);

			construct();
		},

		correct : function () {

			for (var i = 1; i <= _nbRep; i++) {
				if (_good_answers[i-1]) {

					if (_answers[i]) {
						_s[_instanceNames + i + "_1"].gotoAndStop('right');
					} else {
						_s[_instanceNames + i + "_1"].gotoAndStop('wrong_needed');
						_s[_instanceNames + i + "_2"].gotoAndStop('wrong');
					}
				} else {
					if (!_answers[i]) {
						_s[_instanceNames + i + "_2"].gotoAndStop('right');
					} else {
						_s[_instanceNames + i + "_2"].gotoAndStop('wrong_needed');
						_s[_instanceNames + i + "_1"].gotoAndStop('wrong');
					}
				}
			}
		}
	};

	function construct() {

		_s.bt_submit.visible = false;
		_nbRep = _good_answers.length;

		_answers = [];

		for (i = 1; i <= _nbRep; i++) {

			var mc1 = _s[_instanceNames + i + "_1"];
			var mc2 = _s[_instanceNames + i + "_2"];

			mc1.mouseEnabled = true;
			mc2.mouseEnabled = true;

			mc1.gotoAndStop('off');
			mc2.gotoAndStop('off');

			mc1.champ.text = _texts[0];
			mc2.champ.text = _texts[1];


			var champ_height = mc1.champ.getMeasuredHeight();

			mc1.champ.hit = new createjs.Shape();
			mc2.champ.hit = new createjs.Shape();
			mc1.champ.hit.graphics.beginFill("#000").drawRect(0, 0, mc1.champ.getMeasuredWidth(), champ_height);
			mc2.champ.hit.graphics.beginFill("#000").drawRect(0, 0, mc2.champ.getMeasuredWidth(), champ_height);
			mc1.champ.hitArea = mc1.champ.hit;
			mc2.champ.hitArea = mc2.champ.hit;

			mc1.n = i;
			mc2.n = i;
			mc1.addEventListener("click", onClickChoice1);
			mc2.addEventListener("click", onClickChoice2);
			mc1.cursor = 'pointer';
			mc2.cursor = 'pointer';
		}
		_s.bt_submit.addEventListener("click", onClickSubmit);

	}

	function onClickChoice1(e) {
		n = e.currentTarget.n;
		_s[_instanceNames + n + "_1"].gotoAndStop("on");
		_s[_instanceNames + n + "_2"].gotoAndStop("off");
		_answers[n] = true;
		_s.bt_submit.visible = checkAllChecked();
	}

	function onClickChoice2(e) {
		n = e.currentTarget.n;
		_s[_instanceNames + n + "_1"].gotoAndStop("off");
		_s[_instanceNames + n + "_2"].gotoAndStop("on");
		_answers[n] = false;
		_s.bt_submit.visible = checkAllChecked();
	}

	function checkAllChecked() {
		var is_all_checked = true;
		for (var i=1; i<= _nbRep; i++) {
			if (_answers[i] == undefined) {
				is_all_checked = false;
			}
		}
		return is_all_checked;
	}

	function onClickSubmit(e) {

		e.currentTarget.visible = false;

		var isWin = true;

		for (var i = 1; i <= _nbRep; i++) {
			if (_answers[i] != _good_answers[i-1]) {
				isWin = false;
			}
			_s[_instanceNames + i + "_1"].mouseEnabled = false;
			_s[_instanceNames + i + "_2"].mouseEnabled = false;
		}

		if (_autoCorrect) {
			_self.correct();
		}

		if (isWin) {
			_feedbacksRight();
		} else {
			_feedbacksWrong();
		}
	}

});
