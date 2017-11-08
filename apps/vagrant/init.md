
pacman -S vagrant

# 文档
https://www.vagrantup.com/docs

# 添加box
vagrant box add centos/7
该命令会从vagrant官方仓库下载box到~/.vagrant.d/box路径下。
centos/7这个名称也是Vagrantfile中的config.vm.box的值

# 列出box
vagrant box list

# 端口转发
在Vagrantfile文件中的config.vm.network配置项
```
config.vm.network "forwarded_port", guest: 80, host: 8080
```



# 共享文件夹


# Provision

vagrant up  首次执行时执行
vagrant provision   
vagrant reload --provision


# 登录
vagrant ssh