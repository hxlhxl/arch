python本身没有抽象类和接口的特性
但是可以使用abc模块实现抽象类


[abc官方文档](https://docs.python.org/3.4/library/abc.html)

```
>>> type.__subclasses__(type)
[<class 'abc.ABCMeta'>]
```
