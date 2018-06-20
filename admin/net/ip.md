# ArchLinux设置静态IP

```
[root@osboxes ~]# cd /etc/netctl/

[root@osboxes netctl]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:0c:29:b1:fc:8e brd ff:ff:ff:ff:ff:ff
    inet 192.168.145.132/24 brd 192.168.145.255 scope global noprefixroute ens33
       valid_lft forever preferred_lft forever
    inet6 fe80::95ae:3e84:8b5b:4cc/64 scope link 
       valid_lft forever preferred_lft forever

[root@osboxes netctl]# cp examples/ethernet-static ens33

[root@osboxes netctl]# cat ens33 
Description='A basic static ethernet connection'
Interface=ens33
Connection=ethernet
IP=static
Address=('192.168.145.132/24')
#Routes=('192.168.145.2/24 via 192.168.145.132')    容易出现问题，最好注释掉
Gateway='192.168.145.2'
DNS=('192.168.145.2')

## For IPv6 autoconfiguration
#IP6=stateless

## For IPv6 static address configuration
#IP6=static
#Address6=('1234:5678:9abc:def::1/64' '1234:3456::123/96')
#Routes6=('abcd::1234')
#Gateway6='1234:0:123::abcd'


[root@osboxes netctl]# netctl enable ens33
ln -s '/etc/systemd/system/netctl@ens33.service' '/etc/systemd/system/multi-user.target.wants/netctl@ens33.service'

```