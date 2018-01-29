
# NetworkManager无法扫描网络

```
[root@ArchLinux-husa ~]# rmmod iwl
iwldvm   iwlwifi  
[root@ArchLinux-husa ~]# rmmod iwlwifi 
rmmod: ERROR: Module iwlwifi is in use by: iwldvm
[root@ArchLinux-husa ~]# rmmod iwldvm 
[root@ArchLinux-husa ~]# modprobe iwldvm 
[root@ArchLinux-husa ~]# 
[root@ArchLinux-husa ~]# 
[root@ArchLinux-husa ~]# 
[root@ArchLinux-husa ~]# systemctl restart NetworkManager

```

```
1月 06 01:51:19 ArchLinux-husa NetworkManager[431]: <info>  [1515174679.7749] Config: added 'key_mgmt' value 'WPA-PSK'
1月 06 01:51:19 ArchLinux-husa NetworkManager[431]: <info>  [1515174679.7749] Config: added 'psk' value '<hidden>'
1月 06 01:51:19 ArchLinux-husa NetworkManager[431]: <info>  [1515174679.7902] device (wlp3s0): supplicant interface state: disabled -> inactive
1月 06 01:51:19 ArchLinux-husa NetworkManager[431]: <info>  [1515174679.8014] device (wlp3s0): supplicant interface state: inactive -> scanning
1月 06 01:51:31 ArchLinux-husa NetworkManager[431]: <info>  [1515174691.3423] device (wlp3s0): supplicant interface state: scanning -> authenticating
1月 06 01:51:31 ArchLinux-husa NetworkManager[431]: <info>  [1515174691.7306] device (wlp3s0): supplicant interface state: authenticating -> disconnected
1月 06 01:51:31 ArchLinux-husa NetworkManager[431]: <info>  [1515174691.8307] device (wlp3s0): supplicant interface state: disconnected -> scanning
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.1278] device (wlp3s0): supplicant interface state: scanning -> authenticating
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.2070] device (wlp3s0): supplicant interface state: authenticating -> associating
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.2668] device (wlp3s0): supplicant interface state: associating -> associated
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.5878] device (wlp3s0): supplicant interface state: associated -> 4-way handshake
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.6299] device (wlp3s0): supplicant interface state: 4-way handshake -> completed
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.6302] device (wlp3s0): Activation: (wifi) Stage 2 of 5 (Device Configure) successful.  Connected to wireless network 'Perry Yu'.
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.6305] device (wlp3s0): state change: config -> ip-config (reason 'none', sys-iface-state: 'managed')
1月 06 01:51:35 ArchLinux-husa NetworkManager[431]: <info>  [1515174695.6314] dhcp4 (wlp3s0): activation: beginning transaction (timeout in 45 seconds)
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6530] dhcp4 (wlp3s0):   address 192.168.31.222
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6531] dhcp4 (wlp3s0):   plen 24
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6531] dhcp4 (wlp3s0):   expires in 43200 seconds
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6531] dhcp4 (wlp3s0):   nameserver '192.168.31.1'
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6531] dhcp4 (wlp3s0):   hostname 'MiWiFi-R3-srv'
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6531] dhcp4 (wlp3s0):   gateway 192.168.31.1
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6549] dhcp4 (wlp3s0): state changed unknown -> bound
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6563] device (wlp3s0): state change: ip-config -> ip-check (reason 'none', sys-iface-state: 'managed')
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6570] device (wlp3s0): state change: ip-check -> secondaries (reason 'none', sys-iface-state: 'managed')
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6573] device (wlp3s0): state change: secondaries -> activated (reason 'none', sys-iface-state: 'managed')
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6575] manager: NetworkManager state is now CONNECTED_LOCAL
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6652] manager: NetworkManager state is now CONNECTED_SITE
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6653] policy: set 'Perry Yu' (wlp3s0) as default for IPv4 routing and DNS
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.6654] dns-mgr: Writing DNS information to /usr/bin/resolvconf
1月 06 01:52:03 ArchLinux-husa NetworkManager[431]: <info>  [1515174723.7652] device (wlp3s0): Activation: successful, device activated.
1月 06 01:52:17 ArchLinux-husa NetworkManager[431]: <info>  [1515174737.9419] manager: NetworkManager state is now CONNECTED_GLOBAL


```


``` error
'
1月 06 01:48:01 ArchLinux-husa NetworkManager[2301]: <info>  [1515174481.8924] Config: added 'psk' value '<hidden>'
1月 06 01:48:05 ArchLinux-husa NetworkManager[2301]: <info>  [1515174485.0292] device (wlp3s0): supplicant interface state: scanning -> authenticating
1月 06 01:48:08 ArchLinux-husa NetworkManager[2301]: <info>  [1515174488.3879] device (wlp3s0): supplicant interface state: authenticating -> disconnected
1月 06 01:48:18 ArchLinux-husa NetworkManager[2301]: <info>  [1515174498.3969] device (wlp3s0): supplicant interface state: disconnected -> scanning
1月 06 01:48:21 ArchLinux-husa NetworkManager[2301]: <info>  [1515174501.6306] device (wlp3s0): supplicant interface state: scanning -> authenticating
1月 06 01:48:24 ArchLinux-husa NetworkManager[2301]: <info>  [1515174504.3377] device (wlp3s0): supplicant interface state: authenticating -> disconnected
1月 06 01:48:26 ArchLinux-husa NetworkManager[2301]: <warn>  [1515174506.9825] device (wlp3s0): Activation: (wifi) association took too long, failing activation
1月 06 01:48:26 ArchLinux-husa NetworkManager[2301]: <info>  [1515174506.9825] device (wlp3s0): state change: config -> failed (reason 'ssid-not-found', sys-iface-state: 'managed')
1月 06 01:48:26 ArchLinux-husa NetworkManager[2301]: <info>  [1515174506.9831] manager: NetworkManager state is now CONNECTED_LOCAL
1月 06 01:48:26 ArchLinux-husa NetworkManager[2301]: <warn>  [1515174506.9847] device (wlp3s0): Activation: failed for connection 'Perry Yu'
1月 06 01:48:26 ArchLinux-husa NetworkManager[2301]: <info>  [1515174506.9859] device (wlp3s0): state change: failed -> disconnected (reason 'none', sys-iface-state: 'managed')
1月 06 01:48:27 ArchLinux-husa NetworkManager[2301]: <info>  [1515174507.0034] device (wlp3s0): set-hw-addr: set MAC address to E2:BB:99:B8:DB:2F (scanning)
1月 06 01:48:27 ArchLinux-husa NetworkManager[2301]: <info>  [1515174507.4179] device (wlp3s0): supplicant interface state: disconnected -> disabled
1月 06 01:48:27 ArchLinux-husa NetworkManager[2301]: <info>  [1515174507.4240] device (wlp3s0): supplicant interface state: disabled -> inactive

```