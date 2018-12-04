1. webpackBootstrap


**window[webpackJsonp] = webpackJsonpCallback**

webpack生成的某些chunk，webpack会以jsonp的形式请求。

```
function webpackJsonpCallback(data) {
	var chunkIds = data[0];
	var moreModules = data[1];
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId, chunkId, i = 0, resolves = [];
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
	if(parentJsonpFunction) parentJsonpFunction(data);
	while(resolves.length) {
		resolves.shift()();
	}
};
```

installedModules = {}

__webpack_require__(moduleId) {}

webpack从入口开始调用`__webpack_require__(entry_module)`，入口是一个module，入口中引入、调用了其他文件，那么这些文件也会被webpack解析为一个module，具体官方文档已经指出： [Modules](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)


2. module

- An ES2015 import statement
- A CommonJS require() statement
- An AMD define and require statement
- An @import statement inside of a css/sass/less file.
- An image url in a stylesheet (url(...)) or html (<img src=...>) file.

moduleId就是webpack中所有module的一个索引，webpack4默认为模块名称，webpack3默认为数组index。

```
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "../node_modules/jquery/dist/jquery.js":	...	// 这里就是一个moduleId
```
3. chunk
在webpack构建过程中，webpack内部使用的术语，是源代码的中间形式，分为不同种类型，参考： [Chunk Types in Webpack](https://survivejs.com/webpack/building/bundle-splitting/#chunk-types-in-webpack)。这些chunk是一个或多个module的组合。
chunkId就是这些module组成的chunk的一个webpack的内部索引。

```
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"0.btn1":"0.btn1","4.home":"4.home","6.index-html":"6.index-html"}[chunkId]||chunkId) + "." + {"0.btn1":"68c4aecf2dddcde525f4","4.home":"4fc5ba69d0c44655e9dd","6.index-html":"03c046bd45dcc62ab435","lodash.js":"f8218e516f43cec1a27f","global.js_module.js":"d1a1abca2800d8a45510","react.development.js_index.js":"e15489d5a384dce81fc1","index.js_checkPropTypes.js_ReactPropTypesSecret.js":"4c060e349cb3b93d8665"}[chunkId] + ".chunk.js"
/******/ 	}
```

- Entry chunk
- Normal chunk
- Initial chunk



**chunk naming**
动态引入的chunk，可以命名，其中`index`和`request`可以作为变量使用

```
import(/* webpackChunkName: "[index].[request]" */ `./${btn_module}`);
```

**chunk loading**
这个和`webpack.config.target`有关，如果`target`为`web`，那么这些chunk会以`jsonp`的形式请求获取。

4. bundle

webpack最终构建完成之后输出的文件，是chunk的最终形式，但是chunk和bundle并不是一一对应的，比如使用了`commonsChunkPlugin(webpack3)`或者`splitChunksPlugin(webpack4)`

# Loader(https://webpack.js.org/loaders/)

1. loader的处理顺序
Loaders are evaluated/executed from right to left.
也就是说loader会从下往上执行，比如一个scss文件，首先时sass-loader，再是css-loader，最后时style-loader



## 文件类

[raw-loader](https://webpack.js.org/loaders/raw-loader/): A loader for webpack that allows importing files as a String.
[url-loader](https://webpack.js.org/loaders/url-loader/): A loader for webpack which transforms files into base64 URIs.
    可以参考MDN [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs),比如图片的img src为Base64数据，那么浏览器请求HTML文件之后，会继续请求解析Base64数据，最终显示为图片。
[file-loader](): A file loader module for webpack
    使用`file-loader`处理的模块，最终会在webpack.output.path下生成对应的文件，而引入的地方会返回这个路径。
    其中publicPath和webpack.output.publicPath一致，用于CDN场景。


## 样式类


[style-loader](https://webpack.js.org/loaders/style-loader/): Adds CSS to the DOM by injecting a <style> tag
[css-loader](https://webpack.js.org/loaders/css-loader/): The css-loader interprets @import and url() like import/require() and will resolve them.Loads CSS file with resolved imports and returns CSS code
[sass-loader](https://webpack.js.org/loaders/sass-loader/): Loads and compiles a SASS/SCSS file
[postcss-loader](https://webpack.js.org/loaders/postcss-loader/): Loads and transforms a CSS/SSS file using PostCSS


# [Plugin](https://github.com/webpack/docs/wiki/how-to-write-a-plugin)


Plugins expose the full potential of the Webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the Webpack build process. Building plugins is a bit more advanced than building loaders, because you'll need to understand some of the Webpack low-level internals to hook into them. Be prepared to read some source code!



- DllPlugin
    The DllPlugin and DllReferencePlugin provide means to split bundles in a way that can drastically improve build time performance.

- DllReferencePlugin
    This plugin is used in the primary webpack config, it references the dll-only-bundle(s) to require pre-built dependencies.






## tapable


## compiler

1. hooks

```
[ 'shouldEmit',
  'done',
  'additionalPass',
  'beforeRun',
  'run',
  'emit',
  'afterEmit',
  'thisCompilation',
  'compilation',
  'normalModuleFactory',
  'contextModuleFactory',
  'beforeCompile',
  'compile',
  'make',
  'afterCompile',
  'watchRun',
  'failed',
  'invalid',
  'watchClose',
  'environment',
  'afterEnvironment',
  'afterPlugins',
  'afterResolvers',
  'entryOption' ]
```


## compilation







# Code Split

## splitChunks

runtimeChunk用于提取webpack的bootstrap代码，名字可以随便取，一般为`manifest.js`

splitChunks.chunks: 可以为`initial`,`async`,`all`，initial表示初始块，async表示按需加载块，all表示所有块。
async时，webpack只在乎动态引入模块的优化，他们可以提取合并为单独的chunk。 剩余的模块(静态+动态)，静态模块都在各自的entry chunk中，动态模块会被提取为单独的chunk。

initial时，webpack只在乎静态引入模块的优化，他们可以提取合并为单独的chunk。剩余的模块(静态+动态)，静态只有一个，会被提取为单独的chunk；而动态如果有多个，会合并为一个，如果只有一个，也会提取为单独的chunk。

all时，webpack智能决策，这种方式最好。

优化时，看生成的文件的大小，选择合适的方式。

## htmlWebpackPlugin
生成的js该如何插入到html文件中，这些js的顺序又是怎么样的呢？
js的插入顺序其实是非常重要的，如果不正确，页面可能就无法正常渲染了。

- inject: 
- chunks: 要插入哪些、什么js。
- chunksSortMode: 决定js的插入顺序。
- template:
- filename: 


## lazy loading

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.

我理解的话就是按需加载js文件，比如首屏渲染，一次性加载一个大js就会很慢；这时就可以把某些频率低的功能按照用户操作加载。
这种需求很长见，不过在Webpack构建阶段，并没有按需构建一说，Webpack会构建所有用户需要的chunk，这种按需构建在超大型项目开发阶段，是非常吼的。


## [tree shaking](https://webpack.js.org/guides/tree-shaking/)

You can imagine your application as a tree. The source code and libraries you actually use represent the green, living leaves of the tree. Dead code represents the brown, dead leaves of the tree that are consumed by autumn. In order to get rid of the dead leaves, you have to shake the tree, causing them to fall.

我理解就是比如lodash这个库，我只用了`_.isString`函数，那么lodash中其他的函数就不应该构建到js chunk中。








