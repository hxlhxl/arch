使用__slots__可以 限制 给类绑定动态类型[无论是 属性还是方法]
# 正常的类

```
import types
class Student(object):
    pass

def set_age(self,age):
    self.age = age
s1 = Student()
s2 = Student()
s1.name = 'shirley'
# 动态绑定实例方法,s2实例是没有这个方法的哦
s1.set_age = types.MethodType(set_age,s1)
s1.set_age(24)

print s1.name,s1.age    # std: shirley 24
```

# __slots__类

```
import types
class Student(object):
    __slots__ = ('name','age')
    pass

def set_age(self,age):
    self.age = age
s1 = Student()
s1.name = 'shirley'

s1.set_age = types.MethodType(set_age,s1)   # 此行报错
s1.set_age(24)
print s1.name,s1.age 

"""
Traceback (most recent call last):
  File "slot.py", line 11, in <module>
    s1.set_age = types.MethodType(set_age,s1)
AttributeError: 'Student' object has no attribute 'set_age'
"""
```
可见无法对Student类绑定name+age之外的属性

# __slots__继承
__slots__仅对当前类有效，

```
import types
class Student(object):
    __slots__ = ('name','set_age')
    pass
class HighStu(Student):
    pass

s = HighStu()
s.name = 'shirley'
s.age = 24

print(s.name,s.age) # 正常输出： shirley 24

```