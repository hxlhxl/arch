





操作系统为用户提供了一种最基础的抽象：进程[^1]。而要实现计算机上各种程序共享有限的CPU、Memory资源，计算机必须要有一些硬件和软件上的机制和策略保证。一个是time sharing[^2]，另一个就是schedule policy[^3]。

操作系统提供了一系列底层API用于操作进程，分别有fork、wait、exec、kill；而进程本身在这些API的操作下会有一个生命周期，常见的状态有Ready、Running、Blocked、Zombie等。OS是如何通过API和一些policy操作进程又牵扯到进程是如何表现的，

# 文件描述符

## 重定向

open系统调用总是返回当前进程 文件描述符表中最小的 fd

``` cat < input.txt
char *argv[2];
argv[0] = "cat";
### argv[1] = 0;
if(fork() == 0) {
    close(0);
    open("input.txt", O_RDONLY);
    exec("cat", argv);
}
```


## 错误重定向

int dup2(int fildes, int fildes2);
    The dup2() function shall cause the file descriptor fildes2 to refer to the same open  file  description  as the  file descriptor fildes and to share any locks, and shall return fildes2.


``` ls existing-file non-exsiting-file > tmp1 2>&1
dup2(1,2);
write(1, "existing-file info", 100);
write(2, "non-existing-file error info", 100);
```


## 子shell

``` (echo 1;echo 2) > output.txt
fd = dup(1);
write(1, "1", 2);
write(fd, "2", 2);
```


# 管道

The  pipe()  function  shall  create  a  pipe  and  place  two file descriptors, one each into the arguments
       fildes[0] and fildes[1], that refer to the open file descriptions for the read and write ends of  the  pipe.
       Their  integer  values  shall be the two lowest available at the time of the pipe() call. The O_NONBLOCK and
       FD_CLOEXEC flags shall be clear on both file descriptors. (The fcntl() function can  be  used  to  set  both
       these flags.)





```
$ echo 1 |wc 
1 1 2
```

下面的代码解读：
    如果是pipe类型的命令，系统在数组p上调用pipe命令，
    fork子进程，关闭fd 1,dup(p[1])表示把最小的fd也就是之前关闭的fd 1复制到p[1]上，清理p[0]和p[1],执行pcmd-left；同样的，执行pcmd-right的时候关闭fd 0并复制到p[0]上；最后同时关闭p[0]和p[1]，等待两个fork子进程退出。本质上也就是左边的子进程的标准输出为shell父进程的标准输出，右边的子进程的标准输入为shell父进程的标准输入，二者结束之后关闭管道。
    
    配合echo 1|wc来看就是拷贝pipe[1]即写端口到父进程的fd 1上，然后关闭pipe[0]和pipe[1]，执行left即echo 1命令，而echo 1的标准输出现在在pipe[1]上，所以echo 1的结果被放到了pipe[1]上；同样的道理，拷贝pipe[0]即读端口到父进程的fd 0上，然后关闭pipe[0]和pipe[1]，执行right即wc命令，而wc的标准输入现在在pipe上，所以就会从管道上读取输入了。

```
  case PIPE:
    pcmd = (struct pipecmd*)cmd;
    if(pipe(p) < 0)
      panic("pipe");
    if(fork1() == 0){
      close(1);
      dup(p[1]);
      close(p[0]);
      close(p[1]);
      runcmd(pcmd->left);
    }
    if(fork1() == 0){
      close(0);
      dup(p[0]);
      close(p[0]);
      close(p[1]);
      runcmd(pcmd->right);
    }
    close(p[0]);
    close(p[1]);
    wait();
    wait();
    break;

    ```





[^1]: 进程[process]: 运行的程序
[^2]:  allow the resource to be used for a little while by one entity,and then a little while by another
[^3]: 
[^4]: ![process life cycle](https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=imgres&cd=&cad=rja&uact=8&ved=0ahUKEwjWgt_SgpvYAhUhslQKHUdFAbQQjRwIBw&url=https%3A%2F%2Fchannel9.msdn.com%2FEvents%2FWindows-Camp%2FWindows-Store-App-Development-for-iOS-Developers%2FProcess-Lifecycle-Management-and-State-Management&psig=AOvVaw1g39nnBJJEbaKTYwPDmYjL&ust=1513942821595047)


