/*

READY-TO-USE TWEENS
author: JCK

USAGE --> Tween(mc, {options})
OPTIONS --> from, to, duration, distance, ease, fade, fadeout, pop, callback
EXAMPLE --> Tween.init(myMovieClip, from:'right', distance:50, duration:1000, ease:'quartIn'});

eases: http://www.createjs.com/demos/tweenjs/tween_sparktable
backIn, backInOut, backOut, bounceIn, bounceInOut, bounceOut, circIn, circInOut, circOut, cubicIn, cubicInOut, cubicOut, elasticIn, elasticInOut, elasticOut, quadIn, quadInOut, quadOut, quartIn, quartInOut, quartOut, quintIn, quintInOut, quintOut, sineIn, sineInOut, sineOut

*/

define(["util/OptionGetter", "util/UniqueTimerForTweens", "animator/StorePosition"], function(OptionGetter, UniqueTimerForTweens, StorePosition) {
	
	var _self;

	var _defaultOptions = {	from: undefined,
										to: undefined,
										duration: 350,
										duration_pop: 1500, // should not be sent in options by user
										easeFrom: 'sineOut',
										easeTo: 'sineIn',
										distance: 100,
										fade: true,
										fadeout: false,
										pop: false,
										scaleIn: false,
										scaleOut: false,
										scaleTo: false,
										noUnmask: false,
										delay: false,
										noInit:false};

	var _oldPosAr = new Array();
	
	var _tween;
	
	var _is_tween;
	var _is_delay;
	var _previous_mc

	return {
		initGroup: function  (s, namesAr, options) {
			_self = this;
			
			if (options == undefined) {
				options = {}
			}
			
			var cb = OptionGetter.get(options, "callback", undefined);
			
			options.callback = undefined;
			
			for (var i=0; i<namesAr.length; i++) {
				_self.init(s[namesAr[i]], options);
				if (i == namesAr.length-1) {
					if (cb != undefined) {
						UniqueTimerForTweens.wait(options.duration, cb);
					}
				}
			}
		},
		init: function (mc, options) {
			
			_self = this;
			
			var noInit = OptionGetter.get(options, "noInit", _defaultOptions.noInit);
			if (OptionGetter.get(options, "delay", _defaultOptions.noInit)) {
				if (noInit) {
					noInit = false;
					console.log ("*TWEEN WARNING for clip "+mc+"* - Delayed tween can not be without position init");
				}
			}
			
			// manage tween interruptions
			if (mc != undefined) {
				if (!noInit) {
					StorePosition.init(mc);
				}
			}
			if (_is_delay) {
				_is_delay = false;
				UniqueTimerForTweens.stop();
				if (_previous_mc != undefined) {
					StorePosition.init(_previous_mc);
					_previous_mc.visible = true;
					_previous_mc.alpha = 1;
				}
			}
			_previous_mc = mc;
			//
		
			if (options == undefined) {
				options = {}
			}

			if (mc == undefined) {
				return false;
			} else {
				
				createjs.Tween.removeTweens(mc);
			
				var oldPos = {	'mc': mc,
												'x': mc.x,
												'y': mc.y};
				_oldPosAr.push(oldPos);
				
				if ((options.from == undefined) && (options.to == undefined)) {
					options.from = _defaultOptions.from;
					options.to = _defaultOptions.to;
				}
				if (options.distance == null) {
					options.distance = _defaultOptions.distance;
				}
				if (options.fade == null) {
					options.fade = _defaultOptions.fade;
				}
				if (options.fadeout == null) {
					options.fadeout = _defaultOptions.fadeout;
				}
				if (options.pop == null) {
					options.pop = _defaultOptions.pop;
				}
				if (options.duration == undefined) {
					if (options.pop) {
						options.duration = _defaultOptions.duration_pop;
					} else {
						options.duration = _defaultOptions.duration;
					}
				}
				if (options.ease == undefined) {
					if ((options.from != undefined) || (options.scaleIn == true)) {
						options.ease = _defaultOptions.easeFrom;
					} else {
						options.ease = _defaultOptions.easeTo;
					}
				}
				if(options.callback == undefined) {
					options.callback = function(){return null};
				}
				if (options.noUnmask == null) {
					options.noUnmask = _defaultOptions.noUnmask;
				}
				if (options.delay == null) {
					options.delay = _defaultOptions.delay;
				}
				
				// launch tween
				if (options.delay) {
					_is_delay = true;
					UniqueTimerForTweens.wait(options.delay, function(){
						_is_delay = false;
						launchTween();
					});
				} else {
					_is_delay = false;
					launchTween();
				}
				
				function launchTween() {
					
					var pos_x = mc.x;
					var pos_y = mc.y;
				
					if (options.from != undefined) {
						switch(options.from) {
							case 'top' : mc.y = pos_y - options.distance; break;
							case 'bottom' : mc.y = pos_y + options.distance; break;
							case 'left' : mc.x = pos_x - options.distance; break;
							case 'right' : mc.x = pos_x + options.distance; break;
						}
					} else if (options.to != undefined) {
						switch(options.to) {
							case 'top' : pos_y = mc.y - options.distance; break;
							case 'bottom' : pos_y = mc.y + options.distance; break;
							case 'left' : pos_x = mc.x - options.distance; break;
							case 'right' : pos_x = mc.x + options.distance; break;
						}
					}

					if (!options.noUnmask) {
						mc.visible = true;
						mc.alpha = 1;
					}
			
					if (options.pop) {
						var original_scalex;
						var original_scaley;
						if (options.scaleTo) {
							original_scalex = original_scaley = options.scaleTo;
						} else {
							original_scalex = mc.scaleX;
							original_scaley = mc.scaleY;
						}
						mc.scaleX = 0.01;
						mc.scaleY = 0.01;
						_tween = createjs.Tween.get(mc).to({scaleX:original_scalex, scaleY:original_scaley}, options.duration, createjs.Ease.elasticOut).call(endTween);
					} else if (options.fadeout) {
						_tween = createjs.Tween.get(mc).to({alpha: 0, x: pos_x, y: pos_y}, options.duration, createjs.Ease[options.ease]).call(endTween);
					} else if (options.scaleIn) {
						mc.scaleX = 0.01;
						mc.scaleY = 0.01;
						_tween = createjs.Tween.get(mc).to({scaleX:options.scaleIn, scaleY:options.scaleIn}, options.duration, createjs.Ease[options.ease]).call(endTween);
					} else if (options.scaleOut) {
						_tween = createjs.Tween.get(mc).to({scaleX:0.01, scaleY:0.01}, options.duration, createjs.Ease[options.ease]).call(endTween);
					} else if (options.scaleTo) {
						_tween = createjs.Tween.get(mc).to({scaleX:options.scaleTo, scaleY:options.scaleTo}, options.duration, createjs.Ease[options.ease]).call(endTween);
					} else {
						if (options.fade) {
							mc.alpha = 0;
						}
						_tween = createjs.Tween.get(mc).to({alpha: 1, x: pos_x, y: pos_y}, options.duration, createjs.Ease[options.ease]).call(endTween);
					}
					_is_tween = true;
				}

				function endTween() {
					_is_tween = false;
					if (options.callback) {
						options.callback();
					}
				}
			}
		},
		
		pause : function() {
			if (_is_tween) {
				_tween.setPaused(true);
			}
		},

		resume : function() {
			if (_is_tween) {
				_tween.setPaused(false);
			}
		},

		initOldPos: function() {
			for (var i=0; i<_oldPosAr.length; i++) {
				_oldPosAr[i].mc.x = _oldPosAr[i].x;
				_oldPosAr[i].mc.y = _oldPosAr[i].y;
			}
			_oldPosAr = [];
		},
		
		abort : function() {
			createjs.Tween.removeAllTweens();
			_is_tween = false;
		},
		
		stop : function(mc) {
			createjs.Tween.removeTweens(mc);
		}

	};
});