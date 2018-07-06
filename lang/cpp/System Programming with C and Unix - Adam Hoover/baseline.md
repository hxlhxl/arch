# core dump调试技巧

[gdb调试coredump(使用篇)](https://blog.csdn.net/u014403008/article/details/54174109)

# Introduction
主要介绍了gdb的使用方法，和常见的调试场景

## 调试场景
- 


# Bits,Bytes,and Data Types

## Memory-Map

```
char a;
short int b;
char c;
```
|label(variable)|Address|Bits|Value(symbol)|
|-|-|-|-|
|a|400|00000011|3|

##


# Array and Strings
## Array 

- C中数组可以越界 ch03.project01
```

```

# Pointers and Structures
## Pointers
- A pointer is a construct used to store an address of a variable;
- size(32bit/4Gb 4bytes| 64bit 8bytes)
- pointer加法: 指针地址的运算，步长为指针对应的数据类型的大小所占的字节数 ch04.project01
- 
## Using Pointers
- Passing Values Back from a Function(将指针作为参数，间接地修改指针指向的变量) ch04.project02
- Pointers and Arrays(数组名字可以隐式地当做指针使用) ch04.project03
- Dynamic Memory Allocation ch04.project04
    静态变量一般是通过静态内存分配的，这也就意味着每个变量的大小在程序运行前就已经知道。一般runtime大小不会发生变化。
    在程序进入runtime的之前，OS会为这些变量分配一个位置(called data segment)
    在程序进入函数时(普通函数、main函数)，函数中的变量和参数会在栈（stack)中分配。
    OS具备管理内存的能力，使用`malloc`或者`calloc`，程序可以向OS申请内存块(memory chunk)，而这些内存块是从堆(heap)中分配来的。
    "静态"分配的内存在函数结束之后，程序会自动释放给OS；但是动态分配的内存必须由程序本身负责释放内存给OS。
        ```
            double *a;
            a = (double *)malloc(70);
            a = (double *)malloc(300);  // memory leak
            free(a);
        ```
- Double Pointers(双重指针)   ch04.project05
- Double Pointers as Function paramter  ch04.project06

## Structures
- Arrays and Structures ch04.project07
- Definitions and Scope
- Nested Structures
- Pointers and Structures ch04.project07(野指针导致coredump)

# Input/Output

## Streams
An I/O transaction occurs when a program receives bytes from a source or sends bytes to a destionation.
    source： keyboard, mouse, file, sensor, other process
    destination: display, file, printer, actuator, other process

### IO Model(Stream) 
- any input or output transaction can be viewed as a flow of bytes from a source to a destination. ch05.project01

### Transporting Bytes on Streams
- fprintf/fscanf    ch05.project02
- fread/fwrite      ch05.project03
- fgetc/fputc
- gets/puts

### System I/O Functions
- [system calls] open/close/read/write
- [C library] fopen/fclose/fread/fwrite

**system calls differed from different operating system**
**f-versions always buffered while system version may buffered depending on operating system implemetion**

### Standard Streams
**Every time a program is started, the OS automatically createas three streams**
printf
scanf

- stdin
- stdout
- strerr


## Buffers
A buffer is a temporary storage between the sender and receiver of bytes on an address.
When a stream is created, one can think of it as having an address from which bytes are sent and an address at which bytes are received.
Each adress is at a memory location controlled by operating system.
The buffer is an additional piece of memory that is used to moderate the flow of bytes from the source to the destination.

- block buffer(达到一定的size flush)
- line buffer(遇到换行flush) ch05.project04
- no buffer(没有buffer)

- fflush(刷新buffer)

## Pipes
```
>
<
|
```
- pipe ch05.project05
- pipeline chaining

## Files

- file pointer
fseek
ftell
- directory
direnct.h
    opendir()
    readdir()
    closedir()
- device
- device driver


# Program Management

## Program Building

source_code ->(gcc -E/preprocess) -> source_code ->(gcc -S) -> assembly_code ->(gcc -c) -> object_code ->(gcc -o -lpthread -lc) -> execute_file
- dynamic link(gcc): when the program is run, if machine code is needed, it is loaded into memory directly from the library file.
- static link (gcc -static): the library is built into the execute program


## Code Organization
- Makefile


# System Calls
Bootloading -> kernel running -> init process -> spawn all other processes -> kernel act as a moderator between applications and the resources of the computer.

## system calls
- functions provided by kernel to user space applications
- system calls usually provides request access to resource of the machine, availability of communicating between programs and start new process.
- usually refered as an application programming interface(API)
- POSIX

## system call taxonomy
- memory management
    mmap()
    brk()
    shmget()
    mprotect()
    mlock()
    shmctl()
- time management
    time()
    gettimer()
    settimer()
    settimeofday()
    alarm()
- file system management
    open()
    read()
    write()
    close()
    creat()
    lseek()
    link()
- process management
    fork()
    execl()
    execv()
    wait()
- signal system
    signal()
    pause()
    kill()
    sigaction()
- socket system
    socket()
    bind()
    connect()
    listen()
    accept()
    send()
    recv()
- message passing
- shared memory
- semaphores
- thread management

## Libraries and System Calls
- library built upon system calls
- library simplify the low level operation
- library provides more options
- library is more compatiable with different OS(more portable)
- man pages(man 1 APINAME|system program, man 2 APINAME| system call, man 3 APINAME|library)
- system call fail return `-1` and can debugging using `perror()`



# Libraries

## Header files
- gcc -I/usr/local/myInclude
- contains function prototypes
- preprocessing(预处理器处理)
- location
    /usr/include/stdio.h
    C:\Program Files\Microsoft Visual Studio\VC98\Include

## Libraries files
- gcc -lpthread -L/usr/local/myLib
- brought into target during linking stage
- location
    /usr/lib/libpthread.a
    /usr/lib/libpthread-2.0.so.0
    windows: .lib .dll
        C:\Program Files\Microsoft Visual Studio\VC98\Lib
    
## install lib
- ./configure --prefix=/usr/local
    /usr/local/lib
    /usr/local/include

## LD_LIBRARY_PATH
LD_LIBRARY_PATH环境变量用于指定查找共享库(动态链接库 .dll, .so)位置，默认情况下，Linux程序会在`/lib`,`/usr/lib`目录下查找动态链接库，所以如果`.so`文件在自定义的位置，需要定义该目录位置，只有指定这个目录，程序才能正常执行，所以可以写一个脚本，在每次程序启动之前设置这个环境变量

比如： `export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH`


# Appendix
## ASCII Table
## Common Shell Commands