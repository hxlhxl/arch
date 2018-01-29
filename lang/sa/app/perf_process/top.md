
# top

## top字段理解
- PID: Process ID
- PPID: Parent Process PID
- RUSER: Real User Name
- UID: User ID
- USER: User name
- GROUP: Group name
- TTY: Controlling Tty
- PR: Priority(任务优先级)
- NI: Nice value(Nice值),越小优先级越高
- VIRT: Virtual Image(虚拟内存总量) /proc/#PID/state VmSize filed
- %CPU: CPU usage
- %Mem: Mem usage(RES),a task's currentlyy used share of available physical memory.
- TIME+: CPU Time(CPU占用时间)
- S: Process status(D:uninerruptible sleep,R:running,S:sleeping,T:traced or stopped,Z:zombie)
- CODE:  Code size
- DATA: Data + Stack size
- 
