# lru_cache python3.x
```
def fibonacci(num):
    if num < 2:
        return num
    return fibonacci(num-2) + fibonacci(num-1)
if __name__ == '__main__':
    print fibonacci(6)
# 0 1 1 2 3 5 8 
# 这个函数会有很多重复计算，使用functools.lru_cache会缓存住很多计算结果
```
=>
```
import functools
@functools.lru_cache()
def fibonacci(num):
    if num < 2:
        return num
    return fibonacci(num-2) + fibonacci(num-1)
if __name__ == '__main__':
    print fibonacci(6)
```



# singledispatch