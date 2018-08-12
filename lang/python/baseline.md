# 多线程


# 异步IO
通常情况下，我们写的程序都是同步的。在只有一个主线程的程序中，如果程序遇到`网络IO`或者`硬盘IO`的时候，主线程必须等待这个函数返回才能继续后面的工作。
上面这种情况对CPU的利用率极低，不应该出现在生产环境。

正是因为在只有一个主线程的情况下，程序会非常慢，所以可以使用`多进程`和`多线程`方案解决这些场景，当一个任务因为IO被阻塞，整个程序可以去做其他线程内的事情。不过，CPU的上下文切换也会产生额外的消耗，所以多线程、多进程在某些场景下也有一定的瓶颈。

上面说的都是同步模型，函数的返回始终都是一步一步的。

而异步IO的核心是`事件循环(Event Loop)`，主程序运行在事件循环框架之下，不管是多线程还是单线程，一个线程中的函数不再是同步的，而是会立即返回，然后以事件的形式通知主线程，CPU再去作相应的处理。
在这种模型下，即使只有一个主线程，但是在这个线程内部，却可以调用非常多个这样的异步函数，而且更方便的是，这些函数在同一个线程中，不存在多线程中的锁机制，在一个线程中就可以判断共享资源的状态。

```
def consumer():
    r = ''
    while True:
        n = yield r
        if not n:
            return
        print('[CONSUMER] Consuming %s...' % n)
        r = '200 OK'

def produce(c):
    c.send(None)
    n = 0
    while n < 5:
        n = n + 1
        print('[PRODUCER] Producing %s...' % n)
        r = c.send(n)
        print('[PRODUCER] Consumer return: %s' % r)
    c.close()

c = consumer()
produce(c)
```

## asyncio

```
import threading
import asyncio

@asyncio.coroutine
def hello():
    print('Hello world! (%s)' % threading.currentThread())
    yield from asyncio.sleep(1)
    print('Hello again! (%s)' % threading.currentThread())

loop = asyncio.get_event_loop()
tasks = [hello(), hello()]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()

```

## async/await

`yield from iterable`本质上就是`for item in iterable: yield item`

`async`是`@asyncio.coroutine`
`await`是`yield from`


```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import threading
import asyncio

async def hello():
    print('Hello world! (%s)' % threading.currentThread())
    await asyncio.sleep(1)
    print('Hello again! (%s)' % threading.currentThread())

loop = asyncio.get_event_loop()
tasks = [hello(), hello()]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
```

# yield

- 简单函数中如果有`yield`关键字，那么这个函数在调用的时候，会立即返回，直到去迭代这个函数的返回值，才会真正地调用函数中的语句
- 



# Reference

[logging模块超详细](https://www.cnblogs.com/yyds/p/6901864.html)
[logging模块进一步例子](https://www.cnblogs.com/i-honey/p/8052579.html)

[Tutorial](http://sdiehl.github.io/gevent-tutorial/)
[Example](http://www.bjhee.com/gevent.html): 我觉得OJBK。
[Gevent Api](http://www.gevent.org/api/)
[Gevent Pool](http://www.gevent.org/api/gevent.pool.html)

