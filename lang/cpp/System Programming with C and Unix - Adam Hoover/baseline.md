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
    OS具备管理内存的能力，使用`malloc`，程序可以向OS申请内存块(memory chunk)，而这些内存块是从堆(heap)中分配来的。
# Input/Output

# Program Management

# System Calls

# Appendix
## ASCII Table
## Common Shell Commands