
# term

- chunkId

- module


# src



``` manifest.js

(function(modules) {
    var parentJsonpFunction = window["webpackJson"];
    window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
		// add "moreModules" to the modules object,
		// then flag all "chunkIds" as loaded and fire callback
		var moduleId, chunkId, i = 0, resolves = [], result;
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(installedChunks[chunkId]) {
				resolves.push(installedChunks[chunkId][0]);
			}
			installedChunks[chunkId] = 0;
		}
		for(moduleId in moreModules) {
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
		}
		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
		while(resolves.length) {
			resolves.shift()();
		}
		if(executeModules) {
			for(i=0; i < executeModules.length; i++) {
				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
			}
		}
		return result;
	};

    // objects to store loaded and loading chunks
	var installedChunks = {
		2: 0
	};
})([])


```

``` app.js
webpackJsonp([1], [
    /* 0 */
    ,
    /* 1 */
    /***/
    (function (module, exports, __webpack_require__) {

        "use strict";
        eval("\n\nalert(\"111\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanM/ZGFkYyJdLCJuYW1lcyI6WyJhbGVydCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxLQUFOIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbGVydChcIjExMVwiKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

        /***/
    })
], [1]);

```