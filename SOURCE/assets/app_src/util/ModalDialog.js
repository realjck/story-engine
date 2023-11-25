/*

BOOTSTRAP DIALOG
author: JCK
https://nakupanda.github.io/bootstrap3-dialog/

*/

define(['util/OptionGetter', 'animator/SoundJS'], function(OptionGetter, SoundJS) {

	var _modalVerticalCenterClass = ".modal";

	return {
		alert: function (text) {
			var bdm = BootstrapDialog.alert(text);
			centerModals(bdm.getModal());
		},
		
		action: function(text, bt_label, callback, options) {
			
			var center = OptionGetter.get(options, "center", true);
			
			var bdm = BootstrapDialog.show({
				message: text,
				closable: false,
				buttons: [{
					label: bt_label,
					action: function(dialogItself) {
						dialogItself.close();
						if (callback != undefined) {
							callback();
						}
					}
				}]
			});
			
			if (center){
				centerModals(bdm.getModal());
			}
		},
		
		ask: function(text, bt_label1, bt_label2, callback1, callback2) {
			var bdm = BootstrapDialog.show({
				message: text,
				closable: false,
				buttons: [{
					label: bt_label1,
					action: function(dialogItself) {
						dialogItself.close();
						callback1();
					}
				},{
					label: bt_label2,
					action: function(dialogItself) {
						dialogItself.close();
						callback2();
					}
				}]
			});
			centerModals(bdm.getModal());
		},
		
		multi: function(title, text, buttonsAr, callbacksAr, closable, closeOnClick) {
			var buttons = [];
			for (var i=0; i<buttonsAr.length; i++) {
				var bt = new Object();
				bt.label = buttonsAr[i];
				bt.callback = callbacksAr[i];
				bt.closeOnClick = closeOnClick;
				bt.action = function(dialogItself, myBt) {
					if (myBt.data.button.closeOnClick) {
						dialogItself.close();
					}
					myBt.data.button.callback();
				}
				buttons.push(bt);
			}
			var bdm = BootstrapDialog.show({
				title: title,
				message: text,
				closable: closable,
				buttons: buttons
			});
			centerModals(bdm.getModal());	
		},
		
		form: function(title, text, champs, callback) {
		// champs : array of objects (value, name, glyphicon)
		// callback : renvoie object de valeurs
		
			shortcut.remove("u");
			shortcut.remove("n");
			shortcut.remove("l");
			shortcut.remove("o");
			shortcut.remove("c");
			shortcut.remove("k");
		
			var html = '<div class="container in-modal"><form role="form" id="modal-form" data-toggle="validator" data-focus=false>';
			
			if (text != undefined){
				html += '<div class="row">' + text + '</div>';
			}

			for (var i=0; i<champs.length; i++){
				html += '<div class="form-group"><div class="row row-m-t"><div class="col-xs-3 inputGroupContainer text-right"><label class="control-label">'+champs[i].name+' : </label></div><div class="col-xs-7"><div class="input-group">';
				if (champs[i].glyphicon != undefined){
					html += '<span class="input-group-addon"><i class="glyphicon glyphicon-'+champs[i].glyphicon+'"></i></span>';
				}
				html += '<input id="modal-form-'+champs[i].value+'" placeholder="'+champs[i].name+'" class="form-control" type="text" required></div></div></form></div>';
			}
			
			html += '</div>';
			
		
			var bdm = BootstrapDialog.show({
				title: title,
				message: html,
				closable: true,
				size: BootstrapDialog.SIZE_NORMAL,
				buttons: [{
					label: "Valider",
					action: function(dialogItself) {

						var result = {};
					
						var all_set = true;
						for (var i=0; i<champs.length; i++){
							document.getElementById('modal-form-'+champs[i].value).value = document.getElementById('modal-form-'+champs[i].value).value.trim();
							if (document.getElementById('modal-form-'+champs[i].value).value == ""){
								all_set = false;
							}
							result[champs[i].value] = document.getElementById('modal-form-'+champs[i].value).value;
						}
						if (!all_set){
							$("#modal-form").validator('validate');
						} else {
							dialogItself.close();
							callback(result);
						}
					}
				}]
			});
			centerModals(bdm.getModal());
		},
		
		html: function(title, html, options) {
		
			var size;
			if (OptionGetter.get(options, "wide", false)) {
				size = BootstrapDialog.SIZE_WIDE;
			} else {
				size = BootstrapDialog.SIZE_NORMAL;
			}
		
			var bdm = BootstrapDialog.show({
				title: title,
				message: html,
				closable: true,
				size: size
			});
			centerModals(bdm.getModal());
		},
		
		video: function(url, title, options) { // NEEDS VIDEO.JS
		
			SoundJS.pause();
		
			//options
			options.closable = OptionGetter.get(options, "closable", true);
		
			var size = BootstrapDialog.SIZE_WIDE;
			var html =   '<video id="modal_video" class="video-js vjs-default-skin" controls preload="none" width="1280" height="720" data-setup="{}" autoplay style="width:100%; height:100%"><source src="'+url+'" type="video/mp4"><p class="vjs-no-js">Votre navigateur ne supporte pas les vidéos H.264</p></video>';
			var bdm = BootstrapDialog.show({
				title: title,
				message: html,
				closable: options.closable,
				size: size,
				onshown: function() {
					document.getElementById('modal_video').addEventListener('ended',myHandler,false);
					function myHandler(e) {
						bdm.close();
					}
				},
				onhidden: function() {
					
					SoundJS.resume();
					
					if (options.callback != undefined) {
						options.callback();
					}
				}
			});
			centerModals(bdm.getModal());
		}
		
	};

	function centerModals($element) {
		var $modals;
		if ($element.length) {
			$modals = $element;
		} else {
			$modals = $(_modalVerticalCenterClass + ':visible');
		}
		$modals.each( function(i) {
			var $clone = $(this).clone().css('display', 'block').appendTo('body');
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
			top = top > 0 ? top : 0;
			$clone.remove();
			$(this).find('.modal-content').css("margin-top", top);
		});
	}
});