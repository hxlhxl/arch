# Socket Programming

http://users.pja.edu.pl/~jms/qnx/help/tcpip_4.25_en/prog_guide/sock_advanced_tut.html


# TCP Model
- 3-way handshake
    SYN(client) -> SYN/ACK(server) -> ACK(client)

## backlog

- single queue
    a queue contains two different state(SYN_RECEIVED, ESTABLISHED) connection
- two queue
    SYN_RECEIVED queue
    ESTABLISHED queue

# IO模型
ref: https://woshijpf.github.io/linux/2017/07/10/Linux-IO模型.html

- 等待数据准备就绪(ready for the data to be ready)
- 数据从内核空间移动到用户空间(copying the data from kernel to process)

accept()并不是天生阻塞(blocking)的，这个要看调用accept方法时，传进来的socket的配置。
如果socket不是non-blocking,那么socket默认就是blocking的了，那么accept的时候，服务进程会被操作系统调度，也就是挂起(因为它一直在等待client发起connection)
如果socket是non-blocking,那么accept的时候，服务进程不会被操作系统调度，而是继续执行，这个时候，程序需要自主的去检查socket的状态(这会造成硬件资源的浪费)；当然也可以使用OS提供的其他系统调用帮助用户完成这件事，典型的调用有`select`,`poll`,`epool`,`kqueue`，他们会帮助用户程序检查`ready`状态的descriptor，本质上这些系统调用还是会发生`blocking io`，操作系统这个时候也会调度进程。

## IO model
- Synchronous  IO
- Asynchronous IO
- Blocking IO
- Non-blocking IO

Synchronous IO和Asynchronous IO的区别在于： 用户空间的进程是否被阻塞
    Synchronous IO
        Blocking IO
        Non-blocking IO
        IO Multiplexing
    Asynchronous IO
        aio_read()

Bloking IO和Non-blocking IO的区别在于： read系统调用是否是阻塞性的


## Linux IO model
- Blocking IO
- Non-blocking IO
- IO multiplexing
- Asynchronous IO
- Signal Driven IO


# reference
TCP backlog原理：
    http://veithen.github.io/2014/01/01/how-tcp-backlog-works-in-linux.html

http://luohaha.github.io/Chinese-uvbook/source/basics_of_libuv.html
https://github.com/nikhilm/uvbook
