refs: https://docs.python.org/2/reference/datamodel.html





对象是python对数据的抽象，python中所有的数据都是有对象或者对象之间的关系表示的。



每个对象都有一个身份【identity】，一中类型【type】和一个值【value】。

    对象一旦被创建其identity就不会发生变化，可以把它理解为对象在内存中的地址【object's address in memory】，操作符【is]】就是用来比较两个对象【objects】的identity的，id()【id】方法可以一个代表object的identity的整数，当前的实现是返回地址【object address】

    对象一旦被创建其type也无法变化【unchangeable】，一个对象【object】的类型一旦确定，这种类型就决定了它能够使用的方法和属性，type()【type】方法会返回一个对象【object】的类型【type】，返回值本身也是一个对象【object】
    
 
 The value of some objects can change. Objects whose value can change are said to be mutable; objects whose value is unchangeable once they are created are called immutable. An object’s mutability is determined by its type; 
    某些对象的值【value】是可变的，有两种说法：【mutable】和【immutable】，(The value of an immutable container object that contains a reference to a mutable object can change when the latter’s value is changed; however the container is still considered immutable, because the collection of objects it contains cannot be changed. So, immutability is not strictly the same as having an unchangeable value, it is more subtle.) ，对象的immutability是有对象的类型【type】决定的：for instance, numbers, strings and tuples are immutable, while dictionaries and lists are mutable.


Objects are never explicitly destroyed; however, when they become unreachable they may be garbage-collected. An implementation is allowed to postpone garbage collection or omit it altogether — it is a matter of implementation quality how garbage collection is implemented, as long as no objects are collected that are still reachable.
    对象不会显示销毁，但是当他们【unreachable】的时候，他们可能会被【garbage-collected】，这依赖于GC的具体实现，Cpython采用 引用计数【reference-counting】


Some objects contain references to “external” resources such as open files or windows. It is understood that these resources are freed when the object is garbage-collected, but since garbage collection is not guaranteed to happen, such objects also provide an explicit way to release the external resource, usually a close() method. Programs are strongly recommended to explicitly close such objects. The ‘try...finally‘ statement provides a convenient way to do this.

    有些对象包含外部资源的引用【reference】，这些引用会被GC清理，但是并没有一个强有力的保证，所有程序员应该手动对这些资源做清理，这些资源通常有close方法，这种处理通常在try...finally中使用。

Some objects contain references to other objects; these are called containers. Examples of containers are tuples, lists and dictionaries. The references are part of a container’s value. In most cases, when we talk about the value of a container, we imply the values, not the identities of the contained objects; however, when we talk about the mutability of a container, only the identities of the immediately contained objects are implied. So, if an immutable container (like a tuple) contains a reference to a mutable object, its value changes if that mutable object is changed.
    
    有些对象包含对其他对象的引用，这些对象被称作容器【containers】，容器类型有：tuples、lists、和dictionaies。

Types affect almost all aspects of object behavior. Even the importance of object identity is affected in some sense: for immutable types, operations that compute new values may actually return a reference to any existing object with the same type and value, while for mutable objects this is not allowed. E.g., after a = 1; b = 1, a and b may or may not refer to the same object with the value one, depending on the implementation, but after c = []; d = [], c and d are guaranteed to refer to two different, unique, newly created empty lists. (Note that c = d = [] assigns the same object to both c and d.)
    
    类型影响着对象的方方面面，对于immutable类型，对其运算得出的新值可能会指向已经存在的对象，对于mutable对象，其计算结果指向的一定是一个新的对象。
    a = 1,b = 1其identity可能一样，取决于具体实现；
    c = [],d = []这二者的identity绝对不一样，但是e=f=[]这样就是指向的同样的结果了。


```
# 例子1
>>> a = 1
>>> b = 1
>>> id(a)
140726143837432
>>> id(b)
140726143837432

a和b指向了同样的地方

# 例子2
>>> a = 1
>>> id(a)
140687261602376
>>> b = a
>>> id(b)
140687261602376
>>> b = 2
>>> id(b)
140687261602352

a和b指向了同样的地方，但是b改变后a不会发生变化。
a -> 1 
b -> 1 
b -> 2 

例子三
>>> a = []
>>> b = []
>>> id(a)
4564139904
>>> id(b)
4564235688


例子四
>>> a = []
>>> b = a
>>> id(a)
4416184192
>>> id(b)
4416184192
>>> b.append('1')
>>> a
['1']
>>> b
['1']

a和b指向同一个对象，一个修改导致整个都发生了修改。
```














# Callable Types 
## User-defined functions 参考https://docs.python.org/2/reference/datamodel.html并搜索func_closure即可
    A user-defined function object is created by a function definition (see section Function definitions). It should be called with an argument list containing the same number of items as the function’s formal parameter list.

    特殊属性：
    __doc__     -> func.func_doc 
    __name__    -> func.func_name 
    __module__
    __defaults__-> func.func_defaults 
    __code__    -> func.func_code
    __globals__ -> func.func_globals 
    __dict__    -> func.func_dict 
    __closure__ -> func.func_closure 