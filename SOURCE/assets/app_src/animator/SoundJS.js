/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

SoundJS implementation
author: JCK

 */

define(['engine/Player'], function(Player) {
	
	var _is_playing = false;
	var _instance;
	
	var forceLoadedFilenames = [];
	var id;
	
	
	return {
		init : function (filename, loaded_callback, complete_callback, superpose, forceLoad) {
			
			if (superpose != true) {
				if (Player.isIe()) {
					createjs.Sound.removeAllSounds();
				} else {
					createjs.Sound.stop();
				}
				createjs.Sound.removeAllEventListeners();
			}
			
			id = (filename.substring(filename.lastIndexOf('/')+1)).split(".")[0];
			
			if (Player.isIe()) {
				createjs.Sound.on("fileload", loadHandler);
				createjs.Sound.registerSound(filename, id);
			} else {
				if (forceLoad){
					if (forceLoadedFilenames.includes(id)){
						loadHandler();
					} else {
						createjs.Sound.on("fileload", loadHandler);
						createjs.Sound.registerSound(filename, id);
					}
				} else {
					loadHandler();
				}
			}

			function loadHandler() {
				if (loaded_callback != undefined) {
					loaded_callback();
				}
				if (Player.isIe()) {
					_instance = createjs.Sound.play(id);
				} else {
					if (forceLoad){
						if (forceLoadedFilenames.includes(id)){
							_instance = createjs.Sound.play(id);
						} else {
							forceLoadedFilenames.push(id);
							_instance = createjs.Sound.play(id);
						}
					} else {
						_instance = createjs.Sound.play(id);
					}
				}
				_is_playing = true;
				
				_instance.on("complete", function(){
					_is_playing = false;
					if (complete_callback != undefined) {
						complete_callback();
					}
				});
			}
		},
		
		pause : function() {
			if (_is_playing) {
				_instance._pause();
			}
		},
		
		resume : function() {
			if (_is_playing) {
				_instance._resume();
			}
		},
		
		abort : function() {
			if (Player.isIe()) {
				createjs.Sound.removeAllSounds();
			} else {
				createjs.Sound.stop();
			}
			createjs.Sound.removeAllEventListeners();
			_is_playing = false;
		}
	}
});
