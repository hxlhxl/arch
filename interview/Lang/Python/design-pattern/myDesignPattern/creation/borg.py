# share state instance


x = 10


class Borg(object):
    __share_state = {}

    def __init__(self):
        # 必须以下两种方式，因为所有变量都被视作局部变量或者全局变量： https://stackoverflow.com/a/19985778
        # 区别在于如果用该类声明另一个变量,self方式如果发生了改变，那么二者的变量是不一样的；
        # 而用Borg那么就是始终一样。这也是静态变量的特点吧。
        # self.__dict__ = self.__share_state
        self.__dict__ = Borg.__share_state
        self.state = 'Init'
        # 
        self.x = x

    def __repr__(self):
        return self.state

class YourBorg(Borg):
    pass

if __name__ == '__main__':
    s1 = Borg()
    s2 = Borg()
    print('Borg __share_state:',Borg._Borg__share_state)
    print('s1 __dict__:',s1.__dict__,s1.state,id(s1))
    print('s2 __dict__:',s2.__dict__,s2.state,id(s2))
    s1.state = 's1 state'
    print('Borg __share_state:',Borg._Borg__share_state)
    
    print('s1 __dict__:',s1.__dict__,s1.state,id(s1))
    print('s2 __dict__:',s2.__dict__,s2.state,id(s2))
    s2.state = 's2 state'
    print('Borg __share_state:',Borg._Borg__share_state)
    print('s1 __dict__:',s1.__dict__,s1.state,id(s1))
    print('s2 __dict__:',s2.__dict__,s2.state,id(s2))

"""
python 属性搜索顺序

默认对属性的访问控制是从对象的字典里面(__dict__)中获取(get), 
设置(set)和删除(delete)它。
举例来说， 

a.x 的查找顺序是, 
    a.__dict__['x'] ,
     然后 type(a).__dict__['x'] , 
     然后找 type(a) 的父类(不包括元类(metaclass)).
     
     如果查找到的值是一个描述器, Python就会调用描述器的方法来重写默认的控制行为。
     这个重写发生在这个查找环节的哪里取决于定义了哪个描述器方法。

"""
