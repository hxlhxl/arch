makefile规则

```
target ...: prerequisits ...
    ...
    ...
    command
```


target: 目标文件，执行文件或者标签(label)
prerequisits: 生成该target所依赖的文件或者target
command: 如何生成target的命令

prerequisites 中如果有一个以上的文件比 target 文件要新的话，command 所定义的命令就会被执行。



在默认的方式下，也就是我们只输入 make 命令。那么，
1. make 会在当前目录下找名字叫“Makefile”或“makefile”的文件。
2. 如果找到，它会找文件中的第一个目标文件（target），在上面的例子中，他会找到“edit”这个
文件，并把这个文件作为最终的目标文件。
3. 如果 edit 文件不存在，或是 edit 所依赖的后面的 .o 文件的文件修改时间要比 edit 这个文
件新，那么，他就会执行后面所定义的命令来生成 edit 这个文件。
4. 如果 edit 所依赖的 .o 文件也不存在，那么 make 会在当前文件中找目标为 .o 文件的依赖性，
如果找到则再根据那一个规则生成 .o 文件。（这有点像一个堆栈的过程）
5. 当然，你的 C 文件和 H 文件是存在的啦，于是 make 会生成 .o 文件，然后再用 .o 文件生成
make 的终极任务，也就是执行文件 edit 了。



伪目标

.PHONY clean

clean:
    ...



指令

vpath: make搜索代码的路径

```
vpath %.c   src
vpath %.h   src
vpath %.lua scripts
```
