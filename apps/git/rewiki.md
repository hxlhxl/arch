重读progit

# 本质
本地git仓库中的文件存在4种状态:
untracked   unmodified  modified    staged(暂存区)
其中untracked为【未跟踪】,unmodified、modified和staged为【已跟踪】

git中只有文件快照，没有文件变化。一次commit的本质就是对当前工作区下所有已经跟踪的文件生成一个【快照】

快照包含三部分： blob对象，文件结构tree对象，提交对象。

按照时间顺序，快照之间构成了链表，而git表面上的操作，实际上就是在操作这个链表。





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
默认显示当前分支以及和当前分支相关的一些提交对象。

- git log --pretty=oneline
- git log --pretty=oneline --graph
- git log --stat
- git log --oneline --decorate: 可以查看当前提交对象上有哪些分支
- git log --oneline --decorate --graph --all: 以图形方式查看提交记录，可以看到分支情况

## git reset
本质是移动`HEAD`执行的分支、commit-id的指向

三个步骤：
    1. (默认--soft)移动HEAD指向的分支的commit-id指向(master或者其他分支的commit-id指向)
    2. (默认--mixed)重置Index区域中现在commit-id对应的文件快照状态
    3. (如果有--hard选项)重置WorkingDirectory下commit-id对应的文件快照状态

- git reset HEAD~ --hard: 恢复到前一版本，可以撤销合并
- git reset --hard HEAD~ readme.md: 直接更改文件状态，但是commit-id还在
- git reset <commit-id> FILENAME: 重置FILENAME文件到指定commit-id下的内容快照状态

## git checkout
git_checkout的本质是移动`HEAD`指针指向分支/提交SHA/TAG，并恢复快照内的内容到工作目录。

- git checkout -b <branch-name> <tag-name>: 以`tag-name`那一刻的提交状态为准，建立一个新的分支`branch-name`
- git checkout <tag-name>: 检出`tag-name`那一刻的提交状态
- git checkout <branch-name>: 切换分支到`branch-name`
- git checkout -b <branch-name>: 如果没有`branch-name`，就创建切换；否则就切换
- git checkout -b <branch-name> origin/<branch-name>: 在本地建立跟踪远程origin的分支
- git checkout --track origin/<branch-name>: 和上条命令一样
- git checkout -b sf origin/server-fix: 本地创建sf分支，跟踪远程origin/server-fix分支
- git checkout -- FILENAME: 取消文件修改，相当于`git reset --hard HEAD FILENAME`
## git remote

- git remote
- git remote -v
- git remote add <shortname> <url>: 使用`shortname`作为远程仓库`url`的别名
- git remote show origin: 查看远程仓库信息(git_push和git_pull的默认配置，远程分支现状)
- git remote show bitbucket: 查看远程仓库信息
- git remote rename bitbucket bb: 把远程短名称bitbucket重命名为bb
- git remote rm <shortname>: 删除一个远程仓库

## git fetch
本地仓库在clone的时候，默认就会有一个origin/master远程分支，而git fetch的本质就是更新本地仓库确实的远程仓库数据，并移动本地远程仓库分支。

git fetch不会自动合并冲突，必须手动去合并。
git fetch会更新本地没有的数据(如果有他人提交的话)，本地分支不会移动，但是远程分支(origin/master)会和服务器一样。所以，如果fetch了数据，需要人工合并即`git merge origin/master`，从这个角度看，`git pull`的本质，就是`git fetch`+`git merge`

[from_learngitbranch.org]:  从远程仓库下载本地仓库中缺失的提交记录,更新远程分支指针(如 o/master)

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


E:\workspace\arch (master -> origin)
λ git checkout bitbucket/master
Note: checking out 'bitbucket/master'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at 5ae3670 'master分支上的master.md'

E:\workspace\arch (HEAD detached at 5ae3670 -> origin)
λ git checkout master
Checking out files: 100% (335/335), done.
Previous HEAD position was 5ae3670 'master分支上的master.md'
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

```


## git clone
本地设置一个master分支，而且本地master分支会自动跟踪origin/master分支。

- git clone --recursive: 可以递归的克隆git子模块

## git pull
当前分支有服务器上游分支的情况下，git会自动的从服务其抓取数据并合并到当前分支。
如果本地仓库首先执行了`git fetch origin`，那么要更新本地分支，可以使用`git merge origin/master`、`git cherry-pick origin/master`、`git rebase origin/master`
- git checkout -b <branch-name> origin/<branch-name>: 创建一个远程跟踪分支
- git pull --rebase: 更新分支，变基

## git push
git push默认不会提交标签tag到远程服务器上

- git push origin master: 把本地master分支上的修改提交到origin仓库；如果origin仓库的master分支上别人先前有提交过，必须先拉取并合并之后再次push到origin仓库
    本质上是`git push origin refs/heads/master:refs/heads/master`，即提交本地master到远程master
    还可以写成`git push origin master:master`，如果希望远程分支名称不一样，可以这样写，`git push origin master:master2`

- git push origin <tag-name>: 提交本地的标签`tag-name`到远程服务器
- git push origin --tags: 提交本地所有标签到远程服务器
- git push origin --delete <branch-name>: 删除远程服务器上的`branch-name`分支
- git push -f origin <branch-name>: 



## git tag
打标签的本质是将提交校验和保存下来，使用git checkout的时候可以直接切换到指定的commit-id处，不过此时修改文件将会比较危险，需要额外注意。

- git tag <tag-name>: 轻量标签，只会有提交信息
- git tag -a <tag-name> -m <tag-comment>: 附注标签，在提交信息之上还会有附注信息
- git tag -a <tag-name> <commit-id>: 在`commit-id`这次提交上补上一个tag

## git show

- git show <tag-name>: 查看tag详细信息
- git show <commit-id>: 查看一次提交的详细信息 

## git branch

- git branch -vv: 查看一个分支的详情,本地分支|上游分支(本地新建的分支可能没有上游分支)，前进，落后多少;这个命令没有和服务器交互，数据全部来自于最后一次数据抓取，所以在执行这个命令前，最好执行`git fetch --all`
- git branch <branch-name>: 在当前提交对象上创建一个分支`branch-name`，但是不会切换
- git branch -d <branch-name>: 删除本地`branch-name`分支
- git branch -D <branch-name>: 强制删除本地`branch-name`分支
- git branch -v: 
- git branch --merged: 查看当前分支上，其他已经合并到当前分支的分支，这个列表下的分支一般是可以删除的。
- git branch --no-merged: 查看当前分支上，还没有合并的分支；如果尝试删除该分支，会失败
- git branch -u origin/<branch-name>: 在当前分支上，设置其上游跟踪分支
- git branch --set-upstream-to origin/<branch-name>: 在当前分支上，设置其上游跟踪分支
- git branch <branch-name> <commit-id/HEAD^>: 在指定提交对象上创建分支

## git merge
合并的原理是，两个分支最近的提交和二者共同的最近祖先进行一次合并。

如果合并成功，git会自动提交一个【合并提交】；如果失败，git不会提交【合并提交】


Fast-forward
    当前分支是要合并的分支的上游
Auto-merging
    git自动合并，可能发生失败

在有冲突之后，git会标记文件为【未合并Unmerged】状态，在冲突的文件中，会有HEAD和要合并的分支名，其中HEAD就是当前所在分支，解决冲突之后，用户可以使用`git add`把文件重新加入暂存区，git就会标记为冲突已解决。

## git rebase
原则： 不要对在你的仓库外有副本的分支执行变基。如果遵循这条金科玉律，就不会出差错；否则，人民群众会仇恨你，你的朋友和家人也会嘲笑你，唾弃你。

变基，本质上就是把一个分支的变化在要合并的分支上重演一遍。一般发生在PR、维护开源项目时，这样其他人就不用合并了。

- git rebase master: 找到当前分支(experiment)和master分支的最近祖先，计算当前分支上的变更为临时文件，并在master分支上重新'播放一遍'，之后还需要执行`git checkout master;git merge experiment`。
- git rebase master server: 无论当前处在什么分支，该命令(会首先checkout到server分支，然后)表示直接把server分支的变化重演到master分支上，之后还需执行`git checkout master;git merge server`
- git rebase --onto master server client: 无论当前处在什么分支，该命令表示把server和client公共祖先下的client修改重演到master上，之后还需执行`git checkout master;git merge client`
- git rebase origin/master: 当前提交(master)和本地的origin/master分支计算一个差，重演到origin/master上，然后`git checkout origin/master;git merge master`;


## git stash

- git stash
- git stash apply stash@{n}: 应用第n个stash到当前分支
- git stash drop stash@{n}: 丢弃第n个stash
- git stash pop: 弹出stash并应用且丢弃

# git工具

## 选择修订版本
- git log
- git show <branch-name>: 分支引用
- git reflog: 引用日志
- git show HEAD/HEAD^/HEAD^^: 祖先引用,提交链表的上游提交;如果当前提交对象是合并的提交，那么使用`git show HEAD^1`和`git show HEAD^2`可以显示其父母提交对象；单分支情况下，`git show HEAD^n`那么n的最大值是1，输入其他值会报错。
- git show HEAD/HEAD~1/HEAD~2: HEAD^^和HEAD~2是等价的
- git show HEAD~5^2: 显示前5个提交对象的第2个父提交对象
## 提交区间
本质上就是两个分支上交集、差集运算

- git log master..feature: 在feature分支中而不在master分支中的提交对象
- git log feature..master: 在master分支中而不在feature分支中的提交对象
- git log origin/master..HEAD: 在当前分支中而不在远程master分支中的提交对象
- git log origin/master..: git默认使用HEAD填补..留空的一边
- git log ..origin/master: git默认使用HEAD填补..留空的一边
- git log refA..refB: 在refB中而不在refA中的提交对象
- git log ^refA refB: 在refB中而不在refA中的提交对象
- git log refB --not refA: 在refB中而不在refA中的提交对象
- git log refA refB ^refC: 在refA和refB中而不在refC中的提交对象
- git log --left-right master...feature: 两者不拥有对方各自提交的提交对象列表

## 重写历史

- git commit --amend: 之前可以使用git add/git rm等命令，然后修改上一次提交信息，生成一个新的提交对象覆盖上次提交。所以，如果该提交对象已经提交，就不要再使用该命令。

- git rebase 



## 选择提交
- git cherry-pick <commit-id>: 


# 底层
## "三棵树"
 
- HEAD
- Index
- WorkingDreictory

```
mkdir gitrepo
cd gitrepo
git init
git remote add origin https://github.com/github/gitrepo
echo 'hello' > readme.md    # WorkingDirectory中有一个文件'readme.md'
git add readme.md           # Index中有一个文件'readme.md'
git commit -m 'add readme'  # HEAD空间中保留有一个提交对象，是'readme.md'的文件快照,HEAD默认指向master分支会指向这个commit-id
git push                    # 同步当前分支master到远程服务器origin的master分支
```

## ..
分支的本质： 指向一次提交对象的引用(指针)
    git show master
    git rev-parse master

引用日志： git reflog记录HEAD指针在最近几个月的指向情况
    git show HEAD@{5}: 显示倒数第五次提交情况



# 高级用法


- HEAD： 表示工作区当前的指向分支的指向
- ^ : 工作区当前分支(提交对象)上，HEAD^表示当前分支(提交对象)上次提交，HEAD^2表示当前分支(提交对象)上两次提交
- ~ : 连续 HEAD^2~4，表示前6次提交;HEAD~3表示前3次提交
- 合并多个提交信息
    git rebase -i HEAD~3