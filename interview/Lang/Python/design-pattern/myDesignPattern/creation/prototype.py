# 原型模式(Prototype  Pattern)：使用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。原型模式是一种对象创建型模式。

class Prototype(object):
    value = 'default'
    def clone(self,**attrs):
        obj = self.__class__()  # 构造类实例
        obj.__dict__.update(attrs)  # 更新原型中的属性
        return obj

class PrototypeDispatcher(object):
    
    def __init__(self):
        self._objects = {}
    def get_objects(self):
        return self._objects
    def register_object(self,name,obj):
        self._objects[name] = obj
    def unregister_object(self,name):
        del self._objects[name]


def main():
    dispatcher = PrototypeDispatcher()
    prototype = Prototype()
    print('prototype __dict__:',prototype.__dict__)
    d = prototype.clone()
    a = prototype.clone(value='a-value',category='a')
    b = prototype.clone(value='b-value',category='b')
    dispatcher.register_object('objecta',a)
    dispatcher.register_object('objectb',b)
    dispatcher.register_object('objectt',d)
    print('prototype id: ',id(prototype),'\nprototype.clone a id: ',id(d),'\nprototype.close b id: ',id(a))    
    print([{n: p.value} for n, p in dispatcher.get_objects().items()])

if __name__ == '__main__':
    main()
