1. 简单例子
```
class P(object):
    # 私有变量
    def __init__(self,x):
        self.__x = x
    def get_x(self):
        return self.__x
    def set_x(self,x):
        self.__x = x

# 使用
p1 = P(8)
p2 = P(88)
p1.set_x(p1.get_x()+p2.get_x()) # ugly...
# 报错: AttributeError: 'P' object has no attribute '__x'
# P.__dict__的值为：对外__x不可见
# {'__dict__': <attribute '__dict__' of 'P' objects>, '__module__': '__main__', '__weakref__': <attribute '__weakref__' of 'P' objects>, '__doc__': None, '__init__': <function __init__ at 0x1d92a28>}
p1.__x = p1.__x + p2.__x
# p1.__dict__: 加了前缀所以无法访问__x
# {'_P__x': 8}   
```

2. 公有成员变量
```
class P(object):
    def __init__(self,x):
        self.x = x
p1 = P(8)
p2 = P(88)
p1.x = p1.x + p2.x
# P.__dict__
# {'__dict__': <attribute '__dict__' of 'P' objects>, '__module__': '__main__', '__weakref__': <attribute '__weakref__' of 'P' objects>, '__doc__': None, '__init__': <function __init__ at 0x1c90a28>}

# p1.__dict__
# {'x': 96}
```


3. property

```
class P(object):
    def __init__(self,x,y):
        self.x = x
        self.__y = y
    @property
    def x(self):
        return self.__x
    @x.setter
    def x(self,x):
        if x < 0:
            self.__x = 0
        else if x > 1000:
            self.__x = 1000
        else:
            self.__x = x
    @property
    def access_y(self):
        print("P.y is %s" % self.__y)
```
加上@property之后，其装饰的方法成为了类的公有变量,可以暴露给外部访问，而且它可以访问内部的私有成员


4. 自我实现
```
class property_(object):
    def __init__(self, func):
        self.func = func
        self.name = func.__name__

    def __get__(self, instance, cls):
        print(
            'Called property from {instance} ',
            'of {klass}'.format(instance=instance, klass=cls)
        )
        return self.func(instance)

    def __set__(self, obj, value):
        # __set__的调用顺序为type(apple).__dict__['get_color'].__set__(apple,value)
        print(
            'Setting up {value} '
            'for {obj}'.format(value=value, obj=obj)
        )
        [setattr(obj, k, v) for k, v in value.items()]


class Apple(object):
    @property_  # 产生了一个对象：即Apple的成员函数get_color是property_类的实例,而这个实例实现了__get__方法，因此访问它会是如下效果： type(apple).__dict__['get_color'].__get__(apple,type(apple)),因此结果是先打印__get__中的语句，而self.func就是get_color没有装饰之前的形式，所以直接调用get_color方法打印其中的语句并返回"red"
    def get_color(self):
        print('Accessing get_color property')
        return 'red'

if __name__ == '__main__':
    apple = Apple()
    print(apple.get_color)
    apple.get_color = {'shape':'triangle'}
    print(apple.shape)


"""
结果：
Called property from <__main__.Apple object at 0x7ff05de056d0> of <class '__main__.Apple'>  # 访问__get__方法打印的语句
Accessing get_color property    调用self.func(instance)打印了get_color中的打印语句
red # print(apple.get_color)的返回值，即red


Setting up {'shape': 'triangle'} for <__main__.Apple object at 0x7ff05de056d0>
triangle
Deleting <__main__.Apple object at 0x7ff05de056d0>

"""
```