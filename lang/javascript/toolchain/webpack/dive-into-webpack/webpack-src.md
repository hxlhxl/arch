



[tapable api](https://github.com/webpack/webpack.js.org/issues/36#issuecomment-248885034)

``` tapable.Tapable.js

function Tapable() {
    this._pluginCompat = new SyncBailHook(["options"]);
    // ...
}

Tapable.prototype.plugin = util.deprecate(function plugin(name, fn) {
    const result = this._pluginCompat.call({
        name: name,
        fn: fn,
        names: new Set([name])
    });
}); // Tapable.plugin is deprecated. use new API on `.hooks` instead

//  This function registers a plugin under a hash of name.
This acts as the same as on() of EventEmitter, for registering a handler/listener to do something when the signal/event happens.

Tapable.prototype.apply = util.deprecate(function apply() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].apply(this);
    }
});  // Tapable.apply is deprecated. Call apply on the plugin directly instead

// This method is just to apply plugins' definition, so that the real event listeners can be registered into registry. Mostly the apply method of a AnyPlugin is the main place to place extension logic.
```

``` webpack.js
const webpack = (options, callback) => {
    let compiler;
    options = new WebpackOptionsDefauler().process(options);
    // compiler = new MultiCompiler
    compiler = new Compiler(options.context);
    compiler.options = options;
    new NodeEnvironmentPlugin().apply(compiler);
    for(const plugin of optoins.plugins) {
        plugin.apply(compiler); // 暴露compiler给plugin，plugin可以在compiler.hooks.webpackEvent.tap 上注册事件,当webpack执行到某一流程，那么插件就可以修改webpack的数据。
    }
    compiler.hooks.environment.call();
    compiler.hooks.afterEnvironment.call();

    compiler.options = new WebpackOptionsApply().process(options, compiler);
    return compiler;
}
```



``` Compiler.js
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");

class Compiler extends Tapable {
    constructor(context) {
        super();
        this.hooks = {
            shouldEmit: new SyncBailHook(["compilation"]),
            done: new AsyncSeriesHook(["stats"]),
            beforeRun: new AsyncSeriesHook(["compiler"]),
			run: new AsyncSeriesHook(["compiler"]),
			emit: new AsyncSeriesHook(["compilation"]),
			afterEmit: new AsyncSeriesHook(["compilation"]),

			thisCompilation: new SyncHook(["compilation", "params"]),
			compilation: new SyncHook(["compilation", "params"]),
			normalModuleFactory: new SyncHook(["normalModuleFactory"]),
			contextModuleFactory: new SyncHook(["contextModulefactory"]),

			beforeCompile: new AsyncSeriesHook(["params"]),
			compile: new SyncHook(["params"]),

			watchRun: new AsyncSeriesHook(["compiler"]),
			failed: new SyncHook(["error"]),
			invalid: new SyncHook(["filename", "changeTime"]),
			watchClose: new SyncHook([]),

			environment: new SyncHook([]),
			afterEnvironment: new SyncHook([]),
			afterPlugins: new SyncHook(["compiler"]),
			afterResolvers: new SyncHook(["compiler"]),
			entryOption: new SyncBailHook(["context", "entry"])
        };
        this.options = ({});
        this.context = context;
		this.requestShortener = new RequestShortener(context);
        this.running = false;
        this.watchMode = false;
    }
    watch(watchOptions, handler) {}
    run(callback) {}
    runAsChild(callback) {}
    purgeInputFileSystem() {}
    emitAssets(compilation, callback) {}
    emitRecords(callback) {}
    readRecords(callback) {}
    createChildCompiler(
        compilation,
        compilerName,
        compilerIndex,
        compilerOptions,
        plugins
    ) {}
    isChild() {}
    createCompilation() {}
    newCompilation(params) {}
    createNormalModuleFactory() {}
    createContextModuleFactory() {}
    newCompilationParams() {}
    compile(callback) {}
}

```


``` Compilation.js


```