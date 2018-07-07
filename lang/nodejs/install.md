
# Nodejs的安装

不同的系统有不同的包管理器，一般都会提供Node包，但是有的时候包版本并不是最新的，所以需要手动安装。

```
cd /tmp
wget https://npm.taobao.org/mirrors/node/v10.5.0/node-v10.5.0-linux-x64.tar.xz
cd /usr/local
tar --strip-component=1 -xvf /tmp/node-v10.5.0-linux-x64.tar.xz
node    # Node.js installed successfully
```