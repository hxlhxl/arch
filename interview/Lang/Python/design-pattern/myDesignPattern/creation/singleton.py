class Singleton(object):
    def __new__(cls,*args,**kwargs):
        if not hasattr(cls,'_inst'):
            # cls表示需要实例化的类
            # cls._inst=super(Singleton,cls).__new__(cls,*args,**kwargs)  # Python2.7- Python3.3
            print(cls,cls.__name__)
            cls._inst = super(Singleton,cls).__new__(cls)   # Python3.3 or later
        return cls._inst
if __name__=='__main__':
    class A(Singleton):
        _t = 'test'
        def __init__(self,s):
            if hasattr(self,'s'):
                return
            self.s=s     
    a=A('apple')  
    b=A('banana')
    print(id(a),a.s,a._t)
    print(id(b),b.s,b._t)
    print(id(A._inst),A._inst.s,A._t)