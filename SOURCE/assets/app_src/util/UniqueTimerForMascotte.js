/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

	var _self;
	var _timer = new timing.Timer();
	var _isTimer;
	var _is_paused;
	var _is_type;
	var _chronopause;
	var _chronopause_counter;
	var _delay;
	var _fn;
	var _callback;

	return {
		init : function (fn, delay) {
			_self = this;
			_is_type = "init";
			launchChronopause();
			_is_paused = false;
			_delay = delay;
			_fn = fn;
			if (!_isTimer) {
				_timer = new timing.Timer(delay);
				_timer.onTick = fn;
				_timer.start();
				_isTimer = true;
			} else {
				// console.log("*WARNING* UniqueTimer conflict");// debug mode
			}
		},
		stop : function () {
			_timer.stop();
			_isTimer = false;
		},
		setInterval : function (val) {
			_timer.setInterval(val);
			_delay = val;
		},
		wait : function (delay, callback) {
			_self = this;
			_delay = delay;
			_is_type = "wait";
			launchChronopause();
			_is_paused = false;
			_callback = callback;
			function after_wait() {
				_timer.stop();
				_isTimer = false;
				callback();
			}
			_timer = new timing.Timer(delay);
			_timer.onTick = after_wait;
			_timer.start();
			_isTimer = true;
		},
		pause : function () {
			if (_isTimer) {
				_timer.stop();
				_chronopause.stop();
				_is_paused = true;
			}
		},
		resume : function() {
			if (_isTimer) {
				switch (_is_type) {
					case "init" : 
						_isTimer = false;
						_self.init(_fn, _delay);
						break;
					
					case "wait" :
						var new_delay = _delay - _chronopause_counter * 10;
						_self.wait (new_delay, _callback);
						break;
				}
			}
		}
	};
	
	function launchChronopause() {
		_chronopause_counter = 0;
		_chronopause = new timing.Timer(100);
		_chronopause.onTick = function(){
			_chronopause_counter++;
		};
		_chronopause.start();
	}

});
