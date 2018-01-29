ref: https://www.linuxnix.com/find-ram-size-in-linuxunix/
# 老版本

```
[root@10-10-163-147 radius]# free -m
             total       used       free     shared    buffers     cached
Mem:          1942       1847         94          0         12       1668
-/+ buffers/cache:        166       1775 
Swap:          511          0        511 
```
## 术语
Linux
  Used: Used by Applications + used,but can be made available(buffers/cached)
  Free: not used for anything
Human:
  Used: Used by Applications
  Free: used,but can be made available(buffers/cached) + not used for anything

## 计算
Mem
  total: 计算机物理RAM总量
  used：applicaiton+buffers+cached
  free：total - used
  shared: ../
  buffers: 缓冲(处理不过来存着)
  cached: 缓存(供未来使用)
-/+ buffers/cache
  total: -
  used: Mem.used - (Mem.buffers+Mem.cached)
  free: Mem.total - [-/+ buffers/cache].used



# 新版本

  ```
[husa@ArchLinux-husa tmp]$ free 
              总计         已用        空闲      共享    缓冲/缓存    可用
内存：     7871140     3423568     1700552      445284     2747020     3696472
交换：
  ```

## 计算
available =  ?...
