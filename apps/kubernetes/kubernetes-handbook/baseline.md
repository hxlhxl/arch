# What is K8S
Kubernetes是Google开源的容器集群管理系统。
主要功能：
- 基于容器的应用部署、维护和滚动升级
- 负载均衡和服务发现
- 跨机器和款地区的集群调度
- 自动伸缩
- 无状态服务和有状态服务
- 广泛的Volume支持
- 插件机制保证扩展性

# K8S Components
- etcd保存整个集群状态
- apiserver提供了资源操作的唯一入口，并提供认证、授权、访问控制、API注册和发现等机制
- controller manager负责维护集群的状态，比如故障检测、自动扩展、滚动更新等
- scheduler负责资源的调度，按照预定的调度策略将Pod调度到相应的机器上
- kubelet负责维护容器的生命周期，同时也负责Volume(CVI)和网络(CNI)的管理
- Container runtime负责镜像管理以及Pod和容器的真正运行(CRI)
- kube-proxy负责为Service提供cluster内部的服务发现和负载均衡


# Pod
Pod是一组紧密关联的容器集合，他们共享PID、IPC、Network和UTS namespace，是Kubernetes调度的基本单位。Pod的设计理念是支持多个容器在一个Pod中共享网络和文件系统，可以通过进程间通信和文件共享这种简单高效的方式组合完成服务。
在Kubernetes中，所有对象都使用manifest(yaml或json)来定义，比如一个简单的nginx服务可以定义为nginx.yml

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    -containerPort: 80
```

# Node
Node是Pod真正运行的主机，可以是物理机，也可以是虚拟机。为了管理Pod，每个Node节点上至少要运行container runtime(比如docker或者rkt)、kubelet和kube-proxy服务。
# Namespace
# Service
Service是应用服务的抽象，通过labels为应用提供负载均衡和服务发现。匹配labels的Pod IP和端口列表组成endpoints，有kube-proxy负责将服务IP负载均衡到这些endpoints上。
每个Service都会自动分配一个cluster IP和DNS名，其他容器可以通过该地址或DNS来访问服务，而不需要了解后端容器的运行。

# Reference
[Kubernetes 指南](https://kubernetes.feisky.xyz/zh/)