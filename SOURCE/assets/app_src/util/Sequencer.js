/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Sequencer
author: JCK

Execute a sequence of functions in an array with callbacks:

Sequencer.launch([
	function(next) {
		... callback:next
	},
	function(next) {
		... callback:next
	},
	function(next) {
		...
	}
], { delay: 1500 });

nouveau gestion des cuepoints : {cuepoints:[2500,3500,10000]} dans les options

 */

define(['util/OptionGetter', 'util/UniqueTimer'], function(OptionGetter, UniqueTimer) {
	
	var _is_aborted;
	var _seqAr;
	
	return {
		launch: function (seqAr, options) {
			_seqAr = seqAr;
			_is_aborted = false;
		
			var delay = OptionGetter.get(options, "delay", false);
			
			var cuepoints = OptionGetter.get(options, "cuepoints", false);
			var cuepoints_time = 0;
		
			var counter = -1;
			var next = function() {
				counter++;
				if (cuepoints) {
					if (_seqAr[counter] != undefined) {
						var inter_time;
						if (counter == 0){
							inter_time = cuepoints[0];
						} else {
							inter_time = cuepoints[counter] - cuepoints[counter-1];
						}
						if (!_is_aborted){
							UniqueTimer.wait(inter_time, function(){
								if (_seqAr[counter] != undefined){
									_seqAr[counter](next);
									next();
								}
							});
						}
					}
				} else {
					if (!_is_aborted){
						if (_seqAr[counter] != undefined){
							_seqAr[counter](next);
						}
					}
				}
			}
			if (!_is_aborted){
				if (delay) {
					UniqueTimer.wait(delay, next);
				} else {
					next();
				}
			}
		},
		
		abort: function(){
			_seqAr = [];
			_is_aborted = true;	
		}
	};
});
