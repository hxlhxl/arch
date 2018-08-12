# 装饰器
0. when execute?
a. import
b. define

1. 简单函数
```
def func():
    print("my func called")
```

2. 在函数前/后增加新功能
```
def deco(func):
    print("before func called") #1
    func()
    print("after func called")  #2
    return func # 返回被装饰的func
def func():
    print("func called")
func = deco(func)
# 这样#1和#2会立即执行，调用func并不会打印前后新增功能
# 这是因为装饰器函数会立即执行，不会添加到被装饰的函数中去，除非嵌套两次
```

3. 使用@
```
def deco(func):
    print("before func called") #1
    func()
    print("after func called")  #2
    return func
@deco # 会立即执行#1和#2
def func():
    print("func called")
func()
```

4. 两层嵌套
```
def deco(func):
    def _deco():
        print("befor func called")  #1
        func()
        print("after func called")  #2
        return func
    return _deco
@deco
def func():
    print("func called")
func()
# #1和#2不会立即执行，因为内层返回的是一个函数，这时装饰器就具备了添加功能的行为了
```

5. 装饰带参函数
```
def deco(func):
    def _deco(a,b): # _deco函数能够截获func的参数,本质上由于返回的是_deco函数，因此这个_deco函数的参数就是被装饰器函数传入的参数
        print("befor func called")  #1
        func(a,b)
        print("after func called")  #2
        return func
    return _deco   
@deco    
def func(a,b):
    print("func called with %s,%s" % (a,b))
func('a','b')
```

6. 装饰带参函数之不定参数
```
def deco(func):
    def _deco(*args,**kwargs):
        print("before func called")
        func(*args,**kwargs)
        print("after func called")
        return func
    return _deco
@deco
def func(a,b,c="c"):
    print("func called with %s,%s,%s" % (a,b,c))
func("a","b")
```


7. 装饰器带参
```
def deco(a,b,c="c"):
    def _deco(func):
        def __deco(*args,**kwargs):
            print("before func called with deco args %s,%s,%s" % (a,b,c))
            func(*args,**kwargs)
            print("after func called with deco args %s,%s,%s" % (a,b,c))
            return func
        return __deco
    return _deco
@deco("a","b")
def func(x,y,z="z"):
    print("func called with %s,%s,%s" % (x,y,z))

func("x","y")
```


8. 装饰器带参，参数为类或者类实例
```
class locker:
    def __init__(self):
        print("locker.__init__() should be not called.")

    #@staticmethod
    def acquire(self):
        print("locker.acquire() called.（这是静态方法）")

    #@staticmethod
    def release(self):
        print("  locker.release() called.（不需要对象实例）")

def deco(cls):
    '''cls 必须实现acquire和release静态方法'''
    def _deco(func):
        def __deco():
            print("before %s called [%s]." % (func.__name__, cls))
            cls.acquire()
            try:
                return func()
            finally:
                cls.release()
        return __deco
    return _deco

@deco(locker())
def func():
    print(" func() called.")

myfunc()
```


9. 类装饰器(装饰器不再是函数，而是一个类)
核心：使用__init__和__call__实现

```
ref: https://krzysztofzuraw.com/blog/2016/python-class-decorators.html
class decorator(object):
    def __init__(self, func):
        self.func = func

    def __call__(self, *args):
        print('Called {func} with args: {args}'.format(func=self.func.func_name,
                                                       args=args))
        return self.func(*args)

@decorator  # 1. 首先调用__init__方法，而被装饰函数func作为类decorator的参数传递，这样就实例化了类decorator 2. decorator类的对象callable，因此装饰了func
def func(x,y):
    return x,y

if __name__ == '__main__':  # Called func with args: (1, 2)
    func(1,2)
```


10. 装饰器的装饰对象不再是函数而是 类

```
def decorator(cls):
    class Wrapper(object):
        def __init__(self, *args):
            self.wrapped = cls(*args)

        def __getattr__(self, name):
            print('Getting the {} of {}'.format(name, self.wrapped))
            return getattr(self.wrapped, name)

    return Wrapper

@decorator
class C(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y


if __name__ == '__main__':
    x = C(1,2)
    print(x.x)

```



11. functools.wraps

```

def deco(func):
    def _deco(a,b): # _deco函数能够截获func的参数,本质上由于返回的是_deco函数，因此这个_deco函数的参数就是被装饰器函数传入的>参数
        print("befor func called")  #1
        func(a,b)
        print("after func called")  #2
        return func
    return _deco
@deco
def func(a,b):
    print("func called with %s,%s" % (a,b))
func('a','b')
print func.__name__     # _deco被装饰后这个函数的名称发生了变化
```

使用functools.wraps即可解决问题。
```
def deco(func):
    # ref: https://docs.python.org/2/library/functools.html#functools.wraps
    @functools.wraps(func)  # 改变了函数被装饰函数的名称为原名称
    def _deco(a,b): 
        print("befor func called")  #1
        func(a,b)
        print("after func called")  #2
        return func
    return _deco
@deco
def func(a,b):
    print("func called with %s,%s" % (a,b))
func('a','b')
print func.__name__ # func

```


12. django_ cached_property

```
class cached_property:
    """
    Decorator that converts a method with a single self argument into a
    property cached on the instance.
    Optional ``name`` argument allows you to make cached properties of other
    methods. (e.g.  url = cached_property(get_absolute_url, name='url') )
    """
    def __init__(self, func, name=None):
        self.func = func
        self.__doc__ = getattr(func, '__doc__')
        self.name = name or func.__name__

    def __get__(self, instance, cls=None):
        if instance is None:
            return self
        res = instance.__dict__[self.name] = self.func(instance)
        return res
```