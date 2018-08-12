# has_key
has_key(...)
    D.has_key(k) -> True if D has a key k, else False
```
In [7]: d = {"language": "English","country":"USA"}

In [8]: d.has_key("language")
Out[8]: True
```
# update
update(...)
    D.update([E, ]**F) -> None.  Update D from dict/iterable E and F.
    If E present and has a .keys() method, does:     for k in E: D[k] = E[k]
    If E present and lacks .keys() method, does:     for (k, v) in E: D[k] = v
    In either case, this is followed by: for k in F: D[k] = F[k]

```
In [10]: d.update({"continent":"Illinois"})

In [11]: d
Out[11]: {'continent': 'Illinois', 'country': 'USA', 'language': 'English'}
```

# items
items(...)
    D.items() -> list of D's (key, value) pairs, as 2-tuples
```
In [15]: d.items()
Out[15]: [('country', 'USA'), ('continent', 'Illinois'), ('language', 'English')]
```

# iteritems
iteritems(...)
    D.iteritems() -> an iterator over the (key, value) items of D

```
In [17]: d.iteritems()
Out[17]: <dictionary-itemiterator at 0x1066ec6d8>

In [18]: x = d.iteritems()

In [19]: x.next()
Out[19]: ('country', 'USA')

```


# iterkeys

```
In [22]: x = d.iterkeys()

In [23]: x.next()
Out[23]: 'country'
```





# itervalues
```
In [24]: x = d.itervalues()

In [25]: x.next()
Out[25]: 'USA'
```





# setdefault

setdefault(...)
    D.setdefault(k[,d]) -> D.get(k,d), also set D[k]=d if k not in D
从字典中取值，如果字典中的k不存在才会set值
```
In [30]: d
Out[30]: {'continent': 'Illinois', 'country': 'USA', 'language': 'English'}

In [31]: d.setdefault('continent')
Out[31]: 'Illinois'

In [32]: d
Out[32]: {'continent': 'Illinois', 'country': 'USA', 'language': 'English'}

In [33]: d.setdefault('continent','California')
Out[33]: 'Illinois'

In [34]: d
Out[34]: {'continent': 'Illinois', 'country': 'USA', 'language': 'English'}

In [35]: d.setdefault('name','Microsoft')
Out[35]: 'Microsoft'

In [36]: d
Out[36]:
{'continent': 'Illinois',
 'country': 'USA',
 'language': 'English',
 'name': 'Microsoft'}
```


# fromkeys

    dict.fromkeys(S[,v]) -> New dict with keys from S and values equal to v.
    v defaults to None.

从可迭代对象S和V创建字典，没有V就是值为None的字典







