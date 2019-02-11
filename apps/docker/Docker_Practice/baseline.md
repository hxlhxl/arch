# Docker简介

- 使用Go语言编写
- 基于Linux的`cgroup`, `namespace`和`UnionFS`
- 进程隔离，操作系统层面的虚拟化技术
- lxc -> libcontainer -> runC,contianrd
- docker无内核，运行于宿主的kernel上
- docker无硬件虚拟化

## Docker的优势

- 压榨系统资源
- 快速启动时间
- 开发环境一致
- CI/CD
- DevOps
- 维护成本

# 基本概念

## 镜像(Image)

- 分层
- 
- 

## 容器(Container)

- Image和Container的关系，就和Class和Instance的关系一样的。
- 容器是一个进程
- 容器是一个拥有独立namespace
- 容器可以拥有自己的root文件系统、网络配置、进程空间、用户ID空间。
- 容器分层存储： 容器运行在镜像之上,镜像之上的一层为容器存储层
- 容器存储层的生命周期和容器一样，容器消亡时，存储于容器存储层的数据也会消失
- 容器不应该向容器存储层内写入任何数据，应该使用数据卷`Volumn`或者绑定`宿主目录`
- `数据卷`生命周期独立于容器，容器消亡，`数据卷`不会消亡


## 仓库(Repository)
和`Yum Repository`,`Npm Repository`这种东西差不多，就是把镜像、库放到服务器上，分布式的客户端可以拉取这些服务。
`Docker Registry`就是提供Docker镜像的服务。
`Docker Registry`中有各种仓库`Repository`，仓库就是同一种软件的集合，而`Docker Hub`中会有用户角色的存在，所以一般仓库的名称有两段，比如`jwilder/nginx-proxy`
`Repository`下的软件会有不同的版本，在`Docker Registry`中，版本是通过`tag`管理的，默认是`latest`版本
处了`Docker Hub`官方`Registry`之外，用户也可以自己搭建，官方提供了`Docker Registry`作为基础`Registry`服务；用户也可以使用第三方实现了`Docker Registry API`接口的Registry服务，比如`VMWare Harbor`,`Sonatype Nexus`。



# 安装Docker

## ArchLinux

```
[husa@archlinux ~]$ sudo pacman -S docker
[husa@archlinux ~]$ sudo groupmems -g docker -a husa
[husa@archlinux ~]$ sudo usermod -aG docker $USER
[husa@archlinux ~]$ sudo groupmems -g docker -l
husa
[husa@archlinux ~]$ logout
[husa@archlinux ~]$ re-ssh-login
[husa@archlinux ~]$ docker run hello-world

[husa@archlinux ~]$ docker run hello-world


Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/

[husa@archlinux ~]$ logout  # 阿里云镜像加速器
# docker默认在/etc/docker/daemon.json
    {
        "registry-mirrors": [
                "https://fvrmctxg.mirror.aliyuncs.com"
        ]
    }

[husa@archlinux ~]$ sudo systemctl restart docker.service
```



# 使用镜像

## docker pull

```
[husa@archlinux ~]$ docker pull fvrmctxg.mirror.aliyuncs.com/library/ubuntu:latest

[husa@archlinux ~]$ docker pull --help

Usage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]

Pull an image or a repository from a registry

Options:
  -a, --all-tags                Download all tagged images in the repository
      --disable-content-trust   Skip image verification (default true)

```

## docker image

- docker image ls
- docker image ls -a    查看所有镜像(包含中间层)
- docker image ls --digests
- docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
- docker image ls -f dangling=true
    虚悬镜像(`dangling image`)
- docker image prune
    删除无用镜像(Remove ununsed images)
- docker image rm
```
[husa@archlinux ~]$ docker image ls -a --digests
REPOSITORY                                    TAG                 DIGEST                                                                    IMAGE ID            CREATED             SIZE
hello-world                                   latest              sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc   2cb0d9787c4d        43 hours ago        1.85kB
ubuntu                                        latest              sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d   113a43faa138        5 weeks ago         81.1MB
fvrmctxg.mirror.aliyuncs.com/library/ubuntu   latest              sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d   113a43faa138        5 weeks ago         81.1MB
[husa@archlinux ~]$ docker image rm ubuntu@sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d
Untagged: ubuntu@sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d

[husa@archlinux ~]$ docker  rmi -f 2cb0d9787c4d
Untagged: hello-world:latest
Untagged: hello-world@sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc
Deleted: sha256:2cb0d9787c4dd17ef9eb03e512923bc4db10add190d3f84af63b744e353a9b34
```
    Untagged: 删除标签
    Deleted: 删除镜像，当一个镜像的所有标签都是Untagged，那么就会触发Delete操作，删除这个镜像


## docker tag
Usage: docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE

## docker system

- docker system df


## docker exec
Usage: docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
Run a command in a running container

Options:
    
    -i: interactive,Keep STDIN open even if not attached
    -t: Allocate a pesudo-TTY

```
[root@osboxes ~]# docker run --name webserver -d -p 80:80 nginx
[root@osboxes ~]# curl 192.168.145.132:80
[root@osboxes ~]# docker exec -it webserver bash
root@39695edfe799:/# echo '<h1>Hello,Docker!</h1>' > /usr/share/nginx/html/index.html

[root@osboxes ~]# curl 192.168.145.132:80
<h1>Hello,Docker!</h1>


```
## docker diff
Usage: docker diff CONTAINER
Inspect changes to files or directories on a container's filesystem


## docker commit

Usage:  docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
Caution: docker commit会发生额外的操作，不利于制作image，应该使用`Dockerfile`制作image
Create a new image from a container's changes


```
[root@osboxes ~]# docker run --name webserver -d -p 80:80 nginx
39695edfe799a2e34434fcd9e5478160b6407464951d7a839c53bdf6e5f89174
[root@osboxes ~]# docker exec -it webserver bash
root@39695edfe799:/# echo '<h1>Hello,Docker!</h1>' > /usr/share/nginx/html/index.html

[root@osboxes ~]# docker diff webserver
C /usr
C /usr/share
C /usr/share/nginx
C /usr/share/nginx/html
C /usr/share/nginx/html/index.html
C /run
A /run/nginx.pid
C /var
C /var/cache
C /var/cache/nginx
A /var/cache/nginx/client_temp
A /var/cache/nginx/fastcgi_temp
A /var/cache/nginx/proxy_temp
A /var/cache/nginx/scgi_temp
A /var/cache/nginx/uwsgi_temp

[root@osboxes ~]# docker commit --author "huax01 huaxiongcool@gmail.com" --message "custom inex.htm
l" webserver nginx:v2
sha256:cfbf1418c1bdc3f3c6c7f10423a3f203a8a52315c2311fd4a51b366e24ef21c9


[root@osboxes ~]# docker image ls nginx
REPOSITORY          TAG                 IMAGE ID            CREATED                  SIZE
nginx               latest              3c5a05123222        Less than a second ago   109MB
nginx               v2                  cfbf1418c1bd        42 seconds ago           109MB

[root@osboxes ~]# docker history nginx:v2
IMAGE               CREATED                  CREATED BY                                      SIZE                COMMENT
cfbf1418c1bd        About a minute ago       nginx -g daemon off;                            165B                custom inex.html


[root@osboxes ~]# docker run --name webserver2 -d -p 81:80 nginx:v2
da7f6f297a7558de4ea55fcaf03096ee0b7a464ab646d8eec322aa5fdc12bd20

[root@osboxes ~]# curl 192.168.145.132:81
<h1>Hello,Docker!</h1>

```

## docker history
Show the history of an image

- docker history -H ubuntu


## docker build

Usage:  docker build [OPTIONS] PATH | URL | -

Build an image from a Dockerfile

### 指令

- FROM
- RUN： 容器构建期间运行指定的命令
- COPY: 从context复制文件到引擎
     COPY <源路径>...<目标路径>
     COPY ["<源路径1>",..."<目标路径>"]
- ADD： 非最佳实践，仅用于自动解压场合
- CMD： 用于指定默认的容器主进程的启动命令
    docker中运行的是进程，其中的进程不需要使用进程管理器去管理，而直接使用命令最好
    CMD <命令>
    CMD ["可执行文件", "参数1", "参数2", ...]

    ```
    CMD ["nginx", "-g", "daemon off;"]
    ```
- ENTRYPOINT: CMD整体作为命令，docker客户端命令行参数作为该命令的参数
    ch04.project03
- ENV: 设置环境变量，构建和容器运行时都可以直接使用
    容器运行时是在默认的bash中可以使用，传递的运行参数是不会读取这些环境变量的。
    ch04.project04
- ARG: 设置环境变量，仅在构建时生效。build的时候用户可以传递参数来覆盖环境变量的默认值
    --build-arg
- VOLUME: 防止运行时用户忘记将动态文件所保存目录挂载为卷，在Dockerfile中，可以事先指定某些目录挂载为匿名卷，这样在运行时如果用户不指定挂载，其应用也可以正常运行，不会向容器层写入大量数据。
    命令行可以覆盖Dockerfile中的VOLUME指令
    -v list
    --volume list
    ```docker run -d -v mydata:/data DOCKER_IMAGE```
        表示使用`mydata`这个命名卷挂载到`/data/`路径，替代Dockerfile中的匿名卷挂载配置
- EXPOSE <端口1> [<端口2>,,,]: 声明容器运行时提供的服务端口，不过只是声明，不会再容器运行时真正起作用。
    -- docker run -P DOCKER_IMAGE: 把Dockerfile中的EXPORT声明的端口作为容器的服务端口，而宿主机端口随机
    -- docker run -p <宿主端口>:<容器端口> DOCKER_IMAGE: 
- WORKDIR: 指定各层容器的工作空间，可以多次声明覆盖
    ``` 正确的写法
        WORKDIR /app
        RUN echo "hello" > /app/world.txt
    ```
- USER <用户名>: 改变之后的容器指令CMD、RUN、ENTRYPOINT等的执行用户身份,在执行USER指令的时候，必须事先创建用户
- HEALTHCHECK: 健康检查... ch04.project06
- ONBUILD <其他指令>>: 提供一个基础镜像，在构建当前镜像时并不会执行，只有作为下一级镜像构建的时候才会执行。 ch04.project07

### 镜像构建上下文(Image build context)

Docker build的原理： Docker在运行时分为`Docker引擎`（服务端守护进程）和客户端进程。Docker引擎提供了一组RESTFUL API，被称为`Docker Remote API`，而`docker`命令是客户端工具，它通过这组`Docker Remote API`和`Docker引擎`交互通信，从而完成各种功能。而`docker build`实际上是在`Docker引擎`上构建的。
而上下文就是引擎拿去本地文件的环境。

### example

1. 最简单的Linux定制(ch04.project01)
2. 



## docker run
Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
Under_the_hood: 
1. 检查本地是否存在指定的镜像，不存在就从共有仓库下载
2. 利用镜像创建并启动一个容器
3. 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
4. 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
5. 从地址池配置一个IP地址给容器
6. 执行用户指定的应用程序
7. 指向性完毕后容器被终止(stopped)

Run a command in a new container


```
[root@archlinux project02]# docker rm 6248
6248
[root@archlinux project02]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS                NAMES
9b2016c60fc6        nginx:v3            "nginx -g 'daemon of…"   32 hours ago        Up 32 hours             0.0.0.0:80->80/tcp   haha
9ef51b99f2b7        nginx:v3            "-d -p 80:80"            32 hours ago        Created                 80/tcp               fervent_hypatia
a84a7ee507eb        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        determined_keldysh
afc6452861a1        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        distracted_nobel
[root@archlinux project02]# docker run --name hehe -d -p 81:80 nginx:v4
d3a7b351736109be3659dbcb78a620b5faa82cab1fafbcee543f027f2129e534
[root@archlinux project02]#
[root@archlinux project02]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS                NAMES
d3a7b3517361        nginx:v4            "nginx -g 'daemon of…"   6 seconds ago       Up 3 seconds            0.0.0.0:81->80/tcp   hehe
9b2016c60fc6        nginx:v3            "nginx -g 'daemon of…"   32 hours ago        Up 32 hours             0.0.0.0:80->80/tcp   haha
9ef51b99f2b7        nginx:v3            "-d -p 80:80"            32 hours ago        Created                 80/tcp               fervent_hypatia
a84a7ee507eb        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        determined_keldysh
afc6452861a1        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        distracted_nobel
[root@archlinux project02]# curl localhost:81
<h1>Hello,Docker!</h1>

```




## docker ps

Usage:  docker ps [OPTIONS]

List containers

Options:
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display numeric IDs
  -s, --size            Display total file sizes

## docker container
Manage container

Usage: docker container COMMAND

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  inspect     Display detailed information on one or more containers
  kill        Kill one or more running containers
  logs        Fetch the logs of a container
  ls          List containers
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  prune       Remove all stopped containers
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  run         Run a command in a new container
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

## docker kill


Usage:  docker kill [OPTIONS] CONTAINER [CONTAINER...]

Kill one or more running containers

Options:
  -s, --signal string   Signal to send to the container (default "KILL")


## docker rm


Usage:  docker rm [OPTIONS] CONTAINER [CONTAINER...]

Remove one or more containers

Options:
  -f, --force     Force the removal of a running container (uses SIGKILL)
  -l, --link      Remove the specified link
  -v, --volumes   Remove the volumes associated with the container



## docker login

```
[root@archlinux project03]# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: huaxiongcooldocker
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

```


## docker port

Usage:  docker port CONTAINER [PRIVATE_PORT[/PROTO]]

List port mappings or a specific mapping for the container

```
[root@archlinux webapp]# docker port webapp
5000/tcp -> 0.0.0.0:32782

```

## docker logs

Usage:  docker logs [OPTIONS] CONTAINER

Fetch the logs of a container

Options:
      --details        Show extra details provided to logs
  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)
      --tail string    Number of lines to show from the end of the logs (default "all")
  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)

```
[root@archlinux webapp]# docker logs -f webapp
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)

^C
```




## docker network
Usage:  docker network COMMAND

Manage networks

Commands:
  connect     Connect a container to a network
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or more networks
  ls          List networks
  prune       Remove all unused networks
  rm          Remove one or more networks













# Sonatype/nexus

```
# 搭建Nexus3
[root@archlinux ~]# docker run -d -p 60001:8081 -p 60002:60002 --name nexus3 --restart=always --mount src=nexus-data,target=/nexus-data sonatype/nexus3
Unable to find image 'sonatype/nexus3:latest' locally
latest: Pulling from sonatype/nexus3
7dc0dca2b151: Pull complete
68f6b3431de1: Pull complete
3d53a2c6a5ef: Pull complete
Digest: sha256:e57d22b59b607d055f9241f1613073ec1b46c37afae30d67707072f19a87d244
Status: Downloaded newer image for sonatype/nexus3:latest
ac7dc1aec2faad7ff43a7aad785795c471f08de888458815f0899b8127c99b6f

# 创建dockerhub，略

# 搭建dockerhub的本地Nginx反向代理
[root@archlinux ~]# cat /etc/nginx/conf.d/dockerhub.conf
upstream register {
    server 127.0.0.1:60002;
    # check interval=3000 rise=2 fall=10 timeout=1000 type=http;
    #check_http_send "HEAD / HTTP/1.0/\r\n\r\n";
    #check_http_expect_alive http_4xx;
}


server {
    server_name _ 127.0.0.1;
    listen 60003;
    #listen 443 ssl;
    #
    #ssl_certificate key/example.crt;
    #ssl_certificate_key key/example.key;

    #ssl_session_timeout 5m;
    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_ciphers HIGH: !aNULL: !MD5;
    #ssl_prefer_server_ciphers on;

    large_client_header_buffers 4 32k;
    client_max_body_size 300m;
    client_body_buffer_size 512k;

    proxy_connect_timeout 600;
    proxy_read_timeout 600;
    proxy_send_timeout 600;
    proxy_buffer_size 128k;
    proxy_buffers 4 64k;
    proxy_busy_buffers_size 128k;
    proxy_temp_file_write_size 512k;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header Upgrade $http_upgrade;
        #proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_redirect off;
        proxy_pass http://register;
        proxy_read_timeout 900s;
        proxy_http_version 1.1;

    }

    error_page 500 502 503 504  /50x.html;
}

# docker daemon.json
[root@archlinux ~]# cat /etc/docker/daemon.json
{
        "registry-mirrors": [
                "https://fvrmctxg.mirror.aliyuncs.com"
        ],
        "insecure-registries": ["http://127.0.0.1:60003"]
}

# 登录
[root@archlinux ~]# docker login http://127.0.0.1:60003/repository/archhub
Username: huaxiongcooldocker
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

# 提交自制镜像
[root@archlinux ~]# docker tag ubuntu 127.0.0.1:60003/nexus_ubuntu
[root@archlinux ~]# docker push 127.0.0.1:60003/nexus_ubuntu
The push refers to repository [127.0.0.1:60003/nexus_ubuntu]
b6f13d447e00: Pushed
a20a262b87bd: Pushed
904d60939c36: Pushed
3a89e0d8654e: Pushed
db9476e6d963: Pushed
latest: digest: sha256:e7def0d56013d50204d73bb588d99e0baa7d69ea1bc1157549b898eb67287612 size: 1357
```



# 数据管理


`数据卷`是一个可供一个或多个容器使用的特殊目录，它绕过UFS，可以提供很多有用的特性：
- `数据卷`可以在容器之间共享和重用
- 对`数据卷`的修改会立马生效
- 对`数据卷`的更新，不会影响镜像
- `数据卷`默认会一直存在，即使容器被删除

注意点： 刚开始我还没理解什么是挂载，现在我稍微理解了一点。就是docker在启动容器的时候，会把`数据卷`或者`宿主目录`挂载进入容器中(这里我理解就是容器中映射的那个目录，物理上就是写入在宿主机上，要么是自定义目录，要么是/var/lib/docker/volumes/VOLUME_NAME/_data)，所以，如果映射到的目录在容器中本身已经存在，那么容器就有可能无法正常运行。比如下面这个命令：`docker run -d -P --name webapp --mount type=bind,source=/tmp/webapp,target=/opt/webapp training/webapp`。`training/webapp`这个容器的运行本身就需要使用到路径`/opt/webapp`下的`app.py`文件，但是现在把宿主机的`/tmp/webapp`映射到了容器中，容器中现在的内容就是空了，所以容器一运行就直接报错退出了。


```
[root@archlinux ~]# docker volume ls
DRIVER              VOLUME NAME
local               nexus-data
[root@archlinux ~]# docker volume inspect nexus-data
[
    {
        "CreatedAt": "2018-07-24T14:25:11Z",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/nexus-data/_data",
        "Name": "nexus-data",
        "Options": null,
        "Scope": "local"
    }
]
```

## 挂载数据卷
``` 
[root@archlinux ~]# docker run -d -P --name webapp --mount source=webapp,target=/webapp training/webapp python app.py

[root@archlinux ~]# curl localhost:32768
Hello world!

```

## 挂载主机目录

```
[root@archlinux ~]# docker run -d -P --name webapp --mount type=bind,source=/tmp/webapp,target=/webapp training/webapp

```


# 网络管理

安装Docker之后，Docker会自动生成一张网卡(网桥,docker0)，而每启动一个容器，docker就会自动创建一个(Virtual Ethernet Pair)设备，这个设备会加入到之前的网桥中(docker0)，在`veth`两端，容器段一般为`eth0`这种借口名称，而宿主机中一般为`veth6478..`，正因为这种机制，docker容器才有和外部通信的机会。

```
[root@archlinux webapp]# ifconfig
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::42:f5ff:fe3e:212c  prefixlen 64  scopeid 0x20<link>
        ether 02:42:f5:3e:21:2c  txqueuelen 0  (Ethernet)
        RX packets 106773  bytes 21422015 (20.4 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 144343  bytes 186281001 (177.6 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth08767b9: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::2062:70ff:fec8:8f33  prefixlen 64  scopeid 0x20<link>
        ether 22:62:70:c8:8f:33  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 86  bytes 11572 (11.3 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth647820e: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::40dc:38ff:fe36:31b4  prefixlen 64  scopeid 0x20<link>
        ether 42:dc:38:36:31:b4  txqueuelen 0  (Ethernet)
        RX packets 3003  bytes 4064740 (3.8 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 6485  bytes 32471125 (30.9 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

## Docker网络模式

- host
    容器依附在宿主机上, 和宿主机共用一个`Network Namespace`
- container
    容器依附在另一个容器上, 多个容器共享一个`Network Namespace`
- none
    容器无网路配置,每个容器拥有一个`Network Namespace`
- bridge
    Docker默认网络模式，容器使用vbridge模式,每个容器拥有一个`Network Namespace`

```
[root@archlinux ~]# docker network create -d bridge my-net
b0b92728b2a9a18ea1e238f884a710013397920a843b39cf4aef043a620a439a
[root@archlinux ~]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
6c5400cee0bd        bridge              bridge              local
c956c9414c14        host                host                local
b0b92728b2a9        my-net              bridge              local
8579fea8d08b        none                null                local
```



## 外部容器访问
容器中可以运行一些网络应用，要让外部也可以访问这些应用，可以通过`-p`或者`-P`参数来指定端口映射。
容器有自己的网络，可以使用`docker inspect`查看内部docker容器的IP地址等。

-p支持的格式为： `-p ip:hostPort:containerPort [ip::containerPort] [hostPort:containerPort]`
-p支持多次绑定，即容器中的多个端口映射到宿主机的多个端口。

## 容器互联

可以看到`busybox1`和`busybox2`已经建立起了互联。

```
# container one
[root@archlinux ~]# docker run -ti --rm --name busybox1 --network my-net busybox sh
Unable to find image 'busybox:latest' locally
latest: Pulling from library/busybox
75a0e65efd51: Pull complete
Digest: sha256:d21b79794850b4b15d8d332b451d95351d14c951542942a816eea69c9e04b240
Status: Downloaded newer image for busybox:latest
/ # ping busybox2
PING busybox2 (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.143 ms
64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.182 ms


# container two
[root@archlinux webapp]# docker run -ti --rm --name busybox2 --network my-net busybox sh
/ # ping busybox1
PING busybox1 (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.220 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.152 ms
```


## DNS

```
[root@archlinux webapp]# docker exec -ti webapp /bin/bash

root@3c203fe10d9b:/opt/webapp# mount|grep etc
/dev/sdb2 on /etc/resolv.conf type btrfs (rw,relatime,space_cache,subvolid=5,subvol=/var/lib/docker/containers/3c203fe10d9b46119274b40646c839bdb332eb438b8af7bf07ec7103ec29fb88/resolv.conf)
/dev/sdb2 on /etc/hostname type btrfs (rw,relatime,space_cache,subvolid=5,subvol=/var/lib/docker/containers/3c203fe10d9b46119274b40646c839bdb332eb438b8af7bf07ec7103ec29fb88/hostname)
/dev/sdb2 on /etc/hosts type btrfs (rw,relatime,space_cache,subvolid=5,subvol=/var/lib/docker/containers/3c203fe10d9b46119274b40646c839bdb332eb438b8af7bf07ec7103ec29fb88/hosts)
```

全局DNS配置：直接在docker启动的时候使用其配置文件

``` daemon.json
{
    "dns": [
        "114.114.114.114",
        "8.8.8.8"
    ]
}

```

容器DNS配置：
-h或者--hostname=HOSTNAME会设定容器的主机名，并写入/etc/hostname和/etc/hosts中
--dns=IP_ADDRESS会添加DNS到容器的/etc/resolv.conf中，让这个容器来解析所有不再/etc/hosts中的主机名。
--dns-search=DOMAIN设定容器的搜索域，当设定搜索域为`example.com`时，在搜索一个名为host的主机时，DNS不仅搜索host文件，还会搜索`host.example/com`





# Docker Compose
`Compose`是Docker官方项目，负责实现对Docker容器集群的快速编排。其定位是[定义和运行多个Docker容器的应用(Defining and running multi-container Docker applications)]

我们知道使用`Dockerfile`一个文件模板文件，可以让用户很方便的定义一个单独的应用容器。然而，在日常的工作中，经常会碰到需要多个容器相互配合来完成某项任务的情况。例如要实现一个Web项目，除了Web服务器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。

`Compose`恰好满足了这样的需求，它允许用户通过一个单独的`docker-compose.yml`模板文件来定义一组相关联的应用容器为一个项目。

两个概念：
    服务(service): 一个应用的容器，实际上可以包含若干运行相同镜像的容器实例。
    项目(project): 由一组相关联的应用容器组成的一个完整的业务单元。在`docker-compose.yml`文件中定义。

`Compose`的默认管理对象是项目，通过子命令对项目中的一组容器进行便捷地生命周期管理。
`Compose`项目由`Python`编写，实现上调用了`Docker API`来对容器进行管理。因此，只要所操作的平台支持`DockerAPI`，就可以在其上利用`Compose`进行编排管理。

## 安装

- 二进制
- pip
- docker

```
[root@archlinux ~]# pip install docker-compose
Collecting docker-compose
[root@archlinux ~]# cd /usr/share/bash-completion/
[root@archlinux completions]# curl -L https://raw.githubusercontent.com/docker/compose/1.21.2/contrib/completion/bash/docker-compose -o docker-compose
```

## demo

```
[root@archlinux compose]# docker-compose up
Creating network "compose_default" with the default driver
Building web
Step 1/5 : From python:3.6-alpine
3.6-alpine: Pulling from library/python
911c6d0c7995: Pull complete
01a7b783f4b1: Pull complete
bf478bc51524: Pull complete
69697aed758a: Pull complete
2f2645628ab4: Pull complete
Digest: sha256:d4198a2dc7f52a1b7996f1d7812808b7e763d3a83627683c89599546086fddb1
Status: Downloaded newer image for python:3.6-alpine
 ---> 2068eb9e7f62
Step 2/5 : Add . /code
 ---> 4d2581d148f4
Step 3/5 : WORKDIR /code
Removing intermediate container 8d6bb4276137
 ---> a9fdb885a5e1
Step 4/5 : RUN pip install redis flask
 ---> Running in 17130ca5ec0b
Collecting redis
  Downloading https://files.pythonhosted.org/packages/3b/f6/7a76333cf0b9251ecf49efff635015171843d9b977e4ffcf59f9c4428052/redis-2.10.6-py2.py3-none-any.whl (64kB)
Collecting flask
  Downloading https://files.pythonhosted.org/packages/7f/e7/08578774ed4536d3242b14dacb4696386634607af824ea997202cd0edb4b/Flask-1.0.2-py2.py3-none-any.whl (91kB)
Collecting itsdangerous>=0.24 (from flask)
  Downloading https://files.pythonhosted.org/packages/dc/b4/a60bcdba945c00f6d608d8975131ab3f25b22f2bcfe1dab221165194b2d4/itsdangerous-0.24.tar.gz (46kB)
Collecting Jinja2>=2.10 (from flask)
  Downloading https://files.pythonhosted.org/packages/7f/ff/ae64bacdfc95f27a016a7bed8e8686763ba4d277a78ca76f32659220a731/Jinja2-2.10-py2.py3-none-any.whl (126kB)
Collecting click>=5.1 (from flask)
  Downloading https://files.pythonhosted.org/packages/34/c1/8806f99713ddb993c5366c362b2f908f18269f8d792aff1abfd700775a77/click-6.7-py2.py3-none-any.whl (71kB)
Collecting Werkzeug>=0.14 (from flask)
  Downloading https://files.pythonhosted.org/packages/20/c4/12e3e56473e52375aa29c4764e70d1b8f3efa6682bef8d0aae04fe335243/Werkzeug-0.14.1-py2.py3-none-any.whl (322kB)
Collecting MarkupSafe>=0.23 (from Jinja2>=2.10->flask)
  Downloading https://files.pythonhosted.org/packages/4d/de/32d741db316d8fdb7680822dd37001ef7a448255de9699ab4bfcbdf4172b/MarkupSafe-1.0.tar.gz
Building wheels for collected packages: itsdangerous, MarkupSafe
  Running setup.py bdist_wheel for itsdangerous: started
  Running setup.py bdist_wheel for itsdangerous: finished with status 'done'
  Stored in directory: /root/.cache/pip/wheels/2c/4a/61/5599631c1554768c6290b08c02c72d7317910374ca602ff1e5
  Running setup.py bdist_wheel for MarkupSafe: started
  Running setup.py bdist_wheel for MarkupSafe: finished with status 'done'
  Stored in directory: /root/.cache/pip/wheels/33/56/20/ebe49a5c612fffe1c5a632146b16596f9e64676768661e4e46
Successfully built itsdangerous MarkupSafe
Installing collected packages: redis, itsdangerous, MarkupSafe, Jinja2, click, Werkzeug, flask
Successfully installed Jinja2-2.10 MarkupSafe-1.0 Werkzeug-0.14.1 click-6.7 flask-1.0.2 itsdangerous-0.24 redis-2.10.6
You are using pip version 10.0.1, however version 18.0 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
Removing intermediate container 17130ca5ec0b
 ---> def100eaeabd
Step 5/5 : CMD ["python", "app.py"]
 ---> Running in eb422b1d94dd
Removing intermediate container eb422b1d94dd
 ---> bfe50c3e9faf
Successfully built bfe50c3e9faf
Successfully tagged compose_web:latest
WARNING: Image for service web was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Pulling redis (redis:alpine)...
alpine: Pulling from library/redis
8e3ba11ec2a2: Already exists
1f20bd2a5c23: Pull complete
782ff7702b5c: Pull complete
cd719ead7ee3: Pull complete
01018940af9a: Pull complete
3f1bfdda9588: Pull complete
Digest: sha256:e57274dac037e5b0c7680717fcaaa0efeffb23430e54e839c50819c9d842a38c
Status: Downloaded newer image for redis:alpine
Creating compose_redis_1 ... done
Creating compose_web_1   ... done
Attaching to compose_redis_1, compose_web_1
redis_1  | 1:C 25 Jul 13:25:35.905 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis_1  | 1:C 25 Jul 13:25:35.905 # Redis version=4.0.10, bits=64, commit=00000000, modified=0, pid=1, just started
redis_1  | 1:C 25 Jul 13:25:35.905 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis_1  | 1:M 25 Jul 13:25:35.907 * Running mode=standalone, port=6379.
redis_1  | 1:M 25 Jul 13:25:35.907 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
redis_1  | 1:M 25 Jul 13:25:35.907 # Server initialized
redis_1  | 1:M 25 Jul 13:25:35.907 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
redis_1  | 1:M 25 Jul 13:25:35.907 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
redis_1  | 1:M 25 Jul 13:25:35.907 * Ready to accept connections
web_1    |  * Serving Flask app "app" (lazy loading)
web_1    |  * Environment: production
web_1    |    WARNING: Do not use the development server in a production environment.
web_1    |    Use a production WSGI server instead.
web_1    |  * Debug mode: on
web_1    |  * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
web_1    |  * Restarting with stat
web_1    |  * Debugger is active!
web_1    |  * Debugger PIN: 336-031-622


web_1    | 172.19.0.1 - - [25/Jul/2018 13:25:59] "GET / HTTP/1.1" 200 -
web_1    | 172.19.0.1 - - [25/Jul/2018 13:26:00] "GET / HTTP/1.1" 200 -
web_1    | 172.19.0.1 - - [25/Jul/2018 13:26:00] "GET / HTTP/1.1" 200 -


[root@archlinux webapp]# curl localhost:5000
Hello World! 该页面已被访问1 次。
[root@archlinux webapp]# curl localhost:5000
Hello World! 该页面已被访问2 次。
[root@archlinux webapp]# curl localhost:5000
Hello World! 该页面已被访问3 次。
```


## Compose模板文件

默认的模板文件名称为`docker-compose.yml`，格式为YAML格式。
每个服务都必须通过`image`命令指定镜像，或者通过`build`命令(需要Dockerfile)等来自动构建生成镜像。
如果使用`build`命令，在Dockerfile中设置的选项(例如：CMD、EXPOSE、VOLUME、ENV等)将会自动被获取，无需在docker-compose.yml中再次设置

- build
指定`Dockerfile`所在文件夹的路径(可以是绝对路径，或者相对路径)。`compose`将会利用它自动构建这个镜像，然后使用这个镜像。

```
version: '3'
services:
  webapp:
    build: ./dir
```

也可以使用build的子指令(`context`,`arg`等)指令达到相同的功能。

```
version: '3'
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
      cache_from:  # 指定构建镜像的缓存
        - alpine:latest
        - corp/web_app:3.14
```

- cap_add, cap_drop
指定容器的内核能力(capacity)分配。

```
cap_add:
  - ALL # 让容器拥有所有能力
```

```
cap_drop:
  - NET_ADMIN   # 去掉NET_ADMIN能力
```



- command
覆盖容器启动后默认执行的命令。

```
command: echo "hello world"

```

- configs
仅用于`Swarm mode`

- cgroup_parent
指定父`cgroup`组，意味着将继承该组的资源限制。

```
cgroup_parent: cgroups_1    # 创建了一个cgroup组名称为cgroups_1
```

- container_name
指定容器名称。默认将会使用`项目名称_服务名称_序号`这样的格式。
注意： 指定容器名称后，该服务将无法进行扩展(scale)，因为Docker不允许多个容器具有相同的名称

```
container_name: docker-web-container
```

- depoly
仅用于`Swarm mode`

- devices
指定设备映射关系

```
devices:
  - "/dev/ttyUSB1:/dev/ttyUSB0"

```


- depends_on
解决容器的依赖、启动先后问题。下面的配置指定先启动redis和db之后再启动web

```
version: '3'
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```


- dns
自定义`DNS`服务器。可以是一个值，也可以是一个列表。

```
dns: 8.8.8.8

dns:
  - 8.8.8.8
  - 114.114.114.114
```

- dns_search
配置`DNS`搜索域。可以是一个值，也可以是一个列表。[什么是DNS搜索域](https://support.apple.com/kb/PH25577?locale=zh_CN&viewlocale=zh_CN)

```
dns_search: example.com

dns_search:
  - domain1.example.com
  - domain2.example.com

```

- tmpfs
挂载一个`tmpfs`文件系统到容器


```
tmpfs: /run
tmpfs:
  - /run
  - /tmp
```

- env_file
从文件中获取环境变量，可以为单独的文件路径或列表。
如果通过`docker-compose -f FILE`的形式来指定Compose模板文件，则`env_file`中变量的路径会基于模板文件路径。
如果有变量名称与`environment`指令冲突，则按照惯例，以后者为准。

```
env_file: .env

env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/secrets.env
```

- environment
设置环境变量。可以使用数组或者字典两种形式。
只给定名称的变量会自动获取运行Compose主机上对应变量的值，可以用来防止泄露不必要的数据。

```
environment:
  RACK_ENV: development
  SESSION_SECRET: 

environment:
  - RACK_ENV=development
  - SESSION_SECRET
```

- expose
暴露端口，但不映射到宿主机，只被链接的服务访问。
尽可以指定内部端口为参数。

```
expose:
  - "3000"
  - "8000"
```

- external_links
链接到`docker-compose.yml`外部的容器，不建议使用该指令。

- extra_hosts
类似Docker的`--add-host`参数，指定格外的host名称映射信息。这里的映射就类似于`/etc/hosts`的作用。

```
extra_hosts:
  - "googledns:8.8.8.8"
  - "dockerhub:52.1.157.61"
```


- healthcheck
通过命令检查容器是否健康运行

```
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
```


- image
指定为镜像名称或镜像ID。如果镜像在本地不存在，Compose将会尝试拉取这个镜像。

```
image: ubuntu
image: orchardup/postgresql
image: a4bc65fd
```

- labels
为容器添加Docker元数据(metadata)信息。例如可以为容器添加辅助说明信息。

```
labels:
  com.startupteam.description: "webapp for a startup team"
  com.startupteam.department: "devops apartment"
  com.startupteam.release: "rc3 for v1.0"
```

- links

- logging
配置日志选项。

```
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"
```

目前支持三种日志驱动类型
```
driver: "json-file"
driver: "syslog"
driver: "none"
```
`options`配置日志驱动相关的参数
```
options:
  max-size: "200k"
  max-file: "10"
```

- network_mode
设置网络模式。使用和docker run的`--network`参数一样的值。
```
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "contanier:[container name/id]"
```

- networks
配置容器连接的网络。

```
version: "3"
services:
  some-service:
    networks:
      - some-network
      - other-network
networks:
  some-network:
  other-network:
```

- pid
跟主机系统共享进程命名空间。打开该选项的容器之间，以及容器和宿主机系统之间可以通过进程ID来相互访问和操作
```
pid: "host"
```

- ports
暴露端口信息。

```
ports:
  - "3000"
  - "8000:8000"
  - "49100:22"
  - "127.0.0.1:8001:8001"
```

- secrets
存储敏感数据，例如`mysql`密码。

```
version: "3.1"
services:

mysql:
  image: mysql
  environment:
    MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
  secrets:
    - db_root_password
    - my_other_secret

secrets::
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
```


- security_opt
指定容器模板标签(label)机制的默认属性(用户、角色、类型、级别等)。例如配置标签的用户名和角色名。
```
security_opt:
  - label:user:USER
  - label:role:ROLE
```


- stop_signal
设置另一个信号来停止容器。在默认情况下使用的是`SIGTERM`停止容器。
```
stop_signal: SIGUSR1
```

- sysctls
配置容器内核参数

```
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0
sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
```

- ulimits
指定容器的ulimits限制值。
例如，指定最大进程数为65535，指定文件句柄数为20000(软限制，应用可以随时修改，不能超过硬限制)和40000(系统硬限制，智能root用户提高)
```
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000
```

- volumes
数据卷所挂载路径设置。可以设置宿主机路径(HOST:CONTAINER)或加上访问模式(HOST:COntAINER:ro)。该指令中路径支持相对路径

```
volumes:
  - /var/lib/mysql
  - cache/:/tmp/cache
  - ~/configs:/etc/configs/:ro
```

