# Install

## Verifying the Installation

```
λ vagrant
Usage: vagrant [options] <command> [<args>]

    -v, --version                    Print the version and exit.
    -h, --help                       Print this help.

Common commands:
     box             manages boxes: installation, removal, etc.
     destroy         stops and deletes all traces of the vagrant machine
```

## Caveats

不要使用OS的软件仓库，不是官方最新的，可能会出现各种奇怪的问题。

# Project Setup
The first step in configurint any Vagrant project is to create a Vagrantfile.The purpose of the Vagrantfile is twofold:
1. Make the root directory of project
2. Describe the kind of machine and resources you need to run your project, as well as what software to install and how you want to access it.

Vagrant has a build init CLI:

```
mkdir vagrant_getting_started
cd vagrant_getting_started
vagrant init ubuntu/trusty64
```

# Boxes
Instead of building a virtual machine from scratch,which would be a slow and tedious process,Vagrant uses a base image to quickly clone a virtual machine.These base images are known as "boxes" in Vagrant,and speifying the box to use for your Vagrant environment is always the first step after creating a new Vagrantfile.

## Installing a Box
Boxes are added to Vagrant with `vagrant box add`,This store the box under a specific name so that multiple Vagrant environments can re-use it.

```
$ vagrant box add generic/arch
```

This will download the box named `generic/arch` from HashiCorp's Vagrant Cloud box catalog, a place where you can find and host boxes.

Boxes are globally stored for the current user.Each project use a box as an initial image to clone from, and never modifies the actual base image.

## Using a Box
Now that the box has been added to Vagrant, we need to configure our project to use it as a base.

```
Vagrant.configure("2") do |config|
  config.vm.box = "generic/arch"
end
```

The `generic/arch` in this case must match the name you used to add the box above.If the box was not added before,Vagrant will automatically download and add the box when it is run.


# Up and SSH

```
$ vagrant up
```

In less than a minute, this command will finish and you will have a virtual machine running archlinux.

```
$ vagrant ssh
```

This command will drop you into a full-fledged SSH session.

```
$ vagrant destroy
```

Vagrant will terminate the use of any resources by the virtual machine



# Synced Folders

# Provisioning

# Networking

# Share

# Teardown

# Rebuild

# Resources
[Vagrant docs](https://docs.vagrantup.com)
[Vagrant boxes](https://vagrantcloud.com/)
