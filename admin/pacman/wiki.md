1. 存储pacman缓存的地方在哪里?
/var/cache/pacman/pkg

2. 更新秘钥环
sudo pacman -S archlinux-keyring

3. [multilib](https://wiki.archlinux.org/index.php/Multilib_(简体中文))

MultiLib可以让64位的ArchLinux运行32位程序

4. 列出所有安装的package

pacman -Qe 

5. 列出非Pacman安装的package
pacman -Qqm lists foreign packages; which, for must users, means AUR
pacman -Qqe lists packages that were explicitely installed. 


6. python-pyqt5: 文件系统中已存在 /usr/lib/python3.7/site-packages/PyQt5/__pycache__/__init__.cpython-37.pyc

处理方案： https://wiki.archlinux.org/index.php/Pacman#I_get_an_error_when_updating:_.22file_exists_in_filesystem.22.21

```
pacman -Qo /usr/lib/python3.7/site-packages/PyQt5/__pycache__/__init__.cpython-37.pyc
mv /usr/lib/python3.7/site-packages/PyQt5/__pycache__/__init__.cpython-37.pyc /wait2rm/
pacman -Syuu
```