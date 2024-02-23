/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Wait Next Tick
wait for all elements to be on stage

author: JCK

 */

define(function () {

	return {
		init : function (callback) {
			var nextTick = function(){
				createjs.Ticker.removeEventListener("tick", nextTick);
				callback();
			}
			createjs.Ticker.addEventListener("tick", nextTick);
		}
	};
});
