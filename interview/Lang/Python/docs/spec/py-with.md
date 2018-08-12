[Understanding Python's "with" statement](http://effbot.org/zone/python-with-statement.htm)

[Python 中的关键字with详解](http://yuez.me/python-zhong-de-guan-jian-zi-with-xiang-jie/)

# with要解决的问题

```
with open('file.txt') as f:
    content = f.read()
```

在这段代码中，无论with中的代码块在执行的过程中发生任何情况，文件最终都会被关闭。如果代码块在执行的过程中发生了一个异常，那么在这个异常被抛出前，程序会先将被打开的文件关闭。这种代码可以优雅的消除**try ... except ... finally ...**代码块。


又如数据库代码

```
db.begin()

try:
    # do some actions
except:
    db.rollback()
    raise
else:
    db.commit()
```
如果改成with

```
with transaction(db):
    # do some actions
```



# with 的一般执行过程

```
with EXPR as VAR:
    BLOCK
```

1. 计算EXPR，并获取一个上下文管理器。
2. 上下文管理器的__exit()__方法被保存起来用于之后的调用。
3. 调用上下文管理器的__enter()__方法。
4. 如果with表达式包含as VAR，那么EXPR的返回值被赋值给VAR。
5. 执行BLOCK中的表达式。
6. 调用上下文管理器的__exit()__方法。如果BLOCK的执行过程中发生了一个异常导致程序退出，那么异常的type、value和traceback(即sys.exc_info()的返回值)将作为参数传递给__exit()__方法。否则，将传递三个None。
