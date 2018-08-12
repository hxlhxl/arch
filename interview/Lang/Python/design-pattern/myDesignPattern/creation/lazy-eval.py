# Delays the eval of an expr until its value is needed and avoids repeated evals.
# 在要使用属性变量的时候才计算属性
from __future__ import print_function
import functools

class lazy_property(object):
    def __init__(self,function):
        self.function = function
        functools.update_wrapper(self,function)
    def __get__(self,instance,type_=None):
        if instance is None:
            return self
        val = self.function(instance)
        instance.__dict__[self.function.__name__] = val
        return val

class Person(object):
    def __init__(self,name,occupation):
        self.name = name
        self.occupation = occupation
    
    @lazy_property
    def relatives(self):
        """assume time coust expressions"""
        relatives = "many relatives"
        return relatives

def main():
    print('lazy_property __call__:',lazy_property.__call__)
    Jhon = Person('Jhon','Coder')
    print(u"Name: {0}    Occupation: {1}".format(Jhon.name, Jhon.occupation))
    print(u"Before we access `relatives`:")
    print(Jhon.__dict__)
    print(u"Jhon's relatives: {0}".format(Jhon.relatives))
    print(u"After we've accessed `relatives`:")
    print(Jhon.__dict__)

if __name__ == '__main__':
    main()