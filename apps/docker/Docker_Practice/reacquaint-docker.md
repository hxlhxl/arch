虚拟机类型
    Type-I： Hypervisor
    Type-II： VMM(Vmware，VirtualBox，KVM，Zen)

    优点： 独立内核，完全隔离
    缺点： 开销大

容器(LXC LinX Container)
    Linux内核支持下用户空间进程能够获得能力

    Chroot
    Namespaces:
        Mount
        UTS
        PID(Process ID)
        Net(Network)
        IPC(Interprocess Communication)
        UID(User)
        CGroups(Control Groups): cgroups (abbreviated from control groups) is a Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, network, etc.) of a collection of processes.

Docker

![docker arch](https://docs.docker.com/engine/images/architecture.svg)
![docker base](https://i.stack.imgur.com/QVNR6.png)

    LXC -> libcontainer -> runC


registry
    auth
    indexing
    repository 以上相当于github
        repository
            repo(nginx, jwilder/nginx-proxy)
            tag(latest, :2.0)
            以上相当于github上每个用户，每个用户下有各种不同的"应用镜像"



daemon
    就是docker.service

client
    就是docker可执行命令

docker objects
    RESTFUL,这些对象支持CRUD
    images
    container
    network
    volumn
    


CI
    continuous integration(持续继承)
CD
    Continuous Deployment(持续部署)
    Continuous Delivery(持续交付)


device-mapper/overlay2/AUFS
    基于层次构建
    联合挂载，每层都是只读，只有最上层可写
        删除容器，可写层会被丢弃
    bootfs
        rootfs
            nginx
                writable...


Docker Event State
    ![event-state](https://cdn-images-1.medium.com/max/1129/1*vca4e-SjpzSL5H401p4LCg.png)



# 命令

docker pull quay.io/coreos/flannel:v0.10.0-s390x
docker container rm -f 1c9c479e151e
docker container rm -f b1
docker container run --name b1 -it busybox  // 必须指定it否则容器启动后就退出了
docker container start b1
docker container attach b1
docker commit -p b1
docker commit -a "huaxiongcooldocker" -c 'CMD ["/bin/httpd", "-f", "-h", "/data/html"]' -p b2 huaxiongcooldocker/busybox:v0.2


```
docker tag ca57bf851a9d huaxiongcooldocker/busybox:v0.1
```

```
docker push huaxiongcooldocker/busybox:v0.1
docker push registry.cn-aliyuncs.com/huaxiongcooldocker/busybox:v0.1
```

docker container run --name b2 -it  huaxiongcooldocker/busybox:v0.1

```
docker inspect huaxiongcooldocker/busybox:v0.1
docker inspect 217c4cee66d6
```


```
// 后台运行容器,如果为前台则终端会阻塞
root$ docker container run --name b4 -d huaxiongcooldocker/busybox:v0.2
d9c3045fd061ed81f004809913a519f3d7fc84f00596eb03767d279c9e4844d8
```

```
// 删除一系列的镜像
docker container rm d9c3045fd061 217c4cee66d6 f3d784d1e29e dfcba116d796
```


``` 导出
docker save -o busybox:v0.2.gz huaxiongcooldocker/busybox:v0.2
```


``` 导入
docker load -i busybox:v0.2.gz
```




# 网络


## 网络模型

- TCP/IP
应用层[DNS, HTTP, SMTP, TELNET, FTP, ...]
传输层[TCP, UDP]
网络层[ICMP, IP]
网络接口层[ARP, RARP]

- OSI

应用层
表示层
会话层
传输层[TCPSegment]
网络层[IP_package]
数据链路层[EthernetFrame]
物理层


## Iptables

## 网络传输




NAT
    sNAT
    dNAT
Bridge
Tunnel
叠加网络

[Linux网络 - 数据包的发送过程][https://segmentfault.com/a/1190000008926093]
[Linux网络 - 数据包的接收过程][https://segmentfault.com/a/1190000008836467]
[Linux虚拟网络设备之tun/tap][https://segmentfault.com/a/1190000009249039]
[Linux虚拟网络设备之veth][https://segmentfault.com/a/1190000009251098]
[Linux虚拟网络设备之bridge(桥)][https://segmentfault.com/a/1190000009491002]



## Docker网络模型

- Closed Container
```
docker container run --name bb1 -d --network none huaxiongcooldocker/busybox:v0.2
// "IPAddress": ""
```

- Bridged Container
```
docker container run --name bb2 -d --network bridge huaxiongcooldocker/busybox:v0.2
// "IPAddress": "172.17.0.4",
```

### 自定义网桥

1. 使用`docker network create`

```

root$ docker network create -d bridge --subnet "172.26.0.0/16" --gateway "172.26.0.1" docker1 
e15eade3e888d4daad20a1d0613374da346031518c82680f136534bac9890209
[~]
root$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
4d8baf7656f4        bridge              bridge              local
2e14321c21fa        compose_default     bridge              local
e15eade3e888        docker1             bridge              local
c956c9414c14        host                host                local
b0b92728b2a9        my-net              bridge              local
8579fea8d08b        none                null                local
[~]
root$ docker network inspect docker1 
[
    {
        "Name": "docker1",
        "Id": "e15eade3e888d4daad20a1d0613374da346031518c82680f136534bac9890209",
        "Created": "2018-12-13T21:49:55.172506669Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.26.0.0/16",
                    "Gateway": "172.26.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]


root$ docker container run --name bbNet -d --network bridge --net docker1 huaxiongcooldocker/busybox:v0.2
5290eb350398c484f2e0e5bb5a927849f4be3ef9e3cf4ea511320933c1dd6513

root$ docker container exec -it bbNet /bin/sh
/ # ifconfig
eth0      Link encap:Ethernet  HWaddr 02:42:AC:1A:00:02  
          inet addr:172.26.0.2  Bcast:172.26.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:46 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:4492 (4.3 KiB)  TX bytes:0 (0.0 B)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
```

2. 使用ip link

```
root$ vim /etc/docker/daemon.json 
{
        "registry-mirrors": [
                "https://fvrmctxg.mirror.aliyuncs.com"
        ],
        "insecure-registries": ["http://127.0.0.1:60003"],
        "bridge": "br-docker"
}
root$ ip link add name br-docker type bridge
root$ ip addr add 10.0.0.1/8 dev br-docker
[~]
root$ ip link set br-docker up
[~]
root$ ifconfig br-docker
br-docker: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.0.0.1  netmask 255.0.0.0  broadcast 0.0.0.0
        inet6 fe80::545d:10ff:febc:f4d7  prefixlen 64  scopeid 0x20<link>
        ether 56:5d:10:bc:f4:d7  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 99  bytes 7830 (7.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

root$ iptables -t nat -L -n
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
MASQUERADE  all  --  10.0.0.0/8           0.0.0.0/0           
MASQUERADE  all  --  172.26.0.0/16        0.0.0.0/0           
MASQUERADE  all  --  172.18.0.0/16        0.0.0.0/0           
MASQUERADE  all  --  172.19.0.0/16        0.0.0.0/0           

Chain DOCKER (2 references)
target     prot opt source               destination         
RETURN     all  --  0.0.0.0/0            0.0.0.0/0           
RETURN     all  --  0.0.0.0/0            0.0.0.0/0           
RETURN     all  --  0.0.0.0/0            0.0.0.0/0           
RETURN     all  --  0.0.0.0/0            0.0.0.0/0

root$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.16.3.254    0.0.0.0         UG    600    0        0 wlp3s0
10.0.0.0        0.0.0.0         255.0.0.0       U     0      0        0 br-docker
172.16.0.0      0.0.0.0         255.255.252.0   U     600    0        0 wlp3s0
172.16.20.0     0.0.0.0         255.255.252.0   U     0      0        0 veth0.2
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-b0b92728b2a9
172.19.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-2e14321c21fa
172.26.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-e15eade3e888


[~]
root$ docker container run --name br-test -d huaxiongcooldocker/busybox:v0.2
63fcc8e4e6475421310aef8ece2d43e5c27724409300cebac7cf5cf3fafb7f1b


root$ docker container inspect -f {{.NetworkSettings.IPAddress}} br-test
10.0.0.2

root$ curl 10.0.0.2
<h1>index.html from busybox</h1>

```



- Joined Container
```
docker container run --name bb3x -it --network bridge busybox
docker container run --name bb3a -d --network container:bb3x huaxiongcooldocker/busybox:v0.2
docker container run --name bb3b -d --network container:bb3x huaxiongcooldocker/busybox:v0.2

root$ docker container run --name bb3x -it  --network bridge busybox
/ # netstat -ntl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       
tcp        0      0 :::80                   :::*                    LISTEN
/ # ifconfig
eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:06  
          inet addr:172.17.0.6  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:43 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:4018 (3.9 KiB)  TX bytes:0 (0.0 B)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)




root$ docker container exec -ti bb3a /bin/sh
/ # ifconfig
eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:06  
          inet addr:172.17.0.6  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:47 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:4730 (4.6 KiB)  TX bytes:0 (0.0 B)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

```

- Open Container

```
docker container run --name bb4 -d --network host huaxiongcooldocker/busybox:v0.2
root$ docker container run --name bb4 -d --network host huaxiongcooldocker/busybox:v0.2
b802fec6cd8ed455e655d9f33f6d66754e49c84a2f4607afd3bf6d3e0b428401
root$ curl localhost:80
<h1>index.html from busybox</h1>
```



## daemon.json

- docker0

```
{
        "registry-mirrors": [
                "https://fvrmctxg.mirror.aliyuncs.com"
        ],
        "insecure-registries": ["http://127.0.0.1:60003"],
        "bip": "16.0.0.1/16",
        "dns": ["114.114.114.114", "8.8.8.8", "4.4.4.4"]
}
```

- protocol

```
{
        "registry-mirrors": [
                "https://fvrmctxg.mirror.aliyuncs.com"
        ],
        "insecure-registries": ["http://127.0.0.1:60003"],
        "hosts": ["tcp://0.0.0.0:2375", "unix://var/run/docker.sock"]
}

docker -host x.x.x.x:2375 image ls
```

- 

## iproute2

```
ip netns add r1
ip netns add r2
ip netns exec r1 ifconfig -a
```


```
ip link add 
ip link add name veth0.1 type veth peer name veth0.2
ip link set dev veth0.1 netns r1
ip netns exec r1 ifconfig -a
ip netns exec r1 ip link set dev veth0.1 name eth0
ip netns exec r1 ifconfig -a
ip addr add 172.16.20.101/22 dev veth0.2
ip link set dev veth0.2 up
ip netns exec r1 ip addr add 172.16.20.102/22 dev eth0
ip netns exec r1 ip link set dev eth0 up
```

```
root$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.16.3.254    0.0.0.0         UG    600    0        0 wlp3s0
172.16.0.0      0.0.0.0         255.255.252.0   U     600    0        0 wlp3s0
172.16.20.0     0.0.0.0         255.255.252.0   U     0      0        0 veth0.2
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-b0b92728b2a9
172.19.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-2e14321c21fa
```


## 服务暴露


```
root$ docker container run --name bbWeb -d --network bridge -p 80 huaxiongcooldocker/busybox:v0.2
// 宿主机32768端口映射到Docker容器, -p选项自动生成
root$ iptables -t nat -nvL
Chain PREROUTING (policy ACCEPT 247 packets, 87701 bytes)
 pkts bytes target     prot opt in     out     source               destination         
  646  323K DOCKER     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT 12 packets, 5604 bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain OUTPUT (policy ACCEPT 123 packets, 7801 bytes)
 pkts bytes target     prot opt in     out     source               destination         
   13  1092 DOCKER     all  --  *      *       0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT 123 packets, 7801 bytes)
 pkts bytes target     prot opt in     out     source               destination         
   17  1136 MASQUERADE  all  --  *      !docker0  172.17.0.0/16        0.0.0.0/0           
    0     0 MASQUERADE  all  --  *      !br-b0b92728b2a9  172.18.0.0/16        0.0.0.0/0           
    0     0 MASQUERADE  all  --  *      !br-2e14321c21fa  172.19.0.0/16        0.0.0.0/0           
    0     0 MASQUERADE  tcp  --  *      *       172.17.0.5           172.17.0.5           tcp dpt:80

Chain DOCKER (2 references)
 pkts bytes target     prot opt in     out     source               destination         
    0     0 RETURN     all  --  docker0 *       0.0.0.0/0            0.0.0.0/0           
    0     0 RETURN     all  --  br-b0b92728b2a9 *       0.0.0.0/0            0.0.0.0/0           
    0     0 RETURN     all  --  br-2e14321c21fa *       0.0.0.0/0            0.0.0.0/0           
    0     0 DNAT       tcp  --  !docker0 *       0.0.0.0/0            0.0.0.0/0            tcp dpt:32768 to:172.17.0.5:80

root$ docker port bbWeb 
80/tcp -> 0.0.0.0:32769

```

指定端口暴露
```
docker container run --name bbWeb -d --network bridge -p 9090:80 huaxiongcooldocker/busybox:v0.2
```

多次暴露
```
docker container run --name bbWeb -d --network bridge -p 9090:80 -p 9091:81 huaxiongcooldocker/busybox:v0.2
```










# 数据卷
问题： 容器删除，可写层数据丢失
解决方案：数据卷
    显示指定宿主机和容器绑定关系
    Docker自身管理绑定关系，可以通过inspect查看Mounts.Source, Mounts.Destination, 一般位于`/var/lib/docker/volumes/7e857e7e1d9aa7162f1e11e843d78aaf51ab970b96b905368d3a7d161067fb95/_data`




```
root$ docker container run --name vol_b1 --volume /data/web:/data/httpd/web -d huaxiongcooldocker/busybox:v0.2
70122bfef43540feea363a987635323ed7d6eeb462d8b44a7cf52c6a2dabb6c0

root$ mkdir /data/web -pv 
mkdir: created directory '/data'
mkdir: created directory '/data/web'
[~]
root$ echo "hello container" > /data/web/index.html
root$ docker container exec -it vol_b1 /bin/sh
/ # cat /data/httpd/web/index.html 
hello container
/ # echo "hello host" >> /data/httpd/web/index.html 
root$ cat /data/web/index.html 
hello container
hello host
```


```
root$ docker container run --name vol_b2 --volume /data/httpd/web -d huaxiongcooldocker/busybox:v0.2
root$ docker inspect  vol_b2

"Mounts": [
            {
                "Type": "volume",
                "Name": "7e857e7e1d9aa7162f1e11e843d78aaf51ab970b96b905368d3a7d161067fb95",
                "Source": "/var/lib/docker/volumes/7e857e7e1d9aa7162f1e11e843d78aaf51ab970b96b905368d3a7d161067fb95/_data",
                "Destination": "/data/httpd/web",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],

```



**可以提供一个基础容器，其和Host绑定数据卷，其他容器基于此容器的数据卷构建**

```
--volumes-from
```



# Dockerfile


# Private-registry

harbor

- 项目
    相当于docker hub上的用户名，项目下可以有很多repository
- registry
- replicatoin
    可以把一个项目下的所有仓库复制到另外一个registry中去
```
docker tag huaxiongcooldocker/busybox:v0.2 harbor.archdev.com:60005/busybox/busybox:v0.1
docker login harbor.archdev.com:60005
docker push harbor.archdev.com:60005/busybox/busybox:v0.1
```
# Docker-compose
在Docker Swarm资源编排
# Docker-machine
快速初始化Docker Host，并加入Docker Swarm资源池
# Docker-swarm
Docker Host层的抽象


# Docker Resource Limit

docker container run可使用以下选项：

```
// memory
docker run --name stress -it --rm -m 256m lorel/docker-stress-ng:latest stress --vm 2
docker top stress
// cpu
docker run --name stress -it --rm -cpus 2 lorel/docker-stress-ng:latest stress --cpu 8
```

## Memory

```
-m/ --memory=
--memory-swap
--memory-swappiness
--memory-reservation
--kernel-memory
--oom-kill-disable
```


## CPU

```
--cpus(数量)
--cpuset-cpus(范围)
--cpu-shares

--cpu-quota
```
## Block IO




# Mesos

## marathon


# Kubernetes

