/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

ResponsiveStage
author: JCK
manages responsive stage for Animate

ex: ResponsiveStage.storeClip("mc_name", {horizontal: "left, right center or fixed", vertical: "bottom, top, fixed", maximize: "width, height, none or full", background: true or false, ratio: 1920/1080(exemple), restore: true, false});
where "fixed" means the way it is positionned in Animate.
with background, don't forget to specify also 'ratio' (1 by default)

NB:
> TAKE CARE TO PLACE THE MOVIECLIP'S PIVOT TO THE APPROPRIATE CORNER/SIDE IN ANIMATE WHEN ALIGN LEFT, RIGHT, TOP OR BOTTOM
> When maximized width, movieclip PIVOT have to be set to LEFT side of the object in Animate
> When maximized height, movieclip PIVOT have to be set to TOP side of the object in Animate

*/

define(["animator/StorePosition", "util/OptionGetter"], function(StorePosition, OptionGetter) {

  var _fullScreenElement;
  var _initialWidth;
  var _initialHeight;
  var _width;
  var _height;
  var _self;
  var _pageCanvas;
  var _pageAnimationContainer;
  var _pageOverlayContainer;
  
  var _stage;
  var _storedClips;

  return {
    init: function (stage) {
    
      _self = this;
      _storedClips = new Object();
      _stage = stage;

      _fullScreenElement = document.body;

      _initialWidth = lib.properties.width;
      _initialHeight = lib.properties.height;
      _pageCanvas = document.getElementsByTagName("canvas")[0];
      _pageAnimationContainer = document.getElementById("animation_container");
      _pageOverlayContainer = document.getElementById("dom_overlay_container");
      
      
      // DISABLE MOUSE WHEEL AND CTRL+/- (jQuery)
      $(document).ready(function () {
        $(document).keydown(function (event) {
          if (event.ctrlKey == true && (event.which == '107' || event.which == '109' || event.which == '187' || event.which == '189')) {
            event.preventDefault();
          }
        });
        $(window).bind('mousewheel DOMMouseScroll', function (event) {
          if (event.ctrlKey == true) {
            event.preventDefault();
          }
        });
      })


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

      window.onresize = function () {
        _self.adjust();
        _self.placeAllClips();
      }

      _self.adjust();
    },
    
    adjust: function() {

      var widthToHeight = _initialWidth / _initialHeight;
      var newWidth = getViewSize().width;
      var newHeight = getViewSize().height;

      var newWidthToHeight = newWidth / newHeight;
      //
      if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
      } else {
        newHeight = newWidth / widthToHeight;
      }
      
      // css divs to 100% fill:
      _pageCanvas.style.width = getViewSize().width + "px";
      _pageCanvas.style.height = getViewSize().height + "px";
      _pageAnimationContainer.style.width = getViewSize().width + "px";
      _pageAnimationContainer.style.height = getViewSize().height + "px";
      _pageOverlayContainer.style.width = getViewSize().width + "px";
      _pageOverlayContainer.style.height = getViewSize().height + "px";

      // change canvas virtual size
      lib.properties.width = getViewSize().width / newWidth * _initialWidth;
      lib.properties.height = getViewSize().height / newHeight * _initialHeight;
      _pageCanvas.width = getViewSize().width / newWidth * _initialWidth;
      _pageCanvas.height = getViewSize().height / newHeight * _initialHeight;
    },
    
    storeClip: function(mc_name, options) {

      StorePosition.init(_stage[mc_name]);
      
      if (options == undefined) {
        options = new Object();
      }

      options.horizontal = OptionGetter.get(options, "horizontal", "fixed");
      options.vertical = OptionGetter.get(options, "vertical", "fixed");
      options.maximize = OptionGetter.get(options, "maximize", "none");
      options.background = OptionGetter.get(options, "background", false);
      options.ratio = OptionGetter.get(options, "ratio", 1);
      options.restore = OptionGetter.get(options, "restore", false);
      if (options.background == true) {
        options.horizontal = "left";
        options.vertical = "top";
      }
      
      if (_storedClips[mc_name] == undefined) {
        _storedClips[mc_name] = options;
      }

      placeClip(mc_name);
    },
    
    placeAllClips: function() {
      for (var key in _storedClips) {
        if (_stage[key].restore) {
          StorePosition.record(_stage[key]);
        }
        placeClip(key);
      }
    }
  };
  
  function placeClip(mc_name) {
    var mc = _stage[mc_name];
    var scale;
    
    if (_storedClips[mc_name].maximize == "full") {
        if ((getViewSize().width / getViewSize().height) >= (mc.nominalBounds.width/mc.nominalBounds.height)) {
          mc.y = 0;
          scale = lib.properties.height / mc.nominalBounds.height;
          mc.scaleX = scale;
          mc.scaleY = scale;
          mc.x = (lib.properties.width - mc.nominalBounds.width*scale) / 2;
        } else {
          mc.x = 0;
          scale = lib.properties.width / mc.nominalBounds.width;
          mc.scaleX = scale;
          mc.scaleY = scale;
          mc.y = (lib.properties.height - mc.nominalBounds.height*scale) / 2;
        }
    } else {

      if (_storedClips[mc_name].background == true) {
        if ((getViewSize().width / getViewSize().height) >= _storedClips[mc_name].ratio) {
          _storedClips[mc_name].maximize = "width";
        } else {
          _storedClips[mc_name].maximize = "height";
        }
      }
      
      if (_storedClips[mc_name].maximize != "width") {
        switch (_storedClips[mc_name].horizontal) {
          case "left":    mc.x = 0;
                      break;
          case "right": mc.x = lib.properties.width;
                      break;
          case "fixed": mc.x = (lib.properties.width - _initialWidth) / 2 + StorePosition.get(mc).x;
                      break;
          case "center":  break;
          default:      console.log("**ERROR in ResponsiveStage : '" + _storedClips[mc_name].horizontal + "' for clip '" + mc_name + "' is not a recognized position value**");
                      break;
        }
      }
      
      if (_storedClips[mc_name].maximize != "height") {
        switch (_storedClips[mc_name].vertical) {
          case "top":   mc.y = 0;
                      break;
          case "bottom":mc.y = lib.properties.height;
                      break;
          case "fixed": mc.y = (lib.properties.height - _initialHeight) / 2 + StorePosition.get(mc).y;
                      break;
          case "center":  break;
          default:      console.log("**ERROR in ResponsiveStage : '" + _storedClips[mc_name].vertical + "' for clip '" + mc_name + "' is not a recognized position value**");
                      break;
        }
      }
      
      switch (_storedClips[mc_name].maximize) {
        case "none":    break;
        case "width":   mc.x = 0;
                      scale = lib.properties.width / mc.nominalBounds.width;
                      mc.scaleX = scale;
                      mc.scaleY = scale;
                      if (_storedClips[mc_name].vertical == "fixed") {
                        console.log("**ERROR in ResponsiveStage for clip '" + mc_name + "': vertical align top or bottom must be specified when maximized width**");
                      } else if (_storedClips[mc_name].vertical == "middle") {
                        mc.y = (lib.properties.height - mc.nominalBounds.height*scale) / 2;
                      }
                      break;
        case "height":  mc.y = 0
                      mc.scaleY = lib.properties.height / mc.nominalBounds.height;
                      mc.scaleX = lib.properties.height / mc.nominalBounds.height;
                      if (_storedClips[mc_name].horizontal == "fixed") {
                        console.log("**ERROR in ResponsiveStage for clip '" + mc_name + "': horizontal align left or right must be specified when maximized height**");
                      }
                      break;
        default:        console.log("**ERROR in ResponsiveStage : '" + _storedClips[mc_name].maximize + "' for clip '" + mc_name + "' is not a recognized maximize value**");
                      break;
      }
      
      // "center" (after scales update)
      if (_storedClips[mc_name].horizontal == "center") {
        mc.x = (lib.properties.width - mc.nominalBounds.width*mc.scaleX) / 2;
      }
      
      
      // html overlay
      if (_storedClips[mc_name].html_overlay_id != undefined) {

        var element = "#"+_storedClips[mc_name].html_overlay_id;
        var ref_mc = mc[_storedClips[mc_name].html_overlay_ref_mc];

        $(element).css('left', getViewSize().width/lib.properties.width*(mc.x+ref_mc.x)+'px');
        $(element).css('top', getViewSize().height/lib.properties.height*(mc.y+ref_mc.y)+'px');
        
        var w = getViewSize().width/lib.properties.width*ref_mc.nominalBounds.width+'px';
        var h = getViewSize().height/lib.properties.height*ref_mc.nominalBounds.height+'px';
        
        $(element).css('width', w);
        $("video").attr('width', w);
        $(".mejs__container, .mejs__overlay").css('width', w);
        
        $(element).css('height', h);
        $("video").attr('height', h);
        $(".mejs__container, .mejs__overlay").css('height', h);
        
        
      }
    }
  }
  
  function getViewSize() {
    var object = {};
    
    object.width = $(window).width();
    object.height = $(window).height();

    return object;
  }
});
