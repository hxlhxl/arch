[yield作用](https://taizilongxu.gitbooks.io/stackoverflow-about-python/content/1/README.html)

# list Comprehensions列表生成式   
```
mi = [x ** x for x in range(10) if x % 2 == 0]
print('mi type"',type(mi),'mi value:',mi)
'''
mi type" <class 'list'> mi value: [1, 4, 256, 46656, 16777216]
'''
```
# dict Comprehensions字典生成式
``` set
mi = {x ** x for x in range(10) if x % 2 == 0}
print('mi type"',type(mi),'mi value:',mi)
'''
mi type" <class 'set'> mi value: {256, 1, 46656, 16777216, 4}
'''
```


``` dict
mi = {x : x ** x for x in range(10) if x % 2 == 0}
print('mi type"',type(mi),'mi value:',mi)
'''
mi type" <class 'dict'> mi value: {0: 1, 2: 4, 4: 256, 6: 46656, 8: 16777216}
'''
```


# generator

[generator 参考](http://codingpy.com/article/python-generator-notes-by-kissg/)
本质上就是__iter__和__next__方法定义在了generator上

```
mi = (x ** x for x in range(10) if x % 2 == 0)
print('mi type"',type(mi),'mi value:',mi)
'''
mi type" <class 'generator'> mi value: <generator object <genexpr> at 0x0000023DDA940048>
'''
```



``` example-2
def h():
    print('Wen Chuan')
    m = yield 5  # Fighting!
    print(m)
    d = yield 12
    print('We are together!')
c = h()
m = c.__next__()  #m 获取了yield 5 的参数值 5
d = c.send('Fighting!')  #d 获取了yield 12 的参数值12,并把上一个next返回的值设置为 'Fighting'
print('We will never forget the date', m, '.', d)
'''
Wen Chuan
Fighting!
We will never forget the date 5 . 12
'''
```



# yield代码块执行

生成generator的时候，实际上好像什么都没有发生一样，只有调用next的时候，才会发生真正的调用。

```
def coroutine():

    print('Scope A')
    i = 0
    while True:
        print('Scope B')
        request = yield # yield None
        i += 1
        print('Scope C')
        if i > 3:
            break
    
    print('Scope D')

if __name__ == '__main__':
    x = coroutine()
    t = 1
    for c in x:
        print('exe t: ',t)
        t += 1
        pass

'''
result: 
Scope A
Scope B
exe t:  1
Scope C
Scope B
exe t:  2
Scope C
Scope B
exe t:  3
Scope C
Scope B
exe t:  4
Scope C
Scope D
'''
```



# generator

Generators are a simple and powerful tool for creating iterators. 

- Anything that can be done with generators can also be done with class-based iterators as described in the previous section. What makes generators so compact is that the __iter__() and __next__() methods are created automatically.

- Another key feature is that the local variables and execution state are automatically saved between calls. This made the function easier to write and much more clear than an approach using instance variables like self.index and self.data.

- In addition to automatic method creation and saving program state, when generators terminate, they automatically raise **StopIteration**. In combination, these features make it easy to create iterators with no more effort than writing a regular function.

# generator expression

Some simple generators can be coded succinctly as expressions using a syntax similar to list comprehensions but with parentheses instead of brackets. These expressions are designed for situations where the generator is used right away by an enclosing function. Generator expressions are more compact but less versatile than full generator definitions and tend to be more memory friendly than equivalent list comprehensions.

```
>>> sum(i*i for i in range(10))                 # sum of squares
285

>>> xvec = [10, 20, 30]
>>> yvec = [7, 5, 3]
>>> sum(x*y for x,y in zip(xvec, yvec))         # dot product
260

>>> from math import pi, sin
>>> sine_table = {x: sin(x*pi/180) for x in range(0, 91)}

>>> unique_words = set(word  for line in page  for word in line.split())

>>> valedictorian = max((student.gpa, student.name) for student in graduates)

>>> data = 'golf'
>>> list(data[i] for i in range(len(data)-1, -1, -1))
['f', 'l', 'o', 'g']
```