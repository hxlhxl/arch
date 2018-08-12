Python, Classes, and Objects

python是一门面向对象的语言，之所以说面向对象，是说python可以把数据+函数打包到一个类实体中，这样做的好处就是可以让代码更简洁、可控和可适配。


https://jakevdp.github.io/blog/2012/12/01/a-primer-on-python-metaclasses/


# 类型
所有的object都拥有类型
```
>>> print type(1)
<type 'int'>
>>> print type(int)
<type 'type'>
>>> print type(type)
<type 'type'>

```
可以看到1是int类型【实例含义】
int是type类型【类含义】
type是type类型【元类含义】
python中type类型所有类型的元类型。



# create class on the fly 
refs: https://docs.python.org/2/reference/datamodel.html#customizing-class-creation 


默认情况下，新式类【new-style class】是通过type()内置方法构造出来的。一个类的定义会被读取进入一个独立名字空间【separate namespace】，而且这个类名所代表的值被绑定至type(name,bases,dict)的返回值。

当类定义被载入完毕，如果这个类有__metaclass__定义，那么定义在__metaclass__上的可调用对象【callable】就会代替type()方法去 构造类【to construct class】。

## type()
type(name,bases,dict)方法的参数为
-name: String，字符串类型，表示将要构造的类的名字
-bases: Tuple, 元组类型，表示将要构造的类的父类们
-dict: Dict, 字典类型，表示将要构造的类的属性【attributes】和方法【methods】

例子零: 
```
Foo = type('Foo',(),dict(i=4))
Bar = type('Bar',(Foo,),dict(get_i=lambda self:self.i))     # 注意tuple单元素的写法
b = Bar()
print b.get_i()
```




# 类
例子一：
```
def int_factory(s):
    i = int(s)
    return i

i = int_factory('100')
print i     # 100 
```


例子二：

```
def class_factory():
    class Foo(object):
        pass
    return Foo

F = class_factory()
f = F()
print(type(f)) # <class '__main__.Foo'> f是类Foo的实例，所以类型为Foo
```


例子三：
```
def class_factory():
    return type('Foo',(),{})
F = class_factory()
f = F()
print(type(f)) # <class '__main__.Foo'>


```


例子四： 
```
#!/usr/bin/env python
# coding: utf8
class InterfaceMeta(type):
    def __new__(cls, name, parents, dct):
        # create a class_id if it's not specified
        if 'class_id' not in dct:
            dct['class_id'] = name.lower()

        # open the specified file for writing
        if 'file' in dct:
            filename = dct['file']
            dct['file'] = open(filename, 'w')

        # we need to call type.__new__ to complete the initialization
        # cls即将要创建的类，name即类名，parents即父类，dct即属性和方法。这是__new__()静态方法所要求的，其中cls必须存在，其余为将要初始化类的参数。以下返回的就是一个类,这个类接受name、parents和dct作为参数，
        return super(InterfaceMeta, cls).__new__(cls, name, parents, dct)
    def __init__(self,*args,**kwargs):
        print args,kwargs
        pass

# 创建一个Interface类，这个类继承自type类,使用type()方法的各种参数
Interface = InterfaceMeta('Interface', (), dict(file='tmp.txt'))

print(Interface.class_id)
print(Interface.file)

'''
# 22行的等价定义如下
class Interface(object):
    __metaclass__ = InterfaceMeta   # 代理了22行type方法的使用
    file = 'tmp.txt'

print(Interface.class_id)
print(Interface.file)
'''
```



