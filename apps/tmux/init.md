# 手动安装

```
wget https://github.com/libevent/libevent/releases/download/release-2.1.8-stable/libevent-2.1.8-stable.tar.gz
tar xvf libevent-2.1.8-stable.tar.gz
cd libevent-2.1.8-stable
./configure --prefix=/usr/local
make
make install

 yum install ncurses-devel -y

curl -OL https://github.com/tmux/tmux/releases/download/2.3/tmux-2.3.tar.gz
tar -xf tmux-2.3.tar.gz
cd tmux-2.3
LDFLAGS="-L/usr/local/lib -Wl,-rpath=/usr/local/lib" ./configure --prefix=/usr/local
make
make install


[root@host tmux-2.3]# ldd tmux
        linux-vdso.so.1 =>  (0x00007ffeb4fe1000)
        libutil.so.1 => /lib64/libutil.so.1 (0x00007f269dc76000)
        libncurses.so.5 => /lib64/libncurses.so.5 (0x00007f269da54000)
        libevent-2.1.so.6 => not found
        librt.so.1 => /lib64/librt.so.1 (0x00007f269d84b000)
        libresolv.so.2 => /lib64/libresolv.so.2 (0x00007f269d631000)
        libc.so.6 => /lib64/libc.so.6 (0x00007f269d29c000)
        libtinfo.so.5 => /lib64/libtinfo.so.5 (0x00007f269d07b000)
        libdl.so.2 => /lib64/libdl.so.2 (0x00007f269ce77000)
        libpthread.so.0 => /lib64/libpthread.so.0 (0x00007f269cc59000)
        /lib64/ld-linux-x86-64.so.2 (0x0000559c5e4c6000)

[root@host tmux-2.3]# find /usr/local -name "*libevent-2.1.so*"
/usr/local/lib/libevent-2.1.so.6.0.2
/usr/local/lib/libevent-2.1.so.6

[root@host tmux-2.3]# ln -s /usr/local/lib/libevent-2.1.so.6 /usr/lib64/libevent-2.1.so.6

tmux works!
```
