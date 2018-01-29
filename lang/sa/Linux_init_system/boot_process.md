ref: https://www.ibm.com/developerworks/linux/library/l-linuxboot/

# 1.POST
BIOS/UEFI
开机自检

# 2.Bootloader Stage 1
a. MBR
mbr参考文章：http://thestarman.pcministry.com/asm/mbr/STDMBR.htm
MBR由三部分组成：bootloader 446、partition table 64、magic number 2
**提取MBR**
```
[husa@ArchLinux-husa Linux_init_system]$ sudo fdisk -l /dev/sda
Disk /dev/sda：238.5 GiB，256060514304 字节，500118192 个扇区
单元：扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
磁盘标签类型：dos
磁盘标识符：0xb3eab404

设备       启动      起点      末尾      扇区   大小 Id 类型
/dev/sda1  *         2048   1026047   1024000   500M  7 HPFS/NTFS/exFAT
/dev/sda2         1026048 251660287 250634240 119.5G  7 HPFS/NTFS/exFAT
/dev/sda3       251660288 252069887    409600   200M 83 Linux
/dev/sda4       252069888 500118191 248048304 118.3G 83 Linux
[husa@ArchLinux-husa Linux_init_system]$ sudo dd if=/dev/sda1 of=win.mbr.bin count=1 bs=512
记录了1+0 的读入
记录了1+0 的写出
512 bytes copied, 0.00173176 s, 296 kB/s
[husa@ArchLinux-husa Linux_init_system]$ file win.mbr.bin 
win.mbr.bin: DOS/MBR boot sector, code offset 0x52+2, OEM-ID "NTFS    ", sectors/cluster 8, Media descriptor 0xf8, sectors/track 63, heads 255, hidden sectors 2048, dos < 4.0 BootSector (0x80), FAT (1Y bit by descriptor); NTFS, sectors/track 63, sectors 1023999, $MFT start cluster 42666, $MFTMirror start cluster 2, bytes/RecordSegment 2^(-1*246), clusters/index block 1, serial number 085289e45289d6ba
```
- 
b. BIOS+MBR的启动流程

    系统启动过程主要由一下几步组成(以硬盘启动为例):

    1. 开机 :-)
    2. BIOS 加电自检 ( Power On Self Test -- POST )内存地址为 0ffff:0000
    3. 将硬盘第一个扇区 (0头0道1扇区, 也就是Boot Sector)读入内存地址 0000:7c00 处.
    4. 检查 (WORD) 0000:7dfe 是否等于 0xaa55, 若不等于则转去尝试其他启动介质, 如果没有其他启动介质则显示"No ROM BASIC" 然后死机.
    5. 跳转到 0000:7c00 处执行 MBR 中的程序.
    6. MBR 首先将自己复制到 0000:0600 处, 然后继续执行.
    7. 在主分区表中搜索标志为活动的分区. 如果发现没有活动分区或有不止一个活动分区, 则转停止.
    8. 将活动分区的第一个扇区读入内存地址 0000:7c00 处.
    9. 检查 (WORD) 0000:7dfe 是否等于 0xaa55, 若不等于则显示 "Missing Operating System" 然后停止, 或尝试软盘启动.
    10. 跳转到 0000:7c00 处继续执行特定系统的启动程序.
    11. 启动系统 ...

    以上步骤中 2,3,4,5 步是由 BIOS 的引导程序完成. 6,7,8,9,10步由MBR中的引导程序完成.

    一般多系统引导程序 (如 SmartFDISK, BootStar, PQBoot 等)都是将标准主引导记录替换成自己的引导程序, 在运行系统启动程序之前让用户选择要启动的分区.
    而某些系统自带的多系统引导程序 (如 lilo, NT Loader 等)则可以将自己的引导程序放在系统所处分区的第一个扇区中, 在 Linux中即为 SuperBlock (其实 SuperBlock 是两个扇区).

    注: 以上各步骤中使用的是标准 MBR, 其他多系统引导程序的引导过程与此不同.

# 3.Bootloader State 1.5->2(kernel loader)
主要的任务是载入kernel和ram disk
以上两个阶段如果作为一个整体就是LILO(Linux Loader)或者GRUB(GRand Unified Bootloader)
LILO通过硬盘读取kernel，GRUB通过文件系统读取kernel。
在Bootloader Stage 1结束后，GRUB的启动方式会激活一个Stage1.5，这个Stage 1.5阶段拥有读取Linux文件系统的能力。
在Stage1.5执行之后，迅速进入Stage2，该阶段GRUB能够通过/etc/grub.conf配置文件展现一个用户菜单，在该菜单中可以选择不同的kernel或者使用命令行添加不同的参数。
在Stage2过程中，kernel image和initrd image都被载入了内存，最终GRUB Stage2会让出控制权，交给kernel处理。

# 3.kernel
kernel image(一般就是/boot/vmlinuz-linux)并不是可执行的，而是使用zlib压缩的可执行文件。在文件开头会有一个检测子程序，这个子程序检测硬件，并解压vmlinuz-linux，然后把kernel放入高地址内存。
子程序如果发现还有initr image(一般就是/boot/initramfs-linux.img)，也会把它放入内存中，用作之后的使用。
在子程序结束之前，会把控制权交给kernel。


**initrd作用**
During the boot of the kernel, the initial-RAM disk (initrd) that was loaded into memory by the stage 2 boot loader is copied into RAM and mounted. This initrd serves as a temporary root file system in RAM and allows the kernel to fully boot without having to mount any physical disks. Since the necessary modules needed to interface with peripherals can be part of the initrd, the kernel can be very small, but still support a large number of possible hardware configurations. After the kernel is booted, the root file system is pivoted (via pivot_root) where the initrd root file system is unmounted and the real root file system is mounted.
即是的kernel具备完全启动各种硬件的能力，我的理解是initrd中装载有一些硬件的各种驱动和模块，在kernel完全启动后，就会释放initrd中的根文件系统，而使用真实硬件中的文件系统。

**initrd(initramfs)创建**
ref: https://wiki.archlinux.org/index.php/Mkinitcpio_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)
mkinitcpio是一个创建出事内存盘的bash脚本，初始内存盘(initramfs)本质上是一个很小的运行环境(早期用户空间)，用于加载一些核心模块，并在init接管启动过程之前做必要的准备。有了这个环境，才能支持加密根文件系统、RAID上的根文件系统等高级功能。mkinitcpio支持自定义的钩子扩展、运行时自动检测以及其他功能。
从前，内核在启动过程早起(挂载分目录和启动init之前)，处理一切硬件的检测和初始化。然而，随着技术的演进，这种做法越来越复杂。
如今，份文件系统可能位于各种硬件上，如SCSI设备、SATA设备、U盘，而这些硬件受控于形形色色的厂家所提供的五花八门的驱动之下。另外，根系统可以加密、压缩，可存放在RAID阵列中，或者一个逻辑卷上。为了简化这个过程，可以把管理权转入一个用户空间：初始化内存盘(initramfs)

initramfs的构建采用mkinitcpio脚本(init ramfs cpio image)，优点有：
- 使用轻量busybox作为早期用户空间
- 支持udev运行时探测硬件，避免加载不需要的模块查 '/etc/inittab' 文件中是否含有 'initdefault' 项。 这告诉 init 系统是否有一个默认运行模式。如果没有默认
- 支持可扩展的init钩子脚本，可以方便的使用pacman软件包安装自定义钩子扩展
- 同时支持传统和LUKS卷上的lvm2、dm-crypt，以及从U盘启动所需的mdadm、swsusp、suspend2.
- 支持通过启动参数配置内核功能，无需重新编译




## GRUB的安装
ref: https://wiki.archlinux.org/index.php/GRUB

- grub-install
```
grub-install --recheck /dev/sda 
```
/dev/sda是被分区的磁盘，而GRUB将会被安装在/dev/sda上。

- gurb.cfg
在磁盘上安装GRUB之后，需要生成grub.cfg配置文件。
配置文件的生成收到/etc/default/grub和/etc/grub.d/中的文件的影响。
每当/etc/default/grub或者/etc/grub.d/文件改变，就需要重新生成grub.cfg文件。
```
grub-mkconfig -o /boot/grub/grub.cfg
```

# 4.init
在kernel启动之后，就会调用用户空间的第一个程序/sbin/init,但是这不是必须的，在/etc/inittab中控制着是否运用改程序管理用户空间的所有进程。



# 5.xwindow

# 6. ...





Stage 2 boot loader
LILO
GRUB(GRand Unified Bootloader)

```
/etc/grub.d
/etc/default/grub
/boot/grub
/boot/grub/grubenv
/boot/grub/grub.cfg.example
/boot/grub/grub.cfg
/usr/lib/grub
/usr/share/icons/breeze-dark/apps/48/grub-customizer.svg
/usr/share/icons/breeze/apps/48/grub-customizer.svg
/usr/share/grub
/usr/share/grub/grub-mkconfig_lib
/usr/share/info/grub.info.gz
/usr/share/info/grub-dev.info.gz
/usr/share/bash-completion/completions/grub
/var/lib/pacman/local/grub-2:2.02-3
```



# vmlinuz-linux
extract-vmlinux位于https://github.com/torvalds/linux/blob/master/scripts/extract-vmlinux
使用方法为:
```查 '/etc/inittab' 文件中是否含有 'initdefault' 项。 这告诉 init 系统是否有一个默认运行模式。如果没有默认
cp /boot/vmlinuz-linux /tmp
cd /tmp
extract-vmlinux vmlinuz-linux > linux
strings linux
```


# initrd.img

# cp initrd.img /tmp/initrd.img.gz
# cd /tmp/ && gzip -d initrd.img.gz
# mount -o loop initrd.img /mnt----2.4内核
# mkdir initrd && cd initrd && cpio -ivmd <../initrd.img


