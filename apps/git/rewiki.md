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