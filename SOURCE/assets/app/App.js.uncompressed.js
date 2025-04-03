/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

(function(
	userConfig,
	defaultConfig
){
	// summary:
	//		This is the "source loader" and is the entry point for Dojo during development. You may also load Dojo with
	//		any AMD-compliant loader via the package main module dojo/main.
	// description:
	//		This is the "source loader" for Dojo. It provides an AMD-compliant loader that can be configured
	//		to operate in either synchronous or asynchronous modes. After the loader is defined, dojo is loaded
	//		IAW the package main module dojo/main. In the event you wish to use a foreign loader, you may load dojo as a package
	//		via the package main module dojo/main and this loader is not required; see dojo/package.json for details.
	//
	//		In order to keep compatibility with the v1.x line, this loader includes additional machinery that enables
	//		the dojo.provide, dojo.require et al API. This machinery is loaded by default, but may be dynamically removed
	//		via the has.js API and statically removed via the build system.
	//
	//		This loader includes sniffing machinery to determine the environment; the following environments are supported:
	//
	//		- browser
	//		- node.js
	//		- rhino
	//
	//		This is the so-called "source loader". As such, it includes many optional features that may be discarded by
	//		building a customized version with the build system.

	// Design and Implementation Notes
	//
	// This is a dojo-specific adaption of bdLoad, donated to the dojo foundation by Altoviso LLC.
	//
	// This function defines an AMD-compliant (http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)
	// loader that can be configured to operate in either synchronous or asynchronous modes.
	//
	// Since this machinery implements a loader, it does not have the luxury of using a load system and/or
	// leveraging a utility library. This results in an unpleasantly long file; here is a road map of the contents:
	//
	//	 1. Small library for use implementing the loader.
	//	 2. Define the has.js API; this is used throughout the loader to bracket features.
	//	 3. Define the node.js and rhino sniffs and sniff.
	//	 4. Define the loader's data.
	//	 5. Define the configuration machinery.
	//	 6. Define the script element sniffing machinery and sniff for configuration data.
	//	 7. Configure the loader IAW the provided user, default, and sniffing data.
	//	 8. Define the global require function.
	//	 9. Define the module resolution machinery.
	//	10. Define the module and plugin module definition machinery
	//	11. Define the script injection machinery.
	//	12. Define the window load detection.
	//	13. Define the logging API.
	//	14. Define the tracing API.
	//	16. Define the AMD define function.
	//	17. Define the dojo v1.x provide/require machinery--so called "legacy" modes.
	//	18. Publish global variables.
	//
	// Language and Acronyms and Idioms
	//
	// moduleId: a CJS module identifier, (used for public APIs)
	// mid: moduleId (used internally)
	// packageId: a package identifier (used for public APIs)
	// pid: packageId (used internally); the implied system or default package has pid===""
	// pack: package is used internally to reference a package object (since javascript has reserved words including "package")
	// prid: plugin resource identifier
	// The integer constant 1 is used in place of true and 0 in place of false.
	//
	// The "foreign-loader" has condition is defined if another loader is being used (e.g. webpack) and this code is only
	// needed for resolving module identifiers based on the config.  In this case, only the functions require.toUrl and 
	// require.toAbsMid are supported.  The require and define functions are not supported.

	// define global
	var globalObject = (function(){
		if (typeof global !== 'undefined' && typeof global !== 'function') {
			// global spec defines a reference to the global object called 'global'
			// https://github.com/tc39/proposal-global
			// `global` is also defined in NodeJS
			return global;
		}
		else if (typeof window !== 'undefined') {
			// window is defined in browsers
			return window;
		}
		else if (typeof self !== 'undefined') {
			// self is defined in WebWorkers
			return self;
		}
		return this;
	})();

	// define a minimal library to help build the loader
	var noop = function(){
		},

		isEmpty = function(it){
			for(var p in it){
				return 0;
			}
			return 1;
		},

		toString = {}.toString,

		isFunction = function(it){
			return toString.call(it) == "[object Function]";
		},

		isString = function(it){
			return toString.call(it) == "[object String]";
		},

		isArray = function(it){
			return toString.call(it) == "[object Array]";
		},

		forEach = function(vector, callback){
			if(vector){
				for(var i = 0; i < vector.length;){
					callback(vector[i++]);
				}
			}
		},

		mix = function(dest, src){
			for(var p in src){
				dest[p] = src[p];
			}
			return dest;
		},

		makeError = function(error, info){
			return mix(new Error(error), {src:"dojoLoader", info:info});
		},

		uidSeed = 1,

		uid = function(){
			// Returns a unique identifier (within the lifetime of the document) of the form /_d+/.
			return "_" + uidSeed++;
		},

		// FIXME: how to doc window.require() api

		// this will be the global require function; define it immediately so we can start hanging things off of it
		req = function(
			config,		  //(object, optional) hash of configuration properties
			dependencies, //(array of commonjs.moduleId, optional) list of modules to be loaded before applying callback
			callback	  //(function, optional) lambda expression to apply to module values implied by dependencies
		){
			return contextRequire(config, dependencies, callback, 0, req);
		},

		// the loader uses the has.js API to control feature inclusion/exclusion; define then use throughout
		global = globalObject,

		doc = global.document,

		element = doc && doc.createElement("DiV"),

		has = req.has = function(name){
			return isFunction(hasCache[name]) ? (hasCache[name] = hasCache[name](global, doc, element)) : hasCache[name];
		},

		hasCache = has.cache = defaultConfig.hasCache;

	if (isFunction(userConfig)) {
		userConfig = userConfig(globalObject);
	}

	has.add = function(name, test, now, force){
		(hasCache[name]===undefined || force) && (hasCache[name] = test);
		return now && has(name);
	};

	 0 && has.add("host-node", userConfig.has && "host-node" in userConfig.has ?
		userConfig.has["host-node"] :
		(typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
	if( 0 ){
		// fixup the default config for node.js environment
		require("./_base/configNode.js").config(defaultConfig);
		// remember node's require (with respect to baseUrl==dojo's root)
		defaultConfig.loaderPatch.nodeRequire = require;
	}

	 0 && has.add("host-rhino", userConfig.has && "host-rhino" in userConfig.has ?
		userConfig.has["host-rhino"] :
		(typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
	if( 0 ){
		// owing to rhino's lame feature that hides the source of the script, give the user a way to specify the baseUrl...
		for(var baseUrl = userConfig.baseUrl || ".", arg, rhinoArgs = this.arguments, i = 0; i < rhinoArgs.length;){
			arg = (rhinoArgs[i++] + "").split("=");
			if(arg[0] == "baseUrl"){
				baseUrl = arg[1];
				break;
			}
		}
		load(baseUrl + "/_base/configRhino.js");
		rhinoDojoConfig(defaultConfig, baseUrl, rhinoArgs);
	}

	has.add("host-webworker", ((typeof WorkerGlobalScope !== 'undefined') && (self instanceof WorkerGlobalScope)));
	if(has("host-webworker")){
		mix(defaultConfig.hasCache, {
			"host-browser": 0,
			"dom": 0,
			"dojo-dom-ready-api": 0,
			"dojo-sniff": 0,
			"dojo-inject-api": 1,
			"host-webworker": 1,
			"dojo-guarantee-console": 0 // console is immutable in FF30+, see https://bugs.dojotoolkit.org/ticket/18100
		});

		defaultConfig.loaderPatch = {
			injectUrl: function(url, callback){
				// TODO:
				//		This is not async, nor can it be in Webworkers.  It could be made better by passing
				//		the entire require array into importScripts at.  This way the scripts are loaded in
				//		async mode; even if the callbacks are ran in sync.  It is not a major issue as webworkers
				//		tend to be long running where initial startup is not a major factor.

				try{
					importScripts(url);
					callback();
				}catch(e){
					console.info("failed to load resource (" + url + ")");
					console.error(e);
				}
			}
		};
	}

	// userConfig has tests override defaultConfig has tests; do this after the environment detection because
	// the environment detection usually sets some has feature values in the hasCache.
	for(var p in userConfig.has){
		has.add(p, userConfig.has[p], 0, 1);
	}

	//
	// define the loader data
	//

	// the loader will use these like symbols if the loader has the traceApi; otherwise
	// define magic numbers so that modules can be provided as part of defaultConfig
	var requested = 1,
		arrived = 2,
		nonmodule = 3,
		executing = 4,
		executed = 5;

	if( 0 ){
		// these make debugging nice; but using strings for symbols is a gross rookie error; don't do it for production code
		requested = "requested";
		arrived = "arrived";
		nonmodule = "not-a-module";
		executing = "executing";
		executed = "executed";
	}

	var legacyMode = 0,
		sync = "sync",
		xd = "xd",
		syncExecStack = [],
		dojoRequirePlugin = 0,
		checkDojoRequirePlugin = noop,
		transformToAmd = noop,
		getXhr;
	if( 0 ){
		req.isXdUrl = noop;

		req.initSyncLoader = function(dojoRequirePlugin_, checkDojoRequirePlugin_, transformToAmd_){
			// the first dojo/_base/loader loaded gets to define these variables; they are designed to work
			// in the presence of zero to many mapped dojo/_base/loaders
			if(!dojoRequirePlugin){
				dojoRequirePlugin = dojoRequirePlugin_;
				checkDojoRequirePlugin = checkDojoRequirePlugin_;
				transformToAmd = transformToAmd_;
			}

			return {
				sync:sync,
				requested:requested,
				arrived:arrived,
				nonmodule:nonmodule,
				executing:executing,
				executed:executed,
				syncExecStack:syncExecStack,
				modules:modules,
				execQ:execQ,
				getModule:getModule,
				injectModule:injectModule,
				setArrived:setArrived,
				signal:signal,
				finishExec:finishExec,
				execModule:execModule,
				dojoRequirePlugin:dojoRequirePlugin,
				getLegacyMode:function(){return legacyMode;},
				guardCheckComplete:guardCheckComplete
			};
		};

		if( 1  || has("host-webworker")){
			// in legacy sync mode, the loader needs a minimal XHR library

			var locationProtocol = location.protocol,
				locationHost = location.host;
			req.isXdUrl = function(url){
				if(/^\./.test(url)){
					// begins with a dot is always relative to page URL; therefore not xdomain
					return false;
				}
				if(/^\/\//.test(url)){
					// for v1.6- backcompat, url starting with // indicates xdomain
					return true;
				}
				// get protocol and host
				// \/+ takes care of the typical file protocol that looks like file:///drive/path/to/file
				// locationHost is falsy if file protocol => if locationProtocol matches and is "file:", || will return false
				var match = url.match(/^([^\/\:]+\:)\/+([^\/]+)/);
				return match && (match[1] != locationProtocol || (locationHost && match[2] != locationHost));
			};


			// note: to get the file:// protocol to work in FF, you must set security.fileuri.strict_origin_policy to false in about:config
			 1 || has.add("dojo-xhr-factory", 1);
			has.add("dojo-force-activex-xhr",  1  && !doc.addEventListener && window.location.protocol == "file:");
			has.add("native-xhr", typeof XMLHttpRequest != "undefined");
			if(has("native-xhr") && !has("dojo-force-activex-xhr")){
				getXhr = function(){
					return new XMLHttpRequest();
				};
			}else{
				// if in the browser an old IE; find an xhr
				for(var XMLHTTP_PROGIDS = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'], progid, i = 0; i < 3;){
					try{
						progid = XMLHTTP_PROGIDS[i++];
						if(new ActiveXObject(progid)){
							// this progid works; therefore, use it from now on
							break;
						}
					}catch(e){
						// squelch; we're just trying to find a good ActiveX progid
						// if they all fail, then progid ends up as the last attempt and that will signal the error
						// the first time the client actually tries to exec an xhr
					}
				}
				getXhr = function(){
					return new ActiveXObject(progid);
				};
			}
			req.getXhr = getXhr;

			has.add("dojo-gettext-api", 1);
			req.getText = function(url, async, onLoad){
				var xhr = getXhr();
				xhr.open('GET', fixupUrl(url), false);
				xhr.send(null);
				if(xhr.status == 200 || (!location.host && !xhr.status)){
					if(onLoad){
						onLoad(xhr.responseText, async);
					}
				}else{
					throw makeError("xhrFailed", xhr.status);
				}
				return xhr.responseText;
			};
		}
	}else{
		req.async = 1;
	}

	//
	// loader eval
	//
	var eval_ =  has("csp-restrictions") ?
		// noop eval if there are csp restrictions
		function(){} :
		// use the function constructor so our eval is scoped close to (but not in) in the global space with minimal pollution
		new Function('return eval(arguments[0]);');

	req.eval =
		function(text, hint){
			return eval_(text + "\r\n//# sourceURL=" + hint);
		};

	//
	// loader micro events API
	//
	var listenerQueues = {},
		error = "error",
		signal = req.signal = function(type, args){
			var queue = listenerQueues[type];
			// notice we run a copy of the queue; this allows listeners to add/remove
			// other listeners without affecting this particular signal
			forEach(queue && queue.slice(0), function(listener){
				listener.apply(null, isArray(args) ? args : [args]);
			});
		},
		on = req.on = function(type, listener){
			// notice a queue is not created until a client actually connects
			var queue = listenerQueues[type] || (listenerQueues[type] = []);
			queue.push(listener);
			return {
				remove:function(){
					for(var i = 0; i<queue.length; i++){
						if(queue[i]===listener){
							queue.splice(i, 1);
							return;
						}
					}
				}
			};
		};

	// configuration machinery; with an optimized/built defaultConfig, all configuration machinery can be discarded
	// lexical variables hold key loader data structures to help with minification; these may be completely,
	// one-time initialized by defaultConfig for optimized/built versions
	var
		aliases
			// a vector of pairs of [regexs or string, replacement] => (alias, actual)
			= [],

		paths
			// CommonJS paths
			= {},

		pathsMapProg
			// list of (from-path, to-path, regex, length) derived from paths;
			// a "program" to apply paths; see computeMapProg
			= [],

		packs
			// a map from packageId to package configuration object; see fixupPackageInfo
			= {},

		map = req.map
			// AMD map config variable; dojo/_base/kernel needs req.map to figure out the scope map
			= {},

		mapProgs
			// vector of quads as described by computeMapProg; map-key is AMD map key, map-value is AMD map value
			= [],

		modules
			// A hash:(mid) --> (module-object) the module namespace
			//
			// pid: the package identifier to which the module belongs (e.g., "dojo"); "" indicates the system or default package
			// mid: the fully-resolved (i.e., mappings have been applied) module identifier without the package identifier (e.g., "dojo/io/script")
			// url: the URL from which the module was retrieved
			// pack: the package object of the package to which the module belongs
			// executed: 0 => not executed; executing => in the process of traversing deps and running factory; executed => factory has been executed
			// deps: the dependency vector for this module (vector of modules objects)
			// def: the factory for this module
			// result: the result of the running the factory for this module
			// injected: (0 | requested | arrived) the status of the module; nonmodule means the resource did not call define
			// load: plugin load function; applicable only for plugins
			//
			// Modules go through several phases in creation:
			//
			// 1. Requested: some other module's definition or a require application contained the requested module in
			//	  its dependency vector or executing code explicitly demands a module via req.require.
			//
			// 2. Injected: a script element has been appended to the insert-point element demanding the resource implied by the URL
			//
			// 3. Loaded: the resource injected in [2] has been evaluated.
			//
			// 4. Defined: the resource contained a define statement that advised the loader about the module. Notice that some
			//	  resources may just contain a bundle of code and never formally define a module via define
			//
			// 5. Evaluated: the module was defined via define and the loader has evaluated the factory and computed a result.
			= {},

		cacheBust
			// query string to append to module URLs to bust browser cache
			= "",

		cache
			// hash:(mid | url)-->(function | string)
			//
			// A cache of resources. The resources arrive via a config.cache object, which is a hash from either mid --> function or
			// url --> string. The url key is distinguished from the mid key by always containing the prefix "url:". url keys as provided
			// by config.cache always have a string value that represents the contents of the resource at the given url. mid keys as provided
			// by configl.cache always have a function value that causes the same code to execute as if the module was script injected.
			//
			// Both kinds of key-value pairs are entered into cache via the function consumePendingCache, which may relocate keys as given
			// by any mappings *iff* the config.cache was received as part of a module resource request.
			//
			// Further, for mid keys, the implied url is computed and the value is entered into that key as well. This allows mapped modules
			// to retrieve cached items that may have arrived consequent to another namespace.
			//
			 = {},

		urlKeyPrefix
			// the prefix to prepend to a URL key in the cache.
			= "url:",

		pendingCacheInsert
			// hash:(mid)-->(function)
			//
			// Gives a set of cache modules pending entry into cache. When cached modules are published to the loader, they are
			// entered into pendingCacheInsert; modules are then pressed into cache upon (1) AMD define or (2) upon receiving another
			// independent set of cached modules. (1) is the usual case, and this case allows normalizing mids given in the pending
			// cache for the local configuration, possibly relocating modules.
			 = {},

		dojoSniffConfig
			// map of configuration variables
			// give the data-dojo-config as sniffed from the document (if any)
			= {},

		insertPointSibling
			// the nodes used to locate where scripts are injected into the document
			= 0;

	if( 1 ){
		if (!has("foreign-loader")) {
			var consumePendingCacheInsert = function(referenceModule, clear){
					clear = clear !== false;
					var p, item, match, now, m;
					for(p in pendingCacheInsert){
						item = pendingCacheInsert[p];
						match = p.match(/^url\:(.+)/);
						if(match){
							cache[urlKeyPrefix + toUrl(match[1], referenceModule)] =  item;
						}else if(p=="*now"){
							now = item;
						}else if(p!="*noref"){
							m = getModuleInfo(p, referenceModule, true);
							cache[m.mid] = cache[urlKeyPrefix + m.url] = item;
						}
					}
					if(now){
						now(createRequire(referenceModule));
					}
					if(clear){
						pendingCacheInsert = {};
					}
				};
		}
		var escapeString = function(s){
				return s.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(c){ return "\\" + c; });
			},

			computeMapProg = function(map, dest){
				// This routine takes a map as represented by a JavaScript object and initializes dest, a vector of
				// quads of (map-key, map-value, refex-for-map-key, length-of-map-key), sorted decreasing by length-
				// of-map-key. The regex looks for the map-key followed by either "/" or end-of-string at the beginning
				// of a the search source. Notice the map-value is irrelevant to the algorithm
				dest.splice(0, dest.length);
				for(var p in map){
					dest.push([
						p,
						map[p],
						new RegExp("^" + escapeString(p) + "(\/|$)"),
						p.length]);
				}
				dest.sort(function(lhs, rhs){ return rhs[3] - lhs[3]; });
				return dest;
			},

			computeAliases = function(config, dest){
				forEach(config, function(pair){
					// take a fixed-up copy...
					dest.push([isString(pair[0]) ? new RegExp("^" + escapeString(pair[0]) + "$") : pair[0], pair[1]]);
				});
			},


			fixupPackageInfo = function(packageInfo){
				// calculate the precise (name, location, main, mappings) for a package
				var name = packageInfo.name;
				if(!name){
					// packageInfo must be a string that gives the name
					name = packageInfo;
					packageInfo = {name:name};
				}
				packageInfo = mix({main:"main"}, packageInfo);
				packageInfo.location = packageInfo.location ? packageInfo.location : name;

				// packageMap is deprecated in favor of AMD map
				if(packageInfo.packageMap){
					map[name] = packageInfo.packageMap;
				}

				if(!packageInfo.main.indexOf("./")){
					packageInfo.main = packageInfo.main.substring(2);
				}

				// now that we've got a fully-resolved package object, push it into the configuration
				packs[name] = packageInfo;
			},

			delayedModuleConfig
				// module config cannot be consumed until the loader is completely initialized; therefore, all
				// module config detected during booting is memorized and applied at the end of loader initialization
				// TODO: this is a bit of a kludge; all config should be moved to end of loader initialization, but
				// we'll delay this chore and do it with a final loader 1.x cleanup after the 2.x loader prototyping is complete
				= [],


			config = function(config, booting, referenceModule){
				for(var p in config){
					if(p=="waitSeconds"){
						req.waitms = (config[p] || 0) * 1000;
					}
					if(p=="cacheBust"){
						cacheBust = config[p] ? (isString(config[p]) ? config[p] : (new Date()).getTime() + "") : "";
					}
					if(p=="baseUrl" || p=="combo"){
						req[p] = config[p];
					}
					if( 0  && p=="async"){
						// falsy or "sync" => legacy sync loader
						// "xd" => sync but loading xdomain tree and therefore loading asynchronously (not configurable, set automatically by the loader)
						// "legacyAsync" => permanently in "xd" by choice
						// "debugAtAllCosts" => trying to load everything via script injection (not implemented)
						// otherwise, must be truthy => AMD
						// legacyMode: sync | legacyAsync | xd | false
						var mode = config[p];
						req.legacyMode = legacyMode = (isString(mode) && /sync|legacyAsync/.test(mode) ? mode : (!mode ? sync : false));
						req.async = !legacyMode;
					}
					if(config[p]!==hasCache){
						// accumulate raw config info for client apps which can use this to pass their own config
						req.rawConfig[p] = config[p];
						p!="has" && has.add("config-"+p, config[p], 0, booting);
					}
				}

				// make sure baseUrl exists
				if(!req.baseUrl){
					req.baseUrl = "./";
				}
				// make sure baseUrl ends with a slash
				if(!/\/$/.test(req.baseUrl)){
					req.baseUrl += "/";
				}

				// now do the special work for has, packages, packagePaths, paths, aliases, and cache

				for(p in config.has){
					has.add(p, config.has[p], 0, booting);
				}

				// for each package found in any packages config item, augment the packs map owned by the loader
				forEach(config.packages, fixupPackageInfo);

				// for each packagePath found in any packagePaths config item, augment the packageConfig
				// packagePaths is deprecated; remove in 2.0
				for(var baseUrl in config.packagePaths){
					forEach(config.packagePaths[baseUrl], function(packageInfo){
						var location = baseUrl + "/" + packageInfo;
						if(isString(packageInfo)){
							packageInfo = {name:packageInfo};
						}
						packageInfo.location = location;
						fixupPackageInfo(packageInfo);
					});
				}

				// notice that computeMapProg treats the dest as a reference; therefore, if/when that variable
				// is published (see dojo-publish-privates), the published variable will always hold a valid value.

				// this must come after all package processing since package processing may mutate map
				computeMapProg(mix(map, config.map), mapProgs);
				forEach(mapProgs, function(item){
					item[1] = computeMapProg(item[1], []);
					if(item[0]=="*"){
						mapProgs.star = item;
					}
				});

				// push in any paths and recompute the internal pathmap
				computeMapProg(mix(paths, config.paths), pathsMapProg);

				// aliases
				computeAliases(config.aliases, aliases);

				if (!has("foreign-loader")) {
					if(booting){
						delayedModuleConfig.push({config:config.config});
					}else{
						for(p in config.config){
							var module = getModule(p, referenceModule);
							module.config = mix(module.config || {}, config.config[p]);
						}
					}

					// push in any new cache values
					if(config.cache){
						consumePendingCacheInsert();
						pendingCacheInsert = config.cache;
						//inject now all depencies so cache is available for mapped module
						consumePendingCacheInsert(0, !!config.cache["*noref"]);
					}
				}
				signal("config", [config, req.rawConfig]);
			};

		//
		// execute the various sniffs; userConfig can override and value
		//

		if(has("dojo-cdn") ||  1 ){
			// the sniff regex looks for a src attribute ending in dojo.js, optionally preceded with a path.
			// match[3] returns the path to dojo.js (if any) without the trailing slash. This is used for the
			// dojo location on CDN deployments and baseUrl when either/both of these are not provided
			// explicitly in the config data; this is the 1.6- behavior.

			var scripts = doc.getElementsByTagName("script"),
				i = 0,
				script, dojoDir, src, match;
			while(i < scripts.length){
				script = scripts[i++];
				if((src = script.getAttribute("src")) && (match = src.match(/(((.*)\/)|^)dojo\.js(\W|$)/i))){
					// sniff dojoDir and baseUrl
					dojoDir = match[3] || "";
					defaultConfig.baseUrl = defaultConfig.baseUrl || dojoDir;

					// remember an insertPointSibling
					insertPointSibling = script;
				}

				// sniff configuration on attribute in script element
				if((src = (script.getAttribute("data-dojo-config") || script.getAttribute("djConfig")))){
					dojoSniffConfig = req.eval("({ " + src + " })", "data-dojo-config");

					// remember an insertPointSibling
					insertPointSibling = script;
				}

				// sniff requirejs attribute
				if( 0 ){
					if((src = script.getAttribute("data-main"))){
						dojoSniffConfig.deps = dojoSniffConfig.deps || [src];
					}
				}
			}
		}

		if( 0 ){
			// pass down doh.testConfig from parent as if it were a data-dojo-config
			try{
				if(window.parent != window && window.parent.require){
					var doh = window.parent.require("doh");
					doh && mix(dojoSniffConfig, doh.testConfig);
				}
			}catch(e){}
		}

		// configure the loader; let the user override defaults
		req.rawConfig = {};
		config(defaultConfig, 1);

		// do this before setting userConfig/sniffConfig to allow userConfig/sniff overrides
		if(has("dojo-cdn")){
			packs.dojo.location = dojoDir;
			if(dojoDir){
				dojoDir += "/";
			}
			packs.dijit.location = dojoDir + "../dijit/";
			packs.dojox.location = dojoDir + "../dojox/";
		}

		config(userConfig, 1);
		config(dojoSniffConfig, 1);

	}else{
		// no config API, assume defaultConfig has everything the loader needs...for the entire lifetime of the application
		paths = defaultConfig.paths;
		pathsMapProg = defaultConfig.pathsMapProg;
		packs = defaultConfig.packs;
		aliases = defaultConfig.aliases;
		mapProgs = defaultConfig.mapProgs;
		modules = defaultConfig.modules;
		cache = defaultConfig.cache;
		cacheBust = defaultConfig.cacheBust;

		// remember the default config for other processes (e.g., dojo/config)
		req.rawConfig = defaultConfig;
	}


	if (!has("foreign-loader")) {
		if( 0 ){
			req.combo = req.combo || {add:noop};
			var comboPending = 0,
				combosPending = [],
				comboPendingTimer = null;
		}
		

		// build the loader machinery iaw configuration, including has feature tests
		var injectDependencies = function(module){
				// checkComplete!=0 holds the idle signal; we're not idle if we're injecting dependencies
				guardCheckComplete(function(){
					forEach(module.deps, injectModule);
					if( 0  && comboPending && !comboPendingTimer){
						comboPendingTimer = setTimeout(function() {
							comboPending = 0;
							comboPendingTimer = null;
							req.combo.done(function(mids, url) {
								var onLoadCallback= function(){
									// defQ is a vector of module definitions 1-to-1, onto mids
									runDefQ(0, mids);
									checkComplete();
								};
								combosPending.push(mids);
								injectingModule = mids;
								req.injectUrl(url, onLoadCallback, mids);
								injectingModule = 0;
							}, req);
						}, 0);
					}
				});
			},

			contextRequire = function(a1, a2, a3, referenceModule, contextRequire){
				var module, syntheticMid;
				if(isString(a1)){
					// signature is (moduleId)
					module = getModule(a1, referenceModule, true);
					if(module && module.executed){
						return module.result;
					}
					throw makeError("undefinedModule", a1);
				}
				if(!isArray(a1)){
					// a1 is a configuration
					config(a1, 0, referenceModule);

					// juggle args; (a2, a3) may be (dependencies, callback)
					a1 = a2;
					a2 = a3;
				}
				if(isArray(a1)){
					// signature is (requestList [,callback])
					if(!a1.length){
						a2 && a2();
					}else{
						syntheticMid = "require*" + uid();

						// resolve the request list with respect to the reference module
						for(var mid, deps = [], i = 0; i < a1.length;){
							mid = a1[i++];
							deps.push(getModule(mid, referenceModule));
						}

						// construct a synthetic module to control execution of the requestList, and, optionally, callback
						module = mix(makeModuleInfo("", syntheticMid, 0, ""), {
							injected: arrived,
							deps: deps,
							def: a2 || noop,
							require: referenceModule ? referenceModule.require : req,
							gc: 1 //garbage collect
						});
						modules[module.mid] = module;

						// checkComplete!=0 holds the idle signal; we're not idle if we're injecting dependencies
						injectDependencies(module);

						// try to immediately execute
						// if already traversing a factory tree, then strict causes circular dependency to abort the execution; maybe
						// it's possible to execute this require later after the current traversal completes and avoid the circular dependency.
						// ...but *always* insist on immediate in synch mode
						var strict = checkCompleteGuard && legacyMode!=sync;
						guardCheckComplete(function(){
							execModule(module, strict);
						});
						if(!module.executed){
							// some deps weren't on board or circular dependency detected and strict; therefore, push into the execQ
							execQ.push(module);
						}
						checkComplete();
					}
				}
				return contextRequire;
			},

			createRequire = function(module){
				if(!module){
					return req;
				}
				var result = module.require;
				if(!result){
					result = function(a1, a2, a3){
						return contextRequire(a1, a2, a3, module, result);
					};
					module.require = mix(result, req);
					result.module = module;
					result.toUrl = function(name){
						return toUrl(name, module);
					};
					result.toAbsMid = function(mid){
						return toAbsMid(mid, module);
					};
					if( 0 ){
						result.undef = function(mid){
							req.undef(mid, module);
						};
					}
					if( 0 ){
						result.syncLoadNls = function(mid){
							var nlsModuleInfo = getModuleInfo(mid, module),
								nlsModule = modules[nlsModuleInfo.mid];
							if(!nlsModule || !nlsModule.executed){
								cached = cache[nlsModuleInfo.mid] || cache[urlKeyPrefix + nlsModuleInfo.url];
								if(cached){
									evalModuleText(cached);
									nlsModule = modules[nlsModuleInfo.mid];
								}
							}
							return nlsModule && nlsModule.executed && nlsModule.result;
						};
					}

				}
				return result;
			},

		  execQ =
				// The list of modules that need to be evaluated.
				[],

			defQ =
				// The queue of define arguments sent to loader.
				[],

			waiting =
				// The set of modules upon which the loader is waiting for definition to arrive
				{},

			setRequested = function(module){
				module.injected = requested;
				waiting[module.mid] = 1;
				if(module.url){
					waiting[module.url] = module.pack || 1;
				}
				startTimer();
			},

			setArrived = function(module){
				module.injected = arrived;
				delete waiting[module.mid];
				if(module.url){
					delete waiting[module.url];
				}
				if(isEmpty(waiting)){
					clearTimer();
					 0  && legacyMode==xd && (legacyMode = sync);
				}
			},

			execComplete = req.idle =
				// says the loader has completed (or not) its work
				function(){
					return !defQ.length && isEmpty(waiting) && !execQ.length && !checkCompleteGuard;
				};
	}

	var runMapProg = function(targetMid, map){
			// search for targetMid in map; return the map item if found; falsy otherwise
			if(map){
			for(var i = 0; i < map.length; i++){
				if(map[i][2].test(targetMid)){
					return map[i];
				}
			}
			}
			return 0;
		},

		compactPath = function(path){
			var result = [],
				segment, lastSegment;
			path = path.replace(/\\/g, '/').split('/');
			while(path.length){
				segment = path.shift();
				if(segment==".." && result.length && lastSegment!=".."){
					result.pop();
					lastSegment = result[result.length - 1];
				}else if(segment!="."){
					result.push(lastSegment= segment);
				} // else ignore "."
			}
			return result.join("/");
		},

		makeModuleInfo = function(pid, mid, pack, url){
			if( 0 ){
				var xd= req.isXdUrl(url);
				return {pid:pid, mid:mid, pack:pack, url:url, executed:0, def:0, isXd:xd, isAmd:!!(xd || (packs[pid] && packs[pid].isAmd))};
			}else{
				return {pid:pid, mid:mid, pack:pack, url:url, executed:0, def:0};
			}
		},

		getModuleInfo_ = function(mid, referenceModule, packs, modules, baseUrl, mapProgs, pathsMapProg, aliases, alwaysCreate, fromPendingCache){
			// arguments are passed instead of using lexical variables so that this function my be used independent of the loader (e.g., the builder)
			// alwaysCreate is useful in this case so that getModuleInfo never returns references to real modules owned by the loader
			var pid, pack, midInPackage, mapItem, url, result, isRelative, requestedMid;
			requestedMid = mid;
			isRelative = /^\./.test(mid);
			if(/(^\/)|(\:)|(\.js$)/.test(mid) || (isRelative && !referenceModule)){
				// absolute path or protocol of .js filetype, or relative path but no reference module and therefore relative to page
				// whatever it is, it's not a module but just a URL of some sort
				// note: pid===0 indicates the routine is returning an unmodified mid

				return makeModuleInfo(0, mid, 0, mid);
			}else{
				// relative module ids are relative to the referenceModule; get rid of any dots
				mid = compactPath(isRelative ? (referenceModule.mid + "/../" + mid) : mid);
				if(/^\./.test(mid)){
					throw makeError("irrationalPath", mid);
				}
				// at this point, mid is an absolute mid

				// map the mid
				if(!fromPendingCache && !isRelative && mapProgs.star){
					mapItem = runMapProg(mid, mapProgs.star[1]);
				}
				if(!mapItem && referenceModule){
					mapItem = runMapProg(referenceModule.mid, mapProgs);
					mapItem = mapItem && runMapProg(mid, mapItem[1]);
				}

				if(mapItem){
					mid = mapItem[1] + mid.substring(mapItem[3]);
					}

				match = mid.match(/^([^\/]+)(\/(.+))?$/);
				pid = match ? match[1] : "";
				if((pack = packs[pid])){
					mid = pid + "/" + (midInPackage = (match[3] || pack.main));
				}else{
					pid = "";
				}

				// search aliases
				var candidateLength = 0,
					candidate = 0;
				forEach(aliases, function(pair){
					var match = mid.match(pair[0]);
					if(match && match.length>candidateLength){
						candidate = isFunction(pair[1]) ? mid.replace(pair[0], pair[1]) : pair[1];
					}
				});
				if(candidate){
					return getModuleInfo_(candidate, 0, packs, modules, baseUrl, mapProgs, pathsMapProg, aliases, alwaysCreate);
				}

				result = modules[mid];
				if(result){
					return alwaysCreate ? makeModuleInfo(result.pid, result.mid, result.pack, result.url) : modules[mid];
				}
			}
			// get here iff the sought-after module does not yet exist; therefore, we need to compute the URL given the
			// fully resolved (i.e., all relative indicators and package mapping resolved) module id

			// note: pid!==0 indicates the routine is returning a url that has .js appended unmodified mid
			mapItem = runMapProg(mid, pathsMapProg);
			if(mapItem){
				url = mapItem[1] + mid.substring(mapItem[3]);
			}else if(pid){
				url = (pack.location.slice(-1) === '/' ? pack.location.slice(0, -1) : pack.location) + "/" + midInPackage;
			}else if( 0 ){
				url = "../" + mid;
			}else{
				url = mid;
			}
			// if result is not absolute, add baseUrl
			if(!(/(^\/)|(\:)/.test(url))){
				url = baseUrl + url;
			}
			url += ".js";
			return makeModuleInfo(pid, mid, pack, compactPath(url));
		},

		getModuleInfo = function(mid, referenceModule, fromPendingCache){
			return getModuleInfo_(mid, referenceModule, packs, modules, req.baseUrl, mapProgs, pathsMapProg, aliases, undefined, fromPendingCache);
		};

	if (!has("foreign-loader")) {
		var resolvePluginResourceId = function(plugin, prid, referenceModule){
				return plugin.normalize ? plugin.normalize(prid, function(mid){return toAbsMid(mid, referenceModule);}) : toAbsMid(prid, referenceModule);
			},

			dynamicPluginUidGenerator = 0,

			getModule = function(mid, referenceModule, immediate){
				// compute and optionally construct (if necessary) the module implied by the mid with respect to referenceModule
				var match, plugin, prid, result;
				match = mid.match(/^(.+?)\!(.*)$/);
				if(match){
					// name was <plugin-module>!<plugin-resource-id>
					plugin = getModule(match[1], referenceModule, immediate);

					if( 0  && legacyMode == sync && !plugin.executed){
						injectModule(plugin);
						if(plugin.injected===arrived && !plugin.executed){
							guardCheckComplete(function(){
								execModule(plugin);
							});
						}
						if(plugin.executed){
							promoteModuleToPlugin(plugin);
						}else{
							// we are in xdomain mode for some reason
							execQ.unshift(plugin);
						}
					}



					if(plugin.executed === executed && !plugin.load){
						// executed the module not knowing it was a plugin
						promoteModuleToPlugin(plugin);
					}

					// if the plugin has not been loaded, then can't resolve the prid and  must assume this plugin is dynamic until we find out otherwise
					if(plugin.load){
						prid = resolvePluginResourceId(plugin, match[2], referenceModule);
						mid = (plugin.mid + "!" + (plugin.dynamic ? ++dynamicPluginUidGenerator + "!" : "") + prid);
					}else{
						prid = match[2];
						mid = plugin.mid + "!" + (++dynamicPluginUidGenerator) + "!waitingForPlugin";
					}
					result = {plugin:plugin, mid:mid, req:createRequire(referenceModule), prid:prid};
				}else{
					result = getModuleInfo(mid, referenceModule);
				}
				return modules[result.mid] || (!immediate && (modules[result.mid] = result));
			};
	}

	var toAbsMid = req.toAbsMid = function(mid, referenceModule){
			return getModuleInfo(mid, referenceModule).mid;
		},

		toUrl = req.toUrl = function(name, referenceModule){
			var moduleInfo = getModuleInfo(name+"/x", referenceModule),
				url= moduleInfo.url;
			return fixupUrl(moduleInfo.pid===0 ?
				// if pid===0, then name had a protocol or absolute path; either way, toUrl is the identify function in such cases
				name :
				// "/x.js" since getModuleInfo automatically appends ".js" and we appended "/x" to make name look like a module id
				url.substring(0, url.length-5)
			);
		};

	if (!has("foreign-loader")) {
		var nonModuleProps = {
				injected: arrived,
				executed: executed,
				def: nonmodule,
				result: nonmodule
			},

			makeCjs = function(mid){
				return modules[mid] = mix({mid:mid}, nonModuleProps);
			},

			cjsRequireModule = makeCjs("require"),
			cjsExportsModule = makeCjs("exports"),
			cjsModuleModule = makeCjs("module"),

			runFactory = function(module, args){
				req.trace("loader-run-factory", [module.mid]);
				var factory = module.def,
					result;
				 0  && syncExecStack.unshift(module);
				if( 0 ){
					try{
						result= isFunction(factory) ? factory.apply(null, args) : factory;
					}catch(e){
						signal(error, module.result = makeError("factoryThrew", [module, e]));
					}
				}else{
					result= isFunction(factory) ? factory.apply(null, args) : factory;
				}
				module.result = result===undefined && module.cjs ? module.cjs.exports : result;
				 0  && syncExecStack.shift(module);
			},

			abortExec = {},

			defOrder = 0,

			promoteModuleToPlugin = function(pluginModule){
				var plugin = pluginModule.result;
				pluginModule.dynamic = plugin.dynamic;
				pluginModule.normalize = plugin.normalize;
				pluginModule.load = plugin.load;
				return pluginModule;
			},

			resolvePluginLoadQ = function(plugin){
				// plugins is a newly executed module that has a loadQ waiting to run

				// step 1: traverse the loadQ and fixup the mid and prid; remember the map from original mid to new mid
				// recall the original mid was created before the plugin was on board and therefore it was impossible to
				// compute the final mid; accordingly, prid may or may not change, but the mid will definitely change
				var map = {};
				forEach(plugin.loadQ, function(pseudoPluginResource){
					// manufacture and insert the real module in modules
					var prid = resolvePluginResourceId(plugin, pseudoPluginResource.prid, pseudoPluginResource.req.module),
						mid = plugin.dynamic ? pseudoPluginResource.mid.replace(/waitingForPlugin$/, prid) : (plugin.mid + "!" + prid),
						pluginResource = mix(mix({}, pseudoPluginResource), {mid:mid, prid:prid, injected:0});
					if(!modules[mid] || !modules[mid].injected /*for require.undef*/){
						// create a new (the real) plugin resource and inject it normally now that the plugin is on board
						injectPlugin(modules[mid] = pluginResource);
					} // else this was a duplicate request for the same (plugin, rid) for a nondynamic plugin

					// pluginResource is really just a placeholder with the wrong mid (because we couldn't calculate it until the plugin was on board)
					// mark is as arrived and delete it from modules; the real module was requested above
					map[pseudoPluginResource.mid] = modules[mid];
					setArrived(pseudoPluginResource);
					delete modules[pseudoPluginResource.mid];
				});
				plugin.loadQ = 0;

				// step2: replace all references to any placeholder modules with real modules
				var substituteModules = function(module){
					for(var replacement, deps = module.deps || [], i = 0; i<deps.length; i++){
						replacement = map[deps[i].mid];
						if(replacement){
							deps[i] = replacement;
						}
					}
				};
				for(var p in modules){
					substituteModules(modules[p]);
				}
				forEach(execQ, substituteModules);
			},

			finishExec = function(module){
				req.trace("loader-finish-exec", [module.mid]);
				module.executed = executed;
				module.defOrder = defOrder++;
				 0  && forEach(module.provides, function(cb){ cb(); });
				if(module.loadQ){
					// the module was a plugin
					promoteModuleToPlugin(module);
					resolvePluginLoadQ(module);
				}
				// remove all occurrences of this module from the execQ
				for(i = 0; i < execQ.length;){
					if(execQ[i] === module){
						execQ.splice(i, 1);
					}else{
						i++;
					}
				}
				// delete references to synthetic modules
				if (/^require\*/.test(module.mid)) {
					delete modules[module.mid];
				}
			},

			circleTrace = [],

			execModule = function(module, strict){
				// run the dependency vector, then run the factory for module
				if(module.executed === executing){
					req.trace("loader-circular-dependency", [circleTrace.concat(module.mid).join("->")]);
					return (!module.def || strict) ? abortExec :  (module.cjs && module.cjs.exports);
				}
				// at this point the module is either not executed or fully executed


				if(!module.executed){
					if(!module.def){
						return abortExec;
					}
					var mid = module.mid,
						deps = module.deps || [],
						arg, argResult,
						args = [],
						i = 0;

					if( 0 ){
						circleTrace.push(mid);
						req.trace("loader-exec-module", ["exec", circleTrace.length, mid]);
					}

					// for circular dependencies, assume the first module encountered was executed OK
					// modules that circularly depend on a module that has not run its factory will get
					// the pre-made cjs.exports===module.result. They can take a reference to this object and/or
					// add properties to it. When the module finally runs its factory, the factory can
					// read/write/replace this object. Notice that so long as the object isn't replaced, any
					// reference taken earlier while walking the deps list is still valid.
					module.executed = executing;
					while((arg = deps[i++])){
						argResult = ((arg === cjsRequireModule) ? createRequire(module) :
										((arg === cjsExportsModule) ? module.cjs.exports :
											((arg === cjsModuleModule) ? module.cjs :
												execModule(arg, strict))));
						if(argResult === abortExec){
							module.executed = 0;
							req.trace("loader-exec-module", ["abort", mid]);
							 0  && circleTrace.pop();
							return abortExec;
						}
						args.push(argResult);
					}
					runFactory(module, args);
					finishExec(module);
					 0  && circleTrace.pop();
				}
				// at this point the module is guaranteed fully executed

				return module.result;
			},


			checkCompleteGuard = 0,

			guardCheckComplete = function(proc){
				try{
					checkCompleteGuard++;
					proc();
				}catch(e){
					// https://bugs.dojotoolkit.org/ticket/16617
					throw e;
				}finally{
					checkCompleteGuard--;
				}
				if(execComplete()){
					signal("idle", []);
				}
			},

			checkComplete = function(){
				// keep going through the execQ as long as at least one factory is executed
				// plugins, recursion, cached modules all make for many execution path possibilities
				if(checkCompleteGuard){
					return;
				}
				guardCheckComplete(function(){
					checkDojoRequirePlugin();
					for(var currentDefOrder, module, i = 0; i < execQ.length;){
						currentDefOrder = defOrder;
						module = execQ[i];
						execModule(module);
						if(currentDefOrder!=defOrder){
							// defOrder was bumped one or more times indicating something was executed (note, this indicates
							// the execQ was modified, maybe a lot (for example a later module causes an earlier module to execute)
							checkDojoRequirePlugin();
							i = 0;
						}else{
							// nothing happened; check the next module in the exec queue
							i++;
						}
					}
				});
			};
	}

	var fixupUrl= typeof userConfig.fixupUrl == "function" ? userConfig.fixupUrl : function(url){
			url += ""; // make sure url is a Javascript string (some paths may be a Java string)
			return url + (cacheBust ? ((/\?/.test(url) ? "&" : "?") + cacheBust) : "");
		};



	if( 0 ){
		req.undef = function(moduleId, referenceModule){
			// In order to reload a module, it must be undefined (this routine) and then re-requested.
			// This is useful for testing frameworks (at least).
			var module = getModule(moduleId, referenceModule);
			setArrived(module);
			mix(module, {def:0, executed:0, injected:0, node:0, load:0});
		};
	}

	if( 1 ){
		if(has("dojo-loader-eval-hint-url")===undefined){
			has.add("dojo-loader-eval-hint-url", 1);
		}

		var injectPlugin = function(
				module
			){
				// injects the plugin module given by module; may have to inject the plugin itself
				var plugin = module.plugin;

				if(plugin.executed === executed && !plugin.load){
					// executed the module not knowing it was a plugin
					promoteModuleToPlugin(plugin);
				}

				var onLoad = function(def){
						module.result = def;
						setArrived(module);
						finishExec(module);
						checkComplete();
					};

				if(plugin.load){
					plugin.load(module.prid, module.req, onLoad);
				}else if(plugin.loadQ){
					plugin.loadQ.push(module);
				}else{
					// the unshift instead of push is important: we don't want plugins to execute as
					// dependencies of some other module because this may cause circles when the plugin
					// loadQ is run; also, generally, we want plugins to run early since they may load
					// several other modules and therefore can potentially unblock many modules
					plugin.loadQ = [module];
					execQ.unshift(plugin);
					injectModule(plugin);
				}
			},

			// for IE, injecting a module may result in a recursive execution if the module is in the cache

			cached = 0,

			injectingModule = 0,

			injectingCachedModule = 0,

			evalModuleText = function(text, module){
				// see def() for the injectingCachedModule bracket; it simply causes a short, safe circuit
				if(has("config-stripStrict")){
					text = text.replace(/(["'])use strict\1/g, '');
				}
				injectingCachedModule = 1;
				if( 0 ){
					try{
						if(text===cached){
							cached.call(null);
						}else{
							req.eval(text, has("dojo-loader-eval-hint-url") ? module.url : module.mid);
						}
					}catch(e){
						signal(error, makeError("evalModuleThrew", module));
					}
				}else{
					if(text===cached){
						cached.call(null);
					}else{
						req.eval(text, has("dojo-loader-eval-hint-url") ? module.url : module.mid);
					}
				}
				injectingCachedModule = 0;
			},

			injectModule = function(module){
				// Inject the module. In the browser environment, this means appending a script element into
				// the document; in other environments, it means loading a file.
				//
				// If in synchronous mode, then get the module synchronously if it's not xdomainLoading.

				var mid = module.mid,
					url = module.url;
				if(module.executed || module.injected || waiting[mid] || (module.url && ((module.pack && waiting[module.url]===module.pack) || waiting[module.url]==1))){
					return;
				}
				setRequested(module);

				if( 0 ){
					var viaCombo = 0;
					if(module.plugin && module.plugin.isCombo){
						// a combo plugin; therefore, must be handled by combo service
						// the prid should have already been converted to a URL (if required by the plugin) during
						// the normalize process; in any event, there is no way for the loader to know how to
						// to the conversion; therefore the third argument is zero
						req.combo.add(module.plugin.mid, module.prid, 0, req);
						viaCombo = 1;
					}else if(!module.plugin){
						viaCombo = req.combo.add(0, module.mid, module.url, req);
					}
					if(viaCombo){
						comboPending= 1;
						return;
					}
				}

				if(module.plugin){
					injectPlugin(module);
					return;
				} // else a normal module (not a plugin)


				var onLoadCallback = function(){
					runDefQ(module);
					if(module.injected !== arrived){
						// the script that contained the module arrived and has been executed yet
						// nothing was added to the defQ (so it wasn't an AMD module) and the module
						// wasn't marked as arrived by dojo.provide (so it wasn't a v1.6- module);
						// therefore, it must not have been a module; adjust state accordingly
						if(has("dojo-enforceDefine")){
							signal(error, makeError("noDefine", module));
							return;
						}
						setArrived(module);
						mix(module, nonModuleProps);
						req.trace("loader-define-nonmodule", [module.url]);
					}

					if( 0  && legacyMode){
						// must call checkComplete even in for sync loader because we may be in xdomainLoading mode;
						// but, if xd loading, then don't call checkComplete until out of the current sync traversal
						// in order to preserve order of execution of the dojo.required modules
						!syncExecStack.length && checkComplete();
					}else{
						checkComplete();
					}
				};
				cached = cache[mid] || cache[urlKeyPrefix + module.url];
				if(cached){
					req.trace("loader-inject", ["cache", module.mid, url]);
					evalModuleText(cached, module);
					onLoadCallback();
					return;
				}
				if( 0  && legacyMode){
					if(module.isXd){
						// switch to async mode temporarily; if current legacyMode!=sync, then is must be one of {legacyAsync, xd, false}
						legacyMode==sync && (legacyMode = xd);
						// fall through and load via script injection
					}else if(module.isAmd && legacyMode!=sync){
						// fall through and load via script injection
					}else{
						// mode may be sync, xd/legacyAsync, or async; module may be AMD or legacy; but module is always located on the same domain
						var xhrCallback = function(text){
							if(legacyMode==sync){
								// the top of syncExecStack gives the current synchronously executing module; the loader needs
								// to know this if it has to switch to async loading in the middle of evaluating a legacy module
								// this happens when a modules dojo.require's a module that must be loaded async because it's xdomain
								// (using unshift/shift because there is no back() methods for Javascript arrays)
								syncExecStack.unshift(module);
								evalModuleText(text, module);
								syncExecStack.shift();

								// maybe the module was an AMD module
								runDefQ(module);

								// legacy modules never get to defineModule() => cjs and injected never set; also evaluation implies executing
								if(!module.cjs){
									setArrived(module);
									finishExec(module);
								}

								if(module.finish){
									// while synchronously evaluating this module, dojo.require was applied referencing a module
									// that had to be loaded async; therefore, the loader stopped answering all dojo.require
									// requests so they could be answered completely in the correct sequence; module.finish gives
									// the list of dojo.requires that must be re-applied once all target modules are available;
									// make a synthetic module to execute the dojo.require's in the correct order

									// compute a guaranteed-unique mid for the synthetic finish module; remember the finish vector; remove it from the reference module
									// TODO: can we just leave the module.finish...what's it hurting?
									var finishMid = mid + "*finish",
										finish = module.finish;
									delete module.finish;

									def(finishMid, ["dojo", ("dojo/require!" + finish.join(",")).replace(/\./g, "/")], function(dojo){
										forEach(finish, function(mid){ dojo.require(mid); });
									});
									// unshift, not push, which causes the current traversal to be reattempted from the top
									execQ.unshift(getModule(finishMid));
								}
								onLoadCallback();
							}else{
								text = transformToAmd(module, text);
								if(text){
									evalModuleText(text, module);
									onLoadCallback();
								}else{
									// if transformToAmd returned falsy, then the module was already AMD and it can be script-injected
									// do so to improve debugability(even though it means another download...which probably won't happen with a good browser cache)
									injectingModule = module;
									req.injectUrl(fixupUrl(url), onLoadCallback, module);
									injectingModule = 0;
								}
							}
						};

						req.trace("loader-inject", ["xhr", module.mid, url, legacyMode!=sync]);
						if( 0 ){
							try{
								req.getText(url, legacyMode!=sync, xhrCallback);
							}catch(e){
								signal(error, makeError("xhrInjectFailed", [module, e]));
							}
						}else{
							req.getText(url, legacyMode!=sync, xhrCallback);
						}
						return;
					}
				} // else async mode or fell through in xdomain loading mode; either way, load by script injection
				req.trace("loader-inject", ["script", module.mid, url]);
				injectingModule = module;
				req.injectUrl(fixupUrl(url), onLoadCallback, module);
				injectingModule = 0;
			},

			defineModule = function(module, deps, def){
				req.trace("loader-define-module", [module.mid, deps]);

				if( 0  && module.plugin && module.plugin.isCombo){
					// the module is a plugin resource loaded by the combo service
					// note: check for module.plugin should be enough since normal plugin resources should
					// not follow this path; module.plugin.isCombo is future-proofing belt and suspenders
					module.result = isFunction(def) ? def() : def;
					setArrived(module);
					finishExec(module);
					return module;
				}

				var mid = module.mid;
				if(module.injected === arrived){
					signal(error, makeError("multipleDefine", module));
					return module;
				}
				mix(module, {
					deps: deps,
					def: def,
					cjs: {
						id: module.mid,
						uri: module.url,
						exports: (module.result = {}),
						setExports: function(exports){
							module.cjs.exports = exports;
						},
						config:function(){
							return module.config;
						}
					}
				});

				// resolve deps with respect to this module
				for(var i = 0; deps[i]; i++){
					deps[i] = getModule(deps[i], module);
				}

				if( 0  && legacyMode && !waiting[mid]){
					// the module showed up without being asked for; it was probably in a <script> element
					injectDependencies(module);
					execQ.push(module);
					checkComplete();
				}
				setArrived(module);

				if(!isFunction(def) && !deps.length){
					module.result = def;
					finishExec(module);
				}

				return module;
			},

			runDefQ = function(referenceModule, mids){
				// defQ is an array of [id, dependencies, factory]
				// mids (if any) is a vector of mids given by a combo service
				var definedModules = [],
					module, args;
				while(defQ.length){
					args = defQ.shift();
					mids && (args[0]= mids.shift());
					// explicit define indicates possible multiple modules in a single file; delay injecting dependencies until defQ fully
					// processed since modules earlier in the queue depend on already-arrived modules that are later in the queue
					// TODO: what if no args[0] and no referenceModule
					module = (args[0] && getModule(args[0])) || referenceModule;
					definedModules.push([module, args[1], args[2]]);
				}
				consumePendingCacheInsert(referenceModule);
				forEach(definedModules, function(args){
					injectDependencies(defineModule.apply(null, args));
				});
			};
	}

	var timerId = 0,
		clearTimer = noop,
		startTimer = noop;
	if( 0 ){
		// Timer machinery that monitors how long the loader is waiting and signals an error when the timer runs out.
		clearTimer = function(){
			timerId && clearTimeout(timerId);
			timerId = 0;
		};

		startTimer = function(){
			clearTimer();
			if(req.waitms){
				timerId = global.setTimeout(function(){
					clearTimer();
					signal(error, makeError("timeout", waiting));
				}, req.waitms);
			}
		};
	}

	if ( 1 ) {
		// Test for IE's different way of signaling when scripts finish loading.  Note that according to
		// http://bugs.dojotoolkit.org/ticket/15096#comment:14, IE9 also needs to follow the
		// IE specific code path even though it has an addEventListener() method.
		// Unknown if special path needed on IE10+, which also has a document.attachEvent() method.
		// Should evaluate to false for Opera and Windows 8 apps, even though they document.attachEvent()
		//  is defined in both those environments.
		has.add("ie-event-behavior", doc.attachEvent && typeof Windows === "undefined" &&
			(typeof opera === "undefined" || opera.toString() != "[object Opera]"));
	}

	if( 1  && ( 1  ||  1 )){
		var domOn = function(node, eventName, ieEventName, handler){
				// Add an event listener to a DOM node using the API appropriate for the current browser;
				// return a function that will disconnect the listener.
				if(!has("ie-event-behavior")){
					node.addEventListener(eventName, handler, false);
					return function(){
						node.removeEventListener(eventName, handler, false);
					};
				}else{
					node.attachEvent(ieEventName, handler);
					return function(){
						node.detachEvent(ieEventName, handler);
					};
				}
			},
			windowOnLoadListener = domOn(window, "load", "onload", function(){
				req.pageLoaded = 1;
				// https://bugs.dojotoolkit.org/ticket/16248
				try{
					doc.readyState!="complete" && (doc.readyState = "complete");
				}catch(e){
				}
				windowOnLoadListener();
			});

		if( 1 ){
			// if the loader is on the page, there must be at least one script element
			// getting its parent and then doing insertBefore solves the "Operation Aborted"
			// error in IE from appending to a node that isn't properly closed; see
			// dojo/tests/_base/loader/requirejs/simple-badbase.html for an example
			// don't use scripts with type dojo/... since these may be removed; see #15809
			// prefer to use the insertPoint computed during the config sniff in case a script is removed; see #16958
			var scripts = doc.getElementsByTagName("script"),
				i = 0,
				script;
			while(!insertPointSibling){
				if(!/^dojo/.test((script = scripts[i++]) && script.type)){
					insertPointSibling= script;
				}
			}

			req.injectUrl = function(url, callback, owner){
				// insert a script element to the insert-point element with src=url;
				// apply callback upon detecting the script has loaded.

				var node = owner.node = doc.createElement("script"),
					onLoad = function(e){
						e = e || window.event;
						var node = e.target || e.srcElement;
						if(e.type === "load" || /complete|loaded/.test(node.readyState)){
							loadDisconnector();
							errorDisconnector();
							callback && callback();
						}
					},
					loadDisconnector = domOn(node, "load", "onreadystatechange", onLoad),
					errorDisconnector = domOn(node, "error", "onerror", function(e){
						loadDisconnector();
						errorDisconnector();
						signal(error, makeError("scriptError: " + url, [url, e]));
					});

				node.type = "text/javascript";
				node.charset = "utf-8";
				node.src = url;
				insertPointSibling.parentNode.insertBefore(node, insertPointSibling);
				return node;
			};
		}
	}

	if( 0 ){
		req.log = function(){
			try{
				for(var i = 0; i < arguments.length; i++){
					console.log(arguments[i]);
				}
			}catch(e){}
		};
	}else{
		req.log = noop;
	}

	if( 0 ){
		var trace = req.trace = function(
			group,	// the trace group to which this application belongs
			args	// the contents of the trace
		){
			///
			// Tracing interface by group.
			//
			// Sends the contents of args to the console iff (req.trace.on && req.trace[group])

			if(trace.on && trace.group[group]){
				signal("trace", [group, args]);
				for(var arg, dump = [], text= "trace:" + group + (args.length ? (":" + args[0]) : ""), i= 1; i<args.length;){
					arg = args[i++];
					if(isString(arg)){
						text += ", " + arg;
					}else{
						dump.push(arg);
					}
				}
				req.log(text);
				dump.length && dump.push(".");
				req.log.apply(req, dump);
			}
		};
		mix(trace, {
			on:1,
			group:{},
			set:function(group, value){
				if(isString(group)){
					trace.group[group]= value;
				}else{
					mix(trace.group, group);
				}
			}
		});
		trace.set(mix(mix(mix({}, defaultConfig.trace), userConfig.trace), dojoSniffConfig.trace));
		on("config", function(config){
			config.trace && trace.set(config.trace);
		});
	}else{
		req.trace = noop;
	}
	if (!has("foreign-loader")) {
		var def = function(
			mid,		  //(commonjs.moduleId, optional)
			dependencies, //(array of commonjs.moduleId, optional) list of modules to be loaded before running factory
			factory		  //(any)
		){
			///
			// Advises the loader of a module factory. //Implements http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition.
			///
			//note
			// CommonJS factory scan courtesy of http://requirejs.org

			var arity = arguments.length,
				defaultDeps = ["require", "exports", "module"],
				// the predominate signature...
				args = [0, mid, dependencies];
			if(arity==1){
				args = [0, (isFunction(mid) ? defaultDeps : []), mid];
			}else if(arity==2 && isString(mid)){
				args = [mid, (isFunction(dependencies) ? defaultDeps : []), dependencies];
			}else if(arity==3){
				args = [mid, dependencies, factory];
			}

			if( 1  && args[1]===defaultDeps){
				args[2].toString()
					.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, "")
					.replace(/require\(["']([\w\!\-_\.\/]+)["']\)/g, function(match, dep){
					args[1].push(dep);
				});
			}

			req.trace("loader-define", args.slice(0, 2));
			var targetModule = args[0] && getModule(args[0]),
				module;
			if(targetModule && !waiting[targetModule.mid]){
				// given a mid that hasn't been requested; therefore, defined through means other than injecting
				// consequent to a require() or define() application; examples include defining modules on-the-fly
				// due to some code path or including a module in a script element. In any case,
				// there is no callback waiting to finish processing and nothing to trigger the defQ and the
				// dependencies are never requested; therefore, do it here.
				injectDependencies(defineModule(targetModule, args[1], args[2]));
			}else if(!has("ie-event-behavior") || ! 1  || injectingCachedModule){
				// not IE path: anonymous module and therefore must have been injected; therefore, onLoad will fire immediately
				// after script finishes being evaluated and the defQ can be run from that callback to detect the module id
				defQ.push(args);
			}else{
				// IE path: possibly anonymous module and therefore injected; therefore, cannot depend on 1-to-1,
				// in-order exec of onLoad with script eval (since it's IE) and must manually detect here
				targetModule = targetModule || injectingModule;
				if(!targetModule){
					for(mid in waiting){
						module = modules[mid];
						if(module && module.node && module.node.readyState === 'interactive'){
							targetModule = module;
							break;
						}
					}
					if( 0  && !targetModule){
						for(var i = 0; i<combosPending.length; i++){
							targetModule = combosPending[i];
							if(targetModule.node && targetModule.node.readyState === 'interactive'){
								break;
							}
							targetModule= 0;
						}
					}
				}
				if( 0  && isArray(targetModule)){
					injectDependencies(defineModule(getModule(targetModule.shift()), args[1], args[2]));
					if(!targetModule.length){
						combosPending.splice(i, 1);
					}
				}else if(targetModule){
					consumePendingCacheInsert(targetModule);
					injectDependencies(defineModule(targetModule, args[1], args[2]));
				}else{
					signal(error, makeError("ieDefineFailed", args[0]));
				}
				checkComplete();
			}
		};
		def.amd = {
			vendor:"dojotoolkit.org"
		};

		if( 0 ){
			req.def = def;
		}
	} else {
		var def = noop;
	}
	// allow config to override default implementation of named functions; this is useful for
	// non-browser environments, e.g., overriding injectUrl, getText, log, etc. in node.js, Rhino, etc.
	// also useful for testing and monkey patching loader
	mix(mix(req, defaultConfig.loaderPatch), userConfig.loaderPatch);

	// now that req is fully initialized and won't change, we can hook it up to the error signal
	on(error, function(arg){
		try{
			console.error(arg);
			if(arg instanceof Error){
				for(var p in arg){
					console.log(p + ":", arg[p]);
				}
				console.log(".");
			}
		}catch(e){}
	});

	// always publish these
	mix(req, {
		uid:uid,
		cache:cache,
		packs:packs
	});


	if( 0 ){
		mix(req, {
			// these may be interesting to look at when debugging
			paths:paths,
			aliases:aliases,
			modules:modules,
			legacyMode:legacyMode,
			execQ:execQ,
			defQ:defQ,
			waiting:waiting,

			// these are used for testing
			// TODO: move testing infrastructure to a different has feature
			packs:packs,
			mapProgs:mapProgs,
			pathsMapProg:pathsMapProg,
			listenerQueues:listenerQueues,

			// these are used by the builder (at least)
			computeMapProg:computeMapProg,
			computeAliases:computeAliases,
			runMapProg:runMapProg,
			compactPath:compactPath,
			getModuleInfo:getModuleInfo_
		});
	}

	// the loader can be defined exactly once; look for global define which is the symbol AMD loaders are
	// *required* to define (as opposed to require, which is optional)
	if(global.define){
		if( 0 ){
			signal(error, makeError("defineAlreadyDefined", 0));
		}
		return;
	}else{
		global.define = def;
		global.require = req;
		if( 0 ){
			require = req;
		}
	}

	if( 0  && req.combo && req.combo.plugins){
		var plugins = req.combo.plugins,
			pluginName;
		for(pluginName in plugins){
			mix(mix(getModule(pluginName), plugins[pluginName]), {isCombo:1, executed:"executed", load:1});
		}
	}

	if( 1  && !has("foreign-loader")){
		forEach(delayedModuleConfig, function(c){ config(c); });
		var bootDeps = dojoSniffConfig.deps ||	userConfig.deps || defaultConfig.deps,
			bootCallback = dojoSniffConfig.callback || userConfig.callback || defaultConfig.callback;
		req.boot = (bootDeps || bootCallback) ? [bootDeps || [], bootCallback] : 0;
	}
	if(! 1 ){
		!req.async && req(["dojo"]);
		req.boot && req.apply(null, req.boot);
	}
})
(function(global){ return global.dojoConfig || global.djConfig || global.require || {}; }, {
		async:1,
		hasCache:{
				'config-selectorEngine':"lite",
				'config-tlmSiblingOfDojo':1,
				'dojo-built':1,
				'dojo-loader':1,
				dom:1,
				'host-browser':1
		},
		packages:[
				{
					 location:"../dojox",
					 name:"dojox"
				},
				{
					 location:"../dijit",
					 name:"dijit"
				},
				{
					 location:".",
					 name:"dojo"
				},
				{
					 location:"../engine",
					 name:"engine"
				},
				{
					 location:"../util",
					 name:"util"
				},
				{
					 location:"../animator",
					 name:"animator"
				},
				{
					 location:"../pdf",
					 name:"pdf"
				}
		]
});require({cache:{
'dojo/_base/fx':function(){
define(["./kernel", "./config", /*===== "./declare", =====*/ "./lang", "../Evented", "./Color", "../aspect", "../sniff", "../dom", "../dom-style"],
	function(dojo, config, /*===== declare, =====*/ lang, Evented, Color, aspect, has, dom, style){
	// module:
	//		dojo/_base/fx
	// notes:
	//		Animation loosely package based on Dan Pupius' work, contributed under CLA; see
	//		http://pupius.co.uk/js/Toolkit.Drawing.js

	var _mixin = lang.mixin;

	// Module export
	var basefx = {
		// summary:
		//		This module defines the base dojo/_base/fx implementation.
	};

	var _Line = basefx._Line = function(/*int*/ start, /*int*/ end){
		// summary:
		//		Object used to generate values from a start value to an end value
		// start: int
		//		Beginning value for range
		// end: int
		//		Ending value for range
		this.start = start;
		this.end = end;
	};

	_Line.prototype.getValue = function(/*float*/ n){
		// summary:
		//		Returns the point on the line
		// n:
		//		a floating point number greater than 0 and less than 1
		return ((this.end - this.start) * n) + this.start; // Decimal
	};

	var Animation = basefx.Animation = function(args){
		// summary:
		//		A generic animation class that fires callbacks into its handlers
		//		object at various states.
		// description:
		//		A generic animation class that fires callbacks into its handlers
		//		object at various states. Nearly all dojo animation functions
		//		return an instance of this method, usually without calling the
		//		.play() method beforehand. Therefore, you will likely need to
		//		call .play() on instances of `Animation` when one is
		//		returned.
		// args: Object
		//		The 'magic argument', mixing all the properties into this
		//		animation instance.

		_mixin(this, args);
		if(lang.isArray(this.curve)){
			this.curve = new _Line(this.curve[0], this.curve[1]);
		}

	};
	Animation.prototype = new Evented();

	lang.extend(Animation, {
		// duration: Integer
		//		The time in milliseconds the animation will take to run
		duration: 350,

	/*=====
		// curve: _Line|Array
		//		A two element array of start and end values, or a `_Line` instance to be
		//		used in the Animation.
		curve: null,

		// easing: Function?
		//		A Function to adjust the acceleration (or deceleration) of the progress
		//		across a _Line
		easing: null,
	=====*/

		// repeat: Integer?
		//		The number of times to loop the animation
		repeat: 0,

		// rate: Integer?
		//		the time in milliseconds to wait before advancing to next frame
		//		(used as a fps timer: 1000/rate = fps)
		rate: 20 /* 50 fps */,

	/*=====
		// delay: Integer?
		//		The time in milliseconds to wait before starting animation after it
		//		has been .play()'ed
		delay: null,

		// beforeBegin: Event?
		//		Synthetic event fired before a Animation begins playing (synchronous)
		beforeBegin: null,

		// onBegin: Event?
		//		Synthetic event fired as a Animation begins playing (useful?)
		onBegin: null,

		// onAnimate: Event?
		//		Synthetic event fired at each interval of the Animation
		onAnimate: null,

		// onEnd: Event?
		//		Synthetic event fired after the final frame of the Animation
		onEnd: null,

		// onPlay: Event?
		//		Synthetic event fired any time the Animation is play()'ed
		onPlay: null,

		// onPause: Event?
		//		Synthetic event fired when the Animation is paused
		onPause: null,

		// onStop: Event
		//		Synthetic event fires when the Animation is stopped
		onStop: null,

	=====*/

		_percent: 0,
		_startRepeatCount: 0,

		_getStep: function(){
			var _p = this._percent,
				_e = this.easing
			;
			return _e ? _e(_p) : _p;
		},
		_fire: function(/*Event*/ evt, /*Array?*/ args){
			// summary:
			//		Convenience function.  Fire event "evt" and pass it the
			//		arguments specified in "args".
			// description:
			//		Convenience function.  Fire event "evt" and pass it the
			//		arguments specified in "args".
			//		Fires the callback in the scope of this Animation
			//		instance.
			// evt:
			//		The event to fire.
			// args:
			//		The arguments to pass to the event.
			var a = args||[];
			if(this[evt]){
				if(config.debugAtAllCosts){
					this[evt].apply(this, a);
				}else{
					try{
						this[evt].apply(this, a);
					}catch(e){
						// squelch and log because we shouldn't allow exceptions in
						// synthetic event handlers to cause the internal timer to run
						// amuck, potentially pegging the CPU. I'm not a fan of this
						// squelch, but hopefully logging will make it clear what's
						// going on
						console.error("exception in animation handler for:", evt);
						console.error(e);
					}
				}
			}
			return this; // Animation
		},

		play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
			// summary:
			//		Start the animation.
			// delay:
			//		How many milliseconds to delay before starting.
			// gotoStart:
			//		If true, starts the animation from the beginning; otherwise,
			//		starts it from its current position.
			// returns: Animation
			//		The instance to allow chaining.

			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			if(gotoStart){
				_t._stopTimer();
				_t._active = _t._paused = false;
				_t._percent = 0;
			}else if(_t._active && !_t._paused){
				return _t;
			}

			_t._fire("beforeBegin", [_t.node]);

			var de = delay || _t.delay,
				_p = lang.hitch(_t, "_play", gotoStart);

			if(de > 0){
				_t._delayTimer = setTimeout(_p, de);
				return _t;
			}
			_p();
			return _t;	// Animation
		},

		_play: function(gotoStart){
			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			_t._startTime = new Date().valueOf();
			if(_t._paused){
				_t._startTime -= _t.duration * _t._percent;
			}

			_t._active = true;
			_t._paused = false;
			var value = _t.curve.getValue(_t._getStep());
			if(!_t._percent){
				if(!_t._startRepeatCount){
					_t._startRepeatCount = _t.repeat;
				}
				_t._fire("onBegin", [value]);
			}

			_t._fire("onPlay", [value]);

			_t._cycle();
			return _t; // Animation
		},

		pause: function(){
			// summary:
			//		Pauses a running animation.
			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			_t._stopTimer();
			if(!_t._active){ return _t; /*Animation*/ }
			_t._paused = true;
			_t._fire("onPause", [_t.curve.getValue(_t._getStep())]);
			return _t; // Animation
		},

		gotoPercent: function(/*Decimal*/ percent, /*Boolean?*/ andPlay){
			// summary:
			//		Sets the progress of the animation.
			// percent:
			//		A percentage in decimal notation (between and including 0.0 and 1.0).
			// andPlay:
			//		If true, play the animation after setting the progress.
			var _t = this;
			_t._stopTimer();
			_t._active = _t._paused = true;
			_t._percent = percent;
			if(andPlay){ _t.play(); }
			return _t; // Animation
		},

		stop: function(/*boolean?*/ gotoEnd){
			// summary:
			//		Stops a running animation.
			// gotoEnd:
			//		If true, the animation will end.
			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			if(!_t._timer){ return _t; /* Animation */ }
			_t._stopTimer();
			if(gotoEnd){
				_t._percent = 1;
			}
			_t._fire("onStop", [_t.curve.getValue(_t._getStep())]);
			_t._active = _t._paused = false;
			return _t; // Animation
		},

		destroy: function(){
			// summary:
			//		cleanup the animation
			this.stop();
		},

		status: function(){
			// summary:
			//		Returns a string token representation of the status of
			//		the animation, one of: "paused", "playing", "stopped"
			if(this._active){
				return this._paused ? "paused" : "playing"; // String
			}
			return "stopped"; // String
		},

		_cycle: function(){
			var _t = this;
			if(_t._active){
				var curr = new Date().valueOf();
				// Allow durations of 0 (instant) by setting step to 1 - see #13798
				var step = _t.duration === 0 ? 1 : (curr - _t._startTime) / (_t.duration);

				if(step >= 1){
					step = 1;
				}
				_t._percent = step;

				// Perform easing
				if(_t.easing){
					step = _t.easing(step);
				}

				_t._fire("onAnimate", [_t.curve.getValue(step)]);

				if(_t._percent < 1){
					_t._startTimer();
				}else{
					_t._active = false;

					if(_t.repeat > 0){
						_t.repeat--;
						_t.play(null, true);
					}else if(_t.repeat == -1){
						_t.play(null, true);
					}else{
						if(_t._startRepeatCount){
							_t.repeat = _t._startRepeatCount;
							_t._startRepeatCount = 0;
						}
					}
					_t._percent = 0;
					_t._fire("onEnd", [_t.node]);
					!_t.repeat && _t._stopTimer();
				}
			}
			return _t; // Animation
		},

		_clearTimer: function(){
			// summary:
			//		Clear the play delay timer
			clearTimeout(this._delayTimer);
			delete this._delayTimer;
		}

	});

	// the local timer, stubbed into all Animation instances
	var ctr = 0,
		timer = null,
		runner = {
			run: function(){}
		};

	lang.extend(Animation, {

		_startTimer: function(){
			if(!this._timer){
				this._timer = aspect.after(runner, "run", lang.hitch(this, "_cycle"), true);
				ctr++;
			}
			if(!timer){
				timer = setInterval(lang.hitch(runner, "run"), this.rate);
			}
		},

		_stopTimer: function(){
			if(this._timer){
				this._timer.remove();
				this._timer = null;
				ctr--;
			}
			if(ctr <= 0){
				clearInterval(timer);
				timer = null;
				ctr = 0;
			}
		}

	});

	var _makeFadeable =
		has("ie") ? function(node){
			// only set the zoom if the "tickle" value would be the same as the
			// default
			var ns = node.style;
			// don't set the width to auto if it didn't already cascade that way.
			// We don't want to f anyones designs
			if(!ns.width.length && style.get(node, "width") == "auto"){
				ns.width = "auto";
			}
		} :
		function(){};

	basefx._fade = function(/*Object*/ args){
		// summary:
		//		Returns an animation that will fade the node defined by
		//		args.node from the start to end values passed (args.start
		//		args.end) (end is mandatory, start is optional)

		args.node = dom.byId(args.node);
		var fArgs = _mixin({ properties: {} }, args),
			props = (fArgs.properties.opacity = {});

		props.start = !("start" in fArgs) ?
			function(){
				return +style.get(fArgs.node, "opacity")||0;
			} : fArgs.start;
		props.end = fArgs.end;

		var anim = basefx.animateProperty(fArgs);
		aspect.after(anim, "beforeBegin", lang.partial(_makeFadeable, fArgs.node), true);

		return anim; // Animation
	};

	/*=====
	var __FadeArgs = declare(null, {
		// node: DOMNode|String
		//		The node referenced in the animation
		// duration: Integer?
		//		Duration of the animation in milliseconds.
		// easing: Function?
		//		An easing function.
	});
	=====*/

	basefx.fadeIn = function(/*__FadeArgs*/ args){
		// summary:
		//		Returns an animation that will fade node defined in 'args' from
		//		its current opacity to fully opaque.
		return basefx._fade(_mixin({ end: 1 }, args)); // Animation
	};

	basefx.fadeOut = function(/*__FadeArgs*/ args){
		// summary:
		//		Returns an animation that will fade node defined in 'args'
		//		from its current opacity to fully transparent.
		return basefx._fade(_mixin({ end: 0 }, args)); // Animation
	};

	basefx._defaultEasing = function(/*Decimal?*/ n){
		// summary:
		//		The default easing function for Animation(s)
		return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2);	// Decimal
	};

	var PropLine = function(properties){
		// PropLine is an internal class which is used to model the values of
		// an a group of CSS properties across an animation lifecycle. In
		// particular, the "getValue" function handles getting interpolated
		// values between start and end for a particular CSS value.
		this._properties = properties;
		for(var p in properties){
			var prop = properties[p];
			if(prop.start instanceof Color){
				// create a reusable temp color object to keep intermediate results
				prop.tempColor = new Color();
			}
		}
	};

	PropLine.prototype.getValue = function(r){
		var ret = {};
		for(var p in this._properties){
			var prop = this._properties[p],
				start = prop.start;
			if(start instanceof Color){
				ret[p] = Color.blendColors(start, prop.end, r, prop.tempColor).toCss();
			}else if(!lang.isArray(start)){
				ret[p] = ((prop.end - start) * r) + start + (p != "opacity" ? prop.units || "px" : 0);
			}
		}
		return ret;
	};

	/*=====
	var __AnimArgs = declare(__FadeArgs, {
		// properties: Object?
		//		A hash map of style properties to Objects describing the transition,
		//		such as the properties of _Line with an additional 'units' property
		properties: {}

		//TODOC: add event callbacks
	});
	=====*/

	basefx.animateProperty = function(/*__AnimArgs*/ args){
		// summary:
		//		Returns an animation that will transition the properties of
		//		node defined in `args` depending how they are defined in
		//		`args.properties`
		//
		// description:
		//		Foundation of most `dojo/_base/fx`
		//		animations. It takes an object of "properties" corresponding to
		//		style properties, and animates them in parallel over a set
		//		duration.
		//
		// example:
		//		A simple animation that changes the width of the specified node.
		//	|	basefx.animateProperty({
		//	|		node: "nodeId",
		//	|		properties: { width: 400 },
		//	|	}).play();
		//		Dojo figures out the start value for the width and converts the
		//		integer specified for the width to the more expressive but
		//		verbose form `{ width: { end: '400', units: 'px' } }` which you
		//		can also specify directly. Defaults to 'px' if omitted.
		//
		// example:
		//		Animate width, height, and padding over 2 seconds... the
		//		pedantic way:
		//	|	basefx.animateProperty({ node: node, duration:2000,
		//	|		properties: {
		//	|			width: { start: '200', end: '400', units:"px" },
		//	|			height: { start:'200', end: '400', units:"px" },
		//	|			paddingTop: { start:'5', end:'50', units:"px" }
		//	|		}
		//	|	}).play();
		//		Note 'paddingTop' is used over 'padding-top'. Multi-name CSS properties
		//		are written using "mixed case", as the hyphen is illegal as an object key.
		//
		// example:
		//		Plug in a different easing function and register a callback for
		//		when the animation ends. Easing functions accept values between
		//		zero and one and return a value on that basis. In this case, an
		//		exponential-in curve.
		//	|	basefx.animateProperty({
		//	|		node: "nodeId",
		//	|		// dojo figures out the start value
		//	|		properties: { width: { end: 400 } },
		//	|		easing: function(n){
		//	|			return (n==0) ? 0 : Math.pow(2, 10 * (n - 1));
		//	|		},
		//	|		onEnd: function(node){
		//	|			// called when the animation finishes. The animation
		//	|			// target is passed to this function
		//	|		}
		//	|	}).play(500); // delay playing half a second
		//
		// example:
		//		Like all `Animation`s, animateProperty returns a handle to the
		//		Animation instance, which fires the events common to Dojo FX. Use `aspect.after`
		//		to access these events outside of the Animation definition:
		//	|	var anim = basefx.animateProperty({
		//	|		node:"someId",
		//	|		properties:{
		//	|			width:400, height:500
		//	|		}
		//	|	});
		//	|	aspect.after(anim, "onEnd", function(){
		//	|		console.log("animation ended");
		//	|	}, true);
		//	|	// play the animation now:
		//	|	anim.play();
		//
		// example:
		//		Each property can be a function whose return value is substituted along.
		//		Additionally, each measurement (eg: start, end) can be a function. The node
		//		reference is passed directly to callbacks.
		//	|	basefx.animateProperty({
		//	|		node:"mine",
		//	|		properties:{
		//	|			height:function(node){
		//	|				// shrink this node by 50%
		//	|				return domGeom.position(node).h / 2
		//	|			},
		//	|			width:{
		//	|				start:function(node){ return 100; },
		//	|				end:function(node){ return 200; }
		//	|			}
		//	|		}
		//	|	}).play();
		//

		var n = args.node = dom.byId(args.node);
		if(!args.easing){ args.easing = dojo._defaultEasing; }

		var anim = new Animation(args);
		aspect.after(anim, "beforeBegin", lang.hitch(anim, function(){
			var pm = {};
			for(var p in this.properties){
				// Make shallow copy of properties into pm because we overwrite
				// some values below. In particular if start/end are functions
				// we don't want to overwrite them or the functions won't be
				// called if the animation is reused.
				if(p == "width" || p == "height"){
					this.node.display = "block";
				}
				var prop = this.properties[p];
				if(lang.isFunction(prop)){
					prop = prop(n);
				}
				prop = pm[p] = _mixin({}, (lang.isObject(prop) ? prop: { end: prop }));

				if(lang.isFunction(prop.start)){
					prop.start = prop.start(n);
				}
				if(lang.isFunction(prop.end)){
					prop.end = prop.end(n);
				}
				var isColor = (p.toLowerCase().indexOf("color") >= 0);
				function getStyle(node, p){
					// domStyle.get(node, "height") can return "auto" or "" on IE; this is more reliable:
					var v = { height: node.offsetHeight, width: node.offsetWidth }[p];
					if(v !== undefined){ return v; }
					v = style.get(node, p);
					return (p == "opacity") ? +v : (isColor ? v : parseFloat(v));
				}
				if(!("end" in prop)){
					prop.end = getStyle(n, p);
				}else if(!("start" in prop)){
					prop.start = getStyle(n, p);
				}

				if(isColor){
					prop.start = new Color(prop.start);
					prop.end = new Color(prop.end);
				}else{
					prop.start = (p == "opacity") ? +prop.start : parseFloat(prop.start);
				}
			}
			this.curve = new PropLine(pm);
		}), true);
		aspect.after(anim, "onAnimate", lang.hitch(style, "set", anim.node), true);
		return anim; // Animation
	};

	basefx.anim = function(	/*DOMNode|String*/	node,
							/*Object*/			properties,
							/*Integer?*/		duration,
							/*Function?*/		easing,
							/*Function?*/		onEnd,
							/*Integer?*/		delay){
		// summary:
		//		A simpler interface to `animateProperty()`, also returns
		//		an instance of `Animation` but begins the animation
		//		immediately, unlike nearly every other Dojo animation API.
		// description:
		//		Simpler (but somewhat less powerful) version
		//		of `animateProperty`.  It uses defaults for many basic properties
		//		and allows for positional parameters to be used in place of the
		//		packed "property bag" which is used for other Dojo animation
		//		methods.
		//
		//		The `Animation` object returned will be already playing, so
		//		calling play() on it again is (usually) a no-op.
		// node:
		//		a DOM node or the id of a node to animate CSS properties on
		// duration:
		//		The number of milliseconds over which the animation
		//		should run. Defaults to the global animation default duration
		//		(350ms).
		// easing:
		//		An easing function over which to calculate acceleration
		//		and deceleration of the animation through its duration.
		//		A default easing algorithm is provided, but you may
		//		plug in any you wish. A large selection of easing algorithms
		//		are available in `dojo/fx/easing`.
		// onEnd:
		//		A function to be called when the animation finishes
		//		running.
		// delay:
		//		The number of milliseconds to delay beginning the
		//		animation by. The default is 0.
		// example:
		//		Fade out a node
		//	|	basefx.anim("id", { opacity: 0 });
		// example:
		//		Fade out a node over a full second
		//	|	basefx.anim("id", { opacity: 0 }, 1000);
		return basefx.animateProperty({ // Animation
			node: node,
			duration: duration || Animation.prototype.duration,
			properties: properties,
			easing: easing,
			onEnd: onEnd
		}).play(delay || 0);
	};


	if( 1 ){
		_mixin(dojo, basefx);
		// Alias to drop come 2.0:
		dojo._Animation = Animation;
	}

	return basefx;
});

},
'dojo/dom-form':function(){
define(["./_base/lang", "./dom", "./io-query", "./json"], function(lang, dom, ioq, json){
	// module:
	//		dojo/dom-form

    function setValue(/*Object*/ obj, /*String*/ name, /*String*/ value){
        // summary:
        //		For the named property in object, set the value. If a value
        //		already exists and it is a string, convert the value to be an
        //		array of values.

        // Skip it if there is no value
        if(value === null){
            return;
        }

        var val = obj[name];
        if(typeof val == "string"){ // inline'd type check
            obj[name] = [val, value];
        }else if(lang.isArray(val)){
            val.push(value);
        }else{
            obj[name] = value;
        }
    }

	var exclude = "file|submit|image|reset|button";

	var form = {
		// summary:
		//		This module defines form-processing functions.

		fieldToObject: function fieldToObject(/*DOMNode|String*/ inputNode){
			// summary:
			//		Serialize a form field to a JavaScript object.
			// description:
			//		Returns the value encoded in a form field as
			//		as a string or an array of strings. Disabled form elements
			//		and unchecked radio and checkboxes are skipped.	Multi-select
			//		elements are returned as an array of string values.
			// inputNode: DOMNode|String
			// returns: Object

			var ret = null;
			inputNode = dom.byId(inputNode);
			if(inputNode){
				var _in = inputNode.name, type = (inputNode.type || "").toLowerCase();
				if(_in && type && !inputNode.disabled){
					if(type == "radio" || type == "checkbox"){
						if(inputNode.checked){
							ret = inputNode.value;
						}
					}else if(inputNode.multiple){
						ret = [];
						var nodes = [inputNode.firstChild];
						while(nodes.length){
							for(var node = nodes.pop(); node; node = node.nextSibling){
								if(node.nodeType == 1 && node.tagName.toLowerCase() == "option"){
									if(node.selected){
										ret.push(node.value);
									}
								}else{
									if(node.nextSibling){
										nodes.push(node.nextSibling);
									}
									if(node.firstChild){
										nodes.push(node.firstChild);
									}
									break;
								}
							}
						}
					}else{
						ret = inputNode.value;
					}
				}
			}
			return ret; // Object
		},

		toObject: function formToObject(/*DOMNode|String*/ formNode){
			// summary:
			//		Serialize a form node to a JavaScript object.
			// description:
			//		Returns the values encoded in an HTML form as
			//		string properties in an object which it then returns. Disabled form
			//		elements, buttons, and other non-value form elements are skipped.
			//		Multi-select elements are returned as an array of string values.
			// formNode: DOMNode|String
			// example:
			//		This form:
			//		|	<form id="test_form">
			//		|		<input type="text" name="blah" value="blah">
			//		|		<input type="text" name="no_value" value="blah" disabled>
			//		|		<input type="button" name="no_value2" value="blah">
			//		|		<select type="select" multiple name="multi" size="5">
			//		|			<option value="blah">blah</option>
			//		|			<option value="thud" selected>thud</option>
			//		|			<option value="thonk" selected>thonk</option>
			//		|		</select>
			//		|	</form>
			//
			//		yields this object structure as the result of a call to
			//		formToObject():
			//
			//		|	{
			//		|		blah: "blah",
			//		|		multi: [
			//		|			"thud",
			//		|			"thonk"
			//		|		]
			//		|	};

			var ret = {}, elems = dom.byId(formNode).elements;
			for(var i = 0, l = elems.length; i < l; ++i){
				var item = elems[i], _in = item.name, type = (item.type || "").toLowerCase();
				if(_in && type && exclude.indexOf(type) < 0 && !item.disabled){
					setValue(ret, _in, form.fieldToObject(item));
					if(type == "image"){
						ret[_in + ".x"] = ret[_in + ".y"] = ret[_in].x = ret[_in].y = 0;
					}
				}
			}
			return ret; // Object
		},

		toQuery: function formToQuery(/*DOMNode|String*/ formNode){
			// summary:
			//		Returns a URL-encoded string representing the form passed as either a
			//		node or string ID identifying the form to serialize
			// formNode: DOMNode|String
			// returns: String

			return ioq.objectToQuery(form.toObject(formNode)); // String
		},

		toJson: function formToJson(/*DOMNode|String*/ formNode, /*Boolean?*/ prettyPrint){
			// summary:
			//		Create a serialized JSON string from a form node or string
			//		ID identifying the form to serialize
			// formNode: DOMNode|String
			// prettyPrint: Boolean?
			// returns: String

			return json.stringify(form.toObject(formNode), null, prettyPrint ? 4 : 0); // String
		}
	};

    return form;
});

},
'dojo/errors/RequestError':function(){
define(['./create'], function(create){
	// module:
	//		dojo/errors/RequestError

	/*=====
	 return function(){
		 // summary:
		 //		TODOC
	 };
	 =====*/

	return create("RequestError", function(message, response){
		this.response = response;
	});
});

},
'dojo/_base/html':function(){
define(["./kernel", "../dom", "../dom-style", "../dom-attr", "../dom-prop", "../dom-class", "../dom-construct", "../dom-geometry"], function(dojo, dom, style, attr, prop, cls, ctr, geom){
	// module:
	//		dojo/dom

	/*=====
	return {
		// summary:
		//		This module is a stub for the core dojo DOM API.
	};
	=====*/

	// mix-in dom
	dojo.byId = dom.byId;
	dojo.isDescendant = dom.isDescendant;
	dojo.setSelectable = dom.setSelectable;

	// mix-in dom-attr
	dojo.getAttr = attr.get;
	dojo.setAttr = attr.set;
	dojo.hasAttr = attr.has;
	dojo.removeAttr = attr.remove;
	dojo.getNodeProp = attr.getNodeProp;

	dojo.attr = function(node, name, value){
		// summary:
		//		Gets or sets an attribute on an HTML element.
		// description:
		//		Handles normalized getting and setting of attributes on DOM
		//		Nodes. If 2 arguments are passed, and a the second argument is a
		//		string, acts as a getter.
		//
		//		If a third argument is passed, or if the second argument is a
		//		map of attributes, acts as a setter.
		//
		//		When passing functions as values, note that they will not be
		//		directly assigned to slots on the node, but rather the default
		//		behavior will be removed and the new behavior will be added
		//		using `dojo.connect()`, meaning that event handler properties
		//		will be normalized and that some caveats with regards to
		//		non-standard behaviors for onsubmit apply. Namely that you
		//		should cancel form submission using `dojo.stopEvent()` on the
		//		passed event object instead of returning a boolean value from
		//		the handler itself.
		// node: DOMNode|String
		//		id or reference to the element to get or set the attribute on
		// name: String|Object
		//		the name of the attribute to get or set.
		// value: String?
		//		The value to set for the attribute
		// returns:
		//		when used as a getter, the value of the requested attribute
		//		or null if that attribute does not have a specified or
		//		default value;
		//
		//		when used as a setter, the DOM node
		//
		// example:
		//	|	// get the current value of the "foo" attribute on a node
		//	|	dojo.attr(dojo.byId("nodeId"), "foo");
		//	|	// or we can just pass the id:
		//	|	dojo.attr("nodeId", "foo");
		//
		// example:
		//	|	// use attr() to set the tab index
		//	|	dojo.attr("nodeId", "tabIndex", 3);
		//	|
		//
		// example:
		//	Set multiple values at once, including event handlers:
		//	|	dojo.attr("formId", {
		//	|		"foo": "bar",
		//	|		"tabIndex": -1,
		//	|		"method": "POST",
		//	|		"onsubmit": function(e){
		//	|			// stop submitting the form. Note that the IE behavior
		//	|			// of returning true or false will have no effect here
		//	|			// since our handler is connect()ed to the built-in
		//	|			// onsubmit behavior and so we need to use
		//	|			// dojo.stopEvent() to ensure that the submission
		//	|			// doesn't proceed.
		//	|			dojo.stopEvent(e);
		//	|
		//	|			// submit the form with Ajax
		//	|			dojo.xhrPost({ form: "formId" });
		//	|		}
		//	|	});
		//
		// example:
		//	Style is s special case: Only set with an object hash of styles
		//	|	dojo.attr("someNode",{
		//	|		id:"bar",
		//	|		style:{
		//	|			width:"200px", height:"100px", color:"#000"
		//	|		}
		//	|	});
		//
		// example:
		//	Again, only set style as an object hash of styles:
		//	|	var obj = { color:"#fff", backgroundColor:"#000" };
		//	|	dojo.attr("someNode", "style", obj);
		//	|
		//	|	// though shorter to use `dojo.style()` in this case:
		//	|	dojo.style("someNode", obj);

		if(arguments.length == 2){
			return attr[typeof name == "string" ? "get" : "set"](node, name);
		}
		return attr.set(node, name, value);
	};

	// mix-in dom-class
	dojo.hasClass = cls.contains;
	dojo.addClass = cls.add;
	dojo.removeClass = cls.remove;
	dojo.toggleClass = cls.toggle;
	dojo.replaceClass = cls.replace;

	// mix-in dom-construct
	dojo._toDom = dojo.toDom = ctr.toDom;
	dojo.place = ctr.place;
	dojo.create = ctr.create;
	dojo.empty = function(node){ ctr.empty(node); };
	dojo._destroyElement = dojo.destroy = function(node){ ctr.destroy(node); };

	// mix-in dom-geometry
	dojo._getPadExtents = dojo.getPadExtents = geom.getPadExtents;
	dojo._getBorderExtents = dojo.getBorderExtents = geom.getBorderExtents;
	dojo._getPadBorderExtents = dojo.getPadBorderExtents = geom.getPadBorderExtents;
	dojo._getMarginExtents = dojo.getMarginExtents = geom.getMarginExtents;
	dojo._getMarginSize = dojo.getMarginSize = geom.getMarginSize;
	dojo._getMarginBox = dojo.getMarginBox = geom.getMarginBox;
	dojo.setMarginBox = geom.setMarginBox;
	dojo._getContentBox = dojo.getContentBox = geom.getContentBox;
	dojo.setContentSize = geom.setContentSize;
	dojo._isBodyLtr = dojo.isBodyLtr = geom.isBodyLtr;
	dojo._docScroll = dojo.docScroll = geom.docScroll;
	dojo._getIeDocumentElementOffset = dojo.getIeDocumentElementOffset = geom.getIeDocumentElementOffset;
	dojo._fixIeBiDiScrollLeft = dojo.fixIeBiDiScrollLeft = geom.fixIeBiDiScrollLeft;
	dojo.position = geom.position;

	dojo.marginBox = function marginBox(/*DomNode|String*/node, /*Object?*/box){
		// summary:
		//		Getter/setter for the margin-box of node.
		// description:
		//		Getter/setter for the margin-box of node.
		//		Returns an object in the expected format of box (regardless
		//		if box is passed). The object might look like:
		//		`{ l: 50, t: 200, w: 300: h: 150 }`
		//		for a node offset from its parent 50px to the left, 200px from
		//		the top with a margin width of 300px and a margin-height of
		//		150px.
		// node:
		//		id or reference to DOM Node to get/set box for
		// box:
		//		If passed, denotes that dojo.marginBox() should
		//		update/set the margin box for node. Box is an object in the
		//		above format. All properties are optional if passed.
		// example:
		//		Retrieve the margin box of a passed node
		//	|	var box = dojo.marginBox("someNodeId");
		//	|	console.dir(box);
		//
		// example:
		//		Set a node's margin box to the size of another node
		//	|	var box = dojo.marginBox("someNodeId");
		//	|	dojo.marginBox("someOtherNode", box);
		return box ? geom.setMarginBox(node, box) : geom.getMarginBox(node); // Object
	};

	dojo.contentBox = function contentBox(/*DomNode|String*/node, /*Object?*/box){
		// summary:
		//		Getter/setter for the content-box of node.
		// description:
		//		Returns an object in the expected format of box (regardless if box is passed).
		//		The object might look like:
		//		`{ l: 50, t: 200, w: 300: h: 150 }`
		//		for a node offset from its parent 50px to the left, 200px from
		//		the top with a content width of 300px and a content-height of
		//		150px. Note that the content box may have a much larger border
		//		or margin box, depending on the box model currently in use and
		//		CSS values set/inherited for node.
		//		While the getter will return top and left values, the
		//		setter only accepts setting the width and height.
		// node:
		//		id or reference to DOM Node to get/set box for
		// box:
		//		If passed, denotes that dojo.contentBox() should
		//		update/set the content box for node. Box is an object in the
		//		above format, but only w (width) and h (height) are supported.
		//		All properties are optional if passed.
		return box ? geom.setContentSize(node, box) : geom.getContentBox(node); // Object
	};

	dojo.coords = function(/*DomNode|String*/node, /*Boolean?*/includeScroll){
		// summary:
		//		Deprecated: Use position() for border-box x/y/w/h
		//		or marginBox() for margin-box w/h/l/t.
		//
		//		Returns an object that measures margin-box (w)idth/(h)eight
		//		and absolute position x/y of the border-box. Also returned
		//		is computed (l)eft and (t)op values in pixels from the
		//		node's offsetParent as returned from marginBox().
		//		Return value will be in the form:
		//|			{ l: 50, t: 200, w: 300: h: 150, x: 100, y: 300 }
		//		Does not act as a setter. If includeScroll is passed, the x and
		//		y params are affected as one would expect in dojo.position().
		dojo.deprecated("dojo.coords()", "Use dojo.position() or dojo.marginBox().");
		node = dom.byId(node);
		var s = style.getComputedStyle(node), mb = geom.getMarginBox(node, s);
		var abs = geom.position(node, includeScroll);
		mb.x = abs.x;
		mb.y = abs.y;
		return mb;	// Object
	};

	// mix-in dom-prop
	dojo.getProp = prop.get;
	dojo.setProp = prop.set;

	dojo.prop = function(/*DomNode|String*/node, /*String|Object*/name, /*String?*/value){
		// summary:
		//		Gets or sets a property on an HTML element.
		// description:
		//		Handles normalized getting and setting of properties on DOM
		//		Nodes. If 2 arguments are passed, and a the second argument is a
		//		string, acts as a getter.
		//
		//		If a third argument is passed, or if the second argument is a
		//		map of attributes, acts as a setter.
		//
		//		When passing functions as values, note that they will not be
		//		directly assigned to slots on the node, but rather the default
		//		behavior will be removed and the new behavior will be added
		//		using `dojo.connect()`, meaning that event handler properties
		//		will be normalized and that some caveats with regards to
		//		non-standard behaviors for onsubmit apply. Namely that you
		//		should cancel form submission using `dojo.stopEvent()` on the
		//		passed event object instead of returning a boolean value from
		//		the handler itself.
		// node:
		//		id or reference to the element to get or set the property on
		// name:
		//		the name of the property to get or set.
		// value:
		//		The value to set for the property
		// returns:
		//		when used as a getter, the value of the requested property
		//		or null if that attribute does not have a specified or
		//		default value;
		//
		//		when used as a setter, the DOM node
		//
		// example:
		//	|	// get the current value of the "foo" property on a node
		//	|	dojo.prop(dojo.byId("nodeId"), "foo");
		//	|	// or we can just pass the id:
		//	|	dojo.prop("nodeId", "foo");
		//
		// example:
		//	|	// use prop() to set the tab index
		//	|	dojo.prop("nodeId", "tabIndex", 3);
		//	|
		//
		// example:
		//	Set multiple values at once, including event handlers:
		//	|	dojo.prop("formId", {
		//	|		"foo": "bar",
		//	|		"tabIndex": -1,
		//	|		"method": "POST",
		//	|		"onsubmit": function(e){
		//	|			// stop submitting the form. Note that the IE behavior
		//	|			// of returning true or false will have no effect here
		//	|			// since our handler is connect()ed to the built-in
		//	|			// onsubmit behavior and so we need to use
		//	|			// dojo.stopEvent() to ensure that the submission
		//	|			// doesn't proceed.
		//	|			dojo.stopEvent(e);
		//	|
		//	|			// submit the form with Ajax
		//	|			dojo.xhrPost({ form: "formId" });
		//	|		}
		//	|	});
		//
		// example:
		//		Style is s special case: Only set with an object hash of styles
		//	|	dojo.prop("someNode",{
		//	|		id:"bar",
		//	|		style:{
		//	|			width:"200px", height:"100px", color:"#000"
		//	|		}
		//	|	});
		//
		// example:
		//		Again, only set style as an object hash of styles:
		//	|	var obj = { color:"#fff", backgroundColor:"#000" };
		//	|	dojo.prop("someNode", "style", obj);
		//	|
		//	|	// though shorter to use `dojo.style()` in this case:
		//	|	dojo.style("someNode", obj);

		if(arguments.length == 2){
			return prop[typeof name == "string" ? "get" : "set"](node, name);
		}
		// setter
		return prop.set(node, name, value);
	};

	// mix-in dom-style
	dojo.getStyle = style.get;
	dojo.setStyle = style.set;
	dojo.getComputedStyle = style.getComputedStyle;
	dojo.__toPixelValue = dojo.toPixelValue = style.toPixelValue;

	dojo.style = function(node, name, value){
		// summary:
		//		Accesses styles on a node. If 2 arguments are
		//		passed, acts as a getter. If 3 arguments are passed, acts
		//		as a setter.
		// description:
		//		Getting the style value uses the computed style for the node, so the value
		//		will be a calculated value, not just the immediate node.style value.
		//		Also when getting values, use specific style names,
		//		like "borderBottomWidth" instead of "border" since compound values like
		//		"border" are not necessarily reflected as expected.
		//		If you want to get node dimensions, use `dojo.marginBox()`,
		//		`dojo.contentBox()` or `dojo.position()`.
		// node: DOMNode|String
		//		id or reference to node to get/set style for
		// name: String|Object?
		//		the style property to set in DOM-accessor format
		//		("borderWidth", not "border-width") or an object with key/value
		//		pairs suitable for setting each property.
		// value: String?
		//		If passed, sets value on the node for style, handling
		//		cross-browser concerns.  When setting a pixel value,
		//		be sure to include "px" in the value. For instance, top: "200px".
		//		Otherwise, in some cases, some browsers will not apply the style.
		// returns:
		//		when used as a getter, return the computed style of the node if passing in an ID or node,
		//		or return the normalized, computed value for the property when passing in a node and a style property
		// example:
		//		Passing only an ID or node returns the computed style object of
		//		the node:
		//	|	dojo.style("thinger");
		// example:
		//		Passing a node and a style property returns the current
		//		normalized, computed value for that property:
		//	|	dojo.style("thinger", "opacity"); // 1 by default
		//
		// example:
		//		Passing a node, a style property, and a value changes the
		//		current display of the node and returns the new computed value
		//	|	dojo.style("thinger", "opacity", 0.5); // == 0.5
		//
		// example:
		//		Passing a node, an object-style style property sets each of the values in turn and returns the computed style object of the node:
		//	|	dojo.style("thinger", {
		//	|		"opacity": 0.5,
		//	|		"border": "3px solid black",
		//	|		"height": "300px"
		//	|	});
		//
		// example:
		//		When the CSS style property is hyphenated, the JavaScript property is camelCased.
		//		font-size becomes fontSize, and so on.
		//	|	dojo.style("thinger",{
		//	|		fontSize:"14pt",
		//	|		letterSpacing:"1.2em"
		//	|	});
		//
		// example:
		//		dojo/NodeList implements .style() using the same syntax, omitting the "node" parameter, calling
		//		dojo.style() on every element of the list. See: `dojo/query` and `dojo/NodeList`
		//	|	dojo.query(".someClassName").style("visibility","hidden");
		//	|	// or
		//	|	dojo.query("#baz > div").style({
		//	|		opacity:0.75,
		//	|		fontSize:"13pt"
		//	|	});

		switch(arguments.length){
			case 1:
				return style.get(node);
			case 2:
				return style[typeof name == "string" ? "get" : "set"](node, name);
		}
		// setter
		return style.set(node, name, value);
	};

	return dojo;
});

},
'dojo/_base/kernel':function(){
define(["../global", "../has", "./config", "require", "module"], function(global, has, config, require, module){
	// module:
	//		dojo/_base/kernel

	// This module is the foundational module of the dojo boot sequence; it defines the dojo object.

	var
		// loop variables for this module
		i, p,

		// create dojo, dijit, and dojox
		// FIXME: in 2.0 remove dijit, dojox being created by dojo
		dijit = {},
		dojox = {},
		dojo = {
			// summary:
			//		This module is the foundational module of the dojo boot sequence; it defines the dojo object.

			// notice dojo takes ownership of the value of the config module
			config:config,
			global:global,
			dijit:dijit,
			dojox:dojox
		};


	// Configure the scope map. For a 100% AMD application, the scope map is not needed other than to provide
	// a _scopeName property for the dojo, dijit, and dojox root object so those packages can create
	// unique names in the global space.
	//
	// Built, legacy modules use the scope map to allow those modules to be expressed as if dojo, dijit, and dojox,
	// where global when in fact they are either global under different names or not global at all. In v1.6-, the
	// config variable "scopeMap" was used to map names as used within a module to global names. This has been
	// subsumed by the AMD map configuration variable which can relocate packages to different names. For backcompat,
	// only the "*" mapping is supported. See http://livedocs.dojotoolkit.org/developer/design/loader#legacy-cross-domain-mode for details.
	//
	// The following computations contort the packageMap for this dojo instance into a scopeMap.
	var scopeMap =
			// a map from a name used in a legacy module to the (global variable name, object addressed by that name)
			// always map dojo, dijit, and dojox
			{
				dojo:["dojo", dojo],
				dijit:["dijit", dijit],
				dojox:["dojox", dojox]
			},

		packageMap =
			// the package map for this dojo instance; note, a foreign loader or no pacakgeMap results in the above default config
			(require.map && require.map[module.id.match(/[^\/]+/)[0]]),

		item;


	// process all mapped top-level names for this instance of dojo
	for(p in packageMap){
		if(scopeMap[p]){
			// mapped dojo, dijit, or dojox
			scopeMap[p][0] = packageMap[p];
		}else{
			// some other top-level name
			scopeMap[p] = [packageMap[p], {}];
		}
	}

	// publish those names to _scopeName and, optionally, the global namespace
	for(p in scopeMap){
		item = scopeMap[p];
		item[1]._scopeName = item[0];
		if(!config.noGlobals){
			global[item[0]] = item[1];
		}
	}
	dojo.scopeMap = scopeMap;

	/*===== dojo.__docParserConfigureScopeMap(scopeMap); =====*/

	// FIXME: dojo.baseUrl and dojo.config.baseUrl should be deprecated
	dojo.baseUrl = dojo.config.baseUrl = require.baseUrl;
	dojo.isAsync = ! 1  || require.async;
	dojo.locale = config.locale;

	var rev = "$Rev:$".match(/[0-9a-f]{7,}/);
	dojo.version = {
		// summary:
		//		Version number of the Dojo Toolkit
		// description:
		//		Hash about the version, including
		//
		//		- major: Integer: Major version. If total version is "1.2.0beta1", will be 1
		//		- minor: Integer: Minor version. If total version is "1.2.0beta1", will be 2
		//		- patch: Integer: Patch version. If total version is "1.2.0beta1", will be 0
		//		- flag: String: Descriptor flag. If total version is "1.2.0beta1", will be "beta1"
		//		- revision: Number: The Git rev from which dojo was pulled

		major: 1, minor: 16, patch: 3, flag: "",
		revision: rev ? rev[0] : NaN,
		toString: function(){
			var v = dojo.version;
			return v.major + "." + v.minor + "." + v.patch + v.flag + " (" + v.revision + ")";	// String
		}
	};

	// If  1  is truthy, then as a dojo module is defined it should push it's definitions
	// into the dojo object, and conversely. In 2.0, it will likely be unusual to augment another object
	// as a result of defining a module. This has feature gives a way to force 2.0 behavior as the code
	// is migrated. Absent specific advice otherwise, set extend-dojo to truthy.
	 1 || has.add("extend-dojo", 1);

	if(!has("csp-restrictions")){
		(Function("d", "d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(dojo);
	}
	/*=====
	dojo.eval = function(scriptText){
		// summary:
		//		A legacy method created for use exclusively by internal Dojo methods. Do not use this method
		//		directly unless you understand its possibly-different implications on the platforms your are targeting.
		// description:
		//		Makes an attempt to evaluate scriptText in the global scope. The function works correctly for browsers
		//		that support indirect eval.
		//
		//		As usual, IE does not. On IE, the only way to implement global eval is to
		//		use execScript. Unfortunately, execScript does not return a value and breaks some current usages of dojo.eval.
		//		This implementation uses the technique of executing eval in the scope of a function that is a single scope
		//		frame below the global scope; thereby coming close to the global scope. Note carefully that
		//
		//		dojo.eval("var pi = 3.14;");
		//
		//		will define global pi in non-IE environments, but define pi only in a temporary local scope for IE. If you want
		//		to define a global variable using dojo.eval, write something like
		//
		//		dojo.eval("window.pi = 3.14;")
		// scriptText:
		//		The text to evaluation.
		// returns:
		//		The result of the evaluation. Often `undefined`
	};
	=====*/


	if( 0 ){
		dojo.exit = function(exitcode){
			quit(exitcode);
		};
	}else{
		dojo.exit = function(){
		};
	}

	if(!has("host-webworker")){
		// console is immutable in FF30+, https://bugs.dojotoolkit.org/ticket/18100
		 1 || has.add("dojo-guarantee-console",
			// ensure that console.log, console.warn, etc. are defined
			1
		);
	}

	if( 1 ){
		// IE 9 bug: https://bugs.dojotoolkit.org/ticket/18197
		has.add("console-as-object", function () {
			return Function.prototype.bind && console && typeof console.log === "object";
		});

		typeof console != "undefined" || (console = {});  // intentional assignment
		//	Be careful to leave 'log' always at the end
		var cn = [
			"assert", "count", "debug", "dir", "dirxml", "error", "group",
			"groupEnd", "info", "profile", "profileEnd", "time", "timeEnd",
			"trace", "warn", "log"
		];
		var tn;
		i = 0;
		while((tn = cn[i++])){
			if(!console[tn]){
				(function(){
					var tcn = tn + "";
					console[tcn] = ('log' in console) ? function(){
						var a = Array.prototype.slice.call(arguments);
						a.unshift(tcn + ":");
						console["log"](a.join(" "));
					} : function(){};
					console[tcn]._fake = true;
				})();
			}else if(has("console-as-object")){
				console[tn] = Function.prototype.bind.call(console[tn], console);
			}
		}
	}

	 0 && has.add("dojo-debug-messages",
		// include dojo.deprecated/dojo.experimental implementations
		!!config.isDebug
	);
	dojo.deprecated = dojo.experimental =  function(){};
	if( 0 ){
		dojo.deprecated = function(/*String*/ behaviour, /*String?*/ extra, /*String?*/ removal){
			// summary:
			//		Log a debug message to indicate that a behavior has been
			//		deprecated.
			// behaviour: String
			//		The API or behavior being deprecated. Usually in the form
			//		of "myApp.someFunction()".
			// extra: String?
			//		Text to append to the message. Often provides advice on a
			//		new function or facility to achieve the same goal during
			//		the deprecation period.
			// removal: String?
			//		Text to indicate when in the future the behavior will be
			//		removed. Usually a version number.
			// example:
			//	| dojo.deprecated("myApp.getTemp()", "use myApp.getLocaleTemp() instead", "1.0");

			var message = "DEPRECATED: " + behaviour;
			if(extra){ message += " " + extra; }
			if(removal){ message += " -- will be removed in version: " + removal; }
			console.warn(message);
		};

		dojo.experimental = function(/* String */ moduleName, /* String? */ extra){
			// summary:
			//		Marks code as experimental.
			// description:
			//		This can be used to mark a function, file, or module as
			//		experimental.	 Experimental code is not ready to be used, and the
			//		APIs are subject to change without notice.	Experimental code may be
			//		completed deleted without going through the normal deprecation
			//		process.
			// moduleName: String
			//		The name of a module, or the name of a module file or a specific
			//		function
			// extra: String?
			//		some additional message for the user
			// example:
			//	| dojo.experimental("dojo.data.Result");
			// example:
			//	| dojo.experimental("dojo.weather.toKelvin()", "PENDING approval from NOAA");

			var message = "EXPERIMENTAL: " + moduleName + " -- APIs subject to change without notice.";
			if(extra){ message += " " + extra; }
			console.warn(message);
		};
	}

	 0 && has.add("dojo-modulePaths",
		// consume dojo.modulePaths processing
		1
	);
	if( 0 ){
		// notice that modulePaths won't be applied to any require's before the dojo/_base/kernel factory is run;
		// this is the v1.6- behavior.
		if(config.modulePaths){
			dojo.deprecated("dojo.modulePaths", "use paths configuration");
			var paths = {};
			for(p in config.modulePaths){
				paths[p.replace(/\./g, "/")] = config.modulePaths[p];
			}
			require({paths:paths});
		}
	}

	 0 && has.add("dojo-moduleUrl",
		// include dojo.moduleUrl
		1
	);
	if( 0 ){
		dojo.moduleUrl = function(/*String*/module, /*String?*/url){
			// summary:
			//		Returns a URL relative to a module.
			// example:
			//	|	var pngPath = dojo.moduleUrl("acme","images/small.png");
			//	|	console.dir(pngPath); // list the object properties
			//	|	// create an image and set it's source to pngPath's value:
			//	|	var img = document.createElement("img");
			//	|	img.src = pngPath;
			//	|	// add our image to the document
			//	|	dojo.body().appendChild(img);
			// example:
			//		you may de-reference as far as you like down the package
			//		hierarchy.  This is sometimes handy to avoid lengthy relative
			//		urls or for building portable sub-packages. In this example,
			//		the `acme.widget` and `acme.util` directories may be located
			//		under different roots (see `dojo.registerModulePath`) but the
			//		the modules which reference them can be unaware of their
			//		relative locations on the filesystem:
			//	|	// somewhere in a configuration block
			//	|	dojo.registerModulePath("acme.widget", "../../acme/widget");
			//	|	dojo.registerModulePath("acme.util", "../../util");
			//	|
			//	|	// ...
			//	|
			//	|	// code in a module using acme resources
			//	|	var tmpltPath = dojo.moduleUrl("acme.widget","templates/template.html");
			//	|	var dataPath = dojo.moduleUrl("acme.util","resources/data.json");

			dojo.deprecated("dojo.moduleUrl()", "use require.toUrl", "2.0");

			// require.toUrl requires a filetype; therefore, just append the suffix "/*.*" to guarantee a filetype, then
			// remove the suffix from the result. This way clients can request a url w/out a filetype. This should be
			// rare, but it maintains backcompat for the v1.x line (note: dojo.moduleUrl will be removed in v2.0).
			// Notice * is an illegal filename so it won't conflict with any real path map that may exist the paths config.
			var result = null;
			if(module){
				result = require.toUrl(module.replace(/\./g, "/") + (url ? ("/" + url) : "") + "/*.*").replace(/\/\*\.\*/, "") + (url ? "" : "/");
			}
			return result;
		};
	}

	dojo._hasResource = {}; // for backward compatibility with layers built with 1.6 tooling

	return dojo;
});

},
'dojo/io-query':function(){
define(["./_base/lang"], function(lang){

	// module:
	//		dojo/io-query

	var backstop = {};

	return {
		// summary:
		//		This module defines query string processing functions.

		objectToQuery: function objectToQuery(/*Object*/ map){
			// summary:
			//		takes a name/value mapping object and returns a string representing
			//		a URL-encoded version of that object.
			// example:
			//		this object:
			//
			//	|	{
			//	|		blah: "blah",
			//	|		multi: [
			//	|			"thud",
			//	|			"thonk"
			//	|		]
			//	|	};
			//
			//		yields the following query string:
			//
			//	|	"blah=blah&multi=thud&multi=thonk"

			// FIXME: need to implement encodeAscii!!
			var enc = encodeURIComponent, pairs = [];
			for(var name in map){
				var value = map[name];
				if(value != backstop[name]){
					var assign = enc(name) + "=";
					if(lang.isArray(value)){
						for(var i = 0, l = value.length; i < l; ++i){
							pairs.push(assign + enc(value[i]));
						}
					}else{
						pairs.push(assign + enc(value));
					}
				}
			}
			return pairs.join("&"); // String
		},

		queryToObject: function queryToObject(/*String*/ str){
			// summary:
			//		Create an object representing a de-serialized query section of a
			//		URL. Query keys with multiple values are returned in an array.
			//
			// example:
			//		This string:
			//
			//	|		"foo=bar&foo=baz&thinger=%20spaces%20=blah&zonk=blarg&"
			//
			//		results in this object structure:
			//
			//	|		{
			//	|			foo: [ "bar", "baz" ],
			//	|			thinger: " spaces =blah",
			//	|			zonk: "blarg"
			//	|		}
			//
			//		Note that spaces and other urlencoded entities are correctly
			//		handled.

        	var dec = decodeURIComponent, qp = str.split("&"), ret = {}, name, val;
			for(var i = 0, l = qp.length, item; i < l; ++i){
				item = qp[i];
				if(item.length){
					var s = item.indexOf("=");
					if(s < 0){
						name = dec(item);
						val = "";
					}else{
						name = dec(item.slice(0, s));
						val = dec(item.slice(s + 1));
					}
					if(typeof ret[name] == "string"){ // inline'd type check
						ret[name] = [ret[name]];
					}

					if(lang.isArray(ret[name])){
						ret[name].push(val);
					}else{
						ret[name] = val;
					}
				}
			}
			return ret; // Object
		}
	};
});
},
'dojo/_base/Deferred':function(){
define([
	"./kernel",
	"../Deferred",
	"../promise/Promise",
	"../errors/CancelError",
	"../has",
	"./lang",
	"../when"
], function(dojo, NewDeferred, Promise, CancelError, has, lang, when){
	// module:
	//		dojo/_base/Deferred

	var mutator = function(){};
	var freeze = Object.freeze || function(){};
	// A deferred provides an API for creating and resolving a promise.
	var Deferred = dojo.Deferred = function(/*Function?*/ canceller){
		// summary:
		//		Deprecated.   This module defines the legacy dojo/_base/Deferred API.
		//		New code should use dojo/Deferred instead.
		// description:
		//		The Deferred API is based on the concept of promises that provide a
		//		generic interface into the eventual completion of an asynchronous action.
		//		The motivation for promises fundamentally is about creating a
		//		separation of concerns that allows one to achieve the same type of
		//		call patterns and logical data flow in asynchronous code as can be
		//		achieved in synchronous code. Promises allows one
		//		to be able to call a function purely with arguments needed for
		//		execution, without conflating the call with concerns of whether it is
		//		sync or async. One shouldn't need to alter a call's arguments if the
		//		implementation switches from sync to async (or vice versa). By having
		//		async functions return promises, the concerns of making the call are
		//		separated from the concerns of asynchronous interaction (which are
		//		handled by the promise).
		//
		//		The Deferred is a type of promise that provides methods for fulfilling the
		//		promise with a successful result or an error. The most important method for
		//		working with Dojo's promises is the then() method, which follows the
		//		CommonJS proposed promise API. An example of using a Dojo promise:
		//
		//		|	var resultingPromise = someAsyncOperation.then(function(result){
		//		|		... handle result ...
		//		|	},
		//		|	function(error){
		//		|		... handle error ...
		//		|	});
		//
		//		The .then() call returns a new promise that represents the result of the
		//		execution of the callback. The callbacks will never affect the original promises value.
		//
		//		The Deferred instances also provide the following functions for backwards compatibility:
		//
		//		- addCallback(handler)
		//		- addErrback(handler)
		//		- callback(result)
		//		- errback(result)
		//
		//		Callbacks are allowed to return promises themselves, so
		//		you can build complicated sequences of events with ease.
		//
		//		The creator of the Deferred may specify a canceller.  The canceller
		//		is a function that will be called if Deferred.cancel is called
		//		before the Deferred fires. You can use this to implement clean
		//		aborting of an XMLHttpRequest, etc. Note that cancel will fire the
		//		deferred with a CancelledError (unless your canceller returns
		//		another kind of error), so the errbacks should be prepared to
		//		handle that error for cancellable Deferreds.
		// example:
		//	|	var deferred = new Deferred();
		//	|	setTimeout(function(){ deferred.callback({success: true}); }, 1000);
		//	|	return deferred;
		// example:
		//		Deferred objects are often used when making code asynchronous. It
		//		may be easiest to write functions in a synchronous manner and then
		//		split code using a deferred to trigger a response to a long-lived
		//		operation. For example, instead of register a callback function to
		//		denote when a rendering operation completes, the function can
		//		simply return a deferred:
		//
		//		|	// callback style:
		//		|	function renderLotsOfData(data, callback){
		//		|		var success = false
		//		|		try{
		//		|			for(var x in data){
		//		|				renderDataitem(data[x]);
		//		|			}
		//		|			success = true;
		//		|		}catch(e){ }
		//		|		if(callback){
		//		|			callback(success);
		//		|		}
		//		|	}
		//
		//		|	// using callback style
		//		|	renderLotsOfData(someDataObj, function(success){
		//		|		// handles success or failure
		//		|		if(!success){
		//		|			promptUserToRecover();
		//		|		}
		//		|	});
		//		|	// NOTE: no way to add another callback here!!
		// example:
		//		Using a Deferred doesn't simplify the sending code any, but it
		//		provides a standard interface for callers and senders alike,
		//		providing both with a simple way to service multiple callbacks for
		//		an operation and freeing both sides from worrying about details
		//		such as "did this get called already?". With Deferreds, new
		//		callbacks can be added at any time.
		//
		//		|	// Deferred style:
		//		|	function renderLotsOfData(data){
		//		|		var d = new Deferred();
		//		|		try{
		//		|			for(var x in data){
		//		|				renderDataitem(data[x]);
		//		|			}
		//		|			d.callback(true);
		//		|		}catch(e){
		//		|			d.errback(new Error("rendering failed"));
		//		|		}
		//		|		return d;
		//		|	}
		//
		//		|	// using Deferred style
		//		|	renderLotsOfData(someDataObj).then(null, function(){
		//		|		promptUserToRecover();
		//		|	});
		//		|	// NOTE: addErrback and addCallback both return the Deferred
		//		|	// again, so we could chain adding callbacks or save the
		//		|	// deferred for later should we need to be notified again.
		// example:
		//		In this example, renderLotsOfData is synchronous and so both
		//		versions are pretty artificial. Putting the data display on a
		//		timeout helps show why Deferreds rock:
		//
		//		|	// Deferred style and async func
		//		|	function renderLotsOfData(data){
		//		|		var d = new Deferred();
		//		|		setTimeout(function(){
		//		|			try{
		//		|				for(var x in data){
		//		|					renderDataitem(data[x]);
		//		|				}
		//		|				d.callback(true);
		//		|			}catch(e){
		//		|				d.errback(new Error("rendering failed"));
		//		|			}
		//		|		}, 100);
		//		|		return d;
		//		|	}
		//
		//		|	// using Deferred style
		//		|	renderLotsOfData(someDataObj).then(null, function(){
		//		|		promptUserToRecover();
		//		|	});
		//
		//		Note that the caller doesn't have to change his code at all to
		//		handle the asynchronous case.

		var result, finished, canceled, fired, isError, head, nextListener;
		var promise = (this.promise = new Promise());

		function complete(value){
			if(finished){
				throw new Error("This deferred has already been resolved");
			}
			result = value;
			finished = true;
			notify();
		}
		function notify(){
			var mutated;
			while(!mutated && nextListener){
				var listener = nextListener;
				nextListener = nextListener.next;
				if((mutated = (listener.progress == mutator))){ // assignment and check
					finished = false;
				}

				var func = (isError ? listener.error : listener.resolved);
				if(has("config-useDeferredInstrumentation")){
					if(isError && NewDeferred.instrumentRejected){
						NewDeferred.instrumentRejected(result, !!func);
					}
				}
				if(func){
					try{
						var newResult = func(result);
						if (newResult && typeof newResult.then === "function"){
							newResult.then(lang.hitch(listener.deferred, "resolve"), lang.hitch(listener.deferred, "reject"), lang.hitch(listener.deferred, "progress"));
							continue;
						}
						var unchanged = mutated && newResult === undefined;
						if(mutated && !unchanged){
							isError = newResult instanceof Error;
						}
						listener.deferred[unchanged && isError ? "reject" : "resolve"](unchanged ? result : newResult);
					}catch(e){
						listener.deferred.reject(e);
					}
				}else{
					if(isError){
						listener.deferred.reject(result);
					}else{
						listener.deferred.resolve(result);
					}
				}
			}
		}

		this.isResolved = promise.isResolved = function(){
			// summary:
			//		Checks whether the deferred has been resolved.
			// returns: Boolean

			return fired == 0;
		};

		this.isRejected = promise.isRejected = function(){
			// summary:
			//		Checks whether the deferred has been rejected.
			// returns: Boolean

			return fired == 1;
		};

		this.isFulfilled = promise.isFulfilled = function(){
			// summary:
			//		Checks whether the deferred has been resolved or rejected.
			// returns: Boolean

			return fired >= 0;
		};

		this.isCanceled = promise.isCanceled = function(){
			// summary:
			//		Checks whether the deferred has been canceled.
			// returns: Boolean

			return canceled;
		};

		// calling resolve will resolve the promise
		this.resolve = this.callback = function(value){
			// summary:
			//		Fulfills the Deferred instance successfully with the provide value
			this.fired = fired = 0;
			this.results = [value, null];
			complete(value);
		};


		// calling error will indicate that the promise failed
		this.reject = this.errback = function(error){
			// summary:
			//		Fulfills the Deferred instance as an error with the provided error
			isError = true;
			this.fired = fired = 1;
			if(has("config-useDeferredInstrumentation")){
				if(NewDeferred.instrumentRejected){
					NewDeferred.instrumentRejected(error, !!nextListener);
				}
			}
			complete(error);
			this.results = [null, error];
		};
		// call progress to provide updates on the progress on the completion of the promise
		this.progress = function(update){
			// summary:
			//		Send progress events to all listeners
			var listener = nextListener;
			while(listener){
				var progress = listener.progress;
				progress && progress(update);
				listener = listener.next;
			}
		};
		this.addCallbacks = function(callback, errback){
			// summary:
			//		Adds callback and error callback for this deferred instance.
			// callback: Function?
			//		The callback attached to this deferred object.
			// errback: Function?
			//		The error callback attached to this deferred object.
			// returns:
			//		Returns this deferred object.
			this.then(callback, errback, mutator);
			return this;	// Deferred
		};
		// provide the implementation of the promise
		promise.then = this.then = function(/*Function?*/resolvedCallback, /*Function?*/errorCallback, /*Function?*/progressCallback){
			// summary:
			//		Adds a fulfilledHandler, errorHandler, and progressHandler to be called for
			//		completion of a promise. The fulfilledHandler is called when the promise
			//		is fulfilled. The errorHandler is called when a promise fails. The
			//		progressHandler is called for progress events. All arguments are optional
			//		and non-function values are ignored. The progressHandler is not only an
			//		optional argument, but progress events are purely optional. Promise
			//		providers are not required to ever create progress events.
			//
			//		This function will return a new promise that is fulfilled when the given
			//		fulfilledHandler or errorHandler callback is finished. This allows promise
			//		operations to be chained together. The value returned from the callback
			//		handler is the fulfillment value for the returned promise. If the callback
			//		throws an error, the returned promise will be moved to failed state.
			//
			// returns:
			//		Returns a new promise that represents the result of the
			//		execution of the callback. The callbacks will never affect the original promises value.
			// example:
			//		An example of using a CommonJS compliant promise:
			//		|	asyncComputeTheAnswerToEverything().
			//		|		then(addTwo).
			//		|		then(printResult, onError);
			//		|	>44
			//
			var returnDeferred = progressCallback == mutator ? this : new Deferred(promise.cancel);
			var listener = {
				resolved: resolvedCallback,
				error: errorCallback,
				progress: progressCallback,
				deferred: returnDeferred
			};
			if(nextListener){
				head = head.next = listener;
			}
			else{
				nextListener = head = listener;
			}
			if(finished){
				notify();
			}
			return returnDeferred.promise; // Promise
		};
		var deferred = this;
		promise.cancel = this.cancel = function(){
			// summary:
			//		Cancels the asynchronous operation
			if(!finished){
				var error = canceller && canceller(deferred);
				if(!finished){
					if (!(error instanceof Error)){
						error = new CancelError(error);
					}
					error.log = false;
					deferred.reject(error);
				}
			}
			canceled = true;
		};
		freeze(promise);
	};
	lang.extend(Deferred, {
		addCallback: function(/*Function*/ callback){
			// summary:
			//		Adds successful callback for this deferred instance.
			// returns:
			//		Returns this deferred object.
			return this.addCallbacks(lang.hitch.apply(dojo, arguments));	// Deferred
		},

		addErrback: function(/*Function*/ errback){
			// summary:
			//		Adds error callback for this deferred instance.
			// returns:
			//		Returns this deferred object.
			return this.addCallbacks(null, lang.hitch.apply(dojo, arguments));	// Deferred
		},

		addBoth: function(/*Function*/ callback){
			// summary:
			//		Add handler as both successful callback and error callback for this deferred instance.
			// returns:
			//		Returns this deferred object.
			var enclosed = lang.hitch.apply(dojo, arguments);
			return this.addCallbacks(enclosed, enclosed);	// Deferred
		},
		fired: -1
	});

	Deferred.when = dojo.when = when;

	return Deferred;
});

},
'dojo/NodeList-dom':function(){
define(["./_base/kernel", "./query", "./_base/array", "./_base/lang", "./dom-class", "./dom-construct", "./dom-geometry", "./dom-attr", "./dom-style"], function(dojo, query, array, lang, domCls, domCtr, domGeom, domAttr, domStyle){

	// module:
	//		dojo/NodeList-dom.js

	/*=====
	 return function(){
		 // summary:
		 //		Adds DOM related methods to NodeList, and returns NodeList constructor.
	 };
	 =====*/

	var magicGuard = function(a){
		// summary:
		//		the guard function for dojo/dom-attr() and dojo/dom-style()
		return a.length == 1 && (typeof a[0] == "string"); // inline'd type check
	};

	var orphan = function(node){
		// summary:
		//		function to orphan nodes
		var p = node.parentNode;
		if(p){
			p.removeChild(node);
		}
	};
	// FIXME: should we move orphan() to dojo/_base/html?

	var NodeList = query.NodeList,
		awc = NodeList._adaptWithCondition,
		aafe = NodeList._adaptAsForEach,
		aam = NodeList._adaptAsMap;

	function getSet(module){
		return function(node, name, value){
			if(arguments.length == 2){
				return module[typeof name == "string" ? "get" : "set"](node, name);
			}
			// setter
			return module.set(node, name, value);
		};
	}

	lang.extend(NodeList, {
		_normalize: function(/*String||Element||Object||NodeList*/content, /*DOMNode?*/refNode){
			// summary:
			//		normalizes data to an array of items to insert.
			// description:
			//		If content is an object, it can have special properties "template" and
			//		"parse". If "template" is defined, then the template value is run through
			//		dojo/string.substitute (if dojo/string.substitute() has been required elsewhere),
			//		or if templateFunc is a function on the content, that function will be used to
			//		transform the template into a final string to be used for for passing to dojo/dom-construct.toDom().
			//		If content.parse is true, then it is remembered for later, for when the content
			//		nodes are inserted into the DOM. At that point, the nodes will be parsed for widgets
			//		(if dojo/parser has been required elsewhere).

			//Wanted to just use a DocumentFragment, but for the array/NodeList
			//case that meant using cloneNode, but we may not want that.
			//Cloning should only happen if the node operations span
			//multiple refNodes. Also, need a real array, not a NodeList from the
			//DOM since the node movements could change those NodeLists.

			var parse = content.parse === true;

			//Do we have an object that needs to be run through a template?
			if(typeof content.template == "string"){
				var templateFunc = content.templateFunc || (dojo.string && dojo.string.substitute);
				content = templateFunc ? templateFunc(content.template, content) : content;
			}

			var type = (typeof content);
			if(type == "string" || type == "number"){
				content = domCtr.toDom(content, (refNode && refNode.ownerDocument));
				if(content.nodeType == 11){
					//DocumentFragment. It cannot handle cloneNode calls, so pull out the children.
					content = lang._toArray(content.childNodes);
				}else{
					content = [content];
				}
			}else if(!lang.isArrayLike(content)){
				content = [content];
			}else if(!lang.isArray(content)){
				//To get to this point, content is array-like, but
				//not an array, which likely means a DOM NodeList. Convert it now.
				content = lang._toArray(content);
			}

			//Pass around the parse info
			if(parse){
				content._runParse = true;
			}
			return content; //Array
		},

		_cloneNode: function(/*DOMNode*/ node){
			// summary:
			//		private utility to clone a node. Not very interesting in the vanilla
			//		dojo/NodeList case, but delegates could do interesting things like
			//		clone event handlers if that is derivable from the node.
			return node.cloneNode(true);
		},

		_place: function(/*Array*/ary, /*DOMNode*/refNode, /*String*/position, /*Boolean*/useClone){
			// summary:
			//		private utility to handle placing an array of nodes relative to another node.
			// description:
			//		Allows for cloning the nodes in the array, and for
			//		optionally parsing widgets, if ary._runParse is true.

			//Avoid a disallowed operation if trying to do an innerHTML on a non-element node.
			if(refNode.nodeType != 1 && position == "only"){
				return;
			}
			var rNode = refNode, tempNode;

			//Always cycle backwards in case the array is really a
			//DOM NodeList and the DOM operations take it out of the live collection.
			var length = ary.length;
			for(var i = length - 1; i >= 0; i--){
				var node = (useClone ? this._cloneNode(ary[i]) : ary[i]);

				//If need widget parsing, use a temp node, instead of waiting after inserting into
				//real DOM because we need to start widget parsing at one node up from current node,
				//which could cause some already parsed widgets to be parsed again.
				if(ary._runParse && dojo.parser && dojo.parser.parse){
					if(!tempNode){
						tempNode = rNode.ownerDocument.createElement("div");
					}
					tempNode.appendChild(node);
					dojo.parser.parse(tempNode);
					node = tempNode.firstChild;
					while(tempNode.firstChild){
						tempNode.removeChild(tempNode.firstChild);
					}
				}

				if(i == length - 1){
					domCtr.place(node, rNode, position);
				}else{
					rNode.parentNode.insertBefore(node, rNode);
				}
				rNode = node;
			}
		},


		position: aam(domGeom.position),
		/*=====
		position: function(){
			// summary:
			//		Returns border-box objects (x/y/w/h) of all elements in a node list
			//		as an Array (*not* a NodeList). Acts like `dojo/dom-geometry-position`, though
			//		assumes the node passed is each node in this list.

			return dojo.map(this, dojo.position); // Array
		},
		=====*/

		attr: awc(getSet(domAttr), magicGuard),
		/*=====
		attr: function(property, value){
			// summary:
			//		gets or sets the DOM attribute for every element in the
			//		NodeList. See also `dojo/dom-attr`
			// property: String
			//		the attribute to get/set
			// value: String?
			//		optional. The value to set the property to
			// returns:
			//		if no value is passed, the result is an array of attribute values
			//		If a value is passed, the return is this NodeList
			// example:
			//		Make all nodes with a particular class focusable:
			//	|	require(["dojo/query", "dojo/NodeList-dom"], function(query){
			//	|		query(".focusable").attr("tabIndex", -1);
			//	|	});
			// example:
			//		Disable a group of buttons:
			//	|	require(["dojo/query", "dojo/NodeList-dom"], function(query){
			//	|		query("button.group").attr("disabled", true);
			//	|	});
			// example:
			//		innerHTML can be assigned or retrieved as well:
			//	|	// get the innerHTML (as an array) for each list item
			//	|	require(["dojo/query", "dojo/NodeList-dom"], function(query){
			//	|		var ih = query("li.replaceable").attr("innerHTML");
			//	|	});
			return; // dojo/NodeList|Array
		},
		=====*/

		style: awc(getSet(domStyle), magicGuard),
		/*=====
		style: function(property, value){
			// summary:
			//		gets or sets the CSS property for every element in the NodeList
			// property: String
			//		the CSS property to get/set, in JavaScript notation
			//		("lineHieght" instead of "line-height")
			// value: String?
			//		optional. The value to set the property to
			// returns:
			//		if no value is passed, the result is an array of strings.
			//		If a value is passed, the return is this NodeList
			return; // dojo/NodeList
			return; // Array
		},
		=====*/

		addClass: aafe(domCls.add),
		/*=====
		addClass: function(className){
			// summary:
			//		adds the specified class to every node in the list
			// className: String|Array
			//		A String class name to add, or several space-separated class names,
			//		or an array of class names.
			return; // dojo/NodeList
		},
		=====*/

		removeClass: aafe(domCls.remove),
		/*=====
		removeClass: function(className){
			// summary:
			//		removes the specified class from every node in the list
			// className: String|Array?
			//		An optional String class name to remove, or several space-separated
			//		class names, or an array of class names. If omitted, all class names
			//		will be deleted.
			// returns:
			//		this list
			return; // dojo/NodeList
		},
		=====*/

		toggleClass: aafe(domCls.toggle),
		/*=====
		toggleClass: function(className, condition){
			// summary:
			//		Adds a class to node if not present, or removes if present.
			//		Pass a boolean condition if you want to explicitly add or remove.
			// condition: Boolean?
			//		If passed, true means to add the class, false means to remove.
			// className: String
			//		the CSS class to add
			return; // dojo/NodeList
		},
		=====*/

		replaceClass: aafe(domCls.replace),
		/*=====
		replaceClass: function(addClassStr, removeClassStr){
			// summary:
			//		Replaces one or more classes on a node if not present.
			//		Operates more quickly than calling `removeClass()` and `addClass()`
			// addClassStr: String|Array
			//		A String class name to add, or several space-separated class names,
			//		or an array of class names.
			// removeClassStr: String|Array?
			//		A String class name to remove, or several space-separated class names,
			//		or an array of class names.
			return; // dojo/NodeList
		 },
		 =====*/

		empty: aafe(domCtr.empty),
		/*=====
		empty: function(){
			// summary:
			//		clears all content from each node in the list. Effectively
			//		equivalent to removing all child nodes from every item in
			//		the list.
			return this.forEach("item.innerHTML='';"); // dojo/NodeList
			// FIXME: should we be checking for and/or disposing of widgets below these nodes?
		},
		=====*/

		removeAttr: aafe(domAttr.remove),
		/*=====
		 removeAttr: function(name){
			// summary:
			//		Removes an attribute from each node in the list.
			// name: String
			//		the name of the attribute to remove
			return;		// dojo/NodeList
		},
		=====*/

		marginBox: aam(domGeom.getMarginBox),
		/*=====
		marginBox: function(){
			// summary:
			//		Returns margin-box size of nodes
		 	return; // dojo/NodeList
		 },
		 =====*/

		// FIXME: connectPublisher()? connectRunOnce()?

		/*
		destroy: function(){
			// summary:
			//		destroys every item in the list.
			this.forEach(d.destroy);
			// FIXME: should we be checking for and/or disposing of widgets below these nodes?
		},
		*/

		place: function(/*String||Node*/ queryOrNode, /*String*/ position){
			// summary:
			//		places elements of this node list relative to the first element matched
			//		by queryOrNode. Returns the original NodeList. See: `dojo/dom-construct.place`
			// queryOrNode:
			//		may be a string representing any valid CSS3 selector or a DOM node.
			//		In the selector case, only the first matching element will be used
			//		for relative positioning.
			// position:
			//		can be one of:
			//
			//		-	"last" (default)
			//		-	"first"
			//		-	"before"
			//		-	"after"
			//		-	"only"
			//		-	"replace"
			//
			//		or an offset in the childNodes property
			var item = query(queryOrNode)[0];
			return this.forEach(function(node){ domCtr.place(node, item, position); }); // dojo/NodeList
		},

		orphan: function(/*String?*/ filter){
			// summary:
			//		removes elements in this list that match the filter
			//		from their parents and returns them as a new NodeList.
			// filter:
			//		CSS selector like ".foo" or "div > span"
			// returns:
			//		NodeList containing the orphaned elements
			return (filter ? query._filterResult(this, filter) : this).forEach(orphan); // dojo/NodeList
		},

		adopt: function(/*String||Array||DomNode*/ queryOrListOrNode, /*String?*/ position){
			// summary:
			//		places any/all elements in queryOrListOrNode at a
			//		position relative to the first element in this list.
			//		Returns a dojo/NodeList of the adopted elements.
			// queryOrListOrNode:
			//		a DOM node or a query string or a query result.
			//		Represents the nodes to be adopted relative to the
			//		first element of this NodeList.
			// position:
			//		can be one of:
			//
			//		-	"last" (default)
			//		-	"first"
			//		-	"before"
			//		-	"after"
			//		-	"only"
			//		-	"replace"
			//
			//		or an offset in the childNodes property
			return query(queryOrListOrNode).place(this[0], position)._stash(this);	// dojo/NodeList
		},

		// FIXME: do we need this?
		query: function(/*String*/ queryStr){
			// summary:
			//		Returns a new list whose members match the passed query,
			//		assuming elements of the current NodeList as the root for
			//		each search.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div id="foo">
			//	|		<p>
			//	|			bacon is tasty, <span>dontcha think?</span>
			//	|		</p>
			//	|	</div>
			//	|	<div id="bar">
			//	|		<p>great comedians may not be funny <span>in person</span></p>
			//	|	</div>
			//		If we are presented with the following definition for a NodeList:
			//	|	require(["dojo/dom", "dojo/query", "dojo/NodeList-dom"
			//	|	], function(dom, query){
			//	|		var l = new NodeList(dom.byId("foo"), dom.byId("bar"));
			//		it's possible to find all span elements under paragraphs
			//		contained by these elements with this sub-query:
			//	|		var spans = l.query("p span");
			//	|	});

			// FIXME: probably slow
			if(!queryStr){ return this; }
			var ret = new NodeList;
			this.map(function(node){
				// FIXME: why would we ever get undefined here?
				query(queryStr, node).forEach(function(subNode){
					if(subNode !== undefined){
						ret.push(subNode);
					}
				});
			});
			return ret._stash(this);	// dojo/NodeList
		},

		filter: function(/*String|Function*/ filter){
			// summary:
			//		"masks" the built-in javascript filter() method (supported
			//		in Dojo via `dojo.filter`) to support passing a simple
			//		string filter in addition to supporting filtering function
			//		objects.
			// filter:
			//		If a string, a CSS rule like ".thinger" or "div > span".
			// example:
			//		"regular" JS filter syntax as exposed in dojo.filter:
			//	|	require(["dojo/query", "dojo/NodeList-dom"
			//	|	], function(query){
			//	|		query("*").filter(function(item){
			//	|			// highlight every paragraph
			//	|			return (item.nodeName == "p");
			//	|		}).style("backgroundColor", "yellow");
			//	|	});
			// example:
			//	the same filtering using a CSS selector
			//	|	require(["dojo/query", "dojo/NodeList-dom"
			//	|	], function(query){
			//	|		query("*").filter("p").styles("backgroundColor", "yellow");
			//	|	});
			var a = arguments, items = this, start = 0;
			if(typeof filter == "string"){ // inline'd type check
				items = query._filterResult(this, a[0]);
				if(a.length == 1){
					// if we only got a string query, pass back the filtered results
					return items._stash(this); // dojo/NodeList
				}
				// if we got a callback, run it over the filtered items
				start = 1;
			}
			return this._wrap(array.filter(items, a[start], a[start + 1]), this);	// dojo/NodeList
		},

		/*
		// FIXME: should this be "copyTo" and include parenting info?
		clone: function(){
			// summary:
			//		creates node clones of each element of this list
			//		and returns a new list containing the clones
		},
		*/

		addContent: function(/*String||DomNode||Object||dojo/NodeList*/ content, /*String||Integer?*/ position){
			// summary:
			//		add a node, NodeList or some HTML as a string to every item in the
			//		list.  Returns the original list.
			// description:
			//		a copy of the HTML content is added to each item in the
			//		list, with an optional position argument. If no position
			//		argument is provided, the content is appended to the end of
			//		each item.
			// content:
			//		DOM node, HTML in string format, a NodeList or an Object. If a DOM node or
			//		NodeList, the content will be cloned if the current NodeList has more than one
			//		element. Only the DOM nodes are cloned, no event handlers. If it is an Object,
			//		it should be an object with at "template" String property that has the HTML string
			//		to insert. If dojo.string has already been dojo.required, then dojo.string.substitute
			//		will be used on the "template" to generate the final HTML string. Other allowed
			//		properties on the object are: "parse" if the HTML
			//		string should be parsed for widgets (dojo.require("dojo.parser") to get that
			//		option to work), and "templateFunc" if a template function besides dojo.string.substitute
			//		should be used to transform the "template".
			// position:
			//		can be one of:
			//
			//		-	"last"||"end" (default)
			//		-	"first||"start"
			//		-	"before"
			//		-	"after"
			//		-	"replace" (replaces nodes in this NodeList with new content)
			//		-	"only" (removes other children of the nodes so new content is the only child)
			//
			//		or an offset in the childNodes property
			// example:
			//		appends content to the end if the position is omitted
			//	|	require(["dojo/query", "dojo/NodeList-dom"
			//	|	], function(query){
			//	|		query("h3 > p").addContent("hey there!");
			//	|	});
			// example:
			//		add something to the front of each element that has a
			//		"thinger" property:
			//	|	require(["dojo/query", "dojo/NodeList-dom"
			//	|	], function(query){
			//	|		query("[thinger]").addContent("...", "first");
			//	|	});
			// example:
			//		adds a header before each element of the list
			//	|	require(["dojo/query", "dojo/NodeList-dom"
			//	|	], function(query){
			//	|		query(".note").addContent("<h4>NOTE:</h4>", "before");
			//	|	});
			// example:
			//		add a clone of a DOM node to the end of every element in
			//		the list, removing it from its existing parent.
			//	|	require(["dojo/dom", "dojo/query", "dojo/NodeList-dom"
			//	|	], function(dom, query){
			//	|		query(".note").addContent(dom.byId("foo"));
			//	|	});
			// example:
			//		Append nodes from a templatized string.
			//	|	require(["dojo/string", "dojo/query", "dojo/NodeList-dom"
			//	|	], function(string, query){
			//	|		query(".note").addContent({
			//	|			template: '<b>${id}: </b><span>${name}</span>',
			//	|			id: "user332",
			//	|			name: "Mr. Anderson"
			//	|		});
			//	|	});
			// example:
			//		Append nodes from a templatized string that also has widgets parsed.
			//	|	require(["dojo/string", "dojo/parser", "dojo/query", "dojo/NodeList-dom"
			//	|	], function(string, parser, query){
			//	|		var notes = query(".note").addContent({
			//	|			template: '<button dojoType="dijit/form/Button">${text}</button>',
			//	|			parse: true,
			//	|			text: "Send"
			//	|		});
			//	|	});
			content = this._normalize(content, this[0]);
			for(var i = 0, node; (node = this[i]); i++){
				if(content.length){
					this._place(content, node, position, i > 0);
				}else{
					// if it is an empty array, we empty the target node
					domCtr.empty(node);
				}
			}
			return this; // dojo/NodeList
		}
	});

	return NodeList;
});

},
'dojo/query':function(){
define(["./_base/kernel", "./has", "./dom", "./on", "./_base/array", "./_base/lang", "./selector/_loader", "./selector/_loader!default"],
	function(dojo, has, dom, on, array, lang, loader, defaultEngine){

	"use strict";

	has.add("array-extensible", function(){
		// test to see if we can extend an array (not supported in old IE)
		return lang.delegate([], {length: 1}).length == 1 && !has("bug-for-in-skips-shadowed");
	});
	
	var ap = Array.prototype, aps = ap.slice, apc = ap.concat, forEach = array.forEach;

	var tnl = function(/*Array*/ a, /*dojo/NodeList?*/ parent, /*Function?*/ NodeListCtor){
		// summary:
		//		decorate an array to make it look like a `dojo/NodeList`.
		// a:
		//		Array of nodes to decorate.
		// parent:
		//		An optional parent NodeList that generated the current
		//		list of nodes. Used to call _stash() so the parent NodeList
		//		can be accessed via end() later.
		// NodeListCtor:
		//		An optional constructor function to use for any
		//		new NodeList calls. This allows a certain chain of
		//		NodeList calls to use a different object than dojo/NodeList.
		var nodeList = new (NodeListCtor || this._NodeListCtor || nl)(a);
		return parent ? nodeList._stash(parent) : nodeList;
	};

	var loopBody = function(f, a, o){
		a = [0].concat(aps.call(a, 0));
		o = o || dojo.global;
		return function(node){
			a[0] = node;
			return f.apply(o, a);
		};
	};

	// adapters

	var adaptAsForEach = function(f, o){
		// summary:
		//		adapts a single node function to be used in the forEach-type
		//		actions. The initial object is returned from the specialized
		//		function.
		// f: Function
		//		a function to adapt
		// o: Object?
		//		an optional context for f
		return function(){
			this.forEach(loopBody(f, arguments, o));
			return this;	// Object
		};
	};

	var adaptAsMap = function(f, o){
		// summary:
		//		adapts a single node function to be used in the map-type
		//		actions. The return is a new array of values, as via `dojo/_base/array.map`
		// f: Function
		//		a function to adapt
		// o: Object?
		//		an optional context for f
		return function(){
			return this.map(loopBody(f, arguments, o));
		};
	};

	var adaptAsFilter = function(f, o){
		// summary:
		//		adapts a single node function to be used in the filter-type actions
		// f: Function
		//		a function to adapt
		// o: Object?
		//		an optional context for f
		return function(){
			return this.filter(loopBody(f, arguments, o));
		};
	};

	var adaptWithCondition = function(f, g, o){
		// summary:
		//		adapts a single node function to be used in the map-type
		//		actions, behaves like forEach() or map() depending on arguments
		// f: Function
		//		a function to adapt
		// g: Function
		//		a condition function, if true runs as map(), otherwise runs as forEach()
		// o: Object?
		//		an optional context for f and g
		return function(){
			var a = arguments, body = loopBody(f, a, o);
			if(g.call(o || dojo.global, a)){
				return this.map(body);	// self
			}
			this.forEach(body);
			return this;	// self
		};
	};

	var NodeList = function(array){
		// summary:
		//		Array-like object which adds syntactic
		//		sugar for chaining, common iteration operations, animation, and
		//		node manipulation. NodeLists are most often returned as the
		//		result of dojo/query() calls.
		// description:
		//		NodeList instances provide many utilities that reflect
		//		core Dojo APIs for Array iteration and manipulation, DOM
		//		manipulation, and event handling. Instead of needing to dig up
		//		functions in the dojo package, NodeLists generally make the
		//		full power of Dojo available for DOM manipulation tasks in a
		//		simple, chainable way.
		// example:
		//		create a node list from a node
		//		|	require(["dojo/query", "dojo/dom"
		//		|	], function(query, dom){
		//		|		query.NodeList(dom.byId("foo"));
		//		|	});
		// example:
		//		get a NodeList from a CSS query and iterate on it
		//		|	require(["dojo/on", "dojo/dom"
		//		|	], function(on, dom){
		//		|		var l = query(".thinger");
		//		|		l.forEach(function(node, index, nodeList){
		//		|			console.log(index, node.innerHTML);
		//		|		});
		//		|	});
		// example:
		//		use native and Dojo-provided array methods to manipulate a
		//		NodeList without needing to use dojo.* functions explicitly:
		//		|	require(["dojo/query", "dojo/dom-construct", "dojo/dom"
		//		|	], function(query, domConstruct, dom){
		//		|		var l = query(".thinger");
		//		|		// since NodeLists are real arrays, they have a length
		//		|		// property that is both readable and writable and
		//		|		// push/pop/shift/unshift methods
		//		|		console.log(l.length);
		//		|		l.push(domConstruct.create("span"));
		//		|
		//		|		// dojo's normalized array methods work too:
		//		|		console.log( l.indexOf(dom.byId("foo")) );
		//		|		// ...including the special "function as string" shorthand
		//		|		console.log( l.every("item.nodeType == 1") );
		//		|
		//		|		// NodeLists can be [..] indexed, or you can use the at()
		//		|		// function to get specific items wrapped in a new NodeList:
		//		|		var node = l[3]; // the 4th element
		//		|		var newList = l.at(1, 3); // the 2nd and 4th elements
		//		|	});
		// example:
		//		chainability is a key advantage of NodeLists:
		//		|	require(["dojo/query", "dojo/NodeList-dom"
		//		|	], function(query){
		//		|		query(".thinger")
		//		|			.onclick(function(e){ /* ... */ })
		//		|			.at(1, 3, 8) // get a subset
		//		|				.style("padding", "5px")
		//		|				.forEach(console.log);
		//		|	});

		var isNew = this instanceof nl && has("array-extensible");
		if(typeof array == "number"){
			array = Array(array);
		}
		var nodeArray = (array && "length" in array) ? array : arguments;
		if(isNew || !nodeArray.sort){
			// make sure it's a real array before we pass it on to be wrapped 
			var target = isNew ? this : [],
				l = target.length = nodeArray.length;
			for(var i = 0; i < l; i++){
				target[i] = nodeArray[i];
			}
			if(isNew){
				// called with new operator, this means we are going to use this instance and push
				// the nodes on to it. This is usually much faster since the NodeList properties
				//	don't need to be copied (unless the list of nodes is extremely large).
				return target;
			}
			nodeArray = target;
		}
		// called without new operator, use a real array and copy prototype properties,
		// this is slower and exists for back-compat. Should be removed in 2.0.
		lang._mixin(nodeArray, nlp);
		nodeArray._NodeListCtor = function(array){
			// call without new operator to preserve back-compat behavior
			return nl(array);
		};
		return nodeArray;
	};
	
	var nl = NodeList, nlp = nl.prototype = 
		has("array-extensible") ? [] : {};// extend an array if it is extensible

	// expose adapters and the wrapper as private functions

	nl._wrap = nlp._wrap = tnl;
	nl._adaptAsMap = adaptAsMap;
	nl._adaptAsForEach = adaptAsForEach;
	nl._adaptAsFilter  = adaptAsFilter;
	nl._adaptWithCondition = adaptWithCondition;

	// mass assignment

	// add array redirectors
	forEach(["slice", "splice"], function(name){
		var f = ap[name];
		//Use a copy of the this array via this.slice() to allow .end() to work right in the splice case.
		// CANNOT apply ._stash()/end() to splice since it currently modifies
		// the existing this array -- it would break backward compatibility if we copy the array before
		// the splice so that we can use .end(). So only doing the stash option to this._wrap for slice.
		nlp[name] = function(){ return this._wrap(f.apply(this, arguments), name == "slice" ? this : null); };
	});
	// concat should be here but some browsers with native NodeList have problems with it

	// add array.js redirectors
	forEach(["indexOf", "lastIndexOf", "every", "some"], function(name){
		var f = array[name];
		nlp[name] = function(){ return f.apply(dojo, [this].concat(aps.call(arguments, 0))); };
	});

	lang.extend(NodeList, {
		// copy the constructors
		constructor: nl,
		_NodeListCtor: nl,
		toString: function(){
			// Array.prototype.toString can't be applied to objects, so we use join
			return this.join(",");
		},
		_stash: function(parent){
			// summary:
			//		private function to hold to a parent NodeList. end() to return the parent NodeList.
			//
			// example:
			//		How to make a `dojo/NodeList` method that only returns the third node in
			//		the dojo/NodeList but allows access to the original NodeList by using this._stash:
			//	|	require(["dojo/query", "dojo/_base/lang", "dojo/NodeList", "dojo/NodeList-dom"
			//	|	], function(query, lang){
			//	|		lang.extend(NodeList, {
			//	|			third: function(){
			//	|				var newNodeList = NodeList(this[2]);
			//	|				return newNodeList._stash(this);
			//	|			}
			//	|		});
			//	|		// then see how _stash applies a sub-list, to be .end()'ed out of
			//	|		query(".foo")
			//	|			.third()
			//	|				.addClass("thirdFoo")
			//	|			.end()
			//	|			// access to the orig .foo list
			//	|			.removeClass("foo")
			//	|	});
			//
			this._parent = parent;
			return this; // dojo/NodeList
		},

		on: function(eventName, listener){
			// summary:
			//		Listen for events on the nodes in the NodeList. Basic usage is:
			//
			// example:
			//		|	require(["dojo/query"
			//		|	], function(query){
			//		|		query(".my-class").on("click", listener);
			//			This supports event delegation by using selectors as the first argument with the event names as
			//			pseudo selectors. For example:
			//		| 		query("#my-list").on("li:click", listener);
			//			This will listen for click events within `<li>` elements that are inside the `#my-list` element.
			//			Because on supports CSS selector syntax, we can use comma-delimited events as well:
			//		| 		query("#my-list").on("li button:mouseover, li:click", listener);
			//		|	});
			var handles = this.map(function(node){
				return on(node, eventName, listener); // TODO: apply to the NodeList so the same selector engine is used for matches
			});
			handles.remove = function(){
				for(var i = 0; i < handles.length; i++){
					handles[i].remove();
				}
			};
			return handles;
		},

		end: function(){
			// summary:
			//		Ends use of the current `NodeList` by returning the previous NodeList
			//		that generated the current NodeList.
			// description:
			//		Returns the `NodeList` that generated the current `NodeList`. If there
			//		is no parent NodeList, an empty NodeList is returned.
			// example:
			//	|	require(["dojo/query", "dojo/NodeList-dom"
			//	|	], function(query){
			//	|		query("a")
			//	|			.filter(".disabled")
			//	|				// operate on the anchors that only have a disabled class
			//	|				.style("color", "grey")
			//	|			.end()
			//	|			// jump back to the list of anchors
			//	|			.style(...)
			//	|	});
			//
			if(this._parent){
				return this._parent;
			}else{
				//Just return empty list.
				return new this._NodeListCtor(0);
			}
		},

		// http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array#Methods

		// FIXME: handle return values for #3244
		//		http://trac.dojotoolkit.org/ticket/3244

		// FIXME:
		//		need to wrap or implement:
		//			join (perhaps w/ innerHTML/outerHTML overload for toString() of items?)
		//			reduce
		//			reduceRight

		/*=====
		slice: function(begin, end){
			// summary:
			//		Returns a new NodeList, maintaining this one in place
			// description:
			//		This method behaves exactly like the Array.slice method
			//		with the caveat that it returns a `dojo/NodeList` and not a
			//		raw Array. For more details, see Mozilla's [slice
			//		documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/slice)
			// begin: Integer
			//		Can be a positive or negative integer, with positive
			//		integers noting the offset to begin at, and negative
			//		integers denoting an offset from the end (i.e., to the left
			//		of the end)
			// end: Integer?
			//		Optional parameter to describe what position relative to
			//		the NodeList's zero index to end the slice at. Like begin,
			//		can be positive or negative.
			return this._wrap(a.slice.apply(this, arguments));
		},

		splice: function(index, howmany, item){
			// summary:
			//		Returns a new NodeList, manipulating this NodeList based on
			//		the arguments passed, potentially splicing in new elements
			//		at an offset, optionally deleting elements
			// description:
			//		This method behaves exactly like the Array.splice method
			//		with the caveat that it returns a `dojo/NodeList` and not a
			//		raw Array. For more details, see Mozilla's [splice
			//		documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)
			//		For backwards compatibility, calling .end() on the spliced NodeList
			//		does not return the original NodeList -- splice alters the NodeList in place.
			// index: Integer
			//		begin can be a positive or negative integer, with positive
			//		integers noting the offset to begin at, and negative
			//		integers denoting an offset from the end (i.e., to the left
			//		of the end)
			// howmany: Integer?
			//		Optional parameter to describe what position relative to
			//		the NodeList's zero index to end the slice at. Like begin,
			//		can be positive or negative.
			// item: Object...?
			//		Any number of optional parameters may be passed in to be
			//		spliced into the NodeList
			return this._wrap(a.splice.apply(this, arguments));	// dojo/NodeList
		},

		indexOf: function(value, fromIndex){
			// summary:
			//		see `dojo/_base/array.indexOf()`. The primary difference is that the acted-on
			//		array is implicitly this NodeList
			// value: Object
			//		The value to search for.
			// fromIndex: Integer?
			//		The location to start searching from. Optional. Defaults to 0.
			// description:
			//		For more details on the behavior of indexOf, see Mozilla's
			//		[indexOf
			//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf)
			// returns:
			//		Positive Integer or 0 for a match, -1 of not found.
			return d.indexOf(this, value, fromIndex); // Integer
		},

		lastIndexOf: function(value, fromIndex){
			// summary:
			//		see `dojo/_base/array.lastIndexOf()`. The primary difference is that the
			//		acted-on array is implicitly this NodeList
			// description:
			//		For more details on the behavior of lastIndexOf, see
			//		Mozilla's [lastIndexOf
			//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
			// value: Object
			//		The value to search for.
			// fromIndex: Integer?
			//		The location to start searching from. Optional. Defaults to 0.
			// returns:
			//		Positive Integer or 0 for a match, -1 of not found.
			return d.lastIndexOf(this, value, fromIndex); // Integer
		},

		every: function(callback, thisObject){
			// summary:
			//		see `dojo/_base/array.every()` and the [Array.every
			//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every).
			//		Takes the same structure of arguments and returns as
			//		dojo/_base/array.every() with the caveat that the passed array is
			//		implicitly this NodeList
			// callback: Function
			//		the callback
			// thisObject: Object?
			//		the context
			return d.every(this, callback, thisObject); // Boolean
		},

		some: function(callback, thisObject){
			// summary:
			//		Takes the same structure of arguments and returns as
			//		`dojo/_base/array.some()` with the caveat that the passed array is
			//		implicitly this NodeList.  See `dojo/_base/array.some()` and Mozilla's
			//		[Array.some
			//		documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some).
			// callback: Function
			//		the callback
			// thisObject: Object?
			//		the context
			return d.some(this, callback, thisObject); // Boolean
		},
		=====*/

		concat: function(item){
			// summary:
			//		Returns a new NodeList comprised of items in this NodeList
			//		as well as items passed in as parameters
			// description:
			//		This method behaves exactly like the Array.concat method
			//		with the caveat that it returns a `NodeList` and not a
			//		raw Array. For more details, see the [Array.concat
			//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/concat)
			// item: Object?
			//		Any number of optional parameters may be passed in to be
			//		spliced into the NodeList

			//return this._wrap(apc.apply(this, arguments));
			// the line above won't work for the native NodeList, or for Dojo NodeLists either :-(

			// implementation notes:
			// Array.concat() doesn't recognize native NodeLists or Dojo NodeLists
			// as arrays, and so does not inline them into a unioned array, but
			// appends them as single entities. Both the original NodeList and the
			// items passed in as parameters must be converted to raw Arrays
			// and then the concatenation result may be re-_wrap()ed as a Dojo NodeList.

			var t = aps.call(this, 0),
				m = array.map(arguments, function(a){
					return aps.call(a, 0);
				});
			return this._wrap(apc.apply(t, m), this);	// dojo/NodeList
		},

		map: function(/*Function*/ func, /*Function?*/ obj){
			// summary:
			//		see `dojo/_base/array.map()`. The primary difference is that the acted-on
			//		array is implicitly this NodeList and the return is a
			//		NodeList (a subclass of Array)
			return this._wrap(array.map(this, func, obj), this); // dojo/NodeList
		},

		forEach: function(callback, thisObj){
			// summary:
			//		see `dojo/_base/array.forEach()`. The primary difference is that the acted-on
			//		array is implicitly this NodeList. If you want the option to break out
			//		of the forEach loop, use every() or some() instead.
			forEach(this, callback, thisObj);
			// non-standard return to allow easier chaining
			return this; // dojo/NodeList
		},
		filter: function(/*String|Function*/ filter){
			// summary:
			//		"masks" the built-in javascript filter() method (supported
			//		in Dojo via `dojo/_base/array.filter`) to support passing a simple
			//		string filter in addition to supporting filtering function
			//		objects.
			// filter:
			//		If a string, a CSS rule like ".thinger" or "div > span".
			// example:
			//		"regular" JS filter syntax as exposed in `dojo/_base/array.filter`:
			//		|	require(["dojo/query", "dojo/NodeList-dom"
			//		|	], function(query){
			//		|		query("*").filter(function(item){
			//		|			// highlight every paragraph
			//		|			return (item.nodeName == "p");
			//		|		}).style("backgroundColor", "yellow");
			//		|	});
			// example:
			//		the same filtering using a CSS selector
			//		|	require(["dojo/query", "dojo/NodeList-dom"
			//		|	], function(query){
			//		|		query("*").filter("p").styles("backgroundColor", "yellow");
			//		|	});

			var a = arguments, items = this, start = 0;
			if(typeof filter == "string"){ // inline'd type check
				items = query._filterResult(this, a[0]);
				if(a.length == 1){
					// if we only got a string query, pass back the filtered results
					return items._stash(this); // dojo/NodeList
				}
				// if we got a callback, run it over the filtered items
				start = 1;
			}
			return this._wrap(array.filter(items, a[start], a[start + 1]), this);	// dojo/NodeList
		},
		instantiate: function(/*String|Object*/ declaredClass, /*Object?*/ properties){
			// summary:
			//		Create a new instance of a specified class, using the
			//		specified properties and each node in the NodeList as a
			//		srcNodeRef.
			// example:
			//		Grabs all buttons in the page and converts them to dijit/form/Button's.
			//	|	var buttons = query("button").instantiate(Button, {showLabel: true});
			var c = lang.isFunction(declaredClass) ? declaredClass : lang.getObject(declaredClass);
			properties = properties || {};
			return this.forEach(function(node){
				new c(properties, node);
			});	// dojo/NodeList
		},
		at: function(/*===== index =====*/){
			// summary:
			//		Returns a new NodeList comprised of items in this NodeList
			//		at the given index or indices.
			//
			// index: Integer...
			//		One or more 0-based indices of items in the current
			//		NodeList. A negative index will start at the end of the
			//		list and go backwards.
			//
			// example:
			//	Shorten the list to the first, second, and third elements
			//	|	require(["dojo/query"
			//	|	], function(query){
			//	|		query("a").at(0, 1, 2).forEach(fn);
			//	|	});
			//
			// example:
			//	Retrieve the first and last elements of a unordered list:
			//	|	require(["dojo/query"
			//	|	], function(query){
			//	|		query("ul > li").at(0, -1).forEach(cb);
			//	|	});
			//
			// example:
			//	Do something for the first element only, but end() out back to
			//	the original list and continue chaining:
			//	|	require(["dojo/query"
			//	|	], function(query){
			//	|		query("a").at(0).onclick(fn).end().forEach(function(n){
			//	|			console.log(n); // all anchors on the page.
			//	|	})
			//	|	});

			var t = new this._NodeListCtor(0);
			forEach(arguments, function(i){
				if(i < 0){ i = this.length + i; }
				if(this[i]){ t.push(this[i]); }
			}, this);
			return t._stash(this); // dojo/NodeList
		}
	});

	function queryForEngine(engine, NodeList){
		var query = function(/*String*/ query, /*String|DOMNode?*/ root){
			// summary:
			//		Returns nodes which match the given CSS selector, searching the
			//		entire document by default but optionally taking a node to scope
			//		the search by. Returns an instance of NodeList.
			if(typeof root == "string"){
				root = dom.byId(root);
				if(!root){
					return new NodeList([]);
				}
			}
			var results = typeof query == "string" ? engine(query, root) : query ? (query.end && query.on) ? query : [query] : [];
			if(results.end && results.on){
				// already wrapped
				return results;
			}
			return new NodeList(results);
		};
		query.matches = engine.match || function(node, selector, root){
			// summary:
			//		Test to see if a node matches a selector
			return query.filter([node], selector, root).length > 0;
		};
		// the engine provides a filtering function, use it to for matching
		query.filter = engine.filter || function(nodes, selector, root){
			// summary:
			//		Filters an array of nodes. Note that this does not guarantee to return a NodeList, just an array.
			return query(selector, root).filter(function(node){
				return array.indexOf(nodes, node) > -1;
			});
		};
		if(typeof engine != "function"){
			var search = engine.search;
			engine = function(selector, root){
				// Slick does it backwards (or everyone else does it backwards, probably the latter)
				return search(root || document, selector);
			};
		}
		return query;
	}
	var query = queryForEngine(defaultEngine, NodeList);
	/*=====
	query = function(selector, context){
		// summary:
		//		This modules provides DOM querying functionality. The module export is a function
		//		that can be used to query for DOM nodes by CSS selector and returns a NodeList
		//		representing the matching nodes.
		// selector: String
		//		A CSS selector to search for.
		// context: String|DomNode?
		//		An optional context to limit the searching scope. Only nodes under `context` will be
		//		scanned.
		// example:
		//		add an onclick handler to every submit button in the document
		//		which causes the form to be sent via Ajax instead:
		//	|	require(["dojo/query", "dojo/request", "dojo/dom-form", "dojo/dom-construct", "dojo/dom-style"
		//	|	], function(query, request, domForm, domConstruct, domStyle){
		//	|		query("input[type='submit']").on("click", function(e){
		//	|			e.preventDefault(); // prevent sending the form
		//	|			var btn = e.target;
		//	|			request.post("http://example.com/", {
		//	|				data: domForm.toObject(btn.form)
		//	|			}).then(function(response){
		//	|				// replace the form with the response
		//	|				domConstruct.create(div, {innerHTML: response}, btn.form, "after");
		//	|				domStyle.set(btn.form, "display", "none");
		//	|			});
		//	|		});
		//	|	});
		//
		// description:
		//		dojo/query is responsible for loading the appropriate query engine and wrapping
		//		its results with a `NodeList`. You can use dojo/query with a specific selector engine
		//		by using it as a plugin. For example, if you installed the sizzle package, you could
		//		use it as the selector engine with:
		//		|	require(["dojo/query!sizzle"], function(query){
		//		|		query("div")...
		//
		//		The id after the ! can be a module id of the selector engine or one of the following values:
		//
		//		- acme: This is the default engine used by Dojo base, and will ensure that the full
		//		Acme engine is always loaded.
		//
		//		- css2: If the browser has a native selector engine, this will be used, otherwise a
		//		very minimal lightweight selector engine will be loaded that can do simple CSS2 selectors
		//		(by #id, .class, tag, and [name=value] attributes, with standard child or descendant (>)
		//		operators) and nothing more.
		//
		//		- css2.1: If the browser has a native selector engine, this will be used, otherwise the
		//		full Acme engine will be loaded.
		//
		//		- css3: If the browser has a native selector engine with support for CSS3 pseudo
		//		selectors (most modern browsers except IE8), this will be used, otherwise the
		//		full Acme engine will be loaded.
		//
		//		- Or the module id of a selector engine can be used to explicitly choose the selector engine
		//
		//		For example, if you are using CSS3 pseudo selectors in module, you can specify that
		//		you will need support them with:
		//		|	require(["dojo/query!css3"], function(query){
		//		|		query('#t > h3:nth-child(odd)')...
		//
		//		You can also choose the selector engine/load configuration by setting the query-selector:
		//		For example:
		//		|	<script data-dojo-config="query-selector:'css3'" src="dojo.js"></script>
		//
		return new NodeList(); // dojo/NodeList
	 };
	 =====*/

	// the query that is returned from this module is slightly different than dojo.query,
	// because dojo.query has to maintain backwards compatibility with returning a
	// true array which has performance problems. The query returned from the module
	// does not use true arrays, but rather inherits from Array, making it much faster to
	// instantiate.
	dojo.query = queryForEngine(defaultEngine, function(array){
		// call it without the new operator to invoke the back-compat behavior that returns a true array
		return NodeList(array);	// dojo/NodeList
	});

	query.load = function(id, parentRequire, loaded){
		// summary:
		//		can be used as AMD plugin to conditionally load new query engine
		// example:
		//	|	require(["dojo/query!custom"], function(qsa){
		//	|		// loaded selector/custom.js as engine
		//	|		qsa("#foobar").forEach(...);
		//	|	});
		loader.load(id, parentRequire, function(engine){
			loaded(queryForEngine(engine, NodeList));
		});
	};

	dojo._filterQueryResult = query._filterResult = function(nodes, selector, root){
		return new NodeList(query.filter(nodes, selector, root));
	};
	dojo.NodeList = query.NodeList = NodeList;
	return query;
});

},
'dojo/has':function(){
define(["./global", "require", "module"], function(global, require, module){
	// module:
	//		dojo/has
	// summary:
	//		Defines the has.js API and several feature tests used by dojo.
	// description:
	//		This module defines the has API as described by the project has.js with the following additional features:
	//
	//		- the has test cache is exposed at has.cache.
	//		- the method has.add includes a forth parameter that controls whether or not existing tests are replaced
	//		- the loader's has cache may be optionally copied into this module's has cahce.
	//
	//		This module adopted from https://github.com/phiggins42/has.js; thanks has.js team!

	// try to pull the has implementation from the loader; both the dojo loader and bdLoad provide one
	// if using a foreign loader, then the has cache may be initialized via the config object for this module
	// WARNING: if a foreign loader defines require.has to be something other than the has.js API, then this implementation fail
	var has = require.has || function(){};
	if(! 1 ){
		var
			isBrowser =
				// the most fundamental decision: are we in the browser?
				typeof window != "undefined" &&
				typeof location != "undefined" &&
				typeof document != "undefined" &&
				window.location == location && window.document == document,

			// has API variables
			doc = isBrowser && document,
			element = doc && doc.createElement("DiV"),
			cache = (module.config && module.config()) || {};

		has = function(name){
			// summary:
			//		Return the current value of the named feature.
			//
			// name: String|Integer
			//		The name (if a string) or identifier (if an integer) of the feature to test.
			//
			// description:
			//		Returns the value of the feature named by name. The feature must have been
			//		previously added to the cache by has.add.

			return typeof cache[name] == "function" ? (cache[name] = cache[name](global, doc, element)) : cache[name]; // Boolean
		};

		has.cache = cache;

		has.add = function(name, test, now, force){
			// summary:
			//	 	Register a new feature test for some named feature.
			// name: String|Integer
			//	 	The name (if a string) or identifier (if an integer) of the feature to test.
			// test: Function
			//		 A test function to register. If a function, queued for testing until actually
			//		 needed. The test function should return a boolean indicating
			//	 	the presence of a feature or bug.
			// now: Boolean?
			//		 Optional. Omit if `test` is not a function. Provides a way to immediately
			//		 run the test and cache the result.
			// force: Boolean?
			//	 	Optional. If the test already exists and force is truthy, then the existing
			//	 	test will be replaced; otherwise, add does not replace an existing test (that
			//	 	is, by default, the first test advice wins).
			// example:
			//		A redundant test, testFn with immediate execution:
			//	|	has.add("javascript", function(){ return true; }, true);
			//
			// example:
			//		Again with the redundantness. You can do this in your tests, but we should
			//		not be doing this in any internal has.js tests
			//	|	has.add("javascript", true);
			//
			// example:
			//		Three things are passed to the testFunction. `global`, `document`, and a generic element
			//		from which to work your test should the need arise.
			//	|	has.add("bug-byid", function(g, d, el){
			//	|		// g	== global, typically window, yadda yadda
			//	|		// d	== document object
			//	|		// el == the generic element. a `has` element.
			//	|		return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
			//	|	});

			(typeof cache[name]=="undefined" || force) && (cache[name]= test);
			return now && has(name);
		};

		// since we're operating under a loader that doesn't provide a has API, we must explicitly initialize
		// has as it would have otherwise been initialized by the dojo loader; use has.add to the builder
		// can optimize these away iff desired
		 1 || has.add("host-browser", isBrowser);
		 0 && has.add("host-node", (typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
		 0 && has.add("host-rhino", (typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
		 1 || has.add("dom", isBrowser);
		 1 || has.add("dojo-dom-ready-api", 1);
		 1 || has.add("dojo-sniff", 1);
	}

	if( 1 ){
		// Common application level tests
		has.add("dom-addeventlistener", !!document.addEventListener);

		// Do the device and browser have touch capability?
		has.add("touch", "ontouchstart" in document
			|| ("onpointerdown" in document && navigator.maxTouchPoints > 0)
			|| window.navigator.msMaxTouchPoints);

		// Touch events support
		has.add("touch-events", "ontouchstart" in document);

		// Test if pointer events are supported and enabled, with either standard names ("pointerdown" etc.) or
		// IE specific names ("MSPointerDown" etc.).  Tests are designed to work on embedded C# WebBrowser Controls
		// in addition to IE, Edge, and future versions of Firefox and Chrome.
		// Note that on IE11, has("pointer-events") and has("MSPointer") are both true.
		has.add("pointer-events", "pointerEnabled" in window.navigator ?
				window.navigator.pointerEnabled : "PointerEvent" in window);
		has.add("MSPointer", window.navigator.msPointerEnabled);
		// The "pointermove"" event is only continuously emitted in a touch environment if
		// the target node's "touch-action"" CSS property is set to "none"
		// https://www.w3.org/TR/pointerevents/#the-touch-action-css-property
		has.add("touch-action", has("touch") && has("pointer-events"));

		// I don't know if any of these tests are really correct, just a rough guess
		has.add("device-width", screen.availWidth || innerWidth);

		// Tests for DOMNode.attributes[] behavior:
		//	 - dom-attributes-explicit - attributes[] only lists explicitly user specified attributes
		//	 - dom-attributes-specified-flag (IE8) - need to check attr.specified flag to skip attributes user didn't specify
		//	 - Otherwise, in IE6-7. attributes[] will list hundreds of values, so need to do outerHTML to get attrs instead.
		var form = document.createElement("form");
		has.add("dom-attributes-explicit", form.attributes.length == 0); // W3C
		has.add("dom-attributes-specified-flag", form.attributes.length > 0 && form.attributes.length < 40);	// IE8
	}

	has.clearElement = function(element){
		// summary:
		//	 Deletes the contents of the element passed to test functions.
		element.innerHTML= "";
		return element;
	};

	has.normalize = function(id, toAbsMid){
		// summary:
		//	 Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
		//
		// toAbsMid: Function
		//	 Resolves a relative module id into an absolute module id
		var
			tokens = id.match(/[\?:]|[^:\?]*/g), i = 0,
			get = function(skip){
				var term = tokens[i++];
				if(term == ":"){
					// empty string module name, resolves to 0
					return 0;
				}else{
					// postfixed with a ? means it is a feature to branch on, the term is the name of the feature
					if(tokens[i++] == "?"){
						if(!skip && has(term)){
							// matched the feature, get the first value from the options
							return get();
						}else{
							// did not match, get the second value, passing over the first
							get(true);
							return get(skip);
						}
					}
					// a module
					return term || 0;
				}
			};
		id = get();
		return id && toAbsMid(id);
	};

	has.load = function(id, parentRequire, loaded){
		// summary:
		//		Conditional loading of AMD modules based on a has feature test value.
		// id: String
		//		Gives the resolved module id to load.
		// parentRequire: Function
		//		The loader require function with respect to the module that contained the plugin resource in it's
		//		dependency list.
		// loaded: Function
		//	 Callback to loader that consumes result of plugin demand.

		if(id){
			parentRequire([id], loaded);
		}else{
			loaded();
		}
	};

	return has;
});

},
'dojo/json':function(){
define(["./has"], function(has){
	"use strict";
	var hasJSON = typeof JSON != "undefined";
	has.add("json-parse", hasJSON); // all the parsers work fine
		// Firefox 3.5/Gecko 1.9 fails to use replacer in stringify properly https://bugzilla.mozilla.org/show_bug.cgi?id=509184
	has.add("json-stringify", hasJSON && JSON.stringify({a:0}, function(k,v){return v||1;}) == '{"a":1}');

	/*=====
	return {
		// summary:
		//		Functions to parse and serialize JSON

		parse: function(str, strict){
			// summary:
			//		Parses a [JSON](http://json.org) string to return a JavaScript object.
			// description:
			//		This function follows [native JSON API](https://developer.mozilla.org/en/JSON)
			//		Throws for invalid JSON strings. This delegates to eval() if native JSON
			//		support is not available. By default this will evaluate any valid JS expression.
			//		With the strict parameter set to true, the parser will ensure that only
			//		valid JSON strings are parsed (otherwise throwing an error). Without the strict
			//		parameter, the content passed to this method must come
			//		from a trusted source.
			// str:
			//		a string literal of a JSON item, for instance:
			//		`'{ "foo": [ "bar", 1, { "baz": "thud" } ] }'`
			// strict:
			//		When set to true, this will ensure that only valid, secure JSON is ever parsed.
			//		Make sure this is set to true for untrusted content. Note that on browsers/engines
			//		without native JSON support, setting this to true will run slower.
		},
		stringify: function(value, replacer, spacer){
			// summary:
			//		Returns a [JSON](http://json.org) serialization of an object.
			// description:
			//		Returns a [JSON](http://json.org) serialization of an object.
			//		This function follows [native JSON API](https://developer.mozilla.org/en/JSON)
			//		Note that this doesn't check for infinite recursion, so don't do that!
			// value:
			//		A value to be serialized.
			// replacer:
			//		A replacer function that is called for each value and can return a replacement
			// spacer:
			//		A spacer string to be used for pretty printing of JSON
			// example:
			//		simple serialization of a trivial object
			//	|	define(["dojo/json"], function(JSON){
			// 	|		var jsonStr = JSON.stringify({ howdy: "stranger!", isStrange: true });
			//	|		doh.is('{"howdy":"stranger!","isStrange":true}', jsonStr);
		}
	};
	=====*/

	if(has("json-stringify")){
		return JSON;
	}else{
		var escapeString = function(/*String*/str){
			// summary:
			//		Adds escape sequences for non-visual characters, double quote and
			//		backslash and surrounds with double quotes to form a valid string
			//		literal.
			return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').
				replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").
				replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r"); // string
		};
		return {
			parse: has("json-parse") ? JSON.parse : function(str, strict){
				if(strict && !/^([\s\[\{]*(?:"(?:\\.|[^"])*"|-?\d[\d\.]*(?:[Ee][+-]?\d+)?|null|true|false|)[\s\]\}]*(?:,|:|$))+$/.test(str)){
					throw new SyntaxError("Invalid characters in JSON");
				}
				return eval('(' + str + ')');
			},
			stringify: function(value, replacer, spacer){
				var undef;
				if(typeof replacer == "string"){
					spacer = replacer;
					replacer = null;
				}
				function stringify(it, indent, key){
					if(replacer){
						it = replacer(key, it);
					}
					var val, objtype = typeof it;
					if(objtype == "number"){
						return isFinite(it) ? it + "" : "null";
					}
					if(objtype == "boolean"){
						return it + "";
					}
					if(it === null){
						return "null";
					}
					if(typeof it == "string"){
						return escapeString(it);
					}
					if(objtype == "function" || objtype == "undefined"){
						return undef; // undefined
					}
					// short-circuit for objects that support "json" serialization
					// if they return "self" then just pass-through...
					if(typeof it.toJSON == "function"){
						return stringify(it.toJSON(key), indent, key);
					}
					if(it instanceof Date){
						return '"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z"'.replace(/\{(\w+)(\+)?\}/g, function(t, prop, plus){
							var num = it["getUTC" + prop]() + (plus ? 1 : 0);
							return num < 10 ? "0" + num : num;
						});
					}
					if(it.valueOf() !== it){
						// primitive wrapper, try again unwrapped:
						return stringify(it.valueOf(), indent, key);
					}
					var nextIndent= spacer ? (indent + spacer) : "";
					/* we used to test for DOM nodes and throw, but FF serializes them as {}, so cross-browser consistency is probably not efficiently attainable */ 
				
					var sep = spacer ? " " : "";
					var newLine = spacer ? "\n" : "";
				
					// array
					if(it instanceof Array){
						var itl = it.length, res = [];
						for(key = 0; key < itl; key++){
							var obj = it[key];
							val = stringify(obj, nextIndent, key);
							if(typeof val != "string"){
								val = "null";
							}
							res.push(newLine + nextIndent + val);
						}
						return "[" + res.join(",") + newLine + indent + "]";
					}
					// generic object code path
					var output = [];
					for(key in it){
						var keyStr;
						if(it.hasOwnProperty(key)){
							if(typeof key == "number"){
								keyStr = '"' + key + '"';
							}else if(typeof key == "string"){
								keyStr = escapeString(key);
							}else{
								// skip non-string or number keys
								continue;
							}
							val = stringify(it[key], nextIndent, key);
							if(typeof val != "string"){
								// skip non-serializable values
								continue;
							}
							// At this point, the most non-IE browsers don't get in this branch 
							// (they have native JSON), so push is definitely the way to
							output.push(newLine + nextIndent + keyStr + ":" + sep + val);
						}
					}
					return "{" + output.join(",") + newLine + indent + "}"; // String
				}
				return stringify(value, "", "");
			}
		};
	}
});

},
'dojo/_base/declare':function(){
define(["./kernel", "../has", "./lang"], function(dojo, has, lang){
	// module:
	//		dojo/_base/declare

	var mix = lang.mixin, op = Object.prototype, opts = op.toString,
		xtor, counter = 0, cname = "constructor";

	if(!has("csp-restrictions")){
		// 'new Function()' is preferable when available since it does not create a closure
		xtor = new Function;
	}else{
		xtor = function(){};
	}

	function err(msg, cls){ throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg); }

	// C3 Method Resolution Order (see http://www.python.org/download/releases/2.3/mro/)
	function c3mro(bases, className){
		var result = [], roots = [{cls: 0, refs: []}], nameMap = {}, clsCount = 1,
			l = bases.length, i = 0, j, lin, base, top, proto, rec, name, refs;

		// build a list of bases naming them if needed
		for(; i < l; ++i){
			base = bases[i];
			if(!base){
				err("mixin #" + i + " is unknown. Did you use dojo.require to pull it in?", className);
			}else if(opts.call(base) != "[object Function]"){
				err("mixin #" + i + " is not a callable constructor.", className);
			}
			lin = base._meta ? base._meta.bases : [base];
			top = 0;
			// add bases to the name map
			for(j = lin.length - 1; j >= 0; --j){
				proto = lin[j].prototype;
				if(!proto.hasOwnProperty("declaredClass")){
					proto.declaredClass = "uniqName_" + (counter++);
				}
				name = proto.declaredClass;
				if(!nameMap.hasOwnProperty(name)){
					nameMap[name] = {count: 0, refs: [], cls: lin[j]};
					++clsCount;
				}
				rec = nameMap[name];
				if(top && top !== rec){
					rec.refs.push(top);
					++top.count;
				}
				top = rec;
			}
			++top.count;
			roots[0].refs.push(top);
		}

		// remove classes without external references recursively
		while(roots.length){
			top = roots.pop();
			result.push(top.cls);
			--clsCount;
			// optimization: follow a single-linked chain
			while(refs = top.refs, refs.length == 1){
				top = refs[0];
				if(!top || --top.count){
					// branch or end of chain => do not end to roots
					top = 0;
					break;
				}
				result.push(top.cls);
				--clsCount;
			}
			if(top){
				// branch
				for(i = 0, l = refs.length; i < l; ++i){
					top = refs[i];
					if(!--top.count){
						roots.push(top);
					}
				}
			}
		}
		if(clsCount){
			err("can't build consistent linearization", className);
		}

		// calculate the superclass offset
		base = bases[0];
		result[0] = base ?
			base._meta && base === result[result.length - base._meta.bases.length] ?
				base._meta.bases.length : 1 : 0;

		return result;
	}

	function inherited(args, a, f, g){
		var name, chains, bases, caller, meta, base, proto, opf, pos,
			cache = this._inherited = this._inherited || {};

		// crack arguments
		if(typeof args === "string"){
			name = args;
			args = a;
			a = f;
			f = g;
		}

		if(typeof args === "function"){
			// support strict mode
			caller = args;
			args = a;
			a = f;
		}else{
			try{
				caller = args.callee;
			}catch (e){
				if(e instanceof TypeError){
					// caller was defined in a strict-mode context
					err("strict mode inherited() requires the caller function to be passed before arguments", this.declaredClass);
				}else{
					throw e;
				}
			}
		}

		name = name || caller.nom;
		if(!name){
			err("can't deduce a name to call inherited()", this.declaredClass);
		}
		f = g = 0;

		meta = this.constructor._meta;
		bases = meta.bases;

		pos = cache.p;
		if(name != cname){
			// method
			if(cache.c !== caller){
				// cache bust
				pos = 0;
				base = bases[0];
				meta = base._meta;
				if(meta.hidden[name] !== caller){
					// error detection
					chains = meta.chains;
					if(chains && typeof chains[name] == "string"){
						err("calling chained method with inherited: " + name, this.declaredClass);
					}
					// find caller
					do{
						meta = base._meta;
						proto = base.prototype;
						if(meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)){
							break;
						}
					}while(base = bases[++pos]); // intentional assignment
					pos = base ? pos : -1;
				}
			}
			// find next
			base = bases[++pos];
			if(base){
				proto = base.prototype;
				if(base._meta && proto.hasOwnProperty(name)){
					f = proto[name];
				}else{
					opf = op[name];
					do{
						proto = base.prototype;
						f = proto[name];
						if(f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)){
							break;
						}
					}while(base = bases[++pos]); // intentional assignment
				}
			}
			f = base && f || op[name];
		}else{
			// constructor
			if(cache.c !== caller){
				// cache bust
				pos = 0;
				meta = bases[0]._meta;
				if(meta && meta.ctor !== caller){
					// error detection
					chains = meta.chains;
					if(!chains || chains.constructor !== "manual"){
						err("calling chained constructor with inherited", this.declaredClass);
					}
					// find caller
					while(base = bases[++pos]){ // intentional assignment
						meta = base._meta;
						if(meta && meta.ctor === caller){
							break;
						}
					}
					pos = base ? pos : -1;
				}
			}
			// find next
			while(base = bases[++pos]){	// intentional assignment
				meta = base._meta;
				f = meta ? meta.ctor : base;
				if(f){
					break;
				}
			}
			f = base && f;
		}

		// cache the found super method
		cache.c = f;
		cache.p = pos;

		// now we have the result
		if(f){
			return a === true ? f : f.apply(this, a || args);
		}
		// intentionally no return if a super method was not found
	}

	function getInherited(name, args, a){
		if(typeof name === "string"){
			if (typeof args === "function") {
				return this.__inherited(name, args, a, true);
			}
			return this.__inherited(name, args, true);
		}
		else if (typeof name === "function") {
			return this.__inherited(name, args, true);
		}
		return this.__inherited(name, true);
	}

	function inherited__debug(args, a1, a2, a3){
		var f = this.getInherited(args, a1, a2);
		if(f){
			return f.apply(this, a3 || a2 || a1 || args);
		}
		// intentionally no return if a super method was not found
	}

	var inheritedImpl = dojo.config.isDebug ? inherited__debug : inherited;

	// emulation of "instanceof"
	function isInstanceOf(cls){
		var bases = this.constructor._meta.bases;
		for(var i = 0, l = bases.length; i < l; ++i){
			if(bases[i] === cls){
				return true;
			}
		}
		return this instanceof cls;
	}

	function mixOwn(target, source){
		// add props adding metadata for incoming functions skipping a constructor
		for(var name in source){
			if(name != cname && source.hasOwnProperty(name)){
				target[name] = source[name];
			}
		}
		if(has("bug-for-in-skips-shadowed")){
			for(var extraNames= lang._extraNames, i= extraNames.length; i;){
				name = extraNames[--i];
				if(name != cname && source.hasOwnProperty(name)){
					  target[name] = source[name];
				}
			}
		}
	}

	// implementation of safe mixin function
	function safeMixin(target, source){
		// summary:
		//		Mix in properties skipping a constructor and decorating functions
		//		like it is done by declare().
		// target: Object
		//		Target object to accept new properties.
		// source: Object
		//		Source object for new properties.
		// description:
		//		This function is used to mix in properties like lang.mixin does,
		//		but it skips a constructor property and decorates functions like
		//		declare() does.
		//
		//		It is meant to be used with classes and objects produced with
		//		declare. Functions mixed in with dojo.safeMixin can use
		//		this.inherited() like normal methods.
		//
		//		This function is used to implement extend() method of a constructor
		//		produced with declare().
		//
		// example:
		//	|	var A = declare(null, {
		//	|		m1: function(){
		//	|			console.log("A.m1");
		//	|		},
		//	|		m2: function(){
		//	|			console.log("A.m2");
		//	|		}
		//	|	});
		//	|	var B = declare(A, {
		//	|		m1: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("B.m1");
		//	|		}
		//	|	});
		//	|	B.extend({
		//	|		m2: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("B.m2");
		//	|		}
		//	|	});
		//	|	var x = new B();
		//	|	dojo.safeMixin(x, {
		//	|		m1: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("X.m1");
		//	|		},
		//	|		m2: function(){
		//	|			this.inherited(arguments);
		//	|			console.log("X.m2");
		//	|		}
		//	|	});
		//	|	x.m2();
		//	|	// prints:
		//	|	// A.m1
		//	|	// B.m1
		//	|	// X.m1

		var name, t;
		// add props adding metadata for incoming functions skipping a constructor
		for(name in source){
			t = source[name];
			if((t !== op[name] || !(name in op)) && name != cname){
				if(opts.call(t) == "[object Function]"){
					// non-trivial function method => attach its name
					t.nom = name;
				}
				target[name] = t;
			}
		}
		if(has("bug-for-in-skips-shadowed") && source){
			for(var extraNames= lang._extraNames, i= extraNames.length; i;){
				name = extraNames[--i];
				t = source[name];
				if((t !== op[name] || !(name in op)) && name != cname){
					if(opts.call(t) == "[object Function]"){
						// non-trivial function method => attach its name
						  t.nom = name;
					}
					target[name] = t;
				}
			}
		}
		return target;
	}

	function extend(source){
		declare.safeMixin(this.prototype, source);
		return this;
	}

	function createSubclass(mixins, props){
		// crack parameters
		if(!(mixins instanceof Array || typeof mixins === 'function')){
			props = mixins;
			mixins = undefined;
		}

		props = props || {};
		mixins = mixins || [];

		return declare([this].concat(mixins), props);
	}

	// chained constructor compatible with the legacy declare()
	function chainedConstructor(bases, ctorSpecial){
		return function(){
			var a = arguments, args = a, a0 = a[0], f, i, m,
				l = bases.length, preArgs;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original declare()
			// 1) call two types of the preamble
			if(ctorSpecial && (a0 && a0.preamble || this.preamble)){
				// full blown ritual
				preArgs = new Array(bases.length);
				// prepare parameters
				preArgs[0] = a;
				for(i = 0;;){
					// process the preamble of the 1st argument
					a0 = a[0];
					if(a0){
						f = a0.preamble;
						if(f){
							a = f.apply(this, a) || a;
						}
					}
					// process the preamble of this class
					f = bases[i].prototype;
					f = f.hasOwnProperty("preamble") && f.preamble;
					if(f){
						a = f.apply(this, a) || a;
					}
					// one peculiarity of the preamble:
					// it is called if it is not needed,
					// e.g., there is no constructor to call
					// let's watch for the last constructor
					// (see ticket #9795)
					if(++i == l){
						break;
					}
					preArgs[i] = a;
				}
			}
			// 2) call all non-trivial constructors using prepared arguments
			for(i = l - 1; i >= 0; --i){
				f = bases[i];
				m = f._meta;
				f = m ? m.ctor : f;
				if(f){
					f.apply(this, preArgs ? preArgs[i] : a);
				}
			}
			// 3) continue the original ritual: call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, args);
			}
		};
	}


	// chained constructor compatible with the legacy declare()
	function singleConstructor(ctor, ctorSpecial){
		return function(){
			var a = arguments, t = a, a0 = a[0], f;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original declare()
			// 1) call two types of the preamble
			if(ctorSpecial){
				// full blown ritual
				if(a0){
					// process the preamble of the 1st argument
					f = a0.preamble;
					if(f){
						t = f.apply(this, t) || t;
					}
				}
				f = this.preamble;
				if(f){
					// process the preamble of this class
					f.apply(this, t);
					// one peculiarity of the preamble:
					// it is called even if it is not needed,
					// e.g., there is no constructor to call
					// let's watch for the last constructor
					// (see ticket #9795)
				}
			}
			// 2) call a constructor
			if(ctor){
				ctor.apply(this, a);
			}
			// 3) continue the original ritual: call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, a);
			}
		};
	}

	// plain vanilla constructor (can use inherited() to call its base constructor)
	function simpleConstructor(bases){
		return function(){
			var a = arguments, i = 0, f, m;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original declare()
			// 1) do not call the preamble
			// 2) call the top constructor (it can use this.inherited())
			for(; f = bases[i]; ++i){ // intentional assignment
				m = f._meta;
				f = m ? m.ctor : f;
				if(f){
					f.apply(this, a);
					break;
				}
			}
			// 3) call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, a);
			}
		};
	}

	function chain(name, bases, reversed){
		return function(){
			var b, m, f, i = 0, step = 1;
			if(reversed){
				i = bases.length - 1;
				step = -1;
			}
			for(; b = bases[i]; i += step){ // intentional assignment
				m = b._meta;
				f = (m ? m.hidden : b.prototype)[name];
				if(f){
					f.apply(this, arguments);
				}
			}
		};
	}

	// forceNew(ctor)
	// return a new object that inherits from ctor.prototype but
	// without actually running ctor on the object.
	function forceNew(ctor){
		// create object with correct prototype using a do-nothing
		// constructor
		xtor.prototype = ctor.prototype;
		var t = new xtor;
		xtor.prototype = null;	// clean up
		return t;
	}

	// applyNew(args)
	// just like 'new ctor()' except that the constructor and its arguments come
	// from args, which must be an array or an arguments object
	function applyNew(args){
		// create an object with ctor's prototype but without
		// calling ctor on it.
		var ctor = args.callee, t = forceNew(ctor);
		// execute the real constructor on the new object
		ctor.apply(t, args);
		return t;
	}

	function declare(className, superclass, props){
		// summary:
		//		Create a feature-rich constructor from compact notation.
		// className: String?
		//		The optional name of the constructor (loosely, a "class")
		//		stored in the "declaredClass" property in the created prototype.
		//		It will be used as a global name for a created constructor.
		// superclass: Function|Function[]
		//		May be null, a Function, or an Array of Functions. This argument
		//		specifies a list of bases (the left-most one is the most deepest
		//		base).
		// props: Object
		//		An object whose properties are copied to the created prototype.
		//		Add an instance-initialization function by making it a property
		//		named "constructor".
		// returns: dojo/_base/declare.__DeclareCreatedObject
		//		New constructor function.
		// description:
		//		Create a constructor using a compact notation for inheritance and
		//		prototype extension.
		//
		//		Mixin ancestors provide a type of multiple inheritance.
		//		Prototypes of mixin ancestors are copied to the new class:
		//		changes to mixin prototypes will not affect classes to which
		//		they have been mixed in.
		//
		//		Ancestors can be compound classes created by this version of
		//		declare(). In complex cases all base classes are going to be
		//		linearized according to C3 MRO algorithm
		//		(see http://www.python.org/download/releases/2.3/mro/ for more
		//		details).
		//
		//		"className" is cached in "declaredClass" property of the new class,
		//		if it was supplied. The immediate super class will be cached in
		//		"superclass" property of the new class.
		//
		//		Methods in "props" will be copied and modified: "nom" property
		//		(the declared name of the method) will be added to all copied
		//		functions to help identify them for the internal machinery. Be
		//		very careful, while reusing methods: if you use the same
		//		function under different names, it can produce errors in some
		//		cases.
		//
		//		It is possible to use constructors created "manually" (without
		//		declare()) as bases. They will be called as usual during the
		//		creation of an instance, their methods will be chained, and even
		//		called by "this.inherited()".
		//
		//		Special property "-chains-" governs how to chain methods. It is
		//		a dictionary, which uses method names as keys, and hint strings
		//		as values. If a hint string is "after", this method will be
		//		called after methods of its base classes. If a hint string is
		//		"before", this method will be called before methods of its base
		//		classes.
		//
		//		If "constructor" is not mentioned in "-chains-" property, it will
		//		be chained using the legacy mode: using "after" chaining,
		//		calling preamble() method before each constructor, if available,
		//		and calling postscript() after all constructors were executed.
		//		If the hint is "after", it is chained as a regular method, but
		//		postscript() will be called after the chain of constructors.
		//		"constructor" cannot be chained "before", but it allows
		//		a special hint string: "manual", which means that constructors
		//		are not going to be chained in any way, and programmer will call
		//		them manually using this.inherited(). In the latter case
		//		postscript() will be called after the construction.
		//
		//		All chaining hints are "inherited" from base classes and
		//		potentially can be overridden. Be very careful when overriding
		//		hints! Make sure that all chained methods can work in a proposed
		//		manner of chaining.
		//
		//		Once a method was chained, it is impossible to unchain it. The
		//		only exception is "constructor". You don't need to define a
		//		method in order to supply a chaining hint.
		//
		//		If a method is chained, it cannot use this.inherited() because
		//		all other methods in the hierarchy will be called automatically.
		//
		//		Usually constructors and initializers of any kind are chained
		//		using "after" and destructors of any kind are chained as
		//		"before". Note that chaining assumes that chained methods do not
		//		return any value: any returned value will be discarded.
		//
		// example:
		//	|	declare("my.classes.bar", my.classes.foo, {
		//	|		// properties to be added to the class prototype
		//	|		someValue: 2,
		//	|		// initialization function
		//	|		constructor: function(){
		//	|			this.myComplicatedObject = new ReallyComplicatedObject();
		//	|		},
		//	|		// other functions
		//	|		someMethod: function(){
		//	|			doStuff();
		//	|		}
		//	|	});
		//
		// example:
		//	|	var MyBase = declare(null, {
		//	|		// constructor, properties, and methods go here
		//	|		// ...
		//	|	});
		//	|	var MyClass1 = declare(MyBase, {
		//	|		// constructor, properties, and methods go here
		//	|		// ...
		//	|	});
		//	|	var MyClass2 = declare(MyBase, {
		//	|		// constructor, properties, and methods go here
		//	|		// ...
		//	|	});
		//	|	var MyDiamond = declare([MyClass1, MyClass2], {
		//	|		// constructor, properties, and methods go here
		//	|		// ...
		//	|	});
		//
		// example:
		//	|	var F = function(){ console.log("raw constructor"); };
		//	|	F.prototype.method = function(){
		//	|		console.log("raw method");
		//	|	};
		//	|	var A = declare(F, {
		//	|		constructor: function(){
		//	|			console.log("A.constructor");
		//	|		},
		//	|		method: function(){
		//	|			console.log("before calling F.method...");
		//	|			this.inherited(arguments);
		//	|			console.log("...back in A");
		//	|		}
		//	|	});
		//	|	new A().method();
		//	|	// will print:
		//	|	// raw constructor
		//	|	// A.constructor
		//	|	// before calling F.method...
		//	|	// raw method
		//	|	// ...back in A
		//
		// example:
		//	|	var A = declare(null, {
		//	|		"-chains-": {
		//	|			destroy: "before"
		//	|		}
		//	|	});
		//	|	var B = declare(A, {
		//	|		constructor: function(){
		//	|			console.log("B.constructor");
		//	|		},
		//	|		destroy: function(){
		//	|			console.log("B.destroy");
		//	|		}
		//	|	});
		//	|	var C = declare(B, {
		//	|		constructor: function(){
		//	|			console.log("C.constructor");
		//	|		},
		//	|		destroy: function(){
		//	|			console.log("C.destroy");
		//	|		}
		//	|	});
		//	|	new C().destroy();
		//	|	// prints:
		//	|	// B.constructor
		//	|	// C.constructor
		//	|	// C.destroy
		//	|	// B.destroy
		//
		// example:
		//	|	var A = declare(null, {
		//	|		"-chains-": {
		//	|			constructor: "manual"
		//	|		}
		//	|	});
		//	|	var B = declare(A, {
		//	|		constructor: function(){
		//	|			// ...
		//	|			// call the base constructor with new parameters
		//	|			this.inherited(arguments, [1, 2, 3]);
		//	|			// ...
		//	|		}
		//	|	});
		//
		// example:
		//	|	var A = declare(null, {
		//	|		"-chains-": {
		//	|			m1: "before"
		//	|		},
		//	|		m1: function(){
		//	|			console.log("A.m1");
		//	|		},
		//	|		m2: function(){
		//	|			console.log("A.m2");
		//	|		}
		//	|	});
		//	|	var B = declare(A, {
		//	|		"-chains-": {
		//	|			m2: "after"
		//	|		},
		//	|		m1: function(){
		//	|			console.log("B.m1");
		//	|		},
		//	|		m2: function(){
		//	|			console.log("B.m2");
		//	|		}
		//	|	});
		//	|	var x = new B();
		//	|	x.m1();
		//	|	// prints:
		//	|	// B.m1
		//	|	// A.m1
		//	|	x.m2();
		//	|	// prints:
		//	|	// A.m2
		//	|	// B.m2

		// crack parameters
		if(typeof className != "string"){
			props = superclass;
			superclass = className;
			className = "";
		}
		props = props || {};

		var proto, i, t, ctor, name, bases, chains, mixins = 1, parents = superclass;

		// build a prototype
		if(opts.call(superclass) == "[object Array]"){
			// C3 MRO
			bases = c3mro(superclass, className);
			t = bases[0];
			mixins = bases.length - t;
			superclass = bases[mixins];
		}else{
			bases = [0];
			if(superclass){
				if(opts.call(superclass) == "[object Function]"){
					t = superclass._meta;
					bases = bases.concat(t ? t.bases : superclass);
				}else{
					err("base class is not a callable constructor.", className);
				}
			}else if(superclass !== null){
				err("unknown base class. Did you use dojo.require to pull it in?", className);
			}
		}
		if(superclass){
			for(i = mixins - 1;; --i){
				proto = forceNew(superclass);
				if(!i){
					// stop if nothing to add (the last base)
					break;
				}
				// mix in properties
				t = bases[i];
				(t._meta ? mixOwn : mix)(proto, t.prototype);
				// chain in new constructor
				if (has("csp-restrictions")) {
					ctor = function () {};
				}
				else {
					ctor = new Function;
				}
				ctor.superclass = superclass;
				ctor.prototype = proto;
				superclass = proto.constructor = ctor;
			}
		}else{
			proto = {};
		}
		// add all properties
		declare.safeMixin(proto, props);
		// add constructor
		t = props.constructor;
		if(t !== op.constructor){
			t.nom = cname;
			proto.constructor = t;
		}

		// collect chains and flags
		for(i = mixins - 1; i; --i){ // intentional assignment
			t = bases[i]._meta;
			if(t && t.chains){
				chains = mix(chains || {}, t.chains);
			}
		}
		if(proto["-chains-"]){
			chains = mix(chains || {}, proto["-chains-"]);
		}

		if(superclass && superclass.prototype && superclass.prototype["-chains-"]) {
			chains = mix(chains || {}, superclass.prototype["-chains-"]);
		}

		// build ctor
		t = !chains || !chains.hasOwnProperty(cname);
		bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) :
			(bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));

		// add meta information to the constructor
		ctor._meta  = {bases: bases, hidden: props, chains: chains,
			parents: parents, ctor: props.constructor};
		ctor.superclass = superclass && superclass.prototype;
		ctor.extend = extend;
		ctor.createSubclass = createSubclass;
		ctor.prototype = proto;
		proto.constructor = ctor;

		// add "standard" methods to the prototype
		proto.getInherited = getInherited;
		proto.isInstanceOf = isInstanceOf;
		proto.inherited    = inheritedImpl;
		proto.__inherited  = inherited;

		// add name if specified
		if(className){
			proto.declaredClass = className;
			lang.setObject(className, ctor);
		}

		// build chains and add them to the prototype
		if(chains){
			for(name in chains){
				if(proto[name] && typeof chains[name] == "string" && name != cname){
					t = proto[name] = chain(name, bases, chains[name] === "after");
					t.nom = name;
				}
			}
		}
		// chained methods do not return values
		// no need to chain "invisible" functions

		return ctor;	// Function
	}

	/*=====
	declare.__DeclareCreatedObject = {
		// summary:
		//		dojo/_base/declare() returns a constructor `C`.   `new C()` returns an Object with the following
		//		methods, in addition to the methods and properties specified via the arguments passed to declare().

		inherited: function(name, caller, args, newArgs){
			// summary:
			//		Calls a super method.
			// name: String?
			//		The optional method name. Should be the same as the caller's
			//		name. Usually "name" is specified in complex dynamic cases, when
			//		the calling method was dynamically added, undecorated by
			//		declare(), and it cannot be determined.
			// caller: Function?
			//		The reference to the calling function. Required only if the
			//		call to "this.inherited" occurs from within strict-mode code.
			//		If the caller is omitted within strict-mode code, an error will
			//		be thrown.
			//		The best way to obtain a reference to the calling function is to
			//		use a named function expression (i.e. place a function name
			//		after the "function" keyword and before the open paren, as in
			//		"function fn(a, b)"). If the function is parsed as an expression
			//		and not a statement (i.e. it's not by itself on its own line),
			//		the function name will only be accessible as an identifier from
			//		within the body of the function.
			// args: Arguments
			//		The caller supply this argument, which should be the original
			//		"arguments".
			// newArgs: Object?
			//		If "true", the found function will be returned without
			//		executing it.
			//		If Array, it will be used to call a super method. Otherwise
			//		"args" will be used.
			// returns:
			//		Whatever is returned by a super method, or a super method itself,
			//		if "true" was specified as newArgs.
			// description:
			//		This method is used inside method of classes produced with
			//		declare() to call a super method (next in the chain). It is
			//		used for manually controlled chaining. Consider using the regular
			//		chaining, because it is faster. Use "this.inherited()" only in
			//		complex cases.
			//
			//		This method cannot me called from automatically chained
			//		constructors including the case of a special (legacy)
			//		constructor chaining. It cannot be called from chained methods.
			//
			//		If "this.inherited()" cannot find the next-in-chain method, it
			//		does nothing and returns "undefined". The last method in chain
			//		can be a default method implemented in Object, which will be
			//		called last.
			//
			//		If "name" is specified, it is assumed that the method that
			//		received "args" is the parent method for this call. It is looked
			//		up in the chain list and if it is found the next-in-chain method
			//		is called. If it is not found, the first-in-chain method is
			//		called.
			//
			//		If "name" is not specified, it will be derived from the calling
			//		method (using a methoid property "nom").
			//
			// example:
			//	|	var B = declare(A, {
			//	|		method1: function(a, b, c){
			//	|			this.inherited(arguments);
			//	|		},
			//	|		method2: function(a, b){
			//	|			return this.inherited(arguments, [a + b]);
			//	|		}
			//	|	});
			//	|	// next method is not in the chain list because it is added
			//	|	// manually after the class was created.
			//	|	B.prototype.method3 = function(){
			//	|		console.log("This is a dynamically-added method.");
			//	|		this.inherited("method3", arguments);
			//	|	};
			// example:
			//	|	var B = declare(A, {
			//	|		method: function(a, b){
			//	|			var super = this.inherited(arguments, true);
			//	|			// ...
			//	|			if(!super){
			//	|				console.log("there is no super method");
			//	|				return 0;
			//	|			}
			//	|			return super.apply(this, arguments);
			//	|		}
			//	|	});
			// example:
			//	|	"use strict";
			//	|	// class is defined in strict-mode code,
			//	|	// so caller must be passed before arguments.
			//	|	var B = declare(A, {
			//	|		// using a named function expression with "fn" as the name.
			//	|		method: function fn(a, b) {
			//	|			this.inherited(fn, arguments);
			//	|		}
			//	|	});
			return	{};	// Object
		},

		getInherited: function(name, caller, args){
			// summary:
			//		Returns a super method.
			// name: String?
			//		The optional method name. Should be the same as the caller's
			//		name. Usually "name" is specified in complex dynamic cases, when
			//		the calling method was dynamically added, undecorated by
			//		declare(), and it cannot be determined.
			// caller: Function?
			//		The caller function. This is required when running in
			//		strict-mode code. A reference to the caller function
			//		can be obtained by using a named function expression
			//		(e.g. function fn(a,b) {...}).
			// args: Arguments
			//		The caller supply this argument, which should be the original
			//		"arguments".
			// returns:
			//		Returns a super method (Function) or "undefined".
			// description:
			//		This method is a convenience method for "this.inherited()".
			//		It uses the same algorithm but instead of executing a super
			//		method, it returns it, or "undefined" if not found.
			//
			// example:
			//	|	var B = declare(A, {
			//	|		method: function(a, b){
			//	|			var super = this.getInherited(arguments);
			//	|			// ...
			//	|			if(!super){
			//	|				console.log("there is no super method");
			//	|				return 0;
			//	|			}
			//	|			return super.apply(this, arguments);
			//	|		}
			//	|	});
			// example:
			//	|	"use strict;" // first line of function or file
			//	|	//...
			//	|	var B = declare(A, {
			//	|		// Using a named function expression with "fn" as the name,
			//	|		// since we're in strict mode.
			//	|		method: function fn(a, b){
			//	|			var super = this.getInherited(fn, arguments);
			//	|			if(super){
			//	|				return super.apply(this, arguments);
			//	|			}
			//	|		}
			//	|	});
			return	{};	// Object
		},

		isInstanceOf: function(cls){
			// summary:
			//		Checks the inheritance chain to see if it is inherited from this
			//		class.
			// cls: Function
			//		Class constructor.
			// returns:
			//		"true", if this object is inherited from this class, "false"
			//		otherwise.
			// description:
			//		This method is used with instances of classes produced with
			//		declare() to determine of they support a certain interface or
			//		not. It models "instanceof" operator.
			//
			// example:
			//	|	var A = declare(null, {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|	var B = declare(null, {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|	var C = declare([A, B], {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|	var D = declare(A, {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|
			//	|	var a = new A(), b = new B(), c = new C(), d = new D();
			//	|
			//	|	console.log(a.isInstanceOf(A)); // true
			//	|	console.log(b.isInstanceOf(A)); // false
			//	|	console.log(c.isInstanceOf(A)); // true
			//	|	console.log(d.isInstanceOf(A)); // true
			//	|
			//	|	console.log(a.isInstanceOf(B)); // false
			//	|	console.log(b.isInstanceOf(B)); // true
			//	|	console.log(c.isInstanceOf(B)); // true
			//	|	console.log(d.isInstanceOf(B)); // false
			//	|
			//	|	console.log(a.isInstanceOf(C)); // false
			//	|	console.log(b.isInstanceOf(C)); // false
			//	|	console.log(c.isInstanceOf(C)); // true
			//	|	console.log(d.isInstanceOf(C)); // false
			//	|
			//	|	console.log(a.isInstanceOf(D)); // false
			//	|	console.log(b.isInstanceOf(D)); // false
			//	|	console.log(c.isInstanceOf(D)); // false
			//	|	console.log(d.isInstanceOf(D)); // true
			return	{};	// Object
		},

		extend: function(source){
			// summary:
			//		Adds all properties and methods of source to constructor's
			//		prototype, making them available to all instances created with
			//		constructor. This method is specific to constructors created with
			//		declare().
			// source: Object
			//		Source object which properties are going to be copied to the
			//		constructor's prototype.
			// description:
			//		Adds source properties to the constructor's prototype. It can
			//		override existing properties.
			//
			//		This method is similar to dojo.extend function, but it is specific
			//		to constructors produced by declare(). It is implemented
			//		using dojo.safeMixin, and it skips a constructor property,
			//		and properly decorates copied functions.
			//
			// example:
			//	|	var A = declare(null, {
			//	|		m1: function(){},
			//	|		s1: "Popokatepetl"
			//	|	});
			//	|	A.extend({
			//	|		m1: function(){},
			//	|		m2: function(){},
			//	|		f1: true,
			//	|		d1: 42
			//	|	});
		},

		createSubclass: function(mixins, props){
			// summary:
			//		Create a subclass of the declared class from a list of base classes.
			// mixins: Function[]
			//		Specifies a list of bases (the left-most one is the most deepest
			//		base).
			// props: Object?
			//		An optional object whose properties are copied to the created prototype.
			// returns: dojo/_base/declare.__DeclareCreatedObject
			//		New constructor function.
			// description:
			//		Create a constructor using a compact notation for inheritance and
			//		prototype extension.
			//
			//		Mixin ancestors provide a type of multiple inheritance.
			//		Prototypes of mixin ancestors are copied to the new class:
			//		changes to mixin prototypes will not affect classes to which
			//		they have been mixed in.
			//
			// example:
			//	|	var A = declare(null, {
			//	|		m1: function(){},
			//	|		s1: "bar"
			//	|	});
			//	|	var B = declare(null, {
			//	|		m2: function(){},
			//	|		s2: "foo"
			//	|	});
			//	|	var C = declare(null, {
			//	|	});
			//	|	var D1 = A.createSubclass([B, C], {
			//	|		m1: function(){},
			//	|		d1: 42
			//	|	});
			//	|	var d1 = new D1();
			//	|
			//	|	// this is equivalent to:
			//	|	var D2 = declare([A, B, C], {
			//	|		m1: function(){},
			//	|		d1: 42
			//	|	});
			//	|	var d2 = new D2();
		}
	};
	=====*/

	// For back-compat, remove for 2.0
	dojo.safeMixin = declare.safeMixin = safeMixin;
	dojo.declare = declare;

	return declare;
});

},
'dojo/dom':function(){
define(["./sniff", "./_base/window", "./_base/kernel"],
		function(has, win, kernel){
	// module:
	//		dojo/dom

	// FIXME: need to add unit tests for all the semi-public methods

	if(has("ie") <= 7){
		try{
			document.execCommand("BackgroundImageCache", false, true);
		}catch(e){
			// sane browsers don't have cache "issues"
		}
	}

	// =============================
	// DOM Functions
	// =============================

	// the result object
	var dom = {
		// summary:
		//		This module defines the core dojo DOM API.
	};

	if(has("ie")){
		dom.byId = function(id, doc){
			if(typeof id != "string"){
				return id || null;
			}
			var _d = doc || win.doc, te = id && _d.getElementById(id);
			// attributes.id.value is better than just id in case the
			// user has a name=id inside a form
			if(te && (te.attributes.id.value == id || te.id == id)){
				return te;
			}else{
				var eles = _d.all[id];
				if(!eles || eles.nodeName){
					eles = [eles];
				}
				// if more than 1, choose first with the correct id
				var i = 0;
				while((te = eles[i++])){
					if((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id){
						return te;
					}
				}
			}
			return null;
		};
	}else{
		dom.byId = function(id, doc){
			// inline'd type check.
			// be sure to return null per documentation, to match IE branch.
			return ((typeof id == "string") ? (doc || win.doc).getElementById(id) : id) || null; // DOMNode
		};
	}
	/*=====
	 dom.byId = function(id, doc){
		// summary:
		//		Returns DOM node with matching `id` attribute or falsy value (ex: null or undefined)
		//		if not found.  If `id` is a DomNode, this function is a no-op.
		//
		// id: String|DOMNode
		//		A string to match an HTML id attribute or a reference to a DOM Node
		//
		// doc: Document?
		//		Document to work in. Defaults to the current value of
		//		dojo/_base/window.doc.  Can be used to retrieve
		//		node references from other documents.
		//
		// example:
		//		Look up a node by ID:
		//	|	require(["dojo/dom"], function(dom){
		//	|		var n = dom.byId("foo");
		//	|	});
		//
		// example:
		//		Check if a node exists, and use it.
		//	|	require(["dojo/dom"], function(dom){
		//	|		var n = dom.byId("bar");
		//	|		if(n){ doStuff() ... }
		//	|	});
		//
		// example:
		//		Allow string or DomNode references to be passed to a custom function:
		//	|	require(["dojo/dom"], function(dom){
		//	|		var foo = function(nodeOrId){
		//	|			nodeOrId = dom.byId(nodeOrId);
		//	|			// ... more stuff
		//	|		}
		//	|	});
	 };
	 =====*/

	// Test for DOMNode.contains() method, available everywhere except FF8-
	// and IE8-, where it's available in general, but not on document itself,
	// and also problems when either ancestor or node are text nodes.

	var doc = kernel.global["document"] || null;
	has.add("dom-contains", !!(doc && doc.contains));
	dom.isDescendant = has("dom-contains") ?
		// FF9+, IE9+, webkit, opera, iOS, Android, Edge, etc.
		function(/*DOMNode|String*/ node, /*DOMNode|String*/ ancestor){
			return !!( (ancestor = dom.byId(ancestor)) && ancestor.contains(dom.byId(node)) );
		} :
		function(/*DOMNode|String*/ node, /*DOMNode|String*/ ancestor){
			// summary:
			//		Returns true if node is a descendant of ancestor
			// node: DOMNode|String
			//		string id or node reference to test
			// ancestor: DOMNode|String
			//		string id or node reference of potential parent to test against
			//
			// example:
			//		Test is node id="bar" is a descendant of node id="foo"
			//	|	require(["dojo/dom"], function(dom){
			//	|		if(dom.isDescendant("bar", "foo")){ ... }
			//	|	});

			try{
				node = dom.byId(node);
				ancestor = dom.byId(ancestor);
				while(node){
					if(node == ancestor){
						return true; // Boolean
					}
					node = node.parentNode;
				}
			}catch(e){ /* squelch, return false */ }
			return false; // Boolean
		};

	// TODO: do we need setSelectable in the base?

	// Add feature test for user-select CSS property
	// (currently known to work in all but IE < 10 and Opera)
	// TODO: The user-select CSS property as of May 2014 is no longer part of
	// any CSS specification. In IE, -ms-user-select does not do the same thing
	// as the unselectable attribute on elements; namely, dijit Editor buttons
	// do not properly prevent the content of the editable content frame from
	// unblurring. As a result, the -ms- prefixed version is omitted here.
	has.add("css-user-select", function(global, doc, element){
		// Avoid exception when dom.js is loaded in non-browser environments
		if(!element){ return false; }

		var style = element.style;
		var prefixes = ["Khtml", "O", "Moz", "Webkit"],
			i = prefixes.length,
			name = "userSelect",
			prefix;

		// Iterate prefixes from most to least likely
		do{
			if(typeof style[name] !== "undefined"){
				// Supported; return property name
				return name;
			}
		}while(i-- && (name = prefixes[i] + "UserSelect"));

		// Not supported if we didn't return before now
		return false;
	});

	/*=====
	dom.setSelectable = function(node, selectable){
		// summary:
		//		Enable or disable selection on a node
		// node: DOMNode|String
		//		id or reference to node
		// selectable: Boolean
		//		state to put the node in. false indicates unselectable, true
		//		allows selection.
		// example:
		//		Make the node id="bar" unselectable
		//	|	require(["dojo/dom"], function(dom){
		//	|		dom.setSelectable("bar");
		//	|	});
		// example:
		//		Make the node id="bar" selectable
		//	|	require(["dojo/dom"], function(dom){
		//	|		dom.setSelectable("bar", true);
		//	|	});
	};
	=====*/

	var cssUserSelect = has("css-user-select");
	dom.setSelectable = cssUserSelect ? function(node, selectable){
		// css-user-select returns a (possibly vendor-prefixed) CSS property name
		dom.byId(node).style[cssUserSelect] = selectable ? "" : "none";
	} : function(node, selectable){
		node = dom.byId(node);

		// (IE < 10 / Opera) Fall back to setting/removing the
		// unselectable attribute on the element and all its children
		var nodes = node.getElementsByTagName("*"),
			i = nodes.length;

		if(selectable){
			node.removeAttribute("unselectable");
			while(i--){
				nodes[i].removeAttribute("unselectable");
			}
		}else{
			node.setAttribute("unselectable", "on");
			while(i--){
				nodes[i].setAttribute("unselectable", "on");
			}
		}
	};

	return dom;
});

},
'dojo/_base/browser':function(){
if(require.has){
	require.has.add("config-selectorEngine", "acme");
}
define([
	"../ready",
	"./kernel",
	"./connect", // until we decide if connect is going back into non-browser environments
	"./unload",
	"./window",
	"./event",
	"./html",
	"./NodeList",
	"../query",
	"./xhr",
	"./fx"], function(dojo){

	// module:
	//		dojo/_base/browser

	/*=====
	return {
		// summary:
		//		This module causes the browser-only base modules to be loaded.
	};
	=====*/

	return dojo;
});

},
'dojo/errors/RequestTimeoutError':function(){
define(['./create', './RequestError'], function(create, RequestError){
	// module:
	//		dojo/errors/RequestTimeoutError

	/*=====
	 return function(){
		 // summary:
		 //		TODOC
	 };
	 =====*/

	return create("RequestTimeoutError", null, RequestError, {
		dojoType: "timeout"
	});
});

},
'dojo/dom-style':function(){
define(["./sniff", "./dom", "./_base/window"], function(has, dom, win){
	// module:
	//		dojo/dom-style

	// =============================
	// Style Functions
	// =============================

	// getComputedStyle drives most of the style code.
	// Wherever possible, reuse the returned object.
	//
	// API functions below that need to access computed styles accept an
	// optional computedStyle parameter.
	// If this parameter is omitted, the functions will call getComputedStyle themselves.
	// This way, calling code can access computedStyle once, and then pass the reference to
	// multiple API functions.

	// Although we normally eschew argument validation at this
	// level, here we test argument 'node' for (duck)type,
	// by testing nodeType, ecause 'document' is the 'parentNode' of 'body'
	// it is frequently sent to this function even
	// though it is not Element.
	var getComputedStyle, style = {
		// summary:
		//		This module defines the core dojo DOM style API.
	};
	if(has("webkit")){
		getComputedStyle = function(/*DomNode*/ node){
			var s;
			if(node.nodeType == 1){
				var dv = node.ownerDocument.defaultView;
				s = dv.getComputedStyle(node, null);
				if(!s && node.style){
					node.style.display = "";
					s = dv.getComputedStyle(node, null);
				}
			}
			return s || {};
		};
	}else if(has("ie") && (has("ie") < 9 || has("quirks"))){
		getComputedStyle = function(node){
			// IE (as of 7) doesn't expose Element like sane browsers
			// currentStyle can be null on IE8!
			return node.nodeType == 1 /* ELEMENT_NODE*/ && node.currentStyle ? node.currentStyle : {};
		};
	}else{
		getComputedStyle = function(node){
			if(node.nodeType === 1 /* ELEMENT_NODE*/){
				var dv = node.ownerDocument.defaultView,
					w = dv.opener ? dv : win.global.window;
				return w.getComputedStyle(node, null);
			}
			return {};
		};
	}
	style.getComputedStyle = getComputedStyle;
	/*=====
	style.getComputedStyle = function(node){
		// summary:
		//		Returns a "computed style" object.
		//
		// description:
		//		Gets a "computed style" object which can be used to gather
		//		information about the current state of the rendered node.
		//
		//		Note that this may behave differently on different browsers.
		//		Values may have different formats and value encodings across
		//		browsers.
		//
		//		Note also that this method is expensive.  Wherever possible,
		//		reuse the returned object.
		//
		//		Use the dojo/dom-style.get() method for more consistent (pixelized)
		//		return values.
		//
		// node: DOMNode
		//		A reference to a DOM node. Does NOT support taking an
		//		ID string for speed reasons.
		// example:
		//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
		//	|		domStyle.getComputedStyle(dom.byId('foo')).borderWidth;
		//	|	});
		//
		// example:
		//		Reusing the returned object, avoiding multiple lookups:
		//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
		//	|		var cs = domStyle.getComputedStyle(dom.byId("someNode"));
		//	|		var w = cs.width, h = cs.height;
		//	|	});
		return; // CSS2Properties
	};
	=====*/

	var toPixel;
	if(!has("ie")){
		toPixel = function(element, value){
			// style values can be floats, client code may want
			// to round for integer pixels.
			return parseFloat(value) || 0;
		};
	}else{
		toPixel = function(element, avalue){
			if(!avalue){ return 0; }
			// on IE7, medium is usually 4 pixels
			if(avalue == "medium"){ return 4; }
			// style values can be floats, client code may
			// want to round this value for integer pixels.
			if(avalue.slice && avalue.slice(-2) == 'px'){ return parseFloat(avalue); }
			var s = element.style, rs = element.runtimeStyle, cs = element.currentStyle,
				sLeft = s.left, rsLeft = rs.left;
			rs.left = cs.left;
			try{
				// 'avalue' may be incompatible with style.left, which can cause IE to throw
				// this has been observed for border widths using "thin", "medium", "thick" constants
				// those particular constants could be trapped by a lookup
				// but perhaps there are more
				s.left = avalue;
				avalue = s.pixelLeft;
			}catch(e){
				avalue = 0;
			}
			s.left = sLeft;
			rs.left = rsLeft;
			return avalue;
		};
	}
	style.toPixelValue = toPixel;
	/*=====
	style.toPixelValue = function(node, value){
		// summary:
		//		converts style value to pixels on IE or return a numeric value.
		// node: DOMNode
		// value: String
		// returns: Number
	};
	=====*/

	// FIXME: there opacity quirks on FF that we haven't ported over. Hrm.

	var astr = "DXImageTransform.Microsoft.Alpha";
	var af = function(n, f){
		try{
			return n.filters.item(astr);
		}catch(e){
			return f ? {} : null;
		}
	};

	var _getOpacity =
		has("ie") < 9 || (has("ie") < 10 && has("quirks")) ? function(node){
			try{
				return af(node).Opacity / 100; // Number
			}catch(e){
				return 1; // Number
			}
		} :
		function(node){
			return getComputedStyle(node).opacity;
		};

	var _setOpacity =
		has("ie") < 9 || (has("ie") < 10 && has("quirks")) ? function(/*DomNode*/ node, /*Number*/ opacity){
			if(opacity === ""){ opacity = 1; }
			var ov = opacity * 100, fullyOpaque = opacity === 1;

			// on IE7 Alpha(Filter opacity=100) makes text look fuzzy so disable it altogether (bug #2661),
			// but still update the opacity value so we can get a correct reading if it is read later:
			// af(node, 1).Enabled = !fullyOpaque;

			if(fullyOpaque){
				node.style.zoom = "";
				if(af(node)){
					node.style.filter = node.style.filter.replace(
						new RegExp("\\s*progid:" + astr + "\\([^\\)]+?\\)", "i"), "");
				}
			}else{
				node.style.zoom = 1;
				if(af(node)){
					af(node, 1).Opacity = ov;
				}else{
					node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")";
				}
				af(node, 1).Enabled = true;
			}

			if(node.tagName.toLowerCase() == "tr"){
				for(var td = node.firstChild; td; td = td.nextSibling){
					if(td.tagName.toLowerCase() == "td"){
						_setOpacity(td, opacity);
					}
				}
			}
			return opacity;
		} :
		function(node, opacity){
			return node.style.opacity = opacity;
		};

	var _pixelNamesCache = {
		left: true, top: true
	};
	var _pixelRegExp = /margin|padding|width|height|max|min|offset/; // |border
	function _toStyleValue(node, type, value){
		//TODO: should we really be doing string case conversion here? Should we cache it? Need to profile!
		type = type.toLowerCase();

		// Adjustments for IE and Edge
		if(value == "auto"){
			if(type == "height"){ return node.offsetHeight; }
			if(type == "width"){ return node.offsetWidth; }
		}
		if(type == "fontweight"){
			switch(value){
				case 700: return "bold";
				case 400:
				default: return "normal";
			}
		}

		if(!(type in _pixelNamesCache)){
			_pixelNamesCache[type] = _pixelRegExp.test(type);
		}
		return _pixelNamesCache[type] ? toPixel(node, value) : value;
	}

	var _floatAliases = {cssFloat: 1, styleFloat: 1, "float": 1};

	// public API

	style.get = function getStyle(/*DOMNode|String*/ node, /*String?*/ name){
		// summary:
		//		Accesses styles on a node.
		// description:
		//		Getting the style value uses the computed style for the node, so the value
		//		will be a calculated value, not just the immediate node.style value.
		//		Also when getting values, use specific style names,
		//		like "borderBottomWidth" instead of "border" since compound values like
		//		"border" are not necessarily reflected as expected.
		//		If you want to get node dimensions, use `dojo/dom-geometry.getMarginBox()`,
		//		`dojo/dom-geometry.getContentBox()` or `dojo/dom-geometry.getPosition()`.
		// node: DOMNode|String
		//		id or reference to node to get style for
		// name: String?
		//		the style property to get
		// example:
		//		Passing only an ID or node returns the computed style object of
		//		the node:
		//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
		//	|		domStyle.get("thinger");
		//	|	});
		// example:
		//		Passing a node and a style property returns the current
		//		normalized, computed value for that property:
		//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
		//	|		domStyle.get("thinger", "opacity"); // 1 by default
		//	|	});

		var n = dom.byId(node), l = arguments.length, op = (name == "opacity");
		if(l == 2 && op){
			return _getOpacity(n);
		}
		name = _floatAliases[name] ? "cssFloat" in n.style ? "cssFloat" : "styleFloat" : name;
		var s = style.getComputedStyle(n);
		return (l == 1) ? s : _toStyleValue(n, name, s[name] || n.style[name]); /* CSS2Properties||String||Number */
	};

	style.set = function setStyle(/*DOMNode|String*/ node, /*String|Object*/ name, /*String?*/ value){
		// summary:
		//		Sets styles on a node.
		// node: DOMNode|String
		//		id or reference to node to set style for
		// name: String|Object
		//		the style property to set in DOM-accessor format
		//		("borderWidth", not "border-width") or an object with key/value
		//		pairs suitable for setting each property.
		// value: String?
		//		If passed, sets value on the node for style, handling
		//		cross-browser concerns.  When setting a pixel value,
		//		be sure to include "px" in the value. For instance, top: "200px".
		//		Otherwise, in some cases, some browsers will not apply the style.
		//
		// example:
		//		Passing a node, a style property, and a value changes the
		//		current display of the node and returns the new computed value
		//	|	require(["dojo/dom-style"], function(domStyle){
		//	|		domStyle.set("thinger", "opacity", 0.5); // == 0.5
		//	|	});
		//
		// example:
		//		Passing a node, an object-style style property sets each of the values in turn and returns the computed style object of the node:
		//	|	require(["dojo/dom-style"], function(domStyle){
		//	|		domStyle.set("thinger", {
		//	|			"opacity": 0.5,
		//	|			"border": "3px solid black",
		//	|			"height": "300px"
		//	|		});
		//	|	});
		//
		// example:
		//		When the CSS style property is hyphenated, the JavaScript property is camelCased.
		//		font-size becomes fontSize, and so on.
		//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
		//	|		domStyle.set("thinger",{
		//	|			fontSize:"14pt",
		//	|			letterSpacing:"1.2em"
		//	|		});
		//	|	});
		//
		// example:
		//		dojo/NodeList implements .style() using the same syntax, omitting the "node" parameter, calling
		//		dojo/dom-style.get() on every element of the list. See: `dojo/query` and `dojo/NodeList`
		//	|	require(["dojo/dom-style", "dojo/query", "dojo/NodeList-dom"],
		//	|	function(domStyle, query){
		//	|		query(".someClassName").style("visibility","hidden");
		//	|		// or
		//	|		query("#baz > div").style({
		//	|			opacity:0.75,
		//	|			fontSize:"13pt"
		//	|		});
		//	|	});

		var n = dom.byId(node), l = arguments.length, op = (name == "opacity");
		name = _floatAliases[name] ? "cssFloat" in n.style ? "cssFloat" : "styleFloat" : name;
		if(l == 3){
			return op ? _setOpacity(n, value) : n.style[name] = value; // Number
		}
		for(var x in name){
			style.set(node, x, name[x]);
		}
		return style.getComputedStyle(n);
	};

	return style;
});

},
'dojo/dom-geometry':function(){
define(["./sniff", "./_base/window","./dom", "./dom-style"],
		function(has, win, dom, style){
	// module:
	//		dojo/dom-geometry

	// the result object
	var geom = {
		// summary:
		//		This module defines the core dojo DOM geometry API.
	};

	// Box functions will assume this model.
	// On IE/Opera, BORDER_BOX will be set if the primary document is in quirks mode.
	// Can be set to change behavior of box setters.

	// can be either:
	//	"border-box"
	//	"content-box" (default)
	geom.boxModel = "content-box";

	// We punt per-node box mode testing completely.
	// If anybody cares, we can provide an additional (optional) unit
	// that overrides existing code to include per-node box sensitivity.

	// Opera documentation claims that Opera 9 uses border-box in BackCompat mode.
	// but experiments (Opera 9.10.8679 on Windows Vista) indicate that it actually continues to use content-box.
	// IIRC, earlier versions of Opera did in fact use border-box.
	// Opera guys, this is really confusing. Opera being broken in quirks mode is not our fault.

	if(has("ie") /*|| has("opera")*/){
		// client code may have to adjust if compatMode varies across iframes
		geom.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box";
	}

	geom.getPadExtents = function getPadExtents(/*DomNode*/ node, /*Object*/ computedStyle){
		// summary:
		//		Returns object with special values specifically useful for node
		//		fitting.
		// description:
		//		Returns an object with `w`, `h`, `l`, `t` properties:
		//	|		l/t/r/b = left/top/right/bottom padding (respectively)
		//	|		w = the total of the left and right padding
		//	|		h = the total of the top and bottom padding
		//		If 'node' has position, l/t forms the origin for child nodes.
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		// node: DOMNode
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var s = computedStyle || style.getComputedStyle(node), px = style.toPixelValue,
			l = px(node, s.paddingLeft), t = px(node, s.paddingTop), r = px(node, s.paddingRight), b = px(node, s.paddingBottom);
		return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
	};

	var none = "none";

	geom.getBorderExtents = function getBorderExtents(/*DomNode*/ node, /*Object*/ computedStyle){
		// summary:
		//		returns an object with properties useful for noting the border
		//		dimensions.
		// description:
		//		- l/t/r/b = the sum of left/top/right/bottom border (respectively)
		//		- w = the sum of the left and right border
		//		- h = the sum of the top and bottom border
		//
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		// node: DOMNode
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var px = style.toPixelValue, s = computedStyle || style.getComputedStyle(node),
			l = s.borderLeftStyle != none ? px(node, s.borderLeftWidth) : 0,
			t = s.borderTopStyle != none ? px(node, s.borderTopWidth) : 0,
			r = s.borderRightStyle != none ? px(node, s.borderRightWidth) : 0,
			b = s.borderBottomStyle != none ? px(node, s.borderBottomWidth) : 0;
		return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
	};

	geom.getPadBorderExtents = function getPadBorderExtents(/*DomNode*/ node, /*Object*/ computedStyle){
		// summary:
		//		Returns object with properties useful for box fitting with
		//		regards to padding.
		// description:
		//		- l/t/r/b = the sum of left/top/right/bottom padding and left/top/right/bottom border (respectively)
		//		- w = the sum of the left and right padding and border
		//		- h = the sum of the top and bottom padding and border
		//
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		// node: DOMNode
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var s = computedStyle || style.getComputedStyle(node),
			p = geom.getPadExtents(node, s),
			b = geom.getBorderExtents(node, s);
		return {
			l: p.l + b.l,
			t: p.t + b.t,
			r: p.r + b.r,
			b: p.b + b.b,
			w: p.w + b.w,
			h: p.h + b.h
		};
	};

	geom.getMarginExtents = function getMarginExtents(node, computedStyle){
		// summary:
		//		returns object with properties useful for box fitting with
		//		regards to box margins (i.e., the outer-box).
		//
		//		- l/t = marginLeft, marginTop, respectively
		//		- w = total width, margin inclusive
		//		- h = total height, margin inclusive
		//
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		// node: DOMNode
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var s = computedStyle || style.getComputedStyle(node), px = style.toPixelValue,
			l = px(node, s.marginLeft), t = px(node, s.marginTop), r = px(node, s.marginRight), b = px(node, s.marginBottom);
		return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
	};

	// Box getters work in any box context because offsetWidth/clientWidth
	// are invariant wrt box context
	//
	// They do *not* work for display: inline objects that have padding styles
	// because the user agent ignores padding (it's bogus styling in any case)
	//
	// Be careful with IMGs because they are inline or block depending on
	// browser and browser mode.

	// Although it would be easier to read, there are not separate versions of
	// _getMarginBox for each browser because:
	// 1. the branching is not expensive
	// 2. factoring the shared code wastes cycles (function call overhead)
	// 3. duplicating the shared code wastes bytes

	geom.getMarginBox = function getMarginBox(/*DomNode*/ node, /*Object*/ computedStyle){
		// summary:
		//		returns an object that encodes the width, height, left and top
		//		positions of the node's margin box.
		// node: DOMNode
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var s = computedStyle || style.getComputedStyle(node), me = geom.getMarginExtents(node, s),
			l = node.offsetLeft - me.l, t = node.offsetTop - me.t, p = node.parentNode, px = style.toPixelValue, pcs;

		if((has("ie") == 8 && !has("quirks"))){
			// IE 8 offsetLeft/Top includes the parent's border
			if(p){
				pcs = style.getComputedStyle(p);
				l -= pcs.borderLeftStyle != none ? px(node, pcs.borderLeftWidth) : 0;
				t -= pcs.borderTopStyle != none ? px(node, pcs.borderTopWidth) : 0;
			}
		}
		return {l: l, t: t, w: node.offsetWidth + me.w, h: node.offsetHeight + me.h};
	};

	geom.getContentBox = function getContentBox(node, computedStyle){
		// summary:
		//		Returns an object that encodes the width, height, left and top
		//		positions of the node's content box, irrespective of the
		//		current box model.
		// node: DOMNode
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		// clientWidth/Height are important since the automatically account for scrollbars
		// fallback to offsetWidth/Height for special cases (see #3378)
		node = dom.byId(node);
		var s = computedStyle || style.getComputedStyle(node), w = node.clientWidth, h,
			pe = geom.getPadExtents(node, s), be = geom.getBorderExtents(node, s), l = node.offsetLeft + pe.l + be.l,
			t = node.offsetTop + pe.t + be.t;
		if(!w){
			w = node.offsetWidth - be.w;
			h = node.offsetHeight - be.h;
		}else{
			h = node.clientHeight;
		}

		if((has("ie") == 8 && !has("quirks"))){
			// IE 8 offsetLeft/Top includes the parent's border
			var p = node.parentNode, px = style.toPixelValue, pcs;
			if(p){
				pcs = style.getComputedStyle(p);
				l -= pcs.borderLeftStyle != none ? px(node, pcs.borderLeftWidth) : 0;
				t -= pcs.borderTopStyle != none ? px(node, pcs.borderTopWidth) : 0;
			}
		}

		return {l: l, t: t, w: w - pe.w, h: h - pe.h};
	};

	// Box setters depend on box context because interpretation of width/height styles
	// vary wrt box context.
	//
	// The value of boxModel is used to determine box context.
	// boxModel can be set directly to change behavior.
	//
	// Beware of display: inline objects that have padding styles
	// because the user agent ignores padding (it's a bogus setup anyway)
	//
	// Be careful with IMGs because they are inline or block depending on
	// browser and browser mode.
	//
	// Elements other than DIV may have special quirks, like built-in
	// margins or padding, or values not detectable via computedStyle.
	// In particular, margins on TABLE do not seems to appear
	// at all in computedStyle on Mozilla.

	function setBox(/*DomNode*/ node, /*Number?*/ l, /*Number?*/ t, /*Number?*/ w, /*Number?*/ h, /*String?*/ u){
		// summary:
		//		sets width/height/left/top in the current (native) box-model
		//		dimensions. Uses the unit passed in u.
		// node:
		//		DOM Node reference. Id string not supported for performance
		//		reasons.
		// l:
		//		left offset from parent.
		// t:
		//		top offset from parent.
		// w:
		//		width in current box model.
		// h:
		//		width in current box model.
		// u:
		//		unit measure to use for other measures. Defaults to "px".
		u = u || "px";
		var s = node.style;
		if(!isNaN(l)){
			s.left = l + u;
		}
		if(!isNaN(t)){
			s.top = t + u;
		}
		if(w >= 0){
			s.width = w + u;
		}
		if(h >= 0){
			s.height = h + u;
		}
	}

	function isButtonTag(/*DomNode*/ node){
		// summary:
		//		True if the node is BUTTON or INPUT.type="button".
		return node.tagName.toLowerCase() == "button" ||
			node.tagName.toLowerCase() == "input" && (node.getAttribute("type") || "").toLowerCase() == "button"; // boolean
	}

	function usesBorderBox(/*DomNode*/ node){
		// summary:
		//		True if the node uses border-box layout.

		// We could test the computed style of node to see if a particular box
		// has been specified, but there are details and we choose not to bother.

		// TABLE and BUTTON (and INPUT type=button) are always border-box by default.
		// If you have assigned a different box to either one via CSS then
		// box functions will break.

		return geom.boxModel == "border-box" || node.tagName.toLowerCase() == "table" || isButtonTag(node); // boolean
	}

	function getBoundingClientRect(/*DomNode*/ node) {
		// summary:
		//		Gets the bounding client rectangle for a dom node.
		// node: DOMNode

		// This will return the result of node.getBoundingClientRect if node is in the dom, and
		// {x:0, y:0, width:0, height:0, top:0, right:0, bottom:0, left:0} if it throws an error or the node is not on the dom
		// This will handle when IE throws an error or Edge returns an empty object when node is not on the dom

		var retEmpty = { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 },
			ret;

		try {
			ret = node.getBoundingClientRect();
		} catch (e) {
			// IE throws an Unspecified Error if the node is not in the dom. Handle this by returning an object with 0 values
			return retEmpty;
		}

		// Edge returns an empty object if the node is not in the dom. Handle this by returning an object with 0 values
		if (typeof ret.left === "undefined") { return retEmpty; }

		return ret;
	}

	geom.setContentSize = function setContentSize(/*DomNode*/ node, /*Object*/ box, /*Object*/ computedStyle){
		// summary:
		//		Sets the size of the node's contents, irrespective of margins,
		//		padding, or borders.
		// node: DOMNode
		// box: Object
		//		hash with optional "w", and "h" properties for "width", and "height"
		//		respectively. All specified properties should have numeric values in whole pixels.
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var w = box.w, h = box.h;
		if(usesBorderBox(node)){
			var pb = geom.getPadBorderExtents(node, computedStyle);
			if(w >= 0){
				w += pb.w;
			}
			if(h >= 0){
				h += pb.h;
			}
		}
		setBox(node, NaN, NaN, w, h);
	};

	var nilExtents = {l: 0, t: 0, w: 0, h: 0};

	geom.setMarginBox = function setMarginBox(/*DomNode*/ node, /*Object*/ box, /*Object*/ computedStyle){
		// summary:
		//		sets the size of the node's margin box and placement
		//		(left/top), irrespective of box model. Think of it as a
		//		passthrough to setBox that handles box-model vagaries for
		//		you.
		// node: DOMNode
		// box: Object
		//		hash with optional "l", "t", "w", and "h" properties for "left", "right", "width", and "height"
		//		respectively. All specified properties should have numeric values in whole pixels.
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var s = computedStyle || style.getComputedStyle(node), w = box.w, h = box.h,
		// Some elements have special padding, margin, and box-model settings.
		// To use box functions you may need to set padding, margin explicitly.
		// Controlling box-model is harder, in a pinch you might set dojo/dom-geometry.boxModel.
			pb = usesBorderBox(node) ? nilExtents : geom.getPadBorderExtents(node, s),
			mb = geom.getMarginExtents(node, s);
		if(has("webkit")){
			// on Safari (3.1.2), button nodes with no explicit size have a default margin
			// setting an explicit size eliminates the margin.
			// We have to swizzle the width to get correct margin reading.
			if(isButtonTag(node)){
				var ns = node.style;
				if(w >= 0 && !ns.width){
					ns.width = "4px";
				}
				if(h >= 0 && !ns.height){
					ns.height = "4px";
				}
			}
		}
		if(w >= 0){
			w = Math.max(w - pb.w - mb.w, 0);
		}
		if(h >= 0){
			h = Math.max(h - pb.h - mb.h, 0);
		}
		setBox(node, box.l, box.t, w, h);
	};

	// =============================
	// Positioning
	// =============================

	geom.isBodyLtr = function isBodyLtr(/*Document?*/ doc){
		// summary:
		//		Returns true if the current language is left-to-right, and false otherwise.
		// doc: Document?
		//		Optional document to query.   If unspecified, use win.doc.
		// returns: Boolean

		doc = doc || win.doc;
		return (win.body(doc).dir || doc.documentElement.dir || "ltr").toLowerCase() == "ltr"; // Boolean
	};

	geom.docScroll = function docScroll(/*Document?*/ doc){
		// summary:
		//		Returns an object with {node, x, y} with corresponding offsets.
		// doc: Document?
		//		Optional document to query.   If unspecified, use win.doc.
		// returns: Object

		doc = doc || win.doc;
		var node = doc.parentWindow || doc.defaultView;   // use UI window, not dojo.global window.   TODO: use dojo/window::get() except for circular dependency problem
		return "pageXOffset" in node ? {x: node.pageXOffset, y: node.pageYOffset } :
			(node = has("quirks") ? win.body(doc) : doc.documentElement) &&
				{x: geom.fixIeBiDiScrollLeft(node.scrollLeft || 0, doc), y: node.scrollTop || 0 };
	};

	geom.getIeDocumentElementOffset = function(/*Document?*/ doc){
		// summary:
		//		Deprecated method previously used for IE6-IE7.  Now, just returns `{x:0, y:0}`.
		return {
			x: 0,
			y: 0
		};
	};

	geom.fixIeBiDiScrollLeft = function fixIeBiDiScrollLeft(/*Integer*/ scrollLeft, /*Document?*/ doc){
		// summary:
		//		In RTL direction, scrollLeft should be a negative value, but IE
		//		returns a positive one. All codes using documentElement.scrollLeft
		//		must call this function to fix this error, otherwise the position
		//		will offset to right when there is a horizontal scrollbar.
		// scrollLeft: Number
		// doc: Document?
		//		Optional document to query.   If unspecified, use win.doc.
		// returns: Number

		// In RTL direction, scrollLeft should be a negative value, but IE
		// returns a positive one. All codes using documentElement.scrollLeft
		// must call this function to fix this error, otherwise the position
		// will offset to right when there is a horizontal scrollbar.

		doc = doc || win.doc;
		var ie = has("ie");
		if(ie && !geom.isBodyLtr(doc)){
			var qk = has("quirks"),
				de = qk ? win.body(doc) : doc.documentElement,
				pwin = win.global;	// TODO: use winUtils.get(doc) after resolving circular dependency b/w dom-geometry.js and dojo/window.js
			if(ie == 6 && !qk && pwin.frameElement && de.scrollHeight > de.clientHeight){
				scrollLeft += de.clientLeft; // workaround ie6+strict+rtl+iframe+vertical-scrollbar bug where clientWidth is too small by clientLeft pixels
			}
			return (ie < 8 || qk) ? (scrollLeft + de.clientWidth - de.scrollWidth) : -scrollLeft; // Integer
		}
		return scrollLeft; // Integer
	};

	geom.position = function(/*DomNode*/ node, /*Boolean?*/ includeScroll){
		// summary:
		//		Gets the position and size of the passed element relative to
		//		the viewport (if includeScroll==false), or relative to the
		//		document root (if includeScroll==true).
		//
		// description:
		//		Returns an object of the form:
		//		`{ x: 100, y: 300, w: 20, h: 15 }`.
		//		If includeScroll==true, the x and y values will include any
		//		document offsets that may affect the position relative to the
		//		viewport.
		//		Uses the border-box model (inclusive of border and padding but
		//		not margin).  Does not act as a setter.
		// node: DOMNode|String
		// includeScroll: Boolean?
		// returns: Object

		node = dom.byId(node);
		var	db = win.body(node.ownerDocument),
			ret= getBoundingClientRect(node);
		ret = {x: ret.left, y: ret.top, w: ret.right - ret.left, h: ret.bottom - ret.top};

		if(has("ie") < 9){
			// fixes the position in IE, quirks mode
			ret.x -= (has("quirks") ? db.clientLeft + db.offsetLeft : 0);
			ret.y -= (has("quirks") ? db.clientTop + db.offsetTop : 0);
		}

		// account for document scrolling
		// if offsetParent is used, ret value already includes scroll position
		// so we may have to actually remove that value if !includeScroll
		if(includeScroll){
			var scroll = geom.docScroll(node.ownerDocument);
			ret.x += scroll.x;
			ret.y += scroll.y;
		}

		return ret; // Object
	};

	// random "private" functions wildly used throughout the toolkit

	geom.getMarginSize = function getMarginSize(/*DomNode*/ node, /*Object*/ computedStyle){
		// summary:
		//		returns an object that encodes the width and height of
		//		the node's margin box
		// node: DOMNode|String
		// computedStyle: Object?
		//		This parameter accepts computed styles object.
		//		If this parameter is omitted, the functions will call
		//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
		//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
		//		computedStyle parameter. Wherever possible, reuse the returned
		//		object of dojo/dom-style.getComputedStyle().

		node = dom.byId(node);
		var me = geom.getMarginExtents(node, computedStyle || style.getComputedStyle(node));
		var size = getBoundingClientRect(node);
		return {
			w: (size.right - size.left) + me.w,
			h: (size.bottom - size.top) + me.h
		};
	};

	geom.normalizeEvent = function(event){
		// summary:
		//		Normalizes the geometry of a DOM event, normalizing the pageX, pageY,
		//		offsetX, offsetY, layerX, and layerX properties
		// event: Object
		if(!("layerX" in event)){
			event.layerX = event.offsetX;
			event.layerY = event.offsetY;
		}

		if(!("pageX" in event)){
			// FIXME: scroll position query is duped from dojo/_base/html to
			// avoid dependency on that entire module. Now that HTML is in
			// Base, we should convert back to something similar there.
			var se = event.target;
			var doc = (se && se.ownerDocument) || document;
			// DO NOT replace the following to use dojo/_base/window.body(), in IE, document.documentElement should be used
			// here rather than document.body
			var docBody = has("quirks") ? doc.body : doc.documentElement;
			event.pageX = event.clientX + geom.fixIeBiDiScrollLeft(docBody.scrollLeft || 0, doc);
			event.pageY = event.clientY + (docBody.scrollTop || 0);
		}
	};

	// TODO: evaluate separate getters/setters for position and sizes?

	return geom;
});

},
'dojo/global':function(){
define(function(){
    if (typeof global !== 'undefined' && typeof global !== 'function') {
        // global spec defines a reference to the global object called 'global'
        // https://github.com/tc39/proposal-global
        // `global` is also defined in NodeJS
        return global;
    }
    else if (typeof window !== 'undefined') {
        // window is defined in browsers
        return window;
    }
    else if (typeof self !== 'undefined') {
        // self is defined in WebWorkers
        return self;
    }
    return this;
});

},
'dojo/dom-prop':function(){
define(["exports", "./_base/kernel", "./sniff", "./_base/lang", "./dom", "./dom-style", "./dom-construct", "./_base/connect"],
		function(exports, dojo, has, lang, dom, style, ctr, conn){
	// module:
	//		dojo/dom-prop
	// summary:
	//		This module defines the core dojo DOM properties API.

	// TODOC: summary not showing up in output, see https://github.com/csnover/js-doc-parse/issues/42

	// =============================
	// Element properties Functions
	// =============================

	// helper to connect events
	var _evtHdlrMap = {}, _ctr = 1, _attrId = dojo._scopeName + "attrid";
	has.add('dom-textContent', function (global, doc, element) { return 'textContent' in element; });

	exports.names = {
		// properties renamed to avoid clashes with reserved words
		"class": "className",
		"for": "htmlFor",
		// properties written as camelCase
		tabindex: "tabIndex",
		readonly: "readOnly",
		colspan: "colSpan",
		frameborder: "frameBorder",
		rowspan: "rowSpan",
		textcontent: "textContent",
		valuetype: "valueType"
	};
	
	function getText(/*DOMNode*/node){
		// summary:
		//		recursion method for get('textContent') to use. Gets text value for a node.
		// description:
		//		Juse uses nodedValue so things like <br/> tags do not end up in
		//		the text as any sort of line return.
		var text = "", ch = node.childNodes;
		for(var i = 0, n; n = ch[i]; i++){
			//Skip comments.
			if(n.nodeType != 8){
				if(n.nodeType == 1){
					text += getText(n);
				}else{
					text += n.nodeValue;
				}
			}
		}
		return text;
	}

	exports.get = function getProp(/*DOMNode|String*/ node, /*String*/ name){
		// summary:
		//		Gets a property on an HTML element.
		// description:
		//		Handles normalized getting of properties on DOM nodes.
		//
		// node: DOMNode|String
		//		id or reference to the element to get the property on
		// name: String
		//		the name of the property to get.
		// returns:
		//		the value of the requested property or its default value
		//
		// example:
		//	|	// get the current value of the "foo" property on a node
		//	|	require(["dojo/dom-prop", "dojo/dom"], function(domProp, dom){
		//	|		domProp.get(dom.byId("nodeId"), "foo");
		//	|		// or we can just pass the id:
		//	|		domProp.get("nodeId", "foo");
		//	|	});

		node = dom.byId(node);
		var lc = name.toLowerCase(), propName = exports.names[lc] || name;
		
		if(propName == "textContent" && !has("dom-textContent")){
			return getText(node);
		}
		
		return node[propName];	// Anything
	};

	exports.set = function setProp(/*DOMNode|String*/ node, /*String|Object*/ name, /*String?*/ value){
		// summary:
		//		Sets a property on an HTML element.
		// description:
		//		Handles normalized setting of properties on DOM nodes.
		//
		//		When passing functions as values, note that they will not be
		//		directly assigned to slots on the node, but rather the default
		//		behavior will be removed and the new behavior will be added
		//		using `dojo.connect()`, meaning that event handler properties
		//		will be normalized and that some caveats with regards to
		//		non-standard behaviors for onsubmit apply. Namely that you
		//		should cancel form submission using `dojo.stopEvent()` on the
		//		passed event object instead of returning a boolean value from
		//		the handler itself.
		// node: DOMNode|String
		//		id or reference to the element to set the property on
		// name: String|Object
		//		the name of the property to set, or a hash object to set
		//		multiple properties at once.
		// value: String?
		//		The value to set for the property
		// returns:
		//		the DOM node
		//
		// example:
		//	|	// use prop() to set the tab index
		//	|	require(["dojo/dom-prop"], function(domProp){
		//	|		domProp.set("nodeId", "tabIndex", 3);
		//	|	});
		//
		// example:
		//	Set multiple values at once, including event handlers:
		//	|	require(["dojo/dom-prop"], function(domProp){
		//	|		domProp.set("formId", {
		//	|			"foo": "bar",
		//	|			"tabIndex": -1,
		//	|			"method": "POST",
		//	|		});
		//	|	});

		node = dom.byId(node);
		var l = arguments.length;
		if(l == 2 && typeof name != "string"){ // inline'd type check
			// the object form of setter: the 2nd argument is a dictionary
			for(var x in name){
				exports.set(node, x, name[x]);
			}
			return node; // DomNode
		}
		var lc = name.toLowerCase(), propName = exports.names[lc] || name;
		if(propName == "style" && typeof value != "string"){ // inline'd type check
			// special case: setting a style
			style.set(node, value);
			return node; // DomNode
		}
		if(propName == "innerHTML"){
			// special case: assigning HTML
			// the hash lists elements with read-only innerHTML on IE
			if(has("ie") && node.tagName.toLowerCase() in {col: 1, colgroup: 1,
						table: 1, tbody: 1, tfoot: 1, thead: 1, tr: 1, title: 1}){
				ctr.empty(node);
				node.appendChild(ctr.toDom(value, node.ownerDocument));
			}else{
				node[propName] = value;
			}
			return node; // DomNode
		}
		if(propName == "textContent" && !has("dom-textContent")) {
			ctr.empty(node);
			node.appendChild(node.ownerDocument.createTextNode(value));
			return node;
		}
		if(lang.isFunction(value)){
			// special case: assigning an event handler
			// clobber if we can
			var attrId = node[_attrId];
			if(!attrId){
				attrId = _ctr++;
				node[_attrId] = attrId;
			}
			if(!_evtHdlrMap[attrId]){
				_evtHdlrMap[attrId] = {};
			}
			var h = _evtHdlrMap[attrId][propName];
			if(h){
				//h.remove();
				conn.disconnect(h);
			}else{
				try{
					delete node[propName];
				}catch(e){}
			}
			// ensure that event objects are normalized, etc.
			if(value){
				//_evtHdlrMap[attrId][propName] = on(node, propName, value);
				_evtHdlrMap[attrId][propName] = conn.connect(node, propName, value);
			}else{
				node[propName] = null;
			}
			return node; // DomNode
		}
		node[propName] = value;
		return node;	// DomNode
	};
});

},
'dojo/when':function(){
define([
	"./Deferred",
	"./promise/Promise"
], function(Deferred, Promise){
	"use strict";

	// module:
	//		dojo/when

	return function when(valueOrPromise, callback, errback, progback){
		// summary:
		//		Transparently applies callbacks to values and/or promises.
		// description:
		//		Accepts promises but also transparently handles non-promises. If no
		//		callbacks are provided returns a promise, regardless of the initial
		//		value. Foreign promises are converted.
		//
		//		If callbacks are provided and the initial value is not a promise,
		//		the callback is executed immediately with no error handling. Returns
		//		a promise if the initial value is a promise, or the result of the
		//		callback otherwise.
		// valueOrPromise:
		//		Either a regular value or an object with a `then()` method that
		//		follows the Promises/A specification.
		// callback: Function?
		//		Callback to be invoked when the promise is resolved, or a non-promise
		//		is received.
		// errback: Function?
		//		Callback to be invoked when the promise is rejected.
		// progback: Function?
		//		Callback to be invoked when the promise emits a progress update.
		// returns: dojo/promise/Promise
		//		Promise, or if a callback is provided, the result of the callback.

		var receivedPromise = valueOrPromise && typeof valueOrPromise.then === "function";
		var nativePromise = receivedPromise && valueOrPromise instanceof Promise;

		if(!receivedPromise){
			if(arguments.length > 1){
				return callback ? callback(valueOrPromise) : valueOrPromise;
			}else{
				return new Deferred().resolve(valueOrPromise);
			}
		}else if(!nativePromise){
			var deferred = new Deferred(valueOrPromise.cancel);
			valueOrPromise.then(deferred.resolve, deferred.reject, deferred.progress);
			valueOrPromise = deferred.promise;
		}

		if(callback || errback || progback){
			return valueOrPromise.then(callback, errback, progback);
		}
		return valueOrPromise;
	};
});

},
'dojo/dom-attr':function(){
define(["exports", "./sniff", "./_base/lang", "./dom", "./dom-style", "./dom-prop"],
		function(exports, has, lang, dom, style, prop){
	// module:
	//		dojo/dom-attr
	// summary:
	//		This module defines the core dojo DOM attributes API.

	// TODOC: summary not showing up in output see https://github.com/csnover/js-doc-parse/issues/42

	// =============================
	// Element attribute Functions
	// =============================

	// This module will be obsolete soon. Use dojo/prop instead.

	// dojo/dom-attr.get() should conform to http://www.w3.org/TR/DOM-Level-2-Core/

	// attribute-related functions (to be obsolete soon)
	var forcePropNames = {
			innerHTML:	1,
			textContent:1,
			className:	1,
			htmlFor:	has("ie") ? 1 : 0,
			value:		1
		},
		attrNames = {
			// original attribute names
			classname: "class",
			htmlfor: "for",
			// for IE
			tabindex: "tabIndex",
			readonly: "readOnly"
		};

	function _hasAttr(node, name){
		var attr = node.getAttributeNode && node.getAttributeNode(name);
		return !!attr && attr.specified; // Boolean
	}
	
	// There is a difference in the presence of certain properties and their default values
	// between browsers. For example, on IE "disabled" is present on all elements,
	// but it is value is "false"; "tabIndex" of <div> returns 0 by default on IE, yet other browsers
	// can return -1.

	exports.has = function hasAttr(/*DOMNode|String*/ node, /*String*/ name){
		// summary:
		//		Returns true if the requested attribute is specified on the
		//		given element, and false otherwise.
		// node: DOMNode|String
		//		id or reference to the element to check
		// name: String
		//		the name of the attribute
		// returns: Boolean
		//		true if the requested attribute is specified on the
		//		given element, and false otherwise

		var lc = name.toLowerCase();
		return !!forcePropNames[prop.names[lc] || name] || _hasAttr(dom.byId(node), attrNames[lc] || name);	// Boolean
	};

	exports.get = function getAttr(/*DOMNode|String*/ node, /*String*/ name){
		// summary:
		//		Gets an attribute on an HTML element.
		// description:
		//		Handles normalized getting of attributes on DOM Nodes.
		// node: DOMNode|String
		//		id or reference to the element to get the attribute on
		// name: String
		//		the name of the attribute to get.
		// returns:
		//		the value of the requested attribute or null if that attribute does not have a specified or
		//		default value;
		//
		// example:
		//	|	// get the current value of the "foo" attribute on a node
		//	|	require(["dojo/dom-attr", "dojo/dom"], function(domAttr, dom){
		//	|		domAttr.get(dom.byId("nodeId"), "foo");
		//	|		// or we can just pass the id:
		//	|		domAttr.get("nodeId", "foo");
		//	|	});	
		//	|	

		node = dom.byId(node);
		var lc = name.toLowerCase(),
			propName = prop.names[lc] || name,
			forceProp = forcePropNames[propName],
			value = node[propName];		// should we access this attribute via a property or via getAttribute()?

		if(forceProp && typeof value != "undefined"){
			// node's property
			return value;	// Anything
		}
		
		if(propName == "textContent"){
			return prop.get(node, propName);
		}
		
		if(propName != "href" && (typeof value == "boolean" || lang.isFunction(value))){
			// node's property
			return value;	// Anything
		}
		// node's attribute
		// we need _hasAttr() here to guard against IE returning a default value
		var attrName = attrNames[lc] || name;
		return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
	};

	exports.set = function setAttr(/*DOMNode|String*/ node, /*String|Object*/ name, /*String?*/ value){
		// summary:
		//		Sets an attribute on an HTML element.
		// description:
		//		Handles normalized setting of attributes on DOM Nodes.
		//
		//		When passing functions as values, note that they will not be
		//		directly assigned to slots on the node, but rather the default
		//		behavior will be removed and the new behavior will be added
		//		using `dojo.connect()`, meaning that event handler properties
		//		will be normalized and that some caveats with regards to
		//		non-standard behaviors for onsubmit apply. Namely that you
		//		should cancel form submission using `dojo.stopEvent()` on the
		//		passed event object instead of returning a boolean value from
		//		the handler itself.
		// node: DOMNode|String
		//		id or reference to the element to set the attribute on
		// name: String|Object
		//		the name of the attribute to set, or a hash of key-value pairs to set.
		// value: String?
		//		the value to set for the attribute, if the name is a string.
		// returns:
		//		the DOM node
		//
		// example:
		//	|	// use attr() to set the tab index
		//	|	require(["dojo/dom-attr"], function(domAttr){
		//	|		domAttr.set("nodeId", "tabIndex", 3);
		//	|	});
		//
		// example:
		//	Set multiple values at once, including event handlers:
		//	|	require(["dojo/dom-attr"],
		//	|	function(domAttr){
		//	|		domAttr.set("formId", {
		//	|			"foo": "bar",
		//	|			"tabIndex": -1,
		//	|			"method": "POST"
		//	|		}
		//	|	});

		node = dom.byId(node);
		if(arguments.length == 2){ // inline'd type check
			// the object form of setter: the 2nd argument is a dictionary
			for(var x in name){
				exports.set(node, x, name[x]);
			}
			return node; // DomNode
		}
		var lc = name.toLowerCase(),
			propName = prop.names[lc] || name,
			forceProp = forcePropNames[propName];
		if(propName == "style" && typeof value != "string"){ // inline'd type check
			// special case: setting a style
			style.set(node, value);
			return node; // DomNode
		}
		if(forceProp || typeof value == "boolean" || lang.isFunction(value)){
			return prop.set(node, name, value);
		}
		// node's attribute
		node.setAttribute(attrNames[lc] || name, value);
		return node; // DomNode
	};

	exports.remove = function removeAttr(/*DOMNode|String*/ node, /*String*/ name){
		// summary:
		//		Removes an attribute from an HTML element.
		// node: DOMNode|String
		//		id or reference to the element to remove the attribute from
		// name: String
		//		the name of the attribute to remove

		dom.byId(node).removeAttribute(attrNames[name.toLowerCase()] || name);
	};

	exports.getNodeProp = function getNodeProp(/*DomNode|String*/ node, /*String*/ name){
		// summary:
		//		Returns an effective value of a property or an attribute.
		// node: DOMNode|String
		//		id or reference to the element to remove the attribute from
		// name: String
		//		the name of the attribute
		// returns:
		//		the value of the attribute

		node = dom.byId(node);
		var lc = name.toLowerCase(), propName = prop.names[lc] || name;
		if((propName in node) && propName != "href"){
			// node's property
			return node[propName];	// Anything
		}
		// node's attribute
		var attrName = attrNames[lc] || name;
		return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
	};
});

},
'dojo/dom-construct':function(){
define(["exports", "./_base/kernel", "./sniff", "./_base/window", "./dom", "./dom-attr"],
		function(exports, dojo, has, win, dom, attr){
	// module:
	//		dojo/dom-construct
	// summary:
	//		This module defines the core dojo DOM construction API.

	// TODOC: summary not showing up in output, see https://github.com/csnover/js-doc-parse/issues/42

	// support stuff for toDom()
	var tagWrap = {
			option: ["select"],
			tbody: ["table"],
			thead: ["table"],
			tfoot: ["table"],
			tr: ["table", "tbody"],
			td: ["table", "tbody", "tr"],
			th: ["table", "thead", "tr"],
			legend: ["fieldset"],
			caption: ["table"],
			colgroup: ["table"],
			col: ["table", "colgroup"],
			li: ["ul"]
		},
		reTag = /<\s*([\w\:]+)/,
		masterNode = {}, masterNum = 0,
		masterName = "__" + dojo._scopeName + "ToDomId";

	// generate start/end tag strings to use
	// for the injection for each special tag wrap case.
	for(var param in tagWrap){
		if(tagWrap.hasOwnProperty(param)){
			var tw = tagWrap[param];
			tw.pre = param == "option" ? '<select multiple="multiple">' : "<" + tw.join("><") + ">";
			tw.post = "</" + tw.reverse().join("></") + ">";
			// the last line is destructive: it reverses the array,
			// but we don't care at this point
		}
	}

	var html5domfix;
	if(has("ie") <= 8){
		html5domfix = function(doc){
			doc.__dojo_html5_tested = "yes";
			var div = create('div', {innerHTML: "<nav>a</nav>", style: {visibility: "hidden"}}, doc.body);
			if(div.childNodes.length !== 1){
				('abbr article aside audio canvas details figcaption figure footer header ' +
				'hgroup mark meter nav output progress section summary time video').replace(
					/\b\w+\b/g, function(n){
						doc.createElement(n);
					}
				);
			}
			destroy(div);
		}
	}

	function _insertBefore(/*DomNode*/ node, /*DomNode*/ ref){
		var parent = ref.parentNode;
		if(parent){
			parent.insertBefore(node, ref);
		}
	}

	function _insertAfter(/*DomNode*/ node, /*DomNode*/ ref){
		// summary:
		//		Try to insert node after ref
		var parent = ref.parentNode;
		if(parent){
			if(parent.lastChild == ref){
				parent.appendChild(node);
			}else{
				parent.insertBefore(node, ref.nextSibling);
			}
		}
	}

	exports.toDom = function toDom(frag, doc){
		// summary:
		//		instantiates an HTML fragment returning the corresponding DOM.
		// frag: String
		//		the HTML fragment
		// doc: DocumentNode?
		//		optional document to use when creating DOM nodes, defaults to
		//		dojo/_base/window.doc if not specified.
		// returns:
		//		Document fragment, unless it's a single node in which case it returns the node itself
		// example:
		//		Create a table row:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		var tr = domConstruct.toDom("<tr><td>First!</td></tr>");
		//	|	});

		doc = doc || win.doc;
		var masterId = doc[masterName];
		if(!masterId){
			doc[masterName] = masterId = ++masterNum + "";
			masterNode[masterId] = doc.createElement("div");
		}

		if(has("ie") <= 8){
			if(!doc.__dojo_html5_tested && doc.body){
				html5domfix(doc);
			}
		}

		// make sure the frag is a string.
		frag += "";

		// find the starting tag, and get node wrapper
		var match = frag.match(reTag),
			tag = match ? match[1].toLowerCase() : "",
			master = masterNode[masterId],
			wrap, i, fc, df;
		if(match && tagWrap[tag]){
			wrap = tagWrap[tag];
			master.innerHTML = wrap.pre + frag + wrap.post;
			for(i = wrap.length; i; --i){
				master = master.firstChild;
			}
		}else{
			master.innerHTML = frag;
		}

		// one node shortcut => return the node itself
		if(master.childNodes.length == 1){
			return master.removeChild(master.firstChild); // DOMNode
		}

		// return multiple nodes as a document fragment
		df = doc.createDocumentFragment();
		while((fc = master.firstChild)){ // intentional assignment
			df.appendChild(fc);
		}
		return df; // DocumentFragment
	};

	exports.place = function place(node, refNode, position){
		// summary:
		//		Attempt to insert node into the DOM, choosing from various positioning options.
		//		Returns the first argument resolved to a DOM node.
		// node: DOMNode|DocumentFragment|String
		//		id or node reference, or HTML fragment starting with "<" to place relative to refNode
		// refNode: DOMNode|String
		//		id or node reference to use as basis for placement
		// position: String|Number?
		//		string noting the position of node relative to refNode or a
		//		number indicating the location in the childNodes collection of refNode.
		//		Accepted string values are:
		//
		//		- before
		//		- after
		//		- replace
		//		- only
		//		- first
		//		- last
		//
		//		"first" and "last" indicate positions as children of refNode, "replace" replaces refNode,
		//		"only" replaces all children.  position defaults to "last" if not specified
		// returns: DOMNode
		//		Returned values is the first argument resolved to a DOM node.
		//
		//		.place() is also a method of `dojo/NodeList`, allowing `dojo/query` node lookups.
		// example:
		//		Place a node by string id as the last child of another node by string id:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		domConstruct.place("someNode", "anotherNode");
		//	|	});
		// example:
		//		Place a node by string id before another node by string id
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		domConstruct.place("someNode", "anotherNode", "before");
		//	|	});
		// example:
		//		Create a Node, and place it in the body element (last child):
		//	|	require(["dojo/dom-construct", "dojo/_base/window"
		//	|	], function(domConstruct, win){
		//	|		domConstruct.place("<div></div>", win.body());
		//	|	});
		// example:
		//		Put a new LI as the first child of a list by id:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		domConstruct.place("<li></li>", "someUl", "first");
		//	|	});

		refNode = dom.byId(refNode);
		if(typeof node == "string"){ // inline'd type check
			node = /^\s*</.test(node) ? exports.toDom(node, refNode.ownerDocument) : dom.byId(node);
		}
		if(typeof position == "number"){ // inline'd type check
			var cn = refNode.childNodes;
			if(!cn.length || cn.length <= position){
				refNode.appendChild(node);
			}else{
				_insertBefore(node, cn[position < 0 ? 0 : position]);
			}
		}else{
			switch(position){
				case "before":
					_insertBefore(node, refNode);
					break;
				case "after":
					_insertAfter(node, refNode);
					break;
				case "replace":
					refNode.parentNode.replaceChild(node, refNode);
					break;
				case "only":
					exports.empty(refNode);
					refNode.appendChild(node);
					break;
				case "first":
					if(refNode.firstChild){
						_insertBefore(node, refNode.firstChild);
						break;
					}
					// else fallthrough...
				default: // aka: last
					refNode.appendChild(node);
			}
		}
		return node; // DomNode
	};

	var create = exports.create = function create(/*DOMNode|String*/ tag, /*Object*/ attrs, /*DOMNode|String?*/ refNode, /*String?*/ pos){
		// summary:
		//		Create an element, allowing for optional attribute decoration
		//		and placement.
		// description:
		//		A DOM Element creation function. A shorthand method for creating a node or
		//		a fragment, and allowing for a convenient optional attribute setting step,
		//		as well as an optional DOM placement reference.
		//
		//		Attributes are set by passing the optional object through `dojo/dom-attr.set`.
		//		See `dojo/dom-attr.set` for noted caveats and nuances, and API if applicable.
		//
		//		Placement is done via `dojo/dom-construct.place`, assuming the new node to be
		//		the action node, passing along the optional reference node and position.
		// tag: DOMNode|String
		//		A string of the element to create (eg: "div", "a", "p", "li", "script", "br"),
		//		or an existing DOM node to process.
		// attrs: Object
		//		An object-hash of attributes to set on the newly created node.
		//		Can be null, if you don't want to set any attributes/styles.
		//		See: `dojo/dom-attr.set` for a description of available attributes.
		// refNode: DOMNode|String?
		//		Optional reference node. Used by `dojo/dom-construct.place` to place the newly created
		//		node somewhere in the dom relative to refNode. Can be a DomNode reference
		//		or String ID of a node.
		// pos: String?
		//		Optional positional reference. Defaults to "last" by way of `dojo/domConstruct.place`,
		//		though can be set to "first","after","before","last", "replace" or "only"
		//		to further control the placement of the new node relative to the refNode.
		//		'refNode' is required if a 'pos' is specified.
		// example:
		//		Create a DIV:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		var n = domConstruct.create("div");
		//	|	});
		//
		// example:
		//		Create a DIV with content:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		var n = domConstruct.create("div", { innerHTML:"<p>hi</p>" });
		//	|	});
		//
		// example:
		//		Place a new DIV in the BODY, with no attributes set
		//	|	require(["dojo/dom-construct", "dojo/_base/window"], function(domConstruct, win){
		//	|		var n = domConstruct.create("div", null, win.body());
		//	|	});
		//
		// example:
		//		Create an UL, and populate it with LI's. Place the list as the first-child of a
		//		node with id="someId":
		//	|	require(["dojo/dom-construct", "dojo/_base/array"],
		//	|	function(domConstruct, arrayUtil){
		//	|		var ul = domConstruct.create("ul", null, "someId", "first");
		//	|		var items = ["one", "two", "three", "four"];
		//	|		arrayUtil.forEach(items, function(data){
		//	|			domConstruct.create("li", { innerHTML: data }, ul);
		//	|		});
		//	|	});
		//
		// example:
		//		Create an anchor, with an href. Place in BODY:
		//	|	require(["dojo/dom-construct", "dojo/_base/window"], function(domConstruct, win){
		//	|		domConstruct.create("a", { href:"foo.html", title:"Goto FOO!" }, win.body());
		//	|	});

		var doc = win.doc;
		if(refNode){
			refNode = dom.byId(refNode);
			doc = refNode.ownerDocument;
		}
		if(typeof tag == "string"){ // inline'd type check
			tag = doc.createElement(tag);
		}
		if(attrs){ attr.set(tag, attrs); }
		if(refNode){ exports.place(tag, refNode, pos); }
		return tag; // DomNode
	};

	function _empty(/*DomNode*/ node){
		// TODO: remove this if() block in 2.0 when we no longer have to worry about IE memory leaks,
		// and then uncomment the emptyGrandchildren() test case from html.html.
		// Note that besides fixing #16957, using removeChild() is actually faster than setting node.innerHTML,
		// see http://jsperf.com/clear-dom-node.
		if("innerHTML" in node){
			try{
				// fast path
				node.innerHTML = "";
				return;
			}catch(e){
				// innerHTML is readOnly (e.g. TABLE (sub)elements in quirks mode)
				// Fall through (saves bytes)
			}
		}

		// SVG/strict elements don't support innerHTML
		for(var c; c = node.lastChild;){ // intentional assignment
			node.removeChild(c);
		}
	}

	exports.empty = function empty(/*DOMNode|String*/ node){
		// summary:
		//		safely removes all children of the node.
		// node: DOMNode|String
		//		a reference to a DOM node or an id.
		// example:
		//		Destroy node's children byId:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		domConstruct.empty("someId");
		//	|	});

		_empty(dom.byId(node));
	};


	function _destroy(/*DomNode*/ node, /*DomNode*/ parent){
		// in IE quirks, node.canHaveChildren can be false but firstChild can be non-null (OBJECT/APPLET)
		if(node.firstChild){
			_empty(node);
		}
		if(parent){
			// removeNode(false) doesn't leak in IE 6+, but removeChild() and removeNode(true) are known to leak under IE 8- while 9+ is TBD.
			// In IE quirks mode, PARAM nodes as children of OBJECT/APPLET nodes have a removeNode method that does nothing and
			// the parent node has canHaveChildren=false even though removeChild correctly removes the PARAM children.
			// In IE, SVG/strict nodes don't have a removeNode method nor a canHaveChildren boolean.
			has("ie") && parent.canHaveChildren && "removeNode" in node ? node.removeNode(false) : parent.removeChild(node);
		}
	}
	var destroy = exports.destroy = function destroy(/*DOMNode|String*/ node){
		// summary:
		//		Removes a node from its parent, clobbering it and all of its
		//		children.
		//
		// description:
		//		Removes a node from its parent, clobbering it and all of its
		//		children. Function only works with DomNodes, and returns nothing.
		//
		// node: DOMNode|String
		//		A String ID or DomNode reference of the element to be destroyed
		//
		// example:
		//		Destroy a node byId:
		//	|	require(["dojo/dom-construct"], function(domConstruct){
		//	|		domConstruct.destroy("someId");
		//	|	});

		node = dom.byId(node);
		if(!node){ return; }
		_destroy(node, node.parentNode);
	};
});

},
'dojo/request/xhr':function(){
define([
	'../errors/RequestError',
	'./watch',
	'./handlers',
	'./util',
	'../has'/*=====,
	'../request',
	'../_base/declare' =====*/
], function(RequestError, watch, handlers, util, has/*=====, request, declare =====*/){
	has.add('native-xhr', function(){
		// if true, the environment has a native XHR implementation
		return typeof XMLHttpRequest !== 'undefined';
	});
	has.add('dojo-force-activex-xhr', function(){
		return has('activex') && window.location.protocol === 'file:';
	});

	has.add('native-xhr2', function(){
		if(!has('native-xhr') || has('dojo-force-activex-xhr')){ return; }
		var x = new XMLHttpRequest();
		return typeof x['addEventListener'] !== 'undefined' &&
			(typeof opera === 'undefined' || typeof x['upload'] !== 'undefined');
	});

	has.add('native-formdata', function(){
		// if true, the environment has a native FormData implementation
		return typeof FormData !== 'undefined';
	});

	has.add('native-blob', function(){
		// if true, the environment has a native Blob implementation
		return typeof Blob !== 'undefined';
	});

	has.add('native-arraybuffer', function(){
		// if true, the environment has a native ArrayBuffer implementation
		return typeof ArrayBuffer !== 'undefined';
	});

	has.add('native-response-type', function(){
		return has('native-xhr') && typeof new XMLHttpRequest().responseType !== 'undefined';
	});

	has.add('native-xhr2-blob', function(){
		if(!has('native-response-type')){ return; }
		var x = new XMLHttpRequest();
		// The URL used here does not have to be reachable as the XHR's `send` method is never called.
		// It does need to be parsable/resolvable in all cases, so it should be an absolute URL.
		// XMLHttpRequest within a Worker created from a Blob does not support relative URL paths.
		x.open('GET', 'https://dojotoolkit.org/', true);
		x.responseType = 'blob';
		// will not be set if unsupported
		var responseType = x.responseType;
		x.abort();
		return responseType === 'blob';
	});

	// Google Chrome doesn't support "json" response type
	// up to version 30, so it's intentionally not included here
	var nativeResponseTypes = {
		'blob': has('native-xhr2-blob') ? 'blob' : 'arraybuffer',
		'document': 'document',
		'arraybuffer': 'arraybuffer'
	};

	function handleResponse(response, error){
		var _xhr = response.xhr;
		response.status = response.xhr.status;

		try {
			// Firefox throws an error when trying to access
			// xhr.responseText if response isn't text
			response.text = _xhr.responseText;
		} catch (e) {}

		if(response.options.handleAs === 'xml'){
			response.data = _xhr.responseXML;
		}

		var handleError;
		if(error){
			this.reject(error);
		}else{
			try{
				handlers(response);
			}catch(e){
				handleError = e;
			}
			if(util.checkStatus(_xhr.status)){
				if(!handleError){
					this.resolve(response);
				}else{
					this.reject(handleError);
				}
			}else{
				if(!handleError){
					error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status, response);
					this.reject(error);
				}else{
					error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status +
						' and an error in handleAs: transformation of response', response);
					this.reject(error);
				}
			}
		}
	}

	var isValid, isReady, addListeners, cancel;
	if(has('native-xhr2')){
		// Any platform with XHR2 will only use the watch mechanism for timeout.

		isValid = function(response){
			// summary:
			//		Check to see if the request should be taken out of the watch queue
			return !this.isFulfilled();
		};
		cancel = function(dfd, response){
			// summary:
			//		Canceler for deferred
			response.xhr.abort();
		};
		addListeners = function(_xhr, dfd, response, uploadProgress){
			// summary:
			//		Adds event listeners to the XMLHttpRequest object
			function onLoad(evt){
				dfd.handleResponse(response);
			}
			function onError(evt){
				var _xhr = evt.target;
				var error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status, response);
				dfd.handleResponse(response, error);
			}

			function onProgress(transferType, evt){
				response.transferType = transferType;
				if(evt.lengthComputable){
					response.loaded = evt.loaded;
					response.total = evt.total;
					dfd.progress(response);
				} else if(response.xhr.readyState === 3){
					response.loaded = ('loaded' in evt) ? evt.loaded : evt.position;
					dfd.progress(response);
				}
			}

			function onDownloadProgress(evt) {
				return onProgress('download', evt);
			}

			function onUploadProgress(evt) {
				return onProgress('upload', evt);
			}

			_xhr.addEventListener('load', onLoad, false);
			_xhr.addEventListener('error', onError, false);
			_xhr.addEventListener('progress', onDownloadProgress, false);

			if (uploadProgress && _xhr.upload) {
				_xhr.upload.addEventListener('progress', onUploadProgress, false);
			}

			return function(){
				_xhr.removeEventListener('load', onLoad, false);
				_xhr.removeEventListener('error', onError, false);
				_xhr.removeEventListener('progress', onDownloadProgress, false);
				_xhr.upload.removeEventListener('progress', onUploadProgress, false);
				_xhr = null;
			};
		};
	}else{
		isValid = function(response){
			return response.xhr.readyState; //boolean
		};
		isReady = function(response){
			return 4 === response.xhr.readyState; //boolean
		};
		cancel = function(dfd, response){
			// summary:
			//		canceller function for util.deferred call.
			var xhr = response.xhr;
			var _at = typeof xhr.abort;
			if(_at === 'function' || _at === 'object' || _at === 'unknown'){
				xhr.abort();
			}
		};
	}

	function getHeader(headerName){
		return this.xhr.getResponseHeader(headerName);
	}

	var undefined,
		defaultOptions = {
			data: null,
			query: null,
			sync: false,
			method: 'GET'
		};
	function xhr(url, options, returnDeferred){
		var isFormData = has('native-formdata') && options && options.data && options.data instanceof FormData;
		var response = util.parseArgs(
			url,
			util.deepCreate(defaultOptions, options),
			isFormData
		);
		url = response.url;
		options = response.options;
		var hasNoData = !options.data && options.method !== 'POST' && options.method !== 'PUT';

		if(has('ie') <= 10){
			// older IE breaks point 9 in http://www.w3.org/TR/XMLHttpRequest/#the-open()-method and sends fragment, so strip it
			url = url.split('#')[0];
		}

		var remover,
			last = function(){
				remover && remover();
			};

		//Make the Deferred object for this xhr request.
		var dfd = util.deferred(
			response,
			cancel,
			isValid,
			isReady,
			handleResponse,
			last
		);
		var _xhr = response.xhr = xhr._create();

		if(!_xhr){
			// If XHR factory somehow returns nothings,
			// cancel the deferred.
			dfd.cancel(new RequestError('XHR was not created'));
			return returnDeferred ? dfd : dfd.promise;
		}

		response.getHeader = getHeader;

		if(addListeners){
			remover = addListeners(_xhr, dfd, response, options.uploadProgress);
		}

		// IE11 treats data: undefined different than other browsers
		var data = typeof(options.data) === 'undefined' ? null : options.data,
			async = !options.sync,
			method = options.method;

		try{
			// IE6 won't let you call apply() on the native function.
			_xhr.open(method, url, async, options.user || undefined, options.password || undefined);

			if(options.withCredentials){
				_xhr.withCredentials = options.withCredentials;
			}

			if(has('native-response-type') && options.handleAs in nativeResponseTypes) {
				_xhr.responseType = nativeResponseTypes[options.handleAs];
			}

			var headers = options.headers,
				contentType = (isFormData || hasNoData) ? false : 'application/x-www-form-urlencoded';
			if(headers){
				for(var hdr in headers){
					if(hdr.toLowerCase() === 'content-type'){
						contentType = headers[hdr];
					}else if(headers[hdr]){
						//Only add header if it has a value. This allows for instance, skipping
						//insertion of X-Requested-With by specifying empty value.
						_xhr.setRequestHeader(hdr, headers[hdr]);
					}
				}
			}

			if(contentType && contentType !== false){
				_xhr.setRequestHeader('Content-Type', contentType);
			}
			if(!headers || !('X-Requested-With' in headers)){
				_xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			}

			if(util.notify){
				util.notify.emit('send', response, dfd.promise.cancel);
			}
			_xhr.send(data);
		}catch(e){
			dfd.reject(e);
		}

		watch(dfd);
		_xhr = null;

		return returnDeferred ? dfd : dfd.promise;
	}

	/*=====
	xhr = function(url, options){
		// summary:
		//		Sends a request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__Options?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.__BaseOptions = declare(request.__BaseOptions, {
		// sync: Boolean?
		//		Whether to make a synchronous request or not. Default
		//		is `false` (asynchronous).
		// data: String|Object|FormData?
		//		Data to transfer. This is ignored for GET and DELETE
		//		requests.
		// headers: Object?
		//		Headers to use for the request.
		// user: String?
		//		Username to use during the request.
		// password: String?
		//		Password to use during the request.
		// withCredentials: Boolean?
		//		For cross-site requests, whether to send credentials
		//		or not.
		// uploadProgress: Boolean?
		//		Upload progress events cause preflighted requests. This
		//		option enables upload progress event support but also
		//		causes all requests to be preflighted.
	});
	xhr.__MethodOptions = declare(null, {
		// method: String?
		//		The HTTP method to use to make the request. Must be
		//		uppercase. Default is `"GET"`.
	});
	xhr.__Options = declare([xhr.__BaseOptions, xhr.__MethodOptions]);

	xhr.get = function(url, options){
		// summary:
		//		Send an HTTP GET request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.post = function(url, options){
		// summary:
		//		Send an HTTP POST request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.put = function(url, options){
		// summary:
		//		Send an HTTP PUT request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.del = function(url, options){
		// summary:
		//		Send an HTTP DELETE request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	=====*/
	xhr._create = function(){
		// summary:
		//		does the work of portably generating a new XMLHTTPRequest object.
		throw new Error('XMLHTTP not available');
	};
	if(has('native-xhr') && !has('dojo-force-activex-xhr')){
		xhr._create = function(){
			return new XMLHttpRequest();
		};
	}else if(has('activex')){
		try{
			new ActiveXObject('Msxml2.XMLHTTP');
			xhr._create = function(){
				return new ActiveXObject('Msxml2.XMLHTTP');
			};
		}catch(e){
			try{
				new ActiveXObject('Microsoft.XMLHTTP');
				xhr._create = function(){
					return new ActiveXObject('Microsoft.XMLHTTP');
				};
			}catch(e){}
		}
	}

	util.addCommonMethods(xhr);

	return xhr;
});

},
'dojo/keys':function(){
define(["./_base/kernel", "./sniff"], function(dojo, has){

	// module:
	//		dojo/keys

	return dojo.keys = {
		// summary:
		//		Definitions for common key values.  Client code should test keyCode against these named constants,
		//		as the actual codes can vary by browser.

		BACKSPACE: 8,
		TAB: 9,
		CLEAR: 12,
		ENTER: 13,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		META: has("webkit") ? 91 : 224,		// the apple key on macs
		PAUSE: 19,
		CAPS_LOCK: 20,
		ESCAPE: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT_ARROW: 37,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		DOWN_ARROW: 40,
		INSERT: 45,
		DELETE: 46,
		HELP: 47,
		LEFT_WINDOW: 91,
		RIGHT_WINDOW: 92,
		SELECT: 93,
		NUMPAD_0: 96,
		NUMPAD_1: 97,
		NUMPAD_2: 98,
		NUMPAD_3: 99,
		NUMPAD_4: 100,
		NUMPAD_5: 101,
		NUMPAD_6: 102,
		NUMPAD_7: 103,
		NUMPAD_8: 104,
		NUMPAD_9: 105,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_PLUS: 107,
		NUMPAD_ENTER: 108,
		NUMPAD_MINUS: 109,
		NUMPAD_PERIOD: 110,
		NUMPAD_DIVIDE: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		F13: 124,
		F14: 125,
		F15: 126,
		NUM_LOCK: 144,
		SCROLL_LOCK: 145,
		UP_DPAD: 175,
		DOWN_DPAD: 176,
		LEFT_DPAD: 177,
		RIGHT_DPAD: 178,
		// virtual key mapping
		copyKey: has("mac") && !has("air") ? (has("safari") ? 91 : 224 ) : 17
	};
});

},
'dojo/domReady':function(){
define(['./global', './has'], function(global, has){
	var doc = document,
		readyStates = { 'loaded': 1, 'complete': 1 },
		fixReadyState = typeof doc.readyState != "string",
		ready = !!readyStates[doc.readyState],
		readyQ = [],
		recursiveGuard;

	function domReady(callback){
		// summary:
		//		Plugin to delay require()/define() callback from firing until the DOM has finished loading.
		readyQ.push(callback);
		if(ready){ processQ(); }
	}
	domReady.load = function(id, req, load){
		domReady(load);
	};

	// Export queue so that ready() can check if it's empty or not.
	domReady._Q = readyQ;
	domReady._onQEmpty = function(){
		// summary:
		//		Private method overridden by dojo/ready, to notify when everything in the
		//		domReady queue has been processed.  Do not use directly.
		//		Will be removed in 2.0, along with domReady._Q.
	};

	// For FF <= 3.5
	if(fixReadyState){ doc.readyState = "loading"; }

	function processQ(){
		// Calls all functions in the queue in order, unless processQ() is already running, in which case just return

		if(recursiveGuard){ return; }
		recursiveGuard = true;

		while(readyQ.length){
			try{
				(readyQ.shift())(doc);
			}catch(err){
				console.error(err, "in domReady callback", err.stack);
			}
		}

		recursiveGuard = false;

		// Notification for dojo/ready.  Remove for 2.0.
		// Note that this could add more tasks to the ready queue.
		domReady._onQEmpty();
	}

	if(!ready){
		var tests = [],
			detectReady = function(evt){
				evt = evt || global.event;
				if(ready || (evt.type == "readystatechange" && !readyStates[doc.readyState])){ return; }

				// For FF <= 3.5
				if(fixReadyState){ doc.readyState = "complete"; }

				ready = 1;
				processQ();
			},
			on = function(node, event){
				node.addEventListener(event, detectReady, false);
				readyQ.push(function(){ node.removeEventListener(event, detectReady, false); });
			};

		if(!has("dom-addeventlistener")){
			on = function(node, event){
				event = "on" + event;
				node.attachEvent(event, detectReady);
				readyQ.push(function(){ node.detachEvent(event, detectReady); });
			};

			var div = doc.createElement("div");
			try{
				if(div.doScroll && global.frameElement === null){
					// the doScroll test is only useful if we're in the top-most frame
					tests.push(function(){
						// Derived with permission from Diego Perini's IEContentLoaded
						// http://javascript.nwbox.com/IEContentLoaded/
						try{
							div.doScroll("left");
							return 1;
						}catch(e){}
					});
				}
			}catch(e){}
		}

		on(doc, "DOMContentLoaded");
		on(global, "load");

		if("onreadystatechange" in doc){
			on(doc, "readystatechange");
		}else if(!fixReadyState){
			// if the ready state property exists and there's
			// no readystatechange event, poll for the state
			// to change
			tests.push(function(){
				return readyStates[doc.readyState];
			});
		}

		if(tests.length){
			var poller = function(){
				if(ready){ return; }
				var i = tests.length;
				while(i--){
					if(tests[i]()){
						detectReady("poller");
						return;
					}
				}
				setTimeout(poller, 30);
			};
			poller();
		}
	}

	return domReady;
});

},
'dojo/_base/lang':function(){
define(["./kernel", "../has", "../sniff"], function(dojo, has){
	// module:
	//		dojo/_base/lang

	has.add("bug-for-in-skips-shadowed", function(){
		// if true, the for-in iterator skips object properties that exist in Object's prototype (IE 6 - ?)
		for(var i in {toString: 1}){
			return 0;
		}
		return 1;
	});

	// Helper methods
	var _extraNames =
			has("bug-for-in-skips-shadowed") ?
				"hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split(".") : [],

		_extraLen = _extraNames.length,

		getProp = function(/*Array*/parts, /*Boolean*/create, /*Object*/context){
			if(!context){
				if(parts[0] && dojo.scopeMap[parts[0]]) {
					// Voodoo code from the old days where "dojo" or "dijit" maps to some special object
					// rather than just window.dojo
					context = dojo.scopeMap[parts.shift()][1];
				}else{
					context = dojo.global;
				}
			}

			try{
				for(var i = 0; i < parts.length; i++){
					var p = parts[i];
					if(!(p in context)){
						if(create){
							context[p] = {};
						}else{
							return;		// return undefined
						}
					}
					context = context[p];
				}
				return context; // mixed
			}catch(e){
				// "p in context" throws an exception when context is a number, boolean, etc. rather than an object,
				// so in that corner case just return undefined (by having no return statement)
			}
		},

		opts = Object.prototype.toString,

		efficient = function(obj, offset, startWith){
			return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
		},

		_pattern = /\{([^\}]+)\}/g;

	// Module export
	var lang = {
		// summary:
		//		This module defines Javascript language extensions.

		// _extraNames: String[]
		//		Lists property names that must be explicitly processed during for-in iteration
		//		in environments that have has("bug-for-in-skips-shadowed") true.
		_extraNames:_extraNames,

		_mixin: function(dest, source, copyFunc){
			// summary:
			//		Copies/adds all properties of source to dest; returns dest.
			// dest: Object
			//		The object to which to copy/add all properties contained in source.
			// source: Object
			//		The object from which to draw all properties to copy into dest.
			// copyFunc: Function?
			//		The process used to copy/add a property in source; defaults to the Javascript assignment operator.
			// returns:
			//		dest, as modified
			// description:
			//		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
			//		found in Object.prototype, are copied/added to dest. Copying/adding each particular property is
			//		delegated to copyFunc (if any); copyFunc defaults to the Javascript assignment operator if not provided.
			//		Notice that by default, _mixin executes a so-called "shallow copy" and aggregate types are copied/added by reference.
			var name, s, i, empty = {};
			for(name in source){
				// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
				// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
				// don't overwrite it with the toString() method that source inherited from Object.prototype
				s = source[name];
				if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
					dest[name] = copyFunc ? copyFunc(s) : s;
				}
			}

			if(has("bug-for-in-skips-shadowed")){
				if(source){
					for(i = 0; i < _extraLen; ++i){
						name = _extraNames[i];
						s = source[name];
						if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
							dest[name] = copyFunc ? copyFunc(s) : s;
						}
					}
				}
			}

			return dest; // Object
		},

		mixin: function(dest, sources){
			// summary:
			//		Copies/adds all properties of one or more sources to dest; returns dest.
			// dest: Object
			//		The object to which to copy/add all properties contained in source. If dest is falsy, then
			//		a new object is manufactured before copying/adding properties begins.
			// sources: Object...
			//		One of more objects from which to draw all properties to copy into dest. sources are processed
			//		left-to-right and if more than one of these objects contain the same property name, the right-most
			//		value "wins".
			// returns: Object
			//		dest, as modified
			// description:
			//		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
			//		found in Object.prototype, are copied/added from sources to dest. sources are processed left to right.
			//		The Javascript assignment operator is used to copy/add each property; therefore, by default, mixin
			//		executes a so-called "shallow copy" and aggregate types are copied/added by reference.
			// example:
			//		make a shallow copy of an object
			//	|	var copy = lang.mixin({}, source);
			// example:
			//		many class constructors often take an object which specifies
			//		values to be configured on the object. In this case, it is
			//		often simplest to call `lang.mixin` on the `this` object:
			//	|	declare("acme.Base", null, {
			//	|		constructor: function(properties){
			//	|			// property configuration:
			//	|			lang.mixin(this, properties);
			//	|
			//	|			console.log(this.quip);
			//	|			//	...
			//	|		},
			//	|		quip: "I wasn't born yesterday, you know - I've seen movies.",
			//	|		// ...
			//	|	});
			//	|
			//	|	// create an instance of the class and configure it
			//	|	var b = new acme.Base({quip: "That's what it does!" });
			// example:
			//		copy in properties from multiple objects
			//	|	var flattened = lang.mixin(
			//	|		{
			//	|			name: "Frylock",
			//	|			braces: true
			//	|		},
			//	|		{
			//	|			name: "Carl Brutanananadilewski"
			//	|		}
			//	|	);
			//	|
			//	|	// will print "Carl Brutanananadilewski"
			//	|	console.log(flattened.name);
			//	|	// will print "true"
			//	|	console.log(flattened.braces);

			if(!dest){ dest = {}; }
			for(var i = 1, l = arguments.length; i < l; i++){
				lang._mixin(dest, arguments[i]);
			}
			return dest; // Object
		},

		setObject: function(name, value, context){
			// summary:
			//		Set a property from a dot-separated string, such as "A.B.C"
			// description:
			//		Useful for longer api chains where you have to test each object in
			//		the chain, or when you have an object reference in string format.
			//		Objects are created as needed along `path`. Returns the passed
			//		value if setting is successful or `undefined` if not.
			// name: String
			//		Path to a property, in the form "A.B.C".
			// value: anything
			//		value or object to place at location given by name
			// context: Object?
			//		Optional. Object to use as root of path. Defaults to
			//		`dojo.global`.
			// example:
			//		set the value of `foo.bar.baz`, regardless of whether
			//		intermediate objects already exist:
			//	| lang.setObject("foo.bar.baz", value);
			// example:
			//		without `lang.setObject`, we often see code like this:
			//	| // ensure that intermediate objects are available
			//	| if(!obj["parent"]){ obj.parent = {}; }
			//	| if(!obj.parent["child"]){ obj.parent.child = {}; }
			//	| // now we can safely set the property
			//	| obj.parent.child.prop = "some value";
			//		whereas with `lang.setObject`, we can shorten that to:
			//	| lang.setObject("parent.child.prop", "some value", obj);

			var parts = name.split("."), p = parts.pop(), obj = getProp(parts, true, context);
			return obj && p ? (obj[p] = value) : undefined; // Object
		},

		getObject: function(name, create, context){
			// summary:
			//		Get a property from a dot-separated string, such as "A.B.C"
			// description:
			//		Useful for longer api chains where you have to test each object in
			//		the chain, or when you have an object reference in string format.
			// name: String
			//		Path to an property, in the form "A.B.C".
			// create: Boolean?
			//		Optional. Defaults to `false`. If `true`, Objects will be
			//		created at any point along the 'path' that is undefined.
			// context: Object?
			//		Optional. Object to use as root of path. Defaults to
			//		'dojo.global'. Null may be passed.
			return !name ? context : getProp(name.split("."), create, context); // Object
		},

		exists: function(name, obj){
			// summary:
			//		determine if an object supports a given method
			// description:
			//		useful for longer api chains where you have to test each object in
			//		the chain. Useful for object and method detection.
			// name: String
			//		Path to an object, in the form "A.B.C".
			// obj: Object?
			//		Object to use as root of path. Defaults to
			//		'dojo.global'. Null may be passed.
			// example:
			//	| // define an object
			//	| var foo = {
			//	|		bar: { }
			//	| };
			//	|
			//	| // search the global scope
			//	| lang.exists("foo.bar"); // true
			//	| lang.exists("foo.bar.baz"); // false
			//	|
			//	| // search from a particular scope
			//	| lang.exists("bar", foo); // true
			//	| lang.exists("bar.baz", foo); // false
			return lang.getObject(name, false, obj) !== undefined; // Boolean
		},

		// Crockford (ish) functions

		isString: function(it){
			// summary:
			//		Return true if it is a String
			// it: anything
			//		Item to test.
			return (typeof it == "string" || it instanceof String); // Boolean
		},

		isArray: Array.isArray || function(it){
			// summary:
			//		Return true if it is an Array.
			// it: anything
			//		Item to test.
			return opts.call(it) == "[object Array]"; // Boolean
		},

		isFunction: function(it){
			// summary:
			//		Return true if it is a Function
			// it: anything
			//		Item to test.
			return opts.call(it) === "[object Function]";
		},

		isObject: function(it){
			// summary:
			//		Returns true if it is a JavaScript object (or an Array, a Function
			//		or null)
			// it: anything
			//		Item to test.
			return it !== undefined &&
				(it === null || typeof it == "object" || lang.isArray(it) || lang.isFunction(it)); // Boolean
		},

		isArrayLike: function(it){
			// summary:
			//		similar to isArray() but more permissive
			// it: anything
			//		Item to test.
			// returns:
			//		If it walks like a duck and quacks like a duck, return `true`
			// description:
			//		Doesn't strongly test for "arrayness".  Instead, settles for "isn't
			//		a string or number and has a length property". Arguments objects
			//		and DOM collections will return true when passed to
			//		isArrayLike(), but will return false when passed to
			//		isArray().
			return !!it && // Boolean
				// keep out built-in constructors (Number, String, ...) which have length
				// properties
				!lang.isString(it) && !lang.isFunction(it) &&
				!(it.tagName && it.tagName.toLowerCase() == 'form') &&
				(lang.isArray(it) || isFinite(it.length));
		},

		isAlien: function(it){
			// summary:
			//		Returns true if it is a built-in function or some other kind of
			//		oddball that *should* report as a function but doesn't
			return it && !lang.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it)); // Boolean
		},

		extend: function(ctor, props){
			// summary:
			//		Adds all properties and methods of props to constructor's
			//		prototype, making them available to all instances created with
			//		constructor.
			// ctor: Object
			//		Target constructor to extend.
			// props: Object
			//		One or more objects to mix into ctor.prototype
			for(var i=1, l=arguments.length; i<l; i++){
				lang._mixin(ctor.prototype, arguments[i]);
			}
			return ctor; // Object
		},

		_hitchArgs: function(scope, method){
			var pre = lang._toArray(arguments, 2);
			var named = lang.isString(method);
			return function(){
				// arrayify arguments
				var args = lang._toArray(arguments);
				// locate our method
				var f = named ? (scope||dojo.global)[method] : method;
				// invoke with collected args
				return f && f.apply(scope || this, pre.concat(args)); // mixed
			}; // Function
		},

		hitch: function(scope, method){
			// summary:
			//		Returns a function that will only ever execute in the given scope.
			//		This allows for easy use of object member functions
			//		in callbacks and other places in which the "this" keyword may
			//		otherwise not reference the expected scope.
			//		Any number of default positional arguments may be passed as parameters
			//		beyond "method".
			//		Each of these values will be used to "placehold" (similar to curry)
			//		for the hitched function.
			// scope: Object
			//		The scope to use when method executes. If method is a string,
			//		scope is also the object containing method.
			// method: Function|String...
			//		A function to be hitched to scope, or the name of the method in
			//		scope to be hitched.
			// example:
			//	|	lang.hitch(foo, "bar")();
			//		runs foo.bar() in the scope of foo
			// example:
			//	|	lang.hitch(foo, myFunction);
			//		returns a function that runs myFunction in the scope of foo
			// example:
			//		Expansion on the default positional arguments passed along from
			//		hitch. Passed args are mixed first, additional args after.
			//	|	var foo = { bar: function(a, b, c){ console.log(a, b, c); } };
			//	|	var fn = lang.hitch(foo, "bar", 1, 2);
			//	|	fn(3); // logs "1, 2, 3"
			// example:
			//	|	var foo = { bar: 2 };
			//	|	lang.hitch(foo, function(){ this.bar = 10; })();
			//		execute an anonymous function in scope of foo
			if(arguments.length > 2){
				return lang._hitchArgs.apply(dojo, arguments); // Function
			}
			if(!method){
				method = scope;
				scope = null;
			}
			if(lang.isString(method)){
				scope = scope || dojo.global;
				if(!scope[method]){ throw(['lang.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
				return function(){ return scope[method].apply(scope, arguments || []); }; // Function
			}
			return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
		},

		delegate: (function(){
			// boodman/crockford delegation w/ cornford optimization
			function TMP(){}
			return function(obj, props){
				TMP.prototype = obj;
				var tmp = new TMP();
				TMP.prototype = null;
				if(props){
					lang._mixin(tmp, props);
				}
				return tmp; // Object
			};
		})(),
		/*=====
		delegate: function(obj, props){
			// summary:
			//		Returns a new object which "looks" to obj for properties which it
			//		does not have a value for. Optionally takes a bag of properties to
			//		seed the returned object with initially.
			// description:
			//		This is a small implementation of the Boodman/Crockford delegation
			//		pattern in JavaScript. An intermediate object constructor mediates
			//		the prototype chain for the returned object, using it to delegate
			//		down to obj for property lookup when object-local lookup fails.
			//		This can be thought of similarly to ES4's "wrap", save that it does
			//		not act on types but rather on pure objects.
			// obj: Object
			//		The object to delegate to for properties not found directly on the
			//		return object or in props.
			// props: Object...
			//		an object containing properties to assign to the returned object
			// returns:
			//		an Object of anonymous type
			// example:
			//	|	var foo = { bar: "baz" };
			//	|	var thinger = lang.delegate(foo, { thud: "xyzzy"});
			//	|	thinger.bar == "baz"; // delegated to foo
			//	|	foo.thud == undefined; // by definition
			//	|	thinger.thud == "xyzzy"; // mixed in from props
			//	|	foo.bar = "thonk";
			//	|	thinger.bar == "thonk"; // still delegated to foo's bar
		},
		=====*/

		_toArray: has("ie") ?
			(function(){
				function slow(obj, offset, startWith){
					var arr = startWith||[];
					for(var x = offset || 0; x < obj.length; x++){
						arr.push(obj[x]);
					}
					return arr;
				}
				return function(obj){
					return ((obj.item) ? slow : efficient).apply(this, arguments);
				};
			})() : efficient,
		/*=====
		 _toArray: function(obj, offset, startWith){
			 // summary:
			 //		Converts an array-like object (i.e. arguments, DOMCollection) to an
			 //		array. Returns a new Array with the elements of obj.
			 // obj: Object
			 //		the object to "arrayify". We expect the object to have, at a
			 //		minimum, a length property which corresponds to integer-indexed
			 //		properties.
			 // offset: Number?
			 //		the location in obj to start iterating from. Defaults to 0.
			 //		Optional.
			 // startWith: Array?
			 //		An array to pack with the properties of obj. If provided,
			 //		properties in obj are appended at the end of startWith and
			 //		startWith is the returned array.
		 },
		 =====*/

		partial: function(/*Function|String*/ method /*, ...*/){
			// summary:
			//		similar to hitch() except that the scope object is left to be
			//		whatever the execution context eventually becomes.
			// description:
			//		Calling lang.partial is the functional equivalent of calling:
			//		|	lang.hitch(null, funcName, ...);
			// method:
			//		The function to "wrap"
			var arr = [ null ];
			return lang.hitch.apply(dojo, arr.concat(lang._toArray(arguments))); // Function
		},

		clone: function(/*anything*/ src){
			// summary:
			//		Clones objects (including DOM nodes) and all children.
			//		Warning: do not clone cyclic structures.
			// src:
			//		The object to clone
			if(!src || typeof src != "object" || lang.isFunction(src)){
				// null, undefined, any non-object, or function
				return src;	// anything
			}
			if(src.nodeType && "cloneNode" in src){
				// DOM Node
				return src.cloneNode(true); // Node
			}
			if(src instanceof Date){
				// Date
				return new Date(src.getTime());	// Date
			}
			if(src instanceof RegExp){
				// RegExp
				return new RegExp(src);   // RegExp
			}
			var r, i, l;
			if(lang.isArray(src)){
				// array
				r = [];
				for(i = 0, l = src.length; i < l; ++i){
					if(i in src){
						r[i] = lang.clone(src[i]);
					}
				}
				// we don't clone functions for performance reasons
				//		}else if(d.isFunction(src)){
				//			// function
				//			r = function(){ return src.apply(this, arguments); };
			}else{
				// generic objects
				r = src.constructor ? new src.constructor() : {};
			}
			return lang._mixin(r, src, lang.clone);
		},


		trim: String.prototype.trim ?
			function(str){ return str.trim(); } :
			function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); },
		/*=====
		 trim: function(str){
			 // summary:
			 //		Trims whitespace from both sides of the string
			 // str: String
			 //		String to be trimmed
			 // returns: String
			 //		Returns the trimmed string
			 // description:
			 //		This version of trim() was selected for inclusion into the base due
			 //		to its compact size and relatively good performance
			 //		(see [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript)
			 //		Uses String.prototype.trim instead, if available.
			 //		The fastest but longest version of this function is located at
			 //		lang.string.trim()
		 },
		 =====*/

		replace: function(tmpl, map, pattern){
			// summary:
			//		Performs parameterized substitutions on a string. Throws an
			//		exception if any parameter is unmatched.
			// tmpl: String
			//		String to be used as a template.
			// map: Object|Function
			//		If an object, it is used as a dictionary to look up substitutions.
			//		If a function, it is called for every substitution with following parameters:
			//		a whole match, a name, an offset, and the whole template
			//		string (see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/replace
			//		for more details).
			// pattern: RegEx?
			//		Optional regular expression objects that overrides the default pattern.
			//		Must be global and match one item. The default is: /\{([^\}]+)\}/g,
			//		which matches patterns like that: "{xxx}", where "xxx" is any sequence
			//		of characters, which doesn't include "}".
			// returns: String
			//		Returns the substituted string.
			// example:
			//	|	// uses a dictionary for substitutions:
			//	|	lang.replace("Hello, {name.first} {name.last} AKA {nick}!",
			//	|		{
			//	|			nick: "Bob",
			//	|			name: {
			//	|				first:	"Robert",
			//	|				middle: "X",
			//	|				last:		"Cringely"
			//	|			}
			//	|		});
			//	|	// returns: Hello, Robert Cringely AKA Bob!
			// example:
			//	|	// uses an array for substitutions:
			//	|	lang.replace("Hello, {0} {2}!",
			//	|		["Robert", "X", "Cringely"]);
			//	|	// returns: Hello, Robert Cringely!
			// example:
			//	|	// uses a function for substitutions:
			//	|	function sum(a){
			//	|		var t = 0;
			//	|		arrayforEach(a, function(x){ t += x; });
			//	|		return t;
			//	|	}
			//	|	lang.replace(
			//	|		"{count} payments averaging {avg} USD per payment.",
			//	|		lang.hitch(
			//	|			{ payments: [11, 16, 12] },
			//	|			function(_, key){
			//	|				switch(key){
			//	|					case "count": return this.payments.length;
			//	|					case "min":		return Math.min.apply(Math, this.payments);
			//	|					case "max":		return Math.max.apply(Math, this.payments);
			//	|					case "sum":		return sum(this.payments);
			//	|					case "avg":		return sum(this.payments) / this.payments.length;
			//	|				}
			//	|			}
			//	|		)
			//	|	);
			//	|	// prints: 3 payments averaging 13 USD per payment.
			// example:
			//	|	// uses an alternative PHP-like pattern for substitutions:
			//	|	lang.replace("Hello, ${0} ${2}!",
			//	|		["Robert", "X", "Cringely"], /\$\{([^\}]+)\}/g);
			//	|	// returns: Hello, Robert Cringely!

			return tmpl.replace(pattern || _pattern, lang.isFunction(map) ?
				map : function(_, k){ return lang.getObject(k, false, map); });
		}
	};

	 1  && lang.mixin(dojo, lang);

	return lang;
});

},
'dojo/request/util':function(){
define([
	'exports',
	'../errors/RequestError',
	'../errors/CancelError',
	'../Deferred',
	'../io-query',
	'../_base/array',
	'../_base/lang',
	'../promise/Promise',
	'../has'
], function(exports, RequestError, CancelError, Deferred, ioQuery, array, lang, Promise, has){

	function isArrayBuffer(value) {
		return has('native-arraybuffer') && value instanceof ArrayBuffer
	}

	function isBlob(value) {
		return has('native-blob') && value instanceof Blob
	}
	
	function isElement(value) {
		if(typeof Element !== 'undefined') { //all other
			return value instanceof Element;
		}

		//IE<=7
		return value.nodeType === 1;
	}

	function isFormData(value) {
		return has('native-formdata') && value instanceof FormData;
	}

	function shouldDeepCopy(value) {
		return value &&
			typeof value === 'object' &&
			!isFormData(value) &&
			!isElement(value) &&
			!isBlob(value) &&
			!isArrayBuffer(value)
	}

	exports.deepCopy = function(target, source) {
		for (var name in source) {
			var tval = target[name],
  			    sval = source[name];
			if (name !== '__proto__' && tval !== sval) {
				if (shouldDeepCopy(sval)) {
					if (Object.prototype.toString.call(sval) === '[object Date]') { // use this date test to handle crossing frame boundaries
						target[name] = new Date(sval);
					} else if (lang.isArray(sval)) {
 						  target[name] = exports.deepCopyArray(sval);
					} else {
						if (tval && typeof tval === 'object') {
							exports.deepCopy(tval, sval);
						} else {
							target[name] = exports.deepCopy({}, sval);
						}
					}
				} else {
					target[name] = sval;
				}
			}
		}
		return target;
	};

	exports.deepCopyArray = function(source) {
		var clonedArray = [];
		for (var i = 0, l = source.length; i < l; i++) {
			var svalItem = source[i];
			if (typeof svalItem === 'object') {
				clonedArray.push(exports.deepCopy({}, svalItem));
			} else {
				clonedArray.push(svalItem);
			}
		}

		return clonedArray;
	};

	exports.deepCreate = function deepCreate(source, properties){
		properties = properties || {};
		var target = lang.delegate(source),
			name, value;

		for(name in source){
			value = source[name];

			if(value && typeof value === 'object'){
				target[name] = exports.deepCreate(value, properties[name]);
			}
		}
		return exports.deepCopy(target, properties);
	};

	var freeze = Object.freeze || function(obj){ return obj; };
	function okHandler(response){
		return freeze(response);
	}
	function dataHandler (response) {
		return response.data !== undefined ? response.data : response.text;
	}

	exports.deferred = function deferred(response, cancel, isValid, isReady, handleResponse, last){
		var def = new Deferred(function(reason){
			cancel && cancel(def, response);

			if(!reason || !(reason instanceof RequestError) && !(reason instanceof CancelError)){
				return new CancelError('Request canceled', response);
			}
			return reason;
		});

		def.response = response;
		def.isValid = isValid;
		def.isReady = isReady;
		def.handleResponse = handleResponse;

		function errHandler(error){
			error.response = response;
			throw error;
		}
		var responsePromise = def.then(okHandler).otherwise(errHandler);

		if(exports.notify){
			responsePromise.then(
				lang.hitch(exports.notify, 'emit', 'load'),
				lang.hitch(exports.notify, 'emit', 'error')
			);
		}

		var dataPromise = responsePromise.then(dataHandler);

		// http://bugs.dojotoolkit.org/ticket/16794
		// The following works around a leak in IE9 through the
		// prototype using lang.delegate on dataPromise and
		// assigning the result a property with a reference to
		// responsePromise.
		var promise = new Promise();
		for (var prop in dataPromise) {
			if (dataPromise.hasOwnProperty(prop)) {
				promise[prop] = dataPromise[prop];
			}
		}
		promise.response = responsePromise;
		freeze(promise);
		// End leak fix


		if(last){
			def.then(function(response){
				last.call(def, response);
			}, function(error){
				last.call(def, response, error);
			});
		}

		def.promise = promise;
		def.then = promise.then;

		return def;
	};

	exports.addCommonMethods = function addCommonMethods(provider, methods){
		array.forEach(methods||['GET', 'POST', 'PUT', 'DELETE'], function(method){
			provider[(method === 'DELETE' ? 'DEL' : method).toLowerCase()] = function(url, options){
				options = lang.delegate(options||{});
				options.method = method;
				return provider(url, options);
			};
		});
	};

	exports.parseArgs = function parseArgs(url, options, skipData){
		var data = options.data,
			query = options.query;

		if(data && !skipData){
			if(typeof data === 'object' && (!(has('native-xhr2')) || !(isArrayBuffer(data) || isBlob(data) ))){
				options.data = ioQuery.objectToQuery(data);
			}
		}

		if(query){
			if(typeof query === 'object'){
				query = ioQuery.objectToQuery(query);
			}
			if(options.preventCache){
				query += (query ? '&' : '') + 'request.preventCache=' + (+(new Date));
			}
		}else if(options.preventCache){
			query = 'request.preventCache=' + (+(new Date));
		}

		if(url && query){
			url += (~url.indexOf('?') ? '&' : '?') + query;
		}

		return {
			url: url,
			options: options,
			getHeader: function(headerName){ return null; }
		};
	};

	exports.checkStatus = function(stat){
		stat = stat || 0;
		return (stat >= 200 && stat < 300) || // allow any 2XX response code
			stat === 304 ||                 // or, get it out of the cache
			stat === 1223 ||                // or, Internet Explorer mangled the status code
			!stat;                         // or, we're Titanium/browser chrome/chrome extension requesting a local file
	};
});

},
'dojo/Evented':function(){
define(["./aspect", "./on"], function(aspect, on){
	// module:
	//		dojo/Evented

 	"use strict";
 	var after = aspect.after;
	function Evented(){
		// summary:
		//		A class that can be used as a mixin or base class,
		//		to add on() and emit() methods to a class
		//		for listening for events and emitting events:
		// example:
		//		|	define(["dojo/Evented", "dojo/_base/declare", "dojo/Stateful"
		//		|	], function(Evented, declare, Stateful){
		//		|		var EventedStateful = declare([Evented, Stateful], {...});
		//		|		var instance = new EventedStateful();
		//		|		instance.on("open", function(event){
		//		|		... do something with event
		//		|	 });
		//		|
		//		|	instance.emit("open", {name:"some event", ...});
	}
	Evented.prototype = {
		on: function(type, listener){
			return on.parse(this, type, listener, function(target, type){
				return after(target, 'on' + type, listener, true);
			});
		},
		emit: function(type, event){
			var args = [this];
			args.push.apply(args, arguments);
			return on.emit.apply(on, args);
		}
	};
	return Evented;
});

},
'dojo/mouse':function(){
define(["./_base/kernel", "./on", "./has", "./dom", "./_base/window"], function(dojo, on, has, dom, win){

	// module:
	//		dojo/mouse

    has.add("dom-quirks", win.doc && win.doc.compatMode == "BackCompat");
	has.add("events-mouseenter", win.doc && "onmouseenter" in win.doc.createElement("div"));
	has.add("events-mousewheel", win.doc && 'onmousewheel' in win.doc);

	var mouseButtons;
	if((has("dom-quirks") && has("ie")) || !has("dom-addeventlistener")){
		mouseButtons = {
			LEFT:   1,
			MIDDLE: 4,
			RIGHT:  2,
			// helper functions
			isButton: function(e, button){ return e.button & button; },
			isLeft:   function(e){ return e.button & 1; },
			isMiddle: function(e){ return e.button & 4; },
			isRight:  function(e){ return e.button & 2; }
		};
	}else{
		mouseButtons = {
			LEFT:   0,
			MIDDLE: 1,
			RIGHT:  2,
			// helper functions
			isButton: function(e, button){ return e.button == button; },
			isLeft:   function(e){ return e.button == 0; },
			isMiddle: function(e){ return e.button == 1; },
			isRight:  function(e){ return e.button == 2; }
		};
	}
	dojo.mouseButtons = mouseButtons;

/*=====
	dojo.mouseButtons = {
		// LEFT: Number
		//		Numeric value of the left mouse button for the platform.
		LEFT:   0,
		// MIDDLE: Number
		//		Numeric value of the middle mouse button for the platform.
		MIDDLE: 1,
		// RIGHT: Number
		//		Numeric value of the right mouse button for the platform.
		RIGHT:  2,

		isButton: function(e, button){
			// summary:
			//		Checks an event object for a pressed button
			// e: Event
			//		Event object to examine
			// button: Number
			//		The button value (example: dojo.mouseButton.LEFT)
			return e.button == button; // Boolean
		},
		isLeft: function(e){
			// summary:
			//		Checks an event object for the pressed left button
			// e: Event
			//		Event object to examine
			return e.button == 0; // Boolean
		},
		isMiddle: function(e){
			// summary:
			//		Checks an event object for the pressed middle button
			// e: Event
			//		Event object to examine
			return e.button == 1; // Boolean
		},
		isRight: function(e){
			// summary:
			//		Checks an event object for the pressed right button
			// e: Event
			//		Event object to examine
			return e.button == 2; // Boolean
		}
	};
=====*/

	function eventHandler(type, selectHandler){
		// emulation of mouseenter/leave with mouseover/out using descendant checking
		var handler = function(node, listener){
			return on(node, type, function(evt){
				if(selectHandler){
					return selectHandler(evt, listener);
				}
				if(!dom.isDescendant(evt.relatedTarget, node)){
					return listener.call(this, evt);
				}
			});
		};
		handler.bubble = function(select){
			return eventHandler(type, function(evt, listener){
				// using a selector, use the select function to determine if the mouse moved inside the selector and was previously outside the selector
				var target = select(evt.target);
				var relatedTarget = evt.relatedTarget;
				if(target && (target != (relatedTarget && relatedTarget.nodeType == 1 && select(relatedTarget)))){
					return listener.call(target, evt);
				} 
			});
		};
		return handler;
	}
	var wheel;
	if(has("events-mousewheel")){
		wheel = 'mousewheel';
	}else{ //firefox
		wheel = function(node, listener){
			return on(node, 'DOMMouseScroll', function(evt){
				evt.wheelDelta = -evt.detail;
				listener.call(this, evt);
			});
		};
	}
	return {
		// summary:
		//		This module provide mouse event handling utility functions and exports
		//		mouseenter and mouseleave event emulation.
		// example:
		//		To use these events, you register a mouseenter like this:
		//		|	define(["dojo/on", "dojo/mouse"], function(on, mouse){
		//		|		on(targetNode, mouse.enter, function(event){
		//		|			dojo.addClass(targetNode, "highlighted");
		//		|		});
		//		|		on(targetNode, mouse.leave, function(event){
		//		|			dojo.removeClass(targetNode, "highlighted");
		//		|		});

		_eventHandler: eventHandler,		// for dojo/touch

		// enter: Synthetic Event
		//		This is an extension event for the mouseenter that IE provides, emulating the
		//		behavior on other browsers.
		enter: eventHandler("mouseover"),

		// leave: Synthetic Event
		//		This is an extension event for the mouseleave that IE provides, emulating the
		//		behavior on other browsers.
		leave: eventHandler("mouseout"),

		// wheel: Normalized Mouse Wheel Event
		//		This is an extension event for the mousewheel that non-Mozilla browsers provide,
		//		emulating the behavior on Mozilla based browsers.
		wheel: wheel,

		isLeft: mouseButtons.isLeft,
		/*=====
		isLeft: function(){
			// summary:
			//		Test an event object (from a mousedown event) to see if the left button was pressed.
		},
		=====*/

		isMiddle: mouseButtons.isMiddle,
		/*=====
		 isMiddle: function(){
			 // summary:
			 //		Test an event object (from a mousedown event) to see if the middle button was pressed.
		 },
		 =====*/

		isRight: mouseButtons.isRight
		/*=====
		 , isRight: function(){
			 // summary:
			 //		Test an event object (from a mousedown event) to see if the right button was pressed.
		 }
		 =====*/
	};
});

},
'dojo/topic':function(){
define(["./Evented"], function(Evented){

	// module:
	//		dojo/topic

	var hub = new Evented;
	return {
		// summary:
		//		Pubsub hub.
		// example:
		//		| 	topic.subscribe("some/topic", function(event){
		//		|	... do something with event
		//		|	});
		//		|	topic.publish("some/topic", {name:"some event", ...});

		publish: function(topic, event){
			// summary:
			//		Publishes a message to a topic on the pub/sub hub. All arguments after
			//		the first will be passed to the subscribers, so any number of arguments
			//		can be provided (not just event).
			// topic: String
			//		The name of the topic to publish to
			// event: Object
			//		An event to distribute to the topic listeners
			return hub.emit.apply(hub, arguments);
		},

		subscribe: function(topic, listener){
			// summary:
			//		Subscribes to a topic on the pub/sub hub
			// topic: String
			//		The topic to subscribe to
			// listener: Function
			//		A function to call when a message is published to the given topic
			return hub.on.apply(hub, arguments);
		}
	};
});

},
'dojo/_base/xhr':function(){
define([
	"./kernel",
	"./sniff",
	"require",
	"../io-query",
	/*===== "./declare", =====*/
	"../dom",
	"../dom-form",
	"./Deferred",
	"./config",
	"./json",
	"./lang",
	"./array",
	"../on",
	"../aspect",
	"../request/watch",
	"../request/xhr",
	"../request/util"
], function(dojo, has, require, ioq, /*===== declare, =====*/ dom, domForm, Deferred, config, json, lang, array, on, aspect, watch, _xhr, util){
	// module:
	//		dojo/_base/xhr

	/*=====
	dojo._xhrObj = function(){
		// summary:
		//		does the work of portably generating a new XMLHTTPRequest object.
	};
	=====*/
	dojo._xhrObj = _xhr._create;

	var cfg = dojo.config;

	// mix in io-query and dom-form
	dojo.objectToQuery = ioq.objectToQuery;
	dojo.queryToObject = ioq.queryToObject;
	dojo.fieldToObject = domForm.fieldToObject;
	dojo.formToObject = domForm.toObject;
	dojo.formToQuery = domForm.toQuery;
	dojo.formToJson = domForm.toJson;

	// need to block async callbacks from snatching this thread as the result
	// of an async callback might call another sync XHR, this hangs khtml forever
	// must checked by watchInFlight()

	dojo._blockAsync = false;

	// MOW: remove dojo._contentHandlers alias in 2.0
	var handlers = dojo._contentHandlers = dojo.contentHandlers = {
		// summary:
		//		A map of available XHR transport handle types. Name matches the
		//		`handleAs` attribute passed to XHR calls.
		// description:
		//		A map of available XHR transport handle types. Name matches the
		//		`handleAs` attribute passed to XHR calls. Each contentHandler is
		//		called, passing the xhr object for manipulation. The return value
		//		from the contentHandler will be passed to the `load` or `handle`
		//		functions defined in the original xhr call.
		// example:
		//		Creating a custom content-handler:
		//	|	xhr.contentHandlers.makeCaps = function(xhr){
		//	|		return xhr.responseText.toUpperCase();
		//	|	}
		//	|	// and later:
		//	|	dojo.xhrGet({
		//	|		url:"foo.txt",
		//	|		handleAs:"makeCaps",
		//	|		load: function(data){ /* data is a toUpper version of foo.txt */ }
		//	|	});

		"text": function(xhr){
			// summary:
			//		A contentHandler which simply returns the plaintext response data
			return xhr.responseText;
		},
		"json": function(xhr){
			// summary:
			//		A contentHandler which returns a JavaScript object created from the response data
			return json.fromJson(xhr.responseText || null);
		},
		"json-comment-filtered": function(xhr){
			// summary:
			//		A contentHandler which expects comment-filtered JSON.
			// description:
			//		A contentHandler which expects comment-filtered JSON.
			//		the json-comment-filtered option was implemented to prevent
			//		"JavaScript Hijacking", but it is less secure than standard JSON. Use
			//		standard JSON instead. JSON prefixing can be used to subvert hijacking.
			//
			//		Will throw a notice suggesting to use application/json mimetype, as
			//		json-commenting can introduce security issues. To decrease the chances of hijacking,
			//		use the standard `json` contentHandler, and prefix your "JSON" with: {}&&
			//
			//		use djConfig.useCommentedJson = true to turn off the notice
			if(!config.useCommentedJson){
				console.warn("Consider using the standard mimetype:application/json."
					+ " json-commenting can introduce security issues. To"
					+ " decrease the chances of hijacking, use the standard the 'json' handler and"
					+ " prefix your json with: {}&&\n"
					+ "Use djConfig.useCommentedJson=true to turn off this message.");
			}

			var value = xhr.responseText;
			var cStartIdx = value.indexOf("\/*");
			var cEndIdx = value.lastIndexOf("*\/");
			if(cStartIdx == -1 || cEndIdx == -1){
				throw new Error("JSON was not comment filtered");
			}
			return json.fromJson(value.substring(cStartIdx+2, cEndIdx));
		},
		"javascript": function(xhr){
			// summary:
			//		A contentHandler which evaluates the response data, expecting it to be valid JavaScript

			// FIXME: try Moz and IE specific eval variants?
			return dojo.eval(xhr.responseText);
		},
		"xml": function(xhr){
			// summary:
			//		A contentHandler returning an XML Document parsed from the response data
			var result = xhr.responseXML;

			if(result && has("dom-qsa2.1") && !result.querySelectorAll && has("dom-parser")){
				// http://bugs.dojotoolkit.org/ticket/15631
				// IE9 supports a CSS3 querySelectorAll implementation, but the DOM implementation
				// returned by IE9 xhr.responseXML does not. Manually create the XML DOM to gain
				// the fuller-featured implementation and avoid bugs caused by the inconsistency
				result = new DOMParser().parseFromString(xhr.responseText, "application/xml");
			}

			if(has("ie")){
				if((!result || !result.documentElement)){
					//WARNING: this branch used by the xml handling in dojo.io.iframe,
					//so be sure to test dojo.io.iframe if making changes below.
					var ms = function(n){ return "MSXML" + n + ".DOMDocument"; };
					var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
					array.some(dp, function(p){
						try{
							var dom = new ActiveXObject(p);
							dom.async = false;
							dom.loadXML(xhr.responseText);
							result = dom;
						}catch(e){ return false; }
						return true;
					});
				}
			}
			return result; // DOMDocument
		},
		"json-comment-optional": function(xhr){
			// summary:
			//		A contentHandler which checks the presence of comment-filtered JSON and
			//		alternates between the `json` and `json-comment-filtered` contentHandlers.
			if(xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)){
				return handlers["json-comment-filtered"](xhr);
			}else{
				return handlers["json"](xhr);
			}
		}
	};

	/*=====

	// kwargs function parameter definitions.   Assigning to dojo namespace rather than making them local variables
	// because they are used by dojo/io modules too

	dojo.__IoArgs = declare(null, {
		// url: String
		//		URL to server endpoint.
		// content: Object?
		//		Contains properties with string values. These
		//		properties will be serialized as name1=value2 and
		//		passed in the request.
		// timeout: Integer?
		//		Milliseconds to wait for the response. If this time
		//		passes, the then error callbacks are called.
		// form: DOMNode?
		//		DOM node for a form. Used to extract the form values
		//		and send to the server.
		// preventCache: Boolean?
		//		Default is false. If true, then a
		//		"dojo.preventCache" parameter is sent in the request
		//		with a value that changes with each request
		//		(timestamp). Useful only with GET-type requests.
		// handleAs: String?
		//		Acceptable values depend on the type of IO
		//		transport (see specific IO calls for more information).
		// rawBody: String?
		//		Sets the raw body for an HTTP request. If this is used, then the content
		//		property is ignored. This is mostly useful for HTTP methods that have
		//		a body to their requests, like PUT or POST. This property can be used instead
		//		of postData and putData for dojo/_base/xhr.rawXhrPost and dojo/_base/xhr.rawXhrPut respectively.
		// ioPublish: Boolean?
		//		Set this explicitly to false to prevent publishing of topics related to
		//		IO operations. Otherwise, if djConfig.ioPublish is set to true, topics
		//		will be published via dojo/topic.publish() for different phases of an IO operation.
		//		See dojo/main.__IoPublish for a list of topics that are published.

		load: function(response, ioArgs){
			// summary:
			//		This function will be
			//		called on a successful HTTP response code.
	 		// ioArgs: dojo/main.__IoCallbackArgs
			//		Provides additional information about the request.
			// response: Object
			//		The response in the format as defined with handleAs.
		},

		error: function(response, ioArgs){
			// summary:
			//		This function will
			//		be called when the request fails due to a network or server error, the url
			//		is invalid, etc. It will also be called if the load or handle callback throws an
			//		exception, unless djConfig.debugAtAllCosts is true.	 This allows deployed applications
			//		to continue to run even when a logic error happens in the callback, while making
			//		it easier to troubleshoot while in debug mode.
			// ioArgs: dojo/main.__IoCallbackArgs
			//		Provides additional information about the request.
			// response: Object
			//		The response in the format as defined with handleAs.
		},

		handle: function(loadOrError, response, ioArgs){
			// summary:
	 		//		This function will
	 		//		be called at the end of every request, whether or not an error occurs.
			// loadOrError: String
			//		Provides a string that tells you whether this function
			//		was called because of success (load) or failure (error).
			// response: Object
			//		The response in the format as defined with handleAs.
			// ioArgs: dojo/main.__IoCallbackArgs
			//		Provides additional information about the request.
		}
	});

	dojo.__IoCallbackArgs = declare(null, {
		// args: Object
		//		the original object argument to the IO call.
		// xhr: XMLHttpRequest
		//		For XMLHttpRequest calls only, the
		//		XMLHttpRequest object that was used for the
		//		request.
		// url: String
		//		The final URL used for the call. Many times it
		//		will be different than the original args.url
		//		value.
		// query: String
		//		For non-GET requests, the
		//		name1=value1&name2=value2 parameters sent up in
		//		the request.
		// handleAs: String
		//		The final indicator on how the response will be
		//		handled.
		// id: String
		//		For dojo/io/script calls only, the internal
		//		script ID used for the request.
		// canDelete: Boolean
		//		For dojo/io/script calls only, indicates
		//		whether the script tag that represents the
		//		request can be deleted after callbacks have
		//		been called. Used internally to know when
		//		cleanup can happen on JSONP-type requests.
		// json: Object
		//		For dojo/io/script calls only: holds the JSON
		//		response for JSONP-type requests. Used
		//		internally to hold on to the JSON responses.
		//		You should not need to access it directly --
		//		the same object should be passed to the success
		//		callbacks directly.
	});

	dojo.__IoPublish = declare(null, {
		// summary:
		//		This is a list of IO topics that can be published
		//		if djConfig.ioPublish is set to true. IO topics can be
		//		published for any Input/Output, network operation. So,
		//		dojo.xhr, dojo.io.script and dojo.io.iframe can all
		//		trigger these topics to be published.
		// start: String
		//		"/dojo/io/start" is sent when there are no outstanding IO
		//		requests, and a new IO request is started. No arguments
		//		are passed with this topic.
		// send: String
		//		"/dojo/io/send" is sent whenever a new IO request is started.
		//		It passes the dojo.Deferred for the request with the topic.
		// load: String
		//		"/dojo/io/load" is sent whenever an IO request has loaded
		//		successfully. It passes the response and the dojo.Deferred
		//		for the request with the topic.
		// error: String
		//		"/dojo/io/error" is sent whenever an IO request has errored.
		//		It passes the error and the dojo.Deferred
		//		for the request with the topic.
		// done: String
		//		"/dojo/io/done" is sent whenever an IO request has completed,
		//		either by loading or by erroring. It passes the error and
		//		the dojo.Deferred for the request with the topic.
		// stop: String
		//		"/dojo/io/stop" is sent when all outstanding IO requests have
		//		finished. No arguments are passed with this topic.
	});
	=====*/


	dojo._ioSetArgs = function(/*dojo/main.__IoArgs*/args,
			/*Function*/canceller,
			/*Function*/okHandler,
			/*Function*/errHandler){
		// summary:
		//		sets up the Deferred and ioArgs property on the Deferred so it
		//		can be used in an io call.
		// args:
		//		The args object passed into the public io call. Recognized properties on
		//		the args object are:
		// canceller:
		//		The canceller function used for the Deferred object. The function
		//		will receive one argument, the Deferred object that is related to the
		//		canceller.
		// okHandler:
		//		The first OK callback to be registered with Deferred. It has the opportunity
		//		to transform the OK response. It will receive one argument -- the Deferred
		//		object returned from this function.
		// errHandler:
		//		The first error callback to be registered with Deferred. It has the opportunity
		//		to do cleanup on an error. It will receive two arguments: error (the
		//		Error object) and dfd, the Deferred object returned from this function.

		var ioArgs = {args: args, url: args.url};

		//Get values from form if requested.
		var formObject = null;
		if(args.form){
			var form = dom.byId(args.form);
			//IE requires going through getAttributeNode instead of just getAttribute in some form cases,
			//so use it for all. See #2844
			var actnNode = form.getAttributeNode("action");
			ioArgs.url = ioArgs.url || (actnNode ? actnNode.value : (dojo.doc ? dojo.doc.URL : null));
			formObject = domForm.toObject(form);
		}

		// set up the query params
		var miArgs = {};

		if(formObject){
			// potentially over-ride url-provided params w/ form values
			lang.mixin(miArgs, formObject);
		}
		if(args.content){
			// stuff in content over-rides what's set by form
			lang.mixin(miArgs, args.content);
		}
		if(args.preventCache){
			miArgs["dojo.preventCache"] = new Date().valueOf();
		}
		ioArgs.query = ioq.objectToQuery(miArgs);

		// .. and the real work of getting the deferred in order, etc.
		ioArgs.handleAs = args.handleAs || "text";
		var d = new Deferred(function(dfd){
			dfd.canceled = true;
			canceller && canceller(dfd);

			var err = dfd.ioArgs.error;
			if(!err){
				err = new Error("request cancelled");
				err.dojoType="cancel";
				dfd.ioArgs.error = err;
			}
			return err;
		});
		d.addCallback(okHandler);

		//Support specifying load, error and handle callback functions from the args.
		//For those callbacks, the "this" object will be the args object.
		//The callbacks will get the deferred result value as the
		//first argument and the ioArgs object as the second argument.
		var ld = args.load;
		if(ld && lang.isFunction(ld)){
			d.addCallback(function(value){
				return ld.call(args, value, ioArgs);
			});
		}
		var err = args.error;
		if(err && lang.isFunction(err)){
			d.addErrback(function(value){
				return err.call(args, value, ioArgs);
			});
		}
		var handle = args.handle;
		if(handle && lang.isFunction(handle)){
			d.addBoth(function(value){
				return handle.call(args, value, ioArgs);
			});
		}

		// Attach error handler last (not including topic publishing)
		// to catch any errors that may have been generated from load
		// or handle functions.
		d.addErrback(function(error){
			return errHandler(error, d);
		});

		//Plug in topic publishing, if dojo.publish is loaded.
		if(cfg.ioPublish && dojo.publish && ioArgs.args.ioPublish !== false){
			d.addCallbacks(
				function(res){
					dojo.publish("/dojo/io/load", [d, res]);
					return res;
				},
				function(res){
					dojo.publish("/dojo/io/error", [d, res]);
					return res;
				}
			);
			d.addBoth(function(res){
				dojo.publish("/dojo/io/done", [d, res]);
				return res;
			});
		}

		d.ioArgs = ioArgs;

		// FIXME: need to wire up the xhr object's abort method to something
		// analogous in the Deferred
		return d;
	};

	var _deferredOk = function(/*Deferred*/dfd){
		// summary:
		//		okHandler function for dojo._ioSetArgs call.

		var ret = handlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
		return ret === undefined ? null : ret;
	};
	var _deferError = function(/*Error*/error, /*Deferred*/dfd){
		// summary:
		//		errHandler function for dojo._ioSetArgs call.

		if(!dfd.ioArgs.args.failOk){
			console.error(error);
		}
		return error;
	};

	//Use a separate count for knowing if we are starting/stopping io calls.
	var _checkPubCount = function(dfd){
		if(_pubCount <= 0){
			_pubCount = 0;
			if(cfg.ioPublish && dojo.publish && (!dfd || dfd && dfd.ioArgs.args.ioPublish !== false)){
				dojo.publish("/dojo/io/stop");
			}
		}
	};

	var _pubCount = 0;
	aspect.after(watch, "_onAction", function(){
		_pubCount -= 1;
	});
	aspect.after(watch, "_onInFlight", _checkPubCount);

	dojo._ioCancelAll = watch.cancelAll;
	/*=====
	dojo._ioCancelAll = function(){
		// summary:
		//		Cancels all pending IO requests, regardless of IO type
		//		(xhr, script, iframe).
	};
	=====*/

	dojo._ioNotifyStart = function(/*Deferred*/dfd){
		// summary:
		//		If dojo.publish is available, publish topics
		//		about the start of a request queue and/or the
		//		the beginning of request.
		//
		//		Used by IO transports. An IO transport should
		//		call this method before making the network connection.
		if(cfg.ioPublish && dojo.publish && dfd.ioArgs.args.ioPublish !== false){
			if(!_pubCount){
				dojo.publish("/dojo/io/start");
			}
			_pubCount += 1;
			dojo.publish("/dojo/io/send", [dfd]);
		}
	};

	dojo._ioWatch = function(dfd, validCheck, ioCheck, resHandle){
		// summary:
		//		Watches the io request represented by dfd to see if it completes.
		// dfd: Deferred
		//		The Deferred object to watch.
		// validCheck: Function
		//		Function used to check if the IO request is still valid. Gets the dfd
		//		object as its only argument.
		// ioCheck: Function
		//		Function used to check if basic IO call worked. Gets the dfd
		//		object as its only argument.
		// resHandle: Function
		//		Function used to process response. Gets the dfd
		//		object as its only argument.

		var args = dfd.ioArgs.options = dfd.ioArgs.args;
		lang.mixin(dfd, {
			response: dfd.ioArgs,
			isValid: function(response){
				return validCheck(dfd);
			},
			isReady: function(response){
				return ioCheck(dfd);
			},
			handleResponse: function(response){
				return resHandle(dfd);
			}
		});
		watch(dfd);

		_checkPubCount(dfd);
	};

	var _defaultContentType = "application/x-www-form-urlencoded";

	dojo._ioAddQueryToUrl = function(/*dojo.__IoCallbackArgs*/ioArgs){
		// summary:
		//		Adds query params discovered by the io deferred construction to the URL.
		//		Only use this for operations which are fundamentally GET-type operations.
		if(ioArgs.query.length){
			ioArgs.url += (ioArgs.url.indexOf("?") == -1 ? "?" : "&") + ioArgs.query;
			ioArgs.query = null;
		}
	};

	/*=====
	dojo.__XhrArgs = declare(dojo.__IoArgs, {
		// summary:
		//		In addition to the properties listed for the dojo._IoArgs type,
		//		the following properties are allowed for dojo.xhr* methods.
		// handleAs: String?
		//		Acceptable values are: text (default), json, json-comment-optional,
		//		json-comment-filtered, javascript, xml. See `dojo/_base/xhr.contentHandlers`
	 	// sync: Boolean?
		//		false is default. Indicates whether the request should
		//		be a synchronous (blocking) request.
		// headers: Object?
		//		Additional HTTP headers to send in the request.
		// failOk: Boolean?
		//		false is default. Indicates whether a request should be
		//		allowed to fail (and therefore no console error message in
		//		the event of a failure)
		// contentType: String|Boolean
		//		"application/x-www-form-urlencoded" is default. Set to false to
		//		prevent a Content-Type header from being sent, or to a string
		//		to send a different Content-Type.
	 });
	=====*/

	dojo.xhr = function(/*String*/ method, /*dojo.__XhrArgs*/ args, /*Boolean?*/ hasBody){
		// summary:
		//		Deprecated.   Use dojo/request instead.
		// description:
		//		Sends an HTTP request with the given method.
		//		See also dojo.xhrGet(), xhrPost(), xhrPut() and dojo.xhrDelete() for shortcuts
		//		for those HTTP methods. There are also methods for "raw" PUT and POST methods
		//		via dojo.rawXhrPut() and dojo.rawXhrPost() respectively.
		// method:
		//		HTTP method to be used, such as GET, POST, PUT, DELETE. Should be uppercase.
		// hasBody:
		//		If the request has an HTTP body, then pass true for hasBody.

		var rDfd;
		//Make the Deferred object for this xhr request.
		var dfd = dojo._ioSetArgs(args, function(dfd){
			rDfd && rDfd.cancel();
		}, _deferredOk, _deferError);
		var ioArgs = dfd.ioArgs;

		//Allow for specifying the HTTP body completely.
		if("postData" in args){
			ioArgs.query = args.postData;
		}else if("putData" in args){
			ioArgs.query = args.putData;
		}else if("rawBody" in args){
			ioArgs.query = args.rawBody;
		}else if((arguments.length > 2 && !hasBody) || "POST|PUT".indexOf(method.toUpperCase()) === -1){
			//Check for hasBody being passed. If no hasBody,
			//then only append query string if not a POST or PUT request.
			dojo._ioAddQueryToUrl(ioArgs);
		}

		var options = {
			method: method,
			handleAs: "text",
			timeout: args.timeout,
			withCredentials: args.withCredentials,
			ioArgs: ioArgs
		};

		if(typeof args.headers !== 'undefined'){
			options.headers = args.headers;
		}
		if(typeof args.contentType !== 'undefined'){
			if(!options.headers){
				options.headers = {};
			}
			options.headers['Content-Type'] = args.contentType;
		}
		if(typeof ioArgs.query !== 'undefined'){
			options.data = ioArgs.query;
		}
		if(typeof args.sync !== 'undefined'){
			options.sync = args.sync;
		}

		dojo._ioNotifyStart(dfd);
		try{
			rDfd = _xhr(ioArgs.url, options, true);
		}catch(e){
			// If XHR creation fails, dojo/request/xhr throws
			// When this happens, cancel the deferred
			dfd.cancel();
			return dfd;
		}

		// sync ioArgs
		dfd.ioArgs.xhr = rDfd.response.xhr;

		rDfd.then(function(){
			dfd.resolve(dfd);
		}).otherwise(function(error){
			ioArgs.error = error;
			if(error.response){
				error.status = error.response.status;
				error.responseText = error.response.text;
				error.xhr = error.response.xhr;
			}
			dfd.reject(error);
		});
		return dfd; // dojo/_base/Deferred
	};

	dojo.xhrGet = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP GET request to the server.
		return dojo.xhr("GET", args); // dojo/_base/Deferred
	};

	dojo.rawXhrPost = dojo.xhrPost = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP POST request to the server. In addition to the properties
		//		listed for the dojo.__XhrArgs type, the following property is allowed:
		// postData:
		//		String. Send raw data in the body of the POST request.
		return dojo.xhr("POST", args, true); // dojo/_base/Deferred
	};

	dojo.rawXhrPut = dojo.xhrPut = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP PUT request to the server. In addition to the properties
		//		listed for the dojo.__XhrArgs type, the following property is allowed:
		// putData:
		//		String. Send raw data in the body of the PUT request.
		return dojo.xhr("PUT", args, true); // dojo/_base/Deferred
	};

	dojo.xhrDelete = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP DELETE request to the server.
		return dojo.xhr("DELETE", args); // dojo/_base/Deferred
	};

	/*
	dojo.wrapForm = function(formNode){
		// summary:
		//		A replacement for FormBind, but not implemented yet.

		// FIXME: need to think harder about what extensions to this we might
		// want. What should we allow folks to do w/ this? What events to
		// set/send?
		throw new Error("dojo.wrapForm not yet implemented");
	}
	*/

	dojo._isDocumentOk = function(x){
		return util.checkStatus(x.status);
	};

	dojo._getText = function(url){
		var result;
		dojo.xhrGet({url:url, sync:true, load:function(text){
			result = text;
		}});
		return result;
	};

	// Add aliases for static functions to dojo.xhr since dojo.xhr is what's returned from this module
	lang.mixin(dojo.xhr, {
		_xhrObj: dojo._xhrObj,
		fieldToObject: domForm.fieldToObject,
		formToObject: domForm.toObject,
		objectToQuery: ioq.objectToQuery,
		formToQuery: domForm.toQuery,
		formToJson: domForm.toJson,
		queryToObject: ioq.queryToObject,
		contentHandlers: handlers,
		_ioSetArgs: dojo._ioSetArgs,
		_ioCancelAll: dojo._ioCancelAll,
		_ioNotifyStart: dojo._ioNotifyStart,
		_ioWatch: dojo._ioWatch,
		_ioAddQueryToUrl: dojo._ioAddQueryToUrl,
		_isDocumentOk: dojo._isDocumentOk,
		_getText: dojo._getText,
		get: dojo.xhrGet,
		post: dojo.xhrPost,
		put: dojo.xhrPut,
		del: dojo.xhrDelete	// because "delete" is a reserved word
	});

	return dojo.xhr;
});

},
'dojo/_base/unload':function(){
define(["./kernel", "./lang", "../on"], function(dojo, lang, on){

// module:
//		dojo/unload

var win = window;

var unload = {
	// summary:
	//		This module contains the document and window unload detection API.
	//		This module is deprecated.  Use on(window, "unload", func)
	//		and on(window, "beforeunload", func) instead.

	addOnWindowUnload: function(/*Object|Function?*/ obj, /*String|Function?*/ functionName){
		// summary:
		//		Registers a function to be triggered when window.onunload fires.
		//		Deprecated, use on(window, "unload", lang.hitch(obj, functionName)) instead.
		// description:
		//		The first time that addOnWindowUnload is called Dojo
		//		will register a page listener to trigger your unload
		//		handler with. Note that registering these handlers may
		//		destroy "fastback" page caching in browsers that support
		//		it. Be careful trying to modify the DOM or access
		//		JavaScript properties during this phase of page unloading:
		//		they may not always be available. Consider
		//		addOnUnload() if you need to modify the DOM or do
		//		heavy JavaScript work since it fires at the equivalent of
		//		the page's "onbeforeunload" event.
		// example:
		//	|	var afunc = function() {console.log("global function");};
		//	|	require(["dojo/_base/unload"], function(unload) {
		//	|		var foo = {bar: function(){ console.log("bar unloading...");}, 
		//	|		           data: "mydata"};
		//	|		unload.addOnWindowUnload(afunc);
		//	|		unload.addOnWindowUnload(foo, "bar");
		//	|		unload.addOnWindowUnload(foo, function(){console.log("", this.data);});
		//	|	});

		if (!dojo.windowUnloaded){
			on(win, "unload", (dojo.windowUnloaded = function(){
				// summary:
				//		signal fired by impending window destruction. You may use
				//		dojo.addOnWindowUnload() to register a listener for this
				//		event. NOTE: if you wish to dojo.connect() to this method
				//		to perform page/application cleanup, be aware that this
				//		event WILL NOT fire if no handler has been registered with
				//		addOnWindowUnload(). This behavior started in Dojo 1.3.
				//		Previous versions always triggered windowUnloaded(). See
				//		addOnWindowUnload for more info.
			}));
		}
		on(win, "unload", lang.hitch(obj, functionName));
	},

	addOnUnload: function(/*Object?|Function?*/ obj, /*String|Function?*/ functionName){
		// summary:
		//		Registers a function to be triggered when the page unloads.
		//		Deprecated, use on(window, "beforeunload", lang.hitch(obj, functionName)) instead.
		// description:
		//		The first time that addOnUnload is called Dojo will
		//		register a page listener to trigger your unload handler
		//		with.
		//
		//		In a browser environment, the functions will be triggered
		//		during the window.onbeforeunload event. Be careful of doing
		//		too much work in an unload handler. onbeforeunload can be
		//		triggered if a link to download a file is clicked, or if
		//		the link is a javascript: link. In these cases, the
		//		onbeforeunload event fires, but the document is not
		//		actually destroyed. So be careful about doing destructive
		//		operations in a dojo.addOnUnload callback.
		//
		//		Further note that calling dojo.addOnUnload will prevent
		//		browsers from using a "fast back" cache to make page
		//		loading via back button instantaneous.
		// example:
		//	|	var afunc = function() {console.log("global function");};
		//	|	require(["dojo/_base/unload"], function(unload) {
		//	|		var foo = {bar: function(){ console.log("bar unloading...");}, 
		//	|		           data: "mydata"};
		//	|		unload.addOnUnload(afunc);
		//	|		unload.addOnUnload(foo, "bar");
		//	|		unload.addOnUnload(foo, function(){console.log("", this.data);});
		//	|	});

		on(win, "beforeunload", lang.hitch(obj, functionName));
	}
};

dojo.addOnWindowUnload = unload.addOnWindowUnload;
dojo.addOnUnload = unload.addOnUnload;

return unload;

});

},
'dojo/Deferred':function(){
define([
	"./has",
	"./_base/lang",
	"./errors/CancelError",
	"./promise/Promise",
	"require"
], function(has, lang, CancelError, Promise, instrumentation){
	"use strict";

	// module:
	//		dojo/Deferred

	var PROGRESS = 0,
			RESOLVED = 1,
			REJECTED = 2;
	var FULFILLED_ERROR_MESSAGE = "This deferred has already been fulfilled.";

	var freezeObject = Object.freeze || function(){};

	var signalWaiting = function(waiting, type, result, rejection, deferred){
		if( 0 ){
			if(type === REJECTED && Deferred.instrumentRejected && waiting.length === 0){
				Deferred.instrumentRejected(result, false, rejection, deferred);
			}
		}

		for(var i = 0; i < waiting.length; i++){
			signalListener(waiting[i], type, result, rejection);
		}
	};

	var signalListener = function(listener, type, result, rejection){
		var func = listener[type];
		var deferred = listener.deferred;
		if(func){
			try{
				var newResult = func(result);
				if(type === PROGRESS){
					if(typeof newResult !== "undefined"){
						signalDeferred(deferred, type, newResult);
					}
				}else{
					if(newResult && typeof newResult.then === "function"){
						listener.cancel = newResult.cancel;
						newResult.then(
								// Only make resolvers if they're actually going to be used
								makeDeferredSignaler(deferred, RESOLVED),
								makeDeferredSignaler(deferred, REJECTED),
								makeDeferredSignaler(deferred, PROGRESS));
						return;
					}
					signalDeferred(deferred, RESOLVED, newResult);
				}
			}catch(error){
				signalDeferred(deferred, REJECTED, error);
			}
		}else{
			signalDeferred(deferred, type, result);
		}

		if( 0 ){
			if(type === REJECTED && Deferred.instrumentRejected){
				Deferred.instrumentRejected(result, !!func, rejection, deferred.promise);
			}
		}
	};

	var makeDeferredSignaler = function(deferred, type){
		return function(value){
			signalDeferred(deferred, type, value);
		};
	};

	var signalDeferred = function(deferred, type, result){
		if(!deferred.isCanceled()){
			switch(type){
				case PROGRESS:
					deferred.progress(result);
					break;
				case RESOLVED:
					deferred.resolve(result);
					break;
				case REJECTED:
					deferred.reject(result);
					break;
			}
		}
	};

	var Deferred = function(canceler){
		// summary:
		//		Creates a new deferred. This API is preferred over
		//		`dojo/_base/Deferred`.
		// description:
		//		Creates a new deferred, as an abstraction over (primarily)
		//		asynchronous operations. The deferred is the private interface
		//		that should not be returned to calling code. That's what the
		//		`promise` is for. See `dojo/promise/Promise`.
		// canceler: Function?
		//		Will be invoked if the deferred is canceled. The canceler
		//		receives the reason the deferred was canceled as its argument.
		//		The deferred is rejected with its return value, or a new
		//		`dojo/errors/CancelError` instance.

		// promise: dojo/promise/Promise
		//		The public promise object that clients can add callbacks to. 
		var promise = this.promise = new Promise();

		var deferred = this;
		var fulfilled, result, rejection;
		var canceled = false;
		var waiting = [];

		if( 0  && Error.captureStackTrace){
			Error.captureStackTrace(deferred, Deferred);
			Error.captureStackTrace(promise, Deferred);
		}

		this.isResolved = promise.isResolved = function(){
			// summary:
			//		Checks whether the deferred has been resolved.
			// returns: Boolean

			return fulfilled === RESOLVED;
		};

		this.isRejected = promise.isRejected = function(){
			// summary:
			//		Checks whether the deferred has been rejected.
			// returns: Boolean

			return fulfilled === REJECTED;
		};

		this.isFulfilled = promise.isFulfilled = function(){
			// summary:
			//		Checks whether the deferred has been resolved or rejected.
			// returns: Boolean

			return !!fulfilled;
		};

		this.isCanceled = promise.isCanceled = function(){
			// summary:
			//		Checks whether the deferred has been canceled.
			// returns: Boolean

			return canceled;
		};

		this.progress = function(update, strict){
			// summary:
			//		Emit a progress update on the deferred.
			// description:
			//		Emit a progress update on the deferred. Progress updates
			//		can be used to communicate updates about the asynchronous
			//		operation before it has finished.
			// update: any
			//		The progress update. Passed to progbacks.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently no progress can be emitted.
			// returns: dojo/promise/Promise
			//		Returns the original promise for the deferred.

			if(!fulfilled){
				signalWaiting(waiting, PROGRESS, update, null, deferred);
				return promise;
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}else{
				return promise;
			}
		};

		this.resolve = function(value, strict){
			// summary:
			//		Resolve the deferred.
			// description:
			//		Resolve the deferred, putting it in a success state.
			// value: any
			//		The result of the deferred. Passed to callbacks.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be resolved.
			// returns: dojo/promise/Promise
			//		Returns the original promise for the deferred.

			if(!fulfilled){
				// Set fulfilled, store value. After signaling waiting listeners unset
				// waiting.
				signalWaiting(waiting, fulfilled = RESOLVED, result = value, null, deferred);
				waiting = null;
				return promise;
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}else{
				return promise;
			}
		};

		var reject = this.reject = function(error, strict){
			// summary:
			//		Reject the deferred.
			// description:
			//		Reject the deferred, putting it in an error state.
			// error: any
			//		The error result of the deferred. Passed to errbacks.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be rejected.
			// returns: dojo/promise/Promise
			//		Returns the original promise for the deferred.

			if(!fulfilled){
				if( 0  && Error.captureStackTrace){
					Error.captureStackTrace(rejection = {}, reject);
				}
				signalWaiting(waiting, fulfilled = REJECTED, result = error, rejection, deferred);
				waiting = null;
				return promise;
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}else{
				return promise;
			}
		};

		this.then = promise.then = function(callback, errback, progback){
			// summary:
			//		Add new callbacks to the deferred.
			// description:
			//		Add new callbacks to the deferred. Callbacks can be added
			//		before or after the deferred is fulfilled.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved.
			//		Receives the resolution value.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			//		Receives the rejection error.
			// progback: Function?
			//		Callback to be invoked when the promise emits a progress
			//		update. Receives the progress update.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback(s).
			//		This can be used for chaining many asynchronous operations.

			var listener = [progback, callback, errback];
			// Ensure we cancel the promise we're waiting for, or if callback/errback
			// have returned a promise, cancel that one.
			listener.cancel = promise.cancel;
			listener.deferred = new Deferred(function(reason){
				// Check whether cancel is really available, returned promises are not
				// required to expose `cancel`
				return listener.cancel && listener.cancel(reason);
			});
			if(fulfilled && !waiting){
				signalListener(listener, fulfilled, result, rejection);
			}else{
				waiting.push(listener);
			}
			return listener.deferred.promise;
		};

		this.cancel = promise.cancel = function(reason, strict){
			// summary:
			//		Inform the deferred it may cancel its asynchronous operation.
			// description:
			//		Inform the deferred it may cancel its asynchronous operation.
			//		The deferred's (optional) canceler is invoked and the
			//		deferred will be left in a rejected state. Can affect other
			//		promises that originate with the same deferred.
			// reason: any
			//		A message that may be sent to the deferred's canceler,
			//		explaining why it's being canceled.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be canceled.
			// returns: any
			//		Returns the rejection reason if the deferred was canceled
			//		normally.

			if(!fulfilled){
				// Cancel can be called even after the deferred is fulfilled
				if(canceler){
					var returnedReason = canceler(reason);
					reason = typeof returnedReason === "undefined" ? reason : returnedReason;
				}
				canceled = true;
				if(!fulfilled){
					// Allow canceler to provide its own reason, but fall back to a CancelError
					if(typeof reason === "undefined"){
						reason = new CancelError();
					}
					reject(reason);
					return reason;
				}else if(fulfilled === REJECTED && result === reason){
					return reason;
				}
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}
		};

		freezeObject(promise);
	};

	Deferred.prototype.toString = function(){
		// returns: String
		//		Returns `[object Deferred]`.

		return "[object Deferred]";
	};

	if(instrumentation){
		instrumentation(Deferred);
	}

	return Deferred;
});

},
'dojo/_base/NodeList':function(){
define(["./kernel", "../query", "./array", "./html", "../NodeList-dom"], function(dojo, query, array){
	// module:
	//		dojo/_base/NodeList

	/*=====
	return {
		// summary:
		//		This module extends dojo/NodeList with the legacy connect(), coords(),
		//		blur(), focus(), change(), click(), error(), keydown(), keypress(),
		//		keyup(), load(), mousedown(), mouseenter(), mouseleave(), mousemove(),
		//		mouseout(), mouseover(), mouseup(), and submit() methods.
	};
	=====*/
 
	var NodeList = query.NodeList,
		nlp = NodeList.prototype;

	nlp.connect = NodeList._adaptAsForEach(function(){
		// don't bind early to dojo.connect since we no longer explicitly depend on it
		return dojo.connect.apply(this, arguments);
	});
	/*=====
	nlp.connect = function(methodName, objOrFunc, funcName){
		// summary:
		//		Attach event handlers to every item of the NodeList. Uses dojo.connect()
		//		so event properties are normalized.
		//
		//		Application must manually require() "dojo/_base/connect" before using this method.
		// methodName: String
		//		the name of the method to attach to. For DOM events, this should be
		//		the lower-case name of the event
		// objOrFunc: Object|Function|String
		//		if 2 arguments are passed (methodName, objOrFunc), objOrFunc should
		//		reference a function or be the name of the function in the global
		//		namespace to attach. If 3 arguments are provided
		//		(methodName, objOrFunc, funcName), objOrFunc must be the scope to
		//		locate the bound function in
		// funcName: String?
		//		optional. A string naming the function in objOrFunc to bind to the
		//		event. May also be a function reference.
		// example:
		//		add an onclick handler to every button on the page
		//		|	query("div:nth-child(odd)").connect("onclick", function(e){
		//		|		console.log("clicked!");
		//		|	});
		// example:
		//		attach foo.bar() to every odd div's onmouseover
		//		|	query("div:nth-child(odd)").connect("onmouseover", foo, "bar");

		return null;	// NodeList
	};
	=====*/

	nlp.coords = NodeList._adaptAsMap(dojo.coords);
	/*=====
	nlp.coords = function(){
		// summary:
		//		Deprecated: Use position() for border-box x/y/w/h
		//		or marginBox() for margin-box w/h/l/t.
		//		Returns the box objects of all elements in a node list as
		//		an Array (*not* a NodeList). Acts like `domGeom.coords`, though assumes
		//		the node passed is each node in this list.

		return []; // Array
	};
	=====*/

	NodeList.events = [
		// summary:
		//		list of all DOM events used in NodeList
		"blur", "focus", "change", "click", "error", "keydown", "keypress",
		"keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove",
		"mouseout", "mouseover", "mouseup", "submit"
	];

	// FIXME: pseudo-doc the above automatically generated on-event functions

	// syntactic sugar for DOM events
	array.forEach(NodeList.events, function(evt){
			var _oe = "on" + evt;
			nlp[_oe] = function(a, b){
				return this.connect(_oe, a, b);
			};
				// FIXME: should these events trigger publishes?
				/*
				return (a ? this.connect(_oe, a, b) :
							this.forEach(function(n){
								// FIXME:
								//		listeners get buried by
								//		addEventListener and can't be dug back
								//		out to be triggered externally.
								// see:
								//		http://developer.mozilla.org/en/docs/DOM:element

								console.log(n, evt, _oe);

								// FIXME: need synthetic event support!
								var _e = { target: n, faux: true, type: evt };
								// dojo._event_listener._synthesizeEvent({}, { target: n, faux: true, type: evt });
								try{ n[evt](_e); }catch(e){ console.log(e); }
								try{ n[_oe](_e); }catch(e){ console.log(e); }
							})
				);
				*/
		}
	);

	dojo.NodeList = NodeList;
	return NodeList;
});

},
'dojo/_base/Color':function(){
define(["./kernel", "./lang", "./array", "./config"], function(dojo, lang, ArrayUtil, config){

	var Color = dojo.Color = function(/*Array|String|Object*/ color){
		// summary:
		//		Takes a named string, hex string, array of rgb or rgba values,
		//		an object with r, g, b, and a properties, or another `Color` object
		//		and creates a new Color instance to work from.
		//
		// example:
		//		Work with a Color instance:
		//	|	require(["dojo/_base/color"], function(Color){
		//	|		var c = new Color();
		//	|		c.setColor([0,0,0]); // black
		//	|		var hex = c.toHex(); // #000000
		//	|	});
		//
		// example:
		//		Work with a node's color:
		//	| 
		//	|	require(["dojo/_base/color", "dojo/dom-style"], function(Color, domStyle){
		//	|		var color = domStyle("someNode", "backgroundColor");
		//	|		var n = new Color(color);
		//	|		// adjust the color some
		//	|		n.r *= .5;
		//	|		console.log(n.toString()); // rgb(128, 255, 255);
		//	|	});
		if(color){ this.setColor(color); }
	};

	// FIXME:
	// there's got to be a more space-efficient way to encode or discover
	// these!! Use hex?
	Color.named = {
		// summary:
		//		Dictionary list of all CSS named colors, by name. Values are 3-item arrays with corresponding RG and B values.
		"black":  [0,0,0],
		"silver": [192,192,192],
		"gray":	  [128,128,128],
		"white":  [255,255,255],
		"maroon": [128,0,0],
		"red":	  [255,0,0],
		"purple": [128,0,128],
		"fuchsia":[255,0,255],
		"green":  [0,128,0],
		"lime":	  [0,255,0],
		"olive":  [128,128,0],
		"yellow": [255,255,0],
		"navy":	  [0,0,128],
		"blue":	  [0,0,255],
		"teal":	  [0,128,128],
		"aqua":	  [0,255,255],
		"transparent": config.transparentColor || [0,0,0,0]
	};

	lang.extend(Color, {
		r: 255, g: 255, b: 255, a: 1,
		_set: function(r, g, b, a){
			var t = this; t.r = r; t.g = g; t.b = b; t.a = a;
		},
		setColor: function(/*Array|String|Object*/ color){
			// summary:
			//		Takes a named string, hex string, array of rgb or rgba values,
			//		an object with r, g, b, and a properties, or another `Color` object
			//		and sets this color instance to that value.
			//
			// example:
			//	|	require(["dojo/_base/color"], function(Color){
			//	|		var c = new Color(); // no color
			//	|		c.setColor("#ededed"); // greyish
			//	|	});
			if(lang.isString(color)){
				Color.fromString(color, this);
			}else if(lang.isArray(color)){
				Color.fromArray(color, this);
			}else{
				this._set(color.r, color.g, color.b, color.a);
				if(!(color instanceof Color)){ this.sanitize(); }
			}
			return this;	// Color
		},
		sanitize: function(){
			// summary:
			//		Ensures the object has correct attributes
			// description:
			//		the default implementation does nothing, include dojo.colors to
			//		augment it with real checks
			return this;	// Color
		},
		toRgb: function(){
			// summary:
			//		Returns 3 component array of rgb values
			// example:
			//	|	require(["dojo/_base/color"], function(Color){
			//	|		var c = new Color("#000000");
			//	|		console.log(c.toRgb()); // [0,0,0]
			//	|	});
			var t = this;
			return [t.r, t.g, t.b]; // Array
		},
		toRgba: function(){
			// summary:
			//		Returns a 4 component array of rgba values from the color
			//		represented by this object.
			var t = this;
			return [t.r, t.g, t.b, t.a];	// Array
		},
		toHex: function(){
			// summary:
			//		Returns a CSS color string in hexadecimal representation
			// example:
			//	|	require(["dojo/_base/color"], function(Color){
			//	|		console.log(new Color([0,0,0]).toHex()); // #000000
			//	|	});
			var arr = ArrayUtil.map(["r", "g", "b"], function(x){
				var s = this[x].toString(16);
				return s.length < 2 ? "0" + s : s;
			}, this);
			return "#" + arr.join("");	// String
		},
		toCss: function(/*Boolean?*/ includeAlpha){
			// summary:
			//		Returns a css color string in rgb(a) representation
			// example:
			//	|	require(["dojo/_base/color"], function(Color){
			//	|		var c = new Color("#FFF").toCss();
			//	|		console.log(c); // rgb('255','255','255')
			//	|	});
			var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
			return (includeAlpha ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";	// String
		},
		toString: function(){
			// summary:
			//		Returns a visual representation of the color
			return this.toCss(true); // String
		}
	});

	Color.blendColors = dojo.blendColors = function(
		/*Color*/ start,
		/*Color*/ end,
		/*Number*/ weight,
		/*Color?*/ obj
	){
		// summary:
		//		Blend colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
		//		can reuse a previously allocated Color object for the result
		var t = obj || new Color();
		t.r = Math.round(start.r + (end.r - start.r) * weight);
		t.g = Math.round(start.g + (end.g - start.g) * weight);
		t.b = Math.round(start.b + (end.b - start.b) * weight);
		t.a = start.a + (end.a - start.a) * weight;
		return t.sanitize();	// Color
	};

	Color.fromRgb = dojo.colorFromRgb = function(/*String*/ color, /*Color?*/ obj){
		// summary:
		//		Returns a `Color` instance from a string of the form
		//		"rgb(...)" or "rgba(...)". Optionally accepts a `Color`
		//		object to update with the parsed value and return instead of
		//		creating a new object.
		// returns:
		//		A Color object. If obj is passed, it will be the return value.
		var m = color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
		return m && Color.fromArray(m[1].split(/\s*,\s*/), obj);	// Color
	};

	Color.fromHex = dojo.colorFromHex = function(/*String*/ color, /*Color?*/ obj){
		// summary:
		//		Converts a hex string with a '#' prefix to a color object.
		//		Supports 12-bit #rgb shorthand. Optionally accepts a
		//		`Color` object to update with the parsed value.
		//
		// returns:
		//		A Color object. If obj is passed, it will be the return value.
		//
		// example:
		//	|	require(["dojo/_base/color"], function(Color){
		//	|		var thing = new Color().fromHex("#ededed"); // grey, longhand
		//	|		var thing2 = new Color().fromHex("#000"); // black, shorthand
		//	|	});
		var t = obj || new Color(),
			bits = (color.length == 4) ? 4 : 8,
			mask = (1 << bits) - 1;
		color = Number("0x" + color.substr(1));
		if(isNaN(color)){
			return null; // Color
		}
		ArrayUtil.forEach(["b", "g", "r"], function(x){
			var c = color & mask;
			color >>= bits;
			t[x] = bits == 4 ? 17 * c : c;
		});
		t.a = 1;
		return t;	// Color
	};

	Color.fromArray = dojo.colorFromArray = function(/*Array*/ a, /*Color?*/ obj){
		// summary:
		//		Builds a `Color` from a 3 or 4 element array, mapping each
		//		element in sequence to the rgb(a) values of the color.
		// example:
		//		|	require(["dojo/_base/color"], function(Color){
		//		|		var myColor = new Color().fromArray([237,237,237,0.5]); // grey, 50% alpha
		//		|	});
		// returns:
		//		A Color object. If obj is passed, it will be the return value.
		var t = obj || new Color();
		t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
		if(isNaN(t.a)){ t.a = 1; }
		return t.sanitize();	// Color
	};

	Color.fromString = dojo.colorFromString = function(/*String*/ str, /*Color?*/ obj){
		// summary:
		//		Parses `str` for a color value. Accepts hex, rgb, and rgba
		//		style color values.
		// description:
		//		Acceptable input values for str may include arrays of any form
		//		accepted by dojo.colorFromArray, hex strings such as "#aaaaaa", or
		//		rgb or rgba strings such as "rgb(133, 200, 16)" or "rgba(10, 10,
		//		10, 50)"
		// returns:
		//		A Color object. If obj is passed, it will be the return value.
		var a = Color.named[str];
		return a && Color.fromArray(a, obj) || Color.fromRgb(str, obj) || Color.fromHex(str, obj);	// Color
	};

	return Color;
});

},
'dojo/selector/_loader':function(){
define(["../has", "require"],
		function(has, require){

"use strict";
if (typeof document !== "undefined") {
	var testDiv = document.createElement("div");
	has.add("dom-qsa2.1", !!testDiv.querySelectorAll);
	has.add("dom-qsa3", function(){
		// test to see if we have a reasonable native selector engine available
		try{
			testDiv.innerHTML = "<p class='TEST'></p>"; // test kind of from sizzle
			// Safari can't handle uppercase or unicode characters when
			// in quirks mode, IE8 can't handle pseudos like :empty
			return testDiv.querySelectorAll(".TEST:empty").length == 1;
		}catch(e){}
	});
}

var fullEngine;
var acme = "./acme", lite = "./lite";
return {
	// summary:
	//		This module handles loading the appropriate selector engine for the given browser

	load: function(id, parentRequire, loaded, config){
		if (config && config.isBuild) {
			//Indicate that the optimizer should not wait
			//for this resource any more and complete optimization.
			//This resource will be resolved dynamically during
			//run time in the web browser.
			loaded();
			return;
		}

		var req = require;
		// here we implement the default logic for choosing a selector engine
		id = id == "default" ? has("config-selectorEngine") || "css3" : id;
		id = id == "css2" || id == "lite" ? lite :
				id == "css2.1" ? has("dom-qsa2.1") ? lite : acme :
				id == "css3" ? has("dom-qsa3") ? lite : acme :
				id == "acme" ? acme : (req = parentRequire) && id;
		if(id.charAt(id.length-1) == '?'){
			id = id.substring(0,id.length - 1);
			var optionalLoad = true;
		}
		// the query engine is optional, only load it if a native one is not available or existing one has not been loaded
		if(optionalLoad && (has("dom-compliant-qsa") || fullEngine)){
			return loaded(fullEngine);
		}
		// load the referenced selector engine
		req([id], function(engine){
			if(id != "./lite"){
				fullEngine = engine;
			}
			loaded(engine);
		});
	}
};
});

},
'dojo/promise/Promise':function(){
define([
	"../_base/lang"
], function(lang){
	"use strict";

	// module:
	//		dojo/promise/Promise

	function throwAbstract(){
		throw new TypeError("abstract");
	}

	return lang.extend(function Promise(){
		// summary:
		//		The public interface to a deferred.
		// description:
		//		The public interface to a deferred. All promises in Dojo are
		//		instances of this class.
	}, {
		then: function(callback, errback, progback){
			// summary:
			//		Add new callbacks to the promise.
			// description:
			//		Add new callbacks to the deferred. Callbacks can be added
			//		before or after the deferred is fulfilled.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved.
			//		Receives the resolution value.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			//		Receives the rejection error.
			// progback: Function?
			//		Callback to be invoked when the promise emits a progress
			//		update. Receives the progress update.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback(s).
			//		This can be used for chaining many asynchronous operations.

			throwAbstract();
		},

		cancel: function(reason, strict){
			// summary:
			//		Inform the deferred it may cancel its asynchronous operation.
			// description:
			//		Inform the deferred it may cancel its asynchronous operation.
			//		The deferred's (optional) canceler is invoked and the
			//		deferred will be left in a rejected state. Can affect other
			//		promises that originate with the same deferred.
			// reason: any
			//		A message that may be sent to the deferred's canceler,
			//		explaining why it's being canceled.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be canceled.
			// returns: any
			//		Returns the rejection reason if the deferred was canceled
			//		normally.

			throwAbstract();
		},

		isResolved: function(){
			// summary:
			//		Checks whether the promise has been resolved.
			// returns: Boolean

			throwAbstract();
		},

		isRejected: function(){
			// summary:
			//		Checks whether the promise has been rejected.
			// returns: Boolean

			throwAbstract();
		},

		isFulfilled: function(){
			// summary:
			//		Checks whether the promise has been resolved or rejected.
			// returns: Boolean

			throwAbstract();
		},

		isCanceled: function(){
			// summary:
			//		Checks whether the promise has been canceled.
			// returns: Boolean

			throwAbstract();
		},

		"finally": function(callback) {
			// summary:
			//		Add a callback to the promise that will fire whether it
			//		resolves or rejects.
			// description:
			//		Conforms to ES2018's `Promise.prototype.finally`.
			//		Add a callback to the promise that will fire whether it
			//		resolves or rejects. No value is passed to the callback.
			//		Returns a promise that reflects the state of the original promise,
			//		with two exceptions:
			//		- If the callback return a promise, the outer promise will wait
			//		until the returned promise is resolved, then it will resolve
			//		with the original value.
			//		- If the callback throws an exception or returns a promise that
			//		is rejected (or rejects later), the outer promise will reject
			//		with the inner promise's rejection reason.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved
			//		or rejected. Doesn't receive any value.
			// returns: dojo/promise/Promise
			//		Returns a new promise that reflects the state of the original promise,
			//		with two small exceptions (see description).
			//

			return this.then(function (value){
				var valueOrPromise = callback();
				if (valueOrPromise && typeof valueOrPromise.then === "function"){
					return valueOrPromise.then(function (){
						return value;
					});
				}
				return value;
			}, function(reason) {
				var valueOrPromise = callback();
				if (valueOrPromise && typeof valueOrPromise.then === "function"){
					return valueOrPromise.then(function (){
						throw reason;
					});
				}
				throw reason;
			});
		},

		always: function(callbackOrErrback){
			// summary:
			//		Add a callback to be invoked when the promise is resolved
			//		or rejected.
			// callbackOrErrback: Function?
			//		A function that is used both as a callback and errback.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback/errback.

			return this.then(callbackOrErrback, callbackOrErrback);
		},

		"catch": function(errback){
		    // summary:
		    //		Add new errbacks to the promise. Follows ECMA specification naming.
		    // errback: Function?
		    //		Callback to be invoked when the promise is rejected.
		    // returns: dojo/promise/Promise
		    //		Returns a new promise for the result of the errback.

		    return this.then(null, errback);
		},

		otherwise: function(errback){
			// summary:
			//		Add new errbacks to the promise.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the errback.

			return this.then(null, errback);
		},

		trace: function(){
			return this;
		},

		traceRejected: function(){
			return this;
		},

		toString: function(){
			// returns: string
			//		Returns `[object Promise]`.

			return "[object Promise]";
		}
	});
});

},
'dojo/request/watch':function(){
define([
	'./util',
	'../errors/RequestTimeoutError',
	'../errors/CancelError',
	'../_base/array',
	'../_base/window',
	'../has!host-browser?dom-addeventlistener?:../on:'
], function(util, RequestTimeoutError, CancelError, array, win, on){
	// avoid setting a timer per request. It degrades performance on IE
	// something fierece if we don't use unified loops.
	var _inFlightIntvl = null,
		_inFlight = [];

	function watchInFlight(){
		// summary:
		//		internal method that checks each inflight XMLHttpRequest to see
		//		if it has completed or if the timeout situation applies.

		var now = +(new Date);

		// we need manual loop because we often modify _inFlight (and therefore 'i') while iterating
		for(var i = 0, dfd; i < _inFlight.length && (dfd = _inFlight[i]); i++){
			var response = dfd.response,
				options = response.options;
			if((dfd.isCanceled && dfd.isCanceled()) || (dfd.isValid && !dfd.isValid(response))){
				_inFlight.splice(i--, 1);
				watch._onAction && watch._onAction();
			}else if(dfd.isReady && dfd.isReady(response)){
				_inFlight.splice(i--, 1);
				dfd.handleResponse(response);
				watch._onAction && watch._onAction();
			}else if(dfd.startTime){
				// did we timeout?
				if(dfd.startTime + (options.timeout || 0) < now){
					_inFlight.splice(i--, 1);
					// Cancel the request so the io module can do appropriate cleanup.
					dfd.cancel(new RequestTimeoutError('Timeout exceeded', response));
					watch._onAction && watch._onAction();
				}
			}
		}

		watch._onInFlight && watch._onInFlight(dfd);

		if(!_inFlight.length){
			clearInterval(_inFlightIntvl);
			_inFlightIntvl = null;
		}
	}

	function watch(dfd){
		// summary:
		//		Watches the io request represented by dfd to see if it completes.
		// dfd: Deferred
		//		The Deferred object to watch.
		// response: Object
		//		The object used as the value of the request promise.
		// validCheck: Function
		//		Function used to check if the IO request is still valid. Gets the dfd
		//		object as its only argument.
		// ioCheck: Function
		//		Function used to check if basic IO call worked. Gets the dfd
		//		object as its only argument.
		// resHandle: Function
		//		Function used to process response. Gets the dfd
		//		object as its only argument.
		if(dfd.response.options.timeout){
			dfd.startTime = +(new Date);
		}

		if(dfd.isFulfilled()){
			// bail out if the deferred is already fulfilled
			return;
		}

		_inFlight.push(dfd);
		if(!_inFlightIntvl){
			_inFlightIntvl = setInterval(watchInFlight, 50);
		}

		// handle sync requests separately from async:
		// http://bugs.dojotoolkit.org/ticket/8467
		if(dfd.response.options.sync){
			watchInFlight();
		}
	}

	watch.cancelAll = function cancelAll(){
		// summary:
		//		Cancels all pending IO requests, regardless of IO type
		try{
			array.forEach(_inFlight, function(dfd){
				try{
					dfd.cancel(new CancelError('All requests canceled.'));
				}catch(e){}
			});
		}catch(e){}
	};

	if(win && on && win.doc.attachEvent){
		// Automatically call cancel all io calls on unload in IE
		// http://bugs.dojotoolkit.org/ticket/2357
		on(win.global, 'unload', function(){
			watch.cancelAll();
		});
	}

	return watch;
});

},
'dojo/on':function(){
define(["./has!dom-addeventlistener?:./aspect", "./_base/kernel", "./sniff"], function(aspect, dojo, has){

	"use strict";
	if( 1 ){ // check to make sure we are in a browser, this module should work anywhere
		var major = window.ScriptEngineMajorVersion;
		has.add("jscript", major && (major() + ScriptEngineMinorVersion() / 10));
		has.add("event-orientationchange", has("touch") && !has("android")); // TODO: how do we detect this?
		has.add("event-stopimmediatepropagation", window.Event && !!window.Event.prototype && !!window.Event.prototype.stopImmediatePropagation);
		has.add("event-focusin", function(global, doc, element){
			return 'onfocusin' in element;
		});

		if(has("touch")){
			has.add("touch-can-modify-event-delegate", function(){
				// This feature test checks whether deleting a property of an event delegate works
				// for a touch-enabled device. If it works, event delegation can be used as fallback
				// for browsers such as Safari in older iOS where deleting properties of the original
				// event does not work.
				var EventDelegate = function(){};
				EventDelegate.prototype =
					document.createEvent("MouseEvents"); // original event
				// Attempt to modify a property of an event delegate and check if
				// it succeeds. Depending on browsers and on whether dojo/on's
				// strict mode is stripped in a Dojo build, there are 3 known behaviors:
				// it may either succeed, or raise an error, or fail to set the property
				// without raising an error.
				try{
					var eventDelegate = new EventDelegate;
					eventDelegate.target = null;
					return eventDelegate.target === null;
				}catch(e){
					return false; // cannot use event delegation
				}
			});
		}
	}
	var on = function(target, type, listener, dontFix){
		// summary:
		//		A function that provides core event listening functionality. With this function
		//		you can provide a target, event type, and listener to be notified of
		//		future matching events that are fired.
		// target: Element|Object
		//		This is the target object or DOM element that to receive events from
		// type: String|Function
		//		This is the name of the event to listen for or an extension event type.
		// listener: Function
		//		This is the function that should be called when the event fires.
		// returns: Object
		//		An object with a remove() method that can be used to stop listening for this
		//		event.
		// description:
		//		To listen for "click" events on a button node, we can do:
		//		|	define(["dojo/on"], function(on){
		//		|		on(button, "click", clickHandler);
		//		|		...
		//		Evented JavaScript objects can also have their own events.
		//		|	var obj = new Evented;
		//		|	on(obj, "foo", fooHandler);
		//		And then we could publish a "foo" event:
		//		|	on.emit(obj, "foo", {key: "value"});
		//		We can use extension events as well. For example, you could listen for a tap gesture:
		//		|	define(["dojo/on", "dojo/gesture/tap", function(on, tap){
		//		|		on(button, tap, tapHandler);
		//		|		...
		//		which would trigger fooHandler. Note that for a simple object this is equivalent to calling:
		//		|	obj.onfoo({key:"value"});
		//		If you use on.emit on a DOM node, it will use native event dispatching when possible.

		if(typeof target.on == "function" && typeof type != "function" && !target.nodeType){
			// delegate to the target's on() method, so it can handle it's own listening if it wants (unless it
			// is DOM node and we may be dealing with jQuery or Prototype's incompatible addition to the
			// Element prototype
			return target.on(type, listener);
		}
		// delegate to main listener code
		return on.parse(target, type, listener, addListener, dontFix, this);
	};
	on.pausable =  function(target, type, listener, dontFix){
		// summary:
		//		This function acts the same as on(), but with pausable functionality. The
		//		returned signal object has pause() and resume() functions. Calling the
		//		pause() method will cause the listener to not be called for future events. Calling the
		//		resume() method will cause the listener to again be called for future events.
		var paused;
		var signal = on(target, type, function(){
			if(!paused){
				return listener.apply(this, arguments);
			}
		}, dontFix);
		signal.pause = function(){
			paused = true;
		};
		signal.resume = function(){
			paused = false;
		};
		return signal;
	};
	on.once = function(target, type, listener, dontFix){
		// summary:
		//		This function acts the same as on(), but will only call the listener once. The
		//		listener will be called for the first
		//		event that takes place and then listener will automatically be removed.
		var signal = on(target, type, function(){
			// remove this listener
			signal.remove();
			// proceed to call the listener
			return listener.apply(this, arguments);
		});
		return signal;
	};
	on.parse = function(target, type, listener, addListener, dontFix, matchesTarget){
		var events;
		if(type.call){
			// event handler function
			// on(node, touch.press, touchListener);
			return type.call(matchesTarget, target, listener);
		}

		if(type instanceof Array){
			// allow an array of event names (or event handler functions)
			events = type;
		}else if(type.indexOf(",") > -1){
			// we allow comma delimited event names, so you can register for multiple events at once
			events = type.split(/\s*,\s*/);
		}
		if(events){
			var handles = [];
			var i = 0;
			var eventName;
			while(eventName = events[i++]){ // intentional assignment
				handles.push(on.parse(target, eventName, listener, addListener, dontFix, matchesTarget));
			}
			handles.remove = function(){
				for(var i = 0; i < handles.length; i++){
					handles[i].remove();
				}
			};
			return handles;
		}
		return addListener(target, type, listener, dontFix, matchesTarget);
	};
	var touchEvents = /^touch/;
	function addListener(target, type, listener, dontFix, matchesTarget){
		// event delegation:
		var selector = type.match(/(.*):(.*)/);
		// if we have a selector:event, the last one is interpreted as an event, and we use event delegation
		if(selector){
			type = selector[2];
			selector = selector[1];
			// create the extension event for selectors and directly call it
			return on.selector(selector, type).call(matchesTarget, target, listener);
		}
		// test to see if it a touch event right now, so we don't have to do it every time it fires
		if(has("touch")){
			if(touchEvents.test(type)){
				// touch event, fix it
				listener = fixTouchListener(listener);
			}
			if(!has("event-orientationchange") && (type == "orientationchange")){
				//"orientationchange" not supported <= Android 2.1,
				//but works through "resize" on window
				type = "resize";
				target = window;
				listener = fixTouchListener(listener);
			}
		}
		if(addStopImmediate){
			// add stopImmediatePropagation if it doesn't exist
			listener = addStopImmediate(listener);
		}
		// normal path, the target is |this|
		if(target.addEventListener){
			// the target has addEventListener, which should be used if available (might or might not be a node, non-nodes can implement this method as well)
			// check for capture conversions
			var capture = type in captures,
				adjustedType = capture ? captures[type] : type;
			target.addEventListener(adjustedType, listener, capture);
			// create and return the signal
			return {
				remove: function(){
					target.removeEventListener(adjustedType, listener, capture);
				}
			};
		}
		type = "on" + type;
		if(fixAttach && target.attachEvent){
			return fixAttach(target, type, listener);
		}
		throw new Error("Target must be an event emitter");
	}
	on.matches = function(node, selector, context, children, matchesTarget) {
		// summary:
		//		Check if a node match the current selector within the constraint of a context
		// node: DOMNode
		//		The node that originate the event
		// selector: String
		//		The selector to check against
		// context: DOMNode
		//		The context to search in.
		// children: Boolean
		//		Indicates if children elements of the selector should be allowed. This defaults to
		//		true
		// matchesTarget: Object|dojo/query?
		//		An object with a property "matches" as a function. Default is dojo/query.
		//		Matching DOMNodes will be done against this function
		//		The function must return a Boolean.
		//		It will have 3 arguments: "node", "selector" and "context"
		//		True is expected if "node" is matching the current "selector" in the passed "context"
		// returns: DOMNode?
		//		The matching node, if any. Else you get false

		// see if we have a valid matchesTarget or default to dojo/query
		matchesTarget = matchesTarget && (typeof matchesTarget.matches == "function") ? matchesTarget : dojo.query;
		children = children !== false;
		// there is a selector, so make sure it matches
		if(node.nodeType != 1){
			// text node will fail in native match selector
			node = node.parentNode;
		}
		while(!matchesTarget.matches(node, selector, context)){
			if(node == context || children === false || !(node = node.parentNode) || node.nodeType != 1){ // intentional assignment
				return false;
			}
		}
		return node;
	};
	on.selector = function(selector, eventType, children){
		// summary:
		//		Creates a new extension event with event delegation. This is based on
		//		the provided event type (can be extension event) that
		//		only calls the listener when the CSS selector matches the target of the event.
		//
		//		The application must require() an appropriate level of dojo/query to handle the selector.
		// selector:
		//		The CSS selector to use for filter events and determine the |this| of the event listener.
		// eventType:
		//		The event to listen for
		// children:
		//		Indicates if children elements of the selector should be allowed. This defaults to
		//		true
		// example:
		// |	require(["dojo/on", "dojo/mouse", "dojo/query!css2"], function(on, mouse){
		// |		on(node, on.selector(".my-class", mouse.enter), handlerForMyHover);
		return function(target, listener){
			// if the selector is function, use it to select the node, otherwise use the matches method
			var matchesTarget = typeof selector == "function" ? {matches: selector} : this,
				bubble = eventType.bubble;
			function select(eventTarget){
				return on.matches(eventTarget, selector, target, children, matchesTarget);
			}
			if(bubble){
				// the event type doesn't naturally bubble, but has a bubbling form, use that, and give it the selector so it can perform the select itself
				return on(target, bubble(select), listener);
			}
			// standard event delegation
			return on(target, eventType, function(event){
				// call select to see if we match
				var eventTarget = select(event.target);
				// if it matches we call the listener
				if (eventTarget) {
					// We save the matching target into the event, so it can be accessed even when hitching (see #18355)
					event.selectorTarget = eventTarget;
					return listener.call(eventTarget, event);
				}
			});
		};
	};

	function syntheticPreventDefault(){
		this.cancelable = false;
		this.defaultPrevented = true;
	}
	function syntheticStopPropagation(){
		this.bubbles = false;
	}
	var slice = [].slice,
		syntheticDispatch = on.emit = function(target, type, event){
		// summary:
		//		Fires an event on the target object.
		// target:
		//		The target object to fire the event on. This can be a DOM element or a plain
		//		JS object. If the target is a DOM element, native event emitting mechanisms
		//		are used when possible.
		// type:
		//		The event type name. You can emulate standard native events like "click" and
		//		"mouseover" or create custom events like "open" or "finish".
		// event:
		//		An object that provides the properties for the event. See https://developer.mozilla.org/en/DOM/event.initEvent
		//		for some of the properties. These properties are copied to the event object.
		//		Of particular importance are the cancelable and bubbles properties. The
		//		cancelable property indicates whether or not the event has a default action
		//		that can be cancelled. The event is cancelled by calling preventDefault() on
		//		the event object. The bubbles property indicates whether or not the
		//		event will bubble up the DOM tree. If bubbles is true, the event will be called
		//		on the target and then each parent successively until the top of the tree
		//		is reached or stopPropagation() is called. Both bubbles and cancelable
		//		default to false.
		// returns:
		//		If the event is cancelable and the event is not cancelled,
		//		emit will return true. If the event is cancelable and the event is cancelled,
		//		emit will return false.
		// details:
		//		Note that this is designed to emit events for listeners registered through
		//		dojo/on. It should actually work with any event listener except those
		//		added through IE's attachEvent (IE8 and below's non-W3C event emitting
		//		doesn't support custom event types). It should work with all events registered
		//		through dojo/on. Also note that the emit method does do any default
		//		action, it only returns a value to indicate if the default action should take
		//		place. For example, emitting a keypress event would not cause a character
		//		to appear in a textbox.
		// example:
		//		To fire our own click event
		//	|	require(["dojo/on", "dojo/dom"
		//	|	], function(on, dom){
		//	|		on.emit(dom.byId("button"), "click", {
		//	|			cancelable: true,
		//	|			bubbles: true,
		//	|			screenX: 33,
		//	|			screenY: 44
		//	|		});
		//		We can also fire our own custom events:
		//	|		on.emit(dom.byId("slider"), "slide", {
		//	|			cancelable: true,
		//	|			bubbles: true,
		//	|			direction: "left-to-right"
		//	|		});
		//	|	});
		var args = slice.call(arguments, 2);
		var method = "on" + type;
		if("parentNode" in target){
			// node (or node-like), create event controller methods
			var newEvent = args[0] = {};
			for(var i in event){
				newEvent[i] = event[i];
			}
			newEvent.preventDefault = syntheticPreventDefault;
			newEvent.stopPropagation = syntheticStopPropagation;
			newEvent.target = target;
			newEvent.type = type;
			event = newEvent;
		}
		do{
			// call any node which has a handler (note that ideally we would try/catch to simulate normal event propagation but that causes too much pain for debugging)
			target[method] && target[method].apply(target, args);
			// and then continue up the parent node chain if it is still bubbling (if started as bubbles and stopPropagation hasn't been called)
		}while(event && event.bubbles && (target = target.parentNode));
		return event && event.cancelable && event; // if it is still true (was cancelable and was cancelled), return the event to indicate default action should happen
	};
	var captures = has("event-focusin") ? {} : {focusin: "focus", focusout: "blur"};
	if(!has("event-stopimmediatepropagation")){
		var stopImmediatePropagation =function(){
			this.immediatelyStopped = true;
			this.modified = true; // mark it as modified so the event will be cached in IE
		};
		var addStopImmediate = function(listener){
			return function(event){
				if(!event.immediatelyStopped){// check to make sure it hasn't been stopped immediately
					event.stopImmediatePropagation = stopImmediatePropagation;
					return listener.apply(this, arguments);
				}
			};
		};
	}
	if(has("dom-addeventlistener")){
		// emitter that works with native event handling
		on.emit = function(target, type, event){
			if(target.dispatchEvent && document.createEvent){
				// use the native event emitting mechanism if it is available on the target object
				// create a generic event
				// we could create branch into the different types of event constructors, but
				// that would be a lot of extra code, with little benefit that I can see, seems
				// best to use the generic constructor and copy properties over, making it
				// easy to have events look like the ones created with specific initializers
				var ownerDocument = target.ownerDocument || document;
				var nativeEvent = ownerDocument.createEvent("HTMLEvents");
				nativeEvent.initEvent(type, !!event.bubbles, !!event.cancelable);
				// and copy all our properties over
				for(var i in event){
					if(!(i in nativeEvent)){
						nativeEvent[i] = event[i];
					}
				}
				return target.dispatchEvent(nativeEvent) && nativeEvent;
			}
			return syntheticDispatch.apply(on, arguments); // emit for a non-node
		};
	}else{
		// no addEventListener, basically old IE event normalization
		on._fixEvent = function(evt, sender){
			// summary:
			//		normalizes properties on the event object including event
			//		bubbling methods, keystroke normalization, and x/y positions
			// evt:
			//		native event object
			// sender:
			//		node to treat as "currentTarget"
			if(!evt){
				var w = sender && (sender.ownerDocument || sender.document || sender).parentWindow || window;
				evt = w.event;
			}
			if(!evt){return evt;}
			try{
				if(lastEvent && evt.type == lastEvent.type  && evt.srcElement == lastEvent.target){
					// should be same event, reuse event object (so it can be augmented);
					// accessing evt.srcElement rather than evt.target since evt.target not set on IE until fixup below
					evt = lastEvent;
				}
			}catch(e){
				// will occur on IE on lastEvent.type reference if lastEvent points to a previous event that already
				// finished bubbling, but the setTimeout() to clear lastEvent hasn't fired yet
			}
			if(!evt.target){ // check to see if it has been fixed yet
				evt.target = evt.srcElement;
				evt.currentTarget = (sender || evt.srcElement);
				if(evt.type == "mouseover"){
					evt.relatedTarget = evt.fromElement;
				}
				if(evt.type == "mouseout"){
					evt.relatedTarget = evt.toElement;
				}
				if(!evt.stopPropagation){
					evt.stopPropagation = stopPropagation;
					evt.preventDefault = preventDefault;
				}
				switch(evt.type){
					case "keypress":
						var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
						if (c==10){
							// CTRL-ENTER is CTRL-ASCII(10) on IE, but CTRL-ENTER on Mozilla
							c=0;
							evt.keyCode = 13;
						}else if(c==13||c==27){
							c=0; // Mozilla considers ENTER and ESC non-printable
						}else if(c==3){
							c=99; // Mozilla maps CTRL-BREAK to CTRL-c
						}
						// Mozilla sets keyCode to 0 when there is a charCode
						// but that stops the event on IE.
						evt.charCode = c;
						_setKeyChar(evt);
						break;
				}
			}
			return evt;
		};
		var lastEvent, IESignal = function(handle){
			this.handle = handle;
		};
		IESignal.prototype.remove = function(){
			delete _dojoIEListeners_[this.handle];
		};
		var fixListener = function(listener){
			// this is a minimal function for closing on the previous listener with as few as variables as possible
			return function(evt){
				evt = on._fixEvent(evt, this);
				var result = listener.call(this, evt);
				if(evt.modified){
					// cache the last event and reuse it if we can
					if(!lastEvent){
						setTimeout(function(){
							lastEvent = null;
						});
					}
					lastEvent = evt;
				}
				return result;
			};
		};
		var fixAttach = function(target, type, listener){
			listener = fixListener(listener);
			if(((target.ownerDocument ? target.ownerDocument.parentWindow : target.parentWindow || target.window || window) != top ||
						has("jscript") < 5.8) &&
					!has("config-_allow_leaks")){
				// IE will leak memory on certain handlers in frames (IE8 and earlier) and in unattached DOM nodes for JScript 5.7 and below.
				// Here we use global redirection to solve the memory leaks
				if(typeof _dojoIEListeners_ == "undefined"){
					_dojoIEListeners_ = [];
				}
				var emitter = target[type];
				if(!emitter || !emitter.listeners){
					var oldListener = emitter;
					emitter = Function('event', 'var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}');
					emitter.listeners = [];
					target[type] = emitter;
					emitter.global = this;
					if(oldListener){
						emitter.listeners.push(_dojoIEListeners_.push(oldListener) - 1);
					}
				}
				var handle;
				emitter.listeners.push(handle = (emitter.global._dojoIEListeners_.push(listener) - 1));
				return new IESignal(handle);
			}
			return aspect.after(target, type, listener, true);
		};

		var _setKeyChar = function(evt){
			evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : '';
			evt.charOrCode = evt.keyChar || evt.keyCode;	// TODO: remove for 2.0
		};
		// Called in Event scope
		var stopPropagation = function(){
			this.cancelBubble = true;
		};
		var preventDefault = on._preventDefault = function(){
			// Setting keyCode to 0 is the only way to prevent certain keypresses (namely
			// ctrl-combinations that correspond to menu accelerator keys).
			// Otoh, it prevents upstream listeners from getting this information
			// Try to split the difference here by clobbering keyCode only for ctrl
			// combinations. If you still need to access the key upstream, bubbledKeyCode is
			// provided as a workaround.
			this.bubbledKeyCode = this.keyCode;
			if(this.ctrlKey){
				try{
					// squelch errors when keyCode is read-only
					// (e.g. if keyCode is ctrl or shift)
					this.keyCode = 0;
				}catch(e){
				}
			}
			this.defaultPrevented = true;
			this.returnValue = false;
			this.modified = true; // mark it as modified  (for defaultPrevented flag) so the event will be cached in IE
		};
	}
	if(has("touch")){
		var EventDelegate = function(){};
		var windowOrientation = window.orientation;
		var fixTouchListener = function(listener){
			return function(originalEvent){
				//Event normalization(for ontouchxxx and resize):
				//1.incorrect e.pageX|pageY in iOS
				//2.there are no "e.rotation", "e.scale" and "onorientationchange" in Android
				//3.More TBD e.g. force | screenX | screenX | clientX | clientY | radiusX | radiusY

				// see if it has already been corrected
				var event = originalEvent.corrected;
				if(!event){
					var type = originalEvent.type;
					try{
						delete originalEvent.type; // on some JS engines (android), deleting properties makes them mutable
					}catch(e){}
					if(originalEvent.type){
						// Deleting the property of the original event did not work (this is the case of
						// browsers such as older Safari iOS), hence fallback:
						if(has("touch-can-modify-event-delegate")){
							// If deleting properties of delegated event works, use event delegation:
							EventDelegate.prototype = originalEvent;
							event = new EventDelegate;
						}else{
							// Otherwise last fallback: other browsers, such as mobile Firefox, do not like
							// delegated properties, so we have to copy
							event = {};
							for(var name in originalEvent){
								event[name] = originalEvent[name];
							}
						}
						// have to delegate methods to make them work
						event.preventDefault = function(){
							originalEvent.preventDefault();
						};
						event.stopPropagation = function(){
							originalEvent.stopPropagation();
						};
					}else{
						// deletion worked, use property as is
						event = originalEvent;
						event.type = type;
					}
					originalEvent.corrected = event;
					if(type == 'resize'){
						if(windowOrientation == window.orientation){
							return null;//double tap causes an unexpected 'resize' in Android
						}
						windowOrientation = window.orientation;
						event.type = "orientationchange";
						return listener.call(this, event);
					}
					// We use the original event and augment, rather than doing an expensive mixin operation
					if(!("rotation" in event)){ // test to see if it has rotation
						event.rotation = 0;
						event.scale = 1;
					}
					if (window.TouchEvent && originalEvent instanceof TouchEvent) {
						// use event.changedTouches[0].pageX|pageY|screenX|screenY|clientX|clientY|target
						var firstChangeTouch = event.changedTouches[0];
						for(var i in firstChangeTouch){ // use for-in, we don't need to have dependency on dojo/_base/lang here
							delete event[i]; // delete it first to make it mutable
							event[i] = firstChangeTouch[i];
						}
					}
				}
				return listener.call(this, event);
			};
		};
	}
	return on;
});

},
'dojo/_base/sniff':function(){
define(["./kernel", "./lang", "../sniff"], function(dojo, lang, has){
	// module:
	//		dojo/_base/sniff

	/*=====
	return {
		// summary:
		//		Deprecated.   New code should use dojo/sniff.
		//		This module populates the dojo browser version sniffing properties like dojo.isIE.
	};
	=====*/

	if(! 1 ){
		return has;
	}

	// no idea what this is for, or if it's used
	dojo._name = "browser";

	lang.mixin(dojo, {
		// isBrowser: Boolean
		//		True if the client is a web-browser
		isBrowser: true,

		// isFF: Number|undefined
		//		Version as a Number if client is FireFox. undefined otherwise. Corresponds to
		//		major detected FireFox version (1.5, 2, 3, etc.)
		isFF: has("ff"),

		// isIE: Number|undefined
		//		Version as a Number if client is MSIE(PC). undefined otherwise. Corresponds to
		//		major detected IE version (6, 7, 8, etc.)
		isIE: has("ie"),

		// isKhtml: Number|undefined
		//		Version as a Number if client is a KHTML browser. undefined otherwise. Corresponds to major
		//		detected version.
		isKhtml: has("khtml"),

		// isWebKit: Number|undefined
		//		Version as a Number if client is a WebKit-derived browser (Konqueror,
		//		Safari, Chrome, etc.). undefined otherwise.
		isWebKit: has("webkit"),

		// isMozilla: Number|undefined
		//		Version as a Number if client is a Mozilla-based browser (Firefox,
		//		SeaMonkey). undefined otherwise. Corresponds to major detected version.
		isMozilla: has("mozilla"),
		// isMoz: Number|undefined
		//		Version as a Number if client is a Mozilla-based browser (Firefox,
		//		SeaMonkey). undefined otherwise. Corresponds to major detected version.
		isMoz: has("mozilla"),

		// isOpera: Number|undefined
		//		Version as a Number if client is Opera. undefined otherwise. Corresponds to
		//		major detected version.
		isOpera: has("opera"),

		// isSafari: Number|undefined
		//		Version as a Number if client is Safari or iPhone. undefined otherwise.
		isSafari: has("safari"),

		// isChrome: Number|undefined
		//		Version as a Number if client is Chrome browser. undefined otherwise.
		isChrome: has("chrome"),

		// isMac: Boolean
		//		True if the client runs on Mac
		isMac: has("mac"),

		// isIos: Number|undefined
		//		Version as a Number if client is iPhone, iPod, or iPad. undefined otherwise.
		isIos: has("ios"),

		// isAndroid: Number|undefined
		//		Version as a Number if client is android browser. undefined otherwise.
		isAndroid: has("android"),

		// isWii: Boolean
		//		True if client is Wii
		isWii: has("wii"),

		// isQuirks: Boolean
		//		Page is in quirks mode.
		isQuirks: has("quirks"),

		// isAir: Boolean
		//		True if client is Adobe Air
		isAir: has("air")
	});

	return has;
});

},
'dojo/errors/create':function(){
define(["../_base/lang"], function(lang){
	return function(name, ctor, base, props){
		base = base || Error;

		var ErrorCtor = function(message){
			if(base === Error){
				if(Error.captureStackTrace){
					Error.captureStackTrace(this, ErrorCtor);
				}

				// Error.call() operates on the returned error
				// object rather than operating on |this|
				var err = Error.call(this, message),
					prop;

				// Copy own properties from err to |this|
				for(prop in err){
					if(err.hasOwnProperty(prop)){
						this[prop] = err[prop];
					}
				}

				// messsage is non-enumerable in ES5
				this.message = message;
				// stack is non-enumerable in at least Firefox
				this.stack = err.stack;
			}else{
				base.apply(this, arguments);
			}
			if(ctor){
				ctor.apply(this, arguments);
			}
		};

		ErrorCtor.prototype = lang.delegate(base.prototype, props);
		ErrorCtor.prototype.name = name;
		ErrorCtor.prototype.constructor = ErrorCtor;

		return ErrorCtor;
	};
});

},
'dojo/_base/array':function(){
define(["./kernel", "../has", "./lang"], function(dojo, has, lang){
	// module:
	//		dojo/_base/array

	// our old simple function builder stuff
	var cache = {}, u;

	function buildFn(fn){
		return cache[fn] = new Function("item", "index", "array", fn); // Function
	}
	// magic snippet: if(typeof fn == "string") fn = cache[fn] || buildFn(fn);

	// every & some

	function everyOrSome(some){
		var every = !some;
		return function(a, fn, o){
			var i = 0, l = a && a.length || 0, result;
			if(l && typeof a == "string") a = a.split("");
			if(typeof fn == "string") fn = cache[fn] || buildFn(fn);
			if(o){
				for(; i < l; ++i){
					result = !fn.call(o, a[i], i, a);
					if(some ^ result){
						return !result;
					}
				}
			}else{
				for(; i < l; ++i){
					result = !fn(a[i], i, a);
					if(some ^ result){
						return !result;
					}
				}
			}
			return every; // Boolean
		};
	}

	// indexOf, lastIndexOf

	function index(up){
		var delta = 1, lOver = 0, uOver = 0;
		if(!up){
			delta = lOver = uOver = -1;
		}
		return function(a, x, from, last){
			if(last && delta > 0){
				// TODO: why do we use a non-standard signature? why do we need "last"?
				return array.lastIndexOf(a, x, from);
			}
			var l = a && a.length || 0, end = up ? l + uOver : lOver, i;
			if(from === u){
				i = up ? lOver : l + uOver;
			}else{
				if(from < 0){
					i = l + from;
					if(i < 0){
						i = lOver;
					}
				}else{
					i = from >= l ? l + uOver : from;
				}
			}
			if(l && typeof a == "string") a = a.split("");
			for(; i != end; i += delta){
				if(a[i] == x){
					return i; // Number
				}
			}
			return -1; // Number
		};
	}

	var array = {
		// summary:
		//		The Javascript v1.6 array extensions.

		every: everyOrSome(false),
		/*=====
		 every: function(arr, callback, thisObject){
			 // summary:
			 //		Determines whether or not every item in arr satisfies the
			 //		condition implemented by callback.
			 // arr: Array|String
			 //		the array to iterate on. If a string, operates on individual characters.
			 // callback: Function|String
			 //		a function is invoked with three arguments: item, index,
			 //		and array and returns true if the condition is met.
			 // thisObject: Object?
			 //		may be used to scope the call to callback
			 // returns: Boolean
			 // description:
			 //		This function corresponds to the JavaScript 1.6 Array.every() method, with one difference: when
			 //		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			 //		the callback function with a value of undefined. JavaScript 1.6's every skips the holes in the sparse array.
			 //		For more details, see:
			 //		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/every
			 // example:
			 //	|	// returns false
			 //	|	array.every([1, 2, 3, 4], function(item){ return item>1; });
			 // example:
			 //	|	// returns true
			 //	|	array.every([1, 2, 3, 4], function(item){ return item>0; });
		 },
		 =====*/

		some: everyOrSome(true),
		/*=====
		some: function(arr, callback, thisObject){
			// summary:
			//		Determines whether or not any item in arr satisfies the
			//		condition implemented by callback.
			// arr: Array|String
			//		the array to iterate over. If a string, operates on individual characters.
			// callback: Function|String
			//		a function is invoked with three arguments: item, index,
			//		and array and returns true if the condition is met.
			// thisObject: Object?
			//		may be used to scope the call to callback
			// returns: Boolean
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.some() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's some skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/some
			// example:
			//	| // is true
			//	| array.some([1, 2, 3, 4], function(item){ return item>1; });
			// example:
			//	| // is false
			//	| array.some([1, 2, 3, 4], function(item){ return item<1; });
		},
		=====*/

		indexOf: index(true),
		/*=====
		indexOf: function(arr, value, fromIndex, findLast){
			// summary:
			//		locates the first index of the provided value in the
			//		passed array. If the value is not found, -1 is returned.
			// description:
			//		This method corresponds to the JavaScript 1.6 Array.indexOf method, with two differences:
			//
			//		1. when run over sparse arrays, the Dojo function invokes the callback for every index
			//		   whereas JavaScript 1.6's indexOf skips the holes in the sparse array.
			//		2. uses equality (==) rather than strict equality (===)
			//
			//		For details on this method, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/indexOf
			// arr: Array
			// value: Object
			// fromIndex: Integer?
			// findLast: Boolean?
			//		Makes indexOf() work like lastIndexOf().  Used internally; not meant for external usage.
			// returns: Number
		},
		=====*/

		lastIndexOf: index(false),
		/*=====
		lastIndexOf: function(arr, value, fromIndex){
			// summary:
			//		locates the last index of the provided value in the passed
			//		array. If the value is not found, -1 is returned.
			// description:
		 	//		This method corresponds to the JavaScript 1.6 Array.lastIndexOf method, with two differences:
		 	//
		 	//		1. when run over sparse arrays, the Dojo function invokes the callback for every index
		 	//		   whereas JavaScript 1.6's lasIndexOf skips the holes in the sparse array.
		 	//		2. uses equality (==) rather than strict equality (===)
		 	//
		 	//		For details on this method, see:
		 	//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/lastIndexOf
			// arr: Array,
			// value: Object,
			// fromIndex: Integer?
			// returns: Number
		},
		=====*/

		forEach: function(arr, callback, thisObject){
			// summary:
			//		for every item in arr, callback is invoked. Return values are ignored.
			//		If you want to break out of the loop, consider using array.every() or array.some().
			//		forEach does not allow breaking out of the loop over the items in arr.
			// arr:
			//		the array to iterate over. If a string, operates on individual characters.
			// callback:
			//		a function is invoked with three arguments: item, index, and array
			// thisObject:
			//		may be used to scope the call to callback
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.forEach() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's forEach skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach
			// example:
			//	| // log out all members of the array:
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		function(item){
			//	|			console.log(item);
			//	|		}
			//	| );
			// example:
			//	| // log out the members and their indexes
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		function(item, idx, arr){
			//	|			console.log(item, "at index:", idx);
			//	|		}
			//	| );
			// example:
			//	| // use a scoped object member as the callback
			//	|
			//	| var obj = {
			//	|		prefix: "logged via obj.callback:",
			//	|		callback: function(item){
			//	|			console.log(this.prefix, item);
			//	|		}
			//	| };
			//	|
			//	| // specifying the scope function executes the callback in that scope
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		obj.callback,
			//	|		obj
			//	| );
			//	|
			//	| // alternately, we can accomplish the same thing with lang.hitch()
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		lang.hitch(obj, "callback")
			//	| );
			// arr: Array|String
			// callback: Function|String
			// thisObject: Object?

			var i = 0, l = arr && arr.length || 0;
			if(l && typeof arr == "string") arr = arr.split("");
			if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
			if(thisObject){
				for(; i < l; ++i){
					callback.call(thisObject, arr[i], i, arr);
				}
			}else{
				for(; i < l; ++i){
					callback(arr[i], i, arr);
				}
			}
		},

		map: function(arr, callback, thisObject, Ctr){
			// summary:
			//		applies callback to each element of arr and returns
			//		an Array with the results
			// arr: Array|String
			//		the array to iterate on. If a string, operates on
			//		individual characters.
			// callback: Function|String
			//		a function is invoked with three arguments, (item, index,
			//		array),	 and returns a value
			// thisObject: Object?
			//		may be used to scope the call to callback
			// returns: Array
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.map() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's map skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
			// example:
			//	| // returns [2, 3, 4, 5]
			//	| array.map([1, 2, 3, 4], function(item){ return item+1 });

			// TODO: why do we have a non-standard signature here? do we need "Ctr"?
			var i = 0, l = arr && arr.length || 0, out = new (Ctr || Array)(l);
			if(l && typeof arr == "string") arr = arr.split("");
			if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
			if(thisObject){
				for(; i < l; ++i){
					out[i] = callback.call(thisObject, arr[i], i, arr);
				}
			}else{
				for(; i < l; ++i){
					out[i] = callback(arr[i], i, arr);
				}
			}
			return out; // Array
		},

		filter: function(arr, callback, thisObject){
			// summary:
			//		Returns a new Array with those items from arr that match the
			//		condition implemented by callback.
			// arr: Array
			//		the array to iterate over.
			// callback: Function|String
			//		a function that is invoked with three arguments (item,
			//		index, array). The return of this function is expected to
			//		be a boolean which determines whether the passed-in item
			//		will be included in the returned array.
			// thisObject: Object?
			//		may be used to scope the call to callback
			// returns: Array
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.filter() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's filter skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
			// example:
			//	| // returns [2, 3, 4]
			//	| array.filter([1, 2, 3, 4], function(item){ return item>1; });

			// TODO: do we need "Ctr" here like in map()?
			var i = 0, l = arr && arr.length || 0, out = [], value;
			if(l && typeof arr == "string") arr = arr.split("");
			if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
			if(thisObject){
				for(; i < l; ++i){
					value = arr[i];
					if(callback.call(thisObject, value, i, arr)){
						out.push(value);
					}
				}
			}else{
				for(; i < l; ++i){
					value = arr[i];
					if(callback(value, i, arr)){
						out.push(value);
					}
				}
			}
			return out; // Array
		},

		clearCache: function(){
			cache = {};
		}
	};


	 1  && lang.mixin(dojo, array);

	return array;
});

},
'dojo/_base/json':function(){
define(["./kernel", "../json"], function(dojo, json){

// module:
//		dojo/_base/json

/*=====
return {
	// summary:
	//		This module defines the dojo JSON API.
};
=====*/

dojo.fromJson = function(/*String*/ js){
	// summary:
	//		Parses a JavaScript expression and returns a JavaScript value.
	// description:
	//		Throws for invalid JavaScript expressions. It does not use a strict JSON parser. It
	//		always delegates to eval(). The content passed to this method must therefore come
	//		from a trusted source.
	//		It is recommend that you use dojo/json's parse function for an
	//		implementation uses the (faster) native JSON parse when available.
	// js:
	//		a string literal of a JavaScript expression, for instance:
	//		`'{ "foo": [ "bar", 1, { "baz": "thud" } ] }'`

	return eval("(" + js + ")"); // Object
};

/*=====
dojo._escapeString = function(){
	// summary:
	//		Adds escape sequences for non-visual characters, double quote and
	//		backslash and surrounds with double quotes to form a valid string
	//		literal.
};
=====*/
dojo._escapeString = json.stringify; // just delegate to json.stringify

dojo.toJsonIndentStr = "\t";
dojo.toJson = function(/*Object*/ it, /*Boolean?*/ prettyPrint){
	// summary:
	//		Returns a [JSON](http://json.org) serialization of an object.
	// description:
	//		Returns a [JSON](http://json.org) serialization of an object.
	//		Note that this doesn't check for infinite recursion, so don't do that!
	//		It is recommend that you use dojo/json's stringify function for an lighter
	//		and faster implementation that matches the native JSON API and uses the
	//		native JSON serializer when available.
	// it:
	//		an object to be serialized. Objects may define their own
	//		serialization via a special "__json__" or "json" function
	//		property. If a specialized serializer has been defined, it will
	//		be used as a fallback.
	//		Note that in 1.6, toJson would serialize undefined, but this no longer supported
	//		since it is not supported by native JSON serializer.
	// prettyPrint:
	//		if true, we indent objects and arrays to make the output prettier.
	//		The variable `dojo.toJsonIndentStr` is used as the indent string --
	//		to use something other than the default (tab), change that variable
	//		before calling dojo.toJson().
	//		Note that if native JSON support is available, it will be used for serialization,
	//		and native implementations vary on the exact spacing used in pretty printing.
	// returns:
	//		A JSON string serialization of the passed-in object.
	// example:
	//		simple serialization of a trivial object
	//		|	var jsonStr = dojo.toJson({ howdy: "stranger!", isStrange: true });
	//		|	doh.is('{"howdy":"stranger!","isStrange":true}', jsonStr);
	// example:
	//		a custom serializer for an objects of a particular class:
	//		|	dojo.declare("Furby", null, {
	//		|		furbies: "are strange",
	//		|		furbyCount: 10,
	//		|		__json__: function(){
	//		|		},
	//		|	});

	// use dojo/json
	return json.stringify(it, function(key, value){
		if(value){
			var tf = value.__json__||value.json;
			if(typeof tf == "function"){
				return tf.call(value);
			}
		}
		return value;
	}, prettyPrint && dojo.toJsonIndentStr);	// String
};

return dojo;
});

},
'dojo/_base/window':function(){
define(["./kernel", "./lang", "../sniff"], function(dojo, lang, has){
// module:
//		dojo/_base/window

var ret = {
	// summary:
	//		API to save/set/restore the global/document scope.

	global: dojo.global,
	/*=====
	 global: {
		 // summary:
		 //		Alias for the current window. 'global' can be modified
		 //		for temporary context shifting. See also withGlobal().
		 // description:
		 //		Use this rather than referring to 'window' to ensure your code runs
		 //		correctly in managed contexts.
	 },
	 =====*/

	doc: dojo.global["document"] || null,
	/*=====
	doc: {
		// summary:
		//		Alias for the current document. 'doc' can be modified
		//		for temporary context shifting. See also withDoc().
		// description:
		//		Use this rather than referring to 'window.document' to ensure your code runs
		//		correctly in managed contexts.
		// example:
		//	|	n.appendChild(dojo.doc.createElement('div'));
	},
	=====*/

	body: function(/*Document?*/ doc){
		// summary:
		//		Return the body element of the specified document or of dojo/_base/window::doc.
		// example:
		//	|	win.body().appendChild(dojo.doc.createElement('div'));

		// Note: document.body is not defined for a strict xhtml document
		// Would like to memoize this, but dojo.doc can change vi dojo.withDoc().
		doc = doc || dojo.doc;
		return doc.body || doc.getElementsByTagName("body")[0]; // Node
	},

	setContext: function(/*Object*/ globalObject, /*DocumentElement*/ globalDocument){
		// summary:
		//		changes the behavior of many core Dojo functions that deal with
		//		namespace and DOM lookup, changing them to work in a new global
		//		context (e.g., an iframe). The varibles dojo.global and dojo.doc
		//		are modified as a result of calling this function and the result of
		//		`dojo.body()` likewise differs.
		dojo.global = ret.global = globalObject;
		dojo.doc = ret.doc = globalDocument;
	},

	withGlobal: function(	/*Object*/ globalObject,
							/*Function*/ callback,
							/*Object?*/ thisObject,
							/*Array?*/ cbArguments){
		// summary:
		//		Invoke callback with globalObject as dojo.global and
		//		globalObject.document as dojo.doc.
		// description:
		//		Invoke callback with globalObject as dojo.global and
		//		globalObject.document as dojo.doc. If provided, globalObject
		//		will be executed in the context of object thisObject
		//		When callback() returns or throws an error, the dojo.global
		//		and dojo.doc will be restored to its previous state.

		var oldGlob = dojo.global;
		try{
			dojo.global = ret.global = globalObject;
			return ret.withDoc.call(null, globalObject.document, callback, thisObject, cbArguments);
		}finally{
			dojo.global = ret.global = oldGlob;
		}
	},

	withDoc: function(	/*DocumentElement*/ documentObject,
						/*Function*/ callback,
						/*Object?*/ thisObject,
						/*Array?*/ cbArguments){
		// summary:
		//		Invoke callback with documentObject as dojo/_base/window::doc.
		// description:
		//		Invoke callback with documentObject as dojo/_base/window::doc. If provided,
		//		callback will be executed in the context of object thisObject
		//		When callback() returns or throws an error, the dojo/_base/window::doc will
		//		be restored to its previous state.

		var oldDoc = ret.doc,
			oldQ = has("quirks"),
			oldIE = has("ie"), isIE, mode, pwin;

		try{
			dojo.doc = ret.doc = documentObject;
			// update dojo.isQuirks and the value of the has feature "quirks".
			// remove setting dojo.isQuirks and dojo.isIE for 2.0
			dojo.isQuirks = has.add("quirks", dojo.doc.compatMode == "BackCompat", true, true); // no need to check for QuirksMode which was Opera 7 only

			if(has("ie")){
				if((pwin = documentObject.parentWindow) && pwin.navigator){
					// re-run IE detection logic and update dojo.isIE / has("ie")
					// (the only time parentWindow/navigator wouldn't exist is if we were not
					// passed an actual legitimate document object)
					isIE = parseFloat(pwin.navigator.appVersion.split("MSIE ")[1]) || undefined;
					mode = documentObject.documentMode;
					if(mode && mode != 5 && Math.floor(isIE) != mode){
						isIE = mode;
					}
					dojo.isIE = has.add("ie", isIE, true, true);
				}
			}

			if(thisObject && typeof callback == "string"){
				callback = thisObject[callback];
			}

			return callback.apply(thisObject, cbArguments || []);
		}finally{
			dojo.doc = ret.doc = oldDoc;
			dojo.isQuirks = has.add("quirks", oldQ, true, true);
			dojo.isIE = has.add("ie", oldIE, true, true);
		}
	}
};

 1  && lang.mixin(dojo, ret);

return ret;

});

},
'dojo/dom-class':function(){
define(["./_base/lang", "./_base/array", "./dom"], function(lang, array, dom){
	// module:
	//		dojo/dom-class

	var className = "className";

	/* Part I of classList-based implementation is preserved here for posterity
	var classList = "classList";
	has.add("dom-classList", function(){
		return classList in document.createElement("p");
	});
	*/

	// =============================
	// (CSS) Class Functions
	// =============================

	var cls, // exports object
		spaces = /\s+/, a1 = [""];

	function str2array(s){
		if(typeof s == "string" || s instanceof String){
			if(s && !spaces.test(s)){
				a1[0] = s;
				return a1;
			}
			var a = s.split(spaces);
			if(a.length && !a[0]){
				a.shift();
			}
			if(a.length && !a[a.length - 1]){
				a.pop();
			}
			return a;
		}
		// assumed to be an array
		if(!s){
			return [];
		}
		return array.filter(s, function(x){ return x; });
	}

	/* Part II of classList-based implementation is preserved here for posterity
	if(has("dom-classList")){
		// new classList version
		cls = {
			contains: function containsClass(node, classStr){
				var clslst = classStr && dom.byId(node)[classList];
				return clslst && clslst.contains(classStr); // Boolean
			},

			add: function addClass(node, classStr){
				node = dom.byId(node);
				classStr = str2array(classStr);
				for(var i = 0, len = classStr.length; i < len; ++i){
					node[classList].add(classStr[i]);
				}
			},

			remove: function removeClass(node, classStr){
				node = dom.byId(node);
				if(classStr === undefined){
					node[className] = "";
				}else{
					classStr = str2array(classStr);
					for(var i = 0, len = classStr.length; i < len; ++i){
						node[classList].remove(classStr[i]);
					}
				}
			},

			replace: function replaceClass(node, addClassStr, removeClassStr){
				node = dom.byId(node);
				if(removeClassStr === undefined){
					node[className] = "";
				}else{
					removeClassStr = str2array(removeClassStr);
					for(var i = 0, len = removeClassStr.length; i < len; ++i){
						node[classList].remove(removeClassStr[i]);
					}
				}
				addClassStr = str2array(addClassStr);
				for(i = 0, len = addClassStr.length; i < len; ++i){
					node[classList].add(addClassStr[i]);
				}
			},

			toggle: function toggleClass(node, classStr, condition){
				node = dom.byId(node);
				if(condition === undefined){
					classStr = str2array(classStr);
					for(var i = 0, len = classStr.length; i < len; ++i){
						node[classList].toggle(classStr[i]);
					}
				}else{
					cls[condition ? "add" : "remove"](node, classStr);
				}
				return condition;   // Boolean
			}
		}
	}
	*/

	// regular DOM version
	var fakeNode = {};  // for effective replacement
	cls = {
		// summary:
		//		This module defines the core dojo DOM class API.

		contains: function containsClass(/*DomNode|String*/ node, /*String*/ classStr){
			// summary:
			//		Returns whether or not the specified classes are a portion of the
			//		class list currently applied to the node.
			// node: String|DOMNode
			//		String ID or DomNode reference to check the class for.
			// classStr: String
			//		A string class name to look for.
			// example:
			//		Do something if a node with id="someNode" has class="aSillyClassName" present
			//	|	if(domClass.contains("someNode","aSillyClassName")){ ... }

			return ((" " + dom.byId(node)[className] + " ").indexOf(" " + classStr + " ") >= 0); // Boolean
		},

		add: function addClass(/*DomNode|String*/ node, /*String|Array*/ classStr){
			// summary:
			//		Adds the specified classes to the end of the class list on the
			//		passed node. Will not re-apply duplicate classes.
			//
			// node: String|DOMNode
			//		String ID or DomNode reference to add a class string too
			//
			// classStr: String|Array
			//		A String class name to add, or several space-separated class names,
			//		or an array of class names.
			//
			// example:
			//		Add a class to some node:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.add("someNode", "anewClass");
			//	|	});
			//
			// example:
			//		Add two classes at once:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.add("someNode", "firstClass secondClass");
			//	|	});
			//
			// example:
			//		Add two classes at once (using array):
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.add("someNode", ["firstClass", "secondClass"]);
			//	|	});
			//
			// example:
			//		Available in `dojo/NodeList` for multiple additions
			//	|	require(["dojo/query"], function(query){
			//	|		query("ul > li").addClass("firstLevel");
			//	|	});

			node = dom.byId(node);
			classStr = str2array(classStr);
			var cls = node[className], oldLen;
			cls = cls ? " " + cls + " " : " ";
			oldLen = cls.length;
			for(var i = 0, len = classStr.length, c; i < len; ++i){
				c = classStr[i];
				if(c && cls.indexOf(" " + c + " ") < 0){
					cls += c + " ";
				}
			}
			if(oldLen < cls.length){
				node[className] = cls.substr(1, cls.length - 2);
			}
		},

		remove: function removeClass(/*DomNode|String*/ node, /*String|Array?*/ classStr){
			// summary:
			//		Removes the specified classes from node. No `contains()`
			//		check is required.
			//
			// node: String|DOMNode
			//		String ID or DomNode reference to remove the class from.
			//
			// classStr: String|Array
			//		An optional String class name to remove, or several space-separated
			//		class names, or an array of class names. If omitted, all class names
			//		will be deleted.
			//
			// example:
			//		Remove a class from some node:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.remove("someNode", "firstClass");
			//	|	});
			//
			// example:
			//		Remove two classes from some node:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.remove("someNode", "firstClass secondClass");
			//	|	});
			//
			// example:
			//		Remove two classes from some node (using array):
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.remove("someNode", ["firstClass", "secondClass"]);
			//	|	});
			//
			// example:
			//		Remove all classes from some node:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.remove("someNode");
			//	|	});
			//
			// example:
			//		Available in `dojo/NodeList` for multiple removal
			//	|	require(["dojo/query"], function(query){
			//	|		query("ul > li").removeClass("foo");
			//	|	});

			node = dom.byId(node);
			var cls;
			if(classStr !== undefined){
				classStr = str2array(classStr);
				cls = " " + node[className] + " ";
				for(var i = 0, len = classStr.length; i < len; ++i){
					cls = cls.replace(" " + classStr[i] + " ", " ");
				}
				cls = lang.trim(cls);
			}else{
				cls = "";
			}
			if(node[className] != cls){ node[className] = cls; }
		},

		replace: function replaceClass(/*DomNode|String*/ node, /*String|Array*/ addClassStr, /*String|Array?*/ removeClassStr){
			// summary:
			//		Replaces one or more classes on a node if not present.
			//		Operates more quickly than calling domClass.remove and domClass.add
			//
			// node: String|DOMNode
			//		String ID or DomNode reference to remove the class from.
			//
			// addClassStr: String|Array
			//		A String class name to add, or several space-separated class names,
			//		or an array of class names.
			//
			// removeClassStr: String|Array?
			//		A String class name to remove, or several space-separated class names,
			//		or an array of class names.
			//
			// example:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.replace("someNode", "add1 add2", "remove1 remove2");
			//	|	});
			//
			// example:
			//	Replace all classes with addMe
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.replace("someNode", "addMe");
			//	|	});
			//
			// example:
			//	Available in `dojo/NodeList` for multiple toggles
			//	|	require(["dojo/query"], function(query){
			//	|		query(".findMe").replaceClass("addMe", "removeMe");
			//	|	});

			node = dom.byId(node);
			fakeNode[className] = node[className];
			cls.remove(fakeNode, removeClassStr);
			cls.add(fakeNode, addClassStr);
			if(node[className] !== fakeNode[className]){
				node[className] = fakeNode[className];
			}
		},

		toggle: function toggleClass(/*DomNode|String*/ node, /*String|Array*/ classStr, /*Boolean?*/ condition){
			// summary:
			//		Adds a class to node if not present, or removes if present.
			//		Pass a boolean condition if you want to explicitly add or remove.
			//		Returns the condition that was specified directly or indirectly.
			//
			// node: String|DOMNode
			//		String ID or DomNode reference to toggle a class string
			//
			// classStr: String|Array
			//		A String class name to toggle, or several space-separated class names,
			//		or an array of class names.
			//
			// condition:
			//		If passed, true means to add the class, false means to remove.
			//		Otherwise domClass.contains(node, classStr) is used to detect the class presence.
			//
			// example:
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.toggle("someNode", "hovered");
			//	|	});
			//
			// example:
			//		Forcefully add a class
			//	|	require(["dojo/dom-class"], function(domClass){
			//	|		domClass.toggle("someNode", "hovered", true);
			//	|	});
			//
			// example:
			//		Available in `dojo/NodeList` for multiple toggles
			//	|	require(["dojo/query"], function(query){
			//	|		query(".toggleMe").toggleClass("toggleMe");
			//	|	});

			node = dom.byId(node);
			if(condition === undefined){
				classStr = str2array(classStr);
				for(var i = 0, len = classStr.length, c; i < len; ++i){
					c = classStr[i];
					cls[cls.contains(node, c) ? "remove" : "add"](node, c);
				}
			}else{
				cls[condition ? "add" : "remove"](node, classStr);
			}
			return condition;   // Boolean
		}
	};

	return cls;
});

},
'dojo/_base/config':function(){
define(["../global", "../has", "require"], function(global, has, require){
	// module:
	//		dojo/_base/config

/*=====
return {
	// summary:
	//		This module defines the user configuration during bootstrap.
	// description:
	//		By defining user configuration as a module value, an entire configuration can be specified in a build,
	//		thereby eliminating the need for sniffing and or explicitly setting in the global variable dojoConfig.
	//		Also, when multiple instances of dojo exist in a single application, each will necessarily be located
	//		at an unique absolute module identifier as given by the package configuration. Implementing configuration
	//		as a module allows for specifying unique, per-instance configurations.
	// example:
	//		Create a second instance of dojo with a different, instance-unique configuration (assume the loader and
	//		dojo.js are already loaded).
	//		|	// specify a configuration that creates a new instance of dojo at the absolute module identifier "myDojo"
	//		|	require({
	//		|		packages:[{
	//		|			name:"myDojo",
	//		|			location:".", //assume baseUrl points to dojo.js
	//		|		}]
	//		|	});
	//		|
	//		|	// specify a configuration for the myDojo instance
	//		|	define("myDojo/config", {
	//		|		// normal configuration variables go here, e.g.,
	//		|		locale:"fr-ca"
	//		|	});
	//		|
	//		|	// load and use the new instance of dojo
	//		|	require(["myDojo"], function(dojo){
	//		|		// dojo is the new instance of dojo
	//		|		// use as required
	//		|	});

	// isDebug: Boolean
	//		Defaults to `false`. If set to `true`, ensures that Dojo provides
	//		extended debugging feedback to the console.
	isDebug: false,

	// locale: String
	//		The locale to assume for loading localized resources in this page,
	//		specified according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt).
	//		Must be specified entirely in lowercase, e.g. `en-us` and `zh-cn`.
	//		See the documentation for `dojo.i18n` and `dojo.requireLocalization`
	//		for details on loading localized resources. If no locale is specified,
	//		Dojo assumes the locale of the user agent, according to `navigator.userLanguage`
	//		or `navigator.language` properties.
	locale: undefined,

	// extraLocale: Array
	//		No default value. Specifies additional locales whose
	//		resources should also be loaded alongside the default locale when
	//		calls to `dojo.requireLocalization()` are processed.
	extraLocale: undefined,

	// baseUrl: String
	//		The directory in which `dojo.js` is located. Under normal
	//		conditions, Dojo auto-detects the correct location from which it
	//		was loaded. You may need to manually configure `baseUrl` in cases
	//		where you have renamed `dojo.js` or in which `<base>` tags confuse
	//		some browsers (e.g. IE 6). The variable `dojo.baseUrl` is assigned
	//		either the value of `djConfig.baseUrl` if one is provided or the
	//		auto-detected root if not. Other modules are located relative to
	//		this path. The path should end in a slash.
	baseUrl: undefined,

	// modulePaths: [deprecated] Object
	//		A map of module names to paths relative to `dojo.baseUrl`. The
	//		key/value pairs correspond directly to the arguments which
	//		`dojo.registerModulePath` accepts. Specifying
	//		`djConfig.modulePaths = { "foo": "../../bar" }` is the equivalent
	//		of calling `dojo.registerModulePath("foo", "../../bar");`. Multiple
	//		modules may be configured via `djConfig.modulePaths`.
	modulePaths: {},

	// addOnLoad: Function|Array
	//		Adds a callback via dojo/ready. Useful when Dojo is added after
	//		the page loads and djConfig.afterOnLoad is true. Supports the same
	//		arguments as dojo/ready. When using a function reference, use
	//		`djConfig.addOnLoad = function(){};`. For object with function name use
	//		`djConfig.addOnLoad = [myObject, "functionName"];` and for object with
	//		function reference use
	//		`djConfig.addOnLoad = [myObject, function(){}];`
	addOnLoad: null,

	// parseOnLoad: Boolean
	//		Run the parser after the page is loaded
	parseOnLoad: false,

	// require: String[]
	//		An array of module names to be loaded immediately after dojo.js has been included
	//		in a page.
	require: [],

	// defaultDuration: Number
	//		Default duration, in milliseconds, for wipe and fade animations within dijits.
	//		Assigned to dijit.defaultDuration.
	defaultDuration: 200,

	// dojoBlankHtmlUrl: String
	//		Used by some modules to configure an empty iframe. Used by dojo/io/iframe and
	//		dojo/back, and dijit/popup support in IE where an iframe is needed to make sure native
	//		controls do not bleed through the popups. Normally this configuration variable
	//		does not need to be set, except when using cross-domain/CDN Dojo builds.
	//		Save dojo/resources/blank.html to your domain and set `djConfig.dojoBlankHtmlUrl`
	//		to the path on your domain your copy of blank.html.
	dojoBlankHtmlUrl: undefined,

	// ioPublish: Boolean?
	//		Set this to true to enable publishing of topics for the different phases of
	//		IO operations. Publishing is done via dojo/topic.publish(). See dojo/main.__IoPublish for a list
	//		of topics that are published.
	ioPublish: false,

	// transparentColor: Array
	//		Array containing the r, g, b components used as transparent color in dojo.Color;
	//		if undefined, [255,255,255] (white) will be used.
	transparentColor: undefined,
	
	// deps: Function|Array
	//		Defines dependencies to be used before the loader has been loaded.
	//		When provided, they cause the loader to execute require(deps, callback) 
	//		once it has finished loading. Should be used with callback.
	deps: undefined,
	
	// callback: Function|Array
	//		Defines a callback to be used when dependencies are defined before 
	//		the loader has been loaded. When provided, they cause the loader to 
	//		execute require(deps, callback) once it has finished loading. 
	//		Should be used with deps.
	callback: undefined,
	
	// deferredInstrumentation: Boolean
	//		Whether deferred instrumentation should be loaded or included
	//		in builds.
	deferredInstrumentation: true,

	// useDeferredInstrumentation: Boolean|String
	//		Whether the deferred instrumentation should be used.
	//
	//		* `"report-rejections"`: report each rejection as it occurs.
	//		* `true` or `1` or `"report-unhandled-rejections"`: wait 1 second
	//			in an attempt to detect unhandled rejections.
	useDeferredInstrumentation: "report-unhandled-rejections"
};
=====*/

	var result = {};
	if( 1 ){
		// must be the dojo loader; take a shallow copy of require.rawConfig
		var src = require.rawConfig, p;
		for(p in src){
			result[p] = src[p];
		}
	}else{
		var adviseHas = function(featureSet, prefix, booting){
			for(p in featureSet){
				p!="has" && has.add(prefix + p, featureSet[p], 0, booting);
			}
		};
		result =  1  ?
			// must be a built version of the dojo loader; all config stuffed in require.rawConfig
			require.rawConfig :
			// a foreign loader
			global.dojoConfig || global.djConfig || {};
		adviseHas(result, "config", 1);
		adviseHas(result.has, "", 1);
	}

	if(!result.locale && typeof navigator != "undefined"){
		// Default locale for browsers (ensure it's read from user-settings not download locale).
		var language = (navigator.languages && navigator.languages.length) ? navigator.languages[0] :
			(navigator.language || navigator.userLanguage);
		if(language){
			result.locale = language.toLowerCase();
		}
	}

	return result;
});


},
'dojo/_base/event':function(){
define(["./kernel", "../on", "../has", "../dom-geometry"], function(dojo, on, has, dom){
	// module:
	//		dojo/_base/event

	if(on._fixEvent){
		var fixEvent = on._fixEvent;
		on._fixEvent = function(evt, se){
			// add some additional normalization for back-compat, this isn't in on.js because it is somewhat more expensive
			evt = fixEvent(evt, se);
			if(evt){
				dom.normalizeEvent(evt);
			}
			return evt;
		};		
	}
	
	var ret = {
		// summary:
		//		This module defines dojo DOM event API.   Usually you should use dojo/on, and evt.stopPropagation() +
		//		evt.preventDefault(), rather than this module.

		fix: function(/*Event*/ evt, /*DOMNode*/ sender){
			// summary:
			//		normalizes properties on the event object including event
			//		bubbling methods, keystroke normalization, and x/y positions
			// evt: Event
			//		native event object
			// sender: DOMNode
			//		node to treat as "currentTarget"
			if(on._fixEvent){
				return on._fixEvent(evt, sender);
			}
			return evt;	// Event
		},
	
		stop: function(/*Event*/ evt){
			// summary:
			//		prevents propagation and clobbers the default action of the
			//		passed event
			// evt: Event
			//		The event object. If omitted, window.event is used on IE.
			if(has("dom-addeventlistener") || (evt && evt.preventDefault)){
				evt.preventDefault();
				evt.stopPropagation();
			}else{
				evt = evt || window.event;
				evt.cancelBubble = true;
				on._preventDefault.call(evt);
			}
		}
	};

	if( 1 ){
		dojo.fixEvent = ret.fix;
		dojo.stopEvent = ret.stop;
	}

	return ret;
});

},
'dojo/main':function(){
define([
	"./_base/kernel",	// kernel.isAsync
	"./has",
	"require",
	"./sniff",
	"./_base/lang",
	"./_base/array",
	"./_base/config",
	"./ready",
	"./_base/declare",
	"./_base/connect",
	"./_base/Deferred",
	"./_base/json",
	"./_base/Color",
	"require",
	"./_base/browser",
	"require"
], function(kernel, has, require, sniff, lang, array, config, ready){
	// module:
	//		dojo/main
	// summary:
	//		This is the package main module for the dojo package; it loads dojo base appropriate for the execution environment.

	// Load code to fix IE's console
	if(config.isDebug){
		require(["./_firebug/firebug"]);
	}

	// dojoConfig.require is deprecated; use the loader configuration property deps
	 0 && has.add("dojo-config-require", 1);
	if( 0 ){
		var deps= config.require;
		if(deps){
			// config.require may be dot notation
			deps= array.map(lang.isArray(deps) ? deps : [deps], function(item){ return item.replace(/\./g, "/"); });
			if(kernel.isAsync){
				require(deps);
			}else{
				// this is a bit janky; in 1.6- dojo is defined before these requires are applied; but in 1.7+
				// dojo isn't defined until returning from this module; this is only a problem in sync mode
				// since we're in sync mode, we know we've got our loader with its priority ready queue
				ready(1, function(){require(deps);});
			}
		}
	}

	return kernel;
});

},
'dojo/sniff':function(){
define(["./has"], function(has){
	// module:
	//		dojo/sniff

	/*=====
	return function(){
		// summary:
		//		This module sets has() flags based on the current browser.
		//		It returns the has() function.
	};
	=====*/

	if( 1 ){
		var n = navigator,
			dua = n.userAgent,
			dav = n.appVersion,
			tv = parseFloat(dav);
		has.add("air", dua.indexOf("AdobeAIR") >= 0);
		has.add("wp", parseFloat(dua.split("Windows Phone")[1]) || undefined);
		has.add("msapp", parseFloat(dua.split("MSAppHost/")[1]) || undefined);
		has.add("khtml", dav.indexOf("Konqueror") >= 0 ? tv : undefined);
		has.add("edge", parseFloat(dua.split("Edge/")[1]) || undefined);
		has.add("opr", parseFloat(dua.split("OPR/")[1]) || undefined);
		// NOTE: https://dev.opera.com/blog/opera-user-agent-strings-opera-15-and-beyond/
		has.add("webkit", !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
			&& !has("edge") && parseFloat(dua.split("WebKit/")[1]) || undefined);
		has.add("chrome", !has("edge") && !has("opr")
				&& parseFloat(dua.split("Chrome/")[1]) || undefined);
		has.add("android", !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
				&& parseFloat(dua.split("Android ")[1]) || undefined);
		has.add("safari", dav.indexOf("Safari") >= 0
				&& !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
				&& !has("chrome") && !has("android") && !has("edge") && !has("opr") ?
			parseFloat(dav.split("Version/")[1]) : undefined);
		has.add("mac", dav.indexOf("Macintosh") >= 0);
		has.add("quirks", document.compatMode == "BackCompat");
		if(!has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
				&& dua.match(/(iPhone|iPod|iPad)/)){
			var p = RegExp.$1.replace(/P/, "p");
			var v = dua.match(/OS ([\d_]+)/) ? RegExp.$1 : "1";
			var os = parseFloat(v.replace(/_/, ".").replace(/_/g, ""));
			has.add(p, os);		// "iphone", "ipad" or "ipod"
			has.add("ios", os);
		}
		has.add("bb", (dua.indexOf("BlackBerry") >= 0 || dua.indexOf("BB10") >= 0) && parseFloat(dua.split("Version/")[1]) || undefined);
		has.add("trident", parseFloat(dav.split("Trident/")[1]) || undefined);

		has.add("svg", typeof SVGAngle !== "undefined");

		if(!has("webkit")){
			// Opera
			if(dua.indexOf("Opera") >= 0){
				// see http://dev.opera.com/articles/view/opera-ua-string-changes and http://www.useragentstring.com/pages/Opera/
				// 9.8 has both styles; <9.8, 9.9 only old style
				has.add("opera", tv >= 9.8 ? parseFloat(dua.split("Version/")[1]) || tv : tv);
			}

			// Mozilla and firefox
			if(dua.indexOf("Gecko") >= 0 && !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1
					&& !has("khtml") && !has("trident") && !has("edge")){
				has.add("mozilla", tv);
			}
			if(has("mozilla")){
				//We really need to get away from this. Consider a sane isGecko approach for the future.
				has.add("ff", parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined);
			}

			// IE
			if(document.all && !has("opera")){
				var isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;

				//In cases where the page has an HTTP header or META tag with
				//X-UA-Compatible, then it is in emulation mode.
				//Make sure isIE reflects the desired version.
				//document.documentMode of 5 means quirks mode.
				//Only switch the value if documentMode's major version
				//is different from isIE's major version.
				var mode = document.documentMode;
				if(mode && mode != 5 && Math.floor(isIE) != mode){
					isIE = mode;
				}

				has.add("ie", isIE);
			}

			// Wii
			has.add("wii", typeof opera != "undefined" && opera.wiiremote);
		}
	}

	return has;
});

},
'dojo/request/handlers':function(){
define([
	'../json',
	'../_base/kernel',
	'../_base/array',
	'../has',
	'../selector/_loader' // only included for has() qsa tests
], function(JSON, kernel, array, has){
	has.add('activex', typeof ActiveXObject !== 'undefined');
	has.add('dom-parser', function(global){
		return 'DOMParser' in global;
	});

	var handleXML;
	if(has('activex')){
		// GUIDs obtained from http://msdn.microsoft.com/en-us/library/ms757837(VS.85).aspx
		var dp = [
			'Msxml2.DOMDocument.6.0',
			'Msxml2.DOMDocument.4.0',
			'MSXML2.DOMDocument.3.0',
			'MSXML.DOMDocument' // 2.0
		];
		var lastParser;

		handleXML = function(response){
			var result = response.data;
			var text = response.text;

			if(result && has('dom-qsa2.1') && !result.querySelectorAll && has('dom-parser')){
				// http://bugs.dojotoolkit.org/ticket/15631
				// IE9 supports a CSS3 querySelectorAll implementation, but the DOM implementation
				// returned by IE9 xhr.responseXML does not. Manually create the XML DOM to gain
				// the fuller-featured implementation and avoid bugs caused by the inconsistency
				result = new DOMParser().parseFromString(text, 'application/xml');
			}

			function createDocument(p) {
					try{
						var dom = new ActiveXObject(p);
						dom.async = false;
						dom.loadXML(text);
						result = dom;
						lastParser = p;
					}catch(e){ return false; }
					return true;
			}

			if(!result || !result.documentElement){
				// The creation of an ActiveX object is expensive, so we cache the
				// parser type to avoid trying all parser types each time we handle a
				// document. There is some concern that some parser types might fail
				// depending on the document being parsed. If parsing using the cached
				// parser type fails, we do the more expensive operation of finding one
				// that works for the given document.
				// https://bugs.dojotoolkit.org/ticket/15246
				if(!lastParser || !createDocument(lastParser)) {
					array.some(dp, createDocument);
				}
			}

			return result;
		};
	}

	var handleNativeResponse = function(response) {
		if(!has('native-xhr2-blob') && response.options.handleAs === 'blob' && typeof Blob !== 'undefined'){
			return new Blob([ response.xhr.response ], { type: response.xhr.getResponseHeader('Content-Type') });
		}

		return response.xhr.response;
	}

	var handlers = {
		'javascript': function(response){
			return kernel.eval(response.text || '');
		},
		'json': function(response){
			return JSON.parse(response.text || null);
		},
		'xml': handleXML,
		'blob': handleNativeResponse,
		'arraybuffer': handleNativeResponse,
		'document': handleNativeResponse
	};

	function handle(response){
		var handler = handlers[response.options.handleAs];

		response.data = handler ? handler(response) : (response.data || response.text);

		return response;
	}

	handle.register = function(name, handler){
		handlers[name] = handler;
	};

	return handle;
});

},
'dojo/ready':function(){
define(["./_base/kernel", "./has", "require", "./domReady", "./_base/lang"], function(dojo, has, require, domReady, lang){
	// module:
	//		dojo/ready
	// note:
	//		This module should be unnecessary in dojo 2.0

	var
		// truthy if DOMContentLoaded or better (e.g., window.onload fired) has been achieved
		isDomReady = 0,

		// The queue of functions waiting to execute as soon as dojo.ready conditions satisfied
		loadQ = [],

		// prevent recursion in onLoad
		onLoadRecursiveGuard = 0,

		handleDomReady = function(){
			isDomReady = 1;
			dojo._postLoad = dojo.config.afterOnLoad = true;
			onEvent();
		},

		onEvent = function(){
			// Called when some state changes:
			//		- dom ready
			//		- dojo/domReady has finished processing everything in its queue
			//		- task added to loadQ
			//		- require() has finished loading all currently requested modules
			//
			// Run the functions queued with dojo.ready if appropriate.


			//guard against recursions into this function
			if(onLoadRecursiveGuard){
				return;
			}
			onLoadRecursiveGuard = 1;

			// Run tasks in queue if require() is finished loading modules, the dom is ready, and there are no
			// pending tasks registered via domReady().
			// The last step is necessary so that a user defined dojo.ready() callback is delayed until after the
			// domReady() calls inside of dojo.	  Failure can be seen on dijit/tests/robot/Dialog_ally.html on IE8
			// because the dijit/focus.js domReady() callback doesn't execute until after the test starts running.
			while(isDomReady && (!domReady || domReady._Q.length == 0) && (require.idle ? require.idle() : true) && loadQ.length){
				var f = loadQ.shift();
				try{
					f();
				}catch(e){
					// force the dojo.js on("error") handler do display the message
					e.info = e.message;
					if(require.signal){
						require.signal("error", e);
					}else{
						throw e;
					}
				}
			}

			onLoadRecursiveGuard = 0;
		};

	// Check if we should run the next queue operation whenever require() finishes loading modules or domReady
	// finishes processing it's queue.
	require.on && require.on("idle", onEvent);
	if(domReady){
		domReady._onQEmpty = onEvent;
	}

	var ready = dojo.ready = dojo.addOnLoad = function(priority, context, callback){
		// summary:
		//		Add a function to execute on DOM content loaded and all requested modules have arrived and been evaluated.
		//		In most cases, the `domReady` plug-in should suffice and this method should not be needed.
		//
		//		When called in a non-browser environment, just checks that all requested modules have arrived and been
		//		evaluated.
		// priority: Integer?
		//		The order in which to exec this callback relative to other callbacks, defaults to 1000
		// context: Object?|Function
		//		The context in which to run execute callback, or a callback if not using context
		// callback: Function?
		//		The function to execute.
		//
		// example:
		//	Simple DOM and Modules ready syntax
		//	|	require(["dojo/ready"], function(ready){
		//	|		ready(function(){ alert("Dom ready!"); });
		//	|	});
		//
		// example:
		//	Using a priority
		//	|	require(["dojo/ready"], function(ready){
		//	|		ready(2, function(){ alert("low priority ready!"); })
		//	|	});
		//
		// example:
		//	Using context
		//	|	require(["dojo/ready"], function(ready){
		//	|		ready(foo, function(){
		//	|			// in here, this == foo
		//	|		});
		//	|	});
		//
		// example:
		//	Using dojo/hitch style args:
		//	|	require(["dojo/ready"], function(ready){
		//	|		var foo = { dojoReady: function(){ console.warn(this, "dojo dom and modules ready."); } };
		//	|		ready(foo, "dojoReady");
		//	|	});

		var hitchArgs = lang._toArray(arguments);
		if(typeof priority != "number"){
			callback = context;
			context = priority;
			priority = 1000;
		}else{
			hitchArgs.shift();
		}
		callback = callback ?
			lang.hitch.apply(dojo, hitchArgs) :
			function(){
				context();
			};
		callback.priority = priority;
		for(var i = 0; i < loadQ.length && priority >= loadQ[i].priority; i++){}
		loadQ.splice(i, 0, callback);
		onEvent();
	};

	 1 || has.add("dojo-config-addOnLoad", 1);
	if( 1 ){
		var dca = dojo.config.addOnLoad;
		if(dca){
			ready[(lang.isArray(dca) ? "apply" : "call")](dojo, dca);
		}
	}

	if( 0  && dojo.config.parseOnLoad && !dojo.isAsync){
		ready(99, function(){
			if(!dojo.parser){
				dojo.deprecated("Add explicit require(['dojo/parser']);", "", "2.0");
				require(["dojo/parser"]);
			}
		});
	}

	if(domReady){
		domReady(handleDomReady);
	}else{
		handleDomReady();
	}

	return ready;
});

},
'dojo/aspect':function(){
define([], function(){

	// module:
	//		dojo/aspect

	"use strict";
	var undefined;
	function advise(dispatcher, type, advice, receiveArguments){
		var previous = dispatcher[type];
		var around = type == "around";
		var signal;
		if(around){
			var advised = advice(function(){
				return previous.advice(this, arguments);
			});
			signal = {
				remove: function(){
					if(advised){
						advised = dispatcher = advice = null;
					}
				},
				advice: function(target, args){
					return advised ?
						advised.apply(target, args) :  // called the advised function
						previous.advice(target, args); // cancelled, skip to next one
				}
			};
		}else{
			// create the remove handler
			signal = {
				remove: function(){
					if(signal.advice){
						var previous = signal.previous;
						var next = signal.next;
						if(!next && !previous){
							delete dispatcher[type];
						}else{
							if(previous){
								previous.next = next;
							}else{
								dispatcher[type] = next;
							}
							if(next){
								next.previous = previous;
							}
						}

						// remove the advice to signal that this signal has been removed
						dispatcher = advice = signal.advice = null;
					}
				},
				id: dispatcher.nextId++,
				advice: advice,
				receiveArguments: receiveArguments
			};
		}
		if(previous && !around){
			if(type == "after"){
				// add the listener to the end of the list
				// note that we had to change this loop a little bit to workaround a bizarre IE10 JIT bug
				while(previous.next && (previous = previous.next)){}
				previous.next = signal;
				signal.previous = previous;
			}else if(type == "before"){
				// add to beginning
				dispatcher[type] = signal;
				signal.next = previous;
				previous.previous = signal;
			}
		}else{
			// around or first one just replaces
			dispatcher[type] = signal;
		}
		return signal;
	}
	function aspect(type){
		return function(target, methodName, advice, receiveArguments){
			var existing = target[methodName], dispatcher;
			if(!existing || existing.target != target){
				// no dispatcher in place
				target[methodName] = dispatcher = function(){
					var executionId = dispatcher.nextId;
					// before advice
					var args = arguments;
					var before = dispatcher.before;
					while(before){
						if(before.advice){
							args = before.advice.apply(this, args) || args;
						}
						before = before.next;
					}
					// around advice
					if(dispatcher.around){
						var results = dispatcher.around.advice(this, args);
					}
					// after advice
					var after = dispatcher.after;
					while(after && after.id < executionId){
						if(after.advice){
							if(after.receiveArguments){
								var newResults = after.advice.apply(this, args);
								// change the return value only if a new value was returned
								results = newResults === undefined ? results : newResults;
							}else{
								results = after.advice.call(this, results, args);
							}
						}
						after = after.next;
					}
					return results;
				};
				if(existing){
					dispatcher.around = {advice: function(target, args){
						return existing.apply(target, args);
					}};
				}
				dispatcher.target = target;
				dispatcher.nextId = dispatcher.nextId || 0;
			}
			var results = advise((dispatcher || existing), type, advice, receiveArguments);
			advice = null;
			return results;
		};
	}

	// TODOC: after/before/around return object

	var after = aspect("after");
	/*=====
	after = function(target, methodName, advice, receiveArguments){
		// summary:
		//		The "after" export of the aspect module is a function that can be used to attach
		//		"after" advice to a method. This function will be executed after the original method
		//		is executed. By default the function will be called with a single argument, the return
		//		value of the original method, or the the return value of the last executed advice (if a previous one exists).
		//		The fourth (optional) argument can be set to true to so the function receives the original
		//		arguments (from when the original method was called) rather than the return value.
		//		If there are multiple "after" advisors, they are executed in the order they were registered.
		// target: Object
		//		This is the target object
		// methodName: String
		//		This is the name of the method to attach to.
		// advice: Function
		//		This is function to be called after the original method
		// receiveArguments: Boolean?
		//		If this is set to true, the advice function receives the original arguments (from when the original mehtod
		//		was called) rather than the return value of the original/previous method.
		// returns:
		//		A signal object that can be used to cancel the advice. If remove() is called on this signal object, it will
		//		stop the advice function from being executed.
	};
	=====*/

	var before = aspect("before");
	/*=====
	before = function(target, methodName, advice){
		// summary:
		//		The "before" export of the aspect module is a function that can be used to attach
		//		"before" advice to a method. This function will be executed before the original method
		//		is executed. This function will be called with the arguments used to call the method.
		//		This function may optionally return an array as the new arguments to use to call
		//		the original method (or the previous, next-to-execute before advice, if one exists).
		//		If the before method doesn't return anything (returns undefined) the original arguments
		//		will be preserved.
		//		If there are multiple "before" advisors, they are executed in the reverse order they were registered.
		// target: Object
		//		This is the target object
		// methodName: String
		//		This is the name of the method to attach to.
		// advice: Function
		//		This is function to be called before the original method
	};
	=====*/

	var around = aspect("around");
	/*=====
	 around = function(target, methodName, advice){
		// summary:
		//		The "around" export of the aspect module is a function that can be used to attach
		//		"around" advice to a method. The advisor function is immediately executed when
		//		the around() is called, is passed a single argument that is a function that can be
		//		called to continue execution of the original method (or the next around advisor).
		//		The advisor function should return a function, and this function will be called whenever
		//		the method is called. It will be called with the arguments used to call the method.
		//		Whatever this function returns will be returned as the result of the method call (unless after advise changes it).
		// example:
		//		If there are multiple "around" advisors, the most recent one is executed first,
		//		which can then delegate to the next one and so on. For example:
		//		|	around(obj, "foo", function(originalFoo){
		//		|		return function(){
		//		|			var start = new Date().getTime();
		//		|			var results = originalFoo.apply(this, arguments); // call the original
		//		|			var end = new Date().getTime();
		//		|			console.log("foo execution took " + (end - start) + " ms");
		//		|			return results;
		//		|		};
		//		|	});
		// target: Object
		//		This is the target object
		// methodName: String
		//		This is the name of the method to attach to.
		// advice: Function
		//		This is function to be called around the original method
	};
	=====*/

	return {
		// summary:
		//		provides aspect oriented programming functionality, allowing for
		//		one to add before, around, or after advice on existing methods.
		// example:
		//	|	define(["dojo/aspect"], function(aspect){
		//	|		var signal = aspect.after(targetObject, "methodName", function(someArgument){
		//	|			this will be called when targetObject.methodName() is called, after the original function is called
		//	|		});
		//
		// example:
		//	The returned signal object can be used to cancel the advice.
		//	|	signal.remove(); // this will stop the advice from being executed anymore
		//	|	aspect.before(targetObject, "methodName", function(someArgument){
		//	|		// this will be called when targetObject.methodName() is called, before the original function is called
		//	|	 });

		before: before,
		around: around,
		after: after
	};
});

},
'dojo/_base/connect':function(){
define(["./kernel", "../on", "../topic", "../aspect", "./event", "../mouse", "./sniff", "./lang", "../keys"], function(dojo, on, hub, aspect, eventModule, mouse, has, lang){
// module:
//		dojo/_base/connect

has.add("events-keypress-typed", function(){ // keypresses should only occur a printable character is hit
	var testKeyEvent = {charCode: 0};
	try{
		testKeyEvent = document.createEvent("KeyboardEvent");
		(testKeyEvent.initKeyboardEvent || testKeyEvent.initKeyEvent).call(testKeyEvent, "keypress", true, true, null, false, false, false, false, 9, 3);
	}catch(e){}
	return testKeyEvent.charCode == 0 && !has("opera");
});

function connect_(obj, event, context, method, dontFix){
	method = lang.hitch(context, method);
	if(!obj || !(obj.addEventListener || obj.attachEvent)){
		// it is a not a DOM node and we are using the dojo.connect style of treating a
		// method like an event, must go right to aspect
		return aspect.after(obj || dojo.global, event, method, true);
	}
	if(typeof event == "string" && event.substring(0, 2) == "on"){
		event = event.substring(2);
	}
	if(!obj){
		obj = dojo.global;
	}
	if(!dontFix){
		switch(event){
			// dojo.connect has special handling for these event types
			case "keypress":
				event = keypress;
				break;
			case "mouseenter":
				event = mouse.enter;
				break;
			case "mouseleave":
				event = mouse.leave;
				break;
		}
	}
	return on(obj, event, method, dontFix);
}

var _punctMap = {
	106:42,
	111:47,
	186:59,
	187:43,
	188:44,
	189:45,
	190:46,
	191:47,
	192:96,
	219:91,
	220:92,
	221:93,
	222:39,
	229:113
};
var evtCopyKey = has("mac") ? "metaKey" : "ctrlKey";


var _synthesizeEvent = function(evt, props){
	var faux = lang.mixin({}, evt, props);
	setKeyChar(faux);
	// FIXME: would prefer to use lang.hitch: lang.hitch(evt, evt.preventDefault);
	// but it throws an error when preventDefault is invoked on Safari
	// does Event.preventDefault not support "apply" on Safari?
	faux.preventDefault = function(){ evt.preventDefault(); };
	faux.stopPropagation = function(){ evt.stopPropagation(); };
	return faux;
};
function setKeyChar(evt){
	evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : '';
	evt.charOrCode = evt.keyChar || evt.keyCode;
}
var keypress;
if(has("events-keypress-typed")){
	// this emulates Firefox's keypress behavior where every keydown can correspond to a keypress
	var _trySetKeyCode = function(e, code){
		try{
			// squelch errors when keyCode is read-only
			// (e.g. if keyCode is ctrl or shift)
			return (e.keyCode = code);
		}catch(e){
			return 0;
		}
	};
	keypress = function(object, listener){
		var keydownSignal = on(object, "keydown", function(evt){
			// munge key/charCode
			var k=evt.keyCode;
			// These are Windows Virtual Key Codes
			// http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/WinUI/WindowsUserInterface/UserInput/VirtualKeyCodes.asp
			var unprintable = (k!=13) && k!=32 && (k!=27||!has("ie")) && (k<48||k>90) && (k<96||k>111) && (k<186||k>192) && (k<219||k>222) && k!=229;
			// synthesize keypress for most unprintables and CTRL-keys
			if(unprintable||evt.ctrlKey){
				var c = unprintable ? 0 : k;
				if(evt.ctrlKey){
					if(k==3 || k==13){
						return listener.call(evt.currentTarget, evt); // IE will post CTRL-BREAK, CTRL-ENTER as keypress natively
					}else if(c>95 && c<106){
						c -= 48; // map CTRL-[numpad 0-9] to ASCII
					}else if((!evt.shiftKey)&&(c>=65&&c<=90)){
						c += 32; // map CTRL-[A-Z] to lowercase
					}else{
						c = _punctMap[c] || c; // map other problematic CTRL combinations to ASCII
					}
				}
				// simulate a keypress event
				var faux = _synthesizeEvent(evt, {type: 'keypress', faux: true, charCode: c});
				listener.call(evt.currentTarget, faux);
				if(has("ie")){
					_trySetKeyCode(evt, faux.keyCode);
				}
			}
		});
		var keypressSignal = on(object, "keypress", function(evt){
			var c = evt.charCode;
			c = c>=32 ? c : 0;
			evt = _synthesizeEvent(evt, {charCode: c, faux: true});
			return listener.call(this, evt);
		});
		return {
			remove: function(){
				keydownSignal.remove();
				keypressSignal.remove();
			}
		};
	};
}else{
	if(has("opera")){
		keypress = function(object, listener){
			return on(object, "keypress", function(evt){
				var c = evt.which;
				if(c==3){
					c=99; // Mozilla maps CTRL-BREAK to CTRL-c
				}
				// can't trap some keys at all, like INSERT and DELETE
				// there is no differentiating info between DELETE and ".", or INSERT and "-"
				c = c<32 && !evt.shiftKey ? 0 : c;
				if(evt.ctrlKey && !evt.shiftKey && c>=65 && c<=90){
					// lowercase CTRL-[A-Z] keys
					c += 32;
				}
				return listener.call(this, _synthesizeEvent(evt, { charCode: c }));
			});
		};
	}else{
		keypress = function(object, listener){
			return on(object, "keypress", function(evt){
				setKeyChar(evt);
				return listener.call(this, evt);
			});
		};
	}
}

var connect = {
	// summary:
	//		This module defines the dojo.connect API.
	//		This modules also provides keyboard event handling helpers.
	//		This module exports an extension event for emulating Firefox's keypress handling.
	//		However, this extension event exists primarily for backwards compatibility and
	//		is not recommended. WebKit and IE uses an alternate keypress handling (only
	//		firing for printable characters, to distinguish from keydown events), and most
	//		consider the WebKit/IE behavior more desirable.

	_keypress:keypress,

	connect:function(obj, event, context, method, dontFix){
		// summary:
		//		`dojo.connect` is a deprecated event handling and delegation method in
		//		Dojo. It allows one function to "listen in" on the execution of
		//		any other, triggering the second whenever the first is called. Many
		//		listeners may be attached to a function, and source functions may
		//		be either regular function calls or DOM events.
		//
		// description:
		//		Connects listeners to actions, so that after event fires, a
		//		listener is called with the same arguments passed to the original
		//		function.
		//
		//		Since `dojo.connect` allows the source of events to be either a
		//		"regular" JavaScript function or a DOM event, it provides a uniform
		//		interface for listening to all the types of events that an
		//		application is likely to deal with though a single, unified
		//		interface. DOM programmers may want to think of it as
		//		"addEventListener for everything and anything".
		//
		//		When setting up a connection, the `event` parameter must be a
		//		string that is the name of the method/event to be listened for. If
		//		`obj` is null, `kernel.global` is assumed, meaning that connections
		//		to global methods are supported but also that you may inadvertently
		//		connect to a global by passing an incorrect object name or invalid
		//		reference.
		//
		//		`dojo.connect` generally is forgiving. If you pass the name of a
		//		function or method that does not yet exist on `obj`, connect will
		//		not fail, but will instead set up a stub method. Similarly, null
		//		arguments may simply be omitted such that fewer than 4 arguments
		//		may be required to set up a connection See the examples for details.
		//
		//		The return value is a handle that is needed to
		//		remove this connection with `dojo.disconnect`.
		//
		// obj: Object?
		//		The source object for the event function.
		//		Defaults to `kernel.global` if null.
		//		If obj is a DOM node, the connection is delegated
		//		to the DOM event manager (unless dontFix is true).
		//
		// event: String
		//		String name of the event function in obj.
		//		I.e. identifies a property `obj[event]`.
		//
		// context: Object|null
		//		The object that method will receive as "this".
		//
		//		If context is null and method is a function, then method
		//		inherits the context of event.
		//
		//		If method is a string then context must be the source
		//		object object for method (context[method]). If context is null,
		//		kernel.global is used.
		//
		// method: String|Function
		//		A function reference, or name of a function in context.
		//		The function identified by method fires after event does.
		//		method receives the same arguments as the event.
		//		See context argument comments for information on method's scope.
		//
		// dontFix: Boolean?
		//		If obj is a DOM node, set dontFix to true to prevent delegation
		//		of this connection to the DOM event manager.
		//
		// example:
		//		When obj.onchange(), do ui.update():
		//	|	dojo.connect(obj, "onchange", ui, "update");
		//	|	dojo.connect(obj, "onchange", ui, ui.update); // same
		//
		// example:
		//		Using return value for disconnect:
		//	|	var link = dojo.connect(obj, "onchange", ui, "update");
		//	|	...
		//	|	dojo.disconnect(link);
		//
		// example:
		//		When onglobalevent executes, watcher.handler is invoked:
		//	|	dojo.connect(null, "onglobalevent", watcher, "handler");
		//
		// example:
		//		When ob.onCustomEvent executes, customEventHandler is invoked:
		//	|	dojo.connect(ob, "onCustomEvent", null, "customEventHandler");
		//	|	dojo.connect(ob, "onCustomEvent", "customEventHandler"); // same
		//
		// example:
		//		When ob.onCustomEvent executes, customEventHandler is invoked
		//		with the same scope (this):
		//	|	dojo.connect(ob, "onCustomEvent", null, customEventHandler);
		//	|	dojo.connect(ob, "onCustomEvent", customEventHandler); // same
		//
		// example:
		//		When globalEvent executes, globalHandler is invoked
		//		with the same scope (this):
		//	|	dojo.connect(null, "globalEvent", null, globalHandler);
		//	|	dojo.connect("globalEvent", globalHandler); // same

		// normalize arguments
		var a=arguments, args=[], i=0;
		// if a[0] is a String, obj was omitted
		args.push(typeof a[0] == "string" ? null : a[i++], a[i++]);
		// if the arg-after-next is a String or Function, context was NOT omitted
		var a1 = a[i+1];
		args.push(typeof a1 == "string" || typeof a1 == "function" ? a[i++] : null, a[i++]);
		// absorb any additional arguments
		for(var l=a.length; i<l; i++){	args.push(a[i]); }
		return connect_.apply(this, args);
	},

	disconnect:function(handle){
		// summary:
		//		Remove a link created by dojo.connect.
		// description:
		//		Removes the connection between event and the method referenced by handle.
		// handle: Handle
		//		the return value of the dojo.connect call that created the connection.

		if(handle){
			handle.remove();
		}
	},

	subscribe:function(topic, context, method){
		// summary:
		//		Attach a listener to a named topic. The listener function is invoked whenever the
		//		named topic is published (see: dojo.publish).
		//		Returns a handle which is needed to unsubscribe this listener.
		// topic: String
		//		The topic to which to subscribe.
		// context: Object?
		//		Scope in which method will be invoked, or null for default scope.
		// method: String|Function
		//		The name of a function in context, or a function reference. This is the function that
		//		is invoked when topic is published.
		// example:
		//	|	dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); });
		//	|	dojo.publish("alerts", [ "read this", "hello world" ]);
		return hub.subscribe(topic, lang.hitch(context, method));
	},

	publish:function(topic, args){
		// summary:
		//		Invoke all listener method subscribed to topic.
		// topic: String
		//		The name of the topic to publish.
		// args: Array?
		//		An array of arguments. The arguments will be applied
		//		to each topic subscriber (as first class parameters, via apply).
		// example:
		//	|	dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
		//	|	dojo.publish("alerts", [ "read this", "hello world" ]);
		return hub.publish.apply(hub, [topic].concat(args));
	},

	connectPublisher:function(topic, obj, event){
		// summary:
		//		Ensure that every time obj.event() is called, a message is published
		//		on the topic. Returns a handle which can be passed to
		//		dojo.disconnect() to disable subsequent automatic publication on
		//		the topic.
		// topic: String
		//		The name of the topic to publish.
		// obj: Object?
		//		The source object for the event function. Defaults to kernel.global
		//		if null.
		// event: String
		//		The name of the event function in obj.
		//		I.e. identifies a property obj[event].
		// example:
		//	|	dojo.connectPublisher("/ajax/start", dojo, "xhrGet");
		var pf = function(){ connect.publish(topic, arguments); };
		return event ? connect.connect(obj, event, pf) : connect.connect(obj, pf); //Handle
	},

	isCopyKey: function(e){
		// summary:
		//		Checks an event for the copy key (meta on Mac, and ctrl anywhere else)
		// e: Event
		//		Event object to examine
		return e[evtCopyKey];	// Boolean
	}
};

connect.unsubscribe = connect.disconnect;
/*=====
 connect.unsubscribe = function(handle){
	 // summary:
	 //		Remove a topic listener.
	 // handle: Handle
	 //		The handle returned from a call to subscribe.
	 // example:
	 //	|	var alerter = dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
	 //	|	...
	 //	|	dojo.unsubscribe(alerter);
 };
 =====*/

 1  && lang.mixin(dojo, connect);
return connect;

});



},
'dojo/errors/CancelError':function(){
define(["./create"], function(create){
	// module:
	//		dojo/errors/CancelError

	/*=====
	return function(){
		// summary:
		//		Default error if a promise is canceled without a reason.
	};
	=====*/

	return create("CancelError", null, null, { dojoType: "cancel", log: false });
});

}}});
require({cache:{
'dojo/store/Memory':function(){
define(["../_base/declare", "./util/QueryResults", "./util/SimpleQueryEngine" /*=====, "./api/Store" =====*/],
function(declare, QueryResults, SimpleQueryEngine /*=====, Store =====*/){

// module:
//		dojo/store/Memory

// No base class, but for purposes of documentation, the base class is dojo/store/api/Store
var base = null;
/*===== base = Store; =====*/

return declare("dojo.store.Memory", base, {
	// summary:
	//		This is a basic in-memory object store. It implements dojo/store/api/Store.
	constructor: function(options){
		// summary:
		//		Creates a memory object store.
		// options: dojo/store/Memory
		//		This provides any configuration information that will be mixed into the store.
		//		This should generally include the data property to provide the starting set of data.
		for(var i in options){
			this[i] = options[i];
		}
		this.setData(this.data || []);
	},
	// data: Array
	//		The array of all the objects in the memory store
	data:null,

	// idProperty: String
	//		Indicates the property to use as the identity property. The values of this
	//		property should be unique.
	idProperty: "id",

	// index: Object
	//		An index of data indices into the data array by id
	index:null,

	// queryEngine: Function
	//		Defines the query engine to use for querying the data store
	queryEngine: SimpleQueryEngine,
	get: function(id){
		// summary:
		//		Retrieves an object by its identity
		// id: Number
		//		The identity to use to lookup the object
		// returns: Object
		//		The object in the store that matches the given id.
		return this.data[this.index[id]];
	},
	getIdentity: function(object){
		// summary:
		//		Returns an object's identity
		// object: Object
		//		The object to get the identity from
		// returns: Number
		return object[this.idProperty];
	},
	put: function(object, options){
		// summary:
		//		Stores an object
		// object: Object
		//		The object to store.
		// options: dojo/store/api/Store.PutDirectives?
		//		Additional metadata for storing the data.  Includes an "id"
		//		property if a specific id is to be used.
		// returns: Number
		var data = this.data,
			index = this.index,
			idProperty = this.idProperty;
		var id = object[idProperty] = (options && "id" in options) ? options.id : idProperty in object ? object[idProperty] : Math.random();
		if(id in index){
			// object exists
			if(options && options.overwrite === false){
				throw new Error("Object already exists");
			}
			// replace the entry in data
			data[index[id]] = object;
		}else{
			// add the new object
			index[id] = data.push(object) - 1;
		}
		return id;
	},
	add: function(object, options){
		// summary:
		//		Creates an object, throws an error if the object already exists
		// object: Object
		//		The object to store.
		// options: dojo/store/api/Store.PutDirectives?
		//		Additional metadata for storing the data.  Includes an "id"
		//		property if a specific id is to be used.
		// returns: Number
		(options = options || {}).overwrite = false;
		// call put with overwrite being false
		return this.put(object, options);
	},
	remove: function(id){
		// summary:
		//		Deletes an object by its identity
		// id: Number
		//		The identity to use to delete the object
		// returns: Boolean
		//		Returns true if an object was removed, falsy (undefined) if no object matched the id
		var index = this.index;
		var data = this.data;
		if(id in index){
			data.splice(index[id], 1);
			// now we have to reindex
			this.setData(data);
			return true;
		}
	},
	query: function(query, options){
		// summary:
		//		Queries the store for objects.
		// query: Object
		//		The query to use for retrieving objects from the store.
		// options: dojo/store/api/Store.QueryOptions?
		//		The optional arguments to apply to the resultset.
		// returns: dojo/store/api/Store.QueryResults
		//		The results of the query, extended with iterative methods.
		//
		// example:
		//		Given the following store:
		//
		// 	|	var store = new Memory({
		// 	|		data: [
		// 	|			{id: 1, name: "one", prime: false },
		//	|			{id: 2, name: "two", even: true, prime: true},
		//	|			{id: 3, name: "three", prime: true},
		//	|			{id: 4, name: "four", even: true, prime: false},
		//	|			{id: 5, name: "five", prime: true}
		//	|		]
		//	|	});
		//
		//	...find all items where "prime" is true:
		//
		//	|	var results = store.query({ prime: true });
		//
		//	...or find all items where "even" is true:
		//
		//	|	var results = store.query({ even: true });
		return QueryResults(this.queryEngine(query, options)(this.data));
	},
	setData: function(data){
		// summary:
		//		Sets the given data as the source for this store, and indexes it
		// data: Object[]
		//		An array of objects to use as the source of data.
		if(data.items){
			// just for convenience with the data format IFRS expects
			this.idProperty = data.identifier || this.idProperty;
			data = this.data = data.items;
		}else{
			this.data = data;
		}
		this.index = {};
		for(var i = 0, l = data.length; i < l; i++){
			this.index[data[i][this.idProperty]] = i;
		}
	}
});

});

},
'animator/SceneManager':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Scene Manager
=>init
=>switch

pour modules Accordia

Exemple :

  SceneManager.init(s[_screen],
    [
      ["vue1", 949, 483, 111, "ernest+", "olivier+"],
      ["vue2", 233, -71, 398, "ernest+", "olivier-"],
      ["vue3", 980, 164, 172, "ernest-", "olivier+"]
    ]
  );
  
    > vue, x, y, scale%, perso1+, perso2+, etc..

*/

define(function() {

  var _persoPos = {};
  var _vuesAr = [];
  var _s;

  return {
    init: function(screen, vuesAr) {
      
      _vuesAr = vuesAr;
      _s = screen;
      _persoPos = {}
      
      // on prend la première scene pour enregistrer les personnages (première scene persos doivent être en position +)
      for (var i=4; i<_vuesAr[0].length; i++){
        var perso_name = _vuesAr[0][i].substr(0, _vuesAr[0][i].length - 1);
        _persoPos[perso_name] = true;
      }
    },
    
    switchScene: function(vue) {

      var is_scene = -1;
      
      for (var i=0; i<_vuesAr.length; i++){
        if (vue == _vuesAr[i][0]){
          is_scene = i;
        }
      }
      
      if (is_scene == -1){
        _s["scene"].visible = false;
        _s[vue].visible = true;
        
        return _s[vue];
        
      } else {
        
        _s["scene"].visible = true;
        _s["scene"].x = _vuesAr[is_scene][1];
        _s["scene"].y = _vuesAr[is_scene][2];
        _s["scene"].scaleX = _vuesAr[is_scene][3]/100;
        _s["scene"].scaleY = _vuesAr[is_scene][3]/100;
        
        for (i=4; i<_vuesAr[is_scene].length; i++){
          var perso_name = _vuesAr[is_scene][i].substr(0, _vuesAr[is_scene][i].length - 1);
          var perso_sign = _vuesAr[is_scene][i].substr(_vuesAr[is_scene][i].length - 1, 1);
          
          var perso_newpos;
          if (perso_sign == "+"){
            perso_newpos = true;
          } else if (perso_sign == "-"){
            perso_newpos = false;
          } else {
            console.log("***ERRROR IN SCENE MANAGER, A CHARACTER DON'T HAVE A POSITION SIGN***");
          }
          
          //switch character pos
          if (_persoPos[perso_name] != perso_newpos){
            _s["scene"][perso_name].scaleX = _s["scene"][perso_name].scaleX * -1;
            _persoPos[perso_name] = perso_newpos;
          }

          
        }
        
        return _s["scene"];
        
      }
      
    },
    
    reset: function() {
      
      if (_vuesAr[0] != undefined){
      
        for (var i=4; i<_vuesAr[0].length; i++){
          var perso_name = _vuesAr[0][i].substr(0, _vuesAr[0][i].length - 1);
          
          if (_persoPos[perso_name] == false){
            _s["scene"][perso_name].scaleX = _s["scene"][perso_name].scaleX * -1;
            _persoPos[perso_name] = true;
          }
          
        }
        
      }
      
    }
  };
});

},
'util/Sequencer':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Sequencer
author: JCK

Execute a sequence of functions in an array with callbacks:

Sequencer.launch([
  function(next) {
    ... callback:next
  },
  function(next) {
    ... callback:next
  },
  function(next) {
    ...
  }
], { delay: 1500 });

nouveau gestion des cuepoints : {cuepoints:[2500,3500,10000]} dans les options

 */

define(['util/OptionGetter', 'util/UniqueTimer'], function(OptionGetter, UniqueTimer) {
  
  var _is_aborted;
  var _seqAr;
  
  return {
    launch: function (seqAr, options) {
      _seqAr = seqAr;
      _is_aborted = false;
    
      var delay = OptionGetter.get(options, "delay", false);
      
      var cuepoints = OptionGetter.get(options, "cuepoints", false);
      var cuepoints_time = 0;
    
      var counter = -1;
      var next = function() {
        counter++;
        if (cuepoints) {
          if (_seqAr[counter] != undefined) {
            var inter_time;
            if (counter == 0){
              inter_time = cuepoints[0];
            } else {
              inter_time = cuepoints[counter] - cuepoints[counter-1];
            }
            if (!_is_aborted){
              UniqueTimer.wait(inter_time, function(){
                if (_seqAr[counter] != undefined){
                  _seqAr[counter](next);
                  next();
                }
              });
            }
          }
        } else {
          if (!_is_aborted){
            if (_seqAr[counter] != undefined){
              _seqAr[counter](next);
            }
          }
        }
      }
      if (!_is_aborted){
        if (delay) {
          UniqueTimer.wait(delay, next);
        } else {
          next();
        }
      }
    },
    
    abort: function(){
      _seqAr = [];
      _is_aborted = true; 
    }
  };
});

},
'animator/TweenValue':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

TWEEN VALUE (new version)
author: JCK

options:
- append_string
- callback
- zerofill
- increment

 */

define(['dojox/timing', 'util/OptionGetter'], function (timing, OptionGetter) {

  return {
    init : function (textfield, val_start, val_end, delta, options) {
      
      var callback = OptionGetter.get(options, "callback", undefined);
      var append_string = OptionGetter.get(options, "append_string", "");
      var zerofill = parseInt(OptionGetter.get(options, "zerofill", 0));
      var increment = parseInt(OptionGetter.get(options, "increment", 1));

      textfield.text = "";

      var is_negatif;
      var compteur = val_start;

      if (isNaN(val_end)) {
        console.log("*Error in TweenValue* - end value is not a number");
        val_end = val_start;
      }

      if (val_end < val_start) {
        is_negatif = true;
      } else {
        is_negatif = false;
      }

      t = new dojox.timing.Timer(delta);

      t.onTick = function () {
        var txt;

        if (zerofill) {
          txt = doZeroFill(compteur)+append_string;
        } else {
          txt = compteur+append_string;
        }

        textfield.text = txt;

        if (compteur >= val_end) {
          t.stop();
          if (callback != undefined) {
            callback();
          }
        }

        if (is_negatif) {
          compteur = compteur - increment;
        } else {
          compteur = compteur + increment;
        }
      }
      t.start();
    }
  };
  function doZeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }
});

},
'pdf/ReponsesPartielles':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

pdf_recap
* using EasyPDF class *
*/

define(['pdf/EasyPDF', 'util/JsonHandler', 'engine/Player'], function(EasyPDF, JsonHandler, Player) {

  return {
    print: function () {
    
      EasyPDF({
        name: "reponses",
        unit: "pt", // only pt supported with autoTable (not mm or in)
        fontcolor: "#333333",
        fontsize: 12,
        content: function() {
        
          var self = this;
          var page_counter = 0;
          
          var columns = [
            {title: "Question", dataKey: "col1"},
            {title: "Reponse(s) de l'apprenant", dataKey: "col3"},
            {title: "", dataKey: "col4"}
          ];
          
          var rows = [];
          for (var i=1; i<=parseInt(JsonHandler.get("quiz", "nb_questions")); i++) {
            var line = new Object();
            line["id"] = i;
            
            // FILL COL 1
            line["col1"] = JsonHandler.get("quiz", "q"+i+"_question");
            
            // FILL COL 3
            var col3rep = Player.getSuspendArrayOfStrings("interactions", i);
            col3rep = col3rep.replace(/-/g, "");
            var col3txt = "";
            
            for (j=0; j<col3rep.length; j++) {
              if (j > 0) {
                col3txt += ", ";
              }
              col3txt += JsonHandler.get("quiz", "q"+i+"_proposition"+col3rep[j]);
            }
            line["col3"] = col3txt;
            
            // FILL COL 4
            if (Player.getSuspendArrayOfStrings("resultats", i) == "1"){
              line["col4"] = "OK";
            } else {
              line["col4"] = "x";
            }
            
            // ADD LINE
            rows.push(line);
          }
          
          // AUTOTABLE
          this.autoTable(columns, rows, {
            // Styling
            theme: 'grid', // 'striped', 'grid' or 'plain'
            styles: {
              cellPadding: 5,
              fontSize: 10,
              font: "helvetica", // helvetica, times, courier
              lineColor: [50,50,50],
              lineWidth: 0.1,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
              textColor: [50,50,50],
              halign: 'left', // left, center, right
              valign: 'top', // top, middle, bottom
              fillStyle: 'S', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
              columnWidth: 'auto' // 'auto', 'wrap' or a number
            },
            headerStyles: {
              fillColor: [191, 191, 191],
              fillStyle: "DF",
              halign: 'center'
            },
            // Properties
            startY: false, // false (indicates margin top value) or a number
            pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            tableWidth: 'auto', // 'auto', 'wrap' or a number, 
            margin: {
              top: 126
            },
            beforePageContent: function(data) {
              self.text("Réponses au Quiz", 562, 32, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
              self.text(JsonHandler.get("config", "attestation_titre"), 562, 54, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
              var learner_name = Player.getLearnerName();
              if (!learner_name) {
                learner_name = "{doit être connecté au LMS}";
              }
              self.text(learner_name, 562, 76, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
              self.text("Résultat : "+Player.getScore(0)+"%", 562, 94, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
              page_counter++;
              self.text(page_counter.toString(), 297,839, {fontsize:10, align:"center"});
            }
          });
        }
      });
    }
  };
});

},
'animator/LoadImage':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

LoadImage
author: JCK

Load an image, place it at 0,0 in MovieClip then send a callback with dimensions of image when loaded

example:
  LoadImage.init(s.myclip, "images/myimage.png", fnNext, {clear:true});
  
  function fnNext(dimx, dimy){
    ....
  }

options:
  - clear (true) : clear mc content before placing image in it
  - resize([w,h]) : resize image to dimensions
  - position([x,y]) : (default : 0,0)

*/

define(['util/OptionGetter'], function (OptionGetter) {
  return {
    init: function (mc, src, callback, options) {
      
      var _clear = OptionGetter.get(options, "clear", false);
      var _resize = OptionGetter.get(options, "resize", false);
      var _position = OptionGetter.get(options, "position", false);
      
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = src;
      image.onload = handleImageLoad;
      
      function handleImageLoad(e){
        var bitmap = new createjs.Bitmap(image);
        
        if (_clear){
          mc.removeAllChildren();
        }
        
        var width = bitmap.getBounds().width;
        var height = bitmap.getBounds().height;
        
        
        if (_resize){
          bitmap.scaleX = _resize[0] / width;
          bitmap.scaleY = _resize[1] / height;
          
          width = _resize[0];
          height = _resize[1];
        }
        
        if (_position){
          bitmap.x = _position[0];
          bitmap.y = _position[1];
        }
        
        mc.addChild(bitmap);
        
        if (callback != undefined){
          callback(width, height, bitmap);
        }
      }

    }
  };
});

},
'pdf/Backgrounds':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

PDF BACKGROUNDS
author: JCK
*/

define(function () {

  return {
    get: function (val) {

      switch(val) {
        case "accordia": return 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QOJaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6RUIyOUJBNUJEODc4MTFFN0I1QjFEQjFFNTk1REFGQUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzVDQUMzNzI3N0M2MTFFOUI1RjRDRENDREU0QzhBRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzVDQUMzNzE3N0M2MTFFOUI1RjRDRENDREU0QzhBRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTQ5OWI1NTMtMGMxNC1mODQyLTlhMjktZjU2YzhjMmVmNmZmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NDY1M2I2YmItYWMxNS01MTRkLWE5OGItNTJkZWQwZmYxNGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAIg8AADBQwABCKv/2wCEABQQEBkSGScXFycyJh8mMi4mJiYmLj41NTU1NT5EQUFBQUFBREREREREREREREREREREREREREREREREREREREQBFRkZIBwgJhgYJjYmICY2RDYrKzZERERCNUJERERERERERERERERERERERERERERERERERERERERERERERERERP/CABEICb4NxwMBIgACEQEDEQH/xADYAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBBwEBAQEBAQEAAAAAAAAAAAAAAAECAwQFEAABBAEDAgQFAwMDAwUBAAABAAIDBAUQEQYSEyAhMRQwcIA0FkAyFVAiM2AjJMDgQaCw0CU1RBEAAgADBAQKCAUEAQMCBgMAAQIAEQMQITESIEFRcWGBkaGxwdHhIjIwQlJicpITBECA8CMzcPGCslCi0hRgQ9DgwuJjc8BTJBIAAQMEAQMDBAMAAAAAAAAAEQABIRAgMHAxQAISULBBoMDgUWGhMv/aAAwDAQACEQMRAAAAuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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6Roy2+mGx6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw98hI/W7YrM9J0CZMPTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMkZoiaFAHnoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYemUfIRV1Bjp3d3D0yWiKlarnlG9HE6+m97oqV4+QJAAAAAAAAAAB4QvLDxHHVxsPy296kyOkAAAAAAAAAAAAAAAAAAAAAAAAAAAAU+4UnFgp+v2Dlq6D0YQsz8+xcpGtOWvqOcXKd8BQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj7Iebq+yOy5fR+iubv7fNqmm2cm91+c6eqT2Il0xQt9wz1114dNGmOnVDunovEt81v/Pj1jPIAAAAAAABx9lTza1gleGoqah/T6h7ydfpwAAAAAAAAAAAAAAAAAAAAAAAAAAAApN2pOLA2Cv2Dlq6D0YVyxo+b9t4yxde06QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5wQE727CrWJITZYieel5AAAAYfPPo1N31gx09K8VG/Y47hz84AAAAAAAGv5zbqPy0vtN+ilAjrdUcW1Wr5x9E65zG4AAaa9Fm8ofNi/RcvnXYXlCTO5kKHh6iYDNub57hl9G9+fylWxy9W4ANZs8rsNi3p87R9GUWb0n2GeoAVbjxbqrk/qbPIyry3r35zKRc3nu4eQ0TWNH48X6Jl86kaulJs9YIGwV+wctXQejAwM0PFZttY5agB5ExL40rhzfofvznpi/K9PbmYoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhnrWm6NurH2XfwdjNw98938cAAAABr2CA02Vd8nX5xufa07oBQAAAAAHnvCVCIz8827NbODv755fnH1CjZQt8oc3i3l573yA5Oui5vFxO3hrl6bz3dJ825vqEIUmyV3zF+pe8Hf6MeVWY+f868W3nqt5/RM+mfmOr6VScXkvvzmfq6nnbPPRe2B46ZdN4lo76R5vPy7y+0nGpK7fMLPqW0dc/O4/6hVuOqxOQbF36Zu17nzuWuWepu89j+khKtlj59uiwWfU+e8/0/n0+c9MhAc6sFfsBdB6MK5Y61m1Dr5Ovhr6Nnhn6cPPeAgqx775949Vwl9z5xy/UYEpc/AZc79R9j5D04AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhYC84z00qyyGSBfOAAAAAABxQlgg+/nysMPMZ36OXUAAAAABU7R85xeWUi7nz1YPTvhCTeuPl+zbzeff0nrq9o9GQs0/NvoXzrlrG7Ur6FEiO2XnopvNevcWOkTcqVYn4Dhvv+h0m8byHSIqVRQpC2e5rTu4dT57r988+7tPcHf6MBSr2iFzaL1cu3hr6blp3enCBnoHNpOWPRw19A7NW304AViz03NrvXyS/DV6zPTgDX85+lUXnYWwV+wc9XQejCtWWtZtQ6+Tr4a+jZ4Z+nCHmPI+cytw9zXpuMM8T5np6uXzbulgrVl75DUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGpdqv48fRYmjf184WAAAAAAAPPQeYmYAAAAAB4QlHl4jhv2z1dFuVFZblREhHmb2/RPl186SYHXPB87+ifO+On0P559DJAdsgAAUWFmoXz7nrtSbt1yG4AA4e7hj50e+ff0Xt4+z0YCkVKxUUDPDPz7+j9XL1ejCBnoGWk9fJ18NfRs8M/TgBS7pS8WvzEPMctXwejACk3ak4sDYK/YOWroPRhWrLWs2odfJ18NfRs8M/TgeHqEgM268tD0YtxjYuQiFw26sW32WtWXvkNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDzEZz7V968H15Sehpn3fKDr5wAAAAAAGndC7xH8+p7fDMT1Ktfn9PWPP6AAAAHD3VHNreLu4an+uZz75g04INOCCqv0es5VGbhNnLX0/3l6vTjh+d/SfnHLWH0L55d4nR2yAVXhxbwj5DcpMDY6559zl4+d/Qumch0g4TuUbvxbVw92jU+Z+Z4eff0Xvg5z0YCkNM1nNqO3V08NfRd2OXpwgZ6BzaT18nXw19Gzwz9OAFNuVUxatLxHby19Hee+jACk3b59ixlgr9g5aug9GFastazah18nXw19Gzwz9OFbslExYfbpsHLUlL9bvjD3LXXznl3afNu32WtWXvkNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB56I/GSY645Ytc8hYAAAAAAAh5jDWaZ5Mcns8XJbOOV8/oDj3AAAA1fObdSOWlrq/0WOwdsgAOTrHy/XMw3m3bbP84+i9s+/P8A6DF18/keTTw19M6PmUl1ze4qrRkvuHlgxbJIee+jEJRvqVJ5ahLpSvcX6l7896eubrTI7jxU7EX6JDz13zRIb6PQ+Os73823R9OULzpLfQ9WvnpY4292dA7ZQM9A5tJ6+Tr4a+jZ4Z+nACHmMY+W+zUJ593We+XSPSfQfKRyallpaV56iJeIZfUsvnFx7Zlq1ZYqqBu1ecNfSev5nZOubRSrrE6UHv4seGvp+35zK9s3CtRMXm60pF87Z7Z8u7tz6I5OvtkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABH9tb5ejJreX3S8lWLH6fFsHbzAAAAAAADwY1qJ9HmvyvWHl2DGwAAKzGXli1O1+tQKAAAia5eWbR7Z2ANThrN0ZvzfT9Lxzfm3V9AySuWLNuBTDMV2A+g+YvzPz6V5m/OpS552cHedIA5+gVGH+jY4vzN9KZvz6btGWpp3G4AipVFG6LizccjcAA11m1I+caPpmGNfN+2+ZpCTObcrEH9D8zfndxksqeetSuwH0HzF+eWCxZDz1uQ1X+g+YvzJ9KZtEtEt7uaKhdh832fQfctHSdIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqrlnh+Hqjx5vb7Yoqa9Pi9Me3lyee0AAB5yxMFyt520i5abRuNezwoOE5FfR+Zld4CweX1+tHvHvuEoAAAAAAAAAAAAAB56AAAAAGIyAAeegAAAAAAAAAAAAAAAAAAAAAAAxMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPPRzOlnfnrzWObm9x+L6c+6O6++ekx+nwyRPvHUq897ZqMdcIDzWPuUXP9Ho6wBhmPK1O0Ltx991PR57bOfPr75vTsHLq898ITo8ks1nxclkw5eIl0ZqJhF7juQ282b6/MS9uXJxWTDg5iYQ8uevFexclEwwm/DzLl4SYcXETSJ2Ekjczv1xXYYZatkveeanvF2wsPZkc/RriyYRvhJofIlnJykqiMyUcnp1OHjJnRqzOpEZkoih1dEJKLs3cnEkwjdZLIWXM3iva5Y6/m6985X4k+yJ8qZcXLZLq9IEir3SsxyRPbG7ON0lhgd/KWNhnqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcOmT1fP7cXd7s65Y5PXzhUt75tZenpy89AAAAHPQfo1d68qw3Zenze32JmfL6g59HnvhX+vu6M2Fl9XCYb+tUd1bNqc/NI6yF97Nmby9GWyo+a18Bht68jjk9G+zn19o8hJzQbdPBtXnlsY+Nefd6cnvXpqOx6O6OLDb1nB1bdle8MmRDTOBh7H+HnXv4JdPnbmc/TnnZDyPnQsdqksI5Pd/KJLX0WRePf7Lx9/F4cWPf5Hnbq90jZLbxRp87czHbnlZhxyQV6wxh2V3tkpYjs6eop/dLdEQO1JEXJZZ1W+rOSjTjIRlRHXKceUp1Y5dIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEJNmeoa5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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';
        break;
        
        default: return false;
        break;
      }
    }
  };
});

},
'animator/TimerClip':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

TimerClip
author: JCK

Show timer-like movieclips animated over the timeline, then callback
usage:
TimerClip.start(mc, duration, callback);
*/

define(['dojox/timing'], function (timing) {

  var _timer;
  var _mc;
  
  return {
    start: function (mc, duration, callback) {
    
      _mc = mc;
    
      var time = 0;
      mc.gotoAndStop(0);
      var ticker = 1000 / lib.properties.fps;
      
      _timer = new dojox.timing.Timer(ticker);
      
      _timer.onTick = function() {
      
        time += ticker;
      
        mc.gotoAndStop(Math.floor(time/duration*(mc.timeline.duration-1)));
        
        if (time >= duration) {
          _timer.stop();
          mc.gotoAndStop(mc.timeline.duration-1);
          if (callback != undefined) {
            callback();
          }
        }
      
      }
      _timer.start();
    },
    
    abort: function() {
      if ((_timer != undefined) && (_mc != undefined)) {
        _timer.stop();
        _mc.gotoAndStop(0);
      }
    },
    
    stop: function() {
      if (_timer != undefined) {
        _timer.stop();
      }
    }
  };
});

},
'animator/VerticalSpacer':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Vertical Spacer
author: JCK

snippet:
VerticalSpacer.init(scene, ["mc1", "mc2" ,"mc3"], "hpp", 10, 25);
... where "hpp" means (header, paragraph, paragraph)
... where 10 is the space in px between paragraphs
... where 25 is the space in px above headers
*/

define(function() {

  return {
    init: function (scene, instanceAr, disposition, p_spacer, h_spacer) {
    
      var offset_y = scene[instanceAr[0]].y;
    
      for (var i=0; i<instanceAr.length; i++) {
        scene[instanceAr[i]].y = offset_y;
        
        if (scene[instanceAr[i]].champ != undefined) {
          offset_y += scene[instanceAr[i]].champ.getMeasuredHeight();
        } else {
          offset_y += scene[instanceAr[i]].nominalBounds.height;
        }
        
        if (disposition.substr(i+1, 1) == "h") {
          offset_y += h_spacer;
        } else {
          offset_y += p_spacer;
        }
      
      }
    }
  };
});

},
'util/LinesBreaker':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

LinesBreaker
beautify lines breaks

author: JCK

*/

define(['util/OptionGetter'], function(OptionGetter) {
  return {
    init: function (champText, options) {
      
      var equal = OptionGetter.get(options, "equal", false);

      var text = champText.text;
      var nb_lines = champText.getMetrics().lines.length;
      var text_lastline = champText.getMetrics().lines[nb_lines-1];
      
      var i;
      
      if (!equal){
        
        tryAdjust();
        
        function tryAdjust(){
          var adjusted = false;
          var new_text = "";
          var current_nb_lines = champText.getMetrics().lines.length - 1;
          
          
          for (i=0; i<current_nb_lines; i++){

            if ((champText.getMetrics().lines[i] != undefined) && (!testIfNotShouldBreak(champText.getMetrics().lines[i+1], -1))){
              
              var line1 = champText.getMetrics().lines[i].substr(0, champText.getMetrics().lines[i].lastIndexOf(" "));
              
              if (champText.getMetrics().lines[i+1]){
                var line2 = champText.getMetrics().lines[i].substr(champText.getMetrics().lines[i].lastIndexOf(" ")+1) + " " + champText.getMetrics().lines[i+1];
              } else {
                var line2 = champText.getMetrics().lines[i].substr(champText.getMetrics().lines[i].lastIndexOf(" ")+1);
              }
              
              if (line2 != undefined) {
                new_text += line1 + "\n" + line2;
              } else {
                new_text += line1;
              }
              
              adjusted = true;
              
              // test if no problem, or adjust in case:
              var current_text = champText.text;
              champText.text = new_text;
              if (champText.getMetrics().lines.length > 2){
                new_text += " ";
                i += (champText.getMetrics().lines.length - 2);
                current_nb_lines += (champText.getMetrics().lines.length - 2);
              }
              champText.text = current_text;
              
            } else if (champText.getMetrics().lines[i] != undefined){
              new_text += champText.getMetrics().lines[i] + " ";
            } else {
              new_text += text_lastline;
            }
          }
          
          if (adjusted){
            champText.text = new_text;
          }

          
        }

      } else {
        if (nb_lines > 1 && (text.indexOf(" ")!= -1)) {
          
          var char_index;
          var char_counter = 0;
          
          for (i=1; i<nb_lines; i++){
            
            char_index = Math.round(text.length / nb_lines) + (i-1)*Math.round(text.length / nb_lines);

            if (text.substr(char_index, 1) == " "){
              breakSpace();
            } else {
              var delta = 0;
              var space_found = false;
              while (!space_found){
                delta++;
                if (text.substr(char_index - delta, 1) == " "){
                  if (testIfNotShouldBreak(text, char_index - delta)){
                    char_index = char_index - delta;
                    space_found = true;
                  }
                  
                } else if (text.substr(char_index + delta, 1) == " "){
                  if (testIfNotShouldBreak(text, char_index + delta)){
                    char_index = char_index + delta;
                    space_found = true;
                  }
                }
              }
              breakSpace();
            }

          }

          champText.text = text;
          
          function breakSpace(){
            text = text.substr(0, char_index) + "\n" + text.substr(char_index + 1);
          }
        }

      }
      
      function testIfNotShouldBreak(text, index){
        if (text){
          if ((text.substr(index + 1, 1) != ":")
            && (text.substr(index + 1, 1) != "»")
            && (text.substr(index + 1, 1) != ";")
            && (text.substr(index + 1, 1) != "!")
            && (text.substr(index + 1, 1) != "?")
            && (text.substr(index + -1, 1) != "–")
            && (text.substr(index + -1, 1) != "«")){
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

    }
  };

});

},
'util/OptionGetter':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Option Getter
author: JCK

Deal with option objects like {firstParam1:"abc", secondParam:42, ...}

Snippet:
OptionGetter.get(options, "parameter", default_value);

 */

define(function () {
  return {
    get : function (options_obj, parameter, default_value) {
      if (options_obj == undefined) {
        return default_value;
      } else {
        if (options_obj[parameter] == undefined) {
          return default_value;
        } else {
          return options_obj[parameter];
        }
      }
    }
  };
});

},
'dojo/store/util/SimpleQueryEngine':function(){
define(["../../_base/array" /*=====, "../api/Store" =====*/], function(arrayUtil /*=====, Store =====*/){

// module:
//		dojo/store/util/SimpleQueryEngine

return function(query, options){
	// summary:
	//		Simple query engine that matches using filter functions, named filter
	//		functions or objects by name-value on a query object hash
	//
	// description:
	//		The SimpleQueryEngine provides a way of getting a QueryResults through
	//		the use of a simple object hash as a filter.  The hash will be used to
	//		match properties on data objects with the corresponding value given. In
	//		other words, only exact matches will be returned.
	//
	//		This function can be used as a template for more complex query engines;
	//		for example, an engine can be created that accepts an object hash that
	//		contains filtering functions, or a string that gets evaluated, etc.
	//
	//		When creating a new dojo.store, simply set the store's queryEngine
	//		field as a reference to this function.
	//
	// query: Object
	//		An object hash with fields that may match fields of items in the store.
	//		Values in the hash will be compared by normal == operator, but regular expressions
	//		or any object that provides a test() method are also supported and can be
	//		used to match strings by more complex expressions
	//		(and then the regex's or object's test() method will be used to match values).
	//
	// options: dojo/store/api/Store.QueryOptions?
	//		An object that contains optional information such as sort, start, and count.
	//
	// returns: Function
	//		A function that caches the passed query under the field "matches".  See any
	//		of the "query" methods on dojo.stores.
	//
	// example:
	//		Define a store with a reference to this engine, and set up a query method.
	//
	//	|	var myStore = function(options){
	//	|		//	...more properties here
	//	|		this.queryEngine = SimpleQueryEngine;
	//	|		//	define our query method
	//	|		this.query = function(query, options){
	//	|			return QueryResults(this.queryEngine(query, options)(this.data));
	//	|		};
	//	|	};

	// create our matching query function
	switch(typeof query){
		default:
			throw new Error("Can not query with a " + typeof query);
		case "object": case "undefined":
			var queryObject = query;
			query = function(object){
				for(var key in queryObject){
					var required = queryObject[key];
					if(required && required.test){
						// an object can provide a test method, which makes it work with regex
						if(!required.test(object[key], object)){
							return false;
						}
					}else if(required != object[key]){
						return false;
					}
				}
				return true;
			};
			break;
		case "string":
			// named query
			if(!this[query]){
				throw new Error("No filter function " + query + " was found in store");
			}
			query = this[query];
			// fall through
		case "function":
			// fall through
	}
	function execute(array){
		// execute the whole query, first we filter
		var results = arrayUtil.filter(array, query);
		// next we sort
		var sortSet = options && options.sort;
		if(sortSet){
			results.sort(typeof sortSet == "function" ? sortSet : function(a, b){
				for(var sort, i=0; sort = sortSet[i]; i++){
					var aValue = a[sort.attribute];
					var bValue = b[sort.attribute];
					// valueOf enables proper comparison of dates
					aValue = aValue != null ? aValue.valueOf() : aValue;
					bValue = bValue != null ? bValue.valueOf() : bValue;
					if (aValue != bValue){
						return !!sort.descending == (aValue == null || aValue > bValue) ? -1 : 1;
					}
				}
				return 0;
			});
		}
		// now we paginate
		if(options && (options.start || options.count)){
			var total = results.length;
			results = results.slice(options.start || 0, (options.start || 0) + (options.count || Infinity));
			results.total = total;
		}
		return results;
	}
	execute.matches = query;
	return execute;
};

});

},
'dojox/timing':function(){
define(["./timing/_base"], function(timing){
	/*=====
	 return {
	 // summary:
	 //		Deprecated.  Should require dojox/timing modules directly rather than trying to access them through
	 //		this module.
	 };
	 =====*/
	return timing;
});

},
'animator/Boxify':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Boxify
author: JCK

create a box around a dynamic text
*/

define(['util/OptionGetter', 'util/LinesBreaker'], function(OptionGetter, LinesBreaker) {

  return {
    init: function (champ, options) {
      
      var _radius = OptionGetter.get(options, "radius", 20);
      var _color = OptionGetter.get(options, "color", "#00FF00");
      var _outsidePourcent = OptionGetter.get(options, "outsidePourcent", 5);
      
      var outside = champ.lineWidth / 100 * _outsidePourcent;
      
      champ.lineWidth += outside;
      
      var x;
      switch (champ.textAlign){
        case "center" :
          x = champ.x - champ.lineWidth/2;
          break;
        case "right" :
          x = champ.x - champ.lineWidth;
          break;
        default : x = 0; break;
      }
      
      var shape = new createjs.Shape();
      shape.graphics.beginFill(_color).drawRoundRect(x - outside, champ.y - outside, champ.lineWidth + (2*outside), champ.getMeasuredHeight() + (2*outside), _radius);
      champ.parent.addChild(shape);
      
      var text_front = new createjs.Text();
      text_front.x = champ.x;
      text_front.y = champ.y + (champ.lineHeight / 6);
      text_front.color = champ.color;
      text_front.font = champ.font;
      text_front.lineHeight = champ.lineHeight;
      text_front.lineWidth = champ.lineWidth;
      text_front.text = champ.text;
      text_front.textAlign = champ.textAlign;
      text_front.name = champ.name;
      champ.parent.addChild(text_front);
    
      // LinesBreaker.init(text_front);
      
      champ.name = undefined;
      champ.visible = false;

    }

  };
});

},
'animator/Tween':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

READY-TO-USE TWEENS
author: JCK

USAGE --> Tween(mc, {options})
OPTIONS --> from, to, duration, distance, ease, fade, fadeout, pop, callback
EXAMPLE --> Tween.init(myMovieClip, from:'right', distance:50, duration:1000, ease:'quartIn'});

eases: http://www.createjs.com/demos/tweenjs/tween_sparktable
backIn, backInOut, backOut, bounceIn, bounceInOut, bounceOut, circIn, circInOut, circOut, cubicIn, cubicInOut, cubicOut, elasticIn, elasticInOut, elasticOut, quadIn, quadInOut, quadOut, quartIn, quartInOut, quartOut, quintIn, quintInOut, quintOut, sineIn, sineInOut, sineOut

*/

define(["util/OptionGetter", "util/UniqueTimerForTweens", "animator/StorePosition"], function(OptionGetter, UniqueTimerForTweens, StorePosition) {
  
  var _self;

  var _defaultOptions = { from: undefined,
                    to: undefined,
                    duration: 350,
                    duration_pop: 1500, // should not be sent in options by user
                    easeFrom: 'sineOut',
                    easeTo: 'sineIn',
                    distance: 100,
                    fade: true,
                    fadeout: false,
                    pop: false,
                    scaleIn: false,
                    scaleOut: false,
                    scaleTo: false,
                    noUnmask: false,
                    delay: false,
                    noInit:false};

  var _oldPosAr = new Array();
  
  var _tween;
  
  var _is_tween;
  var _is_delay;
  var _previous_mc

  return {
    initGroup: function  (s, namesAr, options) {
      _self = this;
      
      if (options == undefined) {
        options = {}
      }
      
      var cb = OptionGetter.get(options, "callback", undefined);
      
      options.callback = undefined;
      
      for (var i=0; i<namesAr.length; i++) {
        _self.init(s[namesAr[i]], options);
        if (i == namesAr.length-1) {
          if (cb != undefined) {
            UniqueTimerForTweens.wait(options.duration, cb);
          }
        }
      }
    },
    init: function (mc, options) {
      
      _self = this;
      
      var noInit = OptionGetter.get(options, "noInit", _defaultOptions.noInit);
      if (OptionGetter.get(options, "delay", _defaultOptions.noInit)) {
        if (noInit) {
          noInit = false;
          console.log ("*TWEEN WARNING for clip "+mc+"* - Delayed tween can not be without position init");
        }
      }
      
      // manage tween interruptions
      if (mc != undefined) {
        if (!noInit) {
          StorePosition.init(mc);
        }
      }
      if (_is_delay) {
        _is_delay = false;
        UniqueTimerForTweens.stop();
        if (_previous_mc != undefined) {
          StorePosition.init(_previous_mc);
          _previous_mc.visible = true;
          _previous_mc.alpha = 1;
        }
      }
      _previous_mc = mc;
      //
    
      if (options == undefined) {
        options = {}
      }

      if (mc == undefined) {
        return false;
      } else {
        
        createjs.Tween.removeTweens(mc);
      
        var oldPos = {  'mc': mc,
                        'x': mc.x,
                        'y': mc.y};
        _oldPosAr.push(oldPos);
        
        if ((options.from == undefined) && (options.to == undefined)) {
          options.from = _defaultOptions.from;
          options.to = _defaultOptions.to;
        }
        if (options.distance == null) {
          options.distance = _defaultOptions.distance;
        }
        if (options.fade == null) {
          options.fade = _defaultOptions.fade;
        }
        if (options.fadeout == null) {
          options.fadeout = _defaultOptions.fadeout;
        }
        if (options.pop == null) {
          options.pop = _defaultOptions.pop;
        }
        if (options.duration == undefined) {
          if (options.pop) {
            options.duration = _defaultOptions.duration_pop;
          } else {
            options.duration = _defaultOptions.duration;
          }
        }
        if (options.ease == undefined) {
          if ((options.from != undefined) || (options.scaleIn == true)) {
            options.ease = _defaultOptions.easeFrom;
          } else {
            options.ease = _defaultOptions.easeTo;
          }
        }
        if(options.callback == undefined) {
          options.callback = function(){return null};
        }
        if (options.noUnmask == null) {
          options.noUnmask = _defaultOptions.noUnmask;
        }
        if (options.delay == null) {
          options.delay = _defaultOptions.delay;
        }
        
        // launch tween
        if (options.delay) {
          _is_delay = true;
          UniqueTimerForTweens.wait(options.delay, function(){
            _is_delay = false;
            launchTween();
          });
        } else {
          _is_delay = false;
          launchTween();
        }
        
        function launchTween() {
          
          var pos_x = mc.x;
          var pos_y = mc.y;
        
          if (options.from != undefined) {
            switch(options.from) {
              case 'top' : mc.y = pos_y - options.distance; break;
              case 'bottom' : mc.y = pos_y + options.distance; break;
              case 'left' : mc.x = pos_x - options.distance; break;
              case 'right' : mc.x = pos_x + options.distance; break;
            }
          } else if (options.to != undefined) {
            switch(options.to) {
              case 'top' : pos_y = mc.y - options.distance; break;
              case 'bottom' : pos_y = mc.y + options.distance; break;
              case 'left' : pos_x = mc.x - options.distance; break;
              case 'right' : pos_x = mc.x + options.distance; break;
            }
          }

          if (!options.noUnmask) {
            mc.visible = true;
            mc.alpha = 1;
          }
      
          if (options.pop) {
            var original_scalex;
            var original_scaley;
            if (options.scaleTo) {
              original_scalex = original_scaley = options.scaleTo;
            } else {
              original_scalex = mc.scaleX;
              original_scaley = mc.scaleY;
            }
            mc.scaleX = 0.01;
            mc.scaleY = 0.01;
            _tween = createjs.Tween.get(mc).to({scaleX:original_scalex, scaleY:original_scaley}, options.duration, createjs.Ease.elasticOut).call(endTween);
          } else if (options.fadeout) {
            _tween = createjs.Tween.get(mc).to({alpha: 0, x: pos_x, y: pos_y}, options.duration, createjs.Ease[options.ease]).call(endTween);
          } else if (options.scaleIn) {
            mc.scaleX = 0.01;
            mc.scaleY = 0.01;
            _tween = createjs.Tween.get(mc).to({scaleX:options.scaleIn, scaleY:options.scaleIn}, options.duration, createjs.Ease[options.ease]).call(endTween);
          } else if (options.scaleOut) {
            _tween = createjs.Tween.get(mc).to({scaleX:0.01, scaleY:0.01}, options.duration, createjs.Ease[options.ease]).call(endTween);
          } else if (options.scaleTo) {
            _tween = createjs.Tween.get(mc).to({scaleX:options.scaleTo, scaleY:options.scaleTo}, options.duration, createjs.Ease[options.ease]).call(endTween);
          } else {
            if (options.fade) {
              mc.alpha = 0;
            }
            _tween = createjs.Tween.get(mc).to({alpha: 1, x: pos_x, y: pos_y}, options.duration, createjs.Ease[options.ease]).call(endTween);
          }
          _is_tween = true;
        }

        function endTween() {
          _is_tween = false;
          if (options.callback) {
            options.callback();
          }
        }
      }
    },
    
    pause : function() {
      if (_is_tween) {
        _tween.setPaused(true);
      }
    },

    resume : function() {
      if (_is_tween) {
        _tween.setPaused(false);
      }
    },

    initOldPos: function() {
      for (var i=0; i<_oldPosAr.length; i++) {
        _oldPosAr[i].mc.x = _oldPosAr[i].x;
        _oldPosAr[i].mc.y = _oldPosAr[i].y;
      }
      _oldPosAr = [];
    },
    
    abort : function() {
      createjs.Tween.removeAllTweens();
      _is_tween = false;
    },
    
    stop : function(mc) {
      createjs.Tween.removeTweens(mc);
    }

  };
});

},
'animator/ScrollPane':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

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

},
'pdf/ReponsesCompletes':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

pdf_recap
* using EasyPDF class *
*/

define(['pdf/EasyPDF', 'util/JsonHandler', 'engine/Player'], function(EasyPDF, JsonHandler, Player) {

  return {
    print: function () {
    
      EasyPDF({
        name: "reponses",
        unit: "pt", // only pt supported with autoTable (not mm or in)
        fontcolor: "#333333",
        fontsize: 12,
        content: function() {
        
          var self = this;
          var page_counter = 0;
          
          var columns = [
            {title: "Question", dataKey: "col1"},
            {title: "Réponse(s) attendue(s)", dataKey: "col2"}, 
            {title: "Reponse(s) de l'apprenant", dataKey: "col3"}, 
            {title: "", dataKey: "col4"}
          ];
          
          var rows = [];
          for (var i=1; i<=parseInt(JsonHandler.get("quiz", "nb_questions")); i++) {
            var line = new Object();
            line["id"] = i;
            
            // FILL COL 1
            line["col1"] = JsonHandler.get("quiz", "q"+i+"_question");
            
            // FILL COL 2
            var col2txt = "";
            for (var j=0; j<JsonHandler.get("quiz", "q"+i+"_reponse").split("|").length; j++) {
              if (j > 0) {
                col2txt += ", ";
              }
              col2txt += JsonHandler.get("quiz", "q"+i+"_proposition"+JsonHandler.get("quiz", "q"+i+"_reponse").split("|")[j]);
            }
            line["col2"] = col2txt;
            
            // FILL COL 3
            var col3rep = Player.getSuspendArrayOfStrings("interactions", i);
            col3rep = col3rep.replace(/-/g, "");
            var col3txt = "";
            
            for (j=0; j<col3rep.length; j++) {
              if (j > 0) {
                col3txt += ", ";
              }
              col3txt += JsonHandler.get("quiz", "q"+i+"_proposition"+col3rep[j]);
            }
            line["col3"] = col3txt;
            
            // FILL COL 4
            if (Player.getSuspendArrayOfStrings("resultats", i) == "1"){
              line["col4"] = "OK";
            } else {
              line["col4"] = "x";
            }
            
            // ADD LINE
            rows.push(line);
          }
          
          // AUTOTABLE
          this.autoTable(columns, rows, {
            // Styling
            theme: 'grid', // 'striped', 'grid' or 'plain'
            styles: {
              cellPadding: 5,
              fontSize: 10,
              font: "helvetica", // helvetica, times, courier
              lineColor: [50,50,50],
              lineWidth: 0.1,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
              textColor: [50,50,50],
              halign: 'left', // left, center, right
              valign: 'top', // top, middle, bottom
              fillStyle: 'S', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
              columnWidth: 'auto' // 'auto', 'wrap' or a number
            },
            headerStyles: {
              fillColor: [191, 191, 191],
              fillStyle: "DF",
              halign: 'center'
            },
            // Properties
            startY: false, // false (indicates margin top value) or a number
            pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            tableWidth: 'auto', // 'auto', 'wrap' or a number, 
            margin: {
              top: 126
            },
            beforePageContent: function(data) {
              self.text("Réponses au Quiz", 562, 32, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
              self.text(JsonHandler.get("config", "attestation_titre"), 562, 54, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
              var learner_name = Player.getLearnerName();
              if (!learner_name) {
                learner_name = "{doit être connecté au LMS}";
              }
              self.text(learner_name, 562, 76, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
              self.text("Résultat : "+Player.getScore(0)+"%", 562, 94, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
              page_counter++;
              self.text(page_counter.toString(), 297,839, {fontsize:10, align:"center"});
            }
          });
        }
      });
    }
  };
});

},
'animator/MaskObjects':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Animator Module
=>init(stage, ["mc1", "mc2", "mc3", ...]);

MASK FLASH OBJECTS
author: JCK

*/

define(["util/OptionGetter"], function(OptionGetter) {
  return {
    init: function (stage, instanceAr, options) {
      
      var noInit = OptionGetter.get(options, "noInit", false);
      
      for (var i=0; i<instanceAr.length; i++) {
        if (stage[instanceAr[i]] != undefined) {
          stage[instanceAr[i]].visible = false;
          if ((stage[instanceAr[i]].gotoAndStop != undefined) && (noInit == false)){
            stage[instanceAr[i]].gotoAndStop(0);
          }
        } else {
          console.log("*ERROR in MaskObject* - "+instanceAr[i]+" is not on stage!");
        }
      }
    },
    unmask: function (stage, instanceAr) {
      for (var i=0; i<instanceAr.length; i++) {
        if (stage[instanceAr[i]] != undefined) {
          stage[instanceAr[i]].visible = true;
          stage[instanceAr[i]].alpha = 1;
          stage[instanceAr[i]].gotoAndStop(0);
        } else {
          console.log("*ERROR in MaskObject* - "+instanceAr[i]+" is not on stage!");
        }
      }
    }
  };
});

},
'animator/ClassementBuilder':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Quiz Builder
Build Dynamic Quiz from JSON

author: JCK

*/

define([
  "util/JsonHandler",
  "animator/ResponsiveStage",
  "animator/WaitNextTick",
  "animator/Button",
  "animator/Tween",
  "util/LinesBreaker",
  "util/OptionGetter",
  "animator/Boxify",
  "animator/MaskObjects",
  "animator/Collisions",
  "animator/SoundJS"
  ], function(
  JsonHandler,
  ResponsiveStage,
  WaitNextTick,
  Button,
  Tween,
  LinesBreaker,
  OptionGetter,
  Boxify,
  MaskObjects,
  Collisions,
  SoundJS
) {
  
  var contenu;

  return {
    init: function(s, json, callback) {
      
      s.visible = false;
      
      s.gotoAndStop("CLASSEMENT");
      
      var _screen = s.CLASSEMENT;
      
      ResponsiveStage.storeClip("CLASSEMENT", {horizontal:"fixed", vertical:"fixed"});
      
      var dragsAr = [];
      var counter = 0;
      var height_pointer_left, height_pointer_right;
      
      MaskObjects.init(_screen, ["bt_continue", "fleche_left", "fleche_right", "wrong", "personnalisable"]);
      if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
        s[_screen]["personnalisable"].visible = true;
      }
      
      for (var i=0; i<_screen.children.length; i++){
        if ((_screen.children[i].name == "drag")||(_screen.children[i].name == "result")){
          _screen.children[i].visible = false;
          WaitNextTick.init(function(){
            _screen.removeChildAt(i);
          });
        }
      }
      
      WaitNextTick.init(function(){
        JsonHandler.loadExcel(json, build);
      });
      
      function build(){
        
        Tween.init(s);
        
        var consigne = JsonHandler.getLine(json, 0).consigne.trim();
        var titre = JsonHandler.getLine(json, 2).consigne.trim();
        var titre_left = JsonHandler.getLine(json, 0).titre_colonne_gauche.trim();
        var titre_right = JsonHandler.getLine(json, 0).titre_colonne_droite.trim();
        
        _screen.consigne.text = consigne;
        if (consigne == ""){
          _screen.titre.y = _screen.consigne.y;
        } else {
          _screen.titre.y = _screen.consigne.y + _screen.consigne.getMeasuredHeight() + 20;
        }
        
        _screen.titre.text = titre;
        var height_pointer = _screen.titre.y + _screen.titre.getMeasuredHeight() + 20;
        _screen.titre_left.y = _screen.titre_right.y = _screen.trait.y = height_pointer;
        
        _screen.titre_left.text = titre_left;
        _screen.titre_right.text = titre_right;
        
        LinesBreaker.init(_screen.titre);
        LinesBreaker.init(_screen.consigne);
        LinesBreaker.init(_screen.titre_left);
        LinesBreaker.init(_screen.titre_right);
        
        _screen.trait.scaleY = (750 - _screen.trait.y) / 100;
        
        var height_titles = Math.max(_screen.titre_left.getMeasuredHeight(), _screen.titre_right.getMeasuredHeight());
        
        _screen.titre_left.y += (height_titles - _screen.titre_left.getMeasuredHeight()) / 2;
        _screen.titre_right.y += (height_titles - _screen.titre_right.getMeasuredHeight()) / 2;
        
        height_pointer_left = height_pointer_right = _screen.zone_left.y = _screen.zone_right.y = height_pointer + height_titles;
        
        
        for (var i=2; i<12 ; i++){

          if (JsonHandler.getLine(json, i) != undefined){
            
            if (JsonHandler.getLine(json, i).titre_colonne_gauche != undefined){
              dragsAr.push({
                text : JsonHandler.getLine(json, i).titre_colonne_gauche,
                answer : "left"
              });
            }
            
            if (JsonHandler.getLine(json, i).titre_colonne_droite != undefined){
              dragsAr.push({
                text : JsonHandler.getLine(json, i).titre_colonne_droite,
                answer : "right"
              });
            }
          }
        }
        
        shuffle(dragsAr);
        
        launchDrag();
        
      }
      
      function launchDrag(){
        
        var drag = new lib["CLASSEMENT_drag"]();
        drag.name = "drag";
        _screen.addChild(drag);
        
        drag.champ.text = dragsAr[counter].text;
        Boxify.init(drag.champ, {color:"#EAEAEA", outsidePourcent: 10});
        
        drag.x = drag.oldx = (1920 - drag.getBounds().width) / 2;
        drag.y = drag.oldy = _screen.bt_continue.y - 50;
        
        drag.cursor = "pointer";

        Tween.init(drag, {from:"bottom", distance:100, duration:250, fade:true, callback:
          function(){
            drag.addEventListener("mousedown", press);
            drag.addEventListener("pressmove", move);
            drag.addEventListener("pressup", up);
            
          }
        });
        
        var delta_x;
        var delta_y;
        var target;
        var is_zone;
        
        function press(e){
          target = e.currentTarget;
          delta_x = (stage.mouseX/_screen.scaleX - target.x - _screen.x);
          delta_y = (stage.mouseY/_screen.scaleY - target.y - _screen.y);
          // _screen.setChildIndex(target, _screen.getNumChildren() - 1); 
        }
        
        function move(e){
          if (target != undefined){
            target.x = (stage.mouseX/_screen.scaleX - delta_x - _screen.x);
            target.y = (stage.mouseY/_screen.scaleY - delta_y - _screen.y);
            
            if (Collisions.check(target, _screen.zone_left)){
              is_zone = "left";
            } else if (Collisions.check(target, _screen.zone_right)){
              is_zone = "right";
            } else {
              is_zone = false;
            }
            
            _screen.fleche_left.visible = _screen.fleche_right.visible = false;
            if (is_zone){
              _screen["fleche_"+is_zone].visible = true;
            }
          }
        }

        function up(){
          
          _screen.fleche_left.visible = _screen.fleche_right.visible = false;
          
          if (!is_zone){
            goTween(drag, drag.oldx, drag.oldy, 200);
          } else {
            
            var result = new lib["CLASSEMENT_result"]();
            result.name = "result";
            result.champ.text = dragsAr[counter].text;
            result.coche.visible = false;
            _screen.addChild(result);
            
            
            switch(dragsAr[counter].answer){
              case "left" :
                result.x = 485;
                result.y = height_pointer_left;
                height_pointer_left += 50;
                dragsAr.counter
                break;
              
              case "right" :
                result.x = 1435;
                result.y = height_pointer_right;
                height_pointer_right += 50;
                break;
            }
            drag.removeEventListener("mousedown", press);
            drag.removeEventListener("pressmove", move);
            drag.removeEventListener("pressup", up);
            goTween(drag, result.x, result.y, 350, true);
            
            if (dragsAr[counter].answer == is_zone){
              SoundJS.init("assets/sounds/fx/right.mp3");
            } else {
              SoundJS.init("assets/sounds/fx/wrong.mp3");
              // _screen.setChildIndex(_screen.wrong, _screen.getNumChildren() - 1);
              Tween.init(_screen.wrong, {pop:true, callback:
                function(){
                  Tween.init(_screen.wrong, {fadeout:true});
                }
              });
            }
        
            Tween.init(result, {callback:function(){
              if (dragsAr[counter].answer == is_zone){
                result.coche.gotoAndStop("right");
                Tween.init(result.coche, {pop:true});
              }
              counter ++;
              if (counter == dragsAr.length){
                Tween.init(_screen.bt_continue, {pop:true});
                Button.enableZoom(_screen.bt_continue,
                  function(){
                    callback();
                  }
                );
              } else {
                launchDrag();
              }
            }});
            
          }
          
        }
        
        function goTween(mc, end_x, end_y, speed, fade) {
          
          var end_alpha;
          if (fade){
            end_alpha = 0;
          } else {
            end_alpha = 1;
          }
          
          createjs.Tween.get(mc).to({
            x : end_x,
            y : end_y,
            alpha : end_alpha
          }, speed);
        }
        
      }
    }
  };
  
  /**
   * Shuffles array in place.
   * @param {Array} a items The array containing the items.
   */
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }
});

},
'pdf/Attestation':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Attestation
* using EasyPDF class *
Author: JCK
*/

define(['pdf/EasyPDF', 'engine/Player', 'util/JsonHandler'], function(EasyPDF, Player, JsonHandler) {

  return {
    print: function (infos) {

      EasyPDF({
        name: "attestation_de_formation",
        background: "accordia",
        fontcolor: "#666666",
        fontsize: 20,
        orientation: "l",
        content: function() {
          
          var learner_name;
          
          if (!infos) {
            learner_name = Player.getLearnerName().toLowerCase().replace(/\b\w/g, function(l){return l.toUpperCase()});
            if (learner_name.indexOf(",") != -1){
              var n = learner_name.split(",")[0].trim();
              var p = learner_name.split(",")[1].trim();
              learner_name = p+" "+n;
            }
          } else {
            learner_name = infos.prenom + " " + infos.nom;
          }
          
          moment.locale("fr");

          this.text(JsonHandler.get("CONFIG", "soustitre_attestation"), 149, 45, {align:"center"});
          this.text(learner_name+" a suivi le module e-learning", 149, 55, {align:"center", fontcolor:"#000000"});
          this.text(JsonHandler.get("CONFIG", "titre"), 149, 65, {align:"center", fontcolor:"#000000", fontstyle:"bold"});
          this.text(" avec "+Player.getScore(0)+"% de réussite au quiz de validation des connaissances.", 149, 82, {align:"center", fontcolor:"#000000"});
          
          this.text("Formation effectuée le "+moment().format('LL'), 149, 91 , {fontsize:12, align:"center", fontcolor:"#000000"});
          
          this.text("Accordia - SAS au capital de 100.000 € - RCS de Nanterre 504 455 007 – 182 avenue Charles de Gaulle 92200 Neuilly sur Seine", 149, 191 , {fontsize:12, align:"center"});
          this.text("Organisme de formation agréé Art. 6351-6 : n°11 75 45012 75 – Certification Qualiopi N° 659302", 149, 197 , {fontsize:12, align:"center"});

        }
      });
    }
  };
});

},
'dojox/timing/_base':function(){
define(["dojo/_base/kernel", "dojo/_base/lang"], function(dojo){
	dojo.experimental("dojox.timing");
	dojo.getObject("timing", true, dojox);

	dojox.timing.Timer = function(/*int*/ interval){
		// summary:
		//		Timer object executes an "onTick()" method repeatedly at a specified interval.
		//		repeatedly at a given interval.
		// interval:
		//		Interval between function calls, in milliseconds.
		this.timer = null;
		this.isRunning = false;
		this.interval = interval;

		this.onStart = null;
		this.onStop = null;
	};

	dojo.extend(dojox.timing.Timer, {
		onTick: function(){
			// summary:
			//		Method called every time the interval passes.  Override to do something useful.
		},
			
		setInterval: function(interval){
			// summary:
			//		Reset the interval of a timer, whether running or not.
			// interval:
			//		New interval, in milliseconds.
			if (this.isRunning){
				window.clearInterval(this.timer);
			}
			this.interval = interval;
			if (this.isRunning){
				this.timer = window.setInterval(dojo.hitch(this, "onTick"), this.interval);
			}
		},
		
		start: function(){
			// summary:
			//		Start the timer ticking.
			// description:
			//		Calls the "onStart()" handler, if defined.
			//		Note that the onTick() function is not called right away,
			//		only after first interval passes.
			if (typeof this.onStart == "function"){
				this.onStart();
			}
			this.isRunning = true;
			this.timer = window.setInterval(dojo.hitch(this, "onTick"), this.interval);
		},
		
		stop: function(){
			// summary:
			//		Stop the timer.
			// description:
			//		Calls the "onStop()" handler, if defined.
			if (typeof this.onStop == "function"){
				this.onStop();
			}
			this.isRunning = false;
			window.clearInterval(this.timer);
		}
	});
	return dojox.timing;
});

},
'animator/StorePosition':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Store Position

save and restore position of clips

author: JCK

*/

define(function() {

  var _self;

  return {
    init: function (mc) {
      if (mc != undefined) {
        if (mc.storedPos == undefined) {
          mc.storedPos = new Object();
          mc.storedPos.x = mc.x;
          mc.storedPos.y = mc.y;
        } else {
          mc.x = mc.storedPos.x;
          mc.y = mc.storedPos.y;
        }
      } else {
        console.log ("*ERROR in StorePosition*  clip '"+mc+"' not found !");
      }
    },
    
    initAr: function(stage, mcAr) {
      _self = this;
      for (var i=0; i<mcAr.length; i++) {
        _self.init(stage[mcAr[i]]);
      }
    },
    
    record: function (mc) {
      mc.storedPos = new Object();
      mc.storedPos.x = mc.x;
      mc.storedPos.y = mc.y;
    },
    
    get: function (mc) {
      if (mc.storedPos != undefined) {
        return mc.storedPos;
      } else {
        return false;
      }
    },
    
    reset: function (mc) {
      if (mc.storedPos != undefined) {
        mc.x = mc.storedPos.x;
        mc.y = mc.storedPos.y;
      }
    }
  };
});

},
'animator/SoundJS':function(){
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

},
'animator/QuizDragDrop':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QUIZ DRAG / DROP
author: JCK

Needs following clips on stage:
- mc_drag_1, mc_drag_2, etc.
- mc_drop_1, mc_drop_2, etc.
- bt_submit

QuizDragDrop.init(s, 4, 2, [[2],[0],[0],[1]], fbRight, fbWrong, {instanceDragNames:"mc_drag_val4_", instanceDropNames:"mc_drop_val4_"});
--> return array of answers (starting at #1)

Options:
- instanceDragNames
- instanceDropNames
- autoCorrect
- maskDrops
- callback

 */

define(["animator/Collisions", "util/OptionGetter", "animator/Button", "animator/DynamicGraph", "dojox/timing"], function (Collisions, OptionGetter, Button, DynamicGraph, timing) {

  var _s;
  var _nb_drags;
  var _nb_drops;
  var _answersAr;
  var _feedbacksRight;
  var _feedbackWrong;

  var _tweenSpeed = 200;
  var _tweenSpeedFeedback = 500;
  var _defaultInstanceDragNames = "mc_drag_";
  var _defaultInstanceDropNames = "mc_drop_";
  var _anchor;
  var _anchorStroke;
  var _anchorLineColor;

  var _instanceDragNames;
  var _instanceDropNames;
  var _autoCorrect;
  var _maskDrops;
  var _callback;
  
  var _responsive_ref;

  var _playerAnswersAr;
  var _returnedAnswers;
  var _isDetractor;
  var _isEnded;
  var _minToFinish;
  var _isFeedbackCalled;

  return {
    init : function (stage, nb_drags, nb_drops, answersAr, feedbackRight, feedbackWrong, options) {
      _s = stage;
      _nb_drags = nb_drags;
      _nb_drops = nb_drops;
      _answersAr = answersAr;
      _feedbackRight = feedbackRight;
      _feedbackWrong = feedbackWrong;

      _instanceDragNames = OptionGetter.get(options, "instanceDragNames", _defaultInstanceDragNames);
      _instanceDropNames = OptionGetter.get(options, "instanceDropNames", _defaultInstanceDropNames);
      _anchor = OptionGetter.get(options, "anchor", false);
      _anchorStroke = OptionGetter.get(options, "anchorStroke", 8);
      _anchorLineColor = OptionGetter.get(options, "anchorLineColor", "#000000");

      _autoCorrect = OptionGetter.get(options, "autoCorrect", true);
      _maskDrops = OptionGetter.get(options, "maskDrops", false);
      _callback = OptionGetter.get(options, "callback", false);
      
      _responsive_ref = OptionGetter.get(options, "responsiveRef", _s);
      
      _isFeedbackCalled = false;
      
      if (_nb_drags <= _nb_drops) {
        _minToFinish = _nb_drags;
      } else {
        _minToFinish = _nb_drops;
      }

      construct();
    },

    getAnswers: function() {
      return _returnedAnswers;
    },
    
    getStringOfAnswers: function(separator) {
      return _playerAnswersAr.join(separator);
    },
    
    correct: function() {
      _autoCorrect = true;
      checkWin();
    }
  };

  function construct() {
    
    if (_anchor) {
      DynamicGraph.init(_s);
    }

    _playerAnswersAr = [];
    _isEnded = false;

    _isDetractor = false;
    for (i = 0; i < _nb_drags; i++) {
      if (_answersAr[i][0] == 0) {
        _isDetractor = true;
      }
    }

    //_s.bt_submit.visible = _isDetractor;


    for (var i = 1; i <= _nb_drags; i++) {

      var mc = _s[_instanceDragNames + i];
      mc.gotoAndStop(1);
      mc.mouseEnabled = true;
      mc.iswrong = false;
      
      if (_anchor) {
        mc.x = _s[_anchor + i].x;
        mc.y = _s[_anchor + i].y;
      }

      if (mc.oldx == undefined) {
        mc.oldx = mc.x;
      } else {
        mc.x = mc.oldx;
      }
      if (mc.oldy == undefined) {
        mc.oldy = mc.y;
      } else {
        mc.y = mc.oldy;
      }
      mc.n = i;
      _playerAnswersAr[i - 1] = 0;

      var delta_x;
      var delta_y;
      var target;
      mc.addEventListener("mousedown", function (e) {
        target = e.currentTarget;
        delta_x = (stage.mouseX/_responsive_ref.scaleX - target.x - _responsive_ref.x);
        delta_y = (stage.mouseY/_responsive_ref.scaleY - target.y - _responsive_ref.y);
        // _s.setChildIndex(target, _s.getNumChildren() - 1);
      });

      mc.addEventListener("pressmove", function (e) {
        target.x = (stage.mouseX/_responsive_ref.scaleX - delta_x - _responsive_ref.x);
        target.y = (stage.mouseY/_responsive_ref.scaleY - delta_y - _responsive_ref.y);
        if (_anchor) {
          drawLines();
        }
      });
      mc.cursor = "pointer";

      mc.addEventListener("pressup", function (e) {

        _playerAnswersAr[(e.currentTarget.n) - 1] = 0;
        for (var i = 1; i <= _nb_drops; i++) {
          if (isBoxFree(i)) {
            if (Collisions.check(e.currentTarget, _s[_instanceDropNames + i])) {
              goTween(e.currentTarget, _s[_instanceDropNames + i].x, _s[_instanceDropNames + i].y, _tweenSpeed);
              _playerAnswersAr[(e.currentTarget.n) - 1] = i;
              break;
            }
          }
        }

        if (_playerAnswersAr[(e.currentTarget.n) - 1] == 0) {
          goTween(e.currentTarget, e.currentTarget.oldx, e.currentTarget.oldy, _tweenSpeed);
        }
        _s.bt_submit.visible = isCompleted();
        
        if (_maskDrops) {
          for (i = 1; i <= _nb_drops; i++) {
            _s[_instanceDropNames + i].visible = isBoxFree(i);
          }
        }
        
      });
    }

    for (i = 1; i <= _nb_drops; i++) {
      var mc = _s[_instanceDropNames + i];
      mc.isnofree = false;
      mc.iscorrected = false;
    }

    Button.enable(_s.bt_submit, function(e) {
      Button.disable(e.currentTarget);
      e.currentTarget.visible = false;
      // e.currentTarget.removeAllEventListeners();
      checkWin();
    }, undefined, undefined, {forceVisible:false});

  }

  function goTween(mc, end_x, end_y, speed) {
    var frame_timer;
    if (_anchor) {
      frame_timer = new timing.Timer(10);
      frame_timer.onTick = drawLines;
      frame_timer.start();
    }
    mc.mouseEnabled = false;
    endTween = function () {
      if (_anchor) {
        frame_timer.stop();
        drawLines();
      }
      if (!_isEnded) {
        mc.mouseEnabled = true;
      }
    }
    createjs.Tween.get(mc).to({
      x : end_x,
      y : end_y
    }, speed).call(endTween);
  }

  function drawLines() {
    DynamicGraph.init(_s);
    for (var i=1; i<= _nb_drags; i++) {
      DynamicGraph.line(_s[_anchor+i].x, _s[_anchor+i].y, _s[_instanceDragNames+i].x, _s[_instanceDragNames+i].y, _anchorStroke, _anchorLineColor);
    }
  }
  
  function isBoxFree(boxnumber) {
    var is_box_free;
    if (_s[_instanceDropNames + boxnumber].isnofree) {
      is_box_free = false;
    } else {
      is_box_free = true;
      for (var i = 0; i < _nb_drags; i++) {
        if (_playerAnswersAr[i] == boxnumber) {
          is_box_free = false;
        }
      }
    }
    return is_box_free;
  }

  function isCompleted() {
    var nb_placed = 0;
    for (var i = 0; i < _nb_drags; i++) {
      if (_playerAnswersAr[i] != 0) {
        nb_placed++;
      }
    }
    if (nb_placed >= _minToFinish) {
      return true;
    } else {
      return false;
    }
  }

  function checkWin() {

    _isEnded = true;

    _returnedAnswers = [];

    var isWin = true;
    for (var i = 0; i < _nb_drags; i++) {

      var iwin = false;

      _s[_instanceDragNames + (i+1)].mouseEnabled = false;

      var should_not_be_placed = false;
      for (var j = 0; j < _answersAr[i].length; j++) {

        if (_playerAnswersAr[i] == _answersAr[i][j]) {
          iwin = true;
        }
        if (_answersAr[i][j] == 0) {
          should_not_be_placed = true;
        }
      }

      if (!iwin) {
        if (_s[_instanceDropNames + _playerAnswersAr[i]] != undefined) {
          _s[_instanceDropNames + _playerAnswersAr[i]].iswrong = true;
        }
        _s[_instanceDragNames + (i + 1)].iswrong = true;
        isWin = false;
        if (_playerAnswersAr[i] != 0) {
          if (_autoCorrect) {
            _s[_instanceDragNames + (i + 1)].gotoAndStop("wrong");
          }
        }
        _returnedAnswers[i+1] = false;
      } else {
        if (!should_not_be_placed) {
          if (_autoCorrect) {
            _s[_instanceDragNames + (i + 1)].gotoAndStop("right");
          }
          _returnedAnswers[i+1] = true;
        }
      }
    }

    //feedbacks
    
    if (_callback) {
      _callback();
    }
    
    if (!_isFeedbackCalled) {
      _isFeedbackCalled = true;
      if (isWin) {
        _feedbackRight();
      } else {
        _feedbackWrong();
      }
    }

    if (_autoCorrect) {
      // replace elements
      for (i = 0; i < _nb_drags; i++) {
        var iwr = false;
        if (_s[_instanceDropNames + _playerAnswersAr[i]] != undefined) {
          if (_s[_instanceDropNames + _playerAnswersAr[i]].iswrong) {
            iwr = true;
          }
        }

        if (iwr || (_s[_instanceDragNames + (i + 1)].iswrong)) {
          if (_answersAr[i][0] != 0) {
            var isplaced = false;
            for (j = 0; j < _answersAr[i].length; j++) {
              if (!isplaced) {
                if (isBoxFree(_answersAr[i][j])) {
                  isplaced = _answersAr[i][j];
                  _s[_instanceDropNames + _answersAr[i][j]].isnofree = true;
                } else {
                  if (_s[_instanceDropNames + _answersAr[i][j]].iswrong) {
                    if (!_s[_instanceDropNames + _answersAr[i][j]].iscorrected) {
                      isplaced = _answersAr[i][j];
                      _s[_instanceDropNames + _answersAr[i][j]].iscorrected = true;
                    }
                  }
                }
              }
            }
            if (isplaced) {
              _s.setChildIndex(_s[_instanceDragNames + (i + 1)], _s.getNumChildren() - 1);
              goTween(_s[_instanceDragNames + (i + 1)], _s[_instanceDropNames + isplaced].x, _s[_instanceDropNames + isplaced].y, _tweenSpeedFeedback);
            }
          } else {
            _s.setChildIndex(_s[_instanceDragNames + (i + 1)], _s.getNumChildren() - 1);
            goTween(_s[_instanceDragNames + (i + 1)], _s[_instanceDragNames + (i + 1)].oldx, _s[_instanceDragNames + (i + 1)].oldy, _tweenSpeedFeedback);
          }
        }
      }
    }
  }
});

},
'util/UniqueTimerForVoice':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

  var _self;
  var _timer = new timing.Timer();
  var _isTimer;
  var _is_paused;
  var _is_type;
  var _chronopause;
  var _chronopause_counter;
  var _delay;
  var _fn;
  var _callback;

  return {
    init : function (fn, delay) {
      _self = this;
      _is_type = "init";
      launchChronopause();
      _is_paused = false;
      _delay = delay;
      _fn = fn;
      if (!_isTimer) {
        _timer = new timing.Timer(delay);
        _timer.onTick = fn;
        _timer.start();
        _isTimer = true;
      } else {
        // console.log("*WARNING* UniqueTimer conflict");// debug mode
      }
    },
    stop : function () {
      _timer.stop();
      _isTimer = false;
    },
    setInterval : function (val) {
      _timer.setInterval(val);
      _delay = val;
    },
    wait : function (delay, callback) {
      _self = this;
      _delay = delay;
      _is_type = "wait";
      launchChronopause();
      _is_paused = false;
      _callback = callback;
      function after_wait() {
        _timer.stop();
        _isTimer = false;
        callback();
      }
      _timer = new timing.Timer(delay);
      _timer.onTick = after_wait;
      _timer.start();
      _isTimer = true;
    },
    pause : function () {
      if (_isTimer) {
        _timer.stop();
        _chronopause.stop();
        _is_paused = true;
      }
    },
    resume : function() {
      if (_isTimer) {
        switch (_is_type) {
          case "init" : 
            _isTimer = false;
            _self.init(_fn, _delay);
            break;
          
          case "wait" :
            var new_delay = _delay - _chronopause_counter * 10;
            _self.wait (new_delay, _callback);
            break;
        }
      }
    }
  };
  
  function launchChronopause() {
    _chronopause_counter = 0;
    _chronopause = new timing.Timer(100);
    _chronopause.onTick = function(){
      _chronopause_counter++;
    };
    _chronopause.start();
  }

});

},
'util/JsonHandler':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Json Handler
Load and provide external data from basic {id,value} json files

author: JCK

model:
[{
    "id" : "my_value",
    "value" : "42",
    "value2" : "abc",
    "value3" : "xyz",
    "value..."
  }
]

--> in case OF 1 VALUE : return value String
--> in case of >=2 VALUES : return object

!!! WARNING : Don't forget to parseInt() integer results for numbers !!!

*/

define(["dojo/request/xhr", "dojo/store/Memory", "engine/Player"], function(xhr, Memory, Player) {

  var _stores = new Object();

  return {
    
    loadExcel: function (sheet, callback){
      getJsonFromExcelStory(sheet, sheet, callback);
    },
    
    load: function (json_url, store_name, callback) {
      loadJson(json_url, store_name, callback);
    },

    get: function (store_name, id) {
      if (id != undefined) {
        if (_stores[store_name].get(id) != undefined) {
          var result;
          if (Object.keys(_stores[store_name].get(id)).length > 2) {
            result = _stores[store_name].get(id);
          } else {
            result = _stores[store_name].get(id).value;
          }
          return result;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    
    getObj: function (store_name, id) {
      if (id != undefined) {
        if (_stores[store_name].get(id) != undefined) {
          var result;
          result = _stores[store_name].get(id);
          return result;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    
    getLength: function (store_name) {
      return _stores[store_name].data.length;
    },
    
    getId: function (store_name, val) {
      return _stores[store_name].data[val].id;
    },
    
    getLine: function (store_name, line) {
      var res = _stores[store_name].data[line];
      return res;
    }
  };

  function loadJson(json_url, store_name, callback) {
    xhr(json_url, {
      handleAs: "json"
    }).then(function(loaded_data) {
      // -----> create store
      _stores[store_name] = new Memory({data: loaded_data});
      callback();
    }, function(err) {
      console.log("**ERROR** "+ err +"|||FILE:"+json_url);
    });
  }
  
  function getJsonFromExcelStory(sheet, store_name, callback) {
    _stores[store_name] = new Memory({data: Player.getExcelStory()[sheet]});
    if (callback != undefined){
      callback();
    }
  }
});

},
'animator/SwitchVisible':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

SwitchVisible
author: JCK

Just make a clip not visible and another one visible
snippet:
SwitchVisible.set(s[_screen], "cliptohide", "cliptoshow");

*/

define(function () {

  return {
    set: function (s, cliptohide, cliptoshow) {
      s[cliptohide].visible = false;
      s[cliptoshow].visible = true;
    }
  };
});

},
'animator/ResponsiveStage':function(){
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

},
'animator/VerticalTextCenterer':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Vertical Text Centerer
author: JCK

 */

define(['dojox/timing'], function (timing) {

  return {
    init : function (textfield, totalheight, type) {
    
      apply(textfield, totalheight, type);
      
      var timer = new timing.Timer(50);
      timer.onTick = function() {
        timer.stop();
        apply(textfield, totalheight, type);
      };
      timer.start();
    }
  };
  
  function apply (textfield, totalheight, type) {
  
      switch (type) {
      case "top":
        textfield.regY = 0;
        break;

      case "middle":
        textfield.regY = (totalheight - textfield.getMeasuredHeight()) / 2 *-1;
        break;

      case "bottom":
        textfield.regY = (totalheight - textfield.getMeasuredHeight()) *-1;
        break;

      default:
        console.log("*ERROR* in VerticalTextCenterer : '" + type + "' is not a valid centering type");
        return false;
        break;
      }
  }
});

},
'animator/Button':function(){
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

},
'engine/QuizFinal':function(){
/*
Story-engine with Animate and Create.js
Copyright © 2024 devjck
Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QuizFinal
author: JCK

 */

define(['engine/Player',
        'animator/ResponsiveStage',
        'animator/Tween',
        'util/Sequencer',
        'animator/MaskObjects',
        'util/UniqueTimer',
        'animator/Button',
        'animator/Voice',
        'animator/StorePosition',
        'animator/Mascotte',
        'animator/SwitchVisible',
        'animator/QuizQcmQcu',
        'util/JsonHandler',
        'animator/TweenValue',
        'pdf/Attestation',
        'pdf/ReponsesPartielles',
        'pdf/ReponsesCompletes',
        'util/ModalDialog',
        'animator/SoundJS',
        'engine/ChapitrePlayer',
        'animator/QuizBuilder'
    ], function (
        Player,
        ResponsiveStage,
        Tween,
        Sequencer,
        MaskObjects,
        UniqueTimer,
        Button,
        Voice,
        StorePosition,
        Mascotte,
        SwitchVisible,
        QuizQcmQcu,
        JsonHandler,
        TweenValue,
        Attestation,
        ReponsesPartielles,
        ReponsesCompletes,
        ModalDialog,
        SoundJS,
        ChapitrePlayer,
        QuizBuilder) {

    var _screen = "QUIZFINAL";
    var _score;

    return {
        init: function () {

            shortcut.remove("ctrl+alt+shift+right");

            // init screen
            s.gotoAndStop(_screen);
            s.visible = true;
            MaskObjects.init(s[_screen], ["part3", "part4"]);
            ResponsiveStage.storeClip(_screen, {
                horizontal: "fixed",
                vertical: "fixed"
            });

            var has_perso = true;

            part1();
            // part1
            function part1() {

                s[_screen]["part1"].visible = true;
                if (s[_screen]["part1"]["marcillac"] != undefined) {
                    s[_screen]["part1"]["marcillac"].gotoAndStop(0);
                } else {
                    has_perso = false;
                }

                // animate texts localization:
                s[_screen]["part1"]["consigne"].text = __gtexts[__lang].quizfin_start.replace("XXX", JsonHandler.get("CONFIG", "succes"));

                s[_screen]["part3"].champ_yourscore.text = __gtexts[__lang].animate_quizfinal_yourscore;
                s[_screen]["part3"]["feedbackright"].champ.text = __gtexts[__lang].animate_quizfinal_succes;
                s[_screen]["part3"]["reponses"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_answers;
                s[_screen]["part3"]["livret"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_memo;
                s[_screen]["part3"]["attestation"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_attestation;
                s[_screen]["part3"]["valider"].consigne.text = __gtexts[__lang].animate_quizfinal_submit;

                s[_screen]["part4"].champ_yourscore.text = __gtexts[__lang].animate_quizfinal_yourscore;
                s[_screen]["part4"]["feedbackwrong"].champ.text = __gtexts[__lang].animate_quizfinal_fail;
                s[_screen]["part4"]["telecharger"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_answers;
                s[_screen]["part4"]["retenter"].consigne.text = __gtexts[__lang].animate_quizfinal_retry;

                Tween.init(s[_screen]["part1"]["bt_continue"], {
                    pop: true
                });

                JsonHandler.loadExcel("QUIZ_FINAL", next);

                function next() {

                    var perso = false;
                    var c = 0;
                    while (JsonHandler.getLine("QUIZ_FINAL", c)) {
                        if (JsonHandler.getLine("QUIZ_FINAL", c).son != "") {
                            perso = "marcillac";
                        }
                        c++;
                    }

                    Button.enableZoom(s[_screen]["part1"]["bt_continue"], function () {
                        if (has_perso) {
                            QuizBuilder.init(s, "QUIZ_FINAL", {
                                prologue: true,
                                perso: perso,
                                consigneauto: true,
                                no_feedback: JsonHandler.get("CONFIG", "quiz_final_no_feedback") == "yes"
                            }, end);
                        } else {
                            QuizBuilder.init(s, "QUIZ_FINAL", {
                                prologue: true,
                                consigneauto: true,
                                no_feedback: JsonHandler.get("CONFIG", "quiz_final_no_feedback") == "yes"
                            }, end);
                        }
                    });

                }
            }

            // end
            function end(score) {

                s.gotoAndStop(_screen);

                _score = score;
                Player.recordScore(0, _score);

                if (_score >= parseInt(JsonHandler.get("CONFIG", "succes"))) {
                    endRight();
                } else {
                    endWrong();
                }

                function endWrong() {
                    SwitchVisible.set(s[_screen], "part1", "part4");
                    MaskObjects.init(s[_screen]["part4"], ["feedbackwrong", "telecharger", "retenter"]);
                    TweenValue.init(s[_screen]["part4"]["score"], 0, _score, 20, {
                        callback: next,
                        append_string: "%"
                    });
                    function next() {
                        Tween.init(s[_screen]["part4"]["feedbackwrong"], {
                            callback: function () {
                                // Tween.init(s[_screen]["part4"]["telecharger"]);
                                Tween.init(s[_screen]["part4"]["retenter"]);
                                // Button.enableZoom(s[_screen]["part4"]["telecharger"]["bt"], ReponsesPartielles.print, null, null, {noDisable:true});
                                Button.enableZoom(s[_screen]["part4"]["retenter"]["bt"], function () {
                                    s[_screen]["part4"].visible = false;
                                    part1();
                                });
                            }
                        });

                        Player.scormRecordScore();

                    }
                }

                function endRight() {
                    SwitchVisible.set(s[_screen], "part1", "part3");
                    MaskObjects.init(s[_screen]["part3"], ["feedbackright", "reponses", "attestation", "livret", "valider"]);
                    TweenValue.init(s[_screen]["part3"]["score"], 0, _score, 20, {
                        callback: next,
                        append_string: "%"
                    });
                    function next() {
                        if (has_perso) {
                            Mascotte.play(s[_screen]["part3"]["marcillac"], JsonHandler.getLine("STORY", ChapitrePlayer.getIndex() + 1).son, {
                                text: JsonHandler.getLine("STORY", ChapitrePlayer.getIndex() + 1).deroule,
                                start: "pose",
                                end: "unpose"
                            }, function () {
                                SoundJS.init("assets/sounds/fx/applause.mp3");
                            });
                        } else {
                            SoundJS.init("assets/sounds/fx/applause.mp3");
                        }

                        var height_pointer = 550;

                        Sequencer.launch([
                          function (next) {
                              Tween.init(s[_screen]["part3"]["feedbackright"], {
                                  callback: next
                              });
                          },
                          // function(next) {
                          // Tween.init(s[_screen]["part3"]["reponses"], {callback:next});
                          // Button.enableZoom(s[_screen]["part3"]["reponses"]["bt"], ReponsesCompletes.print, null, null, {noDisable:true});
                          // },
                          function (next) {
                              if (JsonHandler.get("CONFIG", "attestation") == "yes") {

                                  s[_screen]["part3"]["attestation"].y = height_pointer;
                                  Tween.init(s[_screen]["part3"]["attestation"], {
                                      callback: next,
                                      noInit: true
                                  });
                                  Button.enableZoom(s[_screen]["part3"]["attestation"]["bt"],
                                      function () {
                                      if (Player.isScorm()) {
                                          Attestation.print();
                                      } else {
                                          ModalDialog.form(__gtexts[__lang].quizfin_cert1, __gtexts[__lang].quizfin_cert2, [{
                                                      value: "prenom",
                                                      name: __gtexts[__lang].quizfin_cert4,
                                                      glyphicon: "user"
                                                  }, {
                                                      value: "nom",
                                                      name: __gtexts[__lang].quizfin_cert3,
                                                      glyphicon: "user"
                                                  }
                                              ], callback);
                                          function callback(result) {
                                              result.prenom = result.prenom.toLowerCase().replace(/\b\w/g, function (l) {
                                                  return l.toUpperCase()
                                              });
                                              result.nom = result.nom.toLowerCase().replace(/\b\w/g, function (l) {
                                                  return l.toUpperCase()
                                              });
                                              Button.disable(s[_screen]["part3"]["attestation"]["bt"]);
                                              Attestation.print(result);
                                          }
                                      }
                                  }, null, null, {
                                      noDisable: true
                                  });

                                  height_pointer += 170;

                              } else {
                                  next();
                              }
                          },
                          function (next) {

                              if (JsonHandler.get("CONFIG", "synthese") != undefined) {

                                  s[_screen]["part3"]["livret"].y = height_pointer;

                                  Tween.init(s[_screen]["part3"]["livret"], {
                                      callback: next,
                                      noInit: true
                                  });

                                  Button.enableZoom(s[_screen]["part3"]["livret"]["bt"], function () {
                                      var fileurl = "assets/pdf/" + JsonHandler.get("CONFIG", "synthese");
                                      download(fileurl);
                                  }, null, null, {
                                      noDisable: true
                                  });

                                  height_pointer += 170;

                              } else {
                                  next();
                              }

                          },
                          function (next) {
                              Player.unlockCurrent();
                              if (Player.isScorm()) {

                                  if (JsonHandler.get("CONFIG", "bouton_validation_module").trim().toLowerCase() == "yes") {

                                      s[_screen]["part3"]["valider"].y = height_pointer;
                                      Tween.init(s[_screen]["part3"]["valider"], {
                                          noInit: true
                                      });
                                      Button.enableZoom(s[_screen]["part3"]["valider"]["bt"], finishAndClose);

                                  } else {
                                      Player.scormFinish();
                                  }

                                  function finishAndClose() {
                                      Player.scormFinish();
                                      ModalDialog.alert(__gtexts[__lang].quizfin_close);
                                  }

                              }
                          }
                      ]);
                    }
                }
            }
        }
    };
});

},
'util/ModalDialog':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

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

},
'util/ExternalText':function(){
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

},
'util/SoundJS_NoQueue':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

SoundJS implementation
author: JCK

 */

define(function() {
  
  var _is_playing = false;
  var _instance;
  
  
  return {
    init : function (filename, loaded_callback, complete_callback, superpose) {
      
      if (superpose != true) {
        createjs.Sound.removeAllSounds();
        createjs.Sound.removeAllEventListeners();
      }
      
      var id = (filename.substring(filename.lastIndexOf('/')+1)).split(".")[0];
      
      createjs.Sound.on("fileload", loadHandler);
      createjs.Sound.registerSound(filename, "sound");

      function loadHandler() {
        if (loaded_callback != undefined) {
          loaded_callback();
        }
        _instance = createjs.Sound.play("sound");
        
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
      createjs.Sound.removeAllSounds();
      createjs.Sound.removeAllEventListeners();
      _is_playing = false;
    }
  }
});

},
'animator/DynamicGraph':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Dynamic Graph
author: JCK

create shapes by script in a movieclip dedicated for this purpose
*/

define(['util/OptionGetter', 'animator/Tween'], function(OptionGetter, Tween) {

  var _mcdg = "dynamic_graph"; // instance of the movieclip
  var _scene;
  var _children;

  return {
    init: function (scene) {
      _scene  = scene;
      _scene[_mcdg].x = _scene[_mcdg].y = 0;
      if (_children) {
        for (var i=0; i<_children.length; i++) {
          _children[i].graphics.clear();
        }
      }
      _children = [];
    },
    
    roundRect: function(x, y, w, h, radius, color, options) {
      var tween_options = OptionGetter.get(options, "tween", false);
      var shape = new createjs.Shape();
      shape.graphics.beginFill(color).drawRoundRect(x, y, w, h, radius);
      _scene[_mcdg].addChild(shape);
      if (tween_options) {
        Tween.init(shape, tween_options);
      }
      _children.push(shape);
    },
    
    line: function(x1, y1, x2, y2, stroke, color) {
      var shape = new createjs.Shape();
      shape.graphics.setStrokeStyle(stroke,"round").beginStroke(color);
      shape.graphics.lineTo(x1, y1);
      shape.graphics.lineTo(x2, y2);
      _scene[_mcdg].addChild(shape);
      _children.push(shape);
    }
  };
});

},
'app/App':function(){
define([], 1);

},
'animator/Voice':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Voice
author: JCK

needs on stage:
mc_subtitles  > champ (textfield)
_character  > mouthTalk
*/

define(['animator/SoundJS', 'util/ExternalText', 'util/UniqueTimerForVoice', 'util/OptionGetter', 'engine/Player', 'util/LinesBreaker', 'animator/VerticalTextCenterer'], function(SoundJS, ExternalText, UniqueTimerForVoice, OptionGetter, Player, LinesBreaker, VerticalTextCenterer) {

  var _self;
  var _mc;
  var _chorus;
  var _debug = false;
  var _is_talking;
  var _is_paused;
  var _callback;

  return {
    init: function(mc) {
      _self = this;
      _mc = mc;
      _mc.mouthTalk.gotoAndStop(0);
    },

    talk: function(id, callback, options) {
      
      _callback = callback;
      
      shortcut.remove("space");
      _self = this;
      
      UniqueTimerForVoice.stop();
      
      var superpose = OptionGetter.get(options, "superpose", false);
      var delay = OptionGetter.get(options, "delay", 0);
      _mc = OptionGetter.get(options, "character", undefined);
      var loaded_callback = OptionGetter.get(options, "onload", false);
      _chorus = OptionGetter.get(options, "chorus", false);
      var text = OptionGetter.get(options, "text", false);
      var forceLoad = OptionGetter.get(options, "forceLoad", false);

      if (Player.noVoice()) {
        filename = "assets/sounds/fx/debug.mp3";
      } else {
        filename = "assets/sounds/voice/"+id+".mp3"; 
      }
      
      var caption
      if (text != undefined){
        caption = text;
      } else {
        caption = ExternalText.getSubtitle(id);
      }

      function start_talk() {
        
        _is_talking = true;
        
        if (loaded_callback) {
          loaded_callback();
        }

        if (_mc != undefined) {
          _mc.visible = true;
          UniqueTimerForVoice.init(chooseTalkFrame, getRandLipTime());
        }
        
        s.mc_subtitles.outline_champ.font = "45px 'Quicksand Medium'";
        s.mc_subtitles.champ.font = "45px 'Quicksand Medium'";
        s.mc_subtitles.outline_champ.outline=8;

        
        s.mc_subtitles.outline_champ.text = caption;
        LinesBreaker.init(s.mc_subtitles.outline_champ, {equal:true});
        s.mc_subtitles.champ.text = s.mc_subtitles.outline_champ.text;
        
        VerticalTextCenterer.init(s.mc_subtitles.champ, 220, "bottom") ;
        VerticalTextCenterer.init(s.mc_subtitles.outline_champ, 220, "bottom") ;
        
        shortcut.add("space", function(){
          SoundJS.abort();
          stop_talk();
        });
      }

      var currentTalkFrame;
      function chooseTalkFrame() {
        if (!_is_paused){
          var randomTalkFrame;
          do {
            randomTalkFrame = getRandomInt(1, _mc.mouthTalk.totalFrames);
          } while (randomTalkFrame == currentTalkFrame);
          currentTalkFrame = randomTalkFrame;
          _mc.mouthTalk.gotoAndStop(currentTalkFrame);
          
          if (_chorus) {
            for (var i=0; i<_chorus.length; i++){
              do {
                randomTalkFrame = getRandomInt(1, _chorus[i].tete.mouthTalk.totalFrames);
              } while (randomTalkFrame == currentTalkFrame);
              currentTalkFrame = randomTalkFrame;
              _chorus[i].tete.mouthTalk.gotoAndStop(currentTalkFrame);
            }
          }

          UniqueTimerForVoice.setInterval(getRandLipTime());
        }
      }

      function stop_talk() {
        _is_talking = false;
        shortcut.remove("space");
        _self.stopTalk();
        if (_callback != undefined) {
          _callback();
        }
      }

      function launch() {
        SoundJS.init(filename, start_talk, stop_talk, superpose, forceLoad);
      }

      if (delay == 0) {
        launch();
      } else {
        UniqueTimerForVoice.wait(delay, launch);
      }
    },

    stopTalk: function() {

      if (_mc != undefined) {
        UniqueTimerForVoice.stop();
        _mc.mouthTalk.gotoAndStop(0);
      }
      if (_chorus) {
        for (var i=0; i<_chorus.length; i++){
          _chorus[i].tete.mouthTalk.gotoAndStop(0);
        }
      }

      if (Player.isIe()) {
        createjs.Sound.removeAllSounds();
      } else {
        createjs.Sound.stop();
      }

      if (s.mc_subtitles != undefined) {
        s.mc_subtitles.outline_champ.text = "";
        s.mc_subtitles.champ.text = "";
      }
    },
    
    pause: function(){
      SoundJS.pause();
      if (_is_talking){
        shortcut.remove("space");
      }
      _is_paused = true;
    },
    
    unpause: function(){
      SoundJS.resume();
      if (_is_talking){
        shortcut.add("space", function(){
          SoundJS.abort();
          _is_talking = false;
          shortcut.remove("space");
          _self.stopTalk();
          if (_callback != undefined) {
            _callback();
          }
        });
      }
      _is_paused = false;
    },
  };

  function getRandLipTime() {
    return getRandomInt(75, 175);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
});

},
'animator/Mascotte':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Mascotte
author: JCK

needs on stage:
mc_subtitles  > champ (textfield)
mc_mascotte > mc_mouthClosed
      > mc_mouthTalk > mc_mouthTalk_1, mc_mouthTalk_2, mc_mouthTalk_3, mc_mouthTalk_4

*/

define(['animator/Voice', 'util/OptionGetter', 'util/UniqueTimerForMascotte'], function(Voice, OptionGetter, UniqueTimerForMascotte) {

  var _allMascAr = [];
  var _self;


  return {
    
    initAll: function() {
      
      _self = this;
      
      for (var i=0; i<_allMascAr.length; i++){
        _self.init(_allMascAr[i]);
      }
    },
    
    init: function(mc) {
      if (mc != undefined){
        mc.gotoAndStop(0);
        if (mc.tete != undefined){
          mc.tete.mouthTalk.gotoAndStop(0);
        }
      }
    },
    
    play: function(mc, voice_file, options, callback) {
      
      if (mc != undefined){
        var is_in_record = false;
        for (var i=0; i<_allMascAr.length; i++){
          if (_allMascAr[i] == mc){
            is_in_record = true;
          }
        }
        if (!is_in_record){
          _allMascAr.push(mc);
        }
      }
      
      
      _self = this;
      var start = OptionGetter.get(options, "start", false);
      var end = OptionGetter.get(options, "end", false);
      var reaction = OptionGetter.get(options, "reaction", false);
      var chorus = OptionGetter.get(options, "chorus", false);
      var thinkTime = OptionGetter.get(options, "thinkTime", false);
      var text = OptionGetter.get(options, "text", null);
      var forceLoad = OptionGetter.get(options, "forceLoad", false);
      
      if (forceLoad && (voice_file.indexOf("debug.mp3") != -1)){
        forceLoad = false;
      }
      
      if (mc != undefined){
        _self.init(mc.tete);
      }
      
      if (thinkTime){
        UniqueTimerForMascotte.wait(thinkTime, launchPlay);
      } else {
        launchPlay();
      }
      
      function launchPlay(){
        
        var mctete;
        if (mc != undefined){
          mctete = mc.tete;
        }
        
        if (voice_file != undefined) {
          Voice.talk(voice_file, function(){
            if (end) {
              if (mc != undefined){
                mc.gotoAndPlay(end);
              }
            }
            if (reaction) {
              reaction[0].gotoAndPlay(reaction[1]);
            }
            if (callback != undefined) {
              callback();
            }
          },
          {
            character:mctete,
            onload:function(){
              if (start) {
                if (mc != undefined){
                  mc.gotoAndPlay(start);
                }
              }
            },
            chorus:chorus,
            text:text,
            forceLoad: forceLoad
          });
        } else {
          if (start) {
            if (mc != undefined){
              mc.gotoAndPlay(start);
            }
          }
        }
      }
      
    }
  };
});

},
'util/ResponsiveScale':function(){
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

},
'animator/QuizBuilder':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Quiz Builder
Build Dynamic Quiz from JSON

author: JCK

*/

define([
  "util/JsonHandler",
  "animator/ResponsiveStage",
  "animator/WaitNextTick",
  "animator/Button",
  "animator/Tween",
  "util/OptionGetter",
  "animator/MaskObjects",
  "animator/QuizQcmQcu",
  "animator/StorePosition",
  "util/UniqueTimer",
  "animator/Mascotte",
  "util/CanvasTransition",
  "animator/SoundJS",
  "util/LinesBreaker",
  "animator/LoadImage",
  "animator/Voice"
  ], function(
  JsonHandler,
  ResponsiveStage,
  WaitNextTick,
  Button,
  Tween,
  OptionGetter,
  MaskObjects,
  QuizQcmQcu,
  StorePosition,
  UniqueTimer,
  Mascotte,
  CanvasTransition,
  SoundJS,
  LinesBreaker,
  LoadImage,
  Voice
) {
  
  var contenu;

  return {
    init: function(s, json, options, callback) {
      
      s.gotoAndStop("QUIZ");
      
      var _screen = s.QUIZ;
      
      MaskObjects.init(_screen, ["question", "mc_choice_1", "mc_choice_2", "mc_choice_3", "mc_choice_4", "mc_choice_5", "mc_choice_6", "feedback", "bt_submit", "bt_continue", "perso"]);
      if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
        _screen["personnalisable"].visible = true;
      } else {
        if (_screen.personnalisable != undefined) {
          _screen.personnalisable.visible = false;
        }
      }
      
      _screen.image.removeAllChildren();
      
      ResponsiveStage.storeClip("QUIZ", {horizontal:"fixed", vertical:"fixed"});
      
      var _perso = OptionGetter.get(options, "perso", false);
      
      var _consigneauto = OptionGetter.get(options, "consigneauto", false);
      
      var _no_feedback = OptionGetter.get(options, "no_feedback", false);
      
      var _question_counter = 0;
      var _correct_answers = 0;
      
      var line_counter = 0;

      
      WaitNextTick.init(function(){
        
        s.visible = true;
        canvas.style.opacity = '0';

        if (!OptionGetter.get(options, "prologue", false)){
          _screen.prologue_bg_zoom.visible = false;
        } else {
          _screen.prologue_bg_zoom.visible = true;
        }
        
        JsonHandler.loadExcel(json, launch);
      });
      
      function initWidths(){
        var i;
        if (_perso){
          _screen.perso.gotoAndStop(_perso);
          _screen.perso[_perso].gotoAndStop(0);
          _screen.perso.visible = true;
          _screen.question.x = 480;
          _screen.question.lineWidth = 1290;
          _screen.consigne.x = 480;
          _screen.consigne.lineWidth = 1290;
          _screen.feedback.x = 480;
          _screen.bt_submit.x = 1030;
          for (i=1; i<=6; i++){
            _screen["mc_choice_"+i].x = 480;
            _screen["mc_choice_"+i].champ.lineWidth = 1100;
          }
        } else {
          _screen.question.x = 225;
          _screen.question.lineWidth = 1600;
          _screen.consigne.x = 225;
          _screen.consigne.lineWidth = 1600;
          _screen.feedback.x = 225;
          _screen.bt_submit.x = 960;
          for (i=1; i<=6; i++){
            _screen["mc_choice_"+i].x = 225;
            _screen["mc_choice_"+i].champ.lineWidth = 1550;
          }
        }
        
      }
      
      
      function launch(){
        
        var _total_questions;
        // count questions (for consigneauto)
        if (_consigneauto){
          _total_questions = 0
          var i = 0;
          while (JsonHandler.getLine(json, i) != undefined){
            if (JsonHandler.getLine(json, i).id == "question"){
              _total_questions++;
            }
            i++
          }
        } 
        
        CanvasTransition.init(null, "fadein");
        
        launchQuestion();
        
        function launchQuestion(){
          
          initWidths();
          
          _question_counter ++;
          _screen.question.y = _screen.consigne.y = 35;
          
          if (JsonHandler.getLine(json, line_counter).id == "consigne"){
            // consigne auto ?
            if (_consigneauto){
              _screen.consigne.text = __gtexts[__lang].quiz_consigne_auto.replace("[num]", _question_counter).replace("[total]", _total_questions) + " ";
              // test qcm/qcu below
            } else {
              _screen.consigne.text = JsonHandler.getLine(json, line_counter).value;
            }
            Tween.init(_screen.consigne, {from:"right", distance:200, duration:350, fade:true, noInit:true});
            _screen.question.y = _screen.consigne.y + _screen.consigne.getMeasuredHeight() + 15;
            line_counter++;
          } else {
            _screen.consigne.visible = false;
          }
          
          if ((JsonHandler.getLine(json, line_counter).son != "")&&(JsonHandler.getLine(json, line_counter).son != undefined)){
            if (_perso){
              Mascotte.play(_screen.perso[_perso], JsonHandler.getLine(json, line_counter).son, {text:" ", forceLoad:true});
            } else {
              var son_url = "assets/sounds/voice/"+JsonHandler.getLine(json, line_counter).son+".mp3";
              SoundJS.init(son_url, null, null, null, true);
            }
          }
          if ((JsonHandler.getLine(json, line_counter).image != "")&&(JsonHandler.getLine(json, line_counter).image != undefined)){
            LoadImage.init(_screen.image, "assets/images/medias/"+JsonHandler.getLine(json, line_counter).image, function(w,h){
              
              _screen.image.x = 1920-35-w;
              _screen.question.lineWidth -= (35+w);
              _screen.consigne.lineWidth -= (35+w);
              buildQuestion();
            });
          } else {
            buildQuestion();
          }
          
          function buildQuestion(){
          
            _screen.question.text = JsonHandler.getLine(json, line_counter).value;
            LinesBreaker.init(_screen.question);
            
            Tween.init(_screen.question, {from:"right", distance:200, duration:350, fade:true, noInit:true});
            
            _screen.mc_choice_1.y = _screen.question.y + _screen.question.getMeasuredHeight() + 20;
            
            var start_line = line_counter;
            
            line_counter++;

            
            var answer = [];
            var propositions = [];
            var feedback;
            var shuffle = false;
            var win = false;
            var forceMulti = false;
            while(JsonHandler.getLine(json, line_counter).id != "feedback"){
              
              if ((JsonHandler.getLine(json, line_counter).id == "ok")||(JsonHandler.getLine(json, line_counter).id == "okm")){
                answer.push(line_counter - start_line);
                if (JsonHandler.getLine(json, line_counter).id == "okm"){
                  forceMulti = true;
                }
              }
              var prop = JsonHandler.getLine(json, line_counter).value;
              propositions.push(prop);
              
              line_counter++;
              // }
            }
            feedback = JsonHandler.getLine(json, line_counter).value;
            line_counter++;
            
            // finalize consigne
            if (_consigneauto){
              if (answer.length > 1 || forceMulti) {
                  _screen.consigne.text += __gtexts[__lang].quizfin_qcm;
              } else {
                _screen.consigne.text += __gtexts[__lang].quizfin_qcu;
              }
            }
            
            // do the quiz
            UniqueTimer.wait(200, function(){
              QuizQcmQcu.init(_screen, propositions, answer, correct, wrong, {spacer:40, shuffle:false, forceMulti:forceMulti});

              for (var i=1; i<=propositions.length; i++){
                Tween.init(_screen["mc_choice_"+i], {noInit:true});
              }
              
              var bottom_pos = _screen["mc_choice_"+propositions.length].y + _screen["mc_choice_"+propositions.length].champ.getMeasuredHeight();
              _screen.bt_submit.y = bottom_pos + 150;
            });
          
            function correct(){
              if (_perso){
                Voice.stopTalk();
              }
              _correct_answers ++;
              
              if (_no_feedback) {
                goNext();
              } else {
                SoundJS.init("assets/sounds/fx/right.mp3");
                win = true;
                goFeedback();
              }
            }
            
            function wrong(){
              if (_no_feedback) {
                goNext();
              } else {
                SoundJS.init("assets/sounds/fx/wrong.mp3");
                goFeedback();
              }
            }
            
            function goFeedback(){
              if (_perso){
                Voice.stopTalk();
              }
              var bottom_pos = _screen["mc_choice_"+propositions.length].y + _screen["mc_choice_"+propositions.length].champ.getMeasuredHeight();
              _screen.feedback.y = bottom_pos + 55;
              _screen.bt_continue.y = bottom_pos + 150;
              
              var sound_fx;
              if (win){
                sound_fx = "right";
              } else {
                sound_fx = "wrong";
              }
              
              SoundJS.init("assets/sounds/fx/"+sound_fx+".mp3", null, function(){
                if (JsonHandler.getLine(json, line_counter-1).son != undefined){
                  if (_perso){
                    Mascotte.play(_screen.perso[_perso], JsonHandler.getLine(json, line_counter-1).son, {text:" ", forceLoad:true});
                  } else {
                    var son_url = "assets/sounds/voice/"+JsonHandler.getLine(json, line_counter-1).son+".mp3";
                    SoundJS.init(son_url, null, null, null, true);
                  }
                }
              });
              // no feedback ?
              if (feedback == undefined){
                _screen.bt_continue.x = _screen.bt_submit.x;
                _screen.bt_continue.y = _screen.bt_submit.y;
                
                
                StorePosition.record(_screen.bt_continue);
                Tween.init(_screen.bt_continue, {pop:true, noInit:true});
                Button.enableZoom(_screen.bt_continue, goNext);
                
              // feedback ?
              } else {
                if (_perso){
                  _screen.bt_continue.x = 1780;
                } else {
                  _screen.bt_continue.x = 1550;
                }
                _screen.feedback.champ.text = feedback;
                
                Tween.init(_screen.feedback, {from:"right", distance:200, duration:350, fade:true, noInit:true, callback:
                  function(){
                    _screen.bt_continue.y = _screen.feedback.y + (_screen.feedback.champ.getMeasuredHeight() / 2) - 20;
                    StorePosition.record(_screen.bt_continue);
                    Tween.init(_screen.bt_continue, {pop:true, noInit:true});
                    Button.enableZoom(_screen.bt_continue, goNext);
                  }
                });
              } 
            }
            
            function goNext(){
              // quiz finished // next question ?
              SoundJS.abort();
              if (JsonHandler.getLine(json, line_counter) != undefined){
                if ((JsonHandler.getLine(json, line_counter).id.toLowerCase().trim() != "question")&&(JsonHandler.getLine(json, line_counter).id.toLowerCase().trim() != "consigne")){
                  endQuiz();
                } else {
                  launchNext();
                }
              } else {
                endQuiz();
              }
              
              function endQuiz(){
                var score = Math.round(_correct_answers / _question_counter * 100);
                callback(score);
              }
              
              function launchNext(){
                MaskObjects.init(_screen, ["question", "mc_choice_1", "mc_choice_2", "mc_choice_3", "mc_choice_4", "mc_choice_5", "mc_choice_6", "feedback", "bt_submit", "bt_continue"]);
                launchQuestion();
              }
            }
          }
          
        }
        
        
      }

    }
  };
});

},
'animator/WaitNextTick':function(){
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

},
'util/UniqueTimer':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

  var _self;
  var _timer = new timing.Timer();
  var _isTimer;
  var _is_paused;
  var _is_type;
  var _chronopause;
  var _chronopause_counter;
  var _delay;
  var _fn;
  var _callback;

  return {
    init : function (fn, delay) {
      _self = this;
      _is_type = "init";
      launchChronopause();
      _is_paused = false;
      _delay = delay;
      _fn = fn;
      if (!_isTimer) {
        _timer = new timing.Timer(delay);
        _timer.onTick = fn;
        _timer.start();
        _isTimer = true;
      } else {
        // console.log("*WARNING* UniqueTimer conflict");// debug mode
      }
    },
    stop : function () {
      _timer.stop();
      _isTimer = false;
    },
    setInterval : function (val) {
      _timer.setInterval(val);
      _delay = val;
    },
    wait : function (delay, callback) {
      _self = this;
      _delay = delay;
      _is_type = "wait";
      launchChronopause();
      _is_paused = false;
      _callback = callback;
      function after_wait() {
        _timer.stop();
        _isTimer = false;
        callback();
      }
      _timer = new timing.Timer(delay);
      _timer.onTick = after_wait;
      _timer.start();
      _isTimer = true;
    },
    pause : function () {
      if (_isTimer) {
        _timer.stop();
        _chronopause.stop();
        _is_paused = true;
      }
    },
    resume : function() {
      if (_isTimer) {
        switch (_is_type) {
          case "init" : 
            _isTimer = false;
            _self.init(_fn, _delay);
            break;
          
          case "wait" :
            var new_delay = _delay - _chronopause_counter * 10;
            _self.wait (new_delay, _callback);
            break;
        }
      }
    }
  };
  
  function launchChronopause() {
    _chronopause_counter = 0;
    _chronopause = new timing.Timer(100);
    _chronopause.onTick = function(){
      _chronopause_counter++;
    };
    _chronopause.start();
  }

});

},
'pdf/pdf_report':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

pdf_report
* using EasyPDF class *
*/

define(['pdf/EasyPDF', 'engine/Player'], function(EasyPDF, Player) {

  return {
    print: function (rapport) {

      EasyPDF({
        name: "rapport_erreur",
        unit: "pt", // only pt supported with autoTable (not mm or in)
        fontcolor: "#242415",
        fontsize: 12,
        orientation: "p",
        content: function() {
          
          var self = this;
          var page_counter = 0;
          
          var rows = [];
          
          var columns = [
            {title: "Propriété", dataKey: "col1"},
            {title: "Valeur", dataKey: "col2"}
          ];
          
          var line1 = {};
          var line2 = {};
          var line3 = {};
          var line4 = {};
          var line5 = {};
          var line6 = {};
          
          line1["col1"] = "Message";
          line1["col2"] = rapport.message;
          
          line2["col1"] = "Source";
          line2["col2"] = rapport.source;
          
          line3["col1"] = "N° ligne";
          line3["col2"] = rapport.noligne;
          
          line4["col1"] = "N° colonne";
          line4["col2"] = rapport.nocolonne;
          
          line5["col1"] = "Erreur";
          line5["col2"] = rapport.erreur;
          
          line6["col1"] = "Bookmark";
          line6["col2"] = rapport.bookmark;
          
          rows.push(line1);
          rows.push(line2);
          rows.push(line3);
          rows.push(line4);
          rows.push(line5);
          rows.push(line6);
          
          // AUTOTABLE
          this.autoTable(columns, rows, {
            // Styling
            theme: 'grid', // 'striped', 'grid' or 'plain'
            styles: {
              cellPadding: 5,
              fontSize: 10,
              font: "helvetica", // helvetica, times, courier
              lineColor: [50,50,50],
              lineWidth: 0.1,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
              textColor: [50,50,50],
              halign: 'left', // left, center, right
              valign: 'top', // top, middle, bottom
              fillStyle: 'S', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
              columnWidth: 'auto' // 'auto', 'wrap' or a number
            },
            headerStyles: {
              fillColor: [191, 191, 191],
              fillStyle: "DF",
              halign: 'center'
            },
            // Properties
            startY: false, // false (indicates margin top value) or a number
            pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            tableWidth: 'auto', // 'auto', 'wrap' or a number, 
            margin: {
              top: 126
            },
            beforePageContent: function(data) {
              self.text("Rapport d'erreur", 562, 32, {fontsize:18, align:"right", fontstyle:"bold", fontcolor:"#000"});
              moment.locale("fr");
              self.text("le "+moment().format('LL'), 562, 50, {fontsize:14, align:"right", fontstyle:"normal", fontcolor:"#000"});
              page_counter++;
              self.text(page_counter.toString(), 297,839, {fontsize:10, align:"center"});
            }
          });

        }
      });
    }
  };
});

},
'util/UniqueTimerForMascotte':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

  var _self;
  var _timer = new timing.Timer();
  var _isTimer;
  var _is_paused;
  var _is_type;
  var _chronopause;
  var _chronopause_counter;
  var _delay;
  var _fn;
  var _callback;

  return {
    init : function (fn, delay) {
      _self = this;
      _is_type = "init";
      launchChronopause();
      _is_paused = false;
      _delay = delay;
      _fn = fn;
      if (!_isTimer) {
        _timer = new timing.Timer(delay);
        _timer.onTick = fn;
        _timer.start();
        _isTimer = true;
      } else {
        // console.log("*WARNING* UniqueTimer conflict");// debug mode
      }
    },
    stop : function () {
      _timer.stop();
      _isTimer = false;
    },
    setInterval : function (val) {
      _timer.setInterval(val);
      _delay = val;
    },
    wait : function (delay, callback) {
      _self = this;
      _delay = delay;
      _is_type = "wait";
      launchChronopause();
      _is_paused = false;
      _callback = callback;
      function after_wait() {
        _timer.stop();
        _isTimer = false;
        callback();
      }
      _timer = new timing.Timer(delay);
      _timer.onTick = after_wait;
      _timer.start();
      _isTimer = true;
    },
    pause : function () {
      if (_isTimer) {
        _timer.stop();
        _chronopause.stop();
        _is_paused = true;
      }
    },
    resume : function() {
      if (_isTimer) {
        switch (_is_type) {
          case "init" : 
            _isTimer = false;
            _self.init(_fn, _delay);
            break;
          
          case "wait" :
            var new_delay = _delay - _chronopause_counter * 10;
            _self.wait (new_delay, _callback);
            break;
        }
      }
    }
  };
  
  function launchChronopause() {
    _chronopause_counter = 0;
    _chronopause = new timing.Timer(100);
    _chronopause.onTick = function(){
      _chronopause_counter++;
    };
    _chronopause.start();
  }

});

},
'animator/QuizDragDropOneByOne':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QUIZ DRAG / DROP *ONE BY ONE*
author: JCK

Needs following clips on stage:
- mc_drag_1, mc_drag_2, etc.
- mc_drop_1, mc_drop_2, etc.
- bt_submit

QuizDragDropOneByOne.init(s, 4, 2, [[2],[0],[0],[1]], fbRight, fbWrong, {instanceDragNames:"mc_drag_val4_", instanceDropNames:"mc_drop_val4_"});
--> return array of answers (starting at #1)

Options:
- instanceDragNames
- instanceDropNames
- autoCorrect
- maskDrops
- callback

 */

define(["animator/Collisions", "util/OptionGetter", "animator/Tween"], function (Collisions, OptionGetter, Tween) {

  var _s;
  var _nb_drags;
  var _nb_drops;
  var _answersAr;
  var _feedbacksRight;
  var _feedbackWrong;

  var _tweenSpeed = 200;
  var _tweenSpeedFeedback = 500;
  var _defaultInstanceDragNames = "mc_drag_";
  var _defaultInstanceDropNames = "mc_drop_";

  var _instanceDragNames;
  var _instanceDropNames;
  var _autoCorrect;
  var _maskDrops;
  var _callback;

  var _playerAnswersAr;
  var _returnedAnswers;
  var _isDetractor;
  var _isEnded;
  var _minToFinish;
  var _isFeedbackCalled;
  var _dragPosition = new Object();
  var _dragCounter;

  return {
    init : function (stage, nb_drags, nb_drops, answersAr, feedbackRight, feedbackWrong, options) {
      _s = stage;
      _nb_drags = nb_drags;
      _nb_drops = nb_drops;
      _answersAr = answersAr;
      _feedbackRight = feedbackRight;
      _feedbackWrong = feedbackWrong;

      _instanceDragNames = OptionGetter.get(options, "instanceDragNames", _defaultInstanceDragNames);
      _instanceDropNames = OptionGetter.get(options, "instanceDropNames", _defaultInstanceDropNames);

      _autoCorrect = OptionGetter.get(options, "autoCorrect", true);
      _maskDrops = OptionGetter.get(options, "maskDrops", false);
      _callback = OptionGetter.get(options, "callback", false);
      
      _responsive_ref = OptionGetter.get(options, "responsiveRef", _s);
      
      _isFeedbackCalled = false;
      
      if (_nb_drags <= _nb_drops) {
        _minToFinish = _nb_drags;
      } else {
        _minToFinish = _nb_drops;
      }

      construct();
    },

    getAnswers: function() {
      return _returnedAnswers;
    },
    
    getStringOfAnswers: function(separator) {
      return _playerAnswersAr.join(separator);
    },
    
    correct: function() {
      _autoCorrect = true;
      checkWin();
    }
  };

  function construct() {

    _playerAnswersAr = [];
    _isEnded = false;

    _isDetractor = false;
    for (i = 0; i < _nb_drags; i++) {
      if (_answersAr[i][0] == 0) {
        _isDetractor = true;
      }
    }

    //_s.bt_submit.visible = _isDetractor;
    _s.bt_submit.visible = false;

    for (var i = 1; i <= _nb_drags; i++) {

      var mc = _s[_instanceDragNames + i];
      mc.gotoAndStop(1);
      mc.mouseEnabled = true;
      mc.iswrong = false;
      mc.visible = false;

      if (mc.oldx == undefined) {
        mc.oldx = mc.x;
      } else {
        mc.x = mc.oldx;
      }
      if (mc.oldy == undefined) {
        mc.oldy = mc.y;
      } else {
        mc.y = mc.oldy;
      }
      mc.n = i;
      _playerAnswersAr[i - 1] = 0;

      var delta_x;
      var delta_y;
      var target;
      mc.addEventListener("mousedown", function (e) {
        target = e.currentTarget;
        delta_x = (stage.mouseX/_responsive_ref.scaleX - target.x - _responsive_ref.x);
        delta_y = (stage.mouseY/_responsive_ref.scaleY - target.y - _responsive_ref.y);
        _s.setChildIndex(target, _s.getNumChildren() - 1);
      });

      mc.addEventListener("pressmove", function (e) {
        target.x = (stage.mouseX/_responsive_ref.scaleX - delta_x - _responsive_ref.x);
        target.y = (stage.mouseY/_responsive_ref.scaleY - delta_y - _responsive_ref.y);
      });
      mc.cursor = "pointer";

      mc.addEventListener("pressup", function (e) {

        _playerAnswersAr[(e.currentTarget.n) - 1] = 0;
        for (var i = 1; i <= _nb_drops; i++) {
          if (isBoxFree(i)) {
            if (Collisions.check(e.currentTarget, _s[_instanceDropNames + i])) {
              goTween(e.currentTarget, _s[_instanceDropNames + i].x, _s[_instanceDropNames + i].y, _tweenSpeed);
              _playerAnswersAr[(e.currentTarget.n) - 1] = i;
              // lock current and show next drag
              // e.currentTarget.cursor = "initial";
              // e.currentTarget.removeAllEventListeners();
              _dragCounter++;
              if (_dragCounter <= _nb_drags) {
                _s[_instanceDragNames + _dragCounter].x = _dragPosition.x;
                _s[_instanceDragNames + _dragCounter].y = _dragPosition.y;
                Tween.init(_s[_instanceDragNames + _dragCounter], {duration:150});
              }
              break;
            }
          }
        }

        if (_playerAnswersAr[(e.currentTarget.n) - 1] == 0) {
          goTween(e.currentTarget, _dragPosition.x, _dragPosition.y, _tweenSpeed);
        }
        _s.bt_submit.visible = isCompleted();
        
        if (_maskDrops) {
          for (i = 1; i <= _nb_drops; i++) {
            _s[_instanceDropNames + i].visible = isBoxFree(i);
          }
        }
        
      });
    }
    // show only 1st one:
    _dragPosition.x = _s[_instanceDragNames + "1"].x;
    _dragPosition.y = _s[_instanceDragNames + "1"].y;
    _s[_instanceDragNames + "1"].visible = true;
    _dragCounter = 1;
    //

    for (i = 1; i <= _nb_drops; i++) {
      var mc = _s[_instanceDropNames + i];
      mc.isnofree = false;
      mc.iscorrected = false;
    }

    _s.bt_submit.addEventListener("click", function (e) {
      e.currentTarget.visible = false;
      e.currentTarget.removeAllEventListeners();
      checkWin();
    });
  }

  function goTween(mc, end_x, end_y, speed) {
    mc.mouseEnabled = false;
    endTween = function () {
      if (!_isEnded) {
        mc.mouseEnabled = true;
      }
    }
    createjs.Tween.get(mc).to({
      x : end_x,
      y : end_y
    }, speed).call(endTween);
  }

  function isBoxFree(boxnumber) {
    var is_box_free;
    if (_s[_instanceDropNames + boxnumber].isnofree) {
      is_box_free = false;
    } else {
      is_box_free = true;
      for (var i = 0; i < _nb_drags; i++) {
        if (_playerAnswersAr[i] == boxnumber) {
          is_box_free = false;
        }
      }
    }
    return is_box_free;
  }

  function isCompleted() {
    var nb_placed = 0;
    for (var i = 0; i < _nb_drags; i++) {
      if (_playerAnswersAr[i] != 0) {
        nb_placed++;
      }
    }
    if (nb_placed >= _minToFinish) {
      return true;
    } else {
      return false;
    }
  }

  function checkWin() {

    _isEnded = true;

    _returnedAnswers = [];

    var isWin = true;
    for (var i = 0; i < _nb_drags; i++) {

      var iwin = false;

      _s[_instanceDragNames + (i+1)].mouseEnabled = false;

      var should_not_be_placed = false;
      for (var j = 0; j < _answersAr[i].length; j++) {

        if (_playerAnswersAr[i] == _answersAr[i][j]) {
          iwin = true;
        }
        if (_answersAr[i][j] == 0) {
          should_not_be_placed = true;
        }
      }

      if (!iwin) {
        if (_s[_instanceDropNames + _playerAnswersAr[i]] != undefined) {
          _s[_instanceDropNames + _playerAnswersAr[i]].iswrong = true;
        }
        _s[_instanceDragNames + (i + 1)].iswrong = true;
        isWin = false;
        if (_playerAnswersAr[i] != 0) {
          if (_autoCorrect) {
            _s[_instanceDragNames + (i + 1)].gotoAndStop("wrong");
          }
        }
        _returnedAnswers[i+1] = false;
      } else {
        if (!should_not_be_placed) {
          if (_autoCorrect) {
            _s[_instanceDragNames + (i + 1)].gotoAndStop("right");
          }
          _returnedAnswers[i+1] = true;
        }
      }
    }

    //feedbacks
    
    if (_callback) {
      _callback();
    }
    
    if (!_isFeedbackCalled) {
      _isFeedbackCalled = true;
      if (isWin) {
        _feedbackRight();
      } else {
        _feedbackWrong();
      }
    }

    if (_autoCorrect) {
      // replace elements
      for (i = 0; i < _nb_drags; i++) {
        var iwr = false;
        if (_s[_instanceDropNames + _playerAnswersAr[i]] != undefined) {
          if (_s[_instanceDropNames + _playerAnswersAr[i]].iswrong) {
            iwr = true;
          }
        }

        if (iwr || (_s[_instanceDragNames + (i + 1)].iswrong)) {
          if (_answersAr[i][0] != 0) {
            var isplaced = false;
            for (j = 0; j < _answersAr[i].length; j++) {
              if (!isplaced) {
                if (isBoxFree(_answersAr[i][j])) {
                  isplaced = _answersAr[i][j];
                  _s[_instanceDropNames + _answersAr[i][j]].isnofree = true;
                } else {
                  if (_s[_instanceDropNames + _answersAr[i][j]].iswrong) {
                    if (!_s[_instanceDropNames + _answersAr[i][j]].iscorrected) {
                      isplaced = _answersAr[i][j];
                      _s[_instanceDropNames + _answersAr[i][j]].iscorrected = true;
                    }
                  }
                }
              }
            }
            if (isplaced) {
              goTween(_s[_instanceDragNames + (i + 1)], _s[_instanceDropNames + isplaced].x, _s[_instanceDropNames + isplaced].y, _tweenSpeedFeedback);
            }
          } else {
            goTween(_s[_instanceDragNames + (i + 1)], _s[_instanceDragNames + (i + 1)].oldx, _s[_instanceDragNames + (i + 1)].oldy, _tweenSpeedFeedback);
          }
        }
        _s[_instanceDragNames + (i + 1)].removeAllEventListeners();
      }
    }
  }
});

},
'engine/SlideIntro':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

SlideIntro
author: JCK

*/

define(['engine/Player',
    'animator/ResponsiveStage',
    'animator/Tween',
    'util/Sequencer',
    'animator/MaskObjects',
    'util/UniqueTimer',
    'animator/Button',
    'animator/Voice',
    'animator/StorePosition',
    'animator/Mascotte',
    'animator/SoundJS',
    'util/JsonHandler',
    'util/LinesBreaker',
    'animator/VerticalTextCenterer',
    'util/ModalDialog',
    'util/UniqueTimerForElements'
  ], function (
    Player,
    ResponsiveStage,
    Tween,
    Sequencer,
    MaskObjects,
    UniqueTimer,
    Button,
    Voice,
    StorePosition,
    Mascotte,
    SoundJS,
    JsonHandler,
    LinesBreaker,
    VerticalTextCenterer,
    ModalDialog,
    UniqueTimerForElements) {

  var _screen = "intro";

  return {
    init: function () {
      
      s.aide.visible = false;
      
      shortcut.add("Right",function() {
        shortcut.remove("Right");
        Player.goNext();
      });
    
      // init screen
      s.nav.visible = false;
      s.gotoAndStop(_screen);
      MaskObjects.init(s[_screen], ["logoclient", "logoediversite", "bandeau", "presente", "titremodule", "signature", "personnalisable"]);
      if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
        s[_screen]["personnalisable"].visible = true;
      }
      
      ResponsiveStage.storeClip(_screen, {horizontal:"fixed", vertical:"fixed"});
      
      s[_screen]["version"].text = JsonHandler.get("CONFIG", "version");
      
      // launch sequence
      SoundJS.init("assets/sounds/fx/jingle.mp3", function() {
        Sequencer.launch([
          function(next) {
            Tween.init(s[_screen]["logoclient"], {duration:1000});
            if (JsonHandler.get("CONFIG", "version").substr(JsonHandler.get("CONFIG", "version").length - 4).toLowerCase() == "demo"){
              Tween.init(s[_screen]["bandeau"], {from:"top", distance:100, duration:1000, fade:false});
            }
          },
          function(next) {
            Tween.init(s[_screen]["presente"]);
            // Tween.init(s[_screen]["logoediversite"], {duration:1000});
          },
          // function(next) {
            // Tween.init(s[_screen]["logoediversite"], {duration:1000, fadeout:true});
          // },
          function(next) {
            s[_screen]["titremodule"].champ.text = JsonHandler.get("CONFIG", "titre");
            LinesBreaker.init(s[_screen]["titremodule"].champ, {equal:true});
            VerticalTextCenterer.init(s[_screen]["titremodule"].champ, 282, "middle");
            Tween.init(s[_screen]["titremodule"], {duration:1500, fade:true});
          },
          function(next) {
            if (isNaN(JsonHandler.get("CONFIG", "version").substr(-1))){
              Tween.init(s[_screen]["signature"], {duration:1500, fade:true});
            }
          }
        ], {cuepoints:[0,1500,2000,2500]});
      }, function(){
        showAide();
      });
      
      
      // aide
      function showAide(){
        
        shortcut.remove("Right");
        
        if (JsonHandler.get("CONFIG", "aide") == "yes"){
          if (Player.getSuspend("aide_vue") != "1"){
            
            Player.setSuspend("aide_vue", "1");
            
            if (!s.aide.visible){

              s.aide.visible = true;
              MaskObjects.init(s.aide, ["bt_previous", "bt_menu_off", "progression", "textes"]);
              s[_screen]["version"].visible = false;
              
              Tween.init(s.aide.marcillac, {from:"left", distance:1000, duration:1000, fade:false});
              Tween.init(s.aide.ombre, {from:"left", distance:1000, duration:1000, fade:false, callback:
                function(){
                  Mascotte.play(s.aide.marcillac, "aide_01", {forceLoad:true, text:__gtexts[__lang].aide_voix_01},
                    function(){
                      s.nav.titre.text = __gtexts[__lang].aide;
                      VerticalTextCenterer.init(s.nav.titre, 85, "middle");
                      s.nav.progression.visible = false;
                      
                      MaskObjects.unmask(s.aide, ["bt_previous", "bt_menu_off", "progression"]);
                      s.nav.visible = true;
                      
                      Tween.init(s.aide.textes, {noInit:true, callback:
                        function(){
                          UniqueTimerForElements.wait(1200, function(){
                            Mascotte.play(s.aide.marcillac, "aide_02", {forceLoad:true, text:__gtexts[__lang].aide_voix_02}, Player.waitClickNext());
                          });
                        }
                      });
                    }
                  );
                }
              });

            }
          } else {
            Player.goNext();
          }
        } else if (JsonHandler.get("CONFIG", "aide") == "silent"){
          if (Player.getSuspend("aide_vue") != "1"){
            
            Player.setSuspend("aide_vue", "1");
            
            if (!s.aide.visible){

              s.aide.visible = true;
              MaskObjects.init(s.aide, ["bt_previous", "bt_menu_off", "progression", "textes"]);
              s[_screen]["version"].visible = false;
              
              
              s.nav.titre.text = __gtexts[__lang].aide;
              VerticalTextCenterer.init(s.nav.titre, 85, "middle");
              s.nav.progression.visible = false;
              
              MaskObjects.unmask(s.aide, ["bt_previous", "bt_menu_off", "progression"]);
              s.nav.visible = true;
              
              Tween.init(s.aide.textes, {noInit:true});
              
              Tween.init(s.aide.marcillac, {from:"left", distance:1000, duration:1000, fade:false});
              Tween.init(s.aide.ombre, {from:"left", distance:1000, duration:1000, fade:false});
              
              Player.waitClickNext();
            }
          } else {
            Player.goNext();
          }
        } else {
          Player.goNext();
        }
      }
      
    }
  };
});

},
'dojo/store/util/QueryResults':function(){
define(["../../_base/array", "../../_base/lang", "../../when"
], function(array, lang, when){

// module:
//		dojo/store/util/QueryResults

var QueryResults = function(results){
	// summary:
	//		A function that wraps the results of a store query with additional
	//		methods.
	// description:
	//		QueryResults is a basic wrapper that allows for array-like iteration
	//		over any kind of returned data from a query.  While the simplest store
	//		will return a plain array of data, other stores may return deferreds or
	//		promises; this wrapper makes sure that *all* results can be treated
	//		the same.
	//
	//		Additional methods include `forEach`, `filter` and `map`.
	// results: Array|dojo/promise/Promise
	//		The result set as an array, or a promise for an array.
	// returns:
	//		An array-like object that can be used for iterating over.
	// example:
	//		Query a store and iterate over the results.
	//
	//	|	store.query({ prime: true }).forEach(function(item){
	//	|		//	do something
	//	|	});

	if(!results){
		return results;
	}

	var isPromise = !!results.then;
	// if it is a promise it may be frozen
	if(isPromise){
		results = lang.delegate(results);
	}
	function addIterativeMethod(method){
		// Always add the iterative methods so a QueryResults is
		// returned whether the environment is ES3 or ES5
		results[method] = function(){
			var args = arguments;
			var result = when(results, function(results){
				Array.prototype.unshift.call(args, results);
				return QueryResults(array[method].apply(array, args));
			});
			// forEach should only return the result of when()
			// when we're wrapping a promise
			if(method !== "forEach" || isPromise){
				return result;
			}
		};
	}

	addIterativeMethod("forEach");
	addIterativeMethod("filter");
	addIterativeMethod("map");
	if(results.total == null){
		results.total = when(results, function(results){
			return results.length;
		});
	}
	return results; // Object
};

lang.setObject("dojo.store.util.QueryResults", QueryResults);

return QueryResults;

});

},
'util/CanvasTransition':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Canvas Transition (to change slides)
author: JCK

*/

define(["dojo/dom", "dojo/dom-construct", "dojo/_base/fx"], function(dom, domConstruct, fx) {
  
  var _is_transition;

  return {
    init: function (callback, type) {
      
      _is_transition = true;
    
      if (type == undefined) {
        type = 'fade';
      }

      switch(type) {

        case "fade":
          fx.fadeOut({node:'canvas', duration:500, onEnd:function(){
            _is_transition = false;
            if (callback != undefined) {
              callback();
              fx.fadeIn({node:'canvas', duration:500}).play();
            } else {
              domConstruct.destroy("canvas");
            }
          }}).play();
          break;
          
        case "fadeout":
          // fx.fadeOut({node:'canvas', duration:500, onEnd:function(){
            // _is_transition = false;
            // if (callback != undefined) {
              // callback();
            // }
          // }}).play();
          break;
          
        case "fadein":
          // fx.fadeIn({node:'canvas', duration:500, onEnd:function(){
            // _is_transition = false;
            // if (callback != undefined) {
              // callback();
            // }
          // }}).play();
          $("#canvas").css("opacity", 1);
          break;

      }
    },
    
    isInTrans: function() {
      return _is_transition;
    }
  };
});

},
'animator/Collisions':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Collisions of Animate movieclips
author: JCK

*/

define(function() {

  return {
    check: function (mc1, mc2) {
    
      m1w = mc1.nominalBounds.width;
      m1h = mc1.nominalBounds.height;
      m1x = mc1.x - m1w/2;
      m1y = mc1.y - m1h/2;
      
      m2w = mc2.nominalBounds.width;
      m2h = mc2.nominalBounds.height;
      m2x = mc2.x - m2w/2;
      m2y = mc2.y - m2h/2;
      
      if (  m1x >= m2x + m2w
        ||  m1x + m1w <= m2x
        ||  m1y >= m2y + m2h
        ||  m1y + m1h <= m2y) {
        return false;
      } else {
        return true;
      }
    }
  };
});

},
'animator/ContenuBuilder':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Contenu Builder
Build Dynamic Content Pages from JSON

author: JCK

*/

define([
  "util/JsonHandler",
  "animator/ResponsiveStage",
  "animator/WaitNextTick",
  "animator/Button",
  "animator/ScrollPane",
  "animator/Tween",
  "animator/LoadImage",
  "util/LinesBreaker",
  "util/OptionGetter",
  "animator/Mascotte",
  "engine/ChapitrePlayer",
  "engine/Player",
  "util/UniqueTimer",
  "util/CanvasTransition",
  "animator/SoundJS"
  ], function(
  JsonHandler,
  ResponsiveStage,
  WaitNextTick,
  Button,
  ScrollPane,
  Tween,
  LoadImage,
  LinesBreaker,
  OptionGetter,
  Mascotte,
  ChapitrePlayer,
  Player,
  UniqueTimer,
  CanvasTransition,
  SoundJS
) {
  
  var contenu;

  return {
    init: function(s, json, options, callback){
      
      s.visible = false;
      
      s.gotoAndStop("CONTENU");
      
      var _screen = s.CONTENU;
      
      _screen.perso.visible = false;
      
      var _perso = OptionGetter.get(options, "perso", false);
      var _persotalk = OptionGetter.get(options, "persotalk", false);
      
      var _hassounds = false;
      
      _screen.scrollbounds.visible = false;
      _screen.bt_continue.visible = false;
      if (_screen.personnalisable != undefined) {
        _screen.personnalisable.visible = false;
      }
      _screen.image.removeAllChildren();
      
      if (contenu){
        _screen.removeChild(contenu);
      }
      
      WaitNextTick.init(function(){
        ResponsiveStage.storeClip("CONTENU", {horizontal:"fixed", vertical:"fixed"});
          
        if (_perso){
          _screen.perso.gotoAndStop(_perso);
          _screen.perso[_perso].gotoAndStop(0);
          _screen.perso.visible = true;
        }
        if (!OptionGetter.get(options, "prologue", false)){
          _screen.prologue_bg_zoom.visible = false;
        } else {
          _screen.prologue_bg_zoom.visible = true;
        }
        
        s.visible = true;
        // canvas.style.opacity = '0';
        
      });
      
      var height_pointer = 20;
      
      JsonHandler.loadExcel(json, build);
      
      function build(){
        
        // CanvasTransition.init(null, "fadein");
        
        var lines = [];
        
        contenu = ScrollPane.init(_screen, "CONTENU_content", "scrollbounds", {
          scroll_bar_size:30,
          orientation:"vertical",
          constructor:function(content){
            
            var counter = 0;
            var media_type_previous_lines;
            var media_url_previous_lines;
            
            var image;
            var image_offset;
            var image_dimensions = {};
            var image_height_start;
            var offseted_lines = [];
            var image_loading;
            var media_type;
            
            var images_to_add = [];
            
            launchBuilder();
            
            function launchBuilder(){

              if (!JsonHandler.getLine(json, counter)){
                finishBuild();
              } else {
                
                var linetexte_full = JsonHandler.getLine(json, counter).texte;
                if (linetexte_full == undefined){
                  linetexte_full = "";
                }
                
                if (linetexte_full == "espace"){
                  
                  if (media_type_previous_lines == "left"){
                    validLeftImage();
                  }
                  
                  height_pointer += 40;
                  counter++;
                  launchBuilder();
                  
                } else {
                  linetexte_full = linetexte_full.replace("\t", "");
                  
                  var linetexte;
                  var type;
                  
                  if (linetexte_full.substr(0,1) == "-"){
                    linetexte = linetexte_full.substr(1);
                    type = "CONTENU_bullet";
                  } else if (linetexte_full.substr(0,6).toLowerCase() == "titre:"){
                    linetexte = linetexte_full.substr(6);
                    type = "CONTENU_titre";
                  } else if (linetexte_full.substr(0,5).toLowerCase() == "gras:"){
                    linetexte = linetexte_full.substr(5);
                    type = "CONTENU_gras";
                  } else if (linetexte_full.substr(0,6).toLowerCase() == "small:"){
                    linetexte = linetexte_full.substr(6);
                    type = "CONTENU_small";
                  } else {
                    linetexte = linetexte_full;
                    type = "CONTENU_paragraphe";
                  }
                  linetexte = linetexte.trim();
                  
                  var mc = new lib[type]();

                  media_type = false;
                  var image_url;
                  
                  
                  if (JsonHandler.getLine(json, counter).medias){
                    if (JsonHandler.getLine(json, counter).medias.substr(0,4).toLowerCase() == "img:"){
                      
                      image_url = "assets/images/medias/"+JsonHandler.getLine(json, counter).medias.substr(4).trim();
                      
                      if (linetexte != ""){
                        media_type = "left";
                      } else {
                        media_type = "singleimg";
                      }
                    } else if (JsonHandler.getLine(json, counter).medias.substr(0,8).toLowerCase() == "imgline:"){
                      
                      image_url = "assets/images/medias/"+JsonHandler.getLine(json, counter).medias.substr(8).trim();
                      media_type = "leftline";
                      
                    } else if (JsonHandler.getLine(json, counter).medias.substr(0,10).toLowerCase() == "imgcorner:"){
                      image_url = "assets/images/medias/"+JsonHandler.getLine(json, counter).medias.substr(10).trim();
                      LoadImage.init(_screen.image, image_url, function(w,h){
                        _screen.image.x = 1920-35-w;
                      });
                    } else if (JsonHandler.getLine(json, counter).medias.substr(0,4).toLowerCase() == "son:"){
                      _hassounds = true;
                    }
                  }
                  
                  if (media_type == "left"){
                    if (image_url != media_url_previous_lines){
                      if (media_type_previous_lines == "left"){
                        validLeftImage();
                      }
                      image_height_start = height_pointer;
                      LoadImage.init(mc, image_url,
                        function(w,h,img){
                          image = img;
                          image_dimensions.w = w;
                          image_dimensions.h = h;
                          image_offset = w+20;
                          addTextLine();
                        },
                        {position:[125,0]}
                      );

                    } else {
                      addTextLine();
                    }
                    media_type_previous_lines = media_type;
                    media_url_previous_lines = image_url;
                    
                  } else if (media_type == "singleimg"){
                    if (image_url != media_url_previous_lines){
                      if (media_type_previous_lines == "left"){
                        validLeftImage();
                      }
                      LoadImage.init(mc, image_url,
                        function(w,h,img){
                          var scale = 1;
                          if (w > 1420){
                            scale = 1420 / w;
                            if (__gm == "dev"){
                              console.log("Image has a width larger than 1420px, thus it has been scaled to "+Math.round(scale*100)+"%");
                            }
                          }
                          addTextLine(h * scale);
                        },
                        {position:[125,0]}
                      );

                    } else {
                      addTextLine();
                    }
                    media_type_previous_lines = media_type;
                    media_url_previous_lines = image_url;
                    
                  } else if (media_type == "leftline"){
                    
                    var img_size = 50;
                    if (type == "CONTENU_small"){
                      img_size = 40;
                    }
                    
                    LoadImage.init(mc, image_url,
                      function(w,h,img){
                        image = img;
                        image_dimensions.w = w;
                        image_dimensions.h = h;
                        image_offset = w+10;
                        addTextLine();
                      },
                      {position:[125,0], resize:[img_size,img_size]}
                    );
                    media_type_previous_lines = false;
                    media_url_previous_lines = false;
                  } else {
                    if (media_type_previous_lines == "left"){
                      validLeftImage();
                    }
                    addTextLine();
                  }
                  
                }
                  
                function validLeftImage(){
                  if (image_dimensions.h > (height_pointer - image_height_start)){
                    var scale = (height_pointer - image_height_start - getSpaceAfter(type)) / image_dimensions.h;
                    image.scaleX = image.scaleY = scale;
                    reworkOffsets();
                  } else {
                    //todo : cas où image plus petite que la hauteur du texte
                  }
                  
                  offseted_lines = [];
                  image_offset = false;
                  media_type_previous_lines = false;
                  media_url_previous_lines = false;
                  
                }
                
                function reworkOffsets(){

                  var decalage = Math.round(image_dimensions.w * image.scaleX) - image_dimensions.w;
                  
                  if (__gm == "dev"){
                    console.log("Image resized from "+image_dimensions.w+"x"+image_dimensions.h+" to "+Math.round(image_dimensions.w * image.scaleX)+"x"+Math.round(image_dimensions.h * image.scaleX));
                  }
                  
                  for (var i=0; i<offseted_lines.length; i++){
                    offseted_lines[i].champ.x += decalage;
                    offseted_lines[i].champ.lineWidth -= decalage;
                  }
                  
                }
                
                
                
                function addTextLine(height_of_single_image){
                  
                  mc.champ.text = linetexte;
                  if (_perso){
                    mc.x += 300;
                  }
                  
                  
                  if (height_of_single_image) {
                    
                    mc.y = height_pointer;
                    height_pointer += height_of_single_image;
                    
                  } else {
                    if (image_offset){
                      mc.champ.x = 125+15+image_offset;
                      mc.champ.lineWidth = 1420-image_offset-15;
                      offseted_lines.push(mc);
                    }
                    
                    if (_perso){
                      mc.champ.lineWidth -= 400;
                    }

                    height_pointer += getSpaceAfter(type);
                    
                    switch (type){
                      case "CONTENU_titre":
                        LinesBreaker.init(mc.champ);
                        break;
                        
                      case "CONTENU_gras":
                        LinesBreaker.init(mc.champ);
                        break;
                        
                      case "CONTENU_bullet":
                        LinesBreaker.init(mc.champ);
                        break;
                    }
                    
                    mc.y = height_pointer;
                    height_pointer += mc.champ.getMeasuredHeight();
                  }
                  
                  content.addChild(mc);
                  lines.push(mc);
                  
                  counter++;
                  
                  if (media_type == "leftline"){
                    image_offset = 0;
                  }
                  
                  launchBuilder();
                }
                
              }
              
              function getSpaceAfter(type){
                switch (type){
                  case "CONTENU_titre":
                    return 30;
                    break;
                    
                  case "CONTENU_gras":
                    return 30;
                    break;
                    
                  case "CONTENU_bullet":
                    return 20;
                    break;
                    
                  case "CONTENU_small":
                    return 20;
                    break;
                    
                  default:
                    return 30;
                    break;
                }

              }
              

            }
            
            function finishBuild(){
              
              var bg = new createjs.Shape();
              
              bg.graphics.beginFill("#006666").drawRect(0, 0, _screen.scrollbounds.nominalBounds.width - 400, height_pointer);
              bg.alpha = 0.01;
              content.addChild(bg);
              content.setBounds(0,0,_screen.scrollbounds.nominalBounds.width, height_pointer);
              
              if (height_pointer < _screen.scrollbounds.getBounds().height){
                content.y = (_screen.scrollbounds.getBounds().height - height_pointer) / 2;
              } else {
                content.y = 0;
              }
              
              if (_hassounds){
                for (var i=0; i<counter; i++){
                  lines[i].visible = false;
                }
                
                counter = 0;
                
                launchLine();
                
                function launchLine(){
                  
                  if (JsonHandler.getLine(json, counter) != undefined){
                    if (JsonHandler.getLine(json, counter).medias != undefined){
                      if (JsonHandler.getLine(json, counter).medias.substr(0,4).toLowerCase() == "son:"){
                        
                        var son_url = "voice/"+JsonHandler.getLine(json, counter).medias.substr(4).trim()+".mp3";
                        var son = JsonHandler.getLine(json, counter).medias.substr(4).trim();
                        
                        if (Player.noVoice()){
                          son_url = "fx/debug.mp3";
                          son = "debug"
                        }
                        
                        if (!_perso){
                          var son_url = "assets/sounds/"+son+".mp3";
                          SoundJS.init(
                            son_url,
                            function(){
                              Tween.init(lines[counter]);
                            },
                            function(){
                              counter ++;
                              launchLine();
                            },
                            null,
                            true
                          );
                        } else {
                          Tween.init(lines[counter]);
                          
                          var fl = true;
                          if (Player.noVoice()){
                            fl = false;
                          }
                          Mascotte.play(_screen.perso[_perso], son, {text:"", forceLoad:fl}, function(){
                            UniqueTimer.wait(100, function(){
                              counter ++;
                              launchLine();
                            });
                          });
                        }
                      } else {
                        lines[counter].visible = true;
                        counter ++;
                        launchLine();
                      }
                    } else {
                      lines[counter].visible = true;
                      counter ++;
                      launchLine();
                    }
                  } else {
                    endContenu();
                  }
                  
                  
                }
                
              } else if (_persotalk){
                
                // if ((_persotalk == 1) || (_persotalk > counter)) {
                if (_persotalk != counter) {//**NEW** > may produce incorrect voice sync on previous builds contents
                  
                  var c = 0;
                  launchDial();
                  function launchDial(){
                    var line = ChapitrePlayer.getIndex() + 1;
                    
                    var o = {text:JsonHandler.getLine("STORY", line+c).deroule};
                    
                    if (Math.random() < 0.4){
                      o.start = "anim";
                    }
                    
                    Mascotte.play(_screen.perso[_perso], JsonHandler.getLine("STORY", line+c).son, o, function(){
                      UniqueTimer.wait(100, function(){
                        c++;
                        if (c == _persotalk){
                          endContenu();
                        } else {
                          launchDial();
                        }
                      });
                    });
                  }
                  
                } else {
                  
                  var i;
                  for (i=0; i<counter; i++){
                    lines[i].visible = false;
                  }
                  
                  if (_persotalk != counter){
                    for (i=0; i<= (counter - _persotalk); i++){
                      lines[i].visible = true;
                    }
                  } else {

                    i = 1;
                  }
                  
                  var c = 0;
                  launchDialSync();
                  function launchDialSync(){
                    Tween.init(lines[c+(i-1)]);
                    var line = ChapitrePlayer.getIndex() + 1;
                    Mascotte.play(_screen.perso[_perso], JsonHandler.getLine("STORY", line+c).son, {text:JsonHandler.getLine("STORY", line+c).deroule}, function(){
                      UniqueTimer.wait(100, function(){
                        c++;
                        if (c+(i-1) == counter){
                          endContenu();
                        } else {
                          launchDialSync();
                        }
                      });
                    });
                  }
                }
              } else {
                
                if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
                  _screen["personnalisable"].visible = true;
                }
                endContenu();
              }

            }
          }
        });
        
        function endContenu(){
          
          // _screen.setChildIndex(_screen.bt_continue, _screen.getNumChildren() - 1);

          Tween.init(_screen.bt_continue, {pop:true});
          Button.enableZoom(_screen.bt_continue, callback);
          
          if (_persotalk){
            ChapitrePlayer.incrementIndex(_persotalk);
          }
          
        }
      }
    }
  };
});

},
'util/UniqueTimerForTweens':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

  var _self;
  var _timer = new timing.Timer();
  var _isTimer;
  var _is_paused;
  var _is_type;
  var _chronopause;
  var _chronopause_counter;
  var _delay;
  var _fn;
  var _callback;

  return {
    init : function (fn, delay) {
      _self = this;
      _is_type = "init";
      launchChronopause();
      _is_paused = false;
      _delay = delay;
      _fn = fn;
      if (!_isTimer) {
        _timer = new timing.Timer(delay);
        _timer.onTick = fn;
        _timer.start();
        _isTimer = true;
      } else {
        // console.log("*WARNING* UniqueTimer conflict");// debug mode
      }
    },
    stop : function () {
      _timer.stop();
      _isTimer = false;
    },
    setInterval : function (val) {
      _timer.setInterval(val);
      _delay = val;
    },
    wait : function (delay, callback) {
      _self = this;
      _delay = delay;
      _is_type = "wait";
      launchChronopause();
      _is_paused = false;
      _callback = callback;
      function after_wait() {
        _timer.stop();
        _isTimer = false;
        callback();
      }
      _timer = new timing.Timer(delay);
      _timer.onTick = after_wait;
      _timer.start();
      _isTimer = true;
    },
    pause : function () {
      if (_isTimer) {
        _timer.stop();
        _chronopause.stop();
        _is_paused = true;
      }
    },
    resume : function() {
      if (_isTimer) {
        switch (_is_type) {
          case "init" : 
            _isTimer = false;
            _self.init(_fn, _delay);
            break;
          
          case "wait" :
            var new_delay = _delay - _chronopause_counter * 10;
            _self.wait (new_delay, _callback);
            break;
        }
      }
    }
  };
  
  function launchChronopause() {
    _chronopause_counter = 0;
    _chronopause = new timing.Timer(100);
    _chronopause.onTick = function(){
      _chronopause_counter++;
    };
    _chronopause.start();
  }

});

},
'animator/ClickPictosBuilder':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

ClickPictos Builder
Build Dynamic ClickPictos interactions from JSON

author: JCK

*/

define([
  "util/JsonHandler",
  "animator/ResponsiveStage",
  "animator/Button",
  "animator/LoadImage",
  "animator/Tween",
  "util/LinesBreaker",
  "animator/WaitNextTick",
  "animator/MaskObjects",
  "util/UniqueTimer",
  "util/CanvasTransition",
  "animator/SoundJS"
  ], function(
  JsonHandler,
  ResponsiveStage,
  Button,
  LoadImage,
  Tween,
  LinesBreaker,
  WaitNextTick,
  MaskObjects,
  UniqueTimer,
  CanvasTransition,
  SoundJS
) {
  
  var contenu;

  return {
    init: function(s, json, callback) {
      
      s.gotoAndStop("CLICKPICTOS");
      
      ResponsiveStage.storeClip("CLICKPICTOS", {horizontal:"fixed", vertical:"fixed"});
      var _screen = s.CLICKPICTOS;
      
      MaskObjects.init(_screen, ["titre", "textes", "bt_continue", "consigne", "picto1", "picto2", "picto3", "picto4", "picto5", "picto6", "picto7", "picto8", "fleche1", "fleche2", "fleche3", "fleche4", "fleche5", "fleche6", "fleche7", "fleche8", "personnalisable"]);
      if (JsonHandler.get("CONFIG", "logo_personnalisable").trim().toLowerCase() == "yes"){
        _screen["personnalisable"].visible = true;
      }
      
      
      var height_pointer = 70;
      var start = true;
      
      WaitNextTick.init(function(){
        JsonHandler.loadExcel(json, build);
      });
      
      function build(){
        
        _screen.titre.y = height_pointer;
        _screen.titre.text = JsonHandler.getLine(json, 0).texte.trim();
        
        LinesBreaker.init(_screen.titre);
        if (JsonHandler.getLine(json, 0).texte.trim() != ""){
          height_pointer += _screen.titre.getMeasuredHeight() + 10;
        }
        
        _screen.consigne.y = height_pointer;
        _screen.consigne.text = JsonHandler.getLine(json, 1).texte;
        height_pointer += _screen.consigne.getMeasuredHeight() + 60;
        
        for (var i=1; i<=8; i++){
          _screen["fleche"+i].y = height_pointer;
          _screen["fleche"+i].play();
          _screen["picto"+i].y = height_pointer;
          _screen["bt"+i].y = height_pointer;
          _screen["bt"+i].n = i;
          _screen["bt"+i].vu = false;
          
          _screen["fleche"+i].visible = _screen["picto"+i].visible = _screen["bt"+i].visible = false;
        }
        
        var counter = 1;
        var nb_elements;
        var current;
        var next_tweenout_direction;
        
        loadPicto();
        
        function loadPicto(){
          counter++;
          if (JsonHandler.getLine(json, counter) == undefined){
            s.visible = true;
            canvas.style.opacity = '0';
            CanvasTransition.init(null, "fadein");
            centerElements();
          } else {
            LoadImage.init(_screen["picto"+(counter-1)], "assets/images/medias/"+JsonHandler.getLine(json, counter).picto, loadPicto, {clear:true, resize:[150,150]});
            _screen["fleche"+(counter-1)].visible = _screen["picto"+(counter-1)].visible = _screen["bt"+(counter-1)].visible = true;
            _screen["picto"+(counter-1)].alpha = 1;
          }
        }
        
        
        function centerElements(){
          
          nb_elements = counter - 2;
          
          var offset_x = (1920 - nb_elements*150 - (nb_elements - 1)*75) / 2;
          
          for (var i=1; i<= nb_elements; i++){
            _screen["picto"+i].x = _screen["bt"+i].x = offset_x;
            _screen["fleche"+i].x = offset_x + 150;
            offset_x += 150+75
            
            //Tween.initGroup(_screen, ["picto"+i, "fleche"+i]);
            _screen["picto"+i].visible = true;
            _screen["fleche"+i].visible = true;
            
          }
          Tween.initGroup(_screen, ["titre", "consigne"]);
          addElementsBehaviour();
        }
        
        function addElementsBehaviour(){
          for (var i=1; i<=nb_elements; i++){
            Button.enable(_screen["bt"+i], function(e){
              
              e.currentTarget.vu = true;
              var n = e.currentTarget.n;
              
              if (current != n){
                
                current = n;
                
                _screen["fleche"+n].visible = false;
                for (var i=1; i<=nb_elements; i++){
                  _screen["picto"+i].alpha = 0.3
                }
                _screen["picto"+n].alpha = 1;
                
                if (start){
                  updateText();
                  Tween.init(_screen.textes, {from:"top", distance:20, duration:250, fade:true, noInit:true});
                  start = false;
                } else {
                  Tween.init(_screen.textes, {to:next_tweenout_direction, distance:600, duration:200, fadeout:true, noInit:true, callback:
                    function(){
                      updateText();
                      Tween.init(_screen.textes, {from:"top", distance:20, duration:250, fade:true, noInit:true});
                    }
                  });
                }
                
                var all_vus = true;
                for (var i=1; i<=nb_elements; i++){
                  if (!_screen["bt"+i].vu){
                    all_vus = false;
                  }
                }
                if ((all_vus)&&(!_screen.bt_continue.visible)){
                  Tween.init(_screen.bt_continue, {pop:true});
                  Button.enableZoom(_screen.bt_continue, callback);
                }
                
              }

              function updateText(){
                
                _screen.textes.x = _screen["bt"+n].x    
                _screen.textes.y = height_pointer+150+30;
                
                if (n <= nb_elements / 2 ){
                  next_tweenout_direction = "right";
                  _screen.textes.gotoAndStop("left");
                } else {
                  next_tweenout_direction = "left";
                  _screen.textes.gotoAndStop("right");
                }
                _screen.textes.titre.text = JsonHandler.getLine(json, n+1).titre;
                _screen.textes.texte.y = _screen.textes.titre.y + _screen.textes.titre.getMeasuredHeight()+10;
                _screen.textes.texte.text = JsonHandler.getLine(json, n+1).texte;
                
                _screen.textes.trait.scaleY = (10 + _screen.textes.titre.getMeasuredHeight() + _screen.textes.texte.getMeasuredHeight()) / 100;
                
                LinesBreaker.init(_screen.textes.titre);
                
                if (JsonHandler.getLine(json, n+1).son != undefined){
                  var son_url = "assets/sounds/voice/"+JsonHandler.getLine(json, n+1).son+".mp3";
                  SoundJS.init(son_url, null, null, null, true);
                }
                
                if (n > nb_elements / 2 ){
                  var w = Math.max(_screen.textes.titre.getBounds().width, _screen.textes.texte.getBounds().width);
                  _screen.textes.texte.x = (w - 130) * -1;
                  _screen.textes.titre.x = (w - 130) * -1;
                }

              }

            },null,null,{noDisable:true});
          }
        }
      }

    }
  };
});

},
'engine/Player':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

// STORY PLAYER ENGINE v4
// author: JCK
define(['util/ResponsiveScale', 'util/JsonHandler', 'animator/Tween', 'animator/Voice', 'util/CanvasTransition', 'util/ModalDialog', 'dojox/timing', 'dojo/dom', 'dojo/_base/fx', 'dojo/on', 'dojo/dom-style', 'dojox/timing', 'animator/RemoveEvents', 'util/UniqueTimer', 'util/Sequencer', 'util/UniqueTimerForVoice', 'animator/TimerClip', 'animator/ResponsiveStage', 'animator/Button', 'animator/SoundJS', 'animator/VerticalTextCenterer', 'animator/MaskObjects', 'animator/Mascotte', 'animator/SceneManager', 'engine/ChapitrePlayer', 'engine/SlideIntro', 'util/LinesBreaker', 'pdf/pdf_report', 'util/SoundJS_NoQueue', 'animator/Voice', 'animator/WaitClipEnd', 'exports', 'dojo/domReady!'], function(ResponsiveScale, JsonHandler, Tween, Voice, CanvasTransition, ModalDialog, timing,dom, fx, on, style, timing, RemoveEvents, UniqueTimer, Sequencer, UniqueTimerForVoice, TimerClip, ResponsiveStage, Button, SoundJS, VerticalTextCenterer, MaskObjects, Mascotte, SceneManager, ChapitrePlayer, SlideIntro, LinesBreaker, pdf_report, SoundJS_NoQueue, Voice, WaitClipEnd, exports) {

  var _slides = [];
  
  var _chapitres = [];
  var _contenus = [];

  var _self;

  var _currentSlideNumber = -1;
  var _scoreAr = [];

  var _isSubtitles = true;

  var _isBtNextFlashing = false;
  var _btNextFlashSpeed = 500;
  var _btNextFlashTimer;

  var _successScore;
  var _inactivityTime;
  var _suspendToSave = ["slides_vus", "aide_vue", "resultats"];
  var _isScorm;
  
  var _sessionStartTime;
  var _timeFormat;
  
  var _suspend = new Object();
  var _prevEnabled;
  var _replayEnabled;
  
  var _cookie_name = "animate_data ";
  
  var _isUnlocked;
  var _slidesUnlocked = [];
  
  var _isIe = undefined;
  var _isMobile = false;
  
  var _mediaElement;
  var _mediaElement_instance;
  var _mediaElement_play_event;
  var _mediaElement_end_event;
  
  var _no_voice;
  
  var _is_disconnected;
  
  var _excelStory;
  
  var _storyHasAnim = false;
  
  var _learnerName;
  
  exports.getExcelStory = function(){
    return _excelStory;
  }
  
  exports.getStoryHasAnim = function(){
    return _storyHasAnim;
  }
  
  exports.getLearnerName = function(){
    return _self.getLearnerName();
  }
  
  exports.getScore = function(){
    return _self.getScore();
  }
  
  exports.getSuspendArrayOfStrings = function(parameter, position) {
    return _self.getSuspendArrayOfStrings(parameter, position);
  }
  
  exports.isIe = function(){
    return _self.isIe();
  }
  
  exports.isMobile = function(){
    return _isMobile;
  }
  
  exports.waitClickNext = function(){
    return _self.waitClickNext();
  }
  
  exports.goNext = function(){
    return _self.goNext();
  }
  
  exports.getCurrentChapter = function(){
    var ret;
    if (_chapitres[_currentSlideNumber] == undefined){
      ret = _chapitres[0];
    } else {
      ret = _chapitres[_currentSlideNumber];
    }
    return ret;
  }
  
  exports.noVoice = function(){
    return _no_voice;
  }
  
  exports.recordScore = function(index, value){
    return _self.recordScore(index, value);
  }
  
  exports.scormFinish = function(){
    return _self.scormFinish();
  }
  
  exports.isScorm = function(){
    return _isScorm;
  }
  
  exports.unlockCurrent = function(){
    return _self.unlockCurrent();
  }
  
  exports.getSuspend = function(parameter){
    return _self.getSuspend(parameter);
  }
  
  exports.setSuspend = function(parameter, value){
    _self.setSuspend(parameter, value);
  }
  
  exports.scormRecordScore = function(){
    _self.scormRecordScore();
  }
  
  exports.getMediaInstance = function(){
    return _self.getMediaInstance();
  }
  
  exports.getMediaElementAddPlayEvent = function(cb){
    return _self.getMediaElementAddPlayEvent(cb);
  }
  
  exports.getMediaElementAddEndEvent = function(cb){
    return _self.getMediaElementAddEndEvent(cb);
  }
  
  //SR VERSION :
  var _counter = 1;
  var _screen;
  var _qcufinal_count = 0;
  var _qcufinal_right = 0;


  return {
    //SR VERSION:
    initSr: function () {
      
      if (location.search.split('e=')[1] != undefined){
        _counter = Number(location.search.split('e=')[1]);
      }
      
      //JsonHandler.load("assets/app/config.json", "config", loadStoryboard); todo
      
      $('#focusguard-2').on('focus', function () {
        $('#sr-title').focus();
      });
      $('#focusguard-1').on('focus', function () {
        $('#sr-btnext').focus();
      });
      $("#focusguard-next").focusout(function(){
        $("#focusguard-next").hide();
      });
    },
      
    init: function () {
      _self = this;

      createjs.Touch.enable(stage);

      stage.enableMouseOver(60);

      canvas.style.opacity = '0';
      canvas.style.display = 'inline-block';

      ResponsiveStage.init(s);

      s.mc_subtitles.visible = false;
      s.aide.visible = false;

      _self.initSuspend();

      _self.loadExternal();
    },
    
    initSuspend: function() {
      for (var i=0; i<_suspendToSave.length; i++) {
        _suspend[_suspendToSave[i]] = "";
      }
      _currentSlideNumber = -1;
      _scoreAr = [];
      _slidesUnlocked = [];
    },
    
    initCurrentSlideNumber: function() {
      _currentSlideNumber = -1;
    },
    

    loadExternal: function() {
      Sequencer.launch([
        function(next) {
          
          var url = "assets/data/" + __ExcelName;

          var req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.responseType = "arraybuffer";

          req.onreadystatechange  = function(e) {
            
            if (req.readyState == 4){
              if (req.status == 200){
                var data = new Uint8Array(req.response);
                var workbook = XLSX.read(data, {type:"array"});

                var sheets = workbook.SheetNames;
                var result = {};
                
                $("#sheet-list").empty();
                for (var i=0; i<sheets.length; i++){
                  $("#sheet-list").append("<li>"+sheets[i]+"</li>");
                  result[sheets[i]] = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[i]]);
                }
                
                _excelStory = result;
                next();

              } else {
                next();
              }
            }
          }
          
          req.send();
        },
        function(next) {
          $('#videoplayer').mediaelementplayer({
            success: function(mediaElement, originalNode, instance) {
              _mediaElement = mediaElement;
              _mediaElement_instance = instance;
              next();
            },
            stretching: 'responsive',
            setDimensions: false,
            showPosterWhenEnded: false
          });
        },
        function(next) {
          JsonHandler.loadExcel("CONFIG", next);
        },
        function(next) {
          JsonHandler.loadExcel("STORY", next);
        },
        function(next) {
          JsonHandler.load("assets/data/fx_list.json", "fx_list", next);
        },
        function(next) {
          // if (_self.isIe()) {
          //  _self.preLaunch();
          // } else {
          //  _self.preloadSounds();
          // }
          _self.preloadSounds();
        }
      ]);
    },
    
    preloadSounds: function() {
      
      var counter = 0;
      var son;
      getSoundNextLine();
      
      function getSoundNextLine(){  
        counter++;
        son = JsonHandler.getLine("STORY", counter).son;
        if (isValid(son)){
          if(!__disableAjax){
            $.ajax({
              url:'assets/sounds/voice/'+son+".mp3",
              type:'GET',
              error: function() {
                console.log("NO VOICE FILES DETECTED");
                _no_voice = true;
                _self.preloadFx(); 
              },
              success: preloadVoices
            });
          } else {
            preloadVoices();
          }
          function preloadVoices(){
            var manifest = [];
            var nb_sounds = 0;            
            var counter = 0;
            while(isValid(JsonHandler.getLine("STORY", counter))){
              var son = JsonHandler.getLine("STORY", counter).son;
              if (isValid(son)){
                var obj = new Object;
                obj.id = son;
                obj.src = "assets/sounds/voice/" + son+".mp3"
                manifest.push(obj);
                nb_sounds++;
              }
              counter++;
            }

            var queue = new createjs.LoadQueue(false, null, true);//new
            createjs.Sound.alternateExtensions = ["mp3"];
            queue.installPlugin(createjs.Sound);
            queue.on("fileload", updatePct)
            queue.on("complete", _self.preloadFx);
            queue.on("error", function(){
              _isIe = true;
            });
            queue.loadManifest(manifest);

            counter = 0
            function updatePct(){
              counter ++;
              var pct = Math.round(counter / manifest.length * 100);
              if (__imagesLoaded){
                document.getElementById("loader_text").innerHTML = __gtexts[__lang].loading3+" : "+pct+"%";
              }
            }
            /*
            createjs.Sound.on("fileload", handleFileLoad);
            createjs.Sound.registerSounds(manifest, "assets/sounds/voice/");
            counter = 0;
            function handleFileLoad(event) {
              counter++;
              if (counter == nb_sounds) {
                _self.preloadFx();
              }
            }
            */
          }
        } else {
          getSoundNextLine();
        }
      }
    },
    
    preloadFx: function() {
      var queue = new createjs.LoadQueue(false, null, true);//new
      var manifest = [];
      var nb_sounds = JsonHandler.getLength("fx_list");
      for (var i=1; i<=nb_sounds ; i++){
        var obj = new Object;
        obj.id = JsonHandler.get("fx_list", i);
        obj.src = "assets/sounds/fx/" + JsonHandler.get("fx_list", i)+".mp3";
        manifest.push(obj);
      }
      createjs.Sound.alternateExtensions = ["mp3"];
      queue.installPlugin(createjs.Sound);
      queue.on("complete", _self.preLaunch);
      queue.loadManifest(manifest);
      /*
      createjs.Sound.on("fileload", handleFileLoad);
      createjs.Sound.registerSounds(manifest, "assets/sounds/fx/");
      var counter = 0;
      function handleFileLoad(event) {
        counter++;
        if (counter == nb_sounds) {
          _self.preLaunch();
        }
      }
      */
    },
    
    preLaunch: function(){
      
      _cookie_name += JsonHandler.get("CONFIG", "titre");
      __lang = JsonHandler.get("CONFIG", "langue");
      
      $("#loader").hide();
      $("#animation_container").show();
      
      _self.loadScorm();
    },

    loadScorm: function() {
      
      // show nb entries (for visual loader)
      if (__gm == "dev") {
        console.log("nb elements chargés : "+performance.getEntries().length);
      }

      
      function loadSuspendData(suspend) {
        // get current slide index
        _currentSlideNumber = parseInt(suspend.split(";")[0]);
        // get scores
        _scoreAr = ((suspend.split(";")[1]).split(",")).slice();
        // get other suspend data
        var suspend_loaded = ((suspend.split(";")[2]).split(",")).slice();
        for (var i=0; i<suspend_loaded.length; i++) {
          _self.setSuspend(_suspendToSave[i], suspend_loaded[i]);
        }
        
        if (JsonHandler.get("CONFIG", "reprise_automatique").trim().toLowerCase() == "yes"){
          _self.launch();
        }
      }
      function launchBookmark() {
        if (_isScorm && pipwerks.SCORM.get("cmi.completion_status") == "completed") {
          _self.setSuspend("aide_vue", "1");
          _self.launch(true);
        } else {
          if (isValid(suspend)) {
            loadSuspendData(suspend);
            if (JsonHandler.get("CONFIG", "reprise_automatique").trim().toLowerCase() != "yes"){
              ModalDialog.ask(__gtexts[__lang].sr_reprise2, __gtexts[__lang].non, __gtexts[__lang].oui, function(){
                _self.initSuspend();
                _self.launch();
              },
              function() {
                _self.launch();
              });
            } else {
              console.log("- autoload bookmark -");
            }
          } else {
            _self.launch();
          }
        }          
      }
      if (__gm == "lms") {
        //SCORM
        if (pipwerks.SCORM.init()) {
          _isScorm = true;
          _sessionStartTime = new Date();
          if (__scorm == "1.2") {
            pipwerks.SCORM.set("cmi.core.exit", "suspend");
          } else {
            pipwerks.SCORM.set("cmi.exit", "suspend");
          }
          pipwerks.SCORM.save();

          var suspend = pipwerks.SCORM.get("cmi.suspend_data");
          
          launchBookmark();

        } else {
          _isScorm = false;
          ModalDialog.action(__gtexts[__lang].nolms, __gtexts[__lang].continuer, _self.launch);
        }
      } else {
        _isScorm = false;
        var suspend = Cookies.get(_cookie_name);
        
        launchBookmark();
      }
    },
    
    disconnect: function(msg){
      if (!_is_disconnected) {
        _is_disconnected = true;
        _self.scormSaveState();
        pipwerks.SCORM.quit();
        CanvasTransition.init();
        if (msg != undefined) {
          ModalDialog.alert(msg);
        }
      }
    },

    launch: function(unlock) {
      
      // get learner name asap
      _self.getLearnerName();
      
      // chapitres list
      // also check if anim
      var counter = 0;
      while(isValid(JsonHandler.getLine("STORY", counter))){
        // check titles
        if (JsonHandler.getLine("STORY", counter).deroule.substr(0,6) == "TITRE:"){
          var text = JsonHandler.getLine("STORY", counter).deroule;
          var chapitre = {};
          chapitre.titre = text.substr(text.indexOf(":")+1, text.lastIndexOf(",") - (text.indexOf(":")+1)).trim();
          chapitre.decor = text.substr(text.lastIndexOf(":")+1).trim();
          chapitre.index = counter + 1;
          _chapitres.push(chapitre);
        }
        // check anim
        if (JsonHandler.getLine("STORY", counter).anim){
          _storyHasAnim = true;
        }
        counter++;
      }
      
      // fullscreen possible ? // todo : à détecter automatiquement
      if (__nofs){
        s.aide.textes.part3.visible = false;
        s.nav.bt_fullscreen.visible = false;
        s.navinfo.infobulle_fullscreen.visible = false;
        
        s.navinfo.infobulle_next.gotoAndStop("nofs");
        
        var decalage = 114;
        
        s.aide.textes.part2.x += decalage;
        s.nav.bt_pause.x += decalage;
        s.nav.bt_next.x += decalage;
        s.navinfo.infobulle_pause.x += decalage;
        s.navinfo.infobulle_next.x += decalage;
        s.nav.bt_restart.x += decalage;
        s.navinfo.infobulle_restart.x += decalage;
        
      }
      
      // get success score from config
      if (isValid(JsonHandler.get("CONFIG", "succes"))) {
        _successScore = parseInt(JsonHandler.get("CONFIG", "succes"));
      }

      // fade out loader
      fx.fadeOut({node:"loader", duration:200, onEnd:function(){
        document.getElementById("loader").style.display = 'none';
      }}).play();
      
      
      // inactivity timer
      if (isValid(JsonHandler.get("CONFIG", "inactivite"))) {
        
        _inactivityTime = parseInt(JsonHandler.get("CONFIG", "inactivite"));
        
        var inactivity_timer = new dojox.timing.Timer(1000*60);
        var idleTime = 0;
        $(this).mousemove(function (e) {
          idleTime = 0;
        });
        $(this).keypress(function (e) {
          idleTime = 0;
        });
        inactivity_timer.onTick = function() {
          idleTime++;
          if (idleTime>=_inactivityTime) {
            inactivity_timer.stop();
            _self.disconnect(__gtexts[__lang].inactivite);
          }
        }
        inactivity_timer.start();
      }

      // interface responsive
      ResponsiveStage.storeClip("nav", {horizontal:"fixed", vertical:"fixed"});
      ResponsiveStage.storeClip("navinfo", {horizontal:"fixed", vertical:"fixed"});
      ResponsiveStage.storeClip("aide", {horizontal:"fixed", vertical:"fixed"});
      ResponsiveStage.storeClip("mc_subtitles", {horizontal:"center", vertical:"fixed"});
      ResponsiveStage.storeClip("mc_pause", {maximize:"height", horizontal:"center"});
      ResponsiveStage.storeClip("mc_titre_slide", {horizontal:"center", vertical:"fixed"});
      
      
      /*
      s.nav.bt_quit.addEventListener("click", function() {
        ModalDialog.alert(ExternalText.getText("module", "fermeture"));
        window.open('','_self');
        window.top.close();
        disconnect();
      });
      */
      s.nav.bt_subtitles.addEventListener("click", onBtSubtitlesClick);
      s.nav.bt_subtitles.addEventListener("rollover", onBtSubtitlesRollOver);
      s.nav.bt_subtitles.addEventListener("rollout", onBtSubtitlesRollOut);
      s.nav.bt_subtitles.cursor = "pointer";

      function onBtSubtitlesClick(e) {
        if (_isSubtitles == false) {
          _isSubtitles = true;
          s.mc_subtitles.visible = true;
        } else {
          _isSubtitles = false;
          s.mc_subtitles.visible = false;
          e.currentTarget.gotoAndStop("off");
        }
      }
      function onBtSubtitlesRollOver(e) {
        if (_isSubtitles == false) {
          e.currentTarget.gotoAndStop("on");
        }
      }
      function onBtSubtitlesRollOut(e) {
        if (_isSubtitles == false) {
          e.currentTarget.gotoAndStop("off");
        }
      }
      
      if (_isSubtitles) {
        s.mc_subtitles.visible = true;
        s.nav.bt_subtitles.gotoAndStop("on");
      }

      s.nav.bt_fullscreen.addEventListener("click", onBtFullScreenClick);
      function onBtFullScreenClick() {
        ResponsiveScale.toggleFS();
      }
      
      // gestion infobulles
      function addInfobulle(bt, infobulle) {
        infobulle.visible = false;
        bt.addEventListener("rollover", function(){
          Tween.init(infobulle, {fade:true, duration:200});
        });
        bt.addEventListener("rollout", function(){
          if (infobulle.visible == true) {
            Tween.init(infobulle, {fadeout:true, duration:200});
          }
        });
      }
      addInfobulle(s.nav.bt_home, s.navinfo.infobulle_home);
      addInfobulle(s.nav.bt_subtitles, s.navinfo.infobulle_subtitles);
      addInfobulle(s.nav.bt_pause, s.navinfo.infobulle_pause);
      addInfobulle(s.nav.bt_next, s.navinfo.infobulle_next);
      addInfobulle(s.nav.bt_fullscreen, s.navinfo.infobulle_fullscreen);
      addInfobulle(s.nav.bt_menu_off, s.navinfo.infobulle_menu);
      addInfobulle(s.nav.bt_restart, s.navinfo.infobulle_restart);
      
      // pause
      s.mc_pause.visible = false;
      Button.enable(s.nav.bt_pause, function(){
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
        } else {
          s.mc_pause.visible = true;
          pause();
        }
      }, null, null, {noTrigger:true});
      
      Button.enable(s.mc_pause, function(){
        s.mc_pause.visible = false;
        unpause();
      }, null, null, {forceVisible:false, noTrigger:true});
      
      function pause(){
        Voice.pause();
        UniqueTimer.pause();
        UniqueTimerForVoice.pause();
        Tween.pause();
      }
      
      function unpause(){
        Voice.unpause();
        UniqueTimer.resume();
        UniqueTimerForVoice.resume();
        Tween.resume();
      }

      /*
      s.nav.bt_previous.addEventListener("click", onBtPreviousClick);
      function onBtPreviousClick() {
        // fadeout overlay video
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
          $("#video").finish();
          $("#video").animate({
            opacity: 0,
          }, 500, 'easeInSine');
        }
        _self.disableNav();
        _currentSlideNumber--;
        _self.checkUnlock();
        _self.goCurrentSlideNumber();
      }
      */
      
      if (JsonHandler.get("CONFIG", "version").substr(JsonHandler.get("CONFIG", "version").length - 4).toLowerCase() == "demo"){
        _isUnlocked = true;
      }
      
      // menu
      s.nav.menu.visible = false;
      s.nav.bt_menu_on.visible = false;
      
      var counter = 1;

      for (var i=0; i<_chapitres.length; i++) {
        s.nav.menu["item"+counter].champ.text = _chapitres[i].titre;
        s.nav.menu["item"+counter].slide_num = i;
        counter++;
      }
      
      var larg_prog = (20*i) + (5*(i-1));
      s.nav.progression.x = 480 + ((960 - larg_prog) / 2);
      
      for (i=counter; i<=16; i++) {
        s.nav.menu["item"+i].visible = false;
        s.nav.progression["prog"+i].visible = false;
      }
      _self.checkUnlock(); //enable or disable items
      
      s.nav.bt_menu_off.addEventListener("click", function(){
        Tween.init(s.nav.menu, {from:"left", distance:1920, duration:600, fade:false});
        s.nav.bt_menu_on.visible = true;
        s.mc_subtitles.visible = false;
        // pause everything but tweens
        Voice.pause();
        UniqueTimer.pause();
        UniqueTimerForVoice.pause();
      });
      
      s.nav.bt_menu_on.addEventListener("click", function(){
        Tween.init(s.nav.menu, {to:"left", distance:1920, duration:600, fade:false});
        s.nav.bt_menu_on.visible = false;
        if (_isSubtitles){
          s.mc_subtitles.visible = true;
        }
        unpause();
      });
      
      Button.enable(s.nav.bt_restart, function(){
        _self.goCurrentSlideNumber();
      }, null, null, {noTrigger: true});
      
      // START
      _self.goCurrentSlideNumber();
      _self.activeNav();
      
      // shortcut debride nav
      var shortcut_code;
      shortcut.add("U",function() {
        shortcut_code = 0;
        sendShortcode(1);
      });
      shortcut.add("N",function() {
        sendShortcode(2);
      });
      shortcut.add("L",function() {
        sendShortcode(3);
      });
      shortcut.add("O",function() {
        sendShortcode(4);
      });
      shortcut.add("C",function() {
        sendShortcode(5);
      });
      shortcut.add("K",function() {
        sendShortcode(6);
      });
      function sendShortcode(val){
        if (val-shortcut_code == 1) {
          shortcut_code = val;
        }
        if (shortcut_code == 6) {
          _isUnlocked = true;
          // s.nav.bt_next.mouseEnabled = true;
          // s.nav.bt_next.alpha = 1;
          _self.activeBtNext();
          _self.checkUnlock();
          ModalDialog.alert("Navigation déverrouillée");
        }
      }
      if ((JsonHandler.get("CONFIG", "unlock") == "yes") || unlock) {
        _isUnlocked = true;
        _self.activeBtNext();
        _self.checkUnlock();
      }

      // Catch JS error and stop program
      window.onerror = function(messageOrEvent, source, noligne, nocolonne, erreur) {
        ModalDialog.ask(__gtexts[__lang].error, __gtexts[__lang].error_bt1, __gtexts[__lang].error_bt2, function(){
          pdf_report.print({
            message : messageOrEvent,
            source : source,
            noligne : noligne,
            nocolonne : nocolonne,
            erreur : erreur,
            bookmark : JSON.stringify(_suspend)
          });
        }, _self.disconnect);
      };
    },
    
    activeBtNext: function(){
      Button.enable(s.nav.bt_next,
        function(e){
          _self.goNext();
        },
        function(e){
          if (!_isBtNextFlashing) {
            e.currentTarget.gotoAndStop("on");
          } 
        },
        function(e){
          if (!_isBtNextFlashing) {
            e.currentTarget.gotoAndStop("off");
          }
        }
      );
    },
    
    checkUnlock: function(){
      
      for (var i=1; i<=_chapitres.length; i++) {

        if (_self.getSuspendCharAt("slides_vus", i) == "1"){
          _slidesUnlocked[i-1] = true;
        } else {
          _slidesUnlocked[i-1] = false;
        }
        
      }

      //menu items
      
      var last_vu;
      for (i=1; i<=16; i++){
        if (s.nav.menu["item"+i].slide_num != undefined){
          if (_slidesUnlocked[i-1] || _isUnlocked){
            
            if (i < _chapitres.length){
              last_vu = i;
            } else {
              last_vu = false;
            }
            
            s.nav.menu["item"+i].gotoAndStop("vu");
            s.nav.progression["prog"+i].gotoAndStop("vu");
            
            activeMenuItem(i);

          } else {
            s.nav.menu["item"+i].gotoAndStop("nonvu");
            s.nav.progression["prog"+i].gotoAndStop("off");
            Button.disable(s.nav.menu["item"+i]);
            // s.nav.menu["item"+i].champ.color = "#5C5C5C";
            s.nav.menu["item"+i].champ.alpha = 0.25;
            if (last_vu){
              activeMenuItem(i);
              last_vu = false;
            }
          }
        }
      }
      
      if (_currentSlideNumber >= 0){
        activeMenuItem(_currentSlideNumber + 1);
        s.nav.progression["prog"+(_currentSlideNumber + 1)].gotoAndStop("on");
      }
      
      function activeMenuItem(i){
        if (s.nav.menu["item"+i] != undefined){
          // s.nav.menu["item"+i].champ.color = "#EAEAEA";
          s.nav.menu["item"+i].champ.alpha = 1;
          Button.enable(s.nav.menu["item"+i],
            function(e){
              s.nav.menu.visible = false;
              s.nav.bt_menu_on.visible = false;
              
              // unpause (from openning menu)
              Voice.unpause();
              UniqueTimer.resume();
              UniqueTimerForVoice.resume();
        
              _self.goSlide(e.currentTarget.slide_num+1);
              if (_isSubtitles){
                s.mc_subtitles.visible = true;
              }
            },
            function(e){
              e.currentTarget.champ.font = e.currentTarget.champ.font.replace("'Raleway'", "'Raleway ExtraBold'");
            },
            function(e){
              e.currentTarget.champ.font = e.currentTarget.champ.font.replace("'Raleway ExtraBold'", "'Raleway'");
            }
          );
        }
      }
      
    },
    
    //video
    getMediaElement: function(){
      return _mediaElement;
    },
    getMediaInstance: function(){
      return _mediaElement_instance;
    },
    
    getMediaElementAddPlayEvent: function(callback){
      _mediaElement.addEventListener("playing", callback);
      _mediaElement_play_event = callback;
    },
    
    getMediaElementAddEndEvent: function(callback){
      _mediaElement.addEventListener("ended", callback);
      _mediaElement_end_event = callback;
    },

    waitClickNext: function() {

      _self.setVuCurrentSlide();
      
      var bton = false;

      if (_isBtNextFlashing == false) {

        _isBtNextFlashing = true;

        _btNextFlashTimer = new dojox.timing.Timer(_btNextFlashSpeed);
        _btNextFlashTimer.onTick = function() {
          if (bton) {
            s.nav.bt_next.gotoAndStop("off");
            _self.activeBtNext();
            bton = false;
          } else {
            s.nav.bt_next.gotoAndStop("highlight");
            _self.activeBtNext();
            bton = true;
          }
        }
        _btNextFlashTimer.start();
      }
    },

    disableNav: function() {;
      Button.disable(s.nav.bt_next);
      // s.nav.bt_previous.mouseEnabled = false;
    },
    
    disablePrev: function() {
      // s.nav.bt_previous.mouseEnabled = false;
      _prevEnabled = false;
    },
    
    disableReplay: function() {
      s.bt_replay.mouseEnabled = false;
      _replayEnabled = false;
    },

    activeNav: function() {
      if (_currentSlideNumber < (_chapitres.length)-1) {
        if ( _isUnlocked || _slidesUnlocked[_currentSlideNumber] ) {
          _self.activeBtNext();
        } else {
          Button.disable(s.nav.bt_next);
          s.nav.bt_next.alpha = 0.3;
        }
        s.nav.bt_next.visible = true;
      } else {
        s.nav.bt_next.visible = false;
      }
      /*
      if (_currentSlideNumber > 0) {
        if (_prevEnabled) {
          s.nav.bt_previous.mouseEnabled = true;
        }
        s.nav.bt_previous.visible = true;
      } else {
        s.nav.bt_previous.visible = false;
      }
      */
      Button.enable(s.nav.bt_home, function() {
        _self.goSlide(0);
      });
    },
    
    setVuCurrentSlide: function() {
      if (_self.getSuspendCharAt("slides_vus", _currentSlideNumber+1) != "0") {
        _self.setSuspendCharAt("slides_vus", _currentSlideNumber+1, "1");
      }
    },

    goNext: function() {

      _self.setVuCurrentSlide();
    
      if (_isBtNextFlashing) {
        _isBtNextFlashing = false;
        _btNextFlashTimer.stop();
      }
      s.nav.bt_next.gotoAndStop("off");
      _self.disableNav();

      _currentSlideNumber++;

      // BREAK IF OUT
      if (_currentSlideNumber == _chapitres.length){
        s.nav.bt_next.visible = false;
        _self.scormFinish();
        ModalDialog.alert(__gtexts[__lang].quizfin_close);
      } else {
      
        _self.checkUnlock();
        
        // fadeout overlay video
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
          $("#video").finish();
          $("#video").animate({
            opacity: 0,
          }, 500, 'easeInSine');
        }
        
        _self.goCurrentSlideNumber();     
      }
    },
    
    goSlide: function(num) {
      
      _currentSlideNumber = num-1;
      if (_isBtNextFlashing) {
        _isBtNextFlashing = false;
        _btNextFlashTimer.stop();
      }
      s.nav.bt_next.gotoAndStop("off");
      _self.disableNav();
      _self.checkUnlock();
      
      if ($("#video").css('display') != "none"){
        if (_mediaElement_instance != undefined) {
          _mediaElement_instance.pause();
        }
        $("#video").finish();
      }

      _self.goCurrentSlideNumber();
    },
    
    goSlideName: function(name) {
      
      var num = -1;
      for (var i=0; i<_slides.length; i++) {
        if (_slides[i] == name) {
          num = i;
        }
      }
      if (num == -1) {
        console.log("**goSlideName ERROR: '"+name+"' is not a referenced slide name.**");
      } else {
        _currentSlideNumber = num;
        // fadeout overlay video
        if ($("#video").css('display') != "none"){
          if (_mediaElement_instance != undefined) {
            _mediaElement_instance.pause();
          }
          $("#video").finish();
          $("#video").animate({
            opacity: 0,
          }, 500, 'easeInSine');
        }
        _self.goCurrentSlideNumber();
      }
    },

    goCurrentSlideNumber: function() {
      // reactive buttons
      _prevEnabled = true;
      _replayEnabled = true;
      
      // video
      if (_mediaElement_play_event != undefined){
        _mediaElement.removeEventListener("playing", _mediaElement_play_event);
      }
      if (_mediaElement_end_event != undefined){
        _mediaElement.removeEventListener("ended", _mediaElement_end_event);
      }
      $("#video").hide();

      // stop btNext flashing

      if (_isBtNextFlashing) {
        _isBtNextFlashing = false;
        _btNextFlashTimer.stop();
        s.nav.bt_next.gotoAndStop("off");
      }

      // stop createjs things
      SoundJS.abort();
      Tween.abort();
      
      // mask infobulles
      MaskObjects.init(s.navinfo, ["infobulle_home", "infobulle_subtitles", "infobulle_pause", "infobulle_next", "infobulle_fullscreen", "infobulle_menu"], {noInit:true});
      
      // mask menu
      s.nav.menu.visible = false;
      
      // abort sequencer
      Sequencer.abort();

      // disable events
      RemoveEvents.init(s, [s.nav.bt_next, s.nav.bt_home, s.nav.bt_subtitles, s.nav.bt_pause, s.mc_pause, s.nav.bt_fullscreen, s.nav.bt_menu_off, s.nav.bt_menu_on, s.nav.menu.item1, s.nav.menu.item2, s.nav.menu.item3, s.nav.menu.item4, s.nav.menu.item5, s.nav.menu.item6, s.nav.menu.item7, s.nav.menu.item8, s.nav.menu.item9, s.nav.menu.item10, s.nav.menu.item11, s.nav.menu.item12, s.nav.menu.item13, s.nav.menu.item14, s.nav.menu.item15, s.nav.menu.item16]);
      // RemoveEvents.init(s, []);

      // stop static timers
      UniqueTimer.stop();
      UniqueTimerForVoice.stop();
      TimerClip.abort();

      // reposition mc interrupted tweens
      Tween.initOldPos();
      
      // reset SceneManager character positions
      SceneManager.reset();

      // stop Mascotte Talk, empty subtitles
      Mascotte.initAll();
      Voice.stopTalk();

      // reinitialize cursor (in this case for the game that changes it)
      s.cursor = "initial";
      
      // remove stage events like stagemousemove, etc.
      stage.removeAllEventListeners();
      
      // remove all tweens
      createjs.Tween.removeAllTweens();

      // start screen
      // gestion ecrans titres pour modules diversité
      if (_currentSlideNumber != -1){
        s.mc_titre_slide.champ.text = _chapitres[_currentSlideNumber].titre;
        s.nav.titre.text = (_currentSlideNumber+1)+"/"+_chapitres.length+" - "+_chapitres[_currentSlideNumber].titre;
        LinesBreaker.init(s.mc_titre_slide.champ, {equal:true});
        LinesBreaker.init(s.nav.titre, {equal:true});
        VerticalTextCenterer.init(s.mc_titre_slide.champ, 1080, "middle");
        VerticalTextCenterer.init(s.nav.titre, 85, "middle");
        
        SoundJS.init("assets/sounds/fx/titre.mp3", function() {
          s.mc_titre_slide.visible = true;
          s.mc_titre_slide.alpha = 1;
          
          Sequencer.launch([
            function(next) {
              $("#canvas").css('opacity', '1');
            },
            function(next) {
              ChapitrePlayer.init();
              setTimeout(function(){
                s.mc_titre_slide.visible = false;
              }, 200);
            }
          ], {cuepoints:[150,2800]});
        });
      } else {
        s.mc_titre_slide.visible = false;
        SlideIntro.init();
        CanvasTransition.init(null, "fadein");
      }
      
      s.nav.progression.visible = true;
      
      _self.activeNav();

      // save state scorm
      _self.scormSaveState();
      
      // remove shortcut space for skip dialogs
      shortcut.remove("space");
      
    // });
    },

    recordScore: function(index, value) {
      _scoreAr[index] = value;
    },

    getScore: function(index) {
      if (index == undefined) {
        var score_final = 0;
        for (var i=0; i<_scoreAr.length; i++) {
          if (isValid(_scoreAr[i])) {
            score_final += parseInt(_scoreAr[i]);
          }
        }
        if (_scoreAr.length == 0) {
          return 0;
        } else {
          return Math.floor(score_final / _scoreAr.length);
        }
      } else {
        return _scoreAr[index];
      }
    },
    
    getLearnerName: function() {
      if (_learnerName == undefined){
        if (_isScorm) {
          if (__scorm == "1.2") {
            _learnerName = pipwerks.SCORM.get("cmi.core.student_name");
          } else {
            _learnerName = pipwerks.SCORM.get("cmi.learner_name");
          }
        } else {
          _learnerName = false;
        } 
      }
      return _learnerName;
    },

    setSuspend: function(parameter, value) {
      _suspend[parameter] = value;
      _self.scormSaveState();
    },
    setSuspendCharAt: function(parameter, position, value) {
      _suspend[parameter] = setSuspendChartAt(_suspend[parameter], position, value);
      function setSuspendChartAt(str, pos, val) {
        if (str == undefined) {
          str = "";
        }
        var new_str = "";
        var len;
        if (str.length > pos) {
          len = str.length;
        } else {
          len = pos;
        }
        for (var i=0; i<len; i++) {
          if (i == (pos-1)) {
            new_str += val;
          } else {
            var old_char = str.substr(i, 1);
            if (old_char == "") {
              new_str += "0";
            } else {
              new_str += old_char;
            }
          }
        }
        return new_str;
      }
      _self.scormSaveState();
    },
    setSuspendArrayOfStrings: function(parameter, position, value) {
      var thisSuspendAr = _suspend[parameter].split("|");
      thisSuspendAr[position] = value;
      _suspend[parameter] = thisSuspendAr.join("|");
      _self.scormSaveState();
    },
    getSuspend: function(parameter) {
      if (_suspend[parameter] == undefined) {
        console.log("*WARNING* suspend '"+parameter+"' not initialized, returning empty string.");
        _suspend[parameter] = "";
      }
      return _suspend[parameter];
    },
    getSuspendCharAt: function(parameter, position) {
      if (_suspend[parameter] != undefined){
        return _suspend[parameter].substr(position-1, 1);
      } else {
        return false;
      }
    },
    getSuspendArrayOfStrings: function(parameter, position) {
      var thisSuspendAr = _suspend[parameter].split("|");
      if (thisSuspendAr[position] != undefined) {
        return thisSuspendAr[position];
      } else {
        console.log("*WARNING* Suspend ArrayOfString '"+parameter+"' is not defined at position "+position+", returning empty string.");
        return "";
      }
    },

    scormSaveState: function() {

      if (_isScorm) {

        // save time
        // hh:mm:ss
        var time_str_classic = moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("HH:mm:ss", {trim: false});
        // iso 8601
        var time_str_iso = "PT"+moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("hh[H]mm[M]ss[S]", {trim: false});

        if (__scorm == "1.2") {
          if (!_self._timeFormat){
            if (try12(time_str_classic)){
              _self._timeFormat = "classic";
              
            } else if (try12(time_str_iso)){
              _self._timeFormat = "iso";
              
            } else if (try2004(time_str_classic)){
              wbtAlert();
              _self._timeFormat = "classic2004";
              
            } else if (try2004(time_str_iso)){
              wbtAlert();
              _self._timeFormat = "iso2004";
              
            } else {
              _self._timeFormat = "fail";
              
            }
          } else {
            switch (_self._timeFormat){
              
              case "classic":
                try12(time_str_classic);
                break;
                
              case "iso":
                try12(time_str_iso);
                break;
                
              case "classic2004":
                try2004(time_str_classic);
                break;
                
              case "iso2004":
                try2004(time_str_iso);
                break;
              
              case "fail":
                break;
              
            }
          }
        } else {
          if (!_self._timeFormat){
            if (try2004(time_str_classic)){
              _self._timeFormat = "classic2004";
              
            } else if (try2004(time_str_iso)){
              _self._timeFormat = "iso2004";
              
            } else {
              _self._timeFormat = "fail";
              
            }
          } else {
            switch (_self._timeFormat){

              case "classic2004":
                try2004(time_str_classic);
                break;
                
              case "iso2004":
                try2004(time_str_iso);
                break;
              
              case "fail":
                break;
              
            }
          }
        }
        
        
        function try12(val){
          return pipwerks.SCORM.set("cmi.core.session_time", val);
        }
        
        function try2004(val){
          return pipwerks.SCORM.set("cmi.session_time", val);
        }
        
        // FIX FOR WBT MANAGER
        function wbtAlert(){
          console.log("****Scorm 1.2 session time failed, using Scorm 2004 instead (WBT LMS fix)******");
        }

        // save suspend_data
        var suspend = "";
        suspend += _currentSlideNumber;
        suspend += ";";
        for (var i=0; i<_scoreAr.length; i++) {
          suspend += _scoreAr[i];
          if (i < _scoreAr.length - 1) {
            suspend += ",";
          }
        }
        suspend += ";";
        for (i=0; i<_suspendToSave.length; i++) {
          suspend += _suspend[_suspendToSave[i]];
          if (i < _suspendToSave.length - 1) {
            suspend += ",";
          }
        }
        var is_saved = pipwerks.SCORM.set("cmi.suspend_data", suspend);
        if (__gm == "dev") {
          console.log("*save suspend_data : '"+suspend+"'");
        }
        if (!is_saved){
          _self.disconnect("La connexion au LMS n'a pas pu être établie.\n\nAssurez-vous que votre poste dispose d'une connexion à votre espace de formation, puis redémarrez le module.");
        }
        // progress measure
        if (__scorm == "2004"){
          var chap_vus = 0;
          for (var i=1; i<=_chapitres.length; i++) {
            if (_self.getSuspendCharAt("slides_vus", i) == "1"){
              chap_vus++;
            }
          }
          var pg = Math.round(chap_vus / _chapitres.length * 100);
          if (isValid(pg)){
            pipwerks.SCORM.set("cmi.progress_measure", pg/100);
          }
        }
        // commit
        pipwerks.SCORM.save();

      } else {
        
        var suspend = "";
        suspend += _currentSlideNumber;
        suspend += ";";
        for (var i=0; i<_scoreAr.length; i++) {
          suspend += _scoreAr[i];
          if (i < _scoreAr.length - 1) {
            suspend += ",";
          }
        }
        suspend += ";";
        for (i=0; i<_suspendToSave.length; i++) {
          suspend += _suspend[_suspendToSave[i]];
          if (i < _suspendToSave.length - 1) {
            suspend += ",";
          }
        }
        Cookies.set(_cookie_name, suspend, { expires: 30 });
        console.log("*save suspend_data : '"+suspend+"'");
      }
    },
    
    setSuccessScore: function(val) {
      _successScore = val;
    },
    
    unlockCurrent: function() {
      _self.setVuCurrentSlide();
      _self.checkUnlock();
    },
    
    scormRecordScore: function(){
      if (_isScorm) {

        var score = _self.getScore();
        if (__scorm == "1.2") {
          // FIX FOR WBT MANAGER
          if (pipwerks.SCORM.set("cmi.core.score.raw", (score).toString()) == false) {
            console.log("****Scorm 1.2 score failed, using Scorm 2004 instead (WBT LMS fix)******");
            pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
            pipwerks.SCORM.set("cmi.score.raw", (score).toString());
          }
        } else {
          pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
          pipwerks.SCORM.set("cmi.score.raw", (score).toString());
        }
      
        _self.scormSaveState();
      }
    },

    scormFinish: function() {
      
      if (_isScorm) {

        _self.scormSaveState();

        var score = _self.getScore();
        if (__scorm == "1.2") {
          // FIX FOR WBT MANAGER
          if (pipwerks.SCORM.set("cmi.core.score.raw", (score).toString()) == false) {
            console.log("****Scorm 1.2 score failed, using Scorm 2004 instead (WBT LMS fix)******");
            pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
            pipwerks.SCORM.set("cmi.score.raw", (score).toString());
          }
        } else {
          pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
          pipwerks.SCORM.set("cmi.score.raw", (score).toString());
        }
        
        if (__scorm == "1.2") {
          if (_successScore) {
            if (score >= _successScore) {
              // FIX FOR WBT MANAGER
              if (pipwerks.SCORM.set("cmi.core.lesson_status", "passed") == false) {
                console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
                pipwerks.SCORM.set("cmi.success_status", "passed");
                pipwerks.SCORM.set("cmi.completion_status", "completed");
              }
            } else {
              // FIX FOR WBT MANAGER
              if (pipwerks.SCORM.set("cmi.core.lesson_status", "failed") == false) {
                console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
                pipwerks.SCORM.set("cmi.success_status", "failed");
                pipwerks.SCORM.set("cmi.completion_status", "completed");
              }
            }
          } else {
            // FIX FOR WBT MANAGER
            if (pipwerks.SCORM.set("cmi.core.lesson_status", "completed") == false) {
              console.log("****Scorm 1.2 completion failed, using Scorm 2004 instead (WBT LMS fix)******");
              pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
          }
        } else {
          if (score >= _successScore) {
            pipwerks.SCORM.set("cmi.success_status", "passed");
          } else {
            pipwerks.SCORM.set("cmi.success_status", "failed");
          }
          pipwerks.SCORM.set("cmi.completion_status", "completed");
          // pipwerks.SCORM.set("cmi.exit", "normal");
        }
        if (__scorm == "2004") {
          pipwerks.SCORM.set("adl.nav.request", "exitAll");
        }
        pipwerks.SCORM.save();
        pipwerks.SCORM.quit();
        _isScorm = false;
      }
    },
    
    // check if browser is IE
    isIe: function() {
      if (_isIe == undefined) {
        _isIe = false;
        
        var ua = window.navigator.userAgent;

      }
      return _isIe;
    }
    
    
  };
  
  //
  //  SR VERSION
  //
  
  
  function loadStoryboard() {
    JsonHandler.load(JsonHandler.get("config", "sb"), "sb", launchScormSr);
  }
  
  function launchScormSr(){
    
    if (JsonHandler.get("config", "scorm") == "yes") {
      //SCORM
      if (pipwerks.SCORM.init()) {
        
        var location;
        
        _isScorm = true;
        _sessionStartTime = new Date();
        if (__scorm == "1.2") {
          pipwerks.SCORM.set("cmi.core.exit", "suspend");
          location = pipwerks.SCORM.get("cmi.core.lesson_location");
        } else {
          pipwerks.SCORM.set("cmi.exit", "suspend");
          location = pipwerks.SCORM.get("cmi.location");
        }
        pipwerks.SCORM.save();

        location = Number(location);
        if (isValid(location) && (location > 1)){
          while((JsonHandler.get("sb", "e"+paddy(location, 3)).type == "qcu_final")||(JsonHandler.get("sb", "e"+paddy(location, 3)).type==undefined)){
            location--;
          }
          
          $("#sr-image").hide();
          $("#sr-btnext").show();
          $("#sr-btprev").show();
          $("#sr-text").show();
          $("#sr-btprev").html("Cliquez pour reprendre depuis le début");
          $("#sr-btnext").html("Cliquez pour continuer");
          $("#focusguard-next").show();
          
          $("#sr-title h1").html("Reprise du marque-page");
          $("#sr-text").html("Voulez-vous continuer depuis votre précédente sauvegarde ?");
          $("#sr-text").attr("tabindex", "0");
          $("#sr-text").focus();
          
          $("#sr-btnext").click(function(){
            _counter = location;
            launchStoryboard();
          });
          
          $("#sr-btprev").click(function(){
            launchStoryboard();
          });

        } else {
          launchStoryboard();
        }
      } else {
        _isScorm = false;
        launchStoryboard();
      }
    } else {
      _isScorm = false;
      launchStoryboard();
    }
  }
    
  function launchStoryboard() {
    
    scormSaveStateSr();
    _screen = JsonHandler.get("sb", "e"+paddy(_counter, 3));
    
    $("#sr-btprev").html("Cliquez ici pour revenir à l'écran précédent");
    $("#sr-btprev").off();
    $("#sr-btnext").off();
    $("#sr-image").hide();
    $("#sr-btnext").hide();
    $("#sr-btprev").hide();
    $("#sr-quiz").hide();
    $("#sr-text").hide();
    $("sr-btnext").html("");
    $("sr-text").html("");
    $("#sr-quiz-question").html("");
    $("#focusguard-next").show();
    $("#sr-btprev").click(function(){
      if (_counter > 1){
        _counter --;
        launchStoryboard();
      }
    });

    var titre;
    if (!isValid(_screen.titre)){
      titre = "&nbsp;";
    } else {
      titre = _screen.titre;
    }
    $("#sr-title h1").html(titre);
    
    $("#sr-title h1").attr("aria-hidden", false);
    switch (_screen.type){
      case "texte_nosr": launchTexteNosr(); break;
      case "scene": $("#sr-title h1").attr("aria-hidden", true); launchScene(); break;
      case "qcu": launchQcu(); break;
      case "qcu_final":launchQcu(true);break;
      case "texte": launchTexte(); break;
      
      default:
        if (_qcufinal_count != 0){
          
          $("#sr-title h1").html("Résultats");
          var score = Math.round(_qcufinal_right / _qcufinal_count *100);
          
          scormScoreSr(score);
          
          $("#sr-btnext").show();
          $("#sr-text").show();
          if (score < Number(JsonHandler.get("config", "success"))){
            setTimeout(function(){
              $("#sr-text").html("Votre score est de "+score+"%. Nous vous invitons à retenter le quiz final.");
              $("#sr-text").attr("aria-hidden", false);
              $("#sr-text").attr("tabindex", "0");
              $("#sr-text").focus();
              $("#sr-text").focusout(function(){
                $("#sr-text").off('focusout');
                $("#sr-btnext").focus();
              });
              $("#sr-btnext").html("Cliquez pour retenter le quiz");
            },50);
            $("#sr-btnext").click(function(){
              _qcufinal_count = 0;
              _qcufinal_right = 0;
              _counter--;
              while(JsonHandler.get("sb", "e"+paddy(_counter, 3)).type == "qcu_final"){
                _counter--;
              }
              launchStoryboard();
            });
          } else {
            setTimeout(function(){
            $("#sr-text").html("Félicitations ! Votre score au quiz est de "+score+"%. Vous pouvez à présent valider le module en cliquant sur le bouton suivant.");
              $("#sr-text").attr("aria-hidden", false);
              $("#sr-text").attr("tabindex", "0");
              $("#sr-text").focus();
              $("#sr-text").focusout(function(){
                $("#sr-text").off('focusout');
                $("#sr-btnext").focus();
              });
              $("#sr-btnext").html("Cliquez pour valider le module");
            },50);
            $("#sr-btnext").click(function(){
              scormScoreSr(score, true);
              $("#module_sr").hide();
            });
          }
          $("#sr-text").attr("tabindex", "0");
          $("#sr-text").focus();
          
        } else {
          console.log("**ERROR** Screen type not defined :"+"e"+paddy(_counter, 3));
        }
      break;
      
    }
  }
  
  function playScreenSounds(callback){
    if (!isValid(_screen.sons)){
      callback();
    } else {
      var sounds = _screen.sons.split(",");
      var counter = -1;
      
      launchSound();
      
      function launchSound(){
        counter++;
        if (counter < sounds.length){
          playSound(sounds[counter].trim(), launchSound);
        } else {
          callback();
        }
      }
    }
  }
  
  function playSound(id, callback){
    shortcut.remove("space");
    if (id.substr(0,3)=="fx/"){
      SoundJS_NoQueue.init("assets/sounds/fx/"+id.substr(3, id.length)+".mp3", null, callback);
    } else {
      SoundJS_NoQueue.init("assets/sounds/voice/"+id+".mp3", null, callback);
    }
    shortcut.add("space", function(){
      SoundJS_NoQueue.abort();
      shortcut.remove("space");
      if (callback != undefined) {
        callback();
      }
    });
  }
  
  function showBt(is_final){
    if (isValid(_screen.btsuivant_texte)){
      
      $("#sr-btnext").show();
      setTimeout(function(){
        if ((_counter > 1)&&(!is_final)){
          $("#sr-btprev").show();
        }
        $("#sr-btnext").html(_screen.btsuivant_texte);
        $("#focusguard-next").focus();
      },50);
      
      $("#sr-btnext").click(nextScreen);
      
      if (isValid(_screen.btsuivant_son)){
        playSound(_screen.btsuivant_son);
      }
    } else {
      nextScreen();
    }
  }
  
  function nextScreen(){
    _counter ++;
    launchStoryboard();
  }
  
  function launchTexteNosr(){
    
    $("#sr-text").html(backTrim(_screen.contenu));
    $("#sr-text").attr("aria-hidden", true);
    $("#sr-text").attr("tabindex", false);
    $("#sr-text").show();
    
    playScreenSounds(showBt);
  }
  
  function launchTexte(){
    
    showBt();
    
    $("#sr-text").show();
    
    setTimeout(function(){
      $("#sr-text").html(backTrim(_screen.contenu));
      $("#sr-text").attr("aria-hidden", false);
      $("#sr-text").attr("tabindex", "0");
      $("#sr-text").focus();
      $("#sr-text").focusout(function(){
        $("#sr-text").off('focusout');
        $("#sr-btnext").focus();
      });
    }, 50);
  }
  
  function launchScene(){
    $("#sr-image img").attr("src", "assets/images/sr/"+_screen.contenu);
    $("#sr-image").show();
    
    playScreenSounds(showBt);
    
  }
  
  function launchQcu(is_final){
    
    if (is_final){
      _qcufinal_count++;
    }
    
    var quiz = _screen.contenu.split("--");
    $("#sr-quiz").show();
    $("#focusguard-next").hide();
    setTimeout(function(){
      $("#sr-quiz-question").html(backTrim(quiz[0]));
      $("#sr-quiz-question").focus();
    }, 50);
    
    
    var answer;
    var not_counted = 0;
    for (var i=1; i<=3; i++){
      
      $("#radio"+i+" input").prop('checked', false);
      
      if (quiz[i].substr(0,1) == "1"){
        answer = i;
      }

      if ((quiz[i].substr(0,2) == "0)") || (quiz[i].substr(0,2) == "1)")){
        $("#radio"+i).show();
        $("#radio"+i+" span").html(backTrim(quiz[i]).substr(2, backTrim(quiz[i]).length));
        $("#radio"+i+" input").change(function(){
          setTimeout(function(){
            $("#sr-btnext").show();
          }, 50);
        });
      } else {
        $("#radio"+i).hide();
        not_counted++;
      }

    }
    
    $("#sr-quiz").show();
    $("#sr-btnext").html("Cliquez pour valider votre choix");
      
    $("#sr-btnext").click(function(){
      $("#sr-quiz").hide();
      $("#sr-btnext").hide();
      if ($("#radio"+answer+" input").is(':checked')){
        $("#sr-text").html(backTrim(quiz[4-not_counted]));
        if (is_final){
          _qcufinal_right++;
        }
      } else {
        $("#sr-text").html(backTrim(quiz[5-not_counted]));
      }
      $("#sr-text").attr("aria-hidden", false);
      $("#sr-text").attr("tabindex", "0");
      $("#sr-text").show();
      $("#sr-text").focus();
      
      $("#sr-text").focusout(function(){
        $("#sr-text").off('focusout');
        $("#sr-btnext").focus();
      });
      
      setTimeout(function(){
        $("#sr-btnext").off();
        showBt(is_final);
      }, 50);
      
    });
    
  }
  
  function scormSaveStateSr() {
    if (_isScorm) {

      // save time
      // hh:mm:ss
      var time_str_classic = moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("HH:mm:ss", {trim: false});
      // iso 8601
      var time_str_iso = "PT"+moment.duration(moment(moment(new Date()).add(1, 's')).diff(moment(_sessionStartTime))).format("hh[H]mm[M]ss[S]", {trim: false});

      if (__scorm == "1.2") {
        if (_timeFormat){
          if (try12(time_str_classic)){
            _timeFormat = "classic";
            
          } else if (try12(time_str_iso)){
            _timeFormat = "iso";
            
          } else if (try2004(time_str_classic)){
            wbtAlert();
            _timeFormat = "classic2004";
            
          } else if (try2004(time_str_iso)){
            wbtAlert();
            _timeFormat = "iso2004";
            
          } else {
            _timeFormat = "fail";
          }
        } else {
          switch (_timeFormat){
            
            case "classic":
              try12(time_str_classic);
              break;
              
            case "iso":
              try12(time_str_iso);
              break;
              
            case "classic2004":
              try2004(time_str_classic);
              break;
              
            case "iso2004":
              try2004(time_str_iso);
              break;
            
            case "fail":
              break;
            
          }
        }
        // save location
        pipwerks.SCORM.set("cmi.core.lesson_location", _counter);
        if (__gm == "dev") {
          console.log("*save location : '"+_counter+"'");
        }
      } else {
        if (!_timeFormat){
          if (try2004(time_str_classic)){
            _timeFormat = "classic2004";
            
          } else if (try2004(time_str_iso)){
            _timeFormat = "iso2004";
            
          } else {
            _timeFormat = "fail";
          }
        } else {
          switch (_timeFormat){
            case "classic2004":
              try2004(time_str_classic);
              break;
            case "iso2004":
              try2004(time_str_iso);
              break;
            case "fail":
              break;
            
          }
        }
        // save location
        pipwerks.SCORM.set("cmi.location", _counter);
        if (__gm == "dev") {
          console.log("*save location : '"+_counter+"'");
        }
      }
      
      function try12(val){
        return pipwerks.SCORM.set("cmi.core.session_time", val);
      }
      
      function try2004(val){
        return pipwerks.SCORM.set("cmi.session_time", val);
      }
      
      // FIX FOR WBT MANAGER
      function wbtAlert(){
        console.log("****Scorm 1.2 session time failed, using Scorm 2004 instead (WBT LMS fix)******");
      }

      pipwerks.SCORM.save();

    }
  }
  
  function scormScoreSr(score, success) {
    if (_isScorm) {
      if (__scorm == "1.2") {
        // FIX FOR WBT MANAGER
        if (pipwerks.SCORM.set("cmi.core.score.raw", (score).toString()) == false) {
          console.log("****Scorm 1.2 score failed, using Scorm 2004 instead (WBT LMS fix)******");
          pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
          pipwerks.SCORM.set("cmi.score.raw", (score).toString());
        }
      } else {
        pipwerks.SCORM.set("cmi.score.scaled", (score / 100).toString());
        pipwerks.SCORM.set("cmi.score.raw", (score).toString());
      }
      
      if (success!=undefined){
        if (__scorm == "1.2") {
          if (success) {
            // FIX FOR WBT MANAGER
            if (pipwerks.SCORM.set("cmi.core.lesson_status", "passed") == false) {
              console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
              pipwerks.SCORM.set("cmi.success_status", "passed");
              pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
          } else {
            // FIX FOR WBT MANAGER
            if (pipwerks.SCORM.set("cmi.core.lesson_status", "failed") == false) {
              console.log("****Scorm 1.2 lesson_status failed, using Scorm 2004 instead (WBT LMS fix)******");
              pipwerks.SCORM.set("cmi.success_status", "failed");
              pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
          }
        } else {
          if (success) {
            pipwerks.SCORM.set("cmi.success_status", "passed");
          } else {
            pipwerks.SCORM.set("cmi.success_status", "failed");
          }
          pipwerks.SCORM.set("cmi.completion_status", "completed");
          // pipwerks.SCORM.set("cmi.exit", "normal");
        }
        pipwerks.SCORM.save();
        pipwerks.SCORM.quit();
      } else {
        pipwerks.SCORM.save();
      }
    }
  }

  //
  //  UTILS
  //
  
  // for SR Engine :
  function paddy(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }
  function backTrim(str){
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str;
  }
  
  //
  //  INTERNAL FUNCTIONS
  //

  // Data validation (useful for LMS):
  function isValid(data) {
    if (data === undefined) return false;
    if (data === null) return false;
    if (data === NaN) return false;
    if (data === "") return false;
    if (data.toString().toLowerCase() === "undefined") return false;
    if (data.toString().toLowerCase() === "null") return false;
    if (data.toString().toLowerCase() === "nan") return false;
    return true;
  }
  
  // check if mobile or tablet (must be updated in future, keep an eye on it):
  function checkMobile() {
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  
});

},
'animator/QuizQcmQcu':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QUIZ QCM / QCU
author: JCK

Needs following clips on stage:
- mc_choice_1....n
- bt_submit

Snippet:
QuizQcmQcu.init(s, ["first choice", "second choice", "third choice"], [1,2], fbRight, fbWrong, {options});
QuizQcmQcu.init(s, ["first choice", "second choice", "third choice"], [1,2], fbRight, fbWrong, {animator:"ShowQuiz", spacer:42, instanceNames:"mc_newchoice_"});

Options:
- animator (string) = name of module for construct animation
- autoCorrect (boolean) = if false, it won't show the correction on submit
- spacer (int or boolean) = overrides the default vertical spacer value (25px) / false = ,no auto-spacer
- instanceNames (string) = changes the default instance names for choices (mc_choice_)
- rightNotNeeded (boolean) = add a new state for correction, label 'right_not_needed"
- cursor (movieclip) = add a special mouse cursor when rollover choices (!! needs transparent buttons named 'bt_zone' inside choice movieclips to define the cursor zone !!)
- forceMulti = force multiple answers when good answer is only 1 choice
- callback = a complementary callback sent on submit on either right or wrong result

 */

define(['util/OptionGetter', 'util/UniqueTimer', 'animator/StorePosition', 'animator/Button', 'util/LinesBreaker'], function (OptionGetter, UniqueTimer, StorePosition, Button, LinesBreaker) {

  var _self;

  var _s;
  var _choices;
  var _good_answers;
  var _feedbackRight;
  var _feedbackWrong;
  var _autoCorrect;
  var _shuffle;
  var _seqChoicesAr;

  var _defaultSpacer = 45; // vertical space between choices (in px) by default
  var _defaultInstanceNames = "mc_choice_"; // default instance names for choices
  var _rightNotNeeded;
  var _cursor;
  var _callback;

  var _nbRep;
  var _spacer;
  var _instanceNames;
  var _isQcu;
  var _answers = new Array();
  var _isIncomplete;
  var _isInMotion;
  var _noText;
  var _forceMulti;
  
  var _ypos;

  return {
    init : function (stage, choices, good_answers, feedbackRight, feedbackWrong, options) {

      _self = this;

      _s = stage;
      _choices = choices;
      _good_answers = good_answers;
      _feedbacksRight = feedbackRight;
      _feedbacksWrong = feedbackWrong;

      _autoCorrect = OptionGetter.get(options, "autoCorrect", true);
      _shuffle = OptionGetter.get(options, "shuffle", true);
      _spacer = OptionGetter.get(options, "spacer", _defaultSpacer);
      _instanceNames = OptionGetter.get(options, "instanceNames", _defaultInstanceNames);
      _rightNotNeeded = OptionGetter.get(options, "rightNotNeeded", false);
      _cursor = OptionGetter.get(options, "cursor", false);
      _callback = OptionGetter.get(options, "callback", false);
      _noText = OptionGetter.get(options, "noText", false);
      _forceMulti = OptionGetter.get(options, "forceMulti", false);
      
      if (_noText) {
        _shuffle = false;
      }

      UniqueTimer.stop(); // in case of previous animator is still going

      construct();

      var animator = OptionGetter.get(options, "animator");

      var i;
      if (animator != undefined) {
        require(['animator/' + animator], function (Animator) {
          var mc_to_animate = new Array();
          for (i = 1; i <= _nbRep; i++) {
            mc_to_animate.push(_instanceNames + i);
          }
          Animator.init(_s, mc_to_animate, function() {
            _isInMotion = false;
          });
        });
        _isInMotion = true;
      } else {
        for (i = 1; i <= _nbRep; i++) {
          _s[_instanceNames + i].visible = true;
          _s[_instanceNames + i].champ.alpha = 1;
          _s[_instanceNames + i].alpha = 1;
        }
        _isInMotion = false;
      }
    },

    getAnswers: function() {
      return _answers;
    },
    
    getYpos: function(){
      return _ypos;
    },
    
    getStringOfAnswers: function(separator) {
      var str = "";
      for (var i = 1; i <= _nbRep; i++) {
        if (_answers[i]) {
          str += i;
          str += separator;
        }
      }
      if (str != "") {
        str = str.substring(0, str.length - separator.length);
      }
      return str;
    },
    
    getAnswersIsIncomplete: function() { // return true if NOT ALL THE GOOD ANSWERS are selected AND NO BAD ANSWER are selected IN CASE OF QCM, in all other cases, return false
      return _isIncomplete;
    },

    correct : function () {

      var isInGood_answers, i, j, mc_num;
      
      for (i = 1; i <= _nbRep; i++) {
        _s[_instanceNames + i].alpha = 0.3;
      }
      for (i = 0; i < _good_answers.length; i++){
        _s[_instanceNames + ((_seqChoicesAr.indexOf(_good_answers[i]))+1)].champ.alpha = 1;
        _s[_instanceNames + ((_seqChoicesAr.indexOf(_good_answers[i]))+1)].alpha = 1;
      }

      for (i = 1; i <= _nbRep; i++) {
        
        mc_num = (_seqChoicesAr.indexOf(i))+1;
        
        if (_answers[i]) {
          isInGood_answers = false;
          for (j = 0; j < _good_answers.length; j++) {
            if (i == _good_answers[j]) {
              isInGood_answers = true;
            }
          }
          if (!isInGood_answers) {
            _s[_instanceNames + mc_num].gotoAndStop('wrong');
            _s[_instanceNames + mc_num].alpha = 1;
            _s[_instanceNames + mc_num].champ.alpha = 0.3;
            
          } else {
            _s[_instanceNames + mc_num].gotoAndStop('right');
            // special pour accordia !!
            if (!_noText){
              boldify(_s[_instanceNames + mc_num].champ);
            }
            //
          }
        } else {
          isInGood_answers = false;
          for (j = 0; j < _good_answers.length; j++) {
            if (i == _good_answers[j]) {
              isInGood_answers = true;
            }
          }
          if (isInGood_answers) {
            _s[_instanceNames + mc_num].gotoAndStop('wrong_needed');
            // special pour accordia !!
            if (!_noText){
              boldify(_s[_instanceNames + mc_num].champ);
            }
            //
          } else {
            if (_rightNotNeeded) {
              _s[_instanceNames + mc_num].gotoAndStop('right_not_needed');
            }
          }
        }
      }
      
      function boldify(champ){
        // if (champ.text.substr(champ.text.length - 1) == "?"){
          // champ.text = champ.text.substr(0, champ.text.length - 1).trim();
          // LinesBreaker.init(champ);
        // }
        // champ.font = champ.font.replace("'Raleway'", "'Raleway ExtraBold'");
      }
    },

    reactive : function () {
      for (var i = 1; i <= _nbRep; i++) {
        _s[_instanceNames + i].mouseEnabled = true;
      }
    }
  };

  function construct() {

    _s.bt_submit.visible = false;
    _nbRep = _choices.length;
    if ((_good_answers.length == 1)&&(!_forceMulti)) {
      _isQcu = true;
    } else {
      _isQcu = false;
    }

    _answers = [];
    
    var i;
    _seqChoicesAr = [];
    for (i=0; i<_nbRep; i++) {
      _seqChoicesAr[i] = i+1;
    }
    // shuffle answers
    if (_shuffle) {
      shuffle(_seqChoicesAr);
    }

    var offset_y = _s[_instanceNames + 1].y;

    for (i = 1; i <= _nbRep; i++) {

      var mc = _s[_instanceNames + i];
      
      Button.disable(mc);
      mc.mouseEnabled = true;
      StorePosition.record(mc);
      mc.gotoAndStop('off');

      if (!_noText) {
        mc.champ.text = _choices[_seqChoicesAr[i-1] - 1];
        LinesBreaker.init(mc.champ);
        if (_spacer) {
          mc.y = offset_y;
        }
        
        // special pour accordia !!
        // mc.champ.font = mc.champ.font.replace("'Raleway ExtraBold'", "'Raleway'");
        //
        
        var champ_height = mc.champ.getMeasuredHeight();

        mc.champ.hit = new createjs.Shape();
        mc.champ.hit.graphics.beginFill("#000").drawRect(0, 0, mc.champ.getMeasuredWidth(), champ_height);
        mc.champ.hitArea = mc.champ.hit;

        offset_y = offset_y + champ_height + _spacer;
      }

      mc.n = _seqChoicesAr[i-1];
      mc.on("mousedown", onClickChoice);
      
      if (_cursor) {
        mc.bt_zone.cursor = 'none';
        mc.on("rollover", function() {
          _cursor.visible = true;
        });
        mc.on("rollout", function() {
          _cursor.visible = false;
        });
      } else {
        mc.cursor = 'pointer';
      }
    }
    _ypos = offset_y;
    //_s.bt_submit.y = offset_y;
    // _s.bt_submit.on("click", onClickSubmit);
    Button.enable(_s.bt_submit, onClickSubmit, null, null, {forceVisible:false});
    
    if (_cursor) {
      _cursor.mouseEnabled = false;
      s.setChildIndex(_cursor, s.getNumChildren() - 1);
      stage.on("stagemousemove", function(e) {
        _cursor.x = e.stageX;
        _cursor.y = e.stageY;
      });
    }

  }

  function onClickChoice(e) {
    n = e.currentTarget.n;
    _s.bt_submit.visible = true;
    if (_isQcu) {
      for (i = 1; i <= _nbRep; i++) {
        _answers[i] = false;
        _s[_instanceNames + i].gotoAndStop('off');
      }
      _answers[n] = true;
      e.currentTarget.gotoAndStop('on');
    } else {
      if (_answers[n]) {
        _answers[n] = false;
        e.currentTarget.gotoAndStop('off');
      } else {
        _answers[n] = true;
        e.currentTarget.gotoAndStop('on');
      }
    }

    if (_isInMotion) {
      UniqueTimer.stop();
      createjs.Tween.removeAllTweens();
      var offset_y = _s[_instanceNames + 1].y;
      for (var i = 1; i <= _nbRep; i++) {
        var mc = _s[_instanceNames + i];
        StorePosition.reset(mc);
        mc.visible = true;
        mc.champ.alpha = 1;
        mc.alpha = 1;
        
        if (!_noText) {
          if (_spacer) {
            mc.y = offset_y;
          }
          var champ_height = mc.champ.getMeasuredHeight();
          offset_y = offset_y + champ_height + _spacer;
        }
      }
      _isInMotion = false;
    }
  }

  function onClickSubmit(e) {

    e.currentTarget.visible = false;

    var isWin = true;
    var isInGood_answers;
    
    // for _isIncomplete
    var nbGoodSelected = 0;
    var badChosen = false;
    
    // start validation
    for (var i = 1; i <= _nbRep; i++) {
    
      _s[_instanceNames + i].mouseEnabled = false;
    
      if (_answers[i]) {
        isInGood_answers = false;
        for (j = 0; j < _good_answers.length; j++) {
          if (i == _good_answers[j]) {
            isInGood_answers = true;
          }
        }
        if (!isInGood_answers) {
          isWin = false;
          badChosen = true;
        } else {
          nbGoodSelected++;
        }
      } else {
        isInGood_answers = false;
        for (j = 0; j < _good_answers.length; j++) {
          if (i == _good_answers[j]) {
            isInGood_answers = true;
          }
        }
        if (isInGood_answers) {
          isWin = false;
        }
      }
    }
    
    // _isIncomplete
    if (badChosen) {
      _isIncomplete = false;
    } else {
      if (nbGoodSelected < _good_answers.length) {
        _isIncomplete = true;
      } else {
        _isIncomplete = false;
      }
    }

    // end of validation
    if (_autoCorrect) {
      _self.correct();
    }

    // callbacks
    if (_callback) {
      _callback();
    }
    if (isWin) {
      _feedbacksRight();
    } else {
      _feedbacksWrong();
    }
  }
  
  /**
   * Shuffles array in place.
   * @param {Array} a items The array containing the items.
   */
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

});

},
'animator/WaitClipEnd':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

WaitClipEnd
author: JCK

Send a callback when MovieClip reach end
WaitClipEnd.init(mc, fn);
*/

define(['dojox/timing'], function (timing) {

  
  return {
    init: function (mc, callback) {
    
      _mc = mc;

      var ticker = 1000 / lib.properties.fps;
      
      var timer = new dojox.timing.Timer(ticker);
      
      timer.onTick = function() {
        
        if (mc.currentFrame == mc.timeline.duration-1){
          
          timer.stop();
          callback();
        }
      
      }
      timer.start();
    }
  };
});

},
'animator/RemoveEvents':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

RemoveEvents
Remove all *CLICKS*, *MOUSEOVER* and *MOUSEOUT* EVENTS of stage (4 first nested movieclips levels)

author: JCK

*/

define(function() {

  var _exceptionAr;

  return {
    init: function (stage, exceptionAr) {
      _exceptionAr = exceptionAr;
      for (var i=0; i<stage.children.length; i++) {
        disableChild(stage.children[i]);
        if (stage.children[i].children != undefined) {
          for (var j=0; j<stage.children[i].children.length; j++) {
            disableChild(stage.children[i].children[j]);
            if (stage.children[i].children[j].children != undefined) {
              for (var k=0; k<stage.children[i].children[j].children.length; k++) {
                disableChild(stage.children[i].children[j].children[k]);
                if (stage.children[i].children[j].children[k].children != undefined) {
                  for (var l=0; l<stage.children[i].children[j].children[k].children.length; l++) {
                    disableChild(stage.children[i].children[j].children[k].children[l]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  function  disableChild(child) {
    var isInException = false;
    for (var i=0; i<_exceptionAr.length; i++) {
      if (child == _exceptionAr[i]) {
        isInException = true;
      }
    }
    if (!isInException) {
      child.removeAllEventListeners("click");
      child.removeAllEventListeners("mouseover");
      child.removeAllEventListeners("mouseout");
    }
  }
});

},
'util/UniqueTimerForElements':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Unique Timer
app static timer

author: JCK

 */

define(['dojox/timing'], function (timing) {

  var _timer = new timing.Timer();
  var _isTimer;

  return {
    init : function (fn, delay) {
      if (!_isTimer) {
        _timer = new timing.Timer(delay);
        _timer.onTick = fn;
        _timer.start();
        _isTimer = true;
      } else {
        // console.log("*WARNING* UniqueTimer conflict");// debug mode
      }
    },
    stop : function () {
      _timer.stop();
      _isTimer = false;
    },
    setInterval : function (val) {
      _timer.setInterval(val);
    },
    wait : function (delay, callback) {
      function after_wait() {
        _timer.stop();
        callback();
      }
      _timer = new timing.Timer(delay);
      _timer.onTick = after_wait;
      _timer.start();
    }
  };
});

},
'pdf/EasyPDF':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

class EasyPDF v1.5
extends functionalities of jsPDF v1.5
Author: JCK
 */

define(["dojo/_base/declare", "util/OptionGetter", "pdf/Backgrounds"], function (declare, OptionGetter, Backgrounds) {
  return declare(null, {

    jspdf : null,

    name : "myEasyPDF",
    fontsize : 12,
    unit : "mm",
    orientation : "p",
    fontcolor : "#000000",
    fontstyle : "normal", // normal, italic, bold, bolditalic
    background : null, // path to image file
    content : null, // function that creates the content

    save : function() {
      this.jspdf.save(this.name+".pdf");
    },
    
    open : function() {
      this.jspdf.output('dataurlnewwindow');
    },
    
    autoTable : function (columns, rows, options) {
      this.jspdf.autoTable(columns, rows, options);
    },

    text : function(str, x, y, options) {
      var fontsize = OptionGetter.get(options, "fontsize", this.fontsize);
      var align = OptionGetter.get(options, "align", "left");
      var fontcolor = OptionGetter.get(options, "fontcolor", this.fontcolor);
      var rgbfontcolor = hexToRgb(fontcolor);
      this.jspdf.setFontSize(fontsize);
      this.jspdf.setTextColor(rgbfontcolor.r, rgbfontcolor.g, rgbfontcolor.b);

      // define style according to used font
      var fontstyle = OptionGetter.get(options, "fontstyle", this.fontstyle);
      var style_number;
      switch (fontstyle) {
        case "bold" : style_number = 1; break;
        case "italic" : style_number = 2; break;
        case "bolditalic" : style_number = 3; break;
        default : style_number = 0; break;
      }
      this.jspdf.setFontStyle(this.jspdf.getFontList()[this.jspdf.internal.getFont().fontName][style_number]);

      // add text
      this.jspdf.text(str, x, y, {align:"center", maxWidth:280});
    },
    
    applyBackground : function() {
      var w;
      var h;
      if (this.unit == "mm") {
        if (this.orientation == "p") {
          w = 210; h = 297;
        } else {
          w = 297; h = 210;
        }
      } else if (this.unit == "pt") {
        if (this.orientation == "p") {
          w = 595; h = 842;
        } else {
          w = 842; h = 595;
        }
      }
      this.jspdf.addImage(this.background, 'JPEG', 0, 0, w, h);
    },

    constructor : function (args) {

      // get constructor parameters
      declare.safeMixin(this, args);
      
      // instanciate pdf
      this.jspdf = new jsPDF(this.orientation, this.unit);
      
      // create base64 string of background
      if (this.background) {
        var self = this;
        /* FIX FOR IE (CAN'T LOAD IMAGE ON THE FLY)
        toDataUrl(this.background, function (loaded_data) {
          self.background = loaded_data;
          self.applyBackground();
          if (self.content) {
            self.content();
          }
          self.open();
        });
        */
        self.background = Backgrounds.get(this.background);
        self.applyBackground();
        if (self.content) {
          self.content();
        }
        self.save();
      } else {
        if (this.content) {
          this.content();
        }
        this.save();
      }
    }
  });


  /*
  FileReader (for images) > !!! Doesn't work with IE !!!
   */
  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }


  /*
  color converter hex to rgb values
  */
  function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
});

},
'engine/ChapitrePlayer':function(){
/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

CHAPITRE PLAYER
author: JCK

*/

define(['engine/Player',
    'animator/ResponsiveStage',
    'animator/Mascotte',
    'animator/WaitNextTick',
    'util/JsonHandler',
    'util/UniqueTimer',
    'animator/QuizBuilder',
    'animator/ClickPictosBuilder',
    'animator/ClassementBuilder',
    'animator/ContenuBuilder',
    'animator/LoadImage',
    'animator/SoundJS',
    'animator/Tween',
    'animator/QuizDragDrop',
    'animator/QuizDragDropOneByOne',
    'animator/MaskObjects',
    'util/Sequencer',
    'animator/VerticalSpacer',
    'animator/VerticalTextCenterer',
    'engine/QuizFinal',
    'util/CanvasTransition',
    'animator/Voice',
    'exports'
  ], function (
    Player,
    ResponsiveStage,
    Mascotte,
    WaitNextTick,
    JsonHandler,
    UniqueTimer,
    QuizBuilder,
    ClickPictosBuilder,
    ClassementBuilder,
    ContenuBuilder,
    LoadImage,
    SoundJS,
    Tween,
    QuizDragDrop,
    QuizDragDropOneByOne,
    MaskObjects,
    Sequencer,
    VerticalSpacer,
    VerticalTextCenterer,
    QuizFinal,
    CanvasTransition,
    Voice,
    exports
    ) {
      
  var _self;
  var index;
  
  exports.getIndex = function() {
    return _self.getIndex();
  }
  
  exports.incrementIndex = function(val) {
    _self.incrementIndex(val);
  }

  return {
    
    getIndex: function() {
      return index;
    },
    
    incrementIndex: function(val){
      index += val;
    },
    
    init: function (decor, fade) {
      
      _self = this;
      
      s.nav.visible = true;
      
      var show_persos; //set to 'true' in STORY to show personnages on prologue
      
      var screen;
      if (decor == undefined){
        screen = Player.getCurrentChapter().decor;
        index = Player.getCurrentChapter().index - 1;
      } else {
        screen = decor;
        if (fade){
          canvas.style.opacity = '0';
          CanvasTransition.init(null, "fadein");
        }
      }
      s.gotoAndStop(screen);
      execScript();
      
      if (screen == "prologue"){
        s[screen]["scene"].personnages.visible = false;
        s[screen]["scene"].chrono.visible = false;
        LoadImage.init(s[screen]["scene"].personnages, "assets/images/medias/prologue_personnages.png", null, {clear:true, resize:[427,281]})
      }
      
      ResponsiveStage.storeClip(screen, {horizontal:"fixed", vertical:"fixed"});
      
      var counter_persos_dial = 0;
      var current_perso_parle;
      
      var persos = {};
      
      var persos_array = [];
      var perso_first;
      
      var replicas;
      var letter_count;
      var is_zoomed;
      var next_is_decor;
      var perso_zoom_changed_in_monolog;
      var is_previous_anim;
      var is_previous_activity;
      var is_prologue = false;
      var is_prologue_presentation_persos = false;
      if (screen == "prologue"){
        is_prologue = true;
      }
      var orientable_perso = {};
      var next_perso_to_look_at;
      var zoom_on_look_at;
      var perso_turned;
      
      var is_swaping;
      
      var activities = ["titre:", "decor:", "quiz_", "contenu_", "clickpictos_", "classement_", "surmesure_", "surmesureonscene_", "video_"];
      
      function execScript(){
        //execution scripts:
        var sc = JsonHandler.getLine("STORY", index).script;
        if ((sc != "")&&(sc != undefined)){
          sc = sc.replace(/scene./g, "s[screen].scene.");
          eval(sc);
        }
      }
      
      WaitNextTick.init(function(){
        
        switchVue("large");
        
        // SETUP CHARACTERS
        for (var i=0; i<s[screen].config.persos.length; i++){
          s[screen]["scene"]["perso"+(i+1)].scaleX = Math.abs(s[screen]["scene"]["perso"+(i+1)].scaleX);
          s[screen]["scene"]["perso"+(i+1)].gotoAndStop(s[screen].config.persos[i]);
          persos[s[screen].config.persos[i]] = "perso"+(i+1);
          
          if (i > 0){
            persos_array.push(s[screen]["scene"]["perso"+(i+1)][s[screen].config.persos[i]]);
          } else {
            perso_first = s[screen]["scene"]["perso"+(i+1)][s[screen].config.persos[i]];
          }
          
        }
        
          // directions
        
        if (s[screen].config.dir_init != undefined){
          for (i=0; i<s[screen].config.dir_init.length; i++){
            if (s[screen].config.dir_init[i].substr(0,1) == "D"){
              s[screen]["scene"]["perso"+(i+1)].scaleX = Math.abs(s[screen]["scene"]["perso"+(i+1)].scaleX) * -1;
            } else if (s[screen].config.dir_init[i].substr(0,1) == "G"){
              s[screen]["scene"]["perso"+(i+1)].scaleX = Math.abs(s[screen]["scene"]["perso"+(i+1)].scaleX);
            }
            if (s[screen].config.dir_init[i].substr(1,1) == "O"){
              orientable_perso.name = s[screen].config.persos[i];
              orientable_perso.place = (i+1);
              orientable_perso.mc = s[screen]["scene"]["perso"+(i+1)];
            }
          }
        } else {
          s[screen]["scene"]["perso1"].scaleX = s[screen]["scene"]["perso1"].scaleX * -1;
        }

        // LAUNCH
        launchIndex();
        
        function launchIndex(){
          
          shortcut.remove("ctrl+alt+shift+right");
          shortcut.add("ctrl+alt+shift+right", function(){
            Voice.stopTalk();
            is_swaping = true;
            launchIndex();
          });
          
          s.visible = false;
          
          s.gotoAndStop(screen);
          
          index++;
          
          if ((index >= Player.getCurrentChapter().index + 3) && (orientable_perso.name != undefined)){
            if (JsonHandler.getLine("STORY", index) != undefined){
              if (getActualPerso(JsonHandler.getLine("STORY", index).perso) != orientable_perso.name){
                orientOrientablePerso();
              }
            }
          }
          
          if ((screen == "prologue") && (index==2) && (!is_swaping) && (JsonHandler.get("CONFIG", "no_applause") != "yes")){
            
            s.visible = true;
            SoundJS.init("assets/sounds/fx/applause.mp3",
              function(){
                s[screen]["scene"]["perso1"]["marcillac"].gotoAndPlay("pose");
              },
              function(){
                playIndex("unpose");
              }
            )
            
          } else {
            playIndex();
          }
          
          
          function playIndex(anim){
            if (JsonHandler.getLine("STORY", index+1) != undefined){
              if (JsonHandler.getLine("STORY", index+1).deroule.substr(0,6).toLowerCase() == "decor:"){
                next_is_decor = true;
              } else {
                next_is_decor = false;
              }
            } else {
              next_is_decor = false;
            }

            if (JsonHandler.getLine("STORY", index) == undefined){
              s.visible = true;
              switchVue("large");
              shortcut.remove("ctrl+alt+shift+right");
              Player.waitClickNext();
            } else if (((JsonHandler.getLine("STORY", index).deroule.trim() == "") || (JsonHandler.getLine("STORY", index).deroule.substr(0,6).toLowerCase() == "titre:")) && (!is_prologue_presentation_persos)){
              s.visible = true;
              switchVue("large");
              shortcut.remove("ctrl+alt+shift+right");
              Player.waitClickNext();
            } else if ((JsonHandler.getLine("STORY", index).deroule.trim() == "") || (JsonHandler.getLine("STORY", index).deroule.substr(0,6).toLowerCase() == "titre:")) {
              s.visible = true;
              Tween.init(s[screen]["scene"].chrono, {from:"left", distance:500, duration:350, fade:true, callback:
                function(){
                  Tween.init(s[screen]["scene"].chrono, {pop:true});
                  shortcut.remove("ctrl+alt+shift+right");
                  Player.waitClickNext();
                }
              });
            } else {
              var activity = false;
              for (var i=0; i < activities.length; i++){
                if (JsonHandler.getLine("STORY", index).deroule.substr(0, activities[i].length).toLowerCase() == activities[i].toLowerCase()){
                  activity = activities[i].toLowerCase();
                  break;
                }
              }
              
              var perso_value = JsonHandler.getLine("STORY", index).perso;
              if ((perso_value != "{all}")&&(perso_value != "{none}")){
                var perso = getActualPerso(perso_value);
              }
              
              if (perso_turned){
                if (perso != perso_turned){
                  s[screen]["scene"][persos[perso_turned]].scaleX = s[screen]["scene"][persos[perso_turned]].scaleX * -1;
                  perso_turned = false;
                }
              }
              
              
              var is_turning = false;
              if (perso_value){
                if (perso_value.substr(perso_value.length - 6).toLowerCase() == "{turn}"){
                  s[screen]["scene"][persos[perso]].scaleX = s[screen]["scene"][persos[perso]].scaleX * -1;
                  is_turning = true;
                  perso_turned = perso;
                } else if (perso_value.substr(perso_value.length - 10).toLowerCase() == "{turnstay}"){
                  s[screen]["scene"][persos[perso]].scaleX = s[screen]["scene"][persos[perso]].scaleX * -1;
                  is_turning = true;
                }
              }
              
              var son = JsonHandler.getLine("STORY", index).son;
              var deroule = JsonHandler.getLine("STORY", index).deroule;
              

              
              // voice case
              if ((!activity) && (!is_swaping)){
                s.visible = true;
                is_previous_activity = false;
                
                execScript();
                
                if ((perso_value != "{all}")&&(perso_value != "{none}")) {
                
                  if (perso != current_perso_parle){
                    is_previous_anim = false;
                    current_perso_parle = perso;
                    counter_persos_dial++;
                    letter_count = 0;
                    replicas = 0;
                    while (getActualPerso(JsonHandler.getLine("STORY", index+replicas).perso) == perso){
                      replicas++;
                      if (JsonHandler.getLine("STORY", index+replicas) == undefined){
                        break;
                      }
                    }
                    perso_zoom_changed_in_monolog = false;
                  }
                  letter_count += deroule.length;
                
                }
                
                // Zoom persos managment
                if (is_prologue && (show_persos != "done") && ((deroule.substr(0,10).toLowerCase()=="retrouvons") || (show_persos == true))){
                  
                  show_persos = "done";
                  
                  switchVue("zoom_perso1");
                  Tween.init(s[screen]["scene"].personnages);
                  anim = "pose";
                  is_prologue_presentation_persos = index;
                  
                } else if (perso_value == "{all}") {
                  
                  switchVue("large");
                  
                }  else if (perso_value == "{none}") {
                  
                  // do nothing
                  
                } else if (decor || next_is_decor) {
                  
                  switchVue("zoom_"+persos[perso]);
                  decor = undefined;
                  zoom_on_look_at = true;
                
                } else if ((is_prologue_presentation_persos) && (is_prologue_presentation_persos == index - 1)){
                  
                  anim = "unpose";
                  
                } else if (zoom_on_look_at){
                  
                  switchVue("zoom_"+persos[perso]);
                  zoom_on_look_at = false;
                  
                } else if (!is_prologue_presentation_persos) {
                  
                  if (JsonHandler.getLine("STORY", index+1) == undefined){
                    
                    switchVue("large");
                    
                  } else if ((JsonHandler.getLine("STORY", index+1).deroule.trim() == "") || (JsonHandler.getLine("STORY", index+1).deroule.substr(0,6).toLowerCase() == "titre:")){
                    switchVue("large");
                    
                  } else {
                    
                    if (counter_persos_dial == 3){
                      switchVue("zoom_"+persos[perso]);
                      is_zoomed = true;
                    } else if (counter_persos_dial > 3) {
                      
                      
                      if (is_turning){
                        
                        if (is_zoomed){
                          switchVue("zoom_persos");
                        } else {
                          switchVue("zoom_"+persos[perso]);
                        }

                      } else if (letter_count <= 200){
                        if (replicas > 1){
                          switchVue("zoom_"+persos[perso]);
                        } else {
                          switchVue("zoom_persos");
                        }
                      } else if (!perso_zoom_changed_in_monolog){
                        if (is_zoomed){
                          switchVue("zoom_persos");
                        } else {
                          switchVue("zoom_"+persos[perso]);
                        }
                        perso_zoom_changed_in_monolog = true;
                      }
                    }
                  }
                }

                 // this remplace the old 'anim' in two Mascotte.plays{start} just below:
                var simple_anim;
                if (perso == "marcillac"){
                  simple_anim = anim;
                } else {
                  // Perso animation
                  if (!Player.getStoryHasAnim()) {
                    // if no 'anim' column in story, then random anim :
                    var got_anim = 0;
                    if (s[screen]["scene"][persos[perso]] != undefined){
                      var labels_perso = s[screen]["scene"][persos[perso]][perso].labels;
                      for (var i=0; i<labels_perso.length; i++){
                        if (labels_perso[i].label.substr(0,4) == "anim"){
                          got_anim ++;
                        }
                      }
                    }
                    if ((Math.random() < 0.6) && (deroule.length > 30) && (!Player.isMobile()) && (got_anim > 0)){
                      if (got_anim == 1){
                        simple_anim = "anim";
                      } else {
                        simple_anim = "anim"+Math.floor(Math.random() * got_anim + 1);
                      }
                      is_previous_anim = true;
                    } else if (is_previous_anim){
                      is_previous_anim = false;
                    }
                  } else {
                    // else, got animation from column 'anim'
                    simple_anim = JsonHandler.getLine("STORY", index).anim;
                  }
                  
                }
                
                if (perso_value != "{all}") {
                  var perso_talking;
                  if (perso_value != "{none}"){
                    perso_talking = s[screen]["scene"][persos[perso]][perso];
                  }
                  Mascotte.play(perso_talking, son, {text:deroule, start:simple_anim}, function(){
                    UniqueTimer.wait(250, function(){
                      launchIndex();
                    });
                  });
                } else {
                  Mascotte.play(perso_first, son, {text:deroule, start:simple_anim, chorus:persos_array}, function(){
                    UniqueTimer.wait(250, function(){
                      launchIndex();
                    });
                  });
                }
                
                
              // other cases
              } else {
                if (deroule.toLowerCase() == "quiz_final"){
                  QuizFinal.init();
                } else {
                  var t = 200;
                  if (is_previous_activity){
                    t = 0;
                  }
                  
                  switch(activity){
                    
                    case "decor:" :
                      Mascotte.initAll();
                      var fade = false;
                      var decor;
                      if ((deroule.toLowerCase().indexOf("fade") != -1) && (deroule.toLowerCase().substr(deroule.length - 4) == "true")){
                        fade = true;
                        decor = deroule.substr(deroule.indexOf(":")+1, deroule.indexOf(",") - (deroule.indexOf(":")+1)).trim();
                      } else {
                        decor = deroule.substr(deroule.indexOf(":")+1).trim();
                      }
                      _self.init(decor, fade);
                      break;
                    
                    case "quiz_" :
                      is_swaping = false;
                      UniqueTimer.wait(t, function(){QuizBuilder.init(s, deroule, {perso:perso, prologue:is_prologue}, activityCallback);});
                      break;
                    
                    
                    case "clickpictos_" :
                      is_swaping = false;
                      UniqueTimer.wait(t, function(){ClickPictosBuilder.init(s, deroule, activityCallback);});
                      break;
                    
                    
                    case "classement_" :
                      is_swaping = false;
                      UniqueTimer.wait(t, function(){ClassementBuilder.init(s, deroule, activityCallback);});
                      break;
                    
                    
                    case "contenu_" :
                      is_swaping = false;
                      var deroule_activity, deroule_persotalk;
                      if (deroule.indexOf(",") != -1){
                        deroule_activity = deroule.substr(0, deroule.indexOf(",")).trim();
                        deroule_persotalk = parseInt(deroule.substr(deroule.indexOf(",")+1));
                      } else {
                        deroule_activity = deroule;
                      }
                      UniqueTimer.wait(t, function(){ContenuBuilder.init(s, deroule_activity, {perso:perso, persotalk:deroule_persotalk, prologue:is_prologue}, activityCallback);});
                      break;
                      
                    case "surmesure_" :
                      is_swaping = false;
                      var surMesureFile = deroule.substr(deroule.indexOf("_")+1);
                      loadJs(surMesureFile, function(){
                        eval(surMesureFile+"(activityCallback)");
                      });
                      break;
                      
                    case "surmesureonscene_" :
                      is_swaping = false;
                      s.visible = true;
                      var surMesureOnSceneFile = deroule.substr(deroule.indexOf("_")+1);
                      loadJs(surMesureOnSceneFile, function(){
                        eval(surMesureOnSceneFile+"(activityCallback)");
                      });
                      break;
                      
                    case "video_" :
                      // init screen
                      s.visible = false;
                      s.gotoAndStop("VIDEO");
                      
                      ResponsiveStage.storeClip("VIDEO", {horizontal:"fixed", vertical:"fixed", html_overlay_id:"video", html_overlay_ref_mc:"video"});
                      
                      WaitNextTick.init(function() {
                        $("#video").css('display', 'inline');
                        $("#video").css('opacity', '1');
                        // Player.getMediaInstance().setPoster("assets/images/videoposter.png"); // ** option **
                        Player.getMediaInstance().setSrc("assets/videos/"+deroule.substr(deroule.indexOf("_")+1)+".mp4");
                        Player.getMediaInstance().play();

                        Player.getMediaElementAddPlayEvent(function(){
                          s.visible = true;
                          canvas.style.opacity = '0';
                          CanvasTransition.init(null, "fadein");
                        });
                        
                        Player.getMediaElementAddEndEvent(activityCallback);
                      });
                      break;
                      
                    default: launchIndex(); break;
                  }
                  
                  is_previous_activity = true;
                }
              }           
            }
          }
        }
        
        function activityCallback(){
          if (JsonHandler.getLine("STORY", index+1).deroule.substr(0,6).toLowerCase() == "titre:"){
            Player.goNext();
          } else {
            launchIndex();
          }
        }
          
        function switchVue(vue){
          s[screen]["scene"].x = s[screen].config[vue][0];
          s[screen]["scene"].y = s[screen].config[vue][1];
          s[screen]["scene"].scaleX = s[screen]["scene"].scaleY = (s[screen].config[vue][2]) / 100;
          if (vue.indexOf("persos") != -1){
            is_zoomed = false;
          } else {
            is_zoomed = true;
          }
        }
        
        function getActualPerso(val){
          if (val == undefined){
            val = "";
          }
          if (val.indexOf("{") == -1){
            return val.toLowerCase();
          } else {
            return val.substr(0, val.indexOf("{")).toLowerCase();
          }
        }
        
        function orientOrientablePerso(){
          var found_next_orient = false;
          var c = 0;
          while (!found_next_orient){
            if (JsonHandler.getLine("STORY", index+c) != undefined){
              if (JsonHandler.getLine("STORY", index+c).deroule.substr(0,6).toLowerCase() == "titre:"){
                found_next_orient = true;
              } else if (getActualPerso(JsonHandler.getLine("STORY", index+c).perso) != orientable_perso.name) {
                var next_perso = getActualPerso(JsonHandler.getLine("STORY", index+(c)).perso);
                if (next_perso != next_perso_to_look_at){
                  if (next_perso != ""){
                    next_perso_to_look_at = next_perso;
                    zoom_on_look_at = true;
                    var pos_on_look_at;
                    for (var i=0; i < s[screen].config.persos.length; i++){
                      if (s[screen].config.persos[i] == next_perso_to_look_at){
                        pos_on_look_at = i+1;
                        break;
                      }
                    }
                    if (pos_on_look_at < orientable_perso.place){
                      s[screen]["scene"]["perso"+orientable_perso.place].scaleX = Math.abs(s[screen]["scene"]["perso"+orientable_perso.place].scaleX);
                    } else {
                      s[screen]["scene"]["perso"+orientable_perso.place].scaleX = Math.abs(s[screen]["scene"]["perso"+orientable_perso.place].scaleX) * -1;
                    }
                  }
                }
                found_next_orient = true;
              }
            }
            c++;
          }

        }
        
        function loadJs(file, callback) {
          if (eval("typeof "+file) === "undefined") {
            var head = document.getElementsByTagName('head')[0];
            var el;
            el = document.createElement('script');
            el.type = 'text/javascript';
            if (el.readyState) {
              el.onreadystatechange = function () {
                if (el.readyState == "loaded" ||
                  el.readyState == "complete") {
                  el.onreadystatechange = null;
                  callback();
                }
              };
            } else {
              el.onreadystatechange = callback;
              el.onload = callback;
            }
            el.src = "assets/app/"+file+".js";
            head.appendChild(el);
          } else {
            callback();
          }
        }
      });
    }
  };
});

}}});
(function(){
	// must use this.require to make this work in node.js
	var require = this.require;
	// consume the cached dojo layer
	require({cache:{}});
	!require.async && require(["dojo"]);
	require.boot && require.apply(null, require.boot);
})();
