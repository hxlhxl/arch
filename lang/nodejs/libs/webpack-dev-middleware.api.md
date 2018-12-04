
如果客户端请求文件不存在，调用`next()`交给web framework的默认处理。

- getFilenameFromUrl(pubPath, compiler, url) (from webpack-dev-middleware/lib/util)
    在客户端请求服务端时，根据请求中的`pathname`，得出webpack应该在outputPath中输出的文件名称(路径)

- ready(context, fn, req) (from webpack-dev-middleware/lib/util)
    调用`WebpackMiddleware(compiler)`的时候，`webpack-dev-middleware`会创建一个context(`createContext(compiler,options)`)，这个context中会注册Webpack `invalid`,`run`,`done`和`watchRun`阶段的事件处理函数。
    比如webpack.done的时候，会设置`context.state = true`表示webpack构建完成。
    而这里的ready就表示在`context.state`为true时，返回`return fn(context.webpackStats)`


- handleRequest(context, filename, processRequest, req) (from webpack-dev-middleware/lib/util)
    调用`ready(context, processRequest, req)`, 也就是说在Webpack构建完成之后，发送文件内容到客户端。
    
    processRequest实现如下：
    ```
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
      ```

