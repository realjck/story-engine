/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QUIZ DRAG / DROP *ONE BY ONE*
author: JCK

Needs following clips on stage:
- mc_drag_1, mc_drag_2, etc.
- mc_drop_1, mc_drop_2, etc.
- bt_submit

QuizDragDropOneByOne.init(s, 4, 2, [[2],[0],[0],[1]], fbRight, fbWrong, {instanceDragNames:"mc_drag_val4_", instanceDropNames:"mc_drop_val4_"});
--> return array of answers (starting at #1)

Options:
- instanceDragNames
- instanceDropNames
- autoCorrect
- maskDrops
- callback

 */

define(["animator/Collisions", "util/OptionGetter", "animator/Tween"], function (Collisions, OptionGetter, Tween) {

  var _s;
  var _nb_drags;
  var _nb_drops;
  var _answersAr;
  var _feedbacksRight;
  var _feedbackWrong;

  var _tweenSpeed = 200;
  var _tweenSpeedFeedback = 500;
  var _defaultInstanceDragNames = "mc_drag_";
  var _defaultInstanceDropNames = "mc_drop_";

  var _instanceDragNames;
  var _instanceDropNames;
  var _autoCorrect;
  var _maskDrops;
  var _callback;

  var _playerAnswersAr;
  var _returnedAnswers;
  var _isDetractor;
  var _isEnded;
  var _minToFinish;
  var _isFeedbackCalled;
  var _dragPosition = new Object();
  var _dragCounter;

  return {
    init : function (stage, nb_drags, nb_drops, answersAr, feedbackRight, feedbackWrong, options) {
      _s = stage;
      _nb_drags = nb_drags;
      _nb_drops = nb_drops;
      _answersAr = answersAr;
      _feedbackRight = feedbackRight;
      _feedbackWrong = feedbackWrong;

      _instanceDragNames = OptionGetter.get(options, "instanceDragNames", _defaultInstanceDragNames);
      _instanceDropNames = OptionGetter.get(options, "instanceDropNames", _defaultInstanceDropNames);

      _autoCorrect = OptionGetter.get(options, "autoCorrect", true);
      _maskDrops = OptionGetter.get(options, "maskDrops", false);
      _callback = OptionGetter.get(options, "callback", false);
      
      _responsive_ref = OptionGetter.get(options, "responsiveRef", _s);
      
      _isFeedbackCalled = false;
      
      if (_nb_drags <= _nb_drops) {
        _minToFinish = _nb_drags;
      } else {
        _minToFinish = _nb_drops;
      }

      construct();
    },

    getAnswers: function() {
      return _returnedAnswers;
    },
    
    getStringOfAnswers: function(separator) {
      return _playerAnswersAr.join(separator);
    },
    
    correct: function() {
      _autoCorrect = true;
      checkWin();
    }
  };

  function construct() {

    _playerAnswersAr = [];
    _isEnded = false;

    _isDetractor = false;
    for (i = 0; i < _nb_drags; i++) {
      if (_answersAr[i][0] == 0) {
        _isDetractor = true;
      }
    }

    //_s.bt_submit.visible = _isDetractor;
    _s.bt_submit.visible = false;

    for (var i = 1; i <= _nb_drags; i++) {

      var mc = _s[_instanceDragNames + i];
      mc.gotoAndStop(1);
      mc.mouseEnabled = true;
      mc.iswrong = false;
      mc.visible = false;

      if (mc.oldx == undefined) {
        mc.oldx = mc.x;
      } else {
        mc.x = mc.oldx;
      }
      if (mc.oldy == undefined) {
        mc.oldy = mc.y;
      } else {
        mc.y = mc.oldy;
      }
      mc.n = i;
      _playerAnswersAr[i - 1] = 0;

      var delta_x;
      var delta_y;
      var target;
      mc.addEventListener("mousedown", function (e) {
        target = e.currentTarget;
        delta_x = (stage.mouseX/_responsive_ref.scaleX - target.x - _responsive_ref.x);
        delta_y = (stage.mouseY/_responsive_ref.scaleY - target.y - _responsive_ref.y);
        _s.setChildIndex(target, _s.getNumChildren() - 1);
      });

      mc.addEventListener("pressmove", function (e) {
        target.x = (stage.mouseX/_responsive_ref.scaleX - delta_x - _responsive_ref.x);
        target.y = (stage.mouseY/_responsive_ref.scaleY - delta_y - _responsive_ref.y);
      });
      mc.cursor = "pointer";

      mc.addEventListener("pressup", function (e) {

        _playerAnswersAr[(e.currentTarget.n) - 1] = 0;
        for (var i = 1; i <= _nb_drops; i++) {
          if (isBoxFree(i)) {
            if (Collisions.check(e.currentTarget, _s[_instanceDropNames + i])) {
              goTween(e.currentTarget, _s[_instanceDropNames + i].x, _s[_instanceDropNames + i].y, _tweenSpeed);
              _playerAnswersAr[(e.currentTarget.n) - 1] = i;
              // lock current and show next drag
              // e.currentTarget.cursor = "initial";
              // e.currentTarget.removeAllEventListeners();
              _dragCounter++;
              if (_dragCounter <= _nb_drags) {
                _s[_instanceDragNames + _dragCounter].x = _dragPosition.x;
                _s[_instanceDragNames + _dragCounter].y = _dragPosition.y;
                Tween.init(_s[_instanceDragNames + _dragCounter], {duration:150});
              }
              break;
            }
          }
        }

        if (_playerAnswersAr[(e.currentTarget.n) - 1] == 0) {
          goTween(e.currentTarget, _dragPosition.x, _dragPosition.y, _tweenSpeed);
        }
        _s.bt_submit.visible = isCompleted();
        
        if (_maskDrops) {
          for (i = 1; i <= _nb_drops; i++) {
            _s[_instanceDropNames + i].visible = isBoxFree(i);
          }
        }
        
      });
    }
    // show only 1st one:
    _dragPosition.x = _s[_instanceDragNames + "1"].x;
    _dragPosition.y = _s[_instanceDragNames + "1"].y;
    _s[_instanceDragNames + "1"].visible = true;
    _dragCounter = 1;
    //

    for (i = 1; i <= _nb_drops; i++) {
      var mc = _s[_instanceDropNames + i];
      mc.isnofree = false;
      mc.iscorrected = false;
    }

    _s.bt_submit.addEventListener("click", function (e) {
      e.currentTarget.visible = false;
      e.currentTarget.removeAllEventListeners();
      checkWin();
    });
  }

  function goTween(mc, end_x, end_y, speed) {
    mc.mouseEnabled = false;
    endTween = function () {
      if (!_isEnded) {
        mc.mouseEnabled = true;
      }
    }
    createjs.Tween.get(mc).to({
      x : end_x,
      y : end_y
    }, speed).call(endTween);
  }

  function isBoxFree(boxnumber) {
    var is_box_free;
    if (_s[_instanceDropNames + boxnumber].isnofree) {
      is_box_free = false;
    } else {
      is_box_free = true;
      for (var i = 0; i < _nb_drags; i++) {
        if (_playerAnswersAr[i] == boxnumber) {
          is_box_free = false;
        }
      }
    }
    return is_box_free;
  }

  function isCompleted() {
    var nb_placed = 0;
    for (var i = 0; i < _nb_drags; i++) {
      if (_playerAnswersAr[i] != 0) {
        nb_placed++;
      }
    }
    if (nb_placed >= _minToFinish) {
      return true;
    } else {
      return false;
    }
  }

  function checkWin() {

    _isEnded = true;

    _returnedAnswers = [];

    var isWin = true;
    for (var i = 0; i < _nb_drags; i++) {

      var iwin = false;

      _s[_instanceDragNames + (i+1)].mouseEnabled = false;

      var should_not_be_placed = false;
      for (var j = 0; j < _answersAr[i].length; j++) {

        if (_playerAnswersAr[i] == _answersAr[i][j]) {
          iwin = true;
        }
        if (_answersAr[i][j] == 0) {
          should_not_be_placed = true;
        }
      }

      if (!iwin) {
        if (_s[_instanceDropNames + _playerAnswersAr[i]] != undefined) {
          _s[_instanceDropNames + _playerAnswersAr[i]].iswrong = true;
        }
        _s[_instanceDragNames + (i + 1)].iswrong = true;
        isWin = false;
        if (_playerAnswersAr[i] != 0) {
          if (_autoCorrect) {
            _s[_instanceDragNames + (i + 1)].gotoAndStop("wrong");
          }
        }
        _returnedAnswers[i+1] = false;
      } else {
        if (!should_not_be_placed) {
          if (_autoCorrect) {
            _s[_instanceDragNames + (i + 1)].gotoAndStop("right");
          }
          _returnedAnswers[i+1] = true;
        }
      }
    }

    //feedbacks
    
    if (_callback) {
      _callback();
    }
    
    if (!_isFeedbackCalled) {
      _isFeedbackCalled = true;
      if (isWin) {
        _feedbackRight();
      } else {
        _feedbackWrong();
      }
    }

    if (_autoCorrect) {
      // replace elements
      for (i = 0; i < _nb_drags; i++) {
        var iwr = false;
        if (_s[_instanceDropNames + _playerAnswersAr[i]] != undefined) {
          if (_s[_instanceDropNames + _playerAnswersAr[i]].iswrong) {
            iwr = true;
          }
        }

        if (iwr || (_s[_instanceDragNames + (i + 1)].iswrong)) {
          if (_answersAr[i][0] != 0) {
            var isplaced = false;
            for (j = 0; j < _answersAr[i].length; j++) {
              if (!isplaced) {
                if (isBoxFree(_answersAr[i][j])) {
                  isplaced = _answersAr[i][j];
                  _s[_instanceDropNames + _answersAr[i][j]].isnofree = true;
                } else {
                  if (_s[_instanceDropNames + _answersAr[i][j]].iswrong) {
                    if (!_s[_instanceDropNames + _answersAr[i][j]].iscorrected) {
                      isplaced = _answersAr[i][j];
                      _s[_instanceDropNames + _answersAr[i][j]].iscorrected = true;
                    }
                  }
                }
              }
            }
            if (isplaced) {
              goTween(_s[_instanceDragNames + (i + 1)], _s[_instanceDropNames + isplaced].x, _s[_instanceDropNames + isplaced].y, _tweenSpeedFeedback);
            }
          } else {
            goTween(_s[_instanceDragNames + (i + 1)], _s[_instanceDragNames + (i + 1)].oldx, _s[_instanceDragNames + (i + 1)].oldy, _tweenSpeedFeedback);
          }
        }
        _s[_instanceDragNames + (i + 1)].removeAllEventListeners();
      }
    }
  }
});
