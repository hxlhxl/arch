A Web Server Gateway Interface (WSGI) server implements the web server side of the WSGI interface for running Python web applications.


| ------------------  |           | ------------------- |
|                     |           |                     |
|                     |           | callable object()   |
|                     | invokes   |                     |        
|    WSGI Server      |-------->  |     WSGI application|
|wsgiref.simple_server|           |     frameworks      |
|                     |           |     + middlewares   |
|                     |           |                     |
| ------------------  |           | ------------------- |                

- what WSGI stands for (Web Server Gateway Inteface)

- that a WSGI container is a separate running process that runs on a different port than your web server

- your web server is configured to pass requests to the WSGI container which runs your web application, then pass the response (in the form of HTML) back to the requester



# WSGI协议
包含两部分，server+application，实现两种协议的app之间可以自由组合
## WSGI server

## 功能
从client(浏览器)接受请求，把request转发给application，把application返回的response转发给client
### 实现
uWSGI、Gunicorn

### 实现原理

```flask

class Flask(object):

    def run(self, host=None, port=None, debug=None, **options):
        """Runs the application on a local development server.

        Do not use ``run()`` in a production setting. It is not intended to
        meet security and performance requirements for a production server.
        Instead, see :ref:`deployment` for WSGI server recommendations.

        If the :attr:`debug` flag is set the server will automatically reload
        for code changes and show a debugger in case an exception happened.

        If you want to run the application in debug mode, but disable the
        code execution on the interactive debugger, you can pass
        ``use_evalex=False`` as parameter.  This will keep the debugger's
        traceback screen active, but disable code execution.

        It is not recommended to use this function for development with
        automatic reloading as this is badly supported.  Instead you should
        be using the :command:`flask` command line script's ``run`` support.

        .. admonition:: Keep in Mind

           Flask will suppress any server error with a generic error page
           unless it is in debug mode.  As such to enable just the
           interactive debugger without the code reloading, you have to
           invoke :meth:`run` with ``debug=True`` and ``use_reloader=False``.
           Setting ``use_debugger`` to ``True`` without being in debug mode
           won't catch any exceptions because there won't be any to
           catch.

        .. versionchanged:: 0.10
           The default port is now picked from the ``SERVER_NAME`` variable.

        :param host: the hostname to listen on. Set this to ``'0.0.0.0'`` to
                     have the server available externally as well. Defaults to
                     ``'127.0.0.1'``.
        :param port: the port of the webserver. Defaults to ``5000`` or the
                     port defined in the ``SERVER_NAME`` config variable if
                     present.
        :param debug: if given, enable or disable debug mode.
                      See :attr:`debug`.
        :param options: the options to be forwarded to the underlying
                        Werkzeug server.  See
                        :func:`werkzeug.serving.run_simple` for more
                        information.
        """
        from werkzeug.serving import run_simple
        if host is None:
            host = '127.0.0.1'
        if port is None:
            server_name = self.config['SERVER_NAME']
            if server_name and ':' in server_name:
                port = int(server_name.rsplit(':', 1)[1])
            else:
                port = 5000
        if debug is not None:
            self.debug = bool(debug)
        options.setdefault('use_reloader', self.debug)
        options.setdefault('use_debugger', self.debug)
        try:
            run_simple(host, port, self, **options)
        finally:
            # reset the first request information if the development server
            # reset normally.  This makes it possible to restart the server
            # without reloader and that stuff from an interactive shell.
            self._got_first_request = False

```


## WSGI application
## 功能
从server接受request，处理request返回response给server。
也还有middleware可以协调这些处理过程。    

### 实现
Flask、Django；二者同时也实现了wsgi server，但是仅用于本地开发调试用是最好的。


### 实现原理

- environ
a WSGI environment

- start_response
a callable accepting a status code,a list of headers and an optional exception context to start the response.
这个回调由wsgi server传入，这个东西接受HTTP Status Code + HTTP Headers，调用之后就相当于把这个Response会返回给wsgi server。

``` flask

class Flask(object):
    def wsgi_app(self, environ, start_response):
        """The actual WSGI application.  This is not implemented in
        `__call__` so that middlewares can be applied without losing a
        reference to the class.  So instead of doing this::

            app = MyMiddleware(app)

        It's a better idea to do this instead::

            app.wsgi_app = MyMiddleware(app.wsgi_app)

        Then you still have the original application object around and
        can continue to call methods on it.

        .. versionchanged:: 0.7
           The behavior of the before and after request callbacks was changed
           under error conditions and a new callback was added that will
           always execute at the end of the request, independent on if an
           error occurred or not.  See :ref:`callbacks-and-errors`.

        :param environ: a WSGI environment
        :param start_response: a callable accepting a status code,
                               a list of headers and an optional
                               exception context to start the response
        """
        ctx = self.request_context(environ)
        ctx.push()
        error = None
        try:
            try:
                response = self.full_dispatch_request()
            except Exception as e:
                error = e
                response = self.handle_exception(e)
            except:
                error = sys.exc_info()[1]
                raise
            return response(environ, start_response)
        finally:
            if self.should_ignore_error(error):
                error = None
            ctx.auto_pop(error)

    def __call__(self, environ, start_response):
        """Shortcut for :attr:`wsgi_app`."""
        return self.wsgi_app(environ, start_response)

    def __repr__(self):
        return '<%s %r>' % (
            self.__class__.__name__,
            self.name,
        )


```



# 自己实现一个wsgi server

[WSGI协议的原理及实现](http://geocld.github.io/2017/08/14/wsgi/)
[PEP 333](https://www.python.org/dev/peps/pep-0333/)

``` class WSGIServer
__init__:
    wsgi server的初始化操作
serve_forever:
    可以让wsgi server一直监听客户端请求
handle_one_request:
    对每一次请求进行参数解析，包括parse_request和get_environ
start_response:
    传递给application的回调函数，根据PEP333，start_response需要包含status, response_headers, exc_info三个参数。status是http的状态码，如“200 OK”,”404 Not Found”。response_headers是一个(header_name, header_value) 元组的列表，在进行application开发时需要注意这点。exc_info通常不需要，直接设置为None即可。具体的一些参数的解释可以参考协议的详细解释。
finish_response:
    解析一次请求后，需要关闭socket端口，同时将application返回的data返回至客户端。
```

wsgi server相当于一种代理模式，代理真正的app接收请求，并把相应代理给client。
其本质实际上就是HTTP协议。

```
(py2venv) [husa@ArchLinux-husa libs]$ telnet -E 127.0.0.1 8888
Trying 127.0.0.1...
Connected to 127.0.0.1.
Escape character is 'off'.
GET / HTTP/1.1
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 12
Date: Tue, 31 Mar 2015 12:54:48 GMT
Server: WSGIServer 0.2

hello world!Connection closed by foreign host.
```
