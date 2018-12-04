
# Flow

router

router.use(query middleware)
router.use(init middleware)


# 中间件

app.use(function(req, res, next) {})  // 默认path为`/`,会匹配所有路由
app.use() only see whether url starts with specified path where app.all() will match complete path.


next() call inside a middleware invokes the next middleware or route handler depending on whichever is declared next. But next() call inside a route handler invokes the next route handler only. If there is a middleware next then it’s skipped. Therefore middlewares must be declared above all route handlers.



middleware和router之间存在顺序，一般时middleware位于最前面
middleware和router中如果不调用next或者end,那么express会阻塞，客户端最终获得empty response
middleware和router调用next，则会最终把req，res传递到下一个middleware或者router
next('route')只对router(app.get, app.post等)有作用，表示跳过下一个route callback，middleware仍然会执行。
如果next()之后还有代码，而不是`return next()`或者`next(); return;`，那么这个middleware next之后的代码在请求结束之后还会执行。


- 应用级中间件
```
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

```
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

```


- 路由级中间件
```
var app = express()
var router = express.Router()

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', function (req, res) {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  res.sendStatus(401)
})
```
- 错误处理中间件
```
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
- 内置中间件
```
express.static
express.json
express.urlencoded
```

- 第三方中间件
```
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```


# Application
```
var app = function(req, res, next) {
    app.handle(req, res, next);
}
```

## init

```app.settings

app.settings = {
    /**
        compileQueryParser('extended') = function parseExtendedQueryString(str) {
        return qs.parse(str, {
            allowPrototypes: true
        });
        }
    */
    'query parser fn': compileQueryParser('extended')
    
}

```

## Attributes

- app.settings
- app._route
    Router类实例
## API

- app.get(path)
    只有path是，从app.settings中获取值
    有path和handler的时候，
- app.set(setting, val)
    在app.settings上设置kv，如果只有setting，则返回对应的value
    如果setting为`etag`,`query parser`和`trust proxy`的时候，还会再app.settings上设置对应的函数比如： app.settings['etag fn'] = compileETag(val)
- app.enable(setting)
    本质为 this.set(setting, true);

- app.lazyrouter()
    再app添加一个Router实例到_router上

    ```
    if (!this._router) {
      this._router = new Router({
        caseSensitive: this.enabled('case sensitive routing'),
        strict: this.enabled('strict routing')
      });

      this._router.use(query(this.get('query parser fn')));
      this._router.use(middleware.init(this));
    }
    ```

- app.handle(req, res, callback)
    Dispatch a req, res pair into the application. Starts pipeline processing.
    最终是调用route上path对应的处理函数
    每当客户端发送一个请求，服务端都会使用app.router上对应path的handler去处理请求
    ```
      var router = this._router;

      // final handler
      var done = callback || finalhandler(req, res, {
        env: this.get('env'),
        onerror: logerror.bind(this)
      });

      // no routes
      if (!router) {
        debug('no routes defined on app');
        done();
        return;
      }

      router.handle(req, res, done);
    ```

- app.use(fn)
    调用app.lazyrouter()
    应用中间件
      如果是普通中间件，那么会直接router.use(path, fn), path默认为'/'
      如果中间件是一个express app，那么会存在paranet app, emit('mount')事件等

    0. 应用级中间件
      ```
        app.use(function (req, res, next) {
          console.log('Time:', Date.now())
          next()
        })
      ```
      在
    1. app.use(express.static(...))
      在'/'上使用中间件
    2. app.use('/user', fn);
      在'/user'上使用中间件


- app.listen()

  ```
  server = http.createServer(this);
  return server.listen.apply(server, arguments);
  ```
# Router

```
function router(req, res, next) {
  router.handle(req, res, next);
}
```

## Attributes
- stack
    [],layer栈
## API

- router.handle(fn)
- router.use(fn)
    路由中间件设置函数
    对于每个函数，都会在`router.stack`变量上如栈一个`Layer`实例，这个`layer`和`path`与`fn`绑定， 默认`path`为'/'
- router.handle(req, res, out)

## Layer


# middleware

## init

```
/*
 * Initialization middleware, exposing the
 * request and response to each other, as well
 * as defaulting the X-Powered-By header field.
 */

exports.init = function(app){
  return function expressInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
    req.res = res;
    res.req = req;
    req.next = next;

    setPrototypeOf(req, app.request)
    setPrototypeOf(res, app.response)

    res.locals = res.locals || Object.create(null);

    next();
  };
};
```

## query
返回 解析客户端query string 的中间件


# Layer




