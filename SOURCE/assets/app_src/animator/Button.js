/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Button
author: JCK

Simplify enabling/disabling Animate buttons or movieclips
*/

define(['util/OptionGetter', 'animator/Tween'], function(OptionGetter, Tween) {
	
	var _self;
	
	return {
		enable: function (bt, fnClick, fnOver, fnOut, options) {
			
			_self = this;
			_self.disable(bt);
			
			if (bt.out){
				bt.triggered = false;
			}
			
			// options:
			var forceVisible = OptionGetter.get(options, "forceVisible", true);
			var noTrigger = OptionGetter.get(options, "noTrigger", false);

			// click
			if (fnClick != undefined) {
				bt.clickHandler = function(e) {
					if (!bt.triggered || noTrigger){
						bt.triggered = true;
						fnClick(e);
					}
				}
				bt.on("mousedown", bt.clickHandler);
			}
			
			// over
			bt.overHandler = function(e) {
				bt.out = false;
				bt.triggered = false;
				if (fnOver != undefined) {
					fnOver(e);
				}
			}
			bt.on("rollover", bt.overHandler);
			
			// out
			bt.outHandler = function(e) {
				bt.out = true;
				if (fnOut != undefined) {
					fnOut(e);
				}
			}
			bt.on("rollout", bt.outHandler);
			
			
			bt.mouseEnabled = true;
			bt.cursor = "pointer";
			
			if (forceVisible) {
				bt.visible = true;
				bt.alpha = 1;
			}
		},
		
		enableZoom: function (bt, fnClick, fnOver, fnOut, options) {	
			
			_self = this;
			_self.disable(bt);
			
			// options:
			var forceVisible = OptionGetter.get(options, "forceVisible", true);
			var noDisable = OptionGetter.get(options, "noDisable", false);

			if (fnClick != undefined) {
				bt.clickHandler = function(e) {
					if (!noDisable) {
						e.currentTarget.scaleX = 1;
						e.currentTarget.scaleY = 1;
						_self.disable(e.currentTarget);
					}
					fnClick(e);
				}
				bt.on("click", bt.clickHandler);
			}
			
			bt.overHandler = function(e) {
				Tween.init(e.currentTarget, {scaleTo:1.2, duration:250, ease:"backOut"});
				if (fnOver != undefined) {
					fnOver(e);
				}
			}
			bt.on("mouseover", bt.overHandler);
				

			bt.outHandler = function(e) {
				Tween.init(e.currentTarget, {scaleTo:1, duration:100});
				if (fnOut != undefined) {
					fnOut(e);
				}
			}
			bt.on("mouseout", bt.outHandler);

			bt.mouseEnabled = true;
			bt.cursor = "pointer";
			
			if (forceVisible) {
				bt.visible = true;
				bt.alpha = 1;
			}
		},
		
		disable: function (bt, force_rescale) { // todo force rescale à mettre dans des options
			bt.out = false;
			bt.triggered = false;
			bt.removeAllEventListeners("click");
			bt.removeAllEventListeners("mousedown");
			bt.removeAllEventListeners("mouseover");
			bt.removeAllEventListeners("mouseout");
			bt.mouseEnabled = false;
			bt.cursor = "initial";
			if (force_rescale != undefined){
				if (force_rescale) {
					createjs.Tween.removeTweens(bt);
					bt.scaleX = 1;
					bt.scaleY = 1;
				}
			}
		}
	};
});
