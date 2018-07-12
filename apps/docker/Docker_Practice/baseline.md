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
- 容器分层存储： 容器运行在镜像之上


## 仓库(Repository)

