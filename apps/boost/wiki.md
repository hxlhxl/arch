在依赖boost库时候，发现某些header无法安装，在archlinux中，实际上应该安装以下两个包
```
[husa@ArchLinux-husa ch02]$ pacman -Ss boost
extra/boost 1.66.0-1 [已安装]
    Free peer-reviewed portable C++ source libraries - development headers
extra/boost-libs 1.66.0-1 [已安装]
    Free peer-reviewed portable C++ source libraries - runtime libraries

```

另外，在需要pthread以及boost的某些依赖时，gcc需要添加以下选项

```
g++ -I ./include -lpthread -lboost_system -lboost_filesystem main.cpp
```