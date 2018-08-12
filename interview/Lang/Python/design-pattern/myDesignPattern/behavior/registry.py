import six

class Registry(type):
    REGISTRY = {}
    def __new__(cls,name,bases,attrs):
        new_cls = super(Registry,cls).__new__(cls,name,bases,attrs)
        cls.REGISTRY[new_cls.__name__] = new_cls
        return new_cls

@six.add_metaclass(Registry)
class BaseRegisteredClass(object):
    pass

if __name__ == '__main__':
    print(Registry.REGISTRY)