[中文文档](http://tornado-zh.readthedocs.io/zh/latest/guide/intro.html)
[英文文档](http://www.tornadoweb.org/en/stable/guide/intro.html)

# User's guide
Tornado 是一个Python web框架和异步网络库 起初由 FriendFeed 开发. 通过使用非阻塞网络I/O, Tornado 可以支持上万级的连接，处理 长连接, WebSockets, 和其他 需要与每个用户保持长久连接的应用.

Tornado 大体上可以被分为4个主要的部分:

- web框架 (包括创建web应用的 RequestHandler 类，还有很多其他支持的类).
- HTTP的客户端和服务端实现 (HTTPServer and AsyncHTTPClient).
- 异步网络库 (IOLoop and IOStream), 为HTTP组件提供构建模块，也可以用来实现其他协议.
- 协程库 (tornado.gen) 允许异步代码写的更直接而不用链式回调的方式.

Tornado web 框架和HTTP server 一起为 WSGI 提供了一个全栈式的选择. 在WSGI容器 (WSGIAdapter) 中使用Tornado web框架或者使用Tornado HTTP server 作为一个其他WSGI框架(WSGIContainer)的容器,这样的组合方式都是有局限性的. 为了充分利用Tornado的特性,你需要一起使用Tornado的web框架和HTTP server.

## 异步和非阻塞IO
实时web功能需要为每个用户提供一个多数时间被闲置的长连接, 在传统的同步web服务器中，这意味着要为每个用户提供一个线程, 当然每个线程的开销都是很昂贵的.

为了尽量减少并发连接造成的开销，Tornado使用了一种单线程事件循环的方式. 这就意味着所有的应用代码都应该是异步非阻塞的, 因为在同一时间只有一个操作是有效的.

异步和非阻塞是非常相关的并且这两个术语经常交换使用,但它们不是完全相同的事情.

## 阻塞
一个函数在等待某些事情的返回值的时候会被 阻塞. 函数被阻塞的原因有很多: 网络I/O,磁盘I/O,互斥锁等.事实上 每个 函数在运行和使用CPU的时候都或多或少 会被阻塞(举个极端的例子来说明为什么对待CPU阻塞要和对待一般阻塞一样的严肃: 比如密码哈希函数 bcrypt, 需要消耗几百毫秒的CPU时间,这已 经远远超过了一般的网络或者磁盘请求时间了).

一个函数可以在某些方面阻塞在另外一些方面不阻塞.例如, tornado.httpclient 在默认的配置下,会在DNS解析上面阻塞,但是在其他网络请 求的时候不阻塞 (为了减轻这种影响，可以用 ThreadedResolver 或者是 通过正确配置 libcurl 用 tornado.curl_httpclient 来做). 在Tornado的上下文中,我们一般讨论网络I/O上下文的阻塞,尽管各种阻塞已经被最小 化.

## 异步
异步 函数在会在完成之前返回，在应用中触发下一个动作之前通常会在后 台执行一些工作(和正常的 同步 函数在返回前就执行完所有的事情不同).这里列 举了几种风格的异步接口:

- 回调参数
- 返回一个占位符 (Future, Promise, Deferred)
- 传送给一个队列
- 回调注册表 (POSIX信号)

不论使用哪种类型的接口, 按照定义 异步函数与它们的调用者都有着不同的交互方 式;也没有什么对调用者透明的方式使得同步函数异步(类似 gevent 使用轻量级线程的系统性能虽然堪比异步系统,但它们并 没有真正的让事情异步).

一个简单的同步函数:
```
from tornado.httpclient import HTTPClient

def synchronous_fetch(url):
    http_client = HTTPClient()
    response = http_client.fetch(url)
    return response.body
```

把上面的例子用回调参数重写的异步函数:
```
from tornado.httpclient import AsyncHTTPClient

def asynchronous_fetch(url, callback):
    http_client = AsyncHTTPClient()
    def handle_response(response):
        callback(response.body)
    http_client.fetch(url, callback=handle_response)
```
使用 Future 代替回调:
```
from tornado.concurrent import Future

def async_fetch_future(url):
    http_client = AsyncHTTPClient()
    my_future = Future()
    fetch_future = http_client.fetch(url)
    fetch_future.add_done_callback(
        lambda f: my_future.set_result(f.result()))
    return my_future
```

Future 版本明显更加复杂，但是 Futures 却是Tornado中推荐的写法 因为它有两个主要的优势.首先是错误处理更加一致,因为 Future.result 方法可以简单的抛出异常(相较于常见的回调函数接口特别指定错误处理), 而且 Futures 很适合和协程一起使用.协程会在后面深入讨论.这里是上 面例子的协程版本,和最初的同步版本很像:
```
from tornado import gen

@gen.coroutine
def fetch_coroutine(url):
    http_client = AsyncHTTPClient()
    response = yield http_client.fetch(url)
    raise gen.Return(response.body)
```
raise gen.Return(response.body) 声明是在Python 2 (and 3.2)下人为 执行的, 因为在其中生成器不允许返回值.为了克服这个问题,Tornado的协程 抛出一种特殊的叫 Return 的异常. 协程捕获这个异常并把它作为返回值. 在Python 3.3和更高版本,使用 return response.body 有相同的结果.

## 协程
Tornado中推荐使用 协程 写异步代码. 协程使用了Python的 yield 关键字代替链式回调来将程序挂起和恢复执行(像在 gevent 中出现的轻量级线程合作方式有时也被称为协程, 但是在Tornado中所有的协程使用明确的上下文切换,并被称为异步函数).

使用协程几乎像写同步代码一样简单, 并且不需要浪费额外的线程. 它们还通过减少上下文切换来 使并发编程更简单 .

例子:
```
from tornado import gen

@gen.coroutine
def fetch_coroutine(url):
    http_client = AsyncHTTPClient()
    response = yield http_client.fetch(url)
    # 在Python 3.3之前, 在generator中是不允许有返回值的
    # 必须通过抛出异常来代替.
    # 就像 raise gen.Return(response.body).
    return response.body
```

## Python 3.5: async and await
Python 3.5 引入了 async 和 await 关键字(使用这些关键字的 函数也被称为”原生协程”). 从Tornado 4.3, 你可以用它们代替 yield 为基础的协程. 只需要简单的使用 async def foo() 在函数定义的时候代替 @gen.coroutine 装饰器, 用 await 代替yield. 本文档的其他部分会继续使用 yield 的风格来和旧版本的Python兼容, 但是如果 async 和 await 可用的话，它们运行起来会更快:
```
async def fetch_coroutine(url):
    http_client = AsyncHTTPClient()
    response = await http_client.fetch(url)
    return response.body
```

await 关键字比 yield 关键字功能要少一些. 例如,在一个使用 yield 的协程中， 你可以得到 Futures 列表, 但是在原生协程中,你必须把列表用 tornado.gen.multi 包起来. 你也可以使用 tornado.gen.convert_yielded 来把任何使用 yield 工作的代码转换成使用 await 的形式.

虽然原生协程没有明显依赖于特定框架(例如它们没有使用装饰器,例如 tornado.gen.coroutine 或 asyncio.coroutine), 不是所有的协程都和其他的兼容. 有一个 协程执行者(coroutine runner) 在第一个协程被调用的时候进行选择, 然后被所有用 await 直接调用的协程共享. Tornado 的协程执行者(coroutine runner)在设计上是多用途的,可以接受任何来自其他框架的awaitable对象; 其他的协程运行时可能有很多限制(例如, asyncio 协程执行者不接受来自其他框架的协程). 基于这些原因,我们推荐组合了多个框架的应用都使用Tornado的协程执行者来进行协程调度. 为了能使用Tornado来调度执行asyncio的协程, 可以使用 tornado.platform.asyncio.to_asyncio_future 适配器.

## 它是如何工作的
包含了 yield 关键字的函数是一个 生成器(generator). 所有的生成器都是异步的; 当调用它们的时候,会返回一个生成器对象,而不是一个执行完的结果. @gen.coroutine 装饰器通过 yield 表达式和生成器进行交流, 而且通过返回一个 Future 与协程的调用方进行交互.

下面是一个协程装饰器内部循环的简单版本:
```
# tornado.gen.Runner 简化的内部循环
def run(self):
    # send(x) makes the current yield return x.
    # It returns when the next yield is reached
    future = self.gen.send(self.next)
    def callback(f):
        self.next = f.result()
        self.run()
    future.add_done_callback(callback)
```
装饰器从生成器接收一个 Future 对象, 等待(非阻塞的)这个 Future 对象执行完成, 然后”解开(unwraps)” 这个 Future 对象，并把结果作为 yield 表达式的结果传回给生成器. 大多数异步代码从来不会直接接触 Future 类 除非 Future 立即通过异步函数返回给 yield 表达式.


## 如何调用协程
协程一般不会抛出异常: 它们抛出的任何异常将被 Future 捕获 直到它被得到. 这意味着用正确的方式调用协程是重要的, 否则你可能有被 忽略的错误:
```
@gen.coroutine
def divide(x, y):
    return x / y

def bad_call():
    # 这里应该抛出一个 ZeroDivisionError 的异常, 但事实上并没有
    # 因为协程的调用方式是错误的.
    divide(1, 0)
```
几乎所有的情况下, 任何一个调用协程的函数都必须是协程它自身, 并且在 调用的时候使用 yield 关键字. 当你复写超类中的方法, 请参阅文档, 看看协程是否支持(文档应该会写该方法 “可能是一个协程” 或者 “可能返回 一个 Future ”):

```
@gen.coroutine
def good_call():
    # yield 将会解开 divide() 返回的 Future 并且抛出异常
    yield divide(1, 0)
```

有时你可能想要对一个协程”一劳永逸”而且不等待它的结果. 在这种情况下, 建议使用 IOLoop.spawn_callback, 它使得 IOLoop 负责调用. 如果 它失败了, IOLoop 会在日志中把调用栈记录下来:
```
# IOLoop 将会捕获异常,并且在日志中打印栈记录.
# 注意这不像是一个正常的调用, 因为我们是通过
# IOLoop 调用的这个函数.
IOLoop.current().spawn_callback(divide, 1, 0)
```
最后, 在程序顶层, 如果 `.IOLoop` 尚未运行, 你可以启动 IOLoop, 执行协程,然后使用 IOLoop.run_sync 方法停止 IOLoop . 这通常被 用来启动面向批处理程序的 main 函数:
```
# run_sync() 不接收参数,所以我们必须把调用包在lambda函数中.
IOLoop.current().run_sync(lambda: divide(1, 0))
```


# Web framework

## tornado.web-- ReqeustHandler和Application类
线程安全说明
一般情况下, 在 RequestHandler 中的方法和Tornado 中其他的方法不是 线程安全的. 尤其是一些方法, 例如 write(), finish(), 和 flush() 要求只能从 主线程调用. 如果你使用多线程, 那么在结束请求之前, 使用 IOLoop.add_callback 来把控制权传送回主线程是很重要的.

`class tornado.web.Application(handlers=None, default_host='', transforms=None, **settings)`

# HTTP servers and clients

# Asynchronous networking

# Coroutines and concurrency

# Integration with other services Utilities

# Frequently Asked Questions