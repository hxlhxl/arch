

# 配置文件位置
~/.gitkraken/

# 删除/添加Repo
修改一下文件即可
``` ~/.gitkraken/profiles/<guid>/localRepoCache
{
  "localRepoCache": [
    "/oldhome/husa/workspace/Repo.git"
  ]
}
```
这里我遇到过一个问题，就是磁盘重新分区利用软链接方式导致gitkraken使用了重命名的路径，会出现多个重名的Repo列表。

