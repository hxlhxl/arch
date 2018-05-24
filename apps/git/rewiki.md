重读progit

# 本质
本地git仓库中的文件存在4种状态:
untracked   unmodified  modified    staged(暂存区)
其中untracked为【未跟踪】,unmodified、modified和staged为【已跟踪】

## git add
用于添加一个文件内容到暂存区。如果一个文件已经暂存，此时再修改该文件，这次修改会同时出现再两种状态，使用git checkout -- FILENAME将回退至FILENAME最后一次git add的状态。

- 添加一个untracked file
- 添加一个modified file
- 添加一个merged之后冲突的file

## git status

```
$ git status -s
 M README
MM Rakefile
A lib/git.rb
M lib/simplegit.rb
?? LICENSE.txt
```

README: README被修改还未放入暂存区
Rakefile: Rakefile被修改放入暂存区之后，又发生了修改变更
lib/git.rb: git.rb是新增文件且放入了暂存区
lib/simplegit.rb: simplegit.rb被修改且放入了暂存区
LICENSE.txt: LICENSE.txt是新增文件但是未放入暂存区


## .gitignore
https://github.com/github/gitignore

## git diff

- git diff: 当前文件和暂存区文件的差异
- git diff --cached: 工作目录中已经暂存的文件和暂存区中这些文件的差异
- git diff --staged: 工作目录中已经暂存的文件和暂存区中这些文件的差异

## git commit
在当前所在分支，生成SHA1文件快照校验和，提交暂存(已经跟踪的)区内容

## git rm
把文件从暂存区移除，git不再跟踪文件变化

- git rm -f app/git/xx.md   强制移除git对暂存区里xx.md的跟踪，并从系统文件系统删除
- git rm --cached app/git/xx.md 移除git对暂存区里xx.md的跟踪，不从系统文件系统删除

## git mv

```
mv FILENAME_A FILENAME_B
git rm FILENAME_A
git add FILENAME_B
```


## git log

- git log --pretty=oneline
- git log --pretty=oneline --graph
- git log --stat


## git reset

## git checkout

## git remote

- git remote
- git remote -v
- git remote add <shortname> <url>: 使用`shortname`作为远程仓库`url`的别名


## git fetch
git fetch不会自动合并冲突，必须手动去合并
- git fetch [remote-name]: 从`remote-name`中拉取本地仓库中还没有的数据，可供查看和合并
- git fetch 
- git fetch 


```
E:\workspace\arch (master -> origin)
λ git remote add bitbucket   https://huaxiongcool@bitbucket.org/huaxiongcool/arch.git

E:\workspace\arch (master -> origin)
λ git remote -v
bitbucket       https://huaxiongcool@bitbucket.org/huaxiongcool/arch.git (fetch)
bitbucket       https://huaxiongcool@bitbucket.org/huaxiongcool/arch.git (push)
origin  https://github.com/hxlhxl/arch (fetch)
origin  https://github.com/hxlhxl/arch (push)

E:\workspace\arch (master -> origin)
λ git remote add bitbucket   https://huaxiongcool@bitbucket.org/huaxiongcool/arch.git

E:\workspace\arch (master -> origin)
λ git remote -v
bitbucket       https://huaxiongcool@bitbucket.org/huaxiongcool/arch.git (fetch)
bitbucket       https://huaxiongcool@bitbucket.org/huaxiongcool/arch.git (push)
origin  https://github.com/hxlhxl/arch (fetch)
origin  https://github.com/hxlhxl/arch (push)

```




## git push



## 