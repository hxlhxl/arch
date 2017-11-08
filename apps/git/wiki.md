
# Git基础

## 最根本的原理
- 每次提交时记录其完整快照，而不是所有文件的变化量(delta)
- 使用SHA-1散列机制记录文件的变化

## 状态
### 跟踪状态(Tracked files)
已经被纳入了版本控制的文件，也就是被提交后的文件，都会归为跟踪状态。
跟踪新文件使用**git add**将会开始跟踪指定的文件。
对跟踪状态的文件进行修改之后，这些文件处于"尚未暂存以备提交的变更(Changes not staged for commit)"
- committed 数据已经保存在本地数据库 <=>    Git目录中保存着特定版本文件
- modified  文件修改，还没保存到本地数据库 <=> 修改还没有放到暂存区
- staged    对一个已经修改文件的当前版本作了标记，使之包含在下次提交的快照中,在"要提交的变更Changes to be committed"下的文件    <=> 修改放入暂存区
### 未跟踪状态(Untracked files)
Git项目下所有Tracked files之外的文件都是Untracked files
~~.gitignore中的那些文件~~,
### 忽略文件
无须纳入Git管理的文件使用**.gitignore**文件，该文件可以参考github上的ignore仓库
[github/gitignore](https://github.com/github/gitignore)
### 工作目录、暂存区、Git仓库
![工作目录、暂存区、Git仓库](http://git.oschina.net/progit/figures/18333fig0106-tn.png)

- 工作目录  对项目的某个版本独立提取(从Git仓库压缩数据中提取出来的文件，放在磁盘上可修改)出来的内容
- Git仓库 Git用来保存项目的元数据和对象数据库的地方
- 暂存区   一个文件，保存了下次将提交的文件列表信息，一般位于Git仓库中

### 文件状态变化周期
![文件状态变化周期](http://git.oschina.net/progit/figures/18333fig0201-tn.png)

## Git配置
1. 配置文件
设置配置变量的工具，主要有三个地方存储了这些变量，优先级和大多数软件思想一致，最近的最优先使用。
- /etc/gitconfig    系统级别的配置，配置时加上**--system**选项
- ~/.gitconfig      用户级别的配置，配置时加上**--global**选项
- REPO/.git/config  项目级别的配置

2. 配置方法
```
git config --global user.name "hxlhxl"
git config --global user.email  "huaxiongcool@126.com"
# 列出所有配置信息
git config --list
# 设置Git命令别名
git config --global alias.unstage 'reset HEAD --'
```
## Git命令
1. git init
2. git clone (http|git)
    默认配置下远程Git仓库中的每一个文件的每一个版本都将被拉取下来
```
cd $REPO
git init
```
3. git status
git status
git status -s
git status --short
```
[husa@ArchLinux-husa git-playground]$ git status --short
MM CONTRIBUTING.md
A  README
?? LICENSE.txt
```
3. git add
- 添加文件到跟踪状态
- 添加文件到下次待提交的状态

4. git diff
- git diff: 比较工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的内容变化。

- git diff --cached: 查看已暂存的将要添加到下次提交里的内容
- git diff --staged: 效果和git diff --cached一样
- git difftool: 使用diff工具查看变化

- git diff origin/master: 比较工作目录中当前文件和origin/master暂存区上的文件差异
- git diff master origin/master: 比较暂存区中和远程master的不同
- git diff master: 比较工作目录中当前文件和暂存区master暂存区上的文件差异
5. git commit
提交暂存区文件到Git仓库中，每一次运行提交操作，都是对项目暂存的文件的一次快照，以后可以回到该状态，或者进行比较

- git commit -a -m '': Git自动把所有已经跟踪过的文件暂存起来一并提交
- git commit --amend: 尝试重新提交最近提交
6. git rm
- 从工作区+Git仓库删除文件

```
rm FILE
git rm FILE
git commit -m 'rm FILE'
```

从Git中(暂存区)移除某个文件，下次提交的时候，这个删除操作的文件就不会纳入Git管理了。
如果在rm FILE之前又修改了文件，那么git rm FILE的时候要使用-f选项,表示强制把该文件剔除Git管理，这种原因在于当后来要后悔回复的时候，只能恢复到暂存区中的文件状态，已经修改的文件是无法找回的。

- 从Git仓库(暂存区)移除文件
比如忘记添加.gitignore文件而添加到暂存区时,而不要删除磁盘上的文件。这个方法尤为有效
```
git rm --cached FILE
```

7. git mv
本质
```
mv file_from file_to
git rm file_from
git add file_to
```


8. git log
- git log -p: 查看每次提交的差异
- git log -p -NUM: 
- git log --stat: 显示简略统计信息
- git log --pretty: 
- git log --pretty=oneline: 一行显示简略信息
- git log --pretty=format:"%h - %an, %ar : %s"
- git log --pretty --graph
- git log --oneline --decorate --graph --all: 查看所有提交
9. git reset
- git reset HEAD FILENAME: 取消已经暂存的文件

10. git checkout
- git checkout -- FILENAME: 撤销被跟踪文件的修改，使之达到上次暂存的状态
- git checkout -b [branchname] [tagname]: Git并不能真正检出标签，如果没有-b [branchname]，那么实际上就是这种类似分支的位置: * （头指针分离于 v0.0.0）.

11. git remote
- git remote: 远程服务器简写，默认为origin
- git remote -v: 显示需要读写远程仓库使用的Git保存的简写与其对应的URL；如果远程仓库不止一个，会全部显示
- git remote add <shortname> <url>: 添加一个新的远程Git仓库，使用shortname可以代替整个url
- git remote show [remote-name]: 
- git remote rename name_from name_to: 重命名远程仓库
- git remote rm: 移除远程仓库

12. git fetch
从远程仓库获得数据
- git fetch [remote-name]: 访问远程仓库，从中拉取所有本地还没有的数据，执行完成后，将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看
- git fetch origin: 抓取远程仓库所有新的推送信息，不会自动合并或修改本地工作

13. git clone
自动设置本地master分支跟踪克隆的远程仓库的master分支

14. git pull
会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

15. git push
- git push [remote-name] [branch-name]: 把当前Git仓库推送到remote-name服务器的branch-name上；该命令执行成功，必须保持当前推送是远程的最新一次推送，也就是别人有推送，必须git pull再推送


16. git tag
- git tag: 列出已有标签
- git tag -l 'REG': 正则查看标签
- git tag -a [tag-name] -m 'cmt': 给当前提交打标签，-m指定了一条将会存储在标签中的信息，这个和git commit差不多；
- git tag -a [tag-name] SHA: 在提交的hash值上打标签，用于提交之后打标签。
- git push origin [tagname]: git push命令并不会传送标签到远程仓库服务器上，在创建完标签后，必须显示地推送到共享服务器。
- git push origin --tags: 一次推送所有标签
17. git show
- git show [tag-name]: 查看该标签下对应的提交信息

# Git分支
在进行提交操作时，Git会保存一个提交对象(commit object)。
暂存操作回味每一个文件计算校验和(SHA-1)，然后会把当前版本的文件快照保存到Git仓库中(blob对象保存),最终将校验和加入到暂存区域等待提交。
使用git commit 提交时，Git会先计算每一个子目录的校验和，然后在Git仓库中这些校验和保存为对象树。

随后，Git便会创建一个提交对象，它除了包含上面提到的那些信息外，还包含指向这个树对象(项目根目录)的指针；另外，提交对象还有另外一个指针，用于指向上一个提交对象。

而Git分支的本质，就是指向提交对象的可变指针，这个指针会爱每次的提交操作中自动向前移动。


## 查看分支
- git branch: 列出本地所有分支，带有*号的分支是当前HEAD指针所在的分支
- git branch -v: 查看每一个分支最后一次提交信息
- git branch --merged: 显示已经合并到当前分支的分支,这些显示的没有*的基本上都是可以放心的使用git branch -d删除的，因为被删除分支的内容已经合并到HEAD指针指向的分支的提交对象上了。
- git branch --no-merged: 显示没有合并到当前分支的分支

## 创建分支
Git分支的创建就是创建了另外一个可以移动的新的指针。

- git branch [branchname]: 在当前提交上创建一个新的移动指针。

## 切换分支
Git中有一个特殊的名为**HEAD**的指针，指向当前所在的本地分支。下面是创建testing分支后的记录，可以发现master和testing都处于同一个提交对象[47d0f1c]上。

```
[husa@ArchLinux-husa git-playground]$ git log --oneline --decorate
47d0f1c (HEAD -> master, testing) Add LICENSE
751c676 (tag: v0.0.1, origin/master) delete LICENSE
ce4b1ea add license
694243b add contributor
95c4e05 为CONTRIBUTING添加了一行注释
56975ac add readme && contributing
6407c58 (tag: v0.0.0) add contributing
```

- git checkout [branchname]: HEAD指针指向不同的分支名上，而且将工作目录恢复到branchname分支所指向的快照的内容,所以在checkout分支的时候，要将所有变更提交到快照内，否则Git拒绝切换分支。



## 合并分支 

- git merge [branchname]: 把branchname上的提交合并至执行该命令时所在的分支。
    1. fast-forward
        当试图合并两个分支时，如果顺着一个分支走下去能够达到另一个分支，那么Git在合并的时候，只会简单的将指针向前推进(HEAD指针+master推进)，这种情况在没有冲突的时候发生，也叫作快进(fast-forward)
    2. merge commit
        两个分支从某个提交对象上分叉(diverged)，然后以此为公共祖先合并不同分支上的提交，最终的提交结果合并为一个提交对象；这个共同祖先由Git自行决定。
    3. conflict merge
        如果两个分支上同时修改了一个文件，那么在合并的时候，Git就会提醒"You have unmerged paths",并且标出Unmerged paths所在的文件位置
        编辑这个文件路径，会有以下内容:
        ```
        <<<<<HEAD
        balbalbal
        ======
        plplplpl
        >>>>> branchname
        ```
        当删除<<<===>>>这些东西合并后，就能够使用**git add**命令暂存双方修改的文件，本次分支合并才算顺利结束
## 删除分支

- git branch -d [branchname]: 删除本地分支
- git branch -D [branchname]: 如果branchname所在的分支的文件没有合并，那么git branch -d时Git会拒绝删除，使用git branch -D能够强制删除分支。


## 跟踪分支
当克隆一个仓库时，它通常会自动创建一个跟踪origin/master的master分支,也就是说这个本地的master分支就是跟踪分支。

- git checkout -b [branch] [remotename]/[branch]:
- git checkout --track [remotename]/[branch]: 设置跟踪分支名字和远程分支名字相同，在这个分总分支上，执行git pull会自动拉去远程的同名分支最新数据。
- git branch -u
- git branch --set-upstream-to: 设置一个本地已有的分支(执行这条命令时所在的分支)来跟踪上游分支(远程分支)
- git branch -vv: 查看所有本地分支，并显示其与跟踪分支的落后与前进状态。如果又落后，就意味着远程分支上有被别人的提交，如果有前进就意味着本地有新的变更还没有提交到远程分支。该命令并没有从远程抓取数据，而是来自于本地的最后一次数据抓取的比较。
- git fetch -all: 获取远程所有分支数据信息。


## 远程分支

- master: master是git init的时候，Git默认起的分支名称
- origin: origin是git clone的时候，默认的远程仓库的名字
所以远程仓库的分支以 远程仓库名称/仓库分支 形式表现，比如origin/master远程分支，远程仓库上的分支如果由更新，本地仓库上的远程分支指针是不会发生移动的，其仍然保持在最初拉去代码的那个状态。
- git fetch [remote-repo-alias]: 抓取远程仓库的新数据，更新本地数据库，移动[remote-repo-alias]/master指针指向新的、更新后的位置。此时如果本地有更改，就会在本地与远程一直的哪一个提交对象上分叉，形成[remote-repo-alias]/master和master两种分支。

- git push [remote-repo-alias] [remote-repo-branch-name]: 把当前所在分支的提交对象推送到remote-repo-alias服务器所在的remote-repo-branch-name分支上。
比如：giit push origin serverfix命令，本质上是将本地的serverfix分支推送到origin/serverfix上，展开即refs/heads/serverfix:refs/heads/serverfix，因此该命令也可以写为：git push origin serverfix:serverfix

- git merge remoterepo/branchname: 把远程仓库的branchname分支合并到当前执行命令时所在的本地分支。

- git checkout -b serverfix origin/serverfix: 以远程serverfix分支为提交对象的起点，建立本地serverfix分支。

- giit push origin --delete serverfix: 向origin的远程分支serverfix提交一个删除请求。

## 拉取数据
git fetch命令从服务器上拉取本地没有的数据，但是并不会修改工作目录中的内容。它只会后去数据，然后让你自己合并。

```
[husa@ArchLinux-husa git-playground]$ git fetch --all;
正在获取 origin
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
展开对象中: 100% (3/3), 完成.
来自 https://github.com/hxlhxl/git-playground
   751c676..8abd1ad  master     -> origin/master
[husa@ArchLinux-husa git-playground]$ git branch -vv;
  hotfix  8aa0214 add x on branch hotfix
* master  30e3e1e [origin/master: 领先 6，落后 1] modify README
  testing affcb05 another tesing commit

```

- git pull: 含义为git fetch;git merge，即抓取远程数据之后，尝试合并当前所在的本地分支的远程跟踪分支。


## 变基

变基是将一系列提交按照原有次序依次应用到另一分支上，而合并是把最终结果合在一起；二者的最终结果都是合并分支。

- git rebase [branchname]: 执行该命令时，把当前分支的修改应用到branchname上，并生成一个提交对象，把当前分支指针应用到该提交对象上。 
- git rebase --onto 




# HEAD
HEAD 是一个对当前检出记录的符号引用 —— 也就是指向你正在其基础上进行工作的提交记录。
正常情况下HEAD指向的是分支，使用git checkout能够让HEAD移动。

.git/HEAD就是HEAD的真正指向。
```
# 这是git log中的一条提交记录,可以看到HEAD指向master分支，而master分支指向当前提交对象。
git log
commit 30e3e1ea2714f2b744b274f714844ecd7a39a1b7 (HEAD -> master)
# 执行以下命令后，HEAD直接指向了提交对象 30e31e(头指针分离于 30e3e1e)
git checkout 30e3e1ea2714f2b744b274f714844ecd7a39a1b7
# 再次git log发现HEAD不再指向master分支
git log
commit 30e3e1ea2714f2b744b274f714844ecd7a39a1b7 (HEAD, master)
# 查看HEAD
cat .git/HEAD 
30e3e1ea2714f2b744b274f714844ecd7a39a1b7
```

## 相对引用

- 使用 ^ 向上移动 1 个提交记录
- 使用 ~<num> 向上移动多个提交记录，如 ~3

```
# 
[husa@ArchLinux-husa git-playground]$ git log --oneline --graph --decorate
*   30e3e1e (HEAD -> master) modify README
|\  
| * affcb05 (testing) another tesing commit
| * 034d5af modify readme
* | 8aa0214 (hotfix) add x on branch hotfix
* | b2970e5 modify on master
|/  
* 47d0f1c Add LICENSE

# 
[husa@ArchLinux-husa git-playground]$ git branch -a
  hotfix
* master
  testing
  remotes/origin/master
[husa@ArchLinux-husa git-playground]$ git checkout master^
注意：正在检出 'master^'。

# 查看HEAD，之所以是这个SHA，是因为log图里面第一列的上一个指向就是8aa02
[husa@ArchLinux-husa git-playground]$ cat .git/HEAD 
8aa02142d630489137c9e5603a6cdd077e6e5189
# 继续，HEAD会继续向前一个提交对象上移动
[husa@ArchLinux-husa git-playground]$ git checkout HEAD^
之前的 HEAD 位置是 8aa0214... add x on branch hotfix
HEAD 目前位于 b2970e5... modify on master

```



# 场景

[分支的新建与合并](http://git.oschina.net/progit/3-Git-分支.html#3.2-分支的新建与合并)
- 设置密码
    git config --global credential.helper cache








# cheatsheet

- git diff --name-status master origin/master: 查看本地与远程修改
































ref:
- [Pro Git](http://git.oschina.net/progit/)
- [图解Git]() https://marklodato.github.io/visual-git-guide/index-zh-cn.html)
- [Pro Git_gitbook](https://www.gitbook.com/book/bingohuang/progit2/details)
- githug
- [https://learngitbranching.js.org](https://learngitbranching.js.org)
