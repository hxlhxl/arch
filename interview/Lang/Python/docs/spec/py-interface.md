python interface设计
python中是没有接口类的，等价的实现方法有：
一：raise
```
class ChartInterface(object):
    @property
    def display(self):
        raise NotImplementedError

class PieChart(ChartInterface):
    pass

PieChart().display()    # 报错：
'''
Traceback (most recent call last):
  File "inter.py", line 9, in <module>
    PieChart().display()
  File "inter.py", line 4, in display
    raise NotImplementedError
NotImplementedError
'''
```
二、assert
```
class ChartInterface(object):
    @property
    def display(self):
        assert False, 'SubClass Must implement method display'
class PieChart(ChartInterface):
    pass

PieChart().display()
'''
Traceback (most recent call last):
  File "int.py", line 8, in <module>
    PieChart().display()
  File "int.py", line 4, in display
    assert False, 'SubClass Must implement method display'
AssertionError: SubClass Must implement method display
'''
```

三、ABC
``` 2.6/2.7
from abc import ABCMeta,abstractmethod
class ChartInterface(object):
    __metaclass__ = ABCMeta
    @abstractmethod
    def display(self):
        pass
class PieChart(ChartInterface):
    pass

PieChart().display()


'''Traceback (most recent call last):
  File "abx.py", line 10, in <module>
    PieChart().display()
TypeError: Can't instantiate abstract class PieChart with abstract methods display
'''

```


``` 3.x 
from abc import ABCMeta,abstractmethod
class ChartInterface(metaclass=ABCMeta):
    @abstractmethod
    def display(self):
        pass
class PieChart(ChartInterface):
    pass

PieChart().display()


```