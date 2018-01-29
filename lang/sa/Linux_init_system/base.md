init是Unix和类Unix系统中用来产生其他所有进程的程序。它以守护进程的方式存在，其进程号为1.Linux系统在开机时加载Linux内核后，便由Linux内核加载init程序，由init程序完成余下的开机过程，比如加载运行级别，加载服务，引导Shell/图形化界面等等。
Unix系列中(如System III和System V)的作用，和研究中的Unix和BSD派生版相比，发生了一些变化，大多数Linux发行版是和System V相互兼容的，但是一些发行版如slackware采用的是BSD风格，其他的如Gentoo是自己定制的。后来Ubuntu和其他一些发行版采用upstart来代替传统的init进程。至2015年，大部分Linux发行版都已采用新的systemd替代System V和Upstart，但systemd向下兼容System V。




# BSD风格
BSD init 运行存放于'/etc/rc'的初始化 shell 脚本，然后启动基于文本模式的终端(getty)或者基于图形界面的终端(窗口系统，如 X)。 这里没有运行模式的问题，因为文件 'rc' 决定了 init 如何执行。
优点: 简单且易于手动编辑。
缺点: 如果第三方软件需要在启动过程执行它自身的初始化脚本，它必须修改已经存在的启动脚本，一旦这种过程中有一个小错误，都将导致系统无法正常启动。
值得注意的是，现代的 BSD 派生系统一直支持使用 'rc.local' 文件的方式，它将在正常启动过程接近最后的时间以子脚本的方式来执行。这样做减少了整个系统无法启动的风险。然后，第三方软件包可以将它们独立的 start/stop 脚本安装到一个本地的 'rc.d' 目录中(通常这是由 ports collection/pkgsrc 完成的)。 FreeBSD 和 NetBSD 现在默认使用 rc.d ，该目录中所有的用户启动脚本，都被分成更小的子脚本，和 SysV 类似。rcorder 通常根据在 rc.d目录中脚本之间的依赖关系来决定脚本的执行顺序。


# SysV风格
System V init 检查 '/etc/inittab' 文件中是否含有 'initdefault' 项。 这告诉 init 系统是否有一个默认运行模式。如果没有默认的运行模式，那么用户将进入系统控制台，手动决定进入何种运行模式。


System V中运行模式描述了系统各种可能的状态。通常会有 8 种运行模式，即运行模式 0 到 6 和 S 或者 s。其中运行模式 3 为"保留的"运行模式：
0. 关机
1. 单用户模式
6. 重启
除了模式 0,1,6外, 每种 Unix 和 Unix-like 系统对运行模式的定义不太一样。通常在 /etc/inittab 文件中定义了各种运行模式的工作范围。
目前绝大多数Linux发行版已经基于新的systemd，systemd一般不再使用/etc/inittab文件，也使用新的target取代System V的运行档次，但仍然兼容System V的运行档次。若要设置系统默认的运行模式，需要使用systemctl default targetname.target命令。

Redhat runlevel
0 - halt(Do NOT set initdefault to this)
1 - Single user mode
2 - Multiuser,without NFS(The same as 3,if you do not have networking)
3 - Full multiuser mode
4 - unused
5 - X11
6 - reboot(Do NOT set initdefault to this)
在 root 权限下，运行 telinit 或者 init 命令可以改变当前的运行模式。 /etc/inittab 文件中设置的默认的运行模式在 :initdefault: 项中。



# 跳过Init
Linux系统中，现代的bootloader(如 LILO 或者 GRUB)，用户可以在初始化过程中最后启动的进程来取代默认的 /sbin/init。
通常是在 bootloader 环境中通过执行 init=/foo/bar 命令。例如，如果执行 init=/bin/bash，启动单用户 root 的 shell 环境，无需用户密码。
BSD的变种，大多数平台， bootstrap 程序是可以被打断的，然后执行 boot -s 命令进入单用户模式。
单用户模式并不没有跳过 init，它仍然可以执行 /sbin/init，但是它将使 init 询问 exec() 将要执行的命令 (默认为 /bin/sh) 的路径，而不是采用正常的多用户启动顺序。 如果内核启动时在 /etc/ttys 文件中被标注为 "不安全" (在某些系统中，当前的"安全模式" 可能会有些变化)， 在允许这种情况(或者回退到单用户模式，如果用户执行 CTRL+D)，init 将首先询问 root 用户的密码。 如果该程序退出，内核将在多用户模式下重新执行 init。 如果系统从多用户模式切换到单用户模式，还将碰到上述的情况。
如果内核加载后， init 不能被正常启动， 这将导致 panic 错误，此时系统将不可使用。想要通过 init 自身来改变 init 的路径，不同的版本情况不太一样(NetBSD中可执行 boot -a ; FreeBSD中利用 init_path 命令装载变量)。







