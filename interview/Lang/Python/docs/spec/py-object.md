Object references,mutability,recycling

```
a = [1,2,3,4]
b = a
a.append(5)
print a     # 
print b
```

a -> [1,2,3,4,5]
b -> [1,2,3,4,5]



```
a = 1
b = a
print(id(a))    # 16264296
print(id(b))    # 16264296
b = b + 1
print(id(a))    # 16264296
print(id(b))    # 16264272
print a         # 1
print b         # 2
```


# alias

```
a = {'a':1,'b':2}
b = a
c = {'a':1,'b':2}

print a == c    # True
print a is b    # True
print a is c    # False
```

# is or ==

is is faster than ==

== is syntactic sugar for __eq__
__eq__ method inherited from object compares object ids,so produced same result as is.
但是许多内置类型重载了__eq__方法



# copy

shallow copy

```
l1 = [3,[55,44],(7,8,9)]
l2 = list(l1)
l3 = l1[:]
l1[1].append(33)
```

最外层是duplicated，但是内层却是 共享对象；也就是浅复制



deepcopy
```
from copy import copy
from copy import deepcopy
```


# call by sharing

call by sharing means that each formal parameter of the function gets a copy of each reference in the arguments.that is the parameters inside the function become aliases of the actual arguments.
简单来说就是函数内部可以改变mutable类型的参数，而inmutable类型的参数无法发生改变
```
def func(a,b):
    a += b
    return a
x = 1
y = 2
print func(x,y)
a = [1,2]
b = [3,4]
print func(a,b)
t = (10,20)
u = (30,40)
print func(t,u)
```

# mutable types as parameter defaults:bad idea,用可变类型作为默认参数是坏的做法；如果一定要这样，就要使用防御式编程

```
class Bus:
    def __init__(self,passengers=[]):
        self.passengers = passengers
    def pick(self,name):
        self.passengers.append(name)
bus1 = Bus()
bus1.pick('BBB')
bus2 = Bus()
print bus2.passengers
# 两个都没有指定默认参数，导致都指向同一个对象。修改一个另一个发生了变化
```
## 防御式例子
```
class Bus:
    def __init__(self,passengers=None):
        if passengers is None:
            self.passengers = []
        else:
            self.passengers = passengers
    def pick(self,name):
        self.passengers.append(name)
bus1 = Bus()
bus1.pick('BBB')
bus2 = Bus()
print bus2.passengers
```





# 垃圾回收

CPython默认垃圾回收算法是 引用计数(reference counting)
只要refcount变为0，对象就会立即销毁。CPython将会调用对象的__del__方法

## weakref
```
import weakref
s1 = {1,2,3}
s2 = s1
def bye():
    print 'Gone with the wind'
ender = weakref.finalize(s1,bye)
print ender.alive
del s1
print ender.alive
s2 = 'xxx'  # 这里会回调bye方法
print ender.alive
```


## weakref.ref


```
import weakref
a_set = {0,1}
wref = weakref.ref(a_set)
print wref  # <weakref at 0x100637598; to 'set' at 0x100636748>
wref()  # {0,1}
```
如果a_set发生变化，那么wre就会变成None


## weakref.WeakValueDictionary
```
>>> import weakref
>>> stock = weakref.WeakValueDictionary()
>>> catalog = [Cheese('Red Leicester'), Cheese('Tilsit'), ... Cheese('Brie'), Cheese('Parmesan')] ...
>>> for cheese in catalog:
... stock[cheese.kind] = cheese
...
>>> sorted(stock.keys())
['Brie', 'Parmesan', 'Red Leicester', 'Tilsit']
>>> del catalog
>>> sorted(stock.keys())
['Parmesan']
>>> del cheese
>>> sorted(stock.keys())
[]

```

# interning
```

>>>t1=(1,2,3) 
>>>t3=(1,2,3) # 
>>>t3 is t1 # False
>>> s1 = 'ABC' 
>>>s2='ABC' # 
>>>s2iss1# 
True
```

The sharing of string literals is an optimization technique called interning. CPython uses the same technique with small integers to avoid unnecessary duplication of “pop‐ ular” numbers like 0, -1 and 42. Please note that CPython does not intern all strings or integers, and the criteria it uses to do so is an undocumented implementation detail.



































