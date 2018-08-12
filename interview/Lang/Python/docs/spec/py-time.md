# 计算函数运行时间  python3.3
```
def clock():
    t0 = time.perf_counter()
    f(xxx)
    elapsed = time.perf_counter() - t0  # 这就是函数 f 运行的时间
```

