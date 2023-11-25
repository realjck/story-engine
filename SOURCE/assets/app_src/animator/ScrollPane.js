/*

ScrollPane
author: JCK

Adds a Scrolling Panel on Stage

------------
USAGE :
	- Add clip bounds on stage (bounds_mcname) don't forget to put x,y pivot at top left
	- Add clip content in library (content_mcname) with liaison name
	
CODE EXEMPLE :

				var content_mc = ScrollPane.init(s[_screen], "scroll_content", "scroll_bounds",
					{
						orientation:"vertical",
						scroll_bar_size:20,
						constructor:function(content){
							var some_content = new lib["clip"]();
							content.addChild(some_content);
							content.setBounds(100,2000); // !IMPORTANT
						}
				});
				
OPTIONS :
	- orientation (string) : "horizontal", "vertical", false by default (both directions, according to size of content)
	- scroll_bar_size (integer): width of scroll bars (30 by default)
	- constructor (function) : allow to build dynamic content before getting size of it // !IMPORTANT : You need to specify manually the setBounds of content !!!
	
RETURNS :
	MovieClip of content

*/

define(['util/OptionGetter'], function(OptionGetter) {

	var _scrolls=[];
	
	return {
		init: function (stage, content_mcname, bounds_mcname, options) {
			
			var scroll_bar_size = OptionGetter.get(options, "scroll_bar_size", 20);
			var orientation = OptionGetter.get(options, "orientation", false);
			var constructor = OptionGetter.get(options, "constructor", false);

			stage[bounds_mcname].visible = false;
			

			
			var content = new lib[content_mcname]();
			content.name = "content";
			
			if (constructor){
				constructor(content);
			}
			

			
			
			var smaller_w = false;
			var smaller_h = false;
			
			if (content.getBounds().width < stage[bounds_mcname].nominalBounds.width){
				smaller_w = true;
			}
			if (content.getBounds().height < stage[bounds_mcname].nominalBounds.height){
				smaller_h = true;
			}
			
			var no_pane = false;
			
			switch(orientation){
				
				case "horizontal":
					if (smaller_w) no_pane = true;
					break;
				
				case "vertical":
					if (smaller_h) no_pane = true;
					break;
				
				default:
					if (smaller_h && smaller_w) {
						no_pane = true;
					} else if (smaller_h){
						orientation = "horizontal";
					} else if (smaller_w){
						orientation = "vertical";
					}
					break;
			}
			
			if (no_pane) orientation = "none";
			
			var scroll = new createjs.ScrollContainer(canvas, {scroll_bar_size:scroll_bar_size, orientation:orientation, mc_ref:stage});
			_scrolls.push(scroll);
			scroll.setBounds(0, 0, stage[bounds_mcname].nominalBounds.width, stage[bounds_mcname].nominalBounds.height);
			
			scroll.contentSize = {
			  width: content.getBounds().width,
			  height: content.getBounds().height
			};
	
			scroll.x = stage[bounds_mcname].x;
			scroll.y = stage[bounds_mcname].y;
			stage.addChild(scroll);
			scroll.addChild(content);


			return scroll;
		},
		
		isMoving:function(){
			var is_moving = false;
			for (var i=0; i<_scrolls.length ;i++){
				if (_scrolls[i].is_moving){
					is_moving = true;
				}
			}
			return is_moving;
		},
		
		destroyAll:function(){
			for (var i=0; i<_scrolls.length ;i++){
				_scrolls[i].removeAllChildren();
			}
			_scrolls = [];
		}
	};
});