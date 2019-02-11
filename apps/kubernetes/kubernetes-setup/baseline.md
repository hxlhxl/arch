
# Virtualbox
```
pacman -S virtualbox
vboxreload
vagrant up
```

# Reference

[follow-me-install-kubernetes-cluster](https://github.com/opsnull/follow-me-install-kubernetes-cluster)



# Architecture


![Architecture](http://thenewstack.io/wp-content/uploads/2016/11/Chart_04_Kubernetes-Node.png)


- master/node architecture
- master[API Server, Scheduler, Controller Manager, etcd]
- node[Kubelet, Docker, Kube-Proxy(管理service)]_{Pod, Label/Selector}
- Pod[HorizontalPodAutoScaler, ReplicationController, ReplicaSet, Deployment, StatefulSet, DaemonSet, Job, CtonJob]
- Pod[AddOns(DNS, ...)]
- Service[Service Discovery, Service Register]
- Network[Node Net, Service Net, Pod Net](Flannel, calico, canel)
- 