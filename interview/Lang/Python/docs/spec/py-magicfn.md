1. __call__
在类中使用是，可以让类的实例变成callable
```
class P(object):
    def __call__(self,a,b,c):
        print("class obj called with %s,%s,%s" % (a,b,c))
p = P()
p(1,2,3)    # class obj called with 1,2,3
```

2. __new__
定义：
object.__new__(cls[, ...])
    调用时会返回参数cls【类】的实例【instance】，__new__()是一个静态方法，它的第一个参数是将要实例化对象的类原型。其余的参数是原型类构造函数的参数。
    典型的实现是调用父类的__new__()方法：super(currentclass,cls).__new__(cls,[,...])，然后在返回实例之前修改一些地方。

    如果__new__()返回的是cls的实例，那么紧接着这个cls的实例instanceOfCls就会作为__init__(self,...)的第一个参数self传递进去，其余的参数将会是和__new__()剩余参数一样的。

    如果__new__()没有返回cls的实例，那么之后的__init__()方法就不会被调用。

```


```


3. __init__
    在__new__()方法之后调用，但是在__new__()真正返回类实例之前。参数就是传递给类的参数，如果基类拥有__init__()方法，那么基类的子类如果显示定义了__init__()方法，那么子类必须显示的【explicitly】调用父类的__init__()方法以确保正确的父类初始化：
        这里有两种方法：
            a、 BaseClass.__inti__(self,[args...])
            b、 super(SubClass,self).__init__([args...])

    __new__方法和__init__方法协同工作，__init__方法应该返回None，如果返回的非None，会发生TypeError错误。__new__方法应该返回即将生成的类的实例，如果返回的不是本类的实例，那么接下来的__init__方法就不会发生调用。
    
例子一：
```
class BaseClass(object):
    def __init__(self):
        print 'baseclass __init__'

class SubClass(BaseClass):
    def __init__(self):
        print 'subclass __init__'

obj = SubClass()
# subclass __init__  # 因为没有显示调用父类__init__()导致只有子类的被调用
```

例子二：
```
class BaseClass(object):
    def __init__(self):
        print 'baseclass __init__'

class SubClass(BaseClass):
    def __init__(self):
        BaseClass.__init__(self)
        print 'subclass __init__'

obj = SubClass()
''' # 调用结果
baseclass __init__
subclass __init__
'''
```

例子三：
```
class BaseClass(object):
    def __init__(self):
        print 'baseclass __init__'

class SubClass(BaseClass):
    def __init__(self):
        super(SubClass,self).__init__()
        print 'subclass __init__'

obj = SubClass()
''' # 调用结果
baseclass __init__
subclass __init__
'''
```

例子二与例子三比较起来，如果父类发生变化，子类基本不需要修改，这就是使用super的好处。

例子四：
```
class Animal(object):
    def __init__(self,tail):
        self.tail = tail
class Dog(Animal):
    def __init__(self,tail,dog_leg):
        super(Dog,self).__init__(tail)
        self.dog_leg = dog_leg
    def __str__(self):
        return '<Animal->Dog>'+'-'+self.tail+'-'+self.dog_leg
obj = Dog('brown_tail','tall_leg')
print obj
# <Animal->Dog>-brown_tail-tall_leg
```



4. __metaclass__
这个变量可以使任何接受name、bases和dict参数的可滴啊用对象【callable】，在类创建的时候，这个callable会被代替type()方法使用
- 如果类定义中，dict['__metaclass__']存在，使用之
- 如果有一个基类，那么其__metaclass__使用之
- 如果全局变量__metaclass__存在，使用之
- 否则，就是old-style类，types.ClassType被使用 


5. __name__
The name of the class or type.
__name__ is the class name

```
class Name(object):
    def __init__(self):
        pass

    def test(self):
        pass

n = Name()
print('class __name__: ',Name.__name__) # class __name__:  Name
print('function __name__: ',Name.test.__name__) # function __name__:  test
print('instance __name__: ',n.__name__) # AttributeError: 'Name' object has no attribute '__name__'
```

6. __class__
The class to which a class instance belongs.

 __class__ is the class to which a class instance belongs。
 __class__ is the instance’s class
- 返回实例 所属的类

```
class Base(object):
    def __init__(self):
        pass

    def test(self):
        pass

class Child(Base):
    pass

c = Child()

print('class __class__: ',Child.__class__)  # class __class__:  <class 'type'>
print('instance __class__: ',c.__class__)   # instance __class__:  <class '__main__.Child'>

```

7. __mro__  Python Method Resolution Order

This attribute is a tuple of classes that are considered when looking for base classes during method resolution.
class.mco(): This method can be overridden by a metaclass to customize the method resolution order for its instances. It is called at class instantiation, and its result is stored in __mro__.
```
class BaseA(object):
    def __init__(self):
        pass

    def a(self):
        pass

class BaseB(object):
    def __init__(self):
        pass

    def b(self):
        pass

class Child(BaseA,BaseB):
    isChild = True
    pass

c = Child()


print('BaseA __mro__: ',BaseA.__mro__)  # BaseA __mro__:  (<class '__main__.BaseA'>, <class 'object'>)
print('Child __mro__: ',Child.__mro__)  # Child __mro__:  (<class '__main__.Child'>, <class '__main__.BaseA'>, <class '__main__.BaseB'>, <class 'object'>)


```


8. __dict__
A dictionary or other mapping object used to store an object’s (writable) attributes.

__dict__ is the dictionary containing the class’s namespace
__dict__ is the attribute dictionary


```
class BaseA(object):
    def __init__(self):
        pass

    def a(self):
        pass

class BaseB(object):
    def __init__(self):
        pass

    def b(self):
        pass

class Child(BaseA,BaseB):
    isChild = True
    pass

c = Child()

print('BaseA __dict__: ',BaseA.__dict__)
print('Child __dict__: ',Child.__dict__)

'''
BaseA __dict__:  {'__module__': '__main__', '__init__': <function BaseA.__init__ at 0x000001E4FD59A8C8>, 'a': <function BaseA.a at 0x000001E4FD59A950>, '__dict__': <attribute '__dict__' of 'BaseA' objects>, '__weakref__': <attribute '__weakref__' of 'BaseA' objects>, '__doc__': None}
Child __dict__:  {'__module__': '__main__', 'isChild': True, '__doc__': None}
'''

```

9. __module__

__module__ is the module name in which the class was defined


10. __bases__
The tuple of base classes of a class object.

__bases__ is a tuple (possibly empty or a singleton) containing the base classes, in the order of their occurrence in the base class list

```
class BaseA(object):
    def __init__(self):
        pass

    def a(self):
        pass

class BaseB(object):
    def __init__(self):
        pass

    def b(self):
        pass

class Child(BaseA,BaseB):
    isChild = True
    pass

c = Child()

print('BaseA __bases__: ',BaseA.__bases__)  # BaseA __bases__:  (<class 'object'>,)
print('Child __bases__: ',Child.__bases__)  # Child __bases__:  (<class '__main__.BaseA'>, <class '__main__.BaseB'>)
```


11. __subclasses__() query for subclasses

Each class keeps a list of weak references to its immediate subclasses. This method returns a list of all those references still alive. 

[Python __subclasses__ hook](https://franklingu.github.io/programming/2016/08/28/python-subclasses-hook/)
```
import six
import abc

@six.add_metaclass(abc.ABCMeta)
class PetFactory(object):
    @classmethod
    def from_name(cls,name):
        for sub_cls in cls.__subclasses__():
            if name == sub_cls.__name__.lower():
                return sub_cls()
    @abc.abstractmethod
    def speak(self):
        """"""

class Kitty(PetFactory):
    def speak(self):
        return 'Miao'
class Duck(PetFactory):
    def speak(self):
        return 'Quak'

if __name__ == '__main__':
    pet_name = 'kitty'
    pet = PetFactory.from_name(pet_name)
    print(pet.speak())
```



12. __del__ 析构函数

[__del__ doc](https://docs.python.org/2.0/ref/customization.html)
__del__ (self)
Called when the instance is about to be destroyed. This is also called a destructor. If a base class has a __del__() method, the derived class's __del__() method must explicitly call it to ensure proper deletion of the base class part of the instance. Note that it is possible (though not recommended!) for the __del__() method to postpone destruction of the instance by creating a new reference to it. It may then be called at a later time when this new reference is deleted. It is not guaranteed that __del__() methods are called for objects that still exist when the interpreter exits.
Programmer's note: "del x" doesn't directly call x.__del__() -- the former decrements the reference count for x by one, and the latter is only called when its reference count reaches zero. Some common situations that may prevent the reference count of an object to go to zero include: circular references between objects (e.g., a doubly-linked list or a tree data structure with parent and child pointers); a reference to the object on the stack frame of a function that caught an exception (the traceback stored in sys.exc_traceback keeps the stack frame alive); or a reference to the object on the stack frame that raised an unhandled exception in interactive mode (the traceback stored in sys.last_traceback keeps the stack frame alive). The first situation can only be remedied by explicitly breaking the cycles; the latter two situations can be resolved by storing None in sys.exc_traceback or sys.last_traceback.

Warning: due to the precarious circumstances under which __del__() methods are invoked, exceptions that occur during their execution are ignored, and a warning is printed to sys.stderr instead. Also, when __del__() is invoked is response to a module being deleted (e.g., when execution of the program is done), other globals referenced by the __del__() method may already have been deleted. For this reason, __del__() methods should do the absolute minimum needed to maintain external invariants. Python 1.5 guarantees that globals whose name begins with a single underscore are deleted from their module before other globals are deleted; if no other references to such globals exist, this may help in assuring that imported modules are still available at the time when the __del__() method is called.



13. 
[](https://docs.python.org/2.0/ref/sequence-types.html)
__len__
__getitem__
__setitem__
__delitem__


14. 
[](https://docs.python.org/2.0/ref/attribute-access.html)
__getattr__
__setattr__
__delattr__



15. with

__enter__(self)
__exit__(self)


```
with open('text.txt') as f:
    s = f.read()
    print(s)

'''
以上代码的本质实际上是首先调用 f = open('text.txt').__enter__()
然后执行with中的语句
最后执行完了就调用 open('text.txt').__exit__()
'''
```



16. descriptor
__get__
    Called to get the attribute of the owner class (class attribute access) or of an instance of that class (instance attribute access).

__set__

__delete__

[Python Descriptors, Part 1 of 2](http://martyalchin.com/2007/nov/23/python-descriptors-part-1-of-2/)
In a nutshell, a descriptor is a way to customize what happens when you reference an attribute on a model. 
一个对象具有其中任一个方法就会成为描述器，从而在被当作对象属性时重写默认的查找行为。

 The real trick to building a descriptor is defining at least one of the following three methods. Note that instance below returns to the object where the attribute was accessed, and owner is the class where the descriptor was assigned as an attribute.
__get__(self, instance, owner) — This will be called when the attribute is retrieved (value = obj.attr), and whatever it returns is what will be given to the code that requested the attribute’s value.Called to get the attribute of the owner class (class attribute access) or of an instance of that class (instance attribute access).
    - self: Required. Instance of the class, passed automatically on call.就是描述器这个类本身的实例。
    - instance: Required. Instance is the instance that the attribute was accessed through, or None when the attribute is accessed through the owner.调用属性的对象，如果不是通过owner调用就是类的实例，如果通过owner调用就是类
    - owner: Required. Owner is always the owner class.就是使用了描述器实例的类
__set__(self, instance, value) — This gets called when a value is set to the attribute (obj.attr = 'value'), and shouldn’t return anything at all.Called to set the attribute on an instance instance of the owner class to a new value, value
    - self: Required. Instance of the class, passed automatically on call.
    - instance: Required. Instance is the instance that the attribute was accessed through, or None when the attribute is accessed through the owner.
    - value: Required. The value we want to assign to the attribute.
__delete__(self, instance) — This is called when the attribute is deleted from an object (del obj.attr)



``` http://python-reference.readthedocs.io/en/latest/docs/dunderdsc/get.html
# this is our descriptor object
class Bar(object):
    def __init__(self):
        self.value = ''
    def __get__(self, instance, owner):
        print("returned from descriptor object",' self.value: ',self.value,'self is:',self,'instance is:',instance,'owner is:',owner)   # returned from descriptor object  self.value:  10 self is: <__main__.Bar object at 0x000001DC16808CC0> instance is: <__main__.Foo object at 0x0000028A85D48E10> owner is: <class '__main__.Foo'>
        return self.value
    def __set__(self, instance, value):
        print("set in descriptor object")
        self.value = value
    def __delete__(self, instance):
        print("deleted in descriptor object")
        del self.value

class Foo(object):
    # bar作为类Foo的属性，访问、修改和删除该变量时，都会使用descriptor中定义的方法而不是默认实现。
    bar = Bar()

f = Foo()
f.bar = 10
print(f.bar)
del f.bar

# set in descriptor object
# returned from descriptor object
# 10
# deleted in descriptor object

``` 




```
class C:
    def __init__(self):
        self._x = None

    @property
    def x(self):
        # 函数名直接作为了类属性
        """I'm the 'x' property."""
        print('x getter called')
        return self._x

    @x.setter
    def x(self, value):
        print('x setter called')
        self._x = value

    @x.deleter
    def x(self):
        print('x deleter called')
        del self._x

c = C()
c.x = 'imx'
print(c.x)
del c.x

'''
x setter called
x getter called
imx
x deleter called
'''
```




17. 

__getitem__
```
class Test(object):
    def __getitem__(self, items):
        print('%-15s  %s' % (type(items), items))

t = Test()
t[1]
t['hello world']
t[1, 'b', 3.0]
t[5:200:10]
t['a':'z':3]
t[object()]

'''
<class 'int'>    1
<class 'str'>    hello world
<class 'tuple'>  (1, 'b', 3.0)
<class 'slice'>  slice(5, 200, 10)
<class 'slice'>  slice('a', 'z', 3)
<class 'object'>  <object object at 0x00000262A766D0A0>
'''
```


__iter__ | __next__
Python iterator object must implement two special methods, __iter__() and __next__(), collectively called the iterator protocol.
[Python Iterators](https://www.programiz.com/python-programming/iterator)


Building an iterator from scratch is easy in Python. We just have to implement the methods __iter__() and __next__().

The __iter__() method returns the iterator object itself. If required, some initialization can be performed.

The __next__() method must return the next item in the sequence. On reaching the end, and in subsequent calls, it must raise StopIteration.


```
class PowTwo:
    """Class to implement an iterator
    of powers of two"""

    def __init__(self, max = 0):
        self.max = max

    def __iter__(self):
        self.n = 0
        return self

    def __next__(self):
        if self.n <= self.max:
            result = 2 ** self.n
            self.n += 1
            return result
        else:
            raise StopIteration
```


18. 

__getattr__
__setattr__

[magic fn](http://farmdev.com/src/secrets/magicmethod/index.html)