# 变量作用域

```
>>> def f1(a):
...   print a
...   print b
...
>>> f1(3)
3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in f1
NameError: global name 'b' is not defined
```


```
>>> def f1(a):
...   print a
...   print b
...
>>> f1(3)
3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in f1
NameError: global name 'b' is not defined
>>> b = 6
>>> f1(3)
3
6

```


```
>>> def f2(a):
KeyboardInterrupt
>>>
>>>
>>> b = 6
>>> def f2(a):
...   print a
...   print b
...   b = 9
...
>>> f2(3)
3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in f2
UnboundLocalError: local variable 'b' referenced before assignment
```
**python会把变量b当做局部变量使用**


# global关键字

```
>>> b = 6
>>> def f3(a):
...   global b
...   print a
...   print b
...   b = 9
...
>>> f3(3)
3
6
>>> b
9

```



# closure闭包

## oo

```
class Average():
    def __init__(self):
        self.num_list = []

    def __call__(self,num):
        self.num_list.append(num)
        s = sum(self.num_list)
        avg = s * 1.0 / len(self.num_list)
        print avg
        return avg

if __name__ == '__main__':
    avg = Average()
    avg(10) # 10
    avg(11) # 10.5
```
## closure


```
def make_averager():
    series = [] 
    def averager(num):
        series.append(num)  # series现在就是free variable,a variable that is not bound in the local scope
        s = sum(series)
        avg = s * 1.0 / len(series)
        print avg
        return avg
    return averager
if __name__ == '__main__':
    avg = make_averager()
    avg(10) # 10
    avg(11) # 11
    print avg.__code__.co_varnames  # ('num', 's', 'avg')
    print avg.__code__.co_freevars  # ('series',)
    print avg.__closure__[0].cell_contents  # [10, 11]
```


# nonlocal  仅适用于python3.x

flag a variable as a free variable even when it is assigned a new value within the function.
```
def make_averager():
    total = 0
    count = 0
    def averager(num):
        nonlocal total,count
        total += num
        count += 1
        avg = total * 1.0 / count
        print avg
        return avg
    return averager
if __name__ == '__main__':
    avg = make_averager()
    avg(10)
    avg(11)

```

## python 2.x workaround
字典这种可变对象就可以实现上述功能
```
def make_averager():
    total = [0]
    count = [0]
    def averager(num):
        total[0] += num
        count[0] += 1
        avg = total[0] * 1.0 / count[0]
        print avg
        return avg
    return averager
if __name__ == '__main__':
    avg = make_averager()
    avg(10)
    avg(11)
```













案例： 实际上这是 变量作用域 的锅
https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result 
```
def make_actions():
    acts = []
    for i in range(5):
        acts.append(lambda x: i ** x)
    return acts

foo = make_actions()
print(foo[0](2))    # 16
print(foo[1](2))    # 16
print(foo[3](2))    # 16
print(foo[3](2))    # 16
```
因为循环中i不是局部变量，所以变量i是在函数调用时访问的，而不是在函数定义是访问的；因此所以的调用都会返回相同的结果.
要解决这个问题，可以再定义函数的时候，定义一个局部变量，这样在定义的时候就访问了这个变量。

```
def make_actions():
    acts = []
    for i in range(5):
        acts.append(lambda x,n=i: n ** x)
    return acts

foo = make_actions()
print(foo[0](2))    # 0
print(foo[1](2))    # 16
print(foo[3](2))    # 16
print(foo[3](2))    # 16

```

但是下面这种方法就不对了
```
def make_actions():
    acts = []
    for i in range(5):
        #def f(x,n=i):
        #    return n ** x
        def f(x):
            n = i
            return n ** x
        acts.append(f)
    return acts

```
所以我的理解是如果在形参处定义局部变量，那么这个局部变量会在定义时被访问到；而定义在函数内部的话，同样也是在函数执行时才会访问的。


另外的例子：
```
a = 2
def f1():
  print a,id(a),id(a)
def f2(n=a):
  print n,id(n),id(a)
def f3():
  m = a
  print m,id(m),id(a)
f1()
print f1.__code__.co_varnames,f1.__code__.co_freevars
f2()
print f2.__code__.co_varnames,f1.__code__.co_freevars
f3()
print f3.__code__.co_varnames,f1.__code__.co_freevars

-- 结果

2 140706974841824 140706974841824
() ()
2 140706974841824 140706974841824
('n',) ()
2 140706974841824 140706974841824
('m',) ()
```


闭包装饰器
```
#!/usr/bin/env python
#coding: utf8

def deco(func):
    def _deco(a,b):
        func(a,b)
        return func
    return _deco
#@deco
def func(a,b):
    pass
print(func)
func = deco(func)
print(func.func_closure[0].cell_contents)




╰─[:(] % python x.py
<function func at 0x108bcbd70>
<function func at 0x108bcbd70>
```   
在deco函数中存在一个自由变量func，其本质就是原始的func函数