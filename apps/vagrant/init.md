
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
在Vagrantfile文件中的config.vm.network配置项,这个表示vagrant box端口(guest)端口位80，而宿主机为8080

```
config.vm.network "forwarded_port", guest: 80, host: 8080
config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1" # 宿主机仅本地可以访问
```

# 网络

``` host-only 宿主机和虚拟机可以互访，其他机器不可以访问
  # config.vm.network "private_network", ip: "192.168.33.10"

```

``` bridge
  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  config.vm.network "public_network"
```


# 共享文件夹
把宿主机的`data`目录共享到vagrant中的`/vagrant_data`

```
  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "../data", "/vagrant_data"
```

# provider
虚拟机特性，最常见的是`virtualbox`

```
  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    vb.gui = true
    vb.memory = "1024"
  end

```
# Provision
额外的平台特性，有`shell`,`docker`等

vagrant up  首次执行时执行
vagrant provision   
vagrant reload --provision

```
  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y apache2
  SHELL
```

# 登录
vagrant ssh