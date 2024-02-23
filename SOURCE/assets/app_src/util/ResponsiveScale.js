/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

ResponsiveScale
=>init({dimensions:[dimx, dimy], maximized:Boolean, fs_element_id:string})

author: JCK

*/

define(function() {

	var _originallyMaximized;
	var _maximized;
	var _fullScreenElement = document.body;
	var _isFullScreen;
	var _width;
	var _height;
	var _self;
	var _toggled;

	return {
		/*
		-----------------------------------------------------------------------------------
		INITIALIZATION   -------------------------------------------------------------
		-----------------------------------------------------------------------------------
		*/
		init: function (options) {
		
			_self = this;
		
			if (options == undefined) {
				options = {}
			}
		
			if (options.dimensions == undefined)  {
				console.log ("You need to specify dimensions");
				return false;
			}
			if (options.fs_element_id == undefined) {
				_fullScreenElement = document.body;
			} else {
				_fullScreenElement = document.getElementById(fs_element_id);
			}

			_maximized = _originallyMaximized = options.maximized;

			_width = options.dimensions[0];
			_height = options.dimensions[1];

			var page_body = document.getElementsByTagName("body")[0];
			page_body.style.overflow = "hidden";
			page_body.style.position = "static";

			var viewport = document.querySelector('meta[name=viewport]');
			var viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';

			if (viewport === null) {
				var head = document.getElementsByTagName('head')[0];
				viewport = document.createElement('meta');
				viewport.setAttribute('name', 'viewport');
				head.appendChild(viewport);
			}

			viewport.setAttribute('content', viewportContent);

			$(window).on('resize',_self.onResize);

			_self.onResize();
			
			// for detetcing manuel exit full-screen cases with ESC :
			$(document).on ('mozfullscreenchange webkitfullscreenchange fullscreenchange',function(){
				if (!_toggled) {
					_isFullScreen = false;
					_maximized = _originallyMaximized;
					_self.onResize();
				}
				_toggled = false;
			});
		},
		
		onResize: function() {
		
			var page_canvas = $("#animation_container");

			stageWidth = page_canvas.width();
			stageHeight = page_canvas.height();
			console.log(stageWidth);
			var widthToHeight = stageWidth / stageHeight;
			var newWidth = window.innerWidth;
			var newHeight = window.innerHeight;

			if (!_maximized) {
				if (newWidth > _width) {
					newWidth = _width;
				}
				if (newHeight > _height) {
					newHeight = _height;
				}
			}

			var newWidthToHeight = newWidth / newHeight;
			//
			if (newWidthToHeight > widthToHeight) {
				newWidth = newHeight * widthToHeight;
				page_canvas.css("height", newHeight + "px");
				page_canvas.css("width", newWidth + "px");
			} else {
				newHeight = newWidth / widthToHeight;
				page_canvas.css("height", newHeight + "px");
				page_canvas.css("width", newWidth + "px");
			}
			stage.width = newWidth;
			stage.height = newHeight;

			page_canvas.css("margin-top", ((window.innerHeight - newHeight) / 2) + "px");
			page_canvas.css("margin-left", ((window.innerWidth - newWidth) / 2) + "px");
			console.log(((window.innerWidth - newWidth) / 2) + "px");

		},
		
		
		/*
		-----------------------------------------------------------------------------------
		TOGGLE FULLSCREEN   -------------------------------------------------
		-----------------------------------------------------------------------------------
		*/
		toggleFS: function () {
		
			_toggled = true;

			if(!_isFullScreen) {
				_isFullScreen = true;
				_maximized = true;
				launchIntoFullscreen(_fullScreenElement);
			} else {
				_isFullScreen = false;
				_maximized = _originallyMaximized;
				exitFullscreen();
			}
			
			// _self.onResize();

			function launchIntoFullscreen(element) {
				if(element.requestFullscreen) {
					element.requestFullscreen();
				} else if(element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if(element.webkitRequestFullscreen) {
					element.webkitRequestFullscreen();
				} else if(element.msRequestFullscreen) {
					element.msRequestFullscreen();
				}
			}

			function exitFullscreen() {
				if(document.exitFullscreen) {
					document.exitFullscreen();
				} else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if(document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
			}
		}
	};
});
