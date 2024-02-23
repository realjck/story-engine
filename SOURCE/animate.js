// story-engine with Animate and Create.js
// Copyright © 2024 devjck
// Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.

(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
var rect; // used to reference frame bounds
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.fleche_ombre = function() {
	this.initialize(img.fleche_ombre);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,101);


(lib.logo = function() {
	this.initialize(img.logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1500,350);


(lib.prologue_bg = function() {
	this.initialize(img.prologue_bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.prologue_bg_zoom = function() {
	this.initialize(img.prologue_bg_zoom);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.prologue_foule = function() {
	this.initialize(img.prologue_foule);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,554);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.VIDEO_video = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.004)").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,479.9982,1,0.8889);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.VIDEO_video, rect = new cjs.Rectangle(0,0,1920,960), [rect]);


(lib.QUIZFINAL_feedback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("lorem ipsum\nlorem ipsum\nlorem ipsum\nlorem ipsum", "35px 'Raleway'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 41;
	this.champ.lineWidth = 1166;
	this.champ.parent = this;
	this.champ.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_feedback, rect = new cjs.Rectangle(0,0,1170,186.8), [rect]);


(lib.QUIZ_image = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(98,172,52,0)").s().p("Az1RFMAAAgiJMAnqAAAMAAAAiJg");
	this.shape.setTransform(54.2215,50.0106,0.4269,0.4574);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZ_image, rect = new cjs.Rectangle(0,0,108.4,100), [rect]);


(lib.prologue_personnages = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = null;
p.frameBounds = [rect];


(lib.prologue_logoediversite_blanc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFEF36","#FFE01F","#FFD400","#FDCC00","#FDC900","#E23D3C"],[0,0.059,0.133,0.208,0.286,0.855],13,-30.5,-23.7,35.7).s().p("AkHFPQgRgbAHguQAgkGggkFQgHguARgbQARgbAhAGIF7BNQAiAHAcAbQAdAcAFAgQAcC4gcC5QgFAggdAcQgcAbgiAHIl7BNIgMABQgYAAgOgWg");
	this.shape.setTransform(107.3896,99.4026,1.6693,1.6693);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#00A78B","#00969F","#006BB1","#009A3E"],[0,0.337,1,1],11,-30.9,-20.7,37).s().p("AkHFPQgRgbAHgvQAfkFgfkFQgHguARgbQARgbAhAHIF7BLQAiAIAcAbQAdAbAFAhQAcC4gcC5QgFAhgdAbQgcAcgiAGIl7BNIgMABQgYAAgOgWg");
	this.shape_1.setTransform(78.8438,59.5455,1.6693,1.6693);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#BA85B5","#B57EB0","#A86CA5","#945095","#792F83","#792F83"],[0.341,0.443,0.596,0.784,0.996,1],11,-30.9,-20.7,37).s().p("AkHFPQgRgbAHguQAgkGggkFQgHguARgbQARgbAhAGIF7BNQAiAHAcAbQAdAcAFAgQAdC4gdC5QgFAggdAcQgcAbgiAHIl7BNIgMABQgZAAgNgWg");
	this.shape_2.setTransform(46.1002,85.8809,1.6693,1.6693);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhPBjQgnglAAg2QAAg4AigrQAjgsA0AAQAnAAAgAYQAgAYANAmIiiBlQAaAXAdgBQAQAAAVgJQAUgIAMgMIAUA6QgRAOgaAJQgaAJgWAAIgDABQgxAAglglgAgpg3QgWAYABAaIAAAIIBqhAQgSgPgUAAQgaAAgVAVg");
	this.shape_3.setTransform(200.3963,75.4056,1.6693,1.6693);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgdA9QgNgPgBgXQAAgXANgQQANgQAUAAQAVAAALARQAJAOAAARIgBAIIhFAAQABASAKAKQAJAIAOAAQAPAAAMgFIADAOQgRAGgQAAQgWAAgMgOgAgSgIQgFAIgCALIAzAAQAAgLgFgHQgGgLgOAAQgLAAgIAKgAgGgsIAQgeIAUAAIgYAeg");
	this.shape_4.setTransform(596.4894,128.6145,1.6693,1.6693);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgGA5QgHgIAAgTIAAg3IgPAAIAAgPIAPAAIAAgTIARgFIAAAYIAZAAIAAAPIgZAAIAAA2QAAAVANAAQAGAAAFgCIAAAPQgIACgHAAQgNAAgGgIg");
	this.shape_5.setTransform(582.3417,130.2839,1.6693,1.6693);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgIBIIAAhnIARAAIAABngAgHgzQgDgEAAgFQAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgEAAgDgDg");
	this.shape_6.setTransform(572.8682,128.7397,1.6693,1.6693);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgfAvIAEgPQAMAIAMAAQASAAAAgQQAAgLgRgIQgbgIAAgTQABgNAIgJQAKgJAOAAQAOAAALAGIgFAOQgJgGgLAAQgGAAgFAEQgEAEAAAGQAAAGAFAEQAEADAIAFQAaAJAAAUQAAAOgKAJQgKAJgQAAQgPAAgMgHg");
	this.shape_7.setTransform(562.1844,132.1619,1.6693,1.6693);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgXA1IgBhnIAQAAIABAVIAAAAQAEgKAGgHQAIgGAJAAIAFABIAAARIgGAAQgJAAgHAHQgFAGgCALIgBA/g");
	this.shape_8.setTransform(550.7911,131.9532,1.6693,1.6693);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgdAoQgOgPAAgXQAAgYANgPQANgQAUAAQAWAAAKARQAJANAAATIgBAHIhEAAQAAASAKAKQAJAIAOAAQAQAAALgFIADAOQgQAGgRAAQgVAAgNgOgAgSgdQgFAIgCAMIAzAAQAAgLgEgJQgHgLgOABQgLAAgIAKg");
	this.shape_9.setTransform(535.8088,132.1619,1.6693,1.6693);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgIA0IgmhnIAUAAIATA5QAFAOACANIAAAAIAchUIATAAIgnBng");
	this.shape_10.setTransform(519.491,132.1202,1.6693,1.6693);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgIBIIAAhnIARAAIAABngAgHgzQgDgEAAgFQAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgEAAgDgDg");
	this.shape_11.setTransform(507.2631,128.7397,1.6693,1.6693);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag3BHIAAiMQAVgDARAAQAjAAATASQATASAAAhQAAAjgUAUQgTAVgoAAQgOAAgSgCgAglg4IAABxIASABQAbAAAPgQQAPgQAAgcQAAgagOgOQgPgQgaAAQgLAAgJACg");
	this.shape_12.setTransform(492.6563,128.7815,1.6693,1.6693);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AglBCIAFgOQAMAJARAAQAfAAAAglIAAgLIgBAAQgJARgVAAQgTAAgLgOQgMgOAAgVQAAgZAOgQQAMgOASAAQAVAAAJARIABAAIAAgPIAQAAIAABYQAAAggPAPQgNAMgWAAQgUAAgNgJgAgTgxQgIALAAARQAAARAHAJQAJALAMAAQAJAAAGgFQAIgGACgIQACgEAAgGIAAgSIgCgJQgGgTgSgBQgNAAgIALg");
	this.shape_13.setTransform(463.4428,135.6675,1.6693,1.6693);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAYA1IAAg7QABgegXAAQgIAAgHAFQgGAGgDAIIgBAJIAAA9IgSAAIAAhnIAQAAIABARIAAAAQAKgTAWAAQANAAAJAJQAMAMAAAXIAAA9g");
	this.shape_14.setTransform(444.9966,131.9532,1.6693,1.6693);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgIBIIAAhnIARAAIAABngAgKg8QAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgKAAAAgMg");
	this.shape_15.setTransform(431.5584,128.7397,1.6693,1.6693);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAYA1IAAg7QAAgegWAAQgIAAgHAFQgGAGgCAIQgCAEAAAFIAAA9IgSAAIAAhnIAPAAIABARIABAAQAKgTAVAAQAOAAAJAJQAMALAAAYIAAA9g");
	this.shape_16.setTransform(418.1619,131.9532,1.6693,1.6693);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgXA1IgBhnIAQAAIABAVIAAAAQAEgKAGgHQAIgGAJAAIAFABIAAARIgHAAQgJAAgGAHQgGAGgCALIAAA/g");
	this.shape_17.setTransform(403.9725,131.9532,1.6693,1.6693);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgeAsQgIgIAAgMQAAgTAPgIQAQgLAbABIAAgCQAAgYgVAAQgQAAgKAIIgEgNQAOgJASAAQAlAAAAAqIAAAlQAAAPABAKIgQAAIgBgMIgBAAQgKAPgTAAQgOAAgIgKgAgUAWQAAASARAAQARAAAGgSIABgGIAAgQIgEAAQglAAAAAWg");
	this.shape_18.setTransform(388.7815,132.1619,1.6693,1.6693);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgdAoQgNgPAAgXQAAgYAMgPQANgQAUAAQAWAAAKARQAIANAAATIAAAHIhEAAQAAASAKAKQAJAIANAAQARAAALgFIADAOQgQAGgRAAQgVAAgNgOgAgSgdQgGAIgBAMIAzAAQAAgLgFgJQgGgLgOABQgLAAgIAKg");
	this.shape_19.setTransform(372.5889,132.1619,1.6693,1.6693);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AglBIIAAiPIASAAIAAB/IA5AAIAAAQg");
	this.shape_20.setTransform(357.3979,128.7397,1.6693,1.6693);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgYAHIAAgNIAxAAIAAANg");
	this.shape_21.setTransform(343.2502,131.1186,1.6693,1.6693);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgeAoQgNgPABgXQAAgYAMgPQANgQAUAAQAVAAAMARQAHAOABASIgBAHIhEAAQAAASAKAKQAJAIAOAAQAQAAALgFIADAOQgQAGgRAAQgWAAgNgOgAgRgdQgHAIgBAMIA0AAQgBgLgFgJQgGgLgNABQgMAAgHAKg");
	this.shape_22.setTransform(328.56,132.1619,1.6693,1.6693);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgfAvIAEgPQAMAIAMAAQASAAAAgQQAAgLgRgIQgagIAAgTQAAgNAJgJQAJgJAPAAQAOAAAKAGIgFAOQgJgGgLAAQgGAAgFAEQgEAEAAAGQAAAGAEAEQAEADAJAFQAaAJAAAUQAAAOgJAJQgKAJgQAAQgRAAgLgHg");
	this.shape_23.setTransform(306.0656,132.1619,1.6693,1.6693);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAZA1IAAg7QAAgegXAAQgIAAgGAFQgHAGgCAIQgCAEAAAFIAAA9IgRAAIgBhnIAQAAIABARIAAAAQAEgIAIgFQAJgGALAAQANAAAJAJQAMALAAAYIAAA9g");
	this.shape_24.setTransform(289.873,131.9532,1.6693,1.6693);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgYQAAgZAOgPQANgOAVAAQAVAAANAOQANAPAAAYQAAAZgQAQQgOANgSAAQgVAAgMgOgAgWgbQgHAMAAAPQAAARAIAMQAJALAMAAQANAAAJgLQAIgMAAgRQAAgPgHgLQgIgNgOAAQgOAAgJAMg");
	this.shape_25.setTransform(271.1346,132.1619,1.6693,1.6693);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgHBIIAAhnIAQAAIAABngAgHgzQgDgEAAgFQAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgEAAgDgDg");
	this.shape_26.setTransform(257.7799,128.7397,1.6693,1.6693);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgGA5QgHgIAAgTIAAg3IgPAAIAAgPIAPAAIAAgTIARgFIAAAYIAZAAIAAAPIgZAAIAAA2QAAAVANAAQAHAAADgCIABAPQgIACgIAAQgMAAgGgIg");
	this.shape_27.setTransform(248.056,130.2839,1.6693,1.6693);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgeAsQgLgMAAgZIAAg7IASAAIAAA4QAAAhAWABQAPAAAIgSQABgEAAgFIAAg/IASAAIABBmIgQAAIgBgRIgBAAQgKAUgVAAQgOAAgJgJg");
	this.shape_28.setTransform(233.2406,132.3288,1.6693,1.6693);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgIBMIAAiXIARAAIAACXg");
	this.shape_29.setTransform(219.8024,128.1137,1.6693,1.6693);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AghAoQgOgQAAgXQAAgZAOgPQAOgOAUAAQAVAAANAOQANAPAAAYQAAAZgPAQQgOANgTAAQgUAAgNgOgAgWgbQgHAMAAAPQAAARAIAMQAJALAMAAQANAAAIgLQAJgMAAgRQAAgPgHgLQgIgNgPAAQgNAAgJAMg");
	this.shape_30.setTransform(206.4893,132.1619,1.6693,1.6693);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgoBBIAEgQQAQAKAQAAQAMAAAIgHQAHgHAAgLQABgKgHgGQgGgHgNgFQgjgNgBgbQABgRAMgLQAMgMATAAQASABAMAGIgFAQQgJgHgRAAQgMAAgGAHQgHAGAAAJQABAJAGAGQAGAGANAHQATAHAIAIQAIAKAAAPQABATgMALQgOAMgVAAQgVAAgOgJg");
	this.shape_31.setTransform(188.5022,128.7397,1.6693,1.6693);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#12A298").s().p("Ag7AMIB3giIAAAlIhwAJg");
	this.shape_32.setTransform(585.0127,49.1956,1.6693,1.6693);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgsB+QgQAAgNgHQgQgKAAgPIAAi8QAAgPAQgJQANgHAQAAICGAAIAAAsIhcAAQgMAAAAAJIAAAzIBoAAIAAArIhoAAIAAAyQAAAKAMAAIBcAAIAAAsg");
	this.shape_33.setTransform(582.6756,76.8649,1.6693,1.6693);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAECeQgPAAgNgIQgQgIAAgQIAAimQAAgKgNAAIgZAAIAAgsIAHAAIBpg/IAAA/IAtAAIAAAsIghAAQgMAAAAAKIAACQQAAAJAMAAIAhAAIAAAtg");
	this.shape_34.setTransform(545.1988,71.6065,1.6693,1.6693);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AglB+IAAisIBLAAIAACsgAglhKIAAgzIBLAAIAAAzg");
	this.shape_35.setTransform(517.9886,76.8649,1.6693,1.6693);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AhaB+IAAgsIBYAAQALAAAAgPQAAgHgJgIIg+gsQgcgWAAgkQAAgeAQgWQASgXAbAAIB3AAIAAAsIhXAAQgLAAAAAOQAAAHAIAGIAxAnQAVAQAIAMQAMASAAAWQAAAbgQAXQgRAXgbAAg");
	this.shape_36.setTransform(485.812,76.8649,1.6693,1.6693);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAeB+IhFhWIAABWIhUAAIAAj7IBpAAQAtAAAfANQAsAUAAApQAAAzhDAQIBZBugAgngVIAVAAQAOAAAJgIQAMgIAAgOQAAgOgMgJQgJgHgOAAIgVAAg");
	this.shape_37.setTransform(442.6178,76.8649,1.6693,1.6693);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgsB+QgQAAgNgHQgQgKAAgPIAAi8QAAgPAQgJQANgHAQAAICGAAIAAAsIhcAAQgMAAAAAJIAAAzIBoAAIAAArIhoAAIAAAyQAAAKAMAAIBcAAIAAAsg");
	this.shape_38.setTransform(395.9597,76.8649,1.6693,1.6693);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AglCUQgOgKgFgOIhJjaIBRAAIA6CvIBNjuIArAAIhcEXQgFAQgNAKQgNAKgPAAQgOAAgPgKg");
	this.shape_39.setTransform(356.3128,71.6065,1.6693,1.6693);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("Ag+DTIAAkhIB9AAIAAEhgAg+h8IAAhWIB9AAIAABWg");
	this.shape_40.setTransform(322.5,76.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AiMCeIAAk7ICEAAQA9AAAsAvQAsAuAABAQAABBgsAuQgsAvg9AAgAgjBmIAbAAQAcAAAKgmQAGgXAAgpQAAgogGgXQgKgngcAAIgbAAg");
	this.shape_41.setTransform(282.7783,71.6065,1.6693,1.6693);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("Ag6ARIAAghIB2AAIAAAhg");
	this.shape_42.setTransform(238.499,74.4444,1.6693,1.6693);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.prologue_logoediversite_blanc, rect = new cjs.Rectangle(0,0,603.8,159), [rect]);


(lib.prologue_chrono = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgvBWQgYgPgMgVQgNgWgBgaQAAgaANgXQATgkAngKQAngLAjAUQAjAUALAnQALAmgUAkQgTAignALQgPAEgMAAQgZAAgWgMg");
	this.shape.setTransform(6.7725,14.9261,0.1525,0.1525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYBfQgogKgUgjQgWgjALgmQAKgnAjgUIACgBIABgBQAjgVAmALQAoAKAUAjQAUAigKAmQgKAogiAUIgBAAIgBABIgBABQgYAOgZAAQgLAAgNgEg");
	this.shape_1.setTransform(6.5624,-5.8028,0.1525,0.1525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgvBVQgWgNgPgWQgNgXAAgaQAAgZAMgXQAUgjAngLQAmgLAjAUQAkAUALAnQALAlgUAkQgTAjgnALQgNAEgOAAQgYAAgXgNg");
	this.shape_2.setTransform(2.2182,-1.3631,0.1525,0.1525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgvBVQgXgOgNgVQgOgYAAgaQAAgnAdgcQAdgeAoAAQAoAAAdAdQAcAcAAAoQAAAogcAdQgcAcgpAAQgZABgXgNg");
	this.shape_3.setTransform(24.6248,4.3909,0.1525,0.1525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgXBfQgngLgVgiQgVgjALgmQAKgnAigVQAjgVAmALQAnAKAVAiQAVAjgKAmQgKAngjAVQgYAOgZAAQgMAAgMgDg");
	this.shape_4.setTransform(2.3641,10.5828,0.1525,0.1525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgwBVQgXgNgNgXQgNgWAAgaQAAgnAdgdQAcgdAogBQAnAAAdAdQAdAcAAAoQABAogcAdQgcAcgqAAIAAABQgaAAgWgNg");
	this.shape_5.setTransform(0.6731,4.6198,0.1525,0.1525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgvBVQgXgNgNgWQgNgXAAgZQgBgaANgXQAUgjAngLQAmgLAjAUQAjATALAnQALAmgUAkQgTAjgnALQgOAEgNAAQgYAAgXgNg");
	this.shape_6.setTransform(23.0764,10.3955,0.1525,0.1525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXBeQgogKgUgjQgVgiAKgmQAKgnAjgVQAjgUAmAKQAnAKAVAiQAVAjgKAmQgKAngjAUQgYAPgZAAQgMgBgMgDg");
	this.shape_7.setTransform(18.7417,14.7956,0.1525,0.1525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgwBVQgWgNgNgXQgNgWAAgaQAAgnAcgdQAcgdAogBQApAAAcAdQAdAcgBAnQABAogdAdQgcAdgoAAIgBABQgZAAgXgNg");
	this.shape_8.setTransform(12.7597,16.4547,0.1525,0.1525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgwBVQgWgNgNgXQgOgWAAgbQAAgnAdgdQAcgdAoAAQAoAAAdAdQAcAcAAAoQAAAogcAdQgdAcgoAAIAAABQgaAAgWgNg");
	this.shape_9.setTransform(12.5612,-7.4744,0.1525,0.1525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgvBVQgTgLgRgYQgNgXgBgZQAAgaANgXQAUgkAngKQAmgLAjAUQAjATALAnQALAngUAjQgTAjgnALQgOAEgNAAQgYAAgXgNg");
	this.shape_10.setTransform(18.5442,-5.9097,0.1525,0.1525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AlEFnQhggZgyhVQgyhUAYhgQAZheBVgzQAygcA4gEQA3gDAzAUIIckJQAigRAkALQAkALATAgQAUAhgIAlQgIAlggAVInsFaQgGA3gdAuQgeAwgyAdQg5Aig+AAQgeAAgfgIgAk8AmQgmAVgLAqQgKAqAVAlQAWAlAqALQApALAmgWQAlgWALgqQALgpgWgmQgWglgqgLQgNgDgNAAQgbAAgZAPg");
	this.shape_11.setTransform(16.6848,2.532,0.1525,0.1525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AmtCbQhAAAgugtQgtgugBhAQABg/AtguQAtgtBBAAIP3AAQgHBeAAA8QAAA1AGBmg");
	this.shape_12.setTransform(-24.9338,4.49,0.1525,0.1525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("ApdCbQhAAAgtgtQgugtAAhBQAAg/AtgtQAuguBAAAIUoAAQATAAAbAIQg+CVgiCYg");
	this.shape_13.setTransform(-25.5477,-4.2489,0.1525,0.1525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AltCcQhBgBgtgsQgtgugBhAQABhAAtgtQAtgtBBgBIAAgBIMWAAQAiCYA+CXQgYAHgXABg");
	this.shape_14.setTransform(-21.876,13.2213,0.1525,0.1525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ApfbFQkZh3jYjYQjZjZh3kZQh7kiAAk+QAAkMBZj7QBVjzChjLIhYhYIgMAMQgaAagkAAQglAAgagaIh9h9QgagZAAglQAAglAagaIEbkbQAZgaAlAAQAlAAAaAaIB9B9QAaAZAAAlQAAAlgaAaIgMAMIBYBYQCoiFDFhTQDKhVDbgaIAAigIhhAAQgkAAgagaQgagaAAgkIAAkEQAAgkAZgaQAagaAlAAIIxAAQAkAAAaAZQAaAaAAAlIAAEEQAAAkgaAaQgaAagkAAIhhAAIAACgQDaAZDKBWQDFBSCpCGIBYhYIgMgMQgagZAAglQAAgkAagbIB9h9QAZgaAlAAQAlAAAaAaIEbEbQAaAZAAAlQAAAlgaAaIh9B9QgaAagkAAQglAAgagaIgMgMIhYBYQCgDLBWDzQBZD7AAEMQAAE+h7EiQh3EZjZDZQjZDYkYB3QkjB7k9AAQk9AAkih7gAnSstQjYBcimCnQimClhcDYQheDeAAD0QAAD0BeDfQBcDYCmCmQCmCmDYBbQDfBfDzAAQDzAADfhfQDYhbCmimQCnimBbjYQBfjfAAj0QAAj0hfjeQhbjYimilQininjXhcQjfhej0AAQjzAAjfBeg");
	this.shape_15.setTransform(12.6641,0.0062,0.1525,0.1525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.prologue_chrono, rect = new cjs.Rectangle(-37.1,-28.3,74.3,56.6), [rect]);


(lib.prologue_bg_zoom_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.instance = new lib.prologue_bg_zoom();
	this.instance.setTransform(0,0,1.5,1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.prologue_bg_zoom_1, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.personnalisable = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#010002").s().p("AA5CJQgRgPgBgXIgBgDQAAgKAEgKIh1h1QgKAEgJAAIgEgBQgXgBgPgQQgQgRAAgWQAAgNAGgMIAmAmQADADAEABIAHACQAHAAAGgGQAJgIgFgMQgBgEgDgDIgmgmQAMgGANAAQAWAAARAQQAQAPABAXIABAEQAAAJgEAKIB1B1QAKgEAKAAIADABQAXABAPARQAQAQAAAXQAAAMgGAMIgmgmQgCgCgFgCQgDgCgDAAQgIAAgGAGQgJAIAFAMQABAEADADIAmAmQgMAGgMAAQgXAAgQgQg");
	this.shape.setTransform(-50.33,48.5001,1.3557,1.3557);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#010002").s().p("AhBAuIAygxIAUgpIApgVIAUAUIgVApIgpAUIgxAyg");
	this.shape_1.setTransform(-38.6033,36.7733,1.3557,1.3557);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#010002").s().p("Ag+A/QgIgIAAgMQAAgMAIgJIBdhcIAoAoIhdBdQgIAJgMAAQgMAAgIgJg");
	this.shape_2.setTransform(-61.379,59.5829,1.3557,1.3557);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag/AJIBIhIIA3A3IgRAQIggggIgLAKIAbAaIgRAQIgZgaIgMALIAfAiIgQARg");
	this.shape_3.setTransform(-21.6909,162.5482,1.3557,1.3557);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgvALIBIhIIAXAWIg3A2IAcAdIgSASg");
	this.shape_4.setTransform(-32.9771,153.1599,1.3557,1.3557);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgZAuIgjgiIBIhIIAmAlQALALAAALQgBALgHAHQgGAFgHACQgIABgIgEQAMARgOAOQgJAJgLAAIgCAAQgKAAgPgPgAgXAQIALALQAEAFAEgBQAEAAACgDQACgCAAgEQABgEgFgFIgJgKgAAFgMIALALQADACAEAAIAGgBQAGgGgIgIIgKgKg");
	this.shape_5.setTransform(-41.9247,142.3906,1.3557,1.3557);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgMAlIAKgTIgUgSIgSAJIgTgRIBfgzIAYAYIgyBfgAgCgMIALALIAPgbg");
	this.shape_6.setTransform(-53.4482,133.8413,1.3557,1.3557);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgGA1QgQgCgOgOQgbgbAQgcIAYARQgGALALALQAJAIAEgEQADgDgBgDQgBgDgEgGQgPgWAAgMQAAgLAJgIQAJgKAPABQAOABAPAOQAWAXgKAYIgZgMQAFgKgJgJQgHgHgFAEQAAAAgBABQAAAAAAABQgBABABAAQAAABAAABQAAADAEAFIAOAXQADAJgBAHQgCAJgHAHQgJAKgLAAIgGgBg");
	this.shape_7.setTransform(-62.3999,122.0033,1.3557,1.3557);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgvAZIBIhIIAXAXIhIBIg");
	this.shape_8.setTransform(-70.191,114.0481,1.3557,1.3557);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgvALIBIhIIAXAWIg2A2IAbAdIgSASg");
	this.shape_9.setTransform(-79.2742,106.8629,1.3557,1.3557);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgMAlIAKgSIgTgTIgUAJIgSgRIBfgzIAYAYIgzBfgAgCgMIALAMIAPgbg");
	this.shape_10.setTransform(-89.0691,98.1864,1.3557,1.3557);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgXAyIANg0IAHgWQgGAJgEAEIgkAjIgSgTIBIhIIAVAWIgJArQgDANgEAIQAHgKALgKIAVgVIATASIhIBIg");
	this.shape_11.setTransform(-98.4573,85.714,1.3557,1.3557);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgWAxIAMgzIAHgWQgGAJgEAEIgkAiIgSgSIBIhIIAWAVIgKAsQgDAMgEAJQAKgNAIgHIAWgVIASASIhIBHg");
	this.shape_12.setTransform(-109.7774,74.4278,1.3557,1.3557);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AglAmQgPgPAAgVQABgSARgSQAPgQAUgBQAUgCARARQAPAPAAAUQgBATgRAQQgRASgTAAIgBAAQgTAAgQgOgAgKgJQgVATALALQAGAFAHgCQAGgCAOgNQASgTgKgKQgDgDgFAAQgKAAgNAOg");
	this.shape_13.setTransform(-121.0975,63.0665,1.3557,1.3557);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgGA1QgQgCgPgPQgagaAQgcIAYARQgGALALALQAIAIAFgFQACgCAAgDQgBgEgEgFQgPgWAAgMQAAgLAIgIQALgLANABQAPACAPAOQAWAXgLAYIgYgMQAFgKgJgJQgIgIgEAFIgCAFIAFAIQAKAPADAIQAEAHgCAJQgBAIgHAIQgKAKgMAAIgEgBg");
	this.shape_14.setTransform(-132.1065,52.269,1.3557,1.3557);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgWAsIASgmIgHgHIgcAbIgXgWIBIhIIAmAmQANANABANQABALgJAKQgIAHgGACQgIACgLgEIgTAtgAADgQIAKAJQAEAFAEAAQAEACAEgEQAHgHgIgJIgLgKg");
	this.shape_15.setTransform(-143.3583,41.7216,1.3557,1.3557);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag/AJIBIhIIA3A3IgRAQIghggIgLALIAbAZIgQARIgagbIgMALIAhAiIgRARg");
	this.shape_16.setTransform(-152.9225,31.2488,1.3557,1.3557);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag8AZIBIhIIAfAfQANANACAHQAEAJgCAJQgDAJgGAHQgKAKgOgBQgNAAgNgNIgMgNIgaAbgAAEAFIAHAIQAKAKAHgHQAHgHgJgJIgIgIg");
	this.shape_17.setTransform(-164.0079,18.4036,1.3557,1.3557);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[]},28).wait(15));

	// Calque_1
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AsVsVIA+AAIXtXsIAAA/g");
	this.shape_18.setTransform(-107.0999,107.1001,1.3557,1.3557);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FCEE21").s().p("AsRsQIYjAAIAAYhg");
	this.shape_19.setTransform(-106.4898,106.4562,1.3557,1.3557);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18}]}).wait(43));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-214.2,0,214.2,214.2);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.intro_titremodule = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("lorem\nipsum\nipsum", "80px 'Raleway'", "#383838");
	this.champ.name = "champ";
	this.champ.textAlign = "center";
	this.champ.lineHeight = 92;
	this.champ.lineWidth = 1918;
	this.champ.parent = this;
	this.champ.setTransform(461,-39.05);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_titremodule, rect = new cjs.Rectangle(-500,-41,1922,282), [rect]);


(lib.intro_signatureaccordia = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AgJAiIAAhDIAUAAIAABDg");
	this.shape.setTransform(2.45,13.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383838").s().p("AgnB6QgQgJgMgMQgLgNgHgRQgGgRAAgTQAAgTAGgQQAGgSALgMQALgNAQgIQAPgIASABQAWAAASALQASAMAKASIAAhvIAYAAIAADfQAAAKAIAAIAAAVIgIABQgJAAgGgFQgGgGAAgIIAAgSQgLATgTAKQgSALgTAAQgTgBgQgHgAgdgfQgLAGgJALQgJAKgEAMQgFAOAAANQAAAPAGANQAFANAJALQAJAJAMAHQANAFANAAQAJABAKgEQAKgEAJgFQAIgHAHgIQAGgIABgKIAAg4QgEgIgGgJQgHgIgIgGQgJgGgKgEQgKgDgIgBQgPAAgMAHg");
	this.shape_1.setTransform(-12.125,22.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#383838").s().p("AgzB5QgTgMgMgTIAPgLQAKARATAJQARAIAVAAQAMAAAMgEQAMgDAJgIQAIgHAGgLQAGgLgBgPIAAgkQgKASgTAKQgSAKgSAAQgUAAgPgIQgQgIgLgNQgLgMgHgQQgGgRAAgSQAAgTAGgRQAGgRALgNQAMgNAPgIQAQgIATAAQAWAAARAMQASAMAMASIAAgnIAVAAIAAC2QAAATgHAPQgIAOgMAKQgMAKgPAFQgRAFgRAAQggAAgTgLgAgahnQgLAGgJALQgIAKgEAOQgFANAAAOQAAAOAGANQAEANAKAKQAJAKANAGQAMAFANAAQAKAAALgEQAKgDAIgHQAJgGAFgIQAFgIACgIIAAg4QgDgKgIgIQgGgJgJgGQgHgGgLgDQgJgEgKAAQgOAAgNAHg");
	this.shape_2.setTransform(-43.05,29.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#383838").s().p("AA0BdIAAhlQABghgKgOQgJgPgVAAQgKAAgJAEQgLAEgJAHQgJAHgHAJQgHAKgDALIAABvIgYAAIAAi2IAWAAIAAAqQALgUAVgNQAVgMAXAAQAQAAAKAGQAKAFAHALQAGAKADAOQACAPAAASIAABqg");
	this.shape_3.setTransform(-63.35,25.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383838").s().p("AgLCAIAAi2IAXAAIAAC2gAgLhcIAAgjIAXAAIAAAjg");
	this.shape_4.setTransform(-77.425,22.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#383838").s().p("AA0BdIAAhlQAAghgJgOQgKgPgUAAQgKAAgJAEQgLAEgJAHQgJAHgHAJQgHAKgDALIAABvIgYAAIAAi2IAWAAIAAAqQALgUAVgNQAVgMAXAAQAQAAAKAGQAKAFAHALQAGAKADAOQACAPAAASIAABqg");
	this.shape_5.setTransform(-91.35,25.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#383838").s().p("AgsBcIAAi2IAWAAIAAAsQAKgVAQgMQARgMAUAAIAEABIAAAVQgYABgSANQgQAMgIAWIAABxg");
	this.shape_6.setTransform(-106.725,25.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#383838").s().p("AgsBaQgLgFgIgHQgJgHgEgLQgFgKABgMQgBgMAGgKQAGgKAKgHQAKgHAOgEQAOgEARAAQANAAAOADQAOACALAEIAAgQQAAgZgNgOQgNgNgYAAQgOgBgPAGQgOAFgPALIgIgQQAjgXAhAAQAigBATAUQATATABAiIAABRQAAAKAJAAIAAAVIgJABQgKAAgFgEQgFgFgBgIIAAgOQgNAQgSAJQgUAIgVABQgNAAgLgFgAgqAIQgQALAAARQAAAIADAIQAEAHAFAFQAGAGAIADQAJAEAJAAQARgBAQgGQAQgIAHgLIAFgHIABgHIAAgeQgLgEgNgDQgNgBgMAAQgZAAgQAJg");
	this.shape_7.setTransform(-123.65,25.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#383838").s().p("AgjBXQgQgHgNgNQgMgOgHgRQgHgRAAgTQAAgTAHgRQAHgRAMgMQAMgNARgIQARgIASABQAUgBARAIQARAIALANQAMAMAHARQAHARAAATIAAAFIgBADIibAAQABAPAGAMQAGANAJAJQAJAJAMAFQAMAGAMAAQAJAAAIgDQAJgDAHgEQAIgEAGgGQAGgGADgIIAUAGQgEAKgIAJQgHAHgKAHQgKAGgNADQgMAEgNAAQgTAAgRgIgABEgJQgBgPgGgMQgGgMgJgIQgJgJgLgFQgMgFgNAAQgMAAgMAFQgMAFgJAJQgJAIgGAMQgFANgBAOICFAAIAAAAg");
	this.shape_8.setTransform(-143.025,25.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#383838").s().p("AgYB4QgJgKAAgRIAAjdIAXAAIAADVQABALAFAFQAFAGAKAAIAJgBIAKgDIAEATIgQAFIgRACQgPAAgKgJg");
	this.shape_9.setTransform(-156.8,22.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#383838").s().p("AgjBXQgQgHgNgNQgMgOgHgRQgHgRAAgTQAAgTAHgRQAHgRAMgMQAMgNARgIQARgIASABQAUgBARAIQARAIALANQAMAMAHARQAHARAAATIAAAFIgBADIibAAQABAPAGAMQAGANAJAJQAJAJAMAFQAMAGAMAAQAJAAAIgDQAJgDAHgEQAIgEAGgGQAGgGADgIIAUAGQgEAKgIAJQgHAHgKAHQgKAGgNADQgMAEgNAAQgTAAgRgIgABEgJQgBgPgGgMQgGgMgJgIQgJgJgLgFQgMgFgNAAQgMAAgMAFQgMAFgJAJQgJAIgGAMQgFANgBAOICFAAIAAAAg");
	this.shape_10.setTransform(-173.025,25.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#383838").s().p("AA1BdIAAhlQAAghgKgOQgJgPgUAAQgLAAgKAEQgKAEgJAHQgJAHgHAJQgHAKgDALIAABvIgXAAIAAi2IAVAAIAAAqQALgUAVgNQAVgMAYAAQAPAAAKAGQALAFAFALQAHAKACAOQADAPABASIAABqg");
	this.shape_11.setTransform(-202.45,25.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#383838").s().p("AhCBJQgPgTAAgoIAAhqIAYAAIAABmQAAA+AqAAQALAAAJgEQAKgDAIgHQAJgHAHgIQAHgJAEgMIAAhyIAYAAIAACWQAAAKAIAAIAAAWIgGAAIgFAAQgIAAgFgGQgFgGAAgJIAAgVQgMAVgUANQgVALgWAAQgeAAgOgUg");
	this.shape_12.setTransform(-222.85,25.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#515356").s().p("Aj2EhQg9gzAAhTQABhAAhgfQAdgcBXgWQBcgXCVgdIAAg/QAAhGgaghQgdglhCAAQg+AAglAeQgiAegBAzIhwAIQgMheBPg8QBJg5ByAAQByAAA+A4QBAA6AABwIAAEWQgBAuAZAPQATALA2AAIAABPQgpAVhCgLQhWgNgPhMIgFAAQggAwgtAYQgyAbhGAAQhXAAg5gxgAhqBCQgrANgQARQgPAQAAAeQAAA0AjAdQAhAdA3AAQA+AAAogrQAngpAAg+IAAhUQh/Aag/ASg");
	this.shape_13.setTransform(264.1222,23.54,0.3636,0.3622);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#515356").s().p("AgcHMQhHgfAAhbIAAncIB9guIAAHjQAAAwAWAUQAWASA1AAIAABPQgqAKgkAAQgpAAgggOgAhilXQgYgVAAghQAAggAYgWQAYgWAjAAQAmAAAYAWQAZAWAAAgQAAAhgZAVQgYAVgmAAQgjAAgYgVg");
	this.shape_14.setTransform(244.7257,18.2602,0.3636,0.3622);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#515356").s().p("Aj+HBQhKg7gHhrQgGhoAFhwQAFh7BPg/QBEg2BqAAQBAAAAyAaQAzAaAcAvIAAl9IB/guIAANAQAAAuAYAPQATALA2AAIAABPQguATg9gLQhSgPgUhIIgDAAQgeAsg1AaQg6AdhNAAQhhAAhCg1gAingoQgqApAABJIgBBgQgBA2ADAvQAJCLCOAAQBNAAAsggQAzgmAAhOIAAisQAAhTgxgtQgugrhNAAQhFAAgpApg");
	this.shape_15.setTransform(223.9125,17.6004,0.3636,0.3622);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#515356").s().p("AiEFIIAAnwQAAglgXgNQgSgKgwAAIAAhJQAigNAnAAQAyAAAjAXQAoAZAJAvIADAAQAOgwAkgcQAqggBBAAQAbAAAXAJQAUAIAGAJIgTBPIhOAAQhLAAgdAqQgZAmgBBfIAAF3g");
	this.shape_16.setTransform(200.27,23.1778,0.3636,0.3622);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#515356").s().p("AjJEQQhRhBgEhpQgEhMAAgiQAAgiAEg9QAFhpBOhAQBPhBB9AAQB8AABPBBQBOBAAFBpQAEA9AAAlQAAAlgEBGQgFBphPBBQhQBCh6AAQh6AAhQhCgAhxjNQgsAngCBBQgEBtAEBaQADBBArApQAsAqBGAAQBFAAAsgqQArgpAEhAQADhdgDhrQgDhAgrgoQgrgohHAAQhGAAgsAog");
	this.shape_17.setTransform(177.2923,23.54,0.3636,0.3622);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#515356").s().p("Ai1EZQhRg9gDhwQgEhuAEhjQAEhxBPg/QBLg8B4AAQB4AABFA2QBFA2gDBZIhwAGQgDg4gqgdQgmgag8AAQhCAAgoAkQgqAmgDBGQgEBmAEBXQADBQAqAoQAoAmBIAAQBAAAAmgjQAigfAIg0IBpAGQAFBThBA6QhGA/h3AAQh8AAhMg5g");
	this.shape_18.setTransform(152.6033,23.54,0.3636,0.3622);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#515356").s().p("Ai1EZQhRg9gDhwQgEhuAEhjQAEhxBPg/QBKg8B5AAQB4AABFA2QBFA2gDBZIhwAGQgDg4gqgdQgmgag8AAQhCAAgoAkQgqAmgEBGQgEBmAEBXQAEBQAqAoQAoAmBIAAQA/AAAngjQAigeAIg1IBpAGQAFBThBA6QhGA/h3AAQh8AAhMg5g");
	this.shape_19.setTransform(128.7348,23.54,0.3636,0.3622);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#515356").s().p("AEfHLIhej5ImIAAIhfD5IiGAAIFjtzIgMgiICUAAIFuOVgAgkjbIh9FLIE/AAIh+lOIgihng");
	this.shape_20.setTransform(99.988,18.4243,0.3636,0.3622);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#686D3E").s().p("AgkBKQgegPgLggQgLggAPgfQAPgfAggLQAggLAeAPQAfAPALAhQALAfgPAfQgPAfggALQgOAFgNAAQgSAAgSgJg");
	this.shape_21.setTransform(49.7272,37.9984,0.3252,0.3239);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#BBB96E").s().p("AgYA0QgWgLgIgWQgHgWAKgVQALgWAWgIQAWgIAWALQAVALAIAWQAIAWgLAVQgKAWgXAIQgKADgJAAQgMAAgMgGg");
	this.shape_22.setTransform(40.8873,41.4324,0.3252,0.3239);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F6D454").s().p("AgqBWQgkgRgNgmQgMglARgkQARgkAmgNQAlgMAkARQAkASANAmQANAkgSAkQgRAkgmANQgQAGgPAAQgVAAgVgLg");
	this.shape_23.setTransform(30.0473,39.9258,0.3252,0.3239);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F4835F").s().p("Ag0BsQgtgWgQgvQgQgvAWgsQAWgtAvgQQAugQAtAWQAtAWAQAvQAQAugWAtQgWAtgvAQQgUAHgTAAQgaAAgagNg");
	this.shape_24.setTransform(22.3946,34.0261,0.3252,0.3239);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F26B43").s().p("AgmBQQghgQgMgjQgMgiAQghQAQgiAjgMQAigLAhAQQAiAQAMAjQALAigQAhQgQAhgjAMQgPAFgOAAQgTAAgTgJg");
	this.shape_25.setTransform(18.7403,24.2145,0.3252,0.3239);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CC4A66").s().p("AgvBiQgpgUgPgrQgOgpAUgpQAUgpArgOQApgPApAUQApAUAOArQAPAqgUAoQgTApgrAOQgSAGgSAAQgXAAgYgLg");
	this.shape_26.setTransform(20.3377,13.5447,0.3252,0.3239);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#91343A").s().p("AgfBBQgbgOgJgcQgKgbANgbQANgbAdgKQAbgJAbANQAbANAKAcQAJAcgNAbQgNAbgdAJQgMAFgLAAQgPAAgQgIg");
	this.shape_27.setTransform(25.9459,6.5272,0.3252,0.3239);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#A3749E").s().p("Ag0BsQgtgWgRgvQgQguAWguQAXgtAvgQQAugQAtAXQAtAWAQAvQARAugWAuQgWAsgwARQgUAGgTAAQgaAAgagNg");
	this.shape_28.setTransform(34.8143,2.6197,0.3252,0.3239);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#8C5089").s().p("AgkBOQgggPgLgiQgLgiAPggQAPghAigMQAggLAfAQQAgAQALAiQALAhgPAhQgQAgghAMQgNAEgOAAQgSAAgSgJg");
	this.shape_29.setTransform(44.3411,3.219,0.3252,0.3239);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#713469").s().p("Ag0BsQgsgWgQgvQgQguAWgtQAVgsAvgQQAugQAtAWQAsAWAQAvQAQAtgVAtQgWAsgvAQQgUAHgTAAQgaAAgagMg");
	this.shape_30.setTransform(52.4115,8.5128,0.3252,0.3239);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#67A9D0").s().p("AgbA6QgZgMgIgZQgJgZAMgXQAMgYAZgJQAYgIAYALQAZAMAIAZQAJAYgMAZQgMAXgaAJQgKAEgKAAQgOAAgNgHg");
	this.shape_31.setTransform(57.2474,16.6951,0.3252,0.3239);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#418FC8").s().p("AguBfQgngTgPgpQgOgpAUgoQATgnApgOQApgOAoATQAnATAOAqQAPAogUAoQgTAogqAOQgRAFgRAAQgXAAgXgLg");
	this.shape_32.setTransform(60.1958,26.1528,0.3252,0.3239);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#276593").s().p("AgyBoQgrgVgQgtQgPgtAVgrQAVgrAtgQQAtgPArAVQArAVAQAtQAQAtgWArQgVAsguAPQgTAHgSAAQgZAAgZgNg");
	this.shape_33.setTransform(70.5762,41.119,0.3252,0.3239);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2E7CBD").s().p("AgkBKQgegPgLghQgLgfAPgfQAPgeAggLQAggLAeAPQAfAPALAgQALAfgPAfQgPAfghALQgNAFgNAAQgSAAgSgJg");
	this.shape_34.setTransform(64.113,34.674,0.3252,0.3239);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_signatureaccordia, rect = new cjs.Rectangle(-235.5,-1.3,510.8,46.4), [rect]);


(lib.intro_presente = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AgoBjQgTgIgOgPQgOgPgIgUQgIgUAAgVQAAgWAIgTQAIgUAOgOQAOgOATgKQATgIAVAAQAXAAATAIQATAJAOAPQANAPAIATQAIATAAAVIAAAGIgBAEIixAAQABASAHAOQAGAOAKAKQALALANAFQAOAGAOAAQAKAAAKgCQAKgDAIgFQAJgFAHgHQAGgHAEgIIAYAGQgFAMgJAJQgJAJgLAIQgMAGgOAEQgOAEgPAAQgWAAgTgJgABOgKQgCgRgGgNQgHgOgKgLQgKgKgOgFQgNgGgPAAQgOAAgOAGQgOAFgKAKQgKALgGAOQgHANgBARICZAAIAAAAg");
	this.shape.setTransform(202.625,29.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383838").s().p("AgDCKQgIgDgGgFQgGgEgDgIQgEgHAAgKIAAiVIgdAAIAAgVIAdAAIAAhHIAbAAIAABHIAvAAIAAAVIgvAAIAACNQABAMAGAFQAHAFAKAAQAMAAAIgEIAMgFIAHAWIgHADIgKAFIgOADIgQABQgJABgHgDg");
	this.shape_1.setTransform(184.35,25.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#383838").s().p("AA8BqIAAh0QAAglgLgRQgLgQgXAAQgLAAgMAEQgLAEgLAIQgKAJgIAKQgIAMgEANIAAB+IgbAAIAAjPIAZAAIAAAvQANgXAYgOQAXgOAbAAQASAAAMAGQAMAHAHALQAHAMADARQAEAQAAAVIAAB5g");
	this.shape_2.setTransform(165.825,28.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#383838").s().p("AgoBjQgTgIgOgPQgOgPgIgUQgIgUAAgVQAAgWAIgTQAIgUAOgOQAOgOATgKQATgIAVAAQAXAAATAIQATAJAOAPQANAPAIATQAIATAAAVIAAAGIgBAEIixAAQABASAHAOQAGAOAKAKQALALANAFQAOAGAOAAQAKAAAKgCQAKgDAIgFQAJgFAHgHQAGgHAEgIIAYAGQgFAMgJAJQgJAJgLAIQgMAGgOAEQgOAEgPAAQgWAAgTgJgABOgKQgCgRgGgNQgHgOgKgLQgKgKgOgFQgNgGgPAAQgOAAgOAGQgOAFgKAKQgKALgGAOQgHANgBARICZAAIAAAAg");
	this.shape_3.setTransform(142.525,29.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383838").s().p("AgsBkQgWgIgRgPIAMgSQARAOATAHQASAHAUAAQAZAAAPgKQAPgKAAgTQAAgJgEgGQgEgFgHgFQgIgEgMgEIgbgHIgfgIQgNgEgIgGQgJgFgFgIQgDgIAAgNQgBgPAHgNQAFgMALgIQALgHAOgEQAOgEAPAAQAYAAAUAHQATAJANANIgOAPQgMgMgQgGQgQgFgTAAQgJAAgKACQgJACgHAFQgHAEgEAIQgEAHABAKQgBAJADAEQACAGAHADIARAHIAWAHIAjAJQAQAEAKAGQAKAHAFAJQAGAJAAANQAAAegXAQQgWARglAAQgXAAgYgIg");
	this.shape_4.setTransform(120.75,29.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#383838").s().p("AgoCLQgTgIgOgPQgOgPgIgUQgIgUAAgWQAAgWAIgSQAIgUAOgOQAOgOATgKQATgIAVAAQAXAAATAIQATAJAOAPQANAPAIATQAIASAAAVIAAAHIgBAEIixAAQABASAHAOQAGAOAKAKQALALANAFQAOAGAOAAQAKAAAKgCQAKgDAIgFQAJgFAHgHQAGgHAEgIIAYAGQgFAMgJAJQgJAJgLAIQgMAGgOAEQgOAEgPAAQgWAAgTgJgABOAdQgCgRgGgMQgHgOgKgLQgKgKgOgFQgNgGgPAAQgOAAgOAGQgOAFgKAKQgKALgGAOQgHAMgBARICZAAIAAAAgAgPhuIAXglIAcAAIgiAsg");
	this.shape_5.setTransform(99.625,25.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#383838").s().p("AgzBpIAAjQIAaAAIAAAyQALgYASgNQAUgOAXAAIAFABIAAAYQgbABgVAPQgTAOgJAZIAACBg");
	this.shape_6.setTransform(81.9,29.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#383838").s().p("AhkCVIAAklIAZAAIAAApQAMgUAVgNQAVgMAXABQAVgBASAKQASAIANAQQAOAOAHAUQAIATAAAWQgBAWgGASQgIATgMAPQgNAPgRAJQgRAJgVAAQgaAAgUgOQgUgOgNgTIAACAgAgah4QgLAFgKAHQgJAHgIAJQgHAKgCAKIAABAQAGALAHAJQAIAJAJAIQAJAGALAFQAKADAMAAQAQABAOgIQAOgHAJgMQALgMAEgOQAFgPABgPQAAgRgGgQQgGgPgLgMQgKgLgPgHQgNgGgQAAQgKAAgMADg");
	this.shape_7.setTransform(62.1,33.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_presente, rect = new cjs.Rectangle(0,0,263.2,51), [rect]);


(lib.intro_logoediversite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFEF36","#FFE01F","#FFD400","#FDCC00","#FDC900","#E23D3C"],[0,0.059,0.133,0.208,0.286,0.855],13,-30.5,-23.7,35.7).s().p("AkHFPQgRgbAHguQAgkGggkFQgHguARgbQARgbAhAGIF7BNQAiAHAcAbQAdAcAFAgQAcC4gcC5QgFAggdAcQgcAbgiAHIl7BNIgMABQgYAAgOgWg");
	this.shape.setTransform(107.3896,99.4026,1.6693,1.6693);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#00A78B","#00969F","#006BB1","#009A3E"],[0,0.337,1,1],11,-30.9,-20.7,37).s().p("AkHFPQgRgbAHgvQAfkFgfkFQgHguARgbQARgbAhAHIF7BLQAiAIAcAbQAdAbAFAhQAcC4gcC5QgFAhgdAbQgcAcgiAGIl7BNIgMABQgYAAgOgWg");
	this.shape_1.setTransform(78.8438,59.5455,1.6693,1.6693);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#BA85B5","#B57EB0","#A86CA5","#945095","#792F83","#792F83"],[0.341,0.443,0.596,0.784,0.996,1],11,-30.9,-20.7,37).s().p("AkHFPQgRgbAHguQAgkGggkFQgHguARgbQARgbAhAGIF7BNQAiAHAcAbQAdAcAFAgQAdC4gdC5QgFAggdAcQgcAbgiAHIl7BNIgMABQgZAAgNgWg");
	this.shape_2.setTransform(46.1002,85.8809,1.6693,1.6693);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#232323").s().p("AhPBjQgnglAAg2QAAg4AigrQAjgsA0AAQAnAAAgAYQAgAYANAmIiiBlQAaAXAdgBQAQAAAVgJQAUgIAMgMIAUA6QgRAOgaAJQgaAJgWAAIgDABQgxAAglglgAgpg3QgWAYABAaIAAAIIBqhAQgSgPgUAAQgaAAgVAVg");
	this.shape_3.setTransform(200.3963,75.4056,1.6693,1.6693);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#222222").s().p("AgdA9QgNgPgBgXQAAgXANgQQANgQAUAAQAVAAALARQAJAOAAARIgBAIIhFAAQABASAKAKQAJAIAOAAQAPAAAMgFIADAOQgRAGgQAAQgWAAgMgOgAgSgIQgFAIgCALIAzAAQAAgLgFgHQgGgLgOAAQgLAAgIAKgAgGgsIAQgeIAUAAIgYAeg");
	this.shape_4.setTransform(596.4894,128.6145,1.6693,1.6693);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#222222").s().p("AgGA5QgHgIAAgTIAAg3IgPAAIAAgPIAPAAIAAgTIARgFIAAAYIAZAAIAAAPIgZAAIAAA2QAAAVANAAQAGAAAFgCIAAAPQgIACgHAAQgNAAgGgIg");
	this.shape_5.setTransform(582.3417,130.2839,1.6693,1.6693);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#222222").s().p("AgIBIIAAhnIARAAIAABngAgHgzQgDgEAAgFQAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgEAAgDgDg");
	this.shape_6.setTransform(572.8682,128.7397,1.6693,1.6693);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#222222").s().p("AgfAvIAEgPQAMAIAMAAQASAAAAgQQAAgLgRgIQgbgIAAgTQABgNAIgJQAKgJAOAAQAOAAALAGIgFAOQgJgGgLAAQgGAAgFAEQgEAEAAAGQAAAGAFAEQAEADAIAFQAaAJAAAUQAAAOgKAJQgKAJgQAAQgPAAgMgHg");
	this.shape_7.setTransform(562.1844,132.1619,1.6693,1.6693);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#222222").s().p("AgXA1IgBhnIAQAAIABAVIAAAAQAEgKAGgHQAIgGAJAAIAFABIAAARIgGAAQgJAAgHAHQgFAGgCALIgBA/g");
	this.shape_8.setTransform(550.7911,131.9532,1.6693,1.6693);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#222222").s().p("AgdAoQgOgPAAgXQAAgYANgPQANgQAUAAQAWAAAKARQAJANAAATIgBAHIhEAAQAAASAKAKQAJAIAOAAQAQAAALgFIADAOQgQAGgRAAQgVAAgNgOgAgSgdQgFAIgCAMIAzAAQAAgLgEgJQgHgLgOABQgLAAgIAKg");
	this.shape_9.setTransform(535.8088,132.1619,1.6693,1.6693);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#222222").s().p("AgIA0IgmhnIAUAAIATA5QAFAOACANIAAAAIAchUIATAAIgnBng");
	this.shape_10.setTransform(519.491,132.1202,1.6693,1.6693);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#222222").s().p("AgIBIIAAhnIARAAIAABngAgHgzQgDgEAAgFQAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgEAAgDgDg");
	this.shape_11.setTransform(507.2631,128.7397,1.6693,1.6693);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#222222").s().p("Ag3BHIAAiMQAVgDARAAQAjAAATASQATASAAAhQAAAjgUAUQgTAVgoAAQgOAAgSgCgAglg4IAABxIASABQAbAAAPgQQAPgQAAgcQAAgagOgOQgPgQgaAAQgLAAgJACg");
	this.shape_12.setTransform(492.6563,128.7815,1.6693,1.6693);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#222222").s().p("AglBCIAFgOQAMAJARAAQAfAAAAglIAAgLIgBAAQgJARgVAAQgTAAgLgOQgMgOAAgVQAAgZAOgQQAMgOASAAQAVAAAJARIABAAIAAgPIAQAAIAABYQAAAggPAPQgNAMgWAAQgUAAgNgJgAgTgxQgIALAAARQAAARAHAJQAJALAMAAQAJAAAGgFQAIgGACgIQACgEAAgGIAAgSIgCgJQgGgTgSgBQgNAAgIALg");
	this.shape_13.setTransform(463.4428,135.6675,1.6693,1.6693);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#222222").s().p("AAYA1IAAg7QABgegXAAQgIAAgHAFQgGAGgDAIIgBAJIAAA9IgSAAIAAhnIAQAAIABARIAAAAQAKgTAWAAQANAAAJAJQAMAMAAAXIAAA9g");
	this.shape_14.setTransform(444.9966,131.9532,1.6693,1.6693);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#222222").s().p("AgIBIIAAhnIARAAIAABngAgKg8QAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgKAAAAgMg");
	this.shape_15.setTransform(431.5584,128.7397,1.6693,1.6693);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#222222").s().p("AAYA1IAAg7QAAgegWAAQgIAAgHAFQgGAGgCAIQgCAEAAAFIAAA9IgSAAIAAhnIAPAAIABARIABAAQAKgTAVAAQAOAAAJAJQAMALAAAYIAAA9g");
	this.shape_16.setTransform(418.1619,131.9532,1.6693,1.6693);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#222222").s().p("AgXA1IgBhnIAQAAIABAVIAAAAQAEgKAGgHQAIgGAJAAIAFABIAAARIgHAAQgJAAgGAHQgGAGgCALIAAA/g");
	this.shape_17.setTransform(403.9725,131.9532,1.6693,1.6693);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#222222").s().p("AgeAsQgIgIAAgMQAAgTAPgIQAQgLAbABIAAgCQAAgYgVAAQgQAAgKAIIgEgNQAOgJASAAQAlAAAAAqIAAAlQAAAPABAKIgQAAIgBgMIgBAAQgKAPgTAAQgOAAgIgKgAgUAWQAAASARAAQARAAAGgSIABgGIAAgQIgEAAQglAAAAAWg");
	this.shape_18.setTransform(388.7815,132.1619,1.6693,1.6693);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#222222").s().p("AgdAoQgNgPAAgXQAAgYAMgPQANgQAUAAQAWAAAKARQAIANAAATIAAAHIhEAAQAAASAKAKQAJAIANAAQARAAALgFIADAOQgQAGgRAAQgVAAgNgOgAgSgdQgGAIgBAMIAzAAQAAgLgFgJQgGgLgOABQgLAAgIAKg");
	this.shape_19.setTransform(372.5889,132.1619,1.6693,1.6693);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#222222").s().p("AglBIIAAiPIASAAIAAB/IA5AAIAAAQg");
	this.shape_20.setTransform(357.3979,128.7397,1.6693,1.6693);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2D2C2E").s().p("AgYAHIAAgNIAxAAIAAANg");
	this.shape_21.setTransform(343.2502,131.1186,1.6693,1.6693);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#222222").s().p("AgeAoQgNgPABgXQAAgYAMgPQANgQAUAAQAVAAAMARQAHAOABASIgBAHIhEAAQAAASAKAKQAJAIAOAAQAQAAALgFIADAOQgQAGgRAAQgWAAgNgOgAgRgdQgHAIgBAMIA0AAQgBgLgFgJQgGgLgNABQgMAAgHAKg");
	this.shape_22.setTransform(328.56,132.1619,1.6693,1.6693);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#222222").s().p("AgfAvIAEgPQAMAIAMAAQASAAAAgQQAAgLgRgIQgagIAAgTQAAgNAJgJQAJgJAPAAQAOAAAKAGIgFAOQgJgGgLAAQgGAAgFAEQgEAEAAAGQAAAGAEAEQAEADAJAFQAaAJAAAUQAAAOgJAJQgKAJgQAAQgRAAgLgHg");
	this.shape_23.setTransform(306.0656,132.1619,1.6693,1.6693);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#222222").s().p("AAZA1IAAg7QAAgegXAAQgIAAgGAFQgHAGgCAIQgCAEAAAFIAAA9IgRAAIgBhnIAQAAIABARIAAAAQAEgIAIgFQAJgGALAAQANAAAJAJQAMALAAAYIAAA9g");
	this.shape_24.setTransform(289.873,131.9532,1.6693,1.6693);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#222222").s().p("AghAoQgOgPAAgYQAAgZAOgPQANgOAVAAQAVAAANAOQANAPAAAYQAAAZgQAQQgOANgSAAQgVAAgMgOgAgWgbQgHAMAAAPQAAARAIAMQAJALAMAAQANAAAJgLQAIgMAAgRQAAgPgHgLQgIgNgOAAQgOAAgJAMg");
	this.shape_25.setTransform(271.1346,132.1619,1.6693,1.6693);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#222222").s().p("AgHBIIAAhnIAQAAIAABngAgHgzQgDgEAAgFQAAgEADgEQADgDAEAAQAFAAADADQADAEAAAEQAAAMgLAAQgEAAgDgDg");
	this.shape_26.setTransform(257.7799,128.7397,1.6693,1.6693);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#222222").s().p("AgGA5QgHgIAAgTIAAg3IgPAAIAAgPIAPAAIAAgTIARgFIAAAYIAZAAIAAAPIgZAAIAAA2QAAAVANAAQAHAAADgCIABAPQgIACgIAAQgMAAgGgIg");
	this.shape_27.setTransform(248.056,130.2839,1.6693,1.6693);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#222222").s().p("AgeAsQgLgMAAgZIAAg7IASAAIAAA4QAAAhAWABQAPAAAIgSQABgEAAgFIAAg/IASAAIABBmIgQAAIgBgRIgBAAQgKAUgVAAQgOAAgJgJg");
	this.shape_28.setTransform(233.2406,132.3288,1.6693,1.6693);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#222222").s().p("AgIBMIAAiXIARAAIAACXg");
	this.shape_29.setTransform(219.8024,128.1137,1.6693,1.6693);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#222222").s().p("AghAoQgOgQAAgXQAAgZAOgPQAOgOAUAAQAVAAANAOQANAPAAAYQAAAZgPAQQgOANgTAAQgUAAgNgOgAgWgbQgHAMAAAPQAAARAIAMQAJALAMAAQANAAAIgLQAJgMAAgRQAAgPgHgLQgIgNgPAAQgNAAgJAMg");
	this.shape_30.setTransform(206.4893,132.1619,1.6693,1.6693);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#222222").s().p("AgoBBIAEgQQAQAKAQAAQAMAAAIgHQAHgHAAgLQABgKgHgGQgGgHgNgFQgjgNgBgbQABgRAMgLQAMgMATAAQASABAMAGIgFAQQgJgHgRAAQgMAAgGAHQgHAGAAAJQABAJAGAGQAGAGANAHQATAHAIAIQAIAKAAAPQABATgMALQgOAMgVAAQgVAAgOgJg");
	this.shape_31.setTransform(188.5022,128.7397,1.6693,1.6693);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#12A298").s().p("Ag7AMIB3giIAAAlIhwAJg");
	this.shape_32.setTransform(585.0127,49.1956,1.6693,1.6693);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2D2C2E").s().p("AgsB+QgQAAgNgHQgQgKAAgPIAAi8QAAgPAQgJQANgHAQAAICGAAIAAAsIhcAAQgMAAAAAJIAAAzIBoAAIAAArIhoAAIAAAyQAAAKAMAAIBcAAIAAAsg");
	this.shape_33.setTransform(582.6756,76.8649,1.6693,1.6693);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2D2C2E").s().p("AAECeQgPAAgNgIQgQgIAAgQIAAimQAAgKgNAAIgZAAIAAgsIAHAAIBpg/IAAA/IAtAAIAAAsIghAAQgMAAAAAKIAACQQAAAJAMAAIAhAAIAAAtg");
	this.shape_34.setTransform(545.1988,71.6065,1.6693,1.6693);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2D2C2E").s().p("AglB+IAAisIBLAAIAACsgAglhKIAAgzIBLAAIAAAzg");
	this.shape_35.setTransform(517.9886,76.8649,1.6693,1.6693);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2D2C2E").s().p("AhaB+IAAgsIBYAAQALAAAAgPQAAgHgJgIIg+gsQgcgWAAgkQAAgeAQgWQASgXAbAAIB3AAIAAAsIhXAAQgLAAAAAOQAAAHAIAGIAxAnQAVAQAIAMQAMASAAAWQAAAbgQAXQgRAXgbAAg");
	this.shape_36.setTransform(485.812,76.8649,1.6693,1.6693);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2D2C2E").s().p("AAeB+IhFhWIAABWIhUAAIAAj7IBpAAQAtAAAfANQAsAUAAApQAAAzhDAQIBZBugAgngVIAVAAQAOAAAJgIQAMgIAAgOQAAgOgMgJQgJgHgOAAIgVAAg");
	this.shape_37.setTransform(442.6178,76.8649,1.6693,1.6693);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2D2C2E").s().p("AgsB+QgQAAgNgHQgQgKAAgPIAAi8QAAgPAQgJQANgHAQAAICGAAIAAAsIhcAAQgMAAAAAJIAAAzIBoAAIAAArIhoAAIAAAyQAAAKAMAAIBcAAIAAAsg");
	this.shape_38.setTransform(395.9597,76.8649,1.6693,1.6693);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2D2C2E").s().p("AglCUQgOgKgFgOIhJjaIBRAAIA6CvIBNjuIArAAIhcEXQgFAQgNAKQgNAKgPAAQgOAAgPgKg");
	this.shape_39.setTransform(356.3128,71.6065,1.6693,1.6693);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2D2C2E").s().p("Ag+DTIAAkhIB9AAIAAEhgAg+h8IAAhWIB9AAIAABWg");
	this.shape_40.setTransform(322.5,76.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2D2C2E").s().p("AiMCeIAAk7ICEAAQA9AAAsAvQAsAuAABAQAABBgsAuQgsAvg9AAgAgjBmIAbAAQAcAAAKgmQAGgXAAgpQAAgogGgXQgKgngcAAIgbAAg");
	this.shape_41.setTransform(282.7783,71.6065,1.6693,1.6693);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2D2C2E").s().p("Ag6ARIAAghIB2AAIAAAhg");
	this.shape_42.setTransform(238.499,74.4444,1.6693,1.6693);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_logoediversite, rect = new cjs.Rectangle(0,0,603.8,159), [rect]);


(lib.intro_logoclient = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.instance = new lib.logo();
	this.instance.setTransform(1,44);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_logoclient, rect = new cjs.Rectangle(1,44,1500,350), [rect]);


(lib.intro_demo_bandeau = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABDB3IAAiCQABgpgMgTQgNgTgZAAQgOAAgMAFQgOAFgLAJQgMAJgJAMQgJAMgEAPIAACOIgeAAIAAjpIAbAAIAAA1QAOgaAbgQQAbgPAfAAQATAAAOAHQANAHAIANQAIANADATQAEATABAXIAACIg");
	this.shape.setTransform(1213.85,51.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AguBwQgWgKgPgQQgQgRgIgWQgJgXAAgYQABgXAIgWQAJgXAQgQQAPgQAVgKQAVgKAZAAQAZAAAVAKQAVAKAQAQQAPAQAJAXQAKAWgBAXQABAYgKAXQgIAWgQARQgPAQgWAKQgUAJgaABQgZgBgVgJgAgghWQgPAIgMANQgMAMgHASQgGARAAATQAAAUAGAQQAHASALANQAMAMAPAIQAQAGARABQARAAAQgIQAPgHAMgNQALgNAIgRQAGgRAAgUQAAgTgGgRQgIgRgLgNQgMgMgPgIQgQgIgRABQgRgBgPAIg");
	this.shape_1.setTransform(1187.25,51.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOCkIAAjpIAdAAIAADpgAgOh2IAAgtIAdAAIAAAtg");
	this.shape_2.setTransform(1168.975,47.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgDCcQgJgDgHgGQgHgGgEgIQgEgJAAgLIAAinIghAAIAAgYIAhAAIAAhPIAfAAIAABPIA1AAIAAAYIg1AAIAACfQAAAMAIAHQAIAGALAAQANAAAKgFIAMgFIAJAYIgIAEIgMAEIgQAFIgSABQgJAAgIgCg");
	this.shape_3.setTransform(1156.875,48.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag5B0QgOgGgLgKQgKgJgGgOQgFgNgBgPQAAgQAIgNQAGgNAOgIQANgKASgFQASgFAVAAQARAAATADQATADAOAGIAAgVQAAgfgRgTQgTgRgegBQgRAAgUAIQgTAHgTANIgKgUQAtgfArABQArAAAZAYQAaAZgBArIAABqQAAAMALAAIAAAbIgLABQgMAAgGgFQgHgHgBgJIAAgTQgRAVgYALQgZAMgbAAQgRAAgOgGgAg2ALQgUANgBAWQAAALAFAKQAEAJAHAHQAIAHAKAEQALAEAMAAQAWAAAUgJQAUgJALgPIAFgJIADgIIAAgnQgQgGgQgDQgRgCgQAAQggAAgUANg");
	this.shape_4.setTransform(1136.45,51.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag5B2IAAjqIAcAAIAAA5QANgbAVgPQAXgQAZAAIAFAAIAAAcQgeACgYAPQgVARgKAcIAACRg");
	this.shape_5.setTransform(1117.975,51.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgDCcQgJgDgHgGQgHgGgEgIQgEgJAAgLIAAinIghAAIAAgYIAhAAIAAhPIAfAAIAABPIA1AAIAAAYIg1AAIAACfQAAAMAIAHQAIAGALAAQANAAAKgFIAMgFIAJAYIgIAEIgMAEIgQAFIgSABQgJAAgIgCg");
	this.shape_6.setTransform(1101.575,48.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgxBxQgagKgTgQIAOgVQAUAQAUAIQAUAIAXAAQAcAAASgLQAQgMAAgVQAAgKgEgHQgFgGgIgFQgJgFgOgEIgdgIIgjgJQgQgEgJgHQgKgGgEgJQgFgJAAgOQAAgSAHgOQAHgNAMgJQAMgJAPgEQAQgFASABQAbgBAVAJQAXAJANAOIgPASQgMgNgTgGQgTgIgUAAQgMABgKACQgKACgIAGQgIAFgEAJQgFAHAAAMQAAAJAEAHQACAGAIAEIASAHIAaAHIAnALQASAFAKAGQAMAIAGAKQAGAKAAAQQAAAfgZAUQgYATgqAAQgbgBgagIg");
	this.shape_7.setTransform(1082.6,51.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("ABDB3IAAiCQAAgpgLgTQgNgTgaAAQgNAAgNAFQgNAFgLAJQgMAJgJAMQgJAMgEAPIAACOIgeAAIAAjpIAbAAIAAA1QAOgaAbgQQAbgPAfAAQATAAANAHQAOAHAIANQAIANADATQAEATAAAXIAACIg");
	this.shape_8.setTransform(1058.85,51.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AguBwQgVgKgQgQQgPgRgJgWQgIgXgBgYQAAgXAJgWQAJgXAQgQQAPgQAVgKQAWgKAYAAQAZAAAVAKQAWAKAPAQQAPAQAKAXQAJAWAAAXQAAAYgJAXQgJAWgQARQgPAQgWAKQgUAJgaABQgZgBgVgJgAgghWQgPAIgMANQgMAMgHASQgGARgBATQABAUAGAQQAHASALANQAMAMAPAIQAQAGARABQARAAAQgIQAPgHAMgNQALgNAIgRQAGgRAAgUQAAgTgGgRQgIgRgLgNQgMgMgPgIQgQgIgRABQgRgBgPAIg");
	this.shape_9.setTransform(1032.25,51.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ACQB3IAAiCQAAgpgNgTQgNgTgaAAQgOAAgMAFQgLAFgLAJQgKAJgHAMQgIAMgEAPIAACOIgeAAIAAiCQAAgpgMgTQgNgTgaAAQgbAAgUASQgVATgJAeIAACOIgeAAIAAjpIAbAAIAAA1QAPgbAXgPQAYgPAcAAQAeAAARAQQARARAEAbQAhg8A6AAQATAAAOAHQAOAHAIAOQAJANADASQAEATAAAXIAACIg");
	this.shape_10.setTransform(998.325,51.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgtCdQgVgKgQgQQgQgSgJgWQgIgWgBgZQABgYAIgVQAJgXAQgQQAPgQAVgJQAXgKAXAAQAaAAAVAKQAWAJAPARQAPAQAJAWQAIAVAAAYIAAAHIAAAFIjHAAQABATAHAPQAIAQAMAMQALAMAPAGQAPAHAQAAQAMAAALgDQALgEAJgEQAKgGAHgIQAJgIADgKIAbAIQgGANgJALQgLAKgNAIQgMAIgQAEQgQAFgRAAQgZgBgVgJgABYAhQgCgTgHgPQgIgPgLgMQgMgLgPgGQgPgGgRgBQgQABgPAGQgQAGgLALQgMAMgGAQQgIAOgBATICsAAIAAAAgAgRh8IAZgpIAhAAIgnAxg");
	this.shape_11.setTransform(964.5,47.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgyCdQgVgLgPgQQgPgRgIgWQgJgWAAgYQABgYAHgVQAJgXAOgQQAOgRATgJQAUgKAXAAQAdAAAYAPQAWAPANAXIAAiPIAfAAIAAEgQAAAMALAAIAAAbIgLABQgLAAgIgGQgIgIAAgJIAAgYQgOAYgYANQgXAOgZAAQgZgBgUgJgAglgoQgPAHgLAOQgMANgFAQQgGASAAARQAAAUAHAQQAGARAMAOQAMAMAQAIQAQAIARAAQALAAANgFQANgFAMgHQAKgIAJgLQAHgLACgMIAAhIQgEgLgJgLQgJgLgLgHQgLgJgMgEQgNgFgLABQgSAAgQAIg");
	this.shape_12.setTransform(936.8,47.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgtBwQgWgKgPgQQgQgSgJgWQgJgWAAgYQAAgYAJgWQAJgXAQgQQAPgQAWgJQAVgKAYAAQAaAAAVAKQAWAJAPARQAPAQAJAWQAIAWAAAYIAAAGIAAAFIjHAAQABATAHAPQAIAQAMAMQALAMAPAGQAPAHAQAAQALAAAMgDQALgEAJgEQAKgGAIgIQAIgIADgKIAbAIQgGANgJALQgKAKgNAIQgOAIgPAEQgQAFgRAAQgYgBgWgJgABYgLQgCgTgHgQQgIgPgLgMQgMgLgPgGQgPgGgRgBQgQABgPAGQgQAGgLALQgMAMgGAQQgIAPgBATICsAAIAAAAg");
	this.shape_13.setTransform(898.7,51.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgyCdQgVgLgPgQQgPgRgIgWQgJgWAAgYQAAgYAJgVQAIgXAOgQQAOgRATgJQAUgKAXAAQAdAAAYAPQAWAPAOAXIAAiPIAeAAIAAEgQAAAMAKAAIAAAbIgKABQgLAAgIgGQgIgIAAgJIAAgYQgOAYgYANQgYAOgYAAQgZgBgUgJgAglgoQgPAHgLAOQgMANgFAQQgGASAAARQAAAUAHAQQAGARAMAOQAMAMAQAIQAQAIARAAQALAAAOgFQANgFALgHQAKgIAJgLQAHgLADgMIAAhIQgFgLgJgLQgJgLgLgHQgLgJgMgEQgNgFgLABQgSAAgQAIg");
	this.shape_14.setTransform(871,47.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ABEB3IAAiCQAAgpgMgTQgNgTgaAAQgNAAgNAFQgNAFgLAJQgMAJgJAMQgJAMgEAPIAACOIgeAAIAAjpIAbAAIAAA1QAOgaAbgQQAbgPAfAAQATAAANAHQAOAHAIANQAIANADATQAEATAAAXIAACIg");
	this.shape_15.setTransform(832.95,51.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AguBwQgVgKgQgQQgPgRgJgWQgIgXAAgYQgBgXAJgWQAJgXAQgQQAPgQAVgKQAWgKAYAAQAZAAAVAKQAWAKAPAQQAPAQAKAXQAJAWAAAXQAAAYgJAXQgJAWgQARQgPAQgWAKQgUAJgaABQgZgBgVgJgAgghWQgPAIgMANQgMAMgHASQgGARgBATQABAUAGAQQAHASALANQAMAMAPAIQAQAGARABQARAAAQgIQAPgHAMgNQALgNAIgRQAGgRAAgUQAAgTgGgRQgIgRgLgNQgMgMgPgIQgQgIgRABQgRgBgPAIg");
	this.shape_16.setTransform(806.35,51.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgOCkIAAjpIAdAAIAADpgAgOh2IAAgtIAdAAIAAAtg");
	this.shape_17.setTransform(788.075,47.175);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgxBxQgagKgTgQIAOgVQAUAQAUAIQAUAIAXAAQAdAAAQgLQARgMAAgVQAAgKgEgHQgEgGgKgFQgIgFgNgEIgfgIIgjgJQgOgEgKgHQgKgGgFgJQgEgJAAgOQAAgSAHgOQAHgNALgJQAMgJAQgEQARgFAQABQAbgBAXAJQAVAJAOAOIgPASQgMgNgUgGQgSgIgVAAQgLABgKACQgKACgIAGQgIAFgFAJQgEAHAAAMQAAAJADAHQAEAGAGAEIATAHIAZAHIAoALQARAFAMAGQALAIAGAKQAGAKAAAQQAAAfgZAUQgZATgqAAQgagBgagIg");
	this.shape_18.setTransform(772.05,51.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ag5B2IAAjqIAcAAIAAA5QANgbAVgPQAXgQAZAAIAFAAIAAAcQgeACgYAPQgVARgKAcIAACRg");
	this.shape_19.setTransform(754.725,51.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgtBwQgWgKgPgQQgQgSgJgWQgIgWgBgYQABgYAIgWQAJgXAPgQQAQgQAVgJQAXgKAXAAQAaAAAWAKQAVAJAPARQAPAQAJAWQAIAWAAAYIAAAGIAAAFIjIAAQACATAHAPQAHAQAMAMQAMAMAPAGQAPAHARAAQAKAAAMgDQALgEAJgEQAKgGAHgIQAIgIAFgKIAaAIQgFANgKALQgLAKgNAIQgNAIgPAEQgQAFgRAAQgZgBgVgJgABXgLQgBgTgIgQQgHgPgLgMQgMgLgPgGQgPgGgRgBQgQABgPAGQgQAGgLALQgLAMgHAQQgHAPgCATICrAAIAAAAg");
	this.shape_20.setTransform(732.5,51.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgPB1IhgjpIAgAAIBQDNIBRjNIAdAAIhfDpg");
	this.shape_21.setTransform(707.15,51.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque_1
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#383838").s().p("EiV/AH0IAAvnMEr/AAAIAAPng");
	this.shape_22.setTransform(960,50);

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_demo_bandeau, rect = new cjs.Rectangle(0,0,1920,100), [rect]);


(lib.CONTENU_titre = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("Lorem ipsum dolor sit amet", "bold 50px 'Raleway ExtraBold'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.textAlign = "center";
	this.champ.lineHeight = 61;
	this.champ.lineWidth = 1666;
	this.champ.parent = this;
	this.champ.setTransform(835,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_titre, rect = new cjs.Rectangle(0,0,1670,62.7), [rect]);


(lib.CONTENU_small = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum rhoncus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet,", "35px 'Raleway'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 43;
	this.champ.lineWidth = 1416;
	this.champ.parent = this;
	this.champ.setTransform(127,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_small, rect = new cjs.Rectangle(125,0,1420,131.3), [rect]);


(lib.CONTENU_scrollbounds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#59D541").s().p("EiV/BLLMAAAiWVMEr/AAAMAAACWVg");
	this.shape.setTransform(897.4951,480.0018,0.9349,0.9977);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_scrollbounds, rect = new cjs.Rectangle(0,0,1795,960), [rect]);


(lib.CONTENU_paragraphe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum rhoncus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet,", "45px 'Raleway'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 55;
	this.champ.lineWidth = 1416;
	this.champ.parent = this;
	this.champ.setTransform(127,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_paragraphe, rect = new cjs.Rectangle(125,0,1420,221.4), [rect]);


(lib.CONTENU_image = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(132,11,3,0)").s().p("Ap9J+IAAz7IT7AAIAAT7g");
	this.shape.setTransform(49.9929,50.0154,0.7834,0.7834);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_image, rect = new cjs.Rectangle(0,0,100,100), [rect]);


(lib.CONTENU_gras = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum rhoncus egestas.", "bold 45px 'Raleway ExtraBold'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 55;
	this.champ.lineWidth = 1416;
	this.champ.parent = this;
	this.champ.setTransform(127,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_gras, rect = new cjs.Rectangle(125,0,1420,111.7), [rect]);


(lib.CONTENU_bullet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhMBMQgfgfgBgtQABgsAfggQAgggAsABQAtgBAgAgQAfAgAAAsQAAAtgfAfQggAhgtAAQgsAAggghg");
	this.shape.setTransform(152.0792,15.5682,0.6912,0.6912);

	this.champ = new cjs.Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean", "35px 'Raleway'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 43;
	this.champ.lineWidth = 1366;
	this.champ.parent = this;
	this.champ.setTransform(177,2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.champ},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_bullet, rect = new cjs.Rectangle(144.6,0,1400.4,45.1), [rect]);


(lib.CLICKPICTOS_textes_trait = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AgWsAIAtAAIAAYBIgtAAg");
	this.shape.setTransform(1.1293,49.9673,0.5091,0.6504);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVMAIAA3/IAsAAIAAX/g");
	this.shape_1.setTransform(1.1293,49.9673,0.5091,0.6504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLICKPICTOS_textes_trait, rect = new cjs.Rectangle(-1,-1,4.3,102), [rect]);


(lib.CLICKPICTOS_picto = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ArILJIAA2RIWRAAIAAWRg");
	this.shape.setTransform(74.9844,74.9977,1.0515,1.0515);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLICKPICTOS_picto, rect = new cjs.Rectangle(0,0,150,150), [rect]);


(lib.CLASSEMENT_zones = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("EhCcgFzMCE5AAAIAALnMiE5AAAg");
	this.shape.setTransform(305.8979,400.0173,0.7285,10.7527);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EAEAEA").s().p("EhCcAF0IAArnMCE5AAAIAALng");
	this.shape_1.setTransform(305.8979,400.0173,0.7285,10.7527);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT_zones, rect = new cjs.Rectangle(-4.9,-1,621.6,802), [rect]);


(lib.CLASSEMENT_trait = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AgWsAIAtAAIAAYBIgtAAg");
	this.shape.setTransform(2.0267,49.9673,0.8824,0.6504);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVMAIAA3/IAsAAIAAX/g");
	this.shape_1.setTransform(2.0267,49.9673,0.8824,0.6504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT_trait, rect = new cjs.Rectangle(-0.9,-1,6,102), [rect]);


(lib.CLASSEMENT_fleche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AnhMEIkhkhQgXgWAAghQAAggAXgXIgBAAIKGqGQAXgWAAghQAAgggXgXIirirQgXgXAHgSQAGgSAggCIPjiyQAhgCAVAUQAVAVgDAhIiyPjQgCAggSAGQgSAHgXgXIirirQgXgXggAAQggAAgXAXIqEKHQgXAXggAAQghAAgWgXg");
	this.shape.setTransform(79.3633,79.4411);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT_fleche, rect = new cjs.Rectangle(0,0,158.8,158.9), [rect]);


(lib.CLASSEMENT_drag = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("lorem ipsum", "bold 25px 'Raleway ExtraBold'", "#383838");
	this.champ.name = "champ";
	this.champ.textAlign = "center";
	this.champ.lineHeight = 31;
	this.champ.lineWidth = 283;
	this.champ.parent = this;
	this.champ.setTransform(143.6,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT_drag, rect = new cjs.Rectangle(0,0,287.2,160), [rect]);


(lib.paul_yeuxouverts = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7F7F5").s().p("AC/AJQgCgRAHgVQANAEAGAUQAGASgGAQIgHABQgPAAgCgVgAjYAEQgEgQAHgNQAOAEAHAQQAHAQgMAKIgCAAQgNAAgEgRg");
	this.shape.setTransform(-0.2333,0.3571);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C3010").s().p("ACvAQQgTgqAhgTQAcACANAbQALAZgJAfQgMAGgKAAQgXAAgMgegAC9ANQACAZAWgGQAGgPgGgSQgGgVgOgEQgGAVACASgAjpAHQgIggAagMQAXgCAHAeQAHAbgOASIgHABQgaAAgIgegAjbAHQAEATAPgBQANgKgIgRQgHgQgNgEQgHANADAQg");
	this.shape_1.setTransform(0.0305,0.0033);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_yeuxouverts, rect = new cjs.Rectangle(-23.5,-4.6,47.2,9.2), [rect]);


(lib.paul_yeuxfermes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C3010").s().p("AjaATQgZgEgEgLQADgTAYAFQAZAFADANQAAAMgRAAIgJgBgAC6gTQAxABANAWQgRAHgnAAIg6ABQADggAxABg");
	this.shape.setTransform(0,0.0068);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_yeuxfermes, rect = new cjs.Rectangle(-24.8,-1.9,49.6,3.9), [rect]);


(lib.paul_tetebg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A4630").s().p("AhlABQCQgMA7AQg");
	this.shape.setTransform(9.075,-86.4194);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD3A7").s().p("AldKJQjggLiHhrQgQhIAIhRQAFgyAVhcQAWhiAGgwQALhVgNhMICJAQQgEAdgUApIglBKQgtBhAYBRQALAlA1APQAvAOBAgHQA+gIAtgXQAxgaADghQAEgigZgVQgagWgjAKQAbANALANQARAUgMAcQhXAOitgdQAKhkApheQAbg+A8heQgkgjhlgFQhggEg2AZQAFg+AYhCQAPgrAihJQAWgvAsg6QA1hGALgSQABgCgFgCQgFgCABgCQApAKApAcIBEA0QBphgCggoQC/gwB2BeQAcAkAMAlQAQAugFA6IAABNQgCApgGAcQgBAQgLAjQAUANAvARQAoARAHAgQACBMgPBNQgJAxgZBUICGAIQAJgcANhOQALhFAOghQAbgvAsgUIAMAAQBOgUAqAuQAkAnAEBPQAEBHgWBKQgVBJgiAfQgnAohUABQheAAgchFQgMALAAAbQAAAcAMAJQgUAJgTAZIgfApIANg2QAHgigFgWQiDCliQBXQivBrjOAAIgrgBgAJHBuQAYAlgcAjIg3AyQAqAeAngTQAjgRAYgyQAXgwACg1QADg5gXghQgRgaghAHQgfAGgfAdQggAdgNAjQgPAnAPAdQAMAAATgQQAKgKAPAAQAHAAAIADgAlxkXQghBPAlBFQAfA5A/AfIAAAjQAdAaAYALQAmASAfgQIg9gdQgigSgHgfQD5gECMAoQgMg0hLAEQgQhviFgHIh6AHIh2ANQABg2gDgZQgFgrgXAAIgBAAg");
	this.shape_1.setTransform(0.0058,12.5443);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5C5454").s().p("Ah1EWQAZhUAJgyQAPhNgChMQAGACgCARQgCARAGACQAEgEAMgCIATgFIAkAmQAWAXAYAFQABgEAHgDQgOAhgLBGQgNBOgKAcgACGAKQg0gBgigcQgcgXgUguQgtAFg0gTQgegLgtgZQAGgdABgoIAAhOQAYAJAaAlQAaAlAXAIIBWgEQASAJAPAXIAZAoQAiAuA5gIIABgEIADgEQgCAUgMAhQgLAigCATg");
	this.shape_2.setTransform(41.75,0.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4C3010").s().p("AG8HDIgkgmIgTAFQgMACgFAFQgFgCABgSQACgRgGgCQgHgggogRQgvgRgUgNQALgjABgQQAtAZAeALQA0ATAugEQAVAtAbAXQAiAdA0ABQgsAUgbAvQgHADgBAFQgYgGgWgXgAICEMIgagoQgPgWgSgJIhXADQgXgIgaglQgaglgXgIQAFg6gQguQgMgkgcgkQh2hei/AwQigAohpBfIhEgzQgpgdgpgJIgjgEQgHAKgFAWIgIAjQg7gQghg0Qgjg2ANhDQAGgfAtg1QAug2AFgYQE1AAENhyIDNAEQAtAFAeAbQAmgbApgMQA0gOAuANQBXAaA3BcQAyBTAQB8QAPBzgRB5QgRB5gsBZIgDADIAAAFIgQABQgvAAgcgogAm/hhQAkAhA8BLQAGg6gPgxQgRg1gpgfQgagUgtgSQg1gWgeAEQgmAHgXAcQgVAZgCAkQgDAjARAfQASAgAhAPIgEgzQgBggAFgTQAZgJAXAAQAzAAAtApgADsi3QBcAlA4BIQAhgYAkg5QAmg8ASg9QAuieiEgWQg6gKhBA2QhDBDgeAXQhSA/hbA/QApgNAqAAQA8AAA/AagAnQkKQAlANA4gCQCqgICrgzQCjgxBxhJQh1gohAAUQgrANhVAjQhbAkguAQQirA5iZgPQAWAiAmAOg");
	this.shape_3.setTransform(-1.7995,-39.4504);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F5B374").s().p("AnWHXQiJg4hTh2QCHBrDfALQDoAMDBh2QCQhXCDilQAEAWgHAiIgNA2QgzB2iQBmQiWBpiWARQgvAFgtAAQiAAAhrgrgAGnBcQgNgJABgcQAAgbAMgLQAcBFBeAAQBUgBAmgoQgTA5hXASQgZAFgWAAQg4AAgjghgAoQBVQg1gPgLglQgXhQAshhIAlhKQAUgqAFgdIiKgQQgEgHghgVQgYgPACgbQA3gZBgAEQBkAFAkAjQg7BegcA/QgoBegKBkQCsAcBXgOQAMgbgRgUQgLgNgbgNQAjgKAaAWQAZAVgDAhQgEAhgwAaQgtAXg/AIQgWACgUAAQgmAAgfgJgAIdgBIA3gyQAdgjgZglQgYgHgQAOQgTAQgMAAQgPgdAPgnQAOgjAfgdQAggeAegGQAigHARAaQAWAigCA5QgCA1gXAwQgYAygjAQQgQAHgPAAQgZAAgagRgAjIjMQgYgLgdgbIAAgjQhAgfgeg5QglhFAghPQAYgBAFAsQADAZAAA2IB2gNIB5gHQCGAHAQBvQBLgEALA0QiMgoj5AEQAHAfAiATIA+AdQgPAIgRAAQgRAAgUgKg");
	this.shape_4.setTransform(-1.7202,35.9382);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#754C18").s().p("Al7CBQhBg8hPAbQgFAUABAfIAEA0QghgPgSghQgQgeACgjQACgkAVgaQAXgbAngGQAdgFA2AVQAtASAZAUQApAgARA1QAQAxgHA7Qg7hMglghgAEwAqQhqgqhkAdQBbg9BShAQAegXBEhDQBAg1A7AJQCEAWgvCfQgRA7gnA9QgkA4ggAYQg4hHhdgmgAmLgoQgngOgWgiQCZAPCsg5QAtgPBbglQBVgiAsgOQBAgUB1AoQhxBKilAxQiqAzipAHIgSAAQgtAAgegLg");
	this.shape_5.setTransform(-8.6108,-62.1083);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque_2
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4C3010").s().p("AE9I8QAZhUAJgxQAPhOgChMQgHgfgogSQgvgRgUgNQALgiABgRQAGgcACgpIAAhNQAFg4gQguQgMgmgcgkQh2hei/AwQigAohpBhIhEg0QgpgdgpgKIgjgEQgHALgFAVIgIAjQg7gPghg0Qgjg3ANhDQAGgfAtg1QAug2AFgXQE1AAENhyIDNAEQAtAFAeAaQAmgbApgLQA0gPAuAOQBXAZA3BcQAyBTAQB8QAPB0gRB6QgRB4gsBYQgCAUgLAhQgMAigCAUIgMAAQgsATgbAwQgOAggLBGQgNBPgJAbg");
	this.shape_6.setTransform(-1.7995,-29.4004);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFD3A7").s().p("AnnM+QiJg4hTh2QgRhIAIhQQAFgyAWhdQAWhhAGgxQAKhUgNhNQgEgHghgVQgYgQACgaQAFg9AYhDQAPgrAjhJQAWguAsg7QA1hFALgTQAAgBgEgCQgFgDABgCIgkgEQgGALgFAVIgIAjQg7gPgig0Qgjg3ANhDQAGgeAtg2QAug2AGgXQE0AAEPhyIDLAEQAuAFAdAaQAngbApgLQAzgPAuAOQBYAZA3BcQAxBTARB8QAPB0gRB6QgRB5gsBYQgDAUgLAhQgLAigDATQBOgUAqAtQAlAoAEBQQAEBHgWBKQgWBJgiAeQgTA5hXATQhYASgyguQgVAJgTAYIgfApQgzB2iQBmQiVBqiXARQgwAFgsAAQiAAAhrgsg");
	this.shape_7.setTransform(-0.0019,-0.0111);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_tetebg, rect = new cjs.Rectangle(-72.4,-87.4,144.8,174.8), [rect]);


(lib.paul_sourcilgauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C3010").s().p("AhxBZQgGgrAUguIAlhMQBcgfAxAuQAxAsgRBiIhvAJg");
	this.shape.setTransform(0.0255,-0.0031);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_sourcilgauche, rect = new cjs.Rectangle(-11.5,-8.9,23.1,17.9), [rect]);


(lib.paul_sourcildroit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C3010").s().p("ABfBcIkHgNQgDhNACgRQAFgwAcgSQAegUBbAKQBUAJAiAUQAdASAWA4QAUA1gEAaQgPAEgUAAQgSAAgWgDg");
	this.shape.setTransform(0.0041,0.0079);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_sourcildroit, rect = new cjs.Rectangle(-17,-9.5,34.2,19.1), [rect]);


(lib.paul_piedgauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C3010").s().p("AgNAHQACgkANglIAIgBQABAAAAAAQABAAAAgBQABAAAAgBQABAAAAgBQgVBeARAvQgZgOACgyg");
	this.shape.setTransform(-61.736,26.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#23211B").s().p("ApmFWQgSguAWhfQgBAAAAABQAAAAgBABQAAAAgBAAQgBAAAAABIgIAAQB4iDDLhtQB6hBEKhvQAvhLAsgnQA7g0BLgLQDbggBBDLQA1Clg6D2QgpAxhfASQhcARhXgVQAHABABgFQgGgMACgkIAAgrIgbAgQgQATgIAQQhAA5iYAtQiCAoiZATIi/AGQhVgKhGgrg");
	this.shape_1.setTransform(0.7853,-0.1616);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4C3010").s().p("AAUAvQgMgDgMgJIgWgQQAIgPAQgSIAaggIAAAqQgCAjAFAMQAAAEgFAAIgCAAg");
	this.shape_2.setTransform(26.6,20.6833);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_piedgauche, rect = new cjs.Rectangle(-63.1,-39.6,126.3,78.9), [rect]);


(lib.paul_pieddroit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C3010").s().p("AgNAHQACgkANgmIAIAAIAEgCQgIAhgDAgQgDAuAKAcQgZgOACgxg");
	this.shape.setTransform(-61.7571,27);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#23211B").s().p("ApmFWQgLgcAEgwQADggAIghIgFADIgHAAQB3iDDMhtQB3g/ENhxQAwhLArgmQA7g1BLgLQDbggBBDLQA1Clg6D2QgpAxhfASQhcAShXgWQAHAAABgEQgFgMABgkIAAgrIgbAgQgQAUgIAPQhAA5iYAtQiCAoiZATIi/AGQhWgKhFgrg");
	this.shape_1.setTransform(0.787,-0.1616);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4C3010").s().p("AAUAvQgMgDgMgJIgWgPQAHgQAQgSIAaggIAAArQgBAjAGALQgCAEgFAAIgBAAg");
	this.shape_2.setTransform(26.65,20.6775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_pieddroit, rect = new cjs.Rectangle(-63.1,-39.6,126.3,78.9), [rect]);


(lib.paul_maingauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5B374").s().p("AhLEHQATgoADgzQACg5gUglQgcASgqgKQgugKAKghQAbAgAfgDQAbgDAXgcQAWgaAIgkQAKgmgLgfQAxgigXhCQgYhBg5gBQAigOAcARQAZAPALAkQAMAjgEAkQgFAogWAYQAyAHAVgwQATgpgIg/QAhAcgPA2QgJAegdAxQAfASAsgKQAfgHAcgRQgEAHAAAFQgiAgghAIQAdAPAVAcQAYAggHAaQgkg1gVgZQgogsgoAkIAcBdQATBBgEAqIgMAAQgQhhgHgUQgVg6gugOQgLAGgLATQgMAUgJAGQAXAeAFA7QAEA/gYAdQgIgBgBAMQgBAKgGAAIgEgBgAhzAXQACgVgJgJQgIgGgTABIgcAFIAAgIQAngeAZAnQAKAPgCASQgCATgPAMgAh0g9IgmgCQAKgSAfAHQAeAHAEAQQgMgHgZgDg");
	this.shape.setTransform(-5.3,2.7963);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD3A7").s().p("AhLEyQgYgLgJgYQAYgegFg+QgEg8gXgdQAJgGAMgUQALgTALgGQAvANAVA7QAFAUARBhQANBFg6ANQgJACgIAAQgPAAgPgGgAjiDMQgQhJALhwIAdgEQASgCAJAGQAJAKgCAWIgHAjQAPgMABgUQACgRgKgQQgYgmgoAcQABilA1hWQBEhxCJBCIAMAnQBDAEAZBGQAZBDgeBEQgcARgfAGQgsAKgegRQAcgxAJgeQAPg2ghgdQAHBAgSApQgVAwgygHQAXgZAEgnQAFglgMgiQgNgkgZgQQgbgRgiAPQA5AAAYBBQAYBCgyAiQAKAfgJAmQgIAlgWAaQgXAcgbACQgfADgcggQgJAhAtALQArAJAcgRQAUAlgDA4QgCA0gTAoIAAAEIgRABQg9AAgUhcgAjPgjIAmACQAZACAMAIQgEgRgegGQgJgCgHAAQgSAAgHANgAAcDkQAFgqgUhBIgbheQAngkAoAtQAWAZAkA1QAbA4gmAvQgVAagYAAQgTAAgUgPgAB7ByQAHgagYghQgVgcgdgQQAhgIAigeQAdgCAdAVQAcASAPAeQAQAfgFAbQgGAfgfAQQg2gTgVgMg");
	this.shape_1.setTransform(0.0119,0.0175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_maingauche, rect = new cjs.Rectangle(-23.6,-31.2,47.2,62.5), [rect]);


(lib.paul_maindroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5B374").s().p("AhzAjQgShpgSgdQAegEAEAbQADAQgBAgQAFAfAWBBQAWA+ACAaQgjgcgQhdgAgEAFQguhrgGgJQAAgJAKgDIASgEQACA+AiBAQASAjAnA7QgngQgehIgABYhSQglgwgWgNQgBgNASACQARAZAjAnIA2A+QgggLgggrg");
	this.shape.setTransform(-2.85,12.4422);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD3A7").s().p("AhXENQg6BBgthOQgig6gNheIAAioQAFgRABg3IAAgdQgBhBAeglQAdglA/AAQA+gBA2AsQBJgDAdBFQAMAcABAfQACAlgOArQAegBAgATQAeARASAbQAsBBg8ApIgogKQgWgGgNgIQAeA7gjAuQgjAvg2gaQgDAPgEAiQgEAcgNAKQgNAFgOAAQgmAAggglgAi2ARQASAdASBrQAQBcAjAcQgCgZgWg+QgXhCgEggQABgggDgPQgEgYgXAAIgHAAgAhOgGQgJADAAAIQAGAKAuBrQAfBIAmAQQgmg7gTgkQgihAgDg8gAgBgZQAUANAlAvQAhAqAfALIg1g+QgkgmgRgZIgDAAQgNAAABAMg");
	this.shape_1.setTransform(0.2808,0.6987);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FEE7D1").s().p("AgCAAQABgwAEgkIAACpQgEgjgBgyg");
	this.shape_2.setTransform(-23.75,2.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_maindroite, rect = new cjs.Rectangle(-24,-29.8,48.1,61.1), [rect]);


(lib.paul_jambegauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#76624A").s().p("AgtIGIhNgfQgogTgVgUQgtgsgShPQgMg2gChlQgEh5gEglQgKhTgfgvQgShFAKhQQAJhMAegzQAshJBYghQBTggBbAQQBeAQBAA8QBHBDAMBpIAnFKQAQCdgDA7QgGBxg6A1QgzAuhOATQgzANg5AAQgfAAgigEg");
	this.shape.setTransform(0.0201,0.0261);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A4630").s().p("AgJEVQg5gjgahBQgbhEAGiwQAHi1gZhGQAfAwAKBUQAEAlAEB5QACBkAMA2QASBPAtArQAUAUApATIBMAgQhVgFg4glg");
	this.shape_1.setTransform(-17.8,19.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_jambegauche, rect = new cjs.Rectangle(-32.1,-52.2,64.4,104.5), [rect]);


(lib.paul_jambedroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#76624A").s().p("AgtIZIhNgfQgogTgVgUQgtgrgRhQQgMg2gDhlQgDh5gFglQgKhTgfgvQgShFAKhQQAJhMAfgzQArhJBbgvQBbgwBdACQBdADAyAyQAyAyAVB5QAUB4AOB1IATChQAQCegDA6QgGBxg6A1QgyAuhPATQgzAOg5AAQgfAAgigFg");
	this.shape.setTransform(0.0232,-1.8995);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A4630").s().p("AgJEVQg4gjgbhBQgbhEAHiwQAHi1gahGQAfAwAKBUQAFAkADB6QADBkAMA2QARBPAtArQAUAVAoASIBNAgQhVgFg4glg");
	this.shape_1.setTransform(-17.775,19.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_jambedroite, rect = new cjs.Rectangle(-32.1,-56,64.4,108.3), [rect]);


(lib.paul_epaulegauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D7ECFF").s().p("AhnHUQhGgXgbg8QgohWAWjLIAtkxIAKhqQAGg8ALgfQAfhVB2AOQBiANBCBdQA+BYgCBqQAAAdgIARQgJATgWANQgHBVAFBxIAKC/QAHBEgyAzQgtAvhKARQghAHgdAAQgnAAgkgMg");
	this.shape.setTransform(-0.0019,-0.0171);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_epaulegauche, rect = new cjs.Rectangle(-22.7,-48,45.4,96), [rect]);


(lib.paul_epauledroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9BD8EE").s().p("AAGBBQgHgkgIhdQAIARACAtQADAuAGARQAAAEgDAAIgBAAg");
	this.shape.setTransform(-16.475,25.2025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#78CEE6").s().p("AAlEwQgDgsgIgSIgLiKQgHhUgMgsQgDgEgOgBQgNgCgCgFQgchPAUhgQAThcAvgsQAGgCAMgLQAKgKAEADQgzA2gWBRQgaBYARBcQAEAIAPgBQAOgBABAGQAtDxgFCnQgGgQgDgwg");
	this.shape_1.setTransform(-20.0624,-5.536);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D7ECFF").s().p("AhiG1Qg3gqgOhOQAEAAAAgEQAGingtjyQgCgGgOABQgPACgEgIQgRhdAZhYQAYhRAyg1QgEgDgKAJQgMAMgFABQAWgeArgUQApgVAtgDQBpgHAWBVQAvC6AgCNQAPBDAnCCQAcB0gLBYQgIA/g8AsQg5AphIABIgGAAQhTAAg2gpg");
	this.shape_2.setTransform(0.8753,0.0223);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_epauledroite, rect = new cjs.Rectangle(-25.4,-47.8,50.8,95.7), [rect]);


(lib.paul_corps = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#78CBE3").s().p("AgFAAIAFAAQAEAAACABQgIAAgDgBg");
	this.shape.setTransform(-19.225,-24.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#78CBE3").s().p("AgFAAIAFAAQAEAAACABIgEAAQgEAAgDgBg");
	this.shape_1.setTransform(-21.725,-24.5357);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#78CBE3").s().p("AgFAAIAFAAQAEAAACABQgIAAgDgBg");
	this.shape_2.setTransform(-23.975,-24.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D5EAFD").s().p("AADAbQgPgagIgXIABgBQACgBACgHQABgGAEABQAEAAACAGIACAJIAXA5IgEABQgIAAgGgKg");
	this.shape_3.setTransform(-29.225,-28.7969);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8BD1E4").s().p("AgCAAQACAAAAgEQACACAAACIABAFQgDgBgCgEg");
	this.shape_4.setTransform(-21.55,-30.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#78CDE5").s().p("AiPBmQAvgkAkhAQAshNANgUQAEgHADAAQACABAFAGQAbAlAUA8QAEAMAMgBIAhACQAVABALAAIAGAHIgSAAIgHgBQgEAAgCgBIgNgBQgIABgEgDIgKAAIgGgBQgFAAgCgBQgQAAgJgDQgGgJgGgNIgKgYQgFgOgEgGQgDAAgCAEQgDAEgCgBQgPACgKANQgPAXgHAkQgBAGAEADQgLAGgaAZQgZAYgOAGQgKAFgIAAIgFgBg");
	this.shape_5.setTransform(-31.25,-26.4281);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#78CDE5").s().p("AAmBzQg5hKgVhvQgCgHAEgDIAZgTQANgLANgEQABATAEAbIAHAvIABAfQgBAGAEARQgBAOAEATIAHAhIACALQACAFgEAAIgBAAg");
	this.shape_6.setTransform(-25.6397,-41.8979);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A0DAEE").s().p("AgDAEIAHgJQAAAHgEAFg");
	this.shape_7.setTransform(-53.925,-21.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#78CDE5").s().p("AgUAoQgOgKgFgXQgGgWAIgPQAJgQAXgBQApABAGAnQADAWgFAKQgEAKgQAIQgJAFgIAAQgLAAgMgIg");
	this.shape_8.setTransform(-8.952,-16.5377);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#78CDE5").s().p("AgUAoQgOgKgFgXQgGgWAIgPQAJgQAXgBQApABAGAnQADAWgFAKQgEAKgQAIQgJAFgIAAQgLAAgMgIg");
	this.shape_9.setTransform(-15.952,13.4623);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#78CDE5").s().p("AgUAoQgOgKgFgXQgGgWAIgPQAJgQAXgBQApABAGAnQADAWgFAKQgEAKgQAIQgJAFgIAAQgLAAgMgIg");
	this.shape_10.setTransform(-20.952,43.4623);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#78CDE5").s().p("AgUAoQgOgKgFgXQgGgWAIgPQAJgQAXgBQApABAGAnQADAWgFAKQgEAKgQAIQgJAFgIAAQgLAAgMgIg");
	this.shape_11.setTransform(-24.952,73.4623);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#78CDE5").s().p("AAECwQgDgBgCgGQgHgQgPg1QgGgbgEgJQgIgUgOgLIACgYQAAgMgDgLQgHgZgQgUQgHgKgFgBQgEgCgLAFQgiAUgSAIQgTAKgJACQgJADgJAJQgGAEgDABQgGABgFgCQgCgDACgDIAEgFQASgUAVgfIAig2QAQgZANgQQAFgHAEAAQADgBAGAHQAhAnAaBEQALAcAMAtIATBLIAPA3QAGgIAPgZQAkg7BWh9IAFgGQADgDAFACIA2AVQgHAJgOAOQgQAQgGAHQgaAfgwBDQgxA/guAdQgFACgDAAIgCAAg");
	this.shape_12.setTransform(16.275,-24.5062);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FEDBB9").s().p("AgGABQgDgBgBAAIAVAAQgDABgGAAIgIAAg");
	this.shape_13.setTransform(12.825,-99.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#78CDE5").s().p("AALJoQgCgDgIgCQgNgHgOgNQgIgIgOgRQgWgVgLgWQgNgagHgqQgDgcADg6IAGhxQASkKBUk7QAZheAghkIAbhVQABgHADgEQAJgDAAAMQgCABgBAGQgBAOgdBsQgnCPgXBlQhWGBAMEmQACA0AkAtQAYAdA5Asg");
	this.shape_14.setTransform(-26.1692,38.77);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#78CDE5").s().p("AgKGVIAQg4QAJggADgZQAGg1gEhAQgDhAgKg4Igsj7QAAgFgCgBIAAjpQAEgJAFgTQAFgUAEgJQANgeAKgUQADgBABAFIgCALIgEAKQgUA0gGBDQgFA5AHBGQAEArAOBRIAVCAQAOBKAGA0QARCQgiB/QgVBSgFBHIgBAHQAAAFgFABQgThAAXhLg");
	this.shape_15.setTransform(-54.5139,33.2477);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F4B274").s().p("AjcE1IgDgLQgMgKAJgNQAWAGAZgIQANgDAegOQBQgmBLhCQBRhEAthFQAegtAIhBQAHg2gQg2QgchWhPgTIgFgBQgBAAgBAAQAAAAgBgBQAAAAgBgBQAAAAAAAAIA+AAIADABIACABQAfATAOAMQA2AsAGBIQAEAogLArQgIAjgTAsQgiBJg6A/QhDBIhYAyQhIAnhVAPIgEAAQgGAAgCgDg");
	this.shape_16.setTransform(-0.3075,-68.3577);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FED2A6").s().p("Ai9F7IgHgEIgHgHQgTgUgJgMQgJgNgCgHIgDgLQgJgigDgWQgCgNACgGQAEgFADAHQABAGAEABQACABAHgBQBSgNBUgvQA+gkA3g2QBzhuAeiOQAQhKgeg6QgVgog2ghIgGgDQgEgDABgEIAJgBQAGABADgCIACAAIAUAFQAOACAHADQBBAWAZBIQARA1gDBBQgDA5gNAxIgBAHQAAAOgGAOQgEAKgJAOQghA0g6AaQhWAngpAXQgJAFgGALQg2BigxA6QgPARgnAmQgHAGgFABIgCAAQgEAAgEgCg");
	this.shape_17.setTransform(2.7847,-61.5125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DC9858").s().p("Ai0EoQgKAAgHgHQgBgUgGgpQgGgogBgUQgFgXABgMQgFhEABgTQAChbAehCQA+iPChgjIARgCQAKgCAGgDIAUAAQBbAMAcBhQAoCHhaByQhlCDicBPQgiASgdAFIgPACIgDgBg");
	this.shape_18.setTransform(-3.4645,-69.945);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#D6EBFE").s().p("AjRNAIg1gFQhRAAhQgeQg6gUgrgjIgVgRQgMgKgFgLQAEgEAAgIIAAgOQACghAJgoIAQhIQAZhrgEhNQgEhXgOhSQgciXgLhMQgNhYABg/QABhnAkhOIAFgNQAEgNAOgDQBOgMAlhHQAQgdAMgpQAGgXALgzIALg6QACgIAIgEQAogQAugQQAEAGABAKQABANABADQgFAHgKAFIgQAKQgNAIgDAKQgEAKAEAOQAYBhAyBDIABAEIADAEQAFAMANAOIAVAXIAZAJQAvgmApg3QAkgxAnhJQAFgKALgGQAZgOAqgSIBDghQBSgpAUhOIACgGIAdAIQAJAAAAAJIAAAyQABAeAKBMIAGAtIAGAtIACA8QAAAGACADQgIAFgHALIgLARQg+BagrBHIAKAgQAOgNAUgWQARgUAfgrQAfgrASgVIATgUIAUgUQAEgEAFgBIA7AUQAjAMAXAMQBEAiAFBTQADA6gMBDQgIAugUBNIggBxIggBzQgsCtgWCxQgJBMgBA2IgBAaQgBAPgEALQgMAighABQhbAFiOAmIh/AiQhJARg5AKIgbADIgbACg");
	this.shape_19.setTransform(0.2359,17.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_corps, rect = new cjs.Rectangle(-58.5,-99.6,116.9,200), [rect]);


(lib.paul_coccyx = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A4630").s().p("AAIBTQg5gagngyQgYgegDgwQAGgIAPgGIAagJQAVA1A5AqQAhAZBJAsQgWAZghAAQgYAAgdgMg");
	this.shape.setTransform(26.05,11.745);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A4630").s().p("AnADlQgRhUADhXQAIjNA3hGQA3hGB4gyQB4gyDeAnQDgAmA2BwQA1BwAGA7IAJBmQhUgLi3AvQi/AxhcgGQhXgHhdgdQhDgVhcgqQgNBNAOBfIAbCLQghg0gShVg");
	this.shape_1.setTransform(-0.4549,-11.1874);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5A4630").s().p("AAUAWIhegJQgbgDgMgIQAlgLBJgEIB1gHQgEAMgNAKIgWAUg");
	this.shape_2.setTransform(-11.175,33.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#76624A").s().p("AAuDOIhiAAIAXgTQAMgLAFgNIh3AIQhJAEglAMQhvgJhChKIgbiJQgNhgANhMQBcApBCAVQBdAeBXAGQBeAHC9gxQC3gwBUALQAmDMh1BmQhjBWjCAAIgZAAgACWh1QgQAFgFAJQADAvAYAgQAmAwA7AaQBGAfAmgrQhJgrghgZQg6gsgVg1g");
	this.shape_3.setTransform(1.5627,14.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_coccyx, rect = new cjs.Rectangle(-46.8,-47.7,93.6,83.4), [rect]);


(lib.paul_brasgauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5B374").s().p("AgqA8QhRgWgEg7QAAgKAEgOQAFgNgBgKQA5AaArAOQA5ASA7AFQACAFALgBIASAAQgGAMgKAPIgTAbQgjAQgoAAQgdAAgfgJg");
	this.shape.setTransform(-13.5775,17.0582);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD3A7").s().p("Ah1CFQgpgqAfhnQArhwAGgiQAEA9BQAWQBLAUA9gcQgWAagoBtQgfBXgxARIhEACQgggHgRgSg");
	this.shape_1.setTransform(-18.4674,30.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#78CEE6").s().p("AgYAdQh/gThOguIBWAYQA/ARAqAJQCEAZBFgoQAFADAhAMQAYAIAFAPg");
	this.shape_2.setTransform(5.325,-18.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D7ECFF").s().p("Ag2E7Qg7gFg6gSQgqgNg5gbIgWgLQgMgHgGgJQAHhRAThdIAligIAogEIAihcQAUgvAkgaQA3gpBIABQBFABA6AkQA8AlAUA6QAXBBgjBHIA1ATQAlANAQAPQgoCahyCgQg+AIg+AAQgrAAgsgEgAEMAEQgFgOgYgJQghgMgFgDQhGAoiDgZQgrgIg+gSIhXgZQBOAwB/ATID/AHIAAAAg");
	this.shape_3.setTransform(1.575,-15.067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_brasgauche, rect = new cjs.Rectangle(-32.6,-47,65.3,93.6), [rect]);


(lib.paul_brasdroit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5B374").s().p("Ah9AQIAAghQgCgWAKgDQCkAPBIgbIAHAAIgPA3QgXAxhYAFIgQAAQhMAAghgng");
	this.shape.setTransform(-6.9348,18.9463);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD3A7").s().p("AguCUQg/gNgIhiQACh4gCg0QAkArBXgEQBagFAWgxQgHAegIBJQgIBHgJAhQgZBehMAAQgPAAgQgDg");
	this.shape_1.setTransform(-7.675,34.1225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#78CEE6").s().p("Aj5A/IAGgOQAEgIABgGQgDhFAQg0QAHAWAAA1QAAA6AEAUQB6AMBjgQQB3gSA1g0IAnADIAgAIQhtA0h/AUQg8ALg2AAQhTAAhCgYg");
	this.shape_2.setTransform(-1.15,-26.2959);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D7ECFF").s().p("Ai6E9IgfgGQgVgDgHgHQgRhDgKhfIgMiwQACgEAPgEQANgDABgIIAEAAQgBAFgFAJIgGANQBuAmCagYQB+gVBug0IghgIIgngEQg1A2h2ASQhjAPh7gMQgDgUAAg6QgBg1gHgWQALhGBIgpQBCglBSAGQBTAGAwAyQA3A5gQBgQBJgLAwAWQgKB0gJBAQgPBggYBCQhPAlhjAaQguARhUAAQgvAAg6gFg");
	this.shape_3.setTransform(0,-17.0292);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_brasdroit, rect = new cjs.Rectangle(-28.5,-49.2,57.1,98.5), [rect]);


(lib.paul_bouche2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DD9958").s().p("AAYAnIAAgWQgJgNgagRQgUgJgCgCQgLgIACgQQArgBAaAdQAcAdgUAoIgDAAQgHAAgBgKg");
	this.shape.setTransform(22.8263,-12.4369);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7F7F5").s().p("AiUAtQgSgegKgkQD5ATBog6QABAEgFAAQgpBChbAhQgyASgxAAQguAAgsgQg");
	this.shape_1.setTransform(-2.7667,1.7199);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F5B374").s().p("AhrCHIBIgKQAugFAWgIQAGAag7AOQgUAEgPAAQgjAAgRgVgAiHBYQhFgPgShWQgFgFgNAIIgVABQAFgbAbgZQCMAYB7gUQCPgXAxhLQAbASAJANQgEAAgDgFQgDgEgGACQg9BthRA6QhRA8haAAQghAAgjgIgAimAtQBcAhBhgkQBbggAphDQAFAAgBgEQhoA7j5gTQAKAjASAfg");
	this.shape_2.setTransform(-0.975,1.7702);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_bouche2, rect = new cjs.Rectangle(-27.1,-17.3,54.4,34.8), [rect]);


(lib.paul_bouche1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F8BF8A").s().p("AglABIgpAAIBagFQA/AAAEAJg");
	this.shape.setTransform(-3.375,7.0238);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5B374").s().p("AiNA7IATgHIBBgBIB0AEQgiAohBADIgIABQg+AAgfgogAjlADQgIgGACgMIAMgBIALAJQAmgUBEgCIB7ADQBLACApgKQA4gNAYgnIABgGIADgGQAJAAAEAIIAGAQQgqBGibAGIiDACIh8ALg");
	this.shape_1.setTransform(-1.444,2.0085);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DD9958").s().p("AAPAfQgDgQgJgBIgFgPQgFgIgJAAQgMgDgCgNQgDgOAJgJQAbAKARAdQATAfgNAbQgHgBgEgRg");
	this.shape_2.setTransform(21.9119,-6.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_bouche1, rect = new cjs.Rectangle(-25.1,-11.8,50.2,23.7), [rect]);


(lib.paul_avantjambegauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A4630").s().p("Al1G/QgEgDgCAAQATk3AVjWQAWjYAsiWQADBJglDaQglDZAIB8QA0AqBaAnQBgApBjAUQD6AwBxhsQANARADAXQhyBpkBgzQi6glijhYIgIBvQgFBEgOAig");
	this.shape.setTransform(-0.375,-0.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#76624A").s().p("AB5DQQhwgQiKhCIiAhHQhIgpgwgOQAOggAFhEIAJhvQCiBXC7AmQEBAzBxhpQALBAgEBSQgDBQgPA8Qg/BChwAAQgeAAghgEg");
	this.shape_1.setTransform(0.5938,44.5877);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#76624A").s().p("AgFHkQhkgUhggpQhagnhBgpQAHhhAYjkQAYjjAYhXQAYhYBIg0QBHg0BvgIQBxgJBMA1QBLA1AiBLQAiBKgCDWQgCDWAFBBIAHBmQAGA8AKATQhOBLiPAAQhAAAhNgPg");
	this.shape_2.setTransform(0.325,-15.9072);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_avantjambegauche, rect = new cjs.Rectangle(-38.3,-65.7,76.8,131.6), [rect]);


(lib.paul_avantjambedroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A4630").s().p("Al2HHQgDgCgCAAQATk4ANiZQAXkLAsixQAEBqgeDQQghDVAEB6QAzArBaAmQBgApBjAUQD6AxBxhsQAMAOAEAZQhyBpkBgzQi6glijhYIgJBvQgEBEgOAig");
	this.shape.setTransform(-0.4,-1.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#76624A").s().p("AB4DPQhvgPiKhCQgegOhig5QhIgpgwgOQAOggAFhEIAJhvQCiBXC7AmQEAAzByhqQALBBgEBSQgEBRgPA7Qg/BChvAAQgeAAgigFg");
	this.shape_1.setTransform(0.5938,44.6127);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#76624A").s().p("AgMHkQhkgUhfgpQhbgmgzgrQgDh6AgjWQAfjPgFhqQAJhPBYg1QBQgxBwgIQBxgJBVAlQBeAqAUBUQAWBZgEDAQgDDuAFBCIAHBnQAGA8AKATQhNBKiPAAQhBAAhNgPg");
	this.shape_2.setTransform(0.9621,-15.9224);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_avantjambedroite, rect = new cjs.Rectangle(-38.4,-65.8,76.8,131.6), [rect]);


(lib.pied_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#996600").s().p("AiaCaIgDgBQgLgHgHgLQATg7AygeIABgCIAAgDIAAgDQAIAKAQACIADAAQARAFAXgBIADgBQBdgwAzhbIAAgDQAPghAIgqIACgBIAAADQAXAnATAsQABAjgLAXQghBDgUBQQgWADgSAFQgBAAgBAAQgBABgBAAQAAAAgBgBQAAAAAAAAQgFgUgIgPIgBADQgJAmgkALQgSAGgVAEQgbAFgZAAQgoAAgggMg");
	this.shape.setTransform(17.6292,25.3904);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7B686").s().p("AgMBXQgQgCgHgLIAAgDIAAgCQAMhTAZhHIABAAQAOAFATACIABACQgMgDgDAGQgcBGgLBIQgDAPAMABIAAACIgEAAg");
	this.shape_1.setTransform(10.65,21.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FEC79B").s().p("AhYBQIAAgBQgMgCADgPQALhIAehFQACgGAMACQBGALBHAMIAAABIAAADQgzBbhdAwIgDABIgLAAQgQAAgNgEg");
	this.shape_2.setTransform(18.645,22.3656);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA9D65").s().p("ABMBRQhHgNhHgKIAAgBQgTgCgOgGIAAgDIAAgHQATgsAXgrIAAgCQAVgOASgPIABgCIAvAGIADAAQAgAqAjAlIAAACIgBAAQgIAqgPAig");
	this.shape_3.setTransform(20.975,8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pied_nina, rect = new cjs.Rectangle(0,0,35.3,42), [rect]);


(lib.oeil_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#16ACF9").s().p("AgKABQAGgBAAgEIAAgDQAHgGAFAFIADABIgBADQgFAPgFAAQgFAAgFgKg");
	this.shape.setTransform(5.725,5.3346);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0D8ACB").s().p("AAOAVQgkAEgJgXQAMACAEgEIADAAQABAIANgDIADAAQALAXAKgdIAAgDQAFgDgCgMIAAgDIACAAQADAhgUAMg");
	this.shape_1.setTransform(4.1505,4.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0C71A5").s().p("AAHgLQgVgEgOAGIAAgEQAogXAQAmIABADIAAADQACALgFAEQADgegWgEg");
	this.shape_2.setTransform(4.2286,2.2449);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EAF0F2").s().p("AgKARIAAgDQgFgJACgPQAJgLAMAIIADAAIAAADQAIAOgLAKIgDAAQgDADgFAAIgHAAg");
	this.shape_3.setTransform(2.0833,3.4667);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#04080A").s().p("AgLAMQALgKgIgOIAAgDIAAgDQAXgBgDAYIAAADIAAAEQgBAFgFABIgDAAIgGABQgIAAAAgHg");
	this.shape_4.setTransform(4.0868,3.6679);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0F73A7").s().p("AgRAUIAAgCQgNgOAEgdIADgBIAAgCIADABIAAACQgCAQAFAJIAAACQAJAXAkgEIAAACIgDAAQgJAGgKAAQgLAAgMgJg");
	this.shape_5.setTransform(2.7765,4.9741);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0A82C1").s().p("AAdASQgFgGgIAGIABgDQACgYgXABIAAADIgDAAQgNgIgIALIgBgCIgCgBIAAgDQAFgBACgEIACgBQAOgFAVAEQAWAEgDAdIgDAAg");
	this.shape_6.setTransform(3.6184,2.6908);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.oeil_nina, rect = new cjs.Rectangle(0,0,7.3,7.9), [rect]);


(lib.mollet_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEF6D9").s().p("AiVEIQATgQgDgqQgBgNACgPIAlkiQAHg4gEgzIABgCQAhhMBgACQAuAvATBLQA5DcgMD3IAAACQiWgOiTgSg");
	this.shape.setTransform(16.0543,29.571);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mollet_nina, rect = new cjs.Rectangle(1.1,0,30,59.2), [rect]);


(lib.main_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EA9F67").s().p("AATAYIgDAAIgDgDIAAgBQgZgNgIgeQAbATAOAcg");
	this.shape.setTransform(15.2,17.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBA06A").s().p("AAPAxIAAgDQgWgYgKgkIAAgDIAAgfQARAjANAnQAFAPAAAIIgDAAg");
	this.shape_1.setTransform(11.325,19.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBA068").s().p("AAIAwIgCgBIgBgDQgSgjAEg6QARAHgDAkQgBAMAEAQQAEARgDALIgBgCg");
	this.shape_2.setTransform(5.9211,19.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EA9D66").s().p("ABGA5Qg+gCg1gJIAAgBQgTgHgOgKIAAgDIAAgDQAGgeAMgYIAAgDQANgLARgIIABgCIAyAAIADAAQAyAbAFBFIAAADQADAOgMAAIAAAAg");
	this.shape_3.setTransform(9.5471,5.7258);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDC89C").s().p("AgNBgQgSgMgKgUQAEgMgEgQQgEgQABgOQACgjgRgHQgEA6ASAkIABADIgBAAQgFAbgYAGIgDgBQgmgnAHhUQAJgeAFgkIABAAQAOAKATAGIABACQA1AJA9ACQANAAgEgOQABAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQACAHADAFQAaAjANAuIgBACQgaAUgWgZIACAAQgOgdgbgTQAHAfAaAMIAAACIgBAAQACAJAFAJIAAADIAAAZIAAACQgOAcgZgVQAAgIgFgPQgPgogQgiIAAAfIAAACQAKAlAWAYIABADIgCAAQgIAXgTAKIgDgBg");
	this.shape_4.setTransform(10.9889,18.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.main_nina, rect = new cjs.Rectangle(0,0,22,28), [rect]);


(lib.jambeG_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBE3C5").s().p("AAHASIgBgCQgIgLgFgPQADABgBgGIAAgCQAIAQAGATg");
	this.shape.setTransform(6.4,49.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FEF5D9").s().p("AggCXIgBgCQgYgNgNgXIABAAQgFgUgKgQIAAgCQgYg2gSg8IAAgCQgDgZgHgfQCiABBug2IABAAQgFAggHAcQgJAggNAdQgWAzgRA8QgHAFgDAJQgQA3g9AAIgJAAg");
	this.shape_1.setTransform(14.225,40.4158);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7DFC1").s().p("AAfBbIgBgBQgshOgThmIALAAIADAAQAIAfADAYIAAACQARA8AYA3IAAACIAAACQABAFgDAAIAAAAg");
	this.shape_2.setTransform(2.4611,39.7521);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C9BEA0").s().p("AiCCeIgDAAIgLAAIAAgDQgVhEAEhdQANiHCFgOQBJgIAuAfQBNA2gXB9QgGAegIAbIgCABQhsA1ihAAIgDAAg");
	this.shape_3.setTransform(13.5984,14.8692);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.jambeG_nina, rect = new cjs.Rectangle(-2.7,-0.9,32.6,56.5), [rect]);


(lib.jambeD_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEF5D9").s().p("AggCXIgBgCQgYgNgNgXIABAAQgFgUgKgQIAAgCQgYg2gSg8IAAgCQgDgZgHgfQCiABBug2IABAAQgFAggHAcQgJAggNAdQgWAzgRA8QgHAFgDAJQgQA3g9AAIgJAAg");
	this.shape.setTransform(16.925,41.3158);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBE3C5").s().p("AAHASIgBgCQgIgLgFgPQADABgBgGIAAgCQAIAQAGATg");
	this.shape_1.setTransform(9.1,50.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E7DFC1").s().p("AAfBbIgBgBQgshOgThmIALAAIADAAQAIAfADAYIAAACQARA8AYA3IAAACIAAACQABAFgDAAIAAAAg");
	this.shape_2.setTransform(5.1611,40.6521);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C9BEA0").s().p("AiCCeIgDAAIgLAAIAAgDQgVhEAEhdQANiHCFgOQBJgIAuAfQBNA2gXB9QgGAegIAbIgCABQhsA1ihAAIgDAAg");
	this.shape_3.setTransform(16.2984,15.7692);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.jambeD_nina, rect = new cjs.Rectangle(0,0,32.6,56.5), [rect]);


(lib.corps_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C2BCA7").s().p("AgJgLQAkgCgdAYIgDABQgGAAACgXg");
	this.shape.setTransform(21.6247,59.4468);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FEF5D8").s().p("AkCD/IgBAAQgNhWAAhgQAOAVAlgCIAAgBQAVgOgGgpIAAgDQgRgegoAGIgEAAQAMhUABhuIAAgDQAPAXAlABIADAAQARgLADgZIAAgDQgFgSgIgPIACAAQBwAGBRgYIADgBQBuBLBhBXQAgAeAdAhQgXAngcAiQgkAqgmAnQiACEj1AAIgigBg");
	this.shape_1.setTransform(46.5,82.9052);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#888275").s().p("Ag0gBIAMAAIADAAIAMAAIADAAIBIAAIADAAIAAABIgrACQggAAgegDg");
	this.shape_2.setTransform(25.075,32.2681);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C8BDA0").s().p("AAfBQIgBgCQhAg9gZhkIADAAQAaBKBJAZIADAAIALAmQAJAegSAAQgHAAgKgEg");
	this.shape_3.setTransform(9.6676,43.8661);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C7BC9F").s().p("AAgAmIAAgCIhEgrIAAgDQALgKAGgOIABgDQAeAlAZAmg");
	this.shape_4.setTransform(10.725,28.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BDB398").s().p("AgLAHQAJgHAHgJIACgBIACABQAMARggADIAAgEg");
	this.shape_5.setTransform(18.4868,14.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EA9E66").s().p("AgbAkIAAgDIAAgfQAXgZAfgPIAAACQgVAjgeAnIgDABIAAgDg");
	this.shape_6.setTransform(24,27.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FCF3D6").s().p("AAQBRIgMAAIgogsQgVgWgIghQBIgVA3gnIADgBIABAAQgcA4gWA9QAAATABASIACAAIAAACIAAAEIgDAAg");
	this.shape_7.setTransform(19.375,24.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F9F1D4").s().p("AggAlIgkgiQBIgUA+ghIADgBQgJARgNAMQgMAMgKANQgXAggUARIgOgPg");
	this.shape_8.setTransform(28.4,9.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#DED4B7").s().p("AhUgBICmAAIADAAIAAABQhVAChUAAIAAgDg");
	this.shape_9.setTransform(40.425,35.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C2B89B").s().p("AiXAhQBzgBBjgPQA+gKAbgrIAAADIAAAbIgCABQgMAdgfAJIgEAAIimAAIAAADIgDAAIgYABQghAAgcgEg");
	this.shape_10.setTransform(38.3,32.4767);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FBF2D6").s().p("Ag7BLIhJAAIAAgDQBWgPA2gtQA3gtAugpIABACIABACQAGAjAPAaIAAADQACATgFAOIgDAAQhKAphsAHIgDAAg");
	this.shape_11.setTransform(36.0536,24.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FDF5D8").s().p("Ag5BJQAshAAbhOIgCAAIAAgDIAAgDQAPAGASAEIABACQgFAhALAjQALAjgLAeIAAABQgtAHgzgCIgEAAIgDAAQgFAAgBgDg");
	this.shape_12.setTransform(53.4564,7.8423);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FEC99D").s().p("AiZChIgNAAIAAgEIADAAQAfgpAVgiIAAgCQggAPgXAaIAAAfIAAADIgBAAQgCgSABgTQAWg+Acg4IgCAAIAAgDIAGgDIABgCQAVgRAXggQAKgPAMgMQANgLAJgRIAAgDIACAAIAAgDIAAgDQBBgZBLgNQANgBAOABQAOADAKAFIABAAQgbBPgsBAQABAEAIgBIAEgBIgBACIgSABIAAAMIAAADIgBgBQguAog3AvQg2AthWAOIAAAEIgDAAg");
	this.shape_13.setTransform(37.9,16.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C9BEA1").s().p("AgtAWQgGgLgBgPQAyAEAlgKIADAAQAIgFAFgGIACgBIAAADQgHAdgdAKIgDgBQgbgCgeAAIAAADIAAADIgCgBg");
	this.shape_14.setTransform(57.275,19.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FDF4D7").s().p("AjMHwQhZggg2hEIAAgCIAAgSQAmivA9iXQAKgXADgbIADAAQAVAHAWAHQAPA7gMA+QgfCwAQC6IgDgBgAithlIgIgVIgBgEQAPANAkAAIADgBQAXgIgCghIgBgEQgKgXgagKQgKgFgLAIQgdAUAFgkIA9AAIADAAQAnAGAugCIADAAQBUAABWgCIAAgCQAfgIAMgeIACgBIAAgbIAAgDIAAgDQADgogJgbIAAgDIAAgDQAeABAcABIADABQAcgJAIgfIAAgCQAEgIAAgFQAAgxgKgtQAkAuAxAiIAAACQgEAygGAyIgCAAIABgJQAAgBAAgBQAAgCAAAAQAAgBAAAAQAAAAAAABQg0BqhbA/Qg6AohNAQQg8ALg9AAQg4AAg3gKgAjYhrQhKgbgahJIAAgDIAAgNQAKghATgZIABgDIBFAsIAAADIgBAAQgEAGgGADQABBBANA1IAAADIgCAAg");
	this.shape_15.setTransform(35.7,56.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C9BEA0").s().p("AjnCUIgBAAQgMgmgLgmQB0AVB1gWQBNgQA6gnQBbg/AzhqQABAAAAAAQAAAAAAAAQAAABAAABQAAABgBACIAAAJQgBAWgFAPQgQA4gmAfQhTBFhGBSIgDAAQhQAShXAAQgyAAg1gGg");
	this.shape_16.setTransform(43.8375,38.8696);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#22211F").s().p("AjTIdQg4gOgtgbQgrgagdgqQAGgXADgaIAAgDQA2BEBaAgIACABQgQi7AgivQALg+gOg7QgXgGgUgIIgDgBIAAgDIAAgGQAGgMAAgSIAAgDQAnAOgNgoIgLgmIAAgDQgOg1gBhCQAHgCADgGIACgBIAFAAQgZgngfglIgBgDQgFgOACgWQAigjA0gOIACAAQAhgDgMgSIgCAAIgBgCQgQgJgCgXQAhgdA0gKQAxgLAxgOIgBADIgCAAIAAADIgCABQg+AhhJAVIAkAiIANAPIgBACIgFAEIAAADIgDABQg3AnhJAVQAIAiAVAWIApAsQAyAFA4gDIABgCQBrgHBKgpIADgBQAFgNgCgUIAAgDQgPgbgGgiIgBgDIAAgDIAAgMIASgCIABgBQA0ACAtgHIAAgBQALgegLgjQgKgkAEghIAhAMIAEAAQgCAVAEAQIABADQAKAsgBAyQAAAFgDAHIgDABQgFAGgHAFIgDAAQgmAKgzgEQABAQAHALIACABQAIAbgDAoIAAADQgbAsg9AJQhkAQhyAAIgEAAIg8AAQgFAjAcgTQAMgJAKAGQAZAJALAYIABADQACAigYAIIgDABQgjgBgQgMIABAEIAIAVQALAmAMAlIABABQCPAQB/gcIACAAIAAADQgGATgIARQAAAFAFACIAAACIgDABQhSAXhvgGIgCAAQAIAPAGASIAAADQgEAZgRALIgDAAQglgBgPgXIAAADQgBBugLBVIADAAQAogGASAeIAAADQAGApgWAOIAAABQglACgOgVQABBgANBWIABAAQEOAJCIiMQAmgnAkgqQAcgiAXgoIACABQANAVAPASQgYA5gnArQhfBtiVA2QhkAliIAGIgFAAQgmAAgJgYgAixADQgDAfAKgIQAbgXgcAAIgGAAg");
	this.shape_17.setTransform(38.45,57.9321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.corps_nina, rect = new cjs.Rectangle(0,0,76.9,114.5), [rect]);


(lib.brasG_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEF5D8").s().p("Ag/C9IgBgCQgRgRgHgWIAAgCQADgBABgFIADgLQAPgqADgMIATg8QAEgPAAgbIAAAAQAEgQACgMIAAgCQAGgVgFg7IAAgDQALgLARgMQAvgmAWAGQAPAEAKALQgQAvgFAzQgKBjgMBjQgKBRg6AAQgSAAgXgIg");
	this.shape.setTransform(16.1,23.2,1,1,0,0,0,0.5,-0.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.brasG_nina, rect = new cjs.Rectangle(6.7,4,17.9,39.4), [rect]);


(lib.brasD_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEF5D8").s().p("Ag+C+IAAgCQgSgRgHgXIABgBQACgBABgFIADgLQAQgqADgMIARg8QAEgQAAgaIAAgBIAGgcIABgBQAFgVgFg7IgBgDIAcgYQAvgmAWAGQAPAEAKALQgQAvgEAzQgJBjgMBjQgKBRg7AAQgSAAgWgHg");
	this.shape.setTransform(15.9,23.25,1,1,0,0,0,0.4,-0.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.brasD_nina, rect = new cjs.Rectangle(6.7,4,17.6,39.4), [rect]);


(lib.bouche4_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEF2D5").s().p("AgxgPIAJAAIADAAIADAAIADAAQARAFAYgDQAcgDAMAKIgBACQgMALgRAHIgDABQgLABgJAAQgnAAgHgfg");
	this.shape.setTransform(11.725,6.7403);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FD644F").s().p("Ag/AdIgBgCIgDgDQgUgVADgrQAHAFAKACQAKABAMAAIAAABIgDAAIgJAAQAJAoA5gJIADAAQARgIANgLIABgCQgNgLgbAEQgYADgSgGQA/ABA6gDIADgBQgOAfgZAUQgcAYggAAQgXAAgagMg");
	this.shape_1.setTransform(12.4559,8.2602);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D63823").s().p("AggAYIgDAAIgDAAIAAgCQgNABgJgCQgLgCgHgEIgDAAQgGAAgDgDIAAgCQgYgDADgcQAJgEAMAEIADAAQAPgBAMACQASADANAIIADAAQA7gTA0AbIABABQAGALASABIADAAIgBACIgUAHIgDAAQguADgvAAIgcAAg");
	this.shape_2.setTransform(11.8382,2.717);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E89D67").s().p("AADAMIgCgBIgDAAQgSAAgFgLQAZgFASgIQAEgCAFADIAAAZIgIACQgHAAgJgDg");
	this.shape_3.setTransform(23.05,2.77);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bouche4_nina, rect = new cjs.Rectangle(0.6,0.3,25.1,12), [rect]);


(lib.bouche3_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEB5AB").s().p("AgjgLQALALAQAHIAAACQAXABATgEIADAAIgBACQgQAEgNAAQgdAAgNgXg");
	this.shape.setTransform(4.95,11.8855);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FEF0D3").s().p("AgpgNIAAgDIAAgDQAvgKAiATIADAAIgBADQgRASgZAMIgCAAIgJAAQgiAAAEgkg");
	this.shape_1.setTransform(7.6832,6.865);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D63A26").s().p("AAuAbIgDgBQgigTgvALIAAADIAAADIgCAAQgKAMgQgJIAAgDQgJgLADgWQALgMARgGIADAAQAcALAmgOIADAAQAdAQAQAdIAAADIAAACQgEALgJAAQgGAAgIgEg");
	this.shape_2.setTransform(7.3609,3.1123);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FE614D").s().p("AgkAnIAAgCQgQgHgLgMIgBgDQgJgQAEgdQAQAJAJgLIACgBQgEApAsgFIACAAQAZgLARgTIAAgDQAVALAGgRIABgDIABAAQgEA/g6AMIgDAAQgOAEgSAAIgKgBg");
	this.shape_3.setTransform(7.726,8.86);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bouche3_nina, rect = new cjs.Rectangle(0,0,14.9,13.1), [rect]);


(lib.bouche1_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FD604B").s().p("AASAdQgigCgdgHQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAQgZgNgHgeQBNASBNgUIADgBIAAADQgRAngpAPIgDAAg");
	this.shape.setTransform(11.85,7.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D63723").s().p("AhJAVIgBgBQghgLgGgjQATgFAkAHIADABQAMAJAPAFIADABQAIgCASgIIAAgCIAxAAIADAAQAPAIASAFIABACQAJAGAPACIADAAIAAACQgPAGgQAEIAAADIgDABQgpAKgoAAQgkAAgkgIg");
	this.shape_1.setTransform(11.4,2.9458);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E89D66").s().p("AAAANIgDAAIgDAAQgPgCgKgHQAagOAWgDIADAAQAaAbghAAIgNgBg");
	this.shape_2.setTransform(23.2039,1.9206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bouche1_nina, rect = new cjs.Rectangle(0,0,26.4,10.5), [rect]);


(lib.avantbrasgauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFE6C5").s().p("AAAAUQgEgHgHgEIAAgDQAHgIADgQIABgCIAMAOIAAABIgBAAQgEAJgFAIIgCAHIAAACQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAg");
	this.shape.setTransform(-7.7,5.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F6ECCA").s().p("AgOBaQgCgGgJgDIAAgCQAXhPAXhQQACgFADgFQAAAXgGAZQgPBKgRA5IAAACIgCgBg");
	this.shape_1.setTransform(-4.425,-7.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#21201E").s().p("AAnA7QgkgIgagPQgtgYgKgwQAGgJADgNIAAgCQAIAEAEAHQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQAkA8BhAPIACAAIgBADIgIAdQgHACgIAAQgIAAgIgCg");
	this.shape_2.setTransform(-1.975,12.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCF3D6").s().p("AA/AzQhhgPgkg8IAAgCIACgHQAFgIAEgKIABAAQAhAfAmAaIAAABQAaAKAeAGIACABIgGAZIAAADIgCgBg");
	this.shape_3.setTransform(-0.6,10.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#292725").s().p("AgKAVIgCAAQgHgPAIgZQAQgOAJAQIACABIgCAMIgBACIAAABIAAABIgFAVIgBAAQgEAFgDAAQgFAAgFgFg");
	this.shape_4.setTransform(6.5242,5.3609);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FDF4D8").s().p("AAaCGQg+gZgqgqIABgDQASg5APhJQAFgaABgWIAAgCIABgDQAegiAwAUQARAGAJAQQASAhgJA2IgFAiIgCgBQgOgJgJAMQgJAdAMAMIACABQAHAHAGgLIABAAQgFATAAAOIAAACIgCgBQgJgQgRAOQgIAaAHAPIACAAQAKAKAIgKIABAAIAFgVIAAgDQAAASgGAWIAAADQgNgDgMgFg");
	this.shape_5.setTransform(2.1473,-4.8054);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#232220").s().p("AA4BVQgegGgagKIAAgBQgmgbgggeIgBgCIgNgNIAAgCIABgFQAFgGABgOIABgCQAJACACAHIACABQAqApA+AZQALAFANADIgGAgIgBADIgCgBgABBgkIgCgBQgLgMAJgdQAJgMANAJIACABQgBASgEATIAAADIgCAAQgDAHgEAAQgDAAgDgDg");
	this.shape_6.setTransform(0.675,4.2699);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.avantbrasgauche, rect = new cjs.Rectangle(-9.8,-18.9,19.9,38), [rect]);


(lib.av_bras_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#292725").s().p("AgGAeIgCgBQgPgQAFgiQASgWASATIACAAIAAAQIAAADIAAADIAAAaIgCABQgFAJgIAAQgFAAgGgEg");
	this.shape.setTransform(21.3717,29.6367);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#21201E").s().p("ABJA+Qg0gBgqgNQhFgTgcg4QAFgNACgSIAAgDQAKAEAJAIIACABQBDBBCKgGIADAAIAAADQAAAXgDARQgRAIgWAAIgDAAg");
	this.shape_1.setTransform(11.85,41.5264);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EFE6C5").s().p("AAEAZQgHgIgLgDIAAgEQAGgMAAgUIAAgDIAWAOIABABIgCAAQgCANgFALIAAAJIAAADIgCgBg");
	this.shape_2.setTransform(2.1,34);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCF3D6").s().p("AhogLIAAgDIAAgKQAFgKACgOIACAAQA2AeA8AWIABACQAnAFArABIADAAIAAAhIAAADIgDAAIgXABQh5AAg+g8g");
	this.shape_3.setTransform(13.2,37.8248);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F6ECCA").s().p("AAEB2QgFgIgNgBIAAgDQAJhqAKhpQABgGAEgHQAFAcAAAhQAABggJBMIAAAEIgCgBg");
	this.shape_4.setTransform(3,16.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#232220").s().p("ABtBtQgrAAgmgGIgBgBQg9gXg2geIAAgCIgYgOIAAgDIAAgGQAGgKgCgQIAAgDQAMABAHAGIABABQBGArBeAPQASADASAAIAAAqIAAADIgDAAgABYgtIgDAAQgUgNAFgmQAJgSAWAIIACABQADAXABAZIAAADIgDABQgDALgGAAQgDAAgEgDg");
	this.shape_5.setTransform(12.45,28.0637);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FDF4D8").s().p("ABACpQhegPhGgqIAAgEQAJhMAAhgQAAghgFgcIAAgDIAAgDQAggyBIAMQAaAEARARQAjAkACBGIADAsIgDAAQgVgIgJARQgFAmAUANIADABQAMAHAEgQIACAAQgCAYAFASIAAADIgCAAQgTgTgSAWQgFAjAPAQIACABQARAKAIgPIACgBIAAgbIAAgDQAFAWgCAdIAAADQgSAAgSgDg");
	this.shape_6.setTransform(13.6786,17.2175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.av_bras_nina, rect = new cjs.Rectangle(0,0,23.8,47.7), [rect]);


(lib.marcillac_sourit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EDAA5D").s().p("AijBDQhOgngShgQB0AbCMgDQCdgCBqgqQgSA6hMAyQhLAxhaAPQgfAFgcAAQg7AAgugWg");
	this.shape.setTransform(44,68.0473);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EDAA5D").s().p("ApIC8QgRgCgPATQgOASgYgFIAAhGQEiAxEigmQFCgqCniKIhvheQhCg5gXg7QCbAZBxBlQBWBNBWCSQgSAAgQAMQgVAQgFACQgPgEgKAOQgKAOgPgEQgKgLgig8QgagtgegOQjaB4kDAwQiGAah5AAQifAAiKgsg");
	this.shape_1.setTransform(67.5,24.3006);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_sourit, rect = new cjs.Rectangle(2,1.2,131,75.9), [rect]);


(lib.marcillac_sourcil2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A19C9C").s().p("AnVCCQANgqATibQAPiAAhg2QDLAYBfASQCfAeBpAtQEIByAhEMQmBhpoqgPg");
	this.shape.setTransform(49,25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_sourcil2, rect = new cjs.Rectangle(2,0,94,50), [rect]);


(lib.marcillac_sourcil1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A19C9C").s().p("AgKC0QingNiEATQgGgrgag3QgfhFgHgWQCghpCyg2QDRhBDUAOQgdBYgeB8IgzDZQjFgdhTgHg");
	this.shape.setTransform(37.975,23.3678);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_sourcil1, rect = new cjs.Rectangle(0,1.8,76,43.3), [rect]);


(lib.marcillac_rit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AnaAJQDVAnEmg/QDFgrD1hcQkVC4jJBHQiCAuhiAAQisAAhHiOg");
	this.shape.setTransform(62.5,45.1143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EDAA5D").s().p("An3EeQgFgkgegxQgfgygEgjQgOgBgYAIQgWAHgUgEQgDgWAEgWIAJgkQEABNE8gxQEggtDHh6QgOgagkggIhDg4QhPhDAQgxQCgAzBkBUQBxBdAvCNQgdgEgcARQgeASgXgBQgRgBgHgeQgHgegTABQiGBRhJArQiEBOhmAoQijBCieAAQh5AAh0gmgAggDoQDIhHEWi4Qj1BbjGArQklBAjVgnQBwDfFnh/g");
	this.shape_1.setTransform(65.4357,32.415);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDAA5D").s().p("AixBCQhPgngNhfQBxAvCdgQQBRgIC8grQgXA7hSAxQhRAxhdAPQggAFgdAAQg9AAgugXg");
	this.shape_2.setTransform(44,81.9086);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_rit, rect = new cjs.Rectangle(-0.1,0,131.2,90.8), [rect]);


(lib.marcillac_oeil2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A48968").s().p("AAEAjQgbgChRgRQALg3BcAEQAlACAeAOQAgAOAHAVQgaAUgzAAIgYgBg");
	this.shape.setTransform(12.2,5.0838);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_oeil2, rect = new cjs.Rectangle(1.7,1.5,21,7.2), [rect]);


(lib.marcillac_oeil1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A48968").s().p("AAIBtQg7gCgbg2Qgfg/AxhhQAagEAbAFIAuAJQBDBggUA8QgRAzg4AAIgFgBgAgpAXQALA/AeAGQAugFgIg9QgFgqgYgpIgdAAQggARALA/g");
	this.shape.setTransform(9.0526,12.8566);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_oeil1, rect = new cjs.Rectangle(0,1.9,18.2,21.9), [rect]);


(lib.marcillac_mollet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383533").s().p("AhRQaQgLgGgJABQBdlpAsp/QAMi0ATl0QATlyAMixQAMLRgjHMQgjHPhlHRIgEAAQgIAAgIgFg");
	this.shape.setTransform(11.1532,143.49);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#43403E").s().p("ABPSaQmPhxm8gjQBmnRAjnPQAjnMgMrRQCbmDE7AHQEbAHB6EYQAuBqAgCmQALA2AjDtQAYCcA1GJQAyFvAeDHQBmKMBvEuQknirmHhvg");
	this.shape_1.setTransform(81.5,145.9679);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_mollet, rect = new cjs.Rectangle(1,0,157,292), [rect]);


(lib.marcillac_maing = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBCC91").s().p("AgbBrQABgGAHgCIAMgCQgqgogog+QgagngqhOQArgOBbAEQBmAEAXgEQAoApAMA7QALA3gTAvQgUAwgqANQgNADgOAAQgnAAgtgbg");
	this.shape.setTransform(102.2267,113.094);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBCC91").s().p("AAfDvQgwgOglgmQAbADARAOQgzhJgwh0Qg2iAgfiLQAVgHA+AHIBhAKIBaCBQA3BIA2AnQAPBLgJBFQgKBLgkAoQhfgNgTgFg");
	this.shape_1.setTransform(79.9092,124.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDAA5D").s().p("Aj0H7Qglh9gcj3QiSgbhoghQAsmrBni7QCdkfFZA/QBoATBbBMQBaBLAzBqQA1BvgGByQgGB9hNBoQAcA2A1BJQBQBrAJAOIgKAAQgYAEhmgEQhbgEgrAOQApBOAaAoQAoA+ArAoIgNACQgHACAAAGIgKAAQg3gng2hHIhbiCIhigKQg9gHgVAHQAfCLA1CCQAwB0AzBJQgQgPgbgDIgKAAQhBhOguh+QgihcgiiaQgigDhOgTQhFgRgxgBQAECrA1CnQAdBdBUC9QhthMg4jAg");
	this.shape_2.setTransform(57.475,78.2088);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBCC91").s().p("ADpGBQg6gHhAgtQg/grgng4QABAxgUAkQgQAcgiAbQi0g4hCjkQgoiLgOlQQBoAhCSAbQAcD3AlB8QA3C/BtBNQhUi9gdhdQg0ingEiqQAxABBEAQQBOATAiAEQAjCaAiBcQAuB8BBBPQAJBxgmA0QgcAlgzAAIgSgBg");
	this.shape_3.setTransform(37.569,124.3796);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_maing, rect = new cjs.Rectangle(1.5,0.7,116.5,162.4), [rect]);


(lib.marcillac_maind = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBCC91").s().p("AgYDIQhIgIgRiZQgFgvgDhRQgBhYgCgWIB/A0QBIAeAyAcQgWAsgYCKQgdBrhBAAIgJAAg");
	this.shape.setTransform(35.1,122.9731);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBCC91").s().p("AiTCPQiBjWAfk9QAqgCAoAZQAyAgASAFQAGAmAJBwQAHBpANA2QAnCwCRAEQAXgLAMgOQAOgSABgbQA9AaAOB2QAMBtgkAtQjyggiCjWg");
	this.shape_1.setTransform(25.2071,134.8833);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDAA5D").s().p("AgYNmQAkgtgMhvQgNh2g9gaQgBAbgOASQgMAOgXALQiSgEgnixQgNg2gHhpQgJhwgGgmQgSgFgyggQgogZgqACQgDmvBbjlQBzkjEVgIQC8gFCZB3QCcB7AMCtQAHByhCCMQgRAlgiBCQgZA3gFAmQgIA0AVBNQAMAsAcBXQAVBKgIAxQgJA+g5AsIAABLQgBArgJAWQgGAQgkACQgoACgIAKQADAsgGArQgFAggMApQgsASg5gPIhZghQgJAJgRAoQgNAigUAHgAkPEOQACBRAGAwQARCZBIAIQBJAHAfhyQAYiLAWgsQgygchIgeIiAg0QACAWABBYg");
	this.shape_2.setTransform(50.1346,86.9649);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_maind, rect = new cjs.Rectangle(0,0,99.7,174), [rect]);


(lib.marcillac_cuisse = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#43403E").s().p("AkkNyQiUhigni+QANoHABjdQABmygZknICMAAIB5ABQBKABAjgMQEegCEHhEQggCgAIDGQAFCGAdDiQAiEJAIBcQAQDJgSCZQgYDRiLCDQh+B4ivATQgdADgdAAQiKAAhwhKg");
	this.shape.setTransform(68.6571,259.9335);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383533").s().p("AhHAIQADktAAhvQgDjjgSiiQAUgGAMAOQANAOAPgCQAFAfgIAUQgIARgTAMQAQgEAuAHQAsAGArALIiLAAQAZEngCGxQAADdgNIIQgnj7AHoZg");
	this.shape_1.setTransform(24.7,239.7704);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#33312F").s().p("AgZCGIgIhRQgFhdAugrQgogCADgtQABgHARhCQALgHAQALQALAIABgMQAOAGgSAMQgWARAGAPQANgTAEAEQAFAFgMAUQgQAGgDgQQgEgQgQAGQgEAVAbAFQAdAEgDAUQgDA5gQBdQgQBngEAuQgHABgCAKIAAAKQAAgdgFgsg");
	this.shape_2.setTransform(114.8699,108.8301);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#33312F").s().p("ABvDsIh4gBQgrgLgsgGQgvgHgQAEQATgMAIgRQAIgUgFgfQgPACgNgOQgMgOgUAGQgZiOgFhhQAMgVADgIQADgMgSgJQANhVALAiQAKAjgOCIQAdAJAGATQAHASgMAhQAKgKALAEQALADAIANQARAAgQgpQgGgPgDABQgEABACAYQgQgDAGgYQAFgaAPAEQASAIACAgQACASgCApQABANgUgCQgdgCgCABIAAAyQAPgPAJAKQAOAQAMgBQgNANADAaQABALAJAeQApACA5gDIBXgHQBigFAuAhQghALhBAAIgLAAg");
	this.shape_3.setTransform(34.7,148.8681);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383533").s().p("AjGMxIhZAHQg4ADgqgCQgIgegCgLQgDgaANgNQgLABgOgQQgKgKgPAPIAAgyQADgBAcACQAUACgBgNQACgpgCgTQgCgggSgIQgPgEgFAaQgGAZAQADQgCgZAEgBQAEgBAFAPQAQAqgRAAQgIgNgKgDQgMgEgKAKQAMgigGgSQgHgTgdgJQAPiIgLgjQgLgigNBVQASAJgDAMQgCAIgNAVQgMh/hDk6Qg5kNgEi9QBXi/CQhsQCdh1DogYQgKAQAAAOQgFgBgPgNQgIgHgMALQABAHAKACIATABIgFAKQgFAFAAAFQgPAFgLgIQgNgJgLACQACAWAggFQApgGAPAJQAKgRgBgNIgKAOQgHAIgMgCQgEgPALgIQANgIAAgJQAWANgDAlQAJgGAEAAQAGgCABAIQAMgEgOgQQgTgVABgJQAcAXAWAbQAFgDACgOQACgNALgKQADABAHAFQAFAEAFAAIgNAMQgJAGACAMQAOAGAKgTQADgGAAABQACABABARQACgPAVABIArAIQA8AMgGguQgIACACAEQABAEAFAAQAAAGgHACIgNACQgFgEgBgJQAAgJgOgIQCgAXBwBVQBnBPBBCFQAHChgbCpQgOBfguDCQADgTgdgFQgcgEAEgWQAQgGAEAQQAEAQAQgGQAMgUgFgEQgEgEgNASQgGgPAWgQQASgNgOgGQgBANgLgIQgQgMgMAHQgRBDgBAHQgDAsApACQgvAsAFBdIAIBSQAFAsAAAcIAAgKQACgKAHgBQAAA8gLB8QgKB1ABBFQkHBEkeACQgughhhAFg");
	this.shape_4.setTransform(62.264,86.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#33312F").s().p("AAPAfQgCgMAIgGIAOgMQgGAAgFgDQgGgFgDgBQgMAJgCANQgBAOgEADQgXgbgbgWQgBAJASAUQAPAQgMAEQgCgIgGACQgDAAgJAGQACgkgWgNQAAAJgNAIQgLAHAEAPQALACAHgIIAMgOQAAANgKARQgPgJgqAGQgfAFgCgWQALgCAMAJQAMAIAPgFQAAgFAEgFIAGgKIgTgBQgKgBgBgHQAMgLAIAHQAPAMAFABQgBgNALgQQArgHA6AGIBsALQANAIABAJQAAAIAGAEIAMgCQAHgCABgGQgFAAgCgDQgBgEAIgCQAGAtg8gMIgsgIQgUgBgCAPQgCgRgBgBQgBgBgDAGQgHAPgKAAIgGgCg");
	this.shape_5.setTransform(69.2273,5.2623);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_cuisse, rect = new cjs.Rectangle(-1.3,2,127.2,353.5), [rect]);


(lib.marcillac_corps = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#524D4A").s().p("AgFAGQADoVgChwQANDrgDGPQgDIKACB7QgMjtACmNg");
	this.shape.setTransform(316.3316,561.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2F2E2C").s().p("AgPBMIgTgBQADghACg/QABgyAEgNQAOgBAKAWQAIAUAbgLIAAAyQAEAggNAXQgJARgVARQgBgHgKgCg");
	this.shape_1.setTransform(105.3985,605.2703);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#43403E").s().p("Ag+gFQAWhcAfgtQAUgLAjATQATAKAjAWIhhB/Qg3BHgvAzIAliYg");
	this.shape_2.setTransform(40.85,321.0832);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CFBEA1").s().p("AiSBsQAOhTAcgxQAQAHAZghQAbgqAMgMQA3g+AbgZQAxguAwgbQgMA4ACA/QADBCARAtQhEAEgxAjQglAcgjA5Ig8BhQgmA2gqAYQAJhrAJgyg");
	this.shape_3.setTransform(90.35,242.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CFBEA1").s().p("AgkBHQhLiIhThGIAAgKQADgGAigmQAWgZABgfQALgYAEgLQAHgVgKgMQBzB/A7BPQBbB5A0B4QgSAvgfAxQgOAVgvA/QhPikgqhPg");
	this.shape_4.setTransform(174.35,245.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#43403E").s().p("AgihOQAegJAUgXQAZgZgagNQALACBGgDQAzgCASANIhkAAQANAJAeANQAZAOACAYQhRAehRBHQgwAphZBXQA8iPBGhWg");
	this.shape_5.setTransform(125.35,216.7371);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CFBEA1").s().p("AB4AyQgUgVgyABQgSgNgyACQhGADgLgCIgoAAQABgHAKgCIATgBQgDgCgVgMQgQgJAAgQQAGgBARgLQANgJAOABIAAAxQBmgSAuADQBTAFASA8g");
	this.shape_6.setTransform(136.85,199.8447);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EDAA5D").s().p("AnWGVQALgogEgiQACgRgMgDQBCilgRjcQgDgngJg/QgNhXgZiFIO+hKQghDhAAA5QABA6gEBRQgEBRACCVQgGAug5AaQhLAjgNANQj+BFiBAhQjpA9iiAHQABgQAMgyg");
	this.shape_7.setTransform(167.3,133.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2F2E2C").s().p("ABOAOQACgbgUgHQgZABAAANQABAUgGAFQgXgMg8AFQgyAEgQgaIAAgUQA8goBNARQBOAQAYA4QgXgHgGANQgEAJADAZQgQgNAEggg");
	this.shape_8.setTransform(96.85,590.8841);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2E3030").s().p("AinABQAahlBBg5QAQAbAygFQA9gFAWANQAGgGgBgVQAAgNAZAAQAUAGgCAdQgEAgAQANQgDgZAFgJQAGgNAWAHQALAQABAsQACAugOAOIAAgyQgbAKgJgTQgKgXgOACQgDAMgCAyQgBA/gEAhIATACQAKABABAHQgGAVgYgBQgGgRgOAPIgUAWQgMACgFgTQgGgRgRAEQgEAug1gHIgzgJQgfgFgUAFIAMAdQAGAMAIAGQhLgzAch0g");
	this.shape_9.setTransform(92.5213,605.6375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2F2E2C").s().p("AhZAfQgLgGgIgQIgLgbQAUgGAfAFIAyAJQA2AIAEguQARgFAFASQAGASAMgBIAUgWQAOgQAGASQgXAxhBAaQgfANgbAAQgiAAgdgTg");
	this.shape_10.setTransform(89.85,619.6933);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2E3030").s().p("AhWCgQhcgRAhhoQAVALAMgyQALgxgYgBQAXgLAbgbQAegfAPgNQAygvAsAdQgMAOgTAAQgWAAgHAGQAPAYA1gDQA2gEAIgbQAoBBglBSQgdBEhAA2QgSASgmAJQgYAGgWAAQgOAAgOgCg");
	this.shape_11.setTransform(104.4698,484.9284);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2F2E2C").s().p("AByA2QAlhSgohBQgIAbg2AEQg0ADgPgYQAHgGAVAAQATAAAMgOQgrgdgzAvQgPANgeAfQgbAbgXALQAYABgLAxQgMAygVgLIAAhjQA6hRAjggQA7g4BNAJQBBAHAbA0QAZAugMBCQgMA+gmAzQgqA1g1AMQBAg2AdhEg");
	this.shape_12.setTransform(106.7973,480.2377);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#33312F").s().p("ABpC+QgQgrgOgRQgHgVgwg7QgkguACg1QgZAOgCgCQADgKAEgWQgugEggglQghgwgTgVQAAgJAGgLQAGgKgCgKQAfAOATAuQgZALAEAHQADAGAYAJQBEAaAQAfQAgAuBFBXQA4BQAWBMIgJAAQgjAAgQgeg");
	this.shape_13.setTransform(61.3481,384.8263);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FCF9EF").s().p("AgFBuQg9gFiZgcQAmguANgcQAWgugDg7QAAgGAHgCIANgCQAOAegbBDQgdBGACAMQCIAXAOABQA7AFAygJQAOANAtgCQA8gDALACQhHAQhQAAQgkAAgmgDgACCBNQgCAIgNABIgXAAQAUgDASgGg");
	this.shape_14.setTransform(211.85,383.1454);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FEF3D5").s().p("AA/DmQgyAJg7gGQgOgBiIgXQgCgLAdhIQAahDgNgeIgNADQgHABAAAGQgJACgBgMIAAgKQBFgCAfAWQBKhlAlgyQBEhYBGgoQgnA6AAA9QABAsAYBEQAhBeAFAVQASBGgMA/QgLgBg9ACIgNABQgiAAgLgLgABBDlIAWAAQAOgBACgJQgSAGgUAEg");
	this.shape_15.setTransform(214.5876,368.8697);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#33312F").s().p("AgmEXQgagjgZgIQADgIAHAEQANAGAHgCQgDgRgagEQglgHgEgCQADgfgegWQgfgYgCgXQASgsA0gkQAvgyA4hHIBgiAQgjgWgTgLQgigTgVAMQABgTgSgOQgVgQgCgLQA2gHBPAeQAtASBRAnQgWA0gsAxQgVAYhAA7QhvBmgbBdQAJAWAaAbQAOAPAfAdQAxA1gUAsQgUgJgcgmg");
	this.shape_16.setTransform(42.85,333.2347);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#33312F").s().p("AiuIJQgHg2AbgaQA0jTBekUQBtk5A2ifQAngRggB1QgIAcgxCOIiEGLQhTD7gsB7g");
	this.shape_17.setTransform(91.3614,304.6922);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FCF9EF").s().p("AgLAAQACiaAUh4QABA/gCDVQgDC2AEBbQgXhsABing");
	this.shape_18.setTransform(70.7123,311.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FEF3D5").s().p("AkHAuQAPlGAsjvQA3gOA3guQA6g3AggZQBSBGBLCJQArBPBPCkQACAJgMABQiTDGhaCJQiFDPhPCxQgQAwgTAgQgXAmggAWQAAmCALjkg");
	this.shape_19.setTransform(155.3643,297.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FCF9EF").s().p("AgLgXQBZiKCTjGQhBBsigD7QiTDihNCGQBPixCGjOg");
	this.shape_20.setTransform(159.35,313.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#33312F").s().p("AgSAhQgvhVgdgbIAAgKQARgEAYgKIAngQQAcAQAdAzQAeA4AWAQQgBAfgWAZQgiAmgDAGQgMgHgphQg");
	this.shape_21.setTransform(151.35,218.825);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FEF3D5").s().p("AimICQgFgRgCgvQgEhbADi2QACjVgBg/QAAhSAUhEQAqgYAmg2IA8hhQAkg5AkgcQAxgkBEgEIAACMQg1CehvE5QhdEVg0DTQgZgGgIgeg");
	this.shape_22.setTransform(89.2269,293.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#33312F").s().p("AiCP7QgNgjgLgDQATnzBIoDQA9m2BrnwQASgFALgVQANgYAIgKIAAAoQh+LHgpEpQhRIvgLGvQgKARgHAAQgGAAgDgJg");
	this.shape_23.setTransform(76.35,528.6199);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#383533").s().p("ABpCPIhah2QhuiKhog9QABgMAJACQAEACAlAHQAaAEADARQgHACgNgGQgHgEgDAIQAZAIAaAkQAcAlAVAJQAUgsgyg1QgfgcgOgQQgagagJgXQBAA6BMBcIByCNQgWgVgvgRQgYgJgCgGQgEgHAYgLQgUgugdgOQACAKgHALQgFALAAAIQASAWAgAuQAhAlAuAEQgEAWgDALQACABAZgOQgDA2AmAvQAwA6AHAVQgpgrg2hFg");
	this.shape_24.setTransform(48.85,372.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#43403E").s().p("EgC7AiCQg5gajhh6QAHrSBLrTQBKrYCGp8QBoA9BuCLIBaB2QA2BFApArQAOARAPArQAUAjApgFQgWhMg5hQQhFhYggguIiCigQhLhchAg6QAbhdBwhnQA/g7AVgXQAsgyAWg0QhRgngtgSQhPgeg2AHQiUgoBSilQAbg2A+hWQBLhpALgUQBChtAggzQA3hYAug4QB3iRCYgpQgOAqhAB+QgyBlgMBRQgcAygOBTQgJAygJBrQgUBEAABSQgVB4gCCbQgBCnAYBsQACAvAEARQAJAeAZAGQgbAZAHA3QAKCYA8EgQAJApATA3IAdBWQAdBZgaAnQhsHvg9G2QhIIEgTH0IgCCpIACCrQihgZimhNg");
	this.shape_25.setTransform(46.85,432.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C2B2A").s().p("AAsAHQgdgygcgQIgnAQQgYAKgRAEIgUAAQAKgRAggLQAmgNAKgJIAdAAQAUAMAeAhQAfAhATALQANAMgIAWQgEAMgLAYQgVgQgfg5g");
	this.shape_26.setTransform(151.2406,212.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#383533").s().p("Ai4C4IgFgxIgKAAQgRgtgDhCQgCg+AMg4QgDgMAHgEQAEgDAMgBQAJAAAKgFQALgGAKABIgJAkQgEAWADAWQAQgOAjgxQAegrAdgOQhGBXg8COQBZhWAvgpQBShIBRgeQgDgYgZgOQgegNgMgJIBkAAQAygBAUAVQgKAJgmANQghALgJARIAUAAIAAAKQiYBChBA9QhiBcgECWQgKgOgFgbg");
	this.shape_27.setTransform(126.8602,225.3201);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#33312F").s().p("AhGAzIAJgkQgJgBgLAGQgLAFgJAAQAsgtAXgWQAogmAqgOIAoAAQAaANgZAZQgVAXgeAJQgcAOgdAqQgjAxgRAOQgDgWAEgWg");
	this.shape_28.setTransform(118.0128,211.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#33312F").s().p("AiELFQAMgQgEgIQgHABgGAGQgDADgEAKQgGgFgRgXQgMgRgPgFQhFhtgWgpQgvhXgWhTQBZgsCdgVQBfgNDQgMQALhaAJiVIAPj9QAXk3A0imIAKAAQAVADAAAuQAAAvATAEQguC1gWD2QgRDAgFEYQhPAyiwALQhfAFguADQhQAGg1APQABApAaAzQAcA4AFAgQAFAVASAYQALAOAXAaQAoAygRAtQgRgEAJgMg");
	this.shape_29.setTransform(213.35,275.325);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#33312F").s().p("Ao0HPQBNhsCEhrQBchLCnhtQDaiOAzglQCVhpBdhgQAeAAAVgcQAbgkAMgGQAAgQgNgPQgPgRgCgMQAFgJADgDQAEgGAIgCQgDAPAiAXQAkAaADAaQgOAqg4AmQhAAsgQAaIAAAKQhuBpkeCsQkpCzh0BnQgbAZgrA/QggAkgpAAQgNAAgOgEg");
	this.shape_30.setTransform(154.35,393.4892);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#383533").s().p("AgSBzIAigtQgKgagigiQgjgkgKgXQAOAFANASQARAWAGAEQAEgJADgDQAFgFAIgCQADAIgLAPQgJANARADQAQgsgngyQgYgagKgOQgSgYgFgVIBlCCQAtA8AVArQgJgNgSgNQgigXADgPQgIABgFAHQgDADgEAJQACAMAOAQQAOAQAAAQQgNAGgZAjQgVAdgeAAQANgPAWgeg");
	this.shape_31.setTransform(201.2875,345.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#43403E").s().p("EgTSAmbQgRhagCiCIgBjwQALmwBRovQAqkqB+rGQAzhpCDjQQB8jHA2h2Qi1DsipFOQhThcgjjRQgLg6gPh/QgPh7gLg9QAsh7BTj7ICFmMQAxiOAIgcQAgh1gnARIAAiMIAKAAIAFAyQAFAaAKAOQAFiWBhhcQBBg+CZhCQAdAcAvBWQAqBQAMAGIAAAKQggAZg6A3Qg3Aug3AOQgrDvgQFHQgLDkAAGCQAggWAXgmQATggAQgwQBNiGCTjjQChj7BBhsQAMgBgCgJQAvg+AOgWQAegxASgvQARgcBciJQBEhlAhhKQA0hCAahzQAThTANiRQAZA9AyAxQAoApBBAnQg0CmgXE2IgPD/QgJCVgLBZQjRANhfANQicAVhZArQAWBTAvBYQAWApBEBsQALAYAiAkQAjAjAKAZIgjAuQgWAdgNAPQhcBgiVBpQgzAljbCPQinBthcBLQiEBrhNBrQA6AQAqgwQArg/AbgYQB0hnEqizQEeitBthpQABAMAJgCQADA8gWAvQgNAbglAuQCYAdA9AFQB8ALBmgZQAMg/gRhGQgFgVgihfQgYhEAAgsQgBg9Ang6QhFAohEBYQgnAyhKBmQgegWhGACQAQgaBAgsQA4gmAOgqQgSgxg8hQIhmiDQgFgggbg3Qgag0gBgpQA0gOBQgGQAugEBggEQCwgLBPgzQAFkYARjAQAWj2Aui2QBTBDB6AaQBsAXCdgGQCTUnA1WMQACBwgEIWQgCGNAODtIAAAKQqNDunoBuQp2CPpVAAIh5gBgAwoYrIAAAUQhBA5gaBnQgdB3BQAzQA0AkBGgeQBBgaAXgyQAXAAAHgUQAWgRAKgRQAMgXgEghQAOgOgCguQgBgrgLgRQgYg5hOgQQgXgFgVAAQg0AAgqAcgAuZF4QgjAhg6BQIAABkQggBoBbARQAjAHAngKQAngKASgSQA2gLApg2QAngyALhAQAMhCgZguQgbgzhBgIIgVgBQhBAAgzAwg");
	this.shape_32.setTransform(191.35,429.8738);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#383533").s().p("Az0EIQgCgQAEhVQAChAgOgZIgCiqIACipQALACANAjQAIAWASgdIABDvQACCCARBaQKOAQK2ieQHohtKNjuIAAAoQp5D0oaB0QpcCDpfAAQhUAAhTgCg");
	this.shape_33.setTransform(188.75,653.374);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#383533").s().p("AiOD3IgdhWQgTg3gJgpQg8kfgKiYIAUAAQALA9APB7QAPB/ALA6QAjDQBTBcQColNC1jsQg2B2h8DFQiCDRgzBpIAAgoQgIALgNAXQgLAVgSAFQAagngdhZg");
	this.shape_34.setTransform(100.85,394.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FEF3D5").s().p("AAtk/QANgDAzgJQAcgFASgNQAMADgCARQhFAKgFBRQgEBGAmA7QADAFAOArQAKAdAXADQAAAQAQAJQAVAMADACIgTABQgKACgBAHQgqAOgpAmQgXAWgsAuQgMABgEADQgGAEACAMQgvAbgxAuQgbAZg4A+QgMADgOALIgYAQQCnlnBck2g");
	this.shape_35.setTransform(104.35,199.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FBCC91").s().p("Al+CEQgOgqgDgFQALgHABggQACggAGgJQCigGDpg9QCCghD+hFQh+BkjGBPQiBA2j2BMQgOgBgNAIQgRAMgGABQgXgDgKgeg");
	this.shape_36.setTransform(156.85,180.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FEF3D5").s().p("AA0EqQg7hQh1iAQgUgMgeghQgeghgUgMQgSg8hTgFQgugDhnATIAAgyQD2hMCCg1QDEhRB/hkQAMgNBLgjQA5gaAGguQAIAWAegLIA0gVQgBBEAGCGQAFCMAAA/QgBDkhFBqQghBKhEBkQhcCJgRAdQg0h5hbh5g");
	this.shape_37.setTransform(174.375,204.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#CFBEA1").s().p("AgkgSQAEhRBFgKQAEAigKAoQgNAxgBAQQgHAJgBAgQgCAggJAHQgmg7AEhFg");
	this.shape_38.setTransform(117.1985,177.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_corps, rect = new cjs.Rectangle(-0.1,86.7,317.2,593.4), [rect]);


(lib.marcillac_chaussure = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C2B2A").s().p("AsYElQAJgjAdgmQCyjuHdibQGZiGHlggQoyBokdBmQmcCRkYECQARAsgbAaIgEAAQgtAAALgvg");
	this.shape.setTransform(81.501,72.456);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#33312F").s().p("A3MG9QAbgagRgsQEYkCGciRQEehmIxhoQCviwCWhHQDehrDzBAQEEBEC3ElQCqERARE7QhhABkDASQjcAQiQgFQgHgbgBhLQgChGgKgcQhWAUhBBKQgbAfhIBzQhiAEmOAZQlFAUjKAEIhyABQoYAAkyhog");
	this.shape_1.setTransform(154.525,61.959);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_chaussure, rect = new cjs.Rectangle(2,7.1,301,109.8), [rect]);


(lib.marcillac_bras = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383533").s().p("AgLgHQABmpgnjFQA/APAXDCQAMBpABDYQABDZgLDJQgLDagTBdQgXiuACnPg");
	this.shape.setTransform(15.2543,197.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#43403E").s().p("Ai4V7QiXhjg2jIQAUhdALjaQAKjJgBjaQAAjYgNhpQgWjBhBgPQhMhlgUjAQgSixAhjPQAgjMBGieQBLipBeg+QDIiCBqDMQAlBHAiCCQAUBJAgCEQBiFcA9ESQBGE0AzFJQATB3AzDsQAnDOgJB3QgPDNiACEQh2B6ioAUQgfAEgeAAQiEAAhwhKg");
	this.shape_1.setTransform(55.2127,150.2937);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_bras, rect = new cjs.Rectangle(0,2.6,110.4,295.4), [rect]);


(lib.marcillac_avt_bras = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#43403E").s().p("AgHSaQkfggjZhgQhEgogSg6QgOgvAThEQAHgcAmhgQAehNAGguQBCoBAVjZQArnVgejbQAeiKBehfQBZhXB7geQB6gdB3AlQB+AnBWBnQBvCEAbEkQAHBOAIC5QAICyAJBfQAuG8AHDUQANFpg4DJQieAqi7AAQhqAAhygOg");
	this.shape.setTransform(68.1587,119.1552);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383533").s().p("Ag5OGQg3gdgcgNQBylHBAoRQAWi1AakgIArnaQAeDbgsHVQgUDbhCIAQgGAtgeBOQglBfgIAcQgTBEAPAwQARA6BEAoQglgNgxgZg");
	this.shape_1.setTransform(14.1122,130.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_avt_bras, rect = new cjs.Rectangle(0,0,128.6,238.3), [rect]);


(lib.yeux_enrique_move = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sourcils
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C18A3C").s().p("AAzC2QiVgIiAAIQgTAHgfADIgzAFIACgqQAOg4Aeh8IAti0IBEAKQAmAHAdAJQBaAeApAPQBKAbA4AbQAfARAnAcIBDAyQADAZAOBGQAMA8ACAkQidgSh4gGg");
	this.shape.setTransform(17.2873,3.7612,0.183,0.183);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C18A3C").s().p("AgiCjQhWgFhJgOQgBiQAAhxQAtgCBHgMQBdgQAVgDIA7gKQAkgHAYAAQASADAKATQAIAPACAWQACAjgBBBQgBBEABAeIAAAWQAAANgFAHQgJAOgVAGIgjAGQgvACgqAAQgkAAghgBg");
	this.shape_1.setTransform(3.8792,6.239,0.198,0.198);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(220));

	// Calque_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5D472D").s().p("AgCAcQgFAAgDgGIgEgJQgFgPAJgTQAEgFACAAQAKgCAFAGQAFAHABAJQAAAIgEAJIgFALQgEAGgEAAIgCAAg");
	this.shape_2.setTransform(14.2666,9.1317);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5D472D").s().p("AgBAVQgEABgDgFIgDgHQgEgLAIgPQACgEACAAQAIgCADAFQAEAFABAIQAAAGgDAGIgEAJQgDAFgDAAIgBgBg");
	this.shape_3.setTransform(4.009,10.6146);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5D472D").s().p("AgDAGIgNgBIgFgCQgIgDAOgEIAJgBQAPgBAHABQAHACABADQABABgFABIgJADIgKACIgEgBg");
	this.shape_4.setTransform(14.3019,9.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5D472D").s().p("AgDAIQgGABgEgCIgFgDQgHgEAMgGIAIgCQANAAAGACQAHACAAADQABACgFADIgHADQgEACgGAAIgDgBg");
	this.shape_5.setTransform(3.9077,9.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},24).to({state:[{t:this.shape_3},{t:this.shape_2}]},11).wait(185));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,23.3,12.8);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(0,0,23.3,10.7), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(0,0,23.3,12.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.main2_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAA95B").s().p("AG1JjQgZg1gXgnQgTgkg5h/Qgthlgmg5IhriaQhChegmg8QgVgngvg5Qg5hGgQgXQgTgbgtghQg0gngQgSQgYgZhBg4Qg6gygdgiQgTgXgRgiQgJgTgRgqIAUgGQAbAEA3AGQAxAHAfAOIBqAxQAVAKAXAUIAmAlQAVAVAsAeQAvAfASARQA4AvA2BTQANAUAoAuQAkAqAPAbQAKATASAmIAdA6IAzBaQAdA1AMApQAEAPAaBIQATA0ADAkQAEA9AiBHQAEAYgBAuQgCAwAEAXQAPANAMAIIAAAIQADA1gSBIIgphgg");
	this.shape.setTransform(292.3959,357.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FECB8E").s().p("EgB1AsZIhZgBQgXACgkgQQgogSgTgBQgxgGgngbQgdgHgOgFQgYgIgPgMIhDgwQgngbgfgSIg9gtQglgbgbgQQghgUgkglIg7hDQgYgbgegpIg0hGIgqgDIgBAkIgkAlIgDAgIhOBPIgBA5Qg7BKgdAhQgzA7gtApQgLANgWAGIgnAIQgVAEgbAMIguAVQhmgNg2hBIgtgCQgrgxgtgnIgCgvQgegahWhVIgBhQQhBhEgtgmIgBhKQhEhQgEhmIgmgoIgMhhQgCgQgOgmQgMgigBgVIgHhaQgEg1ABglQABgggJgwIgPhQQgIg7ABh4QABh4gIg8QgCgbgBhTQgBhFgHgpQgDhiABixQABjBgChTQgIgtAFg/IALhsQAGiGAgifQAShKgDhCQgCgbARgwQASgyAAgZQAAggAIgqIAQhJQAFg3AEgXQAGgsAMghQAXgiAIg0QADgWAEhFIAcgZIABguQADgZAJgSQAcg6ADgpIAkgsIgFggQgDgTADgNQAIgNAaghQgEhDApguQgBgZAYgoQAYgoAAgYIAZgcQACgZATgmQAVgrAEgSQAGgVAagkQABguApgjIAEgvQAigdAHg6IAXgfQAMgjAhhAQAhhBAMghQAYgoARgpIAdg7QARglAQgUIAEgsQAegdAPhAQAUgmAFgMQALgdgBgZIBAg2QB7gECIACQAeABA3gUQA4gUAcAAQBUgCCnABIAkgeQCUgEBfABQAgACA3gUQA6gTAcgBQBagCCzAAIgQALQghAEhUAAQhMAAgrAHQgSADg4AOQguALgcACQgcAChEgBQg9gBgjAEQgbADg1AOQg0ANgbADQggAEhFgBQhBgBgjAEQgaADg6APQg2AOgfACQhaAAgsACQhQACg1AOQguAMgKAeQhHDHiSEiQg/B+hfDXQhyEBgpBWQgRAjgZBLQgZBLgSAkIBNACQAsgBAfgMQAegMA9gMQA+gMAdgLQAlgOA2AAIBdABIGzABQD/AACzgCQAYAAAdAIQAPAEAkANQAXAIAvAAQAvAAAWAIIBuAoQBDAYAqARQgSAqg1ArQgTAQgQAoQgRAsgNAPQgPALgYAMIgpAUQgQAIgYAUQgcAXgLAHIgwAXQgfAOgQAJQgaAOhVAnQhGAfgmAbIACBJQADArAJAeQAMAlAsBRQAoBLALAuQAZBQAeCCQAnCoALAqQAGAggBBZQAABMARAqQASAwAAA0QgBA0gUAvQgNAeAAA4QAAA9gIAZIgsCZQgJAggZAkIgvA+QgKAOgQAdQgRAegKANQgNALgjAQQghAPgOANQgRAOgdAhQgcAbgcADIhKAHQgsAEgfgBQgcgMgmgSIhBgiQgCgKAAgOIABgYIgngkQgYgVgOgQQgUgWgTgmQgTgtgKgVIgphXQgYgzgVgjQgNgYgLgiIgTg7QgGgTgRgjQgSgjgGgSQgbhXguiKIhLjhQgJgcgHg9QgHg8gLgeQgSgwgFhKQgBgZgOgpQgOgugDgTIgFguQgDgdgEgRQgDgQgPgnQgOgjgDgWQgBgUAEgbIAIgvIgygGQgdgDgUgDQgBAdADBHQAEBAgEAkQgEArAFBIQAGBTgBAgQABAWgEAmQgEApAAASQAAAUAJAbIARAtQAIAZABAnIACA/QABAYANAlQAQAsADAQQAEATABAdIABAwQABAaAOAuQAOAxACAXQACAdAPAnIAcBAQATBAAoBSQAXAwAxBdQALAZATA9QARA4AQAdQBWBWAfBtQAjAhALAPQAJAMAKAdQAKAcAKAMQATAOAuARQAtARAUAPQAPAKAMAUIASAlIBGANIgEB3QgCBFAAAxQABAggPA4QgPA7gCAcIgMELQgCAugjBbQghBXAAAyQAmgaAcgwQARgeAYg9IA9gCQAUgyArg6QAhgzAUheQAZh2AMghQAOglgCg9QgBhZABgMQABgUAJgfIAOgzQAFgbACgjIACg9IBlAAQAlhaA+g4QCbiRBFiPQAIgTAOgrQAOgoAJgWQAKgXAHgrQAIgwAGgTIAihrQAwATAgA3QATAiAVBFQAHAiAdA8QAeA9AHAgQAHAiAgBAQAeA+AHAkQALA5AeBUQArB5AGASQAZBLATBlIAcCzQAGAsADA7IAFBnIAdAAQABg1ADgWQAFgqAPgfQANgdAMgzQAPhAAGgSQASgzgChSIgCiGQAEgugVhVQgVhYACgrQACghgRg0QgTg+gDgVQgFghgEgRQgHgbgMgUQghg6gdhgQgKgigcgqQgigugPgZQgOgWglg3QghgxgRgeQgWglgogqIhJhHIglgkQgVgWgIgVQgIgsgDiNQgDhzgXhCQgFgSgMg7QgJgxgLgcQgGgRgMg9QgKgxgPgaIhCh3QAfAEBRAaQBGAWAsgBQAsgBA/AbQAXALAiACIA5ACQAXACAkAOQAoAQARADQAUAEAlgBQAogBARACQAUADAhAMQAkAOARADQARADAcABQAhABAMABQARADAhAMQAgAMASACQAUADAtABQArABAXADIA5AEQAhAAAVgOQA2ghBAg7QAvguAjhLQAVgtAfheQAUg5ADhMQABgrgFhdQgCgogahBQgdhJgFggQgGghgRg0IgbhVQg/jWhVixQgRgigphJQgohFgSgmQgvheg0g/QhBhNhQgkQgqgRg6gnIhghBQgdgSgGgHQgSgRACgVQgCgxABipQACiHgKhTQAdAUgCAjIAADJQgBB9ACBLQAhAPA7ArQA5AqAiAPQBZAsA5AsQBKA6AjBGQAYAlAJARQARAeAIAbQBEBvAnBMQA2BpAdBeQAPAWALAuQAMAxANAUQANAWAIAmQAJA0AEALQAFAMATAmQAQAeADAVQADAMACAYQACAYADAMQAEANAQAfQANAcADASQAIAlAHBNQAHAugFA3QgDApgNA7QgeBsgiBEQgtBchDA3QhEAzgdAhQgOAOgqAaQgmAXgPAVQAUAOAgACQASABAlAAQAdAAAnAKIBCATQAXAGA+ADQA3ADAdANQAcANBOAIQBFAIAhAZIApAEQARAQAbAMQAOAGAjAMQAyAXAoAPIBhA0QAdAUA8A1QA4AyAiAXQAgAXAoAoIBDBDIBAA/QAjAlATAgQBYCaAiBJQAGARALA8QAJAwARAaQgKAVgNAmQgPAsgHAPQgKAYgYASQgRANgeAPIhAAjQgnAUgfADQgXADg8ANQg1AMgfABIhTAGQg0ADgfAAQgaAAheAJQhKAHgugJQhegTg9AEIgggfIhDAAIgDBDQgihGgEg+QgDgkgTg0QgahIgEgOQgMgqgdg1IgzhbIgdg5QgSgngKgTQgPgbgkgqQgogtgNgVQg2hSg4gwQgTgRgvgfQgsgegVgUIgmgmQgXgUgVgKIhqgwQgfgPgxgHQg3gGgbgEIgUAGQARAqAJAUQARAhATAXQAdAiA6AyQBBA5AYAZQAQASA0AmQAtAhATAcQAQAWA5BGQAvA5AWAnQAmA8BCBfIBrCaQAmA5AtBmQA5B/ATAjQAXAnAZA1IApBgQAShIgDg0IAUgCIgGBQQgEAzgBAdIAnAdQABAqAGA6IAMBkQAFArgHA1QgEAZgOBGQgOASgYAxQgWAtgTAUQhKBThFAaQggAEgwAAIhQgBQgfACgygUQg3gWgZgCIg8gGQgigGgYgMQgRgJgrgFQgpgEgTgNQgggTgpgIQgegkgRgQQgcgegcgNQgXA0ACA+QgCAtABBbQgBBRgMA2QgFAVgMArQgJAmABAbQAAAvgCAVQgDAmgLAdQgEAJgOA+QgJAsgWAVQgwA5gdAbQgwAqgwAQQgdAEgqAAIgRAAg");
	this.shape_1.setTransform(223.7539,285.0333);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EAA95B").s().p("EgKmAnJQAjhbACguIAMkLQACgcAPg7QAPg4gBggQAAgxAChFIAEh3IhGgNIgSglQgMgUgPgKQgUgPgtgRQgugRgTgOQgKgMgKgcQgKgdgJgMQgLgPgjghQgfhthWhWQgQgdgRg4QgTg9gLgZQgxhdgXgwQgohSgThAIgchAQgPgngCgdQgCgXgOgxQgOgugBgaIgBgwQgBgdgEgTQgDgQgQgsQgNglgBgYIgChAQgBgngIgZIgRgtQgJgbAAgUQAAgSAEgoQAEgmgBgWQABgggGhTQgFhIAEgrQAEgkgEhAQgDhHABgdQAUADAdADIAyAGIgIAvQgEAbABAUQADAWAOAjQAPAnADAQQAEARADAdIAFAuQADATAOAuQAOApABAZQAFBJASAwQALAeAHA8QAHA+AJAcIBLDhQAuCKAbBXQAGASASAjQARAjAGATIATA7QALAiANAYQAVAjAYAzIApBXQAKAVATAtQATAmAUAWQAOAQAYAVIAnAkIgBAYQAAAOACAKIBBAiQAmASAcAMQAfABAsgEIBKgHQAcgDAcgbQAdghARgOQAOgNAhgPQAjgQANgLQAKgNARgeQAQgdAKgOIAvg+QAZgkAJggIAsiZQAIgZAAg9QAAg4ANgeQATgvABg0QAAg0gRgwQgRgqAAhMQABhZgGggQgLgqgnipQgeiBgZhQQgLgugohLQgshRgMglQgJgegDgrIgChJQAmgbBGgfQBVgnAagOQAQgJAegOIAwgXQALgHAcgXQAYgUAQgIIApgUQAYgMAPgLQANgPARgsQAQgoATgQQA1grASgqQgqgRhDgYIhugoQgWgIgvAAQgvAAgWgIQgkgNgPgEQgdgIgYAAQizACj/AAImzgBIhdgBQg2AAglAOQgdALg+AMQg9AMgeAMQgfAMgsABIhNgCQASgkAZhLQAZhLARgjQAphWBykBQBfjXA/h+QCSkiBHjHQAKgeAugMQA1gOBQgCQAsgCBaAAQAfgCA2gOQA6gPAagDQAjgEBBABQBFABAggEQAbgDA0gNQA1gOAbgDQAigEA9ABQBEABAcgCQAcgCAugLQA4gOASgDQArgHBMAAQBVAAAhgEIAQgLQALgHAWgTIAegBIABAJQAKBTgCCHQgBCpACAxQgCAVASARQAGAHAdASIBgBBQA6AnAqARQBQAkBBBNQA0A/AvBeQASAmAoBFQApBJARAiQBVCxA/DWIAbBVQARA0AGAhQAFAgAdBJQAaBBACAoQAFBdgBArQgDBMgUA5QgfBegVAtQgjBLgvAuQhAA7g2AhQgVAOghAAIg5gEQgXgDgrgBQgtgBgUgDQgSgCgggMQghgMgRgDQgMgBghgBQgcgBgRgDQgRgDgkgOQghgMgUgDQgRgCgoABQglABgUgEQgRgDgogQQgkgOgXgCIg6gCQgigCgXgLQg/gbgsABQgsABhGgWQhRgagfgEIBCB3QAPAaAKAxQAMA9AGARQALAcAJAwQAMA7AFASQAXBCADB0QADCNAIAsQAIAVAVAWIAlAkIBJBHQAoAqAWAlQARAeAiAxQAlA3AOAWQAPAZAiAuQAcAqAKAiQAdBgAhA6QAMAUAHAbQAEARAFAhQADAVATA+QARA0gCAhQgCArAVBYQAVBVgEAuIACCGQACBSgSAzQgGASgPBAQgMAzgNAdQgPAfgFAqQgDAWgBA1IgdAAIgFhnQgDg7gGgsIgcizQgThlgZhLQgGgSgrh5QgehUgLg5QgHgkgfg+QgghAgHgiQgHgggeg9Qgdg8gHgiQgVhFgTgiQggg3gwgTIgiBrQgGATgIAwQgHArgKAXQgJAWgOAoQgOArgIATQhFCPiaCRQg+A4glBaIhlAAIgCA9QgCAjgFAbIgOAzQgJAfgBAUQgBAMABBZQACA9gOAlQgMAhgZB2QgUBeghAzQgrA6gUAyIg9ACQgYA9gRAeQgcAwgmAaQAAgyAhhXg");
	this.shape_2.setTransform(180.5673,264.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.main2_gd, rect = new cjs.Rectangle(0,0,447.5,569.1), [rect]);


(lib.main_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9A85A").s().p("ACFDeQgSgIgbgTQhWg3hJhkQg3hLgYgyQgkhLADhFIAggBQAmA9AdBJQAPAqAoAzIBDBUQAZAjAtArIBMBHIgJABQgUAAgWgJg");
	this.shape.setTransform(54.5345,105.3232);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E9A85A").s().p("ABCEMQgVgYgPgLQgWgOgLgiQgKgngHgSQg+ixgQiEQgIg1AZhFIArABQADAVAEBQQADA9AKAmQAuCyAMA1QAIAlAUAzIAhBXQgLgKgYgag");
	this.shape_1.setTransform(27.4922,111.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E9A85A").s().p("ABsCBQhZgShghBQg7gxgZgcQgugwgMgyQA4AJAeAgQBPBGBBAuQAkAcBBAWIBrAlQg2APgnAAIgSgBg");
	this.shape_2.setTransform(76.6,93.344);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCB8D").s().p("AhWHsQgdgTgngdIhCgyIAAAAIgihWQgUg0gIgkQgLg2gwiyQgKglgDg+QgEhQgDgUIgrgBQgZBFAJA1QAPCDA+CxQAHATALAnQAMAhAWAPIgCAvQgNAOgVAqQgTAlgTAQIgzgBQg7grgjg0IgEgVIgZgbQgshkgJiRIgEj7QgDhMAOhdQAIg4AYhvQBegJBNAAQBnABDeAAQDTgBBxABQgDAlgUApQgJATghA0QBwAkBEAfQBfAtBCA6QAeAfAOAnQAPAqgIAoQgGAXgZAMQgNAGghAJIhAALQgmAFgbgIIhrgkQhBgXgkgbQhDgwhOhFQgfghg2gIQAMAxAsAxQAaAbA7AzQBgBABaASQAOAsAZAsQAIAugIAkQgKAsgiAWQgUARgggFIg3gOIgPAEIgSgRIhMhIQgtgqgYgjIhEhVQgogygPgqQgdhJgmg9IggAAQgDBFAkBLQAYAzA3BLQBKBkBVA2IADAeIARARQgEAhgEBBQgGA6gSAlQgLAggkAIQgJACgJAAQgYAAgVgOg");
	this.shape_3.setTransform(59.7012,102.3698);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E9A85A").s().p("AlBASIBsjvIGOgpIADB6QAUAOAsAaQAkAYARAdQBGB1AaBxIANApIgIAgQhwgCjVABQjcABhngBQhNgBheAJQAbhmBBiPg");
	this.shape_4.setTransform(45.75,26.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.main_gd, rect = new cjs.Rectangle(0,0,119.4,153), [rect]);


(lib.cuisse_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5D544E").s().p("AigOhQhng3g/hxQg5hpgIh8QgBh5AHizQAHgqAEhdQAEhYAJguIADhSQACgxAJggQgFghAJgyIANhTIAUjOQALh7AFhTQAFgZADhHQACg9ALgjIgNDyQgJCLgQBmIgLCDQgHBPgNAzQClANFKATIBhAJQA5ADAogIQgFA8ADA0QAKATgBAfIgBAxIgBBfQgBA5AKAlQACAWAAArQAUBSAABpQAHArACAbQACAngFAfQgXBlgxBPQg3BZhQAwQhMAxheADIgMAAQhXAAhJgqg");
	this.shape.setTransform(39.2328,142.8345);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#433D38").s().p("ADsJtIhhgJQlKgTimgNQAOgzAGhPIAMiDQAPhmAJiLIAOjxQACgUAJgrQAIgpADgWIAHgzQAEgdAKgTQBGiWBwg5QAzgbA8ACQA8ACAyAdQB1BDBFCpQAPAhgDA0IgFBXQABA+gIB7QgHB7AAA+QgCAtAABLIAAB4QgBAfACA/QABA4gFAlQgdAGglAAIgfgBg");
	this.shape_1.setTransform(40.6679,62.1471);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cuisse_gd, rect = new cjs.Rectangle(0,0,78.5,239.9), [rect]);


(lib.mollet_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5D544E").s().p("AIiSJIgygUIgygUQgWgJghgJIg3gQQhSgWhjgcQgagFhHgVQg7gRgkgHQhFgIibgVQiQgUhPgIIhAgHQgngEgZgIIAEg5QAFiwgLkrQgNldAAh9QgGhqABifIADkJIACh1QADhCANgxQAXhfA2hMQA6hSBRgrQA+gjBKgGQBKgFBEAZQBGAaA4A1QA4A1AiBEQAVAwANBLIAVB9QABAaAIBEQAHA8gBAjQAIAgALBWQAKBMAQApQAAAbgBAgIAJAPQANA5ACAyIAOAwQAIAdAAAVIAPBEIATAoIASBgQAMA2ARAnQANAkANBEQAFAXAJAtQAIApAMAaQAiB8ApBfQALA4AZBOIAtCEQAIAZAeAuIAYAoIAIArQAGAbABAQg");
	this.shape.setTransform(63.3359,109.3004);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mollet_gd, rect = new cjs.Rectangle(0,-10.2,126.7,239.1), [rect]);


(lib.corps_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB65E").s().p("AlcBvIgfgeQCAghCag1QDnhRD2hxIgIASQggAPgYAcQgVAXgSAmQgYAxglA1Qh0A9hzAqQijA8iJAMg");
	this.shape.setTransform(157.8027,46.9396,1.0869,1.0869);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCA8C").s().p("AkJhFQCJgMCig8QB0gqB0g9QggAugxA8QgjAqgwAzIhYBYIg0AyQgfAdgQAbQgHAYgVAbIgkAtg");
	this.shape_1.setTransform(152.368,76.2871,1.0869,1.0869);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#49433D").s().p("AgSAfQgGgHgBgKIgBgSQAAgiAcAEQARAKAFAIQAHAMgIASQgIARgJAEIgGABQgHAAgLgFg");
	this.shape_2.setTransform(220.08,126.8405,1.0869,1.0869);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#433D38").s().p("AgrDdQADh3AEhSIALi0QAGhqABhLQAAgwATgfQAiAYAMAnQgWCpACC8QgJAIAAANIAAAXIAADgQgCBRg/BIIAEjIg");
	this.shape_3.setTransform(230.5737,64.0047,1.0869,1.0869);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5D544E").s().p("AhPDYQgVixAMiOIAAhbQABg2AKgjQAXhMA1iFIAIgYQAHgMAMgEQASAKASAYIAfAmQACAkgDAwIgGBTQgFBPgHCuQgGCkgHBYQgCAVAAAcIABAxQAAAugPAaQgHAdgEAhQgDAfgCAFQgHAUgXADIgNAQQgIAKgIAEQgmjVgLhog");
	this.shape_4.setTransform(220.5156,68.2981,1.0869,1.0869);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5D544E").s().p("AC0FQQgFgggFgQQgPgygxguQg7gxgagbQgRgRgzAMQgyANgZAZIgcAdIggAmIAAjtQgPgVgBgfQACglAAgSQABgfAFg/QAFg/AAgfQABgtAXgSQAmAfBGBHQBFBGAmAgQAoAiAWAgQAZAlANAwQAVBRAKB4IAODLQgNgQgGgcg");
	this.shape_5.setTransform(253.3723,66.3959,1.0869,1.0869);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCC1A3").s().p("AggAvQgTgFgEgRQgEgSANgRQAOgUAXgLQAXgJATAEQATAFAEARQAEARgNASQgOAUgXALQgPAGgOAAIgNgBg");
	this.shape_6.setTransform(132.9389,123.9225,1.0869,1.0869);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCC1A3").s().p("AhcGCQgIgGADgPQAGgjAAgRQABgcgHgJQgHgKgbgJQgVgGgngEQgsgDgRgEIgUgEQgdgHgCgGQgCgGAUgYQAsg2BAgyQAxglBMgvQAKgFAFACQAEADADAMQAIAlgCAtQgCAegIA0IgQBlIgBAJQAAAGAEACQAEADAFgEIAHgHQA9gwAxhEQArg6AmhQQBDiNAfi/QACgNgFgDQgDgBgLACIgmAMQgYAHgQAAICNhfQgpDgg3CaQhPDfiXB+QgTAQgiAWIgIAHQgCABgDAAIgEgBg");
	this.shape_7.setTransform(189.3955,59.1343,1.0869,1.0869);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CCC1A3").s().p("AgbIqQAAgPAGgoQAFgmAAgRIABikQABhogBg7QgBgcAFgOQAIgUASgMQAkgXgZgbQgDgCAAgGIgBgKQgMgxgMgeQgRgqgbgdQgJAXgCAnQgCAtgDAPIgGAWQgFANgMACQgNACgKgKQgFgFgLgPQgDgFgDgIIgEgOQgEgKgbgvQgagugGgQIAPh5QADAEAMAfIALAjIANBAQAKAkASAXIAHALQAEAGAIgBQAFgCABgGIABgMIAYh0QAXhoAAhXQAAgVgKgFQgKgFgRAHQglAOgQAkQgFALgLAKQgNANgNADIAZhgQAMgvAFgjQANgBBbAAQA/AAAogIQAegFgFAaQgIAjAHAyIAMBTQALBdAlCFQAGAUAGAFQAJAIASgKQgHAYgVAbQgaAegMAQQgwBBgWAtQggA/gEA+QgCAZAAAUQADAsARBUQAPBMgCAzQgGgBgkAUQggATgJAAIgBgBg");
	this.shape_8.setTransform(121.4988,105.0758,1.0869,1.0869);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FEF4D7").s().p("Am5MfQgNgFgIgMQgGgHgIgRQhCiJguidQgNgsAHglIALgYQgOidAnihQAHiNAZhdIAoiYQAYhXAag+QgBgKgCgIQgEgaATgaIAigrIBVg1QAxggAggcQAYgVAcAKQBjAkBxgNQBVgJB8gqQATgGAogKQAjgKAWgNIATgBIAmAPQATAMgBAZIgDAIIChCOQhLD7hSCwQheDMh6CRQgRAjgfApIg5BFQhFBVhdBZQhHBEhsBbQgnAog3AkQgpAahBAhQgFAIgKAAIgFgBg");
	this.shape_9.setTransform(161.2565,81.1784,1.0869,1.0869);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#5F564F").s().p("ACNLXQgJgCgOgNQjbjLhthnQgbgagZgLQgcgMgiAGQAphYBug3QAZgMAfgbQAsglAIgGQAMgIgEgKQgCgFgMgJQgRgPgngrQgjglgYgQQgMgIgCgHQgCgJAKgMQBgh1BgicQBDhqBli2QAUgkAVgVQAZgaAhgMQAMgFARgJIAcgQQgDAUgOAdQgQAigFAMQgEA9gYBVIgqCPQghCBgJCSQgPA4gFBEQgDAxgBBNQAAAsgRAfQABA7AaBLQAQAsAhBUQALAgAVAuIAjBNQhBADgrAnQgOAMgKAAIgDgBg");
	this.shape_10.setTransform(83.5101,94.209,1.0869,1.0869);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#5D544E").s().p("AgLWMIg2gIQiQgWikhYQgNgHgEgIQgFgIgBgPQgGhrAHh/QAFheAPiMQAdkcAJhEQAXjGAeiXQALg4AijOQAaijAYhkIBRllQAwjWAriNIAtijQAbhjAZg+QAkAjB6BlQBlBSAxA+QAOARgDATQgCAIgKAZQgcA+gvCSQhEDYgyEBQgWB3gZCwIgoEnQgUCKgeE1IgeEpQgOCrABCAIAGEOQgCgkgdgLg");
	this.shape_11.setTransform(53.6884,310.6324,1.0869,1.0869);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#433D38").s().p("AhTBVQgNgSAMgYQAhhEBQhDQALgJAKABQAJABAKAKIASARQAIALgHANQgUAnggAmQgaAegmAlQgEAEgKABIgDAAQgaAAgMgQg");
	this.shape_12.setTransform(111.0045,226.1471,1.0869,1.0869);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#433D38").s().p("AggBoQgNgDgSgNQgcgVANgfQAXg7BGhFQASgRAiAJQALADADALQACAHAAAQQgMBkhHA6QgMAJgNAAIgHAAg");
	this.shape_13.setTransform(92.0231,339.3526,1.0869,1.0869);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#433D38").s().p("ApELqQgVgDgFgUQgCgLAIgGIAQgGQArgOA6gJIBngMQBFgIBpgYICtgmQBxgWBegNQAggEAMgRQAKgQgGggQgRhngXiXQgEgdgQggQgGgMgBgHQgCgLAGgJQAIgKALABQAGABANAEIEDBBQBAAQAMgLQANgLgJhCIgJg2QgFghAAgWIgDkTQgCirAChpQABgmgBhEIABhqQApAVASAqQgKAoABA7IACBjQgFCFAICoQAEBaAODTQABASAHAtQAGApABAYQAAATgHAHQgIAIgVgCQiYgPhggeQgKgDgPgDIgZgEQgWgGgGAHQgGAHAFAYQANA+APBXIAaCVQAGAkgKANQgLAOgnAFQiuAUhVANQgsAHh2AZQhmAVg9AHQgpAEhAALIhoARQgHACgJAAIgQgBg");
	this.shape_14.setTransform(176.1521,103.4547,1.0869,1.0869);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#433D38").s().p("AjeYjIgLg4QgghzACibIAPkQQAGhvASitIAdkcQAGhLAViCQAXiSAHg6QAql3BxmjQAXhVAQgwQAYhIAbg5QAMgZgDgWQgEgUgTgYQghgpgygqQgbgZg/gwQgmgdgRgUQgbgdgLgiQgRgZgqglQgtgogRgVQgMgJgEgGQgJgLAQgMQAsgkA0AoQA7AuAbAfQAoAvBaBLQBdBOAnArQAMANAPgBQAJgBARgJQAigTAPgEQAdgIAZAQIAQgCQAEAUgOAPQgIAIgTANQgeAZgTAoQg/CFgwCgQgnCDgkCtIgDAOQgmBigSCVIgbD9QgLBMgZCaQgUCJgGBgQgFBdgVDIQgUC/gFBmIgMENQgFCYAKB0QACAcgSASQgLAFgHAAQgTAAgEgbg");
	this.shape_15.setTransform(81.3024,305.4435,1.0869,1.0869);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#5D544E").s().p("EgOVAhgIiBgDQgiAAgQgTIgJiEQgEhLACg6QAFirAKibQAOjAARiSQAHhBAMibQALiNALhOQAEggAUh0QARhbADg5QADgwARh5QAOhrACg+QABgTAFgMQAcg6AUhYQAVhkAMgyQA1jUBTi9QARgnASgZQAWggAegUQAOgJAGgPQAJgUAfgQQBHgjBZhNQBqhYBmhkQCLiJBiiVQCRi+BykMQAWg0AZhLIAqiBIAMgiQAJgSARgIQA8AEALBDQAJAbgCAqIgEBEIAACbQAABfACA6IABDIQAAB5APBPQAPBTgZAWQgZAWhTgTQgegHhJgUQhBgRgmgIQgfgHgGAHQgGAGAIAgQAOA/ANBUIAUCUQAFAlgPAUQgOAUgkAFQhdANi2AoQi2AohdANIheAMQg5AJgrANQASAGATgBQALgBATgDQBOgLDsgtQDEgmB3gKQASgCAggGQAigGAQgBQAZgDAKgOQAKgOgEgbIgwkLQgHgvARgQQASgRAzALIBnAZQA9AOArAEIATADQAiACAKgKQAKgKgBgiQgBgRgHgjQgGgigBgSIgLjCQgGh1gChMQgBhBABhpIABirQAAgfAUgTQASgIATAHQAHADAXAQQBCAtAxAvQAkAkA0AeQAqAXANAkQAdBSAOA1QAUBLAEBBQAFBLATDRQARCyADBqIAbINIAaHbIAAAZQAAAPAGAKIAWGVQgEAsAEBFQAHBcAAAUIA1QIQgEAUgQAMQgMAKgXAIQg/AXhlAcQiJAlgeAJQiDAoi3AmIk+A/QhIAOhfALIiqASQhbAJizAJQi3AKhYAJQgmAEgzAAIgogBg");
	this.shape_16.setTransform(180.5792,248.6784,1.0869,1.0869);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.corps_gd, rect = new cjs.Rectangle(10.3,-5.7,290.8,487.6), [rect]);


(lib.chaussure_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#302D2C").s().p("AxIHZQg1gCgbgCQgugDghgKQgoAEgygIQgdgEg8gPIgpgEIgegSIgVgBIgpgfQATgWAogdQAsggAQgQQAmgbBKglQBQgoAggVQEhh6GGiCQAngKCagqQB2ggBMgOQA6gKBzgXQBogTBIgDIFVggQAggCBBABQBBABAhgDQAgg4AqgoQAvgtA3gVQBlgoBuAIQBxAHBbA4QA1AjAsA+QAgAvAjBKIAxCUQAaBVAIBBQADBEAAAXQgCAzgLAnQgXAQghAFQgZAFgkgCIgpALQgYAGgSgEIgqgEQgZAAgQAKQhygFhyAoIgngeIAXhgQANg5ABgoQghAFgTAjQghAOgiAnQgxA5gIAHIgPBNQgQAAgQABQgUAMgpgCQgsgCgTAIIgaAFQgPADgKAEIhKABQgtABgeAFIhMACQgtACgeAIQgpAChpAMQhdALg2AAQgiAJgtgCIhRgIQgWAJgrACQguABgTAGIgZAHQgOADgKgIQgjAKhEgCQhGgBggAHQhogNiwANQgMgDgRACIgcAFQgdgPgiALQgWgCgtABQgnAGggAAQgkAAgdgIg");
	this.shape.setTransform(156.7786,48.1175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.chaussure_gd, rect = new cjs.Rectangle(0,0,313.6,96.3), [rect]);


(lib.brasG_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#413C36").s().p("AnpM0IgCAAQgWgIgwgdQgEgCgCgFQgCgFABgEQB5n3B+qMIAAgBQAOg9AJhlQAMiDAEgiQABgWADgWQAGguAPgrQACgGAGgCQAFgDAGACIAAAAQAGACADAGQACAFgCAGQgOAogGArQgCAUgBAVIAAACQgEAggMCEQgJBogOA/IAAgBQh9KGh4H0QAkAVASAHIABAAIAAAAIABABQDFAyDFgQQAegFBQgEIgBAAQA4gHBYgRICRgaIAhgGQAPgCAKgGIADgCQAEgBADAAQAbAAAlgJIAAAAIA+gPIAQgPIAAABQAJgIAIgFQABgEAEgEQAEgEAGAAIAAAAQAGAAAFAEQAEAFAAAGIAAAIQAAAGgDAEQgEAEgFABQgHACgIAHIAAAAIgVASIgFACIhCAQIAAAAQgmAJgcABQgOAHgTAEIAAAAIgiAGIiQAaQhaARg5AHIgBAAQhPAEgcAFIgBAAQgvAEgwAAQicAAibgog");
	this.shape.setTransform(8.138,63.9782,0.23,0.23,14.9961);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5B524C").s().p("An4OsIgBAAIAAAAIAAAAQgTgIgkgVQB4n0B9qFIAAAAQAOg/AJhnQAMiFAEggIAAgCQABgVADgUQAGgqAOgoQACgGgDgGQgDgFgFgDQASgtAdgsQBJhuBzgtQBPggBaAMQBYANBGA0QBMA2AyBdQAsBRATBnQACAJgCAtQgCAiALASQADAPgDA4QgBAsALAZQACANgBA1QgCApALAXQANBuAAB2QAJATAAAhQAAArACALQAFAoACA2IABBfQAAAiAFBNQAFBFgBAnIAAACIgIAPIAAAdQAJAMAAAUIgEAjQgCAMgEA8QgCAWgDASQgDASgFANQgHAMgBATIAAAIQgGAAgEAFQgEADAAAFQgJAEgJAIIAAAAIgQAOIg+APIAAABQglAIgbAAQgDAAgDACIgDACQgLAFgPADIghAGIiQAaQhZAQg3AHIAAAAQhQAFgdAFQgvADguAAQiXAAiXgmg");
	this.shape_1.setTransform(9.5515,60.822,0.23,0.23,14.9961);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#413C36").s().p("AgTJcQgFgEAAgGQgFg9ALg/IAKh8QAFhKAAgyIAAgDQAFglAChHQAChNAFgjIAAABQAHhHgGhcQgDgkgMiAIAAgBQgBgggMg2QgPhBgCgcIAAAAQgBgLgJhFIAAAAQgCgGADgGQACgFAGgCQAGgCAFACIABABQAFACACAGIACAIQAJBFABALQACAbANA9IAAAAQANA5ABAiQAOCAACAlQAHBegIBJIAAAAQgGAkgBBJIAAABQgCBIgGAmQAAAzgFBLIgKB9IAAABQgKA8AEA6QAAAGgEAFQgDAFgGAAIgBAAIgBAAQgFAAgEgEg");
	this.shape_2.setTransform(8.0464,35.9681,0.23,0.23,8.993);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5C534D").s().p("AAARpQg2gCgxgSQgfgLgegSQh7hKg7iTQgdhLgHhMIAAAAQAHgBAEgEQAEgFAAgGQgEg6AKg8IAAgBIAKh+QAFhKAAgzQAGgmAChJIAAAAQABhKAGgjIAAgBQAIhJgHhdQgCglgPiAQAAgigNg5IAAgBQgOg8gCgbQgBgLgJhFIgCgIQgCgGgFgDIgBAAIADgJQAshzAnh6IAahUQAZgoA2hjQArhOATgUIAagZQAwgEAqgWIAIgEQATALAbAQIASAYQA4BIAyA2IACAHIAbBYQAGAPAAAfQABAgAGAOIAHATQAFAPAEAtQAIAZAHAnIALBBQgLANAFASQAEAKALAUQAIAWACAsQADAtAIAVIABAjQACAVAGANIAGAdQAHAoAJA8IAJA/IASB7IAFAoIANBMQAGAsACAhQAJAnAGBEQAGBSAEAaIARCpQAFA0ABArQABAqgCAhQgUBng6BVQg9BahaAuQhHAlhSAAIgOAAg");
	this.shape_3.setTransform(16.8785,35.0413,0.23,0.23,8.993);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.brasG_gd, rect = new cjs.Rectangle(-9.1,9.4,33.4,74.5), [rect]);


(lib.bras_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#413C36").s().p("AgTJcQgFgEAAgGQgFg9ALg/IAKh8QAFhKAAgyIAAgDQAFglAChHQAChNAFgjIAAABQAHhHgGhcQgDgkgMiAIAAgBQgBgggMg2QgPhBgCgcIAAAAQgBgLgJhFIAAAAQgCgGADgGQACgFAGgCQAGgCAFACIABABQAFACACAGIACAIQAJBFABALQACAbANA9IAAAAQANA5ABAiQAOCAACAlQAHBegIBJIAAAAQgGAkgBBJIAAABQgCBIgGAmQAAAzgFBLIgKB9IAAABQgKA8AEA6QAAAGgEAFQgDAFgGAAIgBAAIgBAAQgFAAgEgEg");
	this.shape.setTransform(3.2993,147.0971);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C534D").s().p("AAARpQg2gCgxgSQgfgLgegSQh7hKg7iTQgdhLgHhMIAAAAQAHgBAEgEQAEgFAAgGQgEg6AKg8IAAgBIAKh+QAFhKAAgzQAGgmAChJIAAAAQABhKAGgjIAAgBQAIhJgHhdQgCglgPiAQAAgigNg5IAAgBQgOg8gCgbQgBgLgJhFIgCgIQgCgGgFgDIgBAAIADgJQAshzAnh6IAahUQAZgoA2hjQArhOATgUIAagZQAwgEAqgWIAIgEQATALAbAQIASAYQA4BIAyA2IACAHIAbBYQAGAPAAAfQABAgAGAOIAHATQAFAPAEAtQAIAZAHAnIALBBQgLANAFASQAEAKALAUQAIAWACAsQADAtAIAVIABAjQACAVAGANIAGAdQAHAoAJA8IAJA/IASB7IAFAoIANBMQAGAsACAhQAJAnAGBEQAGBSAEAaIARCpQAFA0ABArQABAqgCAhQgUBng6BVQg9BahaAuQhHAlhSAAIgOAAg");
	this.shape_1.setTransform(40.6001,137.1139);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bras_gd, rect = new cjs.Rectangle(-1.2,24.2,81.6,225.9), [rect]);


(lib.bouche5ai = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D33700").s().p("AjLBhQA3hVBGggIBPgpQAvgVAmgDIA3gIQAhgEAWABIAIALQgQANglAeQggAdgVANQidBhiKAAIgGAAg");
	this.shape.setTransform(74.25,53.3003);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#312C28").s().p("AlFBLQgcgggLgxQgIgfgDg+IAcgBQgBAhAKASIABAHQBKAOBrgIQA8gFB4gLICvggQBigTBKgXIAFAWIgGgSQgXAZgZAXIgKAAQgWAAghAEIg3AIQgmADgvAVIhQAnQhFAig3BUIgIAIIgcAAQhmAAhkg0g");
	this.shape_1.setTransform(62.65,51.0974);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFE").s().p("AmBBJIgCgHIABgcQA+AEAiAAQA1AAAqgKQAPgBAzAAQAoABAZgGQAVgFBDgLQA4gIAhgKQB3gXCcgyQgJANgWAWQgWAWgJANIgEABQhKAWhiATIitAgQh5ALg8AFQgpADgkAAQg6AAgugJg");
	this.shape_2.setTransform(67.5,39.4606);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E7AB61").s().p("AkYFDQg3gZgPgJQgmgWgXgZQgogigSg9QgNgsgChEQgVADgmgDQgqgDgRACIgigVIAAgVQABgMAKgDQAcgTAwADIBPAGQBFABAmgCQA8gDAugJIALAGIAZgJQA0AABOgPICBgZQALgBAigNQAbgLATAEQAZgMBegfQBKgZAqgaIBAgfQAmgSAagPQANgLAagcQAYgWAYAEQAPABALAOQAHAIAJASQAQAgAAAgQABAlgUAaQgPAIgagCQgcgFgOAAIgqBKQgaApgaAZIg9A/QglAngdAUIhTBJQgxApgsAUIgxAaQgdARgVAFQh6AghNABIg8AFIgXABQgVAAgQgEg");
	this.shape_3.setTransform(67.1256,37.9792);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(3.4,5.4,127.5,65.3);
p.frameBounds = [rect];


(lib.bouche4_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9A85A").s().p("AobC6Ig8gDQgVgBgOgPQgPgQAEgUIAkgPQAWgIAQABQDtAYDqglQDsgmDWhgIBPgnQAvgYAcgYQAKgKAUgYQASgUASgHQAdABATAcQAMARAMAkQAOAqgaA4QgfAHgngGIgZgVQgcAEgNAEQgVAHgNANIhwAoQhBAYguATQgeAJgpAGIhHAIQgcAQguAJIhNAQQgdAIg6gBQg7AAgcAHQgtAOhPAAQhbAAgiAGQgRAEgXAAIgUgBg");
	this.shape.setTransform(64.6755,18.6536);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bouche4_gd, rect = new cjs.Rectangle(0,0,129.4,37.3), [rect]);


(lib.bouche3_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9A85A").s().p("AmeFPQhUgmgThFQgIgYACgdQABgzAdg+QAfhBA5hHQA8hLBHg6QBIg6A7gXQDXhRCKgCQDqgEA+DUQASA+AAA4QAABNgkBBQgrBNhiA5QhgA5ifArQiWApiKAAQiGAAhUglgADRkwQh8ACjNBNQhvAqh3CTQh/CaAZBZQANAsBFAaQBHAaBpAAQCBgBCMgmQCQgnBWgxQBWgxAkhAQAwhUgkh6QgYhUg5gnQg2gmhZAAIgGAAg");
	this.shape.setTransform(50.9,35.85,1,1,0,0,0,0.1,-0.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#312C28").s().p("AlaDcQgngIgfgYQgggagNgkQgMg2ANg3QAOg3AlgpIARAkQAhgLBmgnQBTgfA0gQQBIgaBwgVIC7gkQAngLAygCQAdgBA9ADIAlAHQAAANACAbQABAYgIAPQgNAIghARQgeAPgPALIgeAUQgSAMgOADQgPABg2gEQgrgEgaAIQhvAghYCBQgPAWgVAsQgWAugNAUQgrAFgsAAQhPAAhPgRg");
	this.shape_1.setTransform(50.551,45.4939);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2E8CA").s().p("AmzCaQAVggAXgWQBYhZBNg5QBfhIBggnQC/g7CBAwQA7ATAqAtQAuAwAEA5IgigBQg8gCgeABQgxABgnALIi7AkQhxAVhHAaQg0APhUAgQhlAmghALg");
	this.shape_2.setTransform(53.1,22.0059);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D33C04").s().p("AjnFiQhcgFhIgXQg3gRgdg5Qgdg2AMg6QANhAAwhFQAPgVBPheQB/h2BugzQAegMA9gbQA1gWAogHQCNgdCBA0QBEAfAqBEQAnBDABBMIABBKQgBAqgNAdQgbBDg6A3Qg0AyhHAiQiSA4jFAbQg6ACgrAAQgmAAgcgCgAgEklQhgAnhfBIQhOA6hXBZQgYAWgUAfQgkAqgOA3QgOA3ANA2QANAkAgAaQAeAZAnAIQB6AaB8gOQAMgUAXgvQAVgsAOgWQBZiCBugfQAagIArADQA2AFAPgBQAPgEASgMIAegUQAPgKAdgPQAhgQANgJQAIgOAAgYQgDgcAAgNIglgGIAhABQgEg6gtgwQgqgtg7gTQg7gVhHAAQhWAAhoAgg");
	this.shape_3.setTransform(50.0472,35.6093);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bouche3_gd, rect = new cjs.Rectangle(-1.6,-1,104.9,74.5), [rect]);


(lib.avantbras_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#413C36").s().p("AnpM0IgCAAQgWgIgwgdQgEgCgCgFQgCgFABgEQB5n3B+qMIAAgBQAOg9AJhlQAMiDAEgiQABgWADgWQAGguAPgrQACgGAGgCQAFgDAGACIAAAAQAGACADAGQACAFgCAGQgOAogGArQgCAUgBAVIAAACQgEAggMCEQgJBogOA/IAAgBQh9KGh4H0QAkAVASAHIABAAIAAAAIABABQDFAyDFgQQAegFBQgEIgBAAQA4gHBYgRICRgaIAhgGQAPgCAKgGIADgCQAEgBADAAQAbAAAlgJIAAAAIA+gPIAQgPIAAABQAJgIAIgFQABgEAEgEQAEgEAGAAIAAAAQAGAAAFAEQAEAFAAAGIAAAIQAAAGgDAEQgEAEgFABQgHACgIAHIAAAAIgVASIgFACIhCAQIAAAAQgmAJgcABQgOAHgTAEIAAAAIgiAGIiQAaQhaARg5AHIgBAAQhPAEgcAFIgBAAQgvAEgwAAQicAAibgog");
	this.shape.setTransform(56.9279,112.6773);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5B524C").s().p("An4OsIgBAAIAAAAIAAAAQgTgIgkgVQB4n0B9qFIAAAAQAOg/AJhnQAMiFAEggIAAgCQABgVADgUQAGgqAOgoQACgGgDgGQgDgFgFgDQASgtAdgsQBJhuBzgtQBPggBaAMQBYANBGA0QBMA2AyBdQAsBRATBnQACAJgCAtQgCAiALASQADAPgDA4QgBAsALAZQACANgBA1QgCApALAXQANBuAAB2QAJATAAAhQAAArACALQAFAoACA2IABBfQAAAiAFBNQAFBFgBAnIAAACIgIAPIAAAdQAJAMAAAUIgEAjQgCAMgEA8QgCAWgDASQgDASgFANQgHAMgBATIAAAIQgGAAgEAFQgEADAAAFQgJAEgJAIIAAAAIgQAOIg+APIAAABQglAIgbAAQgDAAgDACIgDACQgLAFgPADIghAGIiQAaQhZAQg3AHIAAAAQhQAFgdAFQgvADguAAQiXAAiXgmg");
	this.shape_1.setTransform(59.3138,97.8308);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.avantbras_gd, rect = new cjs.Rectangle(0,0,115.4,198.7), [rect]);


(lib.colette_yeuxouverts = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E3945A").s().p("AjLB+QiHgsgfhwQAHAAAEAJQAEAKAFABIAegeQA4BSBpAXQBdAVBxgdQBpgaBXg5QBYg7AghBQAkBpheBTQhWBLiVAbQg8ALg3AAQhTAAhIgZg");
	this.shape.setTransform(49.9585,15.353);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E3945A").s().p("AgnBoQhKgMglgyQgqg5AWhcQgDA0AjAqQAgAlA1ASQA1ASAwgMQA1gMAcgrQAMgBAEAOQAFAQAJAAQABgHAGgFIANgIQgUA5hDAdQgtAUgvAAQgTAAgUgEg");
	this.shape_1.setTransform(-58.9252,11.0592);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#188946").s().p("AAigZQgZgzhGAMQAFgJAQgFIAdgGQA2ADAOA5QAJAlgIBIQgRhfgHgPg");
	this.shape_2.setTransform(46.1564,-1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#10101E").s().p("AgrAzQASgTACgkQACgngWgPQBBgQASA3QAHAUgHAYQgGAYgSAMIgjABIgGABQgRAAgBgMg");
	this.shape_3.setTransform(42.3065,1.1729);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#10101E").s().p("AgjArIALgpQAFgdgQgJIALgJQAJgEAAgHIAXALQAOAHACAMQAYAagaAkQgPAVgPAAQgNAAgOgOg");
	this.shape_4.setTransform(-61.4922,-4.016);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#188946").s().p("AAJBGQgggGgZgYQgYgYgDgcQgEggAZgaQABAEgCAlQgCAaANADQgCAqBCABIArABQASACgGANQgWAMgZAAQgJAAgKgBg");
	this.shape_5.setTransform(-65.5715,0.448);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6E3412").s().p("AC/DKQgFgPgMABQgVg0g7g6QgTgtgfgPQgCgMgOgGIgYgLIhEgYQgvgOgWgKQgsgTgYgZQgdgfgFgvQANgLAWAUQAaAWAdgLQBVg/BRAHQBKAHA5A+QA2A8AUBcQAVBfgXBjIgMAIQgGAFgCAHQgJAAgEgQg");
	this.shape_6.setTransform(-63.4556,-8.5396);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgsAyIAAhPQAIgYApgGQAGAAAFAEQAGAFADABQAWAPgCAmQgCAlgSATIgnAAQgWgBgIgJg");
	this.shape_7.setTransform(35.4335,0.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#25BD64").s().p("AgbBgQg8gPgRgxQAIAJAWACIAogBQABANAXgCIAjgBQASgMAGgYQAGgXgHgVQgRg3hBAQQgEgBgGgEQgEgFgGAAQAJgRAfgDQBGgMAZAzQAHAPARBfQgDADgFAOQgEAMgIABQgkASgmAAQgSAAgUgEg");
	this.shape_8.setTransform(41.45,2.0891);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#188946").s().p("AglBOQgpgSgSgmQgUgqAPg5QADgMARACIAABQQARAvA8APQA6AOA2gbQgYAigrAJQgOADgPAAQgYAAgZgKg");
	this.shape_9.setTransform(39.1163,6.1195);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#6E3412").s().p("AjQDRQgEgJgHAAQgEiABCh0QA8hrBhhEQAlASBFBCQA+A8A0AQQgOAKgwAIQgsAHgOAPIgcAGQgRAFgFAIQgfADgJARQgpAGgIAYQgRgCgDAMQgrAjgUAWQggAjgPAmIgeAeQgFgBgEgKg");
	this.shape_10.setTransform(34.9357,-7.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#25BD64").s().p("AAcAyIgqAAQhDgCACgrIAyAAQAeAfAbglQAagmgYgZQAfAPATAtQABAvgpAWQAGgMgSgDg");
	this.shape_11.setTransform(-62.0542,-0.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ah4DRQhWgQg6giQiZhaBiivQA+hvCRgBQBIAAA7AWIFTC1QgtA3hBA6QiDBzhiAFIgeABQg1AAg4gKg");
	this.shape_12.setTransform(51.2369,6.2457);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgnCvQgngKgjgfQgegagOgdQgWguAFhLIARiIIBDAJQBOAOA5AXQC7BHhRCAQhHBwhUAAQgRAAgSgEg");
	this.shape_13.setTransform(-58.8891,3.1424);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_yeuxouverts, rect = new cjs.Rectangle(-87,-30.4,174.1,60.8), [rect]);


(lib.colette_yeuxfermes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6E3412").s().p("AClCfQg0g0hWg3IiXhcQgXACgVgHIgkgPIgPgtQgGgbABgcQAvAWBgAXQBrAaAnAPQChA7gBCaIgYAQQgJAGgNAAIgOgCg");
	this.shape.setTransform(-66.4638,-1.4721);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6E3412").s().p("AmeCgQBDiABphZQB9hqB6AEQAvACA4AbQAdAPBFAtQCCBSBPgCQgGARgdAIQglAJgIAGQi3hDjLAmQizAiiaBpg");
	this.shape_1.setTransform(47.55,0.4409);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E3945A").s().p("Ag1A2QhYgvgDhqICXBcQBWA3A0A0QiKgOg8ggg");
	this.shape_2.setTransform(-64.45,4.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E3945A").s().p("AlnBHQCahoCzgiQDLgnC3BEQjgBBh8AaQiFAdhuAAQhFAAg7gLg");
	this.shape_3.setTransform(45.05,9.3442);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_yeuxfermes, rect = new cjs.Rectangle(-89,-17.5,178.1,35.2), [rect]);


(lib.colette_tetebg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DAC7AD").s().p("AgeA2QgggLgBgxQALAVAVAFQASAEASgLQATgLAHgRQAHgVgMgUQAqASgFAhQgEAbgfAUQgXAPgSAAQgJAAgIgDg");
	this.shape.setTransform(88.522,77.923);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7F0E3").s().p("AgPAvQgVgFgLgWQgEgRAGgOQAIgTAAgJQAngQAoAQIAAAKQAMAUgHAUQgHASgTALQgOAIgMAAIgKgBg");
	this.shape_1.setTransform(86.9392,75.2408);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FDC395").s().p("AALS0QgPg4ABg1QABgoANhRQBrgCCJgsQCmg2A8gKQADBVgnBRQgmBQhCA3QhGA5hSAMQgVADgWAAQhEAAhDghgAzQLtQiLkEgHn4Qgao5DOk8QDpllHxAWQAIE0B3DYQBvDKDUB8IAAAKQCbBTCfAwQCyA2DFAPIgjDCQgWBugXBLQBgAHBIhQQAngrBLiEQBEh7A0gvQBPhHBtAUQA6ALAzA9QA7BHgIBXQAJABALgGQALgGAJABQgBAPgPAEIgiABQgjCpiHB4QhQBHjIBtQhdAIgzgXQg6gbgIhEIAAhQQgkAFgcAfQgdAmgRAQIhiBTQg6AxgiAmQj/DQjfB2QkdCWk8A2QAEAOAegCIAugCQgpAEgnAAQlnAAilk1gAubBjQgpArh8BcQALBNBWAeQBWAdBDguIhZgVQg1gMgSgbQBRhBAxhXQA5hngHhoQgXBshSBWgAMXDgQAAAJgIATQgGAPAEARQABAyAgALQAaAJAhgVQAfgUAEgcQAFghgqgSIAAgKQgUgIgUAAQgUAAgUAIgAEFDMQgQAUgiAPIg+AXQhNAegLA0IBdADIBXgXQCZg9BhifIAlhJQAYgqgBgsQjJC7hZBIgAPAAIQgVAfgwBpQAwBCBTgXQBIgVA6hGQA7hGgLg1QgGgegdgPQgdgWg3AJIgKAAQhCAZgtBEg");
	this.shape_2.setTransform(4.0043,48.8287);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C97200").s().p("AItOeQj+gKiehUQjTh8hwjKQh3jYgHkzQAXh+A0h2QAshlBHhpIAKAAQA+hTBdhaQA0gyB6hrIBQgiQAwgVAWgZQE5gMEIBdQD8BZCrCqIArCPQAeBkASBMQA4DjgHCtQgFBdgRBOQgZBvgrAcQh4BPiDiRQgkgog+hYQg5hSgYgYQASC0iQBFQg/AehOgCQhPgChKgjQhZgug+gwQhJg5guhFQgBgQgKgNIgTgVQABFVDKCwQCyCcFdAlQiwA3jRAAIg/gBgA18EQQgzgHgUg6IgOgmQgJgRgQAAQCklbDVkDQDmkXEli4QCxgdB3BCQCGBLgeCeQgTBjh4BVQggAXhLAuQhHArghAYIh4BMQhAAugkAwIgKAAIh9BpQhGA9gtA1QgoARg1ApIhaBLQhhBPhIAAIgSgCg");
	this.shape_3.setTransform(-12.3108,-72.966);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9D5A00").s().p("AKoXoQgugRgkgfQgkgfgLgfQAHh5AuhsQAthpA+guQAIBEA6AaQAzAYBdgIQh6B7gcA2Qg/B6CPAzQgmAtg6AAQgiAAgpgPgAJ3N8QAXhMAWhtIAjjDQjFgPiyg2QifgxichSIAAgKQCeBTD+AKQD3AKDJg/QlcglizicQjJiwgClUIATAVQAKANABAQQBTCWC7BGQBKAiBPACQBPADA+geQCRhGgTizQAYAYA5BRQA+BYAkAoQCDCQB4hNQArgcAZhvQAShPAEhcQAHiug3jjQgThMgehlIgriOQDEFfA2HpIgBB0QgCBJANAfQAKA4AnAnQAhAgA6AWQAcAFAVgaQAUgaAfAHQALC5hlCTQhVB7ibBVQgJgBgLAGQgLAFgJAAQAIhXg7hIQgzg8g6gLQhtgUhPBHQg0AuhEB7QhLCGgnArQhDBJhWAAIgPAAgA7UEQQgMjBAfinQAciVA/iMQAQAAAJARIAPAmQAUA5AyAIQBNAMBvhaIBahKQA0gqAogQIB6hsQBMhDAqgtIAKAAQAjglBJgyQBUg6AcgZQAigZBHgrQBLgtAggXQB3hVAThjQAeifiFhKQh4hDixAeQCyhPDNAAQD3ABBGCKIEhgUQgWAYgvAVIhRAjQhcBAhZBZQhJBJhVBoQhGBpgtBkQgzB2gYB/QnxgXjpFlQjOE8AaI5QkViIiFkIg");
	this.shape_4.setTransform(0.0363,-19.9131);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#AF6504").s().p("AIXGLQAuBEBJA5QA+AxBZAuQi7hGhTiWgAqxCCIB9hpQgrAthLBDIh6BsQAtg2BGg9gAnGhEIB4hMQgcAZhUA6QhJAygjAkQAkgvBAgugABzkcQBVhnBJhKQBahZBchAQh5Bqg1AzQhdBag/BTg");
	this.shape_5.setTransform(-35.35,-91.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C28234").s().p("AhGGkQgPgngjgGQgsAMglAgQgTASgoAwQgDglAqgvQAhglAwgdIAKAAQA3gCAdAPQASANAIAYQAKAbgIAfQgIAfgYAVQgLg0gJgXgAD4l6IABh0QAOAfgDBJQgDBgACAUQgNgfAChJg");
	this.shape_6.setTransform(125.2061,6.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E3945A").s().p("AiaBcQAwhoAUgfQAuhFBBgZQgvAegiAlQgqAuAEAkQAngvAUgRQAkghAsgMQAjAGAPAnQAJAXALAzQAXgVAIgeQAIgegJgbQgJgZgRgNQgegPg2ACQA2gJAeAWQAcAPAGAeQALA2g6BFQg6BGhIAVQgVAGgUAAQg2AAgjgxg");
	this.shape_7.setTransform(108.6621,54.0425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque_2
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E3945A").s().p("AAzadQgQg4ABg2QABgnAOhRQgVgUABgyQi5BHhiAeQiqA0imgDQmlAli3lWQiLkFgHn4QkViIiFkIQgMjAAfioQAciVA/iMQClldDVkCQDmkYEki3QCyhPDNAAQD3ABBGCKIEhgUQE5gNEJBeQD7BYCrCrQDEFfA2HpQAOAfgDBJQgDBfACAVQAKA5AnAnQAhAgA6AWQAcAFAVgaQAUgaAfAHQALC4hlCTQhVB7ibBVQgBAPgPAEIgiABQgjCpiHB5QhQBGjIBuQh6B7gcA2Qg/B6CPAzQg8BHhvgpQgugRgkgfQgkgfgLgfQgNAVgGAyIgLBPQADBUgnBSQgmBQhCA2QhGA5hSAMQgWAEgWAAQhDAAhDghg");
	this.shape_8.setTransform(0.0363,-0.0297);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_tetebg, rect = new cjs.Rectangle(-175.2,-172.6,350.5,345.2), [rect]);


(lib.colette_sourcilgauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A74E1A").s().p("AACAZQhFg0hJgOQAJg/A5gLQA0gKA+AhQA/AiAaA3QAdA9gnA8g");
	this.shape.setTransform(-0.002,0.0247);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_sourcilgauche, rect = new cjs.Rectangle(-14.1,-11.8,28.2,23.7), [rect]);


(lib.colette_sourcildroit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A74E1A").s().p("AhwgPQAdg1A4gbQA3gbAtASQAyATAKBEQg5AOhMAuQhWA2goAPQgThDAhg8g");
	this.shape.setTransform(0.0029,0.002);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_sourcildroit, rect = new cjs.Rectangle(-13.3,-11.2,26.7,22.4), [rect]);


(lib.colette_maingauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E3945A").s().p("AA6CTQgIgHgFAAQgzhAgihLQgdhAAAguIAwB5QAgBQAiAmQgEgYgVgkQgUgkgEgYQAQAUAXAyQAXAyARAUgAg8h+QgEgHgFADIAFgTQAYAEgEAkgAhFhtIgFgKIAFgLIAAAVIAAAAg");
	this.shape.setTransform(1.55,18);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C28234").s().p("AgGAMQguh0gHgOQAFgTAJAMIAQARQADAcAPAiIAVA5QAFAYAUAkQAVAkAEAYQgigmgghRg");
	this.shape_1.setTransform(0.05,17.9177);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E3945A").s().p("AgOAGQADg/gCgMQAUAGAEAhIAFA8QgOgygDARQgDANABA8QgOgPADgxg");
	this.shape_2.setTransform(-18.5195,11);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E3945A").s().p("AgKAXQgfgmgIgsQAUAQAdArQAeArAUARIgGAAQgaAAgcglg");
	this.shape_3.setTransform(12.05,7.0223);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDC395").s().p("AllA5QgKiXAmkJQBdA+CMAoQBrAgCpAaIAAgyQANADgCAaQgCAkABAFQBJA3AiArQAyA/ANBOQgkAbg5gMQgkgJgzgaQgCAXAYBPQAPBNglAfQhFADgVgXQgQgUgYgyQgXgygRgUIgVg6QgPghgDgcQAEgkgYgEQgSA4ArBeQAgBLA0BAQgQA/gLAUQgVApgpAGQgagRgbgiIgvg7QgRAMgTA0QgQAvgcAJQiEg4gQj3gAjIAQQgCAxANAPQAHANALAtQAJAlANAPQAAgagLguQgLgtACghIgEg8QgEghgWgGQACAMgDA/gABtgFQAhAoAcgFQgUgRgegqQgegrgUgRQAJAsAeAog");
	this.shape_4.setTransform(0.03,10);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E3945A").s().p("AgXB6QiNgphcg9QAHh5BagyQBPgtBsAbQBrAZBCBPQBIBVgUBuIAAAyQipgbhrgfg");
	this.shape_5.setTransform(-7.2241,-27.9911);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C28234").s().p("AgBAqQgLgsgHgNQgBg8AEgNQAEgSAMAzQgBAiAKArQALAvAAAZQgNgOgIgmg");
	this.shape_6.setTransform(-16.9611,19.5919);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_maingauche, rect = new cjs.Rectangle(-36,-46,72.1,92), [rect]);


(lib.colette_maindroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E3945A").s().p("AA7CSQgIgGgGAAQgzhCgihJQgdhAAAgvIAxB5QAfBRAiAmQgEgZgVgjQgUgkgEgYQAQAUAYAxQAXAzAQAUIgEAAQgGAAgGgEgAg7h+QgFgHgFADIAFgTQAZADgFAlgAhFhuIgFgJIAFgLIAAAUIAAAAg");
	this.shape.setTransform(1.55,18.0661);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C28234").s().p("AgFAMQgthxgJgRQAGgUAJANIAPARQADAbAPAjIAVA5QAEAYAVAkQAVAjAEAZQgigmgfhRg");
	this.shape_1.setTransform(0.05,17.9559);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E3945A").s().p("AgOAGQADg/gCgMQAUAFAEAjIAFA7QgOgzgDASQgDAMABA9QgOgQADgwg");
	this.shape_2.setTransform(-18.5195,11.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E3945A").s().p("AgKAXQgegmgJgsQAVAQAcArQAeArAUARIgGAAQgaAAgcglg");
	this.shape_3.setTransform(12.05,7.072);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDC395").s().p("AllA4QgKiXAmkIQBcA9CNApQBrAeCpAcIAAgyQANADgCAaQgCAkABAFQBJA3AjAqQAyA/AMBPQgkAag4gMQgkgIg0gaQgCAXAYBPQAPBMglAgIg0gCQgagFgMgNQgQgTgXgzQgXgygSgUIgVg6QgOgigEgbQAFglgZgDQgSA4ArBeQAgBJA0BCQgPA/gLAUQgVAogqAHQgZgSgcgiIgvg6QgRAMgTA0QgRAvgbAJQiEg5gQj3gAjIAQQgCAwANAQQAHANALAsQAJAmANAPQAAgagMgvQgLgsADghIgEg7QgEgjgWgFQACAMgDA/gABugGQAgAoAcgEQgTgQgfgrQgdgrgVgRQAJAsAfAng");
	this.shape_4.setTransform(0.03,10.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E3945A").s().p("AgXB6QiNgphcg9QAHh4BagzQBPgtBsAbQBrAaBCBOQBIBWgUBtIAAAyQiqgbhqgfg");
	this.shape_5.setTransform(-7.2241,-27.9661);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C28234").s().p("AgBAqQgLgsgHgNQgBg9ADgNQAFgRAMAzQgCAiAKAqQAMAwAAAZQgNgPgIglg");
	this.shape_6.setTransform(-16.9625,19.6281);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_maindroite, rect = new cjs.Rectangle(-36,-46,72.1,92.1), [rect]);


(lib.colette_jambegauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#121828").s().p("AhqM+QizgQhvhKQguiPgLhvQgRioBAhOQAOgggDhMQgDhkACgWIAAjvQgCgcADiAQADhhABiAIADh8QABgpAVhAQAUCjABFXIgBI9QBtBFD2AHQCIADDugJQiKBMjogJQjDgHi4g8QgKB2ADBVQADB0AYBRQA3AkBMAUQBLATBDAJQBCAJBJgGQBLgHBjgoQA3gWBGgDQBFgDAXAUQgrAZhZAKIigAsQhNAThQAAQg4AAg6gKg");
	this.shape.setTransform(-0.4284,11.1266);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#202435").s().p("AjzOEQhqgPgygwQgLhogUhtQgVhuBEhZQC3A8DEAHQDnAJCLhMQjvAJiHgDQj2gHhthFIAAo9QgBlXgTijQAriBCGg5QB8g1CUAZQCXAZBhBbQBrBmgFCSIgCELQgCCkAEBZQAFBlAPCKIAAEEQgQBPAHCBIAJDUQgaAChPATQg/AOg0gFIj5A0QhngghrgPg");
	this.shape_1.setTransform(1.3112,-0.3756);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1B202F").s().p("Ah8gFID5AAQguAMhPgBQhPABgtgMg");
	this.shape_2.setTransform(10.4,89.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_jambegauche, rect = new cjs.Rectangle(-46.1,-95.1,91.4,190.2), [rect]);


(lib.colette_jambedroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#121828").s().p("AhqM+QizgQhvhKQguiPgLhvQgRioBAhOQAOgggDhMQgDhkACgWIAAjvQgCgcADiAQADhhABiAIADh8QABgpAVhAQAUCjABFXIgBI9QBtBFD2AHQCIADDugJQiKBMjogJQjDgHi4g8QgKB2ADBVQADB0AYBRQA3AkBMAUQBLATBDAJQBCAJBJgGQBLgHBjgoQA3gWBGgDQBFgDAXAUQgrAZhZAKIigAsQhNAThQAAQg4AAg6gKg");
	this.shape.setTransform(-0.4284,10.9766);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#202435").s().p("Aj3OEQhqgPgygwQgLhogUhtQgVhuBEhZQC3A8DEAHQDnAJCLhMQjvAJiHgDQj2gHhthFIAAo9QgBlXgTijQAriBCGg5QB8g1CUAZQCXAZBhBbQBrBmgFCSIgCELQgCCkAEBZIAWHvQgBBSAFCfQAGCfgMAYQgaAChPATQg/AOg0gFIj5A0QhngghrgPg");
	this.shape_1.setTransform(1.7227,-0.5256);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1B202F").s().p("Ah8gFID5AAQguALhPAAQhPAAgtgLg");
	this.shape_2.setTransform(10.4,89.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_jambedroite, rect = new cjs.Rectangle(-46.1,-95.2,91.9,190.2), [rect]);


(lib.colette_epaulegauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1F1B36").s().p("AkPOUQhYgag6hDQg/hJgKhoQgQibA8jAQAqiHBljQQCHkWAWg1QBNi1AKhfQAGg6gHgsQgHgrAtguQArgtAggbQAggaDDAUQAtgHB5B+QB5B9izEsQizEshPE8QgdBzgRCrQgKBhgPC3QhABahcAYQgoAKgoAAQgvAAgvgOg");
	this.shape.setTransform(-0.72,5.2374);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0C0C26").s().p("AinJOQARirAsjxQArjxCJilQCKilgXidQgYicnQghQAPgvAbgXQCJh3B5ALQB7AKBtCtQBuCthGCJQhGCJhEBQQhEBQgmBXQgmBXgjB8QgXBTgOCmQgQC/gMA/QgZCEhfBxQA0joAKhhg");
	this.shape_1.setTransform(24.4742,-1.2177);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_epaulegauche, rect = new cjs.Rectangle(-50.1,-93.1,104.7,191.4), [rect]);


(lib.colette_epauledroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1F1B36").s().p("AgrO3QgjgVgrgmQgvgtgCg1QgSlegKklQgKkkhrhXQisnECriWQCqiXB7gFQB6gFBHBXQA4CMgJBDQgMBSANBHQgEBrA+ELQBVFzAQBlQAuEQgkCcQgsDFivAwQgqAMgoAAQhFAAg8gkg");
	this.shape.setTransform(0.6404,-7.473);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0C0C26").s().p("AhNI+QgFjSAHiMQABhdgKgsQgLgrgggpIhBhmQgcgvgJglIgciTQgShtBGjBQBHjBCNg9QCOg9BwBCQjtBPhpCqQh8DGAoEUQCGBuAYFdQARD1gYFzQg6iFgFjSg");
	this.shape_1.setTransform(-13.9923,-15.315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_epauledroite, rect = new cjs.Rectangle(-40.1,-107,81.1,198.3), [rect]);


(lib.colette_cuissegauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#121828").s().p("AjnUeQgbgSgJgLIgDgDIgYghQgQgXgSglIg2h/QgkhZhOkfQhelYglk3QhgseEemTQAvgQA/gzQA/gyAlgNQDuhPDEA/QC2A6B1CoQBxCiAaDiQAbDnhGDxIgKAAQjACQk5BOQkaBGlWAHQAPCiAUCYQAoEHA8D0QBfGACPBPQglgTgegUg");
	this.shape.setTransform(-0.0039,-4.4553);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Calque_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#202435").s().p("AgvVfQiYg3hEhZIgDgDIgYghQgQgXgSglIg2h/QgkhZhOkfQhelYglk2QhgsfEemTQAvgQA/gzQA/gyAlgNQDuhPDEA/QC2A6B1CoQBxCiAaDiQAbDnhGDxQgFCOgsDzQgtD3gGCJIgRHcQgHB7gXBPQg7DJjBAcQgtAHgtAAQhRAAhPgYg");
	this.shape_1.setTransform(-0.0039,0.5351);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_cuissegauche, rect = new cjs.Rectangle(-65.2,-139.3,130.5,279.8), [rect]);


(lib.colette_cuissedroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#202435").s().p("AgqM+QiHgkhNhDQAcAQAugCQiwithkl8QhLkYgom0QFWgHEahHQE5hODBiQIAMgMQgECOgtD0QgtD3gJCJQgDAngBBeIgKFWQgHB7gXBPQg7DJi/AVQg7AMg5AAQg0AAgwgLg");
	this.shape.setTransform(3.35,54.9069);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Calque_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#121828").s().p("AgJVlQiHgkhNhDIgHgFIgpgjIgYghQgNgUg3iBQg3iDhXk7QhXk7gmk2QhgsfEfmTQAvgQA/gzQA+gyAmgNQDthPDFA/QC2A6B1CoQBwCiAbDiQAbDnhDDlQgFCOgtDzQgtD3gJCJQgCAngBBfIgKFWQgIB7gXBPQg7DJi/AVQg7AMg4AAQg1AAgwgLg");
	this.shape_1.setTransform(0.0081,-0.1984);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_cuissedroite, rect = new cjs.Rectangle(-65.2,-139.3,130.6,278.3), [rect]);


(lib.colette_corps = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#48475B").s().p("AgFAGQADingCghQANBAgDB9QgDCjACAlQgMhAACh9g");
	this.shape.setTransform(-19.5184,85.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A09CA2").s().p("Ag2gOIAAgKQALADAHgJIAMgOQgBAGADADIAIABQgFAPAJAMQAIALgCAMIA7AAQgGAJghACQgcACgCAQQAFg5gtgCg");
	this.shape_1.setTransform(10.5,-114.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B3B1B5").s().p("AATA9QACgcgBgDIhBgEQgdgKAFgjIAKAAQgEAoA2ABQA1ABAGggQgGgsgigQIAAgKQAbgBAMAcIAVArIgcAkQgQAWAEAfIgBAAQgMAAACgTg");
	this.shape_2.setTransform(-20.0373,-114.798);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#29293D").s().p("ADUGUIgBgBIACAAQAHABABAGgADFF8IgDgIQgKghADg3IAGhXQADgxgFgcQANAqgCBcQgDBiABAjIgDgHgAjciRQgCiqAOheQgCA0ADDgQACCqgNBdQABgugDjlg");
	this.shape_3.setTransform(-36.0879,121.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#12102A").s().p("AgJAZQgGAAgCAIIgCAMIgKAAQAFgMAJgmQAHghAIgQQAHAMAFAUQAFAJANgVQgJAjgGAOQgKAbgOANg");
	this.shape_4.setTransform(-70,-89.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0C0C26").s().p("AtXWhQgIgGgFAAQAjjOAXkwQAHhcAcnLQArrGBUlSQARhEAuhWIBWiWQBpjBgOi3QAjAHAHAgQAFAWgKAtIgQBLQgGAoAPATQAUgeAXg0IAnhWQAxhlBFgfIiBEPQhOCjghB+QgOAVgEgKQgFgUgHgLQgHgdATguQARgpgJgOQiHCuhCEgQgzDhgVFjQgLDOgOGlQgSFxgsDnQgUAQgBBPQAABJgdAMIgEAAQgHAAgGgEgAE3UFQgmgUgRgwQgPgsAHg2QAGg1AYgqQAagsAlgPQBlgQAuA0QAoAugPBMQgNBKg3AwQgvArg4AAQgPAAgQgDgADJI/Qg+gNgLhXQgLhOAihIQAfgSATggQBigdAwAuQAqAogJBNQgJBKgwAzQgrAsgzAAQgOAAgOgDgACpDYQADglgBgEQAui1Bri+QAohICjj5QCAjEA/iLQBZjHAYjVIAAgKQAOgPgFhMQgFhFAagKQAeEDhPDtQg6CyiRDeQiqD1hNCBQiGDcgvDHQgNgDABgagAmyiTIgfjLQgmj9AZirIAKAAIACgNQACgHAGAAIAAAeQgGBlAQB7IAiDSQAUB6ACBNQACBrgcBZQAAhegQh2g");
	this.shape_5.setTransform(-25.0853,-7.2827);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#DAC7AD").s().p("AjMELQg3gBgFgfQgEgfAQgWIAcglQBpgPgPBzQgPAWgyAAIgFAAgAjLCZQgSADgMAPQgMAPABARQACAUASAMQATADAPgJIAagOIAAgyQgPgNgRAAIgHABgAhIDqQgygGgCgrQAHAAAEgJQAEgKAFgBQgEAeAOAUIAyAAQALgKAAgZQAAgZgLgKQAtABgFA6IAAABQgRAdgnAAIgMAAgAkwCxQg2gBAEgpQAYAiAjgYQAkgYgZgkQAiAQAGAsQgFAggzAAIgEAAgAAFCvQACgLgHgNQgIgLAEgPQARAOAKAEQASAGAOgOQAEgcgJgMQgJgPgaAFIAAgKIACgBIADAAIgDABIAOgCIAaAKIAcAWQASAMgLAcQgKAagRAEgABaBVQgdgDAEgbQARAZAUgFQASgFAKgWQAKgWgKgRQgLgRgiAEQgBgNAUACIAfABQgHg7AlgLQBJgGgDBCQgFAagZAIQgXAJgbgOIAIAgQAGATgEATQgGAAgFAEQgFAFgEABIghABIgWgBgACbhKQgOAUAEAeQATASARgHQAQgFAGgTQAFgTgLgMQgIgJgPAAQgIAAgLADgAliA3QgNgQgEgMQgHgSAEgXIACgIQACgDAGABQgIArAcAQQATgBAMgNIATgZQgOglguAHIACgIQACgDAGABQBQgGgKBfQgJAJgaABgAlOhKQgigPAEg3IAKAAQgCAgARALQAOAJATgKQATgJADgRQADgUgXgQQAfgCANAWQALATgHAaQgIAagUAJQgHADgJAAQgQAAgSgNgADhhoQARAPASgJQAQgIAGgSQAGgUgKgMQgMgOgfAGIAAgKIAUAAQAmgEAPAbQANAZgQAgIgCAIQgCADgGgBIgtAAQgYgCgBgSgAE7ikQgOgUAEgeQACguA6AGQAOAUgEAeIgWAcQgKANgRAAIgLgBgAkwi4QgIgIgCgRIAAgjQACgIAGgFIAMgHQAWgFAOAJIAYAQQABAYgBALQgCARgIAIQgJAKgVAAQgUAAgKgKg");
	this.shape_6.setTransform(9.4564,-130.2508);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#211D36").s().p("AgjB0QBIjRAbi/IAAgKQALgXAEhDQAEhCALgYQgHBJAeAsQAMATAtAiQgCAFgaAWQgSAPAGAcQAYALAKAQQAMAUgGAhIAAAKIgKAAQABAUgQAGQgPAFgKgLQgOCkhsCjIhcCEQg3BQgeA8QBwkUAchTg");
	this.shape_7.setTransform(40.5864,-119.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#888694").s().p("AiKCKIgagKIgOACIACgBQAGgCAFgEIADgCQAEgFADgFIAPgfIABATQACAKAHABQgEAbAdADQARACAmgCQABAOgfgEQgfgEABAOgAAnAeQADhAhIAFQgBgNAUACIAeABIAAgKIAKAAQABASAYACIAtAAQABAOgfgEQgfgEABAOQAMgFAAAYQAAAVgIAAIgEgBgABwhfQgPgbgmADQACgJAOgBIAYAAIAAgeIAKAAQgEAfAOATQAZAFANgRIAWgcIAAAUIAAAKIgUAPQgLAKgTgFIAAAoQgDAUgRAAQAQgggNgYg");
	this.shape_8.setTransform(29.075,-135.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#191630").s().p("AnjKUIgBAAIgggXQgQgPgCgWQAFAAAJAHQAHAFAJgCQAdgLABhKQABhPATgQQgIA4gFBHIgHBngAHqpDQACg3ANgZQABAFgDAkQgBAaANADIgGAqQACAHAYgTQgTAggfASIAFhGg");
	this.shape_9.setTransform(-58.5,76.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1F1B36").s().p("AikZnQgBgGgHgBIgCgBIgCgCIgJgMQgBgjADhjQAChbgNgrIgRiFQgGhMADhHQgCgkADilQACh9gNhAIAAj6QghkcB1jxQAdg9BQiGQBIh7AihMICCjSQAdg8A4hPIBdiFQBrijAPilQAJALAQgFQAQgGgBgUIAKAAQgYDVhZDHQg/CLiADEQijD6goBHQhqC+guC1QgNAZgDA3IgEBGQgiBIALBPQALBWA+ANQBEAPA1g4QAwgyAJhKQAJhNgqgoQgwgvhhAdQgZATgBgHIAGgqQAvjFCFjeQBNiACqj2QCRjeA6ixQBPjtgekEQgaAKAFBGQAFBLgOAPQAFghgMgUQgKgQgXgLQgGgbASgPQAZgWADgGQgtgigNgTQgdgrAHhKIAKAAQAtCBC/BBQARAGCVArQBlAdA5AcQBrEsh6ElQhkDujXCpQg6CxAnDkQARBkBcE6QAPA1AzCTQApB5APBDQAiCYguBpIAAgBIgoBCQi0DfjYBwQj/CFlSACIgOACQgVAAgPgMgABBONQglAPgaAtQgXAqgGA1QgHA2APArQARAwAlAUQBLAPA7g2QA3gxANhKQAPhMgogtQgkgohDAAQgVAAgXADgArbZCQhegXg5gVQg6gVhPgrIgFgDIhGg0IAKAAIAHhmQAFhIAIg4QAsjnASlxQAOmlALjMQAVlkAzjhQBCkgCHivQAJAOgRApQgTAuAHAdQgJAQgIAhQgIAngFAMQgZCsAmD8IAfDMQAQB2AABdQAchYgChrQgChOgUh6IgijRQgQh8AGhlQAPgNAKgaQAGgPAJgkQAhh+BOijICBkPQhFAfgxBlIgnBXQgXAzgUAeQgPgSAGgpIAQhKQAKgtgFgXQgHgfgjgIQDohTDGidIAmAAIACAAIgCAJQABASAEAKQAJATgCAOQgCAHgJAIQgIAIgBAHIgNAIQgGAFgBAHQjEEIhIC0QhvEXAdFbQAEA0AVBmQAUBnAFA1QAOCtgfE+QgjFkACB6QgOBeACCqQADDmgBAuIAJCSQAFA5gLAlIgDAKQgNAGgXAAQgjAAg4gNg");
	this.shape_10.setTransform(2.5373,-1.7467);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#74708D").s().p("ApecUQkFhQhsiiQC9CNEZAJQAph/ASi6QANiBAGjhIAMlpQALjGAdiGQAdAMBTgEQBKgEAOAQIAAD6QACAhgDCoQgCB9ANBAQgCBHAGBLIAQCGQAGAcgDAxIgGBWQgDA4AKAhIACAIIAEAHIAJANIABACIABAAIABABIAIAHQAUAOAegEQghBkByAfICeAMQAhAAAlgDQCvgMDPhgQCRhEA+hGIA8hGQgBgCAdgsQAbgsAVg1QAEgLACgQQAFCtgiAdQgiAehTBiQhTBhkCBfQkCBfklAHIg4ABQkRAAjWhDgAgeoUIhGgXQgpgNgYgBIi/ANQhfAAgYhdQgripBUjTQA4iOB7iyQgEAYAHASQAEAMANAQIAtAAQAagBAJgJQAKhghQAGQADgGAMgHQAGgEgLgNQAbAUAXgKQAUgJAIgaQAHgagLgTQgNgWgfACIgeAAQAAgJAOgCQAPgCABgHQAKAKAUAAQAVAAAJgKQBLAlCdgEID3gXIAAAKQgQABgDATIgBAoIAAAKIgfgBQgUgCABANQglALAHA7IgfgBQgUgCABANQgVAJgJAVIgPAeQgDAGgEAFIgDACQgGAFgHACIgCAAIAAAKQgTgJAAATQgBAVgKgBIgLANQgHAJgMgCIgpAEQgTAGAAAUQgFABgEAKQgEAJgGAAQACArAxAGQAwAFAUgiIAAgBQACgQAdgCQAigBAFgKQARgEAKgaQALgcgSgMQgBgOAfAEQAfAEgBgOQAEgBAFgFQAFgEAGAAQAEgTgGgTIgIggQAbAOAXgJQAZgIAFgbQAMAFAAgZQAAgZgMAFQgBgOAfAEQAfAEgBgOQAGABACgDIACgIQARgBADgTIAAgoQATAFALgKIAUgPQgbC/hJDRQgcBThwEVIiCDSQgkASgtAAQgiAAgngLgAhVwrQA2ABAQgXQAPhzhpAPIgVgrQgMgcgbABIgtAAQgaAAgJAKIAAAyQgFAkAdAKIBCAEQABADgCAcQgCAUANgBQAFAfA3ABgAHu4DQAEgegOgUQg6gGgCAuIgKAAQgBgJAFgHQAGgJAAgFQiVAYiXgFQjJgHhOg+QACgPgIgTQgFgKAAgSIABgIIgBAAIACgVQAHgNACgVQgBhIAigTQAwgbA2AHICDAQQBNAIBtgTQBsgTAcABQAdABAZAJQAZAJAJA0QgIBBABAhQAQgCAEAMIgKAAQgLAYgEBCQgEBCgLAYg");
	this.shape_11.setTransform(-2.4353,3.2074);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7F0E3").s().p("Ai3DIQgSgMgCgTQgBgSAMgPQAMgPASgDQAVgDASAPIAAAyIgaAOQgLAHgOAAIgJgBgAg1C0QgOgTAEgfQAAgUATgGIApgEIAAAKQAKAKAAAZQAAAagKAJgAk5BkIgKAAIAAgyQAJgJAagBIAtAAIAAAKQAZAlgkAYQgOAKgNAAQgSAAgOgVgABABsQgKgDgSgPIgIgCQgDgCABgGQAKACABgVQAAgTATAIQAagEAJAOQAJAMgEAcQgJAKgMAAQgFAAgGgCgABqAUQgHgBgCgKIgBgSQAJgVAVgJQAigEALATQAKAQgKAWQgKAWgSAEIgHABQgQAAgOgVgAlDg7IACgIQACgDAGABQAugGAOAkIgTAbQgMAMgTAAQgcgOAIgtgAC6g7QgEgdAOgVQAegHAMAOQALALgFATQgGATgQAGQgEACgFAAQgNAAgOgOgAEKiLIgKAAIABgnQADgUAQgBQAfgFAMAOQAKAMgGATQgGATgQAHQgHAEgGAAQgLAAgLgKgAkqiIQgRgKACghIAIgMIAMgIIAeAAQAXAQgDAUQgDARgTAKQgKAFgIAAQgIAAgHgFg");
	this.shape_12.setTransform(5.3604,-126.8401);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#5E5A76").s().p("AAPaKQhygeAhhlQFTgCD/iFQDXhwC0jfIAohCIAAABQAUCCgJA8QgCAPgEALQgVA1gbAtQgdAsABABIg8BHQg+BFiRBEQjPBgivAMQglADghABgAvQXpIAAiAIAFADQBQArA5AVQA5AVBeAXQBeAWAhgPIAEgKQALglgFg5IgKiSQAOhcgDirQgDjhACg0QgBh6AilkQAfk9gOiuQgEg1gVhnQgUhmgFg0QgdlbBwkXQBIi0DDkIIAAAjQACARAIAIQgBAHgPADQgOACAAAIIgMAIIgIAMIgKAAQgEA4AiAOQALAOgGADQgMAHgDAGQgGgBgCADIgCAIQgGgBgCADIgCAIQgGgBgCADIgCAIQh7Cyg4COQhUDUArCoQAYBeBfAAIC/gOQAYACApANIBGAXQBaAZBAghQghBMhJB7QhPCGgeA9Qh0DxAgEcQgOgQhKAEQhTAFgdgNQgdCGgLDHIgMFoQgGDigNCAQgSC7gpB+QkZgIi9iOgAh+4oQAIgHACgSQABgLgBgYIgYgQQgOgIgWAEQABgHAJgIQAIgIACgHQBOA/DJAHQCXAECVgYQAAAGgGAIQgFAHABAJIAAAeIgYABQgOABgCAIIgUAAIj3AXIghABQiEAAhDgig");
	this.shape_13.setTransform(-2.3289,8.8625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque_2
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#5E5A76").s().p("Ap2cUQkFhQhsiiIAAiBIhFgzIgBAAIgfgYQgRgPgCgVQAjjOAYkwQAHhcAbnLQArrGBUlSQARhEAvhWIBWiWQBojBgOi3QDphTDFidIAnAAIABgVQAIgNACgVQgBhIAigTQAwgbA2AHICDAQQBNAIBtgTQBsgTAcABQAdABAZAJQAZAJAJA0QgJBBACAhQAQgCAEAMQAtCAC/BBQASAGCVArQBlAdA4AdQBrEsh6EkQhjDujYCqQg6CwAoDlQAQBjBcE7QAQA1AyCTQApB4APBDQAiCZguBoQATCCgIA8QAECtghAdQgiAehTBiQhTBhkCBfQkCBfklAHIg5ABQkQAAjWhDgAiUYuIACAAIgDAAIABAAgABvzrIADgBQAGgCAEgEQgGAFgHACg");
	this.shape_14.setTransform(-0.0002,3.2074);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_corps, rect = new cjs.Rectangle(-112,-184.6,224,375.7), [rect]);


(lib.colette_chaussuregauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3C5480").s().p("AgDAJQBGiLARhPQALB+gyB1QguBxhUA/QANhABFiJg");
	this.shape.setTransform(19.4992,30.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#29293D").s().p("Ag1AyQABgIgDgvQgCgkAOgIIAABZIA3gBQAkgCAIANg");
	this.shape_1.setTransform(-23.6879,15.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#413F3C").s().p("ABLAyIgwgmQg8gnhXATQgTgJgBgfIAUgKQAMgHAIgDQBgggBWA0QAnAXAOAgQAPAkgVAmQgZgJgdgWg");
	this.shape_2.setTransform(-15.9875,7.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#413F3C").s().p("AAYAMQhBgHhIAQQgygVBGg6QBxgJA6AUQBQAcggBQQgWgphQgIg");
	this.shape_3.setTransform(-13.7089,-8.9397);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#10101E").s().p("AltKuQh2gQhMgwQAHg8AigxQAXggAzgrQA9gzATgUQAogsAPgzQAxADBPAbQBUAcASACQgDgzgnggQgNgLhBgkQgIgNgkACIg4ABIAAiCQBXgTA9AoIAwAmQAdAWAZAJQAVgmgPgkQgOghgngXQhXgzhgAfQgFgRAIgSQAJgTgCgPQBIgQBCAHQBQAIAWApQAehRhPgcQg6gUhxAJQANhoBJiTQBQihAOg5QgEAMgQAHQBWhwB2AVQBoARBtBwQBlBnBCCMQBDCOgCBrQgCBOgiBZQgUA1g1BlQg0BkgTAzQgfBUABBJQgZAXg2gDQgxgCgggSQgLgKAAgdIABgzQgWBShbA5QhRAzh5AUQhBALhAAAQgzAAgygHgACrE3QhFCJgMBAQBTg/AwhxQAyh2gLh+QgSBQhHCLg");
	this.shape_4.setTransform(1.9029,-0.0027);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3C5480").s().p("AjRG5QAfghA9gtIBSg/QAQpIEHk7QAQgIAEgMQgOA6hQChQhJCTgNBoQhHA6AzAVQACAQgJASQgIATAFARQgIACgMAHIgUAKQABAfATAKIAAAnQgOAJACAjQADAxgBAHQgCAHgLARQgIANABANQARAJADALQgPA0gnAsQgTATg9AzQgzArgXAgQgiAxgHA8QhThLBjhng");
	this.shape_5.setTransform(-31.4926,0.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#413F3C").s().p("AAXAiQhOgagxgDQgCgLgSgIQgBgOAJgNQALgQABgHIBtAAQBBAjANALQAnAfADA0QgRgChVgdg");
	this.shape_6.setTransform(-18.6053,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_chaussuregauche, rect = new cjs.Rectangle(-57.9,-69.2,115.8,138.5), [rect]);


(lib.colette_chaussuredroite = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3C5480").s().p("AgDAJQBGiLARhPQALB+gyB1QguBxhUA/QANhABFiJg");
	this.shape.setTransform(19.4992,30.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#29293D").s().p("Ag1AyQABgIgDgvQgCgkAOgIIAABZIA3gBQAkgCAIANg");
	this.shape_1.setTransform(-23.6879,15.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#413F3C").s().p("ABLAxIgwglQg8gohXAUQgTgJgBgfIAUgKQAMgHAIgDQBgggBWA0QAnAXAOAgQAPAkgVAmQgZgJgdgXg");
	this.shape_2.setTransform(-15.9875,7.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#413F3C").s().p("AAYALQhBgHhIARQgzgVBHg6QBxgJA6AUQBQAcggBQQgWgphQgJg");
	this.shape_3.setTransform(-13.7332,-8.9397);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#10101E").s().p("AltKuQh2gQhMgwQAHg8AigxQAXggAzgrQA9gzATgUQAogsAPgzQAxADBPAbQBUAcASACQgDgzgnggQgNgLhBgkQgIgNgkACIg4ABIAAiCQBXgUA9ApIAwAlQAdAXAZAJQAVgmgPgkQgOghgngXQhXgzhgAfQgFgRAIgSQAJgTgCgPQBHgRBDAHQBQAJAWApQAehRhPgcQg6gUhxAJQANhoBJiTQBQihAOg5QgEAMgQAHQBWhwB2AVQBoARBtBwQBlBnBCCMQBDCOgCBrQgCBOgiBZQgUA1g1BlQg0BkgTAzQgfBUABBJQgZAXg2gDQgxgCgggSQgLgKAAgdIABgzQgWBShbA5QhRAzh5AUQhBALhAAAQgzAAgygHgACrE3QhFCJgMBAQBTg/AwhxQAyh2gLh+QgSBQhHCLg");
	this.shape_4.setTransform(1.9029,-0.0027);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3C5480").s().p("AjRG5QAfghA9gtIBSg/QAQpIEHk7QAQgIAEgMQgOA6hQChQhJCTgNBoQhIA5A0AWQACAPgJATQgIASAFASQgIACgMAHIgUAKQABAfATAKIAAAnQgOAJACAjQADAxgBAHQgCAHgLARQgIANABANQARAJADALQgPA0gnAsQgTATg9AzQgzArgXAgQgiAxgHA8QhThLBjhng");
	this.shape_5.setTransform(-31.4926,0.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#413F3C").s().p("AAXAiQhOgagxgDQgCgLgSgIQgBgOAJgNQALgQABgHIBtAAQBBAjANALQAnAfADA0QgRgChVgdg");
	this.shape_6.setTransform(-18.6053,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_chaussuredroite, rect = new cjs.Rectangle(-57.9,-69.2,115.8,138.5), [rect]);


(lib.colette_brasgauche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0C0C26").s().p("AnJJcQgFhXAjg/QCiA9DZgUQDPgUCFhRIAAh4QhiAggzAOQhXAZhJAJIjmAAQgLgJgbgBIgxADQg+ACgBgjIAUhkQCfAhDLghQBrgSDcg+QAWj4AcizQAgjTAwirQAXBYgJBuQgGBPgbB/QglCvgGAnQgVB7ADBiQgNAtACBeIABDnQiJBoj2AeQhDAIg8AAQi0AAh3hIg");
	this.shape.setTransform(-0.0204,10.2094);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1F1B36").s().p("AlnBDIAOhGQAIguAIgXQABAjA9gCIAygDQAbABALAJQApANBKAAQBKAAAogNQBJgJBYgZQAzgOBiggIAAB3QiFBRjRAUQg1AFgzAAQiYAAh5gug");
	this.shape_1.setTransform(-6.8,48.9063);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0C0C26").s().p("AgXBcIgkgJQANhWANgnQAXhEA8AYQAPAxgIA0QgHA3geAXg");
	this.shape_2.setTransform(-27.8,14.2773);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0C0C26").s().p("AghBZQgbgIAGg3IACgRQADgPARgmQAQgnAOgFQANgGAWAMQAoAngeBJQgMAggVARQgOAMgQAAQgGAAgHgCg");
	this.shape_3.setTransform(-20.0912,-13.9265);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1F1B36").s().p("AmZIaQANhuAniKIBLjwQAkhtAfilQAbiSAxhHQAwhEBQgcQBKgbBWAPQBVAPBFAyQBJA2AiBPQgwCsggDSQgcCzgWD4QjcA+hrASQhmARhaAAQhbAAhPgRgAlXFCQgNAngNBXIAkAJIAsABQAegXAHg3QAIg1gPgxQgQgGgOAAQglAAgRAygAjoAvIAABHQgPA6AWgSQAVgQANggQAZhBgxAAIgRACg");
	this.shape_4.setTransform(3.2,-22.2336);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#191630").s().p("AhygFIDlAAQgoAMhLgBQhJABgpgMg");
	this.shape_5.setTransform(-13.3,46.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_brasgauche, rect = new cjs.Rectangle(-45.8,-77.7,91.7,155.6), [rect]);


(lib.colette_brasdroit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1F1B36").s().p("AgqKaQi3g2h3hmQgDgZAJgnQAIgmgEgcQCSBeCYAwQCwA4DNACIAACCQgfACgfAAQioAAidgugAgTGBQiAgwinhhQgBg5ALhiIAAgEIAIhSQADgogBgcIAAjcQABgfANhkQALhOAsiZQATgOAXgLQBPgoBiAGQBhAFBDBBQBDBAAaA4QAaA3AOA/QANBAgJAnQATBiAJCWIAMEFIgBBwQgCBFANAdIAAAoQi9gKivhBgADdDkQgKAwAOBAQATANATAFIA0ACQANgygGg0QgFgygWgmIgNgBQgxAAgMA7gADQgSQAIBQA7AIQAcgSAJgtQAHgjgEg9QgJgIgagMQgZgLgKgJQgtAhAIBOg");
	this.shape.setTransform(3.9109,-8.2811);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Calque_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0C0C26").s().p("Ag7LwQi+hDiSiLQAtkNASiKQAfjugEjMIAAiVIAWh9QAIg2AbguQAcguAjgQIgBAEQATgOAXgMQBPgnBhAFQBiAFBDBBQBDBBAaA3QAaA3AOBAQANA/gJAoQATBiAJCVIAMEGIgBBvQgCBGANAdIAAEiQAMASgBAuIgBBMQhjAehnAAQh8AAh/gsg");
	this.shape_1.setTransform(0.0038,0.1703);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_brasdroit, rect = new cjs.Rectangle(-39.5,-79.4,79.1,159.3), [rect]);


(lib.colette_bouche4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0090D").s().p("ACHAyQhfgkhPgGQh6gIgNBQIgcgFQgKABgMgGQgugoAZg1QAWgwAxgSIECAYQCOAcAdB/QhYgFgggjg");
	this.shape.setTransform(-0.0007,-10.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7F0E3").s().p("AhlBSQg5gfABhMQAMhQB6AIQBQAGBfAkQAVAxgtAsQgoAphFAOQgZAGgXAAQgoAAgggRg");
	this.shape_1.setTransform(-1.65,0.4347);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D0272D").s().p("AjKBKQhBg8AihzQAMAHAKgBIAcAEQgBBNA5AeQAyAaBHgPQBEgOApgoQAsgtgVgxQAgAkBYAEQgGBThZA7QhTA2hoAGIgVABQhdAAg0gwg");
	this.shape_2.setTransform(0.9191,7.0058);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_bouche4, rect = new cjs.Rectangle(-25.5,-19.1,51,38.3), [rect]);


(lib.colette_bouche2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0090D").s().p("AjbA2QgJACgBgMQgTAEgSgIQgSgJgPADIgvgSQgbgMgGgTQBig3DPALIF2AYQAIALAiAHQAfAIAHANQgJgCgHAFQgJAHgFAAQg2AkhqAEQg+gJiOAMQg6AFgvAAQg8AAgogIg");
	this.shape.setTransform(-8,-8.2497);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B76D4A").s().p("AhOAiQghgIgIgLQA9ABAygTQAkgQAqgjQA2AHgEBSQgRgCgDAMQgngLgagCQgugGgcAdQgHgOgggHg");
	this.shape_1.setTransform(34.0138,-13.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F7F0E3").s().p("AiNArQg8gigDhJQBHAOCFgLQCPgLA+AIQgJA0hAAlQg+AjhMAHIgdABQg+AAgsgZg");
	this.shape_2.setTransform(-9.5,3.6097);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D0272D").s().p("AjuBZQhfg9AJiIQAPgCATAIQASAIASgEQABAMAJgCQADBKA9AhQA1AfBRgHQBNgHA9gjQBAglAJg0QBqgEA2gkQgMBdhrBJQhlBFh+ARQghAFgeAAQhcAAg+gog");
	this.shape_3.setTransform(-5.5389,6.0172);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_bouche2, rect = new cjs.Rectangle(-46,-18.8,92.1,37.8), [rect]);


(lib.colette_bouche1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B76D4A").s().p("AhlAhQADgIgLgFQAUgUApgSIBEgfQAHASApAUQAkARAGAYQgxgeg+AQQhIAagkAIg");
	this.shape.setTransform(38.4,-10.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B0090D").s().p("AldAiQgqgPAEgtQAEguAsgNQAjgLAxAbQA6AgAcACQAbABAugWQA0gZAZgEQBVgNCKAqIBfAbIBRAEQALAEgEAJIgHAQQgPgEgMAHQgMAJgLgCIimAmQhnAXhKAIQgzAGguAAQiPAAhgg3g");
	this.shape_1.setTransform(-10.5753,-5.6425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D0272D").s().p("AjaBFQhlgtgUhkQCABJDQgYQBKgIBngXICmgmQgYBHhnA2QhhA0h3ANQggADgeAAQhXAAhCgcg");
	this.shape_2.setTransform(-11.6,5.4986);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_bouche1, rect = new cjs.Rectangle(-49.4,-15.2,98.8,30.5), [rect]);


(lib.mc_titre_slide = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.champ = new cjs.Text("Titre du slide\nen cours", "80px 'Raleway'", "#383838");
	this.champ.name = "champ";
	this.champ.textAlign = "center";
	this.champ.lineHeight = 92;
	this.champ.lineWidth = 1916;
	this.champ.parent = this;
	this.champ.setTransform(960,2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAEAEA").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.champ}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_titre_slide, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.mc_subtitles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// champ
	this.champ = new cjs.Text("Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit", "45px 'Quicksand Medium'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.textAlign = "center";
	this.champ.lineHeight = 47;
	this.champ.lineWidth = 1708;
	this.champ.parent = this;
	this.champ.setTransform(856.2,-118);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(1));

	// outline_champ
	this.outline_champ = new cjs.Text("Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit", "45px 'Quicksand Medium'");
	this.outline_champ.name = "outline_champ";
	this.outline_champ.textAlign = "center";
	this.outline_champ.lineHeight = 47;
	this.outline_champ.lineWidth = 1708;
	this.outline_champ.parent = this;
	this.outline_champ.setTransform(856.2,-118);

	this.timeline.addTween(cjs.Tween.get(this.outline_champ).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_subtitles, rect = new cjs.Rectangle(0,-120,1712.5,220), [rect]);


(lib.mc_pause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAEAEA").s().p("Ah3F6IAArzIDvAAIAALzg");
	this.shape.setTransform(938.85,448.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EAEAEA").s().p("Ah3F6IAArzIDvAAIAALzg");
	this.shape_1.setTransform(979.35,448.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EAEAEA").s().p("AiSDSIAAmjIEgAAIAABWIi/AAIAABRICkAAIAABNIikAAIAABZIDEAAIAABWg");
	this.shape_2.setTransform(1039.375,528.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EAEAEA").s().p("AgjDSIgwgKIgsgRQgVgJgTgMIArhUIAPALIAgARIArAOQAYAGAXAAQAzAAAAgfQAAgMgHgIQgJgHgNgGIgggLIgogNQgcgIgWgLQgVgKgOgMQgOgOgGgSQgIgSABgXQAAghAMgaQANgZAVgSQAVgRAcgJQAcgIAegBQAWAAAWAFIAoAKIAkAPIAgAQIgrBRIgMgJIgbgNIgigNQgTgFgTAAQgzAAAAAjQAAAKAFAHQAGAHAKAGIAcAKIAmALIA2ASQAYAKAQANQASAOAIAVQAKAVAAAdQAAAjgNAYQgNAZgWAPQgXAPgcAHQgcAGgeABg");
	this.shape_3.setTransform(1002.25,528.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EAEAEA").s().p("AhVDCQgjgRgWgdQgXgcgKgmQgKgmAAgpIAAjVIBhAAIAADVQAAAYAEAWQAFAWALARQAKARARAKQARAKAYAAQAZAAARgKQARgKALgSQAKgRAFgWQAEgWAAgXIAAjVIBhAAIAADVQAAAsgLAlQgLAmgXAcQgWAdgkAQQgjAQgwAAQgxAAgkgRg");
	this.shape_4.setTransform(962.375,528.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EAEAEA").s().p("ABhDSIgghfIiCAAIgfBfIhjAAICZmjIBWAAICYGjgAAxAxIgxiTIgxCTIBiAAg");
	this.shape_5.setTransform(920.6,528.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EAEAEA").s().p("AidDSIAAmjICyAAQAeAAAZANQAZANASATQASAVAKAZQALAZAAAaQAAAcgKAaQgKAXgRAVQgSAUgYALQgZAMgeABIhUAAIAACHgAg8gJIBOAAQARAAANgOQAMgPAAgdQAAgPgEgLQgEgKgGgHQgHgHgIgDIgRgDIhKAAg");
	this.shape_6.setTransform(883.9,528.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#383838").s().p("AuzO0QmJmJAAorQAAoqGJmKQGImIIrAAQIsAAGIGIQGJGKAAIqQAAIrmJGJQmIGJosAAQorAAmImJg");
	this.shape_7.setTransform(960,498.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque 1
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(0,0,0,0.047)").s().p("EpurBUYMAAAiovMTdWAAAMAAACovg");
	this.shape_8.setTransform(960.15,540);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_pause, rect = new cjs.Rectangle(-3025,0,7970.3,1080), [rect]);


(lib.mc_nav_preogression_prog = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {off:0,on:6,vu:13};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape.setTransform(10.0099,9.9902,0.905,0.905);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_1.setTransform(10.0099,9.9902,0.905,0.905);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_2.setTransform(10.0099,9.9902,0.905,0.905);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},6).to({state:[{t:this.shape_2}]},7).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,20,20);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.mc_nav_menu_item = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {nonvu:0,"vu":7};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14));

	// champ
	this.champ = new cjs.Text("2/14 - Les différents types de handicap : handicap moteur, maladies invalidantes", "35px 'Raleway'", "#EAEAEA");
	this.champ.name = "champ";
	this.champ.lineHeight = 39;
	this.champ.lineWidth = 1650;
	this.champ.parent = this;
	this.champ.setTransform(64.15,2);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(14));

	// coches
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2B2B2A").ss(2,1,1).p("AjiA3IBxBxIBQABQBBhAAxgwICSiQIgogrQgOgQgVgWIgBACIgbAaIg4A2IiOCIIhKhJg");
	this.shape.setTransform(22.725,20.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AinCpIgDgDIBQABIByhvIhxBxgACCiDIApApIgBACgABdioIAAAAIgaAag");
	this.shape_1.setTransform(28.475,21.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2B2B2A").s().p("AhxCnIhxhxIBOhOIBKBJIADADICLiKIA4g3IAbgaIAkAlIAoAqIiSCRIhyBvg");
	this.shape_2.setTransform(22.725,20.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EAEAEA").s().p("AhxCnIhxhxIBOhOIBKBJIADADICLiKIA4g3IAbgaIAkAlIAoAqIiSCRIhyBvg");
	this.shape_3.setTransform(22.725,20.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_1},{t:this.shape}]},7).wait(7));

	// Calque_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383838").s().p("EiGMAEEIAAoHMEMZAAAIAAIHg");
	this.shape_4.setTransform(858.3,23.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(14));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-1,-2.3,1718.2,52);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.mc_choice_quiz_target = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4D4D4D").s().p("AjNDhQhXhPgLh4IgBgaQAAh1BPhWQBRhYB2gKIAbgDQB2AABXBPQBYBSAKB1IABAbQAAB2hQBWQhPBZh4AKIgaABQh1AAhYhQgAgVkAQhkAIhEBLQhFBLAABiIABAXQAJBlBLBEQBJBDBkAAQAPAAAIgBQBlgJBEhKQBDhLAAhjIgBgWQgJhlhLhEQhJhEhkAAg");
	this.shape.setTransform(32.9,30.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhOBdQgmgggFgyQgEgyAhgnQAggmAygFQAygEAmAhQAnAgAEAyQAFAyghAmQggAngzAEIgLABQgqAAgjgdg");
	this.shape_1.setTransform(32.9126,30.5126,2.3106,2.3106);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_choice_quiz_target, rect = new cjs.Rectangle(2.4,0,61,61), [rect]);


(lib.mc_aide_textes_part3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAZBJIAAhQQAAgOgFgGQgFgHgJAAQgEAAgFADIgJAFIgHAIQgDAEgCAGIAABRIgsAAIAAiOIAnAAIAAAYQAIgNAPgHQANgHATAAQANAAAJAFQAIAGAGAHQAEAJABAJIACASIAABbg");
	this.shape.setTransform(165.8,114.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_1.setTransform(149.375,114.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAnAAIAAAdQAHgPALgIQAMgIANgBIAFAAIADABIAAAnQgQAAgNAFQgNAFgFAKIAABVg");
	this.shape_2.setTransform(136.65,114.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_3.setTransform(122.975,114.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgfBfQgOgGgKgKQgKgKgFgNQgFgNgBgPQABgPAFgNQAFgOAKgKQAJgLAPgGQAOgGASAAQARAAAPAGQAOAGAKALQAJAKAGANQAEANAAAOIAAAIIgBAGIhoAAQABAPAKAHQAJAIALAAQAJAAAJgFQAJgFADgIIAlALQgJARgRAKQgSALgYAAQgRAAgPgGgAAeANQgBgNgIgHQgJgIgMAAQgMAAgJAIQgHAHgCANIA8AAIAAAAgAgPhAIAPgkIAmAAIgaArg");
	this.shape_4.setTransform(106.95,111.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAZBJIAAhQQAAgOgFgGQgGgHgIAAQgEAAgEADIgJAFIgIAIQgEAEgCAGIAABRIgrAAIAAiOIAoAAIAAAYQAHgNAOgHQAOgHATAAQANAAAJAFQAIAGAGAHQAEAJABAJIACASIAABbg");
	this.shape_5.setTransform(84.1,114.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVBkIAAiOIArAAIAACOgAgVg7IAAgnIArAAIAAAng");
	this.shape_6.setTransform(72.025,111.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAJgLQALgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgJARgRALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgJAIQgHAIgCAOIA9AAIAAAAg");
	this.shape_7.setTransform(60.2,114.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgcBbQgKgKAAgSIAAijIArAAIAACTQAAARAOAAIAHgBIAHgDIAGAhQgIADgLADQgLACgJAAQgSAAgKgKg");
	this.shape_8.setTransform(48.125,111.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhLBmIAAjIIAmAAIAAAXQAIgMALgHQAMgHAQAAQAOAAAMAGQAMAGAJAJQAJALAFANQAFAOAAAPQAAAQgFANQgEANgIAKQgJAKgLAGQgLAGgOAAQgPAAgMgHQgMgHgHgMIAABRgAgTg6QgIAFgFAJIAAAeQAFAKAJAHQAIAHAKAAQAHAAAFgEQAGgCAFgFQAEgFACgGQADgIAAgHQAAgIgDgHQgCgGgFgGQgFgFgGgCQgGgCgHgBQgJAAgIAGg");
	this.shape_9.setTransform(34.525,117.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAZBJIAAhQQAAgNgFgHQgFgGgJgBQgFAAgDACIgJAGIgIAIQgDAFgDAFIAABRIgrAAIAAiOIAnAAIAAAYQAIgNAOgHQAOgHATAAQANAAAJAFQAJAFAEAJQAFAIACAJIABATIAABag");
	this.shape_10.setTransform(145.6,84.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAJgLQALgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgJARgRALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgIAIQgIAIgCAOIA9AAIAAAAg");
	this.shape_11.setTransform(129.05,84.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgFgOQgGgNAAgOQAAgPAGgOQAFgNAJgLQAKgKAPgGQAOgGASAAQASAAAOAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAJAIQAKAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgSAAgOgFgAAegMQAAgOgJgIQgIgIgNAAQgMAAgJAIQgHAIgCAOIA8AAIAAAAg");
	this.shape_12.setTransform(106.3,84.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAnAAIAAAdQAHgPAMgIQALgIANgBIAFAAIACABIAAAnQgPAAgNAFQgNAFgFAKIAABVg");
	this.shape_13.setTransform(93.2,84.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgHBdQgHgCgGgEQgFgFgDgHQgEgHAAgLIAAhJIgSAAIAAghIASAAIAAgtIArAAIAAAtIAdAAIAAAhIgdAAIAAA6QAAAIAEADQADADAGAAIAKgBIAJgEIAIAiIgVAIQgLACgMAAQgHAAgHgCg");
	this.shape_14.setTransform(81.85,82.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHBdQgIgCgFgEQgGgFgDgHQgCgHAAgLIAAhJIgTAAIAAghIATAAIAAgtIAqAAIAAAtIAdAAIAAAhIgdAAIAAA6QAAAIAEADQADADAGAAIAJgBIAKgEIAIAiIgUAIQgMACgMAAQgHAAgHgCg");
	this.shape_15.setTransform(70.9,82.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgFgNgBgOQABgPAFgOQAFgNAKgLQAJgKAPgGQAOgGARAAQASAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_16.setTransform(57.1,84.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AA2BhIAAhzIgqBTIgXAAIgqhTIAABzIgtAAIAAjBIAxAAIAxBkIAyhkIAxAAIAADBg");
	this.shape_17.setTransform(37.125,82.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#FF6348").ss(12).p("AkswaIBNCbQBeDKBUDqQELLrBIMR");
	this.shape_18.setTransform(133.5616,228.8929);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF6348").s().p("AjzjlIHnAmIkVGlg");
	this.shape_19.setTransform(165.175,335.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF6348").s().p("ArlH8QjIAAAAjIIAApnQAAjIDIAAIXLAAQDIAAAADIIAAJnQAADIjIAAg");
	this.shape_20.setTransform(99.475,98.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_aide_textes_part3, rect = new cjs.Rectangle(5.3,47.7,188.4,310.8), [rect]);


(lib.mc_aide_textes_part2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape.setTransform(270.925,200.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIApAAIAAAdQAGgPAMgIQALgIANgBIAFAAIACABIAAAnQgPAAgOAFQgMAFgFAKIAABVg");
	this.shape_1.setTransform(259.35,200.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag9A7QgMgNAAgbIAAhbIArAAIAABRQAAANAGAHQAFAHAKAAQAIAAAHgEQAIgFAHgMIAAhXIAsAAIAABdQAAAHABACQACADAGABIAAAkIgKACIgIAAQgYAAgDgSIgBgIQgKAOgPAGQgOAHgRAAQgWAAgLgOg");
	this.shape_2.setTransform(245,200.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgfBEQgPgGgJgKQgKgKgGgNQgEgOAAgPQAAgNAEgOQAGgNAKgLQAJgKAPgGQAOgGARAAQASAAAPAGQAOAGAKAKQAJALAFANQAGAOAAANQAAAPgGAOQgEANgKAKQgKAKgOAGQgPAGgSAAQgRAAgOgGgAgLghQgHACgDAFQgFAFgCAHQgDAHAAAHQAAARAKAKQAIALANAAQAHAAAGgDQAFgDAFgFQAEgFADgHQACgGAAgJQAAgQgJgKQgJgKgOAAQgGAAgFADg");
	this.shape_3.setTransform(227.95,200.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_4.setTransform(212.025,200.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAZBJIAAhQQAAgNgFgHQgGgGgIgBQgFAAgDACIgJAGIgIAIQgEAFgCAFIAABRIgrAAIAAiOIAoAAIAAAYQAHgNAOgHQAOgHATAAQANAAAJAFQAJAFAFAJQAEAIACAJIABATIAABag");
	this.shape_5.setTransform(189.6,200.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAJgLQALgKAOgGQAOgGARAAQATAAAOAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA9AAIAAAAg");
	this.shape_6.setTransform(173.05,200.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgFgOQgGgNAAgOQAAgPAGgOQAFgNAJgLQAKgKAPgGQAOgGASAAQASAAAOAGQAOAGAKAKQAKAKAEAOQAGANgBAOIAAAHIAAAHIhpAAQABAOAJAIQAKAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgRAAgPgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgJAIQgHAIgCAOIA9AAIAAAAg");
	this.shape_7.setTransform(150.3,200.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAnAAIAAAdQAHgPALgIQAMgIANgBIAFAAIADABIAAAnQgQAAgNAFQgNAFgFAKIAABVg");
	this.shape_8.setTransform(137.2,200.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHBdQgIgCgFgEQgFgFgDgHQgEgHAAgLIAAhJIgSAAIAAghIASAAIAAgtIArAAIAAAtIAdAAIAAAhIgdAAIAAA6QAAAIADADQAEADAFAAIALgBIAJgEIAIAiIgVAIQgLACgMAAQgHAAgHgCg");
	this.shape_9.setTransform(125.85,198.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgVBjIAAiNIArAAIAACNgAgVg7IAAgoIArAAIAAAog");
	this.shape_10.setTransform(116.525,197.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhLBmIAAjIIAmAAIAAAXQAIgMALgHQAMgHAQAAQAOAAAMAGQAMAFAJAKQAJALAFANQAFANAAAQQAAAQgFANQgEANgIALQgJAJgLAGQgLAGgOgBQgPAAgMgGQgMgHgHgMIAABRgAgTg7QgIAGgFAJIAAAdQAFALAJAGQAIAIAKAAQAHAAAFgDQAGgDAFgEQAEgFACgHQADgIAAgHQAAgIgDgHQgCgHgFgEQgFgFgGgDQgGgDgHABQgJAAgIAEg");
	this.shape_11.setTransform(104.575,203);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_12.setTransform(87.425,200.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAZBjIAAhQQAAgOgFgGQgGgGgJAAIgHACIgJAFIgIAHQgEAFgCAFIAABSIgrAAIAAjGIArAAIAABQQAJgMANgHQAMgIAPAAQAOAAAJAGQAJAFAFAHQAFAJACAJIABASIAABbg");
	this.shape_13.setTransform(71.25,197.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_14.setTransform(55.225,200.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAKgLQAKgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAFANABAOIAAAHIgCAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAegMQAAgOgJgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_15.setTransform(32.9,200.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgcBbQgKgKAAgSIAAijIArAAIAACTQAAARAOAAIAHgBIAHgDIAGAhQgIADgLADQgLACgJAAQgSAAgKgKg");
	this.shape_16.setTransform(20.825,197.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIApAAIAAAdQAGgPALgIQAMgIANgBIAEAAIAEABIAAAnQgRAAgNAFQgMAFgFAKIAABVg");
	this.shape_17.setTransform(204.3,170.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgGgNAAgOQAAgPAGgOQAFgNAJgLQALgKAOgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgSAAgOgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgJAIQgHAIgCAOIA8AAIAAAAg");
	this.shape_18.setTransform(190.1,170.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_19.setTransform(174.175,170.225);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAZBJIAAhPQAAgPgFgGQgGgHgIABQgFAAgEACIgJAFIgHAIQgDAFgCAFIAABRIgsAAIAAiOIAnAAIAAAYQAIgNAPgHQANgHATAAQAOAAAIAFQAJAGAEAHQAFAIABAKIACASIAABbg");
	this.shape_20.setTransform(158.05,170.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgGgNAAgOQAAgPAGgOQAFgNAJgLQALgKAOgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgSAAgOgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgJAIQgHAIgCAOIA8AAIAAAAg");
	this.shape_21.setTransform(141.5,170.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("ABGBJIAAhPQgBgPgFgGQgFgHgIABQgFAAgEACQgFACgDADIgHAIIgFAKIAABRIgqAAIAAhPQAAgPgGgGQgFgHgJABQgIAAgIAGQgIAIgFALIAABRIgrAAIAAiOIAoAAIAAAYQAHgNANgHQAOgHASAAQAJAAAHADQAFACAGADQAEAEADAFQADAGACAFQAIgNANgIQAOgHARAAQANAAAIAFQAJAGAFAHQAEAIABAKIACASIAABbg");
	this.shape_22.setTransform(120.55,170.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("ABGBJIAAhPQAAgPgGgGQgFgHgIABQgEAAgFACQgEACgEADIgHAIIgFAKIAABRIgqAAIAAhPQgBgPgFgGQgFgHgIABQgJAAgIAGQgIAIgFALIAABRIgrAAIAAiOIAoAAIAAAYQAHgNANgHQAOgHASAAQAJAAAHADQAGACAFADQAEAEADAFQADAGABAFQAJgNANgIQAOgHARAAQANAAAIAFQAJAGAFAHQAEAIACAKIABASIAABbg");
	this.shape_23.setTransform(95.1,170.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AggBEQgOgGgKgKQgJgKgFgNQgGgOAAgPQAAgNAGgOQAFgNAJgLQAKgKAOgGQAPgGARAAQATAAANAGQAOAGALAKQAJALAGANQAEAOAAANQAAAPgEAOQgGANgJAKQgKAKgPAGQgNAGgTAAQgRAAgPgGgAgMghQgFACgFAFQgEAFgDAHQgCAHAAAHQAAARAJAKQAJALANAAQAHAAAFgDQAHgDADgFQAFgFACgHQACgGAAgJQAAgQgIgKQgKgKgNAAQgGAAgGADg");
	this.shape_24.setTransform(74,170.225);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_25.setTransform(58.075,170.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgGgNAAgOQAAgPAGgOQAFgNAJgLQALgKAOgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgSAAgOgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgJAIQgHAIgCAOIA8AAIAAAAg");
	this.shape_26.setTransform(42.05,170.225);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAeBhIgkg/IgdAAIAAA/IgtAAIAAjBIBXAAQANAAAMAGQALAGAJAJQAIAJAFAMQAFAMAAAMQAAAJgDAIQgCAIgEAHQgEAHgGAGQgGAGgHAEIArBIgAgjgEIAoAAQAIAAAGgHQAFgIAAgLQAAgMgGgHQgHgHgIAAIgmAAg");
	this.shape_27.setTransform(25.425,167.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgFgNgBgOQABgPAFgOQAFgNAKgLQAJgKAPgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgYAAQgRAAgPgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_28.setTransform(227.2,70.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_29.setTransform(212.125,70.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("Ag9A7QgMgNAAgbIAAhbIAsAAIAABRQgBANAGAHQAFAHAKAAQAIAAAIgEQAHgFAHgMIAAhXIArAAIAABdQAAAHACACQACADAGABIAAAkIgLACIgIAAQgXAAgEgSIAAgIQgKAOgPAGQgNAHgSAAQgWAAgLgOg");
	this.shape_30.setTransform(197.05,70.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_31.setTransform(180.275,70.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AhLBmIAAjIIAmAAIAAAXQAIgMALgHQAMgHAQAAQAOAAAMAGQAMAGAJAJQAJALAFANQAFAOAAAPQAAAQgFANQgEANgIAKQgJAKgLAGQgLAGgOAAQgPAAgMgHQgMgHgHgMIAABRgAgTg6QgIAFgFAJIAAAeQAFAKAJAHQAIAHAKAAQAHAAAFgEQAGgCAFgFQAEgFACgGQADgIAAgHQAAgIgDgHQgCgGgFgGQgFgFgGgCQgGgCgHgBQgJAAgIAGg");
	this.shape_32.setTransform(164.075,73.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAZBJIAAhQQAAgNgFgHQgFgGgJgBQgEAAgFACIgJAGIgHAIQgDAFgCAFIAABRIgsAAIAAiOIAnAAIAAAYQAIgNAPgHQANgHATAAQANAAAJAFQAIAFAGAJQAEAIABAJIACATIAABag");
	this.shape_33.setTransform(275.15,40.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgFgNgBgOQABgPAFgOQAFgNAKgLQAJgKAPgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgRAAgPgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgJAIQgHAIgCAOIA8AAIAAAAg");
	this.shape_34.setTransform(258.6,40.475);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAKgLQAKgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAFAOQAEANABAOIAAAHIgCAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAegMQAAgOgJgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_35.setTransform(235.85,40.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIApAAIAAAdQAGgPALgIQAMgIANgBIAEAAIAEABIAAAnQgRAAgNAFQgMAFgFAKIAABVg");
	this.shape_36.setTransform(222.75,40.375);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgHBeQgIgDgFgEQgGgFgDgHQgCgHAAgLIAAhJIgTAAIAAghIATAAIAAguIAqAAIAAAuIAdAAIAAAhIgdAAIAAA6QAAAIADADQAEADAFAAIAKgBIAJgEIAJAiIgUAIQgMACgMAAQgHAAgHgBg");
	this.shape_37.setTransform(211.4,38.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgHBeQgIgDgFgEQgGgFgDgHQgDgHAAgLIAAhJIgSAAIAAghIASAAIAAguIArAAIAAAuIAdAAIAAAhIgdAAIAAA6QAAAIADADQAEADAFAAIAKgBIAJgEIAJAiIgVAIQgLACgMAAQgHAAgHgBg");
	this.shape_38.setTransform(200.45,38.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAJgLQALgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgJARgRALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgJAIQgHAIgCAOIA9AAIAAAAg");
	this.shape_39.setTransform(186.65,40.475);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AA2BhIAAhzIgqBTIgXAAIgqhTIAABzIgtAAIAAjBIAxAAIAxBkIAyhkIAxAAIAADBg");
	this.shape_40.setTransform(166.675,37.975);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgHBeQgHgCgGgFQgFgFgEgGQgDgIABgKIAAhKIgTAAIAAghIATAAIAAgtIAqAAIAAAtIAdAAIAAAhIgdAAIAAA6QAAAHADAEQAEADAFAAIAKgCIAJgDIAJAjIgVAHQgLADgMAAQgHAAgHgCg");
	this.shape_41.setTransform(452.35,-13.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAZBJIAAhPQAAgPgFgGQgGgHgIABQgFAAgDACIgJAFIgIAIQgEAFgCAFIAABRIgrAAIAAiOIAoAAIAAAYQAHgNAOgHQAOgHATAAQANAAAJAFQAJAGAFAHQAEAIACAKIABASIAABbg");
	this.shape_42.setTransform(438.45,-11.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_43.setTransform(422.025,-11.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgXBHIgyiOIAtAAIAeBrIAfhrIApAAIgyCOg");
	this.shape_44.setTransform(406.525,-11.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgVBjIAAiOIArAAIAACOgAgVg7IAAgoIArAAIAAAog");
	this.shape_45.setTransform(395.275,-13.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("Ag+A7QgLgNAAgbIAAhbIAsAAIAABRQAAANAFAHQAFAHAJAAQAJAAAHgEQAJgFAGgMIAAhXIAsAAIAABdQAAAHACACQACADAFABIAAAkIgLACIgHAAQgYAAgDgSIgCgIQgJAOgOAGQgOAHgSAAQgXAAgLgOg");
	this.shape_46.setTransform(383.3,-10.975);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_47.setTransform(367.775,-11.125);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAKgLQAKgKAOgGQAOgGARAAQATAAAOAGQAOAGAKAKQAKAKAEAOQAFANABAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAKAAAIgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAfgMQgCgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA9AAIAAAAg");
	this.shape_48.setTransform(503.25,-41.125);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAoAAIAAAdQAGgPALgIQAMgIANgBIAEAAIAEABIAAAnQgRAAgNAFQgMAFgFAKIAABVg");
	this.shape_49.setTransform(490.15,-41.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgHBdQgHgCgGgEQgGgEgDgIQgCgHAAgLIAAhJIgTAAIAAghIATAAIAAguIAqAAIAAAuIAdAAIAAAhIgdAAIAAA7QAAAGADAEQAEADAFAAIAKgCIAJgDIAJAiIgUAHQgMADgMABQgHgBgHgCg");
	this.shape_50.setTransform(478.8,-43.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgVBkIAAiOIArAAIAACOgAgVg7IAAgnIArAAIAAAng");
	this.shape_51.setTransform(469.475,-43.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AhLBmIAAjIIAmAAIAAAXQAIgMALgHQAMgHAQAAQAOAAAMAGQAMAGAJAJQAJALAFANQAFAOAAAPQAAAQgFANQgEANgIAKQgJAKgLAGQgLAGgOAAQgPAAgMgHQgMgHgHgMIAABRgAgTg6QgIAFgFAJIAAAeQAFAKAJAHQAIAHAKAAQAHAAAFgEQAGgCAFgFQAEgFACgGQADgIAAgHQAAgIgDgHQgCgGgFgGQgFgFgGgCQgGgCgHgBQgJAAgIAGg");
	this.shape_52.setTransform(457.525,-38.35);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_53.setTransform(440.375,-41.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAZBkIAAhRQAAgOgFgFQgFgHgKAAIgIACIgIAFIgIAHQgDAFgDAGIAABSIgrAAIAAjGIArAAIAABQQAJgNAMgIQAMgGAQAAQAOAAAJAEQAJAGAFAIQAEAHACAKIACASIAABcg");
	this.shape_54.setTransform(424.2,-43.9);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_55.setTransform(408.175,-41.125);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("Ag+A7QgLgNAAgbIAAhbIAsAAIAABRQgBANAGAHQAFAHAKAAQAJAAAHgEQAHgFAHgMIAAhXIArAAIAABdQAAAHACACQADADAFABIAAAkIgLACIgIAAQgXAAgEgSIgBgIQgJAOgPAGQgNAHgSAAQgWAAgMgOg");
	this.shape_56.setTransform(385.7,-40.975);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_57.setTransform(368.925,-41.125);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIApAAIAAAdQAGgPAMgIQALgIANgBIAFAAIACABIAAAnQgQAAgNAFQgMAFgFAKIAABVg");
	this.shape_58.setTransform(443.5,-71.225);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgFgOQgGgNAAgOQAAgPAGgOQAFgNAJgLQAKgKAPgGQAOgGASAAQASAAAOAGQAOAGAKAKQAKAKAEAOQAGANgBAOIAAAHIAAAHIhpAAQABAOAJAIQAKAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgRAAgPgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgJAIQgHAIgCAOIA9AAIAAAAg");
	this.shape_59.setTransform(429.3,-71.125);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_60.setTransform(414.225,-71.125);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_61.setTransform(400.675,-71.125);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_62.setTransform(385.875,-71.125);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AhIBhIAAjBIBRAAQAOAAAMAGQALAGAJAJQAIAJAFAMQAFAMAAAMQAAANgEALQgFALgIAJQgIAJgMAGQgLAFgOAAIgnAAIAAA/gAgcgEIAkAAQAIAAAGgGQAGgHgBgNQAAgHgBgFIgFgIQgDgEgDgBIgJgBIgiAAg");
	this.shape_63.setTransform(370.15,-73.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#FF6348").ss(12).p("EgRRgilIAyAqQBCA7BMBTQD1EKEDGcUAM9AUlAKbAjl");
	this.shape_64.setTransform(500.4109,234.3111);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#FF6348").ss(12).p("Aup9OQAAAAA8A/QBNBTBVBmQERFHD9GPQMpT+E+YB");
	this.shape_65.setTransform(396.775,270.2835);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#FF6348").ss(12).p("AqfygIAtAnQA4A1A/BBQDIDQC3D+QJIMsDAPL");
	this.shape_66.setTransform(318.4335,338.3633);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FF6348").s().p("AgNAAQAAgOANAAQAOAAAAAOQAAAPgOAAQgNAAAAgPg");
	this.shape_67.setTransform(231.075,345.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FF6348").s().p("AjxihIHjhLIitHag");
	this.shape_68.setTransform(607.825,471.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FF6348").s().p("AjtiCIHbhwIiHHmg");
	this.shape_69.setTransform(487.7,469.7);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FF6348").s().p("AjxilIHjhHIizHZg");
	this.shape_70.setTransform(381.25,472.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FF6348").s().p("A1UItQjIAAAAjIIAArJQAAjIDIAAMAqpAAAQDIAAAADIIAALJQAADIjIAAg");
	this.shape_71.setTransform(148.775,184.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FF6348").s().p("AtUJ8QjIAAAAjJIAAtlQAAjJDIAAIapAAQDIAAAADJIAANlQAADJjIAAg");
	this.shape_72.setTransform(442,-42);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FF6348").s().p("Ar1H0QjIAAAAjIIAApXQAAjIDIAAIXrAAQDIAAAADIIAAJXQAADIjIAAg");
	this.shape_73.setTransform(226.725,55.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_aide_textes_part2, rect = new cjs.Rectangle(-7.7,-105.5,639.8,601.7), [rect]);


(lib.mc_aide_textes_part1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAJgLQALgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgJARgRALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgIAIQgIAIgCAOIA9AAIAAAAg");
	this.shape.setTransform(213.2,128.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAnAAIAAAdQAHgPALgIQAMgIANgBIAFAAIADABIAAAnQgQAAgNAFQgNAFgFAKIAABVg");
	this.shape_1.setTransform(200.1,128.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVBkIAAiOIArAAIAACOgAgVg7IAAgoIArAAIAAAog");
	this.shape_2.setTransform(190.375,125.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_3.setTransform(178.675,128.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABGBJIAAhQQAAgNgGgHQgFgGgIgBQgEAAgFACQgEACgEAEIgHAIIgFAKIAABRIgqAAIAAhQQgBgNgFgHQgFgGgIgBQgJAAgIAIQgIAHgFALIAABRIgrAAIAAiOIAnAAIAAAYQAIgNANgHQAOgHASAAQAJAAAHACQAGACAFAFQAEADADAFQADAGABAFQAJgOANgGQAOgIAQAAQAOAAAIAFQAJAFAFAJQAEAHACAKIABATIAABag");
	this.shape_4.setTransform(158.1,128.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABFBJIAAhQQAAgNgEgHQgGgGgIgBQgFAAgEACQgFACgDAEIgHAIIgFAKIAABRIgqAAIAAhQQgBgNgFgHQgFgGgIgBQgJAAgIAIQgJAHgDALIAABRIgsAAIAAiOIAnAAIAAAYQAIgNAOgHQANgHASAAQAJAAAHACQAGACAEAFQAFADADAFQAEAGAAAFQAIgOAOgGQANgIARAAQAOAAAJAFQAIAFAEAJQAFAHACAKIABATIAABag");
	this.shape_5.setTransform(132.65,128.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AggBEQgOgGgJgKQgLgKgEgNQgFgOgBgPQABgNAFgOQAEgNALgLQAJgKAOgGQAPgGARAAQATAAAOAGQANAGAKAKQALALAFANQAEAOAAANQAAAPgEAOQgGANgJAKQgKAKgOAGQgOAGgTAAQgRAAgPgGgAgLghQgGACgFAFQgEAFgCAHQgDAHAAAHQAAARAJAKQAJALANAAQAHAAAFgDQAHgDADgFQAFgFACgHQACgGAAgJQABgQgJgKQgKgKgNAAQgGAAgFADg");
	this.shape_6.setTransform(111.55,128.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_7.setTransform(96.475,128.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Ag9A7QgMgNAAgbIAAhbIArAAIAABRQAAANAGAHQAFAHAKAAQAIAAAHgEQAIgFAHgMIAAhXIAsAAIAABdQAAAHABACQACADAGABIAAAkIgKACIgIAAQgYAAgDgSIgBgIQgKAOgPAGQgOAHgRAAQgWAAgLgOg");
	this.shape_8.setTransform(231.5,98.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_9.setTransform(214.725,98.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAnAAIAAAdQAHgPALgIQAMgIANgBIAFAAIADABIAAAnQgQAAgNAFQgNAFgFAKIAABVg");
	this.shape_10.setTransform(195.7,98.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAKgLQAKgKAOgGQAOgGARAAQATAAAOAGQAOAGAKAKQAKAKAEAOQAFANABAOIAAAHIgBAHIhpAAQABAOAKAIQAJAHALAAQAKAAAIgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAfgMQgCgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA9AAIAAAAg");
	this.shape_11.setTransform(181.5,98.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgoBfQgMgFgJgKQgJgKgFgOQgFgNAAgQQAAgQAFgNQAEgNAJgKQAIgKAMgGQALgGAOAAQAPAAALAIQAMAHAHAMIAAhQIAsAAIAACVQAAAHACACQACADAFABIAAAkIgKACIgJAAQgLAAgHgEQgHgFgBgJIgBgHQgIANgNAGQgNAHgNAAQgPAAgNgGgAgQgGQgGADgEAEQgEAFgDAHQgCAHAAAHQAAAIADAHQACAHAFAFQAEAFAHADQAGACAHAAQAIAAAJgFQAIgFAEgKIAAgeQgEgLgJgGQgJgGgJAAQgHAAgGADg");
	this.shape_12.setTransform(164.175,95.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgfBfQgPgGgJgKQgKgKgFgNQgGgNAAgPQAAgPAGgNQAFgOAJgKQAKgLAPgGQAOgGASAAQASAAAOAGQAOAGAKALQAJAKAGANQAEANAAAOIAAAIIAAAGIhpAAQABAPAJAHQAKAIALAAQAKAAAIgFQAJgFADgIIAlALQgJARgRAKQgSALgYAAQgSAAgOgGgAAfANQgBgNgJgHQgIgIgNAAQgMAAgJAIQgHAHgCANIA9AAIAAAAgAgOhAIANgkIAnAAIgZArg");
	this.shape_13.setTransform(147.25,95.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_14.setTransform(131.325,98.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_15.setTransform(115.825,98.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAtBhIgPgsIg7AAIgPAsIguAAIBHjBIAnAAIBHDBgAAXAXIgXhEIgWBEIAtAAg");
	this.shape_16.setTransform(98.825,95.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgGgOQgEgNgBgOQABgPAEgOQAGgNAKgLQAJgKAPgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgYAAQgRAAgPgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_17.setTransform(179.5,483.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgcBbQgKgKAAgSIAAijIArAAIAACTQAAARAOAAIAHgBIAHgDIAGAhQgIADgLADQgLACgJAAQgSAAgKgKg");
	this.shape_18.setTransform(167.425,480.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ag+A7QgLgNAAgbIAAhbIArAAIAABRQABANAFAHQAFAHAJAAQAKAAAGgEQAJgFAGgMIAAhXIAsAAIAABdQAAAHACACQACADAFABIAAAkIgLACIgHAAQgYAAgDgSIgCgIQgJAOgOAGQgOAHgSAAQgXAAgLgOg");
	this.shape_19.setTransform(153.8,483.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgoBfQgMgFgJgKQgJgKgFgOQgFgNAAgQQAAgQAFgNQAEgNAJgKQAIgKAMgGQALgGAOAAQAPAAALAIQAMAHAHAMIAAhQIAsAAIAACVQAAAHACACQACADAFABIAAAkIgKACIgJAAQgLAAgHgEQgHgFgBgJIgBgHQgIANgNAGQgNAHgNAAQgPAAgNgGgAgQgGQgGADgEAEQgEAFgDAHQgCAHAAAHQAAAIADAHQACAHAFAFQAEAFAHADQAGACAHAAQAIAAAJgFQAIgFAEgKIAAgeQgEgLgJgGQgJgGgJAAQgHAAgGADg");
	this.shape_20.setTransform(136.025,480.825);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgfBEQgPgGgJgKQgKgKgGgNQgEgOAAgPQAAgNAEgOQAGgNAKgLQAJgKAPgGQAOgGARAAQATAAAOAGQAOAGAJAKQALALAEANQAFAOABANQgBAPgFAOQgEANgKAKQgKAKgOAGQgOAGgTAAQgRAAgOgGgAgLghQgHACgDAFQgFAFgCAHQgDAHAAAHQAAARAKAKQAIALANAAQAHAAAGgDQAFgDAFgFQAEgFACgHQADgGAAgJQAAgQgJgKQgJgKgOAAQgGAAgFADg");
	this.shape_21.setTransform(118.95,483.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("ABFBJIAAhQQAAgNgEgHQgGgGgIgBQgFAAgEACQgFADgDADIgHAIIgFAKIAABRIgrAAIAAhQQAAgNgFgHQgFgGgIgBQgJAAgJAIQgIAHgDALIAABRIgsAAIAAiOIAnAAIAAAYQAIgNAOgHQANgHASAAQAJAAAHACQAGADAEAEQAFADADAFQAEAGAAAFQAIgOAOgGQANgIARAAQAOAAAJAFQAIAFAEAIQAFAJACAJIABASIAABbg");
	this.shape_22.setTransform(98,483.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("Ag+A7QgLgNAAgbIAAhbIAsAAIAABRQgBANAGAHQAFAHAKAAQAIAAAIgEQAHgFAHgMIAAhXIArAAIAABdQAAAHACACQACADAGABIAAAkIgLACIgIAAQgXAAgEgSIgBgIQgJAOgPAGQgNAHgSAAQgWAAgMgOg");
	this.shape_23.setTransform(70.6,483.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgoBfQgMgFgJgKQgJgKgFgOQgFgNAAgQQAAgQAFgNQAEgNAJgKQAIgKAMgGQALgGAOAAQAPAAALAIQAMAHAHAMIAAhQIAsAAIAACVQAAAHACACQACADAFABIAAAkIgKACIgJAAQgLAAgHgEQgHgFgBgJIgBgHQgIANgNAGQgNAHgNAAQgPAAgNgGgAgQgGQgGADgEAEQgEAFgDAHQgCAHAAAHQAAAIADAHQACAHAFAFQAEAFAHADQAGACAHAAQAIAAAJgFQAIgFAEgKIAAgeQgEgLgJgGQgJgGgJAAQgHAAgGADg");
	this.shape_24.setTransform(52.825,480.825);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgHBeQgIgCgFgFQgGgFgDgGQgDgIAAgKIAAhKIgSAAIAAghIASAAIAAgtIArAAIAAAtIAdAAIAAAhIgdAAIAAA6QAAAIADADQAEADAFAAIAKgBIAJgEIAJAiIgVAIQgLACgMAAQgHAAgHgBg");
	this.shape_25.setTransform(157.7,451.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("Ag9A7QgMgNAAgbIAAhbIArAAIAABRQAAANAGAHQAFAHAKAAQAIAAAHgEQAIgFAHgMIAAhXIAsAAIAABdQAAAHABACQACADAGABIAAAkIgKACIgIAAQgYAAgDgSIgBgIQgKAOgPAGQgOAHgRAAQgXAAgKgOg");
	this.shape_26.setTransform(143.75,453.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSBeQgMgHgHgMIAAAXIgmAAIAAjGIArAAIAABQQAHgNAMgHQAMgHAPAAQAOAAALAGQAMAGAIAKQAIAKAFAOQAEANAAAPQAAAQgFANQgFAOgJAKQgJAKgMAFQgMAGgOAAQgQAAgMgHgAgSgCQgJAGgFAKIAAAeQAFAKAIAFQAIAFAJAAQAHAAAGgDQAGgDAFgEQAFgFACgHQADgHAAgIQAAgHgDgHQgCgHgEgFQgFgEgGgEQgGgCgGAAQgKAAgIAHg");
	this.shape_27.setTransform(126.725,450.825);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgfBfQgPgGgJgKQgKgKgFgNQgGgNAAgPQAAgPAGgNQAFgOAJgKQAKgLAPgGQAOgGASAAQASAAAOAGQAOAGAKALQAJAKAGANQAEANAAAOIAAAIIAAAGIhpAAQABAPAJAHQAKAIALAAQAKAAAIgFQAJgFADgIIAlALQgJARgRAKQgSALgYAAQgSAAgOgGgAAfANQgBgNgJgHQgIgIgNAAQgMAAgJAIQgHAHgCANIA9AAIAAAAgAgOhAIANgkIAnAAIgaArg");
	this.shape_28.setTransform(109.45,450.825);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgoBfQgMgFgJgKQgJgKgFgOQgFgNAAgQQAAgQAFgNQAEgNAJgKQAIgKAMgGQALgGAOAAQAPAAALAIQAMAHAHAMIAAhQIAsAAIAACVQAAAHACACQACADAFABIAAAkIgKACIgJAAQgLAAgHgEQgHgFgBgJIgBgHQgIANgNAGQgNAHgNAAQgPAAgNgGgAgQgGQgGADgEAEQgEAFgDAHQgCAHAAAHQAAAIADAHQACAHAFAFQAEAFAHADQAGACAHAAQAIAAAJgFQAIgFAEgKIAAgeQgEgLgJgGQgJgGgJAAQgHAAgGADg");
	this.shape_29.setTransform(92.125,450.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("Ag+A7QgLgNAAgbIAAhbIArAAIAABRQABANAFAHQAFAHAJAAQAKAAAGgEQAJgFAGgMIAAhXIAsAAIAABdQAAAHACACQACADAFABIAAAkIgLACIgHAAQgYAAgDgSIgCgIQgJAOgOAGQgOAHgSAAQgXAAgLgOg");
	this.shape_30.setTransform(68.75,453.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_31.setTransform(51.975,453.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIApAAIAAAdQAGgPAMgIQALgIANgBIAEAAIAEABIAAAnQgRAAgNAFQgMAFgFAKIAABVg");
	this.shape_32.setTransform(140.4,423.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgVBjIAAiOIArAAIAACOgAgVg7IAAgnIArAAIAAAng");
	this.shape_33.setTransform(130.675,420.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAZBJIAAhPQAAgPgFgGQgGgHgIABQgEAAgEACIgJAFIgIAIQgEAEgCAGIAABRIgrAAIAAiOIAoAAIAAAYQAHgNAOgHQAOgHATAAQANAAAJAFQAIAGAGAHQAEAJABAJIACASIAABbg");
	this.shape_34.setTransform(118.75,423.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAKgLQAKgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAFANABAOIAAAHIgCAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAegMQAAgOgJgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_35.setTransform(102.2,423.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgXBHIgyiOIAtAAIAeBrIAfhrIApAAIgyCOg");
	this.shape_36.setTransform(86.325,423.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgFgOQgFgNgBgOQABgPAFgOQAFgNAKgLQAJgKAPgGQAOgGASAAQARAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgYAAQgRAAgPgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_37.setTransform(70.6,423.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAeBhIgkg/IgdAAIAAA/IgtAAIAAjBIBXAAQANAAAMAGQALAGAJAJQAIAJAFAMQAFAMAAAMQAAAJgDAIQgCAIgEAHQgEAHgGAGQgGAGgHAEIArBIgAgjgEIAoAAQAIAAAGgHQAFgIAAgLQAAgMgGgHQgHgHgIAAIgmAAg");
	this.shape_38.setTransform(53.975,420.975);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_39.setTransform(391.925,656.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAJgLQALgKAOgGQAOgGARAAQASAAAPAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgJARgRALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgIAIQgIAIgCAOIA9AAIAAAAg");
	this.shape_40.setTransform(377,656.025);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgsBJIAAiOIAnAAIAAAdQAHgPALgIQAMgIANgBIAFAAIADABIAAAnQgQAAgNAFQgNAFgFAKIAABVg");
	this.shape_41.setTransform(363.9,655.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgHBdQgIgCgFgEQgGgEgDgIQgDgHAAgLIAAhJIgSAAIAAghIASAAIAAguIArAAIAAAuIAdAAIAAAhIgdAAIAAA7QAAAGADAEQAEADAFAAIAKgCIAJgDIAJAjIgVAGQgLAEgMAAQgHAAgHgDg");
	this.shape_42.setTransform(352.55,653.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgVBkIAAiPIArAAIAACPgAgVg7IAAgnIArAAIAAAng");
	this.shape_43.setTransform(343.225,653.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgHBdQgIgCgFgEQgGgEgDgIQgCgHAAgLIAAhJIgTAAIAAghIATAAIAAguIAqAAIAAAuIAdAAIAAAhIgdAAIAAA7QAAAGADAEQAEADAGAAIAJgCIAJgDIAJAjIgUAGQgMAEgMAAQgHAAgHgDg");
	this.shape_44.setTransform(334.25,653.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgpATIAAglIBTAAIAAAlg");
	this.shape_45.setTransform(322.975,655.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_46.setTransform(310.525,656.025);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("Ag+A7QgLgNAAgbIAAhbIAsAAIAABRQAAANAFAHQAFAHAJAAQAJAAAIgEQAIgFAGgMIAAhXIArAAIAABdQABAHACACQACADAFABIAAAkIgLACIgIAAQgXAAgEgSIgBgIQgJAOgOAGQgOAHgSAAQgXAAgLgOg");
	this.shape_47.setTransform(295.45,656.175);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AggBEQgOgGgJgKQgLgKgEgNQgGgOAAgPQAAgNAGgOQAEgNALgLQAJgKAOgGQAPgGARAAQATAAANAGQAOAGAKAKQAKALAGANQAEAOAAANQAAAPgEAOQgGANgJAKQgKAKgPAGQgNAGgTAAQgRAAgPgGgAgMghQgFACgFAFQgEAFgCAHQgDAHAAAHQAAARAJAKQAJALANAAQAHAAAFgDQAHgDADgFQAFgFACgHQACgGAAgJQABgQgJgKQgKgKgNAAQgGAAgGADg");
	this.shape_48.setTransform(278.4,656.025);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_49.setTransform(263.325,656.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_50.setTransform(243.475,656.025);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgfBFQgOgGgKgKQgKgKgGgOQgEgNgBgOQABgPAEgOQAGgNAKgLQAJgKAPgGQAOgGARAAQASAAAPAGQAOAGAKAKQAJAKAGAOQAEANAAAOIAAAHIgBAHIhoAAQABAOAKAIQAJAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgQAAgPgFgAAegMQgBgOgIgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA8AAIAAAAg");
	this.shape_51.setTransform(228.55,656.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgcBbQgKgKAAgSIAAijIArAAIAACTQAAARAOAAIAHgBIAHgDIAGAhQgIADgLADQgLACgJAAQgSAAgKgKg");
	this.shape_52.setTransform(216.475,653.375);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIAoAAIAAAdQAHgPAMgIQALgIANgBIAFAAIACABIAAAnQgPAAgNAFQgNAFgFAKIAABVg");
	this.shape_53.setTransform(473.45,625.925);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgGgOQgEgNAAgOQAAgPAEgOQAGgNAKgLQAKgKAOgGQAOgGARAAQATAAAOAGQAOAGAKAKQAKAKAEAOQAGANAAAOIAAAHIgBAHIhpAAQABAOAJAIQAKAHALAAQAJAAAJgFQAJgEADgIIAlAKQgIARgSALQgSAKgZAAQgRAAgOgFgAAfgMQgBgOgJgIQgJgIgMAAQgMAAgIAIQgJAIgBAOIA9AAIAAAAg");
	this.shape_54.setTransform(459.25,626.025);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgXBIIgyiOIAtAAIAeBrIAfhrIApAAIgyCOg");
	this.shape_55.setTransform(443.375,626.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgVBkIAAiOIArAAIAACOgAgVg7IAAgoIArAAIAAAog");
	this.shape_56.setTransform(432.125,623.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgHBdQgHgCgGgEQgFgEgDgIQgDgHAAgLIAAhJIgTAAIAAghIATAAIAAguIAqAAIAAAuIAdAAIAAAhIgdAAIAAA6QAAAIAEADQADADAGAAIAKgBIAJgEIAIAiIgUAHQgMADgMAAQgHAAgHgCg");
	this.shape_57.setTransform(423.15,623.9);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_58.setTransform(409.875,626.025);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgqBHQgKgDgGgGQgHgHgDgIQgEgIAAgKQAAgLAEgIQAFgJAIgFQAIgHALgDQAMgEANAAIARACQAIABAGADIAAgGQAAgZgbAAQgMAAgLAEQgKAEgMAIIgNgbQAOgKAQgEQAPgFARAAQAfAAASAPQASAQAAAdIAAAkQAAAGACADQACACAFABIAAAlIgKABIgJABQgMAAgGgFQgHgFgBgIIgBgHQgKAMgNAHQgMAGgPAAQgKAAgJgDgAgXALQgIAFAAAJQAAAIAGAFQAGAFAJAAQAHAAAGgCQAHgDAEgEQAGgFAAgFIAAgOIgMgDIgMgCQgMAAgHAGg");
	this.shape_59.setTransform(393.975,626.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgfBFQgSgGgMgLIAPgbQANAJANAFQAMAFALAAQAIAAAFgDQAEgDAAgGQAAgGgGgDQgGgEgNgDIgYgIQgKgEgHgEQgGgEgDgGQgCgGAAgJQAAgKAEgJQAEgJAIgHQAIgGAKgDQALgEAMAAQAPAAAOAEQAOAFANALIgRAaQgMgIgKgEQgJgEgIAAQgHAAgFADQgFADAAAGQAAAGAFADQAGADANAEIAaAIQAKAEAHAEQAGAFADAHQADAGAAAJQAAAVgQANQgPAMgbAAQgSAAgRgFg");
	this.shape_60.setTransform(379.275,626.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgfBfQgOgGgKgKQgKgKgFgNQgFgNgBgPQABgPAFgNQAFgOAKgKQAJgLAPgGQAOgGASAAQARAAAPAGQAOAGAKALQAJAKAGANQAEANAAAOIAAAIIgBAGIhoAAQABAPAKAHQAJAIALAAQAJAAAJgFQAJgFADgIIAlALQgJARgRAKQgSALgYAAQgRAAgPgGgAAeANQgBgNgIgHQgJgIgMAAQgMAAgJAIQgHAHgCANIA8AAIAAAAgAgPhAIAPgkIAmAAIgaArg");
	this.shape_61.setTransform(364.35,623.375);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgoBfQgMgFgJgKQgJgKgFgOQgFgNAAgQQAAgQAFgNQAEgNAJgKQAIgKAMgGQALgGAOAAQAPAAALAIQAMAHAHAMIAAhQIAsAAIAACVQAAAHACACQACADAFABIAAAkIgKACIgJAAQgLAAgHgEQgHgFgBgJIgBgHQgIANgNAGQgNAHgNAAQgPAAgNgGgAgQgGQgGADgEAEQgEAFgDAHQgCAHAAAHQAAAIADAHQACAHAFAFQAEAFAHADQAGACAHAAQAIAAAJgFQAIgFAEgKIAAgeQgEgLgJgGQgJgGgJAAQgHAAgGADg");
	this.shape_62.setTransform(347.025,623.375);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AhcBhICJjBIAwAAIiIDBg");
	this.shape_63.setTransform(321.95,623.525);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgtBJIAAiOIApAAIAAAdQAGgPAMgIQALgIANgBIAFAAIACABIAAAnQgQAAgNAFQgMAFgFAKIAABVg");
	this.shape_64.setTransform(300.85,625.925);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgfBFQgPgGgJgKQgKgKgFgOQgGgNABgOQgBgPAGgOQAFgNAJgLQAKgKAPgGQAOgGASAAQASAAAOAGQAOAGAKAKQAKAKAEAOQAGANgBAOIAAAHIAAAHIhpAAQABAOAJAIQAKAHALAAQAKAAAIgFQAJgEADgIIAlAKQgJARgRALQgSAKgYAAQgSAAgOgFgAAfgMQgBgOgJgIQgIgIgNAAQgMAAgJAIQgHAIgCAOIA9AAIAAAAg");
	this.shape_65.setTransform(286.65,626.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgXBIIgyiOIAtAAIAeBrIAfhrIApAAIgyCOg");
	this.shape_66.setTransform(270.775,626.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgVBkIAAiOIArAAIAACOgAgVg7IAAgoIArAAIAAAog");
	this.shape_67.setTransform(259.525,623.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgHBdQgIgCgFgEQgGgEgDgIQgCgHAAgLIAAhJIgTAAIAAghIATAAIAAguIAqAAIAAAuIAdAAIAAAhIgdAAIAAA6QAAAIADADQAEADAFAAIAKgBIAJgEIAJAiIgUAHQgMADgMAAQgHAAgHgCg");
	this.shape_68.setTransform(250.55,623.9);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgbBEQgOgGgKgKQgKgKgFgOQgFgNAAgPQAAgOAFgNQAFgOAKgKQAKgKAOgGQAOgGASAAQAYAAARAKQARALAJARIgrANQgIgOgRAAQgMAAgJAKQgKAKAAAQQAAAJADAGQACAHAFAFQAEAFAGADQAGADAFAAQAJAAAGgEQAHgEADgGIArANQgIAQgRALQgSAKgYAAQgRAAgPgGg");
	this.shape_69.setTransform(237.275,626.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAtBhIgPgsIg7AAIgPAsIguAAIBHjBIAnAAIBHDBgAAXAXIgXhEIgWBEIAtAAg");
	this.shape_70.setTransform(220.275,623.525);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#FF6348").ss(12).p("AMAqoIhWBtQh0CLibCaQnwHqq5G/");
	this.shape_71.setTransform(268.0159,739.7485);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#FF6348").ss(12).p("AE13gIAWA9QAbBRAWBfQBEEvgNFSQgTHYizHYQjgJOnPIt");
	this.shape_72.setTransform(100.0737,647.5118);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FF6348").s().p("AAAjaID9GiIn5ATg");
	this.shape_73.setTransform(194.875,796.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FF6348").s().p("AiXj5IGAEtInRDGg");
	this.shape_74.setTransform(54.3,798.475);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#FF6348").ss(12).p("AjkmyQgMCqA4DCQBxGDFWB2");
	this.shape_75.setTransform(45.8151,75.55);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FF6348").s().p("Ag9jsIEvGUInjBFg");
	this.shape_76.setTransform(24.225,23.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FF6348").s().p("AuzIiQjIAAAAjIIAAqzQAAjIDIAAIdnAAQDIAAAADIIAAKzQAADIjIAAg");
	this.shape_77.setTransform(176.175,110.05);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FF6348").s().p("AsQKZQjIAAAAjIIAAuhQAAjIDIAAIYhAAQDIAAAADIIAAOhQAADIjIAAg");
	this.shape_78.setTransform(115.1,452.5);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FF6348").s().p("A2VISQjIAAAAjIIAAqTQAAjIDIAAMAsrAAAQDIAAAADIIAAKTQAADIjIAAg");
	this.shape_79.setTransform(342.75,638.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_aide_textes_part1, rect = new cjs.Rectangle(0,0,505.8,823.5), [rect]);


(lib.mc_aide_ombre = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#828282","#B8B8B8","#EAEAEA"],[0,0.349,1],0,0,0,0,0,345.6).s().p("Egl2Al2QvrvrAA2LQAA2KPrvrQPsvsWKAAQWLAAPsPsQPrPrAAWKQAAWLvrPrQvsPs2LAAQ2KAAvsvsg");
	this.shape.setTransform(271.9054,50.2884,0.7936,0.1467);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_aide_ombre, rect = new cjs.Rectangle(0,0,543.8,100.6), [rect]);


(lib.infobulle_subtitles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgFgOQgGgPAAgPQAAgQAGgOQAFgOAKgKQAKgLAOgGQAOgGAPAAQARAAAOAGQANAGAKALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiBAAQABAMAFAKQAFALAHAHQAIAIAJAEQALAEAKAAQAGAAAIgCIANgFQAHgEAEgFQAFgFADgGIARAEQgEAJgGAHQgGAHgJAFQgIAFgKACQgLADgLAAQgPAAgOgGgAA4gHQgBgMgFgKQgEgKgHgIQgIgHgJgEQgLgEgLAAQgJAAgLAEQgKAEgHAHQgHAIgEAKQgFAKgBAMIBuAAIAAAAg");
	this.shape.setTransform(168.65,21.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgqBkQgQgKgKgPIAMgKQAKAPAOAHQAPAGARAAQAKAAAKgDQAKgCAHgHQAHgFAFgKQAFgJgBgMIAAgeQgIAPgPAIQgQAIgPAAQgQAAgMgGQgNgHgKgKQgKgLgEgNQgGgOAAgOQAAgRAFgOQAGgOAIgLQAKgKANgHQANgGAQAAQARAAAPAJQAOALAKAOIAAggIASAAIAACXQAAAQgGAMQgGAMgKAIQgKAIgOAEQgNAEgOAAQgaAAgQgJgAgVhWQgJAGgIAIQgGAJgEALQgEAMAAALQAAAMAFALQAEAKAHAIQAIAJAKAEQALAFALAAQAIAAAJgDQAIgEAGgFQAIgFAEgGQAFgHABgHIAAguQgDgJgGgGQgFgHgHgFQgHgFgIgDQgIgDgIAAQgMAAgKAFg");
	this.shape_1.setTransform(150.55,24.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgkBLQgKgEgGgHQgHgGgEgIQgDgJAAgKQAAgKAEgIQAFgJAJgFQAHgGAMgDQAMgDAOAAQALAAAMACQALACAKADIAAgNQAAgUgMgMQgLgMgTAAQgLAAgNAFQgMAFgMAIIgIgNQAdgTAcAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAIAAIAAARIgIABQgHAAgFgEQgEgDgBgHIAAgMQgKAOgQAHQgQAHgRAAQgLAAgJgDgAgjAHQgNAIAAAPQABAHACAGQADAGAEAEQAFAFAHADQAHACAHAAQAOAAANgGQAOgGAGgJIAEgGIACgFIAAgZQgLgEgKgCQgLgBgKAAQgUAAgOAIg");
	this.shape_2.setTransform(134,21.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBMIAAiWIATAAIAAAkQAIgRAOgKQAOgKAQAAIADABIAAASQgTAAgPALQgOAJgGATIAABdg");
	this.shape_3.setTransform(122.1,21.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape_4.setTransform(111.525,19.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgJBqIAAiWIATAAIAACWgAgJhMIAAgdIATAAIAAAdg");
	this.shape_5.setTransform(103.325,18.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape_6.setTransform(95.525,19.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgpAJIAAgRIBTAAIAAARg");
	this.shape_7.setTransform(84.375,21.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgfBIQgRgFgMgLIAJgOQAMALAOAFQANAFAOAAQASAAALgHQALgIAAgNQAAgHgDgEQgDgEgFgDIgPgGIgTgFIgWgGQgKgDgGgEQgGgEgDgGQgDgGAAgJQAAgLAEgJQAFgIAHgGQAIgGAKgDQALgCAKAAQASAAAOAFQAOAGAJAJIgKAMQgIgJgMgEQgMgFgNAAQgHAAgHACQgHACgFADQgFAEgDAFQgCAFAAAIQAAAGACADQABAEAFADIAMAFIAQAEIAaAHQALADAHAEQAHAFAEAHQAEAGAAAKQAAAVgQAMQgQAMgbAAQgRAAgQgGg");
	this.shape_8.setTransform(71.125,21.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("Ag3A8QgMgQAAggIAAhYIAUAAIAABUQAAAzAjABQAJAAAHgDQAIgDAIgGQAHgGAFgHQAGgIADgJIAAheIAUAAIAAB9QAAAHAHABIAAARIgGABIgDAAQgHgBgEgFQgEgEAAgIIAAgRQgKASgRAJQgRAKgSAAQgZAAgMgRg");
	this.shape_9.setTransform(55.775,21.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgeBIQgNgGgKgLQgKgLgFgOQgGgOAAgQQAAgPAGgOQAFgOAKgLQAKgLANgGQAOgGAQAAQAQAAAOAGQAOAGAKALQAJALAGAOQAGAOAAAPQAAAQgGAOQgGAOgJALQgKALgOAGQgOAGgQAAQgQAAgOgGgAgVg3QgKAFgHAIQgHAIgFAMQgEALAAALQAAANAEALQAFALAHAIQAHAIAKAFQALAFAKAAQALAAAKgFQAKgFAIgIQAHgIAEgLQAFgLAAgNQAAgMgFgLQgEgLgHgIQgIgIgKgFQgKgFgLAAQgKAAgLAFg");
	this.shape_10.setTransform(38.35,21.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhNBLIAKgQIANALIARAJQAJADALACQALADALAAQAYAAAOgJQAOgJAAgSQAAgJgEgHQgEgGgIgFQgIgFgLgDIgagIIgdgIQgMgDgIgFQgJgGgEgJQgEgJAAgNQAAgNAFgMQAGgLAKgHQAKgIANgDQANgEAPgBQAVAAAQAHQAQAGANALIgKARQgIgKgPgGQgOgHgTAAQgaAAgNALQgMAKAAASQAAAJADAGQAEAGAHAFQAHAEAKADIAZAGIAeAIQANAEAJAGQAKAHAFAJQAEAJAAAOQAAAOgFAKQgGALgJAHQgKAHgOADQgOAEgQAAQgvAAgigeg");
	this.shape_11.setTransform(20.875,18.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#383838").s().p("AgsCDIgchIIsAAAQhkAAAAhjIAAixQAAhkBkAAIaRAAQBkAAAABkIAACxQAABjhkAAIrrAAIg+ECIAAABQgBAAhLi7g");
	this.shape_12.setTransform(94.1,32.9532);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infobulle_subtitles, rect = new cjs.Rectangle(0,0,188.2,64.7), [rect]);


(lib.infobulle_restart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgeBHQgQgHgMgKIAJgNQAMAKANAFQAMAFAOAAQASAAAKgHQAKgHAAgNQAAgGgCgFQgDgDgFgDQgGgEgIgCIgSgFIgWgGQgJgCgGgEQgGgEgDgFQgDgGAAgJQAAgLAEgJQAEgIAIgFQAHgGAKgCQAKgDAKgBQARAAAOAGQANAFAJAKIgJALQgJgJgLgEQgMgEgMAAQgHAAgGABQgHACgFAEQgFADgCAFQgDAFAAAHQAAAGACADQACAEAEADIAMAEIAPAFIAZAHQAKACAIAEQAHAFADAHQAEAGAAAJQAAAUgPAMQgQALgaAAQgQAAgQgEg");
	this.shape.setTransform(341.925,21);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBJIAAiRIASAAIAAAjQAHgQANgKQAOgJAQAAIADAAIAAARQgTABgPAKQgNAKgGARIAABag");
	this.shape_1.setTransform(331.15,20.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag1A7QgMgQAAgfIAAhVIATAAIAABRQAAAyAiAAQAJAAAHgDQAIgDAHgFQAHgFAFgIQAGgHADgJIAAhbIATAAIAAB4QAAAIAHAAIAAARIgGAAIgDAAQgGAAgFgEQgEgFAAgIIAAgQQgJARgRAJQgQAJgSAAQgXAAgMgPg");
	this.shape_2.setTransform(317.325,21.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgKgLgFgOQgFgOAAgOQAAgPAFgNQAGgOAJgLQAKgKANgGQANgHAPAAQAQAAANAHQANAGAKAKQAKALAFAOQAFANAAAPQAAAOgFAOQgFAOgKALQgJAKgOAGQgNAFgQAAQgPAAgNgFgAgTg1QgKAFgHAHQgIAJgEAKQgEAMAAALQAAAMAEAKQAEALAIAIQAHAIAJAFQAKAEAKAAQALAAAKgEQAJgFAHgIQAIgIAEgLQAEgKAAgMQAAgMgEgLQgEgKgIgJQgHgHgJgFQgKgFgLAAQgKAAgJAFg");
	this.shape_3.setTransform(300.475,21);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWBGQgOgGgJgKQgKgLgFgOQgGgNAAgQQAAgOAGgOQAEgOAKgKQAKgKANgHQAOgFAPgBQAUAAAQAKQAPAKAIAPIgSAGQgGgLgMgGQgLgHgNAAQgKAAgKAFQgJAFgIAHQgGAIgEAKQgFALAAAMQAAAMAFALQADALAIAIQAHAIAKAFQAJAEAKAAQAHAAAIgCQAGgCAGgDQAGgEAEgEQAEgFACgFIATAFQgEAJgFAGQgGAHgIAEQgIAFgJADQgKADgLgBQgOAAgOgFg");
	this.shape_4.setTransform(284.6,21);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAqBKIAAhQQAAgagHgMQgIgMgQAAQgIAAgIADQgIADgHAGQgIAGgFAHQgGAIgCAJIAABYIgTAAIAAiRIARAAIAAAhQAJgQARgJQAQgKATAAQAMAAAIAEQAJAFAFAIQAFAIACAMQACAMAAAOIAABUg");
	this.shape_5.setTransform(261.625,20.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgJgLgGgOQgGgNABgQQgBgOAGgOQAGgOAJgKQAKgKANgHQAOgFAOgBQAQABAOAFQANAHAJAKQAKALAFANQAGAOAAAOIAAAEIgBADIh7AAQAAALAEALQAGAKAHAHQAHAHAKAEQAIAEALAAQAGAAAHgCQAIgBAFgEQAGgEAFgEQAFgFACgGIARAEQgEAJgGAGQgGAHgIAEQgIAFgKADQgKADgKgBQgQAAgNgFgAA3gHQgBgLgFgKQgFgKgHgGQgHgIgJgDQgKgFgKAAQgKAAgKAFQgJADgHAIQgIAGgEAKQgEAKgBALIBrAAIAAAAg");
	this.shape_6.setTransform(245.35,21);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgJgLgGgOQgGgNAAgQQAAgOAGgOQAGgOAJgKQAKgKANgHQAOgFAOgBQAQABAOAFQANAHAJAKQAKALAFANQAGAOAAAOIAAAEIgBADIh7AAQAAALAEALQAGAKAHAHQAHAHAJAEQAKAEAKAAQAHAAAGgCQAIgBAFgEQAGgEAFgEQAFgFACgGIAQAEQgDAJgGAGQgGAHgIAEQgIAFgKADQgKADgKgBQgQAAgNgFgAA3gHQgCgLgEgKQgFgKgHgGQgHgIgJgDQgKgFgKAAQgKAAgKAFQgJADgIAIQgGAGgFAKQgEAKgBALIBrAAIAAAAg");
	this.shape_7.setTransform(221.85,21);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgjBJIAAiRIASAAIAAAjQAHgQANgKQAOgJAPAAIAFAAIAAARQgUABgPAKQgNAKgFARIAABag");
	this.shape_8.setTransform(209.45,20.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgCBhQgGgCgEgDQgEgEgDgFQgCgGAAgHIAAhnIgUAAIAAgPIAUAAIAAgxIATAAIAAAxIAhAAIAAAPIghAAIAABiQABAIAEAEQAFAEAHAAQAIAAAGgDIAIgEIAFAQIgFACIgHADIgKACIgLABQgGAAgFgBg");
	this.shape_9.setTransform(199.25,18.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJBmIAAiRIASAAIAACRgAgJhJIAAgcIASAAIAAAcg");
	this.shape_10.setTransform(191.3,18.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhFBoIAAjNIARAAIAAAdQAJgNAOgJQAOgJAQAAQAPAAANAHQANAFAJAMQAJAJAFAOQAFAOAAAPQAAAPgEANQgFANgJALQgJAKgMAGQgMAGgPAAQgRAAgOgJQgPgJgIgPIAABagAgShTQgIADgGAEQgHAFgFAHQgFAHgBAHIAAAtQADAHAFAGQAFAHAHAFQAHAFAHADQAIADAIAAQALAAAJgGQAKgEAHgJQAHgIADgJQAEgLAAgLQAAgMgEgKQgEgMgIgHQgHgIgKgGQgKgEgKAAQgIAAgIADg");
	this.shape_11.setTransform(180.125,23.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgjBJQgJgEgHgGQgGgHgDgIQgEgIAAgKQAAgJAEgIQAEgIAJgFQAIgGALgDQAMgEANAAQAKAAAMADQALABAJAEIAAgNQAAgTgLgMQgLgLgSAAQgLAAgNAFQgLAEgMAIIgHgMQAcgUAbAAQAaABARAPQAPAQAAAbIAABAQAAAIAHAAIAAARIgIABQgGAAgFgDQgDgFgBgGIgBgMQgJAOgQAHQgPAGgRAAQgKAAgJgCgAghAHQgNAJAAANQAAAHADAFQADAHAEAEQAFAEAGADQAHACAGAAQAPAAAMgGQANgFAGgKIADgEIACgGIAAgYQgKgDgKgCQgKgBgKAAQgUgBgMAIg");
	this.shape_12.setTransform(163.2,21);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAqBmIAAhRQAAgYgIgMQgJgNgQAAQgIAAgHADQgIAEgHAFQgHAGgGAHQgFAHgCAJIAABZIgTAAIAAjLIATAAIAABbQAIgQAQgKQAPgJARAAQANAAAIAEQAJAFAGAIQAFAJADALQACALAAAOIAABVg");
	this.shape_13.setTransform(147.675,18.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgWBGQgNgGgKgKQgKgLgGgOQgFgNAAgQQAAgOAFgOQAGgOAJgKQAKgKANgHQAOgFAPgBQAVAAAPAKQAQAKAHAPIgSAGQgHgLgLgGQgKgHgOAAQgKAAgKAFQgJAFgIAHQgGAIgFAKQgEALAAAMQAAAMAEALQAFALAHAIQAHAIAKAFQAKAEAKAAQAHAAAGgCQAHgCAGgDQAGgEAEgEQAFgFABgFIATAFQgEAJgFAGQgGAHgIAEQgIAFgJADQgLADgKgBQgOAAgOgFg");
	this.shape_14.setTransform(131.9,21);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgJgLgGgOQgFgNgBgQQABgOAFgOQAGgOAJgKQAJgKAOgHQANgFAPgBQAQABANAFQAOAHAKAKQAJALAFANQAFAOAAAOIAAAEIAAADIh8AAQABALAFALQAFAKAGAHQAIAHAJAEQAKAEAJAAQAHAAAIgCQAGgBAGgEQAGgEAFgEQAEgFADgGIAQAEQgCAJgHAGQgGAHgIAEQgIAFgKADQgKADgLgBQgPAAgNgFgAA2gHQgBgLgEgKQgFgKgHgGQgHgIgKgDQgJgFgLAAQgJAAgJAFQgKADgIAIQgGAGgFAKQgEAKgBALIBqAAIAAAAg");
	this.shape_15.setTransform(108.95,21);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTBgQgHgHAAgOIAAixIATAAIAACrQAAAHAEAFQAEAFAIAAIAHgBIAIgCIADAPIgNAEIgNABQgMAAgIgHg");
	this.shape_16.setTransform(97.925,18.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgjBJIAAiRIASAAIAAAjQAHgQANgKQAOgJAQAAIAEAAIAAARQgUABgPAKQgNAKgGARIAABag");
	this.shape_17.setTransform(81.85,20.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgJgLgGgOQgGgNABgQQgBgOAGgOQAGgOAJgKQAKgKANgHQAOgFAOgBQAQABAOAFQANAHAJAKQAKALAFANQAGAOAAAOIAAAEIgBADIh7AAQAAALAEALQAGAKAHAHQAHAHAKAEQAIAEALAAQAGAAAHgCQAIgBAFgEQAGgEAFgEQAFgFACgGIARAEQgEAJgGAGQgGAHgIAEQgIAFgKADQgKADgKgBQgQAAgNgFgAA3gHQgBgLgFgKQgFgKgHgGQgHgIgJgDQgKgFgKAAQgKAAgKAFQgJADgHAIQgIAGgEAKQgEAKgBALIBrAAIAAAAg");
	this.shape_18.setTransform(68.05,21);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgWBGQgNgGgKgKQgKgLgGgOQgFgNAAgQQAAgOAFgOQAGgOAJgKQAKgKANgHQAOgFAPgBQAVAAAPAKQAQAKAHAPIgSAGQgHgLgLgGQgLgHgNAAQgKAAgKAFQgKAFgHAHQgHAIgEAKQgEALAAAMQAAAMAEALQAEALAIAIQAHAIAKAFQAJAEALAAQAHAAAGgCQAHgCAGgDQAGgEAEgEQAEgFACgFIATAFQgEAJgFAGQgGAHgIAEQgIAFgJADQgLADgKgBQgOAAgOgFg");
	this.shape_19.setTransform(52.15,21);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAqBKIAAhQQAAgagHgMQgIgMgQAAQgIAAgIADQgIADgHAGQgIAGgFAHQgGAIgCAJIAABYIgTAAIAAiRIARAAIAAAhQAJgQARgJQAQgKATAAQAMAAAIAEQAJAFAFAIQAFAIACAMQACAMAAAOIAABUg");
	this.shape_20.setTransform(36.275,20.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgJgLgGgOQgGgNABgQQgBgOAGgOQAGgOAJgKQAJgKAOgHQAOgFAOgBQAQABANAFQAOAHAKAKQAJALAFANQAFAOABAOIAAAEIgBADIh7AAQAAALAEALQAGAKAHAHQAHAHAKAEQAIAEALAAQAGAAAHgCQAIgBAFgEQAGgEAFgEQAEgFADgGIARAEQgEAJgGAGQgGAHgIAEQgIAFgKADQgKADgKgBQgPAAgOgFgAA3gHQgBgLgFgKQgFgKgHgGQgHgIgKgDQgJgFgKAAQgKAAgJAFQgKADgHAIQgIAGgEAKQgEAKgBALIBrAAIAAAAg");
	this.shape_21.setTransform(20,21);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("ABZBKIAAhQQABgagJgMQgHgMgQAAQgJAAgHADQgIADgHAGQgGAGgFAHQgEAIgDAJIAABYIgSAAIAAhQQABgagJgMQgHgMgQAAQgRAAgNAMQgNALgGATIAABYIgTAAIAAiRIASAAIAAAhQAJgQAPgKQAOgJARAAQATAAALAKQAKALADAQQAUglAkAAQANAAAIAEQAJAFAEAIQAFAIADAMQACAMAAAOIAABUg");
	this.shape_22.setTransform(-1.1,20.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("ABaBKIAAhQQgBgagHgMQgJgMgQAAQgIAAgIADQgHADgGAGQgHAGgEAHQgFAIgCAJIAABYIgSAAIAAhQQgBgagHgMQgJgMgQAAQgQAAgNAMQgNALgFATIAABYIgTAAIAAiRIARAAIAAAhQAJgQAOgKQAPgJASAAQASAAALAKQAKALADAQQAUglAkAAQAMAAAJAEQAIAFAGAIQAFAIACAMQACAMABAOIAABUg");
	this.shape_23.setTransform(-26.8,20.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgKgLgFgOQgFgOAAgOQAAgPAFgNQAGgOAJgLQAKgKANgGQANgHAPAAQAQAAANAHQANAGAKAKQAKALAFAOQAFANAAAPQAAAOgFAOQgFAOgKALQgJAKgOAGQgNAFgQAAQgPAAgNgFgAgTg1QgKAFgHAHQgIAJgEAKQgEAMAAALQAAAMAEAKQAEALAIAIQAHAIAJAFQAKAEAKAAQALAAAKgEQAJgFAHgIQAIgIAEgLQAEgKAAgMQAAgMgEgLQgEgKgIgJQgHgHgJgFQgKgFgLAAQgKAAgJAFg");
	this.shape_24.setTransform(-48.075,21);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgWBGQgNgGgKgKQgKgLgGgOQgFgNAAgQQAAgOAFgOQAGgOAJgKQAKgKANgHQAOgFAPgBQAVAAAPAKQAQAKAHAPIgSAGQgHgLgLgGQgLgHgNAAQgKAAgKAFQgKAFgHAHQgHAIgEAKQgEALAAAMQAAAMAEALQAEALAIAIQAHAIAKAFQAJAEALAAQAHAAAGgCQAHgCAGgDQAGgEAEgEQAEgFACgFIATAFQgEAJgFAGQgGAHgIAEQgIAFgJADQgLADgKgBQgOAAgOgFg");
	this.shape_25.setTransform(-63.95,21);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgcBGQgNgGgKgKQgKgLgFgOQgGgNABgQQgBgOAGgOQAFgOAKgKQAJgKAOgHQANgFAPgBQAQABANAFQAOAHAKAKQAJALAFANQAFAOABAOIAAAEIgBADIh8AAQABALAFALQAEAKAIAHQAHAHAKAEQAIAEAKAAQAIAAAHgCQAGgBAGgEQAGgEAFgEQAEgFADgGIARAEQgDAJgHAGQgGAHgIAEQgIAFgKADQgKADgKgBQgPAAgOgFgAA3gHQgCgLgEgKQgFgKgHgGQgHgIgKgDQgJgFgKAAQgKAAgJAFQgKADgHAIQgIAGgEAKQgEAKgBALIBrAAIAAAAg");
	this.shape_26.setTransform(-79.8,21);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAzBjIguhJIg6AAIAABJIgUAAIAAjGIBTAAQANAAALAGQALAGAHAJQAIAIAFAMQAEALAAALQAAALgDAKQgDAKgGAHQgGAIgIAFQgIAGgKACIAxBMgAg1AIIBAAAQAIABAHgEQAIgEAFgFQAFgGADgJQACgIAAgJQAAgJgDgIQgDgJgGgFQgFgHgHgDQgIgEgIAAIg+AAg");
	this.shape_27.setTransform(-96.525,18.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#383838").s().p("AgLCDIgdhIMgjcAAAQhkAAAAhjIAAixQAAhkBkAAMBIJAAAQBkAAAABkIAACxQAABjhkAAMgiHAAAIg9ECIAAABQgCAAhKi7g");
	this.shape_28.setTransform(120.325,32.9532);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infobulle_restart, rect = new cjs.Rectangle(-120.6,0,481.9,64.7), [rect]);


(lib.infobulle_pause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgFgOQgGgPAAgPQAAgQAGgOQAFgOAKgKQAKgLAOgGQAOgGAPAAQARAAAOAGQANAGAKALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiBAAQABAMAFAKQAFALAHAHQAIAIAJAEQALAEAKAAQAGAAAIgCIANgFQAHgEAEgFQAFgFADgGIARAEQgEAJgGAHQgGAHgJAFQgIAFgKACQgLADgLAAQgPAAgOgGgAA4gHQgBgMgFgKQgEgKgHgIQgIgHgJgEQgLgEgLAAQgJAAgLAEQgKAEgHAHQgHAIgEAKQgFAKgBAMIBuAAIAAAAg");
	this.shape.setTransform(89,21.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfBIQgRgFgMgLIAJgOQAMALAOAFQANAFAOAAQASAAALgHQALgIAAgNQAAgHgDgEQgDgEgFgDIgPgGIgTgFIgWgGQgKgDgGgEQgGgEgDgGQgDgGAAgJQAAgLAEgJQAFgIAHgGQAIgGAKgDQALgCAKAAQASAAAOAFQAOAGAJAJIgKAMQgIgJgMgEQgMgFgNAAQgHAAgHACQgHACgFADQgFAEgDAFQgCAFAAAIQAAAGACADQABAEAFADIAMAFIAQAEIAaAHQALADAHAEQAHAFAEAHQAEAGAAAKQAAAVgQAMQgQAMgbAAQgRAAgQgGg");
	this.shape_1.setTransform(73.225,21.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag3A8QgMgQAAggIAAhYIAUAAIAABUQAAAzAjABQAJAAAHgDQAIgDAIgGQAHgGAFgHQAGgIADgJIAAheIAUAAIAAB9QAAAHAHABIAAARIgGABIgDAAQgHgBgEgFQgEgEAAgIIAAgRQgKASgRAJQgRAKgSAAQgZAAgMgRg");
	this.shape_2.setTransform(57.875,21.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgkBLQgJgEgHgHQgHgGgEgIQgEgJABgKQAAgKAEgIQAFgJAIgFQAJgGALgDQAMgDAOAAQAKAAANACQALACAJADIAAgNQAAgUgLgMQgLgMgTAAQgMAAgMAFQgMAFgMAIIgIgNQAdgTAcAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAIAAIAAARIgIABQgHAAgFgEQgEgDgBgHIAAgMQgLAOgPAHQgQAHgRAAQgLAAgJgDgAgiAHQgNAIgBAPQABAHACAGQADAGAEAEQAGAFAGADQAHACAHAAQAOAAANgGQAOgGAGgJIAEgGIABgFIAAgZQgKgEgKgCQgLgBgKAAQgUAAgNAIg");
	this.shape_3.setTransform(40.95,21.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhIBnIAAjNIBUAAQANAAALAGQALAFAJAKQAIAJAEALQAFAMAAAMQAAANgEAMQgFALgHAIQgIAJgLAFQgLAGgNAAIhCAAIAABMgAg0AJIBBAAQAJAAAHgEQAHgEAGgGQAFgGADgIQADgJAAgJQAAgKgEgIQgDgJgGgHQgFgFgIgEQgIgEgIAAIg/AAg");
	this.shape_4.setTransform(25.175,18.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#383838").s().p("Ag2CDIgdhIImGAAQhjAAgBhjIAAixQABhkBjAAIOyAAQBlAAgBBkIAACxQABBjhlAAImGAAIg+ECIAAABQgBAAhKi7g");
	this.shape_5.setTransform(57.35,32.9532);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infobulle_pause, rect = new cjs.Rectangle(0,0,114.7,64.7), [rect]);


(lib.infobulle_next = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {nofs:10};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19));

	// Calque_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape.setTransform(209.125,19.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAsBNIAAhUQgBgbgHgMQgJgMgQAAQgIAAgJADQgIADgIAGQgHAGgGAIQgFAIgDAJIAABcIgTAAIAAiWIASAAIAAAiQAJgRARgKQARgKAUAAQAMAAAIAFQAJAEAGAJQAEAIADAMQACANABAOIAABYg");
	this.shape_1.setTransform(195.7,21.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgkBLQgJgEgHgHQgHgGgDgIQgEgJgBgKQAAgKAFgIQAFgJAIgFQAJgGAMgDQALgDAOAAQAKAAAMACQAMACAJADIAAgNQABgUgMgMQgLgMgTAAQgMAAgMAFQgMAFgNAIIgGgNQAdgTAbAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAHAAIAAARIgHABQgHAAgFgEQgEgDAAgHIgBgMQgLAOgPAHQgQAHgRAAQgLAAgJgDgAgjAHQgMAIAAAPQAAAHACAGQADAGAFAEQAFAFAGADQAHACAIAAQAOAAANgGQAMgGAIgJIADgGIABgFIAAgZQgKgEgKgCQgKgBgKAAQgWAAgNAIg");
	this.shape_2.setTransform(179.05,21.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJBMIg+iXIAVAAIAyCEIA1iEIATAAIg+CXg");
	this.shape_3.setTransform(163.625,21.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJBqIAAiWIATAAIAACWgAgJhMIAAgdIATAAIAAAdg");
	this.shape_4.setTransform(152.775,18.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag3A8QgMgQAAggIAAhYIAUAAIAABUQAAAzAjABQAJAAAHgDQAIgDAIgGQAHgGAFgHQAGgIADgJIAAheIAUAAIAAB9QAAAHAHABIAAARIgGABIgDAAQgHgBgEgFQgEgEAAgIIAAgRQgKASgRAJQgRAKgSAAQgZAAgMgRg");
	this.shape_5.setTransform(141.225,21.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgfBIQgRgFgMgLIAJgOQAMALAOAFQANAFAOAAQASAAALgHQALgIAAgNQAAgHgDgEQgDgEgFgDIgPgGIgTgFIgWgGQgKgDgGgEQgGgEgDgGQgDgGAAgJQAAgLAEgJQAFgIAHgGQAIgGAKgDQALgCAKAAQASAAAOAFQAOAGAJAJIgKAMQgIgJgMgEQgMgFgNAAQgHAAgHACQgHACgFADQgFAEgDAFQgCAFAAAIQAAAGACADQABAEAFADIAMAFIAQAEIAaAHQALADAHAEQAHAFAEAHQAEAGAAAKQAAAVgQAMQgQAMgbAAQgRAAgQgGg");
	this.shape_6.setTransform(125.275,21.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgFgOQgGgPAAgPQAAgQAGgOQAFgOAKgKQAKgLAOgGQAOgGAPAAQAQAAAPAGQANAGAKALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiBAAQABAMAFAKQAFALAHAHQAIAIAJAEQALAEAKAAQAGAAAIgCIANgFQAHgEAEgFQAFgFADgGIARAEQgDAJgHAHQgGAHgJAFQgIAFgKACQgLADgKAAQgQAAgOgGgAA4gHQgBgMgFgKQgEgKgHgIQgIgHgJgEQgLgEgKAAQgKAAgLAEQgKAEgHAHQgHAIgEAKQgFAKgBAMIBuAAIAAAAg");
	this.shape_7.setTransform(102.6,21.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgkBMIAAiWIASAAIAAAkQAIgRANgKQAPgKAQAAIAEABIAAASQgVAAgOALQgOAJgGATIAABdg");
	this.shape_8.setTransform(89.75,21.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape_9.setTransform(79.175,19.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJBqIAAiWIATAAIAACWgAgJhMIAAgdIATAAIAAAdg");
	this.shape_10.setTransform(70.975,18.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhIBrIAAjTIASAAIAAAdQAJgOAPgJQAPgJAQAAQAQAAANAHQANAGAJALQAKALAFAPQAGAOAAAOQAAAQgFAOQgFAOgJALQgKALgMAFQgNAHgPAAQgSAAgPgKQgOgJgJgPIAABcgAgThWQgIACgHAGQgHAFgFAHQgFAGgBAIIAAAvQADAGAGAHQAFAHAHAGQAGAFAIADQAIADAJAAQALAAAKgGQAKgFAHgIQAHgJAEgKQAEgLAAgMQAAgMgFgKQgEgLgIgJQgHgJgKgEQgLgFgLgBQgHAAgJAEg");
	this.shape_11.setTransform(59.425,24.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgkBLQgJgEgHgHQgHgGgEgIQgEgJAAgKQABgKAEgIQAFgJAIgFQAJgGALgDQAMgDAOAAQAKAAANACQALACAJADIAAgNQAAgUgLgMQgLgMgTAAQgMAAgMAFQgMAFgMAIIgIgNQAdgTAcAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAHAAIAAARIgHABQgHAAgFgEQgEgDgBgHIAAgMQgLAOgPAHQgQAHgRAAQgLAAgJgDgAgiAHQgNAIgBAPQABAHACAGQADAGAEAEQAGAFAGADQAHACAHAAQAOAAANgGQAOgGAGgJIAEgGIABgFIAAgZQgKgEgKgCQgLgBgKAAQgUAAgNAIg");
	this.shape_12.setTransform(41.85,21.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AArBqIAAhVQABgYgJgNQgJgNgRAAQgJAAgHADQgJAEgGAGQgIAFgFAIQgGAHgCAJIAABdIgUAAIAAjTIAUAAIAABfQAJgRAQgKQAQgKASAAQANAAAIAFQAKAFAFAIQAGAJADAMQACALAAAOIAABZg");
	this.shape_13.setTransform(25.8,18.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgfBfQgRgJgNgPQgMgPgHgTQgIgTAAgTQAAgSAHgTQAGgSANgPQAMgOASgJQATgJAWAAQAbAAAUAMQATANAKAUIgQAKQgFgLgHgHQgHgHgJgEQgHgEgJgCQgJgCgIAAQgSAAgOAIQgPAHgJAMQgKAMgEAQQgGAPAAAPQAAARAHAPQAFAQALAMQAKAMAOAHQAOAHAQAAQAIAAAKgCQAIgCAJgFQAJgFAHgHQAHgHAFgKIARAJQgFALgJAJQgJAJgLAGQgLAGgNADQgMADgLAAQgVAAgSgJg");
	this.shape_14.setTransform(7.5,18.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#383838").s().p("AhECDIgdhIIvuAAQhkAAAAhjIAAixQAAhkBkAAMAifAAAQBkAAAABkIAACxQAABjhkAAIwLAAIg+ECIAAABQgBAAhKi7g");
	this.shape_15.setTransform(106.375,32.9532);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AArBNIAAhUQABgbgJgMQgHgMgRAAQgJAAgIADQgIADgHAGQgIAGgGAIQgFAIgDAJIAABcIgUAAIAAiWIASAAIAAAiQAJgRASgKQARgKATAAQANAAAJAFQAIAEAFAJQAFAIADAMQADANgBAOIAABYg");
	this.shape_16.setTransform(112.2,21.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgkBLQgKgEgGgHQgHgGgEgIQgDgJAAgKQgBgKAFgIQAFgJAJgFQAHgGANgDQALgDAOAAQAKAAAMACQAMACAKADIAAgNQAAgUgMgMQgLgMgTAAQgLAAgNAFQgMAFgMAIIgHgNQAcgTAcAAQAbAAARAPQAQAQAAAdIAABDQAAAIAIAAIAAARIgIABQgIAAgEgEQgEgDAAgHIgBgMQgKAOgQAHQgQAHgRAAQgLAAgJgDgAgjAHQgNAIABAPQgBAHADAGQADAGAFAEQAEAFAHADQAHACAIAAQAOAAANgGQANgGAGgJIAEgGIACgFIAAgZQgKgEgLgCQgKgBgKAAQgWAAgNAIg");
	this.shape_17.setTransform(95.55,21.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgGgOQgFgPAAgPQAAgQAFgOQAGgOAKgKQAKgLAOgGQAOgGAPAAQAQAAAOAGQAPAGAJALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiAAAQAAAMAFAKQAFALAIAHQAHAIAKAEQAJAEALAAQAGAAAIgCIANgFQAGgEAFgFQAFgFADgGIARAEQgDAJgHAHQgHAHgIAFQgIAFgLACQgKADgKAAQgQAAgOgGgAA4gHQgBgMgFgKQgEgKgIgIQgHgHgKgEQgKgEgKAAQgLAAgKAEQgJAEgHAHQgIAIgFAKQgEAKgBAMIBuAAIAAAAg");
	this.shape_18.setTransform(19.1,21.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgkBMIAAiWIASAAIAAAkQAIgRANgKQAOgKARAAIADABIAAASQgTAAgPALQgOAJgGATIAABdg");
	this.shape_19.setTransform(6.25,21.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgkBLQgKgEgGgHQgHgGgDgIQgFgJAAgKQABgKAEgIQAFgJAIgFQAJgGALgDQAMgDAOAAQALAAAMACQALACAJADIAAgNQAAgUgLgMQgLgMgTAAQgMAAgMAFQgMAFgNAIIgHgNQAdgTAcAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAHAAIAAARIgHABQgIAAgEgEQgEgDAAgHIgBgMQgLAOgPAHQgQAHgRAAQgLAAgJgDgAgiAHQgOAIAAAPQAAAHADAGQADAGAEAEQAGAFAGADQAHACAHAAQAOAAANgGQANgGAIgJIADgGIABgFIAAgZQgKgEgKgCQgLgBgJAAQgVAAgNAIg");
	this.shape_20.setTransform(-41.65,21.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AArBqIAAhVQABgYgKgNQgIgNgRAAQgIAAgIADQgJAEgGAGQgIAFgFAIQgGAHgCAJIAABdIgUAAIAAjTIAUAAIAABfQAJgRAQgKQAQgKARAAQANAAAKAFQAIAFAGAIQAGAJACAMQADALAAAOIAABZg");
	this.shape_21.setTransform(-57.7,18.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgeBfQgSgJgNgPQgMgPgIgTQgHgTAAgTQAAgSAHgTQAGgSAMgPQANgOASgJQATgJAWAAQAbAAAUAMQATANAKAUIgQAKQgFgLgHgHQgHgHgIgEQgJgEgIgCQgJgCgIAAQgSAAgOAIQgOAHgKAMQgKAMgFAQQgEAPgBAPQABARAFAPQAHAQAKAMQAKAMAOAHQAOAHAPAAQAJAAAJgCQAKgCAIgFQAJgFAHgHQAHgHAFgKIARAJQgFALgJAJQgJAJgLAGQgLAGgMADQgMADgMAAQgVAAgRgJg");
	this.shape_22.setTransform(-76,18.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#383838").s().p("AL1CDIgdhII8ZAAQhkAAAAhjIAAixQAAhkBkAAMAiDAAAQBkAAAABkIAACxQAABjhkAAIjDAAIg+ECIAAABQgBAAhLi7g");
	this.shape_23.setTransform(23.775,32.9532);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{x:59.425}},{t:this.shape_10,p:{x:70.975}},{t:this.shape_9,p:{x:79.175}},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{x:125.275}},{t:this.shape_5,p:{x:141.225}},{t:this.shape_4,p:{x:152.775}},{t:this.shape_3,p:{x:163.625}},{t:this.shape_2},{t:this.shape_1},{t:this.shape,p:{x:209.125}}]}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_11,p:{x:-24.075}},{t:this.shape_10,p:{x:-12.525}},{t:this.shape_9,p:{x:-4.325}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_6,p:{x:41.775}},{t:this.shape_5,p:{x:57.725}},{t:this.shape_4,p:{x:69.275}},{t:this.shape_3,p:{x:80.125}},{t:this.shape_17},{t:this.shape_16},{t:this.shape,p:{x:125.625}}]},10).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14,0,240.8,64.7);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-95.2,0,238,64.7), rect, rect, rect, rect, rect, rect, rect, rect];


(lib.infobulle_menu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgGgOQgFgPAAgPQAAgQAFgOQAGgOAKgKQAKgLAOgGQAOgGAPAAQAQAAAOAGQAPAGAJALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiAAAQAAAMAFAKQAFALAIAHQAHAIAKAEQAJAEALAAQAGAAAIgCIANgFQAGgEAFgFQAFgFACgGIASAEQgDAJgHAHQgHAHgIAFQgIAFgLACQgKADgKAAQgQAAgOgGgAA4gHQgBgMgFgKQgEgKgIgIQgHgHgKgEQgKgEgKAAQgLAAgKAEQgJAEgHAHQgIAIgFAKQgEAKgBAMIBuAAIAAAAg");
	this.shape.setTransform(146.9,22.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgkBMIAAiWIASAAIAAAkQAIgRANgKQAOgKARAAIADAAIAAASQgTABgPALQgOAJgGATIAABdg");
	this.shape_1.setTransform(134.05,22.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJBqIAAiWIATAAIAACWgAgJhMIAAgdIATAAIAAAdg");
	this.shape_2.setTransform(124.975,19.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgkBLQgJgEgHgHQgHgGgDgIQgFgJAAgKQAAgKAFgIQAFgJAIgFQAJgGAMgDQALgDAOAAQALAAAMACQALACAJADIAAgNQAAgUgLgMQgLgMgTAAQgMAAgMAFQgMAFgNAIIgHgNQAegTAbAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAHAAIAAARIgHABQgIAAgEgEQgEgDAAgHIgBgMQgLAOgPAHQgQAHgRAAQgLAAgJgDgAgiAHQgOAIAAAPQAAAHADAGQADAGAFAEQAFAFAGADQAHACAHAAQAPAAANgGQAMgGAIgJIADgGIABgFIAAgZQgJgEgLgCQgLgBgJAAQgWAAgMAIg");
	this.shape_3.setTransform(113.7,22.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABdBNIAAhUQAAgagJgMQgIgNgRAAQgIAAgIADQgIADgGAGQgHAGgFAIQgFAIgCAKIAABbIgTAAIAAhUQAAgbgIgMQgIgMgRAAQgRAAgOAMQgNAMgGATIAABcIgTAAIAAiWIASAAIAAAiQAJgRAPgKQAPgKASAAQATAAAMALQAKAKADASQAVgnAlAAQANAAAJAFQAJAEAFAJQAFAIADAMQACANAAAOIAABYg");
	this.shape_4.setTransform(92.775,22.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABdBNIAAhUQAAgagJgMQgIgNgRAAQgIAAgIADQgIADgGAGQgHAGgFAIQgFAIgCAKIAABbIgTAAIAAhUQAAgbgIgMQgIgMgRAAQgRAAgOAMQgNAMgGATIAABcIgTAAIAAiWIASAAIAAAiQAJgRAPgKQAPgKASAAQATAAAMALQAKAKADASQAVgnAlAAQANAAAJAFQAJAEAFAJQAFAIADAMQACANAAAOIAABYg");
	this.shape_5.setTransform(66.125,22.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgeBIQgNgGgKgLQgKgLgFgOQgGgOAAgQQAAgPAGgOQAFgOAKgLQAKgLANgGQAOgGAQAAQAQAAAOAGQAOAGAJALQAKALAGAOQAGAOAAAPQAAAQgGAOQgFAOgLALQgJALgOAGQgOAGgQAAQgQAAgOgGgAgVg3QgKAFgHAIQgHAIgFAMQgEALAAALQAAANAEALQAFALAHAIQAHAIAKAFQALAFAKAAQALAAAKgFQAKgFAIgIQAHgIAEgLQAEgLABgNQgBgMgEgLQgEgLgHgIQgIgIgKgFQgKgFgLAAQgKAAgLAFg");
	this.shape_6.setTransform(44.1,22.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhNBLIAKgRIANAMIARAJQAJAEALABQALACALAAQAYABAOgJQAOgJAAgSQAAgJgEgHQgEgGgIgGQgIgEgLgDIgagHIgdgIQgMgDgIgGQgJgHgEgIQgEgIAAgNQAAgOAFgMQAGgLAKgHQAKgHANgEQANgFAPAAQAVABAQAGQAQAGANAMIgKAQQgIgKgPgGQgOgGgTgBQgaAAgNALQgMAKAAASQAAAJADAGQAEAGAHAEQAHAFAKADIAZAHIAeAHQANAEAJAGQAKAHAFAJQAEAJAAAOQAAAOgFALQgGAKgJAHQgKAHgOADQgOADgQAAQgvAAgigdg");
	this.shape_7.setTransform(26.625,19.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#383838").s().p("AsME+QhkAAAAhkIAAixQAAhjBkAAIDAAAIAchIQBNi+AAAEIA+ECISyAAQBkAAAABjIAACxQAABkhkAAg");
	this.shape_8.setTransform(88.1,7.3468);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infobulle_menu, rect = new cjs.Rectangle(0,-24.4,176.2,63.5), [rect]);


(lib.infobulle_home = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdBIQgOgGgKgLQgKgLgGgOQgFgPAAgPQAAgQAFgOQAGgOAKgKQAKgLAOgGQAOgGAPAAQARAAANAGQAPAGAJALQAKAKAGAOQAFAOAAAQIAAAEIAAADIiAAAQAAAMAFAKQAFALAIAHQAHAIAKAEQAKAEAJAAQAIAAAHgCIANgFQAHgEAEgFQAFgFACgGIASAEQgEAJgGAHQgGAHgJAFQgIAFgLACQgJADgMAAQgPAAgOgGgAA4gHQgBgMgEgKQgFgKgIgIQgHgHgKgEQgJgEgMAAQgKAAgJAEQgLAEgGAHQgIAIgFAKQgEAKgBAMIBuAAIAAAAg");
	this.shape.setTransform(154.3,21.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AglBMIAAiWIATAAIAAAkQAIgRAOgKQAOgKAQAAIADABIAAASQgTAAgPALQgOAJgGATIAABdg");
	this.shape_1.setTransform(141.45,21.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape_2.setTransform(130.875,19.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJBqIAAiWIATAAIAACWgAgJhMIAAgdIATAAIAAAdg");
	this.shape_3.setTransform(122.675,18.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape_4.setTransform(114.875,19.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBMIAAiWIATAAIAAAkQAIgRAOgKQAOgKAQAAIADABIAAASQgTAAgPALQgOAJgGATIAABdg");
	this.shape_5.setTransform(98.25,21.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ag3A8QgMgQAAggIAAhYIAUAAIAABUQAAAzAjABQAJAAAHgDQAIgDAIgGQAHgGAFgHQAGgIADgJIAAheIAUAAIAAB9QAAAHAHABIAAARIgGABIgDAAQgHgBgEgFQgEgEAAgIIAAgRQgKASgRAJQgRAKgSAAQgZAAgMgRg");
	this.shape_6.setTransform(83.925,21.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdBIQgOgGgKgLQgKgLgFgOQgGgOAAgQQAAgPAGgOQAFgOAKgLQAKgLAOgGQANgGAQAAQAQAAAOAGQAOAGAJALQAKALAGAOQAGAOAAAPQAAAQgGAOQgFAOgLALQgJALgOAGQgOAGgQAAQgQAAgNgGgAgVg3QgKAFgHAIQgHAIgFAMQgEALAAALQAAANAEALQAFALAHAIQAHAIAKAFQALAFAKAAQALAAAKgFQAKgFAIgIQAHgIAEgLQAEgLAAgNQAAgMgEgLQgEgLgHgIQgIgIgKgFQgKgFgLAAQgKAAgLAFg");
	this.shape_7.setTransform(66.5,21.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgCBkQgGgBgEgEQgEgEgDgFQgDgGAAgHIAAhrIgVAAIAAgQIAVAAIAAgzIAUAAIAAAzIAiAAIAAAQIgiAAIAABmQABAIAEAEQAFAEAHAAQAJAAAGgDIAIgEIAGAQIgGACIgHADIgKADIgMABQgGAAgFgCg");
	this.shape_8.setTransform(53.225,19.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgGgOQgFgPAAgPQAAgQAFgOQAGgOAKgKQAKgLAOgGQAOgGAPAAQAQAAAOAGQAPAGAJALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiAAAQAAAMAFAKQAFALAIAHQAHAIAKAEQAJAEALAAQAGAAAIgCIANgFQAGgEAFgFQAFgFACgGIASAEQgDAJgHAHQgHAHgIAFQgIAFgLACQgKADgKAAQgQAAgOgGgAA4gHQgBgMgFgKQgEgKgIgIQgHgHgKgEQgKgEgKAAQgLAAgKAEQgJAEgHAHQgIAIgFAKQgEAKgBAMIBuAAIAAAAg");
	this.shape_9.setTransform(39.8,21.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AA1BnIgwhMIg8AAIAABMIgUAAIAAjNIBWAAQANAAALAGQALAFAIAKQAIAJAFALQAEAMAAAMQAAALgDAKQgDAKgGAIQgGAIgJAGQgIAGgKACIAyBPgAg3AJIBCAAQAJAAAHgEQAIgEAFgGQAFgGADgIQADgJAAgJQAAgJgDgJQgEgIgFgHQgGgHgIgDQgHgEgJAAIhAAAg");
	this.shape_10.setTransform(22.475,18.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#383838").s().p("AowCDIgchIIjAAAQhkAAAAhjIAAixQAAhkBkAAIYZAAQBkAAAABkIAACxQAABjhkAAIyyAAIg+ECIAAABQgBAAhMi7g");
	this.shape_11.setTransform(88.1,32.9532);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infobulle_home, rect = new cjs.Rectangle(0,0,176.2,64.7), [rect]);


(lib.infobulle_fullscreen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAsBNIAAhUQgBgbgHgMQgJgMgQAAQgIAAgJADQgIADgIAGQgHAGgFAIQgGAIgDAJIAABcIgTAAIAAiWIASAAIAAAiQAIgRASgKQARgKAUAAQAMAAAIAFQAJAEAGAJQAEAIADAMQACANABAOIAABYg");
	this.shape.setTransform(161.85,21.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgkBLQgJgEgHgHQgHgGgDgIQgFgJAAgKQAAgKAFgIQAFgJAIgFQAJgGAMgDQALgDAOAAQALAAALACQAMACAJADIAAgNQAAgUgLgMQgLgMgTAAQgMAAgMAFQgMAFgNAIIgHgNQAegTAbAAQAcAAAQAPQAQAQAAAdIAABDQAAAIAHAAIAAARIgHABQgIAAgEgEQgEgDAAgHIgBgMQgLAOgPAHQgQAHgRAAQgLAAgJgDgAgiAHQgOAIAAAPQAAAHADAGQADAGAFAEQAFAFAGADQAHACAHAAQAPAAANgGQAMgGAIgJIADgGIABgFIAAgZQgJgEgLgCQgLgBgJAAQgWAAgMAIg");
	this.shape_1.setTransform(145.2,21.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AglBMIAAiWIATAAIAAAkQAIgRANgKQAPgKAQAAIAEABIAAASQgUAAgPALQgOAJgGATIAABdg");
	this.shape_2.setTransform(133.3,21.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgXBIQgOgGgKgLQgKgLgGgOQgFgPAAgPQAAgQAFgOQAGgOAKgLQAKgKANgGQAOgGAQAAQAWAAAQAJQAQAKAIARIgTAGQgHgMgLgGQgMgHgOAAQgKAAgKAFQgKAEgIAIQgHAIgEALQgEALAAANQAAAMAEALQAEAMAIAIQAHAIAKAFQAKAFALAAQAHAAAHgCQAHgCAGgEIALgIQAEgFACgFIATAGQgDAIgGAHQgGAHgIAFQgJAFgKACQgKADgLAAQgPAAgOgGg");
	this.shape_3.setTransform(119.525,21.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgdBlQgOgGgKgLQgKgLgGgOQgFgPAAgQQAAgQAFgNQAGgOAKgKQAKgLAOgGQAOgGAPAAQAQAAAOAGQAOAGAKALQAKAKAGAOQAFANAAAQIAAAFIAAADIiAAAQAAAMAFAKQAFALAHAHQAIAIAKAEQAJAEAKAAQAIAAAHgCIANgFQAGgEAFgFQAFgFACgGIASAEQgDAJgHAHQgGAHgJAFQgIAFgLACQgJADgMAAQgPAAgOgGgAA4AVQgBgMgEgJQgFgKgIgIQgHgHgKgEQgJgEgMAAQgJAAgKAEQgLAEgGAHQgIAIgEAKQgFAJgBAMIBuAAIAAAAgAgKhQIAQgaIAVAAIgaAfg");
	this.shape_4.setTransform(103.1,18.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AArBNIAAhUQAAgbgIgMQgIgMgQAAQgJAAgHADQgJADgIAGQgHAGgFAIQgHAIgCAJIAABcIgUAAIAAiWIASAAIAAAiQAKgRARgKQARgKAUAAQAMAAAJAFQAIAEAFAJQAGAIACAMQADANAAAOIAABYg");
	this.shape_5.setTransform(78.75,21.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJBqIAAiWIATAAIAACWgAgJhMIAAgdIATAAIAAAdg");
	this.shape_6.setTransform(67.075,18.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdBIQgNgGgLgLQgKgLgGgOQgFgPAAgPQAAgQAFgOQAGgOAKgKQAKgLAOgGQAOgGAPAAQAQAAAOAGQAPAGAJALQAKAKAFAOQAGAOAAAQIAAAEIAAADIiAAAQAAAMAFAKQAFALAIAHQAHAIAKAEQAJAEALAAQAGAAAIgCIANgFQAGgEAFgFQAFgFACgGIASAEQgDAJgHAHQgHAHgIAFQgIAFgLACQgKADgKAAQgQAAgOgGgAA4gHQgBgMgFgKQgEgKgIgIQgHgHgKgEQgKgEgKAAQgLAAgKAEQgJAEgHAHQgIAIgFAKQgEAKgBAMIBuAAIAAAAg");
	this.shape_7.setTransform(55.55,21.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTBjQgIgIAAgOIAAi3IAUAAIAACxQAAAIAEAFQAEAFAIAAIAIgBIAIgDIADAQIgNAFIgOABQgNAAgHgIg");
	this.shape_8.setTransform(44.125,18.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhIBnIAAjNIBUAAQANAAALAGQALAFAJAKQAIAJAEALQAFAMAAAMQAAANgEAMQgFALgHAIQgIAJgLAFQgLAGgNAAIhCAAIAABMgAg0AJIBBAAQAJAAAHgEQAHgEAGgGQAFgGADgIQADgJAAgJQAAgKgEgIQgDgJgGgHQgFgFgIgEQgIgEgIAAIg/AAg");
	this.shape_9.setTransform(30.975,18.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#383838").s().p("AGzCDIgdhIIzUAAQhkAAAAhjIAAixQAAhkBkAAIZ9AAQBkAAAABkIAACxQAABjhkAAIkBAAIg+ECIAAABQgBAAhMi7g");
	this.shape_10.setTransform(93.1,32.9532);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infobulle_fullscreen, rect = new cjs.Rectangle(0,0,186.2,64.7), [rect]);


(lib.flechepetite_anim_content = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_2
	this.instance = new lib.fleche_ombre();
	this.instance.setTransform(-7.15,6.8,0.2361,0.2361,-44.9974);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flechepetite_anim_content, rect = new cjs.Rectangle(-7.1,-9.9,33.6,33.6), [rect]);


(lib.coche_verte = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#59D541").s().p("AhvCpIh0h0IBOhOIBNBMIDdjbIBPBOIkEEDg");
	this.shape.setTransform(22.8,17.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0.1,45.6,33.9);
p.frameBounds = [rect];


(lib.coche_rouge = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E31933").s().p("AixBrIBrhrIhrhpIBHhIIBqBrIBrhqIAAgBIBHBIIhrBpIBrBrIhLBDIhnhnIhqBqg");
	this.shape.setTransform(18.4,17.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0.7,0,35.5,35.5);
p.frameBounds = [rect];


(lib.bt_zone = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FF00").s().p("ArbLcIAA23IW3AAIAAW3g");
	this.shape.setTransform(0.025,0.025);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = null;
p.frameBounds = [rect, rect, rect, new cjs.Rectangle(-73.1,-73.1,146.4,146.4)];


(lib.bt_subtitles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"off":0,"on":14};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(30));

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AibCSQgSgCgQgFIgegLQgQgGgNgJIAeg7IALAHQAJAHANAFQAOAGARAEQAPAFARAAQAkAAAAgWQAAgIgFgGQgFgEgKgGQgJgEgNgDIgdgJQgTgGgPgHQgPgIgKgIQgJgJgFgMQgFgNAAgQQAAgXAJgSQAIgSAPgMQAPgMATgGQAUgGAWAAQAPAAAPACQAPADANAFQAOAEAMAGIAVAMIgdA4IgKgHIgSgJQgLgEgNgEQgOgEgMAAQglAAABAXQAAAIADAGQAFAEAHAFIASAHIAbAHQAWAFARAIQAQAGANAKQAMAJAFAPQAHAOgBAUQAAAagJARQgJAQgPALQgQAKgSAFQgVAFgVAAQgPAAgRgDgABcCSIAAjoIhaAAIAAg8ID3AAIAAA8IhZAAIAADog");
	this.shape.setTransform(45.5,45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKgAhfjhQgsASgiAiQgiAigSAsQgUAuAAAxQAAAyAUAuQASAsAiAiQAiAiAsATQAuATAxAAQAyAAAugTQAsgTAigiQAigiATgsQATguAAgyQAAgxgTguQgTgsgigiQgigigsgSQgugUgyAAQgxAAguAUg");
	this.shape_1.setTransform(44.9988,44.9988,1.7716,1.7716);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AiNCNQg6g6AAhTQAAhSA6g7QA7g6BSAAQBTAAA6A6QA7A7AABSQAABTg7A6Qg6A7hTAAQhSAAg7g7g");
	this.shape_2.setTransform(44.9988,44.9988,1.7716,1.7716);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EAEAEA").s().p("AibCSQgSgCgQgFIgegLQgQgGgNgJIAeg7IALAHQAJAHANAFQAOAGARAEQAPAFARAAQAkAAAAgWQAAgIgFgGQgFgEgKgGQgJgEgNgDIgdgJQgTgGgPgHQgPgIgKgIQgJgJgFgMQgFgNAAgQQAAgXAJgSQAIgSAPgMQAPgMATgGQAUgGAWAAQAPAAAPACQAPADANAFQAOAEAMAGIAVAMIgdA4IgKgHIgSgJQgLgEgNgEQgOgEgMAAQglAAABAXQAAAIADAGQAFAEAHAFIASAHIAbAHQAWAFARAIQAQAGANAKQAMAJAFAPQAHAOgBAUQAAAagJARQgJAQgPALQgQAKgSAFQgVAFgVAAQgPAAgRgDgABcCSIAAjoIhaAAIAAg8ID3AAIAAA8IhZAAIAADog");
	this.shape_3.setTransform(45.5,45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKg");
	this.shape_4.setTransform(45,45,1.7717,1.7717);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},14).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.bt_submit_vert = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#62AC34").s().p("AhxCoIhxhxIBOhOIBKBJIDijaIBLBRIkEEAgADjhXIAAAAIAAAAIAAAAg");
	this.shape.setTransform(72.8865,66.661,1.6351,1.6351);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D1D7BB").s().p("AiPCRQg7g8gBhUQABhUA7g8QA8g7BUgBQBUABA8A7QA7A8AABUQAABUg7A8Qg8A7hUAAQhUAAg8g7gAiKiKQgaAbgQAkQgPAkAAAoQAAAoAPAjQAQAkAaAbQAbAbAkAPQAkAPAoAAQAnAAAkgPQAkgPAbgbQAbgbAPgkQAPgjAAgoQAAgngPglQgPgkgbgbQgbgbgkgOQgkgPgngBQhSABg5A4g");
	this.shape_1.setTransform(69.9938,70.003,3.4316,3.4313);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D1D7BB").s().p("AkDEEQhshsAAiYQAAiXBshsQBshsCXAAQCYAABsBsQBsBsAACXQAACYhsBsQhsBsiYAAQiXAAhshsg");
	this.shape_2.setTransform(69.9419,70.0594,1.3963,1.3997);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#62AC34").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_3.setTransform(69.8285,70.016,1.4336,1.437);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00CC00").s().p("AhvCpIh0h0IBPhOIBMBMIDdjbIBPBOIkEEDg");
	this.shape_4.setTransform(78.4,82.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhxCoIhxhxIBOhOIBKBJIDijaIBLBRIkEEAgADjhXIAAAAIAAAAIAAAAg");
	this.shape_5.setTransform(72.8865,66.661,1.6351,1.6351);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3,p:{scaleX:1.4336,scaleY:1.437,x:69.8285,y:70.016}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3,p:{scaleX:1.4372,scaleY:1.4375,x:69.9917,y:69.9914}},{t:this.shape_5}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,140,140);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_submit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AhxCoIhxhxIBOhOIBKBJIDijaIBLBRIkEEAgADjhXIAAAAIAAAAIAAAAg");
	this.shape.setTransform(72.8865,66.661,1.6351,1.6351);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AiPCRQg7g8gBhUQABhUA7g8QA8g7BUgBQBUABA8A7QA7A8AABUQAABUg7A8Qg8A7hUAAQhUAAg8g7gAiKiKQgaAbgQAkQgPAkAAAoQAAAoAPAjQAQAkAaAbQAbAbAkAPQAkAPAoAAQAnAAAkgPQAkgPAbgbQAbgbAPgkQAPgjAAgoQAAgngPglQgPgkgbgbQgbgbgkgOQgkgPgngBQhSABg5A4g");
	this.shape_1.setTransform(69.9938,70.003,3.4316,3.4313);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AkDEEQhshsAAiYQAAiXBshsQBshsCXAAQCYAABsBsQBsBsAACXQAACYhsBsQhsBsiYAAQiXAAhshsg");
	this.shape_2.setTransform(69.9419,70.0594,1.3963,1.3997);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_3.setTransform(69.8285,70.016,1.4336,1.437);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00CC00").s().p("AhvCpIh0h0IBPhOIBMBMIDdjbIBPBOIkEEDg");
	this.shape_4.setTransform(78.4,82.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EAEAEA").s().p("AhxCoIhxhxIBOhOIBKBJIDijaIBLBRIkEEAgADjhXIAAAAIAAAAIAAAAg");
	this.shape_5.setTransform(72.8865,66.661,1.6351,1.6351);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A4A4A4").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_6.setTransform(69.9917,69.9914,1.4372,1.4375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,140,140);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_restart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("EgR5AzCQokjimomoQmomojiojQjjojAApYIAAnbIO2AAIAAHbQAAGfChF8QCcFvEbEbQEbEbFvCcQF8ChGeAAQGgAAF8ihQFvicEbkbQEbkbCblvQChl8AAmfQAAmgihl6QiblvkbkcQkckbluibQl8ihmgAAQl0AAlcCDIMJDTIj4OVMgrWgLyMAangmTIMMIfImaJMQGziHHJAAQJYAAIjDiQIjDjGoGoQGnGoDkIjQDiIjAAJXQAAJYjiIjQjkIjmnGoQmoGoojDiQojDjpYAAQpXAAoijjg");
	this.shape.setTransform(45.9261,42.7364,0.0755,0.0755);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EAEAEA").s().p("EgR5AzCQokjimomoQmomojiojQjjojAApYIAAnbIO2AAIAAHbQAAGfChF8QCcFvEbEbQEbEbFvCcQF8ChGeAAQGgAAF8ihQFvicEbkbQEbkbCblvQChl8AAmfQAAmgihl6QiblvkbkcQkckbluibQl8ihmgAAQl0AAlcCDIMJDTIj4OVMgrWgLyMAangmTIMMIfImaJMQGziHHJAAQJYAAIjDiQIjDjGoGoQGnGoDkIjQDiIjAAJXQAAJYjiIjQjkIjmnGoQmoGoojDiQojDjpYAAQpXAAoijjg");
	this.shape_1.setTransform(45.9261,42.7364,0.0755,0.0755);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(3));

	// Calque 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AiPCRQg8g8AAhUQAAhUA8g8QA8g7BTgBQBVABA7A7QA8A8AABUQAABUg8A8Qg7A7hVAAQhTAAg8g7gAiJiKQgcAbgPAkQgPAkAAAoQAAAoAPAjQAPAkAcAbQAbAbAjAPQAkAPAnAAQAoAAAlgPQAjgPAbgbQAbgbAPgkQAPgjAAgoQAAgngPglQgPgkgbgbQgbgbgjgOQglgPgogBQhRABg4A4g");
	this.shape_2.setTransform(44.9993,44.9996,2.2062,2.205);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A4A4A4").s().p("AhpBqQgsgsAAg+QAAg9AsgsQAsgsA9AAQA+AAAsAsQAsAsAAA9QAAA+gsAsQgsAsg+AAQg9AAgsgsg");
	this.shape_3.setTransform(45.1096,45.1098,2.2062,2.205);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_4.setTransform(44.9925,45.0341,0.924,0.9234);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A4A4A4").s().p("AiPCRQg8g8AAhUQAAhUA8g8QA8g7BTgBQBVABA7A7QA8A8AABUQAABUg8A8Qg7A7hVAAQhTAAg8g7g");
	this.shape_5.setTransform(44.9993,44.9996,2.2062,2.205);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_5}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_pause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape.setTransform(58.0072,45.0488,1.7538,1.7734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383838").s().p("AglBxIAAjgIBLAAIAADgg");
	this.shape_1.setTransform(33.0155,45.0488,1.7538,1.7734);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKgAhfjiQgsATgiAiQgiAigTAsQgTAuAAAxQAAAyATAuQATAsAiAiQAiAiAsATQAuATAxAAQAyAAAugTQAsgTAigiQAigiATgsQATguAAgyQAAgxgTguQgTgsgigiQgigigsgTQgugTgyAAQgxAAguATg");
	this.shape_2.setTransform(45.0114,45.0045,1.7735,1.7734);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A4A4A4").s().p("AiNCNQg6g6AAhTQAAhSA6g6QA7g7BSAAQBTAAA7A7QA6A6AABSQAABTg6A6Qg7A7hTAAQhSAAg7g7g");
	this.shape_3.setTransform(45.5552,45.0488,1.7538,1.7734);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_4.setTransform(44.9883,45.0095,0.9239,0.924);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EAEAEA").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_5.setTransform(58.0072,45.0488,1.7538,1.7734);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EAEAEA").s().p("AglBxIAAjgIBLAAIAADgg");
	this.shape_6.setTransform(33.0155,45.0488,1.7538,1.7734);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A4A4A4").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_7.setTransform(44.9883,45.0095,0.9239,0.924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_next = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"off":0,"on":9,highlight:20};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* Arrêter la lecture à partir de cette image
		Le scénario arrête/met en pause la lecture à partir de cette image lorsque vous insérez ce code.
		Vous pouvez également utiliser ce code pour arrêter/mettre en pause le scénario des clips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(30));

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("Ag9BEIA5grIhpAAIAAgxIBpAAIg5grIAegoICNBrIiNBsg");
	this.shape.setTransform(47.9795,45.0547,2.2013,2.205);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AiPCRQg7g8gBhUQABhUA7g8QA8g7BUgBQBUABA8A7QA7A8AABUQAABUg7A8Qg8A7hUAAQhUAAg8g7gAiKiKQgaAbgQAkQgPAkAAAoQAAAoAPAjQAQAkAaAbQAbAbAkAPQAkAPAoAAQAnAAAkgPQAkgPAbgbQAbgbAPgkQAPgjAAgoQAAgngPglQgPgkgbgbQgbgbgkgOQgkgPgngBQhSABg5A4g");
	this.shape_1.setTransform(45.1178,44.9996,2.2013,2.205);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AkDEEQhshsAAiYQAAiXBshsQBshsCXAAQCYAABsBsQBsBsAACXQAACYhsBsQhsBsiYAAQiXAAhshsg");
	this.shape_2.setTransform(45.1612,45.087,0.898,0.8995);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_3.setTransform(44.8974,45.0341,0.9219,0.9234);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EAEAEA").s().p("Ag9BEIA5grIhpAAIAAgxIBpAAIg5grIAegoICNBrIiNBsg");
	this.shape_4.setTransform(47.8658,45.0547,2.205,2.205);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A4A4A4").s().p("AiPCRQg7g8gBhUQABhUA7g8QA8g7BUgBQBUABA8A7QA7A8AABUQAABUg7A8Qg8A7hUAAQhUAAg8g7g");
	this.shape_5.setTransform(44.9994,44.9996,2.205,2.205);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FDCA00").s().p("Ag9BEIA5grIhpAAIAAgxIBpAAIg5grIAegoICNBrIiNBsg");
	this.shape_6.setTransform(47.9795,45.0547,2.2013,2.205);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#383838").s().p("AiPCRQg7g8gBhUQABhUA7g8QA8g7BUgBQBUABA8A7QA7A8AABUQAABUg7A8Qg8A7hUAAQhUAAg8g7gAiKiKQgaAbgQAkQgPAkAAAoQAAAoAPAjQAQAkAaAbQAbAbAkAPQAkAPAoAAQAnAAAkgPQAkgPAbgbQAbgbAPgkQAPgjAAgoQAAgngPglQgPgkgbgbQgbgbgkgOQgkgPgngBQhSABg5A4g");
	this.shape_7.setTransform(45.1178,44.9996,2.2013,2.205);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#383838").s().p("AkDEEQhshsAAiYQAAiXBshsQBshsCXAAQCYAABsBsQBsBsAACXQAACYhsBsQhsBsiYAAQiXAAhshsg");
	this.shape_8.setTransform(45.1612,45.087,0.898,0.8995);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FDCA00").s().p("Ak9E+QiDiEAAi6QAAi5CDiEQCEiEC5AAQC5AACECEQCECEAAC5QAAC6iECEQiECEi5AAQi5AAiEiEg");
	this.shape_9.setTransform(44.9,45.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},9).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},11).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.bt_menu_on = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AilhzIAygyIEZEZIgyAyg");
	this.shape.setTransform(46.675,45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383838").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_1.setTransform(46.7099,45.024,0.9521,1.7734,45.0003);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKgAhfjiQgsATgiAiQgiAigTAsQgTAuAAAxQAAAyATAuQATAsAiAiQAiAiAsATQAuATAxAAQAyAAAugTQAsgTAigiQAigiATgsQATguAAgyQAAgxgTguQgTgsgigiQgigigsgTQgugTgyAAQgxAAguATg");
	this.shape_2.setTransform(45.0114,45.0045,1.7735,1.7734);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A4A4A4").s().p("AiNCNQg6g6AAhTQAAhSA6g6QA7g7BSAAQBTAAA7A7QA6A6AABSQAABTg6A6Qg7A7hTAAQhSAAg7g7g");
	this.shape_3.setTransform(45.5552,45.0488,1.7538,1.7734);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_4.setTransform(44.9883,45.0095,0.9239,0.924);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EAEAEA").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_5.setTransform(46.6862,45.0099,0.9521,1.7734,135.0007);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EAEAEA").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_6.setTransform(46.7099,45.024,0.9521,1.7734,45.0003);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A4A4A4").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_7.setTransform(44.9883,45.0095,0.9239,0.924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_menu_off = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape.setTransform(46.7012,58.7881,0.9521,1.7734,90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#383838").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_1.setTransform(46.7012,44.9881,0.9521,1.7734,90);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#383838").s().p("AglBxIAAjgIBLAAIAADgg");
	this.shape_2.setTransform(46.7012,31.4209,0.9521,1.7734,90);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKgAhfjiQgsATgiAiQgiAigTAsQgTAuAAAxQAAAyATAuQATAsAiAiQAiAiAsATQAuATAxAAQAyAAAugTQAsgTAigiQAigiATgsQATguAAgyQAAgxgTguQgTgsgigiQgigigsgTQgugTgyAAQgxAAguATg");
	this.shape_3.setTransform(45.0114,45.0045,1.7735,1.7734);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A4A4A4").s().p("AiNCNQg6g6AAhTQAAhSA6g6QA7g7BSAAQBTAAA7A7QA6A6AABSQAABTg6A6Qg7A7hTAAQhSAAg7g7g");
	this.shape_4.setTransform(45.5552,45.0488,1.7538,1.7734);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_5.setTransform(44.9883,45.0095,0.9239,0.924);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EAEAEA").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_6.setTransform(46.7012,58.7881,0.9521,1.7734,90);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EAEAEA").s().p("AgkBxIAAjgIBKAAIAADgg");
	this.shape_7.setTransform(46.7012,44.9881,0.9521,1.7734,90);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EAEAEA").s().p("AglBxIAAjgIBLAAIAADgg");
	this.shape_8.setTransform(46.7012,31.4209,0.9521,1.7734,90);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A4A4A4").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_9.setTransform(44.9883,45.0095,0.9239,0.924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_home = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AjZEUIAAkRIgvAjIg7hPIFDjqIFDDqIg5BPIgwgjIAAERgAh2hDIAAD1IDtAAIAAj1Ih3hXg");
	this.shape.setTransform(44.9997,41.7772,0.9,0.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKgAhfjiQgsATgiAiQgiAigTAsQgTAuAAAxQAAAyATAuQATAsAiAiQAiAiAsATQAuATAxAAQAyAAAugTQAsgTAigiQAigiATgsQATguAAgyQAAgxgTguQgTgsgigiQgigigsgTQgugTgyAAQgxAAguATg");
	this.shape_1.setTransform(45.0021,44.9853,1.7735,1.7735);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AiNCNQg6g6AAhTQAAhSA6g6QA7g7BSAAQBSAAA7A7QA7A6AABSQAABTg7A6Qg7A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(45.0465,45.0297,1.7735,1.7735);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EAEAEA").s().p("AjDD5IAAj2IgrAfIg1hHIEkjTIEjDTIg1BHIgrgfIAAD2gAhqg8IAADcIDWAAIAAjcIhshOg");
	this.shape_3.setTransform(45,41.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A4A4A4").s().p("AlmFoQiViVAAjSQAAjSCViVQCUiVDTAAQDSAACVCVQCUCVAADSQAADSiUCVQiVCUjSAAQjTAAiUiUg");
	this.shape_4.setTransform(44.9999,44.9999,0.8863,0.8863);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_fullscreen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("AAsC9IAAgxIBlAAIAAhlIAwAAIAACWgAjBC9IAAiWIAyAAIAABkIBkAAIAAAygACRgmIAAhlIhlAAIAAgxICVAAIAACWgAjBgmIAAiWICWAAIAAAxIhkAAIAABlg");
	this.shape.setTransform(45.75,44.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AiyC0QhLhLAAhpQAAhoBLhKQBKhLBoAAQBpAABLBLQBKBKAABoQAABphKBLQhLBKhpAAQhoAAhKhKgAhfjiQgsATgiAiQgiAigTAsQgTAuAAAxQAAAyATAuQATAsAiAiQAiAiAsATQAuATAxAAQAyAAAugTQAsgTAigiQAigiATgsQATguAAgyQAAgxgTguQgTgsgigiQgigigsgTQgugTgyAAQgxAAguATg");
	this.shape_1.setTransform(45.0114,45.0045,1.7735,1.7734);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AiNCNQg6g6AAhTQAAhSA6g6QA7g7BSAAQBTAAA7A7QA6A6AABSQAABTg6A6Qg7A7hTAAQhSAAg7g7g");
	this.shape_2.setTransform(45.5552,45.0488,1.7538,1.7734);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_3.setTransform(44.9883,45.0095,0.9239,0.924);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EAEAEA").s().p("AAsC9IAAgxIBlAAIAAhlIAwAAIAACWgAjBC9IAAiWIAyAAIAABkIBkAAIAAAygACRgmIAAhlIhlAAIAAgxICVAAIAACWgAjBgmIAAiWICWAAIAAAxIhkAAIAABlg");
	this.shape_4.setTransform(45.75,44.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A4A4A4").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_5.setTransform(44.9883,45.0095,0.9239,0.924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,90,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.bt_continue = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#383838").s().p("Ag9BEIA5grIhpAAIAAgxIBpAAIg5grIAegoICNBrIiNBsg");
	this.shape.setTransform(74.4548,70.0888,3.4316,3.4313);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A4A4A4").s().p("AiPCRQg7g8gBhUQABhUA7g8QA8g7BUgBQBUABA8A7QA7A8AABUQAABUg7A8Qg8A7hUAAQhUAAg8g7gAiKiKQgaAbgQAkQgPAkAAAoQAAAoAPAjQAQAkAaAbQAbAbAkAPQAkAPAoAAQAnAAAkgPQAkgPAbgbQAbgbAPgkQAPgjAAgoQAAgngPglQgPgkgbgbQgbgbgkgOQgkgPgngBQhSABg5A4g");
	this.shape_1.setTransform(69.9938,70.003,3.4316,3.4313);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A4A4A4").s().p("AkDEEQhshsAAiYQAAiXBshsQBshsCXAAQCYAABsBsQBsBsAACXQAACYhsBsQhsBsiYAAQiXAAhshsg");
	this.shape_2.setTransform(70.067,70.0594,1.3998,1.3997);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#383838").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_3.setTransform(69.9917,69.9914,1.4372,1.4375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EAEAEA").s().p("Ag9BEIA5grIhpAAIAAgxIBpAAIg5grIAegoICNBrIiNBsg");
	this.shape_4.setTransform(74.6387,70.0888,3.423,3.4313);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A4A4A4").s().p("AlXFYQiPiOAAjKQAAjICPiQQCOiODJAAQDJAACPCOQCPCQAADIQAADKiPCOQiPCPjJAAQjJAAiOiPg");
	this.shape_5.setTransform(69.9917,69.9914,1.4372,1.4375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,140,140);
p.frameBounds = [rect, rect, rect, rect];


(lib.aide_progression = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(56,56,56,0)").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape.setTransform(185.0099,9.9902,0.905,0.905);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(56,56,56,0.2)").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_1.setTransform(160.0099,9.9902,0.905,0.905);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(56,56,56,0.4)").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_2.setTransform(135.0099,9.9902,0.905,0.905);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(56,56,56,0.6)").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_3.setTransform(110.0099,9.9902,0.905,0.905);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(56,56,56,0.8)").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_4.setTransform(85.0099,9.9902,0.905,0.905);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#383838").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_5.setTransform(60.0099,9.9902,0.905,0.905);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EAEAEA").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_6.setTransform(35.0099,9.9902,0.905,0.905);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(234,234,234,0)").s().p("AhNBOQghggAAguQAAgtAhghQAggfAtAAQAuAAAgAfQAhAhAAAtQAAAughAgQggAhgugBQgtABggghg");
	this.shape_7.setTransform(10.0099,9.9902,0.905,0.905);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.aide_progression, rect = new cjs.Rectangle(0,0,195,20), [rect]);


(lib.VIDEO = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// video
	this.video = new lib.VIDEO_video();
	this.video.name = "video";

	this.timeline.addTween(cjs.Tween.get(this.video).wait(1));

	// Calque_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAEAEA").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,540);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.VIDEO, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.QUIZFINAL_telecharger = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AuDW+QgVAAgPgOQgOgPAAgUIAAn1QAAgUAOgPQAPgPAVAAIH0ABQAUAAAQAOQAOAPAAAVIAAH0QAAAUgOAPQgQAOgUAAgAtRVbIGQAAIAAmRImQAAgAAAT3QgUAAgPgPQgOgPAAgUIAAhkQAAgVAOgPQAPgPAUAAIAAABIOEAAQAUAAAQAOQAOAPAAAVIAABkQAAAUgOAPQgQAPgUAAgAuDMCQgVAAgPgOQgOgPAAgVIAAn0QAAgUAOgPQAPgPAVAAIH0AAQAUAAAQAPQAOAPAAAUIAAH0QAAAVgOAPQgQAOgUAAgAtRKeIGQAAIAAmQImQAAgAAAI7QgUAAgPgPQgOgPAAgUIAAhkQAAgVAOgPQAPgOAUAAIOEAAQAUAAAQAOQAOAPAAAVIAABkQAAAUgOAPQgQAPgUAAgAuDBHQgVAAgPgPQgOgPAAgUIAAnzQAAgVAOgPQAPgOAVAAIH0AAQAUAAAQAOQAOAPAAAVIAAHzQAAAUgOAPQgQAPgUAAgAtRgcIGQAAIAAmQImQAAgAAAiAQgUAAgPgPQgOgPAAgUIAAhkQAAgVAOgPQAPgOAUAAIOEAAQAUAAAQAOQAOAPAAAVIAABkQAAAUgOAPQgQAPgUAAgAuDp0QgVAAgPgPQgOgPAAgUIAAn0QAAgVAOgPQAPgOAVAAIHuAAICQjaQAOgWAbgBQAQAAAOAJQARAMADAUQAEAUgMASImPJYQgJALgLAGQgTAJgTgHQgUgGgJgTIhljJQgJgSAIgUQAGgUATgJQASgJAUAHQATAHAJATIA+B6ICMjSIl4AAIAAGQIGQAAIAAjDIBkiWIAAGLQAAAUgOAPQgQAPgUAAgAAAs8QgUAAgPgPQgOgPAAgUIAAhkQAAgVAOgPQAPgOAUAAIOEAAQAUAAAQAOQAOAPAAAVIAABkQAAAUgOAPQgQAPgUAAg");
	this.shape.setTransform(970.7992,71.8194,0.3158,0.3158);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Calque_1
	this.consigne = new cjs.Text("Télécharger vos réponses", "82px 'Raleway'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "right";
	this.consigne.lineHeight = 95;
	this.consigne.lineWidth = 1387;
	this.consigne.parent = this;
	this.consigne.setTransform(878.45,19.95);

	this.bt = new lib.bt_continue();
	this.bt.name = "bt";
	this.bt.setTransform(1139.3,70,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt, 0, 1, 2, false, new lib.bt_continue(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt},{t:this.consigne}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_telecharger, rect = new cjs.Rectangle(-510.8,0,1720.2,140), [rect]);


(lib.QUIZFINAL_part4_retenter = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.consigne = new cjs.Text("Retenter le quiz", "82px 'Raleway'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "right";
	this.consigne.lineHeight = 95;
	this.consigne.lineWidth = 1166;
	this.consigne.parent = this;
	this.consigne.setTransform(651.95,12.75);

	this.bt = new lib.bt_continue();
	this.bt.name = "bt";
	this.bt.setTransform(759.2,70,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt, 0, 1, 2, false, new lib.bt_continue(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt},{t:this.consigne}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part4_retenter, rect = new cjs.Rectangle(-516.3,0,1345.6,140), [rect]);


(lib.QUIZFINAL_part4_feedbackwrong = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.instance = new lib.coche_rouge("synched",0);
	this.instance.setTransform(37.9,37.25,2.0939,2.0939,0,0,0,18.1,17.8);

	this.champ = new cjs.Text("Votre score est insuffisant.", "bold 45px 'Raleway ExtraBold'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 52;
	this.champ.lineWidth = 872;
	this.champ.parent = this;
	this.champ.setTransform(102.8,14.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.champ},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part4_feedbackwrong, rect = new cjs.Rectangle(1.4,0,975.6,74.4), [rect]);


(lib.QUIZFINAL_part4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// telecharger
	this.telecharger = new lib.QUIZFINAL_telecharger();
	this.telecharger.name = "telecharger";
	this.telecharger.setTransform(1389.5,732.5,0.7289,0.7289,0,0,0,604.7,70);

	this.timeline.addTween(cjs.Tween.get(this.telecharger).wait(1));

	// feedbackwrong
	this.feedbackwrong = new lib.QUIZFINAL_part4_feedbackwrong();
	this.feedbackwrong.name = "feedbackwrong";
	this.feedbackwrong.setTransform(1530.15,584.95,1,1,0,0,0,352,37.1);

	this.timeline.addTween(cjs.Tween.get(this.feedbackwrong).wait(1));

	// retenter
	this.retenter = new lib.QUIZFINAL_part4_retenter();
	this.retenter.name = "retenter";
	this.retenter.setTransform(1528.05,867.95,0.7289,0.7289,0,0,0,414.7,70);

	this.timeline.addTween(cjs.Tween.get(this.retenter).wait(1));

	// champs
	this.champ_yourscore = new cjs.Text("Votre score :", "45px 'Raleway'", "#FFFFFF");
	this.champ_yourscore.name = "champ_yourscore";
	this.champ_yourscore.textAlign = "center";
	this.champ_yourscore.lineHeight = 52;
	this.champ_yourscore.lineWidth = 1430;
	this.champ_yourscore.parent = this;
	this.champ_yourscore.setTransform(1514.95,160.75);

	this.score = new cjs.Text("100%", "bold 96px 'Raleway ExtraBold'", "#FFFFFF");
	this.score.name = "score";
	this.score.textAlign = "center";
	this.score.lineHeight = 112;
	this.score.lineWidth = 329;
	this.score.parent = this;
	this.score.setTransform(1532,193.2,3.0971,3.0971);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.score},{t:this.champ_yourscore}]}).wait(1));

	// bg
	this.instance = new lib.prologue_bg_zoom();
	this.instance.setTransform(568,0,1.5,1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part4, rect = new cjs.Rectangle(568,0,1920,1080), [rect]);


(lib.QUIZFINAL_part3_valider = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#62AC34").s().p("Ah3A/IBsg/IhshEIAAhgIDvCRIAAAqIjvCOg");
	this.shape.setTransform(626.85,66.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#62AC34").s().p("Ah3A/IBtg/IhthEIAAhgIDvCRIAAAqIjvCOg");
	this.shape_1.setTransform(597.45,66.275);

	this.consigne = new cjs.Text("Cliquez ensuite ici pour valider votre module", "bold 82px 'Raleway ExtraBold'", "#59D541");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "right";
	this.consigne.lineHeight = 95;
	this.consigne.lineWidth = 1054;
	this.consigne.parent = this;
	this.consigne.setTransform(553.9382,1.4,0.6917,0.6917);

	this.bt = new lib.bt_submit_vert();
	this.bt.name = "bt";
	this.bt.setTransform(759.2,70,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt, 0, 1, 2, false, new lib.bt_submit_vert(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt},{t:this.consigne},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part3_valider, rect = new cjs.Rectangle(-176.2,0,1005.4,140), [rect]);


(lib.QUIZFINAL_part3_livret = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CED5E0").s().p("AmaAzIAAhlIM1AAIAABlg");
	this.shape.setTransform(592.5468,116.7706,0.7312,0.3167);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CED5E0").s().p("AmaA0IAAhnIM1AAIAABng");
	this.shape_1.setTransform(592.5468,109.0597,0.7312,0.3167);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ACB3BA").s().p("AkTDCIAAmCIInAAIAAGCg");
	this.shape_2.setTransform(613.8677,93.8756,0.3167,0.3167);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C9984").s().p("AkYDCIAAmCIIxAAIAAGCg");
	this.shape_3.setTransform(592.6511,93.8756,0.3167,0.3167);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F9B54C").s().p("AkXDCIAAmCIIvAAIAAGCg");
	this.shape_4.setTransform(571.3158,93.8756,0.3167,0.3167);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF7058").s().p("Au6DyIAAnkId1AAIAAHkg");
	this.shape_5.setTransform(592.6749,72.5324,0.3167,0.3167);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CED5E0").s().p("AoXA7IAAh1IQvAAIAAB1g");
	this.shape_6.setTransform(579.6757,54.0866,0.3167,0.3167);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CED5E0").s().p("AoXA7IAAh1IQvAAIAAB1g");
	this.shape_7.setTransform(579.6757,43.4783,0.3167,0.3167);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#ACB3BA").s().p("AmaGbIAAs1IM1M1g");
	this.shape_8.setTransform(620.5019,42.94,0.3167,0.3167);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#606060").ss(3).p("AHU4mI7dAAMAAAAxNMAoTAAAMAAAgkXg");
	this.shape_9.setTransform(592.6749,79.7998,0.3167,0.3167);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EAEAEA").s().p("A0JYnMAAAgxNIbcAAIM3M2MAAAAkXg");
	this.shape_10.setTransform(592.6749,79.7998,0.3167,0.3167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque_1
	this.consigne = new cjs.Text("Télécharger le livret de résumé", "bold 82px 'Raleway ExtraBold'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "right";
	this.consigne.lineHeight = 96;
	this.consigne.lineWidth = 883;
	this.consigne.parent = this;
	this.consigne.setTransform(495.2,-16.8);

	this.bt = new lib.bt_continue();
	this.bt.name = "bt";
	this.bt.setTransform(759.2,70,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt, 0, 1, 2, false, new lib.bt_continue(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt},{t:this.consigne}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part3_livret, rect = new cjs.Rectangle(-389.3,-18.8,1218.5,196.6), [rect]);


(lib.QUIZFINAL_part3_imprimer = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#415E72").s().p("AqfBYIAAivIU/AAIAACvg");
	this.shape.setTransform(591.1932,101.5497,0.3123,0.3123);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#415E72").s().p("AmrBYIAAivINXAAIAACvg");
	this.shape_1.setTransform(591.1854,115.9013,0.3123,0.3123);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#415E72").s().p("AmrBYIAAivINXAAIAACvg");
	this.shape_2.setTransform(591.1854,87.198,0.3123,0.3123);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DCE8EF").s().p("AnMREQjVhaikikQikikhajVQhdjcAAjxQAAjwBdjcQBajVCkikQCkikDVhaQDchdDwAAQDxAADcBdQDVBaCkCkQCkCkBaDVQBdDcAADwQAADxhdDcQhaDVikCkQikCkjVBaQjcBdjxAAQjwAAjchdg");
	this.shape_3.setTransform(591.1932,101.5419,0.3123,0.3123);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FCD577").s().p("AkIbcQhzhbgKgHQhGg0g4gSQg6gShZgBQgUgBiLAGQhhAEg5gIQhPgLgzglQhTg8g3jDQgmiHgGgSQgchUgjgwQgjgxhHg0QgNgJh3hPQiohwghhkQgTg6AOhOQAKg4AihbQAvh/AIgXQAahWAAg+QAAg9gahWQgIgXgvh/QgihbgKg4QgOhOATg6QAhhkCohwQB3hPANgJQBHg0AjgxQAjgwAchUQAGgSAmiHQA3jCBTg9QBTg8DJAIQCLAGAUgBQBZgBA6gTQA4gRBGg0QAJgGB0hcQCeh9BqAAQBrAACeB9IB9BiQBGA0A4ARQA6ATBZABQAUABCLgGQDJgIBTA8QBTA9A3DCIAsCZQAcBUAjAwQAjAxBHA0QANAJB3BPQCoBwAhBkQATA6gOBOQgKA4giBbQgvB/gIAXQgaBWAAA9QAAA+AaBWQAIAXAvB/QAiBbAKA4QAOBOgTA6QgUA+g6A3QgqAphRA2Qh3BPgNAJQhHA0gjAxQgjAwgcBUIgsCZQg3DDhTA8QgzAlhPALQg5AIhhgEQiLgGgUABQhZABg6ASQg4AShGA0Ih9BiQieB9hrAAQhqAAieh9g");
	this.shape_4.setTransform(591.1932,101.5497,0.3123,0.3123);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E25749").s().p("AoaATIGlkRIJGg+IBKEIQgdAugnAaQgyAmhQAKQg4AJhhgEIiggGQhXABg6AUQhEAVhlBQQiRBxgXAPg");
	this.shape_5.setTransform(611.0029,157.301,0.3123,0.3123);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E25749").s().p("AEfC9QhlhQhEgVQg6gUhYgBIifAGQhhAEg4gJQhQgKgzgmQgmgagcguIBJkIIJGA+IGkERIhTEqQgXgPiRhxg");
	this.shape_6.setTransform(571.3836,157.301,0.3123,0.3123);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF6F52").s().p("ArEokIGkkSIJGg+IGfXOIpYi2ImhHRg");
	this.shape_7.setTransform(616.336,175.0414,0.3123,0.3123);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF6F52").s().p("AhtGkIpXC2IGe3OIJGA+IGlESImQWZg");
	this.shape_8.setTransform(566.0583,175.0414,0.3123,0.3123);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Calque_1
	this.consigne = new cjs.Text("Télécharger votre attestation de réussite", "bold 82px 'Raleway ExtraBold'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "right";
	this.consigne.lineHeight = 91;
	this.consigne.lineWidth = 992;
	this.consigne.parent = this;
	this.consigne.setTransform(491.55,11.9);

	this.bt = new lib.bt_continue();
	this.bt.name = "bt";
	this.bt.setTransform(759.2,112.8,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt, 0, 1, 2, false, new lib.bt_continue(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt},{t:this.consigne}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part3_imprimer, rect = new cjs.Rectangle(-502.7,9.9,1332,205.9), [rect]);


(lib.QUIZFINAL_part3_feedbackright = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.instance = new lib.coche_verte("synched",0);
	this.instance.setTransform(37.9,37.25,2.0939,2.0939,0,0,0,18.1,17.8);

	this.champ = new cjs.Text("Félicitations !", "bold 45px 'Raleway ExtraBold'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 52;
	this.champ.lineWidth = 568;
	this.champ.parent = this;
	this.champ.setTransform(102.8,14.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.champ},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part3_feedbackright, rect = new cjs.Rectangle(0,0.2,672.7,70.9), [rect]);


(lib.intro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// personnalisable
	this.personnalisable = new lib.personnalisable();
	this.personnalisable.name = "personnalisable";
	this.personnalisable.setTransform(1812.9,107.1,1,1,0,0,0,-107.1,107.1);

	this.timeline.addTween(cjs.Tween.get(this.personnalisable).wait(1));

	// bandeau
	this.bandeau = new lib.intro_demo_bandeau();
	this.bandeau.name = "bandeau";
	this.bandeau.setTransform(960,50,1,1,0,0,0,960,50);

	this.timeline.addTween(cjs.Tween.get(this.bandeau).wait(1));

	// signature
	this.signature = new lib.intro_signatureaccordia();
	this.signature.name = "signature";
	this.signature.setTransform(961.4,854.9,1,1,0,0,0,9.9,0);

	this.timeline.addTween(cjs.Tween.get(this.signature).wait(1));

	// version
	this.version = new cjs.Text("vx.xx", "20px 'Raleway'", "#A4A4A4");
	this.version.name = "version";
	this.version.textAlign = "right";
	this.version.lineHeight = 26;
	this.version.lineWidth = 340;
	this.version.parent = this;
	this.version.setTransform(1900.1,1041.95);

	this.timeline.addTween(cjs.Tween.get(this.version).wait(1));

	// titremodule
	this.titremodule = new lib.intro_titremodule();
	this.titremodule.name = "titremodule";
	this.titremodule.setTransform(997.75,610.7,1,1,0,0,0,498.9,49);

	this.timeline.addTween(cjs.Tween.get(this.titremodule).wait(1));

	// presente
	this.presente = new lib.intro_presente();
	this.presente.name = "presente";
	this.presente.setTransform(961.2,442.45,1,1,0,0,0,131.6,31.4);

	this.timeline.addTween(cjs.Tween.get(this.presente).wait(1));

	// logoediversite
	this.logoediversite = new lib.intro_logoediversite();
	this.logoediversite.name = "logoediversite";
	this.logoediversite.setTransform(946.8,606.6,1,1,0,0,0,301.9,79.5);
	this.logoediversite.cache(-2,-2,608,163);

	this.timeline.addTween(cjs.Tween.get(this.logoediversite).wait(1));

	// logoclient
	this.logoclient = new lib.intro_logoclient();
	this.logoclient.name = "logoclient";
	this.logoclient.setTransform(961.45,261.8,0.7338,0.7338,0,0,0,750,175);

	this.timeline.addTween(cjs.Tween.get(this.logoclient).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAEAEA").s().p("EiXlBWRMAAAisiMEvLAAAMAAACsig");
	this.shape.setTransform(959.9946,540.0069,0.9895,0.978);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// loadtext
	this.text = new cjs.Text("loadtext", "bold 20px 'Raleway ExtraBold'", "#A4A4A4");
	this.text.textAlign = "right";
	this.text.lineHeight = 26;
	this.text.lineWidth = 340;
	this.text.parent = this;
	this.text.setTransform(1900.1,996);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro, rect = new cjs.Rectangle(-1.1,0,1922,1080), [rect]);


(lib.CONTENU_content = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.bg = new lib.bt_zone();
	this.bg.name = "bg";
	this.bg.setTransform(-0.05,-0.05,1,1,0,0,0,-73.2,-73.2);
	new cjs.ButtonHelper(this.bg, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU_content, rect = new cjs.Rectangle(0,0,146.4,146.4), [rect]);


(lib.CLICKPICTOS_textes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {left:0,right:10};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(21));

	// content
	this.titre = new cjs.Text("lorem ipsum\nlorem ipsum", "bold 35px 'Raleway ExtraBold'", "#FFFFFF");
	this.titre.name = "titre";
	this.titre.lineHeight = 37;
	this.titre.lineWidth = 896;
	this.titre.parent = this;
	this.titre.setTransform(22,12);

	this.trait = new lib.CLICKPICTOS_textes_trait();
	this.trait.name = "trait";

	this.texte = new cjs.Text("lorem ipsum", "30px 'Raleway'", "#FFFFFF");
	this.texte.name = "texte";
	this.texte.lineHeight = 33;
	this.texte.lineWidth = 896;
	this.texte.parent = this;
	this.texte.setTransform(22,96.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.texte,p:{x:22}},{t:this.trait,p:{x:0}},{t:this.titre,p:{x:22}}]}).to({state:[{t:this.texte,p:{x:-758}},{t:this.trait,p:{x:150}},{t:this.titre,p:{x:-758}}]},10).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-0.5,-0.5,920.5,133.9);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-760,-0.5,912.8,133.9), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.CLASSEMENT_wrong = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.instance = new lib.coche_rouge("synched",0);
	this.instance.setTransform(3.85,0.4,7.5701,7.5701,0,0,0,18.9,17.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT_wrong, rect = new cjs.Rectangle(-134.3,-134.3,268.8,268.8), [rect]);


(lib.CLASSEMENT_result_coche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"right":0,wrong:8};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(16));

	// Calque_1
	this.instance = new lib.coche_verte("synched",0);
	this.instance.setTransform(0,0.8,1,1,0,0,0,22.8,17);

	this.instance_1 = new lib.coche_rouge("synched",0);
	this.instance_1.setTransform(0,0.05,1,1,0,0,0,18.4,17.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-22.8,-16.1,45.6,33.9);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-17.7,-17.7,35.5,35.5), rect, rect, rect, rect, rect, rect, rect];


(lib.CLASSEMENT_result = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// coche
	this.coche = new lib.CLASSEMENT_result_coche();
	this.coche.name = "coche";
	this.coche.setTransform(364.5,8);

	this.timeline.addTween(cjs.Tween.get(this.coche).wait(1));

	// Calque_1
	this.champ = new cjs.Text("lorem ipsum", "bold 25px 'Raleway ExtraBold'", "#383838");
	this.champ.name = "champ";
	this.champ.textAlign = "center";
	this.champ.lineHeight = 31;
	this.champ.lineWidth = 738;
	this.champ.parent = this;
	this.champ.setTransform(2,10.65);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAEAEA").s().p("Eg4yADcQg+AAgsgsQgsgsAAg+IAAiLQAAg+AsgsQAsgsA+AAMBxlAAAQA+AAAsAsQAsAsAAA+IAACLQAAA+gsAsQgsAsg+AAg");
	this.shape.setTransform(0.025,22);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.champ}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT_result, rect = new cjs.Rectangle(-378.4,-8.1,765.8,52.1), [rect]);


(lib.CLASSEMENT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// personnalisable
	this.personnalisable = new lib.personnalisable();
	this.personnalisable.name = "personnalisable";
	this.personnalisable.setTransform(1812.9,107.1,1,1,0,0,0,-107.1,107.1);

	this.timeline.addTween(cjs.Tween.get(this.personnalisable).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960,540);

	// Calque_2
	this.wrong = new lib.CLASSEMENT_wrong();
	this.wrong.name = "wrong";
	this.wrong.setTransform(960.25,497.6);

	var maskedShapeInstanceList = [this.wrong];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.wrong).wait(1));

	// bt_continue
	this.bt_continue = new lib.bt_continue();
	this.bt_continue.name = "bt_continue";
	this.bt_continue.setTransform(962.25,852.2,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt_continue, 0, 1, 2, false, new lib.bt_continue(), 3);

	var maskedShapeInstanceList = [this.bt_continue];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.bt_continue).wait(1));

	// fleches
	this.fleche_left = new lib.CLASSEMENT_fleche();
	this.fleche_left.name = "fleche_left";
	this.fleche_left.setTransform(643,755.65,1,1,0,0,180,79.4,79.5);
	this.fleche_left.alpha = 0.25;

	this.fleche_right = new lib.CLASSEMENT_fleche();
	this.fleche_right.name = "fleche_right";
	this.fleche_right.setTransform(1280,755.65,1,1,0,0,0,79.4,79.5);
	this.fleche_right.alpha = 0.25;

	var maskedShapeInstanceList = [this.fleche_left,this.fleche_right];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.fleche_right},{t:this.fleche_left}]}).wait(1));

	// zones
	this.zone_right = new lib.CLASSEMENT_zones();
	this.zone_right.name = "zone_right";
	this.zone_right.setTransform(1304.3,174.35);
	this.zone_right.alpha = 0;

	this.zone_left = new lib.CLASSEMENT_zones();
	this.zone_left.name = "zone_left";
	this.zone_left.setTransform(213.95,187.4);
	this.zone_left.alpha = 0;

	var maskedShapeInstanceList = [this.zone_right,this.zone_left];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.zone_left},{t:this.zone_right}]}).wait(1));

	// trait
	this.trait = new lib.CLASSEMENT_trait();
	this.trait.name = "trait";
	this.trait.setTransform(958.35,136.45);

	var maskedShapeInstanceList = [this.trait];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.trait).wait(1));

	// titres
	this.titre_right = new cjs.Text("Lorem ipsum dolor sit amet", "40px 'Raleway'", "#FFFFFF");
	this.titre_right.name = "titre_right";
	this.titre_right.textAlign = "center";
	this.titre_right.lineHeight = 49;
	this.titre_right.lineWidth = 850;
	this.titre_right.parent = this;
	this.titre_right.setTransform(1436.3,138.45);

	this.titre_left = new cjs.Text("Lorem ipsum dolor sit amet", "40px 'Raleway'", "#FFFFFF");
	this.titre_left.name = "titre_left";
	this.titre_left.textAlign = "center";
	this.titre_left.lineHeight = 49;
	this.titre_left.lineWidth = 850;
	this.titre_left.parent = this;
	this.titre_left.setTransform(486.75,138.45);

	this.titre = new cjs.Text("Lorem ipsum dolor sit amet", "bold 40px 'Raleway ExtraBold'", "#FFFFFF");
	this.titre.name = "titre";
	this.titre.lineHeight = 49;
	this.titre.lineWidth = 1616;
	this.titre.parent = this;
	this.titre.setTransform(152,87.5);

	var maskedShapeInstanceList = [this.titre_right,this.titre_left,this.titre];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.titre},{t:this.titre_left},{t:this.titre_right}]}).wait(1));

	// consigne
	this.consigne = new cjs.Text("lorem ipsum", "30px 'Raleway'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.lineHeight = 33;
	this.consigne.lineWidth = 1616;
	this.consigne.parent = this;
	this.consigne.setTransform(152,48.3);

	var maskedShapeInstanceList = [this.consigne];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.consigne).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,540);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLASSEMENT, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.paul_yeux = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.paul_yeuxouverts();

	this.instance_1 = new lib.paul_yeuxfermes();
	this.instance_1.setTransform(1.25,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},65).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance_1}]},146).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance_1}]},38).to({state:[{t:this.instance}]},2).wait(41));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-23.5,-4.6,47.2,9.2);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-23.5,-1.8,49.6,3.9), rect, rect, rect, rect, rect=new cjs.Rectangle(-23.5,-4.6,47.2,9.2), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-23.5,-1.8,49.6,3.9), rect, rect, rect=new cjs.Rectangle(-23.5,-4.6,47.2,9.2), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-23.5,-1.8,49.6,3.9), rect, rect=new cjs.Rectangle(-23.5,-4.6,47.2,9.2), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.paul_sourcils = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.paul_sourcildroit();
	this.instance.setTransform(22.65,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(288).to({y:-5.25},0).wait(190));

	// Layer 2
	this.instance_1 = new lib.paul_sourcilgauche();
	this.instance_1.setTransform(-28.2,0.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(288).to({y:-4.65},0).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-39.7,-9.5,79.5,19.1);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-39.7,-14.7,79.5,19.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.paul_bouche = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer 3
	this.instance = new lib.paul_bouche1();

	this.instance_1 = new lib.paul_bouche2();
	this.instance_1.setTransform(-2.1,2.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-25.1,-11.8,50.2,23.7);
p.frameBounds = [rect, new cjs.Rectangle(-29.2,-15.1,54.4,34.8), new cjs.Rectangle(-25.1,-11.8,50.2,23.7)];


(lib.bouche_nina_mouthTalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* Arrêter la lecture à partir de cette image
		Le scénario arrête/met en pause la lecture à partir de cette image lorsque vous insérez ce code.
		Vous pouvez également utiliser ce code pour arrêter/mettre en pause le scénario des clips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// sourit_ol
	this.instance = new lib.bouche1_nina();
	this.instance.setTransform(56.85,35.35,1,1,0,0,0,55.5,16.6);

	this.instance_1 = new lib.bouche3_nina();
	this.instance_1.setTransform(55.2,54.1,1,1,0,0,0,51.2,35.4);

	this.instance_2 = new lib.bouche4_nina();
	this.instance_2.setTransform(56.8,48,1,1,0,0,0,56.9,28.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(1.4,18.8,26.4,10.5);
p.frameBounds = [rect, new cjs.Rectangle(4,18.7,14.9,13.1), new cjs.Rectangle(0.5,19.6,25.1,12), new cjs.Rectangle(1.4,18.8,26.4,10.5)];


(lib.marcillac_yeux = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sourcil1
	this.instance = new lib.marcillac_sourcil1();
	this.instance.setTransform(594.75,458.35,1,1,0,0,0,39,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(51).to({y:449.75},0).wait(45).to({y:471.25},0).wait(3));

	// sourcil2
	this.instance_1 = new lib.marcillac_sourcil2();
	this.instance_1.setTransform(704.8,467.3,1,1,0,0,0,48.5,26);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(51).to({y:458.7},0).wait(45).to({y:480.2},0).wait(3));

	// oeil2
	this.instance_2 = new lib.marcillac_oeil1();
	this.instance_2.setTransform(703.8,527.25,1,1,0,0,0,9.5,13);

	this.instance_3 = new lib.marcillac_oeil2();
	this.instance_3.setTransform(696.05,527.35,1,1,0,0,0,12,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},96).wait(3));

	// oeil1
	this.instance_4 = new lib.marcillac_oeil1();
	this.instance_4.setTransform(604.5,527.25,1,1,0,0,0,9.5,13);

	this.instance_5 = new lib.marcillac_oeil2();
	this.instance_5.setTransform(604.5,527.35,1,1,0,0,0,12,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},96).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(555.8,437.1,196.5,100.9);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(555.8,428.5,196.5,109.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(555.8,450,196.5,81), rect, rect];


(lib.marcillac_mouthTalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Calque 1
	this.instance = new lib.marcillac_sourit();
	this.instance.setTransform(49.4,39.5,1,1,0,0,0,66.2,39.5);

	this.instance_1 = new lib.marcillac_rit();
	this.instance_1.setTransform(53.3,24.45,1,1,0,0,0,66,25.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14.8,1.2,131,75.9);
p.frameBounds = [rect, new cjs.Rectangle(-12.8,-1.3,131.2,90.8), new cjs.Rectangle(-14.8,1.2,131,75.9)];


(lib.bouche5_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque 1
	this.instance = new lib.bouche5ai("synched",0);
	this.instance.setTransform(65.6,36.65,1,1,0,0,0,69,42);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bouche5_gd, rect = new cjs.Rectangle(0,0,127.5,65.3), [rect]);


(lib.bouche_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* Arrêter la lecture à partir de cette image
		Le scénario arrête/met en pause la lecture à partir de cette image lorsque vous insérez ce code.
		Vous pouvez également utiliser ce code pour arrêter/mettre en pause le scénario des clips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// bouche1_gd
	this.bouche4_gd = new lib.bouche4_gd();
	this.bouche4_gd.name = "bouche4_gd";
	this.bouche4_gd.setTransform(16,32,0.2559,0.2559,0,0,0,64.7,18.6);

	this.bouche5_gd = new lib.bouche5_gd();
	this.bouche5_gd.name = "bouche5_gd";
	this.bouche5_gd.setTransform(15.95,32.05,0.2559,0.2559,0,0,0,63.5,32.9);

	this.instance = new lib.bouche3_gd();
	this.instance.setTransform(14.9,34.65,0.2451,0.2451,0,0,0,51,36.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bouche4_gd}]}).to({state:[{t:this.bouche5_gd}]},1).to({state:[{t:this.bouche4_gd}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-0.5,27.3,33.1,9.5);
p.frameBounds = [rect, new cjs.Rectangle(-0.3,23.6,32.7,16.8), new cjs.Rectangle(-0.5,27.3,33.1,9.5), new cjs.Rectangle(2,25.5,25.7,18.3)];


(lib.colette_yeux = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.instance = new lib.colette_yeuxouverts();
	this.instance.setTransform(87.05,30.4);
	this.instance.cache(-89,-32,178,65);

	this.instance_1 = new lib.colette_yeuxfermes();
	this.instance_1.setTransform(87.05,30.4);
	this.instance_1.cache(-91,-19,182,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},133).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance}]},4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,174.1,60.8);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-1.9,12.9,178,35.2), rect, rect, rect, rect=new cjs.Rectangle(0,0,174.1,60.8), rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-1.9,12.9,178,35.2), rect, rect, rect, rect=new cjs.Rectangle(0,0,174.1,60.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.colette_mouthTalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Calque_1
	this.instance = new lib.colette_bouche1();
	this.instance.setTransform(49.4,20.65);

	this.instance_1 = new lib.colette_bouche2();
	this.instance_1.setTransform(46,18.85);

	this.instance_2 = new lib.colette_bouche4();
	this.instance_2.setTransform(25.35,22.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,5.4,98.8,30.5);
p.frameBounds = [rect, new cjs.Rectangle(0,0,92.1,37.8), new cjs.Rectangle(-0.1,3.5,51,38.3), new cjs.Rectangle(0,5.4,98.8,30.5)];


(lib.mc_nav_progression = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// prog_clips
	this.prog16 = new lib.mc_nav_preogression_prog();
	this.prog16.name = "prog16";
	this.prog16.setTransform(375,0);

	this.prog15 = new lib.mc_nav_preogression_prog();
	this.prog15.name = "prog15";
	this.prog15.setTransform(350,0);

	this.prog14 = new lib.mc_nav_preogression_prog();
	this.prog14.name = "prog14";
	this.prog14.setTransform(325,0);

	this.prog13 = new lib.mc_nav_preogression_prog();
	this.prog13.name = "prog13";
	this.prog13.setTransform(300,0);

	this.prog12 = new lib.mc_nav_preogression_prog();
	this.prog12.name = "prog12";
	this.prog12.setTransform(275,0);

	this.prog11 = new lib.mc_nav_preogression_prog();
	this.prog11.name = "prog11";
	this.prog11.setTransform(250,0);

	this.prog10 = new lib.mc_nav_preogression_prog();
	this.prog10.name = "prog10";
	this.prog10.setTransform(225,0);

	this.prog9 = new lib.mc_nav_preogression_prog();
	this.prog9.name = "prog9";
	this.prog9.setTransform(200,0);

	this.prog8 = new lib.mc_nav_preogression_prog();
	this.prog8.name = "prog8";
	this.prog8.setTransform(175,0);

	this.prog7 = new lib.mc_nav_preogression_prog();
	this.prog7.name = "prog7";
	this.prog7.setTransform(150,0);

	this.prog6 = new lib.mc_nav_preogression_prog();
	this.prog6.name = "prog6";
	this.prog6.setTransform(125,0);

	this.prog5 = new lib.mc_nav_preogression_prog();
	this.prog5.name = "prog5";
	this.prog5.setTransform(100,0);

	this.prog4 = new lib.mc_nav_preogression_prog();
	this.prog4.name = "prog4";
	this.prog4.setTransform(75,0);

	this.prog3 = new lib.mc_nav_preogression_prog();
	this.prog3.name = "prog3";
	this.prog3.setTransform(50,0);

	this.prog2 = new lib.mc_nav_preogression_prog();
	this.prog2.name = "prog2";
	this.prog2.setTransform(25,0);

	this.prog1 = new lib.mc_nav_preogression_prog();
	this.prog1.name = "prog1";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.prog1},{t:this.prog2},{t:this.prog3},{t:this.prog4},{t:this.prog5},{t:this.prog6},{t:this.prog7},{t:this.prog8},{t:this.prog9},{t:this.prog10},{t:this.prog11},{t:this.prog12},{t:this.prog13},{t:this.prog14},{t:this.prog15},{t:this.prog16}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_nav_progression, rect = new cjs.Rectangle(0,0,395,20), [rect]);


(lib.mc_nav_menu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.item16 = new lib.mc_nav_menu_item();
	this.item16.name = "item16";
	this.item16.setTransform(998.75,925.45,1,1,0,0,0,858.5,23.7);

	this.item15 = new lib.mc_nav_menu_item();
	this.item15.name = "item15";
	this.item15.setTransform(998.75,873.85,1,1,0,0,0,858.5,23.7);

	this.item14 = new lib.mc_nav_menu_item();
	this.item14.name = "item14";
	this.item14.setTransform(998.75,822.25,1,1,0,0,0,858.5,23.7);

	this.item13 = new lib.mc_nav_menu_item();
	this.item13.name = "item13";
	this.item13.setTransform(998.75,770.65,1,1,0,0,0,858.5,23.7);

	this.item12 = new lib.mc_nav_menu_item();
	this.item12.name = "item12";
	this.item12.setTransform(998.75,719.05,1,1,0,0,0,858.5,23.7);

	this.item11 = new lib.mc_nav_menu_item();
	this.item11.name = "item11";
	this.item11.setTransform(998.75,667.45,1,1,0,0,0,858.5,23.7);

	this.item10 = new lib.mc_nav_menu_item();
	this.item10.name = "item10";
	this.item10.setTransform(998.75,615.85,1,1,0,0,0,858.5,23.7);

	this.item9 = new lib.mc_nav_menu_item();
	this.item9.name = "item9";
	this.item9.setTransform(998.75,564.25,1,1,0,0,0,858.5,23.7);

	this.item8 = new lib.mc_nav_menu_item();
	this.item8.name = "item8";
	this.item8.setTransform(998.75,512.65,1,1,0,0,0,858.5,23.7);

	this.item7 = new lib.mc_nav_menu_item();
	this.item7.name = "item7";
	this.item7.setTransform(998.75,461.05,1,1,0,0,0,858.5,23.7);

	this.item6 = new lib.mc_nav_menu_item();
	this.item6.name = "item6";
	this.item6.setTransform(998.75,409.45,1,1,0,0,0,858.5,23.7);

	this.item5 = new lib.mc_nav_menu_item();
	this.item5.name = "item5";
	this.item5.setTransform(998.75,357.85,1,1,0,0,0,858.5,23.7);

	this.item4 = new lib.mc_nav_menu_item();
	this.item4.name = "item4";
	this.item4.setTransform(998.75,306.25,1,1,0,0,0,858.5,23.7);

	this.item3 = new lib.mc_nav_menu_item();
	this.item3.name = "item3";
	this.item3.setTransform(998.75,254.65,1,1,0,0,0,858.5,23.7);

	this.item2 = new lib.mc_nav_menu_item();
	this.item2.name = "item2";
	this.item2.setTransform(998.75,203.05,1,1,0,0,0,858.5,23.7);

	this.item1 = new lib.mc_nav_menu_item();
	this.item1.name = "item1";
	this.item1.setTransform(998.75,151.45,1,1,0,0,0,858.5,23.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag0BxQgYgKgQgQQgQgRgJgWQgIgWAAgXQAAgZAIgXQAJgXAQgRQAQgRAYgKQAXgKAeAAQAeAAAXAKQAXAKARARQAQARAIAWQAIAWAAAYIAAAMIgBAKIiuAAQACAYAPANQAQAMATAAQAQAAAOgIQAPgHAFgNIA9ARQgOAcgdARQgeASgoAAQgdAAgYgKgAAygVQgCgXgOgNQgOgNgUAAQgVAAgNANQgOAOgCAWIBkAAIAAAAg");
	this.shape.setTransform(409.725,84.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhKB4IAAjrIBCAAIAAAwQALgZATgNQAUgOAVAAIAHAAIAFAAIAABBQgaABgVAIQgWAIgIARIAACMg");
	this.shape_1.setTransform(388.025,84.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgjCkIAAjrIBHAAIAADrgAgjhiIAAhBIBHAAIAABBg");
	this.shape_2.setTransform(372.025,79.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhHB1QgPgGgKgKQgLgKgGgNQgHgOAAgRQAAgRAIgOQAHgPANgJQAOgLASgFQATgGAWAAIAcACQAOADALAFIAAgLQAAgpgvAAQgTAAgSAGQgRAHgTANIgWgtQAYgPAZgIQAZgIAcAAQA1AAAdAaQAdAZAAAxIAAA7QAAALAEAEQADAFAJABIAAA8IgRADIgOABQgVAAgKgIQgKgIgDgOIgBgLQgQAUgWALQgVALgYAAQgRAAgQgGgAgnASQgNAJAAAOQAAANAKAJQAKAIAPAAQAMAAAKgEQALgEAHgHQALgIAAgJIAAgWIgVgGIgTgCQgUAAgNAJg");
	this.shape_3.setTransform(352.675,84.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABzB4IAAiDQAAgYgJgKQgJgLgNAAQgHAAgIAEQgHADgGAFIgLANIgJARIAACGIhHAAIAAiDQAAgYgIgKQgJgLgOAAQgOAAgOAMQgNALgHATIAACGIhHAAIAAjqIBAAAIAAAnQANgWAWgLQAXgMAeAAQAOAAAMAFQAJADAJAHQAHAFAFAJQAGAIABAJQAOgVAWgMQAWgNAdAAQAWAAAOAJQAOAIAHAOQAIANACAQIACAeIAACWg");
	this.shape_4.setTransform(318.7,84.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABzB4IAAiDQAAgYgJgKQgIgLgNAAQgIAAgIAEQgHADgGAFIgMANIgIARIAACGIhHAAIAAiDQAAgYgJgKQgIgLgNAAQgPAAgOAMQgNALgHATIAACGIhHAAIAAjqIBAAAIAAAnQANgWAXgLQAVgMAfAAQAOAAALAFQAKADAJAHQAIAFAFAJQAEAIADAJQANgVAWgMQAWgNAcAAQAXAAAOAJQAOAIAHAOQAIANACAQIACAeIAACWg");
	this.shape_5.setTransform(276.65,84.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ag1BxQgXgKgRgRQgQgRgIgWQgIgWAAgZQAAgXAIgWQAIgXAQgQQARgRAXgKQAYgLAdAAQAeAAAXALQAYAKAQARQAQAQAJAXQAIAWAAAXQAAAZgIAWQgIAWgQARQgRARgXAKQgYAKgeAAQgdAAgYgKgAgUg4QgKAFgGAIQgIAIgEALQgEAMAAAMQAAAcAPARQAPARAWAAQALAAAKgEQAJgFAHgIQAHgIAEgMQAEgLAAgOQAAgbgPgQQgPgRgWAAQgKAAgKAEg");
	this.shape_6.setTransform(241.825,84.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgaCgIgkgIIgigMQgRgHgOgKIAghAIANAIIAXANIAiALQARAFASAAQAnAAAAgYQAAgJgGgFQgGgGgKgFIgZgJIgdgJQgXgHgQgHQgQgIgLgKQgKgKgFgOQgFgNgBgSQAAgZAKgUQAJgTAQgNQARgNAVgHQAVgHAXAAQARAAARADIAeAIIAcAMIAXAMIggA9IgJgGIgVgLIgagJQgOgEgPAAQgmAAAAAaQgBAIAFAGQAEAFAIAEIAVAIIAdAJIApANQASAIANAKQANALAHAPQAHAQAAAWQAAAbgKATQgKATgRALQgQALgWAGQgWAFgWAAg");
	this.shape_7.setTransform(214.05,80.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#383838").s().p("EiVzBU9MAAAip4MErnAAAMAAACp4g");
	this.shape_8.setTransform(960.019,539.9806,1.0013,0.9933);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.item1},{t:this.item2},{t:this.item3},{t:this.item4},{t:this.item5},{t:this.item6},{t:this.item7},{t:this.item8},{t:this.item9},{t:this.item10},{t:this.item11},{t:this.item12},{t:this.item13},{t:this.item14},{t:this.item15},{t:this.item16}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_nav_menu, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.mc_nav = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bt_menu_on
	this.bt_menu_on = new lib.bt_menu_on();
	this.bt_menu_on.name = "bt_menu_on";
	this.bt_menu_on.setTransform(30.6,-932.15);
	new cjs.ButtonHelper(this.bt_menu_on, 0, 1, 2, false, new lib.bt_menu_on(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bt_menu_on).wait(1));

	// bt_menu_off
	this.bt_menu_off = new lib.bt_menu_off();
	this.bt_menu_off.name = "bt_menu_off";
	this.bt_menu_off.setTransform(30.6,-932.15);
	new cjs.ButtonHelper(this.bt_menu_off, 0, 1, 2, false, new lib.bt_menu_off(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bt_menu_off).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960.0115,-420.0194);

	// menu
	this.menu = new lib.mc_nav_menu();
	this.menu.name = "menu";
	this.menu.setTransform(960,-420,1,1,0,0,0,960,540);

	var maskedShapeInstanceList = [this.menu];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.menu).wait(1));

	// loadtext
	this.text = new cjs.Text("loadtext", "20px 'Quicksand Medium'", "#A4A4A4");
	this.text.textAlign = "right";
	this.text.lineHeight = 32;
	this.text.lineWidth = 340;
	this.text.parent = this;
	this.text.setTransform(1893.35,188.65);

	this.text_1 = new cjs.Text("loadtext", "bold 20px 'Raleway ExtraBold'", "#A4A4A4");
	this.text_1.textAlign = "right";
	this.text_1.lineHeight = 26;
	this.text_1.lineWidth = 340;
	this.text_1.parent = this;
	this.text_1.setTransform(1893.35,152.25);

	var maskedShapeInstanceList = [this.text,this.text_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1},{t:this.text}]}).wait(1));

	// progression
	this.progression = new lib.mc_nav_progression();
	this.progression.name = "progression";
	this.progression.setTransform(480,85);

	this.timeline.addTween(cjs.Tween.get(this.progression).wait(1));

	// champ titre
	this.titre = new cjs.Text("lorem ipsum\nlorem ipsum", "35px 'Raleway'", "#FFFFFF");
	this.titre.name = "titre";
	this.titre.textAlign = "center";
	this.titre.lineHeight = 39;
	this.titre.lineWidth = 726;
	this.titre.parent = this;
	this.titre.setTransform(958.35,2);

	this.timeline.addTween(cjs.Tween.get(this.titre).wait(1));

	// infobulles
	this.infobulle_restart = new lib.infobulle_restart();
	this.infobulle_restart.name = "infobulle_restart";
	this.infobulle_restart.setTransform(1510.15,-33,1,1,0,0,0,124.6,32.4);

	this.infobulle_menu = new lib.infobulle_menu();
	this.infobulle_menu.name = "infobulle_menu";
	this.infobulle_menu.setTransform(128.1,-778.7,1,1,0,0,0,88.1,32.4);

	this.infobulle_pause = new lib.infobulle_pause();
	this.infobulle_pause.name = "infobulle_pause";
	this.infobulle_pause.setTransform(1625.8,-33,1,1,0,0,0,57.4,32.4);

	this.infobulle_next = new lib.infobulle_next();
	this.infobulle_next.name = "infobulle_next";
	this.infobulle_next.setTransform(1739.6,-33,1,1,0,0,0,104.1,32.4);

	this.infobulle_fullscreen = new lib.infobulle_fullscreen();
	this.infobulle_fullscreen.name = "infobulle_fullscreen";
	this.infobulle_fullscreen.setTransform(1802.25,-33,1,1,0,0,0,93.1,32.4);

	this.infobulle_subtitles = new lib.infobulle_subtitles();
	this.infobulle_subtitles.name = "infobulle_subtitles";
	this.infobulle_subtitles.setTransform(180.6,-33,1,1,0,0,0,94.1,32.4);

	this.infobulle_home = new lib.infobulle_home();
	this.infobulle_home.name = "infobulle_home";
	this.infobulle_home.setTransform(118.7,-33,1,1,0,0,0,88.1,32.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.infobulle_home},{t:this.infobulle_subtitles},{t:this.infobulle_fullscreen},{t:this.infobulle_next},{t:this.infobulle_pause},{t:this.infobulle_menu},{t:this.infobulle_restart}]}).wait(1));

	// bt_home
	this.bt_home = new lib.bt_home();
	this.bt_home.name = "bt_home";
	this.bt_home.setTransform(24.9,15);
	new cjs.ButtonHelper(this.bt_home, 0, 1, 2, false, new lib.bt_home(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bt_home).wait(1));

	// bt_subtitles
	this.bt_subtitles = new lib.bt_subtitles();
	this.bt_subtitles.name = "bt_subtitles";
	this.bt_subtitles.setTransform(185.25,60,1,1,0,0,0,45,45);

	this.timeline.addTween(cjs.Tween.get(this.bt_subtitles).wait(1));

	// bt_restart
	this.bt_restart = new lib.bt_restart();
	this.bt_restart.name = "bt_restart";
	this.bt_restart.setTransform(1465.05,15);
	new cjs.ButtonHelper(this.bt_restart, 0, 1, 2, false, new lib.bt_restart(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bt_restart).wait(1));

	// bt_pause
	this.bt_fullscreen = new lib.bt_fullscreen();
	this.bt_fullscreen.name = "bt_fullscreen";
	this.bt_fullscreen.setTransform(1809.1,15);
	new cjs.ButtonHelper(this.bt_fullscreen, 0, 1, 2, false, new lib.bt_fullscreen(), 3);

	this.bt_pause = new lib.bt_pause();
	this.bt_pause.name = "bt_pause";
	this.bt_pause.setTransform(1580.3,15);
	new cjs.ButtonHelper(this.bt_pause, 0, 1, 2, false, new lib.bt_pause(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt_pause},{t:this.bt_fullscreen}]}).wait(1));

	// bt_next
	this.bt_next = new lib.bt_next();
	this.bt_next.name = "bt_next";
	this.bt_next.setTransform(1745.55,65,1,1,0,0,0,50,50);

	this.timeline.addTween(cjs.Tween.get(this.bt_next).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(66,66,66,0.698)").s().p("EiOxAItIAAxZMEdjAAAIAARZg");
	this.shape.setTransform(960.0103,60.0086,1.0506,1.0782);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_nav, rect = new cjs.Rectangle(0,-960,1920,1080), [rect]);


(lib.mc_choice_quiz_blanc_long = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"off":0,"on":14,"right":29,"wrong":44,wrong_needed:59};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(71));

	// zoneclick
	this.instance = new lib.bt_zone();
	this.instance.setTransform(39.45,39.25,0.5369,0.5365,0,0,0,0.3,0);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75));

	// champ
	this.champ = new cjs.Text("lorem ipsum", "35px 'Raleway'", "#FFFFFF");
	this.champ.name = "champ";
	this.champ.lineHeight = 37;
	this.champ.lineWidth = 1546;
	this.champ.parent = this;
	this.champ.setTransform(85.1,16.9);

	this.timeline.addTween(cjs.Tween.get(this.champ).wait(75));

	// flash0.ai
	this.instance_1 = new lib.mc_choice_quiz_target();
	this.instance_1.setTransform(34.2,39.6,1,1,0,0,0,28.2,30.6);
	this.instance_1.cache(0,-2,65,65);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4D4D4D").s().p("AiECFQg3g3gBhOQABhNA3g4QA3g3BNAAQBOAAA4A3QA3A4AABNQAABOg3A3Qg4A3hOAAQhNAAg3g3g");
	this.shape.setTransform(38.9633,39.992,0.9523,0.9523);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8CC63F").s().p("AiaCcQhBhBAAhbQAAhbBBg/QA/hBBbAAQBcAABABBQBAA/AABbQAABbhABBQhABAhcAAQhbAAg/hAgAhwgQIgOAOQgDACAAAEQAAAEADADIBQBWQACADAFAAQAEAAADgDICfilQADgDAAgEQAAgDgDgDIgOgOQgCgDgFAAQgEAAgDADIgBAAIiFCKQgEADgDgDIg4g7QgDgDgEAAQgEAAgDADg");
	this.shape_1.setTransform(39.1469,39.8469,1.1999,1.1999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E31933").s().p("AAAAmIg4A5IgmgmIA5g5Ig5g4IAmgmIA4A5IA5g5IAmAmIg5A4IA5A5IgmAmg");
	this.shape_2.setTransform(39.0041,39.8041,1.8794,1.8794);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8CC63F").s().p("AAfDDQgFgCgEgEIgQgQQgDgDgCgFQgBgEAAgGQAAgFABgFQACgEADgFIBkhjIk8AAQgKAAgIgIQgIgHAAgLIAAgUQAAgLAIgIQAIgIALAAIE8AAIhlhkQgGgHAAgLQAAgFABgFQACgEADgEIAQgQQAEgDAFgDQAEgCAFAAQAGAAAEACQAFADAEADICqCqQAEAEABAFQADAFAAAEQAAAFgDAFQgBAFgEADIiqCrQgEAEgFACQgEACgGAAQgFAAgEgCg");
	this.shape_3.setTransform(39.08,40.1434,0.9175,0.9175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{x:34.2}}]}).to({state:[{t:this.instance_1,p:{x:34.2}},{t:this.shape}]},14).to({state:[{t:this.instance_1,p:{x:34.3}},{t:this.shape_1}]},15).to({state:[{t:this.instance_1,p:{x:34.3}},{t:this.shape_2}]},15).to({state:[{t:this.instance_1,p:{x:34.3}},{t:this.shape_3}]},15).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0.1,0,1633.1,78.6);
p.frameBounds = [rect, rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect, new cjs.Rectangle(0,0,1633.1,78.6), rect=new cjs.Rectangle(0.1,0,1633.1,78.6), rect, rect];


(lib.mc_aide_textes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Calque_1
	this.part3 = new lib.mc_aide_textes_part3();
	this.part3.name = "part3";
	this.part3.setTransform(1730.65,639.05,1,1,0,0,0,96.3,179.2);
	this.part3.cache(3,46,192,315);

	this.part2 = new lib.mc_aide_textes_part2();
	this.part2.name = "part2";
	this.part2.setTransform(1377.35,571.95,1,1,0,0,0,316,248.1);
	this.part2.cache(-10,-107,644,606);

	this.part1 = new lib.mc_aide_textes_part1();
	this.part1.name = "part1";
	this.part1.setTransform(533.5,411.7,1,1,0,0,0,533.5,411.7);
	this.part1.cache(-2,-2,510,828);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.part1},{t:this.part2},{t:this.part3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_aide_textes, rect = new cjs.Rectangle(0,0,1828,823.5), [rect]);


(lib.flechepetite_anim = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {start:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_22 = function() {
		this.gotoAndPlay("start");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(22).call(this.frame_22).wait(1));

	// Calque 2
	this.instance = new lib.flechepetite_anim_content();
	this.instance.setTransform(9.5,0.05,1,1,0,0,0,9.5,6.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:12.8},8).to({x:9.5},7).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-7.1,-16.5,33.6,33.6);
p.frameBounds = [rect, new cjs.Rectangle(-6.7,-16.5,33.6,33.6), new cjs.Rectangle(-6.3,-16.5,33.6,33.6), new cjs.Rectangle(-5.9,-16.5,33.6,33.6), new cjs.Rectangle(-5.5,-16.5,33.6,33.6), new cjs.Rectangle(-5.1,-16.5,33.6,33.6), new cjs.Rectangle(-4.6,-16.5,33.6,33.6), new cjs.Rectangle(-4.2,-16.5,33.6,33.6), new cjs.Rectangle(-3.8,-16.5,33.6,33.6), new cjs.Rectangle(-4.3,-16.5,33.6,33.6), new cjs.Rectangle(-4.8,-16.5,33.6,33.6), new cjs.Rectangle(-5.2,-16.5,33.6,33.6), new cjs.Rectangle(-5.7,-16.5,33.6,33.6), new cjs.Rectangle(-6.2,-16.5,33.6,33.6), new cjs.Rectangle(-6.7,-16.5,33.6,33.6), rect=new cjs.Rectangle(-7.1,-16.5,33.6,33.6), rect, rect, rect, rect, rect, rect, rect];


(lib.CLICKPICTOS = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// personnalisable
	this.personnalisable = new lib.personnalisable();
	this.personnalisable.name = "personnalisable";
	this.personnalisable.setTransform(1812.9,107.1,1,1,0,0,0,-107.1,107.1);

	this.timeline.addTween(cjs.Tween.get(this.personnalisable).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960,540);

	// fleches
	this.fleche8 = new lib.flechepetite_anim();
	this.fleche8.name = "fleche8";
	this.fleche8.setTransform(1858.3,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche8.visible = false;

	this.fleche7 = new lib.flechepetite_anim();
	this.fleche7.name = "fleche7";
	this.fleche7.setTransform(1622.8,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche7.visible = false;

	this.fleche6 = new lib.flechepetite_anim();
	this.fleche6.name = "fleche6";
	this.fleche6.setTransform(1387.3,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche6.visible = false;

	this.fleche5 = new lib.flechepetite_anim();
	this.fleche5.name = "fleche5";
	this.fleche5.setTransform(1151.8,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche5.visible = false;

	this.fleche4 = new lib.flechepetite_anim();
	this.fleche4.name = "fleche4";
	this.fleche4.setTransform(916.3,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche4.visible = false;

	this.fleche3 = new lib.flechepetite_anim();
	this.fleche3.name = "fleche3";
	this.fleche3.setTransform(680.8,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche3.visible = false;

	this.fleche2 = new lib.flechepetite_anim();
	this.fleche2.name = "fleche2";
	this.fleche2.setTransform(445.3,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche2.visible = false;

	this.fleche1 = new lib.flechepetite_anim();
	this.fleche1.name = "fleche1";
	this.fleche1.setTransform(209.8,211.2,2.1517,2.1517,135.0009,0,0,9.6,0.1);
	this.fleche1.visible = false;

	var maskedShapeInstanceList = [this.fleche8,this.fleche7,this.fleche6,this.fleche5,this.fleche4,this.fleche3,this.fleche2,this.fleche1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.fleche1},{t:this.fleche2},{t:this.fleche3},{t:this.fleche4},{t:this.fleche5},{t:this.fleche6},{t:this.fleche7},{t:this.fleche8}]}).wait(1));

	// bts
	this.bt8 = new lib.bt_zone();
	this.bt8.name = "bt8";
	this.bt8.setTransform(1708.5,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt8, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt7 = new lib.bt_zone();
	this.bt7.name = "bt7";
	this.bt7.setTransform(1473,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt7, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt6 = new lib.bt_zone();
	this.bt6.name = "bt6";
	this.bt6.setTransform(1237.5,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt6, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt5 = new lib.bt_zone();
	this.bt5.name = "bt5";
	this.bt5.setTransform(1002,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt5, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt4 = new lib.bt_zone();
	this.bt4.name = "bt4";
	this.bt4.setTransform(766.5,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt4, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt3 = new lib.bt_zone();
	this.bt3.name = "bt3";
	this.bt3.setTransform(531,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt3, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt2 = new lib.bt_zone();
	this.bt2.name = "bt2";
	this.bt2.setTransform(295.5,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt2, 0, 1, 2, false, new lib.bt_zone(), 3);

	this.bt1 = new lib.bt_zone();
	this.bt1.name = "bt1";
	this.bt1.setTransform(60,217.75,1.0249,1.0249,0,0,0,-73,-73.2);
	new cjs.ButtonHelper(this.bt1, 0, 1, 2, false, new lib.bt_zone(), 3);

	var maskedShapeInstanceList = [this.bt8,this.bt7,this.bt6,this.bt5,this.bt4,this.bt3,this.bt2,this.bt1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt1},{t:this.bt2},{t:this.bt3},{t:this.bt4},{t:this.bt5},{t:this.bt6},{t:this.bt7},{t:this.bt8}]}).wait(1));

	// pictos
	this.picto8 = new lib.CLICKPICTOS_picto();
	this.picto8.name = "picto8";
	this.picto8.setTransform(1708.35,217.8);
	this.picto8.visible = false;

	this.picto7 = new lib.CLICKPICTOS_picto();
	this.picto7.name = "picto7";
	this.picto7.setTransform(1472.85,217.8);
	this.picto7.visible = false;

	this.picto5 = new lib.CLICKPICTOS_picto();
	this.picto5.name = "picto5";
	this.picto5.setTransform(1001.85,217.8);
	this.picto5.visible = false;

	this.picto4 = new lib.CLICKPICTOS_picto();
	this.picto4.name = "picto4";
	this.picto4.setTransform(766.35,217.8);
	this.picto4.visible = false;

	this.picto3 = new lib.CLICKPICTOS_picto();
	this.picto3.name = "picto3";
	this.picto3.setTransform(530.85,217.8);
	this.picto3.visible = false;

	this.picto2 = new lib.CLICKPICTOS_picto();
	this.picto2.name = "picto2";
	this.picto2.setTransform(295.35,217.8);
	this.picto2.visible = false;

	this.picto1 = new lib.CLICKPICTOS_picto();
	this.picto1.name = "picto1";
	this.picto1.setTransform(59.85,217.8);
	this.picto1.visible = false;

	this.picto6 = new lib.CLICKPICTOS_picto();
	this.picto6.name = "picto6";
	this.picto6.setTransform(1237.35,217.8);
	this.picto6.visible = false;

	var maskedShapeInstanceList = [this.picto8,this.picto7,this.picto5,this.picto4,this.picto3,this.picto2,this.picto1,this.picto6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.picto6},{t:this.picto1},{t:this.picto2},{t:this.picto3},{t:this.picto4},{t:this.picto5},{t:this.picto7},{t:this.picto8}]}).wait(1));

	// bt_continue
	this.bt_continue = new lib.bt_continue();
	this.bt_continue.name = "bt_continue";
	this.bt_continue.setTransform(960.1,836.9,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt_continue, 0, 1, 2, false, new lib.bt_continue(), 3);

	var maskedShapeInstanceList = [this.bt_continue];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.bt_continue).wait(1));

	// textes
	this.textes = new lib.CLICKPICTOS_textes();
	this.textes.name = "textes";
	this.textes.setTransform(766.35,397.85);

	var maskedShapeInstanceList = [this.textes];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.textes).wait(1));

	// titre
	this.titre = new cjs.Text("Lorem ipsum dolor sit amet", "bold 55px 'Raleway ExtraBold'", "#FFFFFF");
	this.titre.name = "titre";
	this.titre.textAlign = "center";
	this.titre.lineHeight = 67;
	this.titre.lineWidth = 1616;
	this.titre.parent = this;
	this.titre.setTransform(960,58.7);

	var maskedShapeInstanceList = [this.titre];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.titre).wait(1));

	// consigne
	this.consigne = new cjs.Text("lorem ipsum", "30px 'Raleway'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "center";
	this.consigne.lineHeight = 33;
	this.consigne.lineWidth = 1616;
	this.consigne.parent = this;
	this.consigne.setTransform(960,127.25);

	var maskedShapeInstanceList = [this.consigne];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.consigne).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,540);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CLICKPICTOS, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.paul_tete = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mouthTalk
	this.mouthTalk = new lib.paul_bouche();
	this.mouthTalk.name = "mouthTalk";
	this.mouthTalk.setTransform(-31.2,54.65);

	this.timeline.addTween(cjs.Tween.get(this.mouthTalk).wait(1));

	// Layer 4
	this.instance = new lib.paul_yeux();
	this.instance.setTransform(-36.3,7.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 5
	this.instance_1 = new lib.paul_sourcils();
	this.instance_1.setTransform(-34.6,-7.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer 6
	this.instance_2 = new lib.paul_tetebg();
	this.instance_2.setTransform(1.95,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.paul_tete, rect = new cjs.Rectangle(-74.3,-87.4,148.6,174.8), [rect]);


(lib.PAUL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {anim:2};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(160));

	// Layer 3
	this.instance = new lib.paul_maindroite();
	this.instance.setTransform(57.85,112.15,0.9999,0.9999,10.6492);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.9985,scaleY:0.9985,rotation:24.7987,x:31.65,y:87.75},2).to({scaleX:0.9982,scaleY:0.9982,rotation:31.8398,x:18.6,y:75.05},2).to({scaleX:0.9995,scaleY:0.9995,rotation:38.9803,x:5.55,y:61.9},2).to({scaleX:0.9987,scaleY:0.9987,rotation:72.4285,x:-3.65,y:35.7},2).to({scaleX:0.9989,scaleY:0.9989,rotation:105.5362,x:-6.25,y:3.85},2).to({scaleX:0.9999,scaleY:0.9999,rotation:138.8888,x:-0.4,y:-29.3},2).to({scaleX:0.9983,scaleY:0.9983,rotation:138.8914,x:-0.35,y:-29.35},2).wait(31).to({scaleX:0.9999,scaleY:0.9999,rotation:138.8888,x:-0.4,y:-29.3},0).to({scaleX:0.6052,scaleY:0.9975,rotation:135.8528,x:-1.4,y:-26},2).to({scaleX:0.2126,scaleY:0.9984,rotation:132.6625,x:-2.8,y:-22.95},2).to({scaleX:1.0489,scaleY:0.9881,rotation:0,skewX:85.6915,skewY:-94.3083,x:-36.15,y:-24.2},1).to({scaleX:1.0475,scaleY:0.9868,skewX:63.198,skewY:-116.8032,x:-57.75,y:-23.15},2).to({scaleX:1.0489,scaleY:0.9881,skewX:40.6923,skewY:-139.3077,x:-75.35,y:-21.9},1).to({scaleX:1.0472,scaleY:0.9865,skewX:40.6273,skewY:-139.3733,x:-75.4},2).to({scaleX:1.0489,scaleY:0.9881,skewX:40.6923,skewY:-139.3077,x:-75.35},2).wait(11).to({scaleX:1.0475,scaleY:0.9868,skewX:25.5844,skewY:-154.4155,x:-53.35,y:-3.45},2).to({scaleX:1.0483,scaleY:0.9875,skewX:10.555,skewY:-169.4459,x:-29.9,y:13.85},2).to({scaleX:1.0486,scaleY:0.9879,skewX:-4.2653,skewY:-184.266,x:-5.6,y:29.65},2).to({scaleX:1.0478,scaleY:0.9871,skewX:-19.285,skewY:-199.2848,x:19.5,y:43.75},2).to({scaleX:1.0489,scaleY:0.9881,skewX:-34.3072,skewY:-214.3073,x:44.75,y:56.3},2).wait(67).to({scaleX:0.9999,scaleY:0.9999,rotation:10.6492,skewX:0,skewY:-360,x:52.3,y:55.05},0).to({x:57.85,y:112.15},12).wait(1));

	// Layer 4
	this.instance_1 = new lib.paul_brasdroit();
	this.instance_1.setTransform(71.95,54.5,0.9999,0.9999,14.211);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.9983,scaleY:0.9983,rotation:42.3437,x:58.4,y:46.75},2).to({scaleX:0.9984,scaleY:0.9984,rotation:56.3974,x:53.45,y:40.3},2).to({scaleX:0.9989,scaleY:0.9989,rotation:70.4418,x:50.05,y:32.6},2).to({scaleX:0.9996,scaleY:0.9996,rotation:84.469,x:48.65,y:24.05},2).to({scaleX:0.9995,scaleY:0.9995,rotation:98.2962,x:49.35,y:15.2},2).to({scaleX:0.9999,scaleY:0.9999,rotation:112.4519,x:52.25,y:6.45},2).to({scaleX:0.9988,scaleY:0.9988,rotation:112.3266,y:6.55},2).wait(31).to({scaleX:0.9999,scaleY:0.9999,rotation:112.4519,y:6.45},0).to({scaleX:0.9986,scaleY:0.9986,rotation:103.2612,x:51.3,y:6.3},2).to({scaleX:0.9989,scaleY:0.9989,rotation:94.0638,x:51.35,y:6.35},2).to({scaleX:0.9988,scaleY:0.9988,rotation:97.3061,x:27.8,y:1.5},1).to({scaleX:0.999,scaleY:0.999,rotation:100.7852,x:4.4,y:-3.45},2).to({scaleX:0.9999,scaleY:0.9999,rotation:104.2572,x:-19.2,y:-8.35},1).to({scaleX:0.9991,scaleY:0.9991,rotation:104.2631},2).to({scaleX:0.9999,scaleY:0.9999,rotation:104.2572},2).wait(11).to({scaleX:0.9996,scaleY:0.9996,rotation:95.2544,x:-1,y:-1.5},2).to({scaleX:0.9997,scaleY:0.9997,rotation:86.4392,x:18.05,y:5.3},2).to({scaleX:0.9992,scaleY:0.9992,rotation:77.4306,x:38,y:12.05},2).to({scaleX:0.9987,scaleY:0.9987,rotation:68.4141,x:58.75,y:18.7},2).to({scaleX:0.9999,scaleY:0.9999,rotation:59.2565,x:80.45,y:24.75},2).wait(67).to({scaleX:0.9984,scaleY:0.9984,rotation:59.3902,y:24.65},0).to({scaleX:0.9999,scaleY:0.9999,rotation:14.211,x:71.95,y:54.5},12).wait(1));

	// Layer 5
	this.instance_2 = new lib.paul_epauledroite();
	this.instance_2.setTransform(70.85,-10.05,1,1,-2.2143);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({scaleX:0.9997,scaleY:0.9997,rotation:-4.0375,x:71.95,y:-10.3},2).to({rotation:-5.029,x:72.55,y:-10.5},2).to({scaleX:0.9996,scaleY:0.9996,rotation:-6.0223,x:73.15,y:-10.55},2).to({scaleX:0.9995,scaleY:0.9995,rotation:-7.014,x:73.75,y:-10.8},2).to({rotation:-8.0061,x:74.35,y:-10.9},2).to({scaleX:0.9999,scaleY:0.9999,rotation:-8.9739,x:75,y:-10.8},2).to({scaleX:0.9994,scaleY:0.9994,rotation:-8.8114,x:74.9,y:-10.85},2).wait(31).to({scaleX:0.9999,scaleY:0.9999,rotation:-8.9739,x:75,y:-10.8},0).to({scaleX:0.9988,scaleY:0.9988,rotation:-10.5605,x:76.05,y:-11},2).to({scaleX:0.999,scaleY:0.999,rotation:-12.4562,x:77.15,y:-11.45},2).to({scaleX:0.9987,scaleY:0.9987,rotation:10.782,x:62.65,y:-9.95},1).to({scaleX:0.9981,scaleY:0.9981,rotation:34.0989,x:48.85,y:-14.35},2).to({scaleX:0.9999,scaleY:0.9999,rotation:57.4715,x:37.55,y:-23.55},1).to({scaleX:0.9984,scaleY:0.9984,rotation:57.4373,x:37.6},2).to({scaleX:0.9999,scaleY:0.9999,rotation:57.4715,x:37.55},2).wait(11).to({scaleX:0.9983,scaleY:0.9983,rotation:39.3807,x:45.85,y:-15.85},2).to({scaleX:0.9988,scaleY:0.9988,rotation:21.33,x:56.05,y:-11.05},2).to({scaleX:0.9997,scaleY:0.9997,rotation:3.3058,x:67.25,y:-9.65},2).to({scaleX:0.9991,scaleY:0.9991,rotation:-14.5203,x:78.1,y:-11.75},2).to({scaleX:0.9999,scaleY:0.9999,rotation:-32.5285,x:88.15,y:-17.35},2).wait(67).to({scaleX:0.9984,scaleY:0.9984,rotation:-32.5627,x:88.1},0).to({scaleX:1,scaleY:1,rotation:-2.2143,x:70.85,y:-10.05},12).wait(1));

	// tete
	this.tete = new lib.paul_tete();
	this.tete.name = "tete";
	this.tete.setTransform(13.4,-157.4,0.9543,0.9543,-1.0454);

	this.timeline.addTween(cjs.Tween.get(this.tete).wait(2).to({scaleX:0.9542,scaleY:0.9542,rotation:-1.0116,y:-157.45},0).wait(8).to({scaleX:0.9543,scaleY:0.9543,rotation:-1.0454,y:-157.4},0).to({scaleX:0.9542,scaleY:0.9542,rotation:0.2703,x:14.55,y:-157.95},2).to({rotation:1.5515,x:15.75,y:-158.35},2).to({scaleX:0.9541,scaleY:0.9541,rotation:3.0208,x:17.1,y:-158.85},2).to({scaleX:0.9542,scaleY:0.9542,rotation:4.4563,x:18.7,y:-159.25},2).to({scaleX:0.954,scaleY:0.954,rotation:4.303,x:18.55,y:-159.15},2).to({scaleX:0.9542,scaleY:0.9542,rotation:4.4563,x:18.7,y:-159.25},3).to({scaleX:0.954,scaleY:0.954,rotation:4.303,x:18.55,y:-159.15},1).wait(4).to({scaleX:0.9542,scaleY:0.9542,rotation:4.4563,x:18.7,y:-159.25},0).wait(1).to({scaleX:0.9541,scaleY:0.9541,rotation:2.3033,x:16.7,y:-158.5},0).wait(1).to({scaleX:0.9542,scaleY:0.9542,rotation:0.3033,x:14.85,y:-157.8},0).wait(1).to({scaleX:0.9543,scaleY:0.9543,rotation:-1.5348,x:13,y:-157.2},0).wait(1).to({scaleX:0.9541,scaleY:0.9541,rotation:-1.5084,y:-157.25},0).wait(19).to({scaleX:0.9543,scaleY:0.9543,rotation:-1.5348,y:-157.2},0).wait(1).to({rotation:0.3005,x:14.75,y:-157.95},0).to({scaleX:0.9541,scaleY:0.9541,rotation:2.2978,x:16.65,y:-158.8},2).to({scaleX:0.954,scaleY:0.954,rotation:4.2957,x:18.55,y:-159.45},1).to({scaleX:0.9539,scaleY:0.9539,rotation:6.2937,x:20.5,y:-160.1},2).to({scaleX:0.9542,scaleY:0.9542,rotation:8.4052,x:22.65,y:-160.3},2).wait(11).to({scaleX:0.9538,scaleY:0.9538,rotation:8.2932,x:22.5},0).wait(13).to({scaleX:0.9542,scaleY:0.9542,rotation:8.4052,x:22.65},0).wait(2).to({scaleX:0.9538,scaleY:0.9538,rotation:8.2932,x:22.55},0).wait(2).to({scaleX:0.9542,scaleY:0.9542,rotation:8.4052,x:22.65},0).wait(2).to({scaleX:0.954,scaleY:0.954,rotation:5.2523,x:19.65,y:-159.45},0).wait(2).to({scaleX:0.9541,scaleY:0.9541,rotation:2.0255,x:16.55,y:-158.4},0).wait(1).to({scaleX:0.9542,scaleY:0.9542,rotation:-1.0528,x:13.5,y:-157.35},0).wait(1).to({rotation:-1.0144,y:-157.4},0).wait(5).to({rotation:-1.0528,y:-157.35},0).wait(1).to({scaleX:0.954,scaleY:0.954,rotation:4.0154,x:18.35,y:-159.15},0).wait(1).to({scaleX:0.9542,scaleY:0.9542,rotation:9.1719,x:23.4,y:-160.45},0).wait(1).to({scaleX:0.9538,scaleY:0.9538,rotation:9.0465,x:23.3,y:-160.4},0).wait(49).to({scaleX:0.9543,scaleY:0.9543,rotation:-1.0454,x:13.4,y:-157.4},9).wait(1));

	// Layer 7
	this.instance_3 = new lib.paul_corps();
	this.instance_3.setTransform(19.3,-31);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(160));

	// Layer 8
	this.instance_4 = new lib.paul_coccyx();
	this.instance_4.setTransform(14.3,69.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(160));

	// Layer 9
	this.instance_5 = new lib.paul_jambedroite();
	this.instance_5.setTransform(30.95,115.45,1,1,-3.4677);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(160));

	// Layer 10
	this.instance_6 = new lib.paul_avantjambedroite();
	this.instance_6.setTransform(40.65,185.55,1,1,-11.2091);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(160));

	// Layer 11
	this.instance_7 = new lib.paul_pieddroit();
	this.instance_7.setTransform(24.3,245);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(160));

	// Layer 12
	this.instance_8 = new lib.paul_jambegauche();
	this.instance_8.setTransform(-1,109.9,1,1,10.7235);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(160));

	// Layer 13
	this.instance_9 = new lib.paul_avantjambegauche();
	this.instance_9.setTransform(-1.25,174.95,1,1,-2.8531);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(160));

	// Layer 14
	this.instance_10 = new lib.paul_piedgauche();
	this.instance_10.setTransform(-27.35,234.2,1,1,7.4612);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(160));

	// Layer 15
	this.instance_11 = new lib.paul_brasgauche();
	this.instance_11.setTransform(-28.85,53,0.9999,0.9999,5.3106);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(33).to({scaleX:0.9996,scaleY:0.9996,rotation:5.2657,x:-28.95,y:48.95},2).to({scaleX:0.9999,scaleY:0.9999,rotation:5.3106,x:-28.85,y:44.75},2).to({scaleX:0.9993,scaleY:0.9993,rotation:11.2751,x:-51.2,y:41.15},2).to({scaleX:0.9999,scaleY:0.9999,rotation:17.3331,x:-73.5,y:37.4},2).to({scaleX:0.9983,scaleY:0.9983,rotation:52.3878,x:-86,y:23.8},2).to({scaleX:0.9997,scaleY:0.9997,rotation:87.4587,x:-88.6,y:5.55},2).to({scaleX:0.9999,scaleY:0.9999,rotation:122.3327,x:-80.25,y:-10.9},2).to({scaleX:0.9983,scaleY:0.9983,rotation:126.0861,x:-78.75,y:-12.25},2).to({scaleX:0.9975,scaleY:0.9975,rotation:129.8486,x:-77.35,y:-13.45},2).to({scaleX:0.9999,scaleY:0.9999,rotation:133.5822,x:-75.55,y:-14.75},1).to({scaleX:0.9983,scaleY:0.9983,rotation:125.104,x:-81.45,y:-13.45},3).to({scaleX:0.9985,scaleY:0.9986,rotation:116.7886,x:-86.95,y:-11.85},2).to({scaleX:0.9999,scaleY:0.9999,rotation:108.342,x:-91.9,y:-9.6},2).to({scaleX:0.9989,scaleY:0.9989,rotation:108.2913,x:-91.85},2).wait(9).to({regX:-1,regY:-35.2,x:-58.15,y:0.5},0).to({regX:-2.1,regY:-26.2,scaleX:0.9983,scaleY:0.9984,rotation:144.6402,x:-60.7,y:-1.95},8).wait(29).to({regX:0,regY:0,scaleX:0.9999,scaleY:0.9999,rotation:144.5595,x:-77.6,y:-22.1},0).to({scaleX:0.9978,scaleY:0.9978,rotation:142.8912,x:-78.45,y:-23.9},2).to({scaleX:0.9972,scaleY:0.9972,rotation:141.1454,x:-79.45,y:-25.75},2).to({scaleX:0.9982,scaleY:0.9982,rotation:139.4087,x:-80.05,y:-27.6},2).to({scaleX:0.9974,scaleY:0.9974,rotation:139.1363,x:-80.2,y:-27.95},2).to({scaleX:0.9999,scaleY:0.9999,rotation:138.817,x:-80.35,y:-28.3},2).to({scaleX:0.9982,scaleY:0.9983,rotation:138.8728,x:-80.25},2).to({scaleX:0.9999,scaleY:0.9999,rotation:138.817,x:-80.35},3).to({scaleX:0.9983,scaleY:0.9983,rotation:141.3811,x:-81.05,y:-32.9},2).to({scaleX:0.9999,scaleY:0.9999,rotation:143.813,x:-81.9,y:-37.45},2).to({scaleX:0.9992,scaleY:0.9992,rotation:99.5426,x:-86.6,y:-9.05},2).to({scaleX:0.9996,scaleY:0.9996,rotation:55.4776,x:-75.4,y:25.55},2).to({scaleX:0.9999,scaleY:0.9999,rotation:5.3106,x:-28.85,y:53},2).to({rotation:0.5517,x:-21.25,y:52.05},2).to({rotation:-3.8885,x:-13.45,y:51.05},2).to({scaleX:0.9996,scaleY:0.9996,rotation:-6.0364,x:-17.95,y:50.65},2).to({scaleX:0.9998,scaleY:0.9998,rotation:-1.5112,x:-25.15,y:50.2},2).to({scaleX:0.9999,scaleY:0.9999,rotation:5.3106,x:-28.85,y:53},5).wait(15));

	// Layer 16
	this.instance_12 = new lib.paul_epaulegauche();
	this.instance_12.setTransform(-23.2,-3.45,1,1,-5.2601);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(33).to({scaleX:0.9997,scaleY:0.9997,rotation:-5.2538,y:-7.55},2).to({scaleX:1,scaleY:1,rotation:-5.2601,y:-11.7},2).to({scaleX:0.9992,scaleY:0.9992,rotation:15.2887,x:-32.8,y:-10},2).to({scaleX:1,scaleY:1,rotation:35.9589,x:-41.4,y:-12.35},2).to({scaleX:0.9984,scaleY:0.9984,rotation:35.8662,x:-41.35},2).to({scaleX:1,scaleY:1,rotation:35.9589,x:-41.4},4).to({scaleX:0.9984,scaleY:0.9984,rotation:35.8662,x:-41.35,y:-12.4},2).to({scaleX:0.9976,scaleY:0.9976,rotation:35.8564},2).to({scaleX:1,scaleY:1,rotation:35.9589,x:-41.4,y:-12.35},1).to({scaleX:0.9984,scaleY:0.9984,rotation:38.5809,x:-42.9,y:-13.05},3).to({scaleX:0.9983,scaleY:0.9983,rotation:41.1089,x:-44.2,y:-13.8},2).to({scaleX:1,scaleY:1,rotation:43.6911,x:-45.65,y:-14.5},2).to({scaleX:0.9983,scaleY:0.9983,rotation:43.6375,x:-45.5,y:-14.55},2).wait(46).to({scaleX:1,scaleY:1,rotation:43.6911,x:-45.65,y:-14.5},0).to({scaleX:0.9978,scaleY:0.9978,rotation:43.6331,x:-45.4,y:-16.7},2).to({scaleX:0.9972,scaleY:0.9972,rotation:43.6279,x:-45.3,y:-18.95},2).to({scaleX:0.9983,scaleY:0.9983,rotation:43.6375,x:-45.5,y:-21.25},2).to({scaleX:0.9975,scaleY:0.9975,rotation:43.6296,x:-45.6,y:-21.75},2).to({scaleX:1,scaleY:1,rotation:43.6911,x:-45.65,y:-22.05},2).to({scaleX:0.9983,scaleY:0.9983,rotation:43.6375,x:-45.55},2).to({scaleX:1,scaleY:1,rotation:43.6911,x:-45.65},3).to({scaleX:0.9983,scaleY:0.9983,rotation:46.1438,x:-46.7,y:-25.05},2).to({scaleX:1,scaleY:1,rotation:48.6865,x:-47.85,y:-28.2},2).to({scaleX:0.9978,scaleY:0.9978,rotation:36.3464,x:-43.2,y:-19.2},2).to({scaleX:0.9988,scaleY:0.9988,rotation:24.0588,x:-37.65,y:-11.65},2).to({scaleX:1,scaleY:1,rotation:-5.2601,x:-23.2,y:-3.45},2).to({scaleX:0.9994,scaleY:0.9994,rotation:-9.7832,x:-20.1,y:-4.5},2).to({scaleX:1,scaleY:1,rotation:-14.4597,x:-16.85,y:-5.55},2).to({scaleX:0.9995,scaleY:0.9995,rotation:-9.0568,x:-20.35,y:-4.45},2).to({scaleX:0.9997,scaleY:0.9997,rotation:-4.5287,x:-23.2,y:-5.3},2).to({scaleX:1,scaleY:1,rotation:-5.2601,y:-3.45},5).wait(15));

	// Layer 17
	this.instance_13 = new lib.paul_maingauche();
	this.instance_13.setTransform(-49.05,109,0.9999,0.9999,-4.8201);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(33).to({scaleX:0.9996,scaleY:0.9996,rotation:-4.7705,x:-49.25,y:104.95},2).to({scaleX:0.9999,scaleY:0.9999,rotation:-4.8201,x:-49.05,y:100.75},2).to({scaleX:0.9991,scaleY:0.9991,rotation:-13.7756,x:-71.6,y:92.8},2).to({scaleX:0.9998,scaleY:0.9998,rotation:-22.7954,x:-94.25,y:84.7},2).to({scaleX:0.9992,scaleY:0.9992,rotation:12.0588,x:-125.35,y:49.25},2).to({scaleX:0.9979,scaleY:0.9979,rotation:47.1335,x:-135.55,y:6.15},2).to({scaleX:0.9998,scaleY:0.9998,rotation:82.205,x:-120.5,y:-43.15},2).to({scaleX:0.9984,scaleY:0.9984,rotation:120.8507,x:-115.8,y:-59.6},2).to({scaleX:0.998,scaleY:0.998,rotation:159.702,x:-102.35,y:-72.7},2).to({scaleX:0.9998,scaleY:0.9998,rotation:198.454,x:-84.25,y:-77.6},1).to({rotation:213.4534,x:-78.9,y:-76},2).to({scaleX:1.0438,scaleY:0.9981,rotation:360,skewX:177.9235,skewY:-114.621,x:-99.85,y:-80.35},1).to({scaleX:1.0912,scaleY:0.9982,skewX:148.5721,skewY:-76.3128,x:-122.3,y:-67.55},2).to({scaleX:1.1223,scaleY:0.9998,skewX:128.2114,skewY:-51.7891,x:-134.7,y:-58.6},2).to({scaleX:1.1213,scaleY:0.9989,skewX:105.5665,skewY:-74.4326,x:-139.85,y:-52},2).wait(1).to({scaleX:1.1223,scaleY:0.9998,skewX:83.2112,skewY:-96.7888,x:-142,y:-43.95},0).wait(1).to({scaleX:1.1218,scaleY:0.9994,skewX:83.237,skewY:-96.7639,x:-141.95},0).wait(7).to({regX:-52.1,regY:-67.7,x:-67.85,y:6.15},0).to({regX:-58.4,regY:-70.1,scaleX:1.1208,scaleY:0.9985,skewX:113.564,skewY:-66.4363,x:-61.1,y:10.35},8).wait(29).to({regX:0,regY:0,scaleX:1.1222,scaleY:0.9997,skewX:113.6341,skewY:-66.3649,x:-99.1,y:-77.65},0).to({scaleX:1.121,scaleY:0.9987,skewX:109.3297,skewY:-70.6698,x:-101.35,y:-77.45},2).to({scaleX:1.1213,scaleY:0.9989,skewX:105.2847,skewY:-74.7146,x:-103.45,y:-77.25},2).to({scaleX:1.1215,scaleY:0.9991,skewX:101.0547,skewY:-78.9468,x:-105.55,y:-77.05},2).to({scaleX:1.1217,scaleY:0.9993,skewX:97.013,skewY:-82.9874,x:-107.45,y:-76.7},2).to({scaleX:1.1222,scaleY:0.9997,skewX:92.8923,skewY:-87.1069,x:-109.35,y:-76.2},2).to({scaleX:1.122,scaleY:0.9996,skewX:92.786,skewY:-87.2141},2).to({scaleX:1.1222,scaleY:0.9997,skewX:92.8923,skewY:-87.1069},3).to({scaleX:1.121,scaleY:0.9987,skewX:110.3084,skewY:-69.6913,x:-105.75,y:-86.95},2).to({scaleX:1.1222,scaleY:0.9997,skewX:127.8865,skewY:-52.112,x:-100.4,y:-96.95},2).to({scaleX:0.4933,rotation:517.8847,skewX:0,skewY:0,x:-134.4,y:-59.75},2).to({scaleX:0.9998,scaleY:0.9998,rotation:505.1819,x:-137.6,y:14.7},2).to({rotation:430.1801,x:-72.85,y:98.6},2).to({scaleX:0.9986,scaleY:0.9986,rotation:425.6751,x:-61.2,y:100.8},2).to({scaleX:0.9998,scaleY:0.9998,rotation:420.9807,x:-49.55,y:103.15},2).to({scaleX:0.9987,scaleY:0.9987,rotation:381.0821,x:-40.05,y:111},2).to({scaleX:0.9992,scaleY:0.9992,rotation:348.4483,x:-38.5,y:107.65},2).to({scaleX:0.9999,scaleY:0.9999,rotation:355.1799,x:-49.05,y:109},5).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-94.3,-242,206,526.4);
p.frameBounds = [rect, rect, rect, new cjs.Rectangle(-94.3,-242,197.5,526.4), new cjs.Rectangle(-94.3,-242,206.9,526.4), new cjs.Rectangle(-94.3,-242,194.1,526.4), new cjs.Rectangle(-94.3,-242,204.5,526.4), new cjs.Rectangle(-94.3,-242,195.3,526.4), new cjs.Rectangle(-94.3,-242,200.2,526.4), new cjs.Rectangle(-94.3,-242,196.4,526.4), new cjs.Rectangle(-94.3,-242,199.1,526.4), new cjs.Rectangle(-94.3,-241.3,197.5,525.6), new cjs.Rectangle(-94.3,-241.6,200.5,526), new cjs.Rectangle(-94.3,-240.9,198.6,525.2), new cjs.Rectangle(-94.3,-243.4,202.9,527.8), new cjs.Rectangle(-94.3,-241,199.1,525.3), new cjs.Rectangle(-94.3,-245.6,202.9,530), new cjs.Rectangle(-94.3,-241.2,202.9,525.6), new cjs.Rectangle(-94.3,-247.6,202.9,531.9), new cjs.Rectangle(-94.3,-241.3,202.9,525.7), new cjs.Rectangle(-94.3,-247.3,202.9,531.7), new cjs.Rectangle(-94.3,-241.3,202.9,525.7), new cjs.Rectangle(-94.3,-241.3,202.9,525.6), new cjs.Rectangle(-94.3,-247.6,202.9,531.9), rect=new cjs.Rectangle(-94.3,-247.3,202.9,531.7), rect, rect, rect, new cjs.Rectangle(-94.3,-247.6,202.9,531.9), new cjs.Rectangle(-94.3,-244.5,202.9,528.8), new cjs.Rectangle(-94.3,-241.5,202.9,525.8), rect=new cjs.Rectangle(-94.3,-242.4,202.9,526.7), rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-101.9,-242.4,210.5,526.7), new cjs.Rectangle(-108.1,-242.4,216.7,526.7), new cjs.Rectangle(-128.1,-242.4,236.7,526.7), new cjs.Rectangle(-133.1,-242.4,241.7,526.7), new cjs.Rectangle(-154.9,-242.4,263.5,526.7), new cjs.Rectangle(-161.2,-242.4,269.8,526.7), new cjs.Rectangle(-174.4,-242.4,283,526.7), new cjs.Rectangle(-161.7,-242.4,270.3,526.7), new cjs.Rectangle(-154.6,-242.4,263.3,526.7), new cjs.Rectangle(-148,-242.4,253.8,526.7), new cjs.Rectangle(-154.7,-242.4,264.5,526.7), new cjs.Rectangle(-134.2,-242.4,242,526.7), new cjs.Rectangle(-135.2,-242.4,247.5,526.7), new cjs.Rectangle(-131.7,-241.6,228.3,526), new cjs.Rectangle(-101.2,-241,192.4,525.3), new cjs.Rectangle(-115.8,-244.7,212.4,529.1), new cjs.Rectangle(-138.2,-247.6,233.7,531.9), new cjs.Rectangle(-119.6,-241.6,210.7,526), new cjs.Rectangle(-144.6,-250.2,244.8,534.6), new cjs.Rectangle(-156.3,-241.8,248.3,526.1), new cjs.Rectangle(-175.6,-252.6,280.7,536.9), new cjs.Rectangle(-172,-252.6,277.1,536.9), new cjs.Rectangle(-177,-252.6,282,536.9), new cjs.Rectangle(-176.1,-252.6,281.2,536.9), rect=new cjs.Rectangle(-176,-252.6,281.1,536.9), rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-176,-252.4,280.7,536.8), new cjs.Rectangle(-168.6,-252.4,273.3,536.8), new cjs.Rectangle(-164.3,-252.4,269,536.8), new cjs.Rectangle(-159.7,-252.4,264.4,536.8), new cjs.Rectangle(-154.7,-252.4,259.4,536.8), new cjs.Rectangle(-150,-252.4,254.7,536.8), new cjs.Rectangle(-145,-252.4,249.7,536.8), new cjs.Rectangle(-139.7,-252.4,244.4,536.8), new cjs.Rectangle(-138.2,-252.4,253.2,536.8), new cjs.Rectangle(-138.2,-252.4,258.1,536.8), rect=new cjs.Rectangle(-138.2,-252.4,275.6,536.8), rect, rect, rect=new cjs.Rectangle(-138.2,-252.6,275.6,536.9), rect, rect=new cjs.Rectangle(-138.2,-252.4,275.6,536.8), rect, rect=new cjs.Rectangle(-138.2,-252.6,275.6,536.9), rect, rect=new cjs.Rectangle(-138.2,-248.6,275.6,532.9), rect, new cjs.Rectangle(-138.2,-244.1,275.6,528.4), rect=new cjs.Rectangle(-138.2,-242,275.6,526.3), rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-138.2,-247,275.6,531.3), new cjs.Rectangle(-138.2,-253.5,275.6,537.8), rect=new cjs.Rectangle(-138.2,-253.2,275.6,537.6), rect, rect, rect, rect, rect, new cjs.Rectangle(-138.3,-253.2,275.7,537.6), new cjs.Rectangle(-134.4,-253.2,271.8,537.6), new cjs.Rectangle(-139.5,-253.2,276.9,537.6), new cjs.Rectangle(-135.9,-253.2,273.3,537.6), new cjs.Rectangle(-140.5,-253.2,277.9,537.6), new cjs.Rectangle(-137.3,-253.2,274.7,537.6), new cjs.Rectangle(-141.2,-253.2,278.6,537.6), new cjs.Rectangle(-138.4,-253.2,275.8,537.6), new cjs.Rectangle(-141.7,-253.2,279,537.6), new cjs.Rectangle(-140.1,-253.2,277.5,537.6), new cjs.Rectangle(-141.9,-253.2,279.3,537.6), new cjs.Rectangle(-140.8,-253.2,278.2,537.6), new cjs.Rectangle(-141.8,-253.2,279.2,537.6), rect=new cjs.Rectangle(-140.8,-253.2,278.2,537.6), rect, new cjs.Rectangle(-141.9,-253.2,279.3,537.6), new cjs.Rectangle(-140,-253.2,277.4,537.6), new cjs.Rectangle(-144.2,-253.2,281.5,537.6), new cjs.Rectangle(-138,-253.2,275.4,537.6), new cjs.Rectangle(-141.3,-253.2,278.7,537.6), new cjs.Rectangle(-136.1,-253.2,273.5,537.6), new cjs.Rectangle(-156.9,-253.2,294.3,537.6), new cjs.Rectangle(-156.6,-253.2,294,537.6), new cjs.Rectangle(-174.8,-253.2,312.2,537.6), new cjs.Rectangle(-133.9,-253.2,271.3,537.6), new cjs.Rectangle(-110.2,-253.2,247.6,537.6), new cjs.Rectangle(-100.4,-253.2,237.8,537.6), new cjs.Rectangle(-99.3,-253.2,236.7,537.6), rect=new cjs.Rectangle(-94.3,-253.2,231.7,537.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-94.3,-253.2,231.6,537.6), new cjs.Rectangle(-94.3,-253.2,220.2,537.6), new cjs.Rectangle(-94.3,-253.2,217.9,537.6), new cjs.Rectangle(-94.3,-253.2,215.4,537.6), new cjs.Rectangle(-94.3,-241.4,212.9,525.8), new cjs.Rectangle(-94.3,-241.4,210.5,525.8), new cjs.Rectangle(-94.3,-241.2,209.6,525.6), new cjs.Rectangle(-94.3,-241.1,208.5,525.4), new cjs.Rectangle(-94.3,-241,207.3,525.3), new cjs.Rectangle(-94.3,-240.8,205.8,525.1), new cjs.Rectangle(-94.3,-240.6,204.2,525), new cjs.Rectangle(-94.3,-241,202.5,525.3), new cjs.Rectangle(-94.3,-242,206,526.4)];


(lib.tete_nina = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mouthTalk
	this.mouthTalk = new lib.bouche_nina_mouthTalk();
	this.mouthTalk.name = "mouthTalk";
	this.mouthTalk.setTransform(40.75,88.6,1.0239,1.0239,0,0,0,14.7,24.5);

	this.timeline.addTween(cjs.Tween.get(this.mouthTalk).wait(163));

	// sourcil
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#332C24").s().p("AgyALIgCgBIgCgBQgHgFgBgIIABgCQATgOAPgVIABACIADACQAEA3BHAPIACAAQAFACAEADIAAABQgNADgMAAQgqAAgugfg");
	this.shape.setTransform(22.3875,65.8547);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#312A22").s().p("Ah2AvQAAgBAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQAEgFAIgCIABgCIAEAAIASADQB4AJAWheIABgDIAPgMQAMAFANAQQARAVAIAHIAAACQgJALgEAFQgCALgLAHQg7AmhdAAQgogEgWgLg");
	this.shape_1.setTransform(58.75,64.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},28).to({state:[]},2).to({state:[{t:this.shape_1},{t:this.shape}]},21).to({state:[]},2).wait(110));

	// paupiere
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#D08954").ss(1,1,1).p("AiPhZIAMAVIAGAxQACA5gYAqQgYAqgfgmIgagwQgCgSAAgTQgBgnAFgHQAFgHAogSQATgJATgIgADgASQAKgSgFgFIgsgqIggg6QgiAIgMALQAAAAAAAAQggAigMAXQggA6ATA5IA5ARQA9ALAUgkQAcgvAIgNg");
	this.shape_2.setTransform(43.3223,59.4698);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D08954").s().p("ABrBnIg5gRQgTg5Agg6QAMgXAggiIAAAAQAMgLAigIIAgA6IAsAqQAFAFgKASIgkA8QgPAcgoAAQgMAAgOgDgAjKBUIgagwQgCgSAAgTQgBgnAFgHQAFgHAogSIAmgRIAMAVIAGAxQACA5gYAqQgMAWgPAAQgNAAgPgSg");
	this.shape_3.setTransform(43.3223,59.4698);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#D08954").ss(1,1,1).p("AiDhEIAGAxQACA5gYAqQgYAqgfgmIgagwQgCgSAAgTQgBgnAFgHQAFgHAogSQATgJATgIgADgASQAKgSgFgFIgsgqIggg6QgiAIgMALQAAAAAAAAQggAigMAXQggA6ATA5IA5ARQA9ALAUgkQAcgvAIgNg");
	this.shape_4.setTransform(43.3223,59.4698);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},28).to({state:[]},2).to({state:[{t:this.shape_3},{t:this.shape_4}]},21).to({state:[]},2).wait(110));

	// oeil
	this.instance = new lib.oeil_nina();
	this.instance.setTransform(24,59.15,1,1,0,0,0,3.6,3.9);

	this.instance_1 = new lib.oeil_nina();
	this.instance_1.setTransform(49.5,57.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#332C24").s().p("AANBTQgBgGAAgGIAAgDQANhag6ghIAAgDIgDgDQAegHAVgOIADgBQAJAFADALIAAADIAAADQAUBYgjA5IgCgBg");
	this.shape_5.setTransform(27.0989,59.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FEC899").s().p("AhJArIAAgDQgKgVAEgkIADAAQBcgGA/gkIACAAIAAADIAAAhIAAADQgWAqggAhIgDABQgVAEgRAAQgjAAgYgRg");
	this.shape_6.setTransform(66.0407,102.3583);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EA9D65").s().p("ABTBWIAAgXIADgBQBUgPAjg/IgCABQg1AxhMAZIAAAEQghAMgsADQjFAOhWhpQBHBBCKgGQBygFBXglQBZgkBEg4IgBACIgCAEQgEAhANAEIAAACIgCAAQgbAjgRArIAAAJIAAADIgCAAQg/AkhdAHIAAgEg");
	this.shape_7.setTransform(50.025,91.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D68B54").s().p("Ag6AoIgGAAIAAgEQBLgZA0gxIACgBQgiA/hTAPIgDABIgDAAg");
	this.shape_8.setTransform(63.975,93.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EB9F68").s().p("AgTAAQAKgKAIADIAAgCQAKAFAJAFIACABQgKAIgJAAQgJAAgLgKg");
	this.shape_9.setTransform(72.825,66.3033);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EA9D64").s().p("AAIAcQgUgKgQgQIAAgCIAAgKQAEgGACgJIAAgDQARAOASAMQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQACANANAFIAAACIAAABQgIgDgKALIgDgBg");
	this.shape_10.setTransform(69.75,63.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D08954").s().p("AhfAeQAHgDADgGIACAAQAoAlBCgWIADAAQArgfALg/IAAgDIADAAQAIAFAEAIIABADIgBADQgCAIgEAHIAAAJIAAADQgQA1gzAQQgaAIgWAAQgrAAgaggg");
	this.shape_11.setTransform(57.925,65.1473);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FDFDFD").s().p("AhRAzIAAgEIAAgPQALhjBogGIACAAQAdAOAQAaIABACIAAADQgLA/gsAfIgCAAQgZAIgUAAQgkAAgZgXg");
	this.shape_12.setTransform(57.75,62.1201);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D78D57").s().p("AAaAYIgGAAIgDAAQgsgCgBgtIAPABIAAACQAJAfAfAMQABAAAAABQAAAAABAAQAAAAAAAAQgBAAAAAAIgCAAg");
	this.shape_13.setTransform(33.2639,78.1313);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#D88C56").s().p("AgCAJQgKgDAAgNQAngGgVAUQgCACgEAAIgCAAg");
	this.shape_14.setTransform(40.1895,78.3179);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EA9F67").s().p("AgUAXIAAgBIAGAAQAFAAgEgBQgggNgJgfQA/gHAtAaIABACQgSAbgkAAQgJAAgMgCgAAPgIQAAANAKADQAGACADgDQAQgQgVAAIgOABg");
	this.shape_15.setTransform(37.375,78.3845);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FDFCFC").s().p("AgLA+IAAgCQgSgKgJgSIAAgEIAAgvQAFggAXgNIACgBQA6AigNBaIAAADIgDAAQgLAEgLAAQgMAAgLgEg");
	this.shape_16.setTransform(24.5924,60.0565);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#D08B58").s().p("AgIBNIgCgBQgTgLgNgQIAAgDQgBgMgFgJIAAgDIAAgJQAMgpAKgsIAAgDQAIgDANABIADAAIACACIAAADIgBABQgXAOgGAfIAAAwIAAADQAKATARAJIABACQAWAHAXgGIADgBQgBAGACAGIABABIAAABQgSAKgUAAQgJAAgJgCg");
	this.shape_17.setTransform(23.7,60.7499);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#92652E").s().p("AgHATQgHgKgIgJIAAgCIAbgSIADAAQAEALAIAGIADABIgBACQgNATgQACIAAgCg");
	this.shape_18.setTransform(36.025,48.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E89C62").s().p("AgTAUQgDgLgJgFIAAgDQAbgHASgPIADgBQAIAJAGAKIABACIgDABIgwAXIAAgDg");
	this.shape_19.setTransform(32.075,50.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#312A22").s().p("AhABdQgJgTAEghQAQhMAygrQAHgHAOgBIATgIIACgBQAYAfAIAbIgEAAIgDAAQhoAGgLBjIAAAPIAAAEIgCAAQgDAGgHADIgBgDg");
	this.shape_20.setTransform(54.726,58.525);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E99E64").s().p("AgBAZQgKgWgIgXIAAgDIAQgDIADAAQAKAUAJAVIABADIgDABIgRAIIgBgCg");
	this.shape_21.setTransform(56.675,47.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#90642E").s().p("Ag5ANQAjgdAugSIADgBIAWAAIADAAQACAJADAHIABADIgDAAIgQADIAAADQgOACgKAGQgLAGgFAJQgRAXgOAAQgOAAgLgXg");
	this.shape_22.setTransform(50.775,46.1375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#EA9E64").s().p("AhSBQQgJgGgEgMIAAgCQBag3A7hUIACgBQAQAqANAuIABAAQAAANAJAGIABACIgDAAIgWAAIAAgDQgJgtgMgqIgBACQg1BOhMA7IAAADIgCgBg");
	this.shape_23.setTransform(46.375,39.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C9BE9E").s().p("AgbBNQgWgGgLgRIgBAAQgDgXgIgQIAAgCQgNgEAEghIACgDIABgDIAAgDIAAgDQAMgWgBAlIABAAQAKAiAmAJIABACIAUAAIADAAQAvgTALg1IAAgDQABgnAPAUIACABIAAADQAKCJh2AHIgBgBg");
	this.shape_24.setTransform(86.0166,85.7972);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E99E66").s().p("AACAbIgCgBQgKgLgSgDIAAgCQgLgDACgPQAFgGADgJIABgBQAJAcAUgZQAFgHAOABQACAdgCATIAEgDQAIgFAGgHIAAADQgGATgYAAIgGgBg");
	this.shape_25.setTransform(91.3269,72.6566);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FEF5D8").s().p("AAFBIIgVAAIAAgCQgmgJgKgjIAAgDIAAggQATgjAjgVIAAgCQAOgEATABIADAAQASADAKALIACABIAIASIABAAIAAAfIAAADIAAADQgLA1guATIgDAAg");
	this.shape_26.setTransform(85.875,80.9969);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#D48A54").s().p("AANgLQgNgCgFAHQgVAZgJgcIAAgCQAQgUAdgFIADAAQAfAPgLAqIgCAAQgGAHgIAGIgEACQACgTgCgcg");
	this.shape_27.setTransform(92.0288,71.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FEC89C").s().p("AlxD+IgDgBQgwgmAChZQAJhJAPhCIAAgCQAFAJABALIAAADQANAQASALIADAAQAeAHAbgOIAAgCQAjg4gThZIAAgDIAxgYIACAAQARgCANgUIABgDIAAgDQBLg6A3hPIAAgCQANAqAIAuIABADIgDAAQgvASgjAeQAWAvAhgvQAHgJAKgGQALgGAOgDQAHAZALAVIAAADQgOABgIAHQgyArgQBMQgEAgAJATIABADQAnAxBOgZQAzgQAQg0QAQAPAVAKIADABQATASAVgPIgCgBQgJgHgLgEIAAgCQgNgEgCgOQAUAPAagDIADAAQAlAXAzALIAAgCQAMgFAOgRQAmgqA9AUQAKADAFAGIAAACQAKAHAFAOIAAADQgCBWg7AdIAAAEIgCgBQgPgUgBAnIAAgDIAAgfIgCAAIgHgSQAeADAGgVIAAgDIACAAQALgrgfgPIgDAAQgeAFgQATIAAADIgBABQgDAJgFAGQgCAQALADIAAACIgDAAQgTgBgOAEIgBACQgiAVgUAjIAAAhIAAADIgBAAQABglgMAWIAAADIAAADQhEA5hZAlQhWAkhzAFIgYABQh5AAhAg8gAjpCdIADAAIABABQA0AKAXgkIAAgCQgugag/AHIAAgBIgPgCQAAAvAtACg");
	this.shape_28.setTransform(58.3477,64.8543);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#EB9F62").s().p("AgLAtIADgCQACgBAAAAQABgBABAAQAAAAAAgBQAAAAAAAAQg9gkgKhTQA3BhBgA6IAAACIAAACQgzgLgkgYg");
	this.shape_29.setTransform(77.2,59.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#E9A502").s().p("AhtFoIADgBQAhgbAZgkIgDAAQhaAyiEgUIABgCQAVgWADgoIgDABQhIBIiEgDIAAgCQAggRAKgmIgCAAQgMAKgHAOIgCABQgiAYg3gHIgBgCQgogSgaggQAgAUApgNIADgBQASgOANgSIACgBQALh+gLiGQgMiuATieQAmACAdgIIACAAIAAADQgJAsgMApIAAAJIAAAEIAAACQgPBDgJBJQgCBZAwAlIADABQBWBqDFgOQAtgEAhgMIAGAAIADAAIAAAYIAAADIgDAAQgEAlAKAVIAAADQAjAZA+gMIADgBQAgghAWgrIAAgDIAAghIAAgDIAAgDIAAgJQARgsAbgiIACAAQAIAQADAWIABAAQALARAWAGIABABQB3gHgKiJIAAgDIAAgEQA7gdAChWIAAgDQgFgOgKgIIAAgCIADAAQAUAIAKATIAAADQAIAjgIAmIgCABQgNAbgYAPQABB9ARBxQANBVA/AlQBNAaA2goIADgBQgMAUgXALQgVAKgZAGQhlAZg0g8IAAADIAGAlIACABQAPAOAWAGIAAACIgeAQIgDAAQhZgBgwgpIAAADQAIAuAlASIgDAAQhbAHgzgvIgDABQhaArh3AAIgfgBg");
	this.shape_30.setTransform(61.725,89.2583);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FED025").s().p("AAAA6QAAg9gCg5QAIA3gFBCIgBAAIAAgDg");
	this.shape_31.setTransform(99.4,34.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FEBF00").s().p("ACTHNQg+glgNhVQgShxgBh+QAZgPANgbIACgBQAHgmgHgiIAAgDQgKgTgVgIIgDAAQgFgGgJgDQg9gUglArQgPARgMAFIAAgCQhgg6g4hiQALBUA8AkQAAAAAAAAQAAABAAAAQgBABAAAAQgBAAgBABIgEACIgDAAQgZADgUgPQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQgTgMgRgOIgBgDQgEgHgHgFIAAgDQAAgdgPgOIAAgDIgMhqIAJhGIAAgDQATAzAkAiQAmAjBHgLQAZgUANgiIABAAIAAgoIAAgDQAdBSBWAYIADABQAbgUAAgvIAAgDIACgBQAEhCgJg3IAAgDQgHgigFgkQAmBjAXBvQALA2ABBAQACCOAFCnQADBYAXBJQAWBGBGAZQAkgDAJAGIgCAFQgDAKgHAGIgCABQghAZgqAAQgaAAgfgLg");
	this.shape_32.setTransform(92.875,68.7583);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FEDD42").s().p("ABXETIgBgCQgQgagdgOIAFAAQgIgbgYgfIgBgDQgJgWgKgUIgBgDQgDgHgCgJIgBgCQgJgFAAgOIAAgDQgBgagLgRIAAgDIgGh4QAGgTgDgbIAAgDQBDhwCUggIAAgCQAugCAwAIIADAAQAvAbAeAqIACABQAgArAUA3IAAADQAFAkAHAhIAAADQAEA5gBA9IAAADIAAADQAAAvgbAUIgDAAQhXgYgdhSIAAADIAAAnIgBABQgNAigZAUQhHALgmgkQgkgigTgzIAAADIgJBGIAMBrIAAADQAPAOAAAcIAAADIgDAAgAmYCmIgCgBQgNgRADgiIAAgDIAAgDQBQiZCAhqIACgBIAAABQA5gyBfAPQAMA+gdAxQhlCqjDBNIgDAAIgMABQgOAAgIgHg");
	this.shape_33.setTransform(57.2671,31.4216);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FEBF01").s().p("Am2I9IgCAAQgXgUABgrQAcAaAzgLIADAAQAWgvAAhFQABiIgCiAQgBhKAJhEQAFgqAKgpQAKgpAQgiQgEAiAOARIACABQAKAJAXgDIADAAQDEhNBkisQAcgxgMg9QhdgPg6AyIAAgCIAAgDQCghwDrghQAbgDASgKQAKANAPgGIADgBQA5AtAnA+IABADIgCgBQgfgrgugaIgDAAQgxgJgtADIgBABQiUAhhDBwIAAADQACAagFATIAGB6IAAADQALAQABAaIAAAEIgCgBQgMgugQgqIgCABQg7BVhaA2IAAADIgDABIgcARIAAAEIgCAAQgUAPgaAJIAAADIgDAAQgXAOgdAHIgDAAQgNAAgJADIgCAAQgdAIgmgCQgTCdAMCuQALCHgLB+IgCABQgNASgSAOIgDABQgQAFgPAAQgXAAgTgMg");
	this.shape_34.setTransform(46.3495,58.485);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance_1},{t:this.instance}]}).wait(163));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,122.2,125.3);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.marcillac_tete = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mouthTalk
	this.mouthTalk = new lib.marcillac_mouthTalk();
	this.mouthTalk.name = "mouthTalk";
	this.mouthTalk.setTransform(137.1,329.15,1,1,0,0,0,52.7,44.1);

	this.timeline.addTween(cjs.Tween.get(this.mouthTalk).wait(1));

	// yeux
	this.instance = new lib.marcillac_yeux();
	this.instance.setTransform(-478.95,-300.25,1,1,0,0,0,49.5,13);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#68625A").s().p("AC+DWQhPgLglgHQhCgMgogQIgPgEIgSgIIgMgGQiig9g9iZQgUgwgGgzIgDgqIASgJQANCeBWBkQA5BDBRAhQAqAHBXAcQBQAVA3gQQAHgCAnADQAeACAEgNQAIgIARgCQAMgCAXACQgcAzhWAAIgagBg");
	this.shape.setTransform(36,223.5539);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A48968").s().p("AjFBgQgRgGgOgCQAThABUg4QBQg3BZgPQBhgRAxAqQA6AxgbB0QgYgEgFggQgCgMABgzQhThGh1A0QhVAkhKBRQAIAAAAAJQABAJgJACIgdgMg");
	this.shape_1.setTransform(332.9314,235.1173);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#33312F").s().p("AgiBIQgQgrgMgTQgLgTAPgoQASgwgCgWQAkABAbAaIAuArQADBSgGAcQgMA1gtAGQgYgKgRgmg");
	this.shape_2.setTransform(380.2372,245.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EDAA5D").s().p("AhegnQA5ACAyAZQAgAOAyAmIgWAAQh+AAgphPg");
	this.shape_3.setTransform(167.5,232.9796);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FCF9EF").s().p("Ah+AvQgBghgHgJQAJgCABgNIAAgYQAqgKBNgZQBIgTBEAEQglBChGAwQhUA6gwgrQgJACgBAOIAAAYQgLgHgBgfg");
	this.shape_4.setTransform(70.5,232.4069);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EDAA5D").s().p("AjLDvQAJgQgCgIQgMgMAHgVQAJgdgEgSQBrAJAhg7QBshGA9hPQAigOAOhEQAQhPAQgTQAzCdifCDQgmAghpBHQhcA9gkAlIgFAAQgQAAAEgGg");
	this.shape_5.setTransform(74.7465,231.4313);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FCF9EF").s().p("Ai9CfIgjhvQgThAgGg2QBEgkB3gVQBEgNCQgUQAIANAkgCQAwgDAIACQgHCuh1BMQhcA9iiAAQgdAAgggCg");
	this.shape_6.setTransform(204,228.0494);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FEF3D5").s().p("AhdD7QgngDgHACQgLhOgwioQgqiYgJhlQBpgGB+AUIDQAkQAVgBgBAkQgCApAMAEQAJgBAIAFQAIAGAFAAIAAAKQgQATgQBPQgOBDgiAOIAAgKQg3gfhbAaIhLAXQgsANgigBQgBAYACALQACARAHAIQAHAJABAhQABAfALAHIAoAAQgEALgXAAIgHAAg");
	this.shape_7.setTransform(69,216.9351);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FEF3D5").s().p("AlSC1Qh8hhghjIQA5hOCOgqQCDgnCkACQCiABCFAoQCOArA6BJQAEAPgJAPQgJAPAEAPQgTgPglAHQgwAKgQgCQiPAUhFANQh4AVhDAjQAGA2AUBBIAhBvIAAAKIgnABQjMAAh3hdgAg3DBQgyglgggQQgygYg6gDQAtBYCRgIg");
	this.shape_8.setTransform(182.551,217.6169);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EDAA5D").s().p("ABzDzQhcgSgsgHQikgbhjAsIg+iAQglhMgBhLQCkhrCpgyQDHg9DtAIQgQCAgmCJQgZBegzCWIgIABQg5AAhLgNg");
	this.shape_9.setTransform(67.5,154.4067);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D4D0CE").s().p("ACTBlQitgJhiBEIAAgoQgIAOgigJQgMgEgCACQgEACAKAPQgegKiBgzQhfglg4gMQgJgJgBgVIAAgnQgIAAgJAMQgIAMgPgEQAQgwAjguQAWgdAvgvIAAAKQBbA6CCANQBgAJCXgPID7gaQCMgJBaAUQgnAzgmBmQg2CSgJAUQhIhRiwgIg");
	this.shape_10.setTransform(303.5,152.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EDAA5D").s().p("AqOI1QlChHitipQAEgPgLgHQgNgJAAgJQDEB+EZAnQEAAjEognQERgjEChbQD6hYCph1QA8hxBkj2QBkj2A8hyQARAIAKAaQAFAOAIAgQgWB0g8CYQhVDUgNAoIgKAAQgNBZgvBGQgmA5hmA1QiwBcjIBVQjmBhikAuQiPAUiKAAQjFAAi6gog");
	this.shape_11.setTransform(175,345.3888);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EDAA5D").s().p("AiXCAQh7gbhIg+QghgngHgKQgHgYACgXQAFgkAAgRQBYgnBtAHQBFAFCAAhQCFAhA+AGQBrAKBTgjQgKBfhaA9QhRA4h9AQQguAGgsAAQhLAAhJgQg");
	this.shape_12.setTransform(92.7421,286.9581);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ah3BeIABgZQABgNAIgCQAwArBUg7QBGgwAlhBQhEgFhHATQhOAZgqALIAAAYQgBANgJACQgHgIgCgRQgCgLABgXQAiAAAsgMIBLgXQBbgbA3AgIAAAKQg9BOhsBHQgXgCgLACQgSACgIAIg");
	this.shape_13.setTransform(70.98,231.5946);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AjlCmIAAgKQDPANBshIQB1hMAHiuQgIgCgwADQgkACgIgNQAQACAwgKQAkgHAUAPQgDC4iCBZQhdBAiFAAQgvAAg1gIg");
	this.shape_14.setTransform(208,228.3253);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#999CA0").s().p("AhWCRQADh7AKhFQAhjqCHgXQhxA0gjDIQgJA3gLB7QgLB5gKA6QAFgiADh+g");
	this.shape_15.setTransform(308.5,240.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A19C9C").s().p("AkSFMQAPhSBFjxQA6jGAIh2QgegPg/AEIhhALQB5gaDBACQCvACCMAWQAAAGgIACIgMACQiIAXghDqQgKBFgDB7QgDB+gFAiQAAAGgHACIgNACQhEgUhuAOQiDAQgrAAIgHAAg");
	this.shape_16.setTransform(288.5,239.7238);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999CA0").s().p("Ai9FFQBAkjBqlmQgIB2g6DHQhFDwgPBSQAnABCNgRQBvgOBEAUQiJAUjdAAIgVAAg");
	this.shape_17.setTransform(278,241.4273);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#83786B").s().p("AhoDRQivgmhyh7QhphwgkilQAJAEAPAMQAPAIAVgEQAgDJB9BgQCCBmDogKQDKAeB9hWQCChZADi4QgEgQAJgOQAIgPgDgPQAOgBgEAfQgEAfAOgBQgFDcjCBkQh0A7iQAAQhVAAhfgVg");
	this.shape_18.setTransform(180.5,226.9785);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FBCC91").s().p("AwgOlQkagnjDh+QAAAJANAJQALAHgEAPQhRg4gOhnQgLhOAbiJQAlihAOhUQAYiTgQhnQBIA9B7AbQB2AZB5gPQB9gQBRg3QBag9AKhgQhTAjhrgKQg+gGiFghQiBghhFgFQhtgHhYAnQAAARgFAkQgCAXAHAYIgKAAQhYgsAUh2QARhpBHg/QACAJgJAPQgEAHAVgBQAkglBcg9QBqhHAmgfQCfiFgzicIAAgKQC/g0CLAgQAjClBqBxQByB7CvAmQEAA5C4hfQDChkAFjdQAdgaBHgEQAqgCBYACIBggLQA/gFAfAQQhqFmhAEjQDtABCPgVIAMgCQAHgCABgGQAKg5ALh5QALh8AJg4QAjjHByg0IAMgDQAHgBABgGQANgPAYgNIArgWIBGAAQBYgYBTAHQBUAHA8AmQCJBWgrC6QACAVgSAxQgPAnALAUQimEDiKBmQjbCgkog9QgIgggFgOQgKgagRgIQg9ByhjD1QhlD3g7BxQipB1j6BYQkBBbkSAjQibAViQAAQiDAAh6gRgATrrSQhaAQhQA3QhUA5gTBAQAOACARAGIAdALQA4AngZBXQgHAYgSAyQgPAsgBAaQFaAFA2kmQAbh1g6gxQgjgeg8AAQgXAAgcAEg");
	this.shape_19.setTransform(211.4095,297.0543);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#BAB6B3").s().p("Ai3AyQgEgWAJgcQAIgcgDgVQAeAQBCgDQAmgBBQgIQBGgEAgAMQArARAAAyQhKgFhwANQhvAMg8AAIgMAAgAijAeQAmgGCCgFQBtgDA0gQQhqgYhWgEIgYAAQh2AAAFA6g");
	this.shape_20.setTransform(252.449,201.9575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#33312F").s().p("AK3CFQAEgfgOABQg6hKiPgqQiEgoijgBQikgBiDAnQiNApg5BOQgVAEgPgIQgPgMgJgEQiLggi/A0QgFgBgIgGQgIgFgJACQgMgFACgoQABglgVACIjRgjQh+gVhpAHQh6gOhsArQgdAKg9AeQg4AbgiANQgEgLgPgKQgRgMgEgHQAfhfB+grQAugPBIgOIB9gWQENAGBBAKQCrAaA3BiQBxgLA/gBQBqAAA6AWQgCgXAIgWIAOgjQAPgIAvgFQAsgFAOgMQDKg5DtAOQDCALDsA+QApA2BiARQBGANCDgEQAQAMAwgCQBAgDAMACQAeAABSAHQBFAGAxgDQAAADAGAGQAEAFAAAGQA5gHBNAPQBNAPAxAbIgrAWQgXANgOAPQiMgXiwgBQjBgCh5AaQhYgCgpACQhIAEgdAaIgBAAQgNAAAEgegALGA/QgIAcADAWQA9ABB6gNQBxgNBKAFQAAgzgqgRQghgMhFAEQhRAIgnABQhCADgegQQADAVgIAdg");
	this.shape_21.setTransform(163.5,195.6635);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999591").s().p("AE2DNQgxgahNgPQhNgPg5AGQAAgFgEgFQgGgGAAgEQAHgBACgKIABgTQhhgBgJgCQg0gKgBgvQgsAMgYgTQgDgDgdgnQgPABAPAwQAVBAgBAQQgMgBhAACQgwADgQgOIB4AAIAAgyQhqgsgwgaQhSgwgOhRQA6BFCKgOQB0gMBYg1QBhhECuAJQCwAIBIBRQgHArgnBuQghBcgBBKg");
	this.shape_22.setTransform(297,183.4278);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#A19C9C").s().p("AAGBDQhRgIgeAAQAAgQgUg/QgPgxAPgBQAdAoADADQAYATAsgMQAAAuA0AKQAJACBiABIgBATQgCAKgHABIgnACQgkAAgrgEg");
	this.shape_23.setTransform(288.6311,190.0145);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#DDDDDD").s().p("Ai8BMQgQgmgEg1QgFg7APgnQAPAEAHgLQAJgNAJAAIAAAoQABAWAJAIQA4AMBdAlQCCAyAeAKQgKgOADgDQADgCAMAEQAiAKAIgPIAAAoQhYA1h0AMQgXADgVAAQhnAAgwg6g");
	this.shape_24.setTransform(269.9467,162.3181);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#EDAA5D").s().p("AB5DFQjsgOjLA5QgYgPg2AEQgZACg5AJQg6g9gLiZQgKiHAdh4QAcAbAHA8QAEAhgBBYQgBBOAHAlQALA4AjAUQAPg3AYiZQAZijAQhEQGXAdDEBdQEMB+AmEjQjsg+jCgLg");
	this.shape_25.setTransform(174.8984,159.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8A8686").s().p("AlKClQiCgMhbg7IAAgKQBZh8A9hBQCphJErAMQDXAJEKA0QANAUgiAbQgnAfAAAWQgGAVgpAuQgiAlABAtIgKAAQhagUiMAJIj6AaQheAKhJAAQgsAAglgEg");
	this.shape_26.setTransform(317.1567,125.5397);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FBCC91").s().p("AONJSQhigSgpg2QgmkjkNh/QjDhdmXgcQgRBDgZCjQgXCbgPA2QgjgUgLg4QgIglABhPQABhYgEggQgHg9gbgbQgeB4AKCIQAMCZA6A9QA4gJAagCQA2gEAYAPQgOANgsAFQgvAFgPAHIgOAkQgIAVACAXQg6gWhqABQg/AAhxALQg3hhirgbQhBgKkNgGIAAgUQBjgsCkAbQAtAHBcASQBRANA7gBQAziWAZheQAmiKAQh/QjtgIjIA9QipAxikBrQAujOB7ipQBliLCqiHQBfhtBVAEQBEAEBPBQQAvAvBfByQBXBjBKAfQB5BeBEAfQB4A4CWgLQAAg9g1g3QgggggKgMQgUgcgFggQgNgRgKgiQgLgogGgTQAxAVBeAzQBcAyA0AWQCvBLDGgTQgBgnglgdQgtgjgHgRIAtAAQAaABAJAJQBOAkCOAYIDwAoQg+BBhYB9QgvAvgWAcQgjAugQAwQgPAnAFA7QAEA2AQAmQAOBRBSAwQAwAbBqAsIAAAyIh4AAIg8ABQhYAAg1gJg");
	this.shape_27.setTransform(153,134.7414);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#999CA0").s().p("AgqA0Qg0gWhcgxQhegzgxgVIAAgUQAgAQBpA3QBXAuA5AYQCtBJClgPQAVgMgpgiQgygoAAgXQAVgNAoABQAsABgFAfQgJgJgagBIgtAAQAHAQAtAjQAlAdABAnQgnAEgmAAQicAAiLg8g");
	this.shape_28.setTransform(199,105.133);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#999CA0").s().p("AgnBAQhFgfh5hdQA5AWB9BNQB+BBCDgPQgCgnhAhFQg2g8AUgfQAFAgAUAcQAKAMAfAgQA2A2AAA9QgYACgXAAQh6AAhkgvg");
	this.shape_29.setTransform(159.0002,118.0335);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#A19C9C").s().p("AqqI6Qh+hOg5gWQhJgfhYhjQhfhygvgvQhPhQhEgEQhVgEhfBtQAYhIgJhmQgRh1gIg6QG/kIIyh9QKDiPI3BmQC5B/CwDEQC4DPBzDbQARAiAsBOQAnBIARAxQAvCPhoA2QAAgWAngfQAigbgNgUQkKg0jXgJQksgMipBJIjwgoQiOgYhOgkQAGgfgtgBQgogBgUANQAAAYAxAoQApAigVAMQikAPiuhJQg5gYhXgvQhog3ghgQIAAAUQAHATAKAoQAKAiANARQgTAfA2A8QA/BGACAnQgYADgXAAQhqAAhog1g");
	this.shape_30.setTransform(222.5565,64.9477);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#EDAA5D").s().p("AjHDXQABgaAPgtQASgxAHgYQAZhWg4gnQAJgBAAgJQgBgJgIAAQBKhRBVgmQB1g0BTBHQgBA0ACAMQAFAgAYAEQg1EglQAAIgKAAg");
	this.shape_31.setTransform(335,251.3997);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#DDDDDD").s().p("AgbgcQBWAEBqAYQgzAQhtADQiCAFgnAGQgEhACNAGg");
	this.shape_32.setTransform(252.4931,201.9995);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.marcillac_tete, rect = new cjs.Rectangle(-1,2.7,388,403.2), [rect]);


(lib.MARCILLAC = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {pose:1,unpose:20,"anim":62};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(49));

	// bras
	this.instance = new lib.marcillac_bras();
	this.instance.setTransform(1138.9,845.9,1,1,0,0,0,24.4,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(68));

	// avt_bras
	this.instance_1 = new lib.marcillac_avt_bras();
	this.instance_1.setTransform(1187.8,1075.8,1,1,0,0,0,83.1,67.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(68));

	// maing
	this.instance_2 = new lib.marcillac_maing();
	this.instance_2.setTransform(1169.45,1206.2,1,1,0,0,0,64,37.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(68));

	// tete
	this.tete = new lib.marcillac_tete();
	this.tete.name = "tete";
	this.tete.setTransform(1002.05,763,1,1,0,0,0,191.5,400.4);

	this.timeline.addTween(cjs.Tween.get(this.tete).wait(68));

	// corps
	this.instance_3 = new lib.marcillac_corps();
	this.instance_3.setTransform(1023.5,946.1,1,1,0,0,0,159.5,341.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(68));

	// cuisse
	this.instance_4 = new lib.marcillac_cuisse();
	this.instance_4.setTransform(1065.6,1329.3,1,1,0,0,0,64,178);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(68));

	// mollet
	this.instance_5 = new lib.marcillac_mollet();
	this.instance_5.setTransform(1081.6,1515.75,1,1,0,0,0,80,146.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(68));

	// chaussure
	this.instance_6 = new lib.marcillac_chaussure();
	this.instance_6.setTransform(1016.35,1666.5,1,1,0,0,0,166.8,59.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(68));

	// cuisse
	this.instance_7 = new lib.marcillac_cuisse();
	this.instance_7.setTransform(956.25,1313.6,1,1,0,0,0,64,178);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(68));

	// mollet
	this.instance_8 = new lib.marcillac_mollet();
	this.instance_8.setTransform(972.25,1501.35,1,1,0,0,0,80,146.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(68));

	// bras
	this.instance_9 = new lib.marcillac_bras();
	this.instance_9.setTransform(940.3,856.5,1,1,0,0,180,45.5,18.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1).to({scaleX:0.9984,scaleY:0.9984,skewX:29.611,skewY:209.611,x:953.4,y:859.75},14).wait(26).to({scaleX:1,scaleY:1,skewX:0,skewY:180,x:940.3,y:856.5},18).wait(9));

	// avt_bras
	this.instance_10 = new lib.marcillac_avt_bras();
	this.instance_10.setTransform(907.15,1058.3,1,1,0,0,180,83,49.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regX:83.2,scaleX:0.9941,scaleY:0.9941,skewX:122.1535,skewY:302.1535,x:822.3,y:1039.2},14).wait(26).to({regX:83,scaleX:1,scaleY:1,skewX:0,skewY:180,x:907.15,y:1058.3},18).wait(9));

	// maind
	this.instance_11 = new lib.marcillac_maind();
	this.instance_11.setTransform(925,1160.5,1,1,0,0,0,50.5,24.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1).to({regX:22.6,regY:-90.7,x:897.1,y:1044.9},0).to({regX:22.9,regY:-92.9,scaleX:0.9941,scaleY:0.9941,rotation:122.1535,x:814.4,y:1015.2},14).wait(5).to({scaleX:0.9939,scaleY:0.9939,rotation:125.4439,x:812.5,y:1018.95},10).to({scaleX:0.9936,scaleY:0.9936,rotation:118.9371,x:812.55},10).wait(1).to({regX:22.6,regY:-90.7,scaleX:1,scaleY:1,rotation:0,x:897.1,y:1044.9},18).wait(9));

	// chaussure
	this.instance_12 = new lib.marcillac_chaussure();
	this.instance_12.setTransform(938.5,1645.45,1,1,0,0,0,166.8,59.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(68));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(773.7,365.3,459.6,1358.6);
p.frameBounds = [rect, rect, rect, rect, new cjs.Rectangle(762.6,365.3,470.7,1358.6), new cjs.Rectangle(726.3,365.3,507,1358.6), new cjs.Rectangle(692.2,365.3,541.1,1358.6), new cjs.Rectangle(660.9,365.3,572.4,1358.6), new cjs.Rectangle(633.2,365.3,600.1,1358.6), new cjs.Rectangle(609.7,365.3,623.6,1358.6), new cjs.Rectangle(590.4,365.3,642.9,1358.6), new cjs.Rectangle(576,365.3,657.3,1358.6), new cjs.Rectangle(567.3,365.3,666,1358.6), new cjs.Rectangle(564.2,365.3,669.1,1358.6), new cjs.Rectangle(564,365.3,669.3,1358.6), rect=new cjs.Rectangle(549.2,365.3,684.1,1358.6), rect, rect, rect, rect, rect, new cjs.Rectangle(568.4,365.3,664.9,1358.6), new cjs.Rectangle(568.8,365.3,664.5,1358.6), new cjs.Rectangle(569.2,365.3,664.1,1358.6), new cjs.Rectangle(569.6,365.3,663.7,1358.6), new cjs.Rectangle(569.9,365.3,663.4,1358.6), new cjs.Rectangle(570.3,365.3,663,1358.6), new cjs.Rectangle(570.7,365.3,662.6,1358.6), new cjs.Rectangle(571.2,365.3,662.1,1358.6), new cjs.Rectangle(571.6,365.3,661.7,1358.6), new cjs.Rectangle(552.2,365.3,681.1,1358.6), new cjs.Rectangle(570.8,365.3,662.5,1358.6), new cjs.Rectangle(569.6,365.3,663.7,1358.6), new cjs.Rectangle(568.5,365.3,664.8,1358.6), new cjs.Rectangle(567.4,365.3,665.9,1358.6), new cjs.Rectangle(566.3,365.3,667,1358.6), new cjs.Rectangle(565.2,365.3,668.1,1358.6), new cjs.Rectangle(564.3,365.3,669,1358.6), new cjs.Rectangle(563.2,365.3,670.1,1358.6), new cjs.Rectangle(562.2,365.3,671.1,1358.6), rect=new cjs.Rectangle(543.6,365.3,689.7,1358.6), rect, new cjs.Rectangle(558.2,365.3,675.1,1358.6), new cjs.Rectangle(558.4,365.3,674.9,1358.6), new cjs.Rectangle(560.5,365.3,672.8,1358.6), new cjs.Rectangle(564.9,365.3,668.4,1358.6), new cjs.Rectangle(572.8,365.3,660.5,1358.6), new cjs.Rectangle(584.1,365.3,649.2,1358.6), new cjs.Rectangle(598.2,365.3,635.1,1358.6), new cjs.Rectangle(614.9,365.3,618.4,1358.6), new cjs.Rectangle(634.1,365.3,599.2,1358.6), new cjs.Rectangle(655.5,365.3,577.8,1358.6), new cjs.Rectangle(679.1,365.3,554.2,1358.6), new cjs.Rectangle(704.5,365.3,528.8,1358.6), new cjs.Rectangle(731.3,365.3,502,1358.6), new cjs.Rectangle(759.3,365.3,474,1358.6), rect=new cjs.Rectangle(773.7,365.3,459.6,1358.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.tete_gd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mouthTalk
	this.mouthTalk = new lib.bouche_gd();
	this.mouthTalk.name = "mouthTalk";
	this.mouthTalk.setTransform(129.8,456.2,4.1985,4.1985,0,0,0,16.1,32);

	this.timeline.addTween(cjs.Tween.get(this.mouthTalk).wait(1));

	// yeux
	this.instance = new lib.yeux_enrique_move();
	this.instance.setTransform(174.45,304.7,4.1863,4.1863,0,0,0,11.8,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// nez
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCB8D").s().p("ABSGlQhug1hPABQgjAFg+AUQhCAVgfAGQgQgrAHgwQAcgJB0geQAggJAigWQAVgOAmgfIA5gwQAhgdASgaQAbgmAfgzIA0haQAthVAVh2QANhGALiPIAmANQAJARgBAXQgBAJgGAgIhFK+QgCAcgRAjIgfA6QgMAcgdAWQgWgtgqgSg");
	this.shape.setTransform(127.8973,368.3507,0.9514,0.9514);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E9A85A").s().p("Ah+IGQgmgMgogfQgRgNgzgwQgPgNgPgbIgYgsQABgkAGgVQAIggAUgSQAcggAwABQASABAbgKQAhgNAKgCQAdgGAfgaIAxgwIAqgiQAagUAMgTQAHgLAYgaQAVgXAIgQQAMgWAog/QAhg0APgiQAQghAOgzIAWhVQAHgUAEgvQAFgsAIgXIAdgKQgLCOgNBHQgVB1gtBVIg1BcQgeAygbAlQgTAbggAdIg6AwQglAfgVANQgjAXggAIQhzAegcAJQgHAwAQArQAfgFBCgVQA+gVAjgEQBNgBBvA0QArATAVAsIAEAHQgNASgWApQgXAhgdAIQgtASg3AAQhCAAhSgcg");
	this.shape_1.setTransform(122.2382,374.3141,0.9514,0.9514);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// tetebg
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E6A455").s().p("AlCCQQgOgbANggQALgcAZgWQASgQAfgoQAdgnAVgQQApgfAegRQAogYAmgKIBGgUQAsgNAbgFQApgJAqADQAqACAmAPQAYAOAQAeQANAWALAiQAGAxgdAtQgaAngtAeIg3ApQghAZgcAGQgbAHgwASQgxAUgZAGQgeAEgxgBIhQAAIgFAAQg/AAhBg8g");
	this.shape_2.setTransform(296.1683,352.8071,0.8571,0.8571);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCB8D").s().p("AhlHEIh9gEQhHgHgxgXIhGghQgpgVgVgYQgjgogagzQgdhQAWhZQAVhUA7hDQBdhpBCg3IBJgzQArgbAmgJQAfgUA9gYQBDgbAZgOQAZgOAvgHQA4gJASgGQAdgJA3ABQA5ABAagGQAQAJA1APQAsANAVASQAVAMASAcIAdAvQAAAXAKA9QgCAJgGA6QgFApgLAZQgGA3gVAvIgPASIgEAVQg8Bbg/BFIhNA7QgtAjgaAdQhbA6g9AUQg1AWgaAJQgqANgjAAIgIgBg");
	this.shape_3.setTransform(298.0535,351.8342,0.8571,0.8571);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E8A95C").s().p("At5SdQhdgBhDgMQiwgrhlhQQgdgXgOgwIgShVIAGADQBcAqA/ARQBZAZBLgJQAugFBLgFIB5gIQAzgFBFgRIB2gdQBMgSBpgeICzg1QAzgPBDgdIBxg2IGNi4QA1gZBNg1QBqhHAVgNQBWgzAthEIBKhiQAtg7ASguQAvh1AXg8QAmhqAJhPQAEgiAQhbQAOhOAEgvIAFhnQAEg+AVgmQAQgfAng1QAog4APgcQAcgtASg7QAOguANhBQAZAEAyAEIAOgVQgdC9hGB5QgKAWgzBHQgoA4gIAqQgQCkAKCQQgFA5ABBnQAABwgCAxQgiDNhxEBQgiBXg8A6Qh6BuivBVQhUAyh5A5IjSBfQjWBMi9AzIh3AiQhHATgzAIQhwAUglAFQhVANhCgBQhZACg0AAIgTAAg");
	this.shape_4.setTransform(126.65,454.5792);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E8A95C").s().p("AigCDQAAhFACgiQADg4AKguQADgVAVgPQAPgJAbgIQCDggBrAqIACBeQABA3gFAmQgGAdgVAVQgWAWgcAAIgvAAQhdAAhkgLg");
	this.shape_5.setTransform(128.6273,310.3478);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E8A95C").s().p("AkJCSQgSgEgfgLQgFg0AWhBIAshvQARgqAcgDQBBgLBQAHQA7AGBTATQBSARBkA+QApAYALAyQAMA0gdAmQgIAMgTAEIggADQgqACi4gCQiKAAhXAIIgPABQgRAAgTgEg");
	this.shape_6.setTransform(185.9949,303.362);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FECB8D").s().p("EgTrAgDQg/gRhcgqQgEgqAKg7QAPhCAEghQAgiGAthYIA6hsQAjhBAUgtQBAiCBGhpQAthJBghuQBwh/AkgzQAWgfAzgzQA1g0AVgdQAPgWAtgrQAqgnAQgdQCzjtBel4QALhMADhcQABhEgChlQgBgygNjqQgKitAKhvQAHhUBBhoQA8hwBhhrQBPhZB0hhQAagUBAhCQA3g4AogYQAigaA1gZQAegOA9gaQAcgOA1ghQAvgbAlgKQAYgHAxgQQAvgQAZgHQBZgRCBgNQB8AHBRAkQAoAeAlA2QANATAuBPQhGAJhIAvQgvAfhHBDQghAeglAzQgqA6gVAcQhLBjghBJQg0B0gXA9QglBkgPBVQgSBogDAmQgGBQARA+IAMAYQAKAMAMgFQAVgTAiguQAhgtAXgTQBkhVByguQg5B3gLAcQgjBVgHBHQgMBVAaBrQAIAhAwCZQATBAArAwQAuA0A8AUQgNBCgOAsQgTA7gbAuQgPAbgpA4QgmA1gRAfQgUAngEA9IgFBoQgFAugNBPQgQBbgEAiQgJBPgnBpQgWA8gvB3QgTAtgsA7IhKBjQgtBEhWAzQgVANhqBHQhNA0g2AaImLC4IhyA1QhDAegzAPIizA0QhpAehMASIh2AeQhGARgyAEIh5AJQhMAEgtAFQgVADgVAAQg6AAhAgSg");
	this.shape_7.setTransform(129.9948,344.6209);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C18A3C").s().p("AK+a3Qg9gVgtgzQgrgxgUhAQgwiZgIggQgZhsALhVQAIhHAihVQAMgbA5h4QhyAuhlBVQgWATgiAtQgiAvgUASQgNAFgJgMIgNgYQgRg9AHhRQADglAShpQAOhVAmhjQAXg+A0h0QAghJBLhjQAWgcApg6QAmgzAggdQBHhDAwgfQBHgvBGgIQguhQgNgTQgkg2gogeQhSgkh8gGQiAANhaARQgZAGgvAQQgxARgXAGQglAKgwAbQg1AhgaAOQg+AbgeAOQg1AYgiAaQgoAZg2A2QhBBCgZAUQh0BhhQBZQhiBsg8BvIhehAQg0gogdgoQiMiQhXjbQgViQgNhKQgCgLAEgPQAFgSABgJQAcALArAqQApAqAdALQBDAqBqAeQA9ASB5AgQgBgiggggQgngigPgUQh3iQhBhmIglg2QgXgfgLgYQgOgggjg3Qgkg5gOgbQgPgdgWgyIgkhOQgshOgjhqQgUg+giiEIgQhTQgJgygJghQgNgmAAhGQgBhPgHgfQgGgiAEgpQACgeAKgtIBQgBQAuABAgAMQAbAKA3AQQAwAQAeARQB0AtBSAmQBqAxBUAyQAqARA0AhIBaA5QAdAPBCAoQA8AmAkAPQAiAPApAdQAXASAtAkQB7BYBPBQQAJAJAPAGIAcAJQgCglgTguIgjhPIg8iJQgjhSgigxQgfg6gPgZQgbgsgegeQgwgugeg3QBoAKBnAoIBxAiQBAAVAuAWQAhAOAyAmQA4AoAaANQAlAaBMAyQBDAvAoAmQAcAZA8AwQA0ArAaAmQAvBDAhAhQAbAlAeA5IAzBiIAxBjQAdA8AMAqIAYACQAHhdgDg3QgEhSgbg+QgLgPAPgQQAQgQANAQQBZBxA9BrQAQAsA4B8QAIAiAeBPQAcBIAHArQAGAgAUBBQAMA5gVAlQgwApgpBKIhDCBQgLAdggBAQgdA7gMAiQgTAmgUBFQgWBPgNAdQgQAmgSBSQgTBRgRAnQgQA7gkB0QgcBogGBMQgGA+gWBhIgiCdQgBA3gNBVQgSB3gCATIgPAWQgygFgYgDg");
	this.shape_8.setTransform(186.4137,165.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tete_gd, rect = new cjs.Rectangle(-12.2,-6.7,358,579.5), [rect]);


(lib.colette_tete = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 3
	this.instance = new lib.colette_sourcilgauche();
	this.instance.setTransform(-111.65,-20.45);
	this.instance.cache(-16,-14,32,28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 4
	this.instance_1 = new lib.colette_sourcildroit();
	this.instance_1.setTransform(-41,-21.05);
	this.instance_1.cache(-15,-13,31,26);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// mouthTalk
	this.mouthTalk = new lib.colette_mouthTalk();
	this.mouthTalk.name = "mouthTalk";
	this.mouthTalk.setTransform(-61.9,106.1,1,1,0,0,0,44,14.8);

	this.timeline.addTween(cjs.Tween.get(this.mouthTalk).wait(1));

	// Layer 7
	this.instance_2 = new lib.colette_yeux();
	this.instance_2.setTransform(-56.75,22.55,1,1,0,0,0,87,30.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer 8
	this.instance_3 = new lib.colette_tetebg();
	this.instance_3.setTransform(-0.05,0.05);
	this.instance_3.cache(-177,-175,355,349);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colette_tete, rect = new cjs.Rectangle(-175.2,-172.5,350.5,345.2), [rect]);


(lib.COLETTE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"anim":1};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(28));

	// Layer 4
	this.ikNode_10 = new lib.colette_brasdroit();
	this.ikNode_10.name = "ikNode_10";
	this.ikNode_10.setTransform(91.7,241.75,0.9774,0.9774,35.1055,0,0,5.2,-54.2);
	this.ikNode_10.cache(-41,-81,83,163);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_10).wait(28));

	// Layer 6
	this.ikNode_11 = new lib.colette_maindroite();
	this.ikNode_11.name = "ikNode_11";
	this.ikNode_11.setTransform(20.95,325.75,0.9824,0.9824,28.8469,0,0,-11.2,-29);
	this.ikNode_11.cache(-38,-48,76,96);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_11).wait(28));

	// Layer 8
	this.ikNode_16 = new lib.colette_jambedroite();
	this.ikNode_16.name = "ikNode_16";
	this.ikNode_16.setTransform(-54.2,589.8,0.9892,0.9892,-15.3249,0,0,9.2,-67.8);
	this.ikNode_16.cache(-48,-97,96,194);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_16).wait(28));

	// Layer 9
	this.ikNode_9 = new lib.colette_epauledroite();
	this.ikNode_9.name = "ikNode_9";
	this.ikNode_9.setTransform(19.45,146.8,0.9839,0.9079,-31.3175,0,0,-2.9,-79.7);
	this.ikNode_9.cache(-42,-109,85,202);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_9).wait(28));

	// Layer 11
	this.ikNode_2 = new lib.colette_corps();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(-89.05,419.1,0.9985,0.9985,-2.0608,0,0,-43.6,144.8);
	this.ikNode_2.cache(-114,-187,228,380);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_2).wait(28));

	// Layer 12
	this.ikNode_14 = new lib.colette_cuissedroite();
	this.ikNode_14.name = "ikNode_14";
	this.ikNode_14.setTransform(-8.6,449.25,0.9912,0.9912,16.3927,0,0,14,-57.2);
	this.ikNode_14.cache(-67,-141,135,282);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_14).wait(28));

	// Layer 13
	this.ikNode_15 = new lib.colette_cuissegauche();
	this.ikNode_15.name = "ikNode_15";
	this.ikNode_15.setTransform(-127.1,448.9,0.9898,0.9898,4.2869,0,0,-31.9,-41.4);
	this.ikNode_15.cache(-67,-141,135,284);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_15).wait(28));

	// Layer 14
	this.ikNode_17 = new lib.colette_chaussuredroite();
	this.ikNode_17.name = "ikNode_17";
	this.ikNode_17.setTransform(-14.05,734.1,0.9944,0.9944,-4.5195,0,0,16.9,-27.9);
	this.ikNode_17.cache(-60,-71,120,143);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_17).wait(28));

	// Layer 15
	this.ikNode_18 = new lib.colette_jambegauche();
	this.ikNode_18.name = "ikNode_18";
	this.ikNode_18.setTransform(-116.15,581.1,0.9935,0.9935,-5.0426,0,0,-15.1,-71.2);
	this.ikNode_18.cache(-48,-97,95,194);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_18).wait(28));

	// Layer 16
	this.ikNode_19 = new lib.colette_chaussuregauche();
	this.ikNode_19.name = "ikNode_19";
	this.ikNode_19.setTransform(-98.25,734.25,0.9926,0.9926,0.0335,0,0,-0.2,-28.1);
	this.ikNode_19.cache(-60,-71,120,143);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_19).wait(28));

	// Layer 22
	this.ikNode_7 = new lib.colette_brasgauche();
	this.ikNode_7.name = "ikNode_7";
	this.ikNode_7.setTransform(-158.35,273.8,0.9818,0.9818,-22.823,0,0,9,-53);
	this.ikNode_7.cache(-48,-80,96,160);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_7).wait(28));

	// tete
	this.tete = new lib.colette_tete();
	this.tete.name = "tete";
	this.tete.setTransform(-43.25,102.15,0.9948,0.9948,0.0079,0,0,27.2,158.8);

	this.timeline.addTween(cjs.Tween.get(this.tete).wait(1).to({rotation:-4.9874,y:102.2},6).to({rotation:0.0079,y:102.15},6).to({rotation:-4.9874,y:102.2},8).to({rotation:0.0079,y:102.15},6).wait(1));

	// Layer 24
	this.ikNode_6 = new lib.colette_epaulegauche();
	this.ikNode_6.name = "ikNode_6";
	this.ikNode_6.setTransform(-122.95,147.2,0.9854,0.9854,2.0127,0,0,4.8,-69.9);
	this.ikNode_6.cache(-52,-95,109,195);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_6).wait(28));

	// Layer 29
	this.ikNode_8 = new lib.colette_maingauche();
	this.ikNode_8.name = "ikNode_8";
	this.ikNode_8.setTransform(-124,376.95,0.9887,0.9887,-14.5649,0,0,-12.6,-20.6);
	this.ikNode_8.cache(-38,-48,76,96);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_8).wait(28));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-244.6,-227.5,381.5,1063.5);
p.frameBounds = [rect, rect, new cjs.Rectangle(-246.9,-226.5,383.9,1062.5), new cjs.Rectangle(-249.2,-225.5,386.2,1061.5), new cjs.Rectangle(-251.6,-224.4,388.5,1060.4), new cjs.Rectangle(-253.9,-223.3,390.9,1059.3), new cjs.Rectangle(-256.2,-222.2,393.2,1058.2), new cjs.Rectangle(-272.5,-238.9,409.5,1074.9), new cjs.Rectangle(-256.1,-222.1,393.1,1058.1), new cjs.Rectangle(-253.9,-223.2,390.9,1059.2), new cjs.Rectangle(-251.5,-224.4,388.5,1060.4), new cjs.Rectangle(-249.2,-225.4,386.2,1061.4), new cjs.Rectangle(-246.8,-226.4,383.8,1062.4), new cjs.Rectangle(-244.6,-227.5,381.5,1063.5), new cjs.Rectangle(-246.4,-226.7,383.4,1062.7), new cjs.Rectangle(-248.1,-226,385,1062), new cjs.Rectangle(-249.8,-225.2,386.8,1061.2), new cjs.Rectangle(-251.6,-224.4,388.5,1060.4), new cjs.Rectangle(-253.4,-223.6,390.4,1059.6), new cjs.Rectangle(-255.1,-222.7,392,1058.7), new cjs.Rectangle(-256.8,-221.9,393.8,1057.9), new cjs.Rectangle(-272.5,-238.9,409.5,1074.9), new cjs.Rectangle(-256.1,-222.1,393.1,1058.1), new cjs.Rectangle(-253.9,-223.2,390.9,1059.2), new cjs.Rectangle(-251.5,-224.4,388.5,1060.4), new cjs.Rectangle(-249.2,-225.4,386.2,1061.4), new cjs.Rectangle(-246.8,-226.4,383.8,1062.4), new cjs.Rectangle(-244.6,-227.5,381.5,1063.5)];


(lib.mc_aide = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// progression
	this.progression = new lib.aide_progression();
	this.progression.name = "progression";
	this.progression.setTransform(959.55,1055,1,1,0,0,0,97.5,10);

	this.timeline.addTween(cjs.Tween.get(this.progression).wait(1));

	// bt_menu_off
	this.bt_menu_off = new lib.bt_menu_off();
	this.bt_menu_off.name = "bt_menu_off";
	this.bt_menu_off.setTransform(30.6,27.85);
	new cjs.ButtonHelper(this.bt_menu_off, 0, 1, 2, false, new lib.bt_menu_off(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bt_menu_off).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BLAMAAAiV/MEr/AAAMAAACV/g");
	mask.setTransform(959.9946,479.9857);

	// textes
	this.textes = new lib.mc_aide_textes();
	this.textes.name = "textes";
	this.textes.setTransform(975.9,543.65,1,1,0,0,0,913.5,411.7);

	var maskedShapeInstanceList = [this.textes];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.textes).wait(1));

	// marcillac
	this.marcillac = new lib.MARCILLAC();
	this.marcillac.name = "marcillac";
	this.marcillac.setTransform(545.05,484.7,0.6107,0.6107,0,0,180,1003.5,1044.6);

	var maskedShapeInstanceList = [this.marcillac];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.marcillac).wait(1));

	// ombre
	this.ombre = new lib.mc_aide_ombre();
	this.ombre.name = "ombre";
	this.ombre.setTransform(545,886.4,1,1,0,0,0,271.9,50.2);

	var maskedShapeInstanceList = [this.ombre];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.ombre).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAEAEA").s().p("EiXlBWRMAAAisiMEvLAAAMAAACsig");
	this.shape.setTransform(959.9946,479.9857,0.9895,0.8693);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_aide, rect = new cjs.Rectangle(0,0,1920,1065), [rect]);


(lib.QUIZFINAL_part3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// marcillac
	this.marcillac = new lib.MARCILLAC();
	this.marcillac.name = "marcillac";
	this.marcillac.setTransform(584.2,715,1.14,1.14,0,0,180,782.2,893.1);

	this.timeline.addTween(cjs.Tween.get(this.marcillac).wait(1));

	// valider
	this.valider = new lib.QUIZFINAL_part3_valider();
	this.valider.name = "valider";
	this.valider.setTransform(1079.75,944.3,0.8114,0.8114,0,0,0,422.5,66.9);

	this.timeline.addTween(cjs.Tween.get(this.valider).wait(1));

	// livret
	this.livret = new lib.QUIZFINAL_part3_livret();
	this.livret.name = "livret";
	this.livret.setTransform(1079.05,595.1,0.573,0.573,0,0,0,286.1,80.5);

	this.timeline.addTween(cjs.Tween.get(this.livret).wait(1));

	// attestation
	this.attestation = new lib.QUIZFINAL_part3_imprimer();
	this.attestation.name = "attestation";
	this.attestation.setTransform(1080.25,726.1,0.573,0.573,0,0,0,288.2,70);

	this.timeline.addTween(cjs.Tween.get(this.attestation).wait(1));

	// reponses
	this.reponses = new lib.QUIZFINAL_telecharger();
	this.reponses.name = "reponses";
	this.reponses.setTransform(1079.7,545.8,0.5733,0.5733,0,0,0,667.6,77);

	this.timeline.addTween(cjs.Tween.get(this.reponses).wait(1));

	// feedbackright
	this.feedbackright = new lib.QUIZFINAL_part3_feedbackright();
	this.feedbackright.name = "feedbackright";
	this.feedbackright.setTransform(1133.25,440.9,0.7865,0.7865,0,0,0,352.1,37.4);

	this.timeline.addTween(cjs.Tween.get(this.feedbackright).wait(1));

	// Votre score :
	this.champ_yourscore = new cjs.Text("Votre score :", "45px 'Raleway'", "#FFFFFF");
	this.champ_yourscore.name = "champ_yourscore";
	this.champ_yourscore.textAlign = "center";
	this.champ_yourscore.lineHeight = 52;
	this.champ_yourscore.lineWidth = 1430;
	this.champ_yourscore.parent = this;
	this.champ_yourscore.setTransform(1052,92.7,0.7865,0.7865);

	this.timeline.addTween(cjs.Tween.get(this.champ_yourscore).wait(1));

	// score
	this.score = new cjs.Text("100%", "bold 96px 'Raleway ExtraBold'", "#FFFFFF");
	this.score.name = "score";
	this.score.textAlign = "center";
	this.score.lineHeight = 112;
	this.score.lineWidth = 329;
	this.score.parent = this;
	this.score.setTransform(1065.55,146.95,2.4757,2.4757);

	this.timeline.addTween(cjs.Tween.get(this.score).wait(1));

	// bg
	this.instance = new lib.prologue_bg_zoom();
	this.instance.setTransform(29,71,1.5,1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part3, rect = new cjs.Rectangle(29,71,1920,1591.1), [rect]);


(lib.QUIZFINAL_part1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bt_continue
	this.bt_continue = new lib.bt_continue();
	this.bt_continue.name = "bt_continue";
	this.bt_continue.setTransform(1051,746.8,1,1,0,0,0,70.7,70.5);
	new cjs.ButtonHelper(this.bt_continue, 0, 1, 2, false, new lib.bt_continue(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bt_continue).wait(1));

	// textes
	this.consigne = new cjs.Text("Vous devez obtenir XXX% de bonnes réponses pour valider vos connaissances. ", "10px 'Raleway'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.textAlign = "center";
	this.consigne.lineHeight = 11;
	this.consigne.lineWidth = 124;
	this.consigne.parent = this;
	this.consigne.setTransform(1050.1903,484.55,4.9265,4.9265);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AklFnIAAg/IHkpIInYAAIAAhGII/AAIAAA/InjJIIHhAAIAABGg");
	this.shape.setTransform(1158.35,422.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AguH3IAArNIBdAAIAALNgAgulsIAAiLIBdAAIAACLg");
	this.shape_1.setTransform(1109.7,407.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AkKEgQg5hOAAiaIAAmlIBfAAIAAGUQgBD1CnAAQAqAAAmgOQApgOAhgaQAigaAbgkQAbglARgsIAAnEIBdAAIAAJVQABAmAgAAIAABSIgaADIgPAAQghgBgVgWQgUgWgBgmIAAhTQguBVhRAuQhQAuhbAAQh1AAg6hOg");
	this.shape_2.setTransform(1054.85,423.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ai6HGQhUgrg+hFQg8hEghhbQghhZAAheQAAhhAjhaQAjhZA+hFQA+hFBVgpQBUgoBgAAQBnAABVArQBUAsA8BGQA8BGAhBZQAhBZAABbQAABlgkBbQglBbhBBFIB0CJIhfAAIhLhXQg4AshDAZQhDAYhNAAQhlAAhVgqgAiVl1QhEAjgvA6QgvA5gZBLQgaBJAABLQAABQAaBKQAbBKAwA5QAxA5BCAiQBCAiBQAAQA+AAA1gUQA0gUAsgiIh7iTIBfAAIBPBeQAxg6AahKQAahJAAhOQAAhPgbhJQgbhLgwg4Qgxg5hCgiQhCgihQAAQhSAAhDAjg");
	this.shape_3.setTransform(961.375,409.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.consigne}]}).wait(1));

	// bg et marcillac
	this.instance = new lib.MARCILLAC();
	this.instance.setTransform(624.4,715,1.14,1.14,0,0,180,782.2,893.1);

	this.instance_1 = new lib.prologue_bg_zoom();
	this.instance_1.setTransform(8,62,1.5377,1.5377);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL_part1, rect = new cjs.Rectangle(8,62,1968.3,1600.1), [rect]);


(lib.QUIZFINAL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960,540);

	// part4
	this.part4 = new lib.QUIZFINAL_part4();
	this.part4.name = "part4";
	this.part4.setTransform(861.3,1044.5,1,1,0,0,0,1429.3,1044.5);

	var maskedShapeInstanceList = [this.part4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.part4).wait(1));

	// part3
	this.part3 = new lib.QUIZFINAL_part3();
	this.part3.name = "part3";
	this.part3.setTransform(960.1,651.8,1,1,0,0,0,989.1,722.8);

	var maskedShapeInstanceList = [this.part3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.part3).wait(1));

	// part1
	this.part1 = new lib.QUIZFINAL_part1();
	this.part1.name = "part1";
	this.part1.setTransform(960.1,651.8,1,1,0,0,0,989.1,722.8);

	var maskedShapeInstanceList = [this.part1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.part1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZFINAL, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.NINA = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"anim":68};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(79));

	// avant_brasD
	this.instance = new lib.avantbrasgauche();
	this.instance.setTransform(122.35,123.7,0.9964,0.9964,61.6845,0,0,5.5,-13.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({regY:-13.3,scaleX:0.9963,scaleY:0.9963,rotation:86.4632,x:98.8,y:130.2},8).wait(4).to({rotation:101.4621},9).to({rotation:86.4632},10).to({rotation:101.4621},16).to({regY:-13.2,scaleX:0.9964,scaleY:0.9964,rotation:61.6845,x:122.35,y:123.7},14).wait(12));

	// main_lunettes
	this.main_lunettes = new lib.main_nina();
	this.main_lunettes.name = "main_lunettes";
	this.main_lunettes.setTransform(94.5,130.9,0.7249,0.7249,60.17,0,0,10.9,5.3);

	this.timeline.addTween(cjs.Tween.get(this.main_lunettes).wait(6).to({regX:11,regY:5.2,rotation:114.1085,x:71,y:125},8).wait(4).to({regX:10.9,scaleY:0.7248,rotation:129.1074,x:72.35,y:117.55},9).to({regX:11,scaleY:0.7249,rotation:114.1085,x:71,y:125},10).to({regX:10.9,scaleY:0.7248,rotation:129.1074,x:72.35,y:117.55},16).to({regY:5.3,scaleY:0.7249,rotation:60.17,x:94.5,y:130.9},14).wait(12));

	// brasD_lunettes
	this.brasD_lunettes = new lib.brasD_nina();
	this.brasD_lunettes.name = "brasD_lunettes";
	this.brasD_lunettes.setTransform(99.1,98.75,0.9916,0.9916,-50.9909,0,0,16.9,5.3);

	this.timeline.addTween(cjs.Tween.get(this.brasD_lunettes).wait(6).to({rotation:4.9771,x:102.45,y:96.35},8).wait(39).to({rotation:-50.9909,x:99.1,y:98.75},14).wait(12));

	// corps
	this.corps_lunettes = new lib.corps_nina();
	this.corps_lunettes.name = "corps_lunettes";
	this.corps_lunettes.setTransform(82.45,170.2,0.7157,0.7158,1.0884,0,0,39.5,118.8);

	this.timeline.addTween(cjs.Tween.get(this.corps_lunettes).wait(79));

	// TETE
	this.tete = new lib.tete_nina();
	this.tete.name = "tete";
	this.tete.setTransform(90.5,87.75,0.7476,0.7477,-4.8399,0,0,69.2,99.8);

	this.timeline.addTween(cjs.Tween.get(this.tete).wait(1).to({regX:69.4,rotation:-3.0593,x:90.65},8).wait(5).to({rotation:-0.3543},9).wait(7).to({rotation:-0.3543},0).to({regY:99.9,scaleY:0.7476,rotation:-3.0582,y:87.85},8).wait(10).to({regY:99.8,scaleY:0.7477,rotation:-0.3543,y:87.75},10).to({regX:69.2,rotation:-4.8399,x:90.5},9).wait(12));

	// piedD
	this.mollet_lunettes = new lib.mollet_nina();
	this.mollet_lunettes.name = "mollet_lunettes";
	this.mollet_lunettes.setTransform(84.2,181.75,0.7292,0.7291,-16.4303,0,0,15.7,0.1);

	this.timeline.addTween(cjs.Tween.get(this.mollet_lunettes).wait(79));

	// jambesD_lunettes
	this.instance_1 = new lib.pied_nina();
	this.instance_1.setTransform(91.7,217.3,0.8056,0.8056,-0.3972,0,0,16.9,9.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(79));

	// molletG
	this.jambesD_lunettes = new lib.jambeD_nina();
	this.jambesD_lunettes.name = "jambesD_lunettes";
	this.jambesD_lunettes.setTransform(87.75,154.4,0.9985,0.9985,-2.1869,0,0,16.4,13.6);

	this.timeline.addTween(cjs.Tween.get(this.jambesD_lunettes).wait(79));

	// piedG
	this.mollet_lunettes_1 = new lib.mollet_nina();
	this.mollet_lunettes_1.name = "mollet_lunettes_1";
	this.mollet_lunettes_1.setTransform(64.2,177.8,0.728,0.7281,-5.8848,0,0,15.6,0.3);

	this.timeline.addTween(cjs.Tween.get(this.mollet_lunettes_1).wait(79));

	// jambeG_lunettes
	this.instance_2 = new lib.pied_nina();
	this.instance_2.setTransform(71.2,212.95,0.7398,0.7397,0.9834,0,0,22.9,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(79));

	// avant_brasG
	this.jambeG_lunettes = new lib.jambeG_nina();
	this.jambeG_lunettes.name = "jambeG_lunettes";
	this.jambeG_lunettes.setTransform(65.55,154.8,0.9965,0.9965,12.2266,0,0,4.7,15.1);

	this.timeline.addTween(cjs.Tween.get(this.jambeG_lunettes).wait(79));

	// main2_lunettes
	this.avantbras_lunettes = new lib.av_bras_nina();
	this.avantbras_lunettes.name = "avantbras_lunettes";
	this.avantbras_lunettes.setTransform(61.9,126.35,0.5707,0.5643,14.4762,0,0,13.3,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.avantbras_lunettes).wait(1).to({regX:13.4,rotation:123.987,x:61.85,y:126.4},10).to({regY:-0.2,rotation:93.9865},7).to({regY:-0.1,rotation:123.987},7).wait(10).to({regY:-0.2,rotation:93.9865},8).to({regY:-0.1,rotation:123.987},10).to({regX:13.3,rotation:14.4762,x:61.9,y:126.35},14).wait(12));

	// brasG_lunettes
	this.main2_lunettes = new lib.main_nina();
	this.main2_lunettes.name = "main2_lunettes";
	this.main2_lunettes.setTransform(52.95,149.9,0.6274,0.6273,11.4362,0,0,8.1,8.1);

	this.timeline.addTween(cjs.Tween.get(this.main2_lunettes).wait(1).to({regX:8.2,scaleX:0.6267,scaleY:0.6267,rotation:71.4662,x:37.55,y:135.1},5).to({regX:8.1,regY:8,scaleX:0.6274,scaleY:0.6273,rotation:131.4363,x:42.7,y:109.95},5).to({regY:7.9,scaleX:0.6273,rotation:101.4368,x:36.15,y:122.4},7).to({regY:8,scaleX:0.6274,rotation:131.4363,x:42.7,y:109.95},7).wait(10).to({regY:7.9,scaleX:0.6265,scaleY:0.6265,rotation:116.3341,x:37.85,y:116.25},4).to({regX:8.2,scaleX:0.6273,scaleY:0.6273,rotation:86.4383,x:36.15,y:122.45},4).to({regX:8.1,regY:8,scaleX:0.6274,rotation:131.4363,x:42.7,y:109.95},10).to({regX:8.2,scaleX:0.627,scaleY:0.627,rotation:80.1839,x:35.7,y:130.9},6).to({regX:8.1,regY:8.1,scaleX:0.6274,scaleY:0.6273,rotation:11.4362,x:52.95,y:149.9},8).wait(12));

	// brasG_lunettes
	this.brasG_lunettes = new lib.brasG_nina();
	this.brasG_lunettes.name = "brasG_lunettes";
	this.brasG_lunettes.setTransform(64.75,103.9,0.8768,0.8768,4.3097,0,0,15,7.4);

	this.timeline.addTween(cjs.Tween.get(this.brasG_lunettes).wait(79));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(32.7,10.1,100.4,233.9);
p.frameBounds = [rect, rect, new cjs.Rectangle(39.6,12.7,93.5,231.2), new cjs.Rectangle(37.1,12.8,96,231.2), new cjs.Rectangle(32.6,12.8,100.5,231.2), new cjs.Rectangle(28.4,12.8,104.7,231.1), new cjs.Rectangle(24.1,12.8,109,231.1), new cjs.Rectangle(26,12.9,104.7,231.1), new cjs.Rectangle(26.9,12.8,103.7,231.1), new cjs.Rectangle(28.3,11.2,102.9,232.8), new cjs.Rectangle(29.8,11.2,101.4,232.8), new cjs.Rectangle(27.5,11.2,103.6,232.8), new cjs.Rectangle(30.1,11.2,101,232.8), new cjs.Rectangle(29,11.2,102.1,232.8), new cjs.Rectangle(28,11.2,103.1,232.8), new cjs.Rectangle(27,12.9,103.6,231.1), new cjs.Rectangle(25.9,13,104.7,231), new cjs.Rectangle(24.7,12.9,105.7,231), new cjs.Rectangle(22.1,13,108.4,231), new cjs.Rectangle(24.6,13,105.8,230.9), new cjs.Rectangle(25.8,13.1,104.6,230.9), new cjs.Rectangle(27,13.1,103.4,230.9), new cjs.Rectangle(27.9,13.1,102.4,230.9), new cjs.Rectangle(28.9,12.9,101.4,231), new cjs.Rectangle(30,12.9,100.3,231), rect=new cjs.Rectangle(27.5,12.9,102.8,231), rect, rect, rect, rect, rect, new cjs.Rectangle(27.5,13.1,102.7,230.8), new cjs.Rectangle(27.5,13,102.8,230.9), new cjs.Rectangle(27.5,13,102.9,230.9), rect=new cjs.Rectangle(27.5,13,103,230.9), rect, new cjs.Rectangle(29.9,13,100.7,231), new cjs.Rectangle(28.5,13,102.1,231), new cjs.Rectangle(27.2,11.2,103.9,232.8), new cjs.Rectangle(22.8,11.2,108.4,232.8), new cjs.Rectangle(25.2,11.2,105.9,232.8), new cjs.Rectangle(24.5,11.2,106.6,232.8), new cjs.Rectangle(24,11.2,107.1,232.8), new cjs.Rectangle(23.3,11.2,107.9,232.8), new cjs.Rectangle(24.2,11.2,107,232.8), new cjs.Rectangle(24.9,11.2,106.3,232.8), new cjs.Rectangle(25.6,11.2,105.6,232.8), new cjs.Rectangle(26.3,11.2,104.9,232.8), new cjs.Rectangle(27.1,11.2,104,232.8), new cjs.Rectangle(28.1,12.9,102.5,231), new cjs.Rectangle(28.8,12.9,101.7,231), new cjs.Rectangle(29.5,12.9,100.9,231), new cjs.Rectangle(30.3,13,100.1,230.9), new cjs.Rectangle(27.5,13,102.9,231), new cjs.Rectangle(29.8,13,100.6,231), new cjs.Rectangle(28.4,13,101.9,230.9), new cjs.Rectangle(26.8,13.1,103.4,230.9), new cjs.Rectangle(25.4,13.1,104.7,230.9), new cjs.Rectangle(24.3,12.9,106,231), new cjs.Rectangle(22.5,13.1,107.8,230.9), new cjs.Rectangle(25.2,13,105.2,230.9), new cjs.Rectangle(27.6,13,102.8,231), new cjs.Rectangle(30.4,13,100.1,231), new cjs.Rectangle(33.4,12.8,97.1,231.1), new cjs.Rectangle(36.5,12.8,94.1,231.1), new cjs.Rectangle(39.3,12.8,91.2,231.2), new cjs.Rectangle(39.4,12.8,91.2,231.2), rect=new cjs.Rectangle(32.7,10.1,100.4,233.9), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.ENRIQUE_DEBOUT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"anim":1};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* Arrêter la lecture à partir de cette image
		Le scénario arrête/met en pause la lecture à partir de cette image lorsque vous insérez ce code.
		Vous pouvez également utiliser ce code pour arrêter/mettre en pause le scénario des clips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(42));

	// AbrasD_gd
	this.avantbras_gd = new lib.avantbras_gd();
	this.avantbras_gd.name = "avantbras_gd";
	this.avantbras_gd.setTransform(92.75,191,0.2299,0.2299,-3.489,0,0,57,48.6);

	this.timeline.addTween(cjs.Tween.get(this.avantbras_gd).wait(1).to({regX:56.9,regY:48.4,rotation:11.5068,x:89.5,y:189.75},9).to({regY:49.8,scaleX:0.23,rotation:33.8092,x:72.75,y:191.15},19).to({regX:57,regY:98.5,scaleY:0.23,rotation:0,x:91.8,y:203.55},12).wait(1));

	// brasD_gd
	this.bras_gd = new lib.bras_gd();
	this.bras_gd.name = "bras_gd";
	this.bras_gd.setTransform(91.9,148.5,0.23,0.23,-4.1858,0,0,40.1,24.3);

	this.timeline.addTween(cjs.Tween.get(this.bras_gd).wait(1).to({regY:24.4,rotation:0.2661,x:91.85,y:148.55},9).to({regX:40.4,regY:24.5,scaleX:0.2299,scaleY:0.2299,rotation:19.0037,x:91.95,y:148.6},19).to({regX:40.1,regY:24.3,scaleX:0.23,scaleY:0.23,rotation:-4.1858,x:91.9,y:148.5},12).wait(1));

	// main_gd
	this.main_gd = new lib.main_gd();
	this.main_gd.name = "main_gd";
	this.main_gd.setTransform(90.8,148.45,0.2341,0.2341,-1.7408,0,0,54.8,-303.8);

	this.timeline.addTween(cjs.Tween.get(this.main_gd).wait(1).to({regX:54.4,rotation:5.2174,x:90.75},9).to({regX:54.8,regY:-303.9,scaleX:0.2344,scaleY:0.2344,rotation:29.3382,y:152.05},19).to({regY:-303.8,scaleX:0.2341,scaleY:0.2341,rotation:-1.7408,x:90.8,y:148.45},12).wait(1));

	// TETE
	this.tete = new lib.tete_gd();
	this.tete.name = "tete";
	this.tete.setTransform(70.85,73.5,0.24,0.24,0,0,0,167.9,289.6);

	this.timeline.addTween(cjs.Tween.get(this.tete).wait(1).to({regX:168.2,scaleX:0.2399,scaleY:0.2399,rotation:-7.4966,x:65.85,y:79.6},11).wait(21).to({regX:167.9,scaleX:0.24,scaleY:0.24,rotation:0,x:70.85,y:73.5},8).wait(1));

	// corps_gd
	this.corps_gd = new lib.corps_gd();
	this.corps_gd.name = "corps_gd";
	this.corps_gd.setTransform(64.5,188.55,0.246,0.246,0,0,3.9973,148.5,266.2);

	this.timeline.addTween(cjs.Tween.get(this.corps_gd).wait(42));

	// cuisse_gd
	this.cuisse_gd = new lib.cuisse_gd();
	this.cuisse_gd.name = "cuisse_gd";
	this.cuisse_gd.setTransform(79.3,248.8,0.21,0.21,0,0,0,39.3,120);

	this.timeline.addTween(cjs.Tween.get(this.cuisse_gd).wait(42));

	// mollet_gd
	this.instance = new lib.mollet_gd();
	this.instance.setTransform(78.1,264.65,0.21,0.21,0,0,0,32.9,28.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(42));

	// cuisse_gd
	this.cuisse_gd_1 = new lib.cuisse_gd();
	this.cuisse_gd_1.name = "cuisse_gd_1";
	this.cuisse_gd_1.setTransform(57.05,223.45,0.2099,0.2099,5.803,0,0,34,27.7);

	this.timeline.addTween(cjs.Tween.get(this.cuisse_gd_1).wait(42));

	// mollet_gd
	this.instance_1 = new lib.mollet_gd();
	this.instance_1.setTransform(53.9,259.35,0.2099,0.2099,-0.4749,0,0,36.5,22.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(42));

	// chaussureD_gd
	this.chaussureD_gd = new lib.chaussure_gd();
	this.chaussureD_gd.name = "chaussureD_gd";
	this.chaussureD_gd.setTransform(60.15,301.15,0.2101,0.2101,-0.3205,0,0,268.6,32.5);

	this.timeline.addTween(cjs.Tween.get(this.chaussureD_gd).wait(42));

	// chaussureG_gd
	this.chaussureG_gd = new lib.chaussure_gd();
	this.chaussureG_gd.name = "chaussureG_gd";
	this.chaussureG_gd.setTransform(86.75,305.7,0.2101,0.2101,0.6866,0,0,278.2,35.2);

	this.timeline.addTween(cjs.Tween.get(this.chaussureG_gd).wait(42));

	// brasG_gd
	this.instance_2 = new lib.brasG_gd();
	this.instance_2.setTransform(48.8,157.65,0.9984,0.9984,-2.977,0,0,13,14.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:12.8,regY:15,scaleX:0.9979,scaleY:0.9979,rotation:9.0295,x:52.55,y:156},3).to({regX:13,regY:14.5,scaleX:0.9955,scaleY:0.9955,rotation:41.6503,x:68.7,y:147.5},6).wait(19).to({regX:13.2,regY:14.7,scaleX:0.9973,scaleY:0.9972,rotation:46.5543,x:68.9,y:147.9},0).to({regX:13,regY:14.6,scaleX:0.9984,scaleY:0.9984,rotation:-2.977,x:48.8,y:157.65},12).wait(1));

	// main2_gd
	this.main2_gd = new lib.main2_gd();
	this.main2_gd.name = "main2_gd";
	this.main2_gd.setTransform(48.75,157.65,0.0599,0.0599,2.8179,0,0,165.7,-980.9);

	this.timeline.addTween(cjs.Tween.get(this.main2_gd).wait(1).to({regX:164.7,regY:-981.4,scaleX:0.0598,scaleY:0.0598,rotation:27.8927,x:56.15,y:161.65},3).to({regX:219.2,regY:-1080.7,rotation:78.5811,x:85.75,y:177.85},6).wait(19).to({regX:164.3,regY:-981.4,scaleX:0.0599,scaleY:0.0599,rotation:56.7919,x:68.75,y:147.6},0).to({regX:165.7,regY:-980.9,rotation:2.8179,x:48.75,y:157.65},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(3.7,2.4,109.9,316.2);
p.frameBounds = [rect, rect, new cjs.Rectangle(3.7,3.2,109.5,315.4), new cjs.Rectangle(3.7,4.2,109.2,314.4), new cjs.Rectangle(3.7,5.1,108.9,313.6), new cjs.Rectangle(1.1,5.9,111.1,312.7), new cjs.Rectangle(-3.5,6.8,115.4,311.8), new cjs.Rectangle(-6.9,7.7,118.3,310.9), new cjs.Rectangle(-8.3,8.4,119.4,310.3), new cjs.Rectangle(-8.2,9,118.8,309.6), new cjs.Rectangle(-13.5,9.7,123.8,308.9), new cjs.Rectangle(-13.5,10.3,123.4,308.3), rect=new cjs.Rectangle(-13.5,4.3,124.8,314.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-14.3,4.3,125.6,314.3), new cjs.Rectangle(-9.9,4.3,121.2,314.3), new cjs.Rectangle(-7.3,4.3,118.6,314.3), new cjs.Rectangle(-4.3,4.3,115.6,314.3), new cjs.Rectangle(-0.9,4.3,112.2,314.3), new cjs.Rectangle(2.8,10.1,107.2,308.5), new cjs.Rectangle(3.7,9.2,106.8,309.5), new cjs.Rectangle(3.7,8.3,107.3,310.3), new cjs.Rectangle(3.7,7.4,107.8,311.3), new cjs.Rectangle(3.7,6.1,108.4,312.6), new cjs.Rectangle(3.7,4.9,108.9,313.8), new cjs.Rectangle(3.7,3.6,109.3,315), new cjs.Rectangle(3.7,2.4,109.9,316.2)];


(lib._PERSOS = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {paul:0,enrique:8,naima:16,marcillac:25,christelle:35};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(47));

	// perso
	this.paul = new lib.PAUL();
	this.paul.name = "paul";
	this.paul.setTransform(10.95,-5.85,0.7758,0.7758,0,0,0,8.4,21);

	this.enrique = new lib.ENRIQUE_DEBOUT();
	this.enrique.name = "enrique";
	this.enrique.setTransform(7.75,-38.2,1.46,1.46,0,0,0,58.7,158.6);

	this.naima = new lib.NINA();
	this.naima.name = "naima";
	this.naima.setTransform(8.15,-6,1.7502,1.7502,0,0,0,81,129.8);

	this.marcillac = new lib.MARCILLAC();
	this.marcillac.name = "marcillac";
	this.marcillac.setTransform(-6.85,-6.95,0.3355,0.3355,0,0,0,996.8,1128.5);

	this.christelle = new lib.COLETTE();
	this.christelle.name = "christelle";
	this.christelle.setTransform(5.45,-0.45,0.4039,0.4039,0,0,0,-53.9,304.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.paul}]}).to({state:[{t:this.enrique}]},8).to({state:[{t:this.naima}]},8).to({state:[{t:this.marcillac}]},9).to({state:[{t:this.christelle}]},10).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-68.7,-209.9,159.8,408.4);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-72.5,-266.2,160.4,461.7), rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-76.4,-215.6,175.8,409.2), rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-81.6,-262.9,154.2,455.7), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-71.5,-215.1,154.1,429.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.QUIZ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// personnalisable
	this.personnalisable = new lib.personnalisable();
	this.personnalisable.name = "personnalisable";
	this.personnalisable.setTransform(1812.9,107.1,1,1,0,0,0,-107.1,107.1);

	this.timeline.addTween(cjs.Tween.get(this.personnalisable).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960,540);

	// image
	this.image = new lib.QUIZ_image();
	this.image.name = "image";
	this.image.setTransform(1629.5,35);

	var maskedShapeInstanceList = [this.image];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.image).wait(1));

	// perso
	this.perso = new lib._PERSOS();
	this.perso.name = "perso";
	this.perso.setTransform(238.3,733.15,2.581,2.581,0,0,180);

	var maskedShapeInstanceList = [this.perso];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.perso).wait(1));

	// bt_continue
	this.bt_continue = new lib.bt_continue();
	this.bt_continue.name = "bt_continue";
	this.bt_continue.setTransform(960.5,708.05,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt_continue, 0, 1, 2, false, new lib.bt_continue(), 3);

	var maskedShapeInstanceList = [this.bt_continue];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.bt_continue).wait(1));

	// bt_submit
	this.bt_submit = new lib.bt_submit();
	this.bt_submit.name = "bt_submit";
	this.bt_submit.setTransform(961.9,708.05,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt_submit, 0, 1, 2, false, new lib.bt_submit(), 3);

	var maskedShapeInstanceList = [this.bt_submit];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.bt_submit).wait(1));

	// contenu
	this.consigne = new cjs.Text("lorem ipsum", "35px 'Raleway'", "#FFFFFF");
	this.consigne.name = "consigne";
	this.consigne.lineHeight = 40;
	this.consigne.lineWidth = 1596;
	this.consigne.parent = this;
	this.consigne.setTransform(227,37);

	this.mc_choice_6 = new lib.mc_choice_quiz_blanc_long();
	this.mc_choice_6.name = "mc_choice_6";
	this.mc_choice_6.setTransform(225,559.8);

	this.feedback = new lib.QUIZFINAL_feedback();
	this.feedback.name = "feedback";
	this.feedback.setTransform(310,677.25);

	this.mc_choice_5 = new lib.mc_choice_quiz_blanc_long();
	this.mc_choice_5.name = "mc_choice_5";
	this.mc_choice_5.setTransform(225,481.3);

	this.mc_choice_4 = new lib.mc_choice_quiz_blanc_long();
	this.mc_choice_4.name = "mc_choice_4";
	this.mc_choice_4.setTransform(225,402.8);

	this.mc_choice_3 = new lib.mc_choice_quiz_blanc_long();
	this.mc_choice_3.name = "mc_choice_3";
	this.mc_choice_3.setTransform(225,324.3);

	this.mc_choice_2 = new lib.mc_choice_quiz_blanc_long();
	this.mc_choice_2.name = "mc_choice_2";
	this.mc_choice_2.setTransform(225,245.8);

	this.mc_choice_1 = new lib.mc_choice_quiz_blanc_long();
	this.mc_choice_1.name = "mc_choice_1";
	this.mc_choice_1.setTransform(225,167.3);

	this.question = new cjs.Text("lorem ipsum", "45px 'Raleway'", "#FFFFFF");
	this.question.name = "question";
	this.question.lineHeight = 52;
	this.question.lineWidth = 1596;
	this.question.parent = this;
	this.question.setTransform(227,87.95);

	var maskedShapeInstanceList = [this.consigne,this.mc_choice_6,this.feedback,this.mc_choice_5,this.mc_choice_4,this.mc_choice_3,this.mc_choice_2,this.mc_choice_1,this.question];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.question},{t:this.mc_choice_1},{t:this.mc_choice_2},{t:this.mc_choice_3},{t:this.mc_choice_4},{t:this.mc_choice_5},{t:this.feedback},{t:this.mc_choice_6},{t:this.consigne}]}).wait(1));

	// prologue_bg_zoom
	this.prologue_bg_zoom = new lib.prologue_bg_zoom_1();
	this.prologue_bg_zoom.name = "prologue_bg_zoom";
	this.prologue_bg_zoom.setTransform(960,540,1,1,0,0,0,960,540);

	var maskedShapeInstanceList = [this.prologue_bg_zoom];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.prologue_bg_zoom).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,540);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.QUIZ, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.prologue_scene = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960.0067,540.0044);

	// prologue_foule.png
	this.instance = new lib.prologue_foule();
	this.instance.setTransform(-15,612,1.0116,1.0116);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// chrono
	this.chrono = new lib.prologue_chrono();
	this.chrono.name = "chrono";
	this.chrono.setTransform(1384.4,279.55,1.0116,1.0116);

	var maskedShapeInstanceList = [this.chrono];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.chrono).wait(1));

	// logo
	this.instance_1 = new lib.prologue_logoediversite_blanc();
	this.instance_1.setTransform(1601.35,604.65,0.4447,0.4447,0,0,0,301.9,79.6);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// personnages
	this.personnages = new lib.prologue_personnages();
	this.personnages.name = "personnages";
	this.personnages.setTransform(824.65,329.7,1.0116,1.0116);

	var maskedShapeInstanceList = [this.personnages];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.personnages).wait(1));

	// PERSOS
	this.perso1 = new lib._PERSOS();
	this.perso1.name = "perso1";
	this.perso1.setTransform(648.4,607.75,1.432,1.432,0,0,0,0.1,0.1);

	var maskedShapeInstanceList = [this.perso1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.perso1).wait(1));

	// prologue_bg.png
	this.instance_2 = new lib.prologue_bg();
	this.instance_2.setTransform(-83,-139,1.0926,1.0926);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.prologue_scene, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.prologue = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.config = {
			persos: ["marcillac"],
			large: [0 ,0, 100],
			zoom_persos: [0 ,0, 100],
			zoom_perso1: [-897, -403, 192]
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960.0067,540.0044);

	// scene
	this.scene = new lib.prologue_scene();
	this.scene.name = "scene";
	this.scene.setTransform(-0.2,-0.2,1,0.9999,0,0,0,-0.1,-0.1);

	var maskedShapeInstanceList = [this.scene];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.scene).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.prologue, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


(lib.CONTENU = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// personnalisable
	this.personnalisable = new lib.personnalisable();
	this.personnalisable.name = "personnalisable";
	this.personnalisable.setTransform(1812.9,107.1,1,1,0,0,0,-107.1,107.1);

	this.timeline.addTween(cjs.Tween.get(this.personnalisable).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	mask.setTransform(960,540);

	// image
	this.image = new lib.CONTENU_image();
	this.image.name = "image";
	this.image.setTransform(1716.45,35);

	var maskedShapeInstanceList = [this.image];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.image).wait(1));

	// perso
	this.perso = new lib._PERSOS();
	this.perso.name = "perso";
	this.perso.setTransform(238.3,733.15,2.581,2.581,0,0,180);

	var maskedShapeInstanceList = [this.perso];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.perso).wait(1));

	// bt_continue
	this.bt_continue = new lib.bt_continue();
	this.bt_continue.name = "bt_continue";
	this.bt_continue.setTransform(1765,528.65,1,1,0,0,0,70,70);
	new cjs.ButtonHelper(this.bt_continue, 0, 1, 2, false, new lib.bt_continue(), 3);

	var maskedShapeInstanceList = [this.bt_continue];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.bt_continue).wait(1));

	// scrollbounds
	this.scrollbounds = new lib.CONTENU_scrollbounds();
	this.scrollbounds.name = "scrollbounds";
	this.scrollbounds.setTransform(125,0);

	var maskedShapeInstanceList = [this.scrollbounds];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.scrollbounds).wait(1));

	// prologue_bg_zoom
	this.prologue_bg_zoom = new lib.prologue_bg_zoom_1();
	this.prologue_bg_zoom.name = "prologue_bg_zoom";
	this.prologue_bg_zoom.setTransform(-936,-520,1,1,0,0,0,-936,-520);

	var maskedShapeInstanceList = [this.prologue_bg_zoom];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.prologue_bg_zoom).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape.setTransform(960,540);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CONTENU, rect = new cjs.Rectangle(0,0,1920,1080), [rect]);


// stage content:
(lib.animate = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {intro:1,prologue:9,CONTENU:99,QUIZ:112,CLICKPICTOS:121,CLASSEMENT:134,VIDEO:147,QUIZFINAL:156};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		s = this;
		require(['engine/Player'], function (Player) {
			Player.init();
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(169));

	// mc_titre_slide
	this.mc_titre_slide = new lib.mc_titre_slide();
	this.mc_titre_slide.name = "mc_titre_slide";

	this.timeline.addTween(cjs.Tween.get(this.mc_titre_slide).wait(169));

	// mc_pause
	this.mc_pause = new lib.mc_pause();
	this.mc_pause.name = "mc_pause";
	this.mc_pause.setTransform(-3029.9,0,1,1,0,0,0,-3029.9,0);

	this.timeline.addTween(cjs.Tween.get(this.mc_pause).wait(169));

	// aide
	this.aide = new lib.mc_aide();
	this.aide.name = "aide";

	this.timeline.addTween(cjs.Tween.get(this.aide).to({_off:true},9).wait(160));

	// nav
	this.nav = new lib.mc_nav();
	this.nav.name = "nav";
	this.nav.setTransform(0,1080,1,1,0,0,0,0,120);

	this.timeline.addTween(cjs.Tween.get(this.nav).wait(169));

	// mc_subtitles
	this.mc_subtitles = new lib.mc_subtitles();
	this.mc_subtitles.name = "mc_subtitles";
	this.mc_subtitles.setTransform(105,850.1,1,1,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.mc_subtitles).wait(169));

	// slides
	this.intro = new lib.intro();
	this.intro.name = "intro";

	this.prologue = new lib.prologue();
	this.prologue.name = "prologue";
	this.prologue.setTransform(-954,-544.2,1,1,0,0,0,-954,-544.2);

	this.CONTENU = new lib.CONTENU();
	this.CONTENU.name = "CONTENU";

	this.QUIZ = new lib.QUIZ();
	this.QUIZ.name = "QUIZ";

	this.CLICKPICTOS = new lib.CLICKPICTOS();
	this.CLICKPICTOS.name = "CLICKPICTOS";

	this.CLASSEMENT = new lib.CLASSEMENT();
	this.CLASSEMENT.name = "CLASSEMENT";

	this.VIDEO = new lib.VIDEO();
	this.VIDEO.name = "VIDEO";

	this.QUIZFINAL = new lib.QUIZFINAL();
	this.QUIZFINAL.name = "QUIZFINAL";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.intro}]},1).to({state:[{t:this.prologue}]},8).to({state:[{t:this.CONTENU}]},90).to({state:[{t:this.QUIZ}]},13).to({state:[{t:this.CLICKPICTOS}]},9).to({state:[{t:this.CLASSEMENT}]},13).to({state:[{t:this.VIDEO}]},13).to({state:[{t:this.QUIZFINAL}]},9).wait(13));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-2065,540,7970.3,1180.4);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-2065,400.9,7970.3,1319.4), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-2065,540,7970.3,1245.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-2065,540,7970.3,1180.4), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-2065,531,7970.3,1600.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];
// library properties:
lib.properties = {
	id: '77C1C54BEA46C8439379FE5CE518CA27',
	width: 1920,
	height: 1080,
	fps: 60,
	color: "#006666",
	opacity: 1.00,
	manifest: [
		{src:"assets/images/animate/fleche_ombre.png", id:"fleche_ombre"},
		{src:"assets/images/animate/logo.png", id:"logo"},
		{src:"assets/images/animate/prologue_bg.jpg", id:"prologue_bg"},
		{src:"assets/images/animate/prologue_bg_zoom.jpg", id:"prologue_bg_zoom"},
		{src:"assets/images/animate/prologue_foule.png", id:"prologue_foule"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['77C1C54BEA46C8439379FE5CE518CA27'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
