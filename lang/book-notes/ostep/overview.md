Virtualization
Concurrency
Persistence

A Dialogue on the Book
Introduction to Operating Systems

Virtualization
    A Dialogue on Virtualization
    The Abstraction： The Process
    Interlude： Process API
    Mechanism： Limited Direct Execution
    Scheduling： Introduction
    Scheduling： The Multi-Level Feedback Queue
    Scheduling： Proportional Share
    Multi-processor Scheduling
    Summary Dialog on CPU Virtualization


虚拟化CPU
    Mechanism(low-level)
        1. 进程(process)
            运行的程序
                内存(地址空间，进程能够读写的地址)
                寄存器
                    PC(program counter)/IP(instruction pointer): 进程正在执行的指令地址
                    SP(stack pointer): 
                    FP

        2. 分时机制(time-sharing)
            上下文切换(context-switch)
    Policy(high-level): algorithms help OS make decision
        historical information
        workload knowledge
        performance metrics
