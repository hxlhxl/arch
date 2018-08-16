
class Configurable(object):
    def __new__(cls, *args, **kwargs):
        print(cls)
        print(args)
        print(kwargs)