
# 引子
```
class A:
    def __init__(self,x):
        self.x = x
    def met(self,a,b):
        print a,b,self.x

a = A('c')

A.met(a,1,2)
''' # 结果
1 2 c
'''
```
可以发现不管是不是静态方法，都可以使用类名+实例调用哦。
之所以可以这样，是因为 类的所有 属性都是存储在__dict__ 中的，如果该类找不到，就会去父类中寻找。

# 变量类型

## 全局变量

## 局部变量

## 静态变量

## 实例变量


## 公有变量

## 私有变量

# 方法类型

## 静态方法 @staticmethod

- 不和任何对象绑定，所以静态方法的参数形式自定义。静态方法定义时 没有self 参数
- 类 和 实例 都能访问
- 类 和 实例 调用没有任何差别，只要和普通函数一样提供正确的参数即可
- 静态方法一般用于追踪所有实例的状态而不是用于单个实例的行为

``` example-1
class Singleton(object):
    # __type：双下划线无法直接访问，但是python内置有_Singleton__type这种方式可以访问的。
    __type = 'singleton dp'
    # 类属性通过类改变是所有的都修改了，通过实例改变只会修改和实例相关的变量
    text = 'text'

    # 静态方法
    @staticmethod
    def getInstance():
        obj = Singleton()
        return obj

inst = Singleton.getInstance()
inst.text = 'inst text'
print(inst._Singleton__type)
print(Singleton.text)   # 'text'
```


下面这个例子非常经典，在__init__中，self.__inst_num和InstNum.__inst_num指向同一变量，但是在self和InstNum上修改会有不同的效果，在self上修改只会影响实例本身，不会影响静态变量；在InstNum上修改，会影响静态变量，进而影响所有实例。
``` example-2
class InstNum(object):
    __inst_num = 0
    def __init__(self):
        print('InstNum.__inst_num id: ',id(InstNum.__inst_num),'value is: ',InstNum.__inst_num)
        print('self.__inst_num id: ',id(self.__inst_num),'value is: ',self.__inst_num)
        self.__inst_num += 1
        InstNum.__inst_num += 1
    def instNum(self):
        return self.__inst_num
    @staticmethod
    def getInstNum():
        return InstNum.__inst_num

inst1 = InstNum()
inst2 = InstNum()
print(inst1.instNum())  # 1
print(inst2.instNum())  # 2
print(InstNum.getInstNum()) # 2
```

## 类方法 @classmethod

- 绑定在类上的方法，方法第一个参数必须为 cls
- 类 和 实例 都能访问
- 类或者实例 访问的时候，都会把绑定的 类 作为参数传递给 类方法

```
class Pizza(object):
    radius = 42
    @classmethod
    def get_radius(cls):
        return cls.radius

print(Pizza.get_radius)
print(Pizza().get_radius)

'''
<bound method Pizza.get_radius of <class '__main__.Pizza'>>
<bound method Pizza.get_radius of <class '__main__.Pizza'>>
'''

```

## 抽象方法 @abstractmethod

- 本质上和Java中的 interface一致
- 基类中定义
- 子类继承基类，子类实现基类中定义的抽象方法
- 使用abstractmethod之后，子类必须显示实现抽象方法，否则报错：TypeError: Can't instantiate abstract class ChildPizza with abstract methods get_radius


``` example-1
class BasePizza(object):
    def get_radius(self):
        raise NotImplementedError

class ChildPizza(BasePizza):
    def __init__(self,radius):
        self.radius = radius
    def get_radius(self):
        return self.radius

child = ChildPizza(42)
print('child radius:',child.get_radius())
base = BasePizza()
print('base radius:',base.get_radius()) # NotImplementedError
```



``` example-2

import abc
import six

@six.add_metaclass(abc.ABCMeta)
class BasePizza(object):
    @abc.abstractmethod
    def get_radius(self):
        """"""
# 以上抽象类和下面定义一致
'''
class BasePizza(object):
    __metaclass__ = abc.ABCMeta
    @abc.abstractmethod
    def get_radius(self):
        """"""

'''
# 或者下面这种模式
'''
class BasePizza(object,metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def get_radius(self):
        """"""

'''

class ChildPizza(BasePizza):
    def __init__(self,radius):
        self.radius = radius
    def get_radius(self):
        return self.radius

child = ChildPizza(42)
print('child radius:',child.get_radius())
# 实例化抽象类直接报错
base = BasePizza()  # TypeError: Can't instantiate abstract class BasePizza with abstract methods get_radius
print('base radius:',base.get_radius())



```

## 实例方法 bound method

- 绑定在实例上，方法第一个参数必须为 self
- 类 和 实例 都能访问
- 实例访问自动把实例作为参数传递给实例方法，类访问必须显示传递实例对象


```
class InstNum(object):
    __inst_num = 0
    def __init__(self):
        print('InstNum.__inst_num id: ',id(InstNum.__inst_num),'value is: ',InstNum.__inst_num)
        print('self.__inst_num id: ',id(self.__inst_num),'value is: ',self.__inst_num)
        self.__inst_num += 1
        InstNum.__inst_num += 1
    def instNum(self):
        return self.__inst_num
    @staticmethod
    def getInstNum():
        return InstNum.__inst_num

inst1 = InstNum()
print('instance invoke: ',inst1.instNum())  # 1
print('class invoke: ',InstNum.instNum(inst1))  # 1
```


# 函数重载

- 参数类型不同
- 参数个数不同

Python都有处理方案，因此不需要使用函数重载技术


# duck-typing

当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。

我们并不关心对象是什么类型，到底是不是鸭子，只关心行为。

# 参考
[https://julien.danjou.info/blog/2013/guide-python-static-class-abstract-methods](https://julien.danjou.info/blog/2013/guide-python-static-class-abstract-methods)