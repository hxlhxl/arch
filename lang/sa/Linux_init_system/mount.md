ref: https://unix.stackexchange.com/questions/9944/how-does-a-kernel-mount-the-root-partition

挂载

/etc/fstab
是系统启动时将要挂载的文件系统,由用户创建
```
[husa@ArchLinux-husa bin]$ cat /etc/fstab
# /dev/sda4
UUID=6a65c447-57ce-4412-a1c9-91e797e50a89       /               ext4            rw,relatime,data=ordered        0 1

# /dev/sda3
UUID=a225210f-06e7-4ed5-972c-dc102e1f7e25       /boot           ext4            rw,relatime,data=ordered        0 2
查 '/etc/inittab' 文件中是否含有 'initdefault' 项。 这告诉 init 系统是否有一个默认运行模式。如果没有默认
# /dev/sdb2
UUID=e6fef659-8433-429d-9db3-1b292335b7a5       /home           ext4            rw,relatime,data=ordered        0 3
```

/etc/mtab
当前时刻系统已经挂载的文件系统信息，只有挂载后的磁盘才会出现在这个文件中。由系统自动创建。
```
[husa@ArchLinux-husa bin]$ head /etc/mtab 
proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0
sys /sys sysfs rw,nosuid,nodev,noexec,relatime 0 0
dev /dev devtmpfs rw,nosuid,relatime,size=3930776k,nr_inodes=982694,mode=755 0 0
```



Linux initially boots with a ramdisk (called an initrd, for "INITial RamDisk") as /. This disk has just enough on it to be able to find the real root partition (including any driver and filesystem modules required). It mounts the root partition onto a temporary mount point on the initrd, then invokes pivot_root(8) to swap the root and temporary mount points, leaving the initrd in a position to be umounted and the actual root filesystem on /.

kernel激活阶段，就已经执行了根文件系统的挂载。
而之后的挂载可以在init阶段完成，/etc/fstab中定义了如何挂载文件系统，这也是为什么安装的时候要定义一些挂载文件的东西了。


In ancient times, the kernel was hard coded to know the device major/minor number of the root fs and mounted that device after initializing all device drivers, which were built into the kernel. The rdev utility could be used to modify the root device number in the kernel image without having to recompile it.

Eventually boot loaders came along and could pass a command line to the kernel. If the root= argument was passed, that told the kernel where the root fs was instead of the built in value. The drivers needed to access that still had to be built into the kernel. While the argument looks like a normal device node in the /dev directory, there obviously is no /dev directory before the root fs is mounted, so the kernel can not look up a dev node there. Instead, certain well known device names are hard coded into the kernel so the string can be translated to the device number. Because of this, the kernel can recognize things like /dev/sda1, but not more exotic things like /dev/mapper/vg0-root or a volume UUID.

Later, the initrd came into the picture. Along with the kernel, the boot loader would load the initrd image, which was some kind of compressed filesystem image (gzipped ext2 image, gzipped romfs image, squashfs finally became dominant). The kernel would decompress this image into a ramdisk and mount the ramdisk as the root fs. This image contained some additional drivers and boot scripts instead of a real init. These boot scripts performed various tasks to recognize hardware, activate things like raid arrays and LVM, detect UUIDs, and parse the kernel command line to find the real root, which could now be specified by UUID, volume label and other advanced things. It then mounted the real root fs in /initrd, then executed the pivot_root system call to have the kernel swap / and /initrd, then exec /sbin/init on the real root, which would then unmount /initrd and free the ramdisk.

Finally, today we have the initramfs. This is similar to the initrd, but instead of being a compressed filesystem image that is loaded into a ramdisk, it is a compressed cpio archive. A tmpfs is mounted as the root, and the archive is extracted there. Instead of using pivot_root, which was regarded as a dirty hack, the initramfs boot scripts mount the real root in /root, delete all files in the tmpfs root, then chroot into /root, and exec /sbin/init.



