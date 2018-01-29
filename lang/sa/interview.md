ref: https://github.com/chassing/linux-sysadmin-interview-questions

# General Questions
- What did you learn yesterday/this week?
- Talk about your preferred development/administration environment.(OS,Editor,Browser,Tools etc)
- Tell me about the last major Linux project you finished.
- Tell me about the biggest mistake you've made in [some recent time period] and how you would do it differently today.What did you learn from this experience?
- Why we must choose you?
- What function does DNS play on a network?
- What is HTTP
- What is an HTTP proxy and how does it work?
- Describe briefly how HTTPS works.
- What is SMTP? Give the basic scenario of how a mail message is delivered via SMTP.
- What is RAID?What is RAID0,RAID1,RAID5,RAID 10?
- What is a level 0 backup?What is an incremental backup?
- Describe the general file system hierarchy of a Linux system.

# Simple Linux Questions
- What is the name and the UID of the administrator user?
- How to list all files,including hidden ones,in a directory?
- What is the Unix/Linux command to remove a directory and its contents?
- Which command will show you free/used memory?Does free momery exist on Linux?
  [free](https://www.linuxnix.com/find-ram-size-in-linuxunix/)
- How to search for the string "my konfi is the best" in files of a directory recursively?
- How to connet to a remote server or what is SSH?
- How to get all environment variables and how can you use them?
- I get "command not found" when I run ifconfig -a.What can be wrong?
- What happens if I type TAB-TAB?(bash-completion)
- What command will show the available disk space on the Unix/Linux system?
- What commands do you know that can be used to check DNS records?(dig/nslookup/host)
- What Unix/Linux commands will alter a files ownership,files permissoins?
- What does cchmod +x FILENAME do?
- What does the permission 0750 on a file mean?
- What does the permission 0750 on a directory mean?
- How to add a new system user without login permissions?
- How to add/remove a group from a user?
- What is a bash alias?
- How do you set the mail address of the root/a user?
- What does CTRL-c do?
- What is in /etc/services?
- How to redirect STDOUT and STDERR in bash?(>/dev/null 2>&1)
- What is the difference between UNIX and Linux?
- What is the difference between Telnet and SSH?
  Telnet：远程连接工具(协议)，不安全，内网使用比较好
  SSH: 远程连接工具(协议)
- Explain the three load averages and what do they indicate.What command can be used to view the load averages?
  uptime/top
- Can you name a lower-case letter that is not a valid option for GNU ls?
- What is a Linux kernel module?
  [l-lkm](https://www.ibm.com/developerworks/cn/linux/l-lkm/index.html)
  单内核
    大部分功能： 在kernel space之内
    
    模块的作用在于动态的加载、去除内核功能
  微内核
    核心功能：IPC、调度、IO、内存
    其他功能：驱动程序、网络堆栈、文件系统，在kernel space之外
- Walk me through the steps in booting into single user mode to troubleshoop a problem.
- Walk me through the steps you'd take to troubleshoop a 404 error on a web application you administer.

# Medium Linux Question:
- What do the following commands do and how would you use them?
  - tee -> read from standard input and write to standard output and files
  ```
    ss -ntl | tee ss.log	# 从标准输入写到文件中
    pwd | tee -a ss.log		# 追加到ss.log中
    echo 1234 | tee - 
  ```
  - awk -> pattern scanning and processing language
  ```
    1. 杀死进程

    2. 统计系统账户中系统和非系统用户
      awk -F: '{if($3>=1000) {printf "Common user: %s\n",$1} else {printf "root or Sysuser: %s\n",$1}}' /etc/passwd
    3. 统计shell是/bin/bash的进程
      awk -F: '{if($NF=="/bin/bash") print $1}' /etc/passwd
    4. 统计/etc/fastab中列数大于5的行
      awk '{if(NF>5) print $0}' /etc/fstab
    5. 以%分割正则匹配^\/dev/开头的行，并找出容量占用大于20%的
      df -h | awk -F[%] '/^\/dev/{print $1}' | awk '{if($NF>=20) print $1}'
    6. 对一行中的字符逐一处理: grub.cfg中以[:space:]*linux开头的行，定义变量i，如果i小于列数，打印$i,length($i)
      sudo awk '/^[[:space:]]*linux/{i=1;while(i<=NF) {print $i,length($i); i++}}' /boot/grub/grub.cfg
    7. 提前结束进入下一行
      awk -F: '{if($3%2!=0) next; print $1,$3}' /etc/passwd
    8. 关联数组
      awk 'BEGIN{weekdays["mon"]="Monday";weekdays["tue"]="Tuesday";for(i in weekdays) {print weekdays[i]}}'
    9. 统计TCP连接状态,$NF为TCP连接状态
      netstat -tan | awk '/^tcp\>/{state[$NF]++}END{for(i in state) { print i,state[i]}}'
  ```
  - tr
  - cut
  ```
    ss -ntl|cut -d":" -f 1
  ```
  - tac -> concatenate and print files in reverse
  - curl
  - wget
  - watch
  - head
  - tail
- What does an & after command do?
  Answer: The & makes the command run in the background.
- What does & disown after a command do?
  ref: https://www.ibm.com/developerworks/cn/linux/l-cn-nohup/index.html
- What is a packet filter and how does it work?
- What is Virtual Memory?[important]
  ref: http://www.cnblogs.com/dyllove98/archive/2013/06/12/3132940.html
  1. 每个进程都有自己独立的4GB内存空间，各个进程的内存空间都具有类似的结构
  2. 一个新进程建立的时候，将会建立起自己的内存空间，此进程的数据、代码等从磁盘拷贝到自己的进程空间，PCB中的task_struct会记录地址。
  3. 每个进程已经分配的内存空间，都与对应的磁盘空间映射
  4. 页表记录虚拟内存与物理内存之间的映射关系，虚拟内存不在物理内存上就会发生缺页异常
  5. 缺页异常需要把磁盘数据拷贝到物理内存中，有空地方ok，没空地方就会出现页覆盖，如果被覆盖的内存有脏数据，就会写回磁盘。
  6. 
- What is swap and what is it used for?[important]
  swap空间的作用可简单描述为：当系统的物理内存不够用的时候，就需要将物理内存中的一部分空间释放出来，以供当前运行的程序使用。那些被释放的空间可能来自一些很长时间没有什么操作的程序，这些被释放的空间被临时保存到Swap空间中，等到那些程序要运行时，再从Swap中恢复保存的数据到内存中。这样，系统总是在物理内存不够时，才进行Swap交换。其实，Swap的调整对Linux服务器，特别是Web服务器的性能至关重要。通过调整Swap，有时可以越过系统性能瓶颈，节省系统升级费用。 
  可能计算机用户会经常遇这种现象。例如，在使用Windows系统时，可以同时运行多个程序，当你切换到一个很长时间没有理会的程序时，会听到硬盘“哗哗”直响。这是因为这个程序的内存被那些频繁运行的程序给“偷走”了，放到了Swap区中。因此，一旦此程序被放置到前端，它就会从Swap区取回自己的数据，将其放进内存，然后接着运行。 
  另外，并不是所有从物理内存中交换出来的数据都会被放到Swap中(如果这样的话，Swap就会不堪重负)，有相当一部分数据被直接交换到文件系统。例如，有的程序会打开一些文件，对文件进行读写(其实每个程序都至少要打开一个文件，那就是运行程序本身)，当需要将这些程序的内存空间交换出去时，就没有必要将文件部分的数据放到Swap空间中了，而可以直接将其放到文件里去。如果是读文件操作，那么内存数据被直接释放，不需要交换出来，因为下次需要时，可直接从文件系统恢复；如果是写文件，只需要将变化的数据保存到文件中，以便恢复。但是那些用malloc和new函数生成的对象的数据则不同，它们需要Swap空间，因为它们在文件系统中没有相应的“储备”文件，因此被称作“匿名”(Anonymous)内存数据。这类数据还包括堆栈中的一些状态和变量数据等。所以说，Swap空间是“匿名”数据的交换空间。 

- What is an A record,an NS record,a PTR record,a CNAME record,an MX record?
- Are there any other PRs and what are they used for?[important]
- What is a Split-Horizon DNS?[important]
  ref: http://jensd.be/160/linux/split-horizon-dns-masterslave-with-bind
- What is the sticky bit?[important]
   假如本来在该位(最后一位)上有x, 则这些特别标志 (suid, sgid, sticky) 显示为小写字母 (s, s, t). 否则, 显示为大写字母 (S, S, T) 。
  - SUID -> 当一个设置了SUID 位的可执行文件被执行时，该文件将以所有者的身份运行，也就是说无论谁来执行这个文件，他都有文件所有者的特权。
  - GUID -> 当一个设置了SGID 位的可执行文件运行时，该文件将具有所属组的特权， 任意存取整个组所能使用的系统资源。若一个目录设置了SGID，则所有被复制到这个目录下的文件， 其所属的组都会被重设为和这个目录一样，除非在复制文件时加上-p （preserve，保留文件属性）的参数，才能保留原来所属的群组设置。
  - sticky bit -> 对一个文件设置了sticky-bit之后，尽管其他用户有写权限， 也必须由属主执行删除、移动等操作。对一个目录设置了sticky-bit之后，存放在该目录的文件仅准许其属主执行删除、 移动等操作。
  ```
  [husa@ArchLinux-husa perf_process]$ ls -dl /tmp
drwxrwxrwt 14 root root 960 10月 23 11:36 /tmp
  ```

- What does the immutable bit do to a file?
  chattr +i FILENAME
  The immutable bit option +i can only be set by the root user. So either you should have root priviledges or you need to use sudo to execute the command.

- What is the difference between hardlinks and symlinks?What happens when you remove the source to a symlink/hardlink?
  ref: https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/
  ```
  [husa@ArchLinux-husa tmp]$ stat ss.log 
  文件：ss.log
  大小：1052            块：8          IO 块：4096   普通文件
  设备：23h/35d   Inode：695263      硬链接：1
  权限：(0644/-rw-r--r--)  Uid：( 1000/    husa)   Gid：(  100/   users)
  最近访问：2017-10-23 10:57:18.077554362 +0800
  最近更改：2017-10-23 10:57:15.270819493 +0800
  最近改动：2017-10-23 10:57:15.270819493 +0800
  创建时间：-
  ```
  重命名文件不会影响文件的inode号
  - 硬链接
    一个inode号对应多个文件名；同一个文件使用了多个别名；link oldfile newfile
    特点：
      - 文件有相同的 inode 及 data block；
      - 只能对已存在的文件进行创建；
      - 不能交叉文件系统进行硬链接的创建；
      - 不能对目录进行创建，只可对文件创建；
      - 删除一个硬链接文件并不影响其他有相同 inode 号的文件。
    Linux inode:
      Linux 系统存在 inode 号被用完但磁盘空间还有剩余的情况。
  - 软链接
     若文件用户数据块中存放的内容是另一文件的路径名的指向，则该文件就是软连接。软链接就是一个普通文件，只是数据块内容有点特殊。软链接有着自己的 inode 号以及用户数据块
     特点：
       - 软链接有自己的文件属性及权限等；
       - 可对不存在的文件或目录创建软链接；
       - 软链接可交叉文件系统；
       - 软链接可对文件或目录创建；
       - 创建软链接时，链接计数 i_nlink 不会增加；
       - 删除软链接并不影响被指向的文件，但若被指向的原文件被删除，则相关软连接被称为死链接（即 dangling link，若被指向路径文件被重新创建，死链接可恢复为正常的软链接）。
- What is an inode and what fields are stored in an inode?
- How to force/trigger a file system check on next reboot?
- What is SNMP and what is it used for?
- What is a runlevel and how to get the current runlevel?
- What is SSH port forwarding?
- What is the difference between local and remote port forwarding?
- What are the steps to add a user to a system without useing useradd/adduser?
- What is MAJOR and MINOR numbers of special files?
- Describe the mknod command and when you'd use it.
  mknod -> make block or character special files
- Describe a scenario when you get a "filesystem is full" error,but 'df' shows there is free space.
- Describe a scenario when deleting a file,but 'df' not showing the space being freed.
- Describe how 'ps' works.[important]
  On Linux, the ps command works by reading files in the proc filesystem. The directory /proc/PID contains various files that provide information about process PID. The content of these files is generated on the fly by the kernel when a process reads them.

- What happens to a child process that dies and has no parent process to wait for it and what's bad about this?
- Explain briefly each one of the process states.[important]
- How to know which process listens on a specific port?
- What is a zombie process and what could be the cause of it?
- You run a bash script and you want to see its output on your terminal and save it to a file at the same time.How could you do it?
- Explain what echo "1" > /proc/sys/net/ipv4/ip_forward does.
- Describe briefly the steps you need to take in order to create and install a valid certificate for the site https://foo.example.com
- Can you have serval HTTPS virtual hosts sharing the same IP?
- What is a wildcard certificate?
- Which Linux file types do you know?
- What is the difference between a process and a thread?And parent and child process after a fork system call?[important]
  进程是具有一定独立功能的程序关于某个数据集合上的一次运行活动,进程是系统进行资源分配和调度的一个独立单位.
  线程是进程的一个实体,是CPU调度和分派的基本单位,它是比进程更小的能独立运行的基本单位.线程自己基本上不拥有系统资源,只拥有一点在运行中必不可少的资源(如程序计数器,一组寄存器和栈),但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源.
- What is the difference between exec and fork?
- What is "nohup" used for?
- What is the difference between these two commands?
  myvar=hello
  export myvar=hello
- How many NTP servers would you configure in you local nto.conf?
- What does the column 'reach' mean in ntpq -p output?
- You need to upgrade kernel at 100-1000 servers,how you would do this?
- How can you get Host,Channel,ID,LUN of SCSI disk?
- How can you limit process memory usage?
  ref: https://unix.stackexchange.com/a/125024
  - ulimit
  - cgroups
- What is bash quick substition/caret replace(^x^y)?
- Do you know of any alternative shell?If so,have you used any?
- What is a tarpipe(or,how would you go about copying everything,including hardlinks and special files,from one server to another)?
- How can you tell if the httpd package was already installed?
- How can you list the contents of package?
- How can you determine which package is better:openssh-server.x86_64 or openssh-server-6.6p.x86_64?
- Can you explain to me the difference better block based,and object based storage?
-


# Hard Linux Question
- What is a tunnel and how you can bypass a http proxy?
- What is the difference better IDS and IPS?
- What shortcuts do you use on a regular basis?
- What is the Linux Standard Base?
- What is an atomic operation?
- Your freshly configured http server is not running after a restart,what can you do?
- What kind of keys are in ~/.ssh/authorized_keys and what it is this file used for?
- I've added my public ssh key into authorized_keys but I'm still getting a password prompt,what can be wrong?
- Did you ever create RPM's DEB's or solaris pkg's?
- What does `:(){ :|:& };:` do on your system?
  定义:函数然后调用
- How do you catch a Linux signal on a script?[important]
  trap
    - trap "commands" signal-list
    - trap signal-list 
    - trap ' ' signal-list
- Can you catch a SIGKILL?
  No!
- What's happening when the Linux kernel is starting on the OOM killer and how does it choose which process to kill first?
- Describe the linux boot process with as much detail as possible,starting from when the system is powered on and ending when you get a prompt.
- What is a chroot jail?
  ref: https://www.ibm.com/developerworks/cn/linux/l-cn-chroot/index.html
  作用：
    - 增加系统安全性，限制用户权利
    - 创建与系统隔离的目录环境
    - 切换系统的根目录位置，引导Linux系统启动(initramfs -> init/systemd)以及急救系统等
- When tring to umount a directory it says it's busy,how to find out which PID holds the directory?
  lsof |grep /dev/BUSY_DEV
- What's LD_PRELOAD and when it's used?
- You ran a binary and nothing happend.How would you debug this?
- What are cgroups?Can you specify a scenario where you could use them?
- How can you remove/delete a file with file-name consisting of only non-printable/non-type-able characters?
- How can you increase or decreese the priority of a process in Linux?
- What are run-levels in Linux?


# Expert Linux Question.
- A running process get EAGAIN:Resource temporarily unavailable on reading a socket.How can you close this bad socket/file descriptor without killing the process?


# Networking Question.
- What is localhost and why would ping localhost fail?
- What is the similarity between 'ping' & 'traceroute'?How is traceroute able to find the hops.
  - ping
    ICMP
  - traceroute
    ICMP+TTL
    没经过一个路由器TTL减一
- What is the command used to show all open ports and/or socket connections on a machine?
- Is 300.168.0.123 a valid IPv4 address?
- Which IP ranges/subnets are "privete" or "non-routable"(RFC 1918)?
- What is a VLAN?
- What is ARP and what is it used for?
- What is the difference between TCP and UDP?
- What is the purpose of a default gateway?
- What is command used to show the routing table on a Linux box?
- A TCP connection on a network can be uniquely defined by 4 things.What are those things?
  protocol
  host
  port
  
- When a client runngin a web browser connects to a web server,what is the source port and what is the destination port of the connectoin?
- How do you add an IPv6 address to a specific interface?
- You have added an IPv4 and IPv6 address to interface eth0.A ping to the v4 address is working but a ping to the v6 address gibes you the response sendmsg:operatoin not permitted.What could be wrong?
- What is SNAT and when hsould it be used?
- Explain how could you ssh login into a Linux system that DROPs all ne wincoming packets using a SSH tunnel.
- How do you stop a DDoS attack?
- How can you see content of an ip packet?
- What is IPoAC(RFC 1149)?


# MySQL Question.
- How do you create a user?
- How do you provide privileges to a user?
- What is the difference between a "left" and a "right" join?
- Explain briefly the differences between InnoDB and MyISAM.
- Describe briefly the steps you need to follow in order to create a simple master/slave cluster.
- Why should you run "mysql_secure_install" after installing MySQL?
- How do you check which jobs are running?
- How would you take a backup of a MySQL database?


# DevOps Question.
- Can you describe your workflow when you create a script.
- What is GIT?
- What is a dynamically/statically linked file?
- What does "./configure && make && make install" do?
- What is puppet/chef/ansible used for?
- What is Nagios/Zenoss/NewRelic used for?
- What is Jenkins/TeamCity/GoCI used for?
- What is the differences between Containers and VMs?
- How do you create a new postgres user?
- What is a virtual IP address?What is a cluster?
- How do you print all strings of printable characters present in a file?
- How do you find shared library dependencis?
- What is Automake and Autoconf?
- ./configure shows an error that libfoobar is missing on your system,how could you fix this,what could be wrong?
- What are the advantages/disadvantages of script vs compiled program?
- What's the relationships between continuous delivery and DevOps?
- What are the import aspects of a system continuous integration and deployment?
- How would you enable network file sharing within AWS that would allow EC2 instance in multiple availability zones to share data?


# Fun Question.
- A careless sysadmin executes the folllowing command: chmod 444 /bin/chmod - what do you do to fix this?
- I've lost my root password,what can I do?
- I've rebooted a remote server but after 10 minutes I'm still not able to ssh into it.,what can be wrong?
- If you were stuck on a desert island with only 5 command-line utilities,which would you choose?
- You come across a random coputer and it appears to be a command console for the universe.What is the first thing you type?
- Tell me about a creative way that you've used SSH?
- You have deleted by error a running script,what could you do to restore it?
- What will happen on 19 January 2038?
- How to reboot server when reboot command is not responding?


# Demo Time
- Unpack test.tar.gz without man pages or gogle.
- Remove all "*.pyc" files from testdir recursively?
- Search for "my konfu is the best" in all *.py files
- Replace the occurrence of "my konfu is the best" with "I'm a linux jedi master" in all *.txt files.
- Test if port 443 on a machine IP address x.x.x.x is reachable.
- Get http://myinternal.webserver.local/test.html via telnet/
- How to send an email without a mail client,just on the command line?
- Write a get_prim mehtod in python/perl/bash/pseudo
- Find all files which have been accessed within the last 30 days/
- Explain the following command(data;ps -ef|awk '{print $1}'|sort|uniq|wc -l>>activity.log)
- Write a script to list all the differences between two directories.
- In a log file with contens as <TIME>:[MESSAGE]:[ERROR_NO] - Human readable text display summary/count of specific error numbers that occurred every hour or a spcecific hour.




 
