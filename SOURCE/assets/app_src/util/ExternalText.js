/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

External Text
Load and provide external texts from json

author: JCK

*/

define(["dojo/request/xhr", "dojo/store/Memory"], function(xhr, Memory) {

	var _subtitlesStore;
	var _textsStore;

	return {
		loadSubtitles: function (json_url, callback) {
			loadJson(json_url, "_subtitlesStore", callback);
		},
		
		getSubtitle: function(id) {
			return _subtitlesStore.get(id).text;
		},
		
		loadTexts: function (json_url, callback) {
			loadJson(json_url, "_textsStore", callback);
		},
		
		getText: function(screen, name) {
			var texts = _textsStore.query(function (item) {
				return ((item.screen == screen) && (item.name == name));
			});
			if (texts[0] != undefined) {
				return texts[0].text;
			} else {
				console.log("*WARNING ERROR* External text '"+name+"' @t screen '"+screen+"' not found, returning empty string.");
				return "";
			}
		},
		
		getNumberOfSubtitles: function() {
			return _subtitlesStore.data.length;
		},
		
		getSubtitleId:function(val){
			return _subtitlesStore.data[val].id;
		},
		
		applyTexts: function(screen) {
			var texts = _textsStore.query(function (item) {
				return item.screen == screen;
			});
			texts.forEach(function(text){
				if (text.name.substr(0,3)=="mc_") {
					if (s[text.name] != undefined) {
						s[text.name].champ.text = text.text;
					} else {
						console.log("*ERROR* in ExternalText.Apply : movieclip '"+text.name+"' is not on stage.");
					}
				}
			});
		}
	};
	
	function loadJson(json_url, store_variable, callback) {
	
		xhr(json_url, {
			handleAs: "json"
		}).then(function(loaded_data) {

			// -----> create store
			eval(store_variable +"=new Memory({data: loaded_data});");
			callback();

		}, function(err) {
			console.log("**ERROR** "+ err +"|||FILE:"+json_url);
		});
	}
});
