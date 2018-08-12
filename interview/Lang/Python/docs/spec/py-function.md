
# 引用传参

```
a = 1
def fun(a):
    a = 2
fun(a)
print a  # 1

```


```

a = []
def fun(a):
    a.append(1)
fun(a)
print a  # [1]

```



# 不定参数


```
>>> def print_everything(*args):
        for count, thing in enumerate(args):
...         print '{0}. {1}'.format(count, thing)
...
>>> print_everything('apple', 'banana', 'cabbage')
0. apple
1. banana
2. cabbage
```



```
>>> def table_things(**kwargs):
...     for name, value in kwargs.items():
...         print '{0} = {1}'.format(name, value)
...
>>> table_things(apple = 'fruit', cabbage = 'vegetable')
cabbage = vegetable
apple = fruit
```