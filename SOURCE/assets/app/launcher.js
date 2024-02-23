/*
	Story-engine with Animate and Create.js
	Copyright © 2024 devjck
	Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

if(!__nofs){
	__nofs = !sameOrigin();
}

var nb_items = 100; // for loader

function sameOrigin(){
	var sameOrigin;
	try {
		sameOrigin = window.parent.location.host == window.location.host;
	}
	catch (e) {
		sameOrigin = false;
	}
	return sameOrigin;
}

var __gm = "dev";
var __scorm;

$(document).ready(function() {
	if (!__disableAjax){
		// detect scorm
		$.ajax({
			url:'adlcp_rootv1p2.xsd',
			type:'HEAD',
			error: function() {
				$.ajax({
					url:'adlcp_v1p3.xsd',
					type:'HEAD',
					error: function() {
						console.log("NO SCORM DETECTED FROM PACKAGE");
						launch();
					},
					success: function() {
						console.log("SCORM 2004 DETECTED FROM PACKAGE");
						__scorm = "2004";
						__gm = "lms";
						launch();
					}
				});
			},
			success: function() {
				console.log("SCORM 1.2 DETECTED FROM PACKAGE");
				__scorm = "1.2";
				__gm = "lms";
				launch();
			}
		});
	} else {
		__scorm = "1.2";// if __disableAjax, please specify manually SCORM version here
		__gm = "lms";
		launch();
	}
});

var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation, lib;
// without bitmap:
// function init() {
	// canvas = document.getElementById("canvas");
	// anim_container = document.getElementById("animation_container");
	// dom_overlay_container = document.getElementById("dom_overlay_container");
	// var comp=AdobeAn.getComposition("77C1C54BEA46C8439379FE5CE518CA27");
	// lib=comp.getLibrary();
	// handleComplete({},comp);
// }
// function handleComplete(evt,comp) {
	// lib=comp.getLibrary();
	// var ss=comp.getSpriteSheet();
	// exportRoot = new lib.animate();
	// stage = new lib.Stage(canvas);	
	// fnStartAnimation = function() {
		// stage.addChild(exportRoot);
		// createjs.Ticker.framerate = lib.properties.fps;
		// createjs.Ticker.addEventListener("tick", stage);
	// }	    
	// AdobeAn.compositionLoaded(lib.properties.id);
	// fnStartAnimation();
// }
// with bitmap:
function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("77C1C54BEA46C8439379FE5CE518CA27");
	lib=comp.getLibrary();
	var loader = new createjs.LoadQueue(false, null, true);
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
	lib=comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}
function handleComplete(evt,comp) {
	lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	exportRoot = new lib.animate();
	stage = new lib.Stage(canvas);
	stage.enableMouseOver();	
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stage);
	}	    
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}

var resumeAudioContext = function () {
	// handler for fixing suspended audio context in Chrome
	try {
		if (createjs.WebAudioPlugin.context && createjs.WebAudioPlugin.context.state === "suspended") {
			createjs.WebAudioPlugin.context.resume();
			window.removeEventListener("click", resumeAudioContext);
		}
	} catch (e) {
		console.error("There was an error while trying to resume the SoundJS Web Audio context...");
		console.error(e);
	}
};
window.addEventListener("click", resumeAudioContext);


function launch(){
	// LANG SELECTION ?
	if (__Langs != null){
		if (__Langs.length > 1){
			for (var i=0; i<__Langs.length; i++){
				var lg = __Langs[i];
				
				$("#select_lang").append('<div id="btlang_'+lg+'" class="lang_button"></div>');
				
				$("#btlang_"+lg).css("background-image", 'url("assets/images/langs/'+lg+'.png"');
				
				$("#btlang_"+lg).lang = lg;
				
				$("#btlang_"+lg).on("click", function(e){
					
					var l = e.currentTarget.id.substr(-2);
					__lang = l;
					
					__ExcelName = __ExcelName.substr(0,__ExcelName.length-4) + "-" + l + ".xls";
					$("#select_lang").hide();
					launchModule();
				});
			}
			$("#select_lang").fadeIn(1000);
		} else {
			launchModule();
		}
	} else {
		launchModule();
	}
}

var __imagesLoaded;

function launchModule(){
	$("#landing_page").hide();
	$("#module_classique").show();
	$("body").css("overflow", "hidden");
	$("body").css("background-color", "#202020");
	
	if (__scorm){
		document.body.onunload = pipwerks.SCORM.quit;
	}
	
	init();
	if (window.performance != undefined){
		var loading_timer;
		loading_timer = setInterval(showPercent, 50);
	} else {
		$("#logo").css("padding-top", "0px");
		document.getElementById("loader_text").innerHTML = __gtexts[__lang].loading1+"...";
	}

	function showPercent(){
		var nb_items_loaded = window.performance.getEntries().length;
		var percent = Math.round(nb_items_loaded/nb_items*100);
		document.getElementById("loader_text").innerHTML = __gtexts[__lang].loading1+" "+percent+"%";
		$("#logo").css("padding-top", (100-percent)+"px");
		if (nb_items_loaded >= nb_items){
			clearInterval(loading_timer);
			$("#logo").css("padding-top", "0px");
			document.getElementById("loader_text").innerHTML = __gtexts[__lang].loading2+"...";
			__imagesLoaded = true;
		}
	}
}
