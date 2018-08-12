```
        Built-in Functions      
abs()   divmod()    input() open()  staticmethod()
all()   enumerate() int()   ord()   str()
any()   eval()  isinstance()    pow()   sum()
basestring()    execfile()  issubclass()    print() super()
bin()   file()  iter()  property()  tuple()
bool()  filter()    len()   range() type()
bytearray() float() list()  raw_input() unichr()
callable()  format()    locals()    reduce()    unicode()
chr()   frozenset() long()  reload()    vars()
classmethod()   getattr()   map()   repr()  xrange()
cmp()   globals()   max()   reversed()  zip()
compile()   hasattr()   memoryview()    round() __import__()
complex()   hash()  min()   set()   
delattr()   help()  next()  setattr()   
dict()  hex()   object()    slice() 
dir()   id()    oct()   sorted()    
```



# common functions

## fromkeys

```
>>> a = [1,2,3,4,5,1]
>>> {}.fromkeys(a)
{1: None, 2: None, 3: None, 4: None, 5: None}
>>> {}.fromkeys(a).keys()
dict_keys([1, 2, 3, 4, 5])
>>> list({}.fromkeys(a).keys())
[1, 2, 3, 4, 5]

```


# hasattr


# zip
到python3之后调用返回zip对象，本质上也就是zip类拥有__next__和__iter__方法

- 组合迭代器
- 按最短迭代组合
- 反解
- for遍历之后，迭代器变为空


```
a = [1,2,3]
b = ['a','b','c']
c = ['!','@','#','$']

z1 = zip(a,b)
z2 = zip(a,b,c)
z3 = zip(*zip(a,b,c))

for z in z1:
    print(z)

print('-' * 10)

for z in z2:
    print(z)
print('-' * 10)

for z in z3:
    print(z)

'''
(1, 'a')
(2, 'b')
(3, 'c')
----------
(1, 'a', '!')
(2, 'b', '@')
(3, 'c', '#')
----------
(1, 2, 3)
('a', 'b', 'c')
('!', '@', '#')
'''
```