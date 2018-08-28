/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "./hot/hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "./hot/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2a284c7a9e76eed76149";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/build";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./app/index.ts")(__webpack_require__.s = "./app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-route */ \"./node_modules/angular-route/index.js\");\n/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_route__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _core_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/core */ \"./app/core/core.ts\");\n/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/routes */ \"./app/routes/routes.ts\");\n\r\n\r\n\r\n // grafana.core\r\n\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.ngModuleDependecies = [\r\n            'grafana.core',\r\n            'ngRoute',\r\n            'grafana'\r\n        ];\r\n    }\r\n    App.prototype.init = function () {\r\n        var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('grafana', []);\r\n        // app.config();\r\n        // app.constant()\r\n        _core_core__WEBPACK_IMPORTED_MODULE_2__[\"coreModule\"].config(_routes_routes__WEBPACK_IMPORTED_MODULE_3__[\"setupNgRoutes\"]);\r\n        angular__WEBPACK_IMPORTED_MODULE_0___default.a.bootstrap(document, this.ngModuleDependecies);\r\n        window.coreModule = _core_core__WEBPACK_IMPORTED_MODULE_2__[\"coreModule\"];\r\n    };\r\n    return App;\r\n}());\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (new App());\r\n\n\n//# sourceURL=webpack:///./app/app.ts?");

/***/ }),

/***/ "./app/core/app_events.ts":
/*!********************************!*\
  !*** ./app/core/app_events.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/emitter */ \"./app/core/utils/emitter.ts\");\n\r\nvar appEvents = new _utils_emitter__WEBPACK_IMPORTED_MODULE_0__[\"Emitter\"]();\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (appEvents);\r\n\n\n//# sourceURL=webpack:///./app/core/app_events.ts?");

/***/ }),

/***/ "./app/core/components/header/header.html":
/*!************************************************!*\
  !*** ./app/core/components/header/header.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\r\\n    <a ng-click=\\\"ctrl.reloadIndex(ctrl.link)\\\">\\r\\n        {{ctrl.logoName}}\\r\\n    </a>\\r\\n    <ul>\\r\\n\\r\\n    </ul>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./app/core/components/header/header.html?");

/***/ }),

/***/ "./app/core/components/header/header.ts":
/*!**********************************************!*\
  !*** ./app/core/components/header/header.ts ***!
  \**********************************************/
/*! exports provided: headerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"headerComponent\", function() { return headerComponent; });\nvar HeaderCtrl = /** @class */ (function () {\r\n    // link: string;\r\n    function HeaderCtrl($scope, $location) {\r\n        this.$location = $location;\r\n        this.logoName = \"grafana\";\r\n    }\r\n    HeaderCtrl.prototype.reloadIndex = function (link) {\r\n        console.log(this.$scope, link);\r\n        this.$location.path(link || \"/\");\r\n        // return this.logoName;\r\n    };\r\n    return HeaderCtrl;\r\n}());\r\nfunction headerComponent() {\r\n    return {\r\n        restrict: 'E',\r\n        scope: {\r\n            link: \"=\"\r\n        },\r\n        template: __webpack_require__(/*! ./header.html */ \"./app/core/components/header/header.html\"),\r\n        controller: HeaderCtrl,\r\n        controllerAs: 'ctrl',\r\n        bindToController: true\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./app/core/components/header/header.ts?");

/***/ }),

/***/ "./app/core/components/index.ts":
/*!**************************************!*\
  !*** ./app/core/components/index.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core */ \"./app/core/core.ts\");\n/* harmony import */ var _root_root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root/root */ \"./app/core/components/root/root.ts\");\n/* harmony import */ var _header_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header */ \"./app/core/components/header/header.ts\");\n\r\n// components\r\n\r\n\r\nvar core = app_core_core__WEBPACK_IMPORTED_MODULE_0__[\"coreModule\"]\r\n    .directive('uiRootContainer', _root_root__WEBPACK_IMPORTED_MODULE_1__[\"rootComponent\"])\r\n    .directive('uiHeader', _header_header__WEBPACK_IMPORTED_MODULE_2__[\"headerComponent\"]);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (core);\r\n\n\n//# sourceURL=webpack:///./app/core/components/index.ts?");

/***/ }),

/***/ "./app/core/components/root/root.ts":
/*!******************************************!*\
  !*** ./app/core/components/root/root.ts ***!
  \******************************************/
/*! exports provided: RootCtrl, rootComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RootCtrl\", function() { return RootCtrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rootComponent\", function() { return rootComponent; });\n/**\r\n * grafana-app container directive\r\n *  child routes using ng-view\r\n */\r\nvar RootCtrl = /** @class */ (function () {\r\n    function RootCtrl($scope, $rootScope) {\r\n    }\r\n    return RootCtrl;\r\n}());\r\n\r\nfunction rootComponent($location) {\r\n    return {\r\n        restrict: 'E',\r\n        controller: RootCtrl,\r\n        link: function (scope, elem) {\r\n        }\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./app/core/components/root/root.ts?");

/***/ }),

/***/ "./app/core/controllers/all.ts":
/*!*************************************!*\
  !*** ./app/core/controllers/all.ts ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_ctrl */ \"./app/core/controllers/index_ctrl.ts\");\n/* harmony import */ var _login_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login_ctrl */ \"./app/core/controllers/login_ctrl.ts\");\n/* harmony import */ var _oauth_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oauth_ctrl */ \"./app/core/controllers/oauth_ctrl.ts\");\n/* harmony import */ var _error_ctrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error_ctrl */ \"./app/core/controllers/error_ctrl.ts\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./app/core/controllers/all.ts?");

/***/ }),

/***/ "./app/core/controllers/error_ctrl.ts":
/*!********************************************!*\
  !*** ./app/core/controllers/error_ctrl.ts ***!
  \********************************************/
/*! exports provided: ErrorCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ErrorCtrl\", function() { return ErrorCtrl; });\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core_module */ \"./app/core/core_module.ts\");\n\r\nvar ErrorCtrl = /** @class */ (function () {\r\n    function ErrorCtrl($scope) {\r\n        $scope.status = '404 Not Found;502 Bad Gateway;302 Permenant Moved;9999';\r\n    }\r\n    return ErrorCtrl;\r\n}());\r\n\r\n_core_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].controller('ErrorCtrl', ErrorCtrl);\r\n\n\n//# sourceURL=webpack:///./app/core/controllers/error_ctrl.ts?");

/***/ }),

/***/ "./app/core/controllers/index_ctrl.ts":
/*!********************************************!*\
  !*** ./app/core/controllers/index_ctrl.ts ***!
  \********************************************/
/*! exports provided: IndexCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IndexCtrl\", function() { return IndexCtrl; });\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core_module */ \"./app/core/core_module.ts\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ \"./node_modules/localforage/dist/localforage.js\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nvar IndexCtrl = /** @class */ (function () {\r\n    function IndexCtrl($scope) {\r\n        this.$scope = $scope;\r\n        $scope.loading = true;\r\n        $scope.name = \"World!\";\r\n        this.getData();\r\n        $scope.type = 'aaa';\r\n        $scope.filter = {\r\n            suggText: 'xxxx'\r\n        };\r\n        $scope.addItem = function () {\r\n            console.log(\"addItem\");\r\n            $scope.orgList.push({\r\n                text: '碧桂园',\r\n                value: '124-532'\r\n            });\r\n        };\r\n        $scope.orgList = [\r\n            {\r\n                text: '链家',\r\n                value: '1234-5678'\r\n            },\r\n            {\r\n                text: '中原',\r\n                value: '9087-4313'\r\n            },\r\n            {\r\n                text: '恒大',\r\n                value: '1235-9421'\r\n            }\r\n        ];\r\n        window.myng = $scope;\r\n        // appEvents.on('oauth:success', (user)=> {\r\n        //     $scope.user = user;\r\n        // })\r\n    }\r\n    IndexCtrl.prototype.getData = function () {\r\n        var _this = this;\r\n        localforage__WEBPACK_IMPORTED_MODULE_1___default.a.getItem('oauth:user')\r\n            .then(function (res) {\r\n            _this.$scope.user = res;\r\n        })\r\n            .catch(function (err) {\r\n            _this.$scope.user = null;\r\n        })\r\n            .then(function () {\r\n            _this.$scope.loading = false;\r\n            _this.$scope.$apply();\r\n        });\r\n    };\r\n    return IndexCtrl;\r\n}());\r\n\r\n_core_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].controller('IndexCtrl', IndexCtrl);\r\n\n\n//# sourceURL=webpack:///./app/core/controllers/index_ctrl.ts?");

/***/ }),

/***/ "./app/core/controllers/login_ctrl.ts":
/*!********************************************!*\
  !*** ./app/core/controllers/login_ctrl.ts ***!
  \********************************************/
/*! exports provided: LoginCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoginCtrl\", function() { return LoginCtrl; });\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core_module */ \"./app/core/core_module.ts\");\n\r\nvar LoginCtrl = /** @class */ (function () {\r\n    function LoginCtrl($scope) {\r\n    }\r\n    return LoginCtrl;\r\n}());\r\n\r\n_core_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].controller('LoginCtrl', LoginCtrl);\r\n\n\n//# sourceURL=webpack:///./app/core/controllers/login_ctrl.ts?");

/***/ }),

/***/ "./app/core/controllers/oauth_ctrl.ts":
/*!********************************************!*\
  !*** ./app/core/controllers/oauth_ctrl.ts ***!
  \********************************************/
/*! exports provided: OauthCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OauthCtrl\", function() { return OauthCtrl; });\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core_module */ \"./app/core/core_module.ts\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ \"./node_modules/localforage/dist/localforage.js\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nvar OauthCtrl = /** @class */ (function () {\r\n    function OauthCtrl($scope, $http, $location) {\r\n        window.curLoc = $location;\r\n        $scope.domain = \"oatuh html\";\r\n        console.log($location);\r\n        var _a = $location.search().code, code = _a === void 0 ? null : _a;\r\n        console.log(code);\r\n        $http.get(\"/api/oauth/github?code=\" + code).then(function (res) {\r\n            if (res.data && res.data.retCode === 0) {\r\n                $scope.user = res.data.data;\r\n                console.log($scope.user, '________________');\r\n                localforage__WEBPACK_IMPORTED_MODULE_1___default.a.setItem('oauth:user', $scope.user).then(function () {\r\n                    // appEvents.emit(\"oauth:success\", $scope.user);\r\n                    console.log(\"****************\");\r\n                    $location.path(\"/\");\r\n                    $location.search('');\r\n                    $location.replace();\r\n                    $scope.$apply();\r\n                }).catch(function (err) {\r\n                    console.log(err);\r\n                });\r\n            }\r\n        }, function (err) {\r\n            alert(\"pull github userinfo failed\");\r\n        });\r\n    }\r\n    return OauthCtrl;\r\n}());\r\n\r\n_core_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].controller('OauthCtrl', OauthCtrl);\r\n\n\n//# sourceURL=webpack:///./app/core/controllers/oauth_ctrl.ts?");

/***/ }),

/***/ "./app/core/core.ts":
/*!**************************!*\
  !*** ./app/core/core.ts ***!
  \**************************/
/*! exports provided: coreModule, appEvents, noop, componentEntry, directiveEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noop\", function() { return noop; });\n/* harmony import */ var app_core_controllers_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/controllers/all */ \"./app/core/controllers/all.ts\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_module */ \"./app/core/core_module.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"coreModule\", function() { return _core_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _app_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app_events */ \"./app/core/app_events.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appEvents\", function() { return _app_events__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ \"./app/core/components/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"componentEntry\", function() { return _components__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives */ \"./app/core/directives/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"directiveEntry\", function() { return _directives__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n\r\n\r\n\r\n// components\r\n\r\n// directives\r\n\r\nfunction noop() { }\r\n\r\n\n\n//# sourceURL=webpack:///./app/core/core.ts?");

/***/ }),

/***/ "./app/core/core_module.ts":
/*!*********************************!*\
  !*** ./app/core/core_module.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('grafana.core', ['ngRoute']));\r\n\n\n//# sourceURL=webpack:///./app/core/core_module.ts?");

/***/ }),

/***/ "./app/core/directives/helloworld/helloworld.html":
/*!********************************************************!*\
  !*** ./app/core/directives/helloworld/helloworld.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>hello world directives</div>\";\n\n//# sourceURL=webpack:///./app/core/directives/helloworld/helloworld.html?");

/***/ }),

/***/ "./app/core/directives/helloworld/helloworld.ts":
/*!******************************************************!*\
  !*** ./app/core/directives/helloworld/helloworld.ts ***!
  \******************************************************/
/*! exports provided: Helloworld, helloworldDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Helloworld\", function() { return Helloworld; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"helloworldDirective\", function() { return helloworldDirective; });\nvar Helloworld = /** @class */ (function () {\r\n    function Helloworld($scope, element, attrs, $controller) {\r\n    }\r\n    return Helloworld;\r\n}());\r\n\r\nfunction helloworldDirective() {\r\n    return {\r\n        restrict: 'EA',\r\n        scope: {},\r\n        template: __webpack_require__(/*! ./helloworld.html */ \"./app/core/directives/helloworld/helloworld.html\"),\r\n        link: Helloworld\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./app/core/directives/helloworld/helloworld.ts?");

/***/ }),

/***/ "./app/core/directives/index.ts":
/*!**************************************!*\
  !*** ./app/core/directives/index.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core */ \"./app/core/core.ts\");\n/* harmony import */ var _helloworld_helloworld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helloworld/helloworld */ \"./app/core/directives/helloworld/helloworld.ts\");\n/* harmony import */ var _suggestion_suggestion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./suggestion/suggestion */ \"./app/core/directives/suggestion/suggestion.ts\");\n\r\n// directives\r\n\r\n\r\nvar core = app_core_core__WEBPACK_IMPORTED_MODULE_0__[\"coreModule\"]\r\n    .directive('uiHelloworld', _helloworld_helloworld__WEBPACK_IMPORTED_MODULE_1__[\"helloworldDirective\"])\r\n    .directive('uiSuggestion', _suggestion_suggestion__WEBPACK_IMPORTED_MODULE_2__[\"suggestionDirective\"]);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (core);\r\n\n\n//# sourceURL=webpack:///./app/core/directives/index.ts?");

/***/ }),

/***/ "./app/core/directives/suggestion/suggestion.html":
/*!********************************************************!*\
  !*** ./app/core/directives/suggestion/suggestion.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\r\\n    <input ng-model=\\\"suggSelectText\\\" readonly type=\\\"text\\\"/>\\r\\n    <span>v</span>\\r\\n    <div>\\r\\n        <button ng-click=\\\"addItem({})\\\">add_one_item</button>\\r\\n        <input placeholder=\\\"杜索\\\" \\r\\n            ng-model=\\\"suggInputText\\\"\\r\\n            />\\r\\n        <ul>\\r\\n            <li\\r\\n                ng-repeat=\\\"item in itemsCopy\\\"\\r\\n            >\\r\\n                <div ng-click=\\\"select(item)\\\">\\r\\n                    {{item.text}}\\r\\n                </div>\\r\\n            </li>\\r\\n        </ul>\\r\\n    </div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./app/core/directives/suggestion/suggestion.html?");

/***/ }),

/***/ "./app/core/directives/suggestion/suggestion.ts":
/*!******************************************************!*\
  !*** ./app/core/directives/suggestion/suggestion.ts ***!
  \******************************************************/
/*! exports provided: SuggestionLink, suggestionDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SuggestionLink\", function() { return SuggestionLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"suggestionDirective\", function() { return suggestionDirective; });\nvar SuggestionLink = /** @class */ (function () {\r\n    function SuggestionLink($scope, element, attrs, $controller) {\r\n        var vm = this;\r\n        console.log($scope);\r\n        $scope.suggInputText = '';\r\n        $scope.$watch('ngModel', function (text) {\r\n            $scope.suggSelectText = $controller.$viewValue;\r\n        });\r\n        $scope.$watch('suggInputText', function (text) {\r\n            if (!text) {\r\n                $scope.itemsCopy = $scope.items;\r\n                return;\r\n            }\r\n            var items = [];\r\n            $scope.items.forEach(function (item) {\r\n                if (item.text.indexOf(text) != -1) {\r\n                    items.push(item);\r\n                }\r\n            });\r\n            $scope.itemsCopy = items;\r\n            $scope.$applyAsync();\r\n        });\r\n        $scope.select = function (item) {\r\n            $scope.suggSelectText = item.text;\r\n            $controller.$setViewValue(item.text);\r\n        };\r\n    }\r\n    return SuggestionLink;\r\n}());\r\n\r\nfunction suggestionDirective() {\r\n    return {\r\n        restrict: 'E',\r\n        replace: true,\r\n        template: __webpack_require__(/*! ./suggestion.html */ \"./app/core/directives/suggestion/suggestion.html\"),\r\n        require: '?ngModel',\r\n        scope: {\r\n            ngModel: '=',\r\n            items: '<data',\r\n            addItem: '&'\r\n        },\r\n        link: SuggestionLink\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./app/core/directives/suggestion/suggestion.ts?");

/***/ }),

/***/ "./app/core/utils/emitter.ts":
/*!***********************************!*\
  !*** ./app/core/utils/emitter.ts ***!
  \***********************************/
/*! exports provided: Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Emitter\", function() { return Emitter; });\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar Emitter = /** @class */ (function () {\r\n    function Emitter() {\r\n        this.emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_0__[\"EventEmitter\"]();\r\n    }\r\n    Emitter.prototype.emit = function (name, data) {\r\n        this.emitter.emit(name, data);\r\n    };\r\n    Emitter.prototype.on = function (name, handler, scope) {\r\n        var _this = this;\r\n        this.emitter.on(name, handler);\r\n        if (scope) {\r\n            var unbind = scope.$on('$destroy', function () {\r\n                _this.emitter.off(name, handler);\r\n                unbind();\r\n            });\r\n        }\r\n    };\r\n    Emitter.prototype.removeAllListeners = function (evt) {\r\n        this.emitter.removeAllListeners(evt);\r\n    };\r\n    Emitter.prototype.off = function (name, handler) {\r\n        this.emitter.off(name, handler);\r\n    };\r\n    return Emitter;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./app/core/utils/emitter.ts?");

/***/ }),

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./app/app.ts\");\n\r\n__webpack_require__(/*! ./style/theme/app.dark.scss */ \"./app/style/theme/app.dark.scss\");\r\n_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\r\n\n\n//# sourceURL=webpack:///./app/index.ts?");

/***/ }),

/***/ "./app/partials/error.html":
/*!*********************************!*\
  !*** ./app/partials/error.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\r\\n    {{status}}  \\r\\n</div>\";\n\n//# sourceURL=webpack:///./app/partials/error.html?");

/***/ }),

/***/ "./app/partials/index.html":
/*!*********************************!*\
  !*** ./app/partials/index.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div ng-show=\\\"!loading\\\">\\r\\n    <ui-header link=\\\"'/login'\\\"></ui-header>\\r\\n    <ui-helloworld></ui-helloworld>\\r\\n    <ui-suggestion \\r\\n        add-item=\\\"addItem()\\\"\\r\\n        v-if=\\\"type == 'aaa'\\\"\\r\\n        ng-model=\\\"filter.suggText\\\" data=\\\"orgList\\\"></ui-suggestion>\\r\\n    <div>\\r\\n        <a href=\\\"/login\\\">Sign in</a>\\r\\n    </div>\\r\\n    <div ng-if=\\\"user\\\">\\r\\n        hello, {{user.login}} \\r\\n        <img ng-src=\\\"{{user.avatar_url}}\\\"/>\\r\\n    </div>\\r\\n</div>\\r\\n<div ng-show=\\\"loading\\\">\\r\\n    Loading...\\r\\n</div>\";\n\n//# sourceURL=webpack:///./app/partials/index.html?");

/***/ }),

/***/ "./app/partials/login.html":
/*!*********************************!*\
  !*** ./app/partials/login.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\r\\n    <div>\\r\\n        <a href=\\\"https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http://grafana.lilyzt.com:8090/auth/github/callback&scope=user:email&client_id=606abe84965df784b124\\\">\\r\\n            github\\r\\n        </a>\\r\\n    </div>\\r\\n    <div>google</div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./app/partials/login.html?");

/***/ }),

/***/ "./app/partials/oauth.html":
/*!*********************************!*\
  !*** ./app/partials/oauth.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\r\\n    domain is: {{domain}}\\r\\n</div>\";\n\n//# sourceURL=webpack:///./app/partials/oauth.html?");

/***/ }),

/***/ "./app/routes/routes.ts":
/*!******************************!*\
  !*** ./app/routes/routes.ts ***!
  \******************************/
/*! exports provided: setupNgRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupNgRoutes\", function() { return setupNgRoutes; });\nfunction setupNgRoutes($routeProvider, $locationProvider) {\r\n    $locationProvider.html5Mode(true);\r\n    $routeProvider\r\n        .when('/', {\r\n        // templateUrl: 'app/partials/index.html',\r\n        template: __webpack_require__(/*! app/partials/index.html */ \"./app/partials/index.html\"),\r\n        controller: 'IndexCtrl',\r\n    })\r\n        .when('/login', {\r\n        template: __webpack_require__(/*! app/partials/login.html */ \"./app/partials/login.html\"),\r\n        controller: 'LoginCtrl'\r\n    })\r\n        .when('/auth/github/callback', {\r\n        template: __webpack_require__(/*! app/partials/oauth.html */ \"./app/partials/oauth.html\"),\r\n        controller: 'OauthCtrl'\r\n    })\r\n        .otherwise({\r\n        // templateUrl: 'app/partials/error.html',\r\n        template: __webpack_require__(/*! app/partials/error.html */ \"./app/partials/error.html\"),\r\n        controller: 'ErrorCtrl'\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./app/routes/routes.ts?");

/***/ }),

/***/ "./app/style/theme/app.dark.scss":
/*!***************************************!*\
  !*** ./app/style/theme/app.dark.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.dark.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/style/theme/app.dark.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.dark.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/style/theme/app.dark.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.dark.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/style/theme/app.dark.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./app/style/theme/app.dark.scss?");

/***/ }),

/***/ "./node_modules/angular-route/angular-route.js":
/*!*****************************************************!*\
  !*** ./node_modules/angular-route/angular-route.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @license AngularJS v1.7.2\n * (c) 2010-2018 Google, Inc. http://angularjs.org\n * License: MIT\n */\n(function(window, angular) {'use strict';\n\n/* global shallowCopy: true */\n\n/**\n * Creates a shallow copy of an object, an array or a primitive.\n *\n * Assumes that there are no proto properties for objects.\n */\nfunction shallowCopy(src, dst) {\n  if (isArray(src)) {\n    dst = dst || [];\n\n    for (var i = 0, ii = src.length; i < ii; i++) {\n      dst[i] = src[i];\n    }\n  } else if (isObject(src)) {\n    dst = dst || {};\n\n    for (var key in src) {\n      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {\n        dst[key] = src[key];\n      }\n    }\n  }\n\n  return dst || src;\n}\n\n/* global shallowCopy: false */\n\n// `isArray` and `isObject` are necessary for `shallowCopy()` (included via `src/shallowCopy.js`).\n// They are initialized inside the `$RouteProvider`, to ensure `window.angular` is available.\nvar isArray;\nvar isObject;\nvar isDefined;\nvar noop;\n\n/**\n * @ngdoc module\n * @name ngRoute\n * @description\n *\n * The `ngRoute` module provides routing and deeplinking services and directives for AngularJS apps.\n *\n * ## Example\n * See {@link ngRoute.$route#examples $route} for an example of configuring and using `ngRoute`.\n *\n */\n/* global -ngRouteModule */\nvar ngRouteModule = angular.\n  module('ngRoute', []).\n  info({ angularVersion: '1.7.2' }).\n  provider('$route', $RouteProvider).\n  // Ensure `$route` will be instantiated in time to capture the initial `$locationChangeSuccess`\n  // event (unless explicitly disabled). This is necessary in case `ngView` is included in an\n  // asynchronously loaded template.\n  run(instantiateRoute);\nvar $routeMinErr = angular.$$minErr('ngRoute');\nvar isEagerInstantiationEnabled;\n\n\n/**\n * @ngdoc provider\n * @name $routeProvider\n * @this\n *\n * @description\n *\n * Used for configuring routes.\n *\n * ## Example\n * See {@link ngRoute.$route#examples $route} for an example of configuring and using `ngRoute`.\n *\n * ## Dependencies\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n */\nfunction $RouteProvider() {\n  isArray = angular.isArray;\n  isObject = angular.isObject;\n  isDefined = angular.isDefined;\n  noop = angular.noop;\n\n  function inherit(parent, extra) {\n    return angular.extend(Object.create(parent), extra);\n  }\n\n  var routes = {};\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#when\n   *\n   * @param {string} path Route path (matched against `$location.path`). If `$location.path`\n   *    contains redundant trailing slash or is missing one, the route will still match and the\n   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the\n   *    route definition.\n   *\n   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up\n   *        to the next slash are matched and stored in `$routeParams` under the given `name`\n   *        when the route matches.\n   *    * `path` can contain named groups starting with a colon and ending with a star:\n   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`\n   *        when the route matches.\n   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.\n   *\n   *    For example, routes like `/color/:color/largecode/:largecode*\\/edit` will match\n   *    `/color/brown/largecode/code/with/slashes/edit` and extract:\n   *\n   *    * `color: brown`\n   *    * `largecode: code/with/slashes`.\n   *\n   *\n   * @param {Object} route Mapping information to be assigned to `$route.current` on route\n   *    match.\n   *\n   *    Object properties:\n   *\n   *    - `controller` – `{(string|Function)=}` – Controller fn that should be associated with\n   *      newly created scope or the name of a {@link angular.Module#controller registered\n   *      controller} if passed as a string.\n   *    - `controllerAs` – `{string=}` – An identifier name for a reference to the controller.\n   *      If present, the controller will be published to scope under the `controllerAs` name.\n   *    - `template` – `{(string|Function)=}` – html template as a string or a function that\n   *      returns an html template as a string which should be used by {@link\n   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.\n   *      This property takes precedence over `templateUrl`.\n   *\n   *      If `template` is a function, it will be called with the following parameters:\n   *\n   *      - `{Array.<Object>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route\n   *\n   *      One of `template` or `templateUrl` is required.\n   *\n   *    - `templateUrl` – `{(string|Function)=}` – path or function that returns a path to an html\n   *      template that should be used by {@link ngRoute.directive:ngView ngView}.\n   *\n   *      If `templateUrl` is a function, it will be called with the following parameters:\n   *\n   *      - `{Array.<Object>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route\n   *\n   *      One of `templateUrl` or `template` is required.\n   *\n   *    - `resolve` - `{Object.<string, Function>=}` - An optional map of dependencies which should\n   *      be injected into the controller. If any of these dependencies are promises, the router\n   *      will wait for them all to be resolved or one to be rejected before the controller is\n   *      instantiated.\n   *      If all the promises are resolved successfully, the values of the resolved promises are\n   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is\n   *      fired. If any of the promises are rejected the\n   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired.\n   *      For easier access to the resolved dependencies from the template, the `resolve` map will\n   *      be available on the scope of the route, under `$resolve` (by default) or a custom name\n   *      specified by the `resolveAs` property (see below). This can be particularly useful, when\n   *      working with {@link angular.Module#component components} as route templates.<br />\n   *      <div class=\"alert alert-warning\">\n   *        **Note:** If your scope already contains a property with this name, it will be hidden\n   *        or overwritten. Make sure, you specify an appropriate name for this property, that\n   *        does not collide with other properties on the scope.\n   *      </div>\n   *      The map object is:\n   *\n   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.\n   *      - `factory` - `{string|Function}`: If `string` then it is an alias for a service.\n   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}\n   *        and the return value is treated as the dependency. If the result is a promise, it is\n   *        resolved before its value is injected into the controller. Be aware that\n   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve\n   *        functions.  Use `$route.current.params` to access the new route parameters, instead.\n   *\n   *    - `resolveAs` - `{string=}` - The name under which the `resolve` map will be available on\n   *      the scope of the route. If omitted, defaults to `$resolve`.\n   *\n   *    - `redirectTo` – `{(string|Function)=}` – value to update\n   *      {@link ng.$location $location} path with and trigger route redirection.\n   *\n   *      If `redirectTo` is a function, it will be called with the following parameters:\n   *\n   *      - `{Object.<string>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route templateUrl.\n   *      - `{string}` - current `$location.path()`\n   *      - `{Object}` - current `$location.search()`\n   *\n   *      The custom `redirectTo` function is expected to return a string which will be used\n   *      to update `$location.url()`. If the function throws an error, no further processing will\n   *      take place and the {@link ngRoute.$route#$routeChangeError $routeChangeError} event will\n   *      be fired.\n   *\n   *      Routes that specify `redirectTo` will not have their controllers, template functions\n   *      or resolves called, the `$location` will be changed to the redirect url and route\n   *      processing will stop. The exception to this is if the `redirectTo` is a function that\n   *      returns `undefined`. In this case the route transition occurs as though there was no\n   *      redirection.\n   *\n   *    - `resolveRedirectTo` – `{Function=}` – a function that will (eventually) return the value\n   *      to update {@link ng.$location $location} URL with and trigger route redirection. In\n   *      contrast to `redirectTo`, dependencies can be injected into `resolveRedirectTo` and the\n   *      return value can be either a string or a promise that will be resolved to a string.\n   *\n   *      Similar to `redirectTo`, if the return value is `undefined` (or a promise that gets\n   *      resolved to `undefined`), no redirection takes place and the route transition occurs as\n   *      though there was no redirection.\n   *\n   *      If the function throws an error or the returned promise gets rejected, no further\n   *      processing will take place and the\n   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event will be fired.\n   *\n   *      `redirectTo` takes precedence over `resolveRedirectTo`, so specifying both on the same\n   *      route definition, will cause the latter to be ignored.\n   *\n   *    - `[reloadOnUrl=true]` - `{boolean=}` - reload route when any part of the URL changes\n   *      (inluding the path) even if the new URL maps to the same route.\n   *\n   *      If the option is set to `false` and the URL in the browser changes, but the new URL maps\n   *      to the same route, then a `$routeUpdate` event is broadcasted on the root scope (without\n   *      reloading the route).\n   *\n   *    - `[reloadOnSearch=true]` - `{boolean=}` - reload route when only `$location.search()`\n   *      or `$location.hash()` changes.\n   *\n   *      If the option is set to `false` and the URL in the browser changes, then a `$routeUpdate`\n   *      event is broadcasted on the root scope (without reloading the route).\n   *\n   *      <div class=\"alert alert-warning\">\n   *        **Note:** This option has no effect if `reloadOnUrl` is set to `false`.\n   *      </div>\n   *\n   *    - `[caseInsensitiveMatch=false]` - `{boolean=}` - match routes without being case sensitive\n   *\n   *      If the option is set to `true`, then the particular route can be matched without being\n   *      case sensitive\n   *\n   * @returns {Object} self\n   *\n   * @description\n   * Adds a new route definition to the `$route` service.\n   */\n  this.when = function(path, route) {\n    //copy original route object to preserve params inherited from proto chain\n    var routeCopy = shallowCopy(route);\n    if (angular.isUndefined(routeCopy.reloadOnUrl)) {\n      routeCopy.reloadOnUrl = true;\n    }\n    if (angular.isUndefined(routeCopy.reloadOnSearch)) {\n      routeCopy.reloadOnSearch = true;\n    }\n    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {\n      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;\n    }\n    routes[path] = angular.extend(\n      routeCopy,\n      path && pathRegExp(path, routeCopy)\n    );\n\n    // create redirection for trailing slashes\n    if (path) {\n      var redirectPath = (path[path.length - 1] === '/')\n            ? path.substr(0, path.length - 1)\n            : path + '/';\n\n      routes[redirectPath] = angular.extend(\n        {redirectTo: path},\n        pathRegExp(redirectPath, routeCopy)\n      );\n    }\n\n    return this;\n  };\n\n  /**\n   * @ngdoc property\n   * @name $routeProvider#caseInsensitiveMatch\n   * @description\n   *\n   * A boolean property indicating if routes defined\n   * using this provider should be matched using a case insensitive\n   * algorithm. Defaults to `false`.\n   */\n  this.caseInsensitiveMatch = false;\n\n   /**\n    * @param path {string} path\n    * @param opts {Object} options\n    * @return {?Object}\n    *\n    * @description\n    * Normalizes the given path, returning a regular expression\n    * and the original path.\n    *\n    * Inspired by pathRexp in visionmedia/express/lib/utils.js.\n    */\n  function pathRegExp(path, opts) {\n    var insensitive = opts.caseInsensitiveMatch,\n        ret = {\n          originalPath: path,\n          regexp: path\n        },\n        keys = ret.keys = [];\n\n    path = path\n      .replace(/([().])/g, '\\\\$1')\n      .replace(/(\\/)?:(\\w+)(\\*\\?|[?*])?/g, function(_, slash, key, option) {\n        var optional = (option === '?' || option === '*?') ? '?' : null;\n        var star = (option === '*' || option === '*?') ? '*' : null;\n        keys.push({ name: key, optional: !!optional });\n        slash = slash || '';\n        return ''\n          + (optional ? '' : slash)\n          + '(?:'\n          + (optional ? slash : '')\n          + (star && '(.+?)' || '([^/]+)')\n          + (optional || '')\n          + ')'\n          + (optional || '');\n      })\n      .replace(/([/$*])/g, '\\\\$1');\n\n    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');\n    return ret;\n  }\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#otherwise\n   *\n   * @description\n   * Sets route definition that will be used on route change when no other route definition\n   * is matched.\n   *\n   * @param {Object|string} params Mapping information to be assigned to `$route.current`.\n   * If called with a string, the value maps to `redirectTo`.\n   * @returns {Object} self\n   */\n  this.otherwise = function(params) {\n    if (typeof params === 'string') {\n      params = {redirectTo: params};\n    }\n    this.when(null, params);\n    return this;\n  };\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#eagerInstantiationEnabled\n   * @kind function\n   *\n   * @description\n   * Call this method as a setter to enable/disable eager instantiation of the\n   * {@link ngRoute.$route $route} service upon application bootstrap. You can also call it as a\n   * getter (i.e. without any arguments) to get the current value of the\n   * `eagerInstantiationEnabled` flag.\n   *\n   * Instantiating `$route` early is necessary for capturing the initial\n   * {@link ng.$location#$locationChangeStart $locationChangeStart} event and navigating to the\n   * appropriate route. Usually, `$route` is instantiated in time by the\n   * {@link ngRoute.ngView ngView} directive. Yet, in cases where `ngView` is included in an\n   * asynchronously loaded template (e.g. in another directive's template), the directive factory\n   * might not be called soon enough for `$route` to be instantiated _before_ the initial\n   * `$locationChangeSuccess` event is fired. Eager instantiation ensures that `$route` is always\n   * instantiated in time, regardless of when `ngView` will be loaded.\n   *\n   * The default value is true.\n   *\n   * **Note**:<br />\n   * You may want to disable the default behavior when unit-testing modules that depend on\n   * `ngRoute`, in order to avoid an unexpected request for the default route's template.\n   *\n   * @param {boolean=} enabled - If provided, update the internal `eagerInstantiationEnabled` flag.\n   *\n   * @returns {*} The current value of the `eagerInstantiationEnabled` flag if used as a getter or\n   *     itself (for chaining) if used as a setter.\n   */\n  isEagerInstantiationEnabled = true;\n  this.eagerInstantiationEnabled = function eagerInstantiationEnabled(enabled) {\n    if (isDefined(enabled)) {\n      isEagerInstantiationEnabled = enabled;\n      return this;\n    }\n\n    return isEagerInstantiationEnabled;\n  };\n\n\n  this.$get = ['$rootScope',\n               '$location',\n               '$routeParams',\n               '$q',\n               '$injector',\n               '$templateRequest',\n               '$sce',\n               '$browser',\n      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce, $browser) {\n\n    /**\n     * @ngdoc service\n     * @name $route\n     * @requires $location\n     * @requires $routeParams\n     *\n     * @property {Object} current Reference to the current route definition.\n     * The route definition contains:\n     *\n     *   - `controller`: The controller constructor as defined in the route definition.\n     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for\n     *     controller instantiation. The `locals` contain\n     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:\n     *\n     *     - `$scope` - The current route scope.\n     *     - `$template` - The current route template HTML.\n     *\n     *     The `locals` will be assigned to the route scope's `$resolve` property. You can override\n     *     the property name, using `resolveAs` in the route definition. See\n     *     {@link ngRoute.$routeProvider $routeProvider} for more info.\n     *\n     * @property {Object} routes Object with all route configuration Objects as its properties.\n     *\n     * @description\n     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).\n     * It watches `$location.url()` and tries to map the path to an existing route definition.\n     *\n     * Requires the {@link ngRoute `ngRoute`} module to be installed.\n     *\n     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.\n     *\n     * The `$route` service is typically used in conjunction with the\n     * {@link ngRoute.directive:ngView `ngView`} directive and the\n     * {@link ngRoute.$routeParams `$routeParams`} service.\n     *\n     * @example\n     * This example shows how changing the URL hash causes the `$route` to match a route against the\n     * URL, and the `ngView` pulls in the partial.\n     *\n     * <example name=\"$route-service\" module=\"ngRouteExample\"\n     *          deps=\"angular-route.js\" fixBase=\"true\">\n     *   <file name=\"index.html\">\n     *     <div ng-controller=\"MainController\">\n     *       Choose:\n     *       <a href=\"Book/Moby\">Moby</a> |\n     *       <a href=\"Book/Moby/ch/1\">Moby: Ch1</a> |\n     *       <a href=\"Book/Gatsby\">Gatsby</a> |\n     *       <a href=\"Book/Gatsby/ch/4?key=value\">Gatsby: Ch4</a> |\n     *       <a href=\"Book/Scarlet\">Scarlet Letter</a><br/>\n     *\n     *       <div ng-view></div>\n     *\n     *       <hr />\n     *\n     *       <pre>$location.path() = {{$location.path()}}</pre>\n     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>\n     *       <pre>$route.current.params = {{$route.current.params}}</pre>\n     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>\n     *       <pre>$routeParams = {{$routeParams}}</pre>\n     *     </div>\n     *   </file>\n     *\n     *   <file name=\"book.html\">\n     *     controller: {{name}}<br />\n     *     Book Id: {{params.bookId}}<br />\n     *   </file>\n     *\n     *   <file name=\"chapter.html\">\n     *     controller: {{name}}<br />\n     *     Book Id: {{params.bookId}}<br />\n     *     Chapter Id: {{params.chapterId}}\n     *   </file>\n     *\n     *   <file name=\"script.js\">\n     *     angular.module('ngRouteExample', ['ngRoute'])\n     *\n     *      .controller('MainController', function($scope, $route, $routeParams, $location) {\n     *          $scope.$route = $route;\n     *          $scope.$location = $location;\n     *          $scope.$routeParams = $routeParams;\n     *      })\n     *\n     *      .controller('BookController', function($scope, $routeParams) {\n     *          $scope.name = 'BookController';\n     *          $scope.params = $routeParams;\n     *      })\n     *\n     *      .controller('ChapterController', function($scope, $routeParams) {\n     *          $scope.name = 'ChapterController';\n     *          $scope.params = $routeParams;\n     *      })\n     *\n     *     .config(function($routeProvider, $locationProvider) {\n     *       $routeProvider\n     *        .when('/Book/:bookId', {\n     *         templateUrl: 'book.html',\n     *         controller: 'BookController',\n     *         resolve: {\n     *           // I will cause a 1 second delay\n     *           delay: function($q, $timeout) {\n     *             var delay = $q.defer();\n     *             $timeout(delay.resolve, 1000);\n     *             return delay.promise;\n     *           }\n     *         }\n     *       })\n     *       .when('/Book/:bookId/ch/:chapterId', {\n     *         templateUrl: 'chapter.html',\n     *         controller: 'ChapterController'\n     *       });\n     *\n     *       // configure html5 to get links working on jsfiddle\n     *       $locationProvider.html5Mode(true);\n     *     });\n     *\n     *   </file>\n     *\n     *   <file name=\"protractor.js\" type=\"protractor\">\n     *     it('should load and compile correct template', function() {\n     *       element(by.linkText('Moby: Ch1')).click();\n     *       var content = element(by.css('[ng-view]')).getText();\n     *       expect(content).toMatch(/controller: ChapterController/);\n     *       expect(content).toMatch(/Book Id: Moby/);\n     *       expect(content).toMatch(/Chapter Id: 1/);\n     *\n     *       element(by.partialLinkText('Scarlet')).click();\n     *\n     *       content = element(by.css('[ng-view]')).getText();\n     *       expect(content).toMatch(/controller: BookController/);\n     *       expect(content).toMatch(/Book Id: Scarlet/);\n     *     });\n     *   </file>\n     * </example>\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeStart\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted before a route change. At this  point the route services starts\n     * resolving all of the dependencies needed for the route change to occur.\n     * Typically this involves fetching the view template as well as any dependencies\n     * defined in `resolve` route property. Once  all of the dependencies are resolved\n     * `$routeChangeSuccess` is fired.\n     *\n     * The route change (and the `$location` change that triggered it) can be prevented\n     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}\n     * for more details about event object.\n     *\n     * @param {Object} angularEvent Synthetic event object.\n     * @param {Route} next Future route information.\n     * @param {Route} current Current route information.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeSuccess\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted after a route change has happened successfully.\n     * The `resolve` dependencies are now available in the `current.locals` property.\n     *\n     * {@link ngRoute.directive:ngView ngView} listens for the directive\n     * to instantiate the controller and render the view.\n     *\n     * @param {Object} angularEvent Synthetic event object.\n     * @param {Route} current Current route information.\n     * @param {Route|Undefined} previous Previous route information, or undefined if current is\n     * first route entered.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeError\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted if a redirection function fails or any redirection or resolve promises are\n     * rejected.\n     *\n     * @param {Object} angularEvent Synthetic event object\n     * @param {Route} current Current route information.\n     * @param {Route} previous Previous route information.\n     * @param {Route} rejection The thrown error or the rejection reason of the promise. Usually\n     * the rejection reason is the error that caused the promise to get rejected.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeUpdate\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted if the same instance of a route (including template, controller instance,\n     * resolved dependencies, etc.) is being reused. This can happen if either `reloadOnSearch` or\n     * `reloadOnUrl` has been set to `false`.\n     *\n     * @param {Object} angularEvent Synthetic event object\n     * @param {Route} current Current/previous route information.\n     */\n\n    var forceReload = false,\n        preparedRoute,\n        preparedRouteIsUpdateOnly,\n        $route = {\n          routes: routes,\n\n          /**\n           * @ngdoc method\n           * @name $route#reload\n           *\n           * @description\n           * Causes `$route` service to reload the current route even if\n           * {@link ng.$location $location} hasn't changed.\n           *\n           * As a result of that, {@link ngRoute.directive:ngView ngView}\n           * creates new scope and reinstantiates the controller.\n           */\n          reload: function() {\n            forceReload = true;\n\n            var fakeLocationEvent = {\n              defaultPrevented: false,\n              preventDefault: function fakePreventDefault() {\n                this.defaultPrevented = true;\n                forceReload = false;\n              }\n            };\n\n            $rootScope.$evalAsync(function() {\n              prepareRoute(fakeLocationEvent);\n              if (!fakeLocationEvent.defaultPrevented) commitRoute();\n            });\n          },\n\n          /**\n           * @ngdoc method\n           * @name $route#updateParams\n           *\n           * @description\n           * Causes `$route` service to update the current URL, replacing\n           * current route parameters with those specified in `newParams`.\n           * Provided property names that match the route's path segment\n           * definitions will be interpolated into the location's path, while\n           * remaining properties will be treated as query params.\n           *\n           * @param {!Object<string, string>} newParams mapping of URL parameter names to values\n           */\n          updateParams: function(newParams) {\n            if (this.current && this.current.$$route) {\n              newParams = angular.extend({}, this.current.params, newParams);\n              $location.path(interpolate(this.current.$$route.originalPath, newParams));\n              // interpolate modifies newParams, only query params are left\n              $location.search(newParams);\n            } else {\n              throw $routeMinErr('norout', 'Tried updating route with no current route');\n            }\n          }\n        };\n\n    $rootScope.$on('$locationChangeStart', prepareRoute);\n    $rootScope.$on('$locationChangeSuccess', commitRoute);\n\n    return $route;\n\n    /////////////////////////////////////////////////////\n\n    /**\n     * @param on {string} current url\n     * @param route {Object} route regexp to match the url against\n     * @return {?Object}\n     *\n     * @description\n     * Check if the route matches the current url.\n     *\n     * Inspired by match in\n     * visionmedia/express/lib/router/router.js.\n     */\n    function switchRouteMatcher(on, route) {\n      var keys = route.keys,\n          params = {};\n\n      if (!route.regexp) return null;\n\n      var m = route.regexp.exec(on);\n      if (!m) return null;\n\n      for (var i = 1, len = m.length; i < len; ++i) {\n        var key = keys[i - 1];\n\n        var val = m[i];\n\n        if (key && val) {\n          params[key.name] = val;\n        }\n      }\n      return params;\n    }\n\n    function prepareRoute($locationEvent) {\n      var lastRoute = $route.current;\n\n      preparedRoute = parseRoute();\n      preparedRouteIsUpdateOnly = isNavigationUpdateOnly(preparedRoute, lastRoute);\n\n      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {\n        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {\n          if ($locationEvent) {\n            $locationEvent.preventDefault();\n          }\n        }\n      }\n    }\n\n    function commitRoute() {\n      var lastRoute = $route.current;\n      var nextRoute = preparedRoute;\n\n      if (preparedRouteIsUpdateOnly) {\n        lastRoute.params = nextRoute.params;\n        angular.copy(lastRoute.params, $routeParams);\n        $rootScope.$broadcast('$routeUpdate', lastRoute);\n      } else if (nextRoute || lastRoute) {\n        forceReload = false;\n        $route.current = nextRoute;\n\n        var nextRoutePromise = $q.resolve(nextRoute);\n\n        $browser.$$incOutstandingRequestCount();\n\n        nextRoutePromise.\n          then(getRedirectionData).\n          then(handlePossibleRedirection).\n          then(function(keepProcessingRoute) {\n            return keepProcessingRoute && nextRoutePromise.\n              then(resolveLocals).\n              then(function(locals) {\n                // after route change\n                if (nextRoute === $route.current) {\n                  if (nextRoute) {\n                    nextRoute.locals = locals;\n                    angular.copy(nextRoute.params, $routeParams);\n                  }\n                  $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);\n                }\n              });\n          }).catch(function(error) {\n            if (nextRoute === $route.current) {\n              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);\n            }\n          }).finally(function() {\n            // Because `commitRoute()` is called from a `$rootScope.$evalAsync` block (see\n            // `$locationWatch`), this `$$completeOutstandingRequest()` call will not cause\n            // `outstandingRequestCount` to hit zero.  This is important in case we are redirecting\n            // to a new route which also requires some asynchronous work.\n\n            $browser.$$completeOutstandingRequest(noop);\n          });\n      }\n    }\n\n    function getRedirectionData(route) {\n      var data = {\n        route: route,\n        hasRedirection: false\n      };\n\n      if (route) {\n        if (route.redirectTo) {\n          if (angular.isString(route.redirectTo)) {\n            data.path = interpolate(route.redirectTo, route.params);\n            data.search = route.params;\n            data.hasRedirection = true;\n          } else {\n            var oldPath = $location.path();\n            var oldSearch = $location.search();\n            var newUrl = route.redirectTo(route.pathParams, oldPath, oldSearch);\n\n            if (angular.isDefined(newUrl)) {\n              data.url = newUrl;\n              data.hasRedirection = true;\n            }\n          }\n        } else if (route.resolveRedirectTo) {\n          return $q.\n            resolve($injector.invoke(route.resolveRedirectTo)).\n            then(function(newUrl) {\n              if (angular.isDefined(newUrl)) {\n                data.url = newUrl;\n                data.hasRedirection = true;\n              }\n\n              return data;\n            });\n        }\n      }\n\n      return data;\n    }\n\n    function handlePossibleRedirection(data) {\n      var keepProcessingRoute = true;\n\n      if (data.route !== $route.current) {\n        keepProcessingRoute = false;\n      } else if (data.hasRedirection) {\n        var oldUrl = $location.url();\n        var newUrl = data.url;\n\n        if (newUrl) {\n          $location.\n            url(newUrl).\n            replace();\n        } else {\n          newUrl = $location.\n            path(data.path).\n            search(data.search).\n            replace().\n            url();\n        }\n\n        if (newUrl !== oldUrl) {\n          // Exit out and don't process current next value,\n          // wait for next location change from redirect\n          keepProcessingRoute = false;\n        }\n      }\n\n      return keepProcessingRoute;\n    }\n\n    function resolveLocals(route) {\n      if (route) {\n        var locals = angular.extend({}, route.resolve);\n        angular.forEach(locals, function(value, key) {\n          locals[key] = angular.isString(value) ?\n              $injector.get(value) :\n              $injector.invoke(value, null, null, key);\n        });\n        var template = getTemplateFor(route);\n        if (angular.isDefined(template)) {\n          locals['$template'] = template;\n        }\n        return $q.all(locals);\n      }\n    }\n\n    function getTemplateFor(route) {\n      var template, templateUrl;\n      if (angular.isDefined(template = route.template)) {\n        if (angular.isFunction(template)) {\n          template = template(route.params);\n        }\n      } else if (angular.isDefined(templateUrl = route.templateUrl)) {\n        if (angular.isFunction(templateUrl)) {\n          templateUrl = templateUrl(route.params);\n        }\n        if (angular.isDefined(templateUrl)) {\n          route.loadedTemplateUrl = $sce.valueOf(templateUrl);\n          template = $templateRequest(templateUrl);\n        }\n      }\n      return template;\n    }\n\n    /**\n     * @returns {Object} the current active route, by matching it against the URL\n     */\n    function parseRoute() {\n      // Match a route\n      var params, match;\n      angular.forEach(routes, function(route, path) {\n        if (!match && (params = switchRouteMatcher($location.path(), route))) {\n          match = inherit(route, {\n            params: angular.extend({}, $location.search(), params),\n            pathParams: params});\n          match.$$route = route;\n        }\n      });\n      // No route matched; fallback to \"otherwise\" route\n      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});\n    }\n\n    /**\n     * @param {Object} newRoute - The new route configuration (as returned by `parseRoute()`).\n     * @param {Object} oldRoute - The previous route configuration (as returned by `parseRoute()`).\n     * @returns {boolean} Whether this is an \"update-only\" navigation, i.e. the URL maps to the same\n     *                    route and it can be reused (based on the config and the type of change).\n     */\n    function isNavigationUpdateOnly(newRoute, oldRoute) {\n      // IF this is not a forced reload\n      return !forceReload\n          // AND both `newRoute`/`oldRoute` are defined\n          && newRoute && oldRoute\n          // AND they map to the same Route Definition Object\n          && (newRoute.$$route === oldRoute.$$route)\n          // AND `reloadOnUrl` is disabled\n          && (!newRoute.reloadOnUrl\n              // OR `reloadOnSearch` is disabled\n              || (!newRoute.reloadOnSearch\n                  // AND both routes have the same path params\n                  && angular.equals(newRoute.pathParams, oldRoute.pathParams)\n              )\n          );\n    }\n\n    /**\n     * @returns {string} interpolation of the redirect path with the parameters\n     */\n    function interpolate(string, params) {\n      var result = [];\n      angular.forEach((string || '').split(':'), function(segment, i) {\n        if (i === 0) {\n          result.push(segment);\n        } else {\n          var segmentMatch = segment.match(/(\\w+)(?:[?*])?(.*)/);\n          var key = segmentMatch[1];\n          result.push(params[key]);\n          result.push(segmentMatch[2] || '');\n          delete params[key];\n        }\n      });\n      return result.join('');\n    }\n  }];\n}\n\ninstantiateRoute.$inject = ['$injector'];\nfunction instantiateRoute($injector) {\n  if (isEagerInstantiationEnabled) {\n    // Instantiate `$route`\n    $injector.get('$route');\n  }\n}\n\nngRouteModule.provider('$routeParams', $RouteParamsProvider);\n\n\n/**\n * @ngdoc service\n * @name $routeParams\n * @requires $route\n * @this\n *\n * @description\n * The `$routeParams` service allows you to retrieve the current set of route parameters.\n *\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n *\n * The route parameters are a combination of {@link ng.$location `$location`}'s\n * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.\n * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.\n *\n * In case of parameter name collision, `path` params take precedence over `search` params.\n *\n * The service guarantees that the identity of the `$routeParams` object will remain unchanged\n * (but its properties will likely change) even when a route change occurs.\n *\n * Note that the `$routeParams` are only updated *after* a route change completes successfully.\n * This means that you cannot rely on `$routeParams` being correct in route resolve functions.\n * Instead you can use `$route.current.params` to access the new route's parameters.\n *\n * @example\n * ```js\n *  // Given:\n *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby\n *  // Route: /Chapter/:chapterId/Section/:sectionId\n *  //\n *  // Then\n *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}\n * ```\n */\nfunction $RouteParamsProvider() {\n  this.$get = function() { return {}; };\n}\n\nngRouteModule.directive('ngView', ngViewFactory);\nngRouteModule.directive('ngView', ngViewFillContentFactory);\n\n\n/**\n * @ngdoc directive\n * @name ngView\n * @restrict ECA\n *\n * @description\n * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by\n * including the rendered template of the current route into the main layout (`index.html`) file.\n * Every time the current route changes, the included view changes with it according to the\n * configuration of the `$route` service.\n *\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n *\n * @animations\n * | Animation                        | Occurs                              |\n * |----------------------------------|-------------------------------------|\n * | {@link ng.$animate#enter enter}  | when the new element is inserted to the DOM |\n * | {@link ng.$animate#leave leave}  | when the old element is removed from to the DOM  |\n *\n * The enter and leave animation occur concurrently.\n *\n * @scope\n * @priority 400\n * @param {string=} onload Expression to evaluate whenever the view updates.\n *\n * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll\n *                  $anchorScroll} to scroll the viewport after the view is updated.\n *\n *                  - If the attribute is not set, disable scrolling.\n *                  - If the attribute is set without value, enable scrolling.\n *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated\n *                    as an expression yields a truthy value.\n * @example\n    <example name=\"ngView-directive\" module=\"ngViewExample\"\n             deps=\"angular-route.js;angular-animate.js\"\n             animations=\"true\" fixBase=\"true\">\n      <file name=\"index.html\">\n        <div ng-controller=\"MainCtrl as main\">\n          Choose:\n          <a href=\"Book/Moby\">Moby</a> |\n          <a href=\"Book/Moby/ch/1\">Moby: Ch1</a> |\n          <a href=\"Book/Gatsby\">Gatsby</a> |\n          <a href=\"Book/Gatsby/ch/4?key=value\">Gatsby: Ch4</a> |\n          <a href=\"Book/Scarlet\">Scarlet Letter</a><br/>\n\n          <div class=\"view-animate-container\">\n            <div ng-view class=\"view-animate\"></div>\n          </div>\n          <hr />\n\n          <pre>$location.path() = {{main.$location.path()}}</pre>\n          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>\n          <pre>$route.current.params = {{main.$route.current.params}}</pre>\n          <pre>$routeParams = {{main.$routeParams}}</pre>\n        </div>\n      </file>\n\n      <file name=\"book.html\">\n        <div>\n          controller: {{book.name}}<br />\n          Book Id: {{book.params.bookId}}<br />\n        </div>\n      </file>\n\n      <file name=\"chapter.html\">\n        <div>\n          controller: {{chapter.name}}<br />\n          Book Id: {{chapter.params.bookId}}<br />\n          Chapter Id: {{chapter.params.chapterId}}\n        </div>\n      </file>\n\n      <file name=\"animations.css\">\n        .view-animate-container {\n          position:relative;\n          height:100px!important;\n          background:white;\n          border:1px solid black;\n          height:40px;\n          overflow:hidden;\n        }\n\n        .view-animate {\n          padding:10px;\n        }\n\n        .view-animate.ng-enter, .view-animate.ng-leave {\n          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;\n\n          display:block;\n          width:100%;\n          border-left:1px solid black;\n\n          position:absolute;\n          top:0;\n          left:0;\n          right:0;\n          bottom:0;\n          padding:10px;\n        }\n\n        .view-animate.ng-enter {\n          left:100%;\n        }\n        .view-animate.ng-enter.ng-enter-active {\n          left:0;\n        }\n        .view-animate.ng-leave.ng-leave-active {\n          left:-100%;\n        }\n      </file>\n\n      <file name=\"script.js\">\n        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])\n          .config(['$routeProvider', '$locationProvider',\n            function($routeProvider, $locationProvider) {\n              $routeProvider\n                .when('/Book/:bookId', {\n                  templateUrl: 'book.html',\n                  controller: 'BookCtrl',\n                  controllerAs: 'book'\n                })\n                .when('/Book/:bookId/ch/:chapterId', {\n                  templateUrl: 'chapter.html',\n                  controller: 'ChapterCtrl',\n                  controllerAs: 'chapter'\n                });\n\n              $locationProvider.html5Mode(true);\n          }])\n          .controller('MainCtrl', ['$route', '$routeParams', '$location',\n            function MainCtrl($route, $routeParams, $location) {\n              this.$route = $route;\n              this.$location = $location;\n              this.$routeParams = $routeParams;\n          }])\n          .controller('BookCtrl', ['$routeParams', function BookCtrl($routeParams) {\n            this.name = 'BookCtrl';\n            this.params = $routeParams;\n          }])\n          .controller('ChapterCtrl', ['$routeParams', function ChapterCtrl($routeParams) {\n            this.name = 'ChapterCtrl';\n            this.params = $routeParams;\n          }]);\n\n      </file>\n\n      <file name=\"protractor.js\" type=\"protractor\">\n        it('should load and compile correct template', function() {\n          element(by.linkText('Moby: Ch1')).click();\n          var content = element(by.css('[ng-view]')).getText();\n          expect(content).toMatch(/controller: ChapterCtrl/);\n          expect(content).toMatch(/Book Id: Moby/);\n          expect(content).toMatch(/Chapter Id: 1/);\n\n          element(by.partialLinkText('Scarlet')).click();\n\n          content = element(by.css('[ng-view]')).getText();\n          expect(content).toMatch(/controller: BookCtrl/);\n          expect(content).toMatch(/Book Id: Scarlet/);\n        });\n      </file>\n    </example>\n */\n\n\n/**\n * @ngdoc event\n * @name ngView#$viewContentLoaded\n * @eventType emit on the current ngView scope\n * @description\n * Emitted every time the ngView content is reloaded.\n */\nngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];\nfunction ngViewFactory($route, $anchorScroll, $animate) {\n  return {\n    restrict: 'ECA',\n    terminal: true,\n    priority: 400,\n    transclude: 'element',\n    link: function(scope, $element, attr, ctrl, $transclude) {\n        var currentScope,\n            currentElement,\n            previousLeaveAnimation,\n            autoScrollExp = attr.autoscroll,\n            onloadExp = attr.onload || '';\n\n        scope.$on('$routeChangeSuccess', update);\n        update();\n\n        function cleanupLastView() {\n          if (previousLeaveAnimation) {\n            $animate.cancel(previousLeaveAnimation);\n            previousLeaveAnimation = null;\n          }\n\n          if (currentScope) {\n            currentScope.$destroy();\n            currentScope = null;\n          }\n          if (currentElement) {\n            previousLeaveAnimation = $animate.leave(currentElement);\n            previousLeaveAnimation.done(function(response) {\n              if (response !== false) previousLeaveAnimation = null;\n            });\n            currentElement = null;\n          }\n        }\n\n        function update() {\n          var locals = $route.current && $route.current.locals,\n              template = locals && locals.$template;\n\n          if (angular.isDefined(template)) {\n            var newScope = scope.$new();\n            var current = $route.current;\n\n            // Note: This will also link all children of ng-view that were contained in the original\n            // html. If that content contains controllers, ... they could pollute/change the scope.\n            // However, using ng-view on an element with additional content does not make sense...\n            // Note: We can't remove them in the cloneAttchFn of $transclude as that\n            // function is called before linking the content, which would apply child\n            // directives to non existing elements.\n            var clone = $transclude(newScope, function(clone) {\n              $animate.enter(clone, null, currentElement || $element).done(function onNgViewEnter(response) {\n                if (response !== false && angular.isDefined(autoScrollExp)\n                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {\n                  $anchorScroll();\n                }\n              });\n              cleanupLastView();\n            });\n\n            currentElement = clone;\n            currentScope = current.scope = newScope;\n            currentScope.$emit('$viewContentLoaded');\n            currentScope.$eval(onloadExp);\n          } else {\n            cleanupLastView();\n          }\n        }\n    }\n  };\n}\n\n// This directive is called during the $transclude call of the first `ngView` directive.\n// It will replace and compile the content of the element with the loaded template.\n// We need this directive so that the element content is already filled when\n// the link function of another directive on the same element as ngView\n// is called.\nngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];\nfunction ngViewFillContentFactory($compile, $controller, $route) {\n  return {\n    restrict: 'ECA',\n    priority: -400,\n    link: function(scope, $element) {\n      var current = $route.current,\n          locals = current.locals;\n\n      $element.html(locals.$template);\n\n      var link = $compile($element.contents());\n\n      if (current.controller) {\n        locals.$scope = scope;\n        var controller = $controller(current.controller, locals);\n        if (current.controllerAs) {\n          scope[current.controllerAs] = controller;\n        }\n        $element.data('$ngControllerController', controller);\n        $element.children().data('$ngControllerController', controller);\n      }\n      scope[current.resolveAs || '$resolve'] = locals;\n\n      link(scope);\n    }\n  };\n}\n\n\n})(window, window.angular);\n\n\n//# sourceURL=webpack:///./node_modules/angular-route/angular-route.js?");

/***/ }),

/***/ "./node_modules/angular-route/index.js":
/*!*********************************************!*\
  !*** ./node_modules/angular-route/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./angular-route */ \"./node_modules/angular-route/angular-route.js\");\nmodule.exports = 'ngRoute';\n\n\n//# sourceURL=webpack:///./node_modules/angular-route/index.js?");

/***/ }),

/***/ "./node_modules/angular/angular.js":
/*!*****************************************!*\
  !*** ./node_modules/angular/angular.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/***/ }),

/***/ "./node_modules/angular/index.js":
/*!***************************************!*\
  !*** ./node_modules/angular/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./angular */ \"./node_modules/angular/angular.js\");\nmodule.exports = angular;\n\n\n//# sourceURL=webpack:///./node_modules/angular/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/style/theme/app.dark.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app/style/theme/app.dark.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"body {\\n  background-color: #fff !important; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./app/style/theme/app.dark.scss?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif (true) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack:///./node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./node_modules/localforage/dist/localforage.js":
/*!******************************************************!*\
  !*** ./node_modules/localforage/dist/localforage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!\n    localForage -- Offline Storage, Improved\n    Version 1.7.2\n    https://localforage.github.io/localForage\n    (c) 2013-2017 Mozilla, Apache License 2.0\n*/\n(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw (f.code=\"MODULE_NOT_FOUND\", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){\n(function (global){\n'use strict';\nvar Mutation = global.MutationObserver || global.WebKitMutationObserver;\n\nvar scheduleDrain;\n\n{\n  if (Mutation) {\n    var called = 0;\n    var observer = new Mutation(nextTick);\n    var element = global.document.createTextNode('');\n    observer.observe(element, {\n      characterData: true\n    });\n    scheduleDrain = function () {\n      element.data = (called = ++called % 2);\n    };\n  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {\n    var channel = new global.MessageChannel();\n    channel.port1.onmessage = nextTick;\n    scheduleDrain = function () {\n      channel.port2.postMessage(0);\n    };\n  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {\n    scheduleDrain = function () {\n\n      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted\n      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.\n      var scriptEl = global.document.createElement('script');\n      scriptEl.onreadystatechange = function () {\n        nextTick();\n\n        scriptEl.onreadystatechange = null;\n        scriptEl.parentNode.removeChild(scriptEl);\n        scriptEl = null;\n      };\n      global.document.documentElement.appendChild(scriptEl);\n    };\n  } else {\n    scheduleDrain = function () {\n      setTimeout(nextTick, 0);\n    };\n  }\n}\n\nvar draining;\nvar queue = [];\n//named nextTick for less confusing stack traces\nfunction nextTick() {\n  draining = true;\n  var i, oldQueue;\n  var len = queue.length;\n  while (len) {\n    oldQueue = queue;\n    queue = [];\n    i = -1;\n    while (++i < len) {\n      oldQueue[i]();\n    }\n    len = queue.length;\n  }\n  draining = false;\n}\n\nmodule.exports = immediate;\nfunction immediate(task) {\n  if (queue.push(task) === 1 && !draining) {\n    scheduleDrain();\n  }\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],2:[function(_dereq_,module,exports){\n'use strict';\nvar immediate = _dereq_(1);\n\n/* istanbul ignore next */\nfunction INTERNAL() {}\n\nvar handlers = {};\n\nvar REJECTED = ['REJECTED'];\nvar FULFILLED = ['FULFILLED'];\nvar PENDING = ['PENDING'];\n\nmodule.exports = Promise;\n\nfunction Promise(resolver) {\n  if (typeof resolver !== 'function') {\n    throw new TypeError('resolver must be a function');\n  }\n  this.state = PENDING;\n  this.queue = [];\n  this.outcome = void 0;\n  if (resolver !== INTERNAL) {\n    safelyResolveThenable(this, resolver);\n  }\n}\n\nPromise.prototype[\"catch\"] = function (onRejected) {\n  return this.then(null, onRejected);\n};\nPromise.prototype.then = function (onFulfilled, onRejected) {\n  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||\n    typeof onRejected !== 'function' && this.state === REJECTED) {\n    return this;\n  }\n  var promise = new this.constructor(INTERNAL);\n  if (this.state !== PENDING) {\n    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;\n    unwrap(promise, resolver, this.outcome);\n  } else {\n    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));\n  }\n\n  return promise;\n};\nfunction QueueItem(promise, onFulfilled, onRejected) {\n  this.promise = promise;\n  if (typeof onFulfilled === 'function') {\n    this.onFulfilled = onFulfilled;\n    this.callFulfilled = this.otherCallFulfilled;\n  }\n  if (typeof onRejected === 'function') {\n    this.onRejected = onRejected;\n    this.callRejected = this.otherCallRejected;\n  }\n}\nQueueItem.prototype.callFulfilled = function (value) {\n  handlers.resolve(this.promise, value);\n};\nQueueItem.prototype.otherCallFulfilled = function (value) {\n  unwrap(this.promise, this.onFulfilled, value);\n};\nQueueItem.prototype.callRejected = function (value) {\n  handlers.reject(this.promise, value);\n};\nQueueItem.prototype.otherCallRejected = function (value) {\n  unwrap(this.promise, this.onRejected, value);\n};\n\nfunction unwrap(promise, func, value) {\n  immediate(function () {\n    var returnValue;\n    try {\n      returnValue = func(value);\n    } catch (e) {\n      return handlers.reject(promise, e);\n    }\n    if (returnValue === promise) {\n      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));\n    } else {\n      handlers.resolve(promise, returnValue);\n    }\n  });\n}\n\nhandlers.resolve = function (self, value) {\n  var result = tryCatch(getThen, value);\n  if (result.status === 'error') {\n    return handlers.reject(self, result.value);\n  }\n  var thenable = result.value;\n\n  if (thenable) {\n    safelyResolveThenable(self, thenable);\n  } else {\n    self.state = FULFILLED;\n    self.outcome = value;\n    var i = -1;\n    var len = self.queue.length;\n    while (++i < len) {\n      self.queue[i].callFulfilled(value);\n    }\n  }\n  return self;\n};\nhandlers.reject = function (self, error) {\n  self.state = REJECTED;\n  self.outcome = error;\n  var i = -1;\n  var len = self.queue.length;\n  while (++i < len) {\n    self.queue[i].callRejected(error);\n  }\n  return self;\n};\n\nfunction getThen(obj) {\n  // Make sure we only access the accessor once as required by the spec\n  var then = obj && obj.then;\n  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {\n    return function appyThen() {\n      then.apply(obj, arguments);\n    };\n  }\n}\n\nfunction safelyResolveThenable(self, thenable) {\n  // Either fulfill, reject or reject with error\n  var called = false;\n  function onError(value) {\n    if (called) {\n      return;\n    }\n    called = true;\n    handlers.reject(self, value);\n  }\n\n  function onSuccess(value) {\n    if (called) {\n      return;\n    }\n    called = true;\n    handlers.resolve(self, value);\n  }\n\n  function tryToUnwrap() {\n    thenable(onSuccess, onError);\n  }\n\n  var result = tryCatch(tryToUnwrap);\n  if (result.status === 'error') {\n    onError(result.value);\n  }\n}\n\nfunction tryCatch(func, value) {\n  var out = {};\n  try {\n    out.value = func(value);\n    out.status = 'success';\n  } catch (e) {\n    out.status = 'error';\n    out.value = e;\n  }\n  return out;\n}\n\nPromise.resolve = resolve;\nfunction resolve(value) {\n  if (value instanceof this) {\n    return value;\n  }\n  return handlers.resolve(new this(INTERNAL), value);\n}\n\nPromise.reject = reject;\nfunction reject(reason) {\n  var promise = new this(INTERNAL);\n  return handlers.reject(promise, reason);\n}\n\nPromise.all = all;\nfunction all(iterable) {\n  var self = this;\n  if (Object.prototype.toString.call(iterable) !== '[object Array]') {\n    return this.reject(new TypeError('must be an array'));\n  }\n\n  var len = iterable.length;\n  var called = false;\n  if (!len) {\n    return this.resolve([]);\n  }\n\n  var values = new Array(len);\n  var resolved = 0;\n  var i = -1;\n  var promise = new this(INTERNAL);\n\n  while (++i < len) {\n    allResolver(iterable[i], i);\n  }\n  return promise;\n  function allResolver(value, i) {\n    self.resolve(value).then(resolveFromAll, function (error) {\n      if (!called) {\n        called = true;\n        handlers.reject(promise, error);\n      }\n    });\n    function resolveFromAll(outValue) {\n      values[i] = outValue;\n      if (++resolved === len && !called) {\n        called = true;\n        handlers.resolve(promise, values);\n      }\n    }\n  }\n}\n\nPromise.race = race;\nfunction race(iterable) {\n  var self = this;\n  if (Object.prototype.toString.call(iterable) !== '[object Array]') {\n    return this.reject(new TypeError('must be an array'));\n  }\n\n  var len = iterable.length;\n  var called = false;\n  if (!len) {\n    return this.resolve([]);\n  }\n\n  var i = -1;\n  var promise = new this(INTERNAL);\n\n  while (++i < len) {\n    resolver(iterable[i]);\n  }\n  return promise;\n  function resolver(value) {\n    self.resolve(value).then(function (response) {\n      if (!called) {\n        called = true;\n        handlers.resolve(promise, response);\n      }\n    }, function (error) {\n      if (!called) {\n        called = true;\n        handlers.reject(promise, error);\n      }\n    });\n  }\n}\n\n},{\"1\":1}],3:[function(_dereq_,module,exports){\n(function (global){\n'use strict';\nif (typeof global.Promise !== 'function') {\n  global.Promise = _dereq_(2);\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"2\":2}],4:[function(_dereq_,module,exports){\n'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction getIDB() {\n    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */\n    try {\n        if (typeof indexedDB !== 'undefined') {\n            return indexedDB;\n        }\n        if (typeof webkitIndexedDB !== 'undefined') {\n            return webkitIndexedDB;\n        }\n        if (typeof mozIndexedDB !== 'undefined') {\n            return mozIndexedDB;\n        }\n        if (typeof OIndexedDB !== 'undefined') {\n            return OIndexedDB;\n        }\n        if (typeof msIndexedDB !== 'undefined') {\n            return msIndexedDB;\n        }\n    } catch (e) {\n        return;\n    }\n}\n\nvar idb = getIDB();\n\nfunction isIndexedDBValid() {\n    try {\n        // Initialize IndexedDB; fall back to vendor-prefixed versions\n        // if needed.\n        if (!idb) {\n            return false;\n        }\n        // We mimic PouchDB here;\n        //\n        // We test for openDatabase because IE Mobile identifies itself\n        // as Safari. Oh the lulz...\n        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);\n\n        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;\n\n        // Safari <10.1 does not meet our requirements for IDB support (#5572)\n        // since Safari 10.1 shipped with fetch, we can use that to detect it\n        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&\n        // some outdated implementations of IDB that appear on Samsung\n        // and HTC Android devices <4.4 are missing IDBKeyRange\n        // See: https://github.com/mozilla/localForage/issues/128\n        // See: https://github.com/mozilla/localForage/issues/272\n        typeof IDBKeyRange !== 'undefined';\n    } catch (e) {\n        return false;\n    }\n}\n\n// Abstracts constructing a Blob object, so it also works in older\n// browsers that don't support the native Blob constructor. (i.e.\n// old QtWebKit versions, at least).\n// Abstracts constructing a Blob object, so it also works in older\n// browsers that don't support the native Blob constructor. (i.e.\n// old QtWebKit versions, at least).\nfunction createBlob(parts, properties) {\n    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */\n    parts = parts || [];\n    properties = properties || {};\n    try {\n        return new Blob(parts, properties);\n    } catch (e) {\n        if (e.name !== 'TypeError') {\n            throw e;\n        }\n        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;\n        var builder = new Builder();\n        for (var i = 0; i < parts.length; i += 1) {\n            builder.append(parts[i]);\n        }\n        return builder.getBlob(properties.type);\n    }\n}\n\n// This is CommonJS because lie is an external dependency, so Rollup\n// can just ignore it.\nif (typeof Promise === 'undefined') {\n    // In the \"nopromises\" build this will just throw if you don't have\n    // a global promise object, but it would throw anyway later.\n    _dereq_(3);\n}\nvar Promise$1 = Promise;\n\nfunction executeCallback(promise, callback) {\n    if (callback) {\n        promise.then(function (result) {\n            callback(null, result);\n        }, function (error) {\n            callback(error);\n        });\n    }\n}\n\nfunction executeTwoCallbacks(promise, callback, errorCallback) {\n    if (typeof callback === 'function') {\n        promise.then(callback);\n    }\n\n    if (typeof errorCallback === 'function') {\n        promise[\"catch\"](errorCallback);\n    }\n}\n\nfunction normalizeKey(key) {\n    // Cast the key to a string, as that's all we can set as a key.\n    if (typeof key !== 'string') {\n        console.warn(key + ' used as a key, but it is not a string.');\n        key = String(key);\n    }\n\n    return key;\n}\n\nfunction getCallback() {\n    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {\n        return arguments[arguments.length - 1];\n    }\n}\n\n// Some code originally from async_storage.js in\n// [Gaia](https://github.com/mozilla-b2g/gaia).\n\nvar DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';\nvar supportsBlobs = void 0;\nvar dbContexts = {};\nvar toString = Object.prototype.toString;\n\n// Transaction Modes\nvar READ_ONLY = 'readonly';\nvar READ_WRITE = 'readwrite';\n\n// Transform a binary string to an array buffer, because otherwise\n// weird stuff happens when you try to work with the binary string directly.\n// It is known.\n// From http://stackoverflow.com/questions/14967647/ (continues on next line)\n// encode-decode-image-with-base64-breaks-image (2013-04-21)\nfunction _binStringToArrayBuffer(bin) {\n    var length = bin.length;\n    var buf = new ArrayBuffer(length);\n    var arr = new Uint8Array(buf);\n    for (var i = 0; i < length; i++) {\n        arr[i] = bin.charCodeAt(i);\n    }\n    return buf;\n}\n\n//\n// Blobs are not supported in all versions of IndexedDB, notably\n// Chrome <37 and Android <5. In those versions, storing a blob will throw.\n//\n// Various other blob bugs exist in Chrome v37-42 (inclusive).\n// Detecting them is expensive and confusing to users, and Chrome 37-42\n// is at very low usage worldwide, so we do a hacky userAgent check instead.\n//\n// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120\n// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916\n// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836\n//\n// Code borrowed from PouchDB. See:\n// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js\n//\nfunction _checkBlobSupportWithoutCaching(idb) {\n    return new Promise$1(function (resolve) {\n        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);\n        var blob = createBlob(['']);\n        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');\n\n        txn.onabort = function (e) {\n            // If the transaction aborts now its due to not being able to\n            // write to the database, likely due to the disk being full\n            e.preventDefault();\n            e.stopPropagation();\n            resolve(false);\n        };\n\n        txn.oncomplete = function () {\n            var matchedChrome = navigator.userAgent.match(/Chrome\\/(\\d+)/);\n            var matchedEdge = navigator.userAgent.match(/Edge\\//);\n            // MS Edge pretends to be Chrome 42:\n            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx\n            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);\n        };\n    })[\"catch\"](function () {\n        return false; // error, so assume unsupported\n    });\n}\n\nfunction _checkBlobSupport(idb) {\n    if (typeof supportsBlobs === 'boolean') {\n        return Promise$1.resolve(supportsBlobs);\n    }\n    return _checkBlobSupportWithoutCaching(idb).then(function (value) {\n        supportsBlobs = value;\n        return supportsBlobs;\n    });\n}\n\nfunction _deferReadiness(dbInfo) {\n    var dbContext = dbContexts[dbInfo.name];\n\n    // Create a deferred object representing the current database operation.\n    var deferredOperation = {};\n\n    deferredOperation.promise = new Promise$1(function (resolve, reject) {\n        deferredOperation.resolve = resolve;\n        deferredOperation.reject = reject;\n    });\n\n    // Enqueue the deferred operation.\n    dbContext.deferredOperations.push(deferredOperation);\n\n    // Chain its promise to the database readiness.\n    if (!dbContext.dbReady) {\n        dbContext.dbReady = deferredOperation.promise;\n    } else {\n        dbContext.dbReady = dbContext.dbReady.then(function () {\n            return deferredOperation.promise;\n        });\n    }\n}\n\nfunction _advanceReadiness(dbInfo) {\n    var dbContext = dbContexts[dbInfo.name];\n\n    // Dequeue a deferred operation.\n    var deferredOperation = dbContext.deferredOperations.pop();\n\n    // Resolve its promise (which is part of the database readiness\n    // chain of promises).\n    if (deferredOperation) {\n        deferredOperation.resolve();\n        return deferredOperation.promise;\n    }\n}\n\nfunction _rejectReadiness(dbInfo, err) {\n    var dbContext = dbContexts[dbInfo.name];\n\n    // Dequeue a deferred operation.\n    var deferredOperation = dbContext.deferredOperations.pop();\n\n    // Reject its promise (which is part of the database readiness\n    // chain of promises).\n    if (deferredOperation) {\n        deferredOperation.reject(err);\n        return deferredOperation.promise;\n    }\n}\n\nfunction _getConnection(dbInfo, upgradeNeeded) {\n    return new Promise$1(function (resolve, reject) {\n        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();\n\n        if (dbInfo.db) {\n            if (upgradeNeeded) {\n                _deferReadiness(dbInfo);\n                dbInfo.db.close();\n            } else {\n                return resolve(dbInfo.db);\n            }\n        }\n\n        var dbArgs = [dbInfo.name];\n\n        if (upgradeNeeded) {\n            dbArgs.push(dbInfo.version);\n        }\n\n        var openreq = idb.open.apply(idb, dbArgs);\n\n        if (upgradeNeeded) {\n            openreq.onupgradeneeded = function (e) {\n                var db = openreq.result;\n                try {\n                    db.createObjectStore(dbInfo.storeName);\n                    if (e.oldVersion <= 1) {\n                        // Added when support for blob shims was added\n                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);\n                    }\n                } catch (ex) {\n                    if (ex.name === 'ConstraintError') {\n                        console.warn('The database \"' + dbInfo.name + '\"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage \"' + dbInfo.storeName + '\" already exists.');\n                    } else {\n                        throw ex;\n                    }\n                }\n            };\n        }\n\n        openreq.onerror = function (e) {\n            e.preventDefault();\n            reject(openreq.error);\n        };\n\n        openreq.onsuccess = function () {\n            resolve(openreq.result);\n            _advanceReadiness(dbInfo);\n        };\n    });\n}\n\nfunction _getOriginalConnection(dbInfo) {\n    return _getConnection(dbInfo, false);\n}\n\nfunction _getUpgradedConnection(dbInfo) {\n    return _getConnection(dbInfo, true);\n}\n\nfunction _isUpgradeNeeded(dbInfo, defaultVersion) {\n    if (!dbInfo.db) {\n        return true;\n    }\n\n    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);\n    var isDowngrade = dbInfo.version < dbInfo.db.version;\n    var isUpgrade = dbInfo.version > dbInfo.db.version;\n\n    if (isDowngrade) {\n        // If the version is not the default one\n        // then warn for impossible downgrade.\n        if (dbInfo.version !== defaultVersion) {\n            console.warn('The database \"' + dbInfo.name + '\"' + \" can't be downgraded from version \" + dbInfo.db.version + ' to version ' + dbInfo.version + '.');\n        }\n        // Align the versions to prevent errors.\n        dbInfo.version = dbInfo.db.version;\n    }\n\n    if (isUpgrade || isNewStore) {\n        // If the store is new then increment the version (if needed).\n        // This will trigger an \"upgradeneeded\" event which is required\n        // for creating a store.\n        if (isNewStore) {\n            var incVersion = dbInfo.db.version + 1;\n            if (incVersion > dbInfo.version) {\n                dbInfo.version = incVersion;\n            }\n        }\n\n        return true;\n    }\n\n    return false;\n}\n\n// encode a blob for indexeddb engines that don't support blobs\nfunction _encodeBlob(blob) {\n    return new Promise$1(function (resolve, reject) {\n        var reader = new FileReader();\n        reader.onerror = reject;\n        reader.onloadend = function (e) {\n            var base64 = btoa(e.target.result || '');\n            resolve({\n                __local_forage_encoded_blob: true,\n                data: base64,\n                type: blob.type\n            });\n        };\n        reader.readAsBinaryString(blob);\n    });\n}\n\n// decode an encoded blob\nfunction _decodeBlob(encodedBlob) {\n    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));\n    return createBlob([arrayBuff], { type: encodedBlob.type });\n}\n\n// is this one of our fancy encoded blobs?\nfunction _isEncodedBlob(value) {\n    return value && value.__local_forage_encoded_blob;\n}\n\n// Specialize the default `ready()` function by making it dependent\n// on the current database operations. Thus, the driver will be actually\n// ready when it's been initialized (default) *and* there are no pending\n// operations on the database (initiated by some other instances).\nfunction _fullyReady(callback) {\n    var self = this;\n\n    var promise = self._initReady().then(function () {\n        var dbContext = dbContexts[self._dbInfo.name];\n\n        if (dbContext && dbContext.dbReady) {\n            return dbContext.dbReady;\n        }\n    });\n\n    executeTwoCallbacks(promise, callback, callback);\n    return promise;\n}\n\n// Try to establish a new db connection to replace the\n// current one which is broken (i.e. experiencing\n// InvalidStateError while creating a transaction).\nfunction _tryReconnect(dbInfo) {\n    _deferReadiness(dbInfo);\n\n    var dbContext = dbContexts[dbInfo.name];\n    var forages = dbContext.forages;\n\n    for (var i = 0; i < forages.length; i++) {\n        var forage = forages[i];\n        if (forage._dbInfo.db) {\n            forage._dbInfo.db.close();\n            forage._dbInfo.db = null;\n        }\n    }\n    dbInfo.db = null;\n\n    return _getOriginalConnection(dbInfo).then(function (db) {\n        dbInfo.db = db;\n        if (_isUpgradeNeeded(dbInfo)) {\n            // Reopen the database for upgrading.\n            return _getUpgradedConnection(dbInfo);\n        }\n        return db;\n    }).then(function (db) {\n        // store the latest db reference\n        // in case the db was upgraded\n        dbInfo.db = dbContext.db = db;\n        for (var i = 0; i < forages.length; i++) {\n            forages[i]._dbInfo.db = db;\n        }\n    })[\"catch\"](function (err) {\n        _rejectReadiness(dbInfo, err);\n        throw err;\n    });\n}\n\n// FF doesn't like Promises (micro-tasks) and IDDB store operations,\n// so we have to do it with callbacks\nfunction createTransaction(dbInfo, mode, callback, retries) {\n    if (retries === undefined) {\n        retries = 1;\n    }\n\n    try {\n        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);\n        callback(null, tx);\n    } catch (err) {\n        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {\n            return Promise$1.resolve().then(function () {\n                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {\n                    // increase the db version, to create the new ObjectStore\n                    if (dbInfo.db) {\n                        dbInfo.version = dbInfo.db.version + 1;\n                    }\n                    // Reopen the database for upgrading.\n                    return _getUpgradedConnection(dbInfo);\n                }\n            }).then(function () {\n                return _tryReconnect(dbInfo).then(function () {\n                    createTransaction(dbInfo, mode, callback, retries - 1);\n                });\n            })[\"catch\"](callback);\n        }\n\n        callback(err);\n    }\n}\n\nfunction createDbContext() {\n    return {\n        // Running localForages sharing a database.\n        forages: [],\n        // Shared database.\n        db: null,\n        // Database readiness (promise).\n        dbReady: null,\n        // Deferred operations on the database.\n        deferredOperations: []\n    };\n}\n\n// Open the IndexedDB database (automatically creates one if one didn't\n// previously exist), using any options set in the config.\nfunction _initStorage(options) {\n    var self = this;\n    var dbInfo = {\n        db: null\n    };\n\n    if (options) {\n        for (var i in options) {\n            dbInfo[i] = options[i];\n        }\n    }\n\n    // Get the current context of the database;\n    var dbContext = dbContexts[dbInfo.name];\n\n    // ...or create a new context.\n    if (!dbContext) {\n        dbContext = createDbContext();\n        // Register the new context in the global container.\n        dbContexts[dbInfo.name] = dbContext;\n    }\n\n    // Register itself as a running localForage in the current context.\n    dbContext.forages.push(self);\n\n    // Replace the default `ready()` function with the specialized one.\n    if (!self._initReady) {\n        self._initReady = self.ready;\n        self.ready = _fullyReady;\n    }\n\n    // Create an array of initialization states of the related localForages.\n    var initPromises = [];\n\n    function ignoreErrors() {\n        // Don't handle errors here,\n        // just makes sure related localForages aren't pending.\n        return Promise$1.resolve();\n    }\n\n    for (var j = 0; j < dbContext.forages.length; j++) {\n        var forage = dbContext.forages[j];\n        if (forage !== self) {\n            // Don't wait for itself...\n            initPromises.push(forage._initReady()[\"catch\"](ignoreErrors));\n        }\n    }\n\n    // Take a snapshot of the related localForages.\n    var forages = dbContext.forages.slice(0);\n\n    // Initialize the connection process only when\n    // all the related localForages aren't pending.\n    return Promise$1.all(initPromises).then(function () {\n        dbInfo.db = dbContext.db;\n        // Get the connection or open a new one without upgrade.\n        return _getOriginalConnection(dbInfo);\n    }).then(function (db) {\n        dbInfo.db = db;\n        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {\n            // Reopen the database for upgrading.\n            return _getUpgradedConnection(dbInfo);\n        }\n        return db;\n    }).then(function (db) {\n        dbInfo.db = dbContext.db = db;\n        self._dbInfo = dbInfo;\n        // Share the final connection amongst related localForages.\n        for (var k = 0; k < forages.length; k++) {\n            var forage = forages[k];\n            if (forage !== self) {\n                // Self is already up-to-date.\n                forage._dbInfo.db = dbInfo.db;\n                forage._dbInfo.version = dbInfo.version;\n            }\n        }\n    });\n}\n\nfunction getItem(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.get(key);\n\n                    req.onsuccess = function () {\n                        var value = req.result;\n                        if (value === undefined) {\n                            value = null;\n                        }\n                        if (_isEncodedBlob(value)) {\n                            value = _decodeBlob(value);\n                        }\n                        resolve(value);\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Iterate over all items stored in database.\nfunction iterate(iterator, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.openCursor();\n                    var iterationNumber = 1;\n\n                    req.onsuccess = function () {\n                        var cursor = req.result;\n\n                        if (cursor) {\n                            var value = cursor.value;\n                            if (_isEncodedBlob(value)) {\n                                value = _decodeBlob(value);\n                            }\n                            var result = iterator(value, cursor.key, iterationNumber++);\n\n                            // when the iterator callback retuns any\n                            // (non-`undefined`) value, then we stop\n                            // the iteration immediately\n                            if (result !== void 0) {\n                                resolve(result);\n                            } else {\n                                cursor[\"continue\"]();\n                            }\n                        } else {\n                            resolve();\n                        }\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n\n    return promise;\n}\n\nfunction setItem(key, value, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        var dbInfo;\n        self.ready().then(function () {\n            dbInfo = self._dbInfo;\n            if (toString.call(value) === '[object Blob]') {\n                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {\n                    if (blobSupport) {\n                        return value;\n                    }\n                    return _encodeBlob(value);\n                });\n            }\n            return value;\n        }).then(function (value) {\n            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n\n                    // The reason we don't _save_ null is because IE 10 does\n                    // not support saving the `null` type in IndexedDB. How\n                    // ironic, given the bug below!\n                    // See: https://github.com/mozilla/localForage/issues/161\n                    if (value === null) {\n                        value = undefined;\n                    }\n\n                    var req = store.put(value, key);\n\n                    transaction.oncomplete = function () {\n                        // Cast to undefined so the value passed to\n                        // callback/promise is the same as what one would get out\n                        // of `getItem()` later. This leads to some weirdness\n                        // (setItem('foo', undefined) will return `null`), but\n                        // it's not my fault localStorage is our baseline and that\n                        // it's weird.\n                        if (value === undefined) {\n                            value = null;\n                        }\n\n                        resolve(value);\n                    };\n                    transaction.onabort = transaction.onerror = function () {\n                        var err = req.error ? req.error : req.transaction.error;\n                        reject(err);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction removeItem(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    // We use a Grunt task to make this safe for IE and some\n                    // versions of Android (including those used by Cordova).\n                    // Normally IE won't like `.delete()` and will insist on\n                    // using `['delete']()`, but we have a build step that\n                    // fixes this for us now.\n                    var req = store[\"delete\"](key);\n                    transaction.oncomplete = function () {\n                        resolve();\n                    };\n\n                    transaction.onerror = function () {\n                        reject(req.error);\n                    };\n\n                    // The request will be also be aborted if we've exceeded our storage\n                    // space.\n                    transaction.onabort = function () {\n                        var err = req.error ? req.error : req.transaction.error;\n                        reject(err);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction clear(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.clear();\n\n                    transaction.oncomplete = function () {\n                        resolve();\n                    };\n\n                    transaction.onabort = transaction.onerror = function () {\n                        var err = req.error ? req.error : req.transaction.error;\n                        reject(err);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction length(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.count();\n\n                    req.onsuccess = function () {\n                        resolve(req.result);\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction key(n, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        if (n < 0) {\n            resolve(null);\n\n            return;\n        }\n\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var advanced = false;\n                    var req = store.openCursor();\n\n                    req.onsuccess = function () {\n                        var cursor = req.result;\n                        if (!cursor) {\n                            // this means there weren't enough keys\n                            resolve(null);\n\n                            return;\n                        }\n\n                        if (n === 0) {\n                            // We have the first key, return it if that's what they\n                            // wanted.\n                            resolve(cursor.key);\n                        } else {\n                            if (!advanced) {\n                                // Otherwise, ask the cursor to skip ahead n\n                                // records.\n                                advanced = true;\n                                cursor.advance(n);\n                            } else {\n                                // When we get here, we've got the nth key.\n                                resolve(cursor.key);\n                            }\n                        }\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction keys(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.openCursor();\n                    var keys = [];\n\n                    req.onsuccess = function () {\n                        var cursor = req.result;\n\n                        if (!cursor) {\n                            resolve(keys);\n                            return;\n                        }\n\n                        keys.push(cursor.key);\n                        cursor[\"continue\"]();\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction dropInstance(options, callback) {\n    callback = getCallback.apply(this, arguments);\n\n    var currentConfig = this.config();\n    options = typeof options !== 'function' && options || {};\n    if (!options.name) {\n        options.name = options.name || currentConfig.name;\n        options.storeName = options.storeName || currentConfig.storeName;\n    }\n\n    var self = this;\n    var promise;\n    if (!options.name) {\n        promise = Promise$1.reject('Invalid arguments');\n    } else {\n        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;\n\n        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {\n            var dbContext = dbContexts[options.name];\n            var forages = dbContext.forages;\n            dbContext.db = db;\n            for (var i = 0; i < forages.length; i++) {\n                forages[i]._dbInfo.db = db;\n            }\n            return db;\n        });\n\n        if (!options.storeName) {\n            promise = dbPromise.then(function (db) {\n                _deferReadiness(options);\n\n                var dbContext = dbContexts[options.name];\n                var forages = dbContext.forages;\n\n                db.close();\n                for (var i = 0; i < forages.length; i++) {\n                    var forage = forages[i];\n                    forage._dbInfo.db = null;\n                }\n\n                var dropDBPromise = new Promise$1(function (resolve, reject) {\n                    var req = idb.deleteDatabase(options.name);\n\n                    req.onerror = req.onblocked = function (err) {\n                        var db = req.result;\n                        if (db) {\n                            db.close();\n                        }\n                        reject(err);\n                    };\n\n                    req.onsuccess = function () {\n                        var db = req.result;\n                        if (db) {\n                            db.close();\n                        }\n                        resolve(db);\n                    };\n                });\n\n                return dropDBPromise.then(function (db) {\n                    dbContext.db = db;\n                    for (var i = 0; i < forages.length; i++) {\n                        var _forage = forages[i];\n                        _advanceReadiness(_forage._dbInfo);\n                    }\n                })[\"catch\"](function (err) {\n                    (_rejectReadiness(options, err) || Promise$1.resolve())[\"catch\"](function () {});\n                    throw err;\n                });\n            });\n        } else {\n            promise = dbPromise.then(function (db) {\n                if (!db.objectStoreNames.contains(options.storeName)) {\n                    return;\n                }\n\n                var newVersion = db.version + 1;\n\n                _deferReadiness(options);\n\n                var dbContext = dbContexts[options.name];\n                var forages = dbContext.forages;\n\n                db.close();\n                for (var i = 0; i < forages.length; i++) {\n                    var forage = forages[i];\n                    forage._dbInfo.db = null;\n                    forage._dbInfo.version = newVersion;\n                }\n\n                var dropObjectPromise = new Promise$1(function (resolve, reject) {\n                    var req = idb.open(options.name, newVersion);\n\n                    req.onerror = function (err) {\n                        var db = req.result;\n                        db.close();\n                        reject(err);\n                    };\n\n                    req.onupgradeneeded = function () {\n                        var db = req.result;\n                        db.deleteObjectStore(options.storeName);\n                    };\n\n                    req.onsuccess = function () {\n                        var db = req.result;\n                        db.close();\n                        resolve(db);\n                    };\n                });\n\n                return dropObjectPromise.then(function (db) {\n                    dbContext.db = db;\n                    for (var j = 0; j < forages.length; j++) {\n                        var _forage2 = forages[j];\n                        _forage2._dbInfo.db = db;\n                        _advanceReadiness(_forage2._dbInfo);\n                    }\n                })[\"catch\"](function (err) {\n                    (_rejectReadiness(options, err) || Promise$1.resolve())[\"catch\"](function () {});\n                    throw err;\n                });\n            });\n        }\n    }\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nvar asyncStorage = {\n    _driver: 'asyncStorage',\n    _initStorage: _initStorage,\n    _support: isIndexedDBValid(),\n    iterate: iterate,\n    getItem: getItem,\n    setItem: setItem,\n    removeItem: removeItem,\n    clear: clear,\n    length: length,\n    key: key,\n    keys: keys,\n    dropInstance: dropInstance\n};\n\nfunction isWebSQLValid() {\n    return typeof openDatabase === 'function';\n}\n\n// Sadly, the best way to save binary data in WebSQL/localStorage is serializing\n// it to Base64, so this is how we store it to prevent very strange errors with less\n// verbose ways of binary <-> string data storage.\nvar BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';\n\nvar BLOB_TYPE_PREFIX = '~~local_forage_type~';\nvar BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;\n\nvar SERIALIZED_MARKER = '__lfsc__:';\nvar SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;\n\n// OMG the serializations!\nvar TYPE_ARRAYBUFFER = 'arbf';\nvar TYPE_BLOB = 'blob';\nvar TYPE_INT8ARRAY = 'si08';\nvar TYPE_UINT8ARRAY = 'ui08';\nvar TYPE_UINT8CLAMPEDARRAY = 'uic8';\nvar TYPE_INT16ARRAY = 'si16';\nvar TYPE_INT32ARRAY = 'si32';\nvar TYPE_UINT16ARRAY = 'ur16';\nvar TYPE_UINT32ARRAY = 'ui32';\nvar TYPE_FLOAT32ARRAY = 'fl32';\nvar TYPE_FLOAT64ARRAY = 'fl64';\nvar TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;\n\nvar toString$1 = Object.prototype.toString;\n\nfunction stringToBuffer(serializedString) {\n    // Fill the string into a ArrayBuffer.\n    var bufferLength = serializedString.length * 0.75;\n    var len = serializedString.length;\n    var i;\n    var p = 0;\n    var encoded1, encoded2, encoded3, encoded4;\n\n    if (serializedString[serializedString.length - 1] === '=') {\n        bufferLength--;\n        if (serializedString[serializedString.length - 2] === '=') {\n            bufferLength--;\n        }\n    }\n\n    var buffer = new ArrayBuffer(bufferLength);\n    var bytes = new Uint8Array(buffer);\n\n    for (i = 0; i < len; i += 4) {\n        encoded1 = BASE_CHARS.indexOf(serializedString[i]);\n        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);\n        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);\n        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);\n\n        /*jslint bitwise: true */\n        bytes[p++] = encoded1 << 2 | encoded2 >> 4;\n        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;\n        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;\n    }\n    return buffer;\n}\n\n// Converts a buffer to a string to store, serialized, in the backend\n// storage library.\nfunction bufferToString(buffer) {\n    // base64-arraybuffer\n    var bytes = new Uint8Array(buffer);\n    var base64String = '';\n    var i;\n\n    for (i = 0; i < bytes.length; i += 3) {\n        /*jslint bitwise: true */\n        base64String += BASE_CHARS[bytes[i] >> 2];\n        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];\n        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];\n        base64String += BASE_CHARS[bytes[i + 2] & 63];\n    }\n\n    if (bytes.length % 3 === 2) {\n        base64String = base64String.substring(0, base64String.length - 1) + '=';\n    } else if (bytes.length % 3 === 1) {\n        base64String = base64String.substring(0, base64String.length - 2) + '==';\n    }\n\n    return base64String;\n}\n\n// Serialize a value, afterwards executing a callback (which usually\n// instructs the `setItem()` callback/promise to be executed). This is how\n// we store binary data with localStorage.\nfunction serialize(value, callback) {\n    var valueType = '';\n    if (value) {\n        valueType = toString$1.call(value);\n    }\n\n    // Cannot use `value instanceof ArrayBuffer` or such here, as these\n    // checks fail when running the tests using casper.js...\n    //\n    // TODO: See why those tests fail and use a better solution.\n    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {\n        // Convert binary arrays to a string and prefix the string with\n        // a special marker.\n        var buffer;\n        var marker = SERIALIZED_MARKER;\n\n        if (value instanceof ArrayBuffer) {\n            buffer = value;\n            marker += TYPE_ARRAYBUFFER;\n        } else {\n            buffer = value.buffer;\n\n            if (valueType === '[object Int8Array]') {\n                marker += TYPE_INT8ARRAY;\n            } else if (valueType === '[object Uint8Array]') {\n                marker += TYPE_UINT8ARRAY;\n            } else if (valueType === '[object Uint8ClampedArray]') {\n                marker += TYPE_UINT8CLAMPEDARRAY;\n            } else if (valueType === '[object Int16Array]') {\n                marker += TYPE_INT16ARRAY;\n            } else if (valueType === '[object Uint16Array]') {\n                marker += TYPE_UINT16ARRAY;\n            } else if (valueType === '[object Int32Array]') {\n                marker += TYPE_INT32ARRAY;\n            } else if (valueType === '[object Uint32Array]') {\n                marker += TYPE_UINT32ARRAY;\n            } else if (valueType === '[object Float32Array]') {\n                marker += TYPE_FLOAT32ARRAY;\n            } else if (valueType === '[object Float64Array]') {\n                marker += TYPE_FLOAT64ARRAY;\n            } else {\n                callback(new Error('Failed to get type for BinaryArray'));\n            }\n        }\n\n        callback(marker + bufferToString(buffer));\n    } else if (valueType === '[object Blob]') {\n        // Conver the blob to a binaryArray and then to a string.\n        var fileReader = new FileReader();\n\n        fileReader.onload = function () {\n            // Backwards-compatible prefix for the blob type.\n            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);\n\n            callback(SERIALIZED_MARKER + TYPE_BLOB + str);\n        };\n\n        fileReader.readAsArrayBuffer(value);\n    } else {\n        try {\n            callback(JSON.stringify(value));\n        } catch (e) {\n            console.error(\"Couldn't convert value into a JSON string: \", value);\n\n            callback(null, e);\n        }\n    }\n}\n\n// Deserialize data we've inserted into a value column/field. We place\n// special markers into our strings to mark them as encoded; this isn't\n// as nice as a meta field, but it's the only sane thing we can do whilst\n// keeping localStorage support intact.\n//\n// Oftentimes this will just deserialize JSON content, but if we have a\n// special marker (SERIALIZED_MARKER, defined above), we will extract\n// some kind of arraybuffer/binary data/typed array out of the string.\nfunction deserialize(value) {\n    // If we haven't marked this string as being specially serialized (i.e.\n    // something other than serialized JSON), we can just return it and be\n    // done with it.\n    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {\n        return JSON.parse(value);\n    }\n\n    // The following code deals with deserializing some kind of Blob or\n    // TypedArray. First we separate out the type of data we're dealing\n    // with from the data itself.\n    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);\n    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);\n\n    var blobType;\n    // Backwards-compatible blob type serialization strategy.\n    // DBs created with older versions of localForage will simply not have the blob type.\n    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {\n        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);\n        blobType = matcher[1];\n        serializedString = serializedString.substring(matcher[0].length);\n    }\n    var buffer = stringToBuffer(serializedString);\n\n    // Return the right type based on the code/type set during\n    // serialization.\n    switch (type) {\n        case TYPE_ARRAYBUFFER:\n            return buffer;\n        case TYPE_BLOB:\n            return createBlob([buffer], { type: blobType });\n        case TYPE_INT8ARRAY:\n            return new Int8Array(buffer);\n        case TYPE_UINT8ARRAY:\n            return new Uint8Array(buffer);\n        case TYPE_UINT8CLAMPEDARRAY:\n            return new Uint8ClampedArray(buffer);\n        case TYPE_INT16ARRAY:\n            return new Int16Array(buffer);\n        case TYPE_UINT16ARRAY:\n            return new Uint16Array(buffer);\n        case TYPE_INT32ARRAY:\n            return new Int32Array(buffer);\n        case TYPE_UINT32ARRAY:\n            return new Uint32Array(buffer);\n        case TYPE_FLOAT32ARRAY:\n            return new Float32Array(buffer);\n        case TYPE_FLOAT64ARRAY:\n            return new Float64Array(buffer);\n        default:\n            throw new Error('Unkown type: ' + type);\n    }\n}\n\nvar localforageSerializer = {\n    serialize: serialize,\n    deserialize: deserialize,\n    stringToBuffer: stringToBuffer,\n    bufferToString: bufferToString\n};\n\n/*\n * Includes code from:\n *\n * base64-arraybuffer\n * https://github.com/niklasvh/base64-arraybuffer\n *\n * Copyright (c) 2012 Niklas von Hertzen\n * Licensed under the MIT license.\n */\n\nfunction createDbTable(t, dbInfo, callback, errorCallback) {\n    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);\n}\n\n// Open the WebSQL database (automatically creates one if one didn't\n// previously exist), using any options set in the config.\nfunction _initStorage$1(options) {\n    var self = this;\n    var dbInfo = {\n        db: null\n    };\n\n    if (options) {\n        for (var i in options) {\n            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];\n        }\n    }\n\n    var dbInfoPromise = new Promise$1(function (resolve, reject) {\n        // Open the database; the openDatabase API will automatically\n        // create it for us if it doesn't exist.\n        try {\n            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);\n        } catch (e) {\n            return reject(e);\n        }\n\n        // Create our key/value table if it doesn't exist.\n        dbInfo.db.transaction(function (t) {\n            createDbTable(t, dbInfo, function () {\n                self._dbInfo = dbInfo;\n                resolve();\n            }, function (t, error) {\n                reject(error);\n            });\n        }, reject);\n    });\n\n    dbInfo.serializer = localforageSerializer;\n    return dbInfoPromise;\n}\n\nfunction tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {\n    t.executeSql(sqlStatement, args, callback, function (t, error) {\n        if (error.code === error.SYNTAX_ERR) {\n            t.executeSql('SELECT name FROM sqlite_master ' + \"WHERE type='table' AND name = ?\", [dbInfo.storeName], function (t, results) {\n                if (!results.rows.length) {\n                    // if the table is missing (was deleted)\n                    // re-create it table and retry\n                    createDbTable(t, dbInfo, function () {\n                        t.executeSql(sqlStatement, args, callback, errorCallback);\n                    }, errorCallback);\n                } else {\n                    errorCallback(t, error);\n                }\n            }, errorCallback);\n        } else {\n            errorCallback(t, error);\n        }\n    }, errorCallback);\n}\n\nfunction getItem$1(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {\n                    var result = results.rows.length ? results.rows.item(0).value : null;\n\n                    // Check to see if this is serialized content we need to\n                    // unpack.\n                    if (result) {\n                        result = dbInfo.serializer.deserialize(result);\n                    }\n\n                    resolve(result);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction iterate$1(iterator, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {\n                    var rows = results.rows;\n                    var length = rows.length;\n\n                    for (var i = 0; i < length; i++) {\n                        var item = rows.item(i);\n                        var result = item.value;\n\n                        // Check to see if this is serialized content\n                        // we need to unpack.\n                        if (result) {\n                            result = dbInfo.serializer.deserialize(result);\n                        }\n\n                        result = iterator(result, item.key, i + 1);\n\n                        // void(0) prevents problems with redefinition\n                        // of `undefined`.\n                        if (result !== void 0) {\n                            resolve(result);\n                            return;\n                        }\n                    }\n\n                    resolve();\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction _setItem(key, value, callback, retriesLeft) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            // The localStorage API doesn't return undefined values in an\n            // \"expected\" way, so undefined is always cast to null in all\n            // drivers. See: https://github.com/mozilla/localForage/pull/42\n            if (value === undefined) {\n                value = null;\n            }\n\n            // Save the original value to pass to the callback.\n            var originalValue = value;\n\n            var dbInfo = self._dbInfo;\n            dbInfo.serializer.serialize(value, function (value, error) {\n                if (error) {\n                    reject(error);\n                } else {\n                    dbInfo.db.transaction(function (t) {\n                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {\n                            resolve(originalValue);\n                        }, function (t, error) {\n                            reject(error);\n                        });\n                    }, function (sqlError) {\n                        // The transaction failed; check\n                        // to see if it's a quota error.\n                        if (sqlError.code === sqlError.QUOTA_ERR) {\n                            // We reject the callback outright for now, but\n                            // it's worth trying to re-run the transaction.\n                            // Even if the user accepts the prompt to use\n                            // more storage on Safari, this error will\n                            // be called.\n                            //\n                            // Try to re-run the transaction.\n                            if (retriesLeft > 0) {\n                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));\n                                return;\n                            }\n                            reject(sqlError);\n                        }\n                    });\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction setItem$1(key, value, callback) {\n    return _setItem.apply(this, [key, value, callback, 1]);\n}\n\nfunction removeItem$1(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {\n                    resolve();\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Deletes every item in the table.\n// TODO: Find out if this resets the AUTO_INCREMENT number.\nfunction clear$1(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {\n                    resolve();\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Does a simple `COUNT(key)` to get the number of items stored in\n// localForage.\nfunction length$1(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                // Ahhh, SQL makes this one soooooo easy.\n                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {\n                    var result = results.rows.item(0).c;\n                    resolve(result);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Return the key located at key index X; essentially gets the key from a\n// `WHERE id = ?`. This is the most efficient way I can think to implement\n// this rarely-used (in my experience) part of the API, but it can seem\n// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so\n// the ID of each key will change every time it's updated. Perhaps a stored\n// procedure for the `setItem()` SQL would solve this problem?\n// TODO: Don't change ID on `setItem()`.\nfunction key$1(n, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {\n                    var result = results.rows.length ? results.rows.item(0).key : null;\n                    resolve(result);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction keys$1(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {\n                    var keys = [];\n\n                    for (var i = 0; i < results.rows.length; i++) {\n                        keys.push(results.rows.item(i).key);\n                    }\n\n                    resolve(keys);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// https://www.w3.org/TR/webdatabase/#databases\n// > There is no way to enumerate or delete the databases available for an origin from this API.\nfunction getAllStoreNames(db) {\n    return new Promise$1(function (resolve, reject) {\n        db.transaction(function (t) {\n            t.executeSql('SELECT name FROM sqlite_master ' + \"WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'\", [], function (t, results) {\n                var storeNames = [];\n\n                for (var i = 0; i < results.rows.length; i++) {\n                    storeNames.push(results.rows.item(i).name);\n                }\n\n                resolve({\n                    db: db,\n                    storeNames: storeNames\n                });\n            }, function (t, error) {\n                reject(error);\n            });\n        }, function (sqlError) {\n            reject(sqlError);\n        });\n    });\n}\n\nfunction dropInstance$1(options, callback) {\n    callback = getCallback.apply(this, arguments);\n\n    var currentConfig = this.config();\n    options = typeof options !== 'function' && options || {};\n    if (!options.name) {\n        options.name = options.name || currentConfig.name;\n        options.storeName = options.storeName || currentConfig.storeName;\n    }\n\n    var self = this;\n    var promise;\n    if (!options.name) {\n        promise = Promise$1.reject('Invalid arguments');\n    } else {\n        promise = new Promise$1(function (resolve) {\n            var db;\n            if (options.name === currentConfig.name) {\n                // use the db reference of the current instance\n                db = self._dbInfo.db;\n            } else {\n                db = openDatabase(options.name, '', '', 0);\n            }\n\n            if (!options.storeName) {\n                // drop all database tables\n                resolve(getAllStoreNames(db));\n            } else {\n                resolve({\n                    db: db,\n                    storeNames: [options.storeName]\n                });\n            }\n        }).then(function (operationInfo) {\n            return new Promise$1(function (resolve, reject) {\n                operationInfo.db.transaction(function (t) {\n                    function dropTable(storeName) {\n                        return new Promise$1(function (resolve, reject) {\n                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {\n                                resolve();\n                            }, function (t, error) {\n                                reject(error);\n                            });\n                        });\n                    }\n\n                    var operations = [];\n                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {\n                        operations.push(dropTable(operationInfo.storeNames[i]));\n                    }\n\n                    Promise$1.all(operations).then(function () {\n                        resolve();\n                    })[\"catch\"](function (e) {\n                        reject(e);\n                    });\n                }, function (sqlError) {\n                    reject(sqlError);\n                });\n            });\n        });\n    }\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nvar webSQLStorage = {\n    _driver: 'webSQLStorage',\n    _initStorage: _initStorage$1,\n    _support: isWebSQLValid(),\n    iterate: iterate$1,\n    getItem: getItem$1,\n    setItem: setItem$1,\n    removeItem: removeItem$1,\n    clear: clear$1,\n    length: length$1,\n    key: key$1,\n    keys: keys$1,\n    dropInstance: dropInstance$1\n};\n\nfunction isLocalStorageValid() {\n    try {\n        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&\n        // in IE8 typeof localStorage.setItem === 'object'\n        !!localStorage.setItem;\n    } catch (e) {\n        return false;\n    }\n}\n\nfunction _getKeyPrefix(options, defaultConfig) {\n    var keyPrefix = options.name + '/';\n\n    if (options.storeName !== defaultConfig.storeName) {\n        keyPrefix += options.storeName + '/';\n    }\n    return keyPrefix;\n}\n\n// Check if localStorage throws when saving an item\nfunction checkIfLocalStorageThrows() {\n    var localStorageTestKey = '_localforage_support_test';\n\n    try {\n        localStorage.setItem(localStorageTestKey, true);\n        localStorage.removeItem(localStorageTestKey);\n\n        return false;\n    } catch (e) {\n        return true;\n    }\n}\n\n// Check if localStorage is usable and allows to save an item\n// This method checks if localStorage is usable in Safari Private Browsing\n// mode, or in any other case where the available quota for localStorage\n// is 0 and there wasn't any saved items yet.\nfunction _isLocalStorageUsable() {\n    return !checkIfLocalStorageThrows() || localStorage.length > 0;\n}\n\n// Config the localStorage backend, using options set in the config.\nfunction _initStorage$2(options) {\n    var self = this;\n    var dbInfo = {};\n    if (options) {\n        for (var i in options) {\n            dbInfo[i] = options[i];\n        }\n    }\n\n    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);\n\n    if (!_isLocalStorageUsable()) {\n        return Promise$1.reject();\n    }\n\n    self._dbInfo = dbInfo;\n    dbInfo.serializer = localforageSerializer;\n\n    return Promise$1.resolve();\n}\n\n// Remove all keys from the datastore, effectively destroying all data in\n// the app's key/value store!\nfunction clear$2(callback) {\n    var self = this;\n    var promise = self.ready().then(function () {\n        var keyPrefix = self._dbInfo.keyPrefix;\n\n        for (var i = localStorage.length - 1; i >= 0; i--) {\n            var key = localStorage.key(i);\n\n            if (key.indexOf(keyPrefix) === 0) {\n                localStorage.removeItem(key);\n            }\n        }\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Retrieve an item from the store. Unlike the original async_storage\n// library in Gaia, we don't modify return values at all. If a key's value\n// is `undefined`, we pass that value to the callback function.\nfunction getItem$2(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var result = localStorage.getItem(dbInfo.keyPrefix + key);\n\n        // If a result was found, parse it from the serialized\n        // string into a JS object. If result isn't truthy, the key\n        // is likely undefined and we'll pass it straight to the\n        // callback.\n        if (result) {\n            result = dbInfo.serializer.deserialize(result);\n        }\n\n        return result;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Iterate over all items in the store.\nfunction iterate$2(iterator, callback) {\n    var self = this;\n\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var keyPrefix = dbInfo.keyPrefix;\n        var keyPrefixLength = keyPrefix.length;\n        var length = localStorage.length;\n\n        // We use a dedicated iterator instead of the `i` variable below\n        // so other keys we fetch in localStorage aren't counted in\n        // the `iterationNumber` argument passed to the `iterate()`\n        // callback.\n        //\n        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530\n        var iterationNumber = 1;\n\n        for (var i = 0; i < length; i++) {\n            var key = localStorage.key(i);\n            if (key.indexOf(keyPrefix) !== 0) {\n                continue;\n            }\n            var value = localStorage.getItem(key);\n\n            // If a result was found, parse it from the serialized\n            // string into a JS object. If result isn't truthy, the\n            // key is likely undefined and we'll pass it straight\n            // to the iterator.\n            if (value) {\n                value = dbInfo.serializer.deserialize(value);\n            }\n\n            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);\n\n            if (value !== void 0) {\n                return value;\n            }\n        }\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Same as localStorage's key() method, except takes a callback.\nfunction key$2(n, callback) {\n    var self = this;\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var result;\n        try {\n            result = localStorage.key(n);\n        } catch (error) {\n            result = null;\n        }\n\n        // Remove the prefix from the key, if a key is found.\n        if (result) {\n            result = result.substring(dbInfo.keyPrefix.length);\n        }\n\n        return result;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction keys$2(callback) {\n    var self = this;\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var length = localStorage.length;\n        var keys = [];\n\n        for (var i = 0; i < length; i++) {\n            var itemKey = localStorage.key(i);\n            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {\n                keys.push(itemKey.substring(dbInfo.keyPrefix.length));\n            }\n        }\n\n        return keys;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Supply the number of keys in the datastore to the callback function.\nfunction length$2(callback) {\n    var self = this;\n    var promise = self.keys().then(function (keys) {\n        return keys.length;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Remove an item from the store, nice and simple.\nfunction removeItem$2(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        localStorage.removeItem(dbInfo.keyPrefix + key);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Set a key's value and run an optional callback once the value is set.\n// Unlike Gaia's implementation, the callback function is passed the value,\n// in case you want to operate on that value only after you're sure it\n// saved, or something like that.\nfunction setItem$2(key, value, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = self.ready().then(function () {\n        // Convert undefined values to null.\n        // https://github.com/mozilla/localForage/pull/42\n        if (value === undefined) {\n            value = null;\n        }\n\n        // Save the original value to pass to the callback.\n        var originalValue = value;\n\n        return new Promise$1(function (resolve, reject) {\n            var dbInfo = self._dbInfo;\n            dbInfo.serializer.serialize(value, function (value, error) {\n                if (error) {\n                    reject(error);\n                } else {\n                    try {\n                        localStorage.setItem(dbInfo.keyPrefix + key, value);\n                        resolve(originalValue);\n                    } catch (e) {\n                        // localStorage capacity exceeded.\n                        // TODO: Make this a specific error/event.\n                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {\n                            reject(e);\n                        }\n                        reject(e);\n                    }\n                }\n            });\n        });\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction dropInstance$2(options, callback) {\n    callback = getCallback.apply(this, arguments);\n\n    options = typeof options !== 'function' && options || {};\n    if (!options.name) {\n        var currentConfig = this.config();\n        options.name = options.name || currentConfig.name;\n        options.storeName = options.storeName || currentConfig.storeName;\n    }\n\n    var self = this;\n    var promise;\n    if (!options.name) {\n        promise = Promise$1.reject('Invalid arguments');\n    } else {\n        promise = new Promise$1(function (resolve) {\n            if (!options.storeName) {\n                resolve(options.name + '/');\n            } else {\n                resolve(_getKeyPrefix(options, self._defaultConfig));\n            }\n        }).then(function (keyPrefix) {\n            for (var i = localStorage.length - 1; i >= 0; i--) {\n                var key = localStorage.key(i);\n\n                if (key.indexOf(keyPrefix) === 0) {\n                    localStorage.removeItem(key);\n                }\n            }\n        });\n    }\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nvar localStorageWrapper = {\n    _driver: 'localStorageWrapper',\n    _initStorage: _initStorage$2,\n    _support: isLocalStorageValid(),\n    iterate: iterate$2,\n    getItem: getItem$2,\n    setItem: setItem$2,\n    removeItem: removeItem$2,\n    clear: clear$2,\n    length: length$2,\n    key: key$2,\n    keys: keys$2,\n    dropInstance: dropInstance$2\n};\n\nvar sameValue = function sameValue(x, y) {\n    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);\n};\n\nvar includes = function includes(array, searchElement) {\n    var len = array.length;\n    var i = 0;\n    while (i < len) {\n        if (sameValue(array[i], searchElement)) {\n            return true;\n        }\n        i++;\n    }\n\n    return false;\n};\n\nvar isArray = Array.isArray || function (arg) {\n    return Object.prototype.toString.call(arg) === '[object Array]';\n};\n\n// Drivers are stored here when `defineDriver()` is called.\n// They are shared across all instances of localForage.\nvar DefinedDrivers = {};\n\nvar DriverSupport = {};\n\nvar DefaultDrivers = {\n    INDEXEDDB: asyncStorage,\n    WEBSQL: webSQLStorage,\n    LOCALSTORAGE: localStorageWrapper\n};\n\nvar DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];\n\nvar OptionalDriverMethods = ['dropInstance'];\n\nvar LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);\n\nvar DefaultConfig = {\n    description: '',\n    driver: DefaultDriverOrder.slice(),\n    name: 'localforage',\n    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size\n    // we can use without a prompt.\n    size: 4980736,\n    storeName: 'keyvaluepairs',\n    version: 1.0\n};\n\nfunction callWhenReady(localForageInstance, libraryMethod) {\n    localForageInstance[libraryMethod] = function () {\n        var _args = arguments;\n        return localForageInstance.ready().then(function () {\n            return localForageInstance[libraryMethod].apply(localForageInstance, _args);\n        });\n    };\n}\n\nfunction extend() {\n    for (var i = 1; i < arguments.length; i++) {\n        var arg = arguments[i];\n\n        if (arg) {\n            for (var _key in arg) {\n                if (arg.hasOwnProperty(_key)) {\n                    if (isArray(arg[_key])) {\n                        arguments[0][_key] = arg[_key].slice();\n                    } else {\n                        arguments[0][_key] = arg[_key];\n                    }\n                }\n            }\n        }\n    }\n\n    return arguments[0];\n}\n\nvar LocalForage = function () {\n    function LocalForage(options) {\n        _classCallCheck(this, LocalForage);\n\n        for (var driverTypeKey in DefaultDrivers) {\n            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {\n                var driver = DefaultDrivers[driverTypeKey];\n                var driverName = driver._driver;\n                this[driverTypeKey] = driverName;\n\n                if (!DefinedDrivers[driverName]) {\n                    // we don't need to wait for the promise,\n                    // since the default drivers can be defined\n                    // in a blocking manner\n                    this.defineDriver(driver);\n                }\n            }\n        }\n\n        this._defaultConfig = extend({}, DefaultConfig);\n        this._config = extend({}, this._defaultConfig, options);\n        this._driverSet = null;\n        this._initDriver = null;\n        this._ready = false;\n        this._dbInfo = null;\n\n        this._wrapLibraryMethodsWithReady();\n        this.setDriver(this._config.driver)[\"catch\"](function () {});\n    }\n\n    // Set any config values for localForage; can be called anytime before\n    // the first API call (e.g. `getItem`, `setItem`).\n    // We loop through options so we don't overwrite existing config\n    // values.\n\n\n    LocalForage.prototype.config = function config(options) {\n        // If the options argument is an object, we use it to set values.\n        // Otherwise, we return either a specified config value or all\n        // config values.\n        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {\n            // If localforage is ready and fully initialized, we can't set\n            // any new configuration values. Instead, we return an error.\n            if (this._ready) {\n                return new Error(\"Can't call config() after localforage \" + 'has been used.');\n            }\n\n            for (var i in options) {\n                if (i === 'storeName') {\n                    options[i] = options[i].replace(/\\W/g, '_');\n                }\n\n                if (i === 'version' && typeof options[i] !== 'number') {\n                    return new Error('Database version must be a number.');\n                }\n\n                this._config[i] = options[i];\n            }\n\n            // after all config options are set and\n            // the driver option is used, try setting it\n            if ('driver' in options && options.driver) {\n                return this.setDriver(this._config.driver);\n            }\n\n            return true;\n        } else if (typeof options === 'string') {\n            return this._config[options];\n        } else {\n            return this._config;\n        }\n    };\n\n    // Used to define a custom driver, shared across all instances of\n    // localForage.\n\n\n    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {\n        var promise = new Promise$1(function (resolve, reject) {\n            try {\n                var driverName = driverObject._driver;\n                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');\n\n                // A driver name should be defined and not overlap with the\n                // library-defined, default drivers.\n                if (!driverObject._driver) {\n                    reject(complianceError);\n                    return;\n                }\n\n                var driverMethods = LibraryMethods.concat('_initStorage');\n                for (var i = 0, len = driverMethods.length; i < len; i++) {\n                    var driverMethodName = driverMethods[i];\n\n                    // when the property is there,\n                    // it should be a method even when optional\n                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);\n                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {\n                        reject(complianceError);\n                        return;\n                    }\n                }\n\n                var configureMissingMethods = function configureMissingMethods() {\n                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {\n                        return function () {\n                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');\n                            var promise = Promise$1.reject(error);\n                            executeCallback(promise, arguments[arguments.length - 1]);\n                            return promise;\n                        };\n                    };\n\n                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {\n                        var optionalDriverMethod = OptionalDriverMethods[_i];\n                        if (!driverObject[optionalDriverMethod]) {\n                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);\n                        }\n                    }\n                };\n\n                configureMissingMethods();\n\n                var setDriverSupport = function setDriverSupport(support) {\n                    if (DefinedDrivers[driverName]) {\n                        console.info('Redefining LocalForage driver: ' + driverName);\n                    }\n                    DefinedDrivers[driverName] = driverObject;\n                    DriverSupport[driverName] = support;\n                    // don't use a then, so that we can define\n                    // drivers that have simple _support methods\n                    // in a blocking manner\n                    resolve();\n                };\n\n                if ('_support' in driverObject) {\n                    if (driverObject._support && typeof driverObject._support === 'function') {\n                        driverObject._support().then(setDriverSupport, reject);\n                    } else {\n                        setDriverSupport(!!driverObject._support);\n                    }\n                } else {\n                    setDriverSupport(true);\n                }\n            } catch (e) {\n                reject(e);\n            }\n        });\n\n        executeTwoCallbacks(promise, callback, errorCallback);\n        return promise;\n    };\n\n    LocalForage.prototype.driver = function driver() {\n        return this._driver || null;\n    };\n\n    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {\n        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));\n\n        executeTwoCallbacks(getDriverPromise, callback, errorCallback);\n        return getDriverPromise;\n    };\n\n    LocalForage.prototype.getSerializer = function getSerializer(callback) {\n        var serializerPromise = Promise$1.resolve(localforageSerializer);\n        executeTwoCallbacks(serializerPromise, callback);\n        return serializerPromise;\n    };\n\n    LocalForage.prototype.ready = function ready(callback) {\n        var self = this;\n\n        var promise = self._driverSet.then(function () {\n            if (self._ready === null) {\n                self._ready = self._initDriver();\n            }\n\n            return self._ready;\n        });\n\n        executeTwoCallbacks(promise, callback, callback);\n        return promise;\n    };\n\n    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {\n        var self = this;\n\n        if (!isArray(drivers)) {\n            drivers = [drivers];\n        }\n\n        var supportedDrivers = this._getSupportedDrivers(drivers);\n\n        function setDriverToConfig() {\n            self._config.driver = self.driver();\n        }\n\n        function extendSelfWithDriver(driver) {\n            self._extend(driver);\n            setDriverToConfig();\n\n            self._ready = self._initStorage(self._config);\n            return self._ready;\n        }\n\n        function initDriver(supportedDrivers) {\n            return function () {\n                var currentDriverIndex = 0;\n\n                function driverPromiseLoop() {\n                    while (currentDriverIndex < supportedDrivers.length) {\n                        var driverName = supportedDrivers[currentDriverIndex];\n                        currentDriverIndex++;\n\n                        self._dbInfo = null;\n                        self._ready = null;\n\n                        return self.getDriver(driverName).then(extendSelfWithDriver)[\"catch\"](driverPromiseLoop);\n                    }\n\n                    setDriverToConfig();\n                    var error = new Error('No available storage method found.');\n                    self._driverSet = Promise$1.reject(error);\n                    return self._driverSet;\n                }\n\n                return driverPromiseLoop();\n            };\n        }\n\n        // There might be a driver initialization in progress\n        // so wait for it to finish in order to avoid a possible\n        // race condition to set _dbInfo\n        var oldDriverSetDone = this._driverSet !== null ? this._driverSet[\"catch\"](function () {\n            return Promise$1.resolve();\n        }) : Promise$1.resolve();\n\n        this._driverSet = oldDriverSetDone.then(function () {\n            var driverName = supportedDrivers[0];\n            self._dbInfo = null;\n            self._ready = null;\n\n            return self.getDriver(driverName).then(function (driver) {\n                self._driver = driver._driver;\n                setDriverToConfig();\n                self._wrapLibraryMethodsWithReady();\n                self._initDriver = initDriver(supportedDrivers);\n            });\n        })[\"catch\"](function () {\n            setDriverToConfig();\n            var error = new Error('No available storage method found.');\n            self._driverSet = Promise$1.reject(error);\n            return self._driverSet;\n        });\n\n        executeTwoCallbacks(this._driverSet, callback, errorCallback);\n        return this._driverSet;\n    };\n\n    LocalForage.prototype.supports = function supports(driverName) {\n        return !!DriverSupport[driverName];\n    };\n\n    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {\n        extend(this, libraryMethodsAndProperties);\n    };\n\n    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {\n        var supportedDrivers = [];\n        for (var i = 0, len = drivers.length; i < len; i++) {\n            var driverName = drivers[i];\n            if (this.supports(driverName)) {\n                supportedDrivers.push(driverName);\n            }\n        }\n        return supportedDrivers;\n    };\n\n    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {\n        // Add a stub for each driver API method that delays the call to the\n        // corresponding driver method until localForage is ready. These stubs\n        // will be replaced by the driver methods as soon as the driver is\n        // loaded, so there is no performance impact.\n        for (var i = 0, len = LibraryMethods.length; i < len; i++) {\n            callWhenReady(this, LibraryMethods[i]);\n        }\n    };\n\n    LocalForage.prototype.createInstance = function createInstance(options) {\n        return new LocalForage(options);\n    };\n\n    return LocalForage;\n}();\n\n// The actual localForage object that we expose as a module or via a\n// global. It's extended by pulling in one of our other libraries.\n\n\nvar localforage_js = new LocalForage();\n\nmodule.exports = localforage_js;\n\n},{\"3\":3}]},{},[4])(4)\n});\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/localforage/dist/localforage.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

/******/ });