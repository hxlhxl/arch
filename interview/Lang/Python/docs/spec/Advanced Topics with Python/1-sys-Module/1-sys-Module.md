

sys模块提供了以下设施

# 常量

- maxsize: 最大整数值
- byteorder: 存储数据的字节顺序
- platform: 运行Python的平台
- modules: 记录着已经载入(loaded)的模块
- path: 记录着Python搜寻模块的路径；解释器在执行的时候，会把CWD加入到path中。
# 命令行参数


# 标准流

## stdin
normally connected to the keyboard

## stdout
normally connected to the terminal
## stderr
normally connected to the terminal

sys.stdout.write('....')
sys.stderr.write('....')

## 一种重定向方式

```

import sys
saved_stdout = sys.stdout
fh = open('stdout.txt','w')
sys.stdout = fh
sys.stdout.write('aaaaa')
sys.stdout = saved_stdout
```