1. 存储pacman缓存的地方在哪里?
/var/cache/pacman/pkg

2. 更新秘钥环
sudo pacman -S archlinux-keyring

3. [multilib](https://wiki.archlinux.org/index.php/Multilib_(简体中文))

MultiLib可以让64位的ArchLinux运行32位程序

4. 列出所有安装的package

pacman -Qe 


