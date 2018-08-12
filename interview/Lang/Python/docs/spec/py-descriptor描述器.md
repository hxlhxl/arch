1. 定义
默认对属性的访问控制是从对象的字典里面(__dict__)中获取(get),设置(set)和删除(delete)
比如：

    obj.x的访问控制顺序为： obj.__dict__['x'] -> type(obj).__dict__['x'] -> objFather.__dict__['x']

2. 协议
```
descr.__get__(self, obj, type=None) --> value

descr.__set__(self, obj, value) --> None

descr.__delete__(self, obj) --> None
```
一个对象如果定义以上任意一种方法都会被成为描述器
如果同时定义__get__和__set__则被成为资料描述器(data descriptor)
仅定义__get__叫做非资料描述器
    二者区别：
        相对于实例的字典的优先级。如果实例字典中有与描述器同名的属性，如果描述器是资料描述器，优先使用资料描述器，如果是非资料描述器，优先使用字典中的属性。(译者注：这就是为何实例 a 的方法和属性重名时，比如都叫 foo Python会在访问 a.foo 的时候优先访问实例字典中的属性，因为实例函数的实现是个非资料描述器)
        要想制作一个只读的资料描述器，需要同时定义 __set__ 和 __get__,并在 __set__ 中引发一个 AttributeError 异常。定义一个引发异常的 __set__ 方法就足够让一个描述器成为资料描述器。
如果这种查找找到的值是一个descriptor


3. 描述器的调用
如果d是实现了描述器的类 的实例，使用obj.d会首先在obj的字典中查找d，如果d定义了__get__方法，那么d.__get__(obj)会依据下面顺序被调用。
对于对象来讲，方法 object.__getattribute__() 把 b.x 变成 type(b).__dict__['x'].__get__(b, type(b)) 。具体实现是依据这样的优先顺序：资料描述器优先于实例变量，实例变量优先于非资料描述器，__getattr__()方法(如果对象中包含的话)具有最低的优先级。
对于类来讲，方法 type.__getattribute__() 把 B.x 变成 B.__dict__['x'].__get__(None, B) 。
```
class RevealAccess(object):
    """A data descriptor that sets and returns values
       normally and prints a message logging their access.
    """

    def __init__(self, initval=None, name='var'):
        self.val = initval
        self.name = name

    def __get__(self, obj, objtype):
        print type(obj)     # <class '__main__.MyClass'>
        print 'Retrieving', self.name
        return self.val

    def __set__(self, obj, val):
        print 'Updating' , self.name
        self.val = val

>>> class MyClass(object):
    x = RevealAccess(10, 'var "x"')
    y = 5

>>> m = MyClass()
>>> m.x             # 这里调用了type(m).__dict__['x'].__get__(m,type(m))
Retrieving var "x"  
10
>>> m.x = 20    
Updating var "x"
>>> m.x
Retrieving var "x"
20
>>> m.y
5
```
这个协议非常简单，并且提供了令人激动的可能。一些用途实在是太普遍以致于它们被打包成独立的函数。像属性(property), 方法(bound和unbound method), 静态方法和类方法都是基于描述器协议的。



4. property
官方文档

```
class property(fget=None, fset=None, fdel=None, doc=None)
Return a property attribute.

fget is a function for getting an attribute value. fset is a function for setting an attribute value. fdel is a function for deleting an attribute value. And doc creates a docstring for the attribute.

A typical use is to define a managed attribute x:

class C:
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")
If c is an instance of C, c.x will invoke the getter, c.x = value will invoke the setter and del c.x the deleter.

If given, doc will be the docstring of the property attribute. Otherwise, the property will copy fget‘s docstring (if it exists). This makes it possible to create read-only properties easily using property() as a decorator:

class Parrot:
    def __init__(self):
        self._voltage = 100000

    @property
    def voltage(self):
        """Get the current voltage."""
        return self._voltage
The @property decorator turns the voltage() method into a “getter” for a read-only attribute with the same name, and it sets the docstring for voltage to “Get the current voltage.”

A property object has getter, setter, and deleter methods usable as decorators that create a copy of the property with the corresponding accessor function set to the decorated function. This is best explained with an example:

class C:
    def __init__(self):
        self._x = None

    @property
    def x(self):
        """I'm the 'x' property."""
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @x.deleter
    def x(self):
        del self._x
This code is exactly equivalent to the first example. Be sure to give the additional functions the same name as the original property (x in this case.)

The returned property object also has the attributes fget, fset, and fdel corresponding to the constructor arguments.

Changed in version 3.5: The docstrings of property objects are now writeable.


```