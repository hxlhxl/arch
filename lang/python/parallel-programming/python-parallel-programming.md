# 概述

## 并行、并发
[img](https://zeroturnaround.com/wp-content/uploads/2015/09/Screenshot-2015-09-28-11.26.07.png)
[并行并发](https://laike9m.com/blog/huan-zai-yi-huo-bing-fa-he-bing-xing,61/)


## 场景
一个程序如果运行一个查询任务需要很长时间，如果没有并发的能力，那么其他功能就会被阻塞。如果这个查询功能通过

## 并发通信
### 共享状态

### 消息传递

## 问题

### 死锁
进程A需要进程B的一个条件，进程B需要进程A的一个条件，二者相互需要，无法满足，出现死锁。

### 饥饿
进程A一直占用CPU，进程B根本没有机会占用CPU

### 竞态
进程A和进程B操作同一个资源，如果二者的操作顺序、步骤没有同步机制，则会发生不可预期的错误。例子：银行存钱、取钱。


# Python
## GIL
GIL是一种用于实现标准Python(也被称为CPython)的一种机制，是为了避免不同的线程同时执行字节码。在这门语言的使用者中，GIL存在的原因被激烈的讨论着。GIL被用于保护被CPython解释器使用的内存储器，因为CPython解析器并未实现为线程的并发访问的同步机制。在任何情况下，当我们决定使用线程时，GIL将会导致一个问题，这些往往是CPU受限。比如说，I/O Threads超出了GIL的范围。也许GIL机在Python的演变过程中带来的好处要多于坏处。显然，我们不能仅仅将效率作为评判一个事情是好是坏的唯一的标准。

很多情况下,使用多进程配合消息传递能更好的平衡可维护性、可扩展性以及性能之间的关系。然而，在某些情况下即使由于GIL的存在会降低效率也还是会需要线程。这时，所能做的就是写一些代码片段作为C语言的扩展，并且把它们嵌入到Python程序中。因此也是有替代品的，这应由开发人员分析真正的需求。那么问题来了，GIL一般来说是一个恶棍吗？重要的是要记住，PyPy团队正致力于将GIL从Python中移除的STM的实现。

[GIL](https://medium.com/@yaoyaowd/python-你怎么那么慢-看看并行和并发-6a97c4828d64)


## LIB
### threading
Python的threading模块提供了一个抽象层次的模块_thread，这是一个低层次的模块。当开发一个基于线程的并行系统的艰巨任务时，它为程序员提供了一些函数来帮助程序员的开发。线程模块的官方文档可以在<http://docs.python.org/3/library/ threading.html?highlight=threading#module-threadin>找到。

### multiprocess
multiprocessing模块旨在为基于进程的并行的使用提供一个简单的API。这个模块与线程模块类似，它简化了基于进程的并行系统的开发,这一点与线程模块没有什么不同。在Python社区中，基于进程的方法很流行，因为它是在解决出现在Python中CPU-Bound threads和GIL的使用的问题时的一个解决方案。多进程模块的官方文档可以在<http://docs.python.org/3/library/multiprocessing.html?highlight=multi processing#multiprocessing>找到。

### celery
Celery是一个用于创建分布式系统的极其优秀的模块，并且拥有很好的文档。它在并发形式上使用了至少三种不同类型的方法来执行任务：multiprocessing, Eventlet,和 Gevent。这项工作将会集中精力在多进程的方法的使用上。而且，只需要通过配置就能实现进程间的互联，这被留下来作为一个研究，以便读者能够建立一个与他/她的实验的一个比较。



G
# 并发编程模型
## 分治

## 数据划分
数据被划分成不同的部分给不同的子程序处理，然后输出结合起来
## 队列
数据被子程序按序处理
## 识别
独立计算任务
通信计算任务

# threading

## 

# ref

- [python-parallel-programming-cookbook-cn](https://github.com/laixintao/python-parallel-programming-cookbook-cn)