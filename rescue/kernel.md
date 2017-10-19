# 内核模块
列出所有已经加载的内核模块
```
lsmod
# 本质上就是/proc/modules文件
```
# 动态加载模块
目前采用udev按需加载模块，所以一般情况下是没有必要在配置文件中制定不需要加载的模块的。
但是在某些情况下，需要开启或者禁止某种模块的加载，此时可以通过配置文件的方式制定模块加载规则。

# 黑名单
黑名单是阻止模块加载的一种机制，比如有两个内核模块试图视图同时控制一个硬件，这样可能就会有冲突。
有一些模块是在initramfs中加载的，
使用mkinitcpio -M可以查看所有自动检测到的模块，使用/etc/modprobe.d/modprobe.conf文件可以阻止一些模块的加载。
使用mkinitcpio -v可以查看所有钩子使用到的模块

## 创建黑名单
```
# 配置黑名单
echo "blacklist btusb" >> /etc/modprobe.d/blacklist.conf
# copy files and set attributes
# install命令可以让modprobe命令对指定模块执行指定命令
install btusb /bin/false
```


## 配置内核参数
可以在GRUB(LILO，syslinux)中使用kernel parameter禁用某些模块。
1. 在Linux启动的时候配置内核参数
```
linux   /vmlinuz-linux root=UUID=6a65c447-57ce-4412-a1c9-91e797e50a89 rw  quiet
```

2. 通过配置文件生成/boot/grub.conf文件
```
# 修改这一行 GRUB_CMDLINE_LINUX_DEFAULT="quiet"，比如加一个splash
~$ vim /etc/default/grub
~$ grub-mkconfig -o /boot/grub/grub.cfg
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-linux
Found initrd image(s) in /boot: initramfs-linux.img
Found fallback initrd image(s) in /boot: initramfs-linux-fallback.img
Found Windows 10 on /dev/sda1
done
```
