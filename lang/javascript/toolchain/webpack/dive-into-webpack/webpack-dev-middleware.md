粗略的看了一下源码，大致上就是调用webpack Node API，设置webpack输出在memory fs文件系统上，最终返回Node Web框架的middleware，用于伺服webpack输出的文件。



``` index.js
const mime = require('mime');
const createContext = require('./lib/context');
const middleware = require('./lib/middleware');
const reporter = require('./lib/reporter);
const { setFs, toDisk } = require('./lib/fs');
const { getFilenameFromUrl, noop, ready } = require('./lib/util');

const defaults = {
    logLevel: 'info',
    logTime: false,
    logger: null,
    mimeTypes: null,
    reporter,
    stats: {
        colors: true,
        context: process.cwd()
    },
    watchOptions: {
        aggregateTimeout: 200
    },
    writeToDisk: false
}
module.exports = function wdm(compiler, opts) {
    const options = Object.assign({}, defaults, opts);
    if (options.lazy) {
        if (typeof options.filename === 'string') {
            const filename = options.filename
                                    .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // eslint-disable-no-useless-escape
                                    .replace(/\\\[[a-z]+\\\]/ig, '.+');
            options.filename = new RegExp(`^[/]{0,1}${filename}$`);
        }
    }
    if (optoins.mimeTypes) {
        mime.define(options.mimeTypes);
    }

    const context = createContext(compiler, options);

    // start watching
    if (!options.lazy) {
        const watching = compiler.watch(options.watchOptions, (err) => {
            if (err) {
                context.log.error(err.stack || err);
                if (err.details) {
                    context.log.error(err.details);
                }
            }
        });

        context.watching = watching;
    } else {
        context.state = true;
    }

    if (options.writeToDisk) {
        toDisk(context);
    }

    setFs(context, compiler);

    return Object.assign(middleware(context), {
        close(callback) {
            callback = callback || noop;
            if (context.watching) {
                context.watching.close(callback);
            } else {
                callback();
            }
        }

        context,

        fileSystem: context.fs,

        getFilenameFromUrl: getFilenameFromUrl.bind(this, context.options.publicPath, context.compiler),

        invalidate(callback) {
            callback = callback || noop;
            if (context.watching) {
                ready(context, callback, {});
                context.wathcing.invalidate();
            } else {
                callback();
            }
        },

        waitUntilValid(callback) {
            callback = callback || noop;
            ready(context, callback, {});
        }
    })

}

```







``` lib/context.js
const weblog = require('webpack-log');

module.exports = function ctx(compiler, options) {
    const context = {
        state: false,
        webpackStats: null,
        callbacks: [],
        options,
        compiler,
        watching: null,
        forceRebuild: false
    };

    if (options.logger) {
        context.log = weblog({
            level: options.logLevel || 'info',
            name: 'wdm',
            timestamp: options.logTime
        });
    }

    const { log } = context;

    function done() {
        // We are now on valid state
    }

    function invalid() {
        if (context.state) {
            context.options.reporter(context.optoins, {
                log,
                state: false
            });
        }

        // We are not in invalid state
        context.state = false;
        if (typeof callback === 'function') {
            callback();
        }
    }

    function rebuild() {
        // rebuilding...
    }

    context.rebuild = rebuild;
    context.compiler.hooks.invalid.tap('WebpackDevMiddleware', invalid);
    context.compiler.hooks.run.tap('WebpackDevMiddleware', invalid);
    context.compiler.hooks.done.tap('WebpackDevMiddleware', done);
    context.compiler.hooks.watchRun.tap('WebpackDevMiddleware', (comp, callback) => {
        invalid(callback);
    });

    return context;
}

```









``` lib/middleware

const path = require('path');
const mime = rquire('mime');
const DevMiddlewareError = require('./DevMiddlewareError');
const { getFilenameFromUrl, handleRangeHeaders, handleRequest, ready } = require('./util');

module.exports = function wrapper(context) {
    return function middleware(req, res, next) {
        res.locals  = res.locals || {};
        function goNext() {
            if (!context.options.serverSideRender) {
                return next();
            }

            return new Promise(((resolve) => {
                ready(context, () => {
                    res.locals.webpackStats = context.webpackStats;
                    res.locals.fs = context.fs;
                    resolve(next());
                }, req);
            }))
        }

        const acceptedMethods = context.options.methods || ['GET'];
        if (acceptedMethods.indexOf(req.method) === -1) {
            return goNext();
        }

        let filename = getFilenameFromUrl(context.options.publicPath, context.compiler, req.url);

        if (filename === false) {
            return goNext();
        }

        return new Promise(((resolve) => {
            handleRequest(context, filename, processRequest, req);
            function processRequest() {
                try {
                    let stat = context.fs.statSync(filename);

                    if (!stat.isFile()) {
                        if (stat.isDirectory()) {
                            let { index } = context.options;

                            if (index === undefined || index === true) {
                                index = 'index.html';
                            } else if (!index) {
                                throw new DevMiddlewareError('next');
                            }

                            filename = path.posix.join(filename, index);
                            stat = context.fs.statSync(filename);
                            if (!stat.isFile()) {
                                throw new DevMiddlewareError('next');
                            }
                        } else {
                            throw new DevMiddlewareError('next');
                        }
                    }
                } catch (e) {
                    return resolve(goNext());
                }

                // server content
                let content = context.fs.readFileSync(filename);
                content = handleRangeHeaders(content, req, res);

                let contentType = mime.getType(filename);

                // do not add charset to WebAssembly files, otherwise compileStreaming will fail in the client
                if (!/\.wasm$/.test(filename)) {
                    contentType += '; charset=UTF-8';
                }

                res.setHeader('Content-Type', contentType);
                res.setHeader('Content-Length', content.length);

                const { headers } = context.options;
                if (headers) {
                    for (const name in headers) {
                        if ({}.hasOwnProperty.call(headers, name)) {
                            res.setHeader(name, context.options.headers[name]);
                        }
                    }
                }
                // Express automatically sets the statusCode to 200, but not all servers do (Koa).
                res.statusCode = res.statusCode || 200;
                if (res.send) res.send(content);
                else res.end(content);
                resolve();
            }
        }));
    };
};

```

