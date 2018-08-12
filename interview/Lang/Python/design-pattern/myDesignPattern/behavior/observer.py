#! coding: utf8

'''
##############################
GOF

One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. 
When something changes in our subject that the observer may be interested in, 
a notify message is sent which calls the update method in each observer. 
When the observer is no longer interested in the subject's state, they can simply detach themselves.

##############################
### 当一个对象的状态发生变化时(Subject)，能够自动通知其他关联对象(Observer)，自动刷新对象状态。 
'''

from __future__ import print_function

class Subject(object):
    def __init__(self):
        self._observers = []
    
    def attach(self,observer):
        if observer not in self._observers:
            self._observers.append(observer)
    def detach(self,observer):
        try:
            self._observers.remove(observer)
        except ValueError:
            pass
    def notify(self,modifier=None):
        for observer in self._observers:
            if modifier != observer:
                observer.update(self)


class Data(Subject):
    def __init__(self,name=''):
        # super return a proxy object
        # python3   super(Data,self).__init__()
        # python2  super(Data,self).__init__()
        Subject.__init__(self)
        self.name = name
        self._data = 0

    @property
    def data(self):
        return self._data
    @data.setter
    def data(self,value):
        self._data = value
        self.notify()
    
class HexViewer:

    def update(self, subject):
        print(u'HexViewer: Subject %s has data 0x%x' %
              (subject.name, subject.data))


class DecimalViewer:

    def update(self, subject):
        print(u'DecimalViewer: Subject %s has data %d' %
              (subject.name, subject.data))

def main():
    data1 = Data('data 1')
    # data2 = Data('data 2')
    view1 = DecimalViewer()
    view2 = HexViewer()
    data1.attach(view1)
    data1.attach(view2)
    
    print(u"Setting Data 1 = 10")
    data1.data = 10


if __name__ == '__main__':
    main()